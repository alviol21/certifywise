/**
 * CertifyWise
 * © 2026 Альназирова Айдана (Aidana Alnazirova). Все права защищены.
 * Дата создания: 22 мая 2026 г.
 * Использование без письменного разрешения автора запрещено.
 *
 * Обучающий модуль: 12 уроков по модели ADDIE-AI, 7 блоков в каждом.
 * Результат урока сохраняется одной строкой в таблицу progress (раздел «Уроки» в панели учителя):
 * балл проверки (или диагностики), уверенность до/после, уровень и реплики AI-практики, рефлексия, время.
 */

import { useState, useEffect, useRef, useMemo } from "react";
import { LESSONS, DIAG_A, DIAG_B } from "./lessonsData";
import { LESSON_EXTRA } from "./lessonsExtra";
import { GEMINI_MODEL, getGeminiKey, shuffle, fetchGemini } from "./aiClient";
import { supabase } from "./supabaseClient";
import MdText from "./MdText";

// Термины проверяются так же, как в DELTA Module One на вкладке «TKT · CELTA · DELTA»
const normTerm = s => (s || "").toLowerCase().replace(/[^a-z\s-]/g, "").replace(/\s+/g, " ").trim();
const termOk = (val, accept) => accept.some(a => normTerm(a) === normTerm(val));

// Банк повторения: вопросы проверки и TKT-формата из уроков 2–11
const REVIEW_POOL = LESSONS.flatMap(l => {
  const own = Array.isArray(l.check) ? l.check.map(q => ({ n: l.n, q: q.q, opts: q.opts, ans: q.ans, exp: q.exp })) : [];
  const ex = (LESSON_EXTRA[l.n]?.exam || []).filter(t => t.type === "mcq3")
    .flatMap(t => t.items.map(it => ({ n: l.n, q: it.text, opts: it.opts, ans: it.answer, exp: it.exp })));
  // урок 12 — последний, повторять его не нужно; в уроке 1 вместо проверки диагностика, берём только формат TKT
  return l.n === 12 ? [] : l.n === 1 ? ex : [...own, ...ex];
});
// 3 вопроса: один из предыдущего урока и два из более ранних (если есть)
const pickReview = n => {
  const idx = REVIEW_POOL.map((q, i) => [q, i]);
  const prev = shuffle(idx.filter(([q]) => q.n === n - 1)).map(([, i]) => i);
  const older = shuffle(idx.filter(([q]) => q.n < n - 1)).map(([, i]) => i);
  const pick = [...prev.slice(0, older.length ? 1 : 3), ...older.slice(0, 2)];
  return pick.length < 3 ? [...pick, ...prev.slice(1, 1 + 3 - pick.length)] : pick;
};

const GOLD = "#c59b44", MUTED = "#8a7d6d", TXT = "#e8dfd0", GREEN = "#4caf88", RED = "#e74c3c", BG = "#0b1622", CARD = "#12253b";
const pctColor = p => (p >= 80 ? GREEN : p >= 60 ? GOLD : RED);
const pad = n => String(n).padStart(2, "0");
export const LESSON_PREFIX = "Урок";

const BLOCKS = [
  { k: "entry", label: "Вход", stage: "Analysis" },
  { k: "theory", label: "Теория", stage: "Design" },
  { k: "case", label: "Случай", stage: "Development" },
  { k: "check", label: "Проверка", stage: "Development" },
  { k: "ai", label: "AI-практика", stage: "Implementation" },
  { k: "transfer", label: "Экзамен", stage: "Implementation" },
  { k: "reflect", label: "Рефлексия", stage: "Evaluation" },
];
const LEVELS = {
  TKT: "узнать и назвать",
  CELTA: "применить на уроке",
  DELTA: "обосновать теорией",
};
const QUICK = [
  "Дай подсказку, с чего начать",
  "Проверь мой ответ: чего не хватает?",
  "Объясни термин из задания на простом примере",
];

const NO_EXTRA = { glossary: [], confuse: [], exam: [], deltaTerms: [], models: {} };
const checkItemsOf = lesson => (lesson.check === "DIAG_A" ? DIAG_A : lesson.check === "DIAG_B" ? DIAG_B : lesson.check);
const isDiag = lesson => typeof lesson.check === "string";
const moduleName = lesson =>
  `${LESSON_PREFIX} ${pad(lesson.n)}: ${lesson.ru}` + (lesson.check === "DIAG_A" ? " · входная диагностика" : lesson.check === "DIAG_B" ? " · итоговая диагностика" : "");
const lessonNoOf = mod => { const m = /^Урок (\d+)/.exec(mod || ""); return m ? +m[1] : null; };

const emptyDraft = n => ({
  step: 0, startedAt: Date.now(),
  review: n > 1 ? pickReview(n) : [], reviewAns: {},
  entry: {}, confBefore: 0,
  caseAnswer: "", caseShown: false,
  checkAns: {}, examAns: {}, termAns: {}, checkDone: false,
  level: "", variant: 0, chat: [], modelShown: false,
  applyText: "",
  reflectUnderstood: "", reflectUnclear: "", confAfter: 0,
});

// ---------- Многоходовой диалог с Gemini (сократический тьютор урока) ----------
async function tutorReply({ lesson, level, variant, history }) {
  const key = getGeminiKey();
  if (!key) throw new Error("Нужен Gemini API ключ: откройте «AI-Репетитор» и нажмите «Настроить API».");
  const p = lesson.practice[level];
  const system = [
    "You are a Socratic tutor on CertifyWise, a platform that prepares future English teachers for TKT, CELTA, DELTA and IELTS.",
    `Lesson ${lesson.n}: ${lesson.title}. Task level: ${level} (${level === "TKT" ? "recognise and name" : level === "CELTA" ? "apply in a real lesson" : "justify with theory and compare approaches"}).`,
    `TASK: ${p.task}`,
    `MATERIAL: ${p.variants[variant]}`,
    `KEY POINTS OF A STRONG ANSWER (hidden from the student, never copy them out): ${p.key}`,
    "RULES:",
    "- Never give the full answer. Guide with one or two short leading questions at a time.",
    "- If the student's answer is partly right, say exactly what is right, then ask a question that points to what is missing.",
    "- If the student is stuck, give a small hint or a simpler sub-question, or a classroom example, not the solution.",
    "- When the answer covers the key points, confirm it clearly, summarise it in 2–3 sentences and suggest how the topic appears in the exam.",
    `- Match the depth to the level: ${level} questions should be at real ${level} exam depth.`,
    "- Reply in the language the student writes in (Russian, Kazakh or English); keep English terminology in English.",
    "- Keep each reply under 120 words. Do not police informal language.",
    "- Write plain text: no headings or tables; use **bold** only for a key term.",
  ].join("\n");
  // Gemini требует чередования ролей: подряд идущие реплики одной стороны (например, после ошибки сети) склеиваются
  const contents = [];
  history.forEach(m => {
    const role = m.r === "a" ? "model" : "user", last = contents[contents.length - 1];
    if (last && last.role === role) last.parts[0].text += "\n\n" + m.t;
    else contents.push({ role, parts: [{ text: m.t }] });
  });
  const res = await fetchGemini(`https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent?key=${key}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      system_instruction: { parts: [{ text: system }] },
      contents,
      generationConfig: { maxOutputTokens: 900, temperature: 0.6 },
    }),
  });
  const data = await res.json();
  if (data.error) throw new Error(data.error.message);
  const text = (data.candidates?.[0]?.content?.parts || []).map(x => x.text || "").join("").trim();
  if (!text) throw new Error("AI не вернул ответ, попробуйте ещё раз.");
  return text;
}

// ===================== Шкала уверенности =====================
function Confidence({ value, onChange, label }) {
  return (
    <div style={{ marginTop: 16 }}>
      <div style={{ fontSize: 14, color: TXT, marginBottom: 8 }}>{label}</div>
      <div style={{ display: "flex", gap: 6 }}>
        {[1, 2, 3, 4, 5].map(v => (
          <button key={v} onClick={() => onChange(v)} aria-label={`Уверенность ${v}`}
            style={{ flex: 1, padding: "10px 0", borderRadius: 8, cursor: "pointer", fontWeight: 700, fontSize: 15,
              background: value === v ? GOLD : BG, color: value === v ? BG : TXT, border: `1px solid ${value === v ? GOLD : "rgba(255,255,255,.12)"}` }}>{v}</button>
        ))}
      </div>
      <div style={{ display: "flex", justifyContent: "space-between", fontSize: 11.5, color: MUTED, marginTop: 4 }}>
        <span>совсем не уверен(а)</span><span>полностью уверен(а)</span>
      </div>
    </div>
  );
}

// 16px — меньше iPhone увеличивает страницу при вводе
const Area = props => <textarea rows={3} {...props} style={{ fontSize: 16, lineHeight: 1.55, resize: "vertical", ...(props.style || {}) }} />;

// ===================== Один урок =====================
function Lesson({ lesson, uid, studentName, onSave, onNavigate, onBack, onDone }) {
  const storeKey = `cw_lesson_${uid || "anon"}_${lesson.n}`;
  const [d, setD] = useState(() => {
    try { const s = JSON.parse(localStorage.getItem(storeKey) || "null"); if (s && s.startedAt) return { ...emptyDraft(lesson.n), ...s }; } catch {}
    return emptyDraft(lesson.n);
  });
  const set = patch => setD(p => ({ ...p, ...(typeof patch === "function" ? patch(p) : patch) }));
  useEffect(() => { try { localStorage.setItem(storeKey, JSON.stringify(d)); } catch {} }, [d, storeKey]);

  const X = LESSON_EXTRA[lesson.n] || NO_EXTRA;
  const items = checkItemsOf(lesson);
  // Задания в формате TKT: соотнесение (5) и выбор из трёх (5) — общий список для проверки
  const examItems = useMemo(() => X.exam.flatMap((t, ti) => t.items.map((it, ii) => ({ ...it, type: t.type, key: `${ti}-${ii}` }))), [X]);
  const terms = X.deltaTerms || [];
  const reviewQs = d.review.map(i => REVIEW_POOL[i]).filter(Boolean);
  // порядок вариантов перемешивается один раз при открытии урока
  const order = useMemo(() => items.map(it => shuffle(it.opts.map((_, i) => i))), [items]);
  const examOrder = useMemo(() => Object.fromEntries(examItems.filter(it => it.type === "mcq3").map(it => [it.key, shuffle(it.opts.map((_, i) => i))])), [examItems]);
  const [aiIn, setAiIn] = useState("");
  const [aiLoad, setAiLoad] = useState(false);
  const [aiErr, setAiErr] = useState("");
  const [saving, setSaving] = useState(false);
  const [saveErr, setSaveErr] = useState("");
  const [glossOpen, setGlossOpen] = useState(false);
  const chatRef = useRef(null);
  const topRef = useRef(null);
  useEffect(() => { if (chatRef.current) chatRef.current.scrollTop = chatRef.current.scrollHeight; }, [d.chat, aiLoad]);

  const go = step => { set({ step }); setTimeout(() => topRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }), 0); };
  const examOk = it => (it.type === "match" ? d.examAns[it.key] === it.answer : d.examAns[it.key] === it.answer);
  const checkScore = items.filter((it, i) => d.checkAns[i] === it.ans).length;
  const examScore = examItems.filter(examOk).length;
  const termScore = terms.filter((t, i) => termOk(d.termAns[i], t.accept)).length;
  const reviewScore = reviewQs.filter((q, i) => d.reviewAns[i] === q.ans).length;
  // Диагностика (уроки 1 и 12) считается отдельно, чтобы пре- и пост-тест были сопоставимы
  const score = isDiag(lesson) ? checkScore : checkScore + examScore + termScore;
  const total = isDiag(lesson) ? items.length : items.length + examItems.length + terms.length;
  const allAnswered = Object.keys(d.checkAns).length === items.length && examItems.every(it => d.examAns[it.key] !== undefined);
  const answeredCount = Object.keys(d.checkAns).length + examItems.filter(it => d.examAns[it.key] !== undefined).length;
  const studentTurns = d.chat.filter(m => m.r === "u").length;
  const modelText = d.level === "TKT" ? lesson.practice.TKT.key : (X.models?.[d.level] || [])[d.variant];

  const chooseLevel = level => {
    const n = lesson.practice[level].variants.length;
    set({ level, variant: Math.floor(Math.random() * n), chat: [], modelShown: false });
    setAiErr("");
  };

  const send = async preset => {
    const msg = (typeof preset === "string" ? preset : aiIn).trim();
    if (!msg || aiLoad) return;
    if (typeof preset !== "string") setAiIn("");
    const history = [...d.chat, { r: "u", t: msg }];
    set({ chat: history });
    setAiLoad(true); setAiErr("");
    try {
      const reply = await tutorReply({ lesson, level: d.level, variant: d.variant, history });
      set(p => ({ chat: [...p.chat, { r: "a", t: reply }] }));
    } catch (e) {
      setAiErr(e.message || "Ошибка AI");
    }
    setAiLoad(false);
  };

  const finish = async () => {
    if (saving) return;
    setSaving(true);
    const minutes = Math.max(1, Math.round((Date.now() - d.startedAt) / 60000));
    const details = items.map((it, i) => ({
      question: it.q, ok: d.checkAns[i] === it.ans,
      userAnswer: d.checkAns[i] === undefined ? "" : it.opts[d.checkAns[i]], correctAnswer: it.opts[it.ans],
      ...(it.topic ? { topic: it.topic } : {}),
    }));
    const strip = s => String(s).replace(/<\/?u>/g, "");
    const optText = (t, letter) => { const o = (t.options || []).find(x => x[0] === letter); return o ? `${letter} — ${o[1]}` : letter || ""; };
    const examDetails = X.exam.flatMap((t, ti) => t.items.map((it, ii) => {
      const key = `${ti}-${ii}`, a = d.examAns[key];
      return t.type === "match"
        ? { question: `TKT-формат: ${strip(it.text)}`, ok: a === it.answer, userAnswer: a ? optText(t, a) : "", correctAnswer: optText(t, it.answer) }
        : { question: `TKT-формат: ${it.text}`, ok: a === it.answer, userAnswer: a === undefined ? "" : it.opts[a], correctAnswer: it.opts[it.answer] };
    }));
    const termDetails = terms.map((t, i) => ({ question: `DELTA-термин: ${t.def}`, ok: termOk(d.termAns[i], t.accept), userAnswer: d.termAns[i] || "", correctAnswer: t.accept[0] }));
    const reviewDetails = reviewQs.map((q, i) => ({ question: `Повторение (урок ${q.n}): ${q.q}`, ok: d.reviewAns[i] === q.ans, userAnswer: d.reviewAns[i] === undefined ? "" : q.opts[d.reviewAns[i]], correctAnswer: q.opts[q.ans] }));
    const text = (question, userAnswer) => (userAnswer && String(userAnswer).trim() ? [{ kind: "text", question, userAnswer: String(userAnswer).trim() }] : []);
    let topics = "";
    if (isDiag(lesson)) {
      const by = {};
      items.forEach((it, i) => { const t = (by[it.topic] = by[it.topic] || [0, 0]); t[1]++; if (d.checkAns[i] === it.ans) t[0]++; });
      topics = Object.entries(by).map(([t, [ok, n]]) => `тема урока ${t}: ${ok}/${n}`).join(" · ");
    }
    const dialog = d.chat.map(m => `${m.r === "u" ? "Студент" : "AI"}: ${m.t}`).join("\n\n");
    const p = d.level ? lesson.practice[d.level] : null;
    const meta = {
      kind: "meta", lesson: lesson.n, confBefore: d.confBefore, confAfter: d.confAfter, level: d.level || "", variant: d.variant + 1,
      aiTurns: studentTurns, minutes, modelViewed: d.modelShown,
      checkScore, checkTotal: items.length, examScore, examTotal: examItems.length, termScore, termTotal: terms.length, reviewScore, reviewTotal: reviewQs.length,
    };
    const parts = [
      `${isDiag(lesson) ? "диагностика" : "понимание"} ${checkScore}/${items.length}`,
      `TKT-формат ${examScore}/${examItems.length}`,
      terms.length ? `DELTA-термины ${termScore}/${terms.length}` : "",
      reviewQs.length ? `повторение ${reviewScore}/${reviewQs.length}` : "",
    ].filter(Boolean).join(" · ");
    const all = [
      ...details, ...examDetails, ...termDetails, ...reviewDetails,
      ...text("Показатели урока", `${parts}\nУверенность: до ${d.confBefore || "—"} → после ${d.confAfter || "—"} · AI-практика: ${d.level || "не выбрана"}, вариант ${d.variant + 1}, реплик студента ${studentTurns}${d.modelShown ? ", образец открыт" : ""} · время ${minutes} мин`),
      ...text("Диагностика по темам", topics),
      ...lesson.entry.flatMap((q, i) => text(`Вход: ${q}`, d.entry[i])),
      ...text(`Случай: ${lesson.caseStudy.title}`, d.caseAnswer),
      ...(p ? text(`AI-практика (${d.level}): ${p.variants[d.variant]}`, dialog) : []),
      ...(X.apply ? text(`Задание на практику: ${X.apply.task}`, d.applyText) : []),
      ...text("Рефлексия: что понял(а)", d.reflectUnderstood),
      ...text("Рефлексия: что осталось неясным", d.reflectUnclear),
      meta,
    ];
    const pct = Math.round((score / total) * 100);
    try {
      const res = await onSave({ cert: d.level || "TKT", mod: moduleName(lesson), score, total, pct, date: new Date().toISOString(), student: studentName || "Студент", details: all });
      if (res && res.error) throw res.error;
      try { localStorage.removeItem(storeKey); } catch {}
      onDone(lesson.n, pct);
    } catch {
      // черновик остаётся на телефоне — можно нажать ещё раз, когда появится интернет
      setSaveErr("Не удалось сохранить урок (нет интернета или сервер недоступен). Ответы сохранены на телефоне — попробуйте ещё раз.");
      setSaving(false);
    }
  };

  const b = BLOCKS[d.step];
  const canNext = [
    d.confBefore > 0,
    true,
    true,
    d.checkDone,
    !!d.level,
    true,
    d.confAfter > 0 && d.reflectUnderstood.trim().length > 0,
  ][d.step];
  const nextHint = [
    "Отметьте уверенность, чтобы продолжить",
    "", "",
    "Ответьте на вопросы и нажмите «Проверить»",
    "Выберите уровень задания",
    "",
    "Напишите, что поняли, и отметьте уверенность",
  ][d.step];

  return (
    <div ref={topRef} style={{ scrollMarginTop: 12 }}>
      <button className="btn btn-o btn-sm" onClick={onBack} style={{ marginBottom: 14 }}>← Все уроки</button>
      <div style={{ fontSize: 12, color: MUTED, letterSpacing: ".04em" }}>УРОК {lesson.n} ИЗ 12 · ~{lesson.minutes} МИН</div>
      <h2 className="st" style={{ fontSize: 22, marginTop: 4 }}>{lesson.ru}</h2>
      <div className="sb" style={{ marginBottom: 14 }}>{lesson.title}</div>

      {/* шаги */}
      <div style={{ display: "flex", gap: 4, marginBottom: 6 }}>
        {BLOCKS.map((x, i) => (
          <button key={x.k} onClick={() => i <= d.step && go(i)} aria-label={x.label}
            style={{ flex: 1, height: 6, borderRadius: 3, border: "none", padding: 0, cursor: i <= d.step ? "pointer" : "default",
              background: i < d.step ? GREEN : i === d.step ? GOLD : "rgba(255,255,255,.1)" }} />
        ))}
      </div>
      <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12.5, color: MUTED, marginBottom: 16 }}>
        <span><b style={{ color: GOLD }}>{d.step + 1}. {b.label}</b> · {b.stage}</span>
        <span>{d.step + 1} / 7</span>
      </div>

      {/* 1. Вход */}
      {b.k === "entry" && (
        <div className="qcard">
          {reviewQs.length > 0 && (
            <div style={{ marginBottom: 20 }}>
              <div className="qnum">Повторение прошлых уроков</div>
              {reviewQs.map((q, i) => {
                const a = d.reviewAns[i], done = a !== undefined;
                return (
                  <div key={i} style={{ padding: "10px 0", borderTop: i ? "1px solid rgba(255,255,255,.06)" : "none" }}>
                    <div style={{ fontSize: 12, color: MUTED, marginBottom: 4 }}>из урока {q.n}</div>
                    <div style={{ fontSize: 14.5, color: TXT, lineHeight: 1.55, marginBottom: 8 }}>{q.q}</div>
                    {q.opts.map((o, oi) => {
                      let cls = "opt";
                      if (done) { if (oi === q.ans) cls += " ok"; else if (oi === a) cls += " ng"; }
                      return <button key={oi} className={cls} disabled={done} style={{ padding: "10px 14px", fontSize: 14 }} onClick={() => set(p => ({ reviewAns: { ...p.reviewAns, [i]: oi } }))}>{o}</button>;
                    })}
                    {done && <div className="exp" style={{ marginTop: 6 }}>{a === q.ans ? "✓ " : "✗ "}{q.exp}</div>}
                  </div>
                );
              })}
            </div>
          )}
          <div className="qnum">Цели урока</div>
          <ul style={{ margin: "0 0 18px 18px", padding: 0, color: TXT, fontSize: 14.5, lineHeight: 1.7 }}>
            {lesson.aims.map(a => <li key={a}>{a}</li>)}
          </ul>
          <div className="qnum">Что я уже знаю</div>
          {lesson.entry.map((q, i) => (
            <div key={i} style={{ marginBottom: 12 }}>
              <div style={{ fontSize: 14.5, color: TXT, marginBottom: 6, lineHeight: 1.55 }}>{q}</div>
              <Area value={d.entry[i] || ""} placeholder="Коротко, на любом языке" onChange={e => set(p => ({ entry: { ...p.entry, [i]: e.target.value } }))} />
            </div>
          ))}
          <Confidence value={d.confBefore} onChange={v => set({ confBefore: v })} label="Насколько уверенно вы чувствуете себя в этой теме сейчас?" />
        </div>
      )}

      {/* 2. Теория */}
      {b.k === "theory" && (
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {lesson.theory.map(t => (
            <div key={t.term} className="card" style={{ padding: "16px 18px" }}>
              <div style={{ fontFamily: "Lora,serif", fontSize: 17, color: GOLD, marginBottom: 6 }}>{t.term}</div>
              <div style={{ fontSize: 14.5, color: TXT, lineHeight: 1.65 }}>{t.def}</div>
              <div style={{ fontSize: 13.5, color: "#c0b8a8", lineHeight: 1.6, marginTop: 8, paddingLeft: 10, borderLeft: `2px solid ${GOLD}` }}><i>Example:</i> {t.ex}</div>
            </div>
          ))}

          {X.confuse.length > 0 && (
            <div className="card" style={{ padding: "16px 18px", borderColor: "rgba(231,76,60,.35)" }}>
              <div style={{ fontFamily: "Lora,serif", fontSize: 17, color: RED, marginBottom: 10 }}>⚠️ Не путать</div>
              {X.confuse.map((c, i) => (
                <div key={i} style={{ padding: "10px 0", borderTop: i ? "1px solid rgba(255,255,255,.06)" : "none" }}>
                  <div style={{ fontSize: 15, fontWeight: 700, color: TXT, marginBottom: 4 }}>{c.a} <span style={{ color: MUTED, fontWeight: 400 }}>vs</span> {c.b}</div>
                  <div style={{ fontSize: 14, color: TXT, lineHeight: 1.6 }}>{c.diff}</div>
                  <div style={{ fontSize: 13.5, color: "#c0b8a8", lineHeight: 1.55, marginTop: 6 }}><i>Example:</i> {c.ex}</div>
                </div>
              ))}
            </div>
          )}

          {X.glossary.length > 0 && (
            <div className="card" style={{ padding: "14px 18px" }}>
              <button onClick={() => setGlossOpen(!glossOpen)} style={{ background: "none", border: "none", padding: 0, width: "100%", display: "flex", justifyContent: "space-between", alignItems: "center", cursor: "pointer", color: GOLD, fontFamily: "Lora,serif", fontSize: 17 }}>
                <span>📖 Глоссарий урока ({X.glossary.length})</span><span>{glossOpen ? "▲" : "▼"}</span>
              </button>
              {glossOpen && (
                <div style={{ marginTop: 10 }}>
                  {X.glossary.map(([term, ru, def]) => (
                    <div key={term} style={{ padding: "8px 0", borderTop: "1px solid rgba(255,255,255,.06)" }}>
                      <div style={{ fontSize: 14.5, color: TXT }}><b>{term}</b> <span style={{ color: MUTED }}>— {ru}</span></div>
                      <div style={{ fontSize: 13.5, color: "#c0b8a8", lineHeight: 1.5, marginTop: 2 }}>{def}</div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {/* 3. Случай из класса */}
      {b.k === "case" && (
        <div className="qcard">
          <div className="qnum">Случай из класса</div>
          <div style={{ fontFamily: "Lora,serif", fontSize: 18, color: TXT, marginBottom: 10 }}>{lesson.caseStudy.title}</div>
          <div className="qpass" style={{ whiteSpace: "pre-wrap" }}>{lesson.caseStudy.text}</div>
          {lesson.caseStudy.questions.map((q, i) => (
            <div key={i} style={{ fontSize: 14.5, color: TXT, margin: "8px 0", lineHeight: 1.55 }}><b style={{ color: GOLD }}>{i + 1}.</b> {q}</div>
          ))}
          <Area rows={4} style={{ marginTop: 6 }} value={d.caseAnswer} placeholder="Ваш анализ (по желанию)" onChange={e => set({ caseAnswer: e.target.value })} />
          <div style={{ marginTop: 12 }}>
            <button className="btn btn-o btn-sm" onClick={() => set({ caseShown: !d.caseShown })}>{d.caseShown ? "Скрыть комментарий" : "Показать комментарий 👁️"}</button>
          </div>
          {d.caseShown && <div className="exp">{lesson.caseStudy.commentary}</div>}
        </div>
      )}

      {/* 4. Проверка понимания / диагностика */}
      {b.k === "check" && (
        <div>
          {isDiag(lesson) && (
            <div className="tip" style={{ marginTop: 0, marginBottom: 14 }}>
              <b>{lesson.check === "DIAG_A" ? "Входная диагностика" : "Итоговая диагностика"}:</b> 20 вопросов по темам всех уроков. Отвечайте сами, без подсказок — результат нужен, чтобы увидеть ваш рост{lesson.check === "DIAG_B" ? " по сравнению с первым уроком" : ""}.
            </div>
          )}
          {d.checkDone && (
            <div className="sdiv">
              <div className="sbig" style={{ color: pctColor(Math.round((score / total) * 100)) }}>{score}/{total}</div>
              <div style={{ color: MUTED, fontSize: 13, marginTop: 6, lineHeight: 1.6 }}>
                {isDiag(lesson) ? "Диагностика" : "Понимание"}: {checkScore}/{items.length} · TKT-формат: {examScore}/{examItems.length}{terms.length ? ` · DELTA-термины: ${termScore}/${terms.length}` : ""}
                {isDiag(lesson) && <><br />В результат урока идёт только диагностика</>}
                <br />Объяснения — под каждым вопросом
              </div>
            </div>
          )}
          <div className="qnum" style={{ margin: "4px 0 10px" }}>{isDiag(lesson) ? "Часть 1. Диагностика" : "Часть 1. Понимание темы"}</div>
          {items.map((it, i) => {
            const a = d.checkAns[i];
            return (
              <div key={i} className="qcard" style={{ marginBottom: 12, padding: 20 }}>
                <div className="qnum">Вопрос {i + 1}</div>
                <div className="qtext" style={{ fontSize: 15.5 }}>{it.q}</div>
                {order[i].map((oi, k) => {
                  let cls = "opt";
                  if (d.checkDone) { if (oi === it.ans) cls += " ok"; else if (oi === a) cls += " ng"; }
                  else if (oi === a) cls += " sel";
                  return (
                    <button key={oi} className={cls} disabled={d.checkDone} onClick={() => set(p => ({ checkAns: { ...p.checkAns, [i]: oi } }))}>
                      <span style={{ color: GOLD, marginRight: 9 }}>{"ABC"[k]}.</span>{it.opts[oi]}
                    </button>
                  );
                })}
                {d.checkDone && <div className="exp"><b>💡</b> {it.exp}</div>}
              </div>
            );
          })}
          {/* Часть 2. Формат экзамена */}
          {X.exam.length > 0 && (
            <>
              <div className="qnum" style={{ margin: "22px 0 4px" }}>Часть 2. Формат TKT</div>
              <div style={{ fontSize: 12.5, color: MUTED, marginBottom: 10 }}>Задания построены как в настоящем TKT: соотнесение с одним лишним вариантом и выбор из трёх.</div>
              {X.exam.map((t, ti) => (
                <div key={ti} className="qcard" style={{ marginBottom: 12, padding: 20 }}>
                  <div style={{ fontSize: 14, color: "#c0b8a8", lineHeight: 1.6, marginBottom: 12, fontStyle: "italic" }}>{t.instructions}</div>
                  {t.type === "match" && (
                    <div style={{ background: BG, borderRadius: 8, padding: "10px 14px", marginBottom: 12, display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(200px,1fr))", gap: "4px 14px" }}>
                      {t.options.map(([L, txt]) => <div key={L} style={{ fontSize: 13.5, color: TXT }}><b style={{ color: GOLD, marginRight: 8 }}>{L}</b>{txt}</div>)}
                    </div>
                  )}
                  {t.items.map((it, ii) => {
                    const key = `${ti}-${ii}`, a = d.examAns[key];
                    return (
                      <div key={key} style={{ padding: "10px 0", borderTop: ii ? "1px solid rgba(255,255,255,.06)" : "none" }}>
                        <div style={{ fontSize: 14.5, color: TXT, lineHeight: 1.6, marginBottom: 8 }}>
                          <b style={{ color: MUTED, marginRight: 6 }}>{ti * 5 + ii + 1}</b>
                          <span dangerouslySetInnerHTML={{ __html: it.text.replace(/<u>/g, `<u style="text-decoration-color:${GOLD};text-underline-offset:3px">`) }} />
                        </div>
                        {t.type === "match" ? (
                          <div style={{ display: "flex", gap: 5, flexWrap: "wrap" }}>
                            {t.options.map(([L]) => {
                              const sel = a === L, right = d.checkDone && L === it.answer, wrong = d.checkDone && sel && L !== it.answer;
                              return (
                                <button key={L} disabled={d.checkDone} onClick={() => set(p => ({ examAns: { ...p.examAns, [key]: L } }))}
                                  style={{ width: 40, height: 38, borderRadius: 8, fontWeight: 700, cursor: d.checkDone ? "default" : "pointer",
                                    background: right ? "rgba(76,175,136,.2)" : wrong ? "rgba(192,57,43,.2)" : sel ? GOLD : BG,
                                    color: right ? GREEN : wrong ? RED : sel ? BG : TXT,
                                    border: `1px solid ${right ? GREEN : wrong ? RED : sel ? GOLD : "rgba(255,255,255,.12)"}` }}>{L}</button>
                              );
                            })}
                          </div>
                        ) : (
                          examOrder[key].map((oi, k) => {
                            let cls = "opt";
                            if (d.checkDone) { if (oi === it.answer) cls += " ok"; else if (oi === a) cls += " ng"; }
                            else if (oi === a) cls += " sel";
                            return (
                              <button key={oi} className={cls} disabled={d.checkDone} onClick={() => set(p => ({ examAns: { ...p.examAns, [key]: oi } }))}>
                                <span style={{ color: GOLD, marginRight: 9 }}>{"ABC"[k]}.</span>{it.opts[oi]}
                              </button>
                            );
                          })
                        )}
                        {d.checkDone && <div className="exp" style={{ marginTop: 8 }}><b>{examOk({ ...it, type: t.type, key }) ? "✓" : `Ответ: ${t.type === "match" ? it.answer : it.opts[it.answer]}.`}</b> {it.why || it.exp}</div>}
                      </div>
                    );
                  })}
                </div>
              ))}
            </>
          )}

          {/* Часть 3. Термины в формате DELTA Module One */}
          {terms.length > 0 && (
            <div className="qcard" style={{ marginBottom: 12, padding: 20 }}>
              <div className="qnum">Часть 3. Формат DELTA Module One</div>
              <div style={{ fontSize: 14, color: "#c0b8a8", lineHeight: 1.6, marginBottom: 8, fontStyle: "italic" }}>Write the term that matches each definition. One or two words are enough.</div>
              {terms.map((t, i) => {
                const ok = termOk(d.termAns[i], t.accept);
                return (
                  <div key={i} style={{ padding: "10px 0", borderTop: i ? "1px solid rgba(255,255,255,.06)" : "none" }}>
                    <div style={{ fontSize: 14.5, color: TXT, lineHeight: 1.55, marginBottom: 8 }}>{t.def}</div>
                    <input type="text" value={d.termAns[i] || ""} disabled={d.checkDone} autoCapitalize="none" autoCorrect="off" spellCheck={false}
                      onChange={e => set(p => ({ termAns: { ...p.termAns, [i]: e.target.value } }))} placeholder="term" style={{ fontSize: 16,
                        borderColor: d.checkDone ? (ok ? GREEN : RED) : undefined }} />
                    {d.checkDone && <div style={{ fontSize: 13, marginTop: 6, color: ok ? GREEN : RED }}>{ok ? "✓ Верно" : `Ответ: ${t.accept[0]}`}</div>}
                  </div>
                );
              })}
            </div>
          )}

          {!d.checkDone && (
            <div style={{ textAlign: "center" }}>
              <button className="btn" disabled={!allAnswered} onClick={() => { set({ checkDone: true }); topRef.current?.scrollIntoView({ behavior: "smooth" }); }}>
                Проверить всё ({answeredCount}/{items.length + examItems.length})
              </button>
              {terms.length > 0 && <div style={{ fontSize: 12, color: MUTED, marginTop: 6 }}>Термины DELTA можно оставить пустыми, если не знаете</div>}
            </div>
          )}
        </div>
      )}

      {/* 5. Практика с AI-тьютором */}
      {b.k === "ai" && (
        <div className="qcard" style={{ padding: 20 }}>
          <div className="qnum">Выберите уровень задания</div>
          <div style={{ display: "flex", gap: 6, marginBottom: 14 }}>
            {Object.entries(LEVELS).map(([lv, hint]) => (
              <button key={lv} onClick={() => lv !== d.level && chooseLevel(lv)}
                style={{ flex: 1, padding: "9px 4px", borderRadius: 8, cursor: "pointer", textAlign: "center",
                  background: d.level === lv ? GOLD : BG, color: d.level === lv ? BG : TXT, border: `1px solid ${d.level === lv ? GOLD : "rgba(255,255,255,.12)"}` }}>
                <div style={{ fontWeight: 700, fontSize: 14 }}>{lv}</div>
                <div style={{ fontSize: 11, opacity: .85, marginTop: 2 }}>{hint}</div>
              </button>
            ))}
          </div>
          {d.level && (
            <>
              <div style={{ fontSize: 14.5, color: TXT, lineHeight: 1.6, marginBottom: 8 }}><b style={{ color: GOLD }}>Задание.</b> {lesson.practice[d.level].task}</div>
              <div className="qpass" style={{ whiteSpace: "pre-wrap" }}>{lesson.practice[d.level].variants[d.variant]}</div>
              <div style={{ fontSize: 12.5, color: MUTED, margin: "6px 0 12px" }}>
                Напишите свой ответ. AI-тьютор не даст готового решения — он задаст наводящие вопросы. Рекомендуем минимум 3 реплики.
              </div>
              <div className="chbox" ref={chatRef} style={{ height: "auto", minHeight: 90, maxHeight: 360 }}>
                {d.chat.length === 0 && !aiLoad && <div style={{ color: "#4a5560", fontSize: 13.5 }}>Диалог пока пуст. Начните с ответа на задание или выберите подсказку ниже.</div>}
                {d.chat.map((m, i) => (
                  <div key={i} className={`msg ${m.r}`}>
                    {m.r === "a" && <div style={{ fontSize: 11, color: "#4a5560", marginBottom: 3 }}>🤖 AI-тьютор</div>}
                    <div className="bub">{m.r === "a" ? <MdText text={m.t} /> : m.t}</div>
                  </div>
                ))}
                {aiLoad && <div className="msg a"><div className="bub" style={{ color: MUTED }}>⌛ Думаю...</div></div>}
              </div>
              {aiErr && <div style={{ color: RED, fontSize: 13, marginBottom: 8 }}>{aiErr}</div>}
              <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 8 }}>
                {QUICK.map(q => <button key={q} className="btn btn-o btn-sm" style={{ whiteSpace: "normal", textAlign: "left" }} disabled={aiLoad} onClick={() => send(q)}>{q}</button>)}
              </div>
              <div className="chin">
                <textarea className="chinput" rows={2} style={{ fontSize: 16, resize: "vertical" }} placeholder="Ваш ответ..." value={aiIn} onChange={e => setAiIn(e.target.value)} />
                <button className="btn" onClick={send} disabled={aiLoad || !aiIn.trim()}>→</button>
              </div>
              <div style={{ fontSize: 12, color: MUTED, marginTop: 8 }}>
                Реплик: {studentTurns}. Можно сменить уровень — диалог начнётся заново с новым вариантом.
              </div>

              {/* Образец ответа: открывается после собственной попытки */}
              {modelText && (
                <div style={{ marginTop: 16, paddingTop: 14, borderTop: "1px solid rgba(255,255,255,.07)" }}>
                  {!d.modelShown ? (
                    <>
                      <button className="btn btn-o btn-sm" disabled={studentTurns < 1} onClick={() => set({ modelShown: true })}>📄 Показать образец ответа</button>
                      {studentTurns < 1 && <div style={{ fontSize: 12, color: MUTED, marginTop: 6 }}>Образец откроется после вашей первой попытки ответа</div>}
                    </>
                  ) : (
                    <>
                      <div className="qnum">{d.level === "TKT" ? "Ключ к заданию" : `Образец ответа уровня ${d.level}`}</div>
                      <div style={{ background: "rgba(76,175,136,.07)", border: "1px solid rgba(76,175,136,.3)", borderRadius: 8, padding: "12px 15px", fontSize: 14, color: TXT, lineHeight: 1.65, whiteSpace: "pre-wrap" }}>{modelText}</div>
                      <div style={{ fontSize: 12.5, color: MUTED, margin: "8px 0" }}>Образец — один из возможных сильных ответов, а не единственно верный.</div>
                      <button className="btn btn-o btn-sm" style={{ whiteSpace: "normal", textAlign: "left" }} disabled={aiLoad}
                        onClick={() => send(`Сравни мой ответ с образцом ниже. Что у меня уже есть, чего не хватает и что сделать, чтобы мой ответ стал таким же сильным? Не переписывай за меня.\n\nОБРАЗЕЦ:\n${modelText}`)}>
                        🤖 Сравнить мой ответ с образцом
                      </button>
                    </>
                  )}
                </div>
              )}
            </>
          )}
        </div>
      )}

      {/* 6. Перенос в экзамен */}
      {b.k === "transfer" && (
        <div className="qcard" style={{ padding: 20 }}>
          <div className="qnum">Как эта тема выглядит на экзамене</div>
          {lesson.transfer.map(t => (
            <div key={t.exam} style={{ display: "flex", gap: 12, padding: "10px 0", borderTop: "1px solid rgba(255,255,255,.05)" }}>
              <b style={{ color: GOLD, minWidth: 52, fontSize: 14 }}>{t.exam}</b>
              <span style={{ color: TXT, fontSize: 14, lineHeight: 1.55 }}>{t.text}</span>
            </div>
          ))}
          <div className="qnum" style={{ marginTop: 16 }}>Связанная практика на сайте</div>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
            {lesson.links.map(l => <button key={l.page + l.label} className="btn btn-o btn-sm" onClick={() => onNavigate(l.page)}>{l.label} →</button>)}
          </div>
          <div style={{ fontSize: 12.5, color: MUTED, marginTop: 10 }}>Урок сохранится на этом телефоне — после практики возвращайтесь в «Уроки» и завершите рефлексию.</div>
          {X.apply && (
            <div style={{ marginTop: 18, paddingTop: 14, borderTop: "1px solid rgba(255,255,255,.07)" }}>
              <div className="qnum">Задание на свою практику</div>
              <div style={{ fontSize: 14.5, color: TXT, lineHeight: 1.6 }}>{X.apply.task}</div>
              {X.apply.hint && <div style={{ fontSize: 12.5, color: MUTED, margin: "6px 0 8px" }}>{X.apply.hint}</div>}
              <Area rows={4} value={d.applyText} placeholder="Результат можно записать сейчас или вернуться позже (по желанию)" onChange={e => set({ applyText: e.target.value })} />
            </div>
          )}
        </div>
      )}

      {/* 7. Рефлексия */}
      {b.k === "reflect" && (
        <div className="qcard" style={{ padding: 20 }}>
          <div className="qnum">Рефлексия</div>
          <div style={{ fontSize: 14.5, color: TXT, marginBottom: 6 }}>Что я понял(а) на этом уроке? (1–2 предложения)</div>
          <Area value={d.reflectUnderstood} onChange={e => set({ reflectUnderstood: e.target.value })} />
          <div style={{ fontSize: 14.5, color: TXT, margin: "12px 0 6px" }}>Что осталось неясным?</div>
          <Area rows={2} value={d.reflectUnclear} onChange={e => set({ reflectUnclear: e.target.value })} />
          <Confidence value={d.confAfter} onChange={v => set({ confAfter: v })} label="Насколько уверенно вы чувствуете себя в этой теме теперь?" />
          {d.confBefore > 0 && d.confAfter > 0 && (
            <div style={{ fontSize: 13, color: MUTED, marginTop: 10 }}>Уверенность: {d.confBefore} → <b style={{ color: d.confAfter >= d.confBefore ? GREEN : GOLD }}>{d.confAfter}</b></div>
          )}
        </div>
      )}

      {/* навигация */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 10, marginTop: 18 }}>
        <button className="btn btn-o" disabled={d.step === 0} onClick={() => go(d.step - 1)}>← Назад</button>
        {d.step < 6 ? (
          <button className="btn" disabled={!canNext} onClick={() => go(d.step + 1)}>Далее →</button>
        ) : (
          <button className="btn" disabled={!canNext || saving} onClick={finish}>{saving ? "Сохраняю..." : "Завершить урок ✓"}</button>
        )}
      </div>
      {!canNext && nextHint && <div style={{ textAlign: "right", fontSize: 12, color: MUTED, marginTop: 6 }}>{nextHint}</div>}
      {saveErr && <div style={{ color: RED, fontSize: 13, marginTop: 10, lineHeight: 1.5 }}>{saveErr}</div>}
    </div>
  );
}

// ===================== Список уроков =====================
export default function LessonsPage({ studentName, userId, isTeacher, onSaveResult, onNavigate }) {
  const [done, setDone] = useState({}); // { n: лучший % }
  const [open, setOpen] = useState(null);
  const [finished, setFinished] = useState(null);

  useEffect(() => {
    if (!userId) return;
    supabase.from("progress").select("module, pct").eq("user_id", userId).like("module", `${LESSON_PREFIX} %`)
      .then(({ data, error }) => {
        if (error || !data) return;
        const m = {};
        data.forEach(r => { const n = lessonNoOf(r.module); if (n) m[n] = Math.max(m[n] ?? 0, r.pct); });
        setDone(p => ({ ...m, ...p }));
      });
  }, [userId]);

  const inProgress = n => { try { return !!localStorage.getItem(`cw_lesson_${userId || "anon"}_${n}`); } catch { return false; } };
  const unlocked = n => isTeacher || n === 1 || done[n - 1] !== undefined || done[n] !== undefined;
  const count = Object.keys(done).length;

  if (open) {
    const lesson = LESSONS.find(l => l.n === open);
    return (
      <Lesson key={open} lesson={lesson} uid={userId} studentName={studentName} onSave={onSaveResult} onNavigate={onNavigate}
        onBack={() => setOpen(null)}
        onDone={(n, pct) => { setDone(p => ({ ...p, [n]: Math.max(p[n] ?? 0, pct) })); setFinished({ n, pct }); setOpen(null); window.scrollTo({ top: 0 }); }} />
    );
  }

  return (
    <div>
      <h2 className="st">Обучение: 12 уроков</h2>
      <p className="sb">Общая основа для TKT, CELTA, DELTA и IELTS. Каждый урок — 7 шагов по модели ADDIE-AI: вход, теория, случай из класса, проверка, практика с AI-тьютором, перенос в экзамен, рефлексия.</p>

      {finished && (
        <div className="tip" style={{ marginTop: 0, marginBottom: 16, borderColor: "rgba(76,175,136,.4)" }}>
          ✅ <b>Урок {finished.n} завершён</b> · результат проверки {finished.pct}%. {finished.n < 12 ? `Открыт урок ${finished.n + 1}.` : "Модуль пройден полностью!"}
        </div>
      )}

      <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13, color: MUTED, marginBottom: 6 }}>
        <span>Пройдено уроков</span><b style={{ color: GOLD }}>{count} / 12</b>
      </div>
      <div className="pbar" style={{ marginBottom: 18 }}><div className="pfill" style={{ width: `${(count / 12) * 100}%` }} /></div>

      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        {LESSONS.map(l => {
          const ok = unlocked(l.n), pct = done[l.n], started = inProgress(l.n);
          return (
            <button key={l.n} disabled={!ok} onClick={() => { setFinished(null); setOpen(l.n); window.scrollTo({ top: 0 }); }}
              style={{ display: "flex", alignItems: "center", gap: 14, textAlign: "left", padding: "14px 16px", borderRadius: 10, cursor: ok ? "pointer" : "not-allowed",
                background: CARD, border: `1px solid ${pct !== undefined ? "rgba(76,175,136,.35)" : "rgba(197,155,68,.15)"}`, opacity: ok ? 1 : 0.45, color: TXT, fontFamily: "inherit" }}>
              <div style={{ width: 36, height: 36, borderRadius: "50%", flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700,
                background: pct !== undefined ? GREEN : ok ? "rgba(197,155,68,.18)" : "rgba(255,255,255,.06)", color: pct !== undefined ? BG : GOLD }}>
                {pct !== undefined ? "✓" : ok ? l.n : "🔒"}
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: 14.5, fontWeight: 600, lineHeight: 1.35 }}>{l.n}. {l.ru}</div>
                <div style={{ fontSize: 12, color: MUTED, marginTop: 3 }}>
                  ~{l.minutes} мин{isDiag(l) ? " · диагностика 20 вопросов" : ""}
                  {pct !== undefined && <> · <b style={{ color: pctColor(pct) }}>{pct}%</b></>}
                  {pct === undefined && started && ok && <> · <span style={{ color: GOLD }}>начат</span></>}
                </div>
              </div>
            </button>
          );
        })}
      </div>
      <div className="tip">Уроки открываются по порядку. Пройденный урок можно открыть снова — каждое прохождение сохраняется отдельно.{isTeacher ? " Учителю открыты все уроки." : ""}</div>
    </div>
  );
}
