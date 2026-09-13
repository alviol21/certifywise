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
//   "tfng"           True / False / Not Given (проверка фактов)
//   "ynng"           Yes / No / Not Given (проверка мнения автора — см. READING_SKILLS)
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
//
// WALKTHROUGH (необязательное поле task.walkthrough) — разобранный пример перед практикой:
// {
//   text: string,           — сам пример-вопрос (утверждение / заголовок для сопоставления / и т.п.)
//   steps: [строка, ...],   — пошаговый ход мысли, показывается пронумерованным списком
//   answer: string,         — финальный ответ примера
//   whyNotOthers: string,   — (опц.) почему другие варианты не подходят — для heading/mcq/matching
// }
// Показывается один раз в начале блока, до того как студент решает задания сам. Не участвует в подсчёте баллов.

// ===========================================================
//  ТЕХНИКИ ЧТЕНИЯ — общий раздел, отдельно от типов заданий
// ===========================================================
// Каждый навык: { id, title, whenToUse, howTo: [шаги], example: {text, note}, demo: [опц.], passages: [опц.] }
// demo — визуальная демонстрация "как это делается на практике":
// { intro, sentences: [{text, read: true/false}], caption } — read:true подсвечивается,
// read:false показывается затемнённым (то, что пропускается при выполнении техники).
// passages — практика на полноценных текстах (700-800 слов), а не коротких абзацах:
// { title, text (абзацы через \n\n), questions: [{id, prompt, opts, answer, exp}] }
// Каждый questions.prompt обычно ссылается на конкретный абзац текста ("Абзац 2") — так видно,
// что оценивается именно навык (например, определить главную мысль), а не факт из текста.
// example — короткая иллюстрация на реальном фрагменте текста, показывает навык "в деле".

export const READING_SKILLS = [
  {
    id: "skimming",
    title: "Skimming",
    whenToUse: "At the very start, to grasp the general topic and structure of a text in 1-2 minutes, before reading the questions.",
    howTo: [
      "Read only the title, and the first and last sentence of each paragraph — not the whole text in order.",
      "Don't stop at unfamiliar words — the goal isn't to understand everything, just to grasp the general idea.",
      "After skimming, you should be able to say in one phrase what each paragraph is about.",
    ],
    example: {
      text: "\"For centuries, foresters assumed that trees competed with one another... Recent research, however, has revealed a far more cooperative picture.\"",
      note: "Just from the first sentence, it's already clear: what used to be believed has now been challenged by new research. You don't need to read the whole paragraph to understand its role — this phrase is enough.",
    },
    demo: {
      intro: "See it in action: here is a real paragraph. Highlighted sentences are what you'd actually read while skimming — everything dimmed, you'd skip on a first pass.",
      sentences: [
        { text: "Modern life, however, has profoundly disrupted this ancient system.", read: true },
        { text: "Artificial lighting allows people to remain active long after sunset, while smartphone and computer screens emit blue light that is particularly effective at suppressing melatonin production.", read: false },
        { text: "Shift workers face an even more severe disruption, since their work schedules directly contradict the light-dark cycle their bodies expect, forcing the SCN to attempt an almost impossible recalibration on a recurring basis.", read: true },
      ],
      caption: "Reading only the first and last sentence already tells you the paragraph's job: modern life disrupts our natural rhythm, and shift work is the most extreme case. The dimmed middle sentence adds detail (lighting, screens) — useful later for a detail question, but not needed to grasp the main idea right now.",
    },
    passages: [
      {
        title: "The Body's Hidden Clock",
        text:
`Nearly every living organism, from bacteria to blue whales, operates according to an internal timekeeping system known as the circadian rhythm. This roughly 24-hour cycle governs not just sleep and wakefulness but also body temperature, hormone release, and even the efficiency with which the liver metabolises certain drugs. For most of human history, this internal clock was tightly synchronised with the rising and setting of the sun, since sunlight was essentially the only strong cue available to reset it each day.

The primary mechanism behind this synchronisation lies in a small cluster of neurons in the brain called the suprachiasmatic nucleus, or SCN. When light enters the eye, specialised cells send signals directly to the SCN, which in turn regulates the release of melatonin, a hormone that promotes sleepiness. As daylight fades in the evening, melatonin levels rise; when light returns in the morning, they fall again, helping to align our internal sense of time with the external world.

Modern life, however, has profoundly disrupted this ancient system. Artificial lighting allows people to remain active long after sunset, while smartphone and computer screens emit blue light that is particularly effective at suppressing melatonin production. Shift workers face an even more severe disruption, since their work schedules directly contradict the light-dark cycle their bodies expect, forcing the SCN to attempt an almost impossible recalibration on a recurring basis.

The health consequences of this mismatch extend well beyond simple tiredness. Chronic disruption of circadian rhythms has been linked to an increased risk of obesity, type 2 diabetes, cardiovascular disease, and certain cancers, likely because so many metabolic processes are timed to occur at specific points in the daily cycle. Mood disorders, including depression, also appear more prevalent among individuals whose circadian rhythms are frequently out of sync with their environment, such as long-term night-shift workers.

In response, researchers have begun exploring more personalised approaches to managing circadian health. Rather than assuming everyone should follow an identical schedule, scientists now recognise that individuals have different "chronotypes" — some are naturally inclined toward early mornings, others toward late nights — and that forcing a single rigid timetable onto an entire workforce or school system may be counterproductive. Some companies have already begun experimenting with flexible start times, guided by chronobiology research, as a way to improve both wellbeing and productivity.`,
        questions: [
          { id: "sk-1", prompt: "What is the main idea of Paragraph 1?", opts: ["All animals sleep at exactly the same time of day.", "Living organisms have an internal ~24-hour clock that was historically synchronised with sunlight.", "The liver is the most important organ for keeping time.", "Circadian rhythms only affect sleep."], answer: 1, exp: "The paragraph as a whole is about the existence and role of the internal clock — the liver and drug metabolism are just one example of its influence." },
          { id: "sk-2", prompt: "What is the main idea of Paragraph 2?", opts: ["Melatonin is produced regardless of light exposure.", "The SCN, triggered by light, controls melatonin release to align our internal clock with day and night.", "The SCN has no connection to light.", "Melatonin causes wakefulness."], answer: 1, exp: "The key point is the mechanism: light → SCN → melatonin → synchronisation with the outside world." },
          { id: "sk-3", prompt: "What is the main idea of Paragraph 3?", opts: ["Artificial light has no effect on melatonin.", "Modern conveniences — artificial lighting, screens, and shift work — disrupt the body's natural light-dark cycle.", "Shift workers adjust to their schedules easily.", "Blue light improves sleep quality."], answer: 1, exp: "The three examples (lighting, screens, shift work) are united by one idea — modern life disrupting the natural rhythm." },
          { id: "sk-4", prompt: "What is the main idea of Paragraph 4?", opts: ["The only consequence of disrupted rhythms is feeling tired.", "Disrupted circadian rhythms are linked to several serious health conditions, not just tiredness.", "Circadian disruption has no proven health effects.", "Cancer risk decreases with shift work."], answer: 1, exp: "The phrase 'extend well beyond simple tiredness' directly signals that the paragraph is about more serious consequences than fatigue." },
          { id: "sk-5", prompt: "What is the main idea of Paragraph 5?", opts: ["Everyone should follow one fixed schedule.", "Researchers increasingly support personalised schedules based on individual chronotypes rather than a single uniform timetable.", "Chronotypes are irrelevant to workplace scheduling.", "Flexible schedules have proven harmful to productivity."], answer: 1, exp: "The paragraph contrasts the old approach ('one schedule for everyone') with the new one — personalisation based on chronotype." },
        ],
      },
      {
        title: "The Real Cost of Fast Fashion",
        text:
`Over the past two decades, the fashion industry has been transformed by the rise of "fast fashion" — a business model built around producing inexpensive, trend-driven clothing at extraordinary speed. Retailers following this model can move a garment from initial design to store shelves in a matter of weeks rather than the traditional months-long cycle, encouraging consumers to treat clothing as a disposable commodity rather than a long-term investment. As a direct consequence, the average number of times a garment is worn before being discarded has fallen sharply in many markets over the same period.

This shift has come at a considerable environmental cost. Producing a single cotton T-shirt can require several thousand litres of water, while the dyeing and finishing processes release chemical pollutants that frequently end up in local waterways, particularly in countries with weaker environmental regulation. Synthetic fabrics such as polyester, now dominant in fast fashion due to their low cost, shed microscopic plastic fibres every time they are washed, and a substantial share of these microplastics ultimately makes its way into rivers and oceans.

Behind the low price tags lies another significant cost, borne largely by garment workers in manufacturing hubs across South and Southeast Asia. Wages in the sector are frequently insufficient to cover a basic standard of living, and safety standards in some factories remain alarmingly poor. The 2013 collapse of the Rana Plaza factory complex in Bangladesh, which killed over a thousand workers, drew international attention to these conditions, though labour advocates argue that meaningful structural change across the industry has been slow to follow.

In response to growing awareness of these issues, consumer attitudes have begun to shift, at least among certain segments of the market. The secondhand clothing market has expanded rapidly, driven partly by online resale platforms, while a parallel "slow fashion" movement encourages buying fewer, higher-quality garments intended to last for years rather than a single season. Independent certification schemes have also emerged, allowing consumers to identify brands that meet specific environmental or labour standards, though the proliferation of competing labels has occasionally caused confusion rather than clarity.

Major fashion retailers have not been entirely absent from this conversation, with several launching garment take-back schemes, recycled-fibre product lines, and sustainability pledges timed to specific future years. Critics, however, frequently accuse these initiatives of amounting to little more than "greenwashing", pointing out that the volume of clothing such companies continue to produce each year dwarfs the modest quantities addressed by their recycling programmes. Whether the industry can meaningfully reduce its environmental footprint while maintaining its current scale of production remains, for now, an open and contested question.`,
        questions: [
          { id: "sk-6", prompt: "What is the main idea of Paragraph 1?", opts: ["Clothing design now takes longer than it used to.", "Fast fashion enables rapid, low-cost production, encouraging consumers to treat clothes as disposable.", "Consumers now wear each garment longer than before.", "Fast fashion has eliminated seasonal fashion trends."], answer: 1, exp: "The paragraph explains the fast fashion model itself and its consequence — fewer wears per garment." },
          { id: "sk-7", prompt: "What is the main idea of Paragraph 2?", opts: ["Cotton production requires no water at all.", "Fast fashion carries significant environmental costs, including water use, chemical pollution, and microplastics.", "Synthetic fabrics are entirely harmless to the environment.", "Dyeing processes are strictly regulated worldwide."], answer: 1, exp: "Three examples of cost (water, chemicals, microplastics) are united by one idea — the environmental price of the industry." },
          { id: "sk-8", prompt: "What is the main idea of Paragraph 3?", opts: ["Garment workers are generally well paid and safe.", "Poor wages and unsafe conditions for garment workers remain a serious problem, illustrated by the Rana Plaza tragedy.", "The Rana Plaza disaster led to immediate industry-wide reform.", "Factory safety issues have been fully resolved."], answer: 1, exp: "Rana Plaza is given as an illustration of the problem, not as evidence that the problem has been solved." },
          { id: "sk-9", prompt: "What is the main idea of Paragraph 4?", opts: ["Consumers show no interest in sustainable alternatives.", "A growing number of consumers are shifting toward secondhand and slow fashion, supported by certification schemes.", "Certification labels have made sustainable shopping simple and unambiguous.", "The secondhand market has shrunk in recent years."], answer: 1, exp: "The paragraph describes the growth of alternative consumption models, with a caveat about label confusion." },
          { id: "sk-10", prompt: "What is the main idea of Paragraph 5?", opts: ["Sustainability initiatives have fully solved the fashion industry's environmental problems.", "While some brands have introduced sustainability initiatives, critics argue they are insufficient given the scale of production.", "Critics believe fashion brands are doing more than enough.", "Recycling programmes now cover most of the clothing produced."], answer: 1, exp: "The key word is 'dwarfs' — the scale of the initiatives is incomparably small next to the volume of production." },
        ],
      },
    ],
  },
  {
    id: "scanning",
    title: "Scanning — поиск конкретной информации",
    whenToUse: "Когда уже знаешь, ЧТО ищешь (дату, имя, цифру, конкретный факт) — например, отвечая на вопрос Matching Information или T/F/NG.",
    howTo: [
      "Держи в голове 1-2 ключевых слова из вопроса — цифры, имена собственные, редкие термины (их проще всего найти взглядом).",
      "Веди глазами по тексту быстро, не читая каждое слово — как будто ищешь имя в телефонной книге.",
      "Когда встретил ключевое слово (или его синоним) — вот тогда переходи к внимательному чтению этого места.",
    ],
    example: {
      text: "Вопрос: 'What percentage of trees are affected?' — ищи глазами не смысл, а знак % или слова вроде 'percent', 'proportion', цифры.",
      note: "Scanning — это не чтение, а визуальный поиск. Смысл фразы разбираешь только после того, как нашёл нужное место.",
    },
  },
  {
    id: "predicting",
    title: "Прогнозирование по заголовкам и структуре",
    whenToUse: "До чтения самого текста — по заголовку, подзаголовкам, первому абзацу.",
    howTo: [
      "По заголовку задай себе вопрос: о чём, скорее всего, пойдёт речь и какую позицию может занимать автор?",
      "Если в тексте есть подзаголовки или он разбит на пронумерованные части — это уже готовый план текста.",
      "Прогноз не обязан быть точным — его цель дать мозгу 'рамку', в которую легче укладывать детали при чтении.",
    ],
    example: {
      text: "Заголовок: 'The Silent Language of Trees'",
      note: "Слово 'Language' намекает на какой-то вид коммуникации у деревьев — скорее всего, текст объяснит, как именно они 'общаются'. Это подтверждается уже в первом абзаце.",
    },
  },
  {
    id: "detail-reading",
    title: "Чтение на детали (close reading)",
    whenToUse: "Когда ты уже нашёл(-нашла) через scanning нужный участок текста и теперь нужно понять его точно — для ответа на конкретный вопрос.",
    howTo: [
      "Читай медленно, предложение за предложением, обращая внимание на связки: 'however', 'although', 'in contrast' — они часто меняют смысл на противоположный.",
      "Отдельно отмечай слова-ограничители: 'only', 'always', 'some', 'most' — именно они часто решают, TRUE это или NOT GIVEN.",
      "Не додумывай то, чего текст не говорит явно — IELTS Reading проверяет то, что написано, а не общие знания по теме.",
    ],
    example: {
      text: "«Sceptics point out that fungi may simply be moving resources to wherever is most efficient for the fungi themselves...»",
      note: "Слово 'may' — это предположение, не факт. Утверждение вида 'Fungi definitely act for their own benefit' было бы TRUE лишь частично и требует внимательного чтения именно этого нюанса.",
    },
  },
  {
    id: "context-guessing",
    title: "Догадка о значении слова по контексту",
    whenToUse: "Когда встречается незнакомое слово, а останавливаться и искать перевод — не вариант (тест на время).",
    howTo: [
      "Посмотри на слова вокруг: часто рядом есть синоним, пример или объяснение через запятую или тире.",
      "Определи хотя бы часть речи (существительное? глагол? прилагательное?) — этого иногда достаточно, чтобы понять структуру предложения и ответить на вопрос, не зная точного перевода.",
      "Спроси себя: меняется ли смысл всего предложения в позитивную или негативную сторону из-за этого слова? Для многих вопросов этого достаточно.",
    ],
    example: {
      text: "«...mycorrhizae. This underground network, sometimes nicknamed the 'wood wide web'...»",
      note: "Даже не зная термина 'mycorrhizae' дословно, из контекста ('underground network') понятно: это какая-то подземная система связи между растениями — этого достаточно для большинства вопросов.",
    },
  },
  {
    id: "paraphrase",
    title: "Перефразирование — главный навык IELTS Reading",
    whenToUse: "Постоянно. Вопросы почти никогда не используют те же слова, что и текст — экзамен специально проверяет, узнаёшь ли ты один и тот же смысл в разных формулировках.",
    howTo: [
      "Не ищи в тексте дословное совпадение с вопросом — если ищешь именно эти слова, скорее всего, пропустишь ответ.",
      "Учись видеть синонимичные пары: increase → rise / grow; important → significant / crucial; because → due to / as a result of.",
      "Меняется не только слово, но и структура: активный залог может превратиться в пассивный, существительное — в глагол ('the destruction of' → 'destroyed').",
      "Если вопрос и фрагмент текста совпадают почти дословно — это часто ловушка (дистрактор), а настоящий ответ спрятан в перефразированном месте рядом.",
    ],
    example: {
      text: "Текст: «...allow trees to exchange... chemical warning signals.» Вопрос: «Trees can alert each other to danger using chemicals.»",
      note: "'exchange chemical warning signals' и 'alert each other to danger using chemicals' — это одна и та же мысль совершенно разными словами. Именно так выглядит 90% совпадений вопрос-текст.",
    },
  },
  {
    id: "time-management",
    title: "Тайм-менеджмент на экзамене",
    whenToUse: "На реальном тесте: 3 текста, 40 вопросов, 60 минут (включая перенос ответов).",
    howTo: [
      "В среднем — 20 минут на текст. Но третий текст обычно самый сложный: если чувствуешь, что застрял, лучше двигаться дальше и вернуться, чем терять время.",
      "Не обязательно решать тексты по порядку 1→2→3. Многие сначала бегло смотрят все три и начинают с того, что кажется легче по теме.",
      "Не залипай на одном вопросе больше 1-2 минут — поставь любой ответ (никогда не оставляй пустым, штрафа за неверный ответ нет) и иди дальше, вернёшься в конце если останется время.",
      "В конце оставь 2-3 минуты на проверку: правильно ли перенесены ответы в бланк, нет ли лишних слов в Summary Completion.",
    ],
    example: {
      text: "Стратегия: 17 минут на текст 1 → 20 минут на текст 2 → 23 минуты на текст 3.",
      note: "Раз тексты усложняются, логично закладывать чуть меньше времени на первый (обычно самый простой) и больше на третий — но конкретное распределение подбирается под себя на практике.",
    },
  },
  {
    id: "common-traps",
    title: "Типичные ловушки составителей теста",
    whenToUse: "На любом типе задания — экзамен специально включает варианты, которые выглядят правильными на первый взгляд.",
    howTo: [
      "Подмена чисел: в тексте '15%', в неверном варианте ответа — '50%' или '1.5%'. Всегда сверяй цифры отдельно, не полагаясь на память.",
      "Отрицание: добавление 'not', 'except', 'unless' переворачивает смысл. Читай внимательно частицы отрицания — их легко проскочить глазами.",
      "Совпадение слов ≠ совпадение смысла: вариант ответа может содержать те же слова, что и текст, но в другом порядке или контексте, из-за чего смысл меняется.",
      "Обобщение вместо частного: текст говорит 'some researchers believe', а неверный вариант заявляет это как общепризнанный факт ('scientists have proven').",
    ],
    example: {
      text: "Текст: «Some scientists argue that this challenges the traditional view.» Ловушка: «Scientists have proven that competition does not exist in forests.»",
      note: "'Some scientists argue' (мнение части учёных) превращено в 'have proven' (доказанный факт) — это классическая ловушка-обобщение, которую легко принять за верный ответ, если читать невнимательно.",
    },
  },
  {
    id: "yes-no-not-given",
    title: "Yes/No/Not Given — не путать с True/False/Not Given",
    whenToUse: "Когда в задании написано именно YES/NO/NOT GIVEN (а не TRUE/FALSE) — это отдельный тип, обычно встречается в текстах, где автор высказывает мнение или аргумент.",
    howTo: [
      "Главное отличие: True/False/Not Given проверяет ФАКТЫ из текста. Yes/No/Not Given проверяет МНЕНИЕ АВТОРА — согласуется ли утверждение с точкой зрения именно автора текста.",
      "YES — автор явно согласен с утверждением. NO — автор явно не согласен (даже если факт как таковой верен, но автор оспаривает именно эту интерпретацию). NOT GIVEN — автор не высказывает мнения по этому конкретному пункту.",
      "Ищи слова, которые выражают позицию автора: 'clearly', 'unfortunately', 'it is unlikely that', 'surprisingly' — они выдают отношение автора к теме.",
      "Если текст просто описывает факт без оценки — и вопрос требует оценки — это обычно NOT GIVEN, а не YES или NO.",
    ],
    example: {
      text: "Утверждение: 'The traditional view of forest competition is now outdated.' — в тексте, где автор пишет: 'Some scientists argue that this challenges the traditional Darwinian view...'",
      note: "Автор не заявляет прямо от своего имени, что старый взгляд 'устарел' — он лишь сообщает, что НЕКОТОРЫЕ учёные так считают, сохраняя нейтральность. Это NOT GIVEN, а не YES — потому что это не собственная позиция автора, а пересказ чужого мнения.",
    },
  },
  {
    id: "paragraph-structure",
    title: "Paragraph Structure & Function",
    whenToUse: "For Matching Headings or Matching Information — you need to identify not just what a paragraph says, but what job it does within the whole text.",
    howTo: [
      "Most paragraphs open with a topic sentence stating the main idea; the rest of the paragraph supports it with examples, reasons, or evidence.",
      "Ask what role the paragraph plays: does it introduce a problem, describe a process, give a counter-argument, or offer a solution?",
      "For Matching Headings, the heading must match the paragraph's overall function, not just one detail mentioned inside it.",
      "Watch for paragraphs that shift function partway through — for example, starting with a fact, then pivoting to a counter-argument.",
    ],
    example: {
      text: "\"Not all researchers agree on how deliberate this cooperation is. Sceptics point out that fungi may simply be moving resources...\"",
      note: "This paragraph's function is to introduce doubt and a counter-argument — not just to state another fact. Its role in the text is to complicate the earlier claim, which is exactly what a matching heading needs to capture.",
    },
  },
  {
    id: "note-taking",
    title: "Note-taking & Word Limits",
    whenToUse: "For Summary, Table, Flow-chart, and Notes Completion tasks, where instructions specify an exact word limit.",
    howTo: [
      "Always check the exact instruction first — 'NO MORE THAN TWO WORDS AND/OR A NUMBER' is different from 'ONE WORD ONLY'. Read it before you start, not after.",
      "A number (e.g. '2010', '15%') usually counts as one word, unless it is written out in full ('fifteen').",
      "Hyphenated words (e.g. 'well-being') are usually counted as one word — but always check the specific instructions of that task.",
      "While scanning, jot down only the essential words — full sentences waste time and rarely fit the gap grammatically anyway.",
      "After finishing, recount the words in every answer — going over the limit makes an otherwise correct answer wrong.",
    ],
    example: {
      text: "Instruction: 'Complete the notes below. Use NO MORE THAN TWO WORDS from the passage.' Text: '...connected by a vast web of thread-like fungi known as mycorrhizae.'",
      note: "'Thread-like fungi' is two words and fits the limit. Something like 'a vast web of thread-like fungi' would be far too long and marked wrong, even though it's also technically taken from the text.",
    },
  },
  {
    id: "grammatical-prediction",
    title: "Grammatical Prediction",
    whenToUse: "For Sentence Completion and Matching Sentence Endings — before searching the text, predict what kind of word or phrase must grammatically fit the gap.",
    howTo: [
      "Read the sentence around the gap carefully: is a noun needed? A verb? An adjective? This narrows down what you're scanning for before you even start reading the passage.",
      "Check what comes immediately before and after the gap — a missing article ('a', 'the') or preposition often signals exactly what part of speech is required.",
      "For Matching Sentence Endings, the ending must be grammatically compatible with the sentence beginning, not just logically plausible — eliminate any option that would create a grammar error.",
      "Predicting the grammar first, then scanning for a matching word, is faster than reading every candidate sentence in full.",
    ],
    example: {
      text: "Sentence stem: 'Trees connected through fungal networks are able to exchange...'",
      note: "After 'exchange' we need a noun or noun phrase — something being exchanged. This immediately rules out any sentence ending that starts with a verb or a lone adjective, before you've even read its content.",
    },
  },
];

// ===========================================================
//  ТАБЛИЦА ПЕРЕВОДА БАЛЛОВ В BAND SCORE (Academic Reading)
// ===========================================================
// Справочная — примерное соответствие (реальная шкала может немного
// отличаться между версиями теста).
export const BAND_SCORE_TABLE = [
  { correct: "39–40", band: "9.0" },
  { correct: "37–38", band: "8.5" },
  { correct: "35–36", band: "8.0" },
  { correct: "33–34", band: "7.5" },
  { correct: "30–32", band: "7.0" },
  { correct: "27–29", band: "6.5" },
  { correct: "23–26", band: "6.0" },
  { correct: "19–22", band: "5.5" },
  { correct: "15–18", band: "5.0" },
  { correct: "13–14", band: "4.5" },
];

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
        title: "True / False / Not Given — разбор и практика",
        instructions: "Согласны ли следующие утверждения с информацией в тексте? Выберите TRUE, FALSE или NOT GIVEN.",
        strategy: [
          "TRUE — текст прямо подтверждает утверждение. FALSE — текст прямо противоречит. NOT GIVEN — в тексте просто нет информации об этом (тема может быть упомянута, но нужных деталей нет).",
          "Самая частая ошибка — путать FALSE и NOT GIVEN. Прежде чем ставить FALSE, спроси себя: 'текст правда говорит обратное, или я просто не нашёл(-ла) подтверждения?' Если не нашёл(-ла) — это NOT GIVEN.",
          "Утверждения обычно идут в том же порядке, что и информация в тексте — двигайся по тексту последовательно, не перескакивай.",
          "Выдели в утверждении 1-2 ключевых слова и ищи их — или их синонимы — в тексте. Дословных совпадений почти никогда не бывает.",
          "Следи за словами-усилителями и ограничителями: 'always', 'only', 'all', 'never' — часто именно они делают верное по смыслу утверждение ложным, потому что текст даёт более осторожную формулировку.",
        ],
        walkthrough: {
          text: "Example: 'Trees only communicate with members of the same species.'",
          steps: [
            "Ключевые слова утверждения: 'only' (ограничитель) + 'same species'.",
            "Ищем в тексте упоминание того, с кем именно трееs 'общаются'. Во втором абзаце: 'alert neighbouring trees of the same species' — да, про этот вид общения сказано именно 'того же вида'.",
            "Но слово 'only' в утверждении добавляет условие: коммуникация ТОЛЬКО с тем же видом, никогда с другими. Текст нигде не утверждает и не отрицает, что деревья разных видов не могут обмениваться сигналами — об этом просто не сказано.",
            "Значит, часть про 'alert neighbouring trees of the same species' — правда, но добавленное 'only' делает утверждение шире, чем то, что подтверждает текст.",
          ],
          answer: "NOT GIVEN",
          whyNotOthers: "Не FALSE, потому что текст не говорит обратного ('деревья общаются и с другими видами') — он просто не затрагивает этот вопрос. Не TRUE, потому что текст не подтверждает исключительность ('only').",
        },
        items: [
          { id: "r1-1", text: "Foresters have always believed that trees cooperate rather than compete.", answer: "FALSE" },
          { id: "r1-2", text: "Mycorrhizal fungi connect the roots of different trees underground.", answer: "TRUE" },
          { id: "r1-3", text: "Trees under insect attack can warn other trees of the same species.", answer: "TRUE" },
          { id: "r1-4", text: "Mother trees only transfer resources to trees of a different species.", answer: "NOT GIVEN" },
          { id: "r1-5", text: "All scientists agree that the transfer of resources between trees is a deliberate strategy.", answer: "FALSE" },
          { id: "r1-6", text: "Researchers have found it easy to test whether fungi act deliberately or not.", answer: "FALSE" },
          { id: "r1-7", text: "The study found that isolated trees produced more defensive enzymes than trees connected to an infested tree.", answer: "FALSE" },
          { id: "r1-8", text: "Mother trees are typically older and larger than the seedlings they support.", answer: "TRUE" },
          { id: "r1-9", text: "Experiments on fungal networks are simple to conduct without affecting the network itself.", answer: "FALSE" },
          { id: "r1-10", text: "Some foresters have changed their practices as a result of this research.", answer: "TRUE" },
        ],
      },
    ],
  },

  // Юниты 2–10: добавляются по этой же схеме после утверждения формата Юнита 1.
  // 2 — Matching Headings, 3 — Matching Information, 4 — Summary Completion,
  // 5 — Multiple Choice, 6–10 — смешанная практика по нарастанию сложности.
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
