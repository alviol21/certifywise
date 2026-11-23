/**
 * CertifyWise
 * © 2026 Альназирова Айдана (Aidana Alnazirova). Все права защищены.
 * Дата создания: 22 мая 2026 г.
 * Использование без письменного разрешения автора запрещено.
 *
 * Обучающий модуль: 12 уроков по модели ADDIE-AI.
 * Каждый урок — 7 блоков: Вход (Analysis) · Теория (Design) · Случай из класса и Проверка (Development) ·
 * Практика с AI-тьютором и Перенос в экзамен (Implementation) · Рефлексия (Evaluation).
 * Уроки 1 и 12 вместо короткой проверки дают входную и итоговую диагностику (параллельные формы A и B).
 */

// ===================== ДИАГНОСТИКА, ФОРМА A (входная, урок 1) =====================
// 20 вопросов: по 2 на темы уроков 2–10, по 1 на темы уроков 11 и 12. Форма B — параллельная.
export const DIAG_A = [
  // Урок 2 — грамматика
  { topic: 2, q: "A teacher asks: 'Is this finished or still happening?' about the sentence 'She has lived here for ten years.' What is the teacher checking?",
    opts: ["The form of the present perfect", "The meaning of the present perfect", "The pronunciation of 'has'"], ans: 1,
    exp: "The question checks meaning (an action that started in the past and continues now). It is a concept-checking question, not a question about form or sound." },
  { topic: 2, q: "In 'I'm meeting Aliya tomorrow at six', the present continuous is used to talk about…",
    opts: ["an action in progress at the moment of speaking", "a fixed arrangement in the future", "a habit that is temporary"], ans: 1,
    exp: "The time marker 'tomorrow at six' shows that the present continuous expresses a future arrangement, not an action in progress now." },
  // Урок 3 — лексика
  { topic: 3, q: "A learner writes 'I did a big mistake in the test.' Which area of vocabulary knowledge does this error show?",
    opts: ["Collocation", "Connotation", "Word formation"], ans: 0,
    exp: "The natural combination is 'make a mistake'. Knowing which words go together is collocation." },
  { topic: 3, q: "Which word is formed by adding a prefix?",
    opts: ["kindness", "misunderstand", "bookshop"], ans: 1,
    exp: "'mis-' is a prefix. 'kindness' uses a suffix and 'bookshop' is a compound." },
  // Урок 4 — фонология
  { topic: 4, q: "In natural speech, 'I want to go' often sounds like 'I wanna go'. What is this feature of connected speech?",
    opts: ["Word stress on the main verb", "Rising intonation at the end", "Weak forms and linking"], ans: 2,
    exp: "'to' is reduced to a weak form and joined to the previous word. This is connected speech, not stress or intonation." },
  { topic: 4, q: "Where is the main stress in the noun 'photographer'?",
    opts: ["PHO-to-gra-pher", "pho-TO-gra-pher", "pho-to-GRA-pher"], ans: 1,
    exp: "Stress moves in this word family: PHOtograph, phoTOgrapher, photoGRAphic." },
  // Урок 5 — учащиеся
  { topic: 5, q: "A B1 learner says 'He goed home' although she knows 'went' and uses it correctly in other sentences. This is best described as…",
    opts: ["a slip caused by tiredness or speed", "an error caused by her first language", "a gap in her vocabulary knowledge"], ans: 0,
    exp: "She knows the correct form and can self-correct, so this is a mistake (a slip), not a systematic error. Over-regularisation errors also happen, but here she already uses 'went' correctly." },
  { topic: 5, q: "A student studies English only because the university requires a certificate for graduation. This is an example of…",
    opts: ["intrinsic motivation", "extrinsic motivation", "integrative motivation"], ans: 1,
    exp: "The reason is an external reward or requirement, so the motivation is extrinsic." },
  // Урок 6 — рецептивные навыки
  { topic: 6, q: "Students read a text for one minute to decide which of three titles fits best. Which subskill are they practising?",
    opts: ["Reading for gist", "Scanning for specific information", "Inferring the writer's attitude"], ans: 0,
    exp: "Choosing a title from a quick reading is reading for the general idea (gist, skimming)." },
  { topic: 6, q: "What is the main purpose of a pre-listening stage?",
    opts: ["To check the answers to the main listening task together", "To pre-teach every new word that learners will hear in the recording", "To raise interest and activate what learners already know"], ans: 2,
    exp: "Pre-listening builds interest and schema. Teaching every word is unnecessary and checking answers belongs to the while- or post-stage." },
  // Урок 7 — продуктивные навыки
  { topic: 7, q: "Students plan a holiday in pairs, each holding information the partner does not have. What kind of task is this?",
    opts: ["A controlled drill", "An information gap", "A dictation"], ans: 1,
    exp: "Each learner has missing information they must ask for — an information gap, which creates a real reason to communicate." },
  { topic: 7, q: "In a process approach to writing, which stage usually comes before drafting?",
    opts: ["Generating and organising ideas", "Peer editing of the final version", "Publishing the text for readers"], ans: 0,
    exp: "Process writing moves from brainstorming and planning to drafting, then revising and editing." },
  // Урок 8 — планирование
  { topic: 8, q: "Which is the clearest main aim for a lesson?",
    opts: ["To teach the past simple and drill the irregular verbs from the list on page 34", "By the end of the lesson, learners will be better able to talk about past holidays using the past simple", "Students will complete exercises 2, 3 and 4 on page 34 and then check them in pairs"], ans: 1,
    exp: "A good aim describes what learners will be able to do. The other options describe the teacher's actions or a list of activities." },
  { topic: 8, q: "In a PPP lesson, which stage gives learners the least control from the teacher?",
    opts: ["Presentation", "Controlled practice", "Production"], ans: 2,
    exp: "Production (freer practice) gives learners the most freedom; presentation and controlled practice are teacher-led." },
  // Урок 9 — материалы
  { topic: 9, q: "A teacher replaces a coursebook text about American football with a text about local football clubs, keeping the same task. This is…",
    opts: ["omitting material", "adapting material", "supplementing material"], ans: 1,
    exp: "The task stays, the content is changed to suit the learners — this is adaptation." },
  { topic: 9, q: "Which resource is most useful for checking how often and in what contexts a phrase is used by native speakers?",
    opts: ["A bilingual dictionary", "A grammar practice book", "A language corpus"], ans: 2,
    exp: "A corpus shows real frequency and contexts of use, which a dictionary or practice book cannot show in the same way." },
  // Урок 10 — управление классом
  { topic: 10, q: "After giving instructions, a teacher asks: 'Are you working alone or in pairs? How many minutes do you have?' These are…",
    opts: ["concept-checking questions", "instruction-checking questions", "display questions about the topic"], ans: 1,
    exp: "The questions check that learners understood the instructions (ICQs), not the meaning of language (CCQs)." },
  { topic: 10, q: "During a fluency activity, the teacher notes errors and discusses them with the class at the end. This is…",
    opts: ["delayed correction", "on-the-spot correction", "self-correction"], ans: 0,
    exp: "Correction after the activity does not interrupt fluency — it is delayed correction." },
  // Урок 11 — оценивание
  { topic: 11, q: "A teacher gives a short quiz to find out what learners already know before starting a new unit. This is…",
    opts: ["summative assessment", "diagnostic assessment", "a proficiency test"], ans: 1,
    exp: "Finding out existing knowledge before teaching is diagnostic assessment." },
  // Урок 12 — рефлексия
  { topic: 12, q: "A teacher notices that students rarely speak in group work, collects data over four weeks and tries a new grouping technique. This is an example of…",
    opts: ["peer observation", "action research", "a formal appraisal"], ans: 1,
    exp: "Identifying a classroom problem, trying a change and collecting data is action research." },
];

// ===================== ДИАГНОСТИКА, ФОРМА B (итоговая, урок 12) =====================
export const DIAG_B = [
  { topic: 2, q: "A teacher asks about 'I used to play the piano': 'Do I play the piano now?' What is the teacher checking?",
    opts: ["The meaning of 'used to'", "The form of 'used to'", "The pronunciation of 'used'"], ans: 0,
    exp: "The question checks meaning (a past habit that no longer happens). It is a concept-checking question." },
  { topic: 2, q: "In 'If I had more time, I would learn Spanish', the past form 'had' refers to…",
    opts: ["a finished action in the past", "an unreal situation in the present", "a polite request in the future"], ans: 1,
    exp: "In the second conditional the past form expresses an unreal or hypothetical present situation." },
  { topic: 3, q: "A learner says 'The film was very interested.' What does the learner need to understand?",
    opts: ["The difference between the -ed and -ing adjectives", "The collocation of 'film' with verbs like 'watch' and 'see'", "The register of 'very' compared with more formal intensifiers"], ans: 0,
    exp: "-ing adjectives describe what causes a feeling ('interesting'), -ed adjectives describe how a person feels ('interested')." },
  { topic: 3, q: "Which pair shows a difference in register rather than in meaning?",
    opts: ["big / small", "kids / children", "buy / sell"], ans: 1,
    exp: "'kids' is informal and 'children' is neutral; the meaning is the same. The other pairs are opposites." },
  { topic: 4, q: "In 'He's going to Almaty', the word 'to' is usually pronounced /tə/. This is…",
    opts: ["a weak form", "a diphthong", "sentence stress"], ans: 0,
    exp: "Unstressed grammar words often have a weak form with the schwa /ə/." },
  { topic: 4, q: "Which teaching technique practises a long sentence by repeating it from the last word back to the beginning?",
    opts: ["Choral drilling", "Backchaining", "Minimal pairs"], ans: 1,
    exp: "Backchaining builds the sentence from the end so that the stress and rhythm stay natural." },
  { topic: 5, q: "A Russian-speaking learner regularly omits articles: 'I bought new phone.' The most likely cause is…",
    opts: ["overgeneralisation of an English rule", "influence of the first language", "a temporary slip of the tongue"], ans: 1,
    exp: "Russian and Kazakh have no articles, so the regular omission reflects L1 transfer." },
  { topic: 5, q: "A learner reads extra books in English simply because she enjoys stories. Her motivation is…",
    opts: ["extrinsic", "instrumental", "intrinsic"], ans: 2,
    exp: "The pleasure of the activity itself is intrinsic motivation." },
  { topic: 6, q: "Students look through a train timetable to find the departure time of one train. Which subskill is this?",
    opts: ["Skimming", "Scanning", "Reading for detail"], ans: 1,
    exp: "Searching quickly for one specific piece of information is scanning." },
  { topic: 6, q: "Why do teachers usually set a gist task before a detail task with a new recording?",
    opts: ["Learners first need a general picture before they focus on details", "Gist tasks are quicker for the teacher to mark than detail tasks", "Detail tasks are too difficult to do during the first listening"], ans: 0,
    exp: "Moving from general to specific understanding reflects how we normally process a text and reduces anxiety." },
  { topic: 7, q: "Which activity focuses mainly on fluency rather than accuracy?",
    opts: ["Repeating sentences after the teacher", "A gap-fill with past simple forms", "A discussion of plans for the weekend"], ans: 2,
    exp: "An open discussion focuses on communicating meaning; the other two control the language used." },
  { topic: 7, q: "Before learners write an email of complaint, the teacher shows them a model email and asks them to find its parts. This supports a…",
    opts: ["genre approach", "dictation approach", "grammar-translation approach"], ans: 0,
    exp: "Analysing a model text to see how a type of text is organised is typical of a genre approach." },
  { topic: 8, q: "Which is a subsidiary aim rather than a main aim?",
    opts: ["To give practice in listening for detail", "To develop learners' ability to give advice using 'should'", "To revise vocabulary for giving advice"], ans: 2,
    exp: "Revising vocabulary supports the main aim; it is a subsidiary aim." },
  { topic: 8, q: "In a task-based (TBL) lesson, language focus usually comes…",
    opts: ["at the start, before learners try the task", "after learners have completed the task", "only in the homework"], ans: 1,
    exp: "In TBL learners do the task first; the focus on language follows and is based on what they needed." },
  { topic: 9, q: "A teacher decides not to use a coursebook exercise because the class already knows the language. This is…",
    opts: ["adapting", "omitting", "replacing"], ans: 1,
    exp: "Leaving material out is omitting." },
  { topic: 9, q: "What is the main risk of using an AI chatbot to produce reading texts for a lesson?",
    opts: ["The texts may contain factual errors or unnatural language", "AI-generated texts are always far too difficult for school learners", "AI tools cannot adjust the length or the level of the text at all"], ans: 0,
    exp: "AI output must be checked for accuracy and naturalness; level can in fact be adjusted." },
  { topic: 10, q: "A teacher holds up a picture and asks 'What's he doing?' to get learners to say 'He's cooking.' This technique is…",
    opts: ["drilling", "eliciting", "monitoring"], ans: 1,
    exp: "Drawing language out of learners instead of giving it is eliciting." },
  { topic: 10, q: "A learner says 'Yesterday I go to the cinema' and the teacher replies 'Oh, you went to the cinema? What did you see?' This correction technique is…",
    opts: ["a recast", "peer correction", "a written gap-fill"], ans: 0,
    exp: "The teacher repeats the idea in the correct form without stopping the conversation — a recast." },
  { topic: 11, q: "A test of speaking skills consists only of written grammar questions. The main problem with this test is its…",
    opts: ["reliability", "validity", "practicality"], ans: 1,
    exp: "The test does not measure what it claims to measure, so its validity is low." },
  { topic: 12, q: "A colleague watches part of your lesson, focusing on how you give instructions, and you discuss it afterwards. This is…",
    opts: ["peer observation", "a formal inspection", "action research"], ans: 0,
    exp: "A colleague observing with an agreed focus and a follow-up discussion is peer observation for development." },
];

// ===================== УРОКИ 1–6 =====================
export const LESSONS_A = [
  // ---------- 1 ----------
  {
    n: 1,
    title: "Certification map and entry diagnostic",
    ru: "Карта сертификаций и входная диагностика",
    minutes: 60,
    aims: [
      "Distinguish TKT, CELTA, DELTA and IELTS by purpose, level and format",
      "Build a personal certification route",
      "Complete the entry diagnostic (20 questions)",
    ],
    entry: [
      "Which teaching or language certificates have you already heard of? What do you know about them?",
      "Which certificate would be most useful for you in the next two years, and why?",
    ],
    theory: [
      { term: "TKT (Teaching Knowledge Test)", def: "A Cambridge test of knowledge about teaching. Three core modules: M1 — language and background to language learning and teaching, M2 — lesson planning and use of resources, M3 — managing the teaching and learning process. Each module has 80 multiple-choice or matching questions in 80 minutes. No teaching experience is required.", ex: "A third-year student can take TKT Module 1 before her first teaching practice." },
      { term: "CELTA", def: "An initial practical teaching qualification. About 120 contact hours, including 6 hours of assessed teaching practice with real learners at two levels, observation of experienced teachers and four written assignments. Grades: Pass, Pass B, Pass A.", ex: "A graduate who wants to teach adults in a language school abroad usually needs CELTA." },
      { term: "DELTA", def: "An advanced diploma for experienced teachers, normally taken after at least one or two years of full-time teaching. Module One — written exam (two papers of 90 minutes); Module Two — teaching portfolio with assessed lessons; Module Three — an extended assignment on course design or ELT management.", ex: "A teacher with three years of experience who wants to become a teacher trainer takes DELTA." },
      { term: "IELTS", def: "A test of the candidate's own English. Listening (30 min, 40 questions), Reading (60 min, 40 questions), Writing (60 min, 2 tasks), Speaking (11–14 min, 3 parts). Results are given as bands from 0 to 9.", ex: "Many employers and master's programmes ask English teachers for IELTS 7.0 or higher." },
      { term: "Teacher knowledge levels", def: "The same topic appears at three levels: TKT asks you to recognise and name it, CELTA asks you to apply it in a real lesson, DELTA asks you to justify it with theory and compare approaches.", ex: "Error correction: TKT — name the technique; CELTA — correct errors appropriately in your lesson; DELTA — explain why a technique suits a stage of the lesson." },
    ],
    caseStudy: {
      title: "Three graduate profiles",
      text: "Dana, 21: finishing her bachelor's degree, no teaching experience except university practice, English level C1, wants to work in a private school in Astana.\n\nArman, 26: has taught English to teenagers for three years, wants to become a methodologist and later a teacher trainer.\n\nMadina, 22: plans to apply for a master's programme in the UK next year, has taught online for a few months.",
      questions: ["Which certificate should each graduate take first?", "What evidence from each profile supports your choice?"],
      commentary: "Dana: TKT (knowledge base, no experience needed), then CELTA once she starts working. Arman: DELTA — he has the experience and his goal is professional development and training. Madina: IELTS first, because her goal depends on a language score; TKT or CELTA can come later.",
    },
    check: "DIAG_A",
    practice: {
      TKT: {
        task: "Read the profile and name the most suitable certificate. Give two reasons from the profile.",
        variants: [
          "Aigerim, 20, second-year student, no teaching experience, wants to check her knowledge of teaching terminology before teaching practice.",
          "Timur, 24, has taught adults part-time for six months and wants to work in a language school in Turkey.",
          "Saule, 23, needs proof of her English level to apply for a scholarship abroad.",
        ],
        key: "Aigerim — TKT (knowledge, no experience required). Timur — CELTA (practical qualification for adult teaching abroad). Saule — IELTS (proof of language level). Reasons must come from the profile: experience, goal, context.",
      },
      CELTA: {
        task: "Justify your choice of certificate for this teacher, taking into account experience, goals, cost and time. Mention what the teacher needs to prepare before applying.",
        variants: [
          "Nurlan, 25, has taught children in a private centre for a year, English level B2+, wants to move to teaching adults.",
          "Kamila, 22, final-year student, C1 level, plans to work abroad after graduation but has no budget for an expensive course this year.",
          "Yerlan, 30, teaches at a college, has eight years of experience but no international certificate.",
        ],
        key: "Nurlan — CELTA, but first raise English toward C1 (an interview and pre-course task check language awareness). Kamila — TKT now (cheaper, no experience needed), CELTA later. Yerlan — DELTA rather than CELTA because of his experience; Module One can be taken first. A strong answer weighs experience, goal, cost and entry requirements.",
      },
      DELTA: {
        task: "Write a two-year professional development plan for this teacher, including certificates, their order and deadlines, and explain the logic of the sequence.",
        variants: [
          "You are a recent graduate with C1 English who wants to become a teacher trainer in five years.",
          "You teach at a school, have two years of experience and want to move into curriculum design.",
          "You teach IELTS preparation online and want to open your own language centre.",
        ],
        key: "A strong plan links each certificate to a career stage (e.g. TKT → CELTA → teaching experience → DELTA Module One → Modules Two/Three), takes into account the experience requirement for DELTA, the language level (IELTS where proof is needed) and realistic deadlines.",
      },
    },
    transfer: [
      { exam: "TKT", text: "Know the three core modules and what each one tests." },
      { exam: "CELTA", text: "Interview and pre-interview task check language awareness and motivation." },
      { exam: "DELTA", text: "Module One can be taken separately; Modules Two and Three require teaching." },
      { exam: "IELTS", text: "Four skills, bands 0–9; teachers often need 7.0+." },
    ],
    links: [{ page: "prof", label: "TKT · CELTA · DELTA" }, { page: "reading", label: "IELTS Reading" }],
  },

  // ---------- 2 ----------
  {
    n: 2,
    title: "Grammar for teachers: form, meaning, use",
    ru: "Грамматика для учителя: форма, значение, употребление",
    minutes: 60,
    aims: [
      "Analyse a grammatical structure in terms of form, meaning and use",
      "Write concept-checking questions (CCQs) and draw a timeline",
      "Anticipate learners' problems with a structure",
    ],
    entry: [
      "How would you explain the difference between 'I lived in Almaty' and 'I have lived in Almaty' to a B1 learner?",
      "What do you think a teacher should check first: that learners can make the form, or that they understand the meaning?",
    ],
    theory: [
      { term: "Form", def: "How the structure is built: the parts, their order, affirmative, negative and question forms, contractions and spelling.", ex: "Present perfect: subject + have/has + past participle — 'She has finished.' / 'Has she finished?'" },
      { term: "Meaning", def: "What the structure expresses — time, completion, possibility, obligation. One form can have several meanings, and one meaning can be expressed by several forms.", ex: "'I've lost my keys' — a past action with a result now (I don't have them)." },
      { term: "Use", def: "When and why speakers choose the structure: context, formality, typical situations, common time expressions.", ex: "Present perfect is common in news: 'The president has arrived in Astana.'" },
      { term: "Concept-checking questions (CCQs)", def: "Short, simple questions that check whether learners understood the meaning. They use easier language than the target structure and usually have yes/no or one-word answers. Avoid 'Do you understand?'", ex: "'I used to swim every day.' — 'Do I swim every day now?' (No.) 'Did I swim a lot in the past?' (Yes.)" },
      { term: "Timeline", def: "A visual way of showing time relations: past — now — future, with points, periods and repeated actions.", ex: "'She has lived here for ten years': a line starting ten years ago and continuing up to now." },
      { term: "Anticipated problems", def: "Difficulties the teacher expects with form, meaning or pronunciation, together with planned solutions. A required part of a CELTA language analysis.", ex: "Kazakh and Russian speakers may use the past simple with 'since' ('I lived here since 2020') — solution: timeline and contrast of two sentences." },
    ],
    caseStudy: {
      title: "Present perfect or past simple?",
      text: "The teacher writes 'I have visited London' on the board and explains: 'We use the present perfect for experiences.' Students do a gap-fill. Then one student says: 'I have visited London last year.' Several others make the same mistake in the follow-up speaking task. The teacher repeats the rule.",
      questions: ["Which aspect of the structure did the teacher not clarify?", "What could the teacher do instead of repeating the rule?"],
      commentary: "The teacher gave a rule about meaning but did not contrast it with the past simple or clarify use with time expressions. A finished time ('last year') requires the past simple. Better: contrast two sentences on a timeline, ask CCQs ('Do we know when?' 'Is the time finished?') and highlight typical time expressions.",
    },
    check: [
      { q: "'You must wear a helmet.' Which CCQ best checks the meaning of 'must' here?",
        opts: ["Do you understand what 'must' means here?", "Is it a good idea or is it necessary?", "What is the past form of 'must' in English?"], ans: 1,
        exp: "It checks the concept of obligation in simple language. 'Do you understand?' checks nothing and a question about the past checks form." },
      { q: "Which information belongs to FORM rather than meaning or use?",
        opts: ["'Going to' is used for plans that were made before the moment of speaking", "The question is made by inverting 'be': 'Are you going to…?'", "It is more common in informal conversation than in formal writing"], ans: 1,
        exp: "Inversion in questions describes how the structure is built — that is form." },
      { q: "Which timeline would best illustrate 'I was cooking when the phone rang'?",
        opts: ["A long period in the past interrupted by a single point", "Two separate points in the past one after the other", "A period that starts in the past and continues to now"], ans: 0,
        exp: "The past continuous is a longer background action; the past simple 'rang' is a short action that interrupts it." },
      { q: "A teacher asks learners to notice the pattern in five example sentences and work out the rule before any explanation. This is…",
        opts: ["a deductive approach", "an inductive approach", "a test-teach-test approach"], ans: 1,
        exp: "Learners discover the rule from examples — inductive. In a deductive approach the rule comes first." },
      { q: "Which is the most useful 'anticipated problem' for teaching 'used to' to B1 learners?",
        opts: ["Some learners may not want to talk about their childhood with the class", "Learners may say 'I use to' in the present to describe current habits", "The lesson may finish a few minutes earlier than planned in the timetable"], ans: 1,
        exp: "A good anticipated problem concerns the target language (here, a typical form/meaning confusion), not the topic or timing." },
    ],
    practice: {
      TKT: {
        task: "Name the form of the underlined structure and its meaning (function) in this sentence.",
        variants: [
          "'By the time we arrived, the film had already started.'",
          "'You should see a doctor about that cough.'",
          "'This bridge was built in 1960.'",
        ],
        key: "1 — past perfect: an action completed before another past action. 2 — modal 'should' + infinitive: advice. 3 — past simple passive: focus on the action/result rather than on who did it.",
      },
      CELTA: {
        task: "Prepare a language analysis for a CELTA lesson plan: form (with an example and the question/negative), meaning, at least two CCQs, a timeline if relevant, pronunciation features and two anticipated problems with solutions.",
        variants: [
          "Target sentence for B1: 'I've been learning English for six years.'",
          "Target sentence for A2: 'I'm going to visit my grandparents at the weekend.'",
          "Target sentence for B1: 'If it rains tomorrow, we'll stay at home.'",
        ],
        key: "Accurate form with auxiliaries; meaning stated in simple terms; CCQs short, answerable with yes/no or one word and not using the target structure; pronunciation: contractions, weak forms (/bɪn/, /ɡənə/), sentence stress; problems specific to learners (L1 interference, confusion with a similar structure) with practical solutions.",
      },
      DELTA: {
        task: "Compare an inductive and a deductive presentation of this structure for the given group. Which would you choose and why? Refer to learner factors and at least one theoretical idea (e.g. noticing, explicit vs implicit knowledge).",
        variants: [
          "The second conditional for a group of adult B1 engineers who like clear rules.",
          "The present perfect for a group of 14-year-old A2 learners in a state school.",
          "Reported speech for a mixed-level B2 university group preparing for IELTS.",
        ],
        key: "A strong answer describes both approaches, links the choice to learner age, level, cognitive style and context, mentions Schmidt's noticing hypothesis or the explicit/implicit knowledge distinction, and admits limitations of the chosen approach.",
      },
    },
    transfer: [
      { exam: "TKT", text: "Module 1 Part 1: identifying forms and functions of grammar." },
      { exam: "CELTA", text: "Language analysis in every lesson plan; Assignment 2 (Language related tasks)." },
      { exam: "DELTA", text: "Module One: analysis of the form, meaning and pronunciation of a text extract." },
      { exam: "IELTS", text: "Writing and Speaking: Grammatical Range and Accuracy (25% of the score)." },
    ],
    links: [{ page: "prof", label: "TKT · CELTA · DELTA" }, { page: "writing", label: "IELTS Writing" }],
  },

  // ---------- 3 ----------
  {
    n: 3,
    title: "Vocabulary: meaning, collocation, word formation",
    ru: "Лексика: значение, коллокации, словообразование",
    minutes: 60,
    aims: [
      "Analyse a lexical item: meaning, form, pronunciation, collocation, register",
      "Choose a way of conveying and checking meaning",
      "Explain principles of selecting vocabulary for a group",
    ],
    entry: [
      "What does it mean to 'know' a word? List everything you think a learner needs to know.",
      "How do you usually learn new words yourself?",
    ],
    theory: [
      { term: "Denotation and connotation", def: "Denotation is the basic dictionary meaning; connotation is the positive, negative or cultural association.", ex: "'slim' and 'skinny' both mean thin, but 'slim' is positive and 'skinny' is often negative." },
      { term: "Collocation and chunks", def: "Words that regularly go together (make a decision, heavy rain) and multi-word units learned as a whole (by the way, I'd rather not).", ex: "Learners say 'strong rain' because in Russian it is 'сильный дождь' — the English collocation is 'heavy rain'." },
      { term: "Word formation", def: "Making new words with prefixes (un-, mis-, re-), suffixes (-ness, -ment, -able) and compounding (bookshop, well-known). Suffixes often change the part of speech.", ex: "employ → employer, employee, employment, unemployed." },
      { term: "Register and style", def: "The level of formality and the context in which a word is appropriate.", ex: "'kids' (informal) — 'children' (neutral) — 'offspring' (formal)." },
      { term: "Conveying meaning", def: "Ways to show meaning: pictures and realia, mime, context sentences, definitions, examples, opposites and synonyms, translation where appropriate. After conveying meaning — check it (CCQs) and then drill the pronunciation.", ex: "'crowded': a photo of a full bus + CCQ 'Is there much space? Is it comfortable?'" },
      { term: "Selecting vocabulary", def: "Choosing what to teach by frequency (corpus data), learners' needs, usefulness and learnability. Not every unknown word in a text needs pre-teaching.", ex: "For a text on climate, pre-teach only words needed for the task; others can be guessed from context." },
    ],
    caseStudy: {
      title: "'Make a photo' and 'do a mistake'",
      text: "In a B1 speaking task students say: 'I made a photo of the mountains', 'I did a big mistake', 'We have a strong rain today'. The teacher corrects each word by giving the right form, but the next lesson the same errors appear.",
      questions: ["What do the three errors have in common?", "How could the teacher help learners to remember these combinations?"],
      commentary: "All three are collocation errors, translated from Russian or Kazakh. Correcting words one by one does not help; it is better to teach chunks (take a photo, make a mistake, heavy rain), group them (make/do lists), record them in a vocabulary notebook as phrases and recycle them.",
    },
    check: [
      { q: "Which word has a negative connotation?",
        opts: ["thrifty", "stingy", "economical"], ans: 1,
        exp: "All three refer to not spending much money, but 'stingy' criticises the person." },
      { q: "A teacher shows a photo of a full bus and asks 'Is there much space? Is it comfortable?' What is she doing?",
        opts: ["Conveying and checking meaning", "Drilling pronunciation", "Practising word formation"], ans: 0,
        exp: "The photo conveys the meaning of 'crowded' and the questions check it." },
      { q: "In which set do all the words follow the same pattern of word formation?",
        opts: ["unhappy, untidy, unfair", "happiness, kindly, careful", "teacher, quickly, unhappy"], ans: 0,
        exp: "All three words in the first set use the prefix 'un-'." },
      { q: "Which is the best reason to pre-teach a word before learners read a text?",
        opts: ["The word is long, difficult to spell and hard for learners to pronounce", "Learners need it to do the reading task and cannot guess it from context", "The word appears in the title or in the first line of the text"], ans: 1,
        exp: "Pre-teaching should be limited to words that block the task; others can be guessed." },
      { q: "A learner writes 'I'm going to do my homework, my bed and a cake today.' Which knowledge does the learner lack?",
        opts: ["The connotation of the verb 'do'", "The collocations of 'make' and 'do'", "The register of the word 'homework'"], ans: 1,
        exp: "'make my bed', 'make a cake' — the learner does not know which verb collocates with each noun." },
    ],
    practice: {
      TKT: {
        task: "Analyse the word or phrase: part of speech, how it is formed, a typical collocation, and its register.",
        variants: ["'unemployment'", "'take advantage of'", "'well-paid'"],
        key: "unemployment — noun, prefix un- + employ + suffix -ment; collocation: high/rising unemployment; neutral/formal. take advantage of — multi-word verb phrase (chunk); take advantage of an opportunity; neutral, can be negative (of a person). well-paid — compound adjective (adverb + past participle); a well-paid job; neutral.",
      },
      CELTA: {
        task: "Plan how you would convey meaning, check meaning (CCQs) and practise pronunciation for these words before a B1 reading lesson. Explain which words you would NOT pre-teach and why.",
        variants: [
          "Text: 'Life in a smart city'. Words: commute, traffic jam, sensor, sustainable, residents, efficient.",
          "Text: 'Working from home'. Words: flexible, colleague, isolation, productivity, deadline, distraction.",
          "Text: 'Fast fashion'. Words: affordable, landfill, trend, second-hand, label, waste.",
        ],
        key: "A strong plan chooses a suitable technique for each word (picture, context, opposite), writes short CCQs that do not use the word itself, marks stress (e.g. proDUCtivity, susTAINable) and selects only words necessary for the task, leaving guessable ones for context work.",
      },
      DELTA: {
        task: "Justify the selection of vocabulary for a short course. Refer to frequency, learners' needs, lexical sets vs. chunks and at least one source of evidence (corpus, word lists, needs analysis).",
        variants: [
          "A 10-hour course of English for hotel receptionists at A2–B1.",
          "A 12-hour course of academic vocabulary for 3rd-year students preparing for IELTS 6.5.",
          "A 10-hour course of classroom English for future primary school teachers.",
        ],
        key: "A strong answer refers to frequency lists (e.g. GSL, Academic Word List, English Vocabulary Profile) or a corpus, to needs analysis, prioritises chunks and collocations (Lewis's Lexical Approach), plans recycling and explains why lexical sets of semantically close words can cause interference.",
      },
    },
    transfer: [
      { exam: "TKT", text: "Module 1: lexis — word formation, collocation, connotation, register." },
      { exam: "CELTA", text: "Topic 2 (language analysis): lexis; vocabulary stages in TP." },
      { exam: "DELTA", text: "Module One: lexical features in a text and their significance for learners." },
      { exam: "IELTS", text: "Lexical Resource in Writing and Speaking; Reading — guessing meaning from context." },
    ],
    links: [{ page: "reading", label: "Reading: guessing meaning" }, { page: "prof", label: "TKT · CELTA · DELTA" }],
  },

  // ---------- 4 ----------
  {
    n: 4,
    title: "Phonology: sounds, stress, connected speech",
    ru: "Фонология: звуки, ударение, связная речь",
    minutes: 60,
    aims: [
      "Read phonemic transcription and mark word and sentence stress",
      "Recognise features of connected speech",
      "Choose a technique for teaching pronunciation",
    ],
    entry: [
      "Which English sounds are the most difficult for you or your learners? Why?",
      "Why might learners not recognise a word in a recording that they know well in writing?",
    ],
    theory: [
      { term: "Phonemes and the phonemic chart", def: "A phoneme is a sound that distinguishes meaning (ship /ʃɪp/ — sheep /ʃiːp/). The phonemic chart shows English vowels, diphthongs and consonants. Minimal pairs are words that differ in one phoneme.", ex: "/θ/ — think, /ð/ — this, /ə/ (schwa) — the most frequent English vowel." },
      { term: "Word stress", def: "One syllable is stronger in a word with two or more syllables. Stress can move in word families and can distinguish parts of speech.", ex: "PHOtograph — phoTOgrapher — photoGRAphic; REcord (n) — reCORD (v)." },
      { term: "Sentence stress and weak forms", def: "Content words (nouns, main verbs, adjectives) are stressed; function words (articles, prepositions, auxiliaries) usually have weak forms with /ə/.", ex: "'I want to GO to the SHOP' — /tə/, /ðə/." },
      { term: "Connected speech", def: "Linking (consonant + vowel: an‿apple), elision (a sound disappears: nex(t) door), assimilation (a sound changes: ten boys → /tem bɔɪz/), intrusion (law‿r‿and order).", ex: "'What do you want?' → /wɒdʒə wɒnt/." },
      { term: "Intonation", def: "The movement of pitch. It shows attitude and the type of utterance: falling for statements and wh-questions, rising for yes/no questions and surprise.", ex: "'You're a teacher?' with a rise expresses surprise or a question." },
      { term: "Drilling and backchaining", def: "Choral and individual repetition of a model. Backchaining builds a long phrase from the end to keep natural stress: '…station' → 'at the station' → 'meet you at the station'.", ex: "Before a role-play, the teacher drills 'Could you tell me the way to…?' with natural linking." },
    ],
    caseStudy: {
      title: "Thirteen or thirty?",
      text: "In a listening task about prices, half the class writes '$30' instead of '$13' and '$50' instead of '$15'. Students say: 'The speaker spoke too fast.' The teacher plays the recording again, but the result is the same.",
      questions: ["What is the real reason for the errors?", "What short pronunciation stage could help before the listening?"],
      commentary: "The difference is in word stress (thirTEEN — THIRty) and in the final /n/; replaying the recording does not help. Useful: contrastive pairs on the board with stress marks, minimal-pair listening (teacher says, students show 13 or 30), then pair practice. This also prepares for IELTS Listening Section 1.",
    },
    check: [
      { q: "Which pair is a minimal pair?",
        opts: ["ship — sheep", "cat — dog", "write — right"], ans: 0,
        exp: "The words differ in one phoneme (/ɪ/ and /iː/). 'write' and 'right' sound the same — they are homophones." },
      { q: "In 'fish and chips' the word 'and' usually sounds like /ən/ or /n/. What is this?",
        opts: ["Assimilation", "A weak form", "Intrusion"], ans: 1,
        exp: "A function word loses its stress and full vowel — a weak form." },
      { q: "In 'ten boys' the /n/ often becomes /m/. This feature is called…",
        opts: ["elision", "linking", "assimilation"], ans: 2,
        exp: "A sound changes under the influence of the next sound (/n/ → /m/ before /b/) — assimilation." },
      { q: "In a neutral statement 'I bought a new car in May', which words are normally stressed?",
        opts: ["bought, new, car, May", "I, a, in", "I, bought, a, in"], ans: 0,
        exp: "Content words (verbs, adjectives, nouns) carry sentence stress; function words like 'I', 'a', 'in' are usually unstressed." },
      { q: "Why do teachers use backchaining for long phrases?",
        opts: ["To help learners write and spell the long phrase correctly in their notebooks", "To keep natural stress and rhythm while building up the phrase", "To practise reading the phonemic symbols for each word in the phrase"], ans: 1,
        exp: "Starting from the end keeps the stressed final part and natural rhythm." },
    ],
    practice: {
      TKT: {
        task: "Mark the main stress in each word and find the weak forms and examples of connected speech in the sentence.",
        variants: [
          "Words: economy, economic, photograph. Sentence: 'I'm going to the bank at half past ten.'",
          "Words: develop, development, comfortable. Sentence: 'What do you want for lunch?'",
          "Words: present (noun), present (verb), engineer. Sentence: 'There's an apple on the table.'",
        ],
        key: "Stress: eCONomy, ecoNOMic, PHOtograph; deVELop, deVELopment, COMfortable; PREsent (n), preSENT (v), engiNEER. Weak forms: to /tə/, the /ðə/, at /ət/, for /fə/, an /ən/, do you /dʒə/. Connected speech: linking (half‿past, an‿apple), elision (nex(t), wan(t)), 'going to' → /ɡənə/ in informal speech.",
      },
      CELTA: {
        task: "Write a 5-minute pronunciation stage for this target language in a B1 lesson: how you model, highlight (stress, weak forms, linking), drill (choral, individual) and check.",
        variants: [
          "'Would you like to come to my party?'",
          "'I should have told you earlier.'",
          "'How long have you been waiting?'",
        ],
        key: "A strong stage: natural model (not slow), highlighting on the board (stress marks, linking arcs, /ə/ for weak forms), choral then individual drilling, possibly backchaining, and a check through a mini-dialogue. Specific features: /wʊdʒə/; 'should have' → /ʃʊdəv/; 'have you' /həvjə/, 'been' /bɪn/.",
      },
      DELTA: {
        task: "Explain why these features are difficult for Kazakh- and Russian-speaking learners and suggest priorities for teaching. Refer to intelligibility (e.g. the Lingua Franca Core) or another principle of selecting pronunciation targets.",
        variants: [
          "/θ/ and /ð/; the /w/–/v/ distinction.",
          "Weak forms and the schwa; stress-timed rhythm.",
          "Long and short vowels /iː/–/ɪ/, /uː/–/ʊ/; final voiced consonants.",
        ],
        key: "A strong answer compares the English and L1 sound systems (absence of the sound, devoicing of final consonants, syllable-timed rhythm, no vowel length contrast in Russian), distinguishes features important for intelligibility from those less important (Jenkins's Lingua Franca Core: /θ/ is not core, vowel length and consonant clusters are), and plans receptive vs productive priorities.",
      },
    },
    transfer: [
      { exam: "TKT", text: "Module 1: phonemic symbols, stress, intonation, connected speech." },
      { exam: "CELTA", text: "Topic 2 (language analysis): phonology; drilling in TP." },
      { exam: "DELTA", text: "Module One: phonological features of an utterance and why they matter." },
      { exam: "IELTS", text: "Speaking — Pronunciation criterion; Listening — numbers, spelling, connected speech." },
    ],
    links: [{ page: "listening", label: "Listening: numbers and spelling" }, { page: "speaking", label: "IELTS Speaking" }],
  },

  // ---------- 5 ----------
  {
    n: 5,
    title: "Learners: motivation, differences, L1 and errors",
    ru: "Учащиеся: мотивация, различия, роль L1, ошибки",
    minutes: 60,
    aims: [
      "Describe learner differences and their effect on teaching",
      "Distinguish errors from mistakes and explain their sources",
      "Decide when the first language helps in the classroom",
    ],
    entry: [
      "Think of two learners you know (or yourself and a classmate). How do they learn English differently?",
      "Should teachers ever use Russian or Kazakh in an English lesson? When?",
    ],
    theory: [
      { term: "Motivation", def: "Intrinsic — interest in the activity itself; extrinsic — external reasons (grades, a job, a requirement). Integrative — wish to be part of a community of speakers; instrumental — practical goals. Motivation changes and can be supported by the teacher.", ex: "A student who studies for an exam (extrinsic) may become interested in the language after an enjoyable project (intrinsic)." },
      { term: "Learner differences", def: "Age, level, aptitude, previous learning experience, personality, needs and goals, anxiety. 'Learning styles' (visual, auditory, kinaesthetic) are popular but research does not support matching teaching to a single style — variety of input is a better principle.", ex: "Adults often want explicit explanations; young learners need movement and short activities." },
      { term: "Interlanguage", def: "The learner's developing system of the new language, with its own rules that gradually move toward the target language (Selinker).", ex: "A learner who says 'He goed' is applying a real rule (-ed for past), just too widely." },
      { term: "Error vs mistake", def: "An error is systematic — the learner does not yet know the correct form. A mistake (slip) happens because of tiredness or speed; the learner can correct it.", ex: "'It depends of the weather' (from Russian 'зависит от', said every time) — error; 'He go… he goes' — mistake corrected by the learner." },
      { term: "Sources of errors", def: "L1 transfer (interference), overgeneralisation of a rule, incomplete learning, teaching-induced errors (from over-practising one form).", ex: "'I am agree' — L1 transfer from Russian 'я согласен'; 'childs' — overgeneralisation." },
      { term: "The role of L1", def: "L1 can help: quick translation of abstract words, comparison of structures, instructions for low levels, translanguaging in multilingual classes. Overuse reduces exposure to English.", ex: "In an A2 class the teacher checks understanding of a complex instruction in Russian, then continues in English." },
    ],
    caseStudy: {
      title: "Three adults in one group",
      text: "An evening B1 group has 10 adults. Bolat needs English for business emails at work. Zhanna wants IELTS 6.5 for a master's programme in eight months. Sergey came because his company pays for the course and he 'has to'. The teacher follows the coursebook unit by unit; Bolat and Sergey often miss classes.",
      questions: ["How do the three learners differ in motivation and needs?", "What could the teacher change without creating three separate courses?"],
      commentary: "Bolat — instrumental, specific need (writing emails); Zhanna — instrumental, exam goal with a deadline; Sergey — extrinsic, low motivation. The teacher could do a needs analysis, add personalised tasks (e.g. writing tasks: emails for Bolat, IELTS Task 1 for Zhanna), set individual goals and show progress, which can increase Sergey's motivation.",
    },
    check: [
      { q: "A learner always says 'I am agree with you.' The most likely source of this error is…",
        opts: ["overgeneralisation of an English rule", "transfer from the first language", "tiredness at the end of the lesson"], ans: 1,
        exp: "The structure copies Russian 'я согласен' / Kazakh constructions — L1 transfer." },
      { q: "Which statement about learning styles reflects current research?",
        opts: ["Teachers should test each learner's style and teach only in that style", "Varied input helps all learners; matching teaching to one style is not supported by evidence", "Kinaesthetic learners cannot learn effectively from reading or listening alone"], ans: 1,
        exp: "The 'meshing hypothesis' has little evidence; variety and multimodal input are recommended." },
      { q: "'Childs', 'mouses', 'sheeps' in a young learner's speech show…",
        opts: ["overgeneralisation of the plural rule", "a slip that the learner can self-correct", "transfer from the first language"], ans: 0,
        exp: "The learner applies the regular -s rule to irregular nouns." },
      { q: "When is using the learners' L1 most justified?",
        opts: ["To explain the rules of every activity in detail with a B2 group", "To quickly clarify an abstract word at A2 after other techniques failed", "To chat with the learners during the whole speaking task to keep it relaxed"], ans: 1,
        exp: "Limited, purposeful use of L1 can save time and reduce anxiety; it should not replace English input." },
      { q: "Which activity is the best start for a new adult course?",
        opts: ["A grammar test of all tenses", "A needs analysis questionnaire and interview", "A presentation of the coursebook contents"], ans: 1,
        exp: "Needs analysis shows goals and needs, which shape the course." },
    ],
    practice: {
      TKT: {
        task: "Classify each learner utterance as an error or a mistake and name the likely source (L1 transfer, overgeneralisation, slip).",
        variants: [
          "1) 'She don't… she doesn't like it.' 2) 'It depends of the weather.' 3) 'We buyed new shoes.' 4) 'He explained me the rule.'",
          "1) 'I am living here since 2020.' 2) 'Informations are useful.' 3) 'They was… they were late.' 4) 'He is more taller.'",
          "1) 'I very like music.' 2) 'Yesterday I go… went to the park.' 3) 'The news are bad.' 4) 'She can sings.'",
        ],
        key: "Self-corrected forms are mistakes (slips). 'depends of', 'I am living here since', 'I very like', 'He explained me', 'Informations/news are' — errors from L1 transfer (Russian/Kazakh structures, countable 'информации/новости'). 'buyed', 'more taller', 'can sings' — overgeneralisation of English rules.",
      },
      CELTA: {
        task: "Write a short learner profile (as in CELTA Assignment 1 'Focus on the learner'): background, motivation, needs, strengths and weaknesses in language and skills. Then suggest two concrete ways to address these needs in a lesson.",
        variants: [
          "Aizhan, 35, accountant, B1, reads well but is afraid to speak; needs English for online meetings with partners.",
          "Daniyar, 16, A2+, plays online games in English, speaks fluently but makes many grammar errors; poor writing.",
          "Galina, 50, B1, learned English at school with grammar-translation, wants to talk with her grandchildren who live in Canada.",
        ],
        key: "A strong profile separates facts and teacher's analysis, refers to specific language problems with examples, links motivation to needs, and proposes concrete activities (e.g. rehearsed speaking with planning time for Aizhan, focus on accuracy in writing for Daniyar) rather than general advice.",
      },
      DELTA: {
        task: "Discuss when L1 use in the classroom supports learning and when it hinders it. Refer to at least one research perspective (e.g. Cook's multicompetence, translanguaging, Krashen's input hypothesis) and give a principled position for the given context.",
        variants: [
          "A multilingual Kazakh–Russian state school class, A2, 14-year-olds.",
          "A monolingual adult B2 group in a private centre whose students want 'English only'.",
          "A university group of future English teachers, B2–C1, in a teacher education programme.",
        ],
        key: "A strong answer contrasts the 'English only' tradition (input, Krashen) with research on judicious L1 use (Cook, translanguaging — García, Macaro), identifies functions where L1 helps (abstract meaning, comparison of structures, rapport, instructions at low levels) and risks (reduced exposure), and gives a context-specific position.",
      },
    },
    transfer: [
      { exam: "TKT", text: "Module 1 Part 2: learner characteristics, motivation, errors, L1." },
      { exam: "CELTA", text: "Topic 1 and Assignment 1 'Focus on the learner'." },
      { exam: "DELTA", text: "Module One: SLA concepts — interlanguage, error sources, learner factors." },
      { exam: "IELTS", text: "Understanding your own typical L1-based errors helps in Writing and Speaking." },
    ],
    links: [{ page: "prof", label: "TKT · CELTA · DELTA" }],
  },

  // ---------- 6 ----------
  {
    n: 6,
    title: "Teaching reading and listening",
    ru: "Обучение чтению и аудированию",
    minutes: 65,
    aims: [
      "Plan a receptive skills lesson with pre-, while- and post-stages",
      "Distinguish subskills and match tasks to them",
      "Look at the platform's Reading and Listening modules from a teacher's point of view",
    ],
    entry: [
      "Remember a reading or listening lesson you had at school. What did the teacher do before you read or listened?",
      "Why is 'read the text and translate it' a weak reading task?",
    ],
    theory: [
      { term: "Subskills", def: "Reading/listening for gist (skimming), for specific information (scanning), for detail, inferring attitude and meaning, deducing meaning of words from context, understanding text organisation.", ex: "IELTS Matching Headings tests gist of paragraphs; Sentence Completion tests specific information." },
      { term: "Top-down and bottom-up processing", def: "Top-down — using background knowledge, context and expectations to understand; bottom-up — decoding sounds, letters, words and grammar. Good listeners and readers combine both.", ex: "Predicting the content of a talk from its title (top-down); recognising 'thirteen' vs 'thirty' (bottom-up)." },
      { term: "Pre-stage", def: "Raises interest, activates schema, pre-teaches only blocking vocabulary, sets a reason to read or listen.", ex: "Learners discuss photos of three cities before listening to a tour guide." },
      { term: "While-stage", def: "Tasks move from general to specific: a gist task first, then detail tasks. Learners check in pairs before feedback.", ex: "1) Which city is the guide describing? 2) Complete the timetable with times and prices." },
      { term: "Post-stage", def: "Learners respond to the content (discussion, writing) or focus on language from the text.", ex: "Learners plan a one-day tour of their own city for visitors." },
      { term: "Authentic and graded texts", def: "Authentic texts are not written for learners; graded texts are adapted to a level. With authentic texts — 'grade the task, not the text'.", ex: "A real train timetable used with A2 learners for a simple scanning task." },
    ],
    caseStudy: {
      title: "A module on the platform through a teacher's eyes",
      text: "Open the Reading section, technique 'Skimming', and do one text as a learner. Then think as a teacher: what was the stage before the text, what kind of task did you do, what happened after you checked the answers? Imagine using this text in class with 16 students on phones.",
      questions: ["Which stages of a receptive skills lesson does the module include, and which are missing?", "What would you add in class before and after the platform task?"],
      commentary: "The module includes the while-stage (a skimming task with timing) and feedback with explanations. In class a teacher would add a pre-stage (prediction from the title, a short discussion) and a post-stage (pair discussion of the content or focus on useful language), and would ask learners to compare answers in pairs before checking.",
    },
    check: [
      { q: "Learners look through a cinema programme to find the time of one film. Which subskill is this?",
        opts: ["Scanning", "Skimming", "Inferring"], ans: 0,
        exp: "Looking quickly for a specific piece of information is scanning." },
      { q: "Why should a gist task usually come before detail tasks?",
        opts: ["Gist tasks take less time to set up and are easier to check", "Learners need a general understanding first, and it builds confidence", "Detail tasks cannot be done when learners listen for a second time"], ans: 1,
        exp: "General-to-specific sequencing supports understanding and reduces anxiety." },
      { q: "Using knowledge of how a typical phone call to a hotel goes in order to understand a recording is…",
        opts: ["bottom-up processing", "top-down processing", "intensive listening"], ans: 1,
        exp: "Using background knowledge and expectations (schema) is top-down processing." },
      { q: "'Grade the task, not the text' means that with an authentic text the teacher should…",
        opts: ["rewrite the difficult parts of the text in simpler language", "set a task that matches the learners' level", "only use the authentic text with advanced groups"], ans: 1,
        exp: "The text stays authentic and the difficulty is controlled through the task." },
      { q: "Which activity is the most appropriate for a post-listening stage?",
        opts: ["Predicting the content of the recording from pictures", "Discussing whether learners agree with the speaker's opinion", "Pre-teaching three key words that are needed for the task"], ans: 1,
        exp: "Responding to the content comes after listening; prediction and pre-teaching belong to the pre-stage." },
    ],
    practice: {
      TKT: {
        task: "Name the subskill that each task practises and say whether it is top-down or bottom-up focused.",
        variants: [
          "1) Read the headline and predict three ideas. 2) Find the year the company was founded. 3) Decide whether the writer approves of the new law. 4) Listen and write the missing words in the sentence.",
          "1) Match each paragraph to a heading. 2) Listen and note the price of each ticket. 3) Guess the meaning of 'thrive' from the sentence. 4) Decide how the speaker feels about the decision.",
          "1) Listen and say which of three pictures shows the place. 2) Read and order the events of the story. 3) Find all the dates in the text. 4) Listen and mark the stressed words.",
        ],
        key: "Prediction — top-down; finding a year/price/dates — scanning (specific information); writer's/speaker's attitude — inferring; matching headings / choosing a picture — gist; ordering events — reading for detail / text organisation; dictation of missing words, stressed words — bottom-up; guessing meaning from context — deducing meaning (combines both).",
      },
      CELTA: {
        task: "Plan the stages of a 40-minute listening lesson for B1 learners using this recording. For each stage give an aim, the task and the interaction pattern. Include a gist and a detail task.",
        variants: [
          "A recording from the platform's Listening section: a conversation about booking a course (Section 1 type).",
          "A recording from the platform's Listening section: a talk about a local facility with a map (Section 2 type).",
          "A recording from the platform's Listening section: a university lecture extract (Section 4 type).",
        ],
        key: "A strong plan: lead-in with an aim (generate interest, activate schema), pre-teaching of 2–3 blocking words only, gist task with a clear reason to listen, peer check, detail task, feedback with reference to the recording/transcript, post-stage (speaking response or language focus). Interaction patterns and timings stated.",
      },
      DELTA: {
        task: "Compare a skills-based approach (practising subskills like skimming and scanning) with a text-based or strategy-based approach to teaching listening/reading. Which would you choose for the given group and why? Refer to theory (e.g. Field's critique of the comprehension approach, strategy training).",
        variants: [
          "A university group preparing for IELTS Listening 6.5 in four months.",
          "A group of A2 adult learners who 'understand nothing' when people speak fast.",
          "A B2 group of future teachers who read academic articles in English.",
        ],
        key: "A strong answer explains that comprehension-question lessons test rather than teach (Field), discusses teaching decoding (bottom-up) for weak listeners, strategy training (Vandergrift), extensive reading, and chooses a principled combination with reasons tied to the group.",
      },
    },
    transfer: [
      { exam: "TKT", text: "Module 1 (subskills) and Module 2 (planning skills lessons)." },
      { exam: "CELTA", text: "Assignment 3 (Language skills related tasks); receptive skills lessons in TP." },
      { exam: "DELTA", text: "Module One: purposes of tasks in a coursebook extract; Module Two: skills LSA." },
      { exam: "IELTS", text: "All Reading and Listening question types practise these subskills." },
    ],
    links: [{ page: "reading", label: "Reading" }, { page: "listening", label: "Listening" }],
  },
];

// ===================== УРОКИ 7–12 =====================
export const LESSONS_B = [
  // ---------- 7 ----------
  {
    n: 7,
    title: "Teaching speaking and writing",
    ru: "Обучение говорению и письму",
    minutes: 65,
    aims: [
      "Distinguish accuracy and fluency activities",
      "Stage a speaking task and a writing task",
      "Give feedback on learners' spoken and written production using criteria",
    ],
    entry: [
      "What makes a speaking activity in class work well? What makes it fail?",
      "How do you usually get feedback on your own writing, and how useful is it?",
    ],
    theory: [
      { term: "Accuracy and fluency", def: "Accuracy activities focus on correct use of language (controlled practice); fluency activities focus on communicating meaning without hesitation (freer practice). Both are needed, at different stages.", ex: "Accuracy: a drill of question forms. Fluency: a class survey using those questions." },
      { term: "Controlled and freer practice", def: "Controlled practice limits the language learners can use (gap-fills, drills, transformation); freer practice lets learners choose language to complete a communicative task.", ex: "After a gap-fill with 'should', learners give advice to a classmate's real problem." },
      { term: "Communicative speaking tasks", def: "Information gap, opinion gap, role-play, problem solving, discussion, presentation. A task has a clear outcome and a reason to speak; planning time usually makes speech more fluent and complex.", ex: "Pairs have different parts of a timetable and must agree on a meeting time." },
      { term: "Process and product writing", def: "Product approach — study a model text and imitate it. Process approach — brainstorm, plan, draft, get feedback, revise, edit. Genre approach — analyse how a text type is organised for its purpose and reader.", ex: "Learners write an IELTS Task 2 essay in two drafts with peer feedback between them." },
      { term: "Feedback on production", def: "Content first, then language. Use criteria (e.g. IELTS band descriptors: Task Response, Coherence and Cohesion, Lexical Resource, Grammatical Range and Accuracy). Correction codes help learners self-correct written errors.", ex: "'WW' (wrong word), 'T' (tense), '^' (missing word) in the margin; the learner corrects." },
      { term: "IELTS productive tasks", def: "Writing Task 1 — describe visual information (150+ words); Task 2 — essay (250+ words), Task 2 counts twice as much. Speaking Part 1 — familiar topics, Part 2 — 2-minute long turn with 1 minute to prepare, Part 3 — discussion of abstract ideas.", ex: "A Part 2 cue card: 'Describe a teacher who influenced you.'" },
    ],
    caseStudy: {
      title: "An IELTS Task 2 response",
      text: "Task: 'Some people think that university education should be free for everyone. To what extent do you agree or disagree?'\n\nStudent's answer (extract): 'Nowadays education is very important thing in our life. In my opinion university education must be free because it is very important. Firstly, education is important for the country. Secondly, many students has not money for pay. In conclusion, I think education must be free for everyone and government must pay it.'",
      questions: ["What is the main problem with the content and development of ideas?", "Which language problems would you point out first, and how?"],
      commentary: "Ideas are stated but not developed or supported (no explanation or example), 'important' is repeated, and the position is clear but unsupported — this limits Task Response and Lexical Resource. Language: subject–verb agreement ('students has'), 'money for pay', missing article. Feedback should begin with development of ideas (ask 'Why? For example?'), then mark 2–3 language patterns with codes for self-correction.",
    },
    check: [
      { q: "Which activity mainly practises accuracy?",
        opts: ["Learners discuss their plans for the summer in groups", "Learners transform active sentences into the passive", "Learners role-play a job interview"], ans: 1,
        exp: "Transformation exercises control the language — accuracy practice." },
      { q: "Why do teachers often give planning time before a speaking task?",
        opts: ["It usually makes learners' speech more fluent and complex", "It allows the teacher to correct every error before speaking", "It replaces the need for a model or example"], ans: 0,
        exp: "Research on task planning shows consistent gains in fluency and complexity; effects on accuracy are smaller and less consistent." },
      { q: "Which sequence is typical of a process approach to writing?",
        opts: ["Model text → analysis → imitation → final copy → mark", "Brainstorm → plan → draft → feedback → revise", "Grammar exercise → dictation → translation → test"], ans: 1,
        exp: "Process writing focuses on the stages of producing a text, including revision after feedback." },
      { q: "A teacher writes 'T' above 'I go there yesterday' and returns the text. What is the aim?",
        opts: ["To give the learner a chance to self-correct a tense error", "To show that the error is not important enough to correct now", "To show that the learner chose the wrong word in the sentence"], ans: 0,
        exp: "Correction codes indicate the type of error so the learner can correct it." },
      { q: "In IELTS Speaking, which part asks the candidate to talk alone for up to two minutes?",
        opts: ["Part 1", "Part 2", "Part 3"], ans: 1,
        exp: "Part 2 is the long turn: one minute to prepare, up to two minutes to speak." },
    ],
    practice: {
      TKT: {
        task: "For each activity say whether it focuses on accuracy or fluency, whether it is controlled or freer, and which subskill of speaking or writing it develops.",
        variants: [
          "1) Learners repeat a dialogue after the teacher. 2) Learners plan a class party in groups. 3) Learners write a story from six pictures. 4) Learners correct errors in a paragraph.",
          "1) Learners ask and answer questions from a card with prompts. 2) Learners debate whether homework should be banned. 3) Learners join sentences with 'although' and 'however'. 4) Learners write an email replying to a friend's invitation.",
          "1) Learners order the paragraphs of an essay. 2) Learners do a role-play at a hotel reception without a script. 3) Learners write five sentences using new vocabulary. 4) Learners give a one-minute talk about a hobby.",
        ],
        key: "Repetition, prompt cards, sentence joining, error correction, writing sentences with given words — accuracy/controlled. Group planning, debate, unscripted role-play, one-minute talk, story from pictures, reply email — fluency/freer. Ordering paragraphs — text organisation/coherence. Subskills: turn-taking, interactional language, cohesion, register in emails.",
      },
      CELTA: {
        task: "Evaluate this learner response using the IELTS criteria. Give an estimated band for each criterion with one reason, then write short, encouraging feedback to the learner (as you would on a CELTA course) with two priorities for improvement.",
        variants: [
          "Writing Task 2, 'Should university education be free?': 'Nowadays education is very important thing in our life. In my opinion university education must be free because it is very important. Firstly, education is important for the country. Secondly, many students has not money for pay. In conclusion, I think education must be free.'",
          "Speaking Part 2, 'Describe a place you like to visit': 'Okay, so... I like park. Park is near my house. It is very beautiful, there are many trees. I go there with my friends. We walk. Er... it is good for relax. I like it because it is beautiful and I can relax. That's all.'",
          "Writing Task 1, a bar chart of internet use by age: 'The chart shows internet. Young people use internet more. Old people use less. 18-24 is 95 percent and 65+ is 40 percent. So young people like internet more than old.'",
        ],
        key: "Estimates should be justified by descriptors: limited development/support (Task Response or Fluency and Coherence), repetition and basic vocabulary (Lexical Resource), simple structures with errors (Grammatical Range and Accuracy), roughly band 4.5–5.5. For Task 1 — no overview and inaccurate interpretation of data. Feedback: starts with strengths, gives 2 specific priorities with an example of how to improve, is encouraging and not a list of all errors.",
      },
      DELTA: {
        task: "Design a 4-lesson writing mini-course for the given group based on a process or genre approach. For each lesson give the aim and main activities, and justify your sequence with reference to theory (e.g. process vs product, genre pedagogy, scaffolding, feedback research).",
        variants: [
          "3rd-year students preparing for IELTS Writing Task 2, current band 5.5, target 6.5.",
          "B1 adults who need to write formal emails at work.",
          "Future primary teachers (B2) who need to write lesson reports and reflective journals.",
        ],
        key: "A strong course combines genre analysis of model texts with process stages (planning, drafting, peer and teacher feedback, revision), gradually reduces scaffolding, plans focused written corrective feedback (e.g. Ellis, Ferris), and justifies each lesson's place in the sequence.",
      },
    },
    transfer: [
      { exam: "TKT", text: "Modules 1 and 2: speaking and writing subskills, accuracy/fluency, activity types." },
      { exam: "CELTA", text: "Topic 3 (language skills): speaking and writing lessons and feedback on errors in TP." },
      { exam: "DELTA", text: "Module One: evaluating a learner's written/spoken text; Module Two: skills LSA." },
      { exam: "IELTS", text: "Writing Task 1 and 2, Speaking Parts 1–3 — criteria-based assessment." },
    ],
    links: [{ page: "writing", label: "IELTS Writing" }, { page: "speaking", label: "IELTS Speaking" }],
  },

  // ---------- 8 ----------
  {
    n: 8,
    title: "Lesson planning: aims, stages, models",
    ru: "Планирование урока: цели, этапы, модели",
    minutes: 65,
    aims: [
      "Write learner-centred main and subsidiary aims",
      "Sequence stages with stage aims, timing and interaction",
      "Compare PPP, TTT and TBL and choose a model for a group",
    ],
    entry: [
      "What must a lesson plan contain, in your opinion?",
      "Have you ever seen a lesson where the activities were interesting but you didn't know what you learned? Why did it happen?",
    ],
    theory: [
      { term: "Main and subsidiary aims", def: "The main aim is what learners will be able to do (better) by the end of the lesson. Subsidiary aims support it (e.g. vocabulary needed for the main skill aim). Aims describe learning, not teacher actions or activities.", ex: "Main: 'Learners will be better able to make polite requests in a shop using Could I…? / Would you mind…?' Subsidiary: 'to practise listening for specific information'." },
      { term: "Stage aims", def: "Each stage of the lesson has its own aim explaining why it is there.", ex: "Lead-in — to generate interest in the topic and activate vocabulary about shopping." },
      { term: "Timing and interaction patterns", def: "Planned time for each stage and the pattern: T–Ss, S–S (pairs), groups, individual work, mingle.", ex: "Controlled practice — 7 min, individual then pair check." },
      { term: "Anticipated problems and solutions", def: "Language, task and classroom management problems the teacher expects, with planned solutions.", ex: "Problem: fast finishers. Solution: an extra card with two more questions." },
      { term: "PPP", def: "Presentation — Practice — Production. Language is presented first in context, then practised in controlled and freer activities. Clear and efficient, but language may not transfer to free use.", ex: "Present 'used to' through a story about childhood → gap-fill → learners tell partners about their childhood." },
      { term: "TTT and TBL", def: "Test-Teach-Test: learners try a task first, the teacher teaches what they lack, then learners try again. Task-Based Learning: pre-task → task → planning → report → language focus. Meaning comes first, form after.", ex: "TBL: learners plan a trip on a budget, report to the class, then study language they needed." },
    ],
    caseStudy: {
      title: "A plan with vague aims",
      text: "Lesson plan extract (B1, 60 min):\nAim: 'Students will learn grammar and speak a lot.'\n1. Warmer — game (10 min)\n2. Grammar — present perfect, explanation (20 min)\n3. Exercises 1–4, p. 52 (20 min)\n4. Speaking (10 min)\nAnticipated problems: 'None.'",
      questions: ["What is wrong with the aim and stages?", "How would you rewrite the main aim and add stage aims?"],
      commentary: "The aim is vague (which grammar? what will learners be able to do?), 20 minutes of teacher explanation means high TTT, four exercises are not justified, speaking has no task or purpose, and no problems are anticipated. Better aim: 'Learners will be better able to talk about life experiences using the present perfect with ever/never.' Each stage needs an aim, an interaction pattern and a link to the main aim.",
    },
    check: [
      { q: "Which is a learner-centred main aim?",
        opts: ["To present the second conditional, drill it and give controlled practice", "To show the class a video about holidays and discuss the ending", "Learners will be able to describe imaginary situations using the second conditional"], ans: 2,
        exp: "It states what learners will be able to do. The others describe teacher actions or materials." },
      { q: "In a test-teach-test lesson, the first stage is…",
        opts: ["a task that shows what learners can already do", "a short explanation of the new rule", "a check of the homework from last lesson"], ans: 0,
        exp: "The first 'test' diagnoses what learners know and need." },
      { q: "In task-based learning, language focus usually comes…",
        opts: ["before the task, so that learners can do it", "after the task and the report", "only in the next lesson"], ans: 1,
        exp: "TBL puts meaning first; form is studied after learners have used language for the task." },
      { q: "What is the main purpose of writing a stage aim?",
        opts: ["To show the observer how long each stage of the lesson will take", "To explain why the stage is in the lesson and how it serves the main aim", "To list all the materials and equipment needed for that stage"], ans: 1,
        exp: "Stage aims justify each stage in relation to the main aim." },
      { q: "Which is the most useful anticipated problem for a lesson on making requests?",
        opts: ["The projector in the classroom might not work at the start", "Learners may sound impolite because of flat intonation on 'Could you…?'", "Some learners may finish the practice task much earlier than others"], ans: 1,
        exp: "It is specific to the target language. A technical problem can be noted too, but language problems are central in CELTA plans." },
    ],
    practice: {
      TKT: {
        task: "Match each stage of this lesson to its aim and name the lesson model (PPP, TTT or TBL).",
        variants: [
          "Stages: A) Learners describe their dream house in pairs. B) Teacher highlights errors and teaches 'there is/are' and prepositions. C) Learners describe a new picture. D) Lead-in: photos of unusual houses.",
          "Stages: A) Teacher tells a story using 'used to'. B) Gap-fill with 'used to'. C) Learners tell each other about their childhood. D) Teacher asks CCQs about 'used to'.",
          "Stages: A) Groups plan a school event on a budget. B) Groups present plans to the class. C) Teacher draws attention to phrases for suggestions from the presentations. D) Learners listen to native speakers doing the same task.",
        ],
        key: "1 — TTT: D lead-in (interest), A test (diagnose), B teach (fill gaps), C test again (apply). 2 — PPP: A presentation in context, D checking meaning, B controlled practice, C freer practice. 3 — TBL: (D can be pre-task/exposure), A task, B report, C language focus.",
      },
      CELTA: {
        task: "Rewrite the aims of this plan as clear learner-centred aims (main and subsidiary), add a stage aim to each stage and write two anticipated problems with solutions.",
        variants: [
          "B1, 60 min. Aim: 'Students will learn about travel.' Stages: warmer; reading 'Unusual hotels'; questions; vocabulary; speaking.",
          "A2, 45 min. Aim: 'To teach comparatives.' Stages: pictures of cities; rule on the board; exercise; game.",
          "B2, 60 min. Aim: 'Listening and speaking.' Stages: video; questions; discussion; homework.",
        ],
        key: "A strong answer writes a main aim with 'Learners will be better able to…' + specific language/skill + context, subsidiary aims for supporting language/skills, stage aims explaining why each stage exists, and problems specific to the language or task (e.g. 'more better', pronunciation of -er /ə/, learners not understanding the task) with practical solutions.",
      },
      DELTA: {
        task: "Choose and justify a lesson model (PPP, TTT, TBL or another) for the given group and aim. Refer to learner factors, the nature of the target language and at least one theoretical argument (e.g. skill acquisition theory, focus on form, Willis's TBL framework).",
        variants: [
          "Aim: functional language for agreeing and disagreeing. Group: B2 adults who are fluent but inaccurate.",
          "Aim: the present perfect simple vs continuous. Group: B1 teenagers in a state school, exam-oriented.",
          "Aim: making phone enquiries. Group: A2 adult migrants who need English for daily life.",
        ],
        key: "A strong answer weighs strengths and weaknesses of each model, matches the choice to the learners (e.g. TTT/TBL for fluent but inaccurate learners to reveal gaps; PPP for clear, controlled first exposure), refers to theory (DeKeyser's skill acquisition for PPP, Long's focus on form / Willis for TBL) and recognises the limits of the choice.",
      },
    },
    transfer: [
      { exam: "TKT", text: "Module 2 Part 1: aims, stages, sequencing and lesson models." },
      { exam: "CELTA", text: "Topic 4: every assessed lesson needs a plan with aims, stages and problems." },
      { exam: "DELTA", text: "Module Two: detailed plans and commentary for assessed lessons." },
      { exam: "IELTS", text: "Planning skills help in Writing Task 2 essay structure." },
    ],
    links: [{ page: "prof", label: "TKT · CELTA · DELTA" }],
  },

  // ---------- 9 ----------
  {
    n: 9,
    title: "Materials and resources, including digital and AI",
    ru: "Материалы и ресурсы, в том числе цифровые и AI",
    minutes: 60,
    aims: [
      "Evaluate and adapt coursebook material for a group",
      "Choose reference and digital resources for a teaching purpose",
      "Use AI tools critically in lesson preparation",
    ],
    entry: [
      "Which digital tools or apps have you used for learning or teaching English? What were they good for?",
      "Can a teacher trust a text or exercise produced by ChatGPT or another AI? Why or why not?",
    ],
    theory: [
      { term: "Select, adapt, supplement, omit", def: "Teachers choose which material to use, change it to fit the learners (content, level, task), add extra material where something is missing, and leave out what is not needed.", ex: "Replacing a text about American football with one about local football clubs (adapting content)." },
      { term: "Authentic materials", def: "Texts, recordings and objects made for real communication, not for learners (menus, news, podcasts, timetables). They motivate but may need task grading.", ex: "A real Astana bus timetable for a scanning task at A2." },
      { term: "Reference resources", def: "Learner and monolingual dictionaries, grammar references, corpora (e.g. BNC, COCA), word lists (English Vocabulary Profile). Teachers use them to check meaning, frequency, collocations and level.", ex: "Checking in a corpus whether 'strong rain' is used (it is very rare compared with 'heavy rain')." },
      { term: "Digital tools", def: "Choose a tool by the lesson aim, not the other way round: interaction (Padlet, Mentimeter), practice and feedback (quizzes, platforms), recording speaking, collaborative writing. Consider access, devices, privacy and time to learn the tool.", ex: "Students on phones record a Speaking Part 2 answer and get AI feedback on the platform." },
      { term: "AI in lesson preparation", def: "AI can draft texts at a set level, generate examples, create questions and give feedback. Risks: factual errors, unnatural language, bias, wrong answer keys, over-reliance. The teacher checks and edits every output.", ex: "An AI-generated B1 text contained the wrong date for a historical event — the teacher corrected it before class." },
      { term: "Criteria for evaluating materials", def: "Fit with learners' needs and level, clear aim, authenticity and relevance, variety of tasks, cultural appropriateness, accuracy, visual design, practicality.", ex: "A checklist with 8 criteria scored 1–3 for choosing an app for a course." },
    ],
    caseStudy: {
      title: "A coursebook page that doesn't fit",
      text: "A B1 university group of future teachers uses a general coursebook. Unit 6 is 'Celebrity lifestyles': a reading about a Hollywood actor's house, a vocabulary exercise on luxury items, and a speaking task 'Would you like to be famous?'. Students find it boring and irrelevant; the target grammar (comparatives and superlatives) is useful.",
      questions: ["What should the teacher keep, change, add or omit?", "How could a digital tool or AI help with the adaptation, and what must the teacher check?"],
      commentary: "Keep the grammar aim; adapt the content (e.g. compare schools, cities or teaching jobs), omit the luxury vocabulary or replace it, and change the speaking task into a relevant one (choosing the best place for a teaching practice). AI can quickly draft a B1 text with comparatives on the new topic, but the teacher must check accuracy, level and naturalness of language and make sure the target structures appear in context.",
    },
    check: [
      { q: "A teacher adds an extra listening activity because the unit has no listening. This is…",
        opts: ["supplementing", "omitting", "adapting"], ans: 0,
        exp: "Adding material that is missing is supplementing." },
      { q: "Which is the best reason to choose a digital tool for a lesson?",
        opts: ["It is new, and students will probably find it more exciting than paper", "It helps achieve the lesson aim better than a non-digital option", "Most other teachers in the school already use it in their lessons"], ans: 1,
        exp: "The aim comes first; the tool should serve it." },
      { q: "A teacher wants to know whether 'do research' or 'make research' is more common. The most reliable source is…",
        opts: ["a corpus or a collocation dictionary", "the first answer given by an AI chatbot", "a grammar practice book for B1 learners"], ans: 0,
        exp: "A corpus shows real usage and frequency; AI answers need verification." },
      { q: "Which is a key responsibility of a teacher who uses AI-generated exercises?",
        opts: ["Checking the answer key and the language before using them", "Telling learners that the AI exercises are always correct", "Using the exercises without any changes to save preparation time"], ans: 0,
        exp: "AI can produce errors in keys and unnatural language, so the teacher must check." },
      { q: "Using a real restaurant menu in a lesson about ordering food is an example of…",
        opts: ["graded material", "authentic material", "a reference resource"], ans: 1,
        exp: "A real menu was not created for language learners — it is authentic material." },
    ],
    practice: {
      TKT: {
        task: "Match each resource to its most suitable teaching purpose and explain your choice in one sentence.",
        variants: [
          "Resources: a learner's dictionary, a corpus, flashcards, a class blog. Purposes: checking collocations; recycling vocabulary; publishing learners' writing; checking pronunciation and example sentences.",
          "Resources: realia (real objects), Padlet, a graded reader, a phonemic chart. Purposes: extensive reading; showing meaning of concrete nouns; collecting ideas from the whole class; working on individual sounds.",
          "Resources: an AI chatbot, a video clip, a grammar reference book, a mind map. Purposes: organising vocabulary by topic; providing context for a listening lesson; generating a first draft of practice sentences; checking a rule before teaching.",
        ],
        key: "Dictionary — pronunciation and examples; corpus — collocations; flashcards — recycling; blog — publishing writing. Realia — concrete meaning; Padlet — collecting ideas; graded reader — extensive reading; chart — sounds. AI — first draft of sentences (to be checked); video — context; grammar book — checking a rule; mind map — organising vocabulary.",
      },
      CELTA: {
        task: "Adapt this coursebook task for the described group. Say what you would keep, change, add or omit, and explain why each change better serves the learners and the lesson aim.",
        variants: [
          "Task: 'Read about a family holiday in Florida and answer 10 true/false questions.' Group: B1 adults in Astana who travel for work and want to practise speaking.",
          "Task: 'Write a postcard to a friend from your holiday.' Group: B2 teenagers who never write postcards but chat online a lot.",
          "Task: 'Listen to a dialogue in a London bank and complete the form.' Group: A2 learners who need English to communicate with foreign colleagues by email.",
        ],
        key: "A strong adaptation keeps the language/skill aim, makes content relevant (local or work-related context), adjusts the task to the real need (e.g. fewer T/F questions + a speaking follow-up; a social media post or email instead of a postcard), adds a personalised stage and explains each change with reference to learners' needs.",
      },
      DELTA: {
        task: "Write a set of 6–8 criteria for evaluating a digital resource (or an AI tool) for a course and apply them briefly to the given resource. Justify the criteria with reference to principles of materials evaluation (e.g. Tomlinson, Cunningsworth) and to the learners' context.",
        variants: [
          "An AI chatbot used as a speaking partner for B1 university students.",
          "A free vocabulary app with spaced repetition for an IELTS preparation course.",
          "An online platform with automatic Writing feedback for future teachers.",
        ],
        key: "A strong answer offers criteria on pedagogy (aims, feedback quality, interaction, level), language accuracy, learner autonomy, accessibility (phones, cost, internet), data privacy and teacher control; refers to evaluation frameworks; and gives a balanced evaluation of the resource with limitations.",
      },
    },
    transfer: [
      { exam: "TKT", text: "Module 2 Part 2: selection and use of resources and materials." },
      { exam: "CELTA", text: "Topic 4 (planning and resources): adapting and creating materials; justifying material choices in plans." },
      { exam: "DELTA", text: "Module One: evaluating materials; Module Three: course design and materials." },
      { exam: "IELTS", text: "Reference resources help build Lexical Resource for Writing." },
    ],
    links: [{ page: "materials", label: "Материалы" }, { page: "chat", label: "AI-Репетитор" }],
  },

  // ---------- 10 ----------
  {
    n: 10,
    title: "Classroom management and teacher language",
    ru: "Управление классом и язык учителя",
    minutes: 60,
    aims: [
      "Give clear instructions and check them with ICQs",
      "Choose grouping, monitoring and eliciting techniques",
      "Choose when and how to correct oral errors",
    ],
    entry: [
      "Remember a time when you did not understand what a teacher wanted you to do. What went wrong?",
      "Should a teacher correct every mistake a learner makes when speaking? Why?",
    ],
    theory: [
      { term: "Instructions and ICQs", def: "Instructions should be short, staged and in simple language; demonstrate rather than explain; give materials after instructions. Instruction-checking questions (ICQs) check that learners know what to do.", ex: "'Work in pairs. Ask three questions. Write the answers. Three minutes.' ICQs: 'Alone or in pairs? How many questions? Do you write?'" },
      { term: "Grouping and seating", def: "Pairs, groups, open pairs, mingles, whole class. Choice depends on the aim; changing partners increases interaction. Seating arrangements (horseshoe, clusters) support or block interaction.", ex: "Stronger and weaker learners together for peer support; similar levels for a challenging discussion." },
      { term: "Monitoring", def: "Moving around and listening during pair/group work to check understanding of the task, help, and collect language for feedback — without taking over.", ex: "The teacher notes three good phrases and three errors to discuss after the task." },
      { term: "TTT and STT, eliciting", def: "Teacher talking time should be purposeful; student talking time should be maximised. Eliciting draws language and ideas from learners instead of telling them.", ex: "Instead of 'This is a stethoscope', the teacher shows a picture and asks 'Who uses this? What's it called?'" },
      { term: "Oral error correction", def: "On-the-spot correction suits accuracy stages; delayed correction suits fluency stages. Techniques: recast, prompting (repeating up to the error, gesture, finger correction), peer correction, self-correction.", ex: "Learner: 'She go…' Teacher: 'She…?' (rising intonation) → Learner: 'She goes.'" },
      { term: "Rapport", def: "A positive relationship between teacher and learners and among learners: learning names, genuine interest, fairness, humour, praise for effort. It reduces anxiety and supports participation.", ex: "The teacher remembers that a student had an interview and asks how it went." },
    ],
    caseStudy: {
      title: "A 90-second instruction",
      text: "Teacher: 'OK, so now what we're going to do — and this is quite important because it's connected to what we did last time, remember, with the questions — you're going to work with your partner, or maybe in threes if there is an odd number, and you'll look at the handout, which I'm going to give you, and there are some questions, but don't answer all of them, choose the ones you like, and then later we'll discuss it, OK? Is it clear? Good, start.' Half of the class asks their neighbours what to do.",
      questions: ["Why did the instruction fail?", "Rewrite it in no more than four short sentences and add two ICQs."],
      commentary: "Too long, unnecessary information, no demonstration, the handout was promised but not yet given, 'Is it clear?' checks nothing. Better: 'Work in pairs. [Give handout] Choose three questions. Ask and answer. Five minutes.' ICQs: 'How many questions do you choose? Do you write or speak?'",
    },
    check: [
      { q: "Which is the best instruction-checking question after 'Work in pairs and find five differences without showing your picture'?",
        opts: ["Do you understand what to do?", "Can you show your partner your picture?", "What is a 'difference' in English?"], ans: 1,
        exp: "It checks a key part of the instruction with a yes/no answer. 'Do you understand?' checks nothing." },
      { q: "During a controlled drill, a learner says 'He go to work.' The most appropriate response is…",
        opts: ["note it and discuss at the end of the lesson", "prompt immediate self-correction, e.g. 'He…?'", "ignore it to keep fluency"], ans: 1,
        exp: "In accuracy stages, immediate correction (preferably self-correction) is appropriate." },
      { q: "What is the main purpose of monitoring during a group discussion?",
        opts: ["To join each group and lead its discussion for a while", "To check learners are on task and collect language for feedback", "To correct every error as soon as it happens in each group"], ans: 1,
        exp: "Monitoring supports the task without taking it over; correction is usually delayed in fluency stages." },
      { q: "A teacher asks another learner to help a classmate who made an error. This is…",
        opts: ["self-correction", "peer correction", "a recast"], ans: 1,
        exp: "Another learner provides the correction — peer correction." },
      { q: "Which way of reducing unnecessary teacher talking time is the most effective?",
        opts: ["Eliciting answers and examples from learners", "Explaining every rule in more detail", "Repeating each instruction three times"], ans: 0,
        exp: "Eliciting turns teacher explanation into learner production." },
    ],
    practice: {
      TKT: {
        task: "Name the function of each teacher utterance (e.g. giving instructions, eliciting, checking understanding of instructions, checking meaning, correcting, praising, managing behaviour).",
        variants: [
          "1) 'Who can tell me what this is called?' 2) 'Are you writing or speaking?' 3) 'She goes… or she go?' 4) 'Well done, that's a great idea!'",
          "1) 'Close your books and stand up, please.' 2) 'If I \"used to\" play football, do I play now?' 3) 'Ruslan, can you help Aisha with that word?' 4) 'Two more minutes.'",
          "1) 'What's the opposite of \"cheap\"?' 2) 'Do you show your card to your partner?' 3) 'You went to the cinema? Nice!' 4) 'Let's be quiet now, Group B.'",
        ],
        key: "'Who can tell me…/What's the opposite…' — eliciting. 'Are you writing…/Do you show your card…' — ICQs. 'If I used to…' — CCQ (checking meaning). 'She goes… or she go?' — prompting self-correction. 'Ruslan, can you help…' — peer correction. 'You went…? Nice!' — recast + showing interest. 'Well done' — praise. 'Close your books', 'Two more minutes' — instructions/time management. 'Let's be quiet…' — managing behaviour.",
      },
      CELTA: {
        task: "Rewrite this instruction so it is short, staged and clear, decide when to give out the materials, and add two ICQs. Explain your changes.",
        variants: [
          "'So, now I want you to sort of look at these cards — I'll give them in a moment — and you have to, like, put them in the right order to make a story, and you can work in groups or pairs, whatever, and then you can tell the story, OK?'",
          "'Right, everyone, what you need to do now is to stand up and walk around and ask everybody in the class the questions on the paper, but not in Russian, and write the names, and the person who finishes first wins, but you need to ask all of them, OK, go!'",
          "'For this activity I'd like you to read the text but not all of it, only the first part, and find the answers to the questions on the board, but don't use your dictionaries, and then check with your partner, and after that we will check together.'",
        ],
        key: "A strong answer shortens to imperatives, gives a clear grouping and time limit, demonstrates if needed, hands out materials after instructions (or after demonstration), and writes ICQs with short answers that check the key points (e.g. 'Do you use dictionaries?' 'Which part do you read?').",
      },
      DELTA: {
        task: "Justify a choice of oral error correction strategies for different stages of this lesson. Refer to research on corrective feedback (e.g. Lyster and Ranta's types, uptake, the role of prompts vs recasts) and to learner factors.",
        variants: [
          "A B1 lesson: presentation of the second conditional → controlled practice → freer discussion 'What would you do if…?'",
          "A B2 IELTS Speaking class: Part 1 practice → Part 2 long turn → Part 3 discussion.",
          "An A2 young learners lesson: vocabulary drill → a game → a short role-play.",
        ],
        key: "A strong answer distinguishes accuracy and fluency stages, refers to Lyster and Ranta's typology (recasts, elicitation, metalinguistic clues, clarification requests) and research on uptake (prompts lead to more uptake than recasts), considers learner age, anxiety and exam goals, and plans delayed correction techniques for fluency stages.",
      },
    },
    transfer: [
      { exam: "TKT", text: "Module 3: teacher and learner language, classroom management (80 questions)." },
      { exam: "CELTA", text: "Topic 5 (teaching skills and professionalism): instructions, monitoring and correction are assessed in every TP." },
      { exam: "DELTA", text: "Module Two: classroom management and correction in assessed lessons." },
      { exam: "IELTS", text: "Clear, concise language also helps in Speaking Part 3." },
    ],
    links: [{ page: "prof", label: "TKT · CELTA · DELTA" }],
  },

  // ---------- 11 ----------
  {
    n: 11,
    title: "Assessment and feedback",
    ru: "Оценивание и обратная связь",
    minutes: 60,
    aims: [
      "Distinguish types and purposes of assessment",
      "Evaluate a test in terms of validity, reliability and washback",
      "Use band descriptors for criterion-based assessment",
    ],
    entry: [
      "What is the difference between a test that helps you learn and a test that only gives you a mark?",
      "Have you ever taken a test that did not measure what you had studied? What happened?",
    ],
    theory: [
      { term: "Formative and summative", def: "Formative assessment is ongoing and informs teaching and learning (feedback, mini-quizzes, observation); summative assessment measures achievement at the end of a period.", ex: "Exit tickets at the end of each lesson (formative); an end-of-term exam (summative)." },
      { term: "Types of tests", def: "Diagnostic (find strengths and weaknesses before teaching), placement (put learners into the right level), progress/achievement (what was learned from a course), proficiency (general ability, not tied to a course — e.g. IELTS).", ex: "The entry diagnostic in Lesson 1 of this module is a diagnostic test." },
      { term: "Validity and reliability", def: "Validity — the test measures what it claims to measure. Reliability — the results are consistent across time and markers. Practicality — the test is realistic in time and cost.", ex: "A speaking test made only of written grammar questions has low validity." },
      { term: "Washback", def: "The effect of a test on teaching and learning. Positive washback encourages useful learning; negative washback narrows teaching to test tricks.", ex: "If an exam tests only multiple-choice grammar, teachers may stop teaching speaking." },
      { term: "Self- and peer-assessment", def: "Learners assess their own or each other's work against criteria. It develops autonomy and understanding of criteria.", ex: "Learners use a simplified checklist of IELTS Writing criteria to check a partner's essay." },
      { term: "Band descriptors", def: "Criterion-referenced scales that describe performance at each level. In IELTS Writing and Speaking each performance is scored on four criteria from 0 to 9, and these scores are combined into a band for the skill.", ex: "Lexical Resource band 6: 'uses an adequate range of vocabulary… attempts less common vocabulary but with some inaccuracy'." },
    ],
    caseStudy: {
      title: "A test that doesn't match the unit",
      text: "Unit 4 of a B1 course focused on speaking: giving opinions, agreeing and disagreeing, a debate. The end-of-unit test has 40 multiple-choice grammar questions on tenses. Many learners who spoke well in the debate got low scores; some quiet learners who rarely spoke got high scores.",
      questions: ["What is the problem with this test?", "What could the teacher use instead or in addition?"],
      commentary: "The test has low content validity — it does not measure the unit's aims (speaking). It may also create negative washback: learners will see speaking as less important. Better: a short speaking task in pairs assessed with simple criteria (fluency, range of phrases for opinions, interaction), perhaps with peer assessment, plus formative feedback during the debate.",
    },
    check: [
      { q: "A teacher uses short quizzes every week to see what to revise. This is mainly…",
        opts: ["formative assessment", "summative assessment", "a proficiency test"], ans: 0,
        exp: "The results inform teaching — formative assessment." },
      { q: "Two examiners give very different scores to the same essay. Which quality of the test is weak?",
        opts: ["Validity", "Reliability", "Washback"], ans: 1,
        exp: "Inconsistent marking means low reliability." },
      { q: "Which test is NOT based on a particular course?",
        opts: ["An achievement test", "A progress test", "A proficiency test"], ans: 2,
        exp: "Proficiency tests (like IELTS) measure general ability, independent of a syllabus." },
      { q: "Teachers stop teaching writing because the final exam contains no writing. This is an example of…",
        opts: ["positive washback", "negative washback", "high reliability"], ans: 1,
        exp: "The test narrows teaching in an unhelpful way — negative washback." },
      { q: "What is the main benefit of peer assessment with clear criteria?",
        opts: ["It saves the teacher a lot of time spent marking", "Learners understand the criteria better and become more autonomous", "It makes the scores more reliable than the teacher's scores"], ans: 1,
        exp: "Applying criteria to others' work helps learners understand quality and improve their own work." },
    ],
    practice: {
      TKT: {
        task: "Name the type and purpose of each assessment (diagnostic, placement, progress, achievement, proficiency; formative or summative).",
        variants: [
          "1) A test before a new course to put learners into groups. 2) A five-question quiz after each lesson. 3) IELTS. 4) A final exam on the coursebook units.",
          "1) A teacher observes and notes how learners use new vocabulary in pairs. 2) A test at the start of a unit to find out what learners know. 3) A test after units 1–3. 4) Cambridge C1 Advanced.",
          "1) Learners keep a portfolio of their writing during the term. 2) An interview with a new student to decide her level. 3) An end-of-year exam. 4) A self-assessment checklist at the end of each unit.",
        ],
        key: "Placement — groups/level; lesson quiz, observation, self-assessment checklist, portfolio — formative (progress); IELTS, C1 Advanced — proficiency, summative; test at the start of a unit — diagnostic; test after units 1–3 — progress; final/end-of-year exam on the course — achievement, summative.",
      },
      CELTA: {
        task: "Design three formative assessment activities for this lesson. For each, say what it checks, when in the lesson it happens and what the teacher will do with the information.",
        variants: [
          "B1 lesson: talking about past experiences using the present perfect with 'ever/never'.",
          "A2 lesson: listening for specific information in a conversation about travel plans.",
          "B2 lesson: writing an opinion paragraph with linking words.",
        ],
        key: "Strong activities are quick and aligned to the aim (e.g. CCQs and a mini-whiteboard check after clarification, monitoring with a checklist during practice, an exit ticket or a peer-check against criteria), state the timing and include a clear action (re-teach, extra practice, regroup, individual feedback).",
      },
      DELTA: {
        task: "Analyse the washback of the given test on teaching and learning in your context. Refer to washback research (e.g. Alderson and Wall, Hughes) and propose ways to make the washback more positive.",
        variants: [
          "IELTS Academic on an IELTS preparation course at a university.",
          "A national school-leaving exam in English based mainly on multiple-choice reading and grammar.",
          "The TKT Module 1 test used as a final exam for a methodology course.",
        ],
        key: "A strong answer separates the test's features from teachers' and learners' responses, discusses positive and negative washback with examples, refers to research (washback is complex and mediated by teachers), and proposes realistic measures (teaching skills beyond test tasks, criteria-based formative feedback, authentic tasks).",
      },
    },
    transfer: [
      { exam: "TKT", text: "Module 1 Part 3 and Module 2: types and purposes of assessment." },
      { exam: "CELTA", text: "Topic 5: checking and evaluating learning in the lesson during TP." },
      { exam: "DELTA", text: "Module One: analysing a test — purpose, validity, reliability, washback." },
      { exam: "IELTS", text: "Know the band descriptors to self-assess Writing and Speaking." },
    ],
    links: [{ page: "writing", label: "IELTS Writing" }, { page: "prof", label: "TKT · CELTA · DELTA" }],
  },

  // ---------- 12 ----------
  {
    n: 12,
    title: "Reflection, professional development and final diagnostic",
    ru: "Рефлексия, профессиональное развитие и итоговая диагностика",
    minutes: 65,
    aims: [
      "Write a critical reflection on a lesson",
      "Plan professional development and a strategy for each certificate",
      "Complete the final diagnostic (20 questions)",
    ],
    entry: [
      "After a lesson you taught or observed, what do you usually think about?",
      "Which certificate are you planning to take first, and what is your biggest worry about it?",
    ],
    theory: [
      { term: "Reflective practice", def: "Systematic thinking about one's teaching to improve it. Gibbs's cycle: description → feelings → evaluation → analysis → conclusion → action plan. Reflection moves from 'what happened' to 'why' and 'what next'.", ex: "'Learners didn't finish the task (description). Why? The instructions were long and I gave the handout first (analysis). Next time I'll demonstrate (action).'" },
      { term: "Peer observation", def: "A colleague observes part of a lesson with an agreed focus and gives non-judgemental feedback. It is developmental, not evaluative.", ex: "Focus: 'Who speaks in group work and for how long?'" },
      { term: "Action research", def: "A small-scale cycle: identify a problem in your classroom → plan a change → act → collect data → reflect. The results inform your practice.", ex: "Learners rarely use English in group work → introduce role cards and a 'language monitor' → record group talk for 4 weeks." },
      { term: "Continuing professional development (CPD)", def: "Ongoing learning: courses and certificates, conferences, reading, teacher communities, mentoring, online courses, keeping a teaching journal.", ex: "A teacher keeps a journal, attends a regional conference and takes DELTA Module One after two years." },
      { term: "Exam strategies", def: "TKT — learn the terminology and read every option; CELTA — plan thoroughly, act on tutors' feedback, keep to deadlines; DELTA — read widely, link practice to theory; IELTS — know the task types and criteria, practise under time limits.", ex: "In TKT matching tasks there is often one extra option — eliminate the options you are sure about first." },
    ],
    caseStudy: {
      title: "A reflection that only describes",
      text: "A student's self-evaluation after teaching practice: 'First I did a warmer with pictures. Then I explained the vocabulary. After that students read the text and answered the questions. Then we checked the answers. At the end they did a speaking activity. The lesson was good and the students liked it.'",
      questions: ["Why is this reflection weak?", "Which questions would help the student make it critical?"],
      commentary: "It only describes the stages and gives a general positive judgement without evidence. Useful questions: Was the main aim achieved — how do you know? What went less well and why? What did learners actually say or do? What will you do differently next time and why? This is exactly what CELTA Assignment 4 and DELTA Module Two require.",
    },
    check: "DIAG_B",
    practice: {
      TKT: {
        task: "Match each activity to the type of professional development and say what a teacher can learn from it.",
        variants: [
          "1) Keeping a teaching journal. 2) Inviting a colleague to watch your instructions. 3) Attending a webinar on AI in ELT. 4) Recording group work for four weeks to test a new technique.",
          "1) Taking TKT Module 2. 2) Discussing a difficult class with a mentor. 3) Reading a methodology book. 4) Asking learners for anonymous feedback on lessons.",
          "1) Presenting at a regional teachers' conference. 2) Observing an experienced teacher's lesson. 3) Joining an online teacher community. 4) Writing a reflection after each lesson using Gibbs's cycle.",
        ],
        key: "Journal / reflection with Gibbs's cycle — reflective practice; colleague observation / observing an experienced teacher — peer observation; webinar, book, certificate, conference, community — CPD (formal or informal); recording group work to test a technique — action research; mentor — mentoring; learner feedback — collecting data on teaching. Each should name what the teacher learns.",
      },
      CELTA: {
        task: "Write a reflection in the style of CELTA Assignment 4 'Lessons from the classroom': identify two strengths and two areas for development in your teaching, with evidence, and an action plan. Use a lesson you taught (practice, tutoring, peer teaching) or one of these situations.",
        variants: [
          "A lesson where the speaking task finished early because learners only gave one-word answers.",
          "A lesson where your instructions were not understood and you had to explain the task three times.",
          "A lesson where the grammar explanation took 25 minutes and there was no time for freer practice.",
        ],
        key: "A strong reflection is specific, gives evidence (what learners said or did), analyses causes rather than only describing, links points to course input (e.g. ICQs, staging, TTT), and ends with concrete, realistic actions.",
      },
      DELTA: {
        task: "Formulate an action research question for your own practice and plan the cycle: the problem, the change you will make, data you will collect, how you will analyse it, and how it connects to the literature.",
        variants: [
          "Problem area: learners' low participation in speaking tasks.",
          "Problem area: learners rely too much on AI tools for writing assignments.",
          "Problem area: learners' poor results in IELTS Listening Section 4.",
        ],
        key: "A strong plan has a narrow, answerable question, a concrete intervention, at least two data sources (e.g. recordings, questionnaires, test scores, observation notes), a realistic time frame, ethical considerations and references to relevant research and to models of action research (e.g. Burns, Kemmis and McTaggart).",
      },
    },
    transfer: [
      { exam: "TKT", text: "Terminology of development and reflection appears across the modules." },
      { exam: "CELTA", text: "Topic 5 (professional development) and Assignment 4 'Lessons from the classroom'." },
      { exam: "DELTA", text: "Module Two: Professional Development Assignment and Experimental Practice; Module Three." },
      { exam: "IELTS", text: "Exam strategy: task types, criteria, timing." },
    ],
    links: [{ page: "prof", label: "TKT · CELTA · DELTA" }, { page: "analytics", label: "Аналитика" }],
  },
];

export const LESSONS = [...LESSONS_A, ...LESSONS_B];
