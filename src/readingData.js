// ===========================================================
//  IELTS READING — юниты
// ===========================================================
//
// СХЕМА ЮНИТА:
// {
//   id: string (уникальный, "read-1"),
//   order: number,               — порядок в списке
//   title: string,
//   level: string,               — "Band 5.5–6" и т.п., для сортировки по сложности
//   topic: string,               — тема отрывка (Academic-style)
//   passage: string,             — сам текст, разбит на абзацы через "\n\n"
//   tasks: [ ...блоки заданий... ]
// }
//
// ТИП ЗАДАНИЯ (task.type) — одно из:
//   "tfng"           True / False / Not Given
//   "mcq"            Multiple Choice (по тексту)
//   "heading-match"  Matching Headings (у task есть общий список headings[])
//   "info-match"     Matching Information (пункты списка -> буква параграфа)
//   "summary"        Summary/Sentence Completion (короткий текстовый ответ)
//
// Общие поля task: { type, title, instructions, strategy: [советы...], items: [...] }
// heading-match дополнительно: headings: [строка, строка, ...]  (item.answer = индекс в headings)
// info-match дополнительно: paragraphLabels: ["A","B","C",...]  (item.answer = буква из paragraphLabels)
// summary: item.answer — массив допустимых ответов (регистр и пробелы по краям игнорируются)
// tfng: item.answer — "TRUE" | "FALSE" | "NOT GIVEN"
// mcq: item.opts — массив строк, item.answer — индекс правильного варианта

export const READING_UNITS = [
  {
    id: "read-1",
    order: 1,
    title: "Юнит 1 — The Silent Language of Trees",
    level: "Band 5.5–6",
    topic: "Environmental Science",
    passage:
`For centuries, foresters assumed that trees competed with one another for light, water and nutrients, much like rival businesses fighting for the same customers. Recent research, however, has revealed a far more cooperative picture. Beneath the forest floor, the roots of most trees are connected by a vast web of thread-like fungi known as mycorrhizae. This underground network, sometimes nicknamed the "wood wide web", allows trees to exchange not only nutrients but also chemical warning signals.

When a tree is attacked by insects, it can release chemical compounds into the network that alert neighbouring trees of the same species. Those neighbours, in turn, begin producing defensive chemicals of their own before the insects even reach them. In one well-known study, researchers found that undamaged trees connected to an infested tree produced significantly more defensive enzymes than trees growing in isolation nearby.

The network also appears to support weaker or younger trees. Older, larger trees — sometimes called "mother trees" because of the central role they play — have been observed transferring carbon and nutrients through fungal connections to seedlings growing in their shade, where sunlight is scarce. Some scientists argue that this challenges the traditional Darwinian view of forests as arenas of pure competition, suggesting instead that survival often depends on cooperation between generations.

Not all researchers agree on how deliberate this cooperation is. Sceptics point out that fungi may simply be moving resources to wherever is most efficient for the fungi themselves, with any benefit to the trees being an incidental side effect rather than a coordinated strategy. Testing these competing explanations is difficult, since the underground networks are hard to observe directly and experiments risk disturbing the very systems being studied.

Regardless of the exact mechanism, the practical implications are significant. Foresters who once cleared away older trees to make room for new growth are increasingly reconsidering the practice, since removing a "mother tree" may cut off the support network that younger trees rely on. As understanding of these hidden connections grows, it may reshape not only forestry practices but also broader ideas about competition and cooperation in the natural world.`,
    tasks: [
      {
        type: "tfng",
        title: "Вопросы 1–4",
        instructions: "Согласны ли следующие утверждения с информацией в тексте? Выберите TRUE, FALSE или NOT GIVEN.",
        strategy: [
          "Сначала выдели в утверждении ключевые слова, затем ищи их (или синонимы) в тексте — не жди дословного совпадения.",
          "TRUE — текст прямо подтверждает утверждение. FALSE — текст прямо противоречит. NOT GIVEN — в тексте просто нет информации об этом.",
          "Частая ошибка: путать FALSE и NOT GIVEN. Если тема упомянута, но конкретных данных из утверждения нет — это NOT GIVEN, а не FALSE.",
          "Утверждения идут в том же порядке, что и информация в тексте — используй это для навигации.",
        ],
        items: [
          { id: "r1-1", text: "Foresters have always believed that trees cooperate rather than compete.", answer: "FALSE" },
          { id: "r1-2", text: "Mycorrhizal fungi connect the roots of different trees underground.", answer: "TRUE" },
          { id: "r1-3", text: "Trees under insect attack can warn other trees of the same species.", answer: "TRUE" },
          { id: "r1-4", text: "Mother trees only transfer resources to trees of a different species.", answer: "NOT GIVEN" },
        ],
      },
      {
        type: "heading-match",
        title: "Вопросы 5–8",
        instructions: "У отрывка ниже пять абзацев (A–E, по порядку в тексте). Подберите к каждому подходящий заголовок из списка. Заголовков больше, чем абзацев — используйте не все.",
        strategy: [
          "Сначала прочитай все заголовки и попробуй понять общую идею каждого — это экономит время.",
          "Ищи главную мысль абзаца (обычно в первом-втором предложении), а не отдельные детали.",
          "Осторожно с заголовками-ловушками: они содержат слова из текста, но передают не ту идею, что весь абзац.",
          "Заголовок должен подходить ко ВСЕМУ абзацу, а не только к одному предложению внутри него.",
        ],
        headings: [
          "i. A traditional view of forest life",
          "ii. Doubts about how deliberate the process is",
          "iii. Chemical alerts between neighbouring trees",
          "iv. A shift in forestry practice",
          "v. Support for the youngest members of the forest",
          "vi. The financial cost of forest management",
        ],
        items: [
          { id: "r1-5", paragraph: "Абзац 1", answer: 0 },
          { id: "r1-6", paragraph: "Абзац 2", answer: 2 },
          { id: "r1-7", paragraph: "Абзац 3", answer: 4 },
          { id: "r1-8", paragraph: "Абзац 5", answer: 3 },
        ],
      },
      {
        type: "summary",
        title: "Вопросы 9–11",
        instructions: "Заполните пропуски. Используйте НЕ БОЛЕЕ ДВУХ СЛОВ из текста для каждого пропуска.",
        strategy: [
          "Сначала прочитай весь summary целиком, чтобы понять общий смысл — пропуски станут предсказуемее.",
          "Определи, какая часть речи нужна в пропуске (существительное, глагол и т.д.) — это сузит поиск.",
          "Ответ почти всегда — точное слово(а) из текста, синонимы не подходят для этого типа задания.",
          "Строго соблюдай лимит слов: если сказано 'не более двух слов', три слова = неверный ответ.",
        ],
        summaryTemplate:
          "Trees are connected underground by {0} that allow them to send chemical warning signals. Larger trees, known as {1}, can pass nutrients to seedlings growing nearby. However, some scientists remain sceptical and argue that fungi may move resources for their own benefit rather than as a deliberate {2}.",
        items: [
          { id: "r1-9", answer: ["mycorrhizal fungi", "fungi"] },
          { id: "r1-10", answer: ["mother trees"] },
          { id: "r1-11", answer: ["strategy"] },
        ],
      },
      {
        type: "mcq",
        title: "Вопрос 12",
        instructions: "Выберите правильный вариант ответа.",
        strategy: [
          "Сначала прочитай вопрос без вариантов ответа и попробуй сформулировать ответ сам — потом сверь с опциями.",
          "Отсекай варианты, которые верны лишь частично или содержат лишнюю, неподтверждённую текстом информацию.",
        ],
        items: [
          {
            id: "r1-12",
            text: "According to the passage, why is it difficult to test whether tree cooperation is deliberate?",
            opts: [
              "Trees do not respond consistently to insect attacks.",
              "The underground networks are hard to observe without disrupting them.",
              "Mycorrhizal fungi only exist in a small number of forests.",
              "Foresters refuse to allow scientists to study mother trees.",
            ],
            answer: 1,
          },
        ],
      },
    ],
  },

  // Юниты 2–10: добавляются по этой же схеме после утверждения формата Юнита 1.
];

export function scoreReadingUnit(unit, userAnswers) {
  // userAnswers: { [itemId]: <ответ пользователя> }
  let correct = 0, total = 0;
  const details = []; // [{ id, ok, correctAnswer, userAnswer, type }]

  for (const task of unit.tasks) {
    for (const item of task.items) {
      total++;
      let ok = false;
      let displayCorrect = item.answer;

      if (task.type === "summary") {
        const accepted = item.answer.map(a => a.trim().toLowerCase());
        ok = accepted.includes(String(userAnswers[item.id] || "").trim().toLowerCase());
        displayCorrect = item.answer[0];
      } else if (task.type === "heading-match") {
        ok = userAnswers[item.id] === item.answer;
        displayCorrect = task.headings[item.answer];
      } else if (task.type === "mcq") {
        ok = userAnswers[item.id] === item.answer;
        displayCorrect = item.opts[item.answer];
      } else {
        // tfng, info-match
        ok = userAnswers[item.id] === item.answer;
      }

      if (ok) correct++;
      details.push({ id: item.id, ok, type: task.type, correctAnswer: displayCorrect, userAnswer: userAnswers[item.id] });
    }
  }
  return { correct, total, pct: total ? Math.round((correct / total) * 100) : 0, details };
}

