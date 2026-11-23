/**
 * CertifyWise
 * © 2026 Алназирова Айдана (Aidana Alnazirova). Все права защищены.
 * Дата создания: 22 мая 2026 г.
 * Использование без письменного разрешения автора запрещено.
 */

import { useState, useEffect, useMemo } from "react";
import { TKT_MODULES } from "./tktData";
import { CELTA_TASKS, DELTA_TASKS, normTerm } from "./profData";
import { callGemini, shuffle } from "./aiClient";

const GOLD = "#c59b44", MUTED = "#8a7d6d", TXT = "#e8dfd0", GREEN = "#4caf88", RED = "#e74c3c", BG = "#0b1622";
const LETTERS = ["A", "B", "C", "D"];
const pctColor = p => p >= 80 ? GREEN : p >= 60 ? GOLD : RED;

const INFO = {
  TKT: "Экзаменационный формат: выбор из трёх вариантов (A, B, C), соотнесение с одним лишним вариантом, вопросы «что НЕ…». Варианты перемешиваются при каждом прохождении.",
  CELTA: "На CELTA нет теста: оценивают планы уроков, практику преподавания и 4 письменных задания. Здесь — практические задания по этим темам; AI проверяет ответ по критериям и задаёт наводящие вопросы.",
  DELTA: "Delta Module One — письменный экзамен с развёрнутыми ответами: термины, анализ языка, речи ученика, тестов и материалов. Термины проверяются автоматически, остальное — AI по ключу.",
};

// ===================== TKT =====================
function TktModule({ mod, onBack, onSave, studentName }) {
  // порядок вариантов перемешивается один раз при открытии модуля
  const order = useMemo(() => {
    const o = {};
    mod.tasks.forEach(t => t.type === "mcq3" && t.items.forEach(it => { o[it.id] = shuffle(it.opts.map((_, i) => i)); }));
    return o;
  }, [mod]);
  const [ans, setAns] = useState({});
  const [checked, setChecked] = useState(null);
  const all = mod.tasks.flatMap(t => t.items.map(it => ({ ...it, type: t.type })));
  const answered = all.filter(it => ans[it.id] !== undefined).length;

  const check = () => {
    const details = all.map(it => {
      const ok = it.type === "mcq3" ? ans[it.id] === it.answer : ans[it.id] === it.answer;
      const user = ans[it.id] === undefined ? "" : it.type === "mcq3" ? it.opts[ans[it.id]] : ans[it.id];
      const correct = it.type === "mcq3" ? it.opts[it.answer] : it.answer;
      return { question: it.text.replace(/<\/?u>/g, ""), ok, userAnswer: user, correctAnswer: correct };
    });
    const score = details.filter(d => d.ok).length;
    const pct = Math.round((score / details.length) * 100);
    setChecked({ score, total: details.length, pct });
    onSave({ cert: "TKT", mod: `TKT формат · ${mod.title}: ${mod.subtitle}`, score, total: details.length, pct, date: new Date().toISOString(), student: studentName || "Студент", details });
    window.scrollTo({ top: 0 });
  };

  return (
    <div>
      <button className="btn btn-o btn-sm" onClick={onBack} style={{ marginBottom: 14 }}>← Все модули</button>
      <div className="st" style={{ fontSize: 21 }}>TKT {mod.title}</div>
      <div className="sb">{mod.subtitle} · {all.length} вопросов</div>
      {checked && (
        <div className="sdiv">
          <div className="sbig" style={{ color: pctColor(checked.pct) }}>{checked.score}/{checked.total}</div>
          <div style={{ color: MUTED, fontSize: 13, marginTop: 6 }}>{checked.pct}% · пояснения — под каждым вопросом</div>
          <button className="btn btn-o btn-sm" style={{ marginTop: 12 }} onClick={() => { setAns({}); setChecked(null); }}>Пройти заново</button>
        </div>
      )}
      {mod.tasks.map(t => (
        <div key={t.id} className="qcard" style={{ marginBottom: 16 }}>
          <div className="qnum">{t.part}</div>
          <div style={{ fontSize: 14, color: "#c0b8a8", lineHeight: 1.6, marginBottom: 12, fontStyle: "italic" }}>{t.instructions}</div>
          {t.type === "match" && (
            <div style={{ background: BG, borderRadius: 8, padding: "10px 14px", marginBottom: 12, display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(210px,1fr))", gap: "4px 14px" }}>
              {t.options.map(o => <div key={o.letter} style={{ fontSize: 13.5 }}><b style={{ color: GOLD, marginRight: 8 }}>{o.letter}</b>{o.text}</div>)}
            </div>
          )}
          {t.items.map((it, n) => {
            const a = ans[it.id];
            const ok = checked && a === it.answer;
            return (
              <div key={it.id} style={{ padding: "10px 0", borderTop: n ? "1px solid rgba(255,255,255,.05)" : "none" }}>
                <div style={{ fontSize: 14.5, color: TXT, lineHeight: 1.6, marginBottom: 8 }}>
                  <b style={{ color: MUTED, marginRight: 6 }}>{n + 1}</b>
                  <span dangerouslySetInnerHTML={{ __html: it.text.replace(/<u>/g, `<u style="text-decoration-color:${GOLD};text-underline-offset:3px">`) }} />
                </div>
                {t.type === "mcq3" ? (
                  <div>
                    {order[it.id].map((oi, pos) => {
                      let cls = "opt";
                      if (checked) { if (oi === it.answer) cls += " ok"; else if (oi === a) cls += " ng"; }
                      else if (oi === a) cls += " sel";
                      return <button key={oi} className={cls} disabled={!!checked} onClick={() => setAns(s => ({ ...s, [it.id]: oi }))} style={{ padding: "9px 14px", fontSize: 14 }}><b style={{ marginRight: 10 }}>{LETTERS[pos]}</b>{it.opts[oi]}</button>;
                    })}
                  </div>
                ) : (
                  <div style={{ display: "flex", gap: 5 }}>
                    {t.options.map(o => {
                      const on = a === o.letter;
                      const bg = checked ? (o.letter === it.answer ? "rgba(76,175,136,.2)" : on ? "rgba(192,57,43,.2)" : BG) : on ? GOLD : BG;
                      const col = checked ? (o.letter === it.answer ? GREEN : on ? RED : MUTED) : on ? BG : TXT;
                      return <button key={o.letter} disabled={!!checked} onClick={() => setAns(s => ({ ...s, [it.id]: o.letter }))}
                        style={{ flex: "1 1 0", minWidth: 0, maxWidth: 46, height: 38, borderRadius: 7, padding: 0, border: `1px solid ${on || (checked && o.letter === it.answer) ? GOLD : "rgba(255,255,255,.12)"}`, background: bg, color: col, fontWeight: 700, cursor: checked ? "default" : "pointer" }}>{o.letter}</button>;
                    })}
                  </div>
                )}
                {checked && <div className="exp" style={{ marginTop: 8, color: ok ? GREEN : GOLD, borderColor: ok ? GREEN : undefined }}>{ok ? "✓ " : "✗ "}{it.exp}</div>}
              </div>
            );
          })}
        </div>
      ))}
      {!checked && (
        <div className="row" style={{ position: "sticky", bottom: 10, background: "#0b1622ee", padding: "10px 0" }}>
          <button className="btn" onClick={check} disabled={answered === 0}>Проверить</button>
          <span style={{ fontSize: 13, color: MUTED }}>Отвечено {answered} из {all.length}</span>
        </div>
      )}
    </div>
  );
}

// ===================== CELTA / DELTA: задания с AI-проверкой =====================
const sysFor = (track) => `You are an experienced Cambridge ${track === "CELTA" ? "CELTA tutor" : "Delta Module One examiner"}.
Assess a trainee's written answer against the assessment criteria and the reference key.
The key shows the expected content; accept other correct answers, equivalent wording and correct terminology variants. Do not reward length for its own sake.
Score from 0 to 10, where 10 means the answer would fully meet the standard of ${track === "CELTA" ? "a CELTA Pass" : "Delta Module One"}.
For each criterion state whether it is met (yes / partly / no) with a short comment.
The trainee is a future English teacher. Write all feedback in Russian; quote the trainee's English words exactly.
Socratic feedback: for each gap, ask a guiding question that helps the trainee find the missing point. Do not reveal the key in the gap feedback.
Return JSON only:
{"score":0,"criteria":[{"criterion":"","met":"yes|partly|no","comment":""}],"strengths":[""],"gaps":[{"point":"","question":""}],"summary":""}`;

const MET = { yes: ["✓", GREEN], partly: ["◐", GOLD], no: ["✗", RED] };

function AiTask({ task, track, onBack, onSave, onAskAi, studentName }) {
  const storeKey = `cw_p_${task.id}`;
  const [vals, setVals] = useState(() => { try { return JSON.parse(localStorage.getItem(storeKey) || "{}"); } catch { return {}; } });
  const [res, setRes] = useState(null);
  const [loading, setLoading] = useState(false);
  const [secs, setSecs] = useState(0);
  // счётчик секунд — видно, что проверка идёт, а не зависла
  useEffect(() => {
    if (!loading) { setSecs(0); return; }
    const t = setInterval(() => setSecs(s => s + 1), 1000);
    return () => clearInterval(t);
  }, [loading]);
  const [err, setErr] = useState("");
  const [showModel, setShowModel] = useState(false);
  useEffect(() => { try { localStorage.setItem(storeKey, JSON.stringify(vals)); } catch {} }, [vals, storeKey]);
  const filled = task.fields.filter(f => (vals[f.key] || "").trim().length > 10).length;

  const answerText = task.fields.map(f => `${f.label}:\n${(vals[f.key] || "").trim() || "(no answer)"}`).join("\n\n");

  const assess = async () => {
    setLoading(true); setErr("");
    try {
      const r = await callGemini({
        system: sysFor(track),
        parts: [{ text: `TASK:\n${task.scenario}\n\nASSESSMENT CRITERIA:\n${task.criteria.map((c, i) => `${i + 1}. ${c}`).join("\n")}\n\nREFERENCE KEY:\n${task.model}\n\nTRAINEE'S ANSWER:\n${answerText}` }],
      });
      const score = Math.max(0, Math.min(10, Math.round(Number(r.score) || 0)));
      setRes({ ...r, score });
      onSave({
        cert: track, mod: `${track === "CELTA" ? "CELTA практика" : "DELTA M1"}: ${task.title}`,
        score, total: 10, pct: score * 10, date: new Date().toISOString(), student: studentName || "Студент",
        details: [
          ...(r.criteria || []).map(c => ({ question: c.criterion, ok: c.met === "yes", userAnswer: `${c.met} — ${c.comment}`, correctAnswer: "критерий выполнен" })),
          { kind: "text", ok: true, question: "Ответ студента", userAnswer: answerText },
          { kind: "text", ok: true, question: "Обратная связь AI", userAnswer: [
            r.strengths?.length ? `Сильные стороны:\n${r.strengths.map(x => `• ${x}`).join("\n")}` : "",
            r.gaps?.length ? `Чего не хватает:\n${r.gaps.map((g, i) => `${i + 1}. ${g.point}${g.question ? `\n   Вопрос: ${g.question}` : ""}`).join("\n")}` : "",
            r.summary ? `Итог: ${r.summary}` : "",
          ].filter(Boolean).join("\n\n") || "—" },
        ],
      });
    } catch (e) { setErr(e.message); }
    setLoading(false);
  };

  const discuss = () => onAskAi([
    `Помоги мне доработать задание ${track} «${task.title}». AI-оценка: ${res.score}/10.`,
    res.gaps?.[0] ? `Главный пробел: ${res.gaps[0].point}` : "",
    `Задание:\n${task.scenario}`,
    `Мой ответ:\n${answerText}`,
    "Не давай готовый ответ — задавай наводящие вопросы, чтобы я сам(а) нашёл(ла), что добавить.",
  ].filter(Boolean).join("\n"));

  return (
    <div>
      <button className="btn btn-o btn-sm" onClick={onBack} style={{ marginBottom: 14 }}>← Все задания</button>
      <div className="qcard">
        <div className="qnum">{track} · {task.area}</div>
        <div style={{ fontFamily: "Lora, serif", fontSize: 19, color: GOLD, marginBottom: 10 }}>{task.title}</div>
        <div style={{ fontSize: 14.5, lineHeight: 1.75, color: TXT, whiteSpace: "pre-line", marginBottom: 16 }}
          dangerouslySetInnerHTML={{ __html: task.scenario.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/\*\*(.+?)\*\*/g, `<b style="color:${GOLD}">$1</b>`) }} />
        {task.fields.map(f => (
          <div key={f.key} style={{ marginBottom: 12 }}>
            <div style={{ fontSize: 13, color: GOLD, marginBottom: 5 }}>{f.label}</div>
            <textarea rows={f.rows} value={vals[f.key] || ""} disabled={!!res || loading} onChange={e => setVals(v => ({ ...v, [f.key]: e.target.value }))} style={{ lineHeight: 1.6, resize: "vertical" }} />
          </div>
        ))}
        {!res && <button className="btn" onClick={assess} disabled={loading || filled === 0}>{loading ? `AI проверяет… ${secs} с` : "Отправить на проверку"}</button>}
        {err && <div className="exp" style={{ color: RED, borderColor: RED }}>{err}</div>}
      </div>

      {res && (
        <div style={{ marginTop: 18 }}>
          <div className="sdiv">
            <div style={{ fontSize: 13, color: MUTED, marginBottom: 6 }}>AI-оценка</div>
            <div className="sbig" style={{ color: pctColor(res.score * 10) }}>{res.score}/10</div>
            {res.summary && <div style={{ fontSize: 13.5, color: "#c0b8a8", marginTop: 10, lineHeight: 1.6 }}>{res.summary}</div>}
          </div>
          <div className="card" style={{ marginBottom: 14 }}>
            <h3>Критерии</h3>
            {(res.criteria || []).map((c, i) => {
              const [ic, col] = MET[c.met] || MET.partly;
              return (
                <div key={i} style={{ display: "flex", gap: 10, margin: "10px 0" }}>
                  <b style={{ color: col, fontSize: 16, lineHeight: "20px" }}>{ic}</b>
                  <div><div style={{ fontSize: 13.5, color: TXT }}>{c.criterion}</div><div style={{ fontSize: 13, color: "#c0b8a8", lineHeight: 1.6 }}>{c.comment}</div></div>
                </div>
              );
            })}
          </div>
          {res.strengths?.length > 0 && (
            <div className="card" style={{ marginBottom: 14 }}>
              <h3>Что получилось</h3>
              <ul style={{ margin: "4px 0 0 18px", fontSize: 13.5, lineHeight: 1.7, color: "#c0b8a8" }}>{res.strengths.map((s, i) => <li key={i}>{s}</li>)}</ul>
            </div>
          )}
          {res.gaps?.length > 0 && (
            <div className="card" style={{ marginBottom: 14 }}>
              <h3>Чего не хватает</h3>
              {res.gaps.map((g, i) => (
                <div key={i} style={{ borderLeft: `3px solid ${GOLD}`, paddingLeft: 12, margin: "12px 0" }}>
                  <div style={{ fontSize: 13.5, color: "#c0b8a8" }}>{g.point}</div>
                  <div style={{ fontSize: 13.5, color: GOLD, marginTop: 4 }}>❓ {g.question}</div>
                </div>
              ))}
            </div>
          )}
          <div className="row" style={{ flexWrap: "wrap", marginBottom: 14 }}>
            <button className="btn" onClick={discuss}>🤖 Разобрать с AI</button>
            <button className="btn btn-o" onClick={() => setRes(null)}>Доработать ответ</button>
            <button className="btn btn-o" onClick={() => setShowModel(s => !s)}>{showModel ? "Скрыть образец" : "Показать образец"}</button>
          </div>
          {showModel && <div className="card" style={{ whiteSpace: "pre-line", fontSize: 13.5, lineHeight: 1.7, color: "#c0b8a8" }}><h3>Образец ответа</h3>{task.model}</div>}
        </div>
      )}
    </div>
  );
}

function OrderTask({ task, onBack, onSave, studentName }) {
  const [seq, setSeq] = useState(() => { let s; do { s = shuffle(task.stages.map((_, i) => i)); } while (s.every((v, i) => v === i)); return s; });
  const [checked, setChecked] = useState(null);
  const move = (i, d) => { if (checked) return; const j = i + d; if (j < 0 || j >= seq.length) return; const s = [...seq]; [s[i], s[j]] = [s[j], s[i]]; setSeq(s); };
  const check = () => {
    const score = seq.filter((v, i) => v === i).length;
    setChecked(score);
    onSave({
      cert: "CELTA", mod: `CELTA практика: ${task.title}`, score, total: seq.length, pct: Math.round((score / seq.length) * 100),
      date: new Date().toISOString(), student: studentName || "Студент",
      details: seq.map((v, i) => ({ question: `Этап ${i + 1}`, ok: v === i, userAnswer: task.stages[v].split(":")[0], correctAnswer: task.stages[i].split(":")[0] })),
    });
  };
  return (
    <div>
      <button className="btn btn-o btn-sm" onClick={onBack} style={{ marginBottom: 14 }}>← Все задания</button>
      <div className="qcard">
        <div className="qnum">CELTA · {task.area}</div>
        <div style={{ fontFamily: "Lora, serif", fontSize: 19, color: GOLD, marginBottom: 10 }}>{task.title}</div>
        <div style={{ fontSize: 14.5, color: TXT, lineHeight: 1.7, marginBottom: 14 }}>{task.scenario}</div>
        {seq.map((v, i) => {
          const ok = checked !== null && v === i;
          return (
            <div key={v} style={{ display: "flex", gap: 8, alignItems: "center", marginBottom: 8, background: BG, border: `1px solid ${checked === null ? "rgba(255,255,255,.09)" : ok ? GREEN : RED}`, borderRadius: 8, padding: "8px 10px" }}>
              <b style={{ color: GOLD, width: 18 }}>{i + 1}</b>
              <div style={{ flex: 1, fontSize: 13.5, color: TXT, lineHeight: 1.5 }}>{task.stages[v].replace(/^[^:]+:\s*/, "")}</div>
              {checked === null && (
                <div style={{ display: "flex", flexDirection: "column", gap: 3 }}>
                  <button className="btn btn-o btn-sm" style={{ padding: "2px 9px" }} onClick={() => move(i, -1)} disabled={i === 0}>▲</button>
                  <button className="btn btn-o btn-sm" style={{ padding: "2px 9px" }} onClick={() => move(i, 1)} disabled={i === seq.length - 1}>▼</button>
                </div>
              )}
            </div>
          );
        })}
        {checked === null
          ? <button className="btn" onClick={check} style={{ marginTop: 6 }}>Проверить</button>
          : (
            <div className="exp">
              <b>{checked} из {seq.length} на своих местах.</b> Правильный порядок:
              <ol style={{ margin: "6px 0 6px 18px" }}>{task.stages.map((s, i) => <li key={i}>{s.split(":")[0]}</li>)}</ol>
              {task.exp}
              <div><button className="btn btn-o btn-sm" style={{ marginTop: 10 }} onClick={() => { setChecked(null); setSeq(shuffle(task.stages.map((_, i) => i))); }}>Ещё раз</button></div>
            </div>
          )}
      </div>
    </div>
  );
}

function TermsTask({ task, onBack, onSave, studentName }) {
  const [vals, setVals] = useState({});
  const [checked, setChecked] = useState(false);
  const isOk = it => it.accept.map(normTerm).includes(normTerm(vals[it.id]));
  const check = () => {
    const details = task.items.map(it => ({ question: it.def, ok: isOk(it), userAnswer: vals[it.id] || "", correctAnswer: it.accept[0] }));
    const score = details.filter(d => d.ok).length;
    setChecked(true);
    onSave({ cert: "DELTA", mod: `DELTA M1: ${task.title}`, score, total: details.length, pct: Math.round((score / details.length) * 100), date: new Date().toISOString(), student: studentName || "Студент", details });
  };
  const score = checked ? task.items.filter(isOk).length : 0;
  return (
    <div>
      <button className="btn btn-o btn-sm" onClick={onBack} style={{ marginBottom: 14 }}>← Все задания</button>
      <div className="qcard">
        <div className="qnum">DELTA · {task.area}</div>
        <div style={{ fontFamily: "Lora, serif", fontSize: 19, color: GOLD, marginBottom: 10 }}>{task.title}</div>
        <div style={{ fontSize: 14, color: "#c0b8a8", marginBottom: 14, fontStyle: "italic" }}>{task.scenario}</div>
        {task.items.map((it, n) => (
          <div key={it.id} style={{ marginBottom: 14 }}>
            <div style={{ fontSize: 14, color: TXT, lineHeight: 1.6, marginBottom: 6 }}><b style={{ color: MUTED, marginRight: 6 }}>{n + 1}</b>{it.def}</div>
            <input type="text" value={vals[it.id] || ""} disabled={checked} onChange={e => setVals(v => ({ ...v, [it.id]: e.target.value }))} autoCapitalize="none" autoCorrect="off" spellCheck={false}
              style={checked ? { borderColor: isOk(it) ? GREEN : RED } : undefined} />
            {checked && !isOk(it) && <div style={{ fontSize: 13, color: GREEN, marginTop: 4 }}>Ответ: {it.accept[0]}</div>}
          </div>
        ))}
        {!checked
          ? <button className="btn" onClick={check}>Проверить</button>
          : <div className="row" style={{ flexWrap: "wrap" }}><b style={{ color: pctColor((score / task.items.length) * 100) }}>{score} из {task.items.length}</b><button className="btn btn-o btn-sm" onClick={() => { setVals({}); setChecked(false); }}>Ещё раз</button></div>}
      </div>
    </div>
  );
}

// ===================== Страница =====================
export default function ProfPage({ studentName, onSaveResult, onAskAi }) {
  const [track, setTrack] = useState("TKT");
  const [open, setOpen] = useState(null);
  const tasks = track === "CELTA" ? CELTA_TASKS : DELTA_TASKS;
  const back = () => { setOpen(null); window.scrollTo({ top: 0 }); };
  const go = (x) => { setOpen(x); window.scrollTo({ top: 0 }); };
  const props = { onBack: back, onSave: onSaveResult, onAskAi, studentName };

  if (open) {
    if (track === "TKT") return <TktModule mod={open} {...props} />;
    if (open.type === "order") return <OrderTask task={open} {...props} />;
    if (open.type === "terms") return <TermsTask task={open} {...props} />;
    return <AiTask key={open.id} task={open} track={track} {...props} />;
  }

  return (
    <div>
      <div className="st">🎓 TKT · CELTA · DELTA</div>
      <div className="sb">Задания в формате самих сертификаций.</div>
      <div className="tabs">
        {["TKT", "CELTA", "DELTA"].map(t => <button key={t} className={`tab${track === t ? " on" : ""}`} onClick={() => setTrack(t)}>{t}</button>)}
      </div>
      <div className="tip" style={{ marginTop: 0, marginBottom: 16 }}>{INFO[track]}</div>
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        {track === "TKT"
          ? TKT_MODULES.map(m => (
            <button key={m.id} className="cbtn" onClick={() => go(m)}>
              <div style={{ fontSize: 11.5, color: MUTED, textTransform: "uppercase" }}>{m.tasks.reduce((s, t) => s + t.items.length, 0)} вопросов · {m.tasks.length} заданий</div>
              <h3 style={{ fontSize: 18 }}>{m.title}</h3>
              <p>{m.subtitle}</p>
            </button>
          ))
          : tasks.map(t => (
            <button key={t.id} className="cbtn" onClick={() => go(t)}>
              <div style={{ fontSize: 11.5, color: MUTED, textTransform: "uppercase" }}>{t.area} · {t.type === "ai" ? "проверка AI" : "автопроверка"}</div>
              <h3 style={{ fontSize: 17 }}>{t.title}</h3>
            </button>
          ))}
      </div>
    </div>
  );
}
