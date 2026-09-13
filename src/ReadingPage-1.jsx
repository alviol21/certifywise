import { useState } from "react";
import { READING_UNITS, READING_SKILLS, BAND_SCORE_TABLE, scoreReadingUnit } from "./readingData";

const LEVEL_COLOR = l => l.includes("7.5") || l.includes("8") ? "#e74c3c" : l.includes("7") || l.includes("6.5") ? "#c59b44" : "#4caf88";

export default function ReadingPage({ studentName, onSaveResult }) {
  const [unitId, setUnitId] = useState(null);
  const [activeTextIdx, setActiveTextIdx] = useState(0);
  const [showSkills, setShowSkills] = useState(false);
  const [activeSkillId, setActiveSkillId] = useState(READING_SKILLS[0]?.id);
  const [activePassageIdx, setActivePassageIdx] = useState(0);
  const [skillAnswers, setSkillAnswers] = useState({}); // { itemId: selectedOptionIndex }
  const [answers, setAnswers] = useState({});
  const [textResults, setTextResults] = useState({}); // { [textIdx]: resultObj }

  const unit = READING_UNITS.find(u => u.id === unitId);
  const currentText = unit ? unit.texts[activeTextIdx] : null;
  const checked = !!textResults[activeTextIdx];
  const result = textResults[activeTextIdx] || null;

  const openUnit = (id) => { setUnitId(id); setAnswers({}); setTextResults({}); setActiveTextIdx(0); };
  const closeUnit = () => { setUnitId(null); setAnswers({}); setTextResults({}); };
  const setAns = (id, val) => { if (checked) return; setAnswers(a => ({ ...a, [id]: val })); };

  const allItems = currentText ? currentText.tasks.flatMap(t => t.items) : [];
  const allAnswered = currentText && allItems.every(it => answers[it.id] !== undefined && answers[it.id] !== "");

  const check = () => {
    const r = scoreReadingUnit(currentText, answers);
    setTextResults(p => ({ ...p, [activeTextIdx]: r }));
    onSaveResult({
      cert: "IELTS",
      mod: `Reading: ${currentText.title}`,
      score: r.correct,
      total: r.total,
      pct: r.pct,
      date: new Date().toISOString(),
      student: studentName || "Студент",
      details: r.details,
    });
  };

  const retryText = () => {
    const ids = currentText.tasks.flatMap(t => t.items).map(it => it.id);
    setAnswers(a => { const copy = { ...a }; ids.forEach(id => delete copy[id]); return copy; });
    setTextResults(p => { const copy = { ...p }; delete copy[activeTextIdx]; return copy; });
  };

  // ============ ЭКРАН "ТЕХНИКИ ЧТЕНИЯ" ============
  if (showSkills) {
    const s = READING_SKILLS.find(sk => sk.id === activeSkillId) || READING_SKILLS[0];
    return (
      <div>
        <button className="btn btn-o btn-sm" onClick={() => setShowSkills(false)} style={{ marginBottom: 14 }}>← Все юниты</button>
        <h2 className="st">📚 Техники чтения</h2>
        <p className="sb">Базовые навыки, которые нужны для любого типа заданий — независимо от Юнита.</p>

        <div className="skillsWrap">
          <div className="skillsNav">
            {READING_SKILLS.map(sk => (
              <button key={sk.id} className={`skillsNavBtn${sk.id === activeSkillId ? " on" : ""}`} onClick={() => { setActiveSkillId(sk.id); setActivePassageIdx(0); }}>
                {sk.title}
              </button>
            ))}
          </div>

          <div className="skillsContent">
            {s && (
              <div className="card" style={{ marginBottom: 16, padding: 20 }}>
                <h3 style={{ marginBottom: 6 }}>{s.title}</h3>
                <p style={{ fontSize: 13, color: "#8a7d6d", marginBottom: 12 }}><b style={{ color: "#c59b44" }}>Когда применять:</b> {s.whenToUse}</p>
                <ul style={{ fontSize: 13, color: "#c0b8a8", lineHeight: 1.9, paddingLeft: 18, marginBottom: 12 }}>
                  {s.howTo.map((h, i) => <li key={i}>{h}</li>)}
                </ul>

                {s.demo && (
                  <div className="card" style={{ background: "rgba(76,175,136,.06)", border: "1px solid rgba(76,175,136,.25)", marginBottom: 16, padding: 16 }}>
                    <div style={{ fontSize: 13, fontWeight: 600, color: "#4caf88", marginBottom: 10 }}>🎬 See it in action</div>
                    <p style={{ fontSize: 12.5, color: "#8a7d6d", marginBottom: 12 }}>{s.demo.intro}</p>
                    <div style={{ background: "#0b1622", borderRadius: 8, padding: 16, fontSize: 14, lineHeight: 1.9, marginBottom: 12 }}>
                      {s.demo.sentences.map((sent, i) => (
                        <span key={i} className={`demoSent ${sent.read ? "read" : "skip"}`}>{sent.text}{" "}</span>
                      ))}
                    </div>
                    <div style={{ fontSize: 12.5, color: "#c0b8a8" }}>{s.demo.caption}</div>
                  </div>
                )}

                <div style={{ background: "rgba(197,155,68,.06)", border: "1px solid rgba(197,155,68,.2)", borderRadius: 8, padding: 14, marginBottom: (s.practice || s.passages) ? 16 : 0 }}>
                  <div style={{ fontSize: 13, color: "#e8dfd0", fontStyle: "italic", marginBottom: 6 }}>{s.example.text}</div>
                  <div style={{ fontSize: 12.5, color: "#8a7d6d" }}>{s.example.note}</div>
                </div>
                {s.practice && (
                  <div>
                    <div style={{ fontSize: 13, fontWeight: 600, color: "#c59b44", margin: "14px 0 10px" }}>✏️ Practice — {s.practice.length} questions</div>
                    {s.practice.map((p, pi) => {
                      const sel = skillAnswers[p.id];
                      const done = sel !== undefined;
                      return (
                        <div key={p.id} className="qcard" style={{ marginBottom: 10, padding: 16 }}>
                          <div className="qnum">Question {pi + 1}</div>
                          <div className="qtext" style={{ fontSize: 14, marginBottom: 12 }}>{p.text}</div>
                          {p.opts.map((o, i) => {
                            let cls = "opt";
                            if (done) { if (i === p.answer) cls += " ok"; else if (i === sel) cls += " ng"; }
                            return <button key={i} className={cls} disabled={done} onClick={() => setSkillAnswers(a => ({ ...a, [p.id]: i }))}>
                              <span style={{ color: "#c59b44", marginRight: 9 }}>{String.fromCharCode(65 + i)}.</span>{o}
                            </button>;
                          })}
                          {done && <div className="exp"><b>💡 Why:</b> {p.exp}</div>}
                        </div>
                      );
                    })}
                  </div>
                )}
                {s.passages && (
                  <div>
                    <div style={{ fontSize: 13, fontWeight: 600, color: "#c59b44", margin: "14px 0 10px" }}>
                      ✏️ Practice on full texts — {s.passages.reduce((n, p) => n + p.questions.length, 0)} questions
                    </div>
                    <div className="tabs" style={{ overflowX: "auto", flexWrap: "nowrap" }}>
                      {s.passages.map((psg, psgI) => {
                        const psgDone = psg.questions.every(p => skillAnswers[p.id] !== undefined);
                        return (
                          <button key={psgI} className={`tab${psgI === activePassageIdx ? " on" : ""}`} style={{ whiteSpace: "nowrap" }} onClick={() => setActivePassageIdx(psgI)}>
                            {psg.title}{psgDone ? " ✓" : ""}
                          </button>
                        );
                      })}
                    </div>
                    {(() => {
                      const psg = s.passages[activePassageIdx] || s.passages[0];
                      return (
                        <div style={{ marginBottom: 22 }}>
                          <h4 style={{ fontFamily: "Lora,serif", fontSize: 16, color: "#e8dfd0", marginBottom: 8 }}>{psg.title}</h4>
                          <div className="card" style={{ maxHeight: 320, overflowY: "auto", lineHeight: 1.8, fontSize: 14, color: "#c0b8a8", marginBottom: 12, whiteSpace: "pre-wrap" }}>
                            {psg.text}
                          </div>
                          {psg.questions.map((p, pi) => {
                            const sel = skillAnswers[p.id];
                            const done = sel !== undefined;
                            return (
                              <div key={p.id} className="qcard" style={{ marginBottom: 10, padding: 16 }}>
                                <div className="qtext" style={{ fontSize: 14, marginBottom: 12 }}>{p.prompt}</div>
                                {p.opts.map((o, i) => {
                                  let cls = "opt";
                                  if (done) { if (i === p.answer) cls += " ok"; else if (i === sel) cls += " ng"; }
                                  return <button key={i} className={cls} disabled={done} onClick={() => setSkillAnswers(a => ({ ...a, [p.id]: i }))}>
                                    <span style={{ color: "#c59b44", marginRight: 9 }}>{String.fromCharCode(65 + i)}.</span>{o}
                                  </button>;
                                })}
                                {done && <div className="exp"><b>💡 Why:</b> {p.exp}</div>}
                              </div>
                            );
                          })}
                        </div>
                      );
                    })()}
                  </div>
                )}
                {!s.practice && !s.passages && (
                  <div className="tip">Практика для этого навыка ещё не добавлена — скоро появится.</div>
                )}
              </div>
            )}
          </div>
        </div>

        <div className="card" style={{ marginBottom: 16, padding: 20 }}>
          <h3 style={{ marginBottom: 10 }}>📊 Перевод баллов в Band Score (справочно)</h3>
          <p style={{ fontSize: 12.5, color: "#8a7d6d", marginBottom: 14 }}>Academic Reading, из 40 вопросов. Примерное соответствие — точная шкала может немного отличаться между версиями теста.</p>
          <table>
            <thead><tr><th>Правильных ответов</th><th>Band Score</th></tr></thead>
            <tbody>
              {BAND_SCORE_TABLE.map((row, i) => (
                <tr key={i}><td>{row.correct}</td><td><b style={{ color: "#c59b44" }}>{row.band}</b></td></tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }

  // ============ СПИСОК ЮНИТОВ ============
  if (!unit) {
    return (
      <div>
        <h2 className="st">📖 IELTS Reading — обучающие юниты</h2>
        <p className="sb">Текст → разбор стратегии → задания → проверка ответов. Без таймера — фокус на технике.</p>
        <div className="card" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 18, background: "rgba(76,175,136,.06)", border: "1px solid rgba(76,175,136,.25)", flexWrap: "wrap", gap: 10 }}>
          <div>
            <h3 style={{ marginBottom: 3, color: "#4caf88" }}>📚 Начни отсюда: техники чтения</h3>
            <p style={{ fontSize: 13, color: "#8a7d6d" }}>Skimming, scanning, прогнозирование, догадка по контексту — до того как решать задания</p>
          </div>
          <button className="btn" onClick={() => setShowSkills(true)}>Открыть →</button>
        </div>
        {READING_UNITS.map(u => (
          <div key={u.id} className="card" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12, flexWrap: "wrap", gap: 10 }}>
            <div>
              <h3 style={{ marginBottom: 3 }}>{u.title}</h3>
              <p style={{ fontSize: 13, color: "#8a7d6d" }}>
                {u.texts.length} текстов · {u.texts.reduce((s, t) => s + t.tasks.reduce((s2, task) => s2 + task.items.length, 0), 0)} вопросов ·{" "}
                <span>{u.texts[0].level} → {u.texts[u.texts.length - 1].level}</span>
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
        <span className="badge" style={{ background: "rgba(197,155,68,.15)", color: LEVEL_COLOR(currentText.level) }}>{currentText.level}</span>
      </div>
      <h2 className="st">{unit.title}</h2>
      <p className="sb">{currentText.topic}</p>

      <div className="tabs" style={{ overflowX: "auto", flexWrap: "nowrap" }}>
        {unit.texts.map((t, ti) => (
          <button key={t.id} className={`tab${ti === activeTextIdx ? " on" : ""}`} style={{ whiteSpace: "nowrap" }} onClick={() => setActiveTextIdx(ti)}>
            {ti + 1}. {t.title}{textResults[ti] ? " ✓" : ""}
          </button>
        ))}
      </div>

      <h3 style={{ fontFamily: "Lora,serif", fontSize: 17, color: "#e8dfd0", marginBottom: 8 }}>{currentText.title}</h3>
      <div className="card" style={{ maxHeight: 380, overflowY: "auto", lineHeight: 1.8, fontSize: 14.5, color: "#c0b8a8", marginBottom: 24, whiteSpace: "pre-wrap" }}>
        {currentText.passage}
      </div>

      {currentText.tasks.map((task, ti) => (
        <div key={ti} style={{ marginBottom: 26 }}>
          <h3 style={{ color: "#c59b44", fontFamily: "Lora,serif", fontSize: 18, marginBottom: 8 }}>{task.title}</h3>

          <div className="card" style={{ background: "rgba(197,155,68,.06)", border: "1px solid rgba(197,155,68,.2)", marginBottom: 12, padding: 16 }}>
            <div style={{ fontSize: 13, fontWeight: 600, color: "#c59b44", marginBottom: 8 }}>🎯 Как решать этот тип задания</div>
            <ul style={{ fontSize: 13, color: "#c0b8a8", lineHeight: 1.9, paddingLeft: 18 }}>
              {task.strategy.map((s, i) => <li key={i}>{s}</li>)}
            </ul>
          </div>

          {task.walkthrough && (
            <div className="card" style={{ background: "rgba(76,175,136,.06)", border: "1px solid rgba(76,175,136,.25)", marginBottom: 16, padding: 16 }}>
              <div style={{ fontSize: 13, fontWeight: 600, color: "#4caf88", marginBottom: 8 }}>📝 Разбор примера — прежде чем решать самому</div>
              <div style={{ fontSize: 14, color: "#e8dfd0", marginBottom: 10, fontStyle: "italic" }}>{task.walkthrough.text}</div>
              <ol style={{ fontSize: 13, color: "#c0b8a8", lineHeight: 1.9, paddingLeft: 20, marginBottom: 10 }}>
                {task.walkthrough.steps.map((s, i) => <li key={i}>{s}</li>)}
              </ol>
              <div style={{ fontSize: 13.5, color: "#4caf88", fontWeight: 600, marginBottom: task.walkthrough.whyNotOthers ? 6 : 0 }}>
                Ответ: {task.walkthrough.answer}
              </div>
              {task.walkthrough.whyNotOthers && (
                <div style={{ fontSize: 12.5, color: "#8a7d6d" }}>{task.walkthrough.whyNotOthers}</div>
              )}
            </div>
          )}

          <p style={{ fontSize: 13.5, color: "#8a7d6d", fontStyle: "italic", marginBottom: 14 }}>{task.instructions}</p>

          {/* --- TFNG / YNNG --- */}
          {(task.type === "tfng" || task.type === "ynng") && task.items.map(it => {
            const opts = task.type === "ynng" ? ["YES", "NO", "NOT GIVEN"] : ["TRUE", "FALSE", "NOT GIVEN"];
            return (
              <div key={it.id} className="qcard" style={{ marginBottom: 10, padding: 18 }}>
                <div className="qtext" style={{ fontSize: 14.5, marginBottom: 12 }}>{it.text}</div>
                <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                  {opts.map(v => {
                    let cls = "opt"; const sel = answers[it.id] === v;
                    if (checked) { if (v === it.answer) cls += " ok"; else if (sel) cls += " ng"; }
                    return <button key={v} className={cls} style={{ width: "auto", padding: "8px 16px" }} disabled={checked} onClick={() => setAns(it.id, v)}>
                      {sel && !checked ? "● " : ""}{v}
                    </button>;
                  })}
                </div>
              </div>
            );
          })}

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

          {/* --- INFO MATCH (Matching Information) --- */}
          {task.type === "info-match" && task.items.map(it => {
            const sel = answers[it.id];
            const ok = checked && sel === it.answer;
            return (
              <div key={it.id} className="qcard" style={{ marginBottom: 10, padding: 18 }}>
                <div className="qtext" style={{ fontSize: 14.5, marginBottom: 12 }}>{it.text}</div>
                <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                  {task.paragraphLabels.map(label => {
                    let cls = "opt"; const isSel = sel === label;
                    if (checked) { if (label === it.answer) cls += " ok"; else if (isSel) cls += " ng"; }
                    return <button key={label} className={cls} style={{ width: "auto", padding: "8px 16px" }} disabled={checked} onClick={() => setAns(it.id, label)}>
                      {isSel && !checked ? "● " : ""}{label}
                    </button>;
                  })}
                </div>
              </div>
            );
          })}

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
            {allAnswered ? "Проверить ответы ✓" : `Осталось ответить: ${allItems.length - allItems.filter(it => answers[it.id] !== undefined && answers[it.id] !== "").length}`}
          </button>
        </div>
      ) : (
        <div className="sdiv">
          <div className="sbig">{result.pct}%</div>
          <div style={{ fontSize: 17, color: "#e8dfd0", marginTop: 8, fontFamily: "Lora,serif" }}>{result.correct} / {result.total} верных ответов</div>
          <div style={{ display: "flex", gap: 10, justifyContent: "center", flexWrap: "wrap", marginTop: 16 }}>
            <button className="btn" onClick={retryText}>Пройти ещё раз</button>
            {activeTextIdx < unit.texts.length - 1 && (
              <button className="btn" onClick={() => setActiveTextIdx(activeTextIdx + 1)}>Следующий текст →</button>
            )}
            <button className="btn btn-o" onClick={closeUnit}>← Все юниты</button>
          </div>
        </div>
      )}
    </div>
  );
}
