/**
 * CertifyWise
 * © 2026 Альназирова Айдана (Aidana Alnazirova). Все права защищены.
 * Дата создания: 22 мая 2026 г.
 * Использование без письменного разрешения автора запрещено.
 *
 * Язык интерфейса: русский (по умолчанию) или английский.
 * Выбор хранится на устройстве; при смене страница перезагружается, поэтому
 * переводятся и тексты из файлов с данными (задания, подсказки, критерии).
 *
 * T("русский текст")              — перевод строки (словарь в i18n_en.js)
 * TT("Вопрос {0} из {1}", a, b)   — перевод строки с подстановками
 * L("русский", "English")         — когда одно русское слово переводится по-разному в разных местах
 *
 * Результаты, которые сохраняются в базу (названия модулей, ответы для панели учителя),
 * намеренно остаются на русском — чтобы данные эксперимента были единообразными.
 */

import EN from "./i18n_en";

const read = () => {
  try { return localStorage.getItem("cw_lang") === "en" ? "en" : "ru"; } catch { return "ru"; }
};

export const LANG = read();
export const IS_EN = LANG === "en";
try { document.documentElement.lang = LANG; } catch {}

export const T = s => (IS_EN && EN[s] !== undefined ? EN[s] : s);
export const TT = (s, ...args) => T(s).replace(/\{(\d+)\}/g, (_, i) => (args[+i] ?? ""));
export const L = (ru, en) => (IS_EN ? en : ru);

// Язык, на котором AI пишет разборы и обратную связь
export const AI_LANG = IS_EN ? "English" : "Russian";
// Формат дат и чисел
export const LOCALE = IS_EN ? "en-GB" : "ru-RU";

export const setLang = lang => {
  if (lang === LANG) return;
  try { localStorage.setItem("cw_lang", lang); } catch {}
  window.location.reload();
};

// Переключатель RU / EN для шапки сайта и страницы входа
export function LangSwitch({ style }) {
  const btn = on => ({
    padding: "5px 10px", fontSize: 12.5, fontWeight: 700, cursor: on ? "default" : "pointer",
    background: on ? "#c59b44" : "transparent", color: on ? "#0b1622" : "#8a7d6d", border: "none",
    fontFamily: "'Plus Jakarta Sans',sans-serif",
  });
  return (
    <div style={{ display: "inline-flex", border: "1px solid rgba(197,155,68,.35)", borderRadius: 7, overflow: "hidden", ...style }} role="group" aria-label="Language">
      <button style={btn(LANG === "ru")} onClick={() => setLang("ru")} aria-pressed={LANG === "ru"}>RU</button>
      <button style={btn(LANG === "en")} onClick={() => setLang("en")} aria-pressed={LANG === "en"}>EN</button>
    </div>
  );
}
