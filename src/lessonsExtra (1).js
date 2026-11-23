/**
 * CertifyWise
 * © 2026 Альназирова Айдана (Aidana Alnazirova). Все права защищены.
 * Дата создания: 22 мая 2026 г.
 * Использование без письменного разрешения автора запрещено.
 *
 * Усиление уроков: глоссарий с переводом, «не путать», задания в формате TKT,
 * термины в формате DELTA Module One (Paper 1, Task 1), образцы ответов CELTA/DELTA
 * (по одному на каждый вариант задания) и задание на собственную педагогическую практику.
 */

import { T, TT } from "./i18n";

export const LESSON_EXTRA = {
  // ==================== 1 ====================
  1: {
    glossary: [
      ["Module (TKT)", "модуль", "A separate TKT test on one area; each can be taken on its own."],
      ["Band (TKT)", "уровень результата", "TKT results are reported in four bands, Band 4 is the highest; there is no pass/fail."],
      ["Teaching practice (TP)", "педагогическая практика", "Assessed lessons with real learners on CELTA and DELTA."],
      ["Written assignment", "письменное задание", "CELTA has four (750–1000 words each); DELTA Module Two and Three include longer ones."],
      ["Pass / Pass B / Pass A", "оценки CELTA", "CELTA grades; Pass A is given for outstanding performance."],
      ["Module One / Two / Three (DELTA)", "модули DELTA", "Exam on knowledge / teaching portfolio / extended assignment; each is a separate certificate."],
      ["Band score (IELTS)", "балл IELTS", "Scores from 0 to 9 in half bands for each skill and overall."],
      ["Academic / General Training", "академический / общий модуль", "Two versions of IELTS; Reading and Writing differ, Listening and Speaking are the same."],
      ["CEFR", "общеевропейская шкала уровней", "A1–C2 scale used to describe language proficiency; IELTS 7.0 is roughly C1."],
      ["CPD", "непрерывное профессиональное развитие", "Continuing professional development: all ways teachers keep learning."],
    ],
    confuse: [
      { a: "TKT", b: "CELTA", diff: "TKT tests knowledge about teaching (no teaching needed). CELTA assesses your teaching of real learners.", ex: "You can pass TKT without ever teaching; you cannot pass CELTA without teaching." },
      { a: "CELTA", b: "DELTA", diff: "CELTA is an initial qualification; DELTA is an in-service diploma for experienced teachers and requires depth and theory.", ex: "CELTA asks 'Did your instructions work?'; DELTA asks 'Why does this technique suit these learners, according to research?'" },
      { a: "IELTS", b: "TKT", diff: "IELTS tests your own English; TKT tests your knowledge of methodology, in English.", ex: "A native speaker might fail TKT; a methodology expert might score low in IELTS Writing." },
    ],
    exam: [
      { type: "match", instructions: "For questions 1–5, match each description with the exam it belongs to. Choose from A–F. There is one extra option.",
        options: [["A", "TKT Module 1"], ["B", "TKT Module 2"], ["C", "TKT Module 3"], ["D", "CELTA"], ["E", "DELTA Module One"], ["F", "IELTS"]],
        items: [
          { text: "Candidates answer questions about the language that teachers and learners use in the classroom.", answer: "C", why: "Module 3 covers managing the teaching and learning process, including classroom language." },
          { text: "Candidates analyse a text and a learner's work in a written exam with extended answers.", answer: "E", why: "DELTA Module One is a written exam with analysis tasks." },
          { text: "Candidates write a 250-word essay and speak with an examiner.", answer: "F", why: "IELTS tests the candidate's own English in four skills." },
          { text: "Candidates answer questions about lesson aims, stages and choosing resources.", answer: "B", why: "Module 2 is planning lessons and use of resources." },
          { text: "Candidates teach six hours of assessed lessons and write four assignments.", answer: "D", why: "This is the CELTA assessment." },
        ] },
      { type: "mcq3", instructions: "For questions 6–10, choose the correct answer A, B or C.",
        items: [
          { text: "Which of these can a teacher with no classroom experience take?", opts: ["TKT Module 1", "DELTA Module Two", "DELTA Module Three"], answer: 0, exp: "TKT has no experience requirement; DELTA Modules Two and Three require teaching." },
          { text: "How are TKT results reported?", opts: ["Pass or fail", "Bands 1 to 4", "Bands 0 to 9"], answer: 1, exp: "TKT uses four bands; IELTS uses 0–9." },
          { text: "Which DELTA module includes assessed teaching?", opts: ["Module One", "Module Two", "Module Three"], answer: 1, exp: "Module Two is the portfolio with assessed lessons." },
          { text: "Which IELTS paper is the same in the Academic and General Training versions?", opts: ["Reading", "Writing", "Listening"], answer: 2, exp: "Listening and Speaking are the same for both versions." },
          { text: "Which is NOT part of CELTA assessment?", opts: ["Six hours of assessed teaching practice", "A timed written exam with multiple-choice questions", "Four written assignments of 750–1000 words"], answer: 1, exp: "CELTA has no multiple-choice exam." },
        ] },
    ],
    deltaTerms: [],
    models: {
      CELTA: [
        "Nurlan should aim for CELTA, because he already has a year of experience with children and wants to teach adults — CELTA is designed for adult teaching and is widely recognised by language schools. However, his English is B2+, and centres usually expect C1 or a strong B2+ with good language awareness. Before applying he should (1) work on his own language, for example aiming for IELTS 7.0, and (2) revise grammar terminology and form–meaning–use, because the pre-interview task tests language analysis. Cost and time: the full-time course is about four weeks, so he needs to plan leave from work or choose a part-time course.",
        "Kamila's long-term goal (working abroad) points to CELTA, but her budget and lack of experience make TKT the realistic first step this year: it is cheaper, needs no teaching experience and builds the knowledge base that CELTA assumes. She can take Module 1 and Module 2 during her final year, gain some teaching experience after graduation, save for CELTA and take it before applying abroad. To prepare she should collect evidence of her C1 level (IELTS if employers require it) and start teaching, even online.",
        "Yerlan has eight years of experience, so CELTA would repeat much of what he already does; DELTA is more appropriate and more valuable for career growth. A sensible start is DELTA Module One (written exam), which he can prepare for alongside his job and which shows him gaps in theory. He should read core methodology and SLA books, practise Module One past papers, and later choose a centre for Module Two, where his lessons will be observed. If his employer needs a quick international certificate, TKT can document his knowledge, but it is not necessary.",
      ],
      DELTA: [
        "Goal: teacher trainer in five years. Year 1: TKT Modules 1–3 (autumn) to consolidate terminology; IELTS 7.5+ as proof of language level; start teaching full-time. Year 2 (spring): CELTA — a recognised practical qualification required by most training organisations. Years 3–4: at least two years of varied teaching; DELTA Module One after year 3, Modules Two and Three in year 4 (Module Three on teacher training or ELT management if offered). Logic: knowledge → practical qualification → experience → in-service diploma; DELTA cannot be meaningfully taken without experience, and trainers are expected to hold it.",
        "Goal: curriculum design. Year 1: DELTA Module One (language systems, methodology and testing — the base for designing courses) while continuing to teach; keep a log of course materials I develop. Year 2: DELTA Module Three, ELT specialism option (e.g. English for Specific Purposes), which requires a needs analysis, a course proposal and an assessment plan — directly relevant to curriculum work. Module Two can follow later because it is the most time-consuming. Parallel: an online course on curriculum design and participation in my school's syllabus group. Logic: theory first, then a supervised piece of curriculum work as evidence.",
        "Goal: own language centre. Year 1: CELTA (if not yet held) to ensure a recognised teaching standard and to understand how teachers are trained; strengthen IELTS-teaching expertise with IELTS 8.0 as a personal benchmark. Year 2: DELTA Module One, then Module Three with ELT management as the option, covering marketing, staffing and quality management. Logic: credibility with students and future staff requires both practical and managerial qualifications; Module Three on management produces a project directly usable for the business plan.",
      ],
    },
    apply: { task: "Interview a teacher you know (a methodologist, your practice mentor or an online teacher). Ask which certificates they have, why they chose them and what helped them most. Write 3–4 sentences about what you learned for your own route.", hint: T("Можно спросить по-русски или по-казахски, записать — по-английски.") },
  },

  // ==================== 2 ====================
  2: {
    glossary: [
      ["Tense", "время", "Grammatical marking of time: present, past (English has no future tense form, 'will' is a modal)."],
      ["Aspect", "вид", "How an action is viewed: simple, continuous (progressive), perfect, perfect continuous."],
      ["Auxiliary verb", "вспомогательный глагол", "be, have, do used to form tenses, questions and negatives."],
      ["Modal verb", "модальный глагол", "can, could, must, should, may, might, will, would — express ability, obligation, possibility."],
      ["Past participle", "причастие прошедшего времени (III форма)", "Used in perfect tenses and the passive: written, gone."],
      ["Passive voice", "страдательный залог", "be + past participle; focus on the action or object, not the agent."],
      ["Conditional (0/1/2/3)", "условные предложения", "If-clauses for real, likely, hypothetical and past unreal situations."],
      ["Countable / uncountable noun", "исчисляемое / неисчисляемое", "Can/cannot be counted: two chairs / some furniture."],
      ["Function", "речевая функция", "What language is used to do: advising, requesting, apologising."],
      ["Exponent", "языковое выражение функции", "A phrase that expresses a function: 'Why don't you…?' for suggesting."],
      ["Timeline", "временная шкала", "A diagram showing the time reference of a structure."],
      ["CCQ", "контрольный вопрос на понимание", "Concept-checking question checking meaning."],
      ["Inductive / deductive", "индуктивный / дедуктивный", "Rule discovered from examples / rule given first."],
      ["Guided discovery", "управляемое открытие", "Learners work out a rule with the help of questions or a task."],
      ["Marker sentence", "образцовое предложение", "A clear example sentence of the target language used for clarification."],
    ],
    confuse: [
      { a: "Tense", b: "Aspect", diff: "Tense shows time (present/past); aspect shows how the action is viewed (complete, ongoing, connected to now).", ex: "'I had been waiting' — past tense, perfect continuous aspect." },
      { a: "Form", b: "Function", diff: "Form is the structure; function is what it is used to do. One function can have many forms.", ex: "Function 'advice': 'You should…', 'If I were you…', 'Why don't you…?'" },
      { a: "CCQ", b: "Comprehension question", diff: "A CCQ checks understanding of the meaning of a language item; a comprehension question checks understanding of a text.", ex: "CCQ: 'Is he still at the bank?' (has gone). Comprehension: 'Where did Tom go after work?'" },
      { a: "Present perfect", b: "Past simple", diff: "Present perfect connects past and now, with no finished time; past simple is for finished time.", ex: "'I've lost my keys' (still lost) vs 'I lost my keys yesterday' (finished time)." },
    ],
    exam: [
      { type: "match", instructions: "For questions 1–5, match the underlined forms with the grammatical terms A–F. There is one extra option.",
        options: [["A", "present perfect continuous"], ["B", "past perfect"], ["C", "passive"], ["D", "modal verb of deduction"], ["E", "second conditional"], ["F", "past continuous"]],
        items: [
          { text: "The parcel <u>was delivered</u> this morning.", answer: "C", why: "be + past participle = passive." },
          { text: "She <u>must be</u> tired after such a long flight.", answer: "D", why: "'must be' expresses a logical deduction, not obligation." },
          { text: "I <u>was cooking</u> when you called.", answer: "F", why: "was/were + -ing = past continuous." },
          { text: "<u>If I won</u> the lottery, I'd travel the world.", answer: "E", why: "If + past, would + infinitive = second conditional." },
          { text: "They <u>have been waiting</u> for an hour.", answer: "A", why: "have been + -ing = present perfect continuous." },
        ] },
      { type: "mcq3", instructions: "For questions 6–10, choose the correct answer A, B or C.",
        items: [
          { text: "Which CCQ checks the meaning of 'He's been to Paris'?", opts: ["Is he in Paris now?", "Which country is Paris in?", "Did he enjoy his trip to Paris?"], answer: 0, exp: "'been' (vs 'gone') means he went and came back — the CCQ checks he is not there now." },
          { text: "What is the function of 'Would you mind opening the window?'", opts: ["Making a polite request", "Giving advice to a friend", "Expressing a personal opinion"], answer: 0, exp: "It is a polite request." },
          { text: "In 'I'll help you with that bag', 'will' expresses…", opts: ["a prediction", "a spontaneous offer", "a fixed arrangement"], answer: 1, exp: "A decision made at the moment of speaking to help — an offer." },
          { text: "Which sentence contains an UNCOUNTABLE noun used correctly?", opts: ["She gave me some useful advice.", "She gave me some useful advices.", "She gave me an useful advice."], answer: 0, exp: "'advice' is uncountable: no plural, no 'an'." },
          { text: "A teacher gives learners five sentences and asks: 'Which ones describe a finished time?' This is…", opts: ["a deductive explanation", "guided discovery", "a controlled drill"], answer: 1, exp: "Learners work out the rule from examples with the help of questions." },
        ] },
    ],
    deltaTerms: [
      { def: "The grammatical category that shows how an action is viewed in time — e.g. as complete, in progress or connected to the present.", accept: ["aspect"] },
      { def: "A verb such as 'must', 'might' or 'should' that expresses the speaker's attitude, such as obligation, possibility or deduction.", accept: ["modal verb", "modal", "modal auxiliary", "modals"] },
      { def: "A phrase or structure used to express a particular communicative function, e.g. 'Why don't you…?' for suggesting.", accept: ["exponent", "exponents"] },
    ],
    models: {
      CELTA: [
        "Form: subject + have/has + been + verb-ing. I've been learning (contraction 've). Negative: I haven't been learning. Question: How long have you been learning…? With 'for' + period, 'since' + point.\nMeaning: an activity that started in the past and continues now; the focus is on duration.\nCCQs: Did I start learning in the past? (Yes) Am I still learning now? (Yes) Is the activity finished? (No) Are we talking about how long? (Yes)\nTimeline: a wavy line from six years ago to now, with an arrow toward the future.\nPronunciation: I've /aɪv/, been weak /bɪn/; stress on LEARning and SIX YEARS.\nProblems: (1) L1 transfer — 'I learn English six years' or 'I am learning since…'; solution: contrast on the timeline and highlight have been + -ing. (2) for/since confusion; solution: a quick sort task of time expressions.",
        "Form: subject + am/is/are + going to + infinitive. I'm going to visit. Negative: I'm not going to visit. Question: Are you going to visit…? What are you going to do?\nMeaning: a plan or intention decided before the moment of speaking.\nCCQs: Did I decide this before now? (Yes) Is it in the future? (Yes) Am I visiting them now? (No)\nTimeline: X = decision in the past, arrow to the visit at the weekend.\nPronunciation: weak 'to' /tə/; in informal speech 'gonna' /ɡənə/ — learners should recognise it but can use the full form. Stress: VISit, GRANDparents, WEEKend.\nProblems: (1) learners omit 'be': 'I going to visit'; solution: highlight the three parts in colour and drill. (2) confusion with 'will' for decisions made now; solution: contrast two mini-dialogues ('The phone's ringing' — 'I'll get it').",
        "Form: If + present simple, will + infinitive. The if-clause can come second (no comma). Negative: If it doesn't rain, we won't stay… Question: What will you do if it rains?\nMeaning: a real, possible future situation and its likely result.\nCCQs: Do I know if it will rain? (No) Is rain possible? (Yes) If it rains, what happens? (We stay at home) Is it about the future? (Yes)\nPronunciation: we'll /wiːl/ contracted, linking 'stay‿at'; stress RAINS, TOmorrow, STAY, HOME.\nProblems: (1) 'If it will rain' — L1 transfer from Russian 'если будет дождь'; solution: highlight 'no will after if' and contrast correct/incorrect. (2) learners forget the comma rule or the order; solution: matching halves and reordering clauses.",
      ],
      DELTA: [
        "Deductive presentation (rule → examples → practice) suits these adult engineers: they value explicit rules, have well-developed analytical skills and limited time, and explicit knowledge can support monitoring of output (Krashen's Monitor; DeKeyser's skill acquisition: declarative knowledge proceduralised through practice). An inductive approach, however, would engage them more deeply: by noticing the form in context (Schmidt) and working out the 'unreal present' meaning, they may retain the concept better. My choice is a guided-discovery hybrid: a short engineering context ('If we had more budget, we would…'), questions that lead to the rule, then a clear summary they can note down — combining their preference for rules with the benefits of noticing. Limitation: discovery takes longer, and weaker analysers may need the rule sooner.",
        "For 14-year-old A2 learners in a state school, an inductive, context-rich presentation is more suitable: abstract rules about 'connection with now' are cognitively demanding, and teenagers respond better to meaningful contexts and discovery. Using a story or personal questions ('Have you ever…?'), learners notice the form (Schmidt's noticing) and build implicit knowledge through meaningful use. A purely inductive approach may leave some learners unsure, so the teacher should consolidate with a simple explicit summary and timeline — explicit knowledge can facilitate later acquisition (Ellis's interface position). Exam orientation of the school also justifies a clear written rule. Limitation: guided discovery needs careful staging and more time than a short explanation.",
        "With a mixed-level B2 IELTS group, a test-teach-test or inductive approach is efficient: many learners already partially know reported speech, so a diagnostic task reveals what each needs (avoiding re-teaching what they know). Learners then analyse examples from authentic texts (news, academic reports), noticing reporting verbs and tense backshift and the fact that backshift is optional when the situation is still true — this is more accurate than the simplified coursebook rule. Explicit focus (deductive) is useful for weaker members, so a brief rule summary after discovery supports them. Theory: focus on form within meaningful input (Long) and noticing (Schmidt). Limitation: mixed levels require differentiated practice afterwards.",
      ],
    },
    apply: { task: "In your teaching practice (or a peer-teaching session) clarify one grammar structure using a marker sentence, a timeline and at least two CCQs. Write down the CCQs you used and how learners answered.", hint: T("Если нет практики — объясните структуру одногруппнику и запишите его ответы на CCQs.") },
  },

  // ==================== 3 ====================
  3: {
    glossary: [
      ["Lexis", "лексика", "Vocabulary, including single words, multi-word items and chunks."],
      ["Collocation", "коллокация", "Words that frequently go together: heavy rain, make a decision."],
      ["Chunk / lexical phrase", "лексический блок", "A multi-word unit stored and used as a whole: by the way."],
      ["Phrasal verb", "фразовый глагол", "Verb + particle with a new meaning: give up, look after."],
      ["Idiom", "идиома", "An expression whose meaning is not the sum of its words: break the ice."],
      ["Prefix / suffix", "приставка / суффикс", "Added before/after a base to make a new word: un-, -ness."],
      ["Compound", "сложное слово", "A word made of two or more words: bookshop, well-known."],
      ["Synonym / antonym", "синоним / антоним", "Word with similar / opposite meaning."],
      ["Hyponym / superordinate", "гипоним / гипероним", "Specific word (tulip) / general category (flower)."],
      ["Connotation", "коннотация", "Positive, negative or cultural associations of a word."],
      ["Register", "регистр", "Level of formality: kids / children / offspring."],
      ["False friend", "ложный друг переводчика", "A word similar to an L1 word but with a different meaning: 'magazine' ≠ магазин."],
      ["Lexical set", "лексическая группа", "Words from one topic: kitchen equipment."],
      ["Word family", "словообразовательное гнездо", "Words from one root: employ, employer, employment."],
      ["Realia", "реальные предметы", "Real objects used to show meaning."],
    ],
    confuse: [
      { a: "Collocation", b: "Idiom", diff: "A collocation is a frequent combination with transparent meaning; an idiom's meaning cannot be guessed from its words.", ex: "'heavy rain' (collocation) vs 'it's raining cats and dogs' (idiom)." },
      { a: "Denotation", b: "Connotation", diff: "Denotation is the core meaning; connotation is the attitude or association.", ex: "'cheap' and 'inexpensive' — same denotation, 'cheap' can suggest low quality." },
      { a: "Synonym", b: "Hyponym", diff: "Synonyms have similar meaning on the same level; a hyponym is a more specific member of a category.", ex: "big/large — synonyms; oak is a hyponym of tree." },
      { a: "Prefix", b: "Suffix", diff: "A prefix usually changes meaning; a suffix often changes the part of speech.", ex: "happy → unhappy (meaning); happy → happiness (adjective → noun)." },
    ],
    exam: [
      { type: "match", instructions: "For questions 1–5, match the underlined words with the lexical terms A–F. There is one extra option.",
        options: [["A", "collocation"], ["B", "phrasal verb"], ["C", "compound noun"], ["D", "false friend for Russian speakers"], ["E", "idiom"], ["F", "suffix"]],
        items: [
          { text: "He finally <u>gave up</u> smoking.", answer: "B", why: "Verb + particle with a new meaning." },
          { text: "We need to <u>make a decision</u> today.", answer: "A", why: "A frequent verb + noun combination." },
          { text: "I bought it in a <u>bookshop</u>.", answer: "C", why: "Two nouns forming one word." },
          { text: "Don't worry, the test was <u>a piece of cake</u>.", answer: "E", why: "Meaning (very easy) is not the sum of the words." },
          { text: "She reads a fashion <u>magazine</u> every month.", answer: "D", why: "Looks like Russian 'магазин' (shop) but means a periodical." },
        ] },
      { type: "mcq3", instructions: "For questions 6–10, choose the correct answer A, B or C.",
        items: [
          { text: "Which word is a superordinate for the others: 'hammer, saw, screwdriver, tool'?", opts: ["tool", "hammer", "saw"], answer: 0, exp: "'tool' is the general category; the others are hyponyms." },
          { text: "Which technique is most suitable for conveying the meaning of 'whisper'?", opts: ["A written definition", "Miming and demonstrating with your voice", "Translating the word into English synonyms"], answer: 1, exp: "Actions and sounds are best shown by demonstration." },
          { text: "In which pair does the suffix change a verb into a noun?", opts: ["happy → happiness", "employ → employment", "quick → quickly"], answer: 1, exp: "employ (verb) → employment (noun). The others change an adjective." },
          { text: "Which is NOT a good reason for a learner to record vocabulary in chunks?", opts: ["Chunks show how words are used together", "Chunks are always shorter and simpler than single words", "Chunks help learners speak more fluently"], answer: 1, exp: "Chunks are multi-word units, so they are longer, not shorter." },
          { text: "'Slender' and 'skinny' differ mainly in…", opts: ["connotation", "word class", "pronunciation of the stressed syllable"], answer: 0, exp: "Both mean thin; 'slender' is positive and 'skinny' often negative." },
        ] },
    ],
    deltaTerms: [
      { def: "A word whose meaning is broader and includes the meanings of more specific words, e.g. 'vehicle' in relation to 'car' and 'bus'.", accept: ["superordinate", "hypernym", "superordinate term"] },
      { def: "A word in a second language that looks or sounds similar to a word in the learner's first language but has a different meaning.", accept: ["false friend", "false friends", "false cognate", "false cognates"] },
      { def: "A group of words related by topic, e.g. words for kitchen equipment, often taught together.", accept: ["lexical set", "lexical sets", "semantic set", "semantic field"] },
    ],
    models: {
      CELTA: [
        "Pre-teach only words needed for the task: 'commute' and 'resident' (they appear in the gist question). Leave 'sensor', 'efficient', 'sustainable', 'traffic jam' for guessing from context or post-reading focus.\ncommute (v/n) — meaning: travel regularly between home and work. Convey: picture of crowded morning bus + context 'I commute to work by bus; it takes 40 minutes'. CCQs: Do you do it once or every day? (Every day) Is it a holiday trip? (No) Stress: comMUTE.\nresidents — people who live in a place. Convey: 'The residents of our building had a meeting.' CCQs: Do they work here or live here? (Live) Are tourists residents? (No) Stress: REsidents /ˈrezɪdənts/.\nDrill chorally and individually; note collocations: daily commute, local residents.",
        "Pre-teach 'flexible' and 'isolation' (needed to understand the writer's main argument); 'colleague', 'deadline' are probably known; 'productivity' and 'distraction' can be guessed from context and analysed after reading.\nflexible — can change easily; here 'flexible hours'. Convey: contrast two timetables (fixed 9–6 vs start any time). CCQs: Can you choose when you start? (Yes) Is it always the same time? (No) Stress: FLEXible.\nisolation — being alone, without contact with others. Convey: picture of a person working alone at home + 'She works from home and feels isolated'. CCQs: Does she see colleagues? (No) Is it usually a positive feeling? (No) Stress: isoLAtion; word family: isolated, isolate.\nNote collocations: flexible working hours, feel isolated.",
        "Pre-teach 'affordable' and 'landfill' — both are essential for the main idea (cheap clothes end up as waste). 'Trend', 'label', 'second-hand' are probably known or guessable; 'waste' is known.\naffordable — cheap enough for people to buy. Convey: two price tags ($15 vs $500) for a T-shirt. CCQs: Can most students buy it? (Yes) Is it very expensive? (No) Stress: afFORDable; suffix -able.\nlandfill — a place where rubbish is buried in the ground. Convey: photo. CCQs: Is it for recycling? (No) Does rubbish stay there for a long time? (Yes) Stress: LANDfill (compound noun).\nAfter reading: collocation focus — follow a trend, second-hand clothes, designer label.",
      ],
      DELTA: [
        "Selection for hotel receptionists (A2–B1, 10 hours) should start with a needs analysis: observing or interviewing receptionists to identify key situations (check-in, phone bookings, complaints, directions). Within these, priority goes to high-frequency, high-utility chunks rather than isolated words — 'Could I have your passport, please?', 'Your room is on the third floor', 'I'm afraid we're fully booked' (Lewis's Lexical Approach; Nattinger and DeCarrico on lexical phrases). Frequency can be checked against the English Vocabulary Profile to keep items within A2–B1. Semantically close sets (single/double/twin room) should be introduced with clear contrast or separated across lessons, because teaching synonyms together can cause interference (Tinkham, Nation). Each item should be recycled at least 6–8 times across the course through role-plays.",
        "For 3rd-year students aiming at IELTS 6.5, priority goes to the Academic Word List (Coxhead), because AWL items cover about 10% of academic texts and are directly useful for Reading and Writing Task 2. Selection within the AWL should follow the topics frequent in IELTS (education, environment, technology) and learners' gaps, identified through a vocabulary size or levels test (Nation and Beglar). Teaching should focus on collocations and word families (analyse, analysis, analytical; 'conduct research'), since Lexical Resource rewards precision and collocation, not rare words. Planned recycling — spaced retrieval and productive use in essays — is necessary because one exposure is not enough for acquisition.",
        "For future primary teachers, the most useful lexis is classroom language: instructions, praise, management and feedback chunks ('Line up, please', 'Swap with your partner', 'Well done, that's much better'). Selection is based on a needs analysis of real primary lessons (observation and recording of teachers) rather than general frequency lists, because the genre is specific. Chunks are prioritised over single words (Lexical Approach), with attention to pronunciation and intonation, since teachers model language for young learners. Items should be practised in micro-teaching, which provides immediate contextualised use, and recycled through a personal 'classroom language' log.",
      ],
    },
    apply: { task: "Choose a text you will use (or would use) with learners. Mark all unknown words, then decide which 3–4 you would pre-teach and which learners can guess. For one word, write how you would convey meaning and two CCQs.", hint: T("Можно взять текст из раздела Reading на сайте.") },
  },

  // ==================== 4 ====================
  4: {
    glossary: [
      ["Phoneme", "фонема", "The smallest sound unit that distinguishes meaning."],
      ["Phonemic symbol", "фонетический символ", "A symbol for one phoneme, e.g. /ʃ/, /ə/."],
      ["Minimal pair", "минимальная пара", "Two words differing in one phoneme: ship/sheep."],
      ["Schwa /ə/", "шва, нейтральный звук", "The most common English vowel, in unstressed syllables."],
      ["Diphthong", "дифтонг", "A vowel that glides from one sound to another: /aɪ/ in 'my'."],
      ["Voiced / unvoiced", "звонкий / глухой", "With or without vocal cord vibration: /v/ vs /f/."],
      ["Word stress", "словесное ударение", "The strongest syllable in a word."],
      ["Sentence stress", "фразовое ударение", "Stressed content words in an utterance."],
      ["Weak form", "редуцированная форма", "Unstressed pronunciation of function words: /tə/ for 'to'."],
      ["Linking", "связывание", "Joining words in speech: an‿apple."],
      ["Elision", "элизия (выпадение звука)", "A sound disappears: nex(t) week."],
      ["Assimilation", "ассимиляция", "A sound changes because of its neighbour: ten boys /tem/."],
      ["Intonation", "интонация", "Pitch movement showing meaning and attitude."],
      ["Contraction", "стяжённая форма", "Shortened form: I'm, won't."],
      ["Drilling", "дриллинг, отработка", "Controlled repetition, choral or individual."],
    ],
    confuse: [
      { a: "Weak form", b: "Contraction", diff: "A weak form is a reduced pronunciation of the same word; a contraction changes the written form too.", ex: "'can' → /kən/ (weak form); 'cannot' → 'can't' (contraction)." },
      { a: "Elision", b: "Assimilation", diff: "In elision a sound disappears; in assimilation a sound changes.", ex: "'nex(t) door' — elision; 'gree/m/ park' (green park) — assimilation." },
      { a: "Word stress", b: "Sentence stress", diff: "Word stress is fixed for a word; sentence stress depends on what the speaker wants to emphasise.", ex: "PHOtograph always; 'I didn't take the PHOTO' vs 'I didn't TAKE the photo'." },
      { a: "Phoneme", b: "Letter", diff: "Letters are spelling; phonemes are sounds. One letter can represent several sounds and vice versa.", ex: "'ough' in though /əʊ/, through /uː/, cough /ɒf/." },
    ],
    exam: [
      { type: "match", instructions: "For questions 1–5, match the examples with the features of pronunciation A–F. There is one extra option.",
        options: [["A", "linking"], ["B", "elision"], ["C", "assimilation"], ["D", "weak form"], ["E", "diphthong"], ["F", "minimal pair"]],
        items: [
          { text: "'Fish and chips' — 'and' pronounced /ən/", answer: "D", why: "Reduced, unstressed function word." },
          { text: "'Last night' pronounced /lɑːs naɪt/", answer: "B", why: "The /t/ disappears." },
          { text: "'Good boy' pronounced /ɡʊb bɔɪ/", answer: "C", why: "/d/ changes to /b/ before /b/." },
          { text: "'live' and 'leave'", answer: "F", why: "Two words differing in one phoneme /ɪ/–/iː/." },
          { text: "'Turn‿off the light'", answer: "A", why: "Final consonant joins the next vowel." },
        ] },
      { type: "mcq3", instructions: "For questions 6–10, choose the correct answer A, B or C.",
        items: [
          { text: "Which word has the stress on the second syllable?", opts: ["comfortable", "important", "interesting"], answer: 1, exp: "imPORtant; COMfortable and INteresting are stressed on the first syllable." },
          { text: "Which word contains a diphthong?", opts: ["cat", "boat", "sit"], answer: 1, exp: "'boat' /bəʊt/ has a diphthong; the others have pure vowels." },
          { text: "A teacher says a word and learners hold up card 1 or 2 depending on which word they hear. This is…", opts: ["a minimal pair discrimination task", "a backchaining drill for the two words", "an intonation recognition task"], answer: 0, exp: "Learners distinguish two similar sounds — minimal pair discrimination." },
          { text: "In a yes/no question like 'Are you ready?' the intonation usually…", opts: ["rises at the end", "falls at the end", "stays completely flat"], answer: 0, exp: "Neutral yes/no questions typically have a rising tone." },
          { text: "Which sound is UNVOICED?", opts: ["/v/", "/z/", "/s/"], answer: 2, exp: "/s/ is unvoiced; /v/ and /z/ are voiced." },
        ] },
    ],
    deltaTerms: [
      { def: "Two words that differ in only one phoneme, used to practise discrimination between sounds, e.g. 'bad' and 'bed'.", accept: ["minimal pair", "minimal pairs"] },
      { def: "The reduced pronunciation of a grammatical word when unstressed, usually with the vowel /ə/, e.g. 'was' as /wəz/.", accept: ["weak form", "weak forms"] },
      { def: "A vowel sound in which the tongue glides from one position to another within one syllable, e.g. /aɪ/ in 'time'.", accept: ["diphthong", "diphthongs"] },
    ],
    models: {
      CELTA: [
        "Model naturally at normal speed: 'Would you like to come to my party?' Highlight on the board: /wʊdʒə/ — 'would you' linked with assimilation /d/+/j/ → /dʒ/; 'to' weak /tə/ twice; stress on LIKE, COME, PARty; rising or rise-fall intonation for an invitation. Drill: choral ×2, then backchaining — 'party?' → 'my party?' → 'come to my party?' → 'like to come to my party?' → full sentence; then individual drilling (5–6 learners), correcting with finger-linking and gesture for intonation. Check: open pairs — A invites, B accepts ('I'd love to!'), then closed pairs with their own events. Watch for /vud/ and flat intonation that sounds rude.",
        "Model: 'I should have told you earlier.' Highlight: 'should have' → /ʃʊdəv/ (weak 'have' /əv/), sometimes /ʃʊdə/; stress on TOLD and EARlier; falling intonation expressing regret. Mark /əv/ above 'have' and a linking arc 'should‿have'. Drill: back-chain 'earlier' → 'told you earlier' → 'should have told you earlier' → full sentence; choral then individual. Check: mini-situations on cards ('You forgot your friend's birthday') — learners respond with 'I should have…'. Anticipated problem: learners pronounce full /hæv/ and stress 'should'; also confusion with written 'should of' in later work — point out the written form.",
        "Model: 'How long have you been waiting?' Highlight: 'have you' /həvjə/, 'been' weak /bɪn/, stress on LONG and WAITing; falling intonation (wh-question). Show weak forms with /ə/ and linking arc 'have‿you'. Drill: backchain 'waiting' → 'been waiting' → 'have you been waiting' → full question; choral, then individual. Practise the answer 'For about twenty minutes' with stress on TWENty MINutes. Check: role-play at a bus stop, learners ask and answer with different times. Anticipated problems: rising intonation as in yes/no questions; pronouncing 'been' as /biːn/ with stress.",
      ],
      DELTA: [
        "/θ/ and /ð/ do not exist in Russian or Kazakh, so learners substitute /s/, /z/, /t/, /d/ or /f/. However, in Jenkins's Lingua Franca Core these sounds are not essential for international intelligibility, as substitutions rarely cause misunderstanding. The /w/–/v/ distinction is more important: Russian has no /w/, so 'west' and 'vest', 'wine' and 'vine' merge, and context does not always disambiguate. Priority: receptive awareness of /θ/ and /ð/ (to recognise them in listening), but productive priority for /w/–/v/ through lip-rounding demonstration and minimal pairs. For future teachers who will model pronunciation, accurate /θ/–/ð/ remains a reasonable goal, which shows that priorities depend on learners' purposes.",
        "Russian and Kazakh are closer to syllable-timed rhythm (though Russian has reduction), so learners give every syllable similar weight and pronounce function words in full, which makes speech sound heavy and also makes connected English hard to decode in listening. Weak forms and stress-timing are less central for production in the Lingua Franca Core (which treats weak forms as non-core), but nuclear stress placement is core because it carries meaning. Priorities: (1) receptive work on weak forms — dictation and gap-fill with function words — to improve listening, which is critical for IELTS; (2) productive focus on nuclear/sentence stress for meaning; (3) weak forms in production for learners who need a native-like model, such as future teachers.",
        "Russian has no phonemic vowel length, so /iː/–/ɪ/ and /uː/–/ʊ/ merge ('sheep/ship', 'pool/pull'); Kazakh also lacks the length contrast. Final voiced consonants are devoiced in Russian ('bad' sounds like 'bat'), which removes an important cue: in English the vowel before a voiced consonant is longer. Both features are part of the Lingua Franca Core (vowel length contrasts and the fortis/lenis distinction), because they affect intelligibility. Priorities: productive work with minimal pairs and the 'longer vowel before voiced consonant' rule; also receptive discrimination tasks. Teaching should use contrastive analysis to explain why the errors occur, which helps adult learners monitor themselves.",
      ],
    },
    apply: { task: "Record yourself (phone voice memo) reading 3 sentences from an IELTS Listening transcript. Listen and mark where you used full forms instead of weak forms and whether your stress was on content words. Write two things to work on.", hint: T("Транскрипты есть в разделе Listening после проверки ответов.") },
  },

  // ==================== 5 ====================
  5: {
    glossary: [
      ["Motivation (intrinsic / extrinsic)", "внутренняя / внешняя мотивация", "Interest in the activity itself / external reasons such as grades or a job."],
      ["Integrative / instrumental", "интегративная / инструментальная", "Wish to join a language community / practical goals."],
      ["Learner autonomy", "автономия учащегося", "Ability to take responsibility for one's own learning."],
      ["Learner needs", "потребности учащегося", "What learners need English for and what they lack."],
      ["Needs analysis", "анализ потребностей", "Questionnaires, interviews or tests to find out learners' needs."],
      ["Interlanguage", "промежуточный язык", "The learner's developing system between L1 and the target language."],
      ["Fossilisation", "фоссилизация", "Errors that become permanent and stop developing."],
      ["L1 interference / transfer", "интерференция родного языка", "Influence of the first language on the second."],
      ["Overgeneralisation", "сверхгенерализация", "Applying a rule too widely: 'goed', 'childs'."],
      ["Error / mistake (slip)", "ошибка / оговорка", "Systematic gap in knowledge / momentary lapse."],
      ["Silent period", "период молчания", "Time when learners, especially children, listen before speaking."],
      ["Comprehensible input", "понятный входной материал", "Language slightly above the learner's level (Krashen's i+1)."],
      ["Affective filter", "аффективный фильтр", "Anxiety or low motivation that blocks input from being acquired."],
      ["Zone of proximal development", "зона ближайшего развития", "What a learner can do with help but not yet alone (Vygotsky)."],
      ["Translanguaging", "транслингвизм", "Using all of a learner's languages as resources for learning."],
    ],
    confuse: [
      { a: "Error", b: "Mistake", diff: "An error is systematic — the learner doesn't know the form. A mistake is a slip the learner can correct.", ex: "'I am agree' every time (error) vs 'He go… goes' (mistake)." },
      { a: "L1 transfer", b: "Overgeneralisation", diff: "Transfer comes from the first language; overgeneralisation comes from applying an English rule too widely.", ex: "'It depends of…' (transfer from 'зависит от') vs 'I buyed' (overgeneralisation)." },
      { a: "Intrinsic", b: "Instrumental", diff: "Intrinsic is about enjoying learning itself; instrumental is about a practical goal. A learner can have both.", ex: "Reading novels for pleasure (intrinsic) vs learning English for promotion (instrumental)." },
      { a: "Learning styles", b: "Learner differences", diff: "Learner differences (age, aptitude, anxiety, needs) clearly affect learning; matching teaching to a single 'learning style' is not supported by evidence.", ex: "Plan for different levels and needs, but vary input for everyone instead of 'visual-only' tasks for 'visual learners'." },
    ],
    exam: [
      { type: "match", instructions: "For questions 1–5, match the learner errors with their most likely cause A–F. There is one extra option.",
        options: [["A", "L1 transfer of word order"], ["B", "overgeneralisation of the past tense rule"], ["C", "L1 transfer of a preposition"], ["D", "overgeneralisation of the plural rule"], ["E", "a slip the learner self-corrects"], ["F", "teaching-induced overuse of a structure"]],
        items: [
          { text: "'He is married on my sister.'", answer: "C", why: "Copies the Russian preposition in 'женат на'; English uses 'married to'." },
          { text: "'She teached us French.'", answer: "B", why: "Regular -ed applied to an irregular verb." },
          { text: "'Very I like football.'", answer: "A", why: "Word order transferred from the first language." },
          { text: "'They was — sorry, they were late.'", answer: "E", why: "The learner knows the form and corrects it immediately." },
          { text: "After a week of present continuous practice: 'I am knowing him for years.'", answer: "F", why: "Over-practice of one form leads to its overuse." },
        ] },
      { type: "mcq3", instructions: "For questions 6–10, choose the correct answer A, B or C.",
        items: [
          { text: "A learner keeps making the same error for years despite correction. This is called…", opts: ["fossilisation", "the silent period", "interlanguage transfer"], answer: 0, exp: "Errors that stop developing are fossilised." },
          { text: "According to Krashen, why might an anxious learner acquire less?", opts: ["Anxiety raises the affective filter, so less input becomes intake", "Anxiety makes learners produce output too quickly to monitor it", "Anxiety reduces the amount of input the teacher gives in class"], answer: 0, exp: "The affective filter hypothesis links anxiety with blocked input." },
          { text: "Which activity best supports learner autonomy?", opts: ["Learners set personal goals and keep a learning log", "Learners copy the teacher's notes into their notebooks", "The teacher corrects every error in homework in red"], answer: 0, exp: "Goal-setting and reflection build responsibility for learning." },
          { text: "Which is the best example of scaffolding within the ZPD?", opts: ["Giving sentence starters until learners can write the paragraph alone", "Doing most of the task for weaker learners so that they can finish on time", "Giving the same task to all learners without any support or examples"], answer: 0, exp: "Temporary support that is gradually removed." },
          { text: "Young learners who understand a lot but rarely speak in the first months are probably…", opts: ["going through a silent period", "showing signs of fossilisation", "suffering from L1 interference"], answer: 0, exp: "The silent period is a normal stage of comprehension before production." },
        ] },
    ],
    deltaTerms: [
      { def: "The process by which incorrect forms in a learner's language become permanent and resistant to further development.", accept: ["fossilisation", "fossilization", "fossilised errors"] },
      { def: "The application of a target-language rule to cases where it does not apply, e.g. 'mouses', 'goed'.", accept: ["overgeneralisation", "overgeneralization", "over-generalisation", "over-generalization", "overregularisation", "overregularization"] },
      { def: "Krashen's term for emotional factors such as anxiety that prevent input from being acquired.", accept: ["affective filter", "the affective filter"] },
    ],
    models: {
      CELTA: [
        "Background: Aizhan, 35, accountant, B1, studied English at school and university; now needs it for online meetings with foreign partners. Motivation: instrumental and strong — her job depends on it. Strengths: good reading (she reads financial documents), solid grammar knowledge in written tests. Weaknesses: anxiety when speaking, long pauses, avoids speaking in class; limited functional language for meetings (interrupting, clarifying, agreeing). Ways to help: (1) give planning time and rehearsal before speaking tasks — e.g. prepare a 1-minute update on a project in pairs before reporting to the class, which reduces anxiety and improves fluency; (2) teach and practise meeting chunks ('Sorry to interrupt, but…', 'Could you clarify…?') in a realistic online-meeting role-play, gradually increasing the unpredictability of the task.",
        "Background: Daniyar, 16, A2+, a gamer who uses English with international players. Motivation: integrative and intrinsic (gaming community), weak extrinsic motivation for school. Strengths: fluent, confident speaking; good listening to informal speech; wide informal vocabulary. Weaknesses: inaccurate grammar (verb forms, articles: 'He go yesterday', 'I need new keyboard'), very weak writing — short, unorganised texts with no punctuation. Ways to help: (1) connect accuracy work to his interests — e.g. writing a game review or tutorial for an online forum with a model text and a checklist, so writing has a real audience; (2) use delayed correction after fluent speaking tasks: note his errors and ask him to correct them himself, building awareness without killing his fluency.",
        "Background: Galina, 50, B1, learned English through grammar-translation at school; wants to talk to grandchildren in Canada. Motivation: integrative and emotional — very strong. Strengths: good knowledge of grammar rules and reading; disciplined learner. Weaknesses: slow, translated speech; difficulty understanding fast, informal English, especially children's speech; she expects explicit rules and feels uncomfortable with 'free' tasks. Ways to help: (1) use authentic or semi-authentic recordings of family video calls and teach listening strategies (gist first, then key words), plus informal chunks such as 'How's it going?'; (2) combine her preference for explicit explanation with short, structured speaking practice — a brief rule, then a guided role-play of a call with her grandchildren, so she sees the purpose of communicative activities.",
      ],
      DELTA: [
        "In a Kazakh–Russian state school class (A2, 14-year-olds), learners share two languages, which makes purposeful L1 use efficient. Following Cook's notion of multicompetence, learners' L1s are part of their linguistic repertoire rather than an obstacle, and translanguaging research (García) shows that drawing on all languages supports understanding and participation, especially at low levels. Useful functions: clarifying abstract meanings, comparing structures that cause transfer errors (articles, 'depends of'), checking complex instructions and building rapport. However, input is limited outside class, so English must remain the main medium (Krashen's input hypothesis; Turnbull suggests maximising target language use). Principled position: English by default, L1 for specific, planned purposes, and learners encouraged to move from L1 to English (e.g. brainstorming in L1, reporting in English).",
        "Adults in a monolingual B2 group who want 'English only' have a legitimate belief: at B2, they can cope with English explanations, and they paid for maximum exposure. Input research (Krashen) and the communicative tradition support extensive target-language use. Yet total exclusion of L1 ignores useful functions: quick translation of a subtle word, contrastive analysis of persistent L1-based errors and noticing differences (Cook; Macaro's 'optimal use'). Principled position: respect learners' beliefs and agree a class policy — English for all communication, L1 only when the teacher uses it deliberately for contrast or precision (e.g. comparing Russian and English aspect), and learners are told why. This balances learner expectations with research on L1 as a cognitive tool.",
        "For future English teachers (B2–C1), L1 use has a professional dimension: in their future classrooms, especially in Kazakhstan's trilingual policy context, they will need to decide when to use Kazakh or Russian. Teacher education therefore should model principled use and make it an object of reflection. Research positions — 'English only' (input-based arguments), Cook's multicompetence and translanguaging pedagogy (García, Wei) — can be discussed explicitly. In my position, the course should be conducted mainly in English to develop their own proficiency (most need C1 for certification), while occasional L1 is used for contrastive analysis and terminology (e.g. aspect vs вид), and students analyse their own L1 use in micro-teaching recordings.",
      ],
    },
    apply: { task: "During your teaching practice (or in your own group), collect 5 errors learners make when speaking. For each, decide: error or mistake? L1 transfer or overgeneralisation? Write them in a table.", hint: T("Если вы не преподаёте — соберите ошибки одногруппников в обсуждении или из своих записей Speaking на сайте.") },
  },

  // ==================== 6 ====================
  6: {
    glossary: [
      ["Receptive skills", "рецептивные навыки", "Reading and listening."],
      ["Gist", "общее содержание", "The main idea of a text."],
      ["Skimming", "просмотровое чтение", "Reading quickly for gist."],
      ["Scanning", "поисковое чтение", "Looking quickly for specific information."],
      ["Intensive / extensive reading", "интенсивное / экстенсивное чтение", "Close study of a short text / reading a lot for pleasure."],
      ["Inference", "умозаключение", "Understanding what is implied but not stated."],
      ["Schema (pl. schemata)", "схема, фоновые знания", "Background knowledge that helps understanding."],
      ["Top-down / bottom-up", "сверху вниз / снизу вверх", "Using context and knowledge / decoding words and sounds."],
      ["Prediction", "прогнозирование", "Guessing content before reading or listening."],
      ["Deducing meaning from context", "догадка о значении из контекста", "Working out an unknown word from surrounding text."],
      ["Authentic text", "аутентичный текст", "A text not written for language learners."],
      ["Graded reader", "адаптированная книга", "A book simplified for a particular level."],
      ["Text structure", "структура текста", "How a text is organised: paragraphs, topic sentences, cohesion."],
      ["Lead-in", "вводный этап", "Opening stage that creates interest and activates schema."],
      ["Feedback (on a task)", "проверка задания", "Checking answers with the class, ideally with reference to the text."],
    ],
    confuse: [
      { a: "Skimming", b: "Scanning", diff: "Skimming is for the general idea; scanning is for a specific detail (a name, number, date).", ex: "Choose the best title (skimming) vs find the price of a ticket (scanning)." },
      { a: "Reading for detail", b: "Scanning", diff: "Scanning finds one item quickly; reading for detail means understanding everything in a section carefully.", ex: "Find the date (scan) vs explain the three steps of the process (detail)." },
      { a: "Top-down", b: "Bottom-up", diff: "Top-down starts from knowledge and context; bottom-up starts from sounds, letters and words.", ex: "Predicting a dialogue at a doctor's (top-down) vs distinguishing 'can' and 'can't' (bottom-up)." },
      { a: "Intensive", b: "Extensive", diff: "Intensive = short text, careful study, often with tasks; extensive = large amounts of easy text for pleasure and fluency.", ex: "Analysing an IELTS passage vs reading a graded reader at home." },
    ],
    exam: [
      { type: "match", instructions: "For questions 1–5, match the tasks with the subskills A–F they mainly practise. There is one extra option.",
        options: [["A", "skimming for gist"], ["B", "scanning for specific information"], ["C", "inferring attitude"], ["D", "deducing meaning from context"], ["E", "understanding text structure"], ["F", "listening for detail"]],
        items: [
          { text: "Put the jumbled paragraphs of the article in the correct order.", answer: "E", why: "Requires attention to cohesion and organisation." },
          { text: "Find out how many people attended the festival.", answer: "B", why: "One specific number." },
          { text: "Decide whether the writer is for or against the new law.", answer: "C", why: "The attitude is often implied." },
          { text: "Read the text in two minutes and choose the best headline.", answer: "A", why: "Quick reading for the main idea." },
          { text: "Work out what 'thrive' means from the sentences around it.", answer: "D", why: "Using context to guess meaning." },
        ] },
      { type: "mcq3", instructions: "For questions 6–10, choose the correct answer A, B or C.",
        items: [
          { text: "What is the main purpose of a lead-in before a listening?", opts: ["To activate schema and create interest", "To check the answers of the detail task", "To practise the target grammar in a drill"], answer: 0, exp: "The lead-in prepares learners for the content." },
          { text: "Which is the best feedback technique after a detail reading task?", opts: ["Learners justify answers by pointing to lines in the text", "The teacher reads out all the correct answers quickly to save time", "Learners swap papers and give each other a mark out of ten"], answer: 0, exp: "Referring to the text shows why answers are correct." },
          { text: "Which activity is an example of extensive reading?", opts: ["Learners read a graded reader of their choice at home", "Learners underline all the past tenses in a paragraph", "Learners answer ten detailed questions on a short text"], answer: 0, exp: "Extensive reading is large-volume reading for pleasure." },
          { text: "Why do teachers often ask learners to compare answers in pairs before feedback?", opts: ["It builds confidence and lets learners teach each other", "It reduces the time learners spend listening to the recording", "It makes the task easier for the teacher to mark at the end"], answer: 0, exp: "Peer checking lowers anxiety and promotes discussion." },
          { text: "Which task focuses MOST on bottom-up listening?", opts: ["Dictation of a short sentence with weak forms", "Predicting the topic from the first sentence", "Discussing the speaker's opinion after listening"], answer: 0, exp: "Dictation focuses on decoding sounds and words." },
        ] },
    ],
    deltaTerms: [
      { def: "Background knowledge structures that readers and listeners use to interpret a text.", accept: ["schema", "schemata", "schemas", "schema theory"] },
      { def: "Reading large quantities of relatively easy material, mainly for pleasure and general understanding.", accept: ["extensive reading"] },
      { def: "Processing that builds understanding from the smallest units — sounds, letters, words — upwards.", accept: ["bottom-up processing", "bottom up", "bottom-up", "bottom-up listening", "bottom-up reading"] },
    ],
    models: {
      CELTA: [
        "Main aim: learners will be better able to listen for specific information in a phone conversation about booking a course.\n1. Lead-in (4 min, T–S, S–S): photos of evening courses; pairs discuss which they'd take — aim: interest, activate schema.\n2. Pre-teach 2 blocking words (4 min, T–S): 'deposit', 'enrol' — elicitation, CCQs, drilling.\n3. Gist (5 min, individual → pairs): 'Which course does the caller book?' choose from three pictures; peer check — aim: general understanding.\n4. Detail (10 min, individual → pairs): complete the booking form (name spelling, dates, price) — the Section 1 skill; second listening; peer check.\n5. Feedback (5 min, T–S): learners give answers, teacher shows the transcript lines; highlight spelling of letters and numbers that caused problems.\n6. Post-listening (10 min, S–S): role-play — booking a course at a local centre, using the form.\n7. Delayed error feedback (2 min).",
        "Main aim: learners will be better able to follow directions and descriptions of places in a talk (map labelling).\n1. Lead-in (4 min, pairs): describe the way from the university to the library — aim: activate language of location.\n2. Pre-teach 3 items (5 min): 'opposite', 'next to', 'at the far end' with a board map; CCQs.\n3. Gist (4 min, individual): 'What kind of place is being described?' (sports centre / museum / park) — peer check.\n4. Prediction (3 min, pairs): look at the map and predict what might be in each blank area.\n5. Detail (10 min): label the map; listen twice; peer check with the map.\n6. Feedback (6 min): learners justify with words they heard; teacher plays key extracts again, focusing on prepositions of place.\n7. Post-listening (8 min, pairs): A describes a map of a local facility, B draws it.",
        "Main aim: learners will be better able to follow the structure of an academic lecture and complete notes.\n1. Lead-in (5 min, groups): what do you know about the topic? — aim: schema.\n2. Signposting language (6 min, T–S): elicit/teach 'Firstly…', 'Let's move on to…', 'To sum up…' — learners need these to follow structure.\n3. Gist (5 min, individual): listen to the introduction only and order the 3 sub-topics the lecturer will cover — peer check.\n4. Detail (12 min): complete lecture notes (one word and/or a number), then peer check, second listening for difficult gaps.\n5. Feedback (6 min): transcript highlighting signposting and paraphrases of the answers.\n6. Post-listening (6 min, pairs): summarise the lecture orally using the notes.",
      ],
      DELTA: [
        "For a university group preparing for IELTS Listening 6.5, the traditional comprehension approach — listen, answer questions, check — mainly tests listening rather than teaching it (Field). Practising IELTS question types (skills-based) is necessary to develop exam familiarity and subskills such as listening for specific information. However, many errors in Sections 3–4 come from decoding problems: weak forms, connected speech, unfamiliar word boundaries. I would combine exam-task practice with a process approach: (1) bottom-up micro-listening — dictation of short extracts and analysis of why an answer was missed; (2) strategy training (Vandergrift's metacognitive cycle: planning, monitoring, evaluating) — predicting answer types, recognising paraphrase. Limitation: strategy training effects take time; with four months, the balance should favour diagnostic work on the learners' actual errors.",
        "For A2 adults who 'understand nothing' when people speak fast, the main problem is decoding, not comprehension strategies: they may know the words in writing but not recognise them in connected speech. A skills-based lesson with gist and detail questions would only confirm their failure. Field's process approach suggests teaching listening by working on its component processes: recognising weak forms, word boundaries and common chunks. Activities: dictation of short phrases, gap-fills of function words, comparing slow and natural versions of the same sentence. Top-down strategies (prediction, using context) can compensate, but at A2 they cannot replace decoding. I would use short, authentic-like recordings with transcripts and repeated listening, which also lowers anxiety (affective filter).",
        "For B2 future teachers reading academic articles, a skills-based approach (skimming, scanning) is useful but insufficient: academic reading requires understanding argument structure, stance and hedging, and integrating information from several sources. A text-based approach — analysing how a research article is organised (abstract, method, discussion), how claims are hedged and how citations work — develops genre awareness (Swales) and transfers to their own academic writing. Extensive reading of methodology articles also builds vocabulary and fluency (Day and Bamford). I would combine text analysis with strategy training (previewing, note-making, summarising), because these learners must later teach reading strategies themselves.",
      ],
    },
    apply: { task: "Take one Reading or Listening module on the site that you have done as a learner. Write a short plan of how you would use it in class: a lead-in, one gist question, which detail task from the module, and a post-stage.", hint: T("Можно опереться на план CELTA из AI-практики этого урока.") },
  },

  // ==================== 7 ====================
  7: {
    glossary: [
      ["Productive skills", "продуктивные навыки", "Speaking and writing."],
      ["Accuracy / fluency", "точность / беглость", "Correct use of language / smooth communication of meaning."],
      ["Controlled / freer practice", "контролируемая / свободная практика", "Limited / open choice of language."],
      ["Information gap", "информационный пробел", "Learners have different information and must share it."],
      ["Opinion gap", "разница во мнениях", "Learners discuss different views to reach a decision."],
      ["Role-play", "ролевая игра", "Learners act out a situation in given roles."],
      ["Interactive strategies", "интерактивные стратегии", "Turn-taking, clarifying, interrupting, back-channelling."],
      ["Process writing", "процессный подход к письму", "Brainstorm, plan, draft, revise, edit."],
      ["Genre", "жанр", "A text type with a typical purpose and structure."],
      ["Coherence / cohesion", "связность / сцепление", "Logical organisation of ideas / linking devices."],
      ["Register", "регистр", "Appropriate level of formality for the reader."],
      ["Correction code", "код исправления", "Symbols marking error types for self-correction."],
      ["Task Response / Task Achievement", "выполнение задания", "IELTS Writing criterion for Task 2 / Task 1."],
      ["Long turn", "монологическое высказывание", "IELTS Speaking Part 2: one to two minutes alone."],
      ["Planning time", "время на подготовку", "Time to prepare before a speaking task."],
    ],
    confuse: [
      { a: "Coherence", b: "Cohesion", diff: "Coherence is about logical sense and organisation of ideas; cohesion is about linking devices (pronouns, linkers, reference).", ex: "A text can have many linkers (cohesion) but still be confusing (poor coherence)." },
      { a: "Information gap", b: "Opinion gap", diff: "An information gap has factual information to exchange; an opinion gap involves different views or preferences.", ex: "Find differences between two pictures vs decide which three items to take to a desert island." },
      { a: "Process", b: "Product", diff: "Product writing focuses on imitating a model and the final text; process writing focuses on the stages of producing it.", ex: "Copying the structure of a model letter vs writing two drafts with feedback." },
      { a: "Task Achievement", b: "Task Response", diff: "IELTS: Task Achievement for Task 1 (covering key features), Task Response for Task 2 (answering the question with developed ideas).", ex: "No overview in Task 1 lowers Task Achievement; an unclear position in Task 2 lowers Task Response." },
    ],
    exam: [
      { type: "match", instructions: "For questions 1–5, match the activities with their main focus A–F. There is one extra option.",
        options: [["A", "accuracy of form"], ["B", "fluency"], ["C", "cohesion in writing"], ["D", "interactive strategies"], ["E", "pronunciation"], ["F", "planning a piece of writing"]],
        items: [
          { text: "Learners join sentences using 'however', 'therefore' and 'which'.", answer: "C", why: "Linking devices = cohesion." },
          { text: "Learners practise phrases like 'Sorry, could you repeat that?' and 'What I mean is…'.", answer: "D", why: "Clarifying and repairing communication are interactive strategies." },
          { text: "Learners talk for two minutes without stopping about a holiday.", answer: "B", why: "The aim is continuous speaking." },
          { text: "Learners make a mind map of ideas before writing an essay.", answer: "F", why: "Generating and organising ideas." },
          { text: "Learners change sentences from active to passive.", answer: "A", why: "A controlled transformation exercise." },
        ] },
      { type: "mcq3", instructions: "For questions 6–10, choose the correct answer A, B or C.",
        items: [
          { text: "What is the main reason to set a clear outcome for a speaking task?", opts: ["Learners have a real purpose and know when they have finished", "The teacher can correct more errors during the speaking task", "Learners will use only the target structure of the lesson"], answer: 0, exp: "A clear outcome (decision, list, plan) gives purpose." },
          { text: "In IELTS Writing, which task has more weight in the final score?", opts: ["Task 1", "Task 2", "Both are weighted equally"], answer: 1, exp: "Task 2 counts twice as much as Task 1." },
          { text: "Which is the most appropriate response to a learner's fluent but inaccurate story during a freer speaking task?", opts: ["Note errors and deal with them after the task", "Stop the learner to correct every error", "Ignore the errors completely and never return to them"], answer: 0, exp: "Delayed correction preserves fluency while still addressing errors." },
          { text: "A learner's essay has good ideas, but they appear in a confusing order. Which criterion is most affected?", opts: ["Coherence and Cohesion", "Lexical Resource", "Grammatical Range and Accuracy"], answer: 0, exp: "Organisation of ideas is part of Coherence and Cohesion." },
          { text: "Which activity is the best example of a genre approach?", opts: ["Analysing the parts of a model complaint letter before writing one", "Writing freely for ten minutes without stopping to think or correct", "Translating a model letter from Russian into English word for word"], answer: 0, exp: "Analysing how a text type works for its purpose is genre-based." },
        ] },
    ],
    deltaTerms: [
      { def: "The way ideas in a text are organised so that the whole makes logical sense to the reader.", accept: ["coherence"] },
      { def: "The grammatical and lexical links within a text, such as pronouns, linkers and substitution.", accept: ["cohesion", "cohesive devices"] },
      { def: "An approach to teaching writing based on analysing the typical structure and language of a text type for a specific purpose and audience.", accept: ["genre approach", "genre-based approach", "genre based approach", "genre pedagogy"] },
    ],
    models: {
      CELTA: [
        "Estimated bands: Task Response 5 — a clear position, but ideas are only listed ('important for the country') and not explained or supported. Coherence and Cohesion 5 — basic organisation with 'Firstly, Secondly, In conclusion', but paragraphing and development are missing. Lexical Resource 5 — limited range, 'important' repeated four times, 'money for pay' is unclear. Grammatical Range and Accuracy 5 — mainly simple sentences, errors with subject–verb agreement ('students has') and articles ('very important thing').\nFeedback: 'Your opinion is very clear and your essay has a logical order — well done. To raise your score, first, develop each idea: after each reason, explain why and give an example (e.g. what happens to talented students who cannot pay?). Second, vary your vocabulary — instead of repeating \"important\", try \"essential\", \"crucial\", \"benefit society\". Check the marked verbs: \"students has\".'",
        "Estimated bands: Fluency and Coherence 4.5–5 — speaks for less than a minute, frequent hesitation ('er…'), repetition, ends early ('That's all'). Lexical Resource 4.5 — very basic vocabulary ('beautiful' twice, 'good for relax'). Grammatical Range and Accuracy 4.5 — short simple sentences, missing articles ('I like park'), 'good for relax'. Pronunciation — not assessable from a transcript.\nFeedback: 'You answered the question and gave reasons — good. Now try to speak for the full two minutes: use the one-minute preparation to note 4 points — where it is, what it looks like, what you do there, and how you feel about it — and add an example or a story for each. Also learn 3–4 phrases to describe places, e.g. \"It's a peaceful spot where…\", \"What I like most about it is…\". Watch \"the park\" and \"good for relaxing\".'",
        "Estimated bands: Task Achievement 4 — no clear overview, only two age groups mentioned, the conclusion ('young people like internet more') is an opinion not supported by the chart. Coherence and Cohesion 4.5 — very short, ideas not grouped. Lexical Resource 4.5 — repetitive ('use internet'), no language of comparison or data. Grammar 4.5 — simple sentences, articles missing.\nFeedback: 'You found the most important contrast — the youngest and oldest groups — that's the key feature. Next time, start with an overview sentence (e.g. \"Overall, internet use declines steadily with age\") and describe all the groups with comparisons: \"Usage was highest among 18–24-year-olds at 95%, compared with just 40% for those over 65.\" Report data only — don't explain why people use it more. Write at least 150 words.'",
      ],
      DELTA: [
        "Course: Writing Task 2 for 3rd-year students (5.5 → 6.5), four 90-minute lessons.\nL1 — Genre analysis: learners analyse band 7 model essays of different types (opinion, discussion, problem–solution), identify the purpose of each paragraph and how the position is signalled; build a planning template.\nL2 — Planning and developing ideas: question analysis, brainstorming, idea development (claim → explanation → example); timed planning (5 min); first draft at home.\nL3 — Peer and teacher feedback: peer review with a simplified checklist based on the band descriptors; focused teacher feedback on 2–3 error patterns using codes; revision of the draft.\nL4 — Language for coherence and precision: cohesion devices, hedging, topic vocabulary; timed essay under exam conditions with self-assessment.\nRationale: genre pedagogy makes expectations explicit (Hyland), process stages develop the planning and revision skills that weak writers lack, and scaffolding is gradually removed toward timed writing. Focused written corrective feedback is more effective than correcting all errors (Ellis, Bitchener).",
        "Course: formal emails at work, B1 adults, four 60-minute lessons.\nL1 — Needs and genre: learners bring real emails (anonymised); analysis of model emails for requests, updates and complaints — structure (greeting, purpose, details, action, closing) and register.\nL2 — Functional language and register: polite requests ('I would be grateful if…'), softening, formal vs informal alternatives; learners rewrite an informal email formally.\nL3 — Process: plan, draft an email to a realistic prompt from their workplace, peer feedback with a checklist (purpose clear? action clear? tone appropriate?), revise.\nL4 — Problem emails: responding to a complaint, delivering bad news; timed writing; self-editing for common errors.\nRationale: genre approach because workplace emails are a recognisable genre with conventions; process elements because adults benefit from feedback and revision; needs-based materials increase relevance and motivation (Hyland; ESP principles).",
        "Course: lesson reports and reflective journals for future primary teachers (B2), four lessons.\nL1 — Genre: compare a descriptive and a reflective lesson report; identify features of reflection (evaluation, reasons, action points) using Gibbs's cycle as a framework.\nL2 — Language of reflection: hedging and evaluative language ('This seemed to…', 'One reason might be…'), past tenses and modal perfects ('I could have…').\nL3 — Process: learners write a journal entry about a micro-teaching lesson; peer feedback focuses on depth of analysis, not only grammar; revise.\nL4 — Lesson reports: concise, factual reports for a mentor; contrast with the reflective journal; final portfolio entry.\nRationale: reflection is a genre with identifiable moves that student teachers often fail to reach (they describe rather than analyse), so explicit genre analysis plus process writing is justified; the content also develops their professional thinking (Farrell on reflective practice).",
      ],
    },
    apply: { task: "Do one Writing or Speaking task on the site and get the AI assessment. Then write three priorities for your own improvement, using the IELTS criteria names, and one concrete action for each.", hint: T("Это ваша собственная подготовка к IELTS и одновременно тренировка обратной связи по критериям.") },
  },

  // ==================== 8 ====================
  8: {
    glossary: [
      ["Main aim", "главная цель", "What learners will be able to do by the end of the lesson."],
      ["Subsidiary aim", "вспомогательная цель", "An aim that supports the main aim."],
      ["Personal aim", "личная цель учителя", "What the teacher wants to improve in their own teaching."],
      ["Stage / stage aim", "этап / цель этапа", "Part of the lesson and the reason it is there."],
      ["Lead-in / warmer", "введение / разминка", "Opening activity to create interest / energise learners."],
      ["Interaction pattern", "форма взаимодействия", "T–Ss, S–S, groups, individual, mingle."],
      ["Anticipated problems", "предполагаемые трудности", "Likely difficulties with language or tasks."],
      ["Timing", "хронометраж", "Planned time for each stage."],
      ["PPP", "презентация — практика — продукция", "Presentation, Practice, Production."],
      ["TTT (Test-Teach-Test)", "тест — обучение — тест", "Diagnose, teach the gap, practise again."],
      ["TBL", "обучение на основе задач", "Task-based learning: task first, language focus after."],
      ["ESA", "Engage — Study — Activate", "Harmer's flexible lesson model."],
      ["Contingency plan", "запасной план", "Extra or alternative activity if timing changes."],
      ["Variety", "разнообразие", "Mixing activity types, interaction and skills."],
      ["Timetable fit", "место урока в курсе", "How the lesson connects to previous and next lessons."],
    ],
    confuse: [
      { a: "Aim", b: "Procedure", diff: "An aim states the intended learning; a procedure describes what happens in class.", ex: "Aim: 'better able to give advice with should'. Procedure: 'Learners read problem cards and give advice in pairs.'" },
      { a: "Main aim", b: "Subsidiary aim", diff: "The main aim is the central learning outcome; subsidiary aims support it.", ex: "Main: listening for specific information. Subsidiary: vocabulary of travel needed for the listening." },
      { a: "Test-Teach-Test", b: "Teacher Talking Time", diff: "Both are 'TTT' — context tells you which. Test-Teach-Test is a lesson shape; Teacher Talking Time is how much the teacher speaks.", ex: "'This lesson follows a TTT shape' vs 'Reduce your TTT in the instructions.'" },
      { a: "Warmer", b: "Lead-in", diff: "A warmer energises and may be unrelated to the topic; a lead-in introduces the lesson topic and activates schema.", ex: "A word game (warmer) vs discussing photos of the topic (lead-in)." },
    ],
    exam: [
      { type: "match", instructions: "For questions 1–5, match the stages of a lesson with their aims A–F. There is one extra option.",
        options: [["A", "to generate interest in the topic"], ["B", "to give controlled practice of the form"], ["C", "to check understanding of meaning"], ["D", "to provide freer practice of the target language"], ["E", "to give feedback on errors from the speaking task"], ["F", "to test learners' existing knowledge"]],
        items: [
          { text: "Learners discuss photos of unusual jobs in pairs.", answer: "A", why: "An opening stage introducing the topic." },
          { text: "The teacher asks: 'Is it necessary? Do I have a choice?'", answer: "C", why: "CCQs check meaning." },
          { text: "Learners complete a gap-fill with 'have to' and 'don't have to'.", answer: "B", why: "Controlled practice." },
          { text: "Learners describe the rules of their own workplace or university.", answer: "D", why: "Personalised, freer use." },
          { text: "The teacher writes four sentences she heard on the board and learners correct them.", answer: "E", why: "Delayed error correction." },
        ] },
      { type: "mcq3", instructions: "For questions 6–10, choose the correct answer A, B or C.",
        items: [
          { text: "Which of these is a personal aim for a teacher?", opts: ["To reduce my teacher talking time during instructions", "To give learners practice in scanning for information", "Learners will be able to use 'used to' for past habits"], answer: 0, exp: "Personal aims focus on the teacher's own development." },
          { text: "Which lesson shape begins with learners trying a task before any language is taught?", opts: ["PPP", "Test-teach-test", "A grammar-translation lesson"], answer: 1, exp: "TTT starts with a diagnostic task." },
          { text: "Why do teachers plan contingency activities?", opts: ["Timing in real lessons often differs from the plan", "Observers expect every lesson plan to be as long as possible", "They replace the need to write a main aim and stage aims"], answer: 0, exp: "Extra or optional stages help adjust to real timing." },
          { text: "In Harmer's ESA model, the 'Activate' stage is when learners…", opts: ["use language as freely and communicatively as they can", "study the form and meaning of the language in detail", "become interested and emotionally involved in the topic"], answer: 0, exp: "Engage — interest; Study — focus on language; Activate — free use." },
          { text: "Which is the most useful information in the 'anticipated problems' section?", opts: ["Learners might confuse 'have to' with 'must not' in negatives", "The lesson is on Monday morning, just after the weekend break", "Two learners in the class are good friends and like to chat"], answer: 0, exp: "It is specific to the target language and has a clear solution." },
        ] },
    ],
    deltaTerms: [
      { def: "A lesson shape in which learners first attempt a task, the teacher then focuses on gaps revealed by the task, and learners attempt a similar task again.", accept: ["test teach test", "test-teach-test", "ttt"] },
      { def: "A lesson framework in which the main stages are a pre-task, the task cycle (task, planning, report) and a language focus.", accept: ["task-based learning", "task based learning", "tbl", "task-based language teaching", "tblt", "willis framework"] },
      { def: "An extra or alternative activity planned in case the lesson goes faster or slower than expected.", accept: ["contingency", "contingency plan", "contingency activity", "flexi-stage", "flexi stage"] },
    ],
    models: {
      CELTA: [
        "Main aim: learners will be better able to read for gist and specific information in a magazine article about unusual hotels.\nSubsidiary aims: to give practice in speaking (discussing preferences); to clarify 3–4 lexical items needed for the task (e.g. 'remote', 'luxury').\nStage aims: Warmer → lead-in: to generate interest and activate travel vocabulary. Reading (gist): to give practice in reading for the main idea — which hotel suits which traveller. Questions (detail): to develop reading for specific information. Vocabulary: to clarify meaning/form/pronunciation of useful items from the text. Speaking: to give fluency practice in responding to the text — choose a hotel for a class trip.\nProblems: (1) Learners may get stuck on unknown words → tell them to ignore them for the gist task; pre-teach only 'remote'. (2) Fast finishers → extra question: 'Which hotel would you never stay in and why?'",
        "Main aim: learners will be better able to compare cities using comparative adjectives (-er, more…, better/worse).\nSubsidiary aim: to give speaking practice in describing places.\nStage aims: Pictures of cities → lead-in: to create interest and elicit adjectives. Rule on the board → clarification: to clarify form, meaning and pronunciation through guided discovery (learners sort examples into -er / more / irregular). Exercise: controlled practice of form. Game: freer practice — 'Which is better for students: Astana or Almaty?' in pairs, reaching a decision.\nProblems: (1) double comparatives 'more bigger' → highlight that 'more' and '-er' never go together; quick error-correction task. (2) pronunciation of -er as /ə/ ('bigger' /ˈbɪɡə/) and weak 'than' /ðən/ → model and drill 'bigger than'.",
        "Main aim: learners will be better able to listen for detail and opinions in an interview about remote work.\nSubsidiary aim: to give practice in expressing and justifying opinions in a discussion.\nStage aims: Video (first 30 seconds only) → lead-in and prediction: to activate schema and set a reason to watch. Gist question: to understand the speakers' general attitudes. Detail questions: to identify specific arguments for and against. Discussion: to give fluency practice using arguments from the video and their own experience. Homework: to extend the discussion in writing (a short opinion paragraph).\nProblems: (1) speakers' fast, natural speech → let learners read the questions first and allow a second viewing with subtitles off; (2) discussion may be dominated by a few learners → give role cards and a timer for each turn.",
      ],
      DELTA: [
        "For B2 adults who are fluent but inaccurate, a TTT or TBL shape is more appropriate than PPP. These learners already communicate, so presenting functional exponents for agreeing and disagreeing from scratch would underestimate them; a first task (a discussion on a controversial topic) reveals the gaps — e.g. 'I am agree', overuse of 'I disagree' sounding too direct. The teach stage then focuses on the forms they lacked, with attention to softening and politeness, and the second task allows them to apply it. This reflects Long's focus on form — attention to form arising from meaningful communication — and Willis's TBL framework. A risk is that the first task may not elicit the target exponents, so the teacher should design it to require disagreement and prepare a monitoring checklist.",
        "For B1 teenagers in an exam-oriented state school, PPP has strengths: the present perfect simple vs continuous is a complex contrast of aspect, and a clear, staged presentation with timelines reduces confusion; teenagers and their parents also expect visible grammar teaching. Skill acquisition theory (DeKeyser) supports explicit presentation followed by practice that moves from controlled to freer use. However, pure PPP can lead to learners using the form in exercises but not in communication. I would use PPP with a meaningful context (e.g. a teenager's blog about a long project), guided discovery in the presentation, and a production stage with a real communicative purpose. Limitation: the production stage may still not be 'free' enough for transfer.",
        "For A2 adult migrants who need to make phone enquiries, TBL is justified: their need is a real-world task, and doing the task first shows what they need. The pre-task introduces the situation (calling a clinic or school); learners attempt a simplified call; the teacher then provides a model recording and focuses on useful chunks ('I'm calling about…', 'Could you spell that?'). However, at A2 a pure task-first approach can create anxiety and failure, so the pre-task should be rich in input and support (Willis recommends exposure in the pre-task). A practical compromise is a supported TBL lesson with planning time and a model, which gives both relevance and security. Theory: task-based language teaching (Ellis, Willis) and needs-based syllabus design.",
      ],
    },
    apply: { task: "Write the aims part of a real lesson plan for your next teaching practice (or for a lesson you would teach): one main aim, one subsidiary aim, stage aims for 4–5 stages, and two anticipated problems with solutions.", hint: T("Начните главную цель со слов: «By the end of the lesson, learners will be better able to…».") },
  },

  // ==================== 9 ====================
  9: {
    glossary: [
      ["Coursebook", "учебник", "The main published book used in a course."],
      ["Supplementary material", "дополнительный материал", "Material added to the coursebook."],
      ["Adapt / supplement / omit / replace", "адаптировать / дополнить / пропустить / заменить", "Teacher decisions about coursebook material."],
      ["Authentic material", "аутентичный материал", "Real-world texts and objects not made for learners."],
      ["Realia", "реалии, реальные предметы", "Real objects brought into class."],
      ["Visual aids", "наглядность", "Pictures, flashcards, charts, video."],
      ["Learner's dictionary", "словарь для изучающих язык", "A monolingual dictionary with simple definitions and examples."],
      ["Corpus (pl. corpora)", "корпус текстов", "A large electronic collection of real texts used to check usage."],
      ["Concordance", "конкорданс", "A list of examples of a word in context from a corpus."],
      ["Interactive whiteboard (IWB)", "интерактивная доска", "A digital board for displaying and manipulating materials."],
      ["Learning platform / LMS", "образовательная платформа", "Online system for materials, tasks and tracking progress."],
      ["Generative AI", "генеративный ИИ", "Tools that produce text, images or audio from prompts."],
      ["Prompt", "промпт, запрос", "The instruction given to an AI tool."],
      ["Copyright", "авторское право", "Legal rights over materials; limits copying and sharing."],
      ["Materials evaluation", "оценка материалов", "Judging materials against criteria before, during or after use."],
    ],
    confuse: [
      { a: "Adapting", b: "Supplementing", diff: "Adapting changes existing material; supplementing adds new material.", ex: "Changing the topic of a reading (adapting) vs adding an extra listening (supplementing)." },
      { a: "Authentic", b: "Graded", diff: "Authentic texts were made for real communication; graded texts are simplified for a level.", ex: "A real news article vs the same story rewritten for A2." },
      { a: "Dictionary", b: "Corpus", diff: "A dictionary gives definitions; a corpus shows how often and in what contexts words are actually used.", ex: "Is 'make research' used? The corpus shows 'do/conduct research' is far more frequent." },
      { a: "Using AI to prepare", b: "Letting AI teach", diff: "AI can draft materials and give practice feedback, but the teacher remains responsible for accuracy, level, aims and learners' wellbeing.", ex: "The teacher edits an AI-generated text before class; the AI tutor on the platform asks questions but the teacher reviews results." },
    ],
    exam: [
      { type: "match", instructions: "For questions 1–5, match the teacher's actions with the decisions about materials A–F. There is one extra option.",
        options: [["A", "omitting"], ["B", "adapting content"], ["C", "supplementing"], ["D", "replacing"], ["E", "grading the task"], ["F", "using realia"]],
        items: [
          { text: "The teacher skips the coursebook exercise on letter writing because her learners never write letters.", answer: "A", why: "Material is left out." },
          { text: "The teacher brings real train tickets and maps to class.", answer: "F", why: "Real objects." },
          { text: "The teacher keeps an authentic article but asks A2 learners only to find three numbers in it.", answer: "E", why: "The text stays authentic; the task is made easier." },
          { text: "The teacher adds a short video because the unit has no listening practice.", answer: "C", why: "New material is added." },
          { text: "The teacher changes the names and places in a dialogue to local ones.", answer: "B", why: "The same activity with changed content." },
        ] },
      { type: "mcq3", instructions: "For questions 6–10, choose the correct answer A, B or C.",
        items: [
          { text: "What is the main advantage of a learner's dictionary over a bilingual one?", opts: ["It gives example sentences and information on how words are used", "It always contains many more words than any bilingual dictionary", "It translates every English word directly into the learner's L1"], answer: 0, exp: "Learner's dictionaries focus on usage: examples, collocations, grammar." },
          { text: "A concordance line shows…", opts: ["a word in many real contexts from a corpus", "the pronunciation of a word in phonemic script", "the history and origin of a word"], answer: 0, exp: "Concordances display a key word in context." },
          { text: "Before using an AI-generated reading text in class, what should the teacher check first?", opts: ["Accuracy of facts, level and naturalness of the language", "The number of paragraphs and the font size of the text", "Whether the AI tool is popular among students at the school"], answer: 0, exp: "Content and language quality matter most." },
          { text: "Which is the best reason for choosing a digital quiz tool for a lesson?", opts: ["It gives learners immediate feedback on practice", "It looks more modern and attractive than paper", "It means the teacher does not need a lesson plan"], answer: 0, exp: "The tool should serve a learning purpose." },
          { text: "Which use of material may break copyright rules?", opts: ["Uploading a whole published coursebook as a PDF to a public website", "Showing a page from a coursebook you own to your class", "Using a text that its author released for free educational use"], answer: 0, exp: "Distributing a published book publicly without permission infringes copyright." },
        ] },
    ],
    deltaTerms: [
      { def: "A large, principled electronic collection of naturally occurring texts used to study how language is actually used.", accept: ["corpus", "corpora", "language corpus"] },
      { def: "A display of all occurrences of a search word in a corpus, shown in the middle of a line with its surrounding context.", accept: ["concordance", "concordances", "concordance line", "concordance lines", "kwic"] },
      { def: "Changing the difficulty of an activity rather than the text itself, so that an authentic text can be used at a lower level.", accept: ["grading the task", "task grading", "grade the task", "grading tasks"] },
    ],
    models: {
      CELTA: [
        "Keep: the reading text as a vehicle for skills practice — but change it. Change: replace the Florida holiday text with an article about a business trip (e.g. a manager's three days in Istanbul), which matches the learners' real context; reduce the 10 true/false questions to one gist question and four detail questions — enough for reading practice without turning the lesson into a test. Add: a speaking stage after reading in which learners tell each other about their own business trips (what went well, what went wrong) — this meets their stated need. Omit: the final writing task (they asked for speaking). Why: relevance increases motivation, and the time saved goes to speaking practice, which is the learners' main need.",
        "Keep: the writing aim (an informal text describing a holiday experience). Change: replace the postcard with a format they actually use — a post for a social network or a message to a friend in a chat, with photos; teenagers see a real purpose and audience. Add: a short model post to analyse (what makes it interesting: a hook, details, feelings, a question to readers) and a peer-feedback stage — classmates 'comment' on each other's posts. Omit: the formal postcard conventions (address, stamp), which are not relevant. Why: an authentic genre for the learners increases engagement, and peer comments create genuine communication around the writing.",
        "Keep: the listening skill (listening for specific information and completing a form). Change: the London bank context to a context closer to the learners' need — a short voice message or video call from a foreign colleague about a meeting. Add: a transfer stage — learners write a short email replying to the colleague using the information from the listening (date, time, documents), because their real need is email communication. Omit: bank-specific vocabulary (account types, overdraft). Why: the skill practice remains, but the content and the follow-up task now serve the learners' actual goal — communicating with colleagues by email.",
      ],
      DELTA: [
        "Criteria (scored 1–3): (1) Pedagogical alignment — does the chatbot support the course aims (fluency, interaction strategies)? (2) Quality of feedback — does it reformulate errors or explain them at an appropriate level? (3) Language accuracy and naturalness. (4) Adaptivity — can it adjust to B1 level and to learners' interests? (5) Interaction — does it ask questions and sustain dialogue, or only answer? (6) Accessibility — works on phones, free or low cost, stable internet needs. (7) Data privacy and ethics — what happens to learners' recordings and texts? (8) Teacher control — can the teacher see or guide interactions? Applied: an AI chatbot scores highly on availability and adaptivity, but feedback may be inconsistent and over-correct, and privacy is a concern; it suits out-of-class fluency practice, not assessment. Rationale: Tomlinson's principles (materials should provide exposure, engage learners affectively and offer opportunities for use) and Cunningsworth's emphasis on fitting aims and learners.",
        "Criteria: (1) Fit with IELTS needs — does it include academic vocabulary (AWL) and collocations, not just single words? (2) Learning principles — spaced repetition, retrieval practice, recycling. (3) Context — are words presented in sentences, with pronunciation? (4) Customisation — can teachers add their own lists from course texts? (5) Feedback and tracking — can learners and teacher see progress? (6) Accessibility and cost on phones. (7) Motivation — gamification without distraction. (8) Accuracy of definitions and examples. Applied: a spaced-repetition app scores well on (2), (5), (6), but often presents decontextualised words, so it needs supplementing with collocation work in class. Rationale: Nation's principles of vocabulary learning (repeated retrieval, meaning-focused use) and Tomlinson's criteria for materials evaluation.",
        "Criteria: (1) Alignment with the writing genres the teachers need (IELTS, reports, reflections). (2) Quality and validity of feedback — is it based on explicit criteria such as band descriptors? Is it consistent? (3) Feedback focus — does it prioritise key issues or overwhelm with corrections? (4) Encouragement of revision — can learners resubmit drafts? (5) Transparency — does it explain why, so future teachers learn to give feedback themselves? (6) Data and privacy. (7) Teacher oversight — can the teacher review and override scores? (8) Access on phones and cost. Applied: automatic feedback is fast and supports multiple drafts, but band estimates may be unreliable for borderline scripts, so it should be used formatively, not for final grades. Rationale: research on written corrective feedback (Ellis, Bitchener) and evaluation frameworks (Cunningsworth, Tomlinson); for future teachers it also models criteria-based assessment.",
      ],
    },
    apply: { task: "Take one page from a coursebook you use (or a unit from the site). Decide what you would keep, adapt, add or omit for your learners. Then ask an AI tool to create one extra exercise, check it and write down every problem you found.", hint: T("Типичные проблемы ИИ: неверные ответы в ключе, неестественные фразы, неподходящий уровень.") },
  },

  // ==================== 10 ====================
  10: {
    glossary: [
      ["Instructions", "инструкции", "Teacher language that tells learners what to do."],
      ["ICQ", "вопрос на проверку понимания инструкции", "Instruction-checking question."],
      ["Demonstration", "демонстрация", "Showing how to do a task instead of explaining it."],
      ["Eliciting", "извлечение (выявление) ответа", "Getting learners to supply language or ideas."],
      ["Monitoring", "мониторинг", "Watching and listening during pair/group work."],
      ["Open pairs / closed pairs", "открытые / закрытые пары", "Pairs speaking in front of the class / at the same time."],
      ["Mingle", "свободное общение по классу", "Learners walk around and talk to many classmates."],
      ["Seating arrangement", "расстановка мест", "Horseshoe, rows, clusters, circle."],
      ["Teacher talking time (TTT)", "время речи учителя", "How much the teacher talks."],
      ["Student talking time (STT)", "время речи учащихся", "How much learners talk."],
      ["Recast", "перефразирование с исправлением", "Teacher repeats the learner's utterance correctly."],
      ["Prompting", "подсказка для самоисправления", "Signals that help learners self-correct."],
      ["Finger correction", "исправление «на пальцах»", "Each finger represents a word to show where the error is."],
      ["Rapport", "раппорт, доверительные отношения", "Positive relationship between teacher and learners."],
      ["Display / referential question", "учебный / реальный вопрос", "Teacher knows the answer / teacher genuinely wants to know."],
    ],
    confuse: [
      { a: "CCQ", b: "ICQ", diff: "CCQs check understanding of the meaning of language; ICQs check understanding of what to do in a task.", ex: "CCQ: 'Is it finished?' ICQ: 'Do you write or speak?'" },
      { a: "Recast", b: "Prompt", diff: "A recast gives the correct form; a prompt pushes the learner to find it.", ex: "Recast: 'Oh, you went?' Prompt: 'Go? Yesterday…?'" },
      { a: "Display question", b: "Referential question", diff: "In a display question the teacher knows the answer; a referential question asks for real information.", ex: "'What's the past of go?' vs 'What did you do at the weekend?'" },
      { a: "Monitoring", b: "Interfering", diff: "Monitoring supports the task from the side; interfering takes over learners' conversation.", ex: "Listening and noting errors vs joining a group and doing most of the talking." },
    ],
    exam: [
      { type: "match", instructions: "For questions 1–5, match the teacher's words with their functions A–F. There is one extra option.",
        options: [["A", "checking understanding of instructions"], ["B", "eliciting"], ["C", "prompting self-correction"], ["D", "recasting"], ["E", "praising"], ["F", "asking a referential question"]],
        items: [
          { text: "'How many sentences do you write — three or five?'", answer: "A", why: "Checks the instruction." },
          { text: "'She go…? Think about the third person.'", answer: "C", why: "Pushes the learner to self-correct." },
          { text: "Learner: 'I buyed it.' Teacher: 'Ah, you bought it? Where?'", answer: "D", why: "Correct form given within the conversation." },
          { text: "'What do we call a person who repairs cars?'", answer: "B", why: "Draws a word out of learners." },
          { text: "'What was the most difficult part of your first job?'", answer: "F", why: "The teacher genuinely wants to know." },
        ] },
      { type: "mcq3", instructions: "For questions 6–10, choose the correct answer A, B or C.",
        items: [
          { text: "When is the best moment to hand out a worksheet?", opts: ["After the instructions, or after a demonstration", "Before the instructions so learners can read along", "At the start of the lesson for all tasks at once"], answer: 0, exp: "If learners hold the worksheet, they read instead of listening." },
          { text: "Which seating arrangement best supports a whole-class discussion where everyone can see each other?", opts: ["A horseshoe or a circle of chairs", "Traditional rows facing the board", "Learners sitting alone in separate corners"], answer: 0, exp: "Horseshoe/circle promotes eye contact and interaction." },
          { text: "Which way of grouping is best for a challenging discussion with a strong, confident class?", opts: ["Groups of similar level, so everyone is challenged", "Always the same pairs, chosen by the teacher on day one", "Only individual work, to avoid noise"], answer: 0, exp: "Same-level groups can push each other; grouping depends on the aim." },
          { text: "Which is the most effective way to reduce teacher talking time in a vocabulary stage?", opts: ["Eliciting words from learners with pictures", "Giving longer explanations of each word", "Reading the definitions aloud from a dictionary"], answer: 0, exp: "Eliciting moves talk from teacher to learners." },
          { text: "Finger correction is most useful for showing…", opts: ["where in a sentence a word is missing or wrong", "how to pronounce a difficult sound in a word", "the meaning of a new word in the sentence"], answer: 0, exp: "Each finger is a word, so the position of an error becomes visible." },
        ] },
    ],
    deltaTerms: [
      { def: "Corrective feedback in which the teacher reformulates all or part of the learner's utterance without the error, without explicitly indicating that an error was made.", accept: ["recast", "recasts", "recasting"] },
      { def: "A question to which the teacher already knows the answer, asked to check knowledge or practise language.", accept: ["display question", "display questions"] },
      { def: "A learner's response to corrective feedback, e.g. repeating or repairing the corrected form.", accept: ["uptake", "learner uptake"] },
    ],
    models: {
      CELTA: [
        "Rewritten: 'Work in groups of three. [Hold up the cards.] Put the cards in order to make a story. [Demonstrate with the first two cards.] Then tell the story together. You have five minutes.' Hand out the cards after the demonstration.\nICQs: 'Do you work alone or in threes?' (In threes) 'What do you do first — tell the story or put the cards in order?' (Order the cards)\nChanges: removed fillers ('sort of', 'like'), decided the grouping instead of 'groups or pairs, whatever', added a time limit, demonstrated the first step instead of explaining, and the cards are given only after instructions so learners listen.",
        "Rewritten: 'Stand up. [Hold up the questionnaire.] Ask everyone these five questions. In English! Write their names. [Demonstrate with one learner: 'Do you like…? — Yes. — Write Aliya.'] Five minutes. Go!' Hand out the questionnaire after the demonstration.\nICQs: 'Do you ask one person or everyone?' (Everyone) 'Russian or English?' (English) 'What do you write?' (Names)\nChanges: shorter sentences in logical order, the rule 'English only' stated clearly, the competition element dropped (it encourages speed instead of communication) or replaced by 'try to find a name for every question', a demonstration added.",
        "Rewritten: 'Read the first paragraph only. [Point to it.] Find the answers to the three questions on the board. No dictionaries. Two minutes. Then check with your partner.'\nICQs: 'Do you read the whole text?' (No, the first paragraph) 'Can you use dictionaries?' (No) 'What do you do after reading?' (Check with a partner)\nChanges: removed 'For this activity I'd like you to…' and repetition, gave a clear limit and time, pointed to the paragraph and the questions visually, and put the steps in the order learners will do them.",
      ],
      DELTA: [
        "Presentation and controlled practice of the second conditional are accuracy-focused stages, so immediate correction is appropriate. Following Lyster and Ranta's typology, I would prefer prompts (elicitation, metalinguistic clues: 'If + past, then…?') to recasts, because prompts lead to more learner uptake and repair, and B1 learners can usually self-correct at this stage. In the freer discussion 'What would you do if…?', the focus is fluency, so I would monitor and use delayed correction: noting typical errors (e.g. 'If I would have…') and dealing with them after the task through a board activity in which learners correct sentences themselves. A brief recast during the discussion is acceptable for errors that block meaning, as it does not interrupt the flow. Learner factors: B1 adults usually welcome correction, but anxious learners should be corrected less publicly.",
        "Speaking Part 1 practice can include on-the-spot correction because answers are short and learners aim to improve accuracy for the exam: prompts (clarification requests, repetition with rising intonation) encourage self-repair. During the Part 2 long turn, interrupting would damage the skill being practised — sustaining speech for two minutes — so feedback is delayed and based on notes, focusing on a few patterns and on fluency strategies. In Part 3 discussion, a mix is possible: occasional recasts during the conversation (they model the correct form without stopping it, as an examiner-like partner would) and delayed feedback on vocabulary range and grammatical complexity, linked to band descriptors. Research suggests prompts produce more uptake (Lyster and Ranta), while recasts are less disruptive; exam-oriented B2 learners benefit from explicit links between feedback and criteria.",
        "With A2 young learners, correction should be gentle and mainly implicit. In the vocabulary drill, immediate correction of pronunciation through modelling and choral repetition is appropriate, as the stage aims at accurate form. During the game, which is about fluency and motivation, I would avoid stopping the game and use recasts if needed. In the role-play, I would note one or two common errors and correct them afterwards as a whole-class activity without naming individuals. Children are sensitive to public correction, and the affective filter is a key factor; also, research suggests recasts may often go unnoticed by young learners, so occasional brief prompts with gestures are useful in accuracy stages. Overall: correction depends on stage aim, learner age and anxiety.",
      ],
    },
    apply: { task: "Before your next lesson or peer-teaching session, script the instructions for one activity (max 4 short sentences) and two ICQs. After the lesson, note whether learners started the task correctly.", hint: T("Если возможно, запишите свои инструкции на телефон и посчитайте секунды.") },
  },

  // ==================== 11 ====================
  11: {
    glossary: [
      ["Assessment", "оценивание", "Collecting information about learners' progress and performance."],
      ["Formative / summative", "формативное / суммативное", "During learning to guide it / at the end to measure it."],
      ["Diagnostic test", "диагностический тест", "Finds strengths and weaknesses before teaching."],
      ["Placement test", "тест для распределения по уровням", "Puts learners into the right group."],
      ["Progress / achievement test", "промежуточный / итоговый тест по курсу", "Measures what has been learned in the course."],
      ["Proficiency test", "тест на уровень владения", "Measures general ability, not linked to a course (IELTS)."],
      ["Validity", "валидность", "The test measures what it is supposed to measure."],
      ["Reliability", "надёжность", "The test gives consistent results."],
      ["Practicality", "практичность", "The test is realistic in time, cost and resources."],
      ["Washback", "обратное влияние теста", "The effect of a test on teaching and learning."],
      ["Criterion-referenced", "критериальное оценивание", "Performance judged against descriptors, not other learners."],
      ["Rubric / band descriptors", "рубрика / дескрипторы уровней", "Description of performance at each score level."],
      ["Self- / peer-assessment", "самооценка / взаимооценка", "Learners assess their own / each other's work."],
      ["Portfolio", "портфолио", "A collection of work showing progress over time."],
      ["Objective / subjective test item", "объективное / субъективное задание", "One correct answer / requires judgement to mark."],
    ],
    confuse: [
      { a: "Validity", b: "Reliability", diff: "Validity: does the test measure the right thing? Reliability: does it measure it consistently?", ex: "A speaking test made of grammar MCQs is reliable to mark but not valid." },
      { a: "Achievement", b: "Proficiency", diff: "An achievement test is based on a course; a proficiency test measures general ability.", ex: "End-of-term exam (achievement) vs IELTS (proficiency)." },
      { a: "Formative", b: "Summative", diff: "The difference is purpose: to improve learning now, or to judge it at the end.", ex: "The same quiz can be formative (used to plan revision) or summative (counted in the final grade)." },
      { a: "Diagnostic", b: "Placement", diff: "A diagnostic test identifies specific strengths and weaknesses; a placement test decides which level group a learner should join.", ex: "Finding that a learner confuses tenses (diagnostic) vs putting her in B1 (placement)." },
    ],
    exam: [
      { type: "match", instructions: "For questions 1–5, match the situations with the assessment terms A–F. There is one extra option.",
        options: [["A", "placement test"], ["B", "low reliability"], ["C", "negative washback"], ["D", "low validity"], ["E", "peer assessment"], ["F", "proficiency test"]],
        items: [
          { text: "Learners check each other's essays using a checklist of criteria.", answer: "E", why: "Learners assess classmates." },
          { text: "Two teachers give very different marks to the same presentation.", answer: "B", why: "Inconsistent marking." },
          { text: "A school tests new students to decide which class they join.", answer: "A", why: "Deciding level groups." },
          { text: "Teachers stop doing speaking activities because the final exam is written only.", answer: "C", why: "The test narrows teaching." },
          { text: "A listening test has such long written questions that it mainly measures reading.", answer: "D", why: "It doesn't measure what it claims." },
        ] },
      { type: "mcq3", instructions: "For questions 6–10, choose the correct answer A, B or C.",
        items: [
          { text: "Which test item is objective?", opts: ["A multiple-choice question with one correct answer", "A 250-word opinion essay on education", "A two-minute speaking task on a given topic"], answer: 0, exp: "Objective items can be marked without judgement." },
          { text: "What is the main purpose of a rubric with band descriptors?", opts: ["To make marking more consistent and transparent", "To make the test shorter and easier for learners", "To replace written feedback to learners completely"], answer: 0, exp: "Explicit criteria increase reliability and transparency." },
          { text: "An exit ticket at the end of a lesson is mainly used for…", opts: ["formative assessment", "placement of learners", "proficiency certification"], answer: 0, exp: "It shows what to revise next lesson." },
          { text: "Which practice improves the reliability of marking writing?", opts: ["Two teachers mark scripts independently using the same criteria", "The teacher marks quickly by general impression, without criteria", "Each teacher uses their own personal criteria for every script"], answer: 0, exp: "Double marking with shared criteria increases consistency." },
          { text: "What is a portfolio most useful for?", opts: ["Showing a learner's progress over time", "Placing new learners into groups", "Testing grammar under timed conditions"], answer: 0, exp: "It collects work across a period." },
        ] },
    ],
    deltaTerms: [
      { def: "The effect, positive or negative, that a test has on teaching and learning before it.", accept: ["washback", "backwash", "wash back"] },
      { def: "The degree to which a test gives consistent results across occasions and markers.", accept: ["reliability", "test reliability", "inter-rater reliability", "scorer reliability"] },
      { def: "Assessment in which a learner's performance is judged against descriptions of performance levels rather than against other learners.", accept: ["criterion-referenced assessment", "criterion referenced", "criterion-referenced", "criterion-referenced testing", "criterion referenced assessment"] },
    ],
    models: {
      CELTA: [
        "Aim: learners will be better able to talk about life experiences using the present perfect with ever/never.\n1. During clarification: CCQs + mini-whiteboards — 'Write: did I go there yesterday or in my life?' Every learner shows the answer; if many are wrong, the teacher re-clarifies with the timeline. Checks: meaning.\n2. During controlled practice: monitoring with a checklist (form: have + past participle, irregular participles). The teacher notes typical errors and does a quick board correction before freer practice. Checks: form.\n3. At the end: exit ticket — each learner writes two true sentences about themselves (one with 'ever', one with 'never'). The teacher reads them after class and plans revision or extra practice for learners who confused it with the past simple. Checks: ability to use it independently.",
        "Aim: learners will be better able to listen for specific information in a conversation about travel plans.\n1. After the gist task: thumbs up/down 'How much did you understand?' plus one gist question — the teacher decides whether to play the recording again before the detail task. Checks: general understanding.\n2. During the detail task: peer comparison while the teacher monitors which items most pairs got wrong — those items are replayed and analysed with the transcript. Checks: specific information and which parts are difficult (numbers, names).\n3. After the lesson: a 3-item mini-listening with dates and prices next lesson. If many learners still miss numbers, the teacher plans a bottom-up stage on numbers. Checks: retention and transfer.",
        "Aim: learners will be better able to write an opinion paragraph with linking words.\n1. Before writing: learners order a jumbled model paragraph and identify linkers — the teacher checks who can recognise the structure (topic sentence, reasons, example, conclusion).\n2. After the first draft: peer assessment with a simple checklist (clear opinion? two reasons? examples? at least three different linkers used correctly?). The teacher circulates and notes common problems (e.g. 'Moreover' used for contrast).\n3. Self-assessment and target: learners choose one checklist point to improve and rewrite one part. The teacher collects the final versions and gives focused feedback only on that point and on linkers. Each activity checks the aim and leads to a concrete teaching decision.",
      ],
      DELTA: [
        "IELTS Academic creates both positive and negative washback on a university preparation course. Positive: Writing and Speaking tasks are communicative and integrated, so preparation develops genuine skills (extended writing, sustained speaking), and band descriptors make criteria transparent. Negative: courses may narrow to test tasks and strategies — practising question types, memorised templates for Task 2 and Part 2 — at the expense of wider language development. Washback research shows that tests influence what is taught more than how it is taught, and the effect depends on teachers' beliefs and materials (Alderson and Wall; Cheng). To make it more positive: teach the language skills underlying tasks (e.g. paraphrasing, academic vocabulary), use criteria for formative self- and peer-assessment, include extensive reading and listening beyond test-format texts, and explain to learners why skills work raises scores.",
        "A national exam based mainly on multiple-choice reading and grammar is reliable and practical but has limited construct validity for communicative ability, which creates negative washback: teachers focus on grammar exercises and test practice, and speaking and writing are neglected because they are not tested. Hughes notes that to achieve beneficial washback one should test the abilities whose development is wanted. Teachers cannot change the exam but can mediate the washback (Alderson and Wall show effects vary by teacher): teaching grammar communicatively, using reading texts for discussion and writing, and explaining to learners that wider skills support exam performance. At policy level, adding speaking and writing components with clear criteria would bring positive washback.",
        "Using TKT Module 1 as the final exam of a methodology course has positive washback on learning terminology and concepts — students study systematically and gain an international certificate. However, TKT only tests knowledge in objective formats; it does not assess whether students can apply knowledge in teaching. If it is the only assessment, the course may become test preparation (memorising terms), and practical skills — planning, micro-teaching, reflection — may receive less attention. This illustrates the gap between knowledge and practice that research on teacher education describes. To make washback more positive, combine TKT with assessed micro-teaching and a reflective portfolio, and use TKT-format questions formatively throughout the course rather than only at the end.",
      ],
    },
    apply: { task: "Design one formative assessment activity for your next lesson (exit ticket, mini-whiteboards, peer checklist). After the lesson, write what the results showed and what you will change in the next lesson.", hint: T("Главное — решение, которое учитель принимает по результатам.") },
  },

  // ==================== 12 ====================
  12: {
    glossary: [
      ["Reflective practice", "рефлексивная практика", "Systematic thinking about one's teaching to improve it."],
      ["Reflection-in-action / on-action", "рефлексия в действии / после действия", "During the lesson / after the lesson (Schön)."],
      ["Gibbs's reflective cycle", "цикл Гиббса", "Description, feelings, evaluation, analysis, conclusion, action plan."],
      ["Peer observation", "взаимопосещение", "A colleague observes with an agreed focus for development."],
      ["Teaching journal", "дневник учителя", "Regular written reflection on lessons."],
      ["Action research", "исследование действием", "A cycle of planning, acting, observing and reflecting in one's classroom."],
      ["Mentoring", "наставничество", "Support from an experienced colleague."],
      ["CPD", "непрерывное профессиональное развитие", "Continuing professional development."],
      ["Self-evaluation", "самооценка", "Evaluating one's own lesson against aims and criteria."],
      ["Learner feedback", "обратная связь от учащихся", "Collecting learners' views on teaching."],
      ["Professional Development Assignment (DELTA)", "задание по профессиональному развитию", "Part of DELTA Module Two: reflection and an experimental lesson."],
      ["Experimental practice", "экспериментальная практика", "Trying a new approach and reflecting on it (DELTA)."],
      ["Lessons from the classroom", "«Уроки из класса»", "CELTA Assignment 4: reflection on strengths and development."],
      ["Teacher identity", "профессиональная идентичность учителя", "How teachers see themselves as professionals."],
      ["Community of practice", "профессиональное сообщество", "Teachers learning together through shared practice."],
    ],
    confuse: [
      { a: "Description", b: "Reflection", diff: "Description says what happened; reflection explains why and what to do next.", ex: "'Learners did the task' vs 'Learners finished early because the task was too easy; next time I'll add a challenge.'" },
      { a: "Peer observation", b: "Formal observation", diff: "Peer observation is developmental and non-judgemental; formal observation evaluates the teacher.", ex: "A colleague notes your questions vs an inspector gives a grade." },
      { a: "Action research", b: "Experimental practice", diff: "Action research is a systematic data-based cycle, often over weeks; experimental practice (DELTA) is trying an unfamiliar approach in a lesson and reflecting on it.", ex: "Four weeks of recorded group work data vs one lesson using Dogme." },
    ],
    exam: [
      { type: "match", instructions: "For questions 1–5, match the activities with the types of professional development A–F. There is one extra option.",
        options: [["A", "reflective journal"], ["B", "peer observation"], ["C", "action research"], ["D", "mentoring"], ["E", "formal qualification"], ["F", "learner feedback"]],
        items: [
          { text: "A new teacher meets an experienced colleague every week to discuss problems.", answer: "D", why: "Ongoing support from an experienced colleague." },
          { text: "A teacher asks learners to complete an anonymous questionnaire about her lessons.", answer: "F", why: "Collecting learners' views." },
          { text: "A teacher writes notes after every lesson about what worked and why.", answer: "A", why: "Regular written reflection." },
          { text: "A teacher introduces role cards, records group talk for four weeks and analyses the results.", answer: "C", why: "A planned change with data collection." },
          { text: "A teacher takes DELTA Module One.", answer: "E", why: "A recognised qualification." },
        ] },
      { type: "mcq3", instructions: "For questions 6–10, choose the correct answer A, B or C.",
        items: [
          { text: "Which sentence shows reflection rather than description?", opts: ["The pair work failed because I didn't check instructions, so next time I'll use ICQs", "First I did a warmer with pictures, then learners read the text and answered questions", "The lesson was good, learners were happy and I enjoyed teaching it"], answer: 0, exp: "It analyses the cause and plans action." },
          { text: "In a TKT matching task with one extra option, a useful strategy is to…", opts: ["match the items you are sure about first, then deal with the rest", "use each option at least twice, to increase the chance of being right", "always leave the last option in the list unused, as it is the extra one"], answer: 0, exp: "Eliminating certain answers first reduces the choice." },
          { text: "What does CELTA Assignment 4 'Lessons from the classroom' require?", opts: ["Reflection on your strengths and areas for development, with an action plan", "A timed grammar test on the language systems taught on the course", "A course design with a needs analysis for a group of learners"], answer: 0, exp: "It is a reflective assignment." },
          { text: "What is the main purpose of peer observation?", opts: ["Mutual professional development through a focused look at teaching", "Deciding whether a colleague should get a promotion or a pay rise", "Checking that the coursebook is being followed exactly by the teacher"], answer: 0, exp: "It is developmental, not evaluative." },
          { text: "Which is the best first step of an action research cycle?", opts: ["Identifying a specific problem in your own classroom", "Publishing your results in an academic journal", "Choosing a new coursebook for the whole school"], answer: 0, exp: "Action research starts from a real classroom problem." },
        ] },
    ],
    deltaTerms: [
      { def: "Schön's term for reflection that happens while the teacher is teaching, leading to on-the-spot adjustments.", accept: ["reflection-in-action", "reflection in action"] },
      { def: "Small-scale classroom investigation in which a teacher identifies a problem, plans and implements a change, collects data and reflects on the results.", accept: ["action research", "classroom research", "practitioner research"] },
      { def: "A group of people who share a professional practice and learn from each other through regular interaction.", accept: ["community of practice", "communities of practice"] },
    ],
    models: {
      CELTA: [
        "Strength 1: rapport — learners were relaxed and willing to speak; my tutor noted that I used names and showed interest in their answers. Strength 2: clear lead-in — the photos generated ideas quickly.\nArea for development 1: task design. The speaking task finished in three minutes because learners gave one-word answers. The questions were closed ('Do you like…?') and there was no outcome. Next time I will use open questions, give a clear outcome (e.g. agree on three recommendations) and planning time. Area 2: monitoring — I joined one group and did not hear the others, so I had no language for feedback. Next time I will move around with a notebook and note three good phrases and three errors.\nAction plan: rewrite tasks with an outcome; read about task design (e.g. Thornbury's How to Teach Speaking); ask my peer to observe my monitoring in the next TP.",
        "Strength 1: clarification of language — learners understood the meaning of the target structure, as shown by their correct answers to CCQs. Strength 2: board work was organised and learners copied it accurately.\nArea for development 1: instructions. I had to explain the task three times because my instructions were long and I gave out the handout first, so learners read instead of listening. Evidence: several learners started the wrong exercise. Next time: short imperatives, demonstrate the first item, hand out materials after instructions, and ask two ICQs. Area 2: timing — re-explaining took 7 minutes, so the freer practice was cut.\nAction plan: script instructions in my plan before every lesson; time myself; watch a video of an experienced teacher giving instructions.",
        "Strength 1: thorough language analysis — my plan anticipated problems with the form, and I could answer learners' questions. Strength 2: friendly, patient manner with weaker learners.\nArea for development 1: teacher talking time. The grammar explanation took 25 minutes; learners listened passively and there was no time for freer practice, so the main aim — using the structure in speaking — was not achieved. Next time I will use guided discovery (learners find the rule from examples), limit clarification to 10 minutes and protect the freer practice stage. Area 2: checking understanding — I asked 'Do you understand?' instead of CCQs.\nAction plan: plan timings for each stage and mark the 'must-do' stages; prepare CCQs in advance; ask the tutor to note my TTT.",
      ],
      DELTA: [
        "Question: Does giving learners structured roles and planning time increase participation in speaking tasks in my B1 university group? Change: introduce role cards (leader, timekeeper, language monitor, reporter) and two minutes of planning before each task, for four weeks. Data: (1) audio recordings of two groups per week, counting turns and length of turns per learner; (2) a short learner questionnaire before and after on anxiety and willingness to speak; (3) my observation notes. Analysis: compare the distribution of turns and questionnaire scores before and after; analyse notes for patterns. Literature: task planning research (Ellis), willingness to communicate (MacIntyre), cooperative learning roles. Ethics: informed consent for recordings, anonymity. Cycle model: Kemmis and McTaggart — plan, act, observe, reflect, then a second cycle if needed.",
        "Question: How can I design writing assignments so that learners use AI tools as support rather than as a replacement for their own writing? Change: introduce a process-writing sequence with in-class planning, a handwritten or in-class first draft, and a declared AI-use stage (learners may ask AI for feedback but must submit the AI conversation and explain what they changed). Data: (1) comparison of drafts and final versions; (2) learners' AI-use logs; (3) a questionnaire and short interviews on how they used AI; (4) writing scores on an in-class task. Analysis: categorise types of AI use and see whether quality of independent writing changes. Literature: research on AI in L2 writing and on feedback literacy; Burns on action research. Ethics: no penalty for honest declaration of AI use; anonymity.",
        "Question: Will regular training in recognising signposting and paraphrase improve my learners' results in IELTS Listening Section 4? Change: six weeks of 15-minute sessions — analysis of lecture transcripts (signposting language, paraphrases of answers), dictation of key sentences and note-taking practice. Data: (1) Section 4 scores on parallel tests before and after; (2) error analysis: which items were missed and why (decoding vs paraphrase vs spelling); (3) learner reflections. Analysis: compare scores and change in error types. Literature: Field on listening processes, Vandergrift on metacognitive strategies. Limitation: small sample, no control group — results inform my practice rather than prove causation.",
      ],
    },
    apply: { task: "Write a reflection on your last lesson (or a lesson you observed) using Gibbs's cycle: what happened, how you felt, what was good and bad, why, what you conclude, what you will do next time.", hint: T("Минимум один пункт «почему» и один конкретный план действий.") },
  },
};
