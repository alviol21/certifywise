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
//   Для записей из учебника вместо audio: storage (путь к файлу в закрытом хранилище Supabase,
//   bucket "listening-audio"), track (номер трека), page (страница издательства), credit (источник).
// ЗАДАНИЕ (task.type):
//   "gap"    — вписать слово/число. item: { id, before, after?, answer: [допустимые варианты], exp }
//   "mcq"    — один ответ.          item: { id, text, opts: [..], answer: индекс, exp }
//   "match"  — буква из списка.     task.options: [{ letter, text }], item: { id, text, answer: "A", exp }
//              task.plan: "library" — над заданием рисуется план (Map/plan labelling)
// Модули 1–6: аудио не хранится на сайте, плеер воспроизводит официальные образцы IELTS с сервера IDP.
// Модули 7–8: аудио учебника Collins лежит в закрытом хранилище и выдаётся только вошедшим пользователям.
// Вопросы, объяснения и план — оригинальные материалы CertifyWise.

const IDP = "https://assets.ctfassets.net/unrdeg6se4ke/";
export const LISTENING_BUCKET = "listening-audio";
const COLLINS_PAGE = "https://www.nhantriviet.com/MP3-CLFI2E";
const COLLINS_CREDIT = "Collins Listening for IELTS, 2nd edition (HarperCollins, 2019)";

export const LISTENING_FORMAT = [
  ["Parts", "4"],
  ["Questions", "40 (10 per part)"],
  ["Time", "about 30 minutes"],
  ["Plays", "once only"],
  ["Answers", "typed on screen while you listen"],
  ["At the end", "about 2 minutes to check your answers (no transfer time)"],
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
      {
        id: "dance", title: "Announcement: a dance school timetable",
        storage: "collins-2e/10.mp3", track: 10, page: COLLINS_PAGE, credit: COLLINS_CREDIT,
        tasks: [
          {
            type: "gap", title: "New timetable",
            instructions: "Complete the table. Write ONE WORD AND/OR A NUMBER for each answer.",
            items: [
              { id: "dn1", before: "Ballet — day:", answer: ["Tuesday", "Tuesdays"], exp: "Predicted: a day of the week. Three different days are mentioned on the recording, one for each class." },
              { id: "dn2", before: "Ballet — class finishes at", answer: ["8.00", "8", "8 pm", "8.00 pm", "eight"], exp: "Predicted: a time. Trap: 7.30 is the old finishing time. The class is now an hour and a half, “so it will continue until 8.00”." },
              { id: "dn3", before: "Ballet — new fee: £", answer: ["10.50", "10.5"], exp: "Predicted: a price. Two prices in one sentence: “from eight pounds fifty to ten pounds fifty”. The gap says new." },
              { id: "dn4", before: "Tango — day:", answer: ["Wednesday", "Wednesdays"], exp: "“Instead of being on Mondays these classes will be on Wednesday nights.” Instead of = the first day is the old one." },
              { id: "dn5", before: "Tango — fee: £", answer: ["7.50", "7.5"], exp: "“The fees will still be seven pounds fifty.” Still = no change." },
              { id: "dn6", before: "Tap — class starts at", answer: ["8.30", "8.30 am", "half past eight"], exp: "Predicted: a time. “It starts at 8.30 on Saturday morning.”" },
              { id: "dn7", before: "Tap — class finishes at", answer: ["10", "10.00", "10 am", "ten"], exp: "“…and finishes at ten.”" },
              { id: "dn8", before: "Tap — fee: £", answer: ["11", "11.00"], exp: "The last price on the recording." },
            ],
          },
        ],
      },
      {
        id: "camp", title: "Talk: a summer camp",
        storage: "collins-2e/13.mp3", track: 13, page: COLLINS_PAGE, credit: COLLINS_CREDIT,
        tasks: [
          {
            type: "gap", title: "Notes: Health and Action Summer Camp",
            instructions: "Complete the notes. Write ONE WORD AND/OR A NUMBER for each answer.",
            items: [
              { id: "cp1", before: "Location: in southern Ireland, close to a", answer: ["river"], exp: "Predicted: a noun for a place in nature. “Situated near a river.”" },
              { id: "cp2", before: "Size of the camp:", after: "acres", answer: ["5", "five"], exp: "Predicted: a number. “Acres” is already printed." },
              { id: "cp3", before: "Wildlife lives in a small", after: "inside the grounds", answer: ["forest"], exp: "“A small forest within the camp grounds which provides a great habitat for wildlife.”" },
              { id: "cp4", before: "Two kinds of accommodation: tents and", answer: ["cabins", "cabin"], exp: "Predicted: a plural noun, the second item of a pair." },
              { id: "cp5", before: "The tents are on", after: "ground, away from the river", answer: ["higher", "high"], exp: "Predicted: an adjective before “ground”. The cabins are by the river; the tents are on higher ground." },
              { id: "cp6", before: "Number of washroom blocks:", answer: ["2", "two"], exp: "Predicted: a number." },
              { id: "cp7", before: "The cooking area is in the", after: "of the camp", answer: ["centre", "center", "middle"], exp: "Predicted: a noun of position. “Situated in the centre of the camp.”" },
            ],
          },
        ],
      },
      {
        id: "websites", title: "Talk: websites for children and teenagers",
        storage: "collins-2e/12.mp3", track: 12, page: COLLINS_PAGE, credit: COLLINS_CREDIT,
        tasks: [
          {
            type: "gap", title: "Recommended websites",
            instructions: "Complete the table. Write ONE WORD AND/OR A NUMBER for each answer.",
            items: [
              { id: "ws1", before: "Playtime Online — for ages 4 to", answer: ["6", "six"], exp: "Predicted: an age. “Four” is heard twice before this — once as the age when children can start, once as the start of the range." },
              { id: "ws2", before: "Playtime Online — teaches skills for", answer: ["games", "game"], exp: "Predicted: a noun. “Helps children learn skills for games.”" },
              { id: "ws3", before: "Moving Up — for ages 5 to about", answer: ["10", "ten"], exp: "Predicted: an age. “From say five until about ten years of age.”" },
              { id: "ws4", before: "Moving Up — improves maths and", after: "skills", answer: ["language"], exp: "Predicted: a school subject or skill, the second of a pair." },
              { id: "ws5", before: "Net Aware — for ages", after: "to 16", answer: ["12", "twelve"], exp: "Predicted: an age lower than 16." },
              { id: "ws6", before: "Net Aware — teaches about online", answer: ["dangers", "danger"], exp: "“Makes young people more aware of online dangers.”" },
              { id: "ws7", before: "Chat Electric — a place to make", after: "online", answer: ["friends", "friend"], exp: "Predicted: a plural noun after “make”." },
              { id: "ws8", before: "Test Doctors — for ages 16 to", answer: ["18", "eighteen"], exp: "Predicted: an age higher than 16." },
              { id: "ws9", before: "Test Doctors — helps students revise for", answer: ["exams", "exam", "their exams"], exp: "“A site designed to help students revise for their exams.”" },
              { id: "ws10", before: "Test Doctors — run by subject", answer: ["specialists", "specialist"], exp: "Predicted: a word for people. “The site is run by subject specialists.”" },
            ],
          },
        ],
      },
      {
        id: "award", title: "Talk: how to get a Bronze award",
        storage: "collins-2e/14.mp3", track: 14, page: COLLINS_PAGE, credit: COLLINS_CREDIT,
        tasks: [
          {
            type: "gap", title: "The Duke of Edinburgh's Award: steps",
            instructions: "Complete the notes. Write ONE WORD AND/OR A NUMBER for each answer.",
            items: [
              { id: "aw1", before: "Three levels: Bronze, Silver and", answer: ["Gold"], exp: "Predicted: the third item of a list." },
              { id: "aw2", before: "Number of activity categories:", answer: ["4", "four"], exp: "Predicted: a number. Trap: “three levels” comes just before “four categories”." },
              { id: "aw3", before: "Step 1 — find a centre: your school, college or youth", answer: ["club"], exp: "Predicted: a noun after “youth”, the last item of a list." },
              { id: "aw4", before: "Step 2 — pay a small", after: "to enrol", answer: ["fee"], exp: "Predicted: a noun after “pay a small…”." },
              { id: "aw5", before: "Step 3 — receive a welcome", answer: ["pack"], exp: "“Once you have enrolled, you will get a welcome pack.”" },
              { id: "aw6", before: "Step 4 — have your activities approved by your", answer: ["Coordinator", "Co-ordinator"], exp: "Predicted: a person. Two people are mentioned: the Coordinator approves the plan, the assessor checks it later." },
              { id: "aw7", before: "Step 5 — the assessor signs your record", answer: ["book"], exp: "“By signing your record book.”" },
              { id: "aw8", before: "Step 6 — you receive a certificate and a", answer: ["badge"], exp: "Predicted: a countable noun after “a”. “Your certificate and badge.”" },
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
      {
        id: "hotelbooking", title: "Phone call: booking a hotel room",
        storage: "collins-2e/02.mp3", track: 2, page: COLLINS_PAGE, credit: COLLINS_CREDIT,
        tasks: [
          {
            type: "gap", title: "Booking form",
            instructions: "Complete the form. Write ONE WORD AND/OR A NUMBER for each answer.",
            items: [
              { id: "hb1", before: "Type of room:", answer: ["twin"], exp: "Said in the first request: “I'd like to book a twin room.”" },
              { id: "hb2", before: "Guest's name: Duncan", answer: ["Geoffrey"], exp: "Spelt out with “double F”: G-E-O-F-F-R-E-Y. The receptionist repeats the spelling." },
              { id: "hb3", before: "Contact telephone number:", answer: ["5762 23821"], exp: "Said once, in two groups: 5762 and 23821." },
              { id: "hb4", before: "Arrival date:", after: "September", answer: ["19", "19th", "nineteenth"], exp: "“The evening of the nineteenth.” Nineteenth, not ninetieth — listen for the stress." },
              { id: "hb5", before: "Departure date:", after: "September", answer: ["23", "23rd", "twenty-third"], exp: "The second date in the conversation." },
              { id: "hb6", before: "Total price: £", answer: ["210"], exp: "Trap: £235 is the normal price. The special low-season rate is £210." },
              { id: "hb7", before: "Method of payment:", answer: ["cash"], exp: "Three methods are offered — cash, bank transfer, credit card. The customer chooses one." },
            ],
          },
        ],
      },
      {
        id: "addresses", title: "Dictation: three addresses",
        storage: "collins-2e/37.mp3", track: 37, page: COLLINS_PAGE, credit: COLLINS_CREDIT,
        note: "Three addresses are read out with pauses. Write the missing part of each one.",
        tasks: [
          {
            type: "gap", title: "Addresses",
            instructions: "Complete the addresses exactly as you hear them.",
            items: [
              { id: "ad1", before: "Address 1:", after: "High Trees Street, Sydney", answer: ["78A"], exp: "A house number with a letter: seventy-eight A." },
              { id: "ad2", before: "Address 1 — postcode:", answer: ["2316"], exp: "Four digits, read one by one or in pairs." },
              { id: "ad3", before: "Address 2: 354", after: "Avenue, Edinburgh", answer: ["Castle"], exp: "A street name that is an ordinary word, so it is not spelt out." },
              { id: "ad4", before: "Address 2 — postcode:", answer: ["E5 7HU"], exp: "A British postcode mixes letters and digits: E-5, then 7-H-U." },
              { id: "ad5", before: "Address 3:", after: "Woodland Drive, Brooklyn, New York", answer: ["86"], exp: "Eighty-six. Compare with 68 — the order of the digits matters." },
              { id: "ad6", before: "Address 3 — zip code:", answer: ["45008"], exp: "Five digits: listen for how the two zeros in the middle are said." },
            ],
          },
        ],
      },
      {
        id: "enrolment", title: "University enrolment desk",
        storage: "collins-2e/38.mp3", track: 38, page: COLLINS_PAGE, credit: COLLINS_CREDIT,
        tasks: [
          {
            type: "gap", title: "Enrolment record",
            instructions: "Complete the form. Write ONE WORD AND/OR A NUMBER for each answer.",
            items: [
              { id: "en1", before: "Student's name: Peter", answer: ["Taylor"], exp: "“Taylor with a Y” — then the administrator spells it: T-A-Y-L-O-R." },
              { id: "en2", before: "Course: BSc in", answer: ["Economics"], exp: "Said once by the student." },
              { id: "en3", before: "Faculty of", answer: ["Mathematics", "Maths", "Math"], exp: "Trap: the student thought it was Business and Management. That was last year; the course has moved." },
              { id: "en4", before: "University accommodation: room", answer: ["112"], exp: "One hundred and twelve, or one-one-two." },
              { id: "en5", before: "Name of residence:", after: "Residence, Duke Street", answer: ["Ashley"], exp: "Two similar names: Ashley and Askey. The student confirms by spelling: A-S-H-L-E-Y." },
              { id: "en6", before: "Home address:", after: "Grove Street, Manchester", answer: ["56"], exp: "Read out by the administrator from the records." },
              { id: "en7", before: "Home postcode:", answer: ["M4 9JA"], exp: "Trap: the records say M1 9JA. The student corrects the first part: “it's M4, not M1”." },
            ],
          },
        ],
      },
      {
        id: "bustour", title: "Tourist office: booking a bus tour",
        storage: "collins-2e/08.mp3", track: 8, page: COLLINS_PAGE, credit: COLLINS_CREDIT,
        tasks: [
          {
            type: "gap", title: "Booking details",
            instructions: "Complete the form. Write ONE WORD AND/OR A NUMBER for each answer.",
            items: [
              { id: "bt1", before: "Length of tour:", after: "hours", answer: ["2", "two"], exp: "Two tours are offered: three hours with an audio guide, two hours without. The tourist takes the shorter one." },
              { id: "bt2", before: "Passengers: Susan Field and James", answer: ["Carter"], exp: "The assistant asks for the spelling: C-A-R-T-E-R." },
              { id: "bt3", before: "Mobile number:", answer: ["07988 636197"], exp: "Said twice — the assistant repeats it, so you can check." },
              { id: "bt4", before: "Staying at the", after: "Hotel", answer: ["Riverside"], exp: "Trap: the Crest Hotel is where they will stay next week. “Oh no, sorry” signals the correction." },
              { id: "bt5", before: "Tour starts at", after: "p.m.", answer: ["3", "three", "3.00"], exp: "Trap: 4 p.m. is offered first. The tourist asks for “the earlier one”." },
              { id: "bt6", before: "Date: August", answer: ["14", "14th", "fourteenth"], exp: "Fourteenth, not fortieth. Said when the assistant confirms the booking." },
              { id: "bt7", before: "Price per person: £", answer: ["15"], exp: "Fifteen, not fifty: the stress is on the second syllable." },
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
      {
        id: "tours", title: "Two tourists choose a tour",
        storage: "collins-2e/06.mp3", track: 6, page: COLLINS_PAGE, credit: COLLINS_CREDIT,
        tasks: [
          {
            type: "mcq", title: "Choosing a tour",
            instructions: "Choose the correct answer, A, B or C.",
            items: [
              { id: "tr1", text: "John does not want to go on the walking tour because", opts: ["it costs too much.", "they will be tired after the theatre.", "it takes place in the evening."], answer: 1, exp: "The theatre is tonight, the walking tour tomorrow: “we'll be quite tired”. No price is given for this tour." },
              { id: "tr2", text: "How much does the dinner cruise cost per person?", opts: ["$5.50", "$12", "$20"], answer: 1, exp: "Two prices are heard. $12 is the cruise; $5.50 comes later and belongs to the bus tour." },
              { id: "tr3", text: "John's real reason for refusing the cruise is that", opts: ["it is too expensive.", "he is afraid of the sea.", "it finishes too late."], answer: 1, exp: "Sam calls it a bargain, so price is not the problem. John: “I hate the sea. I'll be sick with fear.”" },
              { id: "tr4", text: "When is the bus tour?", opts: ["tonight", "tomorrow morning", "tomorrow evening"], answer: 2, exp: "Tonight is the theatre. The bus tour is “tomorrow evening”." },
              { id: "tr5", text: "Which activity do they agree on in the end?", opts: ["the walking tour", "the harbour cruise", "the bus tour"], answer: 2, exp: "All three are discussed. The first two are rejected by John; Sam accepts the last: “Yeah, that sounds okay.”" },
            ],
          },
        ],
      },
      {
        id: "dinner", title: "Two tourists choose a restaurant",
        storage: "collins-2e/07.mp3", track: 7, page: COLLINS_PAGE, credit: COLLINS_CREDIT,
        tasks: [
          {
            type: "mcq", title: "Where to eat",
            instructions: "Choose the correct answer, A, B or C.",
            items: [
              { id: "dr1", text: "Why is Sam not sure about The Captain's Table?", opts: ["It has only four stars.", "The service can be very slow.", "It does not serve seafood."], answer: 1, exp: "Four stars is a positive point from the guide. The negative comes from the receptionist: the service is “incredibly slow sometimes”." },
              { id: "dr2", text: "Compared with Joe's Cafe, Mangan's", opts: ["is cheaper.", "has better views.", "is easier to book."], answer: 1, exp: "Mangan's is “nicer” with “fantastic views”, but they would “pay a bit extra”. Joe's Cafe is the cheaper one." },
              { id: "dr3", text: "What does Sam say about the cost of the meal?", opts: ["They should choose the cheapest place.", "It does not matter because they are on holiday.", "Mangan's is too expensive for them."], answer: 1, exp: "“But we're on holiday: I don't think we should worry about the cost!” — “but” turns the point around." },
              { id: "dr4", text: "Where will they eat tonight?", opts: ["The Captain's Table", "Mangan's", "Joe's Cafe"], answer: 2, exp: "They choose Mangan's — then “Oh, no. Hold on. It's closed tonight.” The decision changes at the last moment." },
              { id: "dr5", text: "Who is going to book the table?", opts: ["Sam", "John", "the hotel receptionist"], answer: 2, exp: "Sam offers to call, but John's phone has no battery, so they will “ask the hotel receptionist to do it”." },
            ],
          },
        ],
      },
      {
        id: "museum", title: "Tourist office: a museum and restaurants",
        storage: "collins-2e/09.mp3", track: 9, page: COLLINS_PAGE, credit: COLLINS_CREDIT,
        tasks: [
          {
            type: "mcq", title: "Task 1 — The museum",
            instructions: "Choose the correct answer, A, B or C.",
            items: [
              { id: "ms1", text: "The museum ticket is expensive because", opts: ["its collection is the only one of its kind in Europe.", "it has many special exhibitions.", "the building needs repairs."], answer: 2, exp: "The collection and exhibitions are mentioned first — then “But that's not the reason”. The money goes towards repairing the roof and the walls." },
              { id: "ms2", text: "After hearing the explanation, the tourist thinks the museum is", opts: ["still too expensive.", "worth the money.", "not interesting enough."], answer: 1, exp: "He was “shocked” at first, but ends with “it's worth paying £23”." },
            ],
          },
          {
            type: "mcq", title: "Task 2 — Restaurants",
            instructions: "Choose the correct answer, A, B or C.",
            items: [
              { id: "ms3", text: "What is the problem with the restaurants near the harbour and the beach?", opts: ["They are full of tourists.", "There is a strong smell from the fish market.", "They are too expensive."], answer: 1, exp: "The assistant calls them nice, then: “The problem is that the smell of the fish market is quite strong.”" },
              { id: "ms4", text: "The assistant suggests going to the next town because", opts: ["there are more restaurants to choose from.", "the restaurants are cheaper there.", "it is ten minutes away on foot."], answer: 0, exp: "“The restaurant selection is wider.” Ten minutes is by taxi, and prices are not compared." },
              { id: "ms5", text: "The Belleview is known for", opts: ["its famous chef.", "its celebrity customers.", "its long history."], answer: 0, exp: "Celebrities and a hundred-year history are both true — of the Lighthouse Café, which is described next." },
              { id: "ms6", text: "Why does the tourist reject the first two restaurants?", opts: ["They are too far from his hotel.", "They are too popular.", "They sound too expensive."], answer: 2, exp: "“They sound a bit too expensive to me.” The Belleview is “extremely popular”, but that is the assistant's praise, not the tourist's objection." },
              { id: "ms7", text: "What does the assistant say about Harvey's?", opts: ["It has been run by one family for over a hundred years.", "It has just got a new chef.", "It is popular with actors."], answer: 0, exp: "“The same family has run this restaurant for over a century.” The new chef belongs to Stonecroft House, the actors to the Lighthouse Café." },
              { id: "ms8", text: "What happened at Stonecroft House a month ago?", opts: ["It reduced its prices.", "New owners took over.", "It moved to a new building."], answer: 1, exp: "“New owners took over a month ago and they're getting good reviews.”" },
            ],
          },
        ],
      },
      {
        id: "wedding", title: "In a department store",
        storage: "collins-2e/84.mp3", track: 84, page: COLLINS_PAGE, credit: COLLINS_CREDIT,
        note: "Three tasks in the order of the conversation: choosing clothes, delivery details, finding places in the store.",
        tasks: [
          {
            type: "mcq", title: "Task 1 — Choosing a dress and a hat",
            instructions: "Choose the correct answer, A, B or C.",
            items: [
              { id: "wd1", text: "Ellen is shopping because", opts: ["she has just started a new job.", "she is going to her brother's wedding.", "she is going on holiday."], answer: 1, exp: "Both A and B are said. The wedding is why she needs something to wear; the new job is why she has had no time to shop." },
              { id: "wd2", text: "Which dress does Ellen decide to try?", opts: ["the one with long sleeves", "the one with the bow", "the patterned one"], answer: 1, exp: "Long sleeves: too hot. Pattern: “I'm not keen”. “I think I'll go for the one with the bow.”" },
              { id: "wd3", text: "Which hat does she choose?", opts: ["wide brim with a bunch of flowers", "narrow brim with a bunch of flowers", "narrow brim with one flower"], answer: 2, exp: "The assistant gives four combinations. Ellen: “I like the narrow brim, and just the one flower.”" },
              { id: "wd4", text: "What colour is the flower on the hat she orders?", opts: ["blue", "cream", "white"], answer: 1, exp: "She asks for blue, but “I'm afraid it just comes in cream” — and she accepts it." },
            ],
          },
          {
            type: "gap", title: "Task 2 — Delivery details",
            instructions: "Complete the form. Write ONE WORD AND/OR A NUMBER for each answer.",
            items: [
              { id: "wd5", before: "Delivery address:", after: "Brightwell Avenue, Staybridge, Kent", answer: ["14"], exp: "Self-correction: “It's 15… no… 14.”" },
              { id: "wd6", before: "Postcode:", answer: ["DA4 7DF"], exp: "Said once, after the street name is spelt." },
              { id: "wd7", before: "Mobile number:", answer: ["032217774"], exp: "“Double 2” = 22, “triple 7” = 777. The assistant repeats it with a 5 at the end, and Ellen corrects her: it is a 4." },
              { id: "wd8", before: "Delivery date: May", answer: ["12", "12th", "twelfth"], exp: "“We can deliver on May the twelfth.”" },
              { id: "wd9", before: "Preferred time: early", answer: ["morning"], exp: "The shop offers morning or afternoon. Ellen: “Any time in the early morning is fine.”" },
              { id: "wd10", before: "Total to pay: £", answer: ["32.25"], exp: "“Thirty-two pounds twenty-five.”" },
            ],
          },
          {
            type: "mcq", title: "Task 3 — Finding places in the store",
            instructions: "Choose the correct answer, A, B or C.",
            items: [
              { id: "wd11", text: "The changing rooms are", opts: ["at the front of the store.", "next to Customer Services.", "by Menswear."], answer: 1, exp: "“To the left of the store, right next to Customer Services.”" },
              { id: "wd12", text: "Where is the Shoe Department now?", opts: ["between Menswear and Home Furnishings", "in front of the changing rooms", "in the Womenswear Department"], answer: 1, exp: "The assistant first gives the old place, then “Oh, no, sorry… we've just moved” it: straight in front of the changing rooms. Womenswear is where the accessories are." },
              { id: "wd13", text: "Where can Ellen pay?", opts: ["at the front of the store, by Menswear", "next to Customer Services", "in the Shoe Department"], answer: 0, exp: "“The cash desk is at the front of the store, by the Menswear.”" },
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
  {
    id: "opinions", num: 7, title: "Opinions & agreement", part: "Part 3",
    whenToUse: "In Part 3 discussions between students and a tutor. The questions ask what people think, what they decide and how far they agree — not only what facts are mentioned.",
    howTo: [
      "Before listening, note who is speaking: here two students and a professor. Many questions depend on whose opinion it is.",
      "Full agreement is short: “Yes, good idea”, “Exactly”, “That's a great idea”.",
      "Partial agreement has two halves: “That's a nice idea, but…”, “OK, but…”. The answer is usually in the second half.",
      "An idea that is mentioned first is often replaced: “At first we were going to…, but then we decided…”.",
      "A suggestion is not a decision. Wait for the reaction to it before you choose.",
      "Softening phrases signal a correction: “strictly speaking”, “if anything”, “as long as you…”.",
    ],
    example: {
      text: "Question: What does the tutor think of the students' plan to use a questionnaire? You hear: “A questionnaire? That could work, but only if you keep it to five or six questions. Any longer and nobody will fill it in.”",
      note: "The tutor accepts the plan with a condition: it must be short. “That could work” alone sounds like full agreement — the real opinion comes after “but”. An option saying “a questionnaire is a bad idea” would be wrong too: the tutor does not reject it.",
    },
    recordings: [
      {
        id: "wildlife", title: "Tutorial: planning a wildlife presentation",
        storage: "collins-2e/86.mp3", track: 86, page: COLLINS_PAGE, credit: COLLINS_CREDIT,
        note: "Three speakers: two students, Katie and Ian, and Professor Gordon. Tasks 2 and 3 start when the students begin to show a part of their presentation.",
        tasks: [
          {
            type: "mcq", title: "Task 1 — Planning the presentation",
            instructions: "Choose the correct answer, A, B or C.",
            items: [
              { id: "wl1", text: "The students have finally decided to give their presentation on", opts: ["the cat family.", "nocturnal animals.", "animals of the Americas."], answer: 1, exp: "“At first we were going to focus on the cat family, but then we decided…” — the first idea is replaced. The professor fully agrees: “Yes, good idea.”" },
              { id: "wl2", text: "What do the students see as the advantage of their topic?", opts: ["There is a lot of visual material available.", "It fits easily into twenty minutes.", "Very little has been written about it."], answer: 0, exp: "“The advantage is that there are so many visual aids we can use.” Twenty minutes is mentioned too, but as the limit they have to fit into." },
              { id: "wl3", text: "What is the students' main difficulty?", opts: ["They cannot find enough information.", "They have more information than they can use.", "They disagree about what to include."], answer: 1, exp: "The topic “has been hard to narrow down” and they have “too much information for just 20 minutes”." },
              { id: "wl4", text: "To narrow the topic down, the professor recommends", opts: ["describing every animal very briefly.", "looking only at animals from one continent.", "choosing a small group of typical animals."], answer: 2, exp: "“A representative sample… just four or five.” Continents are a student's later suggestion, not the professor's advice." },
              { id: "wl5", text: "Which way of choosing the animals gets a positive reaction?", opts: ["one animal from each continent", "animals of different types, such as land, sea and air", "animals that are all related to each other"], answer: 1, exp: "Both ideas are suggested in one sentence. The reply picks one of them: “I like the idea of separating it by different types of animals.”" },
              { id: "wl6", text: "What does the professor say about limiting the detail?", opts: ["It is the best way to save time.", "It should not be taken too far.", "It will make the talk less accurate."], answer: 1, exp: "A partial agreement in one short line: “But don't limit the detail too much.”" },
              { id: "wl7", text: "The professor thinks that using a picture of each animal is", opts: ["a good idea that needs something added to it.", "enough to keep the audience interested.", "less useful than a written handout."], answer: 0, exp: "“That's a nice idea, but don't limit yourself to pictures” — then the addition: brief video clips." },
              { id: "wl8", text: "According to the professor, the students should ask the audience questions because", opts: ["it shows how much the audience has understood.", "it helps to fill the time.", "people enjoy taking part."], answer: 2, exp: "“People like to be involved.” The students agree fully: “That's a great idea.”" },
            ],
          },
          {
            type: "gap", title: "Task 2 — The students' notes on the jaguar",
            instructions: "Complete the notes. Write ONE WORD AND/OR A NUMBER for each answer.",
            items: [
              { id: "wl9", before: "The only member of its genus living in the", answer: ["Americas", "the Americas", "America"], exp: "“The only species of the genus Panthera to be found in the Americas.”" },
              { id: "wl10", before: "Length of one stride: up to", after: "metres", answer: ["5.5", "5 1/2", "5½"], exp: "“Five and a half metres” — as a number it is 5.5. Writing it in words would break the word limit." },
              { id: "wl11", before: "Because of its fur, it is often mistaken for a", answer: ["leopard", "leopards"], exp: "“People often confuse jaguars with leopards for this reason.” Confuse with = mistake for." },
              { id: "wl12", before: "Lower part of the tail: marked with black", answer: ["circles", "circle", "rings"], exp: "Trap: “some people think the tail has stripes… actually… black circles”. The word after “actually” is the answer." },
            ],
          },
          {
            type: "mcq", title: "Task 3 — The professor's final comment",
            instructions: "Choose the correct answer, A, B or C.",
            items: [
              { id: "wl13", text: "What does the professor say about calling the jaguar a nocturnal animal?", opts: ["It is a mistake and the jaguar should be left out.", "It is acceptable if the students explain when the animal is really active.", "It is completely accurate."], answer: 1, exp: "“Strictly speaking it's crepuscular… but as long as you mention this, you can put it under the umbrella of nocturnal.” A correction and a condition, not a refusal." },
            ],
          },
        ],
      },
    ],
  },

  // ---------------------------------------------------------
  {
    id: "lecture", num: 8, title: "Following a lecture", part: "Part 4",
    whenToUse: "In Part 4: one speaker, an academic topic, no pause in the middle. You complete notes while the lecturer keeps talking.",
    howTo: [
      "Use the headings in the notes as a map: they show the order of the lecture before you hear it.",
      "Listen for signposting: “It began with…”, “In the 11th century…”, “However…”, “Lastly…”, “Now we're going to…”. Each one tells you the lecturer has moved on.",
      "Predict each gap: a date, a number, a material, an adjective? Dates and numbers are the easiest to catch.",
      "Several numbers may come close together. Decide in advance which one each gap needs.",
      "If you lose your place, do not go back. Find the next heading or the next gap you can predict and wait for it.",
      "Write as you listen: the lecturer does not repeat anything.",
    ],
    example: {
      text: "Notes: “First public railway opened in ______”. You hear: “The idea had been discussed since the 1790s, and a short line for coal was running by 1804, but it was only in 1825 that a railway carried the public for the first time.”",
      note: "1825. Three dates in one sentence: the 1790s (discussion), 1804 (coal only) and 1825 (the public). The gap says “public”, so you wait for that word — “it was only in…” signals that the important date is coming.",
    },
    recordings: [
      {
        id: "horology", title: "Lecture: the measurement of time",
        storage: "collins-2e/87.mp3", track: 87, page: COLLINS_PAGE, credit: COLLINS_CREDIT,
        note: "One speaker. Task 1 follows the lecture from the start; Task 2 begins when the lecturer turns to the reading list.",
        tasks: [
          {
            type: "gap", title: "Task 1 — Lecture notes",
            instructions: "Complete the notes. Write ONE WORD AND/OR A NUMBER for each answer.",
            items: [
              { id: "hr1", before: "Sundials: the hour was shown by the position of the sun's", answer: ["shadow"], exp: "First device mentioned: “the position of the sun's shadow marked the hour”." },
              { id: "hr2", before: "Daylight was divided into", after: "“temporary hours”", answer: ["12", "twelve"], exp: "Predicted: a number." },
              { id: "hr3", before: "These hours were shorter in", answer: ["winter", "the winter"], exp: "Trap: “longer in the summer and shorter in the winter” — two seasons, and the notes ask about the shorter hours." },
              { id: "hr4", before: "Earliest known sundial: found in", answer: ["Egypt"], exp: "“The earliest sundial we know comes from Egypt.”" },
              { id: "hr5", before: "made of", answer: ["stone"], exp: "Predicted: a material." },
              { id: "hr6", before: "dates from about", after: "BC", answer: ["1500"], exp: "“Thought to date from 1500 BC.” BC is already printed." },
              { id: "hr7", before: "Sundials today:", after: "objects in gardens", answer: ["decorative"], exp: "“Decorative pieces in many gardens.” Pieces = objects." },
              { id: "hr8", before: "First mechanical clocks: invented in China in the", after: "century", answer: ["11th", "11", "eleventh"], exp: "Signpost: “In the 11th century…” opens a new section of the lecture." },
              { id: "hr9", before: "They were large and", after: ", so not made for individuals", answer: ["expensive"], exp: "“Large and expensive, and certainly not intended for individuals.”" },
              { id: "hr10", before: "International atomic time: the standard was set in", answer: ["1958"], exp: "Predicted: a year. Other numbers come just before it (6 am, 2 pm) — they are an example, not the date." },
              { id: "hr11", before: "Atomic clocks are kept in more than", after: "laboratories", answer: ["70", "seventy"], exp: "“In over 70 laboratories all over the world.” Over = more than." },
            ],
          },
          {
            type: "match", title: "Task 2 — The reading list",
            instructions: "What does the lecturer say about each book? Choose the correct letter, A–E. There is one letter you do not need.",
            options: [
              { letter: "A", text: "It is the main book for the course." },
              { letter: "B", text: "It is a good introduction, although some parts lack depth." },
              { letter: "C", text: "It compares how different countries deal with time." },
              { letter: "D", text: "It is best for students who plan to specialise." },
              { letter: "E", text: "It is about the philosophy of time." },
            ],
            items: [
              { id: "hr12", text: "The Development of Time: Theory and Practice", answer: "A", exp: "“The core text is…” Core text = the main book." },
              { id: "hr13", text: "Understanding Time", answer: "B", exp: "“A good grounding… although some sections lack detailed analyses, it does offer a good foundation.”" },
              { id: "hr14", text: "Time: Concepts and Conventions", answer: "C", exp: "Trap: “You might think from the title that it's about the philosophy of time, but this isn't the case.” It describes how countries approach calendars and days." },
              { id: "hr15", text: "The Story of Time", answer: "D", exp: "“I would recommend this book if you're aiming to specialise in horology.”" },
            ],
          },
        ],
      },
    ],
  },
];

// Нормализация текстового ответа: регистр, пробелы, дефисы, знаки валют и запятые не учитываются; 8:30 = 8.30.
export const normAnswer = s => String(s ?? "").toLowerCase().replace(/:/g, ".").replace(/[£$,\s\-–.]+$/g, "").replace(/[£$,\s\-–]/g, "");

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
