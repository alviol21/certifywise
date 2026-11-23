/**
 * CertifyWise
 * © 2026 Алназирова Айдана (Aidana Alnazirova). Все права защищены.
 * Дата создания: 22 мая 2026 г.
 * Использование без письменного разрешения автора запрещено.
 */

import { useState, useEffect, useRef } from "react";
import { PART1, PART2, SPEAKING_CRITERIA, SPEAKING_FORMAT, LIMITS, PREP_SECONDS } from "./speakingData";
import { callGemini, overallBand } from "./aiClient";

const GOLD = "#c59b44", MUTED = "#8a7d6d", TXT = "#e8dfd0", GREEN = "#4caf88", RED = "#e74c3c";
const bandColor = b => b >= 7 ? GREEN : b >= 6 ? GOLD : RED;
const mmss = s => `${String(Math.floor(s / 60)).padStart(2, "0")}:${String(s % 60).padStart(2, "0")}`;
const pick = arr => arr[Math.floor(Math.random() * arr.length)];

// ---------- Аудио: запись любого формата браузера → WAV 16 кГц моно для AI ----------
const pickMime = () => {
  if (typeof MediaRecorder === "undefined") return null;
  return ["audio/webm;codecs=opus", "audio/mp4", "audio/webm", "audio/ogg;codecs=opus"].find(t => MediaRecorder.isTypeSupported?.(t)) || "";
};

async function blobToWavBase64(blob) {
  const AC = window.AudioContext || window.webkitAudioContext;
  const ctx = new AC();
  const raw = await blob.arrayBuffer();
  const decoded = await new Promise((res, rej) => ctx.decodeAudioData(raw, res, rej)); // форма с колбэками работает и в старом Safari
  ctx.close?.();
  const rate = 16000, len = Math.max(1, Math.ceil(decoded.duration * rate));
  const OAC = window.OfflineAudioContext || window.webkitOfflineAudioContext;
  const off = new OAC(1, len, rate);
  const src = off.createBufferSource(); src.buffer = decoded; src.connect(off.destination); src.start(0);
  const rendered = await off.startRendering();
  const pcm = rendered.getChannelData(0);
  const buf = new ArrayBuffer(44 + pcm.length * 2), v = new DataView(buf);
  const w = (o, s) => [...s].forEach((c, i) => v.setUint8(o + i, c.charCodeAt(0)));
  w(0, "RIFF"); v.setUint32(4, 36 + pcm.length * 2, true); w(8, "WAVE"); w(12, "fmt ");
  v.setUint32(16, 16, true); v.setUint16(20, 1, true); v.setUint16(22, 1, true); v.setUint32(24, rate, true);
  v.setUint32(28, rate * 2, true); v.setUint16(32, 2, true); v.setUint16(34, 16, true); w(36, "data"); v.setUint32(40, pcm.length * 2, true);
  for (let i = 0; i < pcm.length; i++) { const s = Math.max(-1, Math.min(1, pcm[i])); v.setInt16(44 + i * 2, s < 0 ? s * 0x8000 : s * 0x7fff, true); }
  const bytes = new Uint8Array(buf); let bin = "";
  for (let i = 0; i < bytes.length; i += 0x8000) bin += String.fromCharCode.apply(null, bytes.subarray(i, i + 0x8000));
  return btoa(bin);
}

const SYSTEM = `You are an experienced, strictly calibrated IELTS Speaking examiner.
You receive audio recordings of one candidate. Each recording is preceded by the examiner's question and its part (Part 1, 2 or 3).
Tasks:
1. Transcribe each answer as spoken, in English. Keep fillers briefly (um, er); mark words you cannot hear as [unclear]. An empty or silent recording gives "".
2. Assess the whole performance on the public IELTS Speaking criteria: Fluency and Coherence, Lexical Resource, Grammatical Range and Accuracy, Pronunciation. Whole bands 0–9. Do not inflate; typical B2 speech is Band 5–6. Judge pronunciation from the audio itself.
3. Very short or missing answers lower Fluency and Coherence. If only a few answers were recorded, say in "reliability" that the estimate is approximate.
4. The student is a future English teacher. Write all explanations in Russian; quote the candidate's English words exactly.
5. Socratic feedback: for each priority name the problem and ask one guiding question; do not give a full model answer.
Return JSON only:
{"transcripts":[""],
 "bands":{"fc":0,"lr":0,"gra":0,"p":0},
 "comments":{"fc":"","lr":"","gra":"","p":""},
 "strengths":["",""],
 "priorities":[{"criterion":"fc|lr|gra|p","quote":"","problem":"","question":""}],
 "pronunciation":[{"word":"","note":""}],
 "reliability":"",
 "nextStep":""}
"transcripts" must have exactly one entry per recording, in order. Give 3 priorities and up to 5 pronunciation points.`;

export default function SpeakingPage({ studentName, onSaveResult, onAskAi }) {
  const [mode, setMode] = useState(null);         // part1 | part2 | part3 | full
  const [items, setItems] = useState([]);         // [{ part, q, card? }]
  const [title, setTitle] = useState("");
  const [idx, setIdx] = useState(0);
  const [recs, setRecs] = useState({});           // { idx: { blob, url, secs } }
  const [recording, setRecording] = useState(false);
  const [elapsed, setElapsed] = useState(0);
  const [prep, setPrep] = useState(null);          // секунды подготовки к Part 2
  const [notes, setNotes] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");
  const [showCrit, setShowCrit] = useState(false);
  const mr = useRef(null), chunks = useRef([]), tick = useRef(null), prepTick = useRef(null), stream = useRef(null);

  const cur = items[idx];
  const done = items.length > 0 && items.every((_, i) => recs[i]);

  useEffect(() => () => { clearInterval(tick.current); clearInterval(prepTick.current); stream.current?.getTracks().forEach(t => t.stop()); window.speechSynthesis?.cancel(); }, []);

  const speak = (text) => {
    try {
      const s = window.speechSynthesis; if (!s) return;
      s.cancel();
      const u = new SpeechSynthesisUtterance(text);
      u.lang = "en-GB"; u.rate = 0.95;
      const v = s.getVoices().find(x => x.lang === "en-GB") || s.getVoices().find(x => x.lang?.startsWith("en"));
      if (v) u.voice = v;
      s.speak(u);
    } catch {}
  };

  const begin = (m, list, t) => {
    setMode(m); setItems(list); setTitle(t); setIdx(0); setRecs({}); setResult(null); setErr(""); setNotes(""); setPrep(null);
    window.scrollTo({ top: 0 });
  };
  const startPart1 = (topic) => begin("part1", topic.questions.map(q => ({ part: 1, q })), `Part 1: ${topic.title}`);
  const startPart2 = (c) => begin("part2", [{ part: 2, q: c.card, card: c }], `Part 2: ${c.title}`);
  const startPart3 = (c) => begin("part3", c.part3.map(q => ({ part: 3, q })), `Part 3: ${c.title}`);
  const startFull = () => {
    const t = pick(PART1), c = pick(PART2);
    begin("full", [
      ...t.questions.slice(0, 3).map(q => ({ part: 1, q })),
      { part: 2, q: c.card, card: c },
      ...c.part3.slice(0, 3).map(q => ({ part: 3, q })),
    ], `Полный тест: ${t.title} / ${c.title}`);
  };
  const exit = () => { stopRec(); clearInterval(prepTick.current); setMode(null); setItems([]); setResult(null); window.speechSynthesis?.cancel(); };

  const startPrep = () => {
    setPrep(PREP_SECONDS);
    clearInterval(prepTick.current);
    prepTick.current = setInterval(() => setPrep(p => { if (p <= 1) { clearInterval(prepTick.current); return 0; } return p - 1; }), 1000);
  };

  const startRec = async () => {
    setErr("");
    const mime = pickMime();
    if (mime === null || !navigator.mediaDevices?.getUserMedia) { setErr("Этот браузер не умеет записывать звук. Откройте сайт в Chrome или Safari."); return; }
    try {
      window.speechSynthesis?.cancel();
      clearInterval(prepTick.current);
      stream.current = await navigator.mediaDevices.getUserMedia({ audio: { echoCancellation: true, noiseSuppression: true } });
      const rec = new MediaRecorder(stream.current, mime ? { mimeType: mime } : undefined);
      chunks.current = [];
      rec.ondataavailable = e => { if (e.data.size) chunks.current.push(e.data); };
      const myIdx = idx;
      rec.onstop = () => {
        const blob = new Blob(chunks.current, { type: rec.mimeType || mime || "audio/webm" });
        setRecs(r => ({ ...r, [myIdx]: { blob, url: URL.createObjectURL(blob), secs: elapsedRef.current } }));
        stream.current?.getTracks().forEach(t => t.stop());
      };
      mr.current = rec;
      rec.start();
      setRecording(true); setElapsed(0); elapsedRef.current = 0;
      const limit = LIMITS[items[myIdx].part];
      clearInterval(tick.current);
      tick.current = setInterval(() => {
        elapsedRef.current += 1; setElapsed(elapsedRef.current);
        if (elapsedRef.current >= limit) stopRec();
      }, 1000);
    } catch (e) {
      setErr(e.name === "NotAllowedError" ? "Нет доступа к микрофону. Разрешите микрофон для сайта в настройках браузера." : `Не удалось начать запись: ${e.message}`);
    }
  };
  const elapsedRef = useRef(0);
  const stopRec = () => {
    clearInterval(tick.current);
    if (mr.current && mr.current.state !== "inactive") mr.current.stop();
    setRecording(false);
  };

  const goto = (i) => { stopRec(); setIdx(i); setPrep(null); window.scrollTo({ top: 0 }); };

  const assess = async () => {
    setLoading(true); setErr("");
    try {
      const parts = [{ text: `Candidate's recordings (${items.length}):` }];
      for (let i = 0; i < items.length; i++) {
        const it = items[i];
        const q = it.part === 2 ? `${it.card.card} You should say: ${it.card.points.join("; ")}` : it.q;
        parts.push({ text: `Recording ${i + 1} — Part ${it.part}. Examiner: "${q}"` });
        parts.push({ inline_data: { mime_type: "audio/wav", data: await blobToWavBase64(recs[i].blob) } });
      }
      const r = await callGemini({ system: SYSTEM, parts, maxTokens: 8000 });
      const overall = overallBand(SPEAKING_CRITERIA.map(c => Number(r.bands?.[c.key])));
      setResult({ ...r, overall });
      onSaveResult({
        cert: "IELTS",
        mod: `Speaking ${title}`,
        score: Math.round(overall * 10), total: 90, pct: Math.round((overall / 9) * 100),
        date: new Date().toISOString(),
        student: studentName || "Студент",
        details: [
          ...SPEAKING_CRITERIA.map(c => ({ question: `${c.name}: Band ${r.bands?.[c.key]}`, ok: Number(r.bands?.[c.key]) >= 7, userAnswer: `Band ${r.bands?.[c.key]} — ${r.comments?.[c.key] || ""}`, correctAnswer: "Band 7+" })),
          ...items.map((it, i) => ({ kind: "text", ok: true, question: `Part ${it.part}: ${it.q}`, userAnswer: r.transcripts?.[i] || "—" })),
          { kind: "text", question: "Обратная связь AI", ok: true, userAnswer: [
            r.strengths?.length ? `Сильные стороны:\n${r.strengths.map(x => `• ${x}`).join("\n")}` : "",
            r.priorities?.length ? `Приоритеты:\n${r.priorities.map((p, i) => `${i + 1}. ${p.problem}${p.quote ? ` («${p.quote}»)` : ""}${p.question ? `\n   Вопрос: ${p.question}` : ""}`).join("\n")}` : "",
            r.pronunciation?.length ? `Произношение:\n${r.pronunciation.map(x => `• ${x.word} — ${x.note}`).join("\n")}` : "",
            r.reliability ? `Надёжность оценки: ${r.reliability}` : "",
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
      `Помоги мне улучшить мой ответ IELTS Speaking (${title}). AI-оценка: Band ${result.overall}.`,
      top ? `Главная проблема: ${top.problem} (фрагмент: «${top.quote}»).` : "",
      "Расшифровка моих ответов:",
      ...items.map((it, i) => `${it.part === 2 ? it.card.card : it.q}\n→ ${result.transcripts?.[i] || "—"}`),
      "Не давай готовый ответ — задавай наводящие вопросы, чтобы я сам(а) сказал(а) лучше.",
    ].filter(Boolean).join("\n"));
  };

  // ---------- Выбор режима ----------
  if (!mode) return (
    <div>
      <div className="st">🎙 Speaking</div>
      <div className="sb">Отвечайте голосом с телефона. AI расшифровывает ответы и оценивает их по четырём критериям IELTS, включая произношение.</div>
      <div className="card" style={{ marginBottom: 16, padding: 16 }}>
        {SPEAKING_FORMAT.map(([k, v]) => <div key={k} style={{ fontSize: 13, color: "#c0b8a8", marginBottom: 4 }}><b style={{ color: GOLD }}>{k}:</b> {v}</div>)}
        <button className="btn btn-o btn-sm" style={{ marginTop: 10 }} onClick={() => setShowCrit(s => !s)}>{showCrit ? "Скрыть критерии" : "Критерии оценки"}</button>
        {showCrit && SPEAKING_CRITERIA.map(c => (
          <div key={c.key} style={{ marginTop: 10 }}>
            <div style={{ color: GOLD, fontWeight: 600, fontSize: 14 }}>{c.name} <span style={{ color: MUTED, fontWeight: 400 }}>· {c.ru}</span></div>
            <div style={{ fontSize: 13, color: "#c0b8a8", lineHeight: 1.6 }}>{c.what}</div>
          </div>
        ))}
      </div>
      <button className="cbtn" style={{ marginBottom: 18 }} onClick={startFull}>
        <div style={{ fontSize: 11.5, color: MUTED, textTransform: "uppercase" }}>Пробный тест · около 10 минут</div>
        <h3 style={{ fontSize: 18 }}>Полный Speaking: Part 1 → Part 2 → Part 3</h3>
        <p>Случайная тема Part 1 и случайная карточка</p>
      </button>
      <h3 style={{ color: GOLD, fontSize: 17, marginBottom: 8 }}>Part 1</h3>
      <div className="g2" style={{ marginBottom: 18 }}>
        {PART1.map(t => <button key={t.id} className="cbtn" onClick={() => startPart1(t)}><h3 style={{ fontSize: 16 }}>{t.title}</h3><p>{t.questions.length} вопроса</p></button>)}
      </div>
      <h3 style={{ color: GOLD, fontSize: 17, marginBottom: 8 }}>Part 2 и Part 3</h3>
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        {PART2.map(c => (
          <div key={c.id} className="card" style={{ padding: 14 }}>
            <div style={{ fontSize: 15, color: TXT, fontFamily: "Lora, serif", marginBottom: 8 }}>{c.card}</div>
            <div className="row" style={{ flexWrap: "wrap" }}>
              <button className="btn btn-sm" onClick={() => startPart2(c)}>Part 2 · карточка</button>
              <button className="btn btn-o btn-sm" onClick={() => startPart3(c)}>Part 3 · обсуждение</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  // ---------- Результат ----------
  if (result) return (
    <div>
      <button className="btn btn-o btn-sm" onClick={exit} style={{ marginBottom: 14 }}>← К выбору заданий</button>
      <div className="st" style={{ fontSize: 20 }}>{title}</div>
      <div className="sdiv" style={{ marginTop: 10 }}>
        <div style={{ fontSize: 13, color: MUTED, marginBottom: 6 }}>AI-оценка · ориентир, не официальный балл</div>
        <div className="sbig" style={{ color: bandColor(result.overall) }}>{result.overall}</div>
        {result.reliability && <div style={{ fontSize: 12.5, color: MUTED, marginTop: 8 }}>{result.reliability}</div>}
      </div>
      <div className="g2" style={{ marginBottom: 16 }}>
        {SPEAKING_CRITERIA.map(c => {
          const b = Number(result.bands?.[c.key]);
          return (
            <div key={c.key} className="card" style={{ padding: 16 }}>
              <div className="row" style={{ justifyContent: "space-between" }}><span style={{ fontSize: 13, fontWeight: 600 }}>{c.name}</span><b style={{ color: bandColor(b), fontSize: 18 }}>{b}</b></div>
              <div style={{ fontSize: 13, color: "#c0b8a8", lineHeight: 1.6, marginTop: 6 }}>{result.comments?.[c.key]}</div>
            </div>
          );
        })}
      </div>
      <div className="card" style={{ marginBottom: 14 }}>
        <h3>Ваши ответы</h3>
        {items.map((it, i) => (
          <div key={i} style={{ margin: "12px 0", borderBottom: "1px solid rgba(255,255,255,.06)", paddingBottom: 10 }}>
            <div style={{ fontSize: 12, color: MUTED }}>Part {it.part}</div>
            <div style={{ fontSize: 13.5, color: GOLD, marginBottom: 4 }}>{it.q}</div>
            <audio controls src={recs[i]?.url} style={{ width: "100%", height: 36, marginBottom: 6 }} />
            <div style={{ fontSize: 13.5, color: "#c0b8a8", lineHeight: 1.6 }}>{result.transcripts?.[i] || "—"}</div>
          </div>
        ))}
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
            <div style={{ fontSize: 11.5, color: MUTED, textTransform: "uppercase" }}>{SPEAKING_CRITERIA.find(c => c.key === p.criterion)?.name || p.criterion}</div>
            {p.quote && <div style={{ fontStyle: "italic", color: TXT, fontSize: 13.5, margin: "4px 0" }}>«{p.quote}»</div>}
            <div style={{ fontSize: 13.5, color: "#c0b8a8", lineHeight: 1.6 }}>{p.problem}</div>
            <div style={{ fontSize: 13.5, color: GOLD, marginTop: 4 }}>❓ {p.question}</div>
          </div>
        ))}
        {result.pronunciation?.length > 0 && (
          <div className="exp">
            <b>Произношение:</b>
            <ul style={{ margin: "6px 0 0 18px" }}>{result.pronunciation.map((p, i) => <li key={i}><b>{p.word}</b> — {p.note}</li>)}</ul>
          </div>
        )}
        {result.nextStep && <div className="tip"><b>Следующий шаг:</b> {result.nextStep}</div>}
      </div>
      <div className="row" style={{ flexWrap: "wrap" }}>
        <button className="btn" onClick={discuss}>🤖 Разобрать с AI</button>
        <button className="btn btn-o" onClick={() => { setResult(null); setRecs({}); setIdx(0); }}>Пройти заново</button>
      </div>
    </div>
  );

  // ---------- Вопрос и запись ----------
  const rec = recs[idx];
  const limit = LIMITS[cur.part];
  return (
    <div>
      <button className="btn btn-o btn-sm" onClick={exit} style={{ marginBottom: 14 }}>← Выйти</button>
      <div className="pbar"><div className="pfill" style={{ width: `${(Object.keys(recs).length / items.length) * 100}%` }} /></div>
      <div className="qcard">
        <div className="qnum">{title} · вопрос {idx + 1} из {items.length}{mode === "full" ? ` · Part ${cur.part}` : ""}</div>
        {cur.part === 2 ? (
          <div style={{ background: "#0b1622", border: `1px solid rgba(197,155,68,.3)`, borderRadius: 10, padding: 16, marginBottom: 14 }}>
            <div style={{ fontFamily: "Lora, serif", fontSize: 17, color: TXT, marginBottom: 8 }}>{cur.card.card}</div>
            <div style={{ fontSize: 13, color: MUTED, marginBottom: 4 }}>You should say:</div>
            <ul style={{ margin: "0 0 0 18px", fontSize: 14, color: "#c0b8a8", lineHeight: 1.7 }}>{cur.card.points.map((p, i) => <li key={i}>{p}</li>)}</ul>
          </div>
        ) : (
          <div className="qtext">{cur.q}</div>
        )}
        <button className="btn btn-o btn-sm" onClick={() => speak(cur.part === 2 ? `${cur.card.card} You should say: ${cur.card.points.join(". ")}` : cur.q)} style={{ marginBottom: 14 }}>🔊 Прослушать вопрос</button>

        {cur.part === 2 && !rec && !recording && (
          <div style={{ marginBottom: 14 }}>
            {prep === null
              ? <button className="btn btn-sm" onClick={startPrep}>Начать подготовку (1 минута)</button>
              : <div style={{ fontSize: 14, color: prep === 0 ? GREEN : GOLD, fontWeight: 600, marginBottom: 6 }}>{prep === 0 ? "Подготовка окончена — говорите" : `Подготовка: ${mmss(prep)}`}</div>}
            {prep !== null && <textarea rows={4} value={notes} onChange={e => setNotes(e.target.value)} placeholder="Короткие заметки (не читайте их вслух целиком)" style={{ marginTop: 8 }} />}
          </div>
        )}

        <div style={{ display: "flex", alignItems: "center", gap: 12, flexWrap: "wrap" }}>
          {!recording
            ? <button className="btn" onClick={startRec} style={{ background: RED, color: "#fff" }}>● {rec ? "Перезаписать" : "Записать ответ"}</button>
            : <button className="btn" onClick={stopRec}>■ Остановить</button>}
          <span style={{ fontSize: 13.5, color: recording ? RED : MUTED, fontWeight: recording ? 600 : 400 }}>
            {recording ? `Идёт запись ${mmss(elapsed)} / ${mmss(limit)}` : rec ? `Записано: ${mmss(rec.secs || 0)}` : `До ${mmss(limit)}`}
          </span>
        </div>
        {cur.part === 2 && <div style={{ fontSize: 12.5, color: MUTED, marginTop: 8 }}>Старайтесь говорить 1–2 минуты: короче минуты — снижается Fluency and Coherence.</div>}
        {rec && !recording && <audio controls src={rec.url} style={{ width: "100%", height: 36, marginTop: 12 }} />}
        {err && <div className="exp" style={{ color: RED, borderColor: RED }}>{err}</div>}

        <div className="row" style={{ marginTop: 16, justifyContent: "space-between", flexWrap: "wrap" }}>
          <button className="btn btn-o btn-sm" disabled={idx === 0 || recording} onClick={() => goto(idx - 1)}>← Назад</button>
          {idx < items.length - 1
            ? <button className="btn btn-sm" disabled={!rec || recording} onClick={() => goto(idx + 1)}>Следующий вопрос →</button>
            : <button className="btn btn-sm" disabled={!done || recording || loading} onClick={assess}>{loading ? "AI слушает и оценивает…" : "Отправить на оценку"}</button>}
        </div>
      </div>
    </div>
  );
}
