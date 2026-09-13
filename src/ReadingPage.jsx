import { useState } from "react";
import { READING_UNITS, scoreReadingUnit } from "./readingData";

const LEVEL_COLOR = l => l.includes("7.5") || l.includes("8") ? "#e74c3c" : l.includes("7") || l.includes("6.5") ? "#c59b44" : "#4caf88";

export default function ReadingPage({ studentName, onSaveResult }) {
  const [unitId, setUnitId] = useState(null);
  const [answers, setAnswers] = useState({});
  const [checked, setChecked] = useState(false);
  const [result, setResult] = useState(null);

  const unit = READING_UNITS.find(u => u.id === unitId);

  const openUnit = (id) => { setUnitId(id); setAnswers({}); setChecked(false); setResult(null); };
  const closeUnit = () => { setUnitId(null); setAnswers({}); setChecked(false); setResult(null); };
  const setAns = (id, val) => { if (checked) return; setAnswers(a => ({ ...a, [id]: val })); };

  const allItems = unit ? unit.tasks.flatMap(t => t.items) : [];
  const allAnswered = unit && allItems.every(it => answers[it.id] !== undefined && answers[it.id] !== "");

  const check = () => {
    const r = scoreReadingUnit(unit, answers);
    setResult(r);
    setChecked(true);
    onSaveResult({
      cert: "IELTS",
      mod: `Reading: ${unit.title}`,
      score: r.correct,
      total: r.total,
      pct: r.pct,
      date: new Date().toISOString(),
      student: studentName || "Студент",
    });
  };

  // ============ СПИСОК ЮНИТОВ ============
  if (!unit) {
    return (
      <div>
        <h2 className="st">📖 IELTS Reading — обучающие юниты</h2>
        <p className="sb">Текст → разбор стратегии → задания → проверка ответов. Без таймера — фокус на технике.</p>
        {READING_UNITS.map(u => (
          <div key={u.id} className="card" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12, flexWrap: "wrap", gap: 10 }}>
            <div>
              <h3 style={{ marginBottom: 3 }}>{u.title}</h3>
              <p style={{ fontSize: 13, color: "#8a7d6d" }}>
                {u.topic} · {u.tasks.reduce((s, t) => s + t.items.length, 0)} вопросов ·{" "}
                <span style={{ color: LEVEL_COLOR(u.level) }}>{u.level}</span>
              </p>
            </div>
            <button className="btn" onClick={() => openUnit(u.id)}>Открыть →</button>
          </div>
        ))}
        <div className="tip"><b>Официальные примеры:</b> для практики в реальном формате — <a href="https://ielts.org/take-a-test/preparation-resources/sample-test-questions" target="_blank" rel="noreferrer" style={{ color: "#c59b44" }}>ielts.org sample tests</a> и <a href="https://www.cambridgeenglish.org/exams-and-tests/ielts/preparation/" target="_blank" rel="noreferrer" style={{ color: "#c59b44" }}>Cambridge English</a>.</div>
      </div>
    );
  }

  // ============ ВИД ЮНИТА ============
  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
        <button className="btn btn-o btn-sm" onClick={closeUnit}>← Все юниты</button>
        <span className="badge" style={{ background: "rgba(197,155,68,.15)", color: LEVEL_COLOR(unit.level) }}>{unit.level}</span>
      </div>
      <h2 className="st">{unit.title}</h2>
      <p className="sb">{unit.topic}</p>

      <div className="card" style={{ maxHeight: 380, overflowY: "auto", lineHeight: 1.8, fontSize: 14.5, color: "#c0b8a8", marginBottom: 24, whiteSpace: "pre-wrap" }}>
        {unit.passage}
      </div>

      {unit.tasks.map((task, ti) => (
        <div key={ti} style={{ marginBottom: 26 }}>
          <h3 style={{ color: "#c59b44", fontFamily: "Lora,serif", fontSize: 18, marginBottom: 8 }}>{task.title}</h3>

          <div className="card" style={{ background: "rgba(197,155,68,.06)", border: "1px solid rgba(197,155,68,.2)", marginBottom: 12, padding: 16 }}>
            <div style={{ fontSize: 13, fontWeight: 600, color: "#c59b44", marginBottom: 8 }}>🎯 Как решать этот тип задания</div>
            <ul style={{ fontSize: 13, color: "#c0b8a8", lineHeight: 1.9, paddingLeft: 18 }}>
              {task.strategy.map((s, i) => <li key={i}>{s}</li>)}
            </ul>
          </div>

          <p style={{ fontSize: 13.5, color: "#8a7d6d", fontStyle: "italic", marginBottom: 14 }}>{task.instructions}</p>

          {/* --- TFNG --- */}
          {task.type === "tfng" && task.items.map(it => (
            <div key={it.id} className="qcard" style={{ marginBottom: 10, padding: 18 }}>
              <div className="qtext" style={{ fontSize: 14.5, marginBottom: 12 }}>{it.text}</div>
              <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                {["TRUE", "FALSE", "NOT GIVEN"].map(v => {
                  let cls = "opt"; const sel = answers[it.id] === v;
                  if (checked) { if (v === it.answer) cls += " ok"; else if (sel) cls += " ng"; }
                  return <button key={v} className={cls} style={{ width: "auto", padding: "8px 16px" }} disabled={checked} onClick={() => setAns(it.id, v)}>
                    {sel && !checked ? "● " : ""}{v}
                  </button>;
                })}
              </div>
            </div>
          ))}

          {/* --- MCQ --- */}
          {task.type === "mcq" && task.items.map(it => (
            <div key={it.id} className="qcard" style={{ marginBottom: 10, padding: 18 }}>
              <div className="qtext" style={{ fontSize: 14.5, marginBottom: 12 }}>{it.text}</div>
              {it.opts.map((o, i) => {
                let cls = "opt"; const sel = answers[it.id] === i;
                if (checked) { if (i === it.answer) cls += " ok"; else if (sel) cls += " ng"; }
                return <button key={i} className={cls} disabled={checked} onClick={() => setAns(it.id, i)}>
                  <span style={{ color: "#c59b44", marginRight: 9 }}>{String.fromCharCode(65 + i)}.</span>{o}
                </button>;
              })}
            </div>
          ))}

          {/* --- HEADING MATCH --- */}
          {task.type === "heading-match" && (
            <div className="qcard" style={{ padding: 18 }}>
              {task.items.map(it => {
                const sel = answers[it.id];
                const wrong = checked && sel !== undefined && sel !== it.answer;
                const right = checked && sel === it.answer;
                return (
                  <div key={it.id} style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12, flexWrap: "wrap" }}>
                    <span style={{ fontSize: 14, color: "#e8dfd0", minWidth: 90 }}>{it.paragraph}</span>
                    <select value={sel ?? ""} disabled={checked} onChange={e => setAns(it.id, Number(e.target.value))} style={{ flex: 1, minWidth: 200, borderColor: checked ? (right ? "#4caf88" : "#c0392b") : undefined }}>
                      <option value="" disabled>Выбери заголовок...</option>
                      {task.headings.map((h, i) => <option key={i} value={i}>{h}</option>)}
                    </select>
                    {checked && <span style={{ fontSize: 12, color: right ? "#4caf88" : "#c0392b" }}>{right ? "✓" : `✗ верно: ${task.headings[it.answer]}`}</span>}
                  </div>
                );
              })}
            </div>
          )}

          {/* --- SUMMARY --- */}
          {task.type === "summary" && (() => {
            const parts = task.summaryTemplate.split(/(\{\d+\})/g);
            return (
              <div className="qcard" style={{ padding: 18, fontSize: 14.5, lineHeight: 2.2, color: "#e8dfd0" }}>
                {parts.map((p, i) => {
                  const m = p.match(/^\{(\d+)\}$/);
                  if (!m) return <span key={i}>{p}</span>;
                  const it = task.items[Number(m[1])];
                  const ok = checked && it.answer.map(a => a.trim().toLowerCase()).includes(String(answers[it.id] || "").trim().toLowerCase());
                  return (
                    <span key={i} style={{ display: "inline-flex", flexDirection: "column", verticalAlign: "middle", margin: "0 4px" }}>
                      <input type="text" value={answers[it.id] || ""} disabled={checked} onChange={e => setAns(it.id, e.target.value)}
                        style={{ width: 130, display: "inline-block", padding: "5px 9px", fontSize: 13.5, borderColor: checked ? (ok ? "#4caf88" : "#c0392b") : undefined }} />
                      {checked && !ok && <span style={{ fontSize: 11, color: "#c0392b" }}>верно: {it.answer[0]}</span>}
                    </span>
                  );
                })}
              </div>
            );
          })()}
        </div>
      ))}

      {!checked ? (
        <div style={{ textAlign: "center", marginTop: 10 }}>
          <button className="btn" disabled={!allAnswered} onClick={check}>
            {allAnswered ? "Проверить ответы ✓" : `Осталось ответить: ${allItems.length - Object.keys(answers).filter(k=>answers[k]!=="" && answers[k]!==undefined).length}`}
          </button>
        </div>
      ) : (
        <div className="sdiv">
          <div className="sbig">{result.pct}%</div>
          <div style={{ fontSize: 17, color: "#e8dfd0", marginTop: 8, fontFamily: "Lora,serif" }}>{result.correct} / {result.total} верных ответов</div>
          <div style={{ display: "flex", gap: 10, justifyContent: "center", flexWrap: "wrap", marginTop: 16 }}>
            <button className="btn" onClick={() => openUnit(unit.id)}>Пройти ещё раз</button>
            <button className="btn btn-o" onClick={closeUnit}>← Все юниты</button>
          </div>
        </div>
      )}
    </div>
  );
}

