/**
 * CertifyWise
 * © 2026 Алназирова Айдана (Aidana Alnazirova). Все права защищены.
 * Дата создания: 22 мая 2026 г.
 * Использование без письменного разрешения автора запрещено.
 */

// ===========================================================
//  IELTS LISTENING — техники аудирования
// ===========================================================
// МОДУЛЬ: { id, num, title, part, whenToUse, howTo: [..], example: {text, note}, recordings: [..], soon?: true }
// ЗАПИСЬ: { id, title, audio (URL официального образца), note?, tasks: [..] }
// ЗАДАНИЕ (task.type):
//   "gap"    — вписать слово/число. item: { id, before, after?, answer: [допустимые варианты], exp }
//   "mcq"    — один ответ.          item: { id, text, opts: [..], answer: индекс, exp }
//   "match"  — буква из списка.     task.options: [{ letter, text }], item: { id, text, answer: "A", exp }
//              task.plan: "library" — над заданием рисуется план (Map/plan labelling)
// Аудио не хранится на сайте: плеер воспроизводит официальные образцы IELTS с сервера IDP.
// Вопросы, объяснения и план — оригинальные материалы CertifyWise.

const IDP = "https://assets.ctfassets.net/unrdeg6se4ke/";

export const LISTENING_FORMAT = [
  ["Parts", "4"],
  ["Questions", "40 (10 per part)"],
  ["Time", "about 30 minutes"],
  ["Plays", "once only"],
  ["Part 1", "everyday conversation, 2 speakers"],
  ["Part 2", "everyday monologue"],
  ["Part 3", "academic discussion, 2–4 speakers"],
  ["Part 4", "academic lecture"],
];

export const LISTENING_MODULES = [
  // ---------------------------------------------------------
  {
    id: "before", num: 1, title: "Before you listen", part: "All parts",
    whenToUse: "In the 30 seconds before each part starts. The answers come only once, so you need to know what you are waiting for.",
    howTo: [
      "Read the heading first: who is speaking, where, and about what?",
      "For every gap decide: a word or a number? If a word — a noun, an adjective, a name?",
      "Check the word limit and underline it. One extra word makes a correct answer wrong.",
      "Notice what is already written next to the gap (£, days, Hall) — you must not repeat it.",
      "The answers follow the order of the questions, so keep your eyes one gap ahead.",
    ],
    example: {
      text: "Look at these three gaps before pressing play: “Opened to the public in ______”, “Open ______ days per year”, “Film ticket: £ ______”. What exactly will you listen for in each?",
      note: "1) a year — expect other years to be mentioned first. 2) a number up to 365. 3) a price — write only the figures, the £ sign is already there. You have not heard a word yet, but you already know three things to catch.",
    },
    recordings: [
      {
        id: "arts", title: "Radio programme: an arts centre",
        audio: IDP + "TpcNnXtS4ZPbzEivA7hHg/eb28724e41e49dcc096fc00826968652/Audio_-_Free_practice_test_-_Listening_-_Note_completion.mp3",
        note: "The speaker on the recording uses the original question numbers (11–20). Ignore them and follow the order of the gaps below.",
        tasks: [
          {
            type: "gap", title: "Notes: the Centre",
            instructions: "Complete the notes. Write NO MORE THAN TWO WORDS AND/OR A NUMBER for each answer.",
            items: [
              { id: "ar1", before: "World-famous as a venue for", after: "music", answer: ["classical"], exp: "Predicted: an adjective describing music. The presenter calls it one of the major venues for classical music." },
              { id: "ar2", before: "Number of restaurants in the complex:", answer: ["3", "three"], exp: "Predicted: a number. Heard inside a list of facilities — “three restaurants and a bookshop”." },
              { id: "ar3", before: "Site destroyed by bombs in", answer: ["1940"], exp: "Predicted: a year. It is the first year mentioned, during the war." },
              { id: "ar4", before: "Planned in the 1960s, built in the", answer: ["1970s", "70s", "'70s", "seventies", "1970's", "70's"], exp: "Predicted: a decade. Three time references come in a row — planned, built, opened. Each belongs to a different gap." },
              { id: "ar5", before: "Opened to the public in", answer: ["1983"], exp: "Predicted: a year. “Eventually opened to the public in 1983”." },
              { id: "ar6", before: "Run by the", answer: ["City Council", "the City Council"], exp: "Predicted: an organisation. Paraphrase: “run by” = “managed by”. It is not privately owned." },
              { id: "ar7", before: "Open", after: "days a year", answer: ["363"], exp: "Predicted: a number up to 365." },
            ],
          },
          {
            type: "gap", title: "Table: this week's events",
            instructions: "Complete the details. Write NO MORE THAN TWO WORDS AND/OR A NUMBER for each answer.",
            items: [
              { id: "ar8", before: "Opera — venue: the", after: "Hall", answer: ["Garden"], exp: "Predicted: a name. “Hall” is already printed, so writing “Garden Hall” would repeat it." },
              { id: "ar9", before: "Canadian film — title: “", after: "Lives”", answer: ["Three", "3"], exp: "Predicted: part of a title. The title is given after the day and the time." },
              { id: "ar10", before: "Film ticket: £", answer: ["4.50", "4.5"], exp: "Predicted: a price. Two prices are heard: £4.50 is this week's price, £5.50 is the usual one." },
              { id: "ar11", before: "Weekend exhibition — “Faces of", after: "”", answer: ["China"], exp: "Predicted: a noun or a place name. The exhibition is a collection of Chinese art." },
            ],
          },
        ],
      },
    ],
  },

  // ---------------------------------------------------------
  {
    id: "numbers", num: 2, title: "Numbers, dates, spelling", part: "Part 1",
    whenToUse: "In Part 1 forms: names, addresses, postcodes, phone numbers, measurements, prices. These are the easiest marks in the test — and the easiest to lose.",
    howTo: [
      "Names you could not know are spelt out. Write letter by letter and do not guess the word.",
      "Listen for “double”: double L = LL, double seven = 77.",
      "Similar letters: A / E / I, G / J, M / N, B / P. If the speaker checks (“M for mother?”), use the check.",
      "A postcode mixes letters and digits. Write it exactly in the order you hear it.",
      "Decimals: “nought point seven five” = 0.75. “One and a half” = 1.5.",
      "When several amounts are mentioned, wait for the one that answers the question (often a total at the end).",
    ],
    example: {
      text: "You hear: “The main costs are about fifteen hundred, and then there's about another two hundred on top.” The form says: Total value: £ ______. What do you write?",
      note: "1700. Neither number you heard is the answer — the form asks for the total, so you add them, or wait: the speaker usually says the total right after.",
    },
    recordings: [
      {
        id: "shipping", title: "Phone call to a shipping agency",
        audio: IDP + "WODNlKDwpZvgu6FiDipMc/d4c0b8f146a2823d04ccd67dd8a7c9da/Audio_-_Free_practice_test_-_Listening_-_Form_completion.mp3",
        tasks: [
          {
            type: "gap", title: "Customer details",
            instructions: "Complete the form. Write NO MORE THAN TWO WORDS AND/OR A NUMBER for each answer.",
            items: [
              { id: "sh1", before: "Destination: Kenya. Customer's name: Jacob", answer: ["Mkere"], exp: "The surname is spelt out, and the agent checks the first letter: “M for mother”." },
              { id: "sh2", before: "Collect the box from:", after: "College, Downlands Road, Bristol", answer: ["Westall"], exp: "The agent spells it back, with a double L at the end." },
              { id: "sh3", before: "Postcode:", answer: ["BS8 9PU"], exp: "Letters and digits mixed: B-S-8, then 9-P-U." },
              { id: "sh4", before: "Box size — length 1.5 m, width", after: "m", answer: ["0.75", ".75", "0.75m", "75cm"], exp: "Three measurements come one after another: length, width, height. Width is the second." },
              { id: "sh5", before: "height", after: "m", answer: ["0.5", ".5", "0.50", "0.5m", "50cm"], exp: "The speaker says “high or deep” — both mean the third measurement." },
              { id: "sh6", before: "Contents: clothes,", answer: ["books"], exp: "The contents are listed one at a time, with the agent writing each down." },
              { id: "sh7", before: "and", answer: ["toys"], exp: "The last item, after “anything else?”." },
              { id: "sh8", before: "Total value: £", answer: ["1700"], exp: "Trap: 1500 is only the clothes and books. The toys add 200, and the customer then gives the total." },
            ],
          },
        ],
      },
    ],
  },

  // ---------------------------------------------------------
  {
    id: "distractors", num: 3, title: "Distractors", part: "Parts 1–3",
    whenToUse: "In multiple choice. All three options are usually mentioned on the recording — only one of them answers the question.",
    howTo: [
      "Hearing a word from an option does not make that option correct. Ask: what is said about it?",
      "Listen for small words that change everything: outdoor / indoor, planning to / already has, old / new.",
      "Corrections and contrasts carry the answer: but, actually, though, however, not yet.",
      "Cross out an option as soon as the speaker rules it out.",
      "The final decision often comes last. Do not choose until the speaker has finished the point.",
    ],
    example: {
      text: "Question: Which hotel has an indoor pool? You hear: “The Royal Oak has an outdoor pool, which is lovely in summer, but the only hotel with an indoor pool is the Bridge Hotel. The Majestic is planning to build one, but it's not finished yet.”",
      note: "The Bridge Hotel. All three hotels are mentioned with the word “pool”. The Royal Oak is ruled out by “outdoor”, the Majestic by “planning… not finished yet”.",
    },
    recordings: [
      {
        id: "hotels", title: "At a tourist information office",
        audio: IDP + "6nGVxGcaw4NxE8pejWcm2/f6e4a9b8019259a33701bf41aa2009d6/Audio_-_Free_practice_test_-_Listening_-_Matching_-_Sample_2.mp3",
        tasks: [
          {
            type: "mcq", title: "Choosing a hotel",
            instructions: "Choose the correct answer, A, B or C.",
            items: [
              { id: "ho1", text: "The man is able to consider hotels outside the centre because", opts: ["he has his own transport.", "he wants somewhere quiet.", "the central hotels are full."], answer: 0, exp: "He says he has a car, so either location is possible. Quietness is mentioned later by the official, not by him." },
              { id: "ho2", text: "Which hotel is in the countryside?", opts: ["The Bridge Hotel", "The Royal Oak", "The Majestic"], answer: 1, exp: "The Royal Oak is out in the country. The Bridge and the Majestic are outside the centre too, but still in town, on the airport road." },
              { id: "ho3", text: "What does the official say about Carlton House?", opts: ["It is a newly constructed building.", "It began taking guests only a few months ago.", "It has four stars."], answer: 1, exp: "“Old building” and “opened recently” are both true: an old house, completely refurbished, with its first guests a few months ago. It is a five-star hotel." },
              { id: "ho4", text: "The Imperial would be the best choice for", opts: ["a company event.", "a guest who wants to swim.", "someone who likes historic buildings."], answer: 0, exp: "It has meeting rooms and is used for conferences. It has a gym but no pool, and it is a modern building." },
              { id: "ho5", text: "Where can guests swim indoors at the moment?", opts: ["The Royal Oak", "The Majestic", "The Bridge Hotel"], answer: 2, exp: "The Royal Oak's pool is outdoor. The Majestic's is only planned. The Bridge Hotel is the only one with an indoor pool." },
              { id: "ho6", text: "At the end, the man is most likely to choose", opts: ["a hotel on the airport road.", "a hotel in the city centre.", "the hotel in the country."], answer: 1, exp: "He found the airport road “a bit far out” earlier, and finishes by saying he will probably go for a central hotel." },
            ],
          },
        ],
      },
    ],
  },

  // ---------------------------------------------------------
  {
    id: "paraphrase", num: 4, title: "Paraphrase recognition", part: "All parts",
    whenToUse: "In sentence completion and short answers. The sentence on the page says the same thing as the speaker — in different words. Only the missing word is heard exactly.",
    howTo: [
      "Before listening, underline the key words in each sentence and think how else they could be said.",
      "Expect synonyms: demanded = needed, consists of = is made up of, half a year = six months.",
      "Expect a different structure: a statement on the page may be a question and answer on the recording.",
      "Write the word you hear — do not change its form or replace it with your own synonym.",
      "After listening, read the whole sentence: does your word fit the grammar?",
    ],
    example: {
      text: "Sentence: “Distance students have to keep up their ______ because nobody checks their work.” You hear: “I found I needed to maintain a high level of motivation… there's no-one saying, why haven't you written your assignment yet?”",
      note: "motivation. “Keep up” = “maintain”. “Nobody checks their work” = “no-one saying why haven't you written your assignment”. Nothing in the sentence is repeated on the recording except the answer itself.",
    },
    recordings: [
      {
        id: "openuni", title: "Two friends discuss distance study",
        audio: IDP + "6Ck9N5f4N74I085sfawnSO/95ad1936d134d6d08252bb83dc79aef8/Audio_-_Free_practice_test_-_Listening_-_Sentence_completion.mp3",
        note: "If the recording starts earlier in the conversation, the sentences below refer to its final part — from the moment Paul asks whether studying this way was hard.",
        tasks: [
          {
            type: "gap", title: "Rachel's experience",
            instructions: "Complete the sentences. Write NO MORE THAN TWO WORDS for each answer.",
            items: [
              { id: "ou1", before: "Rachel says distance students have to keep up their", after: "because nobody checks their work.", answer: ["motivation"], exp: "keep up = maintain a high level of. Nobody checks = no-one asks about your assignment." },
              { id: "ou2", before: "Combining study with a job made her much better at", after: ".", answer: ["time management", "time-management"], exp: "made her better at = “I got very good at”. Combining study with a job = fitting study round work." },
              { id: "ou3", before: "During her course Rachel was working", after: ".", answer: ["full-time", "full time"], exp: "Trap: Paul says he hopes to work part-time. The sentence is about Rachel, who had a full-time job." },
              { id: "ou4", before: "The degree consists of separate", after: ", so students can take a break between them.", answer: ["modules"], exp: "consists of = is made up of. Take a break = take time off." },
              { id: "ou5", before: "Next year Paul wants to go", after: "for half a year.", answer: ["travelling", "traveling"], exp: "half a year = six months. Write the word as you hear it." },
              { id: "ou6", before: "Students meet each other in person at", after: ", which normally run for about a week.", answer: ["summer schools", "summer school"], exp: "meet in person = “you meet all the other people”. Run for about a week = usually last a week." },
            ],
          },
        ],
      },
    ],
  },

  // ---------------------------------------------------------
  {
    id: "matching", num: 5, title: "Matching", part: "Parts 2–3",
    whenToUse: "When you get a short list of options (A, B, C…) and several items. Matching is about a quarter of many tests, mostly in Parts 2 and 3.",
    howTo: [
      "Read the options first and say each one in your own words — you will hear them paraphrased, never word for word.",
      "Check the rubric: can a letter be used more than once? If there are 3 options and 5 items, it must be.",
      "The items come in the order of the recording. The options do not.",
      "Listen for the language around each item: time phrases, attitude, certainty.",
      "If you miss one, leave it and move to the next item. Come back and guess at the end.",
    ],
    example: {
      text: "Options: A already happening · B expected soon · C far in the future. You hear: “That's part of an ongoing study, but the results are still a long way off.” Which letter?",
      note: "C. “Ongoing” sounds like A, and that is the trap: the study is happening now, but the question is about when it will help — and the results are “a long way off”.",
    },
    recordings: [
      {
        id: "oceans", title: "Seminar: a robotic float project",
        audio: "https://downloads.ctfassets.net/unrdeg6se4ke/3dKcbOPAu3EpCwDtBs2e3d/bfc0c6868a8d8ca41c0caddc05f997c4/Audio_-_Free_practice_test_-_Listening_-_Short_answer_questions_-_Sample_2.mp3",
        note: "The recording has two halves with a pause between them. Task 1 belongs to the first half, Task 2 to the second.",
        tasks: [
          {
            type: "gap", title: "Task 1 — The float",
            instructions: "Complete the notes. Write ONE WORD AND/OR A NUMBER for each answer.",
            items: [
              { id: "oc1", before: "Shape: similar to a", answer: ["cigar"], exp: "The speaker compares the device to a cigar." },
              { id: "oc2", before: "Countries taking part so far:", answer: ["13", "thirteen"], exp: "Trap: 14 is next year's figure, when one more country joins." },
              { id: "oc3", before: "Sinks to a depth of", after: "metres", answer: ["2000", "two thousand"], exp: "Also said as “two whole kilometres”, but the notes ask for metres." },
              { id: "oc4", before: "Stays at that depth for about", after: "days", answer: ["10", "ten"], exp: "Trap: “five hours” comes later and is the time spent on the surface." },
              { id: "oc5", before: "Average distance travelled:", after: "km", answer: ["50", "fifty"], exp: "It can cover large distances, but the question asks for the average." },
            ],
          },
          {
            type: "match", title: "Task 2 — When will the float data help?",
            instructions: "Choose the correct letter, A, B or C. You may use any letter more than once.",
            options: [
              { letter: "A", text: "It is already helping" },
              { letter: "B", text: "It will help fairly soon" },
              { letter: "C", text: "It will help only in the distant future" },
            ],
            items: [
              { id: "oc6", text: "confirming the causes of El Niño", answer: "A", exp: "Some data “has already helped”; the understanding “is being confirmed”." },
              { id: "oc7", text: "explaining how climate change works", answer: "C", exp: "An ongoing study, but its results are “still a long way off”." },
              { id: "oc8", text: "search and rescue at sea", answer: "A", exp: "Signalled by a contrast — “this is not the case with…” — and then “happening right now”." },
              { id: "oc9", text: "more sustainable fishing", answer: "B", exp: "They are “well on the way” and will see the results “quite soon”." },
              { id: "oc10", text: "choosing which grain farmers should plant", answer: "C", exp: "The student calls it science fiction; the speaker agrees it is “a long way in the future”." },
            ],
          },
        ],
      },
    ],
  },

  // ---------------------------------------------------------
  {
    id: "maps", num: 6, title: "Map, plan & diagram labelling", part: "Part 2",
    whenToUse: "When you get a plan, map or diagram with numbered spaces. You match what you hear to a place on the picture.",
    howTo: [
      "Find the starting point first (usually the entrance) and imagine yourself standing there.",
      "Read the labels that are already on the plan — the speaker will use them as landmarks.",
      "Know the location language: opposite, just beyond, next door to, on the far wall, straight on, through the door.",
      "Left and right are from the walker's point of view, not from the top of the page.",
      "Some options are mentioned but are not on the plan (moved, planned for later). Listen to what is said about them.",
    ],
    example: {
      text: "You hear: “My desk is just on your right as you go in, and opposite this, the first room on your left has…”. You are standing at the entrance, looking in. Where is that room?",
      note: "On the left side, level with the desk — the first door on your left. “Opposite” ties the room to a landmark you can already see on the plan.",
    },
    recordings: [
      {
        id: "library", title: "A tour of a town library",
        audio: IDP + "3cB4ifvDTH8J8I5h7SCGQ8/7f6eeefce8ab4ff4fa4c7ce081ce8402/Audio_-_Free_practice_test_-_Listening_-_Plan__map__diagram__labelling.mp3",
        tasks: [
          {
            type: "match", plan: "library", title: "Label the plan",
            instructions: "What is in each numbered place (1–5)? Choose the correct letter, A–I.",
            options: [
              { letter: "A", text: "Art collection" },
              { letter: "B", text: "Children's library" },
              { letter: "C", text: "Computer room" },
              { letter: "D", text: "Local history" },
              { letter: "E", text: "Meeting room" },
              { letter: "F", text: "Multimedia" },
              { letter: "G", text: "Periodicals" },
              { letter: "H", text: "Reference books" },
              { letter: "I", text: "Tourist information" },
            ],
            items: [
              { id: "li1", text: "Place 1", answer: "H", exp: "Opposite the librarian's desk, the first room on the left: reference books, also a quiet place to read." },
              { id: "li2", text: "Place 2", answer: "G", exp: "Just beyond the desk on the right: newspapers and magazines, that is, periodicals." },
              { id: "li3", text: "Place 3", answer: "D", exp: "Shelves on the far wall of the main area: books on local history. A tourist section is only planned for later." },
              { id: "li4", text: "Place 4", answer: "B", exp: "Next door to the seminar room: stories and picture books for under-elevens." },
              { id: "li5", text: "Place 5", answer: "F", exp: "The large room to the right of the main area: videos and DVDs. It used to hold the art collection, which has moved." },
            ],
          },
        ],
      },
    ],
  },

  // ---------------------------------------------------------
  { id: "opinions", num: 7, title: "Opinions & agreement", part: "Part 3", soon: true },
  { id: "lecture", num: 8, title: "Following a lecture", part: "Part 4", soon: true },
];

// Нормализация текстового ответа: регистр, пробелы, дефисы, знаки валют и запятые не учитываются.
export const normAnswer = s => String(s ?? "").toLowerCase().replace(/[£$,\s\-–.]+$/g, "").replace(/[£$,\s\-–]/g, "");

export function isCorrect(task, item, userAnswer) {
  if (task.type === "gap") return item.answer.map(normAnswer).includes(normAnswer(userAnswer)) && normAnswer(userAnswer) !== "";
  return userAnswer === item.answer;
}

export function scoreListening(recording, userAnswers) {
  let correct = 0, total = 0;
  const details = [];
  for (const task of recording.tasks) {
    for (const item of task.items) {
      total++;
      const ua = userAnswers[item.id];
      const ok = isCorrect(task, item, ua);
      let correctAnswer = item.answer, userAnswer = ua;
      let question = item.text || [item.before, "______", item.after].filter(Boolean).join(" ");
      if (task.type === "gap") correctAnswer = item.answer[0];
      if (task.type === "mcq") { correctAnswer = item.opts[item.answer]; userAnswer = ua !== undefined ? item.opts[ua] : undefined; }
      if (ok) correct++;
      details.push({ id: item.id, ok, type: task.type, question, correctAnswer, userAnswer });
    }
  }
  return { correct, total, pct: total ? Math.round((correct / total) * 100) : 0, details };
}
