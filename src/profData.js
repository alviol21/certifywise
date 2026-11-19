/**
 * CertifyWise
 * © 2026 Алназирова Айдана (Aidana Alnazirova). Все права защищены.
 * Дата создания: 22 мая 2026 г.
 * Использование без письменного разрешения автора запрещено.
 *
 * CELTA: практические задания по темам и письменным заданиям курса (оценивает AI по критериям).
 * DELTA Module One: задания в формате письменного экзамена — термины (автопроверка)
 * и анализ языка, речи ученика, теста и учебных материалов (оценивает AI по ключу).
 */

// ===================== CELTA =====================
export const CELTA_TASKS = [
  {
    id: "c-order", type: "order",
    title: "Staging a PPP grammar lesson",
    area: "Topic 4 · Planning",
    scenario: "A 60-minute lesson for B1 adults. Target language: 'used to' for past habits. Put the stages in the most logical order.",
    stages: [
      "Lead-in: students look at photos of a town 30 years ago and today and say what has changed.",
      "Presentation: students read a short text about the teacher's childhood and notice 'used to'.",
      "Clarification: meaning checked with CCQs, form and pronunciation highlighted on the board.",
      "Controlled practice: students complete sentences with 'used to' or 'didn't use to'.",
      "Freer practice: in pairs, students tell each other how their lives used to be different.",
      "Feedback: the teacher praises good language and corrects errors heard during the pair work.",
    ],
    exp: "Интерес к теме → язык в контексте → прояснение значения, формы, произношения → контролируемая практика → свободная практика → обратная связь по ошибкам. Каждый этап готовит следующий.",
  },
  {
    id: "c-lang", type: "ai",
    title: "Language analysis: 'used to'",
    area: "Topic 2 · Language analysis · Assignment 2",
    scenario: "You are going to teach this target sentence to a B1 class:\n\n\"I used to live in Almaty, but now I live in Astana.\"\n\nComplete the language analysis as you would in a CELTA lesson plan.",
    fields: [
      { key: "meaning", label: "Meaning + 3 concept checking questions (with answers)", rows: 5 },
      { key: "form", label: "Form (affirmative, negative, question)", rows: 4 },
      { key: "pron", label: "Pronunciation (features to highlight)", rows: 3 },
      { key: "problems", label: "Anticipated problems and solutions (at least 2)", rows: 5 },
    ],
    criteria: [
      "Meaning is accurate: a past habit or state that is no longer true.",
      "CCQs are short, simple, answerable with yes/no or a short phrase, and check both 'past' and 'not now'.",
      "Form covers affirmative, negative (didn't use to) and question (Did you use to…?).",
      "Pronunciation notes /ˈjuːstə/ with the weak form of 'to' and the /s/ (not /z/) sound.",
      "Problems are specific to this item (e.g. confusion with 'be used to + -ing', *didn't used to, overuse instead of past simple for single events) and each has a practical solution.",
    ],
    model: "Meaning: a past habit or state that is no longer true. CCQs: Did I live in Almaty in the past? (Yes) Do I live there now? (No) Was it one time or for a long period? (A long period).\nForm: subject + used to + base verb; negative: subject + didn't use to + base verb; question: Did + subject + use to + base verb?\nPronunciation: /ˈjuːstə/ — /s/, not /z/; 'to' is weak /tə/ and linked: /ˈjuːstəlɪv/.\nProblems: (1) confusion with 'be/get used to + -ing' (= be accustomed to) — solution: keep it out of this lesson; if asked, contrast on the board with a timeline. (2) *I didn't used to — solution: highlight 'did' already shows the past, so 'use' has no -d. (3) using 'used to' for a single past event (*I used to go to Paris last year) — solution: CCQ 'once or many times?'.",
  },
  {
    id: "c-aims", type: "ai",
    title: "Aims and stages for a reading lesson",
    area: "Topic 4 · Planning",
    scenario: "You are teaching a 60-minute lesson to an intermediate (B1+) group of adults. The coursebook has a 450-word article: 'Is remote work here to stay?'. After reading, you want students to discuss the topic.\n\nWrite the aims and a staged outline of the lesson.",
    fields: [
      { key: "main", label: "Main aim", rows: 2 },
      { key: "sub", label: "Subsidiary aim(s)", rows: 2 },
      { key: "stages", label: "Stages: name, stage aim, interaction (e.g. T–S, S–S), time", rows: 9 },
    ],
    criteria: [
      "The main aim is a receptive skills aim, stated from the learners' perspective (e.g. to give practice in reading for gist and detail).",
      "The subsidiary aim is relevant (e.g. fluency practice in speaking, or lexis from the text).",
      "Stages follow a logical sequence: lead-in, (pre-teach blocking vocabulary), gist task, detail task, post-reading speaking.",
      "Each stage has a clear stage aim, a realistic time and appropriate interaction patterns.",
      "Gist comes before detail; the gist task is short and time-limited.",
    ],
    model: "Main aim: to give learners practice in reading for gist and for detail in the context of remote work.\nSubsidiary aim: to give learners fluency practice in a discussion about working from home.\nStages: 1) Lead-in (5 min, T–S, S–S): students discuss where they prefer to work — to generate interest. 2) Pre-teach 3–4 blocking words, e.g. 'commute', 'productivity' (7 min, T–S) — to remove barriers to understanding. 3) Gist (5 min, S then S–S): read quickly and choose the best title — to read for the general idea. 4) Detail (15 min, S then S–S): true/false and short questions — to read for specific information. 5) Feedback (5 min, T–S). 6) Post-reading discussion (15 min, S–S in groups): 'Would you choose remote work?' — fluency practice. 7) Delayed error correction (5–8 min, T–S).",
  },
  {
    id: "c-instr", type: "ai",
    title: "Instructions and ICQs",
    area: "Topic 5 · Teacher language",
    scenario: "A trainee gave this instruction before a pair-work activity:\n\n\"OK, so now what I'd like you to do, if that's OK, is maybe work with the person next to you, or maybe with someone else, it doesn't really matter, and look at the questions on the handout I'm going to give you in a minute, and sort of discuss them and maybe write down some answers too, if you have time, you have about, I don't know, ten minutes or so.\"\n\nRewrite the instruction and add instruction checking questions (ICQs).",
    fields: [
      { key: "instr", label: "Your instruction (graded, staged)", rows: 4 },
      { key: "icqs", label: "ICQs (2–3)", rows: 3 },
      { key: "demo", label: "When do you hand out the worksheet, and would you demonstrate? Why?", rows: 3 },
    ],
    criteria: [
      "The instruction is short, uses imperatives and simple language, and gives one step at a time.",
      "It states who works with whom, what to do and how long.",
      "ICQs are closed and check the key points of the task (pairs or alone? speak or write? how long?), not 'Do you understand?'.",
      "The handout is given after the instruction (or the teacher holds it up), and a quick demonstration or example is used where useful.",
    ],
    model: "Instruction: \"Work with your partner. Read the five questions. Ask and answer them. You have eight minutes.\" (Teacher holds up the handout, then demonstrates question 1 with a strong student.)\nICQs: \"Are you working alone or in pairs?\" (Pairs) \"Do you write or speak?\" (Speak) \"How many minutes?\" (Eight)\nHandout: given after the instruction so that learners listen and do not start reading.",
  },
  {
    id: "c-learner", type: "ai",
    title: "Focus on the learner",
    area: "Topic 1 · Learners · Assignment 1",
    scenario: "Learner profile:\nDana, 28, accountant, level B1+. She needs IELTS 6.5 to apply for a master's programme abroad. She reads a lot of professional texts in English and understands them well. She finds listening to fast speech difficult, especially numbers and names. When speaking she communicates her ideas but often omits articles ('I work in big company') and mixes up 'he' and 'she'. She is motivated but has only three evenings a week to study. She prefers clear structure and explanations.\n\nAnalyse the learner and suggest how to help her.",
    fields: [
      { key: "analysis", label: "Strengths and needs (language and skills)", rows: 5 },
      { key: "reasons", label: "Possible reasons for her difficulties", rows: 4 },
      { key: "activities", label: "Two activities or resources to help her, with a rationale", rows: 6 },
    ],
    criteria: [
      "Identifies strengths (reading, motivation, communication of ideas) and needs (listening for specific information, articles, pronouns) with evidence from the profile.",
      "Suggests plausible reasons, e.g. L1 influence: Russian and Kazakh have no articles and Kazakh has no grammatical gender in pronouns.",
      "Activities are specific, realistic for three evenings a week and directly linked to the needs.",
      "Each activity has a clear rationale and suits her learning preferences and goal (IELTS 6.5).",
    ],
    model: "Strengths: strong reading of professional texts, clear communicative intent, high motivation, clear goal. Needs: listening for specific information (numbers, names, spelling) for IELTS Listening Part 1; accuracy with articles; he/she.\nReasons: no articles in Russian/Kazakh; Kazakh 'ол' is one pronoun for he and she; limited exposure to fast natural speech.\nActivities: (1) IELTS Listening Part 1 form-completion tasks with dictation of numbers and names (e.g. the 'Numbers, dates, spelling' module) — targets her weakest sub-skill and matches exam format; 20 minutes, three times a week. (2) Article noticing: she highlights articles in a professional text she already reads, then writes a 100-word summary and self-checks articles — uses her strength in reading and her preference for clear structure.",
  },
  {
    id: "c-reflect", type: "ai",
    title: "Lessons from the classroom",
    area: "Topic 5 · Professional development · Assignment 4",
    scenario: "Think of a lesson you taught recently (in your teaching practice, a tutoring session or a peer-teaching task). If you have not taught yet, use a lesson you observed.\n\nWrite a short reflection in the style of the CELTA assignment 'Lessons from the classroom'.",
    fields: [
      { key: "context", label: "Context: learners, level, aim of the lesson", rows: 3 },
      { key: "strengths", label: "Two strengths, with evidence from the lesson", rows: 4 },
      { key: "weak", label: "Two areas to develop, with evidence and their effect on learners", rows: 5 },
      { key: "action", label: "Action points: what exactly will you do differently and how will you check it?", rows: 4 },
    ],
    criteria: [
      "Reflection is specific and evidence-based (what learners did or said), not general ('the lesson went well').",
      "Areas to develop focus on the effect on learning, not only on the teacher's feelings.",
      "Action points are concrete, realistic and checkable in the next lesson.",
      "Language is clear and professional; ELT terminology is used correctly.",
    ],
    model: "A strong reflection names concrete moments (e.g. 'During the detail task six of eight learners finished in four minutes, so the task was too easy'), links each weakness to its effect on learners ('my instructions were long, so two pairs started the wrong exercise'), and gives action points that can be observed next time ('I will script instructions in my plan, give them in three short sentences and ask two ICQs').",
  },
];

// ===================== DELTA Module One =====================
export const DELTA_TERMS = {
  id: "d-terms", type: "terms",
  title: "Terminology",
  area: "Paper 1 · Terms",
  scenario: "Write the term that matches each definition. One or two words are enough.",
  items: [
    { id: "dt1", def: "The omission of words that can be understood from the context, e.g. 'Coming?' instead of 'Are you coming?'", accept: ["ellipsis"] },
    { id: "dt2", def: "Replacing a word or phrase with another item to avoid repetition, e.g. 'I prefer the red one' or 'I think so'.", accept: ["substitution"] },
    { id: "dt3", def: "Expressing a process or quality as a noun phrase, typical of academic writing, e.g. 'they analysed the data' → 'the analysis of the data'.", accept: ["nominalisation", "nominalization"] },
    { id: "dt4", def: "Language that makes a claim more tentative or less direct, e.g. 'It would appear that…', 'This may suggest…'.", accept: ["hedging", "hedge", "hedges", "hedging devices"] },
    { id: "dt5", def: "A structure that divides one clause into two in order to give focus to one element, e.g. 'What I need is a holiday' or 'It was Anna who called'.", accept: ["cleft sentence", "cleft", "cleft sentences", "pseudo-cleft", "wh-cleft", "it-cleft"] },
    { id: "dt6", def: "A word or phrase that organises discourse and signals the speaker's attitude or the relationship between ideas, e.g. 'anyway', 'mind you'.", accept: ["discourse marker", "discourse markers"] },
    { id: "dt7", def: "A word whose meaning is included in a more general word, e.g. 'tulip' in relation to 'flower'.", accept: ["hyponym", "hyponyms"] },
    { id: "dt8", def: "A sound changing to become more like a neighbouring sound in connected speech, e.g. 'ten boys' pronounced /tem bɔɪz/.", accept: ["assimilation"] },
    { id: "dt9", def: "The loss of a sound in connected speech, e.g. the /t/ in 'next week'.", accept: ["elision"] },
    { id: "dt10", def: "The syllable in a tone unit that carries the main pitch movement.", accept: ["tonic syllable", "tonic", "nucleus", "nuclear syllable", "nuclear stress"] },
    { id: "dt11", def: "The extent to which a test appears to measure what it should, in the eyes of learners, teachers and other stakeholders.", accept: ["face validity"] },
    { id: "dt12", def: "Conscious attention to a language feature in input, considered by Schmidt a necessary condition for acquisition.", accept: ["noticing", "noticing hypothesis"] },
  ],
};

export const DELTA_TASKS = [
  DELTA_TERMS,
  {
    id: "d-learner", type: "ai",
    title: "Analysing a learner's writing",
    area: "Paper 2 · Learner language",
    scenario: "A B1 learner (L1 Russian) wrote this email to a friend:\n\n\"Hi Sam! Thanks for your message. I am very exciting about my trip to London next month. I have booked hotel near the British Museum, because I want to visit it since many years. Unfortunately I can't stay long — only four days — so I made a list of places to visit. First, I will go to the museum. After that I want to see Tower Bridge and, if the weather will be good, walk along the river. Could you recommend me a good restaurant? I don't want to spend much money. Write me soon! Best wishes, Nurlan\"\n\nIdentify three strengths and three weaknesses. For each, quote an example and explain its significance for the learner.",
    fields: [
      { key: "strengths", label: "Three strengths with examples and significance", rows: 6 },
      { key: "weak", label: "Three weaknesses with examples, the likely cause and significance", rows: 7 },
    ],
    criteria: [
      "Strengths are genuine and supported by quotes (e.g. task achieved and register appropriate for an informal email; good sequencing — First, After that; accurate future forms 'I will go', 'I want to'; modal 'Could you…' for a request).",
      "Weaknesses are correctly identified and labelled: -ed/-ing adjectives (exciting → excited); missing article (booked hotel → a hotel); present perfect with 'since' (want… since many years → have wanted… for many years); 'will' in a first conditional if-clause; 'recommend me a restaurant' (verb pattern); 'Write me soon' (to me).",
      "Causes are plausible (e.g. L1 Russian has no articles; Russian uses present tense with 'уже… лет'; confusion of participle adjectives).",
      "Significance is discussed: which errors impede communication and which are a priority for a B1 learner.",
      "Terminology is accurate.",
    ],
    model: "Strengths: (1) task achieved, register appropriate for an informal email (Hi Sam!, Thanks for your message, Write soon) — the learner can adapt style to reader; (2) clear sequencing and cohesion — 'First…', 'After that…', 'so I made a list' — the text is easy to follow; (3) range of forms used appropriately: 'I have booked', 'I can't stay long', 'Could you recommend…?' — evidence of a growing grammatical range.\nWeaknesses: (1) -ing/-ed adjectives: 'I am very exciting' → excited — changes meaning (= I make others excited), a priority; (2) articles: 'booked hotel' → a hotel — L1 Russian has no articles; frequent, rarely impedes meaning but marks the writing as inaccurate; (3) tense with time expressions: 'I want to visit it since many years' → have wanted… for many years — L1 transfer (Russian present + давно); also 'if the weather will be good' → is (first conditional), and verb pattern 'recommend me a restaurant' → recommend a restaurant (to me).",
  },
  {
    id: "d-langan", type: "ai",
    title: "Language analysis of a text",
    area: "Paper 1 · Language analysis",
    scenario: "Read the extract from a short story. Analyse the three items in bold for form, meaning and use.\n\n\"By the time the train finally arrived, Asel **had been waiting** on the platform for over an hour. As a child, she **would** spend whole summers at her grandmother's house in the village, and the journey always felt like an adventure. **Hardly had she** sat down when the conductor asked for her ticket.\"",
    fields: [
      { key: "i1", label: "1. 'had been waiting'", rows: 4 },
      { key: "i2", label: "2. 'would'", rows: 4 },
      { key: "i3", label: "3. 'Hardly had she…'", rows: 4 },
    ],
    criteria: [
      "Item 1: past perfect continuous (had + been + -ing); an activity in progress up to a point in the past ('by the time the train arrived'), emphasising duration ('for over an hour').",
      "Item 2: 'would' + base verb for repeated past actions (past habit); unlike 'used to', it is not used for past states; typical of narrative and nostalgic description; needs the time frame to be established first ('As a child').",
      "Item 3: negative adverbial 'Hardly' in front position with subject–auxiliary inversion (had she); 'hardly… when' shows that one event happened immediately after another; formal or literary style, used for emphasis or dramatic effect.",
      "Analysis is accurate and uses precise metalanguage.",
    ],
    model: "1) had been waiting — past perfect continuous: had + been + present participle. Meaning: an activity in progress before and up to a past reference point (the train's arrival); focus on duration, reinforced by 'for over an hour'. Use: narrative, sets the background before a main past event.\n2) would — modal auxiliary + base form expressing past habit / repeated action. Cannot replace 'used to' for states (*she would live in the village). Requires an established past time frame ('As a child'); common in reminiscence; often contracted to 'd in speech.\n3) Hardly had she sat down when… — negative adverbial (hardly) fronted, causing subject–auxiliary inversion (had she + past participle), followed by 'when' + past simple. Meaning: the second event followed the first almost immediately. Use: formal/literary, emphatic, creates dramatic effect; the neutral equivalent is 'She had hardly sat down when…' or 'As soon as she sat down…'.",
  },
  {
    id: "d-test", type: "ai",
    title: "Evaluating a test",
    area: "Paper 2 · Assessment",
    scenario: "A B2 group has finished a three-week unit on narrative tenses and telling stories. The teacher uses this end-of-unit progress test. The result counts for 30% of the course grade.\n\nSection A (20 marks, 15 min): 20 separate sentences; learners write the correct form of the verb in brackets (past simple, past continuous, past perfect). One answer per gap in the key.\nSection B (10 marks, 25 min): learners write a 150-word story based on a picture prompt. The teacher marks it with a 4-category scale: task, organisation, range of narrative tenses, accuracy.\nSection C (10 marks, 10 min): learners listen twice to a 2-minute recorded anecdote and answer 5 multiple-choice questions (4 options each).\n\nOnly Section B is returned with written comments; Sections A and C are returned with a score.\n\nEvaluate the test: identify its main strengths and weaknesses in terms of validity, reliability, practicality and washback. Then suggest two changes and justify them.",
    fields: [
      { key: "strengths", label: "Main strengths (with reference to the test)", rows: 5 },
      { key: "weak", label: "Main weaknesses (with reference to the test)", rows: 7 },
      { key: "improve", label: "Two changes and their justification", rows: 5 },
    ],
    criteria: [
      "Recognises strengths: good content validity overall (tests the unit's language and both receptive and productive skills); Section A is practical and objectively marked; Section B uses an analytic scale, which supports scorer reliability and gives positive washback on writing.",
      "Identifies the problem in Section A: decontextualised sentences test recognition of form rather than use in discourse; in narrative tenses more than one answer is often possible, so a one-answer key lowers reliability and validity.",
      "Identifies weighting and coverage issues: discrete grammar is 50% of the test while the unit's communicative aim (telling stories) is partly tested; speaking/oral storytelling is not tested at all; only 5 MC items in Section C — too few for reliable measurement and 25% chance of guessing.",
      "Notes single rater for Section B without moderation or standardisation, and the higher stakes (30% of the course grade) that make reliability more important.",
      "Notes limited formative value/washback: Sections A and C return only a score.",
      "Changes are specific, feasible and clearly linked to the weaknesses identified (e.g. contextualise Section A as a story with alternatives in the key; more listening items; a short oral storytelling task; second marking of a sample; feedback on all sections).",
    ],
    model: "Strengths: the test samples the unit content (narrative tenses) and combines grammar, writing and listening, so content validity is reasonable. Section A is quick to administer and objectively marked. Section B has an analytic scale, which supports scorer reliability and encourages learners to plan and organise stories (positive washback).\nWeaknesses: Section A uses isolated sentences, so it tests recognition of form, not the use of tenses to sequence a story; narrative tense choice is often context-dependent (past simple vs past perfect), so a one-answer key may mark correct answers wrong — a threat to both validity and reliability. Weighting: discrete grammar = half of the marks, while storytelling — the unit's communicative aim — is only partly tested and oral storytelling not at all. Section C has only 5 four-option items: too few items for a reliable score and a 25% guessing chance per item. Section B has one rater with no moderation, although the result counts for 30% of the grade. Only Section B receives comments, so Sections A and C give little formative information.\nChanges: (1) Turn Section A into a gap-filled story with an answer key that accepts justified alternatives — tests tense choice in context and improves validity. (2) Reduce Section A, increase Section C to 10 items and add a 2-minute oral storytelling task assessed with the same scale; double-mark a sample of scripts to check reliability.",
  },
  {
    id: "d-mat", type: "ai",
    title: "Analysing coursebook material",
    area: "Paper 2 · Materials",
    scenario: "A coursebook unit for B1 learners has this sequence:\n\nEx 1. Grammar box: 'We use the present perfect for experiences: I have visited Paris. We use the past simple for finished time: I visited Paris in 2019.'\nEx 2. Choose the correct form in 10 sentences, e.g. 'I've been / I went to Rome last year.'\nEx 3. Listen to two friends talking about holidays. Tick the countries they mention.\nEx 4. Read the transcript. Underline the examples of the present perfect and the past simple.\nEx 5. Write five true sentences about yourself beginning 'I have never…'.\nEx 6. Find someone who…: walk around the class asking 'Have you ever…?' If the answer is yes, ask 'When did you…?'\n\nThe material will be used with B1 learners whose L1 is Kazakh or Russian.\n\n(a) Identify the purpose of each exercise. (b) Identify two assumptions about language learning that underlie the sequence. (c) Comment on one strength and one potential problem of the sequence for these learners.",
    fields: [
      { key: "purpose", label: "(a) Purpose of each exercise (Ex 1–6)", rows: 7 },
      { key: "assump", label: "(b) Two assumptions about learning", rows: 4 },
      { key: "eval", label: "(c) One strength and one potential problem for these learners", rows: 5 },
    ],
    criteria: [
      "Ex 1: deductive presentation of form and use through a rule; Ex 2: controlled, discrete-item practice focusing on form/choice; Ex 3: listening for specific information (with language used in context); Ex 4: noticing/consolidation of the target forms in a text; Ex 5: controlled-to-less-controlled personalised written practice; Ex 6: freer oral practice that reproduces the natural discourse pattern (present perfect to open, past simple for details).",
      "Assumptions are justified from the sequence, e.g. explicit rules before exposure help learners (deductive, PPP-type approach); accuracy before fluency / controlled before free practice; grammar can be learnt as discrete rules; texts serve mainly as a vehicle for grammar; personalisation aids retention.",
      "Strength is specific (e.g. Ex 6 shows the authentic 'Have you ever…? — When did you…?' pattern; personalisation in Ex 5–6).",
      "Problem is specific and linked to the learners: e.g. Kazakh and Russian have no equivalent present perfect/past simple contrast, so the short rule may not build understanding of meaning; no concept checking or timelines; Ex 3 task does not focus on the target language; isolated sentences in Ex 2; the rule oversimplifies (been/gone, recent news, unfinished time).",
      "Uses accurate metalanguage and refers to the exercises explicitly.",
    ],
    model: "(a) Ex 1 — deductive presentation: the rule is given before any context. Ex 2 — controlled, discrete-item practice of the choice between forms. Ex 3 — listening for specific information; the target forms appear in natural use, but the task does not focus on them. Ex 4 — noticing: learners find the forms in the transcript, connecting the rule to discourse. Ex 5 — controlled, personalised written practice of 'never' with the present perfect. Ex 6 — freer oral practice (mingle) reproducing the typical pattern: present perfect to introduce an experience, past simple for the details.\n(b) Assumptions: (1) learners benefit from an explicit rule before meeting the language in context — a deductive, PPP-type view; (2) practice should move from controlled accuracy to freer fluency, and personalisation helps memory.\n(c) Strength: Ex 6 models the authentic discourse shift (Have you ever…? — When did you…?), which the rule in Ex 1 does not explain. Problem: Kazakh and Russian express both meanings with one past form, so a one-line rule with no timelines or CCQs is unlikely to build understanding of the concept of 'unspecified time connected to now'; Ex 2 practises a mechanical choice cued by 'last year', so learners may succeed without understanding the meaning.",
  },
];

export const normTerm = s => (s || "").toLowerCase().replace(/[^a-z\s-]/g, "").replace(/\s+/g, " ").trim();
