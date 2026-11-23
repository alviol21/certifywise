/**
 * CertifyWise
 * © 2026 Альназирова Айдана (Aidana Alnazirova). Все права защищены.
 * Дата создания: 22 мая 2026 г.
 * Использование без письменного разрешения автора запрещено.
 *
 * Маршруты подготовки: для каждого экзамена — шаги в нужном порядке.
 * Каждый шаг отмечается автоматически по результатам, сохранённым на сайте:
 *   lessons  — пройдены уроки с этими номерами;
 *   mods     — есть попытки модулей, чьё название начинается с указанного текста
 *              (count — сколько разных модулей нужно, min — минимальный лучший %);
 *   deltaAi  — число уроков, где студент работал с AI-тьютором на уровне DELTA.
 * Названия модулей — те, что сохраняются в базу (на русском), см. onSave в разделах.
 */

import { L } from "./i18n";

// IELTS: процент = band / 9. Band 6.5 ≈ 72%, band 7 ≈ 78%.
export const ROUTES = [
  {
    id: "TKT", emoji: "📘",
    title: "TKT",
    about: L(
      "Три независимых модуля по 80 вопросов, 80 минут каждый. Опыт преподавания не нужен. Результат — Band 1–4. Маршрут ведёт от языка к уроку и к классу, как устроены сами модули.",
      "Three independent modules, 80 questions and 80 minutes each. No teaching experience required. Results are reported as Band 1–4. The route moves from language to the lesson to the classroom, just like the modules themselves."
    ),
    goal: L("Цель: 80% и выше в каждом модуле на сайте", "Target: 80% or higher in each module on the site"),
    steps: [
      { title: L("Входная диагностика", "Entry diagnostic"), why: L("Покажет, с какими темами сложнее всего.", "Shows which topics are hardest for you."), check: { lessons: [1] }, links: ["lessons"] },
      { title: L("Разминка: термины Module 1", "Warm-up: Module 1 terms"), why: L("Быстро вспомнить базовую терминологию.", "Quickly revise basic terminology."), check: { mods: [{ p: "Module 1 — Language", min: 70 }] }, links: ["practice"] },
      { title: L("Уроки 2–4: грамматика, лексика, фонология", "Lessons 2–4: grammar, lexis, phonology"), why: L("Это часть 1 Module 1 — 40 вопросов из 80.", "This is Module 1 Part 1 — 40 of the 80 questions."), check: { lessons: [2, 3, 4] }, links: ["lessons"] },
      { title: L("Урок 5: учащиеся и ошибки", "Lesson 5: learners and errors"), why: L("Часть 2 Module 1: мотивация, L1, ошибки.", "Module 1 Part 2: motivation, L1, errors."), check: { lessons: [5] }, links: ["lessons"] },
      { title: L("Уроки 6–7: обучение навыкам", "Lessons 6–7: teaching the skills"), why: L("Подготовка к части 3 Module 1 и к Module 2.", "Prepares you for Module 1 Part 3 and Module 2."), check: { lessons: [6, 7] }, links: ["lessons"] },
      { title: L("TKT Module 1 в формате экзамена", "TKT Module 1 in exam format"), why: L("Проверка: готовы ли вы к первому модулю.", "Check: are you ready for the first module?"), check: { mods: [{ p: "TKT формат · Module 1", min: 80 }] }, links: ["prof"] },
      { title: L("Уроки 8–9: планирование и материалы", "Lessons 8–9: planning and materials"), why: L("Обе части Module 2.", "Both parts of Module 2."), check: { lessons: [8, 9] }, links: ["lessons"] },
      { title: L("TKT Module 2 в формате экзамена", "TKT Module 2 in exam format"), why: L("Цели, этапы, ресурсы — проверка по формату.", "Aims, stages, resources — an exam-format check."), check: { mods: [{ p: "TKT формат · Module 2", min: 80 }] }, links: ["prof"] },
      { title: L("Уроки 10–11: класс и оценивание", "Lessons 10–11: classroom and assessment"), why: L("Module 3: язык учителя, управление классом.", "Module 3: teacher language, classroom management."), check: { lessons: [10, 11] }, links: ["lessons"] },
      { title: L("TKT Module 3 в формате экзамена", "TKT Module 3 in exam format"), why: L("Последний модуль.", "The last module."), check: { mods: [{ p: "TKT формат · Module 3", min: 80 }] }, links: ["prof"] },
      { title: L("Урок 12 и итоговая диагностика", "Lesson 12 and final diagnostic"), why: L("Сравните результат с входной диагностикой.", "Compare your result with the entry diagnostic."), check: { lessons: [12] }, links: ["lessons"] },
    ],
  },
  {
    id: "CELTA", emoji: "📗",
    title: "CELTA",
    about: L(
      "Около 120 часов: 6 часов оцениваемой практики, наблюдение уроков и 4 письменных задания. Теста нет — оценивают ваши планы, уроки и письменные работы. Нужен уровень английского около C1. Маршрут готовит к письменным заданиям и к планированию уроков.",
      "About 120 hours: 6 hours of assessed teaching practice, observation and 4 written assignments. There is no test — your plans, lessons and written work are assessed. You need English at around C1. The route prepares you for the written assignments and for lesson planning."
    ),
    goal: L("Цель: все задания CELTA на сайте + свой английский на уровне IELTS 7", "Target: all CELTA tasks on the site + your own English at IELTS 7 level"),
    steps: [
      { title: L("Входная диагностика", "Entry diagnostic"), why: L("Отправная точка.", "Your starting point."), check: { lessons: [1] }, links: ["lessons"] },
      { title: L("Уроки 2–4: анализ языка", "Lessons 2–4: language analysis"), why: L("Основа задания 2 «Language related tasks» и каждого плана урока.", "The basis of Assignment 2 'Language related tasks' and every lesson plan."), check: { lessons: [2, 3, 4] }, links: ["lessons"] },
      { title: L("CELTA: анализ языка «used to»", "CELTA: language analysis 'used to'"), why: L("Форма, значение, CCQs, произношение — как в плане CELTA.", "Form, meaning, CCQs, pronunciation — as in a CELTA plan."), check: { mods: [{ p: "CELTA практика: Language analysis", min: 60 }] }, links: ["prof"] },
      { title: L("Урок 5 и «Focus on the learner»", "Lesson 5 and 'Focus on the learner'"), why: L("Задание 1 CELTA — профиль учащегося.", "CELTA Assignment 1 — a learner profile."), check: { lessons: [5], mods: [{ p: "CELTA практика: Focus on the learner", min: 60 }] }, links: ["lessons", "prof"] },
      { title: L("Уроки 6–7 и урок чтения", "Lessons 6–7 and a reading lesson"), why: L("Задание 3 — навыки; цели и этапы урока чтения.", "Assignment 3 — skills; aims and stages of a reading lesson."), check: { lessons: [6, 7], mods: [{ p: "CELTA практика: Aims and stages", min: 60 }] }, links: ["lessons", "prof"] },
      { title: L("Урок 8 и этапы PPP-урока", "Lesson 8 and staging a PPP lesson"), why: L("Каждый урок практики начинается с плана.", "Every teaching practice lesson starts with a plan."), check: { lessons: [8], mods: [{ p: "CELTA практика: Staging", min: 80 }] }, links: ["lessons", "prof"] },
      { title: L("Урок 10 и инструкции с ICQs", "Lesson 10 and instructions with ICQs"), why: L("Инструкции оценивают в каждом уроке практики.", "Instructions are assessed in every teaching practice lesson."), check: { lessons: [10], mods: [{ p: "CELTA практика: Instructions", min: 60 }] }, links: ["lessons", "prof"] },
      { title: L("Урок 12 и «Lessons from the classroom»", "Lesson 12 and 'Lessons from the classroom'"), why: L("Задание 4 — рефлексия о своей практике.", "Assignment 4 — reflection on your practice."), check: { lessons: [12], mods: [{ p: "CELTA практика: Lessons from the classroom", min: 60 }] }, links: ["lessons", "prof"] },
      { title: L("Свой английский: Writing Task 2 на Band 7", "Your English: Writing Task 2 at Band 7"), why: L("На собеседовании CELTA проверяют язык кандидата.", "The CELTA interview checks the candidate's own English."), check: { mods: [{ p: "Writing Task 2", min: 78 }] }, links: ["writing"] },
      { title: L("Свой английский: Speaking на Band 7", "Your English: Speaking at Band 7"), why: L("Беглая, точная речь — основа работы учителя.", "Fluent, accurate speech is the basis of a teacher's work."), check: { mods: [{ p: "Speaking", min: 78 }] }, links: ["speaking"] },
    ],
  },
  {
    id: "DELTA", emoji: "📙",
    title: "DELTA",
    about: L(
      "Диплом для учителей с опытом: Module One — письменный экзамен (2 части по 90 минут), Module Two — портфолио с оцениваемыми уроками, Module Three — развёрнутая письменная работа. Маршрут готовит к Module One: термины, анализ языка, речи учащегося, тестов и материалов.",
      "A diploma for experienced teachers: Module One is a written exam (two 90-minute papers), Module Two is a portfolio with assessed lessons, Module Three is an extended written assignment. This route prepares you for Module One: terminology and analysis of language, learner output, tests and materials."
    ),
    goal: L("Цель: все задания DELTA Module One на сайте + AI-практика уровня DELTA", "Target: all DELTA Module One tasks on the site + DELTA-level AI practice"),
    steps: [
      { title: L("Входная диагностика", "Entry diagnostic"), why: L("Отправная точка.", "Your starting point."), check: { lessons: [1] }, links: ["lessons"] },
      { title: L("Уроки 2–4 и термины DELTA", "Lessons 2–4 and DELTA terms"), why: L("Paper 1 начинается с терминов — нужна точность.", "Paper 1 starts with terminology — precision is needed."), check: { lessons: [2, 3, 4], mods: [{ p: "DELTA M1: Terminology", min: 70 }] }, links: ["lessons", "prof"] },
      { title: L("Анализ языка текста", "Language analysis of a text"), why: L("Форма, значение, произношение в отрывке текста.", "Form, meaning and pronunciation in a text extract."), check: { mods: [{ p: "DELTA M1: Language analysis", min: 60 }] }, links: ["prof"] },
      { title: L("Урок 5 и анализ письменной работы", "Lesson 5 and analysing learner writing"), why: L("Сильные стороны, ошибки и их причины — с опорой на SLA.", "Strengths, errors and their causes — grounded in SLA."), check: { lessons: [5], mods: [{ p: "DELTA M1: Analysing a learner", min: 60 }] }, links: ["lessons", "prof"] },
      { title: L("Урок 9 и анализ материалов", "Lesson 9 and analysing materials"), why: L("Цели заданий учебника и их обоснование.", "The purposes of coursebook tasks and their rationale."), check: { lessons: [9], mods: [{ p: "DELTA M1: Analysing coursebook", min: 60 }] }, links: ["lessons", "prof"] },
      { title: L("Урок 11 и анализ теста", "Lesson 11 and evaluating a test"), why: L("Валидность, надёжность, обратное влияние.", "Validity, reliability, washback."), check: { lessons: [11], mods: [{ p: "DELTA M1: Evaluating a test", min: 60 }] }, links: ["lessons", "prof"] },
      { title: L("AI-практика уровня DELTA в 6 уроках", "DELTA-level AI practice in 6 lessons"), why: L("Обоснование с опорой на теорию — главный навык DELTA.", "Justifying with theory is the key DELTA skill."), check: { deltaAi: 6 }, links: ["lessons"] },
      { title: L("Урок 12 и итоговая диагностика", "Lesson 12 and final diagnostic"), why: L("Рефлексия и action research — основа Module Two и Three.", "Reflection and action research underpin Modules Two and Three."), check: { lessons: [12] }, links: ["lessons"] },
    ],
  },
  {
    id: "IELTS", emoji: "📕",
    title: "IELTS",
    about: L(
      "Проверяет ваш собственный английский: Listening (30 мин), Reading (60 мин), Writing (60 мин, 2 задания), Speaking (11–14 мин). Учителям обычно нужен Band 7 и выше. Маршрут идёт от техник к формату экзамена.",
      "Tests your own English: Listening (30 min), Reading (60 min), Writing (60 min, 2 tasks), Speaking (11–14 min). Teachers usually need Band 7 or higher. The route moves from techniques to the exam format."
    ),
    goal: L("Цель: Band 7 — около 78% в Writing и Speaking на сайте", "Target: Band 7 — about 78% in Writing and Speaking on the site"),
    steps: [
      { title: L("Техники чтения: 5 навыков", "Reading techniques: 5 skills"), why: L("Skimming, scanning, T/F/NG — до работы с полными текстами.", "Skimming, scanning, T/F/NG — before full texts."), check: { mods: [{ p: "Техники чтения", count: 5 }] }, links: ["reading"] },
      { title: L("Reading: 3 текста на 70%+", "Reading: 3 texts at 70%+"), why: L("Все типы заданий в одном тексте.", "All task types in one text."), check: { mods: [{ p: "Reading:", count: 3, min: 70 }] }, links: ["reading"] },
      { title: L("Listening: 8 записей", "Listening: 8 recordings"), why: L("Все четыре секции и все типы вопросов.", "All four sections and all question types."), check: { mods: [{ p: "Listening:", count: 8 }] }, links: ["listening"] },
      { title: L("Writing Task 1: 2 работы", "Writing Task 1: 2 pieces"), why: L("Обзор (overview) и группировка данных.", "Overview and grouping of data."), check: { mods: [{ p: "Writing Task 1", count: 2 }] }, links: ["writing"] },
      { title: L("Writing Task 2: Band 6.5+", "Writing Task 2: Band 6.5+"), why: L("Task 2 весит вдвое больше Task 1.", "Task 2 is worth twice as much as Task 1."), check: { mods: [{ p: "Writing Task 2", min: 72 }] }, links: ["writing"] },
      { title: L("Speaking: Part 1, 2 и 3", "Speaking: Parts 1, 2 and 3"), why: L("Каждая часть по отдельности.", "Each part separately."), check: { mods: [{ p: "Speaking Part 1" }, { p: "Speaking Part 2" }, { p: "Speaking Part 3" }] }, links: ["speaking"] },
      { title: L("Урок 7: критерии Writing и Speaking", "Lesson 7: Writing and Speaking criteria"), why: L("Понимание критериев помогает оценивать себя.", "Understanding the criteria helps you assess yourself."), check: { lessons: [7] }, links: ["lessons"] },
      { title: L("Пробный Speaking целиком", "A full Speaking mock test"), why: L("Part 1 → Part 2 → Part 3 подряд, как на экзамене.", "Part 1 → Part 2 → Part 3 in a row, as in the exam."), check: { mods: [{ p: ["Speaking Полный тест", "Speaking Full test"] }] }, links: ["speaking"] },
    ],
  },
];
