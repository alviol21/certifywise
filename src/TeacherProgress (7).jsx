/**
 * CertifyWise
 * © 2026 Альназирова Айдана (Aidana Alnazirova). Все права защищены.
 * Дата создания: 22 мая 2026 г.
 * Использование без письменного разрешения автора запрещено.
 *
 * Панель учителя: две отдельные вкладки.
 *  • «Уроки» — обучающий модуль из 12 уроков: пре- и пост-диагностика, карта прохождения, показатели каждого урока.
 *  • «Разделы и тесты» — Reading, Listening, Writing, Speaking, TKT, CELTA, DELTA и старые тесты.
 */

import { T, TT, LOCALE, IS_EN } from "./i18n";
import { LESSONS } from "./lessonsData";
import { useState, useMemo } from "react";

const GOLD = "#c59b44", GREEN = "#4caf88", RED = "#e74c3c", TXT = "#e8dfd0", MUTED = "#8a7d6d";
const pctColor = p => (p >= 80 ? GREEN : p >= 60 ? GOLD : RED);
const avg = rows => (rows.length ? Math.round(rows.reduce((a, r) => a + r.pct, 0) / rows.length) : null);

export const isLessonRow = r => (r.mod || "").startsWith("Урок ");
const lessonNo = r => { const m = /^Урок (\d+)/.exec(r.mod || ""); return m ? +m[1] : null; };
// В базе название урока хранится по-русски; в английской версии показываем английское название по номеру
const lessonTitle = r => {
  if (IS_EN) { const l = LESSONS.find(x => x.n === lessonNo(r)); if (l) return l.title; }
  return (r.mod || "").replace(/^Урок \d+:\s*/, "");
};

// Раздел определяется по названию модуля, которое сохраняется вместе с результатом
export const sectionOf = r => {
  const m = r.mod || "";
  if (m.startsWith("Урок ")) return "Уроки";
  if (m.startsWith("Listening")) return "Listening";
  if (m.startsWith("Reading") || m.startsWith("Техники чтения")) return "Reading";
  if (m.startsWith("Writing")) return "Writing";
  if (m.startsWith("Speaking")) return "Speaking";
  if (m.startsWith("TKT формат")) return "TKT";
  if (m.startsWith("CELTA практика")) return "CELTA";
  if (m.startsWith("DELTA M1")) return "DELTA";
  return "Тесты";
};
// Экзамен, к которому относится раздел, — чтобы в таблице было сразу видно, IELTS это или TKT/CELTA/DELTA
const EXAM_OF = { Reading: "IELTS", Listening: "IELTS", Writing: "IELTS", Speaking: "IELTS", TKT: "TKT", CELTA: "CELTA", DELTA: "DELTA" };
const SECTIONS = ["Reading", "Listening", "Writing", "Speaking", "TKT", "CELTA", "DELTA", "Тесты"];
const keyOf = r => r.uid || r.student;
// Тестовый аккаунт автора — не входит в данные эксперимента
const isTestAccount = r => (r.student || "").trim().toLowerCase() === "aka";
// Служебная строка урока: уверенность, уровни AI-практики, реплики, время, баллы по частям
const metaOf = r => (Array.isArray(r.details) ? r.details.find(x => x && x.kind === "meta") : null) || {};
// «2 из 5», а не «2/5»: Excel превращает дроби в даты
const part = (a, b) => (b ? TT("{0} из {1}", a, b) : "");
// Строки AI-оценки (критерии CELTA/DELTA, баллы Writing/Speaking) — это не «ответ студента», а вердикт AI
const isAiCriterion = d => d.correctAnswer === "критерий выполнен" || d.correctAnswer === "Band 7+";
const aiVerdict = v => String(v || "—").replace(/^yes\b/, T("да")).replace(/^partly\b/, T("частично")).replace(/^no\b/, T("нет"));
const isAnswer = x => x && x.kind !== "text" && x.kind !== "meta";
const fmtDate = d => new Date(d).toLocaleDateString(LOCALE);
const box = { background: "#12253b", border: "1px solid rgba(197,155,68,.14)", borderRadius: 10, padding: "14px 18px", textAlign: "center" };
const linkBtn = { background: "none", border: "none", padding: 0, color: TXT, cursor: "pointer", font: "inherit", textDecoration: "underline", textDecorationColor: "rgba(197,155,68,.5)", textAlign: "left" };

function saveCsv(name, head, lines) {
  const esc = v => `"${String(v ?? "").replace(/"/g, '""')}"`;
  // BOM + «;» — чтобы Excel открыл кириллицу и столбцы без настройки
  const blob = new Blob(["﻿" + [head, ...lines].map(row => row.map(esc).join(";")).join("\r\n")], { type: "text/csv;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url; a.download = `${name}-${new Date().toISOString().slice(0, 10)}.csv`;
  document.body.appendChild(a); a.click(); a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

function downloadSectionsCsv(rows) {
  const head = [T("Студент"), T("Экзамен"), T("Раздел"), T("Модуль"), T("Верно"), T("Всего"), "%", T("Ошибок"), T("Дата"), T("Время")];
  saveCsv("certifywise-razdely", head, rows.map(r => {
    const d = new Date(r.date), s = sectionOf(r);
    const errors = Array.isArray(r.details) ? r.details.filter(x => isAnswer(x) && !x.ok).length : "";
    return [r.student, EXAM_OF[s] || r.cert, s, r.mod, r.score, r.total, r.pct, errors, d.toLocaleDateString(LOCALE), d.toLocaleTimeString(LOCALE, { hour: "2-digit", minute: "2-digit" })];
  }));
}

function downloadLessonsCsv(rows) {
  // номер попытки: считаем по студенту и уроку в хронологическом порядке
  const sorted = [...rows].sort((a, b) => new Date(a.date) - new Date(b.date));
  const cnt = {};
  const attemptOf = new Map(sorted.map(r => { const k = `${keyOf(r)}|${lessonNo(r)}`; cnt[k] = (cnt[k] || 0) + 1; return [r, cnt[k]]; }));
  const head = [T("Студент"), T("Урок №"), T("Урок"), T("Попытка"), T("Балл"), T("Всего"), "%", T("Проверка / диагностика"), T("TKT-формат"), T("DELTA-термины"), T("Повторение"),
    T("Уверенность до"), T("Уверенность после"), T("Изменение уверенности"), T("Уровни AI"), T("Реплик AI всего"), T("Реплик TKT"), T("Реплик CELTA"), T("Реплик DELTA"), T("Образец открыт"), T("Минут"), T("Дата"), T("Время")];
  saveCsv("certifywise-uroki", head, sorted.map(r => {
    const d = new Date(r.date), mt = metaOf(r), by = mt.aiTurnsByLevel || {};
    const delta = mt.confBefore && mt.confAfter ? mt.confAfter - mt.confBefore : "";
    return [r.student, lessonNo(r), lessonTitle(r), attemptOf.get(r), r.score, r.total, r.pct,
      part(mt.checkScore, mt.checkTotal), part(mt.examScore, mt.examTotal), part(mt.termScore, mt.termTotal), part(mt.reviewScore, mt.reviewTotal),
      mt.confBefore ?? "", mt.confAfter ?? "", delta, mt.levelsTried || mt.level || "", mt.aiTurns ?? "", by.TKT ?? "", by.CELTA ?? "", by.DELTA ?? "",
      mt.modelViewed === undefined ? "" : mt.modelViewed ? T("да") : T("нет"), mt.minutes ?? "", d.toLocaleDateString(LOCALE), d.toLocaleTimeString(LOCALE, { hour: "2-digit", minute: "2-digit" })];
  }));
}

// ===================== Раскрытые подробности попытки =====================
function Details({ r, colSpan }) {
  const errs = r.details.filter(d => isAnswer(d) && !d.ok);
  const texts = r.details.filter(d => d.kind === "text");
  return (
    <tr>
      <td colSpan={colSpan} style={{ background: "#0e1d30", padding: 16 }}>
        {errs.length === 0 ? (
          <div style={{ fontSize: 13, color: GREEN }}>{T("✓ Ошибок нет.")}</div>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {errs.map((d, di) => (
              <div key={di} style={{ borderLeft: `3px solid ${RED}`, paddingLeft: 12 }}>
                <div style={{ fontSize: 13, color: TXT, marginBottom: 4 }}>{d.question}</div>
                {isAiCriterion(d) ? (
                  <>
                    <div style={{ fontSize: 12.5, color: RED }}>{T("Оценка AI:")}{" "}{aiVerdict(d.userAnswer)}</div>
                    <div style={{ fontSize: 12.5, color: GREEN }}>{T("Требуется:")}{" "}{d.correctAnswer === "Band 7+" ? T("Band 7 и выше") : T("критерий выполнен полностью")}</div>
                  </>
                ) : (
                  <>
                    <div style={{ fontSize: 12.5, color: RED }}>{T("Ответ студента:")}{" "}{d.userAnswer !== undefined && d.userAnswer !== "" ? String(d.userAnswer) : T("— (не отвечено)")}</div>
                    <div style={{ fontSize: 12.5, color: GREEN }}>{T("Правильный ответ:")}{" "}{String(d.correctAnswer)}</div>
                  </>
                )}
              </div>
            ))}
          </div>
        )}
        {texts.map((d, di) => (
          <div key={`t${di}`} style={{ marginTop: 12, borderLeft: `3px solid ${GOLD}`, paddingLeft: 12 }}>
            <div style={{ fontSize: 13, color: GOLD, marginBottom: 4 }}>{d.question}</div>
            <div style={{ fontSize: 13, color: TXT, whiteSpace: "pre-wrap", lineHeight: 1.6 }}>{d.userAnswer}</div>
          </div>
        ))}
      </td>
    </tr>
  );
}

const StudentSelect = ({ students, value, onChange }) => (
  <select value={value} onChange={e => onChange(e.target.value)} style={{ width: "auto", flex: "1 1 180px" }} aria-label={T("Студент")}>
    <option value="all">{T("Все студенты (")}{students.length})</option>
    {students.map(([k, n]) => <option key={k} value={k}>{n}</option>)}
  </select>
);
const studentsOf = rows => {
  const m = new Map();
  rows.forEach(r => { if (!m.has(keyOf(r))) m.set(keyOf(r), r.student); });
  return [...m.entries()].sort((a, b) => a[1].localeCompare(b[1], LOCALE));
};

// ===================== Вкладка «Уроки» =====================
function LessonsTab({ rows: allRows }) {
  const [hideTest, setHideTest] = useState(true);
  const [student, setStudent] = useState("all");
  const [openRow, setOpenRow] = useState(null);
  const [shown, setShown] = useState(100);
  const rows = hideTest ? allRows.filter(r => !isTestAccount(r)) : allRows;
  const students = useMemo(() => studentsOf(rows), [rows]);
  const filtered = student === "all" ? rows : rows.filter(r => keyOf(r) === student);
  const pick = k => { setStudent(k); setOpenRow(null); setShown(100); };

  // По каждому студенту: лучший % по урокам, первая попытка уроков 1 и 12 (пре- и пост-тест), рост уверенности
  const perStudent = useMemo(() => students.map(([k, name]) => {
    const mine = rows.filter(r => keyOf(r) === k);
    const best = {};
    mine.forEach(r => { const n = lessonNo(r); if (n) best[n] = Math.max(best[n] ?? 0, r.pct); });
    const first = n => mine.filter(r => lessonNo(r) === n).sort((a, b) => new Date(a.date) - new Date(b.date))[0];
    const pre = first(1), post = first(12);
    const conf = mine.map(metaOf).filter(m => m.confBefore && m.confAfter);
    const confGain = conf.length ? +(conf.reduce((s, m) => s + (m.confAfter - m.confBefore), 0) / conf.length).toFixed(1) : null;
    return { k, name, best, done: Object.keys(best).length, pre: pre?.pct ?? null, post: post?.pct ?? null, confGain };
  }), [students, rows]);

  const withBoth = perStudent.filter(s => s.pre !== null && s.post !== null);
  const avgOf = a => (a.length ? Math.round(a.reduce((s, x) => s + x, 0) / a.length) : null);
  const preAvg = avgOf(withBoth.map(s => s.pre)), postAvg = avgOf(withBoth.map(s => s.post));
  const confAll = perStudent.filter(s => s.confGain !== null);
  const confAvg = confAll.length ? (confAll.reduce((s, x) => s + x.confGain, 0) / confAll.length).toFixed(1) : null;

  if (allRows.length === 0) return <div className="empty">{T("Студенты ещё не проходили уроки.")}</div>;

  return (
    <>
      <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginBottom: 12, alignItems: "center" }}>
        <StudentSelect students={students} value={student} onChange={pick} />
        <button className="btn btn-o btn-sm" disabled={filtered.length === 0} onClick={() => downloadLessonsCsv(filtered)}>{T("⬇️ CSV уроков (")}{filtered.length})</button>
      </div>
      <label style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 13, color: MUTED, marginBottom: 16, cursor: "pointer" }}>
        <input type="checkbox" checked={hideTest} onChange={e => { setHideTest(e.target.checked); pick("all"); }} />
        {T("Не учитывать тестовый аккаунт Aka")}
      </label>

      <div className="g3" style={{ marginBottom: 18 }}>
        {[
          [T("Студентов начали модуль"), students.length],
          [T("Входная → итоговая"), preAvg === null ? "—" : `${preAvg}% → ${postAvg}%`],
          [T("Рост уверенности за урок"), confAvg === null ? "—" : `${confAvg > 0 ? "+" : ""}${confAvg}`],
        ].map(([l, v]) => (
          <div key={l} style={box}><div style={{ fontFamily: "Lora,serif", fontSize: 24, color: GOLD }}>{v}</div><div style={{ fontSize: 12, color: MUTED, marginTop: 3 }}>{l}</div></div>
        ))}
      </div>
      {preAvg !== null && <div style={{ fontSize: 12, color: MUTED, marginTop: -8, marginBottom: 16 }}>{T("Пре- и пост-тест считаются по первой попытке уроков 1 и 12, только у студентов, прошедших оба (")}{withBoth.length}).</div>}

      {/* Карта прохождения: студенты × 12 уроков */}
      <h3 style={{ fontFamily: "Lora,serif", fontSize: 18, color: TXT, margin: "4px 0 10px" }}>{T("Карта прохождения")}</h3>
      <div style={{ overflowX: "auto", marginBottom: 22 }}>
        <table style={{ fontSize: 12 }}>
          <thead>
            <tr>
              <th>{T("Студент")}</th>
              {Array.from({ length: 12 }, (_, i) => <th key={i} style={{ textAlign: "center", padding: "8px 6px" }}>{i + 1}</th>)}
              <th style={{ textAlign: "center" }}>{T("Пре")}</th><th style={{ textAlign: "center" }}>{T("Пост")}</th><th style={{ textAlign: "center" }}>{T("Уверенность")}</th>
            </tr>
          </thead>
          <tbody>
            {perStudent.map(s => (
              <tr key={s.k} style={{ background: student === s.k ? "rgba(197,155,68,.08)" : undefined }}>
                <td style={{ whiteSpace: "nowrap" }}><button onClick={() => pick(student === s.k ? "all" : s.k)} style={linkBtn}>{s.name}</button> <span style={{ color: MUTED }}>({s.done}/12)</span></td>
                {Array.from({ length: 12 }, (_, i) => {
                  const v = s.best[i + 1];
                  return <td key={i} style={{ textAlign: "center", padding: "8px 6px", color: v === undefined ? "#3a4555" : pctColor(v), fontWeight: 600 }}>{v === undefined ? "·" : v}</td>;
                })}
                <td style={{ textAlign: "center" }}>{s.pre === null ? "—" : <b style={{ color: pctColor(s.pre) }}>{s.pre}%</b>}</td>
                <td style={{ textAlign: "center" }}>{s.post === null ? "—" : <b style={{ color: pctColor(s.post) }}>{s.post}%</b>}</td>
                <td style={{ textAlign: "center", color: s.confGain === null ? MUTED : s.confGain >= 0 ? GREEN : RED }}>{s.confGain === null ? "—" : `${s.confGain > 0 ? "+" : ""}${s.confGain}`}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Все попытки уроков */}
      <h3 style={{ fontFamily: "Lora,serif", fontSize: 18, color: TXT, margin: "4px 0 10px" }}>{T("Попытки")}{student !== "all" ? ` — ${filtered[0]?.student || ""}` : ""}</h3>
      {filtered.length === 0 ? <div className="empty">{T("Попыток нет.")}</div> : (
        <div style={{ overflowX: "auto" }}>
          <table>
            <thead><tr><th>{T("Студент")}</th><th>{T("Урок")}</th><th>%</th><th>{T("Части")}</th><th>{T("Уверенность")}</th><th>{T("AI-практика")}</th><th>{T("Мин")}</th><th>{T("Дата")}</th><th></th></tr></thead>
            <tbody>
              {filtered.slice(0, shown).flatMap((r, i) => {
                const mt = metaOf(r), by = mt.aiTurnsByLevel || {};
                const parts = [
                  mt.checkTotal ? `${lessonNo(r) === 1 || lessonNo(r) === 12 ? T("Диагн.") : T("Пониман.")} ${mt.checkScore}/${mt.checkTotal}` : "",
                  mt.examTotal ? `TKT ${mt.examScore}/${mt.examTotal}` : "",
                  mt.termTotal ? `DELTA ${mt.termScore}/${mt.termTotal}` : "",
                  mt.reviewTotal ? TT("Повт. {0}/{1}", mt.reviewScore, mt.reviewTotal) : "",
                ].filter(Boolean);
                const ai = Object.keys(by).length ? Object.entries(by).map(([lv, n]) => `${lv} ${n}`).join(" · ") : (mt.level ? `${mt.level} ${mt.aiTurns ?? 0}` : "—");
                const out = [
                  <tr key={i}>
                    <td>{student === "all" ? <button onClick={() => pick(keyOf(r))} style={linkBtn}>{r.student}</button> : r.student}</td>
                    <td style={{ fontSize: 12.5 }}><b style={{ color: GOLD }}>{lessonNo(r)}</b> <span style={{ color: MUTED }}>{lessonTitle(r)}</span></td>
                    <td><b style={{ color: pctColor(r.pct) }}>{r.pct}%</b></td>
                    <td style={{ fontSize: 11.5, color: MUTED, lineHeight: 1.5 }}>{parts.map(p => <div key={p}>{p}</div>)}</td>
                    <td style={{ fontSize: 12.5, whiteSpace: "nowrap" }}>{mt.confBefore ? `${mt.confBefore} → ${mt.confAfter || "—"}` : "—"}</td>
                    <td style={{ fontSize: 12, color: MUTED }}>{ai}{mt.modelViewed ? <div style={{ fontSize: 11 }}>{T("образец открыт")}</div> : null}</td>
                    <td style={{ fontSize: 12.5 }}>{mt.minutes ?? "—"}</td>
                    <td style={{ fontSize: 12, color: "#4a5560" }}>{fmtDate(r.date)}</td>
                    <td>{Array.isArray(r.details) && r.details.length > 0 && (
                      <button className="btn btn-o btn-sm" onClick={() => setOpenRow(openRow === i ? null : i)}>{openRow === i ? T("Скрыть") : T("Подробнее")}</button>
                    )}</td>
                  </tr>,
                ];
                if (openRow === i) out.push(<Details key={`${i}-d`} r={r} colSpan={9} />);
                return out;
              })}
            </tbody>
          </table>
          {filtered.length > shown && (
            <div style={{ textAlign: "center", marginTop: 14 }}>
              <button className="btn btn-o btn-sm" onClick={() => setShown(s => s + 100)}>{T("Показать ещё (")}{filtered.length - shown})</button>
            </div>
          )}
        </div>
      )}
    </>
  );
}

// ===================== Вкладка «Разделы и тесты» =====================
function SectionsTab({ results }) {
  const [section, setSection] = useState("all");
  const [student, setStudent] = useState("all");
  const [openRow, setOpenRow] = useState(null);
  const [shown, setShown] = useState(100);

  const students = useMemo(() => studentsOf(results), [results]);
  const ofStudent = student === "all" ? results : results.filter(r => keyOf(r) === student);
  const filtered = section === "all" ? ofStudent : ofStudent.filter(r => sectionOf(r) === section);
  const reset = fn => v => { fn(v); setOpenRow(null); setShown(100); };
  const pickSection = reset(setSection), pickStudent = reset(setStudent);

  // Карточка студента: считается по всем его результатам, независимо от фильтра раздела
  const card = useMemo(() => {
    if (student === "all" || ofStudent.length === 0) return null;
    const byMod = {};
    ofStudent.forEach(r => { (byMod[r.mod] = byMod[r.mod] || []).push(r); });
    const mods = Object.entries(byMod).map(([mod, rows]) => ({ mod, n: rows.length, avg: avg(rows), best: Math.max(...rows.map(r => r.pct)) }));
    return {
      name: ofStudent[0].student,
      attempts: ofStudent.length,
      avg: avg(ofStudent),
      last: ofStudent.reduce((a, r) => (new Date(r.date) > new Date(a) ? r.date : a), ofStudent[0].date),
      sections: SECTIONS.map(s => { const rows = ofStudent.filter(r => sectionOf(r) === s); return { s, n: rows.length, avg: avg(rows) }; }),
      weak: mods.filter(m => m.avg < 60).sort((a, b) => a.avg - b.avg).slice(0, 5),
      modsDone: mods.length,
    };
  }, [student, ofStudent]);

  if (results.length === 0) return <div className="empty">{T("Студенты ещё не проходили разделы и тесты.")}</div>;

  return (
    <>
      <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginBottom: 16, alignItems: "center" }}>
        <select value={section} onChange={e => pickSection(e.target.value)} style={{ width: "auto", flex: "1 1 150px" }} aria-label={T("Раздел")}>
          <option value="all">{T("Все разделы")}</option>
          <optgroup label="IELTS">{["Reading", "Listening", "Writing", "Speaking"].map(s => <option key={s} value={s}>IELTS · {s}</option>)}</optgroup>
          <optgroup label={T("Сертификаты учителя")}>{["TKT", "CELTA", "DELTA"].map(s => <option key={s} value={s}>{s}</option>)}</optgroup>
          <option value="Тесты">{T("Разминка")}</option>
        </select>
        <StudentSelect students={students} value={student} onChange={pickStudent} />
        <button className="btn btn-o btn-sm" disabled={filtered.length === 0} onClick={() => downloadSectionsCsv(filtered)}>{T("⬇️ Скачать CSV (")}{filtered.length})</button>
      </div>

      {card && (
        <div className="card" style={{ marginBottom: 18, padding: 18 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", flexWrap: "wrap", gap: 8, marginBottom: 12 }}>
            <h3 style={{ margin: 0 }}>👤 {card.name}</h3>
            <span style={{ fontSize: 12, color: MUTED }}>{T("Последняя активность:")}{" "}{new Date(card.last).toLocaleString(LOCALE, { day: "2-digit", month: "2-digit", year: "numeric", hour: "2-digit", minute: "2-digit" })}</span>
          </div>
          <div className="g3" style={{ marginBottom: 14 }}>
            {[[T("Попыток"), card.attempts], [T("Средний балл"), card.avg + "%"], [T("Заданий пройдено"), card.modsDone]].map(([l, v]) => (
              <div key={l} style={box}><div style={{ fontFamily: "Lora,serif", fontSize: 26, color: GOLD }}>{v}</div><div style={{ fontSize: 12, color: MUTED, marginTop: 3 }}>{l}</div></div>
            ))}
          </div>
          <div style={{ overflowX: "auto", marginBottom: card.weak.length ? 14 : 0 }}>
            <table>
              <thead><tr><th>{T("Экзамен")}</th><th>{T("Раздел")}</th><th>{T("Попыток")}</th><th>{T("Средний %")}</th></tr></thead>
              <tbody>
                {card.sections.map(x => (
                  <tr key={x.s}>
                    <td style={{ color: MUTED }}>{EXAM_OF[x.s] || "—"}</td><td>{x.s === "Тесты" ? T("Разминка") : T(x.s)}</td><td>{x.n}</td>
                    <td>{x.avg === null ? <span style={{ color: MUTED }}>—</span> : <b style={{ color: pctColor(x.avg) }}>{x.avg}%</b>}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {card.weak.length > 0 && (
            <>
              <div style={{ fontSize: 13, fontWeight: 600, color: RED, marginBottom: 6 }}>{T("Слабые места (средний балл ниже 60%)")}</div>
              {card.weak.map(w => (
                <div key={w.mod} style={{ fontSize: 13, color: "#c0b8a8", lineHeight: 1.8 }}>
                  <b style={{ color: pctColor(w.avg) }}>{w.avg}%</b> · {w.mod} <span style={{ color: MUTED }}>{T("(попыток:")}{" "}{w.n}{T(", лучший:")}{" "}{w.best}%)</span>
                </div>
              ))}
            </>
          )}
        </div>
      )}

      <div className="g3" style={{ marginBottom: 22 }}>
        {[[T("Попыток"), filtered.length], [T("Средний балл"), filtered.length ? avg(filtered) + "%" : "—"], [T("Студентов"), new Set(filtered.map(keyOf)).size]].map(([l, v]) => (
          <div key={l} style={box}><div style={{ fontFamily: "Lora,serif", fontSize: 30, color: GOLD }}>{v}</div><div style={{ fontSize: 12, color: MUTED, marginTop: 3 }}>{l}</div></div>
        ))}
      </div>

      {filtered.length === 0 ? (
        <div className="empty">{T("По этому фильтру результатов нет.")}</div>
      ) : (
        <div style={{ overflowX: "auto" }}>
          <table>
            <thead><tr><th>{T("Студент")}</th><th>{T("Экзамен · раздел")}</th><th>{T("Модуль")}</th><th>{T("Результат")}</th><th>%</th><th>{T("Дата")}</th><th></th></tr></thead>
            <tbody>
              {filtered.slice(0, shown).flatMap((r, i) => {
                const s = sectionOf(r);
                const errs = Array.isArray(r.details) ? r.details.filter(d => isAnswer(d) && !d.ok) : null;
                const texts = Array.isArray(r.details) ? r.details.filter(d => d.kind === "text") : [];
                const out = [
                  <tr key={i}>
                    <td>{student === "all" ? <button onClick={() => pickStudent(keyOf(r))} title={T("Открыть карточку студента")} style={linkBtn}>{r.student}</button> : r.student}</td>
                    <td style={{ whiteSpace: "nowrap" }}>
                      <span style={{ fontSize: 11.5, color: MUTED, display: "block" }}>{EXAM_OF[s] || r.cert}</span>
                      <span style={{ color: GOLD, fontWeight: 600 }}>{s === "Тесты" ? T("Разминка") : s}</span>
                    </td>
                    <td style={{ fontSize: 12, color: MUTED }}>{r.mod}</td>
                    <td>{r.score}/{r.total}</td>
                    <td><b style={{ color: pctColor(r.pct) }}>{r.pct}%</b></td>
                    <td style={{ fontSize: 12, color: "#4a5560" }}>{fmtDate(r.date)}</td>
                    <td>{errs && r.details.length > 0 && (
                      <button className="btn btn-o btn-sm" onClick={() => setOpenRow(openRow === i ? null : i)}>{openRow === i ? T("Скрыть") : texts.length ? T("Подробнее") : TT("Ошибки ({0})", errs.length)}</button>
                    )}</td>
                  </tr>,
                ];
                if (openRow === i && errs) out.push(<Details key={`${i}-d`} r={r} colSpan={7} />);
                return out;
              })}
            </tbody>
          </table>
          {filtered.length > shown && (
            <div style={{ textAlign: "center", marginTop: 14 }}>
              <button className="btn btn-o btn-sm" onClick={() => setShown(s => s + 100)}>{T("Показать ещё (")}{filtered.length - shown})</button>
            </div>
          )}
        </div>
      )}
    </>
  );
}

// ===================== Панель: две вкладки =====================
export default function TeacherProgress({ results }) {
  const lessonRows = useMemo(() => results.filter(isLessonRow), [results]);
  const otherRows = useMemo(() => results.filter(r => !isLessonRow(r)), [results]);
  const [view, setView] = useState("lessons");

  if (results.length === 0) return <div className="empty">{T("Студенты ещё не проходили задания.")}</div>;

  return (
    <>
      <div className="tabs" style={{ marginBottom: 18 }}>
        <button className={`tab${view === "lessons" ? " on" : ""}`} onClick={() => setView("lessons")}>{T("🧭 Уроки (")}{lessonRows.length})</button>
        <button className={`tab${view === "sections" ? " on" : ""}`} onClick={() => setView("sections")}>{T("📚 Разделы и тесты (")}{otherRows.length})</button>
      </div>
      {view === "lessons" ? <LessonsTab rows={lessonRows} /> : <SectionsTab results={otherRows} />}
    </>
  );
}
