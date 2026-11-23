/**
 * CertifyWise
 * © 2026 Алназирова Айдана (Aidana Alnazirova). Все права защищены.
 * Дата создания: 22 мая 2026 г.
 * Использование без письменного разрешения автора запрещено.
 */

import { useState, useEffect, useRef } from "react";
import { TASK1, TASK2, WRITING_CRITERIA, WRITING_FORMAT, chartAsText } from "./writingData";
import { callGemini, overallBand, countWords } from "./aiClient";

const GOLD = "#c59b44", MUTED = "#8a7d6d", TXT = "#e8dfd0", GREEN = "#4caf88", RED = "#e74c3c", BG = "#0b1622";
const SERIES = ["#c59b44", "#5dade2", "#4caf88", "#e07a5f", "#b39ddb"];
const bandColor = b => b >= 7 ? GREEN : b >= 6 ? GOLD : RED;

// ---------- Графики Task 1 (SVG) ----------
function Legend({ names }) {
  return (
    <div style={{ display: "flex", flexWrap: "wrap", gap: "6px 14px", justifyContent: "center", marginTop: 8, fontSize: 12, color: TXT }}>
      {names.map((n, i) => (
        <span key={n} style={{ display: "inline-flex", alignItems: "center", gap: 6 }}>
          <span style={{ width: 12, height: 12, borderRadius: 2, background: SERIES[i % SERIES.length] }} />{n}
        </span>
      ))}
    </div>
  );
}

function Axes({ W, H, P, yMax, xLabels, yUnit, xCenter }) {
  const ticks = 5;
  return (
    <g fontSize="11" fill={MUTED}>
      {Array.from({ length: ticks + 1 }, (_, i) => {
        const v = (yMax / ticks) * i, y = H - P.b - (H - P.t - P.b) * (i / ticks);
        return (
          <g key={i}>
            <line x1={P.l} x2={W - P.r} y1={y} y2={y} stroke="rgba(255,255,255,.08)" />
            <text x={P.l - 6} y={y + 4} textAnchor="end">{Math.round(v)}</text>
          </g>
        );
      })}
      {xLabels.map((l, i) => <text key={l} x={xCenter(i)} y={H - P.b + 16} textAnchor="middle">{l}</text>)}
      <text x={P.l} y={P.t - 8} fill={MUTED}>{yUnit}</text>
    </g>
  );
}

function LineChart({ chart }) {
  const W = 360, H = 240, P = { l: 34, r: 12, t: 22, b: 26 };
  const n = chart.xLabels.length;
  const x = i => P.l + (W - P.l - P.r) * (i / (n - 1));
  const y = v => H - P.b - (H - P.t - P.b) * (v / chart.yMax);
  return (
    <div>
      <svg viewBox={`0 0 ${W} ${H}`} style={{ width: "100%", maxWidth: 520, display: "block", margin: "0 auto" }} role="img" aria-label="Line graph">
        <Axes W={W} H={H} P={P} yMax={chart.yMax} xLabels={chart.xLabels} yUnit={chart.yUnit} xCenter={x} />
        {chart.series.map((s, si) => (
          <g key={s.name}>
            <polyline fill="none" stroke={SERIES[si]} strokeWidth="2.5" points={s.values.map((v, i) => `${x(i)},${y(v)}`).join(" ")} />
            {s.values.map((v, i) => <circle key={i} cx={x(i)} cy={y(v)} r="3.5" fill={SERIES[si]} />)}
          </g>
        ))}
      </svg>
      <Legend names={chart.series.map(s => s.name)} />
    </div>
  );
}

function BarChart({ chart }) {
  const W = 360, H = 240, P = { l: 34, r: 8, t: 22, b: 26 };
  const n = chart.xLabels.length, k = chart.series.length;
  const groupW = (W - P.l - P.r) / n, barW = (groupW * 0.8) / k;
  const xc = i => P.l + groupW * i + groupW / 2;
  const y = v => H - P.b - (H - P.t - P.b) * (v / chart.yMax);
  return (
    <div>
      <svg viewBox={`0 0 ${W} ${H}`} style={{ width: "100%", maxWidth: 520, display: "block", margin: "0 auto" }} role="img" aria-label="Bar chart">
        <Axes W={W} H={H} P={P} yMax={chart.yMax} xLabels={chart.xLabels} yUnit={chart.yUnit} xCenter={xc} />
        {chart.xLabels.map((_, i) => chart.series.map((s, si) => (
          <rect key={`${i}-${si}`} x={P.l + groupW * i + groupW * 0.1 + barW * si} y={y(s.values[i])} width={barW - 1.5}
            height={H - P.b - y(s.values[i])} fill={SERIES[si]} rx="1.5" />
        )))}
      </svg>
      <Legend names={chart.series.map(s => s.name)} />
    </div>
  );
}

function PieChart({ chart }) {
  const names = chart.pies[0].parts.map(p => p[0]);
  const R = 70, C = 80;
  const arcs = parts => {
    let a0 = -Math.PI / 2;
    return parts.map(([name, v], i) => {
      const a1 = a0 + (v / 100) * Math.PI * 2;
      const large = a1 - a0 > Math.PI ? 1 : 0;
      const d = `M${C},${C} L${C + R * Math.cos(a0)},${C + R * Math.sin(a0)} A${R},${R} 0 ${large} 1 ${C + R * Math.cos(a1)},${C + R * Math.sin(a1)} Z`;
      const mid = (a0 + a1) / 2;
      const lbl = { x: C + R * 0.66 * Math.cos(mid), y: C + R * 0.66 * Math.sin(mid) + 4 };
      a0 = a1;
      return <g key={name}><path d={d} fill={SERIES[i]} stroke={BG} strokeWidth="1.5" />{v >= 5 && <text x={lbl.x} y={lbl.y} textAnchor="middle" fontSize="11" fill={BG} fontWeight="700">{v}%</text>}</g>;
    });
  };
  return (
    <div>
      <div style={{ display: "flex", justifyContent: "center", gap: 10, flexWrap: "wrap" }}>
        {chart.pies.map(p => (
          <div key={p.label} style={{ textAlign: "center" }}>
            <svg viewBox="0 0 160 160" style={{ width: 150 }} role="img" aria-label={`Pie chart ${p.label}`}>{arcs(p.parts)}</svg>
            <div style={{ color: GOLD, fontWeight: 600, fontSize: 13 }}>{p.label}</div>
          </div>
        ))}
      </div>
      <Legend names={names} />
    </div>
  );
}

function TableChart({ chart }) {
  return (
    <div style={{ overflowX: "auto" }}>
      <table>
        <thead><tr>{chart.columns.map(c => <th key={c}>{c}</th>)}</tr></thead>
        <tbody>{chart.rows.map(r => <tr key={r[0]}>{r.map((c, i) => <td key={i} style={{ color: i === 0 ? TXT : undefined }}>{c}</td>)}</tr>)}</tbody>
      </table>
    </div>
  );
}

function ProcessChart({ chart }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 0 }}>
      {chart.steps.map((s, i) => (
        <div key={i} style={{ display: "flex", flexDirection: "column", alignItems: "center", width: "100%", maxWidth: 380 }}>
          <div style={{ width: "100%", background: "#172f4a", border: `1px solid rgba(197,155,68,.3)`, borderRadius: 8, padding: "8px 12px", fontSize: 13, color: TXT, display: "flex", gap: 10 }}>
            <b style={{ color: GOLD }}>{i + 1}</b><span>{s}</span>
          </div>
          {i < chart.steps.length - 1 && <div style={{ color: GOLD, fontSize: 16, lineHeight: "18px" }}>↓</div>}
        </div>
      ))}
    </div>
  );
}

export function Task1Chart({ task }) {
  const C = { line: LineChart, bar: BarChart, pie: PieChart, table: TableChart, process: ProcessChart }[task.chartType];
  return C ? <div style={{ background: BG, borderRadius: 10, padding: 14, marginBottom: 14 }}><C chart={task.chart} /></div> : null;
}

// ---------- Оценка ----------
const buildSystem = (taskNo) => `You are an experienced, strictly calibrated IELTS Academic Writing examiner.
Assess a candidate's Writing Task ${taskNo} response using the public IELTS Writing band descriptors:
${taskNo === 1 ? "Task Achievement" : "Task Response"}, Coherence and Cohesion, Lexical Resource, Grammatical Range and Accuracy.
Rules:
- Give each criterion a whole band from 0 to 9. Do not inflate; typical B2 writing is Band 5–6.
- Minimum length is ${WRITING_FORMAT[taskNo].minWords} words; penalise underlength in ${taskNo === 1 ? "Task Achievement" : "Task Response"}.
${taskNo === 1
    ? "- Task 1: check for a clear overview, accurate data selection, comparisons; personal opinion or invented data lowers Task Achievement."
    : "- Task 2: check that every part of the question is answered and that a clear position runs through the essay; an off-topic or partly relevant answer lowers Task Response."}
- The student is a future English teacher. Write all explanations in Russian. Quote the candidate's own English words exactly.
- Socratic feedback: for each priority, name the problem and ask one guiding question that helps the student find the fix. Do not rewrite the essay.
- Improve exactly one weak sentence as a model.
Return JSON only, with this shape:
{"bands":{"ta":0,"cc":0,"lr":0,"gra":0},
 "comments":{"ta":"","cc":"","lr":"","gra":""},
 "strengths":["",""],
 "priorities":[{"criterion":"ta|cc|lr|gra","quote":"","problem":"","question":""}],
 "modelSentence":{"original":"","improved":""},
 "nextStep":""}
Give 3 priorities, ordered by impact on the band.`;

export default function WritingPage({ studentName, onSaveResult, onAskAi }) {
  const [taskNo, setTaskNo] = useState(1);
  const [taskId, setTaskId] = useState(null);
  const [text, setText] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");
  const [showCrit, setShowCrit] = useState(false);
  const [secs, setSecs] = useState(null);
  const timer = useRef(null);

  const list = taskNo === 1 ? TASK1 : TASK2;
  const task = list.find(t => t.id === taskId);
  const fmt = WRITING_FORMAT[taskNo];
  const words = countWords(text);

  // черновик хранится в браузере, чтобы текст не пропал при закрытии страницы
  useEffect(() => {
    if (!taskId) return;
    try { setText(localStorage.getItem(`cw_w_${taskId}`) || ""); } catch { setText(""); }
  }, [taskId]);
  useEffect(() => {
    if (!taskId) return;
    try { localStorage.setItem(`cw_w_${taskId}`, text); } catch {}
  }, [text, taskId]);
  useEffect(() => () => clearInterval(timer.current), []);

  const startTimer = () => {
    clearInterval(timer.current);
    setSecs(fmt.minutes * 60);
    timer.current = setInterval(() => setSecs(s => (s > 0 ? s - 1 : 0)), 1000);
  };

  const open = (id) => { setTaskId(id); setResult(null); setErr(""); setSecs(null); clearInterval(timer.current); window.scrollTo({ top: 0 }); };
  const close = () => { setTaskId(null); setResult(null); setErr(""); clearInterval(timer.current); setSecs(null); };

  const assess = async () => {
    setLoading(true); setErr("");
    try {
      const promptText = `TASK ${taskNo} PROMPT:\n${task.prompt}\n` +
        (taskNo === 1 ? `\nDATA SHOWN IN THE VISUAL:\n${chartAsText(task)}\n` : "") +
        `\nCANDIDATE RESPONSE (${words} words):\n${text}`;
      const r = await callGemini({ system: buildSystem(taskNo), parts: [{ text: promptText }] });
      const b = r.bands || {};
      const crit = WRITING_CRITERIA[taskNo];
      const overall = overallBand(crit.map(c => Number(b[c.key])));
      const full = { ...r, overall, words };
      setResult(full);
      clearInterval(timer.current);
      onSaveResult({
        cert: "IELTS",
        mod: `Writing Task ${taskNo}: ${task.title}`,
        score: Math.round(overall * 10), total: 90, pct: Math.round((overall / 9) * 100),
        date: new Date().toISOString(),
        student: studentName || "Студент",
        details: [
          ...crit.map(c => ({ question: `${c.name}: Band ${b[c.key]}`, ok: Number(b[c.key]) >= 7, userAnswer: `Band ${b[c.key]} — ${r.comments?.[c.key] || ""}`, correctAnswer: "Band 7+" })),
          { kind: "text", question: `Текст студента (${words} слов)`, ok: true, userAnswer: text },
          { kind: "text", question: "Обратная связь AI", ok: true, userAnswer: [
            r.strengths?.length ? `Сильные стороны:\n${r.strengths.map(x => `• ${x}`).join("\n")}` : "",
            r.priorities?.length ? `Приоритеты:\n${r.priorities.map((p, i) => `${i + 1}. ${p.problem}${p.quote ? ` («${p.quote}»)` : ""}${p.question ? `\n   Вопрос: ${p.question}` : ""}`).join("\n")}` : "",
            r.modelSentence?.original ? `Пример улучшения: «${r.modelSentence.original}» → «${r.modelSentence.improved}»` : "",
            r.nextStep ? `Следующий шаг: ${r.nextStep}` : "",
          ].filter(Boolean).join("\n\n") || "—" },
        ],
      });
    } catch (e) { setErr(e.message); }
    setLoading(false);
  };

  const discuss = () => {
    const top = result?.priorities?.[0];
    onAskAi([
      `Помоги мне улучшить мой ответ IELTS Writing Task ${taskNo} («${task.title}»).`,
      `AI-оценка: Band ${result.overall}.`,
      top ? `Главная проблема: ${top.problem} (фрагмент: «${top.quote}»).` : "",
      `Мой текст:\n${text}`,
      "Не переписывай за меня — задавай наводящие вопросы, чтобы я сам(а) исправил(а) текст.",
    ].filter(Boolean).join("\n"));
  };

  // ---------- Список заданий ----------
  if (!task) return (
    <div>
      <div className="st">✍️ Writing</div>
      <div className="sb">IELTS Academic Writing: пишите ответ на сайте, AI оценивает его по четырём критериям IELTS и задаёт наводящие вопросы.</div>
      <div className="tabs">
        {[1, 2].map(n => <button key={n} className={`tab${taskNo === n ? " on" : ""}`} onClick={() => setTaskNo(n)}>Task {n}</button>)}
      </div>
      <div className="tip" style={{ marginTop: 0, marginBottom: 16 }}><b>Формат:</b> {fmt.ru}</div>
      <button className="btn btn-o btn-sm" style={{ marginBottom: 14 }} onClick={() => setShowCrit(s => !s)}>{showCrit ? "Скрыть критерии" : "Критерии оценки"}</button>
      {showCrit && (
        <div className="card" style={{ marginBottom: 16 }}>
          {WRITING_CRITERIA[taskNo].map(c => (
            <div key={c.key} style={{ marginBottom: 10 }}>
              <div style={{ color: GOLD, fontWeight: 600, fontSize: 14 }}>{c.name} <span style={{ color: MUTED, fontWeight: 400 }}>· {c.ru}</span></div>
              <div style={{ fontSize: 13, color: "#c0b8a8", lineHeight: 1.6 }}>{c.what}</div>
            </div>
          ))}
          <div style={{ fontSize: 12, color: MUTED }}>Каждый критерий — 25% оценки. Итоговый балл — среднее, округлённое до 0,5.</div>
        </div>
      )}
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        {list.map(t => {
          let draft = 0; try { draft = countWords(localStorage.getItem(`cw_w_${t.id}`) || ""); } catch {}
          return (
            <button key={t.id} className="cbtn" onClick={() => open(t.id)}>
              <div style={{ fontSize: 11.5, color: MUTED, textTransform: "uppercase", letterSpacing: ".6px" }}>{taskNo === 1 ? t.chartType : t.type}</div>
              <h3 style={{ fontSize: 17 }}>{t.title}</h3>
              {draft > 0 && <p>Черновик: {draft} слов</p>}
            </button>
          );
        })}
      </div>
    </div>
  );

  // ---------- Задание ----------
  return (
    <div>
      <button className="btn btn-o btn-sm" onClick={close} style={{ marginBottom: 14 }}>← Все задания</button>
      <div className="qcard">
        <div className="qnum">Writing Task {taskNo} · {taskNo === 1 ? task.chartType : task.type}</div>
        <div style={{ fontSize: 15, lineHeight: 1.7, color: TXT, whiteSpace: "pre-line", marginBottom: 14 }}>{task.prompt}</div>
        {taskNo === 1 && <Task1Chart task={task} />}
        <div style={{ fontSize: 13, color: MUTED, marginBottom: 6 }}>Write at least {fmt.minWords} words.</div>
        <details style={{ marginBottom: 14 }}>
          <summary style={{ cursor: "pointer", color: GOLD, fontSize: 13 }}>Подсказки перед письмом</summary>
          <ul style={{ margin: "8px 0 0 18px", fontSize: 13, color: "#c0b8a8", lineHeight: 1.7 }}>{task.tips.map((h, i) => <li key={i}>{h}</li>)}</ul>
        </details>

        <div className="row" style={{ justifyContent: "space-between", marginBottom: 8, flexWrap: "wrap" }}>
          <span style={{ fontSize: 13, color: words >= fmt.minWords ? GREEN : MUTED }}>Слов: <b>{words}</b> / {fmt.minWords}</span>
          {secs === null
            ? <button className="btn btn-o btn-sm" onClick={startTimer} disabled={!!result}>⏱ Таймер {fmt.minutes} мин</button>
            : <span style={{ fontSize: 13, color: secs === 0 ? RED : GOLD, fontWeight: 600 }}>⏱ {String(Math.floor(secs / 60)).padStart(2, "0")}:{String(secs % 60).padStart(2, "0")}{secs === 0 ? " — время вышло" : ""}</span>}
        </div>
        <textarea rows={14} value={text} onChange={e => setText(e.target.value)} disabled={!!result || loading}
          placeholder="Write your answer here…" style={{ lineHeight: 1.7, fontSize: 14.5, resize: "vertical" }} spellCheck={false} autoCorrect="off" autoCapitalize="sentences" />
        {!result && (
          <div className="row" style={{ marginTop: 12, flexWrap: "wrap" }}>
            <button className="btn" onClick={assess} disabled={loading || words < 40}>{loading ? "AI оценивает…" : "Отправить на оценку"}</button>
            {words > 0 && words < fmt.minWords && <span style={{ fontSize: 12.5, color: GOLD }}>Меньше {fmt.minWords} слов — на экзамене это снижает балл.</span>}
          </div>
        )}
        {err && <div className="exp" style={{ color: RED, borderColor: RED }}>{err}</div>}
      </div>

      {result && (
        <div style={{ marginTop: 18 }}>
          <div className="sdiv">
            <div style={{ fontSize: 13, color: MUTED, marginBottom: 6 }}>AI-оценка · ориентир, не официальный балл</div>
            <div className="sbig" style={{ color: bandColor(result.overall) }}>{result.overall}</div>
          </div>
          <div className="g2" style={{ marginBottom: 16 }}>
            {WRITING_CRITERIA[taskNo].map(c => {
              const b = Number(result.bands?.[c.key]);
              return (
                <div key={c.key} className="card" style={{ padding: 16 }}>
                  <div className="row" style={{ justifyContent: "space-between" }}>
                    <span style={{ fontSize: 13, color: TXT, fontWeight: 600 }}>{c.name}</span>
                    <b style={{ color: bandColor(b), fontSize: 18 }}>{b}</b>
                  </div>
                  <div style={{ fontSize: 13, color: "#c0b8a8", lineHeight: 1.6, marginTop: 6 }}>{result.comments?.[c.key]}</div>
                </div>
              );
            })}
          </div>
          {result.strengths?.length > 0 && (
            <div className="card" style={{ marginBottom: 14 }}>
              <h3>Что получилось</h3>
              <ul style={{ margin: "4px 0 0 18px", fontSize: 13.5, lineHeight: 1.7, color: "#c0b8a8" }}>{result.strengths.map((s, i) => <li key={i}>{s}</li>)}</ul>
            </div>
          )}
          <div className="card" style={{ marginBottom: 14 }}>
            <h3>Над чем работать</h3>
            {(result.priorities || []).map((p, i) => (
              <div key={i} style={{ borderLeft: `3px solid ${GOLD}`, paddingLeft: 12, margin: "12px 0" }}>
                <div style={{ fontSize: 11.5, color: MUTED, textTransform: "uppercase" }}>{WRITING_CRITERIA[taskNo].find(c => c.key === p.criterion)?.name || p.criterion}</div>
                {p.quote && <div style={{ fontStyle: "italic", color: TXT, fontSize: 13.5, margin: "4px 0" }}>«{p.quote}»</div>}
                <div style={{ fontSize: 13.5, color: "#c0b8a8", lineHeight: 1.6 }}>{p.problem}</div>
                <div style={{ fontSize: 13.5, color: GOLD, marginTop: 4 }}>❓ {p.question}</div>
              </div>
            ))}
            {result.modelSentence?.original && (
              <div className="exp">
                <div><b>Было:</b> {result.modelSentence.original}</div>
                <div style={{ marginTop: 4 }}><b>Можно так:</b> {result.modelSentence.improved}</div>
              </div>
            )}
            {result.nextStep && <div className="tip"><b>Следующий шаг:</b> {result.nextStep}</div>}
          </div>
          <div className="row" style={{ flexWrap: "wrap" }}>
            <button className="btn" onClick={discuss}>🤖 Разобрать с AI</button>
            <button className="btn btn-o" onClick={() => { setResult(null); setSecs(null); }}>Исправить и отправить снова</button>
          </div>
        </div>
      )}
    </div>
  );
}
