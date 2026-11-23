/**
 * CertifyWise
 * © 2026 Альназирова Айдана (Aidana Alnazirova). Все права защищены.
 * Дата создания: 22 мая 2026 г.
 * Использование без письменного разрешения автора запрещено.
 *
 * Простое отображение ответов AI: Gemini пишет **жирный** и списки «* пункт» в Markdown,
 * без обработки звёздочки видны студенту. HTML не вставляется — только текст и <b>, это безопасно.
 */

const inline = (line, key) =>
  line.split(/(\*\*[^*]+\*\*)/g).map((part, i) =>
    part.startsWith("**") && part.endsWith("**") && part.length > 4
      ? <b key={`${key}-${i}`}>{part.slice(2, -2)}</b>
      : part.replace(/(^|\s)\*(\S[^*]*\S|\S)\*(?=\s|[.,;:!?)]|$)/g, "$1$2") // *курсив* → без звёздочек
  );

export default function MdText({ text }) {
  const lines = String(text || "").split("\n");
  return lines.map((raw, i) => {
    let line = raw.replace(/^#{1,6}\s+/, ""); // заголовки ### → обычная строка
    const bullet = /^\s*[*-]\s+/.test(line);
    if (bullet) line = line.replace(/^\s*[*-]\s+/, "");
    return (
      <span key={i}>
        {bullet ? "• " : ""}{inline(line, i)}
        {i < lines.length - 1 ? "\n" : ""}
      </span>
    );
  });
}
