/**
 * CertifyWise
 * © 2026 Алназирова Айдана (Aidana Alnazirova). Все права защищены.
 * Дата создания: 22 мая 2026 г.
 * Использование без письменного разрешения автора запрещено.
 *
 * IELTS Academic Writing: Task 1 и Task 2.
 * Данные в графиках Task 1 учебные (страны и университеты обозначены буквами),
 * они не описывают реальную статистику.
 */

import { T, TT } from "./i18n";

// Краткое изложение публичных критериев оценивания IELTS Writing (своими словами)
export const WRITING_CRITERIA = {
  1: [
    { key: "ta", name: "Task Achievement", ru: T("Выполнение задания"), what: T("Есть ли обзор (overview) главных тенденций, выделены ли ключевые особенности, подкреплены ли они цифрами, нет ли лишних деталей и собственного мнения.") },
    { key: "cc", name: "Coherence and Cohesion", ru: T("Связность"), what: T("Логично ли сгруппирована информация по абзацам, разнообразны ли и уместны ли связки, понятны ли отсылки (this, these, the former).") },
    { key: "lr", name: "Lexical Resource", ru: T("Лексика"), what: T("Есть ли лексика тенденций и сравнения (rise sharply, a slight decline, roughly a third), точность и разнообразие, орфография.") },
    { key: "gra", name: "Grammatical Range and Accuracy", ru: T("Грамматика"), what: T("Есть ли сложные предложения (while, whereas, which), сравнительные конструкции, точность времён, доля предложений без ошибок.") },
  ],
  2: [
    { key: "ta", name: "Task Response", ru: T("Ответ на задание"), what: T("Отвечено ли на все части вопроса, есть ли ясная позиция на протяжении всего эссе, развиты ли идеи и подкреплены ли примерами.") },
    { key: "cc", name: "Coherence and Cohesion", ru: T("Связность"), what: T("Одна главная идея на абзац, логичный порядок, связки без механического перебора (Firstly, Secondly…), понятные отсылки.") },
    { key: "lr", name: "Lexical Resource", ru: T("Лексика"), what: T("Точная тематическая лексика, коллокации, естественное употребление менее частотных слов, орфография и словообразование.") },
    { key: "gra", name: "Grammatical Range and Accuracy", ru: T("Грамматика"), what: T("Разнообразие структур (условные, придаточные, пассив), точность, пунктуация, доля предложений без ошибок.") },
  ],
};

export const WRITING_FORMAT = {
  1: { minutes: 20, minWords: 150, ru: T("Описать график, таблицу, диаграмму или процесс. Не меньше 150 слов, около 20 минут. Мнение не нужно.") },
  2: { minutes: 40, minWords: 250, ru: T("Эссе-рассуждение на общую тему. Не меньше 250 слов, около 40 минут. Task 2 весит вдвое больше Task 1.") },
};

// ---------------- Task 1 ----------------
export const TASK1 = [
  {
    id: "w1-line",
    title: "Internet access in three countries",
    chartType: "line",
    prompt: "The graph below shows the percentage of households with internet access in three countries between 2000 and 2020.\n\nSummarise the information by selecting and reporting the main features, and make comparisons where relevant.",
    chart: {
      xLabels: ["2000", "2005", "2010", "2015", "2020"],
      yMax: 100, yUnit: "%",
      series: [
        { name: "Country A", values: [42, 61, 78, 88, 94] },
        { name: "Country B", values: [18, 30, 52, 74, 86] },
        { name: "Country C", values: [5, 9, 21, 45, 71] },
      ],
    },
    tips: [
      T("Overview: все три страны растут; разрыв между ними сокращается."),
      T("Сгруппируйте: A (высокий старт, медленный рост) и C (низкий старт, резкий рост после 2010)."),
      T("Не описывайте каждую точку — выберите начало, конец и переломные моменты."),
    ],
  },
  {
    id: "w1-bar",
    title: "Leisure activities by age group",
    chartType: "bar",
    prompt: "The chart below shows the average number of hours per week that people in four age groups spent on four leisure activities in one country in 2023.\n\nSummarise the information by selecting and reporting the main features, and make comparisons where relevant.",
    chart: {
      xLabels: ["16–24", "25–44", "45–64", "65+"],
      yMax: 20, yUnit: "hours",
      series: [
        { name: "Social media", values: [17, 11, 6, 2] },
        { name: "Watching TV", values: [5, 8, 12, 18] },
        { name: "Sport", values: [6, 4, 3, 2] },
        { name: "Reading", values: [2, 3, 4, 7] },
      ],
    },
    tips: [
      T("Overview: соцсети снижаются с возрастом, телевизор и чтение растут."),
      T("Самое яркое: 16–24 — 17 часов в соцсетях, 65+ — 18 часов у телевизора."),
      T("Сравнительные конструкции: three times as much as, by far the most, the least popular."),
    ],
  },
  {
    id: "w1-pie",
    title: "Energy sources, 1990 and 2020",
    chartType: "pie",
    prompt: "The pie charts below show the proportion of electricity produced from different sources in one country in 1990 and 2020.\n\nSummarise the information by selecting and reporting the main features, and make comparisons where relevant.",
    chart: {
      pies: [
        { label: "1990", parts: [["Coal", 58], ["Gas", 22], ["Hydro", 12], ["Nuclear", 6], ["Wind and solar", 2]] },
        { label: "2020", parts: [["Coal", 31], ["Gas", 29], ["Hydro", 11], ["Nuclear", 5], ["Wind and solar", 24]] },
      ],
    },
    tips: [
      T("Overview: уголь остался крупнейшим источником, но его доля почти вдвое сократилась; ветер и солнце выросли больше всех."),
      T("Доли: more than half, just under a third, roughly a quarter."),
      T("Небольшие изменения (hydro, nuclear) можно описать одним предложением."),
    ],
  },
  {
    id: "w1-table",
    title: "International students at four universities",
    chartType: "table",
    prompt: "The table below shows the number of international students enrolled at four universities in 2010, 2015 and 2020.\n\nSummarise the information by selecting and reporting the main features, and make comparisons where relevant.",
    chart: {
      columns: ["University", "2010", "2015", "2020"],
      rows: [
        ["University W", "1,200", "2,100", "3,900"],
        ["University X", "3,500", "3,300", "3,100"],
        ["University Y", "800", "1,600", "1,700"],
        ["University Z", "2,400", "2,500", "2,450"],
      ],
    },
    tips: [
      T("Overview: W выросла сильнее всех и стала лидером к 2020; X — единственная со снижением."),
      T("В таблице нет «тенденции на картинке»: сначала найдите её сами, потом пишите."),
      T("Цифры округляйте: just under 4,000, roughly doubled, more than tripled."),
    ],
  },
  {
    id: "w1-process",
    title: "How recycled paper is made",
    chartType: "process",
    prompt: "The diagram below shows how recycled paper is produced.\n\nSummarise the information by selecting and reporting the main features.",
    chart: {
      steps: [
        "Used paper is collected from homes and offices",
        "Paper is sorted by type and grade",
        "Paper is mixed with water and chemicals to make pulp",
        "Pulp is screened to remove plastic and staples",
        "Ink is removed (de-inking)",
        "Pulp is bleached (optional, for white paper)",
        "Pulp is spread on rollers, pressed and dried",
        "Recycled paper is wound into large rolls",
      ],
    },
    tips: [
      T("Overview: сколько этапов, с чего начинается и чем заканчивается процесс."),
      T("Пассив — главная грамматика процесса: paper is collected, the pulp is screened."),
      T("Последовательность: first, after that, once…, at this stage, finally."),
    ],
  },
];

// ---------------- Task 2 ----------------
export const TASK2 = [
  {
    id: "w2-uni",
    title: "Universities: practical skills or academic knowledge",
    type: "Opinion (agree / disagree)",
    prompt: "Some people believe that universities should focus on teaching practical skills for employment rather than academic knowledge.\n\nTo what extent do you agree or disagree?",
    tips: [T("Выберите позицию и держите её до конца — частичное согласие тоже позиция, но её нужно назвать во введении."), T("Каждый абзац основной части — одна причина с примером.")],
  },
  {
    id: "w2-flang",
    title: "When should children start a foreign language",
    type: "Discuss both views + opinion",
    prompt: "Some people think that children should start learning a foreign language at primary school, while others believe it is better to begin at secondary school.\n\nDiscuss both these views and give your own opinion.",
    tips: [T("Нужны обе точки зрения и ваше мнение — без мнения Task Response не выше 5."), T("Удобная структура: абзац о первой точке зрения, абзац о второй, позиция во введении и заключении.")],
  },
  {
    id: "w2-online",
    title: "Online courses instead of classrooms",
    type: "Advantages / disadvantages",
    prompt: "Increasingly, students choose to study online rather than attend classes in person.\n\nDo the advantages of this development outweigh the disadvantages?",
    tips: [T("Вопрос «outweigh» требует вывода: что перевешивает."), T("Не перечисляйте 6 плюсов — лучше 2 развитых с примерами.")],
  },
  {
    id: "w2-teachers",
    title: "Fewer young people become teachers",
    type: "Problem / solution",
    prompt: "In many countries, fewer young people are choosing teaching as a career.\n\nWhy is this happening? What can be done to solve this problem?",
    tips: [T("Два вопроса — две части ответа; каждой нужен свой абзац."), T("Решения должны отвечать названным причинам.")],
  },
  {
    id: "w2-ai",
    title: "Using AI tools for writing",
    type: "Two-part question",
    prompt: "Many people now use artificial intelligence tools to help them write texts for study and work.\n\nWhy is this the case? Is this a positive or negative development?",
    tips: [T("Первая часть — причины, вторая — оценка; не смешивайте их в одном абзаце."), T("Оценка должна быть ясной: positive, negative или positive with reservations.")],
  },
  {
    id: "w2-tests",
    title: "Standardised tests and student ability",
    type: "Opinion (agree / disagree)",
    prompt: "Standardised tests are the best way to measure a student's ability.\n\nTo what extent do you agree or disagree with this statement?",
    tips: [T("Ключевое слово — «the best»: с ним легче не согласиться частично."), T("Пример из своего опыта (ЕНТ, IELTS) — допустимое подкрепление.")],
  },
  {
    id: "w2-transport",
    title: "Public transport or roads",
    type: "Discuss both views + opinion",
    prompt: "Some people think governments should invest more money in public transport, while others believe building better roads is more important.\n\nDiscuss both these views and give your own opinion.",
    tips: [T("Аргументы каждой стороны излагайте честно, а не как «слабую» позицию."), T("Мнение в заключении не должно быть новым — оно уже было во введении.")],
  },
  {
    id: "w2-cities",
    title: "Moving from rural areas to cities",
    type: "Positive / negative development",
    prompt: "More and more people are moving from rural areas to large cities.\n\nIs this a positive or negative development?",
    tips: [T("Можно рассмотреть последствия для людей, городов и сёл."), T("Позиция нужна во введении, не только в конце.")],
  },
];

// Текстовое описание графика для AI (модель не видит рисунок)
export const chartAsText = (t) => {
  const c = t.chart;
  if (t.chartType === "line" || t.chartType === "bar")
    return `X axis: ${c.xLabels.join(", ")}. Unit: ${c.yUnit}.\n` + c.series.map(s => `${s.name}: ${s.values.join(", ")}`).join("\n");
  if (t.chartType === "pie")
    return c.pies.map(p => `${p.label}: ` + p.parts.map(([n, v]) => `${n} ${v}%`).join(", ")).join("\n");
  if (t.chartType === "table")
    return [c.columns.join(" | "), ...c.rows.map(r => r.join(" | "))].join("\n");
  if (t.chartType === "process")
    return c.steps.map((s, i) => `Stage ${i + 1}: ${s}`).join("\n");
  return "";
};
