/**
 * CertifyWise
 * © 2026 Алназирова Айдана (Aidana Alnazirova). Все права защищены.
 * Дата создания: 22 мая 2026 г.
 * Использование без письменного разрешения автора запрещено.
 *
 * IELTS Speaking: Part 1, Part 2 (карточки), Part 3 (обсуждение по теме карточки).
 * Вопросы составлены для учебной практики в формате экзамена.
 */

// Краткое изложение публичных критериев IELTS Speaking (своими словами)
export const SPEAKING_CRITERIA = [
  { key: "fc", name: "Fluency and Coherence", ru: "Беглость и связность", what: "Говорите ли вы без долгих пауз и самоповторов, развиваете ли ответ, связываете ли идеи (because, so, on the other hand, what I mean is)." },
  { key: "lr", name: "Lexical Resource", ru: "Лексика", what: "Хватает ли слов, чтобы говорить о разных темах, есть ли идиоматичные сочетания, умеете ли перефразировать, когда не знаете слова." },
  { key: "gra", name: "Grammatical Range and Accuracy", ru: "Грамматика", what: "Используете ли сложные предложения и разные времена, сколько ошибок, мешают ли они пониманию." },
  { key: "p", name: "Pronunciation", ru: "Произношение", what: "Понятна ли речь без усилий, правильно ли ударение в словах и фразах, есть ли естественный ритм и интонация." },
];

export const SPEAKING_FORMAT = [
  ["Part 1", "4–5 минут. Вопросы о вас: учёба, дом, привычки. Ответ — 2–4 предложения."],
  ["Part 2", "3–4 минуты. Карточка с темой: 1 минута на подготовку, говорить 1–2 минуты без перерыва."],
  ["Part 3", "4–5 минут. Обсуждение общих вопросов по теме карточки: мнение, причины, сравнение."],
];

// Лимиты записи, секунды
export const LIMITS = { 1: 45, 2: 120, 3: 75 };
export const PREP_SECONDS = 60;

export const PART1 = [
  { id: "p1-study", title: "Your studies", questions: [
    "What subject are you studying at the moment?",
    "Why did you choose this subject?",
    "What do you find most difficult about your studies?",
    "What would you like to do after you graduate?",
  ] },
  { id: "p1-home", title: "Your hometown", questions: [
    "Where is your hometown?",
    "What do you like most about it?",
    "Has your hometown changed much since you were a child?",
    "Would you like to live there in the future? Why or why not?",
  ] },
  { id: "p1-read", title: "Reading", questions: [
    "Do you enjoy reading? Why or why not?",
    "What kind of things do you usually read?",
    "Do you prefer reading on paper or on a screen?",
    "Did you read a lot when you were a child?",
  ] },
  { id: "p1-music", title: "Music", questions: [
    "What kind of music do you like?",
    "When do you usually listen to music?",
    "Have you ever learned to play a musical instrument?",
    "Is music important in your culture?",
  ] },
  { id: "p1-routine", title: "Daily routine", questions: [
    "What is your daily routine like on a weekday?",
    "Which part of the day do you like best?",
    "Is your routine at the weekend different?",
    "Would you like to change anything about your daily routine?",
  ] },
  { id: "p1-tech", title: "Technology", questions: [
    "Which piece of technology do you use most often?",
    "How do you use your phone for studying?",
    "Is there any technology you find difficult to use?",
    "How has technology changed the way people communicate?",
  ] },
];

export const PART2 = [
  {
    id: "p2-teacher", title: "A teacher who influenced you",
    card: "Describe a teacher who has influenced you.",
    points: ["who this teacher was", "what subject he or she taught", "what this teacher was like", "and explain how this teacher influenced you."],
    part3: [
      "What qualities does a good teacher need?",
      "Is the role of the teacher changing because of technology?",
      "Do you think teachers are respected enough in your country?",
      "Should teachers be paid according to their students' results?",
    ],
  },
  {
    id: "p2-skill", title: "A skill that took a long time to learn",
    card: "Describe a skill that took you a long time to learn.",
    points: ["what the skill was", "when and how you learned it", "why it took a long time", "and explain how you feel about this skill now."],
    part3: [
      "Which skills do young people most need today?",
      "Is it better to learn a skill from a teacher or by yourself?",
      "Why do some people give up learning new skills?",
      "Are practical skills more valuable than academic knowledge?",
    ],
  },
  {
    id: "p2-book", title: "A useful book",
    card: "Describe a book you have read that you found useful.",
    points: ["what the book was", "when you read it", "what it was about", "and explain why you found it useful."],
    part3: [
      "Do people read less than they did in the past?",
      "What are the advantages of reading compared with watching films?",
      "Should schools choose which books children read?",
      "Will printed books disappear in the future?",
    ],
  },
  {
    id: "p2-tech", title: "Technology that solved a problem",
    card: "Describe a time when you used technology to solve a problem.",
    points: ["what the problem was", "what technology you used", "how you used it", "and explain how you felt after solving the problem."],
    part3: [
      "Do people depend too much on technology nowadays?",
      "How has technology changed education?",
      "What problems can technology create?",
      "Should older people be taught to use new technology?",
    ],
  },
  {
    id: "p2-place", title: "A place in your city",
    card: "Describe a place in your city where you like to spend time.",
    points: ["where it is", "how often you go there", "what you do there", "and explain why you like spending time there."],
    part3: [
      "What makes a city a good place to live?",
      "Are public spaces like parks important? Why?",
      "How have cities in your country changed in recent years?",
      "Should cities limit the number of cars in the centre?",
    ],
  },
  {
    id: "p2-language", title: "A person who speaks a foreign language well",
    card: "Describe a person you know who speaks a foreign language well.",
    points: ["who this person is", "what language he or she speaks", "how he or she learned it", "and explain why you think this person speaks it well."],
    part3: [
      "Why do people learn foreign languages?",
      "At what age should children start learning a foreign language?",
      "Will translation apps make language learning unnecessary?",
      "Which is more important for a language learner: grammar or vocabulary?",
    ],
  },
  {
    id: "p2-decision", title: "An important decision",
    card: "Describe an important decision you made.",
    points: ["what the decision was", "when you made it", "how you made it", "and explain why it was important."],
    part3: [
      "Who should young people ask for advice when making decisions?",
      "Is it better to make decisions quickly or slowly?",
      "Do people today have more choices than in the past?",
      "Should parents make important decisions for their children?",
    ],
  },
  {
    id: "p2-event", title: "A memorable event",
    card: "Describe a memorable event you attended.",
    points: ["what the event was", "when and where it took place", "who you went with", "and explain why it was memorable."],
    part3: [
      "Why do people like going to public events?",
      "Are traditional celebrations still important for young people?",
      "How do big events affect a city?",
      "Should governments spend money on cultural events?",
    ],
  },
];
