/**
 * CertifyWise
 * © 2026 Алназирова Айдана (Aidana Alnazirova). Все права защищены.
 * Дата создания: 22 мая 2026 г.
 * Использование без письменного разрешения автора запрещено.
 *
 * TKT Modules 1–3 в формате экзамена:
 *  - mcq3:  выбор из трёх вариантов (A, B, C), в том числе «какой НЕ…»
 *  - match: соотнесение с набором вариантов, один вариант лишний
 * Варианты ответа перемешиваются при каждом показе.
 */

import { T, TT } from "./i18n";

export const TKT_MODULES = [
  {
    id: "m1",
    title: "Module 1",
    subtitle: "Background to language teaching and learning",
    tasks: [
      {
        id: "m1-lex", part: "Part 1 · Describing language", type: "match",
        instructions: "For questions 1–6, match the underlined examples with the terms listed A–G. There is one extra option which you do not need to use.",
        options: [
          { letter: "A", text: "collocation" }, { letter: "B", text: "compound noun" }, { letter: "C", text: "prefix" },
          { letter: "D", text: "phrasal verb" }, { letter: "E", text: "idiom" }, { letter: "F", text: "homophones" }, { letter: "G", text: "antonyms" },
        ],
        items: [
          { id: "m1l1", text: "We need to <u>make a decision</u> today.", answer: "A", exp: T("Make + decision — слова, которые устойчиво употребляются вместе (не *do a decision).") },
          { id: "m1l2", text: "Wait for me at the <u>bus stop</u>.", answer: "B", exp: T("Два существительных образуют одно понятие — составное существительное.") },
          { id: "m1l3", text: "She was <u>un</u>happy with the result.", answer: "C", exp: T("Un- добавляется в начало слова и меняет значение — префикс.") },
          { id: "m1l4", text: "Who will <u>look after</u> the children?", answer: "D", exp: T("Глагол + частица с новым значением (заботиться) — фразовый глагол.") },
          { id: "m1l5", text: "Don't worry, the exam was <u>a piece of cake</u>.", answer: "E", exp: T("Значение целого нельзя вывести из значений слов — идиома.") },
          { id: "m1l6", text: "<u>their</u> / <u>there</u>", answer: "F", exp: T("Одинаково звучат, по-разному пишутся и значат — омофоны.") },
        ],
      },
      {
        id: "m1-form", part: "Part 1 · Describing language and skills", type: "mcq3",
        instructions: "For questions 1–8, choose the correct answer (A, B or C).",
        items: [
          { id: "m1f1", text: "Which word has the main stress on the second syllable?", opts: ["photograph", "photographer", "photographic"], answer: 1, exp: T("pho-TOG-ra-pher. PHO-to-graph — первый слог, pho-to-GRAPH-ic — третий.") },
          { id: "m1f2", text: "In 'I've been waiting for an hour', the verb form is", opts: ["present perfect simple", "present perfect continuous", "past continuous"], answer: 1, exp: "have/has + been + -ing — present perfect continuous." },
          { id: "m1f3", text: "Which sentence contains a modal verb expressing obligation?", opts: ["You must wear a helmet here.", "She might come later tonight.", "He can swim really well."], answer: 0, exp: T("Must — обязанность; might — возможность; can — умение.") },
          { id: "m1f4", text: "In fast speech, 'fish and chips' often sounds like 'fish'n'chips'. This is an example of", opts: ["a weak form", "rising intonation", "word stress"], answer: 0, exp: T("Безударное 'and' редуцируется до /ən/ или /n/ — слабая форма.") },
          { id: "m1f5", text: "'Why don't we take a short break?' The function of this sentence is", opts: ["making a suggestion", "asking for information", "expressing a preference"], answer: 0, exp: T("Форма вопроса, но функция — предложение. Why don't we…? = Let's… Вопрос о причине здесь не задаётся.") },
          { id: "m1f6", text: "Reading for gist means reading", opts: ["to find specific numbers or names", "to understand the general idea", "every word slowly and carefully"], answer: 1, exp: T("Gist — общий смысл. Поиск конкретных данных — scanning.") },
          { id: "m1f7", text: "A learner guesses what a text is about from its title and picture. This sub-skill is", opts: ["predicting", "scanning", "inferring attitude"], answer: 0, exp: T("Предположение о содержании до чтения — predicting.") },
          { id: "m1f8", text: "Which task mainly practises listening for specific information?", opts: ["Listen and tick the topics the two speakers discuss.", "Listen and note the departure times and prices of the tours.", "Listen and decide how each speaker feels about the trip."], answer: 1, exp: T("Время и цены — конкретные сведения. Темы разговора — gist, чувства говорящих — понимание отношения (inference).") },
        ],
      },
      {
        id: "m1-learner", part: "Part 2 · Background to language learning", type: "match",
        instructions: "For questions 1–6, match the descriptions of learners with the concepts listed A–G. There is one extra option which you do not need to use.",
        options: [
          { letter: "A", text: "intrinsic motivation" }, { letter: "B", text: "learner autonomy" }, { letter: "C", text: "L1 interference" },
          { letter: "D", text: "overgeneralisation" }, { letter: "E", text: "silent period" }, { letter: "F", text: "exposure" }, { letter: "G", text: "fossilisation" },
        ],
        items: [
          { id: "m1n1", text: "Aliya reads English novels at home every evening, although no one checks or marks it.", answer: "A", exp: T("Мотивация изнутри: удовольствие от самой деятельности.") },
          { id: "m1n2", text: "Timur keeps a vocabulary notebook and decides himself what to review each week.", answer: "B", exp: T("Ученик сам управляет своим обучением — автономия.") },
          { id: "m1n3", text: "A Russian-speaking learner says 'I am agree with you'.", answer: "C", exp: T("Перенос структуры «я согласен» из родного языка.") },
          { id: "m1n4", text: "A child says 'I runned to school yesterday'.", answer: "D", exp: T("Правило -ed применено к неправильному глаголу.") },
          { id: "m1n5", text: "A young learner understands a lot but does not speak English for several weeks.", answer: "E", exp: T("Период, когда ребёнок воспринимает язык, но ещё не говорит.") },
          { id: "m1n6", text: "A learner's listening improves after months of hearing English in class and on TV.", answer: "F", exp: T("Количество языка, с которым встречается ученик, — exposure.") },
        ],
      },
      {
        id: "m1-learn2", part: "Part 2 · Background to language learning", type: "mcq3",
        instructions: "For questions 1–4, choose the correct answer (A, B or C).",
        items: [
          { id: "m1m1", text: "An error, rather than a mistake, is", opts: ["a slip the learner can correct alone", "a form the learner has not yet acquired", "a wrong form caused by tiredness or stress"], answer: 1, exp: T("Error — системная ошибка от незнания; mistake — оговорка, которую ученик исправит сам.") },
          { id: "m1m2", text: "Extrinsic motivation comes from", opts: ["enjoying the activity itself", "outside rewards such as grades or a job", "the learner's curiosity about the language"], answer: 1, exp: T("Внешние стимулы: оценки, работа, требования.") },
          { id: "m1m3", text: "Compared with adults, young learners usually", opts: ["have a shorter attention span", "prefer analysing grammar rules", "need more explicit correction"], answer: 0, exp: T("Детям нужна частая смена деятельности.") },
          { id: "m1m4", text: "According to Krashen, comprehensible input is language that is", opts: ["a little beyond the learner's level but still mostly understood", "carefully graded so that every word is already familiar", "made easier to follow by translating key words into L1"], answer: 0, exp: T("i+1: чуть выше текущего уровня, но понятно в целом из контекста. Полностью знакомый язык не продвигает усвоение.") },
        ],
      },
      {
        id: "m1-approach", part: "Part 3 · Background to language teaching", type: "match",
        instructions: "For questions 1–6, match the lesson descriptions with the approaches listed A–G. There is one extra option which you do not need to use.",
        options: [
          { letter: "A", text: "Presentation, Practice, Production" }, { letter: "B", text: "Task-based learning" }, { letter: "C", text: "Test-teach-test" },
          { letter: "D", text: "Grammar-translation" }, { letter: "E", text: "Audiolingualism" }, { letter: "F", text: "Lexical approach" }, { letter: "G", text: "CLIL" },
        ],
        items: [
          { id: "m1a1", text: "The teacher presents a structure, students do a controlled exercise and then use it in a free role-play.", answer: "A", exp: T("Классическая последовательность PPP.") },
          { id: "m1a2", text: "Students plan a class trip together; the teacher focuses on language only after the task.", answer: "B", exp: T("Задача в центре урока, язык — после неё.") },
          { id: "m1a3", text: "Students do a gap-fill, the teacher teaches what they got wrong, then they do a similar gap-fill.", answer: "C", exp: T("Сначала проверка, потом обучение, потом повторная проверка.") },
          { id: "m1a4", text: "Students translate sentences from their L1 and learn grammar rules by heart.", answer: "D", exp: T("Перевод и правила — грамматико-переводной метод.") },
          { id: "m1a5", text: "Students repeat dialogues and drills many times to form correct habits.", answer: "E", exp: T("Повторение и формирование привычек — аудиолингвальный метод.") },
          { id: "m1a6", text: "Students learn science through English with support for the language they need.", answer: "G", exp: T("Предмет через язык — CLIL.") },
        ],
      },
      {
        id: "m1-assess", part: "Part 3 · Background to language teaching", type: "mcq3",
        instructions: "For questions 1–5, choose the correct answer (A, B or C).",
        items: [
          { id: "m1s1", text: "A test given at the start of a course to put learners into the right group is", opts: ["a placement test", "an achievement test", "a proficiency test"], answer: 0, exp: T("Placement — распределение по уровням.") },
          { id: "m1s2", text: "Formative assessment is mainly used to", opts: ["give learners a final grade for the course", "support learning during the course", "compare results across different schools"], answer: 1, exp: T("Формирующее оценивание помогает учиться в процессе.") },
          { id: "m1s3", text: "A test is reliable if it", opts: ["measures what it claims to measure", "gives consistent results", "is easy for most students"], answer: 1, exp: T("Reliability — стабильность результатов; первое — validity.") },
          { id: "m1s4", text: "Which of these is NOT a form of informal assessment?", opts: ["observing learners during pair work", "an end-of-year written exam", "checking learners' homework"], answer: 1, exp: T("Итоговый экзамен — формальное оценивание.") },
          { id: "m1s5", text: "Washback is", opts: ["the effect of a test on teaching and learning", "feedback given to learners on their test results", "marking a test again to check its reliability"], answer: 0, exp: T("Влияние экзамена на то, как учат и учатся.") },
        ],
      },
    ],
  },
  {
    id: "m2",
    title: "Module 2",
    subtitle: "Lesson planning and use of resources",
    tasks: [
      {
        id: "m2-stage", part: "Part 1 · Planning a lesson", type: "match",
        instructions: "For questions 1–6, match the classroom activities with their main aims listed A–G. There is one extra option which you do not need to use.",
        options: [
          { letter: "A", text: "to generate interest in the topic" }, { letter: "B", text: "to check understanding of meaning" },
          { letter: "C", text: "to provide controlled practice of form" }, { letter: "D", text: "to encourage fluent use of language" },
          { letter: "E", text: "to check understanding of instructions" }, { letter: "F", text: "to correct errors heard during a task" },
          { letter: "G", text: "to assess writing for a final grade" },
        ],
        items: [
          { id: "m2s1", text: "The teacher shows a photo of a festival and asks students what they know about it.", answer: "A", exp: T("Lead-in: вызвать интерес и активизировать знания.") },
          { id: "m2s2", text: "The teacher asks: 'Is he still working there? Did he stop?'", answer: "B", exp: T("Concept checking questions проверяют понимание значения.") },
          { id: "m2s3", text: "Students complete sentences with the correct past simple form of the verbs.", answer: "C", exp: T("Контролируемая практика формы.") },
          { id: "m2s4", text: "Students tell their partners about their last holiday.", answer: "D", exp: T("Свободная практика, акцент на беглости.") },
          { id: "m2s5", text: "Before pair work the teacher asks: 'Do you write or speak? How long do you have?'", answer: "E", exp: T("ICQs проверяют понимание инструкции.") },
          { id: "m2s6", text: "After a discussion, the teacher writes four sentences heard during the task on the board for students to correct.", answer: "F", exp: T("Отложенная коррекция ошибок после задания.") },
        ],
      },
      {
        id: "m2-plan", part: "Part 1 · Planning a lesson", type: "mcq3",
        instructions: "For questions 1–5, choose the correct answer (A, B or C).",
        items: [
          { id: "m2p1", text: "Which is the most appropriate main aim for a lesson?", opts: ["Learners will complete exercises 3 and 4 on page 26 of the coursebook.", "Learners will be able to talk about past experiences using the present perfect.", "The teacher will present and explain the form of the present perfect tense."], answer: 1, exp: T("Цель формулируется через то, что смогут сделать ученики, а не через упражнения или действия учителя.") },
          { id: "m2p2", text: "'Anticipated problems' in a lesson plan are", opts: ["difficulties learners may have with the language or tasks", "problems the teacher had with this group in previous lessons", "topics that the learners may find boring or irrelevant"], answer: 0, exp: T("Предполагаемые трудности учеников и способы их решения.") },
          { id: "m2p3", text: "The main aim of a lesson is 'to give practice in reading for detail'. Which is the most suitable subsidiary aim?", opts: ["to give fluency practice in a discussion of the text's topic", "to give learners further practice in reading for specific detail", "to test learners' knowledge of the past perfect before reading"], answer: 0, exp: T("Вспомогательная цель поддерживает основную, но не повторяет её. Проверка грамматики перед чтением не связана с целью урока.") },
          { id: "m2p4", text: "A teacher varies interaction patterns mainly in order to", opts: ["increase student talking time", "reduce lesson preparation time", "make the lesson last longer"], answer: 0, exp: T("Пары и группы дают ученикам больше говорить.") },
          { id: "m2p5", text: "Which is NOT a reason for including anticipated problems in a lesson plan?", opts: ["to prepare solutions to difficulties learners may have", "to think about the lesson from the learners' point of view", "to show the observer which learners are the weakest"], answer: 2, exp: T("Раздел нужен, чтобы заранее продумать трудности и решения с позиции учеников, а не чтобы оценивать учеников.") },
        ],
      },
      {
        id: "m2-res", part: "Part 2 · Selection and use of resources", type: "match",
        instructions: "For questions 1–6, match the teachers' purposes with the resources listed A–G. There is one extra option which you do not need to use.",
        options: [
          { letter: "A", text: "a learner's dictionary" }, { letter: "B", text: "a corpus" }, { letter: "C", text: "a graded reader" },
          { letter: "D", text: "realia" }, { letter: "E", text: "flashcards" }, { letter: "F", text: "a phonemic chart" }, { letter: "G", text: "a teacher's book" },
        ],
        items: [
          { id: "m2r1", text: "To show how often 'make' and 'do' appear with different nouns in real texts.", answer: "B", exp: T("Корпус — большая база реальных текстов, показывает частотность и сочетаемость.") },
          { id: "m2r2", text: "To check the meaning, pronunciation and example sentences of a new word.", answer: "A", exp: T("Словарь для изучающих язык.") },
          { id: "m2r3", text: "To give elementary learners extensive reading with controlled vocabulary.", answer: "C", exp: T("Адаптированная книга с ограниченной лексикой.") },
          { id: "m2r4", text: "To let learners handle menus, bus tickets and receipts during a café role-play.", answer: "D", exp: T("Настоящие предметы из жизни — realia.") },
          { id: "m2r5", text: "To prompt a fast revision drill of twelve new words, showing one image after another.", answer: "E", exp: T("Карточки удобны для быстрой отработки слов по одному.") },
          { id: "m2r6", text: "To help learners see and practise the sounds of English.", answer: "F", exp: T("Фонемная таблица.") },
        ],
      },
      {
        id: "m2-mat", part: "Part 2 · Selection and use of resources", type: "mcq3",
        instructions: "For questions 1–4, choose the correct answer (A, B or C).",
        items: [
          { id: "m2m1", text: "A teacher replaces a coursebook text about baseball with a text about kokpar but keeps the same tasks. The teacher is", opts: ["adapting the material", "supplementing the material", "omitting the material"], answer: 0, exp: T("Материал изменён под группу, задания сохранены, — адаптация. Supplementing — добавить к учебнику новое, omitting — пропустить.") },
          { id: "m2m2", text: "Authentic material is material that was", opts: ["written for native speakers, not for learners", "recorded specially for a coursebook's audio", "written by the teacher for an end-of-unit test"], answer: 0, exp: T("Аутентичный — созданный не для учебных целей.") },
          { id: "m2m3", text: "A teacher supplements a coursebook when", opts: ["learners need more practice than the book offers", "the coursebook already matches the learners' needs exactly", "the learners have asked to stop using the coursebook"], answer: 0, exp: T("Дополняют, когда в учебнике не хватает нужной практики.") },
          { id: "m2m4", text: "Before using a reading text created by an AI tool, the teacher should first check", opts: ["the accuracy of facts and the level of language", "the colour, font and layout of the text", "how quickly the tool produced the text for her"], answer: 0, exp: T("AI может ошибаться в фактах и не попадать в уровень группы.") },
        ],
      },
    ],
  },
  {
    id: "m3",
    title: "Module 3",
    subtitle: "Managing the teaching and learning process",
    tasks: [
      {
        id: "m3-tl", part: "Part 1 · Teachers' and learners' language", type: "match",
        instructions: "For questions 1–7, match the teacher's words with their functions listed A–H. There is one extra option which you do not need to use.",
        options: [
          { letter: "A", text: "eliciting" }, { letter: "B", text: "giving instructions" }, { letter: "C", text: "checking instructions" },
          { letter: "D", text: "concept checking" }, { letter: "E", text: "encouraging a learner to extend an answer" }, { letter: "F", text: "prompting self-correction" },
          { letter: "G", text: "nominating" }, { letter: "H", text: "translating" },
        ],
        items: [
          { id: "m3t1", text: "Can anyone tell me the word for a person who cooks in a restaurant?", answer: "A", exp: T("Учитель «вытягивает» слово из учеников.") },
          { id: "m3t2", text: "Work with your partner. Read the text and underline all the dates.", answer: "B", exp: T("Инструкция к заданию.") },
          { id: "m3t3", text: "So, are you working alone or together?", answer: "C", exp: T("ICQ — проверка понимания инструкции.") },
          { id: "m3t4", text: "'I used to swim.' Do I swim now?", answer: "D", exp: T("CCQ — проверка понимания значения.") },
          { id: "m3t5", text: "Interesting! Why do you think that is?", answer: "E", exp: T("Учитель просит ученика развить ответ. Ошибки нет, поэтому это не подсказка для самоисправления.") },
          { id: "m3t6", text: "'Yesterday I go…?' Think about the tense.", answer: "F", exp: T("Подсказка, чтобы ученик исправился сам.") },
          { id: "m3t7", text: "Aliya, what do you think?", answer: "G", exp: T("Выбор конкретного ученика для ответа.") },
        ],
      },
      {
        id: "m3-ll", part: "Part 1 · Teachers' and learners' language", type: "mcq3",
        instructions: "For questions 1–3, choose the main function of the learner's words (A, B or C).",
        items: [
          { id: "m3l1", text: "'So you mean we should finish it at home?'", opts: ["checking understanding", "making a suggestion", "asking for permission"], answer: 0, exp: T("Ученик переспрашивает своими словами, чтобы убедиться, что понял задание.") },
          { id: "m3l2", text: "'Couldn't we do the other exercise instead?'", opts: ["suggesting an alternative", "asking for clarification", "giving an opinion"], answer: 0, exp: T("Отрицательный вопрос с could — вежливое предложение другого варианта.") },
          { id: "m3l3", text: "'I'm not sure that's right. Doesn't \"since\" need a point in time?'", opts: ["questioning a classmate's answer", "asking for a definition", "apologising for a mistake"], answer: 0, exp: T("Ученик сомневается в ответе одноклассника и приводит довод.") },
        ],
      },
      {
        id: "m3-cm", part: "Part 2 · Classroom management", type: "mcq3",
        instructions: "For questions 1–7, choose the correct answer (A, B or C).",
        items: [
          { id: "m3c1", text: "A student makes a grammar mistake during a fluency activity. The teacher should usually", opts: ["stop the activity and correct it at once", "note it down and deal with it afterwards", "ask the class to repeat the correct form"], answer: 1, exp: T("Во время задания на беглость коррекция откладывается.") },
          { id: "m3c2", text: "Monitoring during pair work means", opts: ["moving around, listening and helping", "sitting at the desk and marking work", "doing the task with the strongest student"], answer: 0, exp: T("Учитель ходит, слушает, помогает и отмечает ошибки.") },
          { id: "m3c3", text: "In a jigsaw reading activity,", opts: ["groups read different parts and then share", "all students read the same text silently", "the teacher reads the text aloud to the class"], answer: 0, exp: T("У каждой группы своя часть текста — обмен информацией.") },
          { id: "m3c4", text: "Which of these does NOT reduce teacher talking time?", opts: ["eliciting answers and examples from learners", "giving long explanations of grammar rules", "using pair work for most practice activities"], answer: 1, exp: T("Долгие объяснения увеличивают время речи учителя.") },
          { id: "m3c5", text: "A teacher gives instructions before handing out a worksheet because", opts: ["learners listen better when they are not reading", "it saves the teacher time on photocopying", "it shows the teacher's authority in class"], answer: 0, exp: T("Ученики не отвлекаются на лист, пока слушают инструкцию.") },
          { id: "m3c6", text: "A learner says 'He don't like it'. The teacher turns to the class and asks, 'Is that right?' The teacher is encouraging", opts: ["peer correction", "self-correction", "recasting"], answer: 0, exp: T("Вопрос обращён к классу — исправляют одноклассники. Самоисправление — когда подсказку получает сам ученик, recast — учитель сам повторяет правильно.") },
          { id: "m3c7", text: "Recasting means", opts: ["repeating the learner's words correctly, without comment", "asking learners to rewrite their whole text at home", "explaining the grammar rule again in the learners' L1"], answer: 0, exp: T("Неявная коррекция: учитель повторяет правильно, не указывая на ошибку.") },
        ],
      },
    ],
  },
];
