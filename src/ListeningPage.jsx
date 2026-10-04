/**
 * CertifyWise
 * © 2026 Алназирова Айдана (Aidana Alnazirova). Все права защищены.
 * Дата создания: 22 мая 2026 г.
 * Использование без письменного разрешения автора запрещено.
 */

import { useState } from "react";
import { LISTENING_MODULES, LISTENING_FORMAT, scoreListening, isCorrect } from "./listeningData";

const GOLD = "#c59b44", GREEN = "#4caf88", RED = "#c0392b", TXT = "#e8dfd0", MUTED = "#8a7d6d";

// Оригинальный план библиотеки для задания Map/plan labelling (нарисован для CertifyWise)
function LibraryPlan() {
  const room = { fill: "#0b1622", stroke: MUTED, strokeWidth: 1.5 };
  const lbl = { fill: "#c0b8a8", fontSize: 11, textAnchor: "middle", fontFamily: "inherit" };
  const Num = ({ x, y, n }) => (
    <g>
      <circle cx={x} cy={y} r={13} fill={GOLD} />
      <text x={x} y={y + 4.5} textAnchor="middle" fontSize={13} fontWeight={700} fill="#0b1622">{n}</text>
    </g>
  );
  return (
    <svg viewBox="0 0 360 400" role="img" aria-label="Plan of the town library with five numbered places" style={{ width: "100%", maxWidth: 420, display: "block", margin: "0 auto 14px" }}>
      {/* верхний ряд */}
      <rect x="20" y="20" width="100" height="100" {...room} />
      <text x="70" y="66" {...lbl}>Seminar</text><text x="70" y="80" {...lbl}>room</text>
      <rect x="120" y="20" width="130" height="100" {...room} />
      <Num x={185} y={70} n={4} />
      {/* правая большая комната */}
      <rect x="250" y="20" width="90" height="230" {...room} />
      <Num x={295} y={135} n={5} />
      {/* основной зал */}
      <rect x="20" y="120" width="230" height="130" {...room} />
      <text x="135" y="200" {...lbl} fontSize={12}>Main library area</text>
      <text x="34" y="185" {...lbl} transform="rotate(-90 34 185)">Fiction</text>
      <text x="240" y="185" {...lbl} transform="rotate(90 240 185)">Non-fiction</text>
      <line x1="60" y1="128" x2="210" y2="128" stroke={GOLD} strokeWidth="3" strokeDasharray="6 4" />
      <Num x={135} y={150} n={3} />
      {/* нижний ряд */}
      <rect x="20" y="250" width="90" height="110" {...room} />
      <Num x={65} y={305} n={1} />
      <rect x="110" y="250" width="40" height="110" fill="#12253b" stroke={MUTED} strokeWidth="1.5" />
      <rect x="150" y="250" width="100" height="62" {...room} />
      <Num x={200} y={281} n={2} />
      <rect x="150" y="312" width="100" height="48" {...room} />
      <text x="200" y="333" {...lbl}>Librarian's</text><text x="200" y="347" {...lbl}>desk</text>
      <rect x="250" y="250" width="90" height="110" {...room} />
      <text x="295" y="302" {...lbl}>Library</text><text x="295" y="316" {...lbl}>office</text>
      {/* проёмы */}
      <line x1="110" y1="290" x2="110" y2="320" stroke="#12253b" strokeWidth="4" />
      <line x1="150" y1="266" x2="150" y2="296" stroke="#12253b" strokeWidth="4" />
      <line x1="112" y1="250" x2="148" y2="250" stroke="#12253b" strokeWidth="4" />
      <line x1="45" y1="120" x2="75" y2="120" stroke="#0b1622" strokeWidth="4" />
      <line x1="150" y1="120" x2="180" y2="120" stroke="#0b1622" strokeWidth="4" />
      <line x1="250" y1="170" x2="250" y2="200" stroke="#0b1622" strokeWidth="4" />
      <line x1="112" y1="360" x2="148" y2="360" stroke="#12253b" strokeWidth="4" />
      {/* вход */}
      <path d="M130 392 L130 368 M123 376 L130 367 L137 376" stroke={GOLD} strokeWidth="2" fill="none" />
      <text x="170" y="390" fill={GOLD} fontSize={11} fontFamily="inherit">Entrance</text>
    </svg>
  );
}

export default function ListeningPage({ studentName, onSaveResult }) {
  const ready = LISTENING_MODULES.filter(m => !m.soon);
  const [modId, setModId] = useState(ready[0].id);
  const [recIdx, setRecIdx] = useState(0);
  const [answers, setAnswers] = useState({});
  const [results, setResults] = useState({});      // { recordingId: resultObj }
  const [exampleOpen, setExampleOpen] = useState(false);
  const [formatOpen, setFormatOpen] = useState(false);
  const [audioError, setAudioError] = useState(false);

  const mod = LISTENING_MODULES.find(m => m.id === modId);
  const rec = mod.recordings[recIdx];
  const result = results[rec.id] || null;
  const checked = !!result;
  const items = rec.tasks.flatMap(t => t.items);
  const answeredCount = items.filter(it => answers[it.id] !== undefined && answers[it.id] !== "").length;

  const openModule = id => { setModId(id); setRecIdx(0); setExampleOpen(false); setAudioError(false); };
  const setAns = (id, v) => { if (!checked) setAnswers(a => ({ ...a, [id]: v })); };

  const check = () => {
    const r = scoreListening(rec, answers);
    setResults(p => ({ ...p, [rec.id]: r }));
    onSaveResult({
      cert: "IELTS", mod: `Listening: ${mod.title}`, score: r.correct, total: r.total, pct: r.pct,
      date: new Date().toISOString(), student: studentName || "Студент", details: r.details,
    });
  };
  const retry = () => {
    setAnswers(a => { const c = { ...a }; items.forEach(it => delete c[it.id]); return c; });
    setResults(p => { const c = { ...p }; delete c[rec.id]; return c; });
  };

  const Exp = ({ task, it }) => checked ? (
    <div style={{ fontSize: 12.5, color: MUTED, marginTop: 8, lineHeight: 1.6 }}>
      <b style={{ color: isCorrect(task, it, answers[it.id]) ? GREEN : RED }}>{isCorrect(task, it, answers[it.id]) ? "✓" : "✗"}</b> {it.exp}
    </div>
  ) : null;

  const nextMod = ready[ready.findIndex(m => m.id === modId) + 1];

  return (
    <div>
      <h2 className="st">🎧 IELTS Listening</h2>
      <p className="sb">Техники аудирования: объяснение, пример и практика на официальных образцах заданий.</p>

      <div className="card" style={{ marginBottom: 16, padding: 16 }}>
        <button className="btn btn-o btn-sm" onClick={() => setFormatOpen(o => !o)}>{formatOpen ? "Скрыть формат теста" : "ℹ️ Формат теста"}</button>
        {formatOpen && (
          <div style={{ marginTop: 12, fontSize: 13, color: "#c0b8a8", lineHeight: 1.9 }}>
            {LISTENING_FORMAT.map(([k, v]) => <div key={k}><b style={{ color: GOLD }}>{k}:</b> {v}</div>)}
          </div>
        )}
      </div>

      <div className="skillsWrap">
        <div className="skillsNav">
          {LISTENING_MODULES.map(m => (
            <button key={m.id} className={`skillsNavBtn${m.id === modId ? " on" : ""}`} disabled={m.soon} style={m.soon ? { opacity: .45, cursor: "default" } : undefined} onClick={() => openModule(m.id)}>
              {m.num}. {m.title}{m.soon ? " · скоро" : ""}{!m.soon && m.recordings.every(r => results[r.id]) ? " ✓" : ""}
            </button>
          ))}
        </div>

        <div className="skillsContent">
          <div className="card" style={{ marginBottom: 16, padding: 20 }}>
            <h3 style={{ marginBottom: 4 }}>{mod.num}. {mod.title}</h3>
            <div style={{ fontSize: 12, color: GOLD, marginBottom: 10 }}>{mod.part}</div>
            <p style={{ fontSize: 13, color: MUTED, marginBottom: 12 }}><b style={{ color: GOLD }}>Когда применять:</b> {mod.whenToUse}</p>
            <ul style={{ fontSize: 13, color: "#c0b8a8", lineHeight: 1.9, paddingLeft: 18, marginBottom: 14 }}>
              {mod.howTo.map((h, i) => <li key={i}>{h}</li>)}
            </ul>
            <div style={{ background: "rgba(197,155,68,.06)", border: "1px solid rgba(197,155,68,.2)", borderRadius: 8, padding: 14 }}>
              <div style={{ fontSize: 13, color: TXT, fontStyle: "italic", marginBottom: 8, lineHeight: 1.7 }}>{mod.example.text}</div>
              {!exampleOpen ? (
                <button className="btn btn-sm" onClick={() => setExampleOpen(true)}>Показать ответ 👁️</button>
              ) : (
                <>
                  <div style={{ fontSize: 12.5, color: MUTED, marginBottom: 8, lineHeight: 1.7 }}>{mod.example.note}</div>
                  <button className="btn btn-o btn-sm" onClick={() => setExampleOpen(false)}>Скрыть</button>
                </>
              )}
            </div>
          </div>

          {mod.recordings.length > 1 && (
            <div className="tabs" style={{ marginBottom: 12 }}>
              {mod.recordings.map((r, i) => (
                <button key={r.id} className={`tab${i === recIdx ? " on" : ""}`} onClick={() => { setRecIdx(i); setAudioError(false); }}>{i + 1}. {r.title}{results[r.id] ? " ✓" : ""}</button>
              ))}
            </div>
          )}

          <h3 style={{ fontFamily: "Lora,serif", fontSize: 17, color: TXT, marginBottom: 8 }}>🎙️ {rec.title}</h3>
          <div className="card" style={{ marginBottom: 18, padding: 16 }}>
            <audio key={rec.id} controls preload="none" src={rec.audio} onError={() => setAudioError(true)} style={{ width: "100%" }} />
            {audioError && <div style={{ fontSize: 12.5, color: RED, marginTop: 8 }}>Плеер не смог загрузить запись. Откройте её по ссылке ниже.</div>}
            <div style={{ fontSize: 12, color: MUTED, marginTop: 8, lineHeight: 1.6 }}>
              Аудио: официальный образец задания IELTS, воспроизводится с сервера IDP IELTS. <a href={rec.audio} target="_blank" rel="noopener noreferrer" style={{ color: GOLD }}>Открыть в новой вкладке</a>
            </div>
            <div style={{ fontSize: 12.5, color: "#c0b8a8", marginTop: 8, lineHeight: 1.6 }}>
              Сначала прочитайте все задания, затем включите запись. На экзамене она звучит один раз.
            </div>
            {rec.note && <div style={{ fontSize: 12.5, color: GOLD, marginTop: 8, lineHeight: 1.6 }}>{rec.note}</div>}
          </div>

          {rec.tasks.map((task, ti) => (
            <div key={ti} style={{ marginBottom: 24 }}>
              <h3 style={{ color: GOLD, fontFamily: "Lora,serif", fontSize: 17, marginBottom: 6 }}>{task.title}</h3>
              <p style={{ fontSize: 13.5, color: MUTED, fontStyle: "italic", marginBottom: 12 }}>{task.instructions}</p>

              {task.plan === "library" && <div className="qcard" style={{ padding: 14, marginBottom: 10 }}><LibraryPlan /></div>}

              {task.type === "match" && (
                <div className="qcard" style={{ padding: 14, marginBottom: 10, fontSize: 13.5, color: "#c0b8a8", lineHeight: 1.9 }}>
                  {task.options.map(o => <div key={o.letter}><b style={{ color: GOLD, marginRight: 8 }}>{o.letter}</b>{o.text}</div>)}
                </div>
              )}

              {task.type === "gap" && task.items.map((it, i) => {
                const ok = checked && isCorrect(task, it, answers[it.id]);
                return (
                  <div key={it.id} className="qcard" style={{ marginBottom: 8, padding: 14 }}>
                    <div style={{ fontSize: 14.5, color: TXT, lineHeight: 2.2 }}>
                      <span style={{ color: GOLD, marginRight: 8 }}>{i + 1}</span>
                      {it.before}{" "}
                      <input type="text" autoComplete="off" autoCapitalize="off" spellCheck={false} value={answers[it.id] || ""} disabled={checked}
                        onChange={e => setAns(it.id, e.target.value)}
                        style={{ flex: "none", width: 140, display: "inline-block", padding: "5px 9px", fontSize: 14, borderColor: checked ? (ok ? GREEN : RED) : undefined }} />
                      {it.after ? " " + it.after : ""}
                    </div>
                    {checked && !ok && <div style={{ fontSize: 12.5, color: RED, marginTop: 4 }}>Верно: {it.answer[0]}</div>}
                    <Exp task={task} it={it} />
                  </div>
                );
              })}

              {task.type === "mcq" && task.items.map((it, i) => (
                <div key={it.id} className="qcard" style={{ marginBottom: 10, padding: 16 }}>
                  <div className="qtext" style={{ fontSize: 14.5, marginBottom: 12 }}><span style={{ color: GOLD, marginRight: 8 }}>{i + 1}</span>{it.text}</div>
                  {it.opts.map((o, oi) => {
                    let cls = "opt"; const sel = answers[it.id] === oi;
                    if (checked) { if (oi === it.answer) cls += " ok"; else if (sel) cls += " ng"; } else if (sel) cls += " sel";
                    return <button key={oi} className={cls} disabled={checked} onClick={() => setAns(it.id, oi)}>
                      <span style={{ color: GOLD, marginRight: 9 }}>{String.fromCharCode(65 + oi)}.</span>{o}
                    </button>;
                  })}
                  <Exp task={task} it={it} />
                </div>
              ))}

              {task.type === "match" && task.items.map((it, i) => (
                <div key={it.id} className="qcard" style={{ marginBottom: 10, padding: 16 }}>
                  <div className="qtext" style={{ fontSize: 14.5, marginBottom: 10 }}>{!task.plan && <span style={{ color: GOLD, marginRight: 8 }}>{i + 1}</span>}{it.text}</div>
                  <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                    {task.options.map(o => {
                      let cls = "opt"; const sel = answers[it.id] === o.letter;
                      if (checked) { if (o.letter === it.answer) cls += " ok"; else if (sel) cls += " ng"; } else if (sel) cls += " sel";
                      return <button key={o.letter} className={cls} style={{ width: "auto", minWidth: 44, padding: "8px 14px", marginBottom: 0, textAlign: "center" }} disabled={checked} onClick={() => setAns(it.id, o.letter)}>{o.letter}</button>;
                    })}
                  </div>
                  <Exp task={task} it={it} />
                </div>
              ))}
            </div>
          ))}

          {!checked ? (
            <div style={{ textAlign: "center", marginTop: 10 }}>
              <div style={{ fontSize: 12.5, color: MUTED, marginBottom: 8 }}>Отвечено: {answeredCount} из {items.length}</div>
              <button className="btn" disabled={answeredCount === 0} onClick={check}>Отправить на проверку ✓</button>
            </div>
          ) : (
            <div className="sdiv">
              <div className="sbig">{result.pct}%</div>
              <div style={{ fontSize: 17, color: TXT, marginTop: 8, fontFamily: "Lora,serif" }}>{result.correct} / {result.total} верных ответов</div>
              <div style={{ fontSize: 12.5, color: MUTED, marginTop: 8 }}>Под каждым вопросом появилось объяснение. Включите запись ещё раз и найдите эти места на слух.</div>
              <div style={{ display: "flex", gap: 10, justifyContent: "center", flexWrap: "wrap", marginTop: 16 }}>
                <button className="btn btn-o" onClick={retry}>Пройти ещё раз</button>
                {nextMod && <button className="btn" onClick={() => { openModule(nextMod.id); window.scrollTo({ top: 0, behavior: "smooth" }); }}>Следующий модуль →</button>}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
