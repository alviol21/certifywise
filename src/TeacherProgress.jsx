/**
 * CertifyWise
 * © 2026 Алназирова Айдана (Aidana Alnazirova). Все права защищены.
 * Дата создания: 22 мая 2026 г.
 * Использование без письменного разрешения автора запрещено.
 */

import { useState, useMemo } from "react";

const GOLD = "#c59b44", GREEN = "#4caf88", RED = "#e74c3c", TXT = "#e8dfd0", MUTED = "#8a7d6d";
const pctColor = p => (p >= 80 ? GREEN : p >= 60 ? GOLD : RED);
const avg = rows => (rows.length ? Math.round(rows.reduce((a, r) => a + r.pct, 0) / rows.length) : null);

// Раздел определяется по названию модуля, которое сохраняется вместе с результатом
export const sectionOf = r => {
  const m = r.mod || "";
  if (m.startsWith("Listening")) return "Listening";
  if (m.startsWith("Reading") || m.startsWith("Техники чтения")) return "Reading";
  return "Тесты";
};
const SECTIONS = ["Reading", "Listening", "Тесты"];
const keyOf = r => r.uid || r.student;

function downloadCsv(rows) {
  const esc = v => `"${String(v ?? "").replace(/"/g, '""')}"`;
  const head = ["Студент", "Раздел", "Сертификат", "Модуль", "Верно", "Всего", "%", "Ошибок", "Дата", "Время"];
  const lines = rows.map(r => {
    const d = new Date(r.date);
    const errors = Array.isArray(r.details) ? r.details.filter(x => !x.ok).length : "";
    return [r.student, sectionOf(r), r.cert, r.mod, r.score, r.total, r.pct, errors, d.toLocaleDateString("ru-RU"), d.toLocaleTimeString("ru-RU", { hour: "2-digit", minute: "2-digit" })].map(esc).join(";");
  });
  // BOM + «;» — чтобы Excel открыл кириллицу и столбцы без настройки
  const blob = new Blob(["\uFEFF" + [head.map(esc).join(";"), ...lines].join("\r\n")], { type: "text/csv;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url; a.download = `certifywise-results-${new Date().toISOString().slice(0, 10)}.csv`;
  document.body.appendChild(a); a.click(); a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

export default function TeacherProgress({ results }) {
  const [section, setSection] = useState("all");
  const [student, setStudent] = useState("all");
  const [openRow, setOpenRow] = useState(null);
  const [shown, setShown] = useState(100);

  const students = useMemo(() => {
    const m = new Map();
    results.forEach(r => { if (!m.has(keyOf(r))) m.set(keyOf(r), r.student); });
    return [...m.entries()].sort((a, b) => a[1].localeCompare(b[1], "ru"));
  }, [results]);

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

  const box = { background: "#12253b", border: "1px solid rgba(197,155,68,.14)", borderRadius: 10, padding: "14px 18px", textAlign: "center" };

  if (results.length === 0) return <div className="empty">Студенты ещё не проходили тесты.</div>;

  return (
    <>
      <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginBottom: 16, alignItems: "center" }}>
        <select value={section} onChange={e => pickSection(e.target.value)} style={{ width: "auto", flex: "1 1 150px" }} aria-label="Раздел">
          <option value="all">Все разделы</option>
          {SECTIONS.map(s => <option key={s} value={s}>{s}</option>)}
        </select>
        <select value={student} onChange={e => pickStudent(e.target.value)} style={{ width: "auto", flex: "1 1 180px" }} aria-label="Студент">
          <option value="all">Все студенты ({students.length})</option>
          {students.map(([k, n]) => <option key={k} value={k}>{n}</option>)}
        </select>
        <button className="btn btn-o btn-sm" disabled={filtered.length === 0} onClick={() => downloadCsv(filtered)}>⬇️ Скачать CSV ({filtered.length})</button>
      </div>

      {card && (
        <div className="card" style={{ marginBottom: 18, padding: 18 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", flexWrap: "wrap", gap: 8, marginBottom: 12 }}>
            <h3 style={{ margin: 0 }}>👤 {card.name}</h3>
            <span style={{ fontSize: 12, color: MUTED }}>Последняя активность: {new Date(card.last).toLocaleString("ru-RU", { day: "2-digit", month: "2-digit", year: "numeric", hour: "2-digit", minute: "2-digit" })}</span>
          </div>
          <div className="g3" style={{ marginBottom: 14 }}>
            {[["Попыток", card.attempts], ["Средний балл", card.avg + "%"], ["Заданий пройдено", card.modsDone]].map(([l, v]) => (
              <div key={l} style={box}><div style={{ fontFamily: "Lora,serif", fontSize: 26, color: GOLD }}>{v}</div><div style={{ fontSize: 12, color: MUTED, marginTop: 3 }}>{l}</div></div>
            ))}
          </div>
          <div style={{ overflowX: "auto", marginBottom: card.weak.length ? 14 : 0 }}>
            <table>
              <thead><tr><th>Раздел</th><th>Попыток</th><th>Средний %</th></tr></thead>
              <tbody>
                {card.sections.map(x => (
                  <tr key={x.s}>
                    <td>{x.s}</td><td>{x.n}</td>
                    <td>{x.avg === null ? <span style={{ color: MUTED }}>—</span> : <b style={{ color: pctColor(x.avg) }}>{x.avg}%</b>}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {card.weak.length > 0 && (
            <>
              <div style={{ fontSize: 13, fontWeight: 600, color: RED, marginBottom: 6 }}>Слабые места (средний балл ниже 60%)</div>
              {card.weak.map(w => (
                <div key={w.mod} style={{ fontSize: 13, color: "#c0b8a8", lineHeight: 1.8 }}>
                  <b style={{ color: pctColor(w.avg) }}>{w.avg}%</b> · {w.mod} <span style={{ color: MUTED }}>(попыток: {w.n}, лучший: {w.best}%)</span>
                </div>
              ))}
            </>
          )}
        </div>
      )}

      <div className="g3" style={{ marginBottom: 22 }}>
        {[["Попыток", filtered.length], ["Средний балл", filtered.length ? avg(filtered) + "%" : "—"], ["Студентов", new Set(filtered.map(keyOf)).size]].map(([l, v]) => (
          <div key={l} style={box}><div style={{ fontFamily: "Lora,serif", fontSize: 30, color: GOLD }}>{v}</div><div style={{ fontSize: 12, color: MUTED, marginTop: 3 }}>{l}</div></div>
        ))}
      </div>

      {filtered.length === 0 ? (
        <div className="empty">По этому фильтру результатов нет.</div>
      ) : (
        <div style={{ overflowX: "auto" }}>
          <table>
            <thead><tr><th>Студент</th><th>Раздел</th><th>Модуль</th><th>Результат</th><th>%</th><th>Дата</th><th></th></tr></thead>
            <tbody>
              {filtered.slice(0, shown).flatMap((r, i) => {
                const errs = Array.isArray(r.details) ? r.details.filter(d => !d.ok) : null;
                const rows = [
                  <tr key={i}>
                    <td>
                      {student === "all"
                        ? <button onClick={() => pickStudent(keyOf(r))} title="Открыть карточку студента" style={{ background: "none", border: "none", padding: 0, color: TXT, cursor: "pointer", font: "inherit", textDecoration: "underline", textDecorationColor: "rgba(197,155,68,.5)", textAlign: "left" }}>{r.student}</button>
                        : r.student}
                    </td>
                    <td><span style={{ color: GOLD, fontWeight: 600 }}>{sectionOf(r)}</span></td>
                    <td style={{ fontSize: 12, color: MUTED }}>{sectionOf(r) === "Тесты" ? `${r.cert}: ${r.mod}` : r.mod}</td>
                    <td>{r.score}/{r.total}</td>
                    <td><b style={{ color: pctColor(r.pct) }}>{r.pct}%</b></td>
                    <td style={{ fontSize: 12, color: "#4a5560" }}>{new Date(r.date).toLocaleDateString("ru-RU")}</td>
                    <td>{errs && r.details.length > 0 && (
                      <button className="btn btn-o btn-sm" onClick={() => setOpenRow(openRow === i ? null : i)}>{openRow === i ? "Скрыть" : `Ошибки (${errs.length})`}</button>
                    )}</td>
                  </tr>,
                ];
                if (openRow === i && errs) {
                  rows.push(
                    <tr key={`${i}-d`}>
                      <td colSpan={7} style={{ background: "#0e1d30", padding: 16 }}>
                        {errs.length === 0 ? (
                          <div style={{ fontSize: 13, color: GREEN }}>✓ Все ответы верные — ошибок нет.</div>
                        ) : (
                          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                            {errs.map((d, di) => (
                              <div key={di} style={{ borderLeft: `3px solid ${RED}`, paddingLeft: 12 }}>
                                <div style={{ fontSize: 13, color: TXT, marginBottom: 4 }}>{d.question}</div>
                                <div style={{ fontSize: 12.5, color: RED }}>Ответ студента: {d.userAnswer !== undefined && d.userAnswer !== "" ? String(d.userAnswer) : "— (не отвечено)"}</div>
                                <div style={{ fontSize: 12.5, color: GREEN }}>Правильный ответ: {String(d.correctAnswer)}</div>
                              </div>
                            ))}
                          </div>
                        )}
                      </td>
                    </tr>
                  );
                }
                return rows;
              })}
            </tbody>
          </table>
          {filtered.length > shown && (
            <div style={{ textAlign: "center", marginTop: 14 }}>
              <button className="btn btn-o btn-sm" onClick={() => setShown(s => s + 100)}>Показать ещё ({filtered.length - shown})</button>
            </div>
          )}
        </div>
      )}
    </>
  );
}
