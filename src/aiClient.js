/**
 * CertifyWise
 * © 2026 Алназирова Айдана (Aidana Alnazirova). Все права защищены.
 * Дата создания: 22 мая 2026 г.
 * Использование без письменного разрешения автора запрещено.
 */

// Общий вызов Gemini для разделов Writing, Speaking, CELTA и DELTA.
// Ключ берётся так же, как в AI-репетиторе: сохранённый в браузере или из VITE_GEMINI_KEY.

export const GEMINI_MODEL = "gemini-3.5-flash";

export const getGeminiKey = () => {
  try { return localStorage.getItem("cw_gkey") || import.meta.env?.VITE_GEMINI_KEY || ""; }
  catch { return import.meta.env?.VITE_GEMINI_KEY || ""; }
};

// Запрос к Gemini с ограничением по времени: без него кнопка «AI проверяет…» может висеть бесконечно,
// если сеть оборвалась или сервер не ответил.
export const AI_TIMEOUT_MS = 90000;
export async function fetchGemini(url, options, timeoutMs = AI_TIMEOUT_MS) {
  const ctrl = new AbortController();
  const timer = setTimeout(() => ctrl.abort(), timeoutMs);
  try {
    return await fetch(url, { ...options, signal: ctrl.signal });
  } catch (e) {
    if (e.name === "AbortError") throw new Error(`AI не ответил за ${Math.round(timeoutMs / 1000)} секунд. Проверьте интернет и нажмите ещё раз — ваш ответ сохранён.`);
    throw new Error("Нет связи с AI. Проверьте интернет и нажмите ещё раз — ваш ответ сохранён.");
  } finally {
    clearTimeout(timer);
  }
}

// parts: массив частей Gemini ({ text } или { inline_data: { mime_type, data } })
// Возвращает объект, если json = true, иначе строку.
export async function callGemini({ system, parts, json = true, maxTokens = 4000, temperature = 0.3, timeoutMs = AI_TIMEOUT_MS }) {
  const key = getGeminiKey();
  if (!key) throw new Error("Нужен Gemini API ключ: откройте «AI-Репетитор» и нажмите «Настроить API».");
  const res = await fetchGemini(
    `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent?key=${key}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        system_instruction: { parts: [{ text: system }] },
        contents: [{ role: "user", parts }],
        generationConfig: {
          maxOutputTokens: maxTokens,
          temperature,
          ...(json ? { responseMimeType: "application/json" } : {}),
        },
      }),
    },
    timeoutMs
  );
  const data = await res.json();
  if (data.error) throw new Error(data.error.message);
  const text = (data.candidates?.[0]?.content?.parts || []).map(p => p.text || "").join("");
  if (!text) {
    const why = data.candidates?.[0]?.finishReason;
    throw new Error(why === "MAX_TOKENS" ? "Ответ AI оказался слишком длинным и оборвался. Нажмите ещё раз." : "AI не вернул ответ, попробуйте ещё раз.");
  }
  if (!json) return text;
  try { return JSON.parse(text); }
  catch {
    const m = text.match(/\{[\s\S]*\}/);
    if (m) return JSON.parse(m[0]);
    throw new Error("AI вернул ответ в неверном формате, попробуйте ещё раз.");
  }
}

// IELTS округляет среднее по критериям до ближайшей половины балла (.25 → вверх до .5, .75 → вверх до целого)
export const overallBand = (bands) => {
  const v = bands.filter(b => typeof b === "number");
  if (!v.length) return 0;
  const avg = v.reduce((s, b) => s + b, 0) / v.length;
  const base = Math.floor(avg + 1e-9), frac = avg - base;
  return frac < 0.25 - 1e-9 ? base : frac < 0.75 - 1e-9 ? base + 0.5 : base + 1;
};

export const countWords = t => (t.trim().match(/[A-Za-z0-9'’-]+/g) || []).length;

// Перемешивание (Фишер–Йейтс) — варианты ответа показываются в случайном порядке
export const shuffle = arr => {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; }
  return a;
};
