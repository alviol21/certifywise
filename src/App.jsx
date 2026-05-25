import { useState, useRef, useEffect } from "react";

// ===========================================================
//  ВОПРОСЫ — встроены прямо в код
// ===========================================================
const QUESTIONS = {
  TKT: {
    "Module 1 — Language": [
      { id:"t1-1", q:"Which of the following is an example of a 'lexical chunk'?", opts:["run","the book","as a matter of fact","beautiful"], ans:2, exp:"Lexical chunks are multi-word units used as wholes. 'As a matter of fact' is a fixed expression — a classic chunk." },
      { id:"t1-2", q:"Which term describes the study of how words are formed?", opts:["Phonology","Morphology","Syntax","Pragmatics"], ans:1, exp:"Morphology studies word formation — prefixes, suffixes, and roots." },
      { id:"t1-3", q:"What does 'CCQ' stand for in language teaching?", opts:["Communicative Classroom Question","Concept Checking Question","Critical Content Query","Corrective Comment"], ans:1, exp:"CCQ = Concept Checking Question. Used to verify learners have understood meaning, form, or use of a language item." },
      { id:"t1-4", q:"Which of these is an example of a 'false friend'?", opts:["'actually' (English) ≠ 'actualmente' (Spanish = currently)","'cat' and 'chat'","'big' and 'large'","'run' in different contexts"], ans:0, exp:"False friends look/sound similar in two languages but mean different things. 'Actually' and 'actualmente' are classic examples." },
      { id:"t1-5", q:"What is 'drilling' in language teaching?", opts:["A reading strategy","Repetition practice of a language item","A writing correction technique","An assessment method"], ans:1, exp:"Drilling is controlled oral repetition used to practice pronunciation, form, and use of language items." },
      { id:"t1-6", q:"Which describes 'primary stress'?", opts:["The weak syllable in a word","The most prominent syllable in a word","Sentence-level intonation","Weak forms"], ans:1, exp:"Primary stress = the syllable carrying most emphasis. In 'photograph' → PHO-to-graph." },
      { id:"t1-7", q:"What is 'eliciting'?", opts:["Teacher explains new language","Teacher draws language out of learners themselves","Students copy from the board","Teacher corrects errors immediately"], ans:1, exp:"Eliciting = guiding learners to produce language or ideas themselves, rather than providing it directly." },
      { id:"t1-8", q:"What is 'collocation'?", opts:["A grammar rule","Words that frequently appear together","A type of error","A phonological feature"], ans:1, exp:"Collocation: words that tend to appear together naturally. E.g., 'make a decision', 'heavy rain', 'fast food'." },
      { id:"t1-9", q:"Which of the following describes 'backchaining'?", opts:["Repeating a sentence from beginning to end","Building a sentence backwards from the end","Asking students to check their work","Writing on board while speaking"], ans:1, exp:"Backchaining: practice from the end of a phrase backwards. '…the station' → 'at the station' → 'meet you at the station'." },
      { id:"t1-10", q:"What does 'TTT' stand for?", opts:["Total Teacher Time","Test-Teach-Test","Talk-Think-Transfer","Text-Task-Test"], ans:1, exp:"TTT = Test-Teach-Test. Learners first attempt a task, receive targeted input, then do a follow-up task." },
      { id:"t1-11", q:"What is 'scaffolding' in language teaching?", opts:["Building physical classroom displays","Temporary support given to help learners do tasks beyond their current level","Testing learners without preparation","Translating texts into L1"], ans:1, exp:"Scaffolding (from Vygotsky's ZPD) = temporary support strategies that help learners achieve more than they could alone." },
      { id:"t1-12", q:"Which is an example of 'word stress' change affecting meaning?", opts:["'record' (noun, REcord) vs 'record' (verb, reCORD)","'cat' vs 'cats'","'happy' vs 'unhappy'","'big' vs 'bigger'"], ans:0, exp:"In English, stress shift changes word class. REcord (n.) → reCORD (v.). Other examples: PERmit / perMIT, PROtest / proTEST." },
    ],
    "Module 2 — Lesson Planning": [
      { id:"t2-1", q:"Which part of a lesson plan describes what students will be able to do by the end?", opts:["Procedure","Aims/Objectives","Timing","Materials"], ans:1, exp:"Aims/objectives describe intended learning outcomes — what learners will know or do after the lesson." },
      { id:"t2-2", q:"What does 'staging' a lesson mean?", opts:["Using drama activities","Organizing the lesson into a logical sequence of steps","Setting up the classroom","Assigning student roles"], ans:1, exp:"Staging = organizing a lesson into a coherent sequence where each step builds on the previous one." },
      { id:"t2-3", q:"What is the main purpose of a 'warmer' activity?", opts:["To assess grammar knowledge","To introduce new vocabulary","To engage students and prepare them for the lesson","To practise writing skills"], ans:2, exp:"A warmer is a short motivating activity at lesson start — creates positive atmosphere and mental readiness for learning." },
      { id:"t2-4", q:"Which resource is considered 'realia'?", opts:["A textbook","A real object brought into the classroom","A picture on the board","A recorded audio file"], ans:1, exp:"Realia = real objects from everyday life — newspapers, product packaging, coins — used to make learning authentic." },
      { id:"t2-5", q:"What does 'differentiation' mean in lesson planning?", opts:["Using different accents in listening","Adapting tasks for different learners' needs and levels","Teaching different subjects","Using various classroom layouts"], ans:1, exp:"Differentiation = planning activities and support that accommodate different learner needs, levels, and paces." },
      { id:"t2-6", q:"What is a 'gist' task in reading/listening?", opts:["A detailed comprehension task","A task focusing on general understanding","A grammar translation task","A vocabulary matching task"], ans:1, exp:"Gist task = general understanding of a text — the main idea. Comes before detail tasks." },
      { id:"t2-7", q:"In PPP, what does the first P stand for?", opts:["Practice","Presentation","Production","Planning"], ans:1, exp:"PPP = Presentation–Practice–Production. First P = Presentation, where the teacher introduces and explains new language." },
      { id:"t2-8", q:"Which activity best describes 'controlled practice'?", opts:["Free role-play with no language constraints","Gap-fill exercises with one correct answer","An open class discussion","Writing a personal essay"], ans:1, exp:"Controlled practice limits learners to specific target language. Gap-fills, substitution drills, sentence transformation." },
      { id:"t2-9", q:"What is 'TTT' (Teacher Talking Time) in lesson planning?", opts:["Time teachers spend testing students","The proportion of class time the teacher speaks","Total teaching time per week","Teacher training time"], ans:1, exp:"TTT = amount of time the teacher spends talking in class. Good lesson design reduces TTT and increases STT (Student Talking Time)." },
      { id:"t2-10", q:"What does 'boardwork' refer to in a lesson?", opts:["Homework given from the coursebook","How the teacher uses the board to record/display language","Board games used in class","Classroom arrangement"], ans:1, exp:"Boardwork = how the teacher uses the board — for vocabulary, grammar rules, timelines, concept maps. Good boardwork supports learning." },
    ],
    "Module 3 — Assessment": [
      { id:"t3-1", q:"What is 'formative assessment'?", opts:["Assessment at the end of a course","Ongoing assessment to monitor and support learning","A standardized national exam","A placement test"], ans:1, exp:"Formative assessment = ongoing, informal assessment during learning, providing feedback to guide future teaching." },
      { id:"t3-2", q:"What does 'summative assessment' measure?", opts:["Learning during the process","Learning at the end of a course or unit","Student motivation","Teacher performance"], ans:1, exp:"Summative assessment measures what learners have achieved at the end of a period — final exams, end-of-unit tests." },
      { id:"t3-3", q:"Which type of feedback focuses on CONTENT, not accuracy?", opts:["Explicit correction","Recasting","Content feedback","Elicitation"], ans:2, exp:"Content feedback responds to ideas/meaning in what the learner said, not the language accuracy." },
      { id:"t3-4", q:"What is 'peer assessment'?", opts:["Teacher assessing students","Students evaluating each other's work","Self-evaluation","External examiner assessment"], ans:1, exp:"Peer assessment = learners evaluating each other's work against set criteria. Develops critical thinking and collaboration." },
      { id:"t3-5", q:"Which is an example of 'implicit' error correction?", opts:["'No, we say: He went, not He go'","Repeating what the learner said correctly (recasting)","Writing the correct form on the board","Asking the student to look at the rule"], ans:1, exp:"Recasting = implicit correction — the teacher reformulates the student's utterance correctly without explicitly pointing out the error." },
      { id:"t3-6", q:"What is a 'portfolio' in language assessment?", opts:["A teacher's lesson plan file","A collection of student work showing progress over time","A grammar reference book","A set of exam papers"], ans:1, exp:"Portfolio = a purposeful collection of student work showing learning and development over time. A form of authentic assessment." },
      { id:"t3-7", q:"What is 'diagnostic testing'?", opts:["Testing at the end of a course","Testing before teaching to identify what learners already know and don't know","A placement test","A mock exam"], ans:1, exp:"Diagnostic testing identifies specific strengths and weaknesses BEFORE teaching, so the teacher can target instruction accordingly." },
      { id:"t3-8", q:"What does 'validity' mean in testing?", opts:["The test is consistent","The test measures what it claims to measure","The test is easy to mark","The test is fair to all students"], ans:1, exp:"Validity = a test truly measures what it intends to measure. E.g., a speaking test that asks students to write is not valid." },
    ],
  },
  CELTA: {
    "Language Awareness": [
      { id:"c1-1", q:"A student says: 'Yesterday I have seen a good film.' What type of error is this?", opts:["Phonological error","Tense error — present perfect used instead of past simple","Vocabulary error","Word order error"], ans:1, exp:"'Yesterday' signals a specific past time → past simple required ('saw'). Present perfect ('have seen') is used without a specific time reference." },
      { id:"c1-2", q:"How do you analyze the form of 'She has been working'?", opts:["Subject + verb + gerund","Subject + have/has + been + verb-ing (present perfect continuous)","Subject + to be + verb-ing","Subject + had + past participle"], ans:1, exp:"Present perfect continuous: Subject + have/has + been + verb-ing. Describes an action that started in the past and continues or recently stopped." },
      { id:"c1-3", q:"What should concept checking for 'I used to play football' verify?", opts:["Pronunciation of 'used'","(1) It was a past habit, (2) it no longer happens now","Whether the student likes football","The spelling of 'used to'"], ans:1, exp:"CCQs for 'used to': 'Did this happen in the past?' (yes) 'Does it happen now?' (no) — confirms past habit, no longer occurring." },
      { id:"c1-4", q:"A student writes: 'He suggested to go to the cinema.' How do you correct this?", opts:["No correction needed","'Suggest' takes a gerund: 'He suggested going to the cinema'","Change to 'He suggested going at cinema'","Change to 'He suggested to going'"], ans:1, exp:"'Suggest' + gerund (verb-ing) OR 'suggest' + that-clause. NOT suggest + infinitive. Correct: 'He suggested going to the cinema'." },
      { id:"c1-5", q:"The three aspects of language you must cover when teaching vocabulary:", opts:["Spelling, pronunciation, grammar","Meaning, form, pronunciation (+ use/appropriacy)","Definition, synonym, antonym","Context, collocation, examples"], ans:1, exp:"CELTA requires covering: Meaning (what it means), Form (how it's built), Pronunciation (how it sounds). Use/appropriacy is a 4th dimension." },
      { id:"c1-6", q:"Which is the correct model sentence for second conditional?", opts:["If I study hard, I will pass.","If I won the lottery, I would travel the world.","If I had known, I would have called.","I study if I have time."], ans:1, exp:"2nd conditional: If + past simple, would + infinitive. Hypothetical/unreal present or future. 'If I won..., I would...'." },
      { id:"c1-7", q:"What is 'concept checking' for the modal 'might'?", opts:["'Is this 100% certain?' (No) 'Is it possible?' (Yes)","'Did this happen?' (Yes)","Drilling the pronunciation three times","Asking students to translate"], ans:0, exp:"'Might' = possibility, not certainty. CCQs: 'Are we sure this will happen?' (No) 'Is it possible?' (Yes) 'Is it definite?' (No)." },
      { id:"c1-8", q:"A student says 'I am agree with you.' What is the error?", opts:["Vocabulary error","'Agree' is a stative verb — correct form: 'I agree with you' (no auxiliary needed)","Pronunciation error","Missing article"], ans:1, exp:"Stative verbs (agree, know, believe, understand) are not used in continuous forms. Correct: 'I agree' (state, not action)." },
      { id:"c1-9", q:"What does 'word stress' affect in English?", opts:["Spelling only","Comprehension — mispronouncing stress can make words unrecognisable","Grammar only","Writing style"], ans:1, exp:"Stress placement is crucial in English. Native speakers rely heavily on stress patterns. Wrong stress can make a word completely unrecognisable." },
      { id:"c1-10", q:"What is 'colligation'?", opts:["Words that sound similar","Grammatical patterns that words typically appear in (e.g., 'depend ON')","Two synonyms","A type of error correction"], ans:1, exp:"Colligation = the grammatical patterns words typically go with. E.g., 'depend ON', 'interested IN', 'good AT'. Important for teaching natural language." },
    ],
    "Teaching Skills": [
      { id:"c2-1", q:"Student makes a grammar error during a fluency activity. What is the BEST approach?", opts:["Stop the activity immediately and correct them","Note it down for delayed error correction AFTER the activity","Ignore it completely","Ask other students to correct immediately"], ans:1, exp:"During fluency activities, interruption hinders communication. CELTA recommends delayed error correction — maintaining fluency, then addressing errors after." },
      { id:"c2-2", q:"What does 'ICQ' stand for and when do you use it?", opts:["Incorrect Content Query — after an error","Instruction Checking Question — BEFORE a task to check students understand what to do","Immediate Correction Question — during task","Individual Concept Question"], ans:1, exp:"ICQ = Instruction Checking Question. Used BEFORE a task: 'Are you writing or speaking? Alone or in pairs?' — checks comprehension without repeating instructions." },
      { id:"c2-3", q:"In CELTA grading, what does 'rapport' refer to?", opts:["Teacher's grammar accuracy","The positive connection between teacher and students","Lesson timing","Use of the board"], ans:1, exp:"Rapport = the positive, respectful, supportive relationship the teacher builds with learners — essential for a safe learning environment." },
      { id:"c2-4", q:"A lesson focuses on 'Reading for detail.' Which task best achieves this?", opts:["Read and get the general topic in 1 minute","Answer specific comprehension questions requiring precise information","Put paragraphs in order","Predict content from the title"], ans:1, exp:"Reading for detail = extracting specific information from the text. Comprehension questions targeting precise facts, figures, or events." },
      { id:"c2-5", q:"What is the purpose of 'staging' a CELTA lesson?", opts:["To impress the observer","To create a logical sequence where each activity builds on the previous","To cover as many activities as possible","To divide the lesson into equal time blocks"], ans:1, exp:"Staging creates coherent lesson flow — activities progress logically, e.g., from controlled to freer practice, or receptive to productive skills." },
      { id:"c2-6", q:"What is 'student-centred' teaching?", opts:["Teacher talks for most of the lesson","Learners are active participants; tasks focus on their needs, interaction, and communication","Using students' names only","Letting students choose topics"], ans:1, exp:"Student-centred teaching = learners actively engage, interact, and communicate. Teacher facilitates rather than lectures. High STT, meaningful tasks." },
      { id:"c2-7", q:"What is 'monitoring' during a practice activity?", opts:["Writing on the board","Teacher circulates to observe, listen, support, and note errors/successes during tasks","Testing students individually","Playing audio"], ans:1, exp:"Monitoring = teacher moves around the room during tasks — to check comprehension, support learners, note language for delayed feedback." },
    ],
    "Lesson Planning": [
      { id:"c3-1", q:"What should CELTA lesson aims clearly state?", opts:["What the teacher will do","What students will be able to do/know by the end","The grammar point being taught","Materials used"], ans:1, exp:"CELTA aims are learner-centred: 'By the end of the lesson, students will be able to...' — focused on learning outcomes, not teacher actions." },
      { id:"c3-2", q:"Main aim vs subsidiary aim in a CELTA plan:", opts:["No difference","Main = primary learning focus; Subsidiary = secondary skill/language that supports it","Subsidiary is more important","Main aim is the warmer"], ans:1, exp:"Main aim = primary outcome (e.g., practice past simple). Subsidiary aims support this (e.g., vocabulary building, reading as context for grammar)." },
      { id:"c3-3", q:"'Anticipated problems and solutions' in a CELTA plan refers to:", opts:["Technology problems","Predicted difficulties learners might have + planned responses","Behaviour management","Time overruns"], ans:1, exp:"This section shows pedagogical awareness: predicting likely difficulties (confusing forms, unclear instructions) and planning how to address them." },
      { id:"c3-4", q:"What is a 'lead-in' stage in a CELTA lesson?", opts:["The final activity","An introduction that activates learners' interest and prior knowledge before the main task","A grammar explanation","A homework assignment"], ans:1, exp:"Lead-in = opening stage that creates interest, activates schema (prior knowledge), and connects learners to the lesson topic." },
      { id:"c3-5", q:"What is 'task-based learning' (TBL)?", opts:["Teaching grammar rules first, then applying them","Using a meaningful real-world task as the core of the lesson; language emerges from task completion","Reading a textbook and answering questions","Completing gap-fill exercises"], ans:1, exp:"TBL: learners complete a meaningful task first, using any language available. Then focus on language that emerged. Meaning before form." },
    ],
  },
  IELTS: {
    "Academic Reading": [
      { id:"ir-1", type:"tfng", passage:"The term 'urban heat island' refers to metropolitan areas that are significantly warmer than surrounding rural areas due to human activities. The primary cause is the modification of land surfaces, which changes how heat is absorbed and released. Buildings, roads, and other infrastructure absorb and re-emit the sun's heat more than natural landscapes such as forests and water bodies.", q:"The urban heat island effect is primarily caused by differences in vegetation between cities and rural areas.", opts:["True","False","Not Given"], ans:1, exp:"FALSE. The passage states the primary cause is 'modification of land surfaces' and absorption by 'buildings, roads, and infrastructure' — not vegetation differences." },
      { id:"ir-2", type:"tfng", passage:"The term 'urban heat island' refers to metropolitan areas that are significantly warmer than surrounding rural areas due to human activities. The primary cause is the modification of land surfaces, which changes how heat is absorbed and released.", q:"Metropolitan areas can be considerably warmer than surrounding rural regions.", opts:["True","False","Not Given"], ans:0, exp:"TRUE. The passage directly states urban areas are 'significantly warmer than surrounding rural areas'." },
      { id:"ir-3", type:"tfng", passage:"The term 'urban heat island' refers to metropolitan areas that are significantly warmer than surrounding rural areas due to human activities. The primary cause is the modification of land surfaces.", q:"Urban heat islands have existed since the Industrial Revolution.", opts:["True","False","Not Given"], ans:2, exp:"NOT GIVEN. No information about historical origin appears in the passage. Cannot confirm or deny this claim." },
      { id:"ir-4", q:"In IELTS Academic Reading, how many sections and what is the time limit?", opts:["2 sections, 40 minutes","3 sections, 60 minutes","4 sections, 80 minutes","3 sections, 40 minutes"], ans:1, exp:"IELTS Academic Reading: 3 sections, 40 questions, 60 minutes (including transfer time). Texts increase in difficulty." },
      { id:"ir-5", q:"For 'Matching Headings' questions, the most effective strategy is:", opts:["Read all headings first, then the whole text","Read each paragraph, identify main idea, then match to headings","Match headings alphabetically","Only read first sentences of each paragraph"], ans:1, exp:"Best strategy: Read each paragraph → identify its main point → find the heading that best summarises it. First and last sentences usually carry the main idea." },
      { id:"ir-6", q:"For 'True / False / Not Given' questions, 'Not Given' means:", opts:["The statement is wrong","The statement is right","The text neither confirms nor contradicts the statement","The statement is partially true"], ans:2, exp:"NOT GIVEN: the text provides no information to confirm OR contradict the claim. Do not use outside knowledge — only the passage." },
      { id:"ir-7", q:"Which skill is primarily tested in IELTS 'Matching Information' tasks?", opts:["Guessing meaning from context","Locating specific information in different parts of a text","Understanding overall argument","Identifying figurative language"], ans:1, exp:"Matching Information = scanning — quickly locating specific information (facts, examples, reasons) in different paragraphs without reading everything." },
    ],
    "Academic Writing": [
      { id:"iw-1", q:"What is the minimum word count for IELTS Writing Task 1 (Academic)?", opts:["100 words","150 words","200 words","250 words"], ans:1, exp:"Task 1 minimum: 150 words. Writing fewer results in a penalty. Recommended: 160–200 words in ~20 minutes." },
      { id:"iw-2", q:"Which is NOT an assessment criterion for IELTS Writing?", opts:["Task Achievement/Response","Coherence and Cohesion","Lexical Resource","Reading Speed"], ans:3, exp:"IELTS Writing criteria: Task Achievement (T1) / Task Response (T2), Coherence & Cohesion, Lexical Resource, Grammatical Range & Accuracy." },
      { id:"iw-3", q:"For Task 2 'Discuss both views + give your opinion', your structure should:", opts:["Only argue one side","Present BOTH sides of the argument AND clearly state your own position","Avoid giving a personal opinion","Write only about advantages"], ans:1, exp:"Discussion essay: present both views fairly, then clearly state and support your opinion. Don't be vague about your position." },
      { id:"iw-4", q:"Which phrase introduces a contrasting idea in Task 2?", opts:["Furthermore","However / On the other hand","In addition","Therefore"], ans:1, exp:"'However' and 'On the other hand' signal contrast/concession. 'Furthermore'/'In addition' add similar ideas. 'Therefore' shows result." },
      { id:"iw-5", q:"In Task 1, if the graph shows data over time, you should primarily:", opts:["Compare all data points equally","Describe trends, changes, and key features over time","List every single figure","Only describe the highest and lowest values"], ans:1, exp:"For time-series graphs: focus on TRENDS (increase, decrease, fluctuation, stability) and notable features — not every single data point." },
      { id:"iw-6", q:"What is an 'overview' in IELTS Writing Task 1 and why is it essential?", opts:["A summary of the question","A 2-3 sentence description of the most significant patterns/features, written without specific data","The conclusion paragraph","A detailed analysis of all figures"], ans:1, exp:"Overview = 2–3 sentence summary of the most striking features of the data, written without specific numbers. Essential for Band 6+. Often called the 'big picture'." },
      { id:"iw-7", q:"What does 'task response' assess in IELTS Writing Task 2?", opts:["Vocabulary variety","Whether you addressed all parts of the question fully and developed a clear position","Sentence structure complexity","Spelling accuracy"], ans:1, exp:"Task Response: Have you answered ALL parts of the question? Is your position clear and consistent? Are ideas fully developed with examples?" },
    ],
    "Listening": [
      { id:"il-1", q:"How many sections does IELTS Listening have?", opts:["2","3","4","5"], ans:2, exp:"4 sections, 40 questions, ~30 minutes audio + 10 min transfer time. Difficulty increases: social → academic." },
      { id:"il-2", q:"Key strategy BEFORE each listening section:", opts:["Close your eyes and relax","Read ahead — preview the questions to focus on what to listen for","Write down everything you hear","Start answering immediately"], ans:1, exp:"Preview questions before the audio starts. This activates schema and focuses your attention on the specific information needed." },
      { id:"il-3", q:"In Section 3, who typically speaks?", opts:["One person in a social setting","Two people having a casual conversation","2–4 people in an academic context (discussion, seminar, tutorial)","A lecturer giving a formal talk"], ans:2, exp:"Section 3 = academic discussion between 2–4 people (students, tutor). More complex vocabulary and multiple speakers." },
      { id:"il-4", q:"If you miss an answer during the recording, you should:", opts:["Stop and rewind","Panic and stop listening","Leave it blank and immediately focus on the next question","Ask the examiner"], ans:2, exp:"Never dwell on a missed answer. Move on immediately — missing one answer may cause you to miss the next. Return if time allows at the end." },
      { id:"il-5", q:"Word limit instructions like 'NO MORE THAN TWO WORDS' mean:", opts:["You can write 3 words if needed","You must write exactly two words","You must write two words or fewer","You can paraphrase freely"], ans:2, exp:"Strictly follow the word limit. 'No more than two words' = 1 or 2 words only. Three words = automatic wrong answer." },
    ],
    "Speaking": [
      { id:"is-1", q:"How many parts does IELTS Speaking have?", opts:["2 parts","3 parts","4 parts","1 part"], ans:1, exp:"3 parts: Part 1 (interview, ~4–5 min), Part 2 (long turn with cue card, ~3–4 min), Part 3 (discussion, ~4–5 min). Total: 11–14 minutes." },
      { id:"is-2", q:"In Part 2, you have 1 minute to prepare. Best use of this time:", opts:["Write a full essay","Make brief notes on key points for each prompt on the card","Memorise a prepared speech","Ask for a dictionary"], ans:1, exp:"Use preparation time to jot bullet points covering each prompt. Helps you speak fluently for 1–2 minutes without long pauses." },
      { id:"is-3", q:"Which criterion assesses how naturally and fluently you speak?", opts:["Lexical Resource","Fluency and Coherence","Grammatical Range and Accuracy","Pronunciation"], ans:1, exp:"Fluency & Coherence: how smoothly and logically you speak — avoiding long pauses, self-correction, and repetition while organizing ideas clearly." },
      { id:"is-4", q:"To improve your Lexical Resource score, you should:", opts:["Speak very slowly","Use a wide range of vocabulary accurately, including less common words and collocations","Use only simple, safe vocabulary","Repeat key words often"], ans:1, exp:"Lexical Resource: range, accuracy, and flexibility of vocabulary use. Use topic-specific words, collocations, and paraphrase when needed." },
      { id:"is-5", q:"In Part 3, the examiner asks abstract questions. The best response strategy:", opts:["Give short yes/no answers","Give a direct answer, then explain/justify, then give an example or counterpoint","Repeat the question before answering","Only agree with the examiner"], ans:1, exp:"Part 3 responses: Answer + Explain + Example/Qualification. Show you can discuss complex ideas, express opinions, and speculate." },
    ],
  },
  DELTA: {
    "Module 1 — Background Knowledge": [
      { id:"d1-1", q:"Which linguist is associated with 'Communicative Competence'?", opts:["Noam Chomsky","Dell Hymes","Stephen Krashen","Michael Lewis"], ans:1, exp:"Dell Hymes (1972) coined 'communicative competence' — the ability to use language appropriately in social contexts, extending Chomsky's purely linguistic competence." },
      { id:"d1-2", q:"What is Krashen's 'Input Hypothesis'?", opts:["Acquisition via grammar rules","Acquisition via comprehensible input slightly above current level (i+1)","Output practice is the key","L1 should be used in the classroom"], ans:1, exp:"Krashen (1982): language is acquired when learners receive comprehensible input at 'i+1' — just beyond current competence, in a low-anxiety environment." },
      { id:"d1-3", q:"What does 'interlanguage' refer to?", opts:["A learner's native language","The developing language system between L1 and target language","Bilingual education","Code-switching"], ans:1, exp:"Interlanguage (Selinker, 1972): the dynamic, rule-governed developing system of a learner — systematic but containing features of both L1 and L2, evolving over time." },
      { id:"d1-4", q:"Which approach uses tasks as the primary unit of syllabus design?", opts:["Grammar-Translation","Task-Based Language Teaching (TBLT)","Audio-Lingual Method","Silent Way"], ans:1, exp:"TBLT (Ellis, 2003; Willis, 1996): meaningful tasks are the core unit. Learners focus on meaning and communication; language emerges from task completion." },
      { id:"d1-5", q:"What is 'fossilization' in SLA?", opts:["A 1960s teaching method","Permanent retention of non-target-like features in a learner's interlanguage","A test format","Rapid language progress"], ans:1, exp:"Fossilization (Selinker, 1972): certain non-native forms become permanently fixed in the interlanguage, resistant to further development even with instruction." },
      { id:"d1-6", q:"What is the 'lexical approach' associated with?", opts:["Audiolingual drills","Michael Lewis — teaching language as multi-word chunks, not grammar rules","Communicative activities only","Silent reading"], ans:1, exp:"Michael Lewis (1993): language consists of multi-word units (chunks, collocations, fixed expressions). Teaching these is more effective than focusing on isolated grammar rules." },
      { id:"d1-7", q:"'L1 interference' (negative transfer) means:", opts:["Using L1 in class","Learner incorrectly applies L1 rules to L2 production","Overusing the target language","L1 helping L2 acquisition"], ans:1, exp:"Negative transfer: L1 grammar or phonological patterns are incorrectly applied to L2. E.g., Spanish speaker: 'I am agree' (calque of 'estoy de acuerdo')." },
      { id:"d1-8", q:"Vygotsky's 'Zone of Proximal Development' (ZPD) in language learning:", opts:["Learner's current independent level","Gap between what a learner can do alone vs with support — where effective teaching operates","Teacher's competence level","Advanced grammar structures"], ans:1, exp:"ZPD: distance between current level and potential level with guidance. Effective teaching operates within this zone — scaffolding stretches learners." },
      { id:"d1-9", q:"What is 'affective filter' (Krashen)?", opts:["A grammar filter for accuracy","A psychological barrier (anxiety, low motivation, low self-esteem) that blocks input from reaching the LAD","A listening comprehension strategy","A test design principle"], ans:1, exp:"Krashen's Affective Filter Hypothesis: high anxiety, low motivation, and low self-esteem create a 'filter' that prevents comprehensible input from being acquired." },
      { id:"d1-10", q:"What is 'overgeneralization' in L2 acquisition?", opts:["Using too much vocabulary","Applying a rule too broadly — e.g., 'I goed' instead of 'I went'","Using L1 patterns","Ignoring grammar rules"], ans:1, exp:"Overgeneralization: learner applies a rule beyond its valid scope. E.g., regular past -ed applied to irregular verbs: 'goed', 'eated', 'buyed'. A natural developmental error." },
    ],
    "Module 2 — Professional Practice": [
      { id:"d2-1", q:"In DELTA Module 2, what is 'Experimental Practice' (EP)?", opts:["A written exam","Teaching practice using a new methodology, with critical written reflection","Observing another teacher","A language analysis task"], ans:1, exp:"EP in DELTA M2: plan, teach, and critically reflect on a lesson using an unfamiliar approach — demonstrating willingness to experiment and self-evaluate." },
      { id:"d2-2", q:"What is 'critical reflection' in DELTA?", opts:["Criticising other teachers","Analytical evaluation of one's own teaching — examining what happened, why, and how to improve","Writing lesson plans","Observing students"], ans:1, exp:"Critical reflection: beyond description — analysing reasons behind outcomes, challenging assumptions, and planning informed changes to practice. Core DELTA skill." },
      { id:"d2-3", q:"What is 'needs analysis' in course design?", opts:["Analysing the course book","Systematically gathering information about what learners need to learn and why","Testing grammar knowledge","Organising classroom furniture"], ans:1, exp:"Needs analysis: investigates target needs (what learners need to do with language in real life) and learning needs (what they need in class to get there)." },
      { id:"d2-4", q:"What is 'lesson observation' used for in DELTA?", opts:["Testing students","Professional development — analysing another teacher's practice critically and constructively","Entertainment","Assessing the school"], ans:1, exp:"Observation in DELTA: a structured professional development tool. You observe with a focus, take notes, and reflect critically — not just watch." },
      { id:"d2-5", q:"What does 'syllabus design' involve?", opts:["Choosing a course book","Systematically selecting, sequencing, and organising language content and skills for a course","Writing lesson plans only","Testing learners"], ans:1, exp:"Syllabus design: principled decisions about WHAT to teach (content), in WHAT ORDER (sequencing), and WHY (rationale). Informed by needs analysis and learning theory." },
    ],
  },
};

// ===========================================================
//  ОФИЦИАЛЬНЫЕ МАТЕРИАЛЫ
// ===========================================================
const MATERIALS = {
  TKT: {
    desc: "The Teaching Knowledge Test assesses knowledge of language, language use, and the background to language teaching and learning.",
    links: [
      { title: "TKT Handbook (Modules 1–3)", url: "https://www.cambridgeenglish.org/images/tkt-handbook-modules-1-3.pdf", type: "PDF" },
      { title: "TKT Sample Paper — Module 1", url: "https://www.cambridgeenglish.org/images/tkt-module-1-sample-paper.pdf", type: "PDF" },
      { title: "TKT Preparation — Official Cambridge Page", url: "https://www.cambridgeenglish.org/teaching-english/teaching-qualifications/tkt/prepare-for-tkt/", type: "WEB" },
      { title: "TKT Glossary of English Language Teaching Terminology", url: "https://www.cambridgeenglish.org/images/tkt-glossary-english-language-teaching.pdf", type: "PDF" },
    ]
  },
  CELTA: {
    desc: "The Certificate in English Language Teaching to Adults — the world's most widely taken initial qualification for English language teachers.",
    links: [
      { title: "CELTA Syllabus & Assessment Guidelines", url: "https://www.cambridgeenglish.org/images/21816-celta-syllabus.pdf", type: "PDF" },
      { title: "About the CELTA Course — Cambridge", url: "https://www.cambridgeenglish.org/teaching-english/teaching-qualifications/celta/about-the-celta-course/", type: "WEB" },
      { title: "CELTA Input Sessions — What to Expect", url: "https://www.cambridgeenglish.org/teaching-english/teaching-qualifications/celta/about-the-celta-course/celta-course-components/", type: "WEB" },
    ]
  },
  IELTS: {
    desc: "The International English Language Testing System — measures English language proficiency for academic, professional, and immigration purposes.",
    links: [
      { title: "Official IELTS Sample Test Questions", url: "https://ielts.org/take-a-test/preparation-resources/sample-test-questions", type: "WEB" },
      { title: "IELTS Writing Band Descriptors (Task 1 & 2)", url: "https://www.ielts.org/globalassets/dc/writing-band-descriptors-17-mar-2022.pdf", type: "PDF" },
      { title: "IELTS Speaking Band Descriptors", url: "https://www.ielts.org/globalassets/dc/speaking-band-descriptors.pdf", type: "PDF" },
      { title: "Cambridge IELTS Preparation — Official", url: "https://www.cambridgeenglish.org/exams-and-tests/ielts/preparation/", type: "WEB" },
      { title: "IELTS Academic Reading Sample (Cambridge)", url: "https://www.cambridgeenglish.org/Images/174777-ielts-academic-reading-sample-task-identifying-information.pdf", type: "PDF" },
    ]
  },
  DELTA: {
    desc: "The Diploma in English Language Teaching to Adults — an advanced internationally recognised qualification for experienced English language teachers.",
    links: [
      { title: "DELTA Handbook for Tutors and Candidates", url: "https://www.cambridgeenglish.org/Images/181161-delta-handbook-for-tutors-and-candidates-document.pdf", type: "PDF" },
      { title: "DELTA Syllabus", url: "https://www.cambridgeenglish.org/Images/22096-delta-syllabus.pdf", type: "PDF" },
      { title: "About DELTA — Cambridge Official", url: "https://www.cambridgeenglish.org/teaching-english/teaching-qualifications/delta/", type: "WEB" },
    ]
  }
};

// ===========================================================
//  LISTENING VIDEOS
// ===========================================================
const LISTENING = [
  { title: "IELTS Listening — Full Practice Test with Answers", section: "Full Test (Sections 1–4)", level: "All Bands", ytId: "FGFhIqHXFIA", tip: "Pause after each section to check your answers before continuing." },
  { title: "IELTS Listening Section 1 — Social Conversation Practice", section: "Section 1", level: "Band 5–6", ytId: "X9sq-zTMQ4o", tip: "Section 1 is usually about booking, appointments, or everyday situations. Focus on names, numbers, and dates." },
  { title: "IELTS Listening — Academic Lecture (Section 4)", section: "Section 4", level: "Band 6–8", ytId: "O0pRvOI-KsY", tip: "Section 4 is the hardest — one speaker, academic topic, no pause. Predict topic from questions first." },
  { title: "IELTS Listening Tips & Strategies — British Council", section: "Strategy Guide", level: "All Bands", ytId: "xnHeLlkQNUg", tip: "Watch this before taking practice tests to build effective listening habits." },
];

// ===========================================================
//  CERT INFO
// ===========================================================
const CERTS = {
  TKT:   { emoji: "📘", color: "#4a9eff", label: "Teaching Knowledge Test", tagline: "Cambridge knowledge-based certification for EFL/ESL teachers" },
  CELTA: { emoji: "📗", color: "#4caf88", label: "Certificate in English Language Teaching", tagline: "Initial teaching qualification — practical focus" },
  IELTS: { emoji: "📕", color: "#ff6b6b", label: "International English Language Testing System", tagline: "All four skills: Reading, Writing, Listening, Speaking" },
  DELTA: { emoji: "📙", color: "#c084fc", label: "Diploma in English Language Teaching", tagline: "Advanced diploma for experienced EFL teachers" },
};

const TEACHER_PASSWORD = "aidana212121"; // ← СМЕНИТЬ ПЕРЕД ДЕПЛОЕМ!

// ===========================================================
//  STYLES
// ===========================================================
const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Lora:ital,wght@0,400;0,600;1,400&family=Plus+Jakarta+Sans:wght@300;400;500;600&display=swap');
*{box-sizing:border-box;margin:0;padding:0}
body{background:#0b1622;color:#e8dfd0;font-family:'Plus Jakarta Sans',sans-serif;min-height:100vh}
.wrap{max-width:880px;margin:0 auto;padding:0 18px 60px}
h1,h2,h3,h4{font-family:'Lora',serif}
.hdr{display:flex;align-items:center;justify-content:space-between;padding:18px 0 14px;border-bottom:1px solid rgba(197,155,68,.2);margin-bottom:22px}
.logo{font-family:'Lora',serif;font-size:26px;font-weight:600;color:#c59b44;letter-spacing:.3px}
.logo span{color:#e8dfd0}
.nav{display:flex;gap:4px;margin-bottom:26px;overflow-x:auto;scrollbar-width:none;padding-bottom:2px}
.nb{padding:8px 14px;border:1px solid rgba(197,155,68,.2);background:transparent;color:#8a7d6d;border-radius:7px;cursor:pointer;font-size:13px;font-family:'Plus Jakarta Sans',sans-serif;white-space:nowrap;transition:.15s}
.nb:hover{border-color:#c59b44;color:#c59b44}
.nb.on{background:#c59b44;color:#0b1622;border-color:#c59b44;font-weight:600}
.card{background:#12253b;border:1px solid rgba(197,155,68,.15);border-radius:12px;padding:22px}
.card h3{font-size:19px;color:#c59b44;margin-bottom:8px}
.g2{display:grid;grid-template-columns:1fr 1fr;gap:14px}
.g3{display:grid;grid-template-columns:1fr 1fr 1fr;gap:14px}
@media(max-width:600px){.g2,.g3{grid-template-columns:1fr}}
.cbtn{width:100%;text-align:left;padding:18px;background:#12253b;border:2px solid rgba(197,155,68,.2);border-radius:12px;cursor:pointer;transition:.2s;color:#e8dfd0}
.cbtn:hover{border-color:#c59b44;transform:translateY(-2px)}
.cbtn.on{border-color:#c59b44;background:#172f4a}
.cbtn h3{font-family:'Lora',serif;font-size:20px;color:#c59b44;margin:6px 0 4px}
.cbtn p{font-size:12.5px;color:#8a7d6d}
.btn{padding:10px 20px;background:#c59b44;color:#0b1622;border:none;border-radius:8px;cursor:pointer;font-weight:600;font-family:'Plus Jakarta Sans',sans-serif;font-size:13.5px;transition:opacity .15s;white-space:nowrap}
.btn:hover{opacity:.85}
.btn:disabled{opacity:.38;cursor:not-allowed}
.btn-o{background:transparent;border:1px solid #c59b44;color:#c59b44}
.btn-sm{padding:6px 13px;font-size:12.5px}
.btn-red{background:#c0392b;color:#fff}
.qcard{background:#12253b;border:1px solid rgba(197,155,68,.15);border-radius:12px;padding:26px}
.qnum{font-size:11.5px;color:#8a7d6d;text-transform:uppercase;letter-spacing:.9px;margin-bottom:7px}
.qtext{font-size:16.5px;line-height:1.65;color:#e8dfd0;margin-bottom:18px}
.qpass{background:#0b1622;border-left:3px solid #c59b44;padding:12px 16px;border-radius:4px;font-size:13.5px;line-height:1.8;color:#c0b8a8;margin-bottom:16px;font-style:italic}
.opt{display:block;width:100%;text-align:left;padding:12px 16px;margin-bottom:8px;background:#0b1622;border:1px solid rgba(255,255,255,.09);border-radius:8px;color:#e8dfd0;font-size:14.5px;cursor:pointer;transition:.15s;font-family:'Plus Jakarta Sans',sans-serif}
.opt:hover:not(:disabled){border-color:#c59b44;background:#12253b}
.opt.ok{background:rgba(76,175,136,.14);border-color:#4caf88;color:#4caf88}
.opt.ng{background:rgba(192,57,43,.14);border-color:#c0392b}
.exp{background:rgba(197,155,68,.08);border:1px solid rgba(197,155,68,.28);border-radius:8px;padding:13px 17px;margin-top:14px;font-size:13.5px;line-height:1.7;color:#c59b44}
.pbar{height:4px;background:rgba(255,255,255,.08);border-radius:2px;margin-bottom:22px}
.pfill{height:100%;background:#c59b44;border-radius:2px;transition:width .3s}
.mat{display:flex;justify-content:space-between;align-items:center;padding:13px 17px;background:#0b1622;border:1px solid rgba(255,255,255,.06);border-radius:8px;margin-bottom:7px}
.mat a{color:#c59b44;text-decoration:none;font-size:14px}
.mat a:hover{text-decoration:underline}
.badge{padding:3px 9px;border-radius:20px;font-size:11px;font-weight:700;text-transform:uppercase}
.b-pdf{background:rgba(231,76,60,.18);color:#e74c3c}
.b-web{background:rgba(52,152,219,.18);color:#5dade2}
.b-my{background:rgba(197,155,68,.18);color:#c59b44}
.tabs{display:flex;gap:2px;margin-bottom:18px;border-bottom:1px solid rgba(255,255,255,.07);padding-bottom:0}
.tab{padding:9px 18px;background:transparent;border:none;color:#8a7d6d;cursor:pointer;font-size:13.5px;font-family:'Plus Jakarta Sans',sans-serif;border-bottom:2px solid transparent;transition:.15s}
.tab:hover{color:#e8dfd0}
.tab.on{color:#c59b44;border-bottom-color:#c59b44}
.chbox{height:380px;overflow-y:auto;background:#0b1622;border:1px solid rgba(255,255,255,.07);border-radius:10px;padding:16px;margin-bottom:12px;scroll-behavior:smooth}
.msg{margin-bottom:12px;display:flex;flex-direction:column}
.msg.u{align-items:flex-end}
.msg.a{align-items:flex-start}
.bub{max-width:82%;padding:11px 15px;border-radius:12px;font-size:14px;line-height:1.65;white-space:pre-wrap}
.msg.u .bub{background:#1a3a5a;color:#e8dfd0}
.msg.a .bub{background:#172f4a;border:1px solid rgba(197,155,68,.2);color:#e8dfd0}
.chin{display:flex;gap:10px}
.chinput{flex:1;padding:11px 15px;background:#12253b;border:1px solid rgba(197,155,68,.22);border-radius:8px;color:#e8dfd0;font-size:13.5px;font-family:'Plus Jakarta Sans',sans-serif;outline:none}
.chinput::placeholder{color:#4a5560}
.chinput:focus{border-color:#c59b44}
input[type=text],input[type=password],textarea,select{background:#12253b;border:1px solid rgba(197,155,68,.22);border-radius:8px;color:#e8dfd0;padding:10px 13px;font-size:13.5px;font-family:'Plus Jakarta Sans',sans-serif;outline:none;width:100%}
input:focus,textarea:focus,select:focus{border-color:#c59b44}
select option{background:#0b1622}
.sdiv{text-align:center;padding:28px;background:#12253b;border:1px solid rgba(197,155,68,.2);border-radius:12px;margin-bottom:18px}
.sbig{font-family:'Lora',serif;font-size:68px;color:#c59b44;line-height:1}
.ytcard{background:#12253b;border:1px solid rgba(197,155,68,.14);border-radius:12px;overflow:hidden;margin-bottom:16px}
.ytinfo{padding:15px 19px}
.yttitle{font-family:'Lora',serif;font-size:17.5px;color:#c59b44;margin-bottom:4px}
.ytdesc{font-size:13px;color:#8a7d6d;line-height:1.5;margin-bottom:8px}
.ytml{display:flex;gap:10px;flex-wrap:wrap}
.ytag{font-size:11.5px;background:rgba(197,155,68,.1);color:#c59b44;padding:3px 11px;border-radius:20px}
iframe{display:block;width:100%;aspect-ratio:16/9;border:none}
table{width:100%;border-collapse:collapse;font-size:13px}
th{text-align:left;padding:10px 13px;border-bottom:2px solid rgba(197,155,68,.28);color:#c59b44;font-weight:600}
td{padding:10px 13px;border-bottom:1px solid rgba(255,255,255,.05);color:#c0b8a8}
tr:hover td{background:rgba(197,155,68,.04)}
.st{font-family:'Lora',serif;font-size:25px;color:#e8dfd0;margin-bottom:6px}
.sb{font-size:13.5px;color:#8a7d6d;margin-bottom:22px}
.div{height:1px;background:rgba(255,255,255,.06);margin:18px 0}
.empty{text-align:center;padding:38px;color:#4a5560;font-size:14.5px}
.tip{padding:13px 17px;background:rgba(197,155,68,.06);border-radius:8px;border:1px solid rgba(197,155,68,.15);font-size:13px;color:#8a7d6d;margin-top:12px}
.tip b{color:#c59b44}
.row{display:flex;gap:10px;align-items:center}
.ml6{margin-left:6px}
`;

// ===========================================================
//  APP
// ===========================================================
export default function App() {
  const [page, setPage]           = useState("home");
  const [cert, setCert]           = useState("TKT");
  const [test, setTest]           = useState(null);
  const [name, setName]           = useState(() => { try { return localStorage.getItem("cw_name") || ""; } catch { return ""; } });
  const [tempName, setTempName]   = useState("");
  const [myFiles, setMyFiles]     = useState(() => { try { return JSON.parse(localStorage.getItem("cw_files") || "[]"); } catch { return []; } });
  const [newF, setNewF]           = useState({ title: "", url: "", cert: "TKT" });
  const [aiMsgs, setAiMsgs]       = useState([{ r: "a", t: "Привет! 👋 Я твой персональный AI-тьютор по TKT, CELTA, IELTS и DELTA.\n\nЯ знаю твои результаты тестов и подстроюсь под тебя. Напиши «анализ» — и я разберу твои слабые места и составлю план подготовки. Или просто задай любой вопрос — пиши как тебе удобно!" }]);
  const [aiIn, setAiIn]           = useState("");
  const [aiLoad, setAiLoad]       = useState(false);
  const [geminiKey, setGeminiKey] = useState(() => { try { return localStorage.getItem("cw_gkey") || ""; } catch { return ""; } });
  const [keyInput, setKeyInput]   = useState("");
  const [matTab, setMatTab]       = useState("official");
  const [results, setResults]     = useState(() => { try { return JSON.parse(localStorage.getItem("cw_results") || "[]"); } catch { return []; } });
  const [tMode, setTMode]         = useState(false);
  const [tIn, setTIn]             = useState("");
  const chatRef = useRef(null);

  useEffect(() => { try { localStorage.setItem("cw_name", name); } catch {} }, [name]);
  useEffect(() => { try { localStorage.setItem("cw_files", JSON.stringify(myFiles)); } catch {} }, [myFiles]);
  useEffect(() => { try { localStorage.setItem("cw_results", JSON.stringify(results)); } catch {} }, [results]);
  useEffect(() => { try { localStorage.setItem("cw_gkey", geminiKey); } catch {} }, [geminiKey]);
  useEffect(() => { if (chatRef.current) chatRef.current.scrollTop = chatRef.current.scrollHeight; }, [aiMsgs]);

  // -- Аналитика студента --
  const getAnalytics = () => {
    if (results.length === 0) return null;
    const byCert = {};
    const byMod  = {};
    results.forEach(r => {
      if (!byCert[r.cert]) byCert[r.cert] = { total: 0, sum: 0 };
      byCert[r.cert].total++;
      byCert[r.cert].sum += r.pct;
      const key = `${r.cert}: ${r.mod}`;
      if (!byMod[key]) byMod[key] = { total: 0, sum: 0, cert: r.cert, mod: r.mod };
      byMod[key].total++;
      byMod[key].sum += r.pct;
    });
    const certAvg = Object.entries(byCert).map(([c, v]) => ({ cert: c, avg: Math.round(v.sum / v.total) }));
    const modAvg  = Object.entries(byMod).map(([k, v]) => ({ key: k, cert: v.cert, mod: v.mod, avg: Math.round(v.sum / v.total), attempts: v.total }));
    const weak    = modAvg.filter(m => m.avg < 70).sort((a, b) => a.avg - b.avg);
    const strong  = modAvg.filter(m => m.avg >= 80).sort((a, b) => b.avg - a.avg);
    return { certAvg, modAvg, weak, strong, total: results.length };
  };

  const buildSystemPrompt = () => {
    const an = getAnalytics();
    const statsText = an
      ? "РЕЗУЛЬТАТЫ СТУДЕНТА:\n" +
        an.certAvg.map(c => "- " + c.cert + ": средний балл " + c.avg + "%").join("\n") + "\n" +
        (an.weak.length ? ("СЛАБЫЕ ТЕМЫ: " + an.weak.map(w => w.key + " (" + w.avg + "%)").join(", ") + "\n") : "") +
        (an.strong.length ? ("СИЛЬНЫЕ ТЕМЫ: " + an.strong.map(s => s.key + " (" + s.avg + "%)").join(", ") + "\n") : "") +
        ("Всего попыток: " + an.total)
      : "Студент ещё не проходил тесты.";

    return `Ты персональный AI-тьютор платформы CertifyWise. Помогаешь студентам готовиться к TKT, CELTA, IELTS и DELTA.

СТУДЕНТ: ${name || "Студент"}
${statsText}

ТВОЙ СТИЛЬ РАБОТЫ:

1. СОКРАТИЧЕСКИЙ МЕТОД: НИКОГДА не давай готовый ответ сразу. Сначала задай 1-2 наводящих вопроса, которые помогут студенту дойти до ответа самому. Давай прямой ответ только если: (а) студент попробовал и всё равно не понимает, (б) явно идёт не туда, (в) прямо просит ответ.

2. СИТУАТИВНЫЕ ПРИМЕРЫ: Объясняй через сценарии из класса. Не «правило такое-то», а «представь: ты ведёшь урок B1, студент говорит X — что делаешь?». Делай ситуации реальными и конкретными.

3. АНАЛИТИКА: Ты знаешь результаты этого студента. Упоминай их естественно — «вижу, ты немного плаваешь в Module 3 TKT, давай разберём». Когда студент пишет «анализ» или «план» — сразу составь персональный план подготовки по слабым темам, по неделям.

4. ЯЗЫК: Пиши на том же языке что студент. Русский — отвечай по-русски. English — answer in English. Миксует — миксуй тоже. Подстраивайся под его стиль общения: пишет неформально — будь неформальным, пишет официально — будь чуть строже. НЕ комментируй язык студента.

5. СТИЛЬ: Прямой, живой, иногда с юмором. Без занудства и пафоса. Реагируй на любые сообщения естественно, без нотаций. Можешь называть студента по имени.

6. ЭКСПЕРТИЗА:
TKT (Modules 1-3): language systems, lesson planning, assessment, error correction, teaching approaches, CCQ, ICQ, drilling, eliciting, scaffolding, differentiation, realia, staging
CELTA: form/meaning/use, concept checking, lesson aims, anticipated problems, TTT vs STT, monitoring, delayed error correction, rapport  
IELTS: all 4 skills, band descriptors, task response, coherence & cohesion, lexical resource, T/F/NG, overview writing
DELTA: SLA (Krashen, Selinker, Vygotsky, Ellis, Lewis), methodology (CLT, TBL, PPP, Lexical Approach), language analysis, Module 2 professional practice`;
  };

  // -- Gemini API --
  const sendAi = async () => {
    if (!aiIn.trim() || aiLoad) return;
    const msg = aiIn.trim();
    setAiIn("");
    setAiMsgs(p => [...p, { r: "u", t: msg }]);
    setAiLoad(true);
    const key = geminiKey || import.meta.env?.VITE_GEMINI_KEY || "";
    if (!key) {
      setAiMsgs(p => [...p, { r: "a", t: "⚙️ Нужен Gemini API ключ. Нажми «Настроить API» выше." }]);
      setAiLoad(false);
      return;
    }
    try {
      const history = aiMsgs.filter(m => m.r === "u" || m.r === "a").map(m => ({
        role: m.r === "a" ? "model" : "user",
        parts: [{ text: m.t }]
      }));
      const res = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-3.5-flash:generateContent?key=${key}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            system_instruction: { parts: [{ text: buildSystemPrompt() }] },
            contents: [...history, { role: "user", parts: [{ text: msg }] }],
            generationConfig: { maxOutputTokens: 1200, temperature: 0.7 }
          })
        }
      );
      const data = await res.json();
      if (data.error) throw new Error(data.error.message);
      const reply = data.candidates?.[0]?.content?.parts?.[0]?.text || "Не получил ответ, попробуй ещё раз.";
      setAiMsgs(p => [...p, { r: "a", t: reply }]);
    } catch(e) {
      setAiMsgs(p => [...p, { r: "a", t: `Ошибка: ${e.message || "проверь API ключ и интернет"}` }]);
    }
    setAiLoad(false);
  };

  const addFile = () => {
    if (!newF.title.trim() || !newF.url.trim()) return;
    setMyFiles(p => [...p, { ...newF, id: Date.now() }]);
    setNewF({ title: "", url: "", cert });
  };


  // ── Test helpers ──
  const startTest = (c, mod) => {
    const qs = QUESTIONS[c][mod];
    setTest({ c, mod, qs, idx: 0, ans: Array(qs.length).fill(null), showExp: false, done: false });
    setPage("test");
  };

  const pick = (i) => {
    if (test.ans[test.idx] !== null) return;
    const a = [...test.ans]; a[test.idx] = i;
    setTest({ ...test, ans: a, showExp: true });
  };

  const next = () => {
    if (test.idx < test.qs.length - 1) {
      setTest({ ...test, idx: test.idx + 1, showExp: false });
    } else {
      const score = test.ans.reduce((s, a, i) => a === test.qs[i].ans ? s + 1 : s, 0);
      const pct   = Math.round(score / test.qs.length * 100);
      const r = { cert: test.c, mod: test.mod, score, total: test.qs.length, pct, date: new Date().toISOString(), student: name || "Студент" };
      setResults(p => [r, ...p].slice(0, 60));
      setTest({ ...test, done: true, score, pct });
    }
  };

  const PAGES = [["home","🏠 Главная"],["analytics","📊 Аналитика"],["materials","📚 Материалы"],["practice","✏️ Тесты"],["listening","🎧 Listening"],["chat","🤖 AI-Репетитор"],["teacher","👩‍🏫 Учитель"]];

  // ===================================
  //  TEST PAGE
  // ===================================
  if (page === "test" && test) {
    if (test.done) {
      const c = test.pct >= 80 ? "#4caf88" : test.pct >= 60 ? "#c59b44" : "#e74c3c";
      const msg = test.pct >= 80 ? "Отлично! 🎉" : test.pct >= 60 ? "Хороший результат 👍" : "Нужно повторить 📖";
      return (
        <>
          <style>{CSS}</style>
          <div className="wrap">
            <div className="hdr"><div className="logo">Certify<span>Wise</span></div></div>
            <div className="sdiv">
              <div className="sbig">{test.pct}%</div>
              <div style={{fontSize:17,color:"#e8dfd0",marginTop:8,fontFamily:"Lora,serif"}}>{test.score} / {test.qs.length} верных ответов</div>
              <div style={{fontSize:13,color:"#8a7d6d",marginTop:4}}>{test.c} · {test.mod}</div>
              <div style={{marginTop:10,color:c,fontSize:15,fontWeight:600}}>{msg}</div>
            </div>
            <div style={{display:"flex",gap:10,justifyContent:"center",flexWrap:"wrap"}}>
              <button className="btn" onClick={() => startTest(test.c, test.mod)}>Пройти ещё раз</button>
              <button className="btn btn-o" onClick={() => { setTest(null); setPage("practice"); }}>← Все тесты</button>
              <button className="btn btn-o" onClick={() => { setTest(null); setPage("home"); }}>На главную</button>
            </div>
          </div>
        </>
      );
    }

    const q   = test.qs[test.idx];
    const ans = test.ans[test.idx];
    const done = ans !== null;
    const pct  = (test.idx / test.qs.length) * 100;

    return (
      <>
        <style>{CSS}</style>
        <div className="wrap">
          <div className="hdr">
            <div className="logo">Certify<span>Wise</span></div>
            <button className="btn btn-o btn-sm" onClick={() => { setTest(null); setPage("practice"); }}>← Выйти</button>
          </div>
          <div style={{display:"flex",justifyContent:"space-between",marginBottom:7}}>
            <span style={{fontSize:12.5,color:"#8a7d6d"}}>{test.c} · {test.mod}</span>
            <span style={{fontSize:12.5,color:"#8a7d6d"}}>{test.idx + 1} / {test.qs.length}</span>
          </div>
          <div className="pbar"><div className="pfill" style={{width:`${pct}%`}}/></div>

          <div className="qcard">
            <div className="qnum">Вопрос {test.idx + 1}</div>
            {q.passage && <div className="qpass">{q.passage}</div>}
            <div className="qtext">{q.q}</div>
            {q.opts.map((o, i) => {
              let cls = "opt";
              if (done) {
                if (i === q.ans) cls += " ok";
                else if (i === ans) cls += " ng";
              }
              return <button key={i} className={cls} onClick={() => pick(i)} disabled={done}>
                <span style={{color:"#c59b44",marginRight:9}}>{String.fromCharCode(65+i)}.</span>{o}
              </button>;
            })}
            {done && <div className="exp"><b>💡 Объяснение:</b> {q.exp}</div>}
          </div>

          {done && (
            <div style={{textAlign:"center",marginTop:15}}>
              <button className="btn" onClick={next}>
                {test.idx < test.qs.length - 1 ? "Следующий вопрос →" : "Завершить тест ✓"}
              </button>
            </div>
          )}
        </div>
      </>
    );
  }

  // ===================================
  //  MAIN LAYOUT
  // ===================================
  return (
    <>
      <style>{CSS}</style>
      <div className="wrap">

        {/* HEADER */}
        <div className="hdr">
          <div className="logo">Certify<span>Wise</span></div>
          <div style={{fontSize:13,color:"#8a7d6d"}}>
            {name ? `👤 ${name}` : ""}
          </div>
        </div>

        {/* NAV */}
        <div className="nav">
          {PAGES.map(([k,l]) => <button key={k} className={`nb${page===k?" on":""}`} onClick={() => setPage(k)}>{l}</button>)}
        </div>

        {/* --- HOME --- */}
        {page === "home" && (
          <div>
            <h2 className="st">Добро пожаловать в CertifyWise</h2>
            <p className="sb">Платформа подготовки к международным сертификациям для педагогов иностранного языка</p>

            {!name && (
              <div className="card" style={{marginBottom:22}}>
                <h3>Как тебя зовут?</h3>
                <div className="row" style={{marginTop:13}}>
                  <input type="text" placeholder="Введи своё имя..." value={tempName} onChange={e => setTempName(e.target.value)} onKeyDown={e => e.key === "Enter" && tempName.trim() && setName(tempName.trim())} style={{flex:1}} autoFocus />
                  <button className="btn" onClick={() => tempName.trim() && setName(tempName.trim())} disabled={!tempName.trim()}>OK</button>
                </div>
              </div>
            )}

            <div className="g2">
              {Object.entries(CERTS).map(([k, v]) => (
                <button key={k} className={`cbtn${cert===k?" on":""}`} onClick={() => { setCert(k); setPage("practice"); }}>
                  <div style={{fontSize:26}}>{v.emoji}</div>
                  <h3>{k}</h3>
                  <p style={{color:"#5a7090",marginBottom:4}}>{v.label}</p>
                  <p>{v.tagline}</p>
                </button>
              ))}
            </div>

            {results.length > 0 && (
              <>
                <div className="div"/>
                <h3 style={{fontFamily:"Lora,serif",fontSize:19,color:"#e8dfd0",marginBottom:13}}>📊 Последние результаты</h3>
                {results.slice(0, 5).map((r, i) => (
                  <div key={i} style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"11px 17px",background:"#12253b",borderRadius:8,marginBottom:7,border:"1px solid rgba(255,255,255,.05)"}}>
                    <div>
                      <span style={{color:"#c59b44",fontWeight:600}}>{r.cert}</span>
                      <span style={{color:"#8a7d6d",marginLeft:8,fontSize:12.5}}>{r.mod}</span>
                    </div>
                    <span style={{fontWeight:700,color:r.pct>=80?"#4caf88":r.pct>=60?"#c59b44":"#e74c3c"}}>{r.pct}%</span>
                  </div>
                ))}
              </>
            )}
          </div>
        )}

        {/* --- MATERIALS --- */}
        {page === "materials" && (
          <div>
            <h2 className="st">Учебные материалы</h2>
            <p className="sb">Официальные PDF Cambridge + ваши файлы с Google Drive</p>

        {/* --- ANALYTICS --- */}
        {page === "analytics" && (() => {
          const an = getAnalytics();
          return (
            <div>
              <h2 className="st">📊 Моя аналитика</h2>
              <p className="sb">Прогресс по сертификатам и персональный план</p>
              {!an ? (
                <div className="card" style={{textAlign:"center",padding:"38px 22px"}}>
                  <div style={{fontSize:42,marginBottom:12}}>📝</div>
                  <h3 style={{marginBottom:8}}>Пока нет данных</h3>
                  <p style={{fontSize:13.5,color:"#8a7d6d",marginBottom:18}}>Пройди хотя бы один тест — и здесь появится твоя аналитика и план подготовки.</p>
                  <button className="btn" onClick={() => setPage("practice")}>Начать тест →</button>
                </div>
              ) : (
                <>
                  {/* Статы по сертификатам */}
                  <div className="g2" style={{marginBottom:20}}>
                    {an.certAvg.map(c => {
                      const col = c.avg >= 80 ? "#4caf88" : c.avg >= 60 ? "#c59b44" : "#e74c3c";
                      return (
                        <div key={c.cert} className="card">
                          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:10}}>
                            <span style={{fontFamily:"Lora,serif",fontSize:18,color:"#c59b44"}}>{CERTS[c.cert]?.emoji} {c.cert}</span>
                            <span style={{fontFamily:"Lora,serif",fontSize:26,color:col,fontWeight:700}}>{c.avg}%</span>
                          </div>
                          <div style={{height:6,background:"rgba(255,255,255,.07)",borderRadius:3}}>
                            <div style={{height:"100%",width:`${c.avg}%`,background:col,borderRadius:3,transition:"width .5s"}}/>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {/* Слабые темы */}
                  {an.weak.length > 0 && (
                    <div className="card" style={{marginBottom:16,border:"1px solid rgba(231,76,60,.25)"}}>
                      <h3 style={{color:"#e74c3c",marginBottom:12}}>⚠️ Нужно подтянуть</h3>
                      {an.weak.map((w,i) => (
                        <div key={i} style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"9px 0",borderBottom:"1px solid rgba(255,255,255,.05)"}}>
                          <span style={{fontSize:13.5,color:"#c0b8a8"}}>{w.key}</span>
                          <div style={{display:"flex",alignItems:"center",gap:10}}>
                            <div style={{width:80,height:5,background:"rgba(255,255,255,.07)",borderRadius:3}}>
                              <div style={{height:"100%",width:`${w.avg}%`,background:"#e74c3c",borderRadius:3}}/>
                            </div>
                            <span style={{fontSize:13,color:"#e74c3c",fontWeight:700,minWidth:32}}>{w.avg}%</span>
                            <button className="btn btn-sm btn-o" style={{fontSize:11}} onClick={() => { setCert(w.cert); setPage("practice"); }}>Тест →</button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Сильные темы */}
                  {an.strong.length > 0 && (
                    <div className="card" style={{marginBottom:16,border:"1px solid rgba(76,175,136,.2)"}}>
                      <h3 style={{color:"#4caf88",marginBottom:12}}>✅ Сильные стороны</h3>
                      {an.strong.slice(0,4).map((s,i) => (
                        <div key={i} style={{display:"flex",justifyContent:"space-between",padding:"8px 0",borderBottom:"1px solid rgba(255,255,255,.04)"}}>
                          <span style={{fontSize:13.5,color:"#c0b8a8"}}>{s.key}</span>
                          <span style={{fontSize:13,color:"#4caf88",fontWeight:700}}>{s.avg}%</span>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Персональный план */}
                  <div className="card" style={{border:"1px solid rgba(197,155,68,.3)"}}>
                    <h3 style={{marginBottom:4}}>🗓 Персональный план</h3>
                    <p style={{fontSize:13,color:"#8a7d6d",marginBottom:16}}>Основан на твоих результатах</p>
                    {an.weak.length === 0 ? (
                      <p style={{fontSize:13.5,color:"#4caf88"}}>🎉 Все темы выше 70%! Продолжай поддерживать уровень регулярными тестами.</p>
                    ) : (
                      <div>
                        {an.weak.slice(0,4).map((w,i) => (
                          <div key={i} style={{display:"flex",gap:14,padding:"11px 0",borderBottom:"1px solid rgba(255,255,255,.05)"}}>
                            <div style={{width:28,height:28,borderRadius:"50%",background:"rgba(197,155,68,.15)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:12,color:"#c59b44",fontWeight:700,flexShrink:0}}>
                              {i+1}
                            </div>
                            <div>
                              <div style={{fontSize:14,color:"#e8dfd0",fontWeight:600,marginBottom:3}}>{w.key}</div>
                              <div style={{fontSize:12.5,color:"#8a7d6d"}}>
                                Текущий уровень: <b style={{color:"#e74c3c"}}>{w.avg}%</b> →
                                {w.avg < 50 ? " начни с теории, потом тест" : " повтори ключевые термины и пройди тест ещё раз"}
                              </div>
                            </div>
                          </div>
                        ))}
                        <div className="tip" style={{marginTop:14}}>
                          <b>Совет:</b> Открой AI-репетитор и напиши <b>«составь план»</b> — получишь подробный пошаговый план с объяснениями и примерами.
                        </div>
                      </div>
                    )}
                  </div>
                </>
              )}
            </div>
          );
        })()}

            <p className="sb">Официальные PDF Cambridge + ваши файлы с Google Drive</p>

            <div style={{display:"flex",gap:7,marginBottom:18,flexWrap:"wrap"}}>
              {Object.keys(CERTS).map(k => (
                <button key={k} className={`btn btn-sm${cert===k?"":" btn-o"}`} onClick={() => setCert(k)}>{CERTS[k].emoji} {k}</button>
              ))}
            </div>

            <div className="tabs">
              <button className={`tab${matTab==="official"?" on":""}`} onClick={() => setMatTab("official")}>📄 Официальные ({MATERIALS[cert].links.length})</button>
              <button className={`tab${matTab==="my"?" on":""}`} onClick={() => setMatTab("my")}>📁 Мои файлы ({myFiles.filter(f=>f.cert===cert).length})</button>
              <button className={`tab${matTab==="add"?" on":""}`} onClick={() => setMatTab("add")}>➕ Добавить</button>
            </div>

            {matTab === "official" && (
              <div>
                <div style={{fontSize:13.5,color:"#8a7d6d",marginBottom:16,padding:"12px 16px",background:"rgba(197,155,68,.06)",borderRadius:8,border:"1px solid rgba(197,155,68,.12)"}}>{MATERIALS[cert].desc}</div>
                {MATERIALS[cert].links.map((m, i) => (
                  <div key={i} className="mat">
                    <a href={m.url} target="_blank" rel="noreferrer">📎 {m.title}</a>
                    <span className={`badge b-${m.type.toLowerCase()}`}>{m.type}</span>
                  </div>
                ))}
                <div className="tip"><b>Совет:</b> Все ссылки ведут на официальные сайты Cambridge English и IELTS.org — актуальные бесплатные материалы.</div>
              </div>
            )}

            {matTab === "my" && (
              <div>
                {myFiles.filter(f => f.cert === cert).length === 0 ? (
                  <div className="empty">
                    Нет своих файлов для {cert}.<br/>
                    <button className="btn btn-sm" style={{marginTop:13}} onClick={() => setMatTab("add")}>➕ Добавить</button>
                  </div>
                ) : myFiles.filter(f => f.cert === cert).map(f => (
                  <div key={f.id} className="mat">
                    <a href={f.url} target="_blank" rel="noreferrer">📁 {f.title}</a>
                    <div style={{display:"flex",gap:8,alignItems:"center"}}>
                      <span className="badge b-my">Мой файл</span>
                      <button className="btn btn-red btn-sm" onClick={() => setMyFiles(p => p.filter(x => x.id !== f.id))}>✕</button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {matTab === "add" && (
              <div className="card">
                <h3>Добавить файл или ссылку</h3>
                <p style={{fontSize:13,color:"#8a7d6d",marginTop:4,marginBottom:18}}>Вставь ссылку с Google Drive, OneDrive, Dropbox или любого сайта</p>
                <div style={{marginBottom:11}}>
                  <label style={{fontSize:12.5,color:"#8a7d6d",display:"block",marginBottom:5}}>Сертификат</label>
                  <select value={newF.cert} onChange={e => setNewF({...newF, cert:e.target.value})}>
                    {Object.keys(CERTS).map(k => <option key={k} value={k}>{k} — {CERTS[k].label}</option>)}
                  </select>
                </div>
                <div style={{marginBottom:11}}>
                  <label style={{fontSize:12.5,color:"#8a7d6d",display:"block",marginBottom:5}}>Название</label>
                  <input type="text" placeholder="Например: TKT Module 2 Mock Test.pdf" value={newF.title} onChange={e => setNewF({...newF, title:e.target.value})} />
                </div>
                <div style={{marginBottom:18}}>
                  <label style={{fontSize:12.5,color:"#8a7d6d",display:"block",marginBottom:5}}>Ссылка (URL)</label>
                  <input type="text" placeholder="https://drive.google.com/file/..." value={newF.url} onChange={e => setNewF({...newF, url:e.target.value})} />
                </div>
                <button className="btn" onClick={addFile} disabled={!newF.title.trim() || !newF.url.trim()}>Добавить материал</button>
              </div>
            )}
          </div>
        )}

        {/* --- PRACTICE --- */}
        {page === "practice" && (
          <div>
            <h2 className="st">Практические тесты</h2>
            <p className="sb">Все вопросы встроены — работают без интернета</p>
            <div style={{display:"flex",gap:7,marginBottom:22,flexWrap:"wrap"}}>
              {Object.keys(CERTS).map(k => (
                <button key={k} className={`btn btn-sm${cert===k?"":" btn-o"}`} onClick={() => setCert(k)}>{CERTS[k].emoji} {k}</button>
              ))}
            </div>
            <div style={{fontSize:13,color:"#8a7d6d",marginBottom:16,padding:"11px 16px",background:"rgba(197,155,68,.05)",borderRadius:8}}>{CERTS[cert].label} — {CERTS[cert].tagline}</div>
            {Object.entries(QUESTIONS[cert]).map(([mod, qs]) => (
              <div key={mod} className="card" style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:12}}>
                <div>
                  <h3 style={{marginBottom:3}}>{mod}</h3>
                  <p style={{fontSize:13,color:"#8a7d6d"}}>{qs.length} вопросов · с объяснениями</p>
                </div>
                <button className="btn" onClick={() => startTest(cert, mod)}>Начать →</button>
              </div>
            ))}
          </div>
        )}

        {/* --- LISTENING --- */}
        {page === "listening" && (
          <div>
            <h2 className="st">IELTS Listening Practice</h2>
            <p className="sb">Видеоматериалы с YouTube для тренировки всех 4 секций</p>
            <div className="card" style={{background:"rgba(255,107,107,.07)",border:"1px solid rgba(255,107,107,.2)",marginBottom:20}}>
              <h3 style={{color:"#ff6b6b",marginBottom:10}}>🎯 Ключевые стратегии</h3>
              <ul style={{fontSize:13.5,color:"#c0b8a8",lineHeight:2.1,paddingLeft:18}}>
                <li>Перед каждой секцией читай вопросы заранее — предугадывай тему и тип информации</li>
                <li>Пиши ответы сразу — запись идёт один раз, перемотки нет</li>
                <li>Следи за сигнальными словами: "however", "but", "actually", "in fact"</li>
                <li>Если пропустил вопрос — сразу переходи к следующему, не останавливайся</li>
                <li>Числа, даты, имена — их часто произносят по буквам (C-O-H-E-N)</li>
                <li>Внимательно следи за словесными ограничениями: "NO MORE THAN TWO WORDS"</li>
              </ul>
            </div>
            {LISTENING.map((v, i) => (
              <div key={i} className="ytcard">
                <div className="ytinfo">
                  <div className="yttitle">{v.title}</div>
                  <div className="ytdesc">💡 {v.tip}</div>
                  <div className="ytml">
                    <span className="ytag">📻 {v.section}</span>
                    <span className="ytag">🎯 {v.level}</span>
                  </div>
                </div>
                <iframe src={`https://www.youtube.com/embed/${v.ytId}`} title={v.title} allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen />
              </div>
            ))}
            <div className="tip"><b>Свои аудиофайлы:</b> Добавь ссылки на Google Drive в разделе «Материалы → Добавить файл» — они появятся в твоей библиотеке.</div>
          </div>
        )}

        {/* --- AI CHAT --- */}
        {page === "chat" && (
          <div>
            <h2 className="st">🤖 AI-Репетитор</h2>
            <p className="sb">Персональный тьютор — подстраивается под тебя</p>

            {/* API Key setup */}
            {!geminiKey && !(import.meta.env?.VITE_GEMINI_KEY) && (
              <div className="card" style={{marginBottom:16,border:"1px solid rgba(197,155,68,.35)"}}>
                <h3 style={{marginBottom:6}}>⚙️ Настроить AI</h3>
                <p style={{fontSize:13,color:"#8a7d6d",marginBottom:12}}>
                  Нужен бесплатный Gemini API ключ. Получи на <a href="https://aistudio.google.com" target="_blank" rel="noreferrer" style={{color:"#c59b44"}}>aistudio.google.com</a> → Get API key (бесплатно, ~1500 запросов/день)
                </p>
                <div style={{display:"flex",gap:9}}>
                  <input type="text" placeholder="AIza..." value={keyInput} onChange={e => setKeyInput(e.target.value)} style={{flex:1,fontSize:13}} />
                  <button className="btn" onClick={() => { if(keyInput.trim()){setGeminiKey(keyInput.trim());setKeyInput("");} }}>Сохранить</button>
                </div>
              </div>
            )}

            {geminiKey && (
              <div style={{display:"flex",justifyContent:"flex-end",marginBottom:10}}>
                <span style={{fontSize:12,color:"#4caf88",marginRight:10}}>✓ Gemini подключён</span>
                <button className="btn btn-o btn-sm" style={{fontSize:11}} onClick={() => setGeminiKey("")}>Сменить ключ</button>
              </div>
            )}

            {/* Quick prompts */}
            <div style={{display:"flex",gap:7,marginBottom:14,flexWrap:"wrap"}}>
              {["Сделай анализ моих результатов","Составь план подготовки","Объясни через пример из класса","TKT: что такое CCQ?","CELTA: как исправлять ошибки?","Что такое fossilization?"].map(q => (
                <button key={q} className="btn btn-o btn-sm" style={{fontSize:12}} onClick={() => setAiIn(q)}>{q}</button>
              ))}
            </div>

            <div className="chbox" ref={chatRef}>
              {aiMsgs.map((m, i) => (
                <div key={i} className={`msg ${m.r}`}>
                  {m.r === "a" && <div style={{fontSize:11,color:"#4a5560",marginBottom:3}}>🤖 CertifyWise AI</div>}
                  <div className="bub">{m.t}</div>
                </div>
              ))}
              {aiLoad && (
                <div className="msg a">
                  <div style={{fontSize:11,color:"#4a5560",marginBottom:3}}>🤖 CertifyWise AI</div>
                  <div className="bub" style={{color:"#8a7d6d"}}>⌛ Думаю...</div>
                </div>
              )}
            </div>
            <div className="chin">
              <input className="chinput" type="text" placeholder="Пиши как тебе удобно..." value={aiIn} onChange={e => setAiIn(e.target.value)} onKeyDown={e => e.key === "Enter" && sendAi()} />
              <button className="btn" onClick={sendAi} disabled={aiLoad || !aiIn.trim()}>→</button>
            </div>
          </div>
        )}

        {page === "teacher" && (
          <div>
            <h2 className="st">Панель учителя</h2>
            {!tMode ? (
              <div className="card">
                <h3>Войти как учитель</h3>
                <div className="row" style={{marginTop:14}}>
                  <input type="password" placeholder="Пароль учителя..." value={tIn} onChange={e => setTIn(e.target.value)} onKeyDown={e => { if(e.key==="Enter") { if(tIn===TEACHER_PASSWORD){setTMode(true);setTIn("");}else alert("Неверный пароль"); }}} style={{flex:1}} />
                  <button className="btn" onClick={() => { if(tIn===TEACHER_PASSWORD){setTMode(true);setTIn("");}else alert("Неверный пароль"); }}>Войти</button>
                </div>
                
              </div>
            ) : (
              <div>
                <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:20}}>
                  <span style={{fontSize:13.5,color:"#4caf88"}}>✓ Режим учителя активен</span>
                  <button className="btn btn-o btn-sm" onClick={() => setTMode(false)}>Выйти</button>
                </div>
                <div className="g3" style={{marginBottom:22}}>
                  {[["Попыток",results.length],["Средний балл",results.length?Math.round(results.reduce((a,r)=>a+r.pct,0)/results.length)+"%":"—"],["Студентов",[...new Set(results.map(r=>r.student))].length]].map(([l,v],i) => (
                    <div key={i} style={{background:"#12253b",border:"1px solid rgba(197,155,68,.14)",borderRadius:10,padding:"14px 18px",textAlign:"center"}}>
                      <div style={{fontFamily:"Lora,serif",fontSize:30,color:"#c59b44"}}>{v}</div>
                      <div style={{fontSize:12,color:"#8a7d6d",marginTop:3}}>{l}</div>
                    </div>
                  ))}
                </div>
                {results.length === 0 ? (
                  <div className="empty">Студенты ещё не проходили тесты.</div>
                ) : (
                  <div style={{overflowX:"auto"}}>
                    <table>
                      <thead><tr><th>Студент</th><th>Сертификат</th><th>Модуль</th><th>Результат</th><th>%</th><th>Дата</th></tr></thead>
                      <tbody>
                        {results.map((r, i) => (
                          <tr key={i}>
                            <td>{r.student}</td>
                            <td><span style={{color:"#c59b44",fontWeight:600}}>{r.cert}</span></td>
                            <td style={{fontSize:12,color:"#8a7d6d"}}>{r.mod}</td>
                            <td>{r.score}/{r.total}</td>
                            <td><b style={{color:r.pct>=80?"#4caf88":r.pct>=60?"#c59b44":"#e74c3c"}}>{r.pct}%</b></td>
                            <td style={{fontSize:12,color:"#4a5560"}}>{new Date(r.date).toLocaleDateString("ru-RU")}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                    <div style={{textAlign:"right",marginTop:11}}>
                      <button className="btn btn-red btn-sm" onClick={() => { if(window.confirm("Удалить все результаты?")) setResults([]); }}>Очистить</button>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        )}

      </div>
    </>
  );
                                                                   }
