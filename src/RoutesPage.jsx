/**
 * CertifyWise
 * © 2026 Альназирова Айдана (Aidana Alnazirova). Все права защищены.
 * Дата создания: 22 мая 2026 г.
 * Использование без письменного разрешения автора запрещено.
 *
 * Маршруты подготовки к TKT, CELTA, DELTA и IELTS.
 * Шаги отмечаются сами — по результатам студента в таблице progress.
 */

import { useState, useEffect, useMemo } from "react";
import { ROUTES } from "./routesData";
import { supabase } from "./supabaseClient";
import { T, L } from "./i18n";

const GOLD = "#c59b44", MUTED = "#8a7d6d", TXT = "#e8dfd0", GREEN = "#4caf88", BG = "#0b1622", CARD = "#12253b";

const PAGE_LABEL = {
  lessons: () => T("🧭 Уроки"), practice: () => T("⚡ Разминка"), prof: () => "🎓 TKT · CELTA · DELTA",
  reading: () => "📖 Reading", listening: () => "🎧 Listening", writing: () => "✍️ Writing", speaking: () => "🎙 Speaking",
};
const lessonNo = mod => { const m = /^Урок (\d+)/.exec(mod || ""); return m ? +m[1] : null; };

// Все результаты студента: страницами по 1000, чтобы ничего не потерялось
async function loadRows(userId) {
  const all = [];
  for (let from = 0; from < 20000; from += 1000) {
    const { data, error } = await supabase.from("progress").select("module, pct, details")
      .eq("user_id", userId).order("created_at", { ascending: true }).range(from, from + 999);
    if (error) return from === 0 ? null : all;
    all.push(...data);
    if (data.length < 1000) break;
  }
  return all;
}

// Состояние шага: done и подпись прогресса («2 из 3 уроков», «лучший 75% из 80%»)
function stepState(step, rows) {
  const c = step.check, parts = [];
  if (c.lessons) {
    const done = new Set(rows.map(r => lessonNo(r.module)).filter(Boolean));
    const n = c.lessons.filter(x => done.has(x)).length;
    parts.push({ ok: n === c.lessons.length, label: c.lessons.length > 1 ? L(`уроки: ${n} из ${c.lessons.length}`, `lessons: ${n} of ${c.lessons.length}`) : (n ? L("урок пройден", "lesson done") : L("урок не пройден", "lesson not done")) });
  }
  (c.mods || []).forEach(m => {
    const pref = Array.isArray(m.p) ? m.p : [m.p];
    const mine = rows.filter(r => pref.some(p => (r.module || "").startsWith(p)));
    const best = {}; mine.forEach(r => { best[r.module] = Math.max(best[r.module] ?? 0, r.pct); });
    const passed = Object.values(best).filter(v => v >= (m.min || 0)).length;
    const need = m.count || 1;
    const top = mine.length ? Math.max(...mine.map(r => r.pct)) : null;
    let label;
    if (need > 1) label = L(`${Math.min(passed, need)} из ${need}`, `${Math.min(passed, need)} of ${need}`);
    else if (top === null) label = L("ещё не начато", "not started yet");
    else label = m.min ? L(`лучший результат ${top}% (нужно ${m.min}%)`, `best result ${top}% (target ${m.min}%)`) : L("выполнено", "done");
    // Если в шаге несколько модулей (Speaking Part 1/2/3), подписываем каждый
    if ((c.mods || []).length > 1 && !Array.isArray(m.p)) label = `${m.p.replace(/^Speaking /, "")}: ${label}`;
    parts.push({ ok: passed >= need, label });
  });
  if (c.deltaAi) {
    const n = new Set(rows.filter(r => lessonNo(r.module) && Array.isArray(r.details) &&
      r.details.some(d => d && d.kind === "meta" && (d.levelsTried || d.level || "").includes("DELTA"))).map(r => lessonNo(r.module))).size;
    parts.push({ ok: n >= c.deltaAi, label: L(`уроков с DELTA: ${Math.min(n, c.deltaAi)} из ${c.deltaAi}`, `lessons at DELTA level: ${Math.min(n, c.deltaAi)} of ${c.deltaAi}`) });
  }
  return { done: parts.every(p => p.ok), parts };
}

export default function RoutesPage({ userId, initial, onNavigate }) {
  const [rows, setRows] = useState(null);
  const [failed, setFailed] = useState(false);
  const [open, setOpen] = useState(initial || null);

  useEffect(() => { setOpen(initial || null); }, [initial]);
  useEffect(() => {
    if (!userId) return;
    loadRows(userId).then(r => { if (r === null) setFailed(true); else setRows(r); });
  }, [userId]);

  const states = useMemo(() => {
    if (!rows) return null;
    const out = {};
    ROUTES.forEach(rt => { out[rt.id] = rt.steps.map(s => stepState(s, rows)); });
    return out;
  }, [rows]);

  const pctOf = id => (states ? Math.round((states[id].filter(s => s.done).length / states[id].length) * 100) : 0);

  if (failed) return <div className="empty">{L("Не удалось загрузить результаты. Проверьте интернет и обновите страницу.", "Could not load your results. Check your internet and refresh the page.")}</div>;

  // ---------- Список маршрутов ----------
  if (!open) {
    return (
      <div>
        <h2 className="st">{L("Маршруты подготовки", "Preparation routes")}</h2>
        <p className="sb">{L("Для каждого экзамена — шаги в нужном порядке: какие уроки пройти, какие задания сделать и какой результат нужен. Шаги отмечаются сами, по вашим результатам на сайте.", "For each exam: the steps in the right order — which lessons to take, which tasks to do and what result you need. Steps are ticked automatically based on your results on the site.")}</p>
        <div className="g2">
          {ROUTES.map(rt => {
            const p = pctOf(rt.id), n = states ? states[rt.id].filter(s => s.done).length : 0;
            return (
              <button key={rt.id} className="cbtn" onClick={() => { setOpen(rt.id); window.scrollTo({ top: 0 }); }} style={{ textAlign: "left" }}>
                <div style={{ fontSize: 26 }}>{rt.emoji}</div>
                <h3>{rt.title}</h3>
                <p style={{ marginBottom: 10 }}>{rt.goal}</p>
                <div style={{ height: 6, background: "rgba(255,255,255,.07)", borderRadius: 3 }}>
                  <div style={{ height: "100%", width: `${p}%`, background: p === 100 ? GREEN : GOLD, borderRadius: 3, transition: "width .4s" }} />
                </div>
                <p style={{ marginTop: 6, fontSize: 12 }}>{states ? L(`Шагов пройдено: ${n} из ${rt.steps.length}`, `Steps done: ${n} of ${rt.steps.length}`) : L("Загрузка…", "Loading…")}</p>
              </button>
            );
          })}
        </div>
      </div>
    );
  }

  // ---------- Один маршрут ----------
  const rt = ROUTES.find(r => r.id === open);
  const st = states ? states[rt.id] : null;
  const nextIdx = st ? st.findIndex(s => !s.done) : -1;
  const p = pctOf(rt.id);

  return (
    <div>
      <button className="btn btn-o btn-sm" onClick={() => setOpen(null)} style={{ marginBottom: 14 }}>{L("← Все маршруты", "← All routes")}</button>
      <h2 className="st">{rt.emoji} {L(`Маршрут: ${rt.title}`, `Route: ${rt.title}`)}</h2>
      <p className="sb" style={{ marginBottom: 12 }}>{rt.about}</p>
      <div className="tip" style={{ marginTop: 0, marginBottom: 16 }}><b>{rt.goal}</b></div>

      <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13, color: MUTED, marginBottom: 6 }}>
        <span>{L("Пройдено", "Completed")}</span><b style={{ color: p === 100 ? GREEN : GOLD }}>{p}%</b>
      </div>
      <div className="pbar" style={{ marginBottom: 18 }}><div className="pfill" style={{ width: `${p}%` }} /></div>

      {!st ? <div className="empty">{L("Загрузка…", "Loading…")}</div> : (
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {rt.steps.map((s, i) => {
            const done = st[i].done, isNext = i === nextIdx;
            return (
              <div key={i} style={{ display: "flex", gap: 14, padding: "14px 16px", borderRadius: 10, background: CARD,
                border: `1px solid ${done ? "rgba(76,175,136,.35)" : isNext ? GOLD : "rgba(197,155,68,.15)"}` }}>
                <div style={{ width: 32, height: 32, borderRadius: "50%", flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700,
                  background: done ? GREEN : isNext ? GOLD : "rgba(255,255,255,.06)", color: done || isNext ? BG : MUTED }}>{done ? "✓" : i + 1}</div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 14.5, fontWeight: 600, color: TXT, lineHeight: 1.35 }}>
                    {s.title}{isNext && <span style={{ fontSize: 11, color: GOLD, marginLeft: 8, fontWeight: 700 }}>{L("СЛЕДУЮЩИЙ ШАГ", "NEXT STEP")}</span>}
                  </div>
                  <div style={{ fontSize: 13, color: "#c0b8a8", marginTop: 3, lineHeight: 1.5 }}>{s.why}</div>
                  <div style={{ fontSize: 12, color: done ? GREEN : MUTED, marginTop: 5 }}>{st[i].parts.map(x => (x.ok ? "✓ " : "· ") + x.label).join("   ")}</div>
                  {!done && (
                    <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginTop: 8 }}>
                      {s.links.map(pg => <button key={pg} className="btn btn-o btn-sm" onClick={() => onNavigate(pg)}>{PAGE_LABEL[pg]?.() || pg} →</button>)}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
      <div className="tip">{L("Шаги отмечаются по сохранённым результатам. Если вы только что выполнили задание, откройте маршрут заново.", "Steps are ticked based on saved results. If you have just completed a task, open the route again.")}</div>
    </div>
  );
}
