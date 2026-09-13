// ===========================================================
//  IELTS READING — юниты
// ===========================================================
//
// СХЕМА ЮНИТА:
// {
//   id: string (уникальный, "read-1"),
//   order: number,               — порядок в списке
//   title: string,
//   level: string,               — "Band 5.5–6" и т.п., для сортировки по сложности
//   topic: string,               — тема отрывка (Academic-style)
//   passage: string,             — сам текст, разбит на абзацы через "\n\n"
//   tasks: [ ...блоки заданий... ]
// }
//
// ТИП ЗАДАНИЯ (task.type) — одно из:
//   "tfng"           True / False / Not Given (проверка фактов)
//   "ynng"           Yes / No / Not Given (проверка мнения автора — см. READING_SKILLS)
//   "mcq"            Multiple Choice (по тексту)
//   "heading-match"  Matching Headings (у task есть общий список headings[])
//   "info-match"     Matching Information (пункты списка -> буква параграфа)
//   "summary"        Summary/Sentence Completion (короткий текстовый ответ)
//
// Общие поля task: { type, title, instructions, strategy: [советы...], items: [...] }
// heading-match дополнительно: headings: [строка, строка, ...]  (item.answer = индекс в headings)
// info-match дополнительно: paragraphLabels: ["A","B","C",...]  (item.answer = буква из paragraphLabels)
// summary: item.answer — массив допустимых ответов (регистр и пробелы по краям игнорируются)
// tfng: item.answer — "TRUE" | "FALSE" | "NOT GIVEN"
// mcq: item.opts — массив строк, item.answer — индекс правильного варианта
//
// WALKTHROUGH (необязательное поле task.walkthrough) — разобранный пример перед практикой:
// {
//   text: string,           — сам пример-вопрос (утверждение / заголовок для сопоставления / и т.п.)
//   steps: [строка, ...],   — пошаговый ход мысли, показывается пронумерованным списком
//   answer: string,         — финальный ответ примера
//   whyNotOthers: string,   — (опц.) почему другие варианты не подходят — для heading/mcq/matching
// }
// Показывается один раз в начале блока, до того как студент решает задания сам. Не участвует в подсчёте баллов.

// ===========================================================
//  ТЕХНИКИ ЧТЕНИЯ — общий раздел, отдельно от типов заданий
// ===========================================================
// Каждый навык: { id, title, whenToUse, howTo: [шаги], example: {text, note}, demo: [опц.], passages: [опц.] }
// demo — визуальная демонстрация "как это делается на практике":
// { intro, sentences: [{text, read: true/false}], caption } — read:true подсвечивается,
// read:false показывается затемнённым (то, что пропускается при выполнении техники).
// passages — практика на полноценных текстах (700-800 слов), а не коротких абзацах:
// { title, text (абзацы через \n\n), questions: [{id, prompt, opts, answer, exp}] }
// Каждый questions.prompt обычно ссылается на конкретный абзац текста ("Абзац 2") — так видно,
// что оценивается именно навык (например, определить главную мысль), а не факт из текста.
// example — короткая иллюстрация на реальном фрагменте текста, показывает навык "в деле".

export const READING_SKILLS = [
  {
    id: "skimming",
    title: "Skimming",
    whenToUse: "At the very start, to grasp the general topic and structure of a text in 1-2 minutes, before reading the questions.",
    howTo: [
      "Read only the title, and the first and last sentence of each paragraph — not the whole text in order.",
      "Don't stop at unfamiliar words — the goal isn't to understand everything, just to grasp the general idea.",
      "After skimming, you should be able to say in one phrase what each paragraph is about.",
    ],
    example: {
      text: "\"For centuries, foresters assumed that trees competed with one another... Recent research, however, has revealed a far more cooperative picture.\"",
      note: "Just from the first sentence, it's already clear: what used to be believed has now been challenged by new research. You don't need to read the whole paragraph to understand its role — this phrase is enough.",
    },
    demo: {
      intro: "See it in action: here is a real paragraph. Highlighted sentences are what you'd actually read while skimming — everything dimmed, you'd skip on a first pass.",
      sentences: [
        { text: "Modern life, however, has profoundly disrupted this ancient system.", read: true },
        { text: "Artificial lighting allows people to remain active long after sunset, while smartphone and computer screens emit blue light that is particularly effective at suppressing melatonin production.", read: false },
        { text: "Shift workers face an even more severe disruption, since their work schedules directly contradict the light-dark cycle their bodies expect, forcing the SCN to attempt an almost impossible recalibration on a recurring basis.", read: true },
      ],
      caption: "Reading only the first and last sentence already tells you the paragraph's job: modern life disrupts our natural rhythm, and shift work is the most extreme case. The dimmed middle sentence adds detail (lighting, screens) — useful later for a detail question, but not needed to grasp the main idea right now.",
    },
    passages: [
      {
        title: "The Body's Hidden Clock",
        text:
`Nearly every living organism, from bacteria to blue whales, operates according to an internal timekeeping system known as the circadian rhythm. This roughly 24-hour cycle governs not just sleep and wakefulness but also body temperature, hormone release, and even the efficiency with which the liver metabolises certain drugs. For most of human history, this internal clock was tightly synchronised with the rising and setting of the sun, since sunlight was essentially the only strong cue available to reset it each day.

The primary mechanism behind this synchronisation lies in a small cluster of neurons in the brain called the suprachiasmatic nucleus, or SCN. When light enters the eye, specialised cells send signals directly to the SCN, which in turn regulates the release of melatonin, a hormone that promotes sleepiness. As daylight fades in the evening, melatonin levels rise; when light returns in the morning, they fall again, helping to align our internal sense of time with the external world.

Modern life, however, has profoundly disrupted this ancient system. Artificial lighting allows people to remain active long after sunset, while smartphone and computer screens emit blue light that is particularly effective at suppressing melatonin production. Shift workers face an even more severe disruption, since their work schedules directly contradict the light-dark cycle their bodies expect, forcing the SCN to attempt an almost impossible recalibration on a recurring basis.

The health consequences of this mismatch extend well beyond simple tiredness. Chronic disruption of circadian rhythms has been linked to an increased risk of obesity, type 2 diabetes, cardiovascular disease, and certain cancers, likely because so many metabolic processes are timed to occur at specific points in the daily cycle. Mood disorders, including depression, also appear more prevalent among individuals whose circadian rhythms are frequently out of sync with their environment, such as long-term night-shift workers.

In response, researchers have begun exploring more personalised approaches to managing circadian health. Rather than assuming everyone should follow an identical schedule, scientists now recognise that individuals have different "chronotypes" — some are naturally inclined toward early mornings, others toward late nights — and that forcing a single rigid timetable onto an entire workforce or school system may be counterproductive. Some companies have already begun experimenting with flexible start times, guided by chronobiology research, as a way to improve both wellbeing and productivity.`,
        questions: [
          { id: "sk-1", prompt: "What is the main idea of Paragraph 1?", opts: ["All animals sleep at exactly the same time of day.", "Living organisms have an internal ~24-hour clock that was historically synchronised with sunlight.", "The liver is the most important organ for keeping time.", "Circadian rhythms only affect sleep."], answer: 1, exp: "The paragraph as a whole is about the existence and role of the internal clock — the liver and drug metabolism are just one example of its influence." },
          { id: "sk-2", prompt: "What is the main idea of Paragraph 2?", opts: ["Melatonin is produced regardless of light exposure.", "The SCN, triggered by light, controls melatonin release to align our internal clock with day and night.", "The SCN has no connection to light.", "Melatonin causes wakefulness."], answer: 1, exp: "The key point is the mechanism: light → SCN → melatonin → synchronisation with the outside world." },
          { id: "sk-3", prompt: "What is the main idea of Paragraph 3?", opts: ["Artificial light has no effect on melatonin.", "Modern conveniences — artificial lighting, screens, and shift work — disrupt the body's natural light-dark cycle.", "Shift workers adjust to their schedules easily.", "Blue light improves sleep quality."], answer: 1, exp: "The three examples (lighting, screens, shift work) are united by one idea — modern life disrupting the natural rhythm." },
          { id: "sk-4", prompt: "What is the main idea of Paragraph 4?", opts: ["The only consequence of disrupted rhythms is feeling tired.", "Disrupted circadian rhythms are linked to several serious health conditions, not just tiredness.", "Circadian disruption has no proven health effects.", "Cancer risk decreases with shift work."], answer: 1, exp: "The phrase 'extend well beyond simple tiredness' directly signals that the paragraph is about more serious consequences than fatigue." },
          { id: "sk-5", prompt: "What is the main idea of Paragraph 5?", opts: ["Everyone should follow one fixed schedule.", "Researchers increasingly support personalised schedules based on individual chronotypes rather than a single uniform timetable.", "Chronotypes are irrelevant to workplace scheduling.", "Flexible schedules have proven harmful to productivity."], answer: 1, exp: "The paragraph contrasts the old approach ('one schedule for everyone') with the new one — personalisation based on chronotype." },
        ],
      },
      {
        title: "The Real Cost of Fast Fashion",
        text:
`Over the past two decades, the fashion industry has been transformed by the rise of "fast fashion" — a business model built around producing inexpensive, trend-driven clothing at extraordinary speed. Retailers following this model can move a garment from initial design to store shelves in a matter of weeks rather than the traditional months-long cycle, encouraging consumers to treat clothing as a disposable commodity rather than a long-term investment. As a direct consequence, the average number of times a garment is worn before being discarded has fallen sharply in many markets over the same period.

This shift has come at a considerable environmental cost. Producing a single cotton T-shirt can require several thousand litres of water, while the dyeing and finishing processes release chemical pollutants that frequently end up in local waterways, particularly in countries with weaker environmental regulation. Synthetic fabrics such as polyester, now dominant in fast fashion due to their low cost, shed microscopic plastic fibres every time they are washed, and a substantial share of these microplastics ultimately makes its way into rivers and oceans.

Behind the low price tags lies another significant cost, borne largely by garment workers in manufacturing hubs across South and Southeast Asia. Wages in the sector are frequently insufficient to cover a basic standard of living, and safety standards in some factories remain alarmingly poor. The 2013 collapse of the Rana Plaza factory complex in Bangladesh, which killed over a thousand workers, drew international attention to these conditions, though labour advocates argue that meaningful structural change across the industry has been slow to follow.

In response to growing awareness of these issues, consumer attitudes have begun to shift, at least among certain segments of the market. The secondhand clothing market has expanded rapidly, driven partly by online resale platforms, while a parallel "slow fashion" movement encourages buying fewer, higher-quality garments intended to last for years rather than a single season. Independent certification schemes have also emerged, allowing consumers to identify brands that meet specific environmental or labour standards, though the proliferation of competing labels has occasionally caused confusion rather than clarity.

Major fashion retailers have not been entirely absent from this conversation, with several launching garment take-back schemes, recycled-fibre product lines, and sustainability pledges timed to specific future years. Critics, however, frequently accuse these initiatives of amounting to little more than "greenwashing", pointing out that the volume of clothing such companies continue to produce each year dwarfs the modest quantities addressed by their recycling programmes. Whether the industry can meaningfully reduce its environmental footprint while maintaining its current scale of production remains, for now, an open and contested question.`,
        questions: [
          { id: "sk-6", prompt: "What is the main idea of Paragraph 1?", opts: ["Clothing design now takes longer than it used to.", "Fast fashion enables rapid, low-cost production, encouraging consumers to treat clothes as disposable.", "Consumers now wear each garment longer than before.", "Fast fashion has eliminated seasonal fashion trends."], answer: 1, exp: "The paragraph explains the fast fashion model itself and its consequence — fewer wears per garment." },
          { id: "sk-7", prompt: "What is the main idea of Paragraph 2?", opts: ["Cotton production requires no water at all.", "Fast fashion carries significant environmental costs, including water use, chemical pollution, and microplastics.", "Synthetic fabrics are entirely harmless to the environment.", "Dyeing processes are strictly regulated worldwide."], answer: 1, exp: "Three examples of cost (water, chemicals, microplastics) are united by one idea — the environmental price of the industry." },
          { id: "sk-8", prompt: "What is the main idea of Paragraph 3?", opts: ["Garment workers are generally well paid and safe.", "Poor wages and unsafe conditions for garment workers remain a serious problem, illustrated by the Rana Plaza tragedy.", "The Rana Plaza disaster led to immediate industry-wide reform.", "Factory safety issues have been fully resolved."], answer: 1, exp: "Rana Plaza is given as an illustration of the problem, not as evidence that the problem has been solved." },
          { id: "sk-9", prompt: "What is the main idea of Paragraph 4?", opts: ["Consumers show no interest in sustainable alternatives.", "A growing number of consumers are shifting toward secondhand and slow fashion, supported by certification schemes.", "Certification labels have made sustainable shopping simple and unambiguous.", "The secondhand market has shrunk in recent years."], answer: 1, exp: "The paragraph describes the growth of alternative consumption models, with a caveat about label confusion." },
          { id: "sk-10", prompt: "What is the main idea of Paragraph 5?", opts: ["Sustainability initiatives have fully solved the fashion industry's environmental problems.", "While some brands have introduced sustainability initiatives, critics argue they are insufficient given the scale of production.", "Critics believe fashion brands are doing more than enough.", "Recycling programmes now cover most of the clothing produced."], answer: 1, exp: "The key word is 'dwarfs' — the scale of the initiatives is incomparably small next to the volume of production." },
        ],
      },
    ],
  },
  {
    id: "scanning",
    title: "Scanning",
    whenToUse: "When you already know WHAT you're looking for — a date, a name, a number, a specific fact — for example, answering a Matching Information or T/F/NG question.",
    howTo: [
      "Hold 1-2 keywords from the question in mind — numbers, proper nouns, and rare terms are the easiest to spot visually.",
      "Move your eyes quickly across the text without reading every word — as if looking up a name in a phone book.",
      "Once you spot the keyword (or a synonym of it), that's your signal to switch to careful, detailed reading of that spot.",
    ],
    example: {
      text: "Question: 'What percentage of trees are affected?' — scan visually for a % sign or words like 'percent', 'proportion', or any number.",
      note: "Scanning is visual search, not reading. You only work out the meaning of the sentence after you've located the right spot.",
    },
    demo: {
      intro: "See it in action: imagine you're scanning this paragraph only to find the exact date a famous stamp was released. Here's what your eyes would actually lock onto.",
      sentences: [
        { text: "On 6 May 1840, Hill's idea became reality with the release of the Penny Black, widely regarded as the world's first adhesive postage stamp.", read: true },
        { text: "It featured a profile portrait of the young Queen Victoria and cost one penny, allowing any letter weighing up to half an ounce to be sent anywhere in the United Kingdom for that single flat fee.", read: false },
        { text: "Within the first year, more than 68 million stamps had been sold, a figure that far exceeded even Hill's own expectations.", read: false },
      ],
      caption: "Scanning for one specific fact (the release date) means you don't need to read or understand the other sentences at all until you've found what you're looking for — understanding comes later, during detailed reading.",
    },
    passages: [
      {
        title: "The Birth of the Postage Stamp",
        text:
`Before 1840, sending a letter in Britain was a complicated and often expensive affair. The cost of postage was usually paid not by the sender but by the recipient, and the price was calculated according to the distance travelled and the number of sheets of paper used. This system frequently discouraged correspondence altogether, particularly among poorer families, since a single letter from a relative working far from home could cost several days' wages to collect.

The reform that changed this system is closely associated with a British teacher and social reformer named Rowland Hill. In 1837, Hill published a pamphlet arguing for a radical simplification: postage should be paid in advance by the sender, calculated by weight rather than distance, and charged at a flat rate regardless of how far the letter travelled within the country. His proposal also introduced an entirely new object to make prepayment simple — a small adhesive label that could be purchased and stuck onto an envelope.

On 6 May 1840, Hill's idea became reality with the release of the Penny Black, widely regarded as the world's first adhesive postage stamp. It featured a profile portrait of the young Queen Victoria and cost one penny, allowing any letter weighing up to half an ounce to be sent anywhere in the United Kingdom for that single flat fee. Within the first year, more than 68 million stamps had been sold, a figure that far exceeded even Hill's own expectations.

The success of the Penny Black quickly attracted international attention. Switzerland and Brazil both issued their own postage stamps in 1843, and by the 1860s dozens of countries around the world had adopted similar systems. Postal reform of this kind is often credited with contributing to a broader expansion in literacy and long-distance communication throughout the nineteenth century, since cheaper postage made writing letters newly affordable for millions of ordinary people.

Today, an original Penny Black in good condition can sell at auction for several hundred pounds, while rare printing errors from the stamp's early production runs have occasionally fetched hundreds of thousands. Beyond their value to collectors, historians continue to view the stamp as a small but significant example of how a simple administrative reform, driven by one persistent individual, was able to reshape communication across an entire society.`,
        questions: [
          { id: "sc-1", prompt: "In what year was the Penny Black released?", opts: ["1837", "1840", "1843", "1860"], answer: 1, exp: "The text states 'On 6 May 1840, Hill's idea became reality with the release of the Penny Black.'" },
          { id: "sc-2", prompt: "How much did a Penny Black stamp cost?", opts: ["One penny", "One shilling", "Two pence", "One pound"], answer: 0, exp: "The text says it 'cost one penny'." },
          { id: "sc-3", prompt: "Approximately how many stamps were sold in the first year?", opts: ["6.8 million", "68 million", "680,000", "168 million"], answer: 1, exp: "The text states 'more than 68 million stamps had been sold' in the first year." },
          { id: "sc-4", prompt: "Which two countries issued their own postage stamps in 1843?", opts: ["Switzerland and Brazil", "France and Germany", "USA and Canada", "Switzerland and the USA"], answer: 0, exp: "The text names 'Switzerland and Brazil' as issuing stamps in 1843." },
          { id: "sc-5", prompt: "Who proposed the postal reform described in the text?", opts: ["Queen Victoria", "Rowland Hill", "A postal worker in Brazil", "An anonymous pamphlet author"], answer: 1, exp: "The reform is 'closely associated with a British teacher and social reformer named Rowland Hill.'" },
        ],
      },
      {
        title: "Smartphone Adoption Around the World",
        text:
`The smartphone has become one of the most rapidly adopted technologies in human history. In 2007, when the first iPhone was released, fewer than 4% of the world's population owned any kind of smartphone. By 2023, that figure had risen to more than 70% of adults globally, according to industry estimates, representing one of the fastest technological shifts ever recorded.

Adoption rates, however, have varied considerably by region. South Korea consistently ranks among the countries with the highest smartphone penetration, with survey data suggesting that over 95% of adults there own one. In contrast, several countries in sub-Saharan Africa report ownership rates below 50%, though these figures have been climbing steadily each year as prices for entry-level devices continue to fall.

One especially significant milestone occurred in 2016, when, for the first time, more people worldwide accessed the internet via mobile devices than via desktop computers. This shift prompted many businesses to redesign their websites and applications with a "mobile-first" approach, prioritising the smaller screen experience over the traditional desktop layout that had dominated web design for the previous two decades.

The economic impact of this shift has been substantial. A 2019 report estimated that mobile technology and related services contributed over 4% to global GDP that year, supporting an estimated 32 million jobs either directly or indirectly across manufacturing, retail, software development and telecommunications infrastructure.

Looking ahead, industry analysts predict that the next major wave of adoption will occur not in wealthy nations, where the market is already largely saturated, but across parts of South Asia and Africa, where an estimated one billion people are expected to purchase their first smartphone before 2030. This next phase of growth is likely to be driven primarily by increasingly affordable devices rather than by any single new technological breakthrough.`,
        questions: [
          { id: "sc-6", prompt: "What percentage of the world's population owned a smartphone in 2007?", opts: ["Fewer than 4%", "About 20%", "Over 50%", "Exactly 70%"], answer: 0, exp: "The text says 'fewer than 4% of the world's population owned any kind of smartphone' in 2007." },
          { id: "sc-7", prompt: "What percentage of South Korean adults are reported to own a smartphone?", opts: ["Over 95%", "About 70%", "Below 50%", "Exactly 100%"], answer: 0, exp: "The text states 'over 95% of adults there own one', referring to South Korea." },
          { id: "sc-8", prompt: "In what year did mobile internet access overtake desktop access worldwide?", opts: ["2007", "2016", "2019", "2023"], answer: 1, exp: "The text says this milestone 'occurred in 2016'." },
          { id: "sc-9", prompt: "According to the 2019 report, how many jobs were supported by mobile technology?", opts: ["About 4 million", "32 million", "70 million", "1 billion"], answer: 1, exp: "The text states the sector was 'supporting an estimated 32 million jobs'." },
          { id: "sc-10", prompt: "By what year are an estimated one billion people expected to buy their first smartphone?", opts: ["2016", "2019", "2023", "2030"], answer: 3, exp: "The text says this is expected to happen 'before 2030'." },
        ],
      },
    ],
  },
  {
    id: "predicting",
    title: "Predicting Content",
    whenToUse: "Before reading the text itself — using the title, subheadings, and the first paragraph.",
    howTo: [
      "From the title, ask yourself what the text is likely to be about and what position the author might take.",
      "If the text has subheadings or numbered sections, treat them as a ready-made outline of its structure.",
      "Your prediction doesn't need to be accurate — its purpose is to give your brain a 'frame' that makes it easier to slot in details as you read.",
      "Revise your prediction as you go — the first paragraph often confirms or adjusts what the title suggested.",
    ],
    example: {
      text: "Title: \"The Silent Language of Trees\"",
      note: "The word 'Language' hints at some kind of communication among trees — the text will likely explain how exactly they 'communicate'. This is confirmed already in the first paragraph.",
    },
    passages: [
      {
        title: "The Future of Vertical Farming",
        text:
`As urban populations continue to grow and arable land per person continues to shrink worldwide, agricultural engineers have increasingly turned their attention to vertical farming — the practice of growing crops in stacked layers within controlled indoor environments, often inside converted warehouses or purpose-built high-rise structures.

These facilities typically replace natural sunlight with LED lighting tuned to the specific wavelengths plants use most efficiently for photosynthesis, while computer-controlled systems regulate temperature, humidity and nutrient delivery with a level of precision impossible to achieve in an open field.

Proponents argue that vertical farms can produce dramatically higher yields per square metre than traditional agriculture, while using a fraction of the water, since irrigation systems recycle moisture that would otherwise evaporate or run off into the soil. Crops can also be grown year-round, independent of season or weather conditions outside.

Critics, however, point to the substantial energy costs involved in powering artificial lighting and climate control systems around the clock, arguing that in regions with abundant sunlight and fertile land, vertical farming may currently consume more energy overall than it saves in water and land use.

For now, most vertical farms focus on high-value, fast-growing crops such as leafy greens and herbs, rather than staple grains like wheat or rice, since the economics of the technology do not yet favour lower-value crops grown at large scale. Whether this balance shifts as energy costs fall and technology improves remains an open question for the industry's future.`,
        questions: [
          { id: "pr-1", prompt: "Based on the title alone, what would you predict this text is about?", opts: ["A history of traditional outdoor farming techniques.", "A modern method of growing crops indoors in stacked layers, and its prospects.", "A recipe guide using vertically grown vegetables.", "An argument against all forms of modern agriculture."], answer: 1, exp: "The title's key terms — 'vertical farming' and 'future' — predict a discussion of a specific modern growing method and where it may be heading, confirmed by Paragraph 1." },
          { id: "pr-2", prompt: "Having read Paragraph 1, what is Paragraph 2 most likely to explain?", opts: ["The history of skyscraper architecture.", "How these indoor farms actually function on a technical level.", "Why vertical farming was abandoned decades ago.", "The price of vegetables in different countries."], answer: 1, exp: "After introducing a concept, texts typically explain how it works — Paragraph 2 describes the LED lighting and automated control systems." },
          { id: "pr-3", prompt: "Having read Paragraphs 1-2, what would you predict comes next?", opts: ["A list of unrelated farming methods.", "The advantages this method claims to offer.", "A biography of the inventor.", "A discussion of an entirely different industry."], answer: 1, exp: "After explaining what something is and how it works, texts commonly move to its benefits — Paragraph 3 covers yields, water use, and year-round growing." },
          { id: "pr-4", prompt: "Given that Paragraph 3 presented advantages, what is a common next step in this kind of text?", opts: ["Repeating the same advantages in different words.", "Presenting a counter-argument or limitation.", "Ending the discussion abruptly.", "Switching to a completely unrelated topic."], answer: 1, exp: "A balanced text that lists benefits typically follows with drawbacks — Paragraph 4 introduces the energy-cost counter-argument." },
          { id: "pr-5", prompt: "Based on the pattern so far (concept → mechanism → benefits → drawbacks), what would you expect the final paragraph to do?", opts: ["Introduce a completely new topic unrelated to farming.", "Offer a nuanced conclusion about current limitations and future potential.", "Simply repeat Paragraph 1 word for word.", "End without any concluding remarks."], answer: 1, exp: "Texts structured this way typically end with a balanced conclusion — Paragraph 5 notes current limitations and leaves an open question about the future." },
        ],
      },
      {
        title: "The Silent Spread of Invasive Species",
        text:
`When a species is introduced, whether accidentally or deliberately, into an ecosystem where it did not evolve, it is classified as invasive if it begins to spread aggressively and cause ecological or economic harm to its new environment.

Ships have historically been one of the most significant vectors for this kind of introduction, particularly through ballast water — water taken on board to stabilise a vessel and then discharged, often thousands of kilometres away, along with any small organisms it happened to contain.

The ecological consequences can be severe. Invasive species frequently lack natural predators in their new habitat, allowing their populations to expand unchecked, often outcompeting native species for food and space, and in some documented cases contributing directly to local extinctions.

Beyond ecological damage, the economic cost of invasive species has been estimated in the hundreds of billions of dollars annually worldwide, covering agricultural losses, infrastructure damage, and the substantial expense of control and eradication programmes attempted by governments.

Prevention has increasingly been recognised as far more cost-effective than eradication once a species has become established. Many countries have consequently introduced stricter biosecurity checks at borders, along with international treaties governing the treatment of ballast water, in an effort to stop new invasions before they begin rather than fight them afterwards.`,
        questions: [
          { id: "pr-6", prompt: "Based on the title alone, what would you predict this text discusses?", opts: ["A story about a particular endangered animal.", "How non-native species spread and cause problems in new environments.", "A guide to gardening with native plants only.", "The history of biology as a science."], answer: 1, exp: "The title's key terms — 'spread' and 'invasive species' — predict a discussion of how such species move into new areas and what happens as a result." },
          { id: "pr-7", prompt: "Having read Paragraph 1's definition, what would you expect Paragraph 2 to cover?", opts: ["A definition of an unrelated scientific term.", "How invasive species typically get introduced to new places.", "A recipe involving invasive fish species.", "The paragraph ending the discussion entirely."], answer: 1, exp: "After a definition, a logical next step is explaining a mechanism — Paragraph 2 focuses on ships and ballast water." },
          { id: "pr-8", prompt: "Given that Paragraph 2 explained a method of introduction, what is a natural next topic?", opts: ["The consequences once a species has been introduced.", "An unrelated history of shipbuilding.", "A repeat of the same introduction method.", "The paragraph simply stopping the argument."], answer: 0, exp: "After explaining how something happens, texts typically explain what happens next — Paragraph 3 covers ecological consequences." },
          { id: "pr-9", prompt: "After discussing ecological consequences, what might you predict comes next?", opts: ["A shift to a completely unrelated topic.", "A discussion of economic consequences.", "A retraction of everything said before.", "The end of the text with no further development."], answer: 1, exp: "Texts about consequences often broaden from one type of impact to another — here, from ecological to economic costs, covered in Paragraph 4." },
          { id: "pr-10", prompt: "Given the problem has now been described from multiple angles, what would you expect the final paragraph to focus on?", opts: ["Solutions or prevention measures.", "A return to the initial definition with no new information.", "An unrelated new problem.", "Simply restating the economic figures again."], answer: 0, exp: "After presenting a problem's scope and cost, a text commonly turns to solutions — Paragraph 5 discusses prevention and biosecurity measures." },
        ],
      },
    ],
  },
  {
    id: "detail-reading",
    title: "Detail Reading (Close Reading)",
    whenToUse: "Once scanning has led you to the right part of the text, and you now need to understand it precisely in order to answer a specific question.",
    howTo: [
      "Read slowly, sentence by sentence, paying attention to connectors like 'however', 'although', 'in contrast' — they often reverse the meaning of what follows.",
      "Watch for qualifying words separately: 'only', 'always', 'some', 'most' — these are often exactly what decides whether a statement is TRUE or NOT GIVEN.",
      "Don't fill in gaps with outside knowledge — IELTS Reading tests what is written, not general knowledge about the topic.",
    ],
    example: {
      text: "\"Sceptics point out that fungi may simply be moving resources to wherever is most efficient for the fungi themselves...\"",
      note: "The word 'may' signals a possibility, not a fact. A statement like 'Fungi definitely act for their own benefit' would only be partly supported — catching this nuance requires careful reading.",
    },
    passages: [
      {
        title: "The Paradox of Choice",
        text:
`Conventional economic theory has long assumed that more choice is inherently beneficial to consumers: given a wider array of options, individuals will find something closer to fulfilling their exact preferences, and can only benefit from expanded selection. In recent decades, however, a body of psychological research has begun to challenge this assumption, suggesting that beyond a certain point, additional choice can actually reduce satisfaction rather than increase it.

One of the most frequently cited studies in this area involved a supermarket display of jam. Researchers set up two tasting booths: one offering six varieties, the other offering twenty-four. While the larger display attracted more initial interest from shoppers, only about 3% of those who sampled from it went on to make a purchase, compared with roughly 30% of those who sampled from the smaller display.

Several explanations have been proposed for this apparent paradox. One is that an overwhelming number of options increases the cognitive effort required to compare them, leading some consumers to postpone or abandon the decision altogether rather than face the difficulty of choosing. Another is that having many alternatives raises expectations about finding a perfect option, which in turn makes any eventual choice more likely to feel like a compromise, regardless of its objective quality.

This does not mean that choice itself is undesirable; a complete absence of options is rarely preferable to consumers, and some degree of variety remains genuinely valued. Researchers generally describe an inverted U-shaped relationship: satisfaction typically rises as choice increases from very limited to moderate, before beginning to decline once the number of options exceeds what a person can comfortably evaluate.

The practical implications of this research have been embraced by some retailers, who have deliberately reduced the number of product variants on offer, reporting increased sales as a result in certain cases. Critics, however, caution that the effect is not universal, noting that its strength can depend heavily on factors such as how meaningful the choice is to the individual and how much prior knowledge they bring to the decision.`,
        questions: [
          { id: "dr-1", prompt: "Which statement most accurately reflects Paragraph 1?", opts: ["More choice is always beneficial to consumers, according to all researchers.", "Traditional economic theory assumed more choice benefits consumers, but recent research questions this beyond a certain point.", "Recent research has completely disproved traditional economic theory about choice.", "Consumers have always preferred fewer choices, according to economists."], answer: 1, exp: "Option A and C overstate with 'always'/'completely disproved'; the text only says research 'has begun to challenge' the assumption 'beyond a certain point'." },
          { id: "dr-2", prompt: "Which is the most accurate description of the jam study's outcome?", opts: ["The larger display sold more jam overall than the smaller display.", "A smaller proportion of shoppers who sampled from the larger display made a purchase, compared to the smaller display.", "The smaller display attracted more initial shopper interest.", "Both displays led to identical purchase rates."], answer: 1, exp: "The text gives percentages of buyers among samplers (3% vs 30%), not total sales figures — a common misreading trap." },
          { id: "dr-3", prompt: "Which statement most accurately reflects Paragraph 3's explanation?", opts: ["The only explanation given is that comparing many options is mentally exhausting.", "Having more options can raise expectations, making even a good final choice feel like a compromise, among other explanations.", "Researchers agree that expectations are irrelevant to consumer satisfaction.", "Most consumers abandon purchases entirely due to too many options."], answer: 1, exp: "The paragraph gives 'several explanations', not just one, and says 'some' consumers postpone decisions — not 'most'." },
          { id: "dr-4", prompt: "Which of the following best reflects what Paragraph 4 says about the relationship between choice and satisfaction?", opts: ["There is no upper limit to how much choice improves satisfaction.", "Satisfaction rises with choice up to a point, then tends to decline beyond it.", "Having no options at all is generally preferred by most consumers.", "The relationship has not been studied enough to draw conclusions."], answer: 1, exp: "The text explicitly describes an 'inverted U-shaped relationship' — rising, then declining — not an unlimited rise or a preference for no choice." },
          { id: "dr-5", prompt: "Which of the following most precisely reflects Paragraph 5?", opts: ["All retailers have reduced their product variety following this research.", "Some retailers have reduced variety and reported increased sales in certain cases, though critics say the effect isn't universal.", "Critics have completely dismissed this research as invalid.", "The effect has been proven to apply equally in all situations."], answer: 1, exp: "The text says 'some retailers' (not all) and that critics call the effect 'not universal' (not entirely invalid)." },
        ],
      },
      {
        title: "The Domestication of the Cat",
        text:
`Unlike dogs, whose domestication is generally dated to at least 15,000 years ago and closely tied to active human breeding, the relationship between humans and cats appears to have developed far more gradually and with considerably less deliberate human intervention. Genetic and archaeological evidence suggests that the process began in the Near East roughly 10,000 years ago, coinciding with the rise of early agricultural settlements.

The prevailing explanation for this shift centres on rodents. As humans began storing surplus grain, these stores inevitably attracted mice and rats, which in turn attracted wildcats drawn by an abundant and easily accessible food source. Rather than being deliberately tamed by humans, cats are thought to have essentially domesticated themselves, gradually adapting to life alongside human settlements because doing so offered a clear survival advantage.

This history helps explain a notable difference between cats and most other domesticated animals: while selective breeding has produced dramatic physical variation in dogs, horses, and cattle, the skeletal structure of the modern domestic cat remains remarkably similar to that of its wild ancestor, Felis silvestris lybica. Some researchers argue that cats have therefore undergone a comparatively mild form of domestication, retaining much of their ancestral independence and hunting behaviour.

Not all scientists fully agree on the extent or timeline of this process, however. A 2017 genetic study proposed that meaningful physical differentiation between wild and domestic cat populations may not have become clearly established until several thousand years after the initial association with humans began, suggesting a much slower and more uneven domestication timeline than previously assumed for at least some regions.

Regardless of the precise timeline, the cat's status today reflects this unusual history. Modern domestic cats retain far more independence from human control than dogs typically do, and many can survive successfully without direct human care if necessary. This capacity, some argue, is a direct legacy of a domestication process driven as much by the cat's own adaptability as by any deliberate human effort.`,
        questions: [
          { id: "dr-6", prompt: "Which statement most precisely reflects Paragraph 1?", opts: ["Cats and dogs were domesticated at exactly the same time, through identical processes.", "Cat domestication is believed to have begun later than dog domestication and involved less deliberate human breeding.", "Dogs were domesticated entirely by accident, similar to cats.", "There is no evidence at all about when cat domestication began."], answer: 1, exp: "The paragraph explicitly contrasts the two ('Unlike dogs...'), and dog domestication is tied to 'active human breeding' — the opposite of cats." },
          { id: "dr-7", prompt: "According to Paragraph 2, which best describes how the relationship between cats and humans began?", opts: ["Humans actively captured and bred wildcats to control rodent populations.", "Wildcats were drawn to human settlements by rodents attracted to grain stores, and adapted accordingly.", "Cats had no interest in human settlements until much later in history.", "Rodents were deliberately introduced by humans to attract cats."], answer: 1, exp: "The text says cats were 'not deliberately tamed' and essentially 'domesticated themselves' — ruling out active human breeding." },
          { id: "dr-8", prompt: "Which statement most accurately reflects what Paragraph 3 says?", opts: ["Domestic cats look completely different from their wild ancestors due to extensive breeding.", "Unlike dogs and horses, domestic cats have changed relatively little in skeletal structure from their wild ancestor.", "All researchers agree that cats have been just as thoroughly domesticated as dogs.", "Cats show more physical variation than any other domesticated animal."], answer: 1, exp: "The text says cats remain 'remarkably similar' to their wild ancestor, and only 'some researchers' make the claim about mild domestication — not all." },
          { id: "dr-9", prompt: "Which statement most precisely reflects what Paragraph 4 says?", opts: ["All scientists agree on exactly when cat domestication occurred.", "A 2017 study suggested physical differences between wild and domestic cats may have emerged later than previously thought.", "The 2017 study proved that cats were never truly domesticated.", "No genetic studies have examined cat domestication timelines."], answer: 1, exp: "The paragraph opens with 'Not all scientists fully agree', directly contradicting option A, and accurately summarises the 2017 study's proposal." },
          { id: "dr-10", prompt: "Which statement best reflects Paragraph 5?", opts: ["Modern cats are entirely dependent on humans for survival, just like most dogs.", "Cats generally retain more independence from human control than dogs, which some link to their unique domestication history.", "No domestic cats can survive without human care.", "The cat's independence has nothing to do with its domestication history."], answer: 1, exp: "The text says cats retain 'far more independence... than dogs typically do' and links this directly to their domestication history." },
        ],
      },
    ],
  },
  {
    id: "context-guessing",
    title: "Guessing Meaning from Context",
    whenToUse: "When you come across an unfamiliar word and stopping to look up a translation isn't an option — this is a timed test.",
    howTo: [
      "Look at the surrounding words: there is often a synonym, example, or explanation nearby, sometimes set off by a comma or dash.",
      "Work out at least the part of speech (noun? verb? adjective?) — this alone can be enough to understand the sentence structure and answer the question without knowing an exact translation.",
      "Ask yourself: does this word make the sentence's overall meaning more positive or more negative? For many questions, that's all you need.",
    ],
    example: {
      text: "\"...mycorrhizae. This underground network, sometimes nicknamed the 'wood wide web'...\"",
      note: "Even without knowing the exact term 'mycorrhizae', the context ('underground network') makes clear it's some kind of below-ground connection system between plants — enough for most questions.",
    },
    passages: [
      {
        title: "The Art of Kintsugi",
        text:
`In traditional Japanese ceramics, a shattered bowl or teacup is not necessarily destined for the rubbish bin. Practitioners of kintsugi, an art form dating back several centuries, instead repair the broken fragments using a lacquer mixed with powdered gold, deliberately highlighting rather than concealing the fissures left by the damage.

The philosophy underpinning this practice diverges sharply from the Western instinct to disguise flaws or discard damaged objects altogether. Kintsugi treats breakage and repair as part of an object's history rather than something to be hidden, and a piece repaired in this way is often considered more beautiful, and occasionally more valuable, than it was in its original, unblemished state.

The technique itself is painstaking. Fragments are first cleaned and carefully realigned, then bonded using a resin derived from the sap of the urushi tree, a substance that must cure slowly over several weeks in a humid environment before the surface can be sanded and finished with the gold or silver powder that gives the repair its distinctive, gleaming appearance.

Beyond ceramics, the underlying idea behind kintsugi has increasingly been invoked as a metaphor in fields far removed from pottery, including psychology and design, where it is sometimes used to describe processes of recovery or renewal that make no attempt to erase visible evidence of past hardship.

Purists caution, however, against reducing kintsugi to a purely metaphorical or decorative trend disconnected from its material and historical roots. The craft demands years of training to execute properly, and practitioners often note that its meaning is most fully understood not through the finished object alone, but through the deliberate, unhurried process by which it is restored.`,
        questions: [
          { id: "cg-1", prompt: "In Paragraph 1, what does 'fissures' most likely mean?", opts: ["Decorative patterns", "Cracks or breaks", "Colours", "Handles"], answer: 1, exp: "The phrase 'highlighting rather than concealing the fissures left by the damage' makes clear these are the cracks caused by breaking the object." },
          { id: "cg-2", prompt: "In Paragraph 2, what does 'unblemished' most likely mean?", opts: ["Without flaws or damage", "Extremely expensive", "Recently made", "Poorly designed"], answer: 0, exp: "Contrasted with a repaired, flaw-highlighting object, 'original, unblemished state' clearly means the pristine, undamaged condition." },
          { id: "cg-3", prompt: "In Paragraph 3, what does 'cure' most likely mean here?", opts: ["To heal an illness", "To harden or set through a slow chemical process", "To remove completely", "To paint a surface"], answer: 1, exp: "'Must cure slowly over several weeks in a humid environment before the surface can be sanded' clearly describes a resin setting/hardening, not a medical meaning." },
          { id: "cg-4", prompt: "In Paragraph 4, what does 'invoked' most likely mean?", opts: ["Forbidden", "Referred to or drawn upon", "Destroyed", "Sold"], answer: 1, exp: "'Invoked as a metaphor' means the idea is referred to or used as a metaphor in other fields." },
          { id: "cg-5", prompt: "In Paragraph 5, who are 'purists' most likely referring to?", opts: ["People who dislike Japanese culture", "People who insist on preserving the traditional, authentic form of something", "People who only repair ceramics professionally", "People who have never seen kintsugi"], answer: 1, exp: "The sentence contrasts them with reducing kintsugi to a 'purely metaphorical or decorative trend disconnected from its material and historical roots' — purists defend the authentic, traditional form." },
        ],
      },
      {
        title: "The Silk Road's Forgotten Currency: Cowrie Shells",
        text:
`Long before coins or paper money became widespread, many societies across Africa, Asia, and the Pacific relied on cowrie shells as a medium of exchange. These small, glossy shells, harvested primarily from the Indian Ocean, were prized for their durability, uniform size, and resistance to counterfeiting, qualities that made them remarkably well suited to commerce.

Their use as currency was strikingly widespread and long-lived, appearing in historical records from ancient China to West Africa, and persisting in some regions well into the nineteenth century, long after European colonial powers had begun introducing metal coinage. In parts of West Africa, cowries remained a dominant form of currency even as colonial administrations attempted to supplant them with imported coins.

Economists studying this history have noted that cowrie-based monetary systems were far from primitive or haphazard; exchange rates between shells and other goods were often carefully calibrated, and large quantities were meticulously counted, strung together, and transported across considerable distances as part of extensive regional trade networks.

The eventual decline of cowrie currency was gradual rather than sudden, driven by a combination of factors: the flooding of local markets with mass-imported shells that undermined their scarcity value, alongside deliberate colonial policies designed to compel populations to adopt state-issued coinage for the payment of taxes.

Today, cowrie shells survive largely as ornamental or ceremonial objects rather than functional currency, retaining symbolic significance in various cultural and religious practices across the regions where they once circulated as money. Numismatists, along with historians of trade, continue to study these shells as a rare example of a durable, decentralised currency that operated successfully across multiple continents for centuries without any central minting authority.`,
        questions: [
          { id: "cg-6", prompt: "In Paragraph 1, what does 'medium of exchange' most likely mean?", opts: ["A large-sized shell", "Something used to facilitate trade or payment", "A type of ocean current", "A religious symbol"], answer: 1, exp: "This is the standard economic sense confirmed by the whole paragraph describing shells used as money." },
          { id: "cg-7", prompt: "In Paragraph 2, what does 'supplant' most likely mean?", opts: ["To support and strengthen", "To replace", "To decorate", "To count carefully"], answer: 1, exp: "'Attempted to supplant them with imported coins' — colonial powers tried to replace shells with coins." },
          { id: "cg-8", prompt: "In Paragraph 3, what does 'haphazard' most likely mean?", opts: ["Highly organised and precise", "Random or lacking clear order", "Extremely valuable", "Illegal"], answer: 1, exp: "The sentence says systems were 'far from primitive or haphazard' because rates were 'carefully calibrated' — implying haphazard is the opposite of organised." },
          { id: "cg-9", prompt: "In Paragraph 4, what does 'compel' most likely mean?", opts: ["To politely request", "To force or pressure", "To forbid entirely", "To financially reward"], answer: 1, exp: "'Deliberate colonial policies designed to compel populations to adopt state-issued coinage' describes forced adoption, not a request or reward." },
          { id: "cg-10", prompt: "In Paragraph 5, what does 'numismatists' most likely refer to?", opts: ["People who study or collect currency and coins", "Marine biologists studying shells", "Religious leaders", "Colonial tax collectors"], answer: 0, exp: "'Numismatists, along with historians of trade, continue to study these shells' places them alongside trade historians — scholars of currency." },
        ],
      },
    ],
  },
  {
    id: "paraphrase",
    title: "Перефразирование — главный навык IELTS Reading",
    whenToUse: "Постоянно. Вопросы почти никогда не используют те же слова, что и текст — экзамен специально проверяет, узнаёшь ли ты один и тот же смысл в разных формулировках.",
    howTo: [
      "Не ищи в тексте дословное совпадение с вопросом — если ищешь именно эти слова, скорее всего, пропустишь ответ.",
      "Учись видеть синонимичные пары: increase → rise / grow; important → significant / crucial; because → due to / as a result of.",
      "Меняется не только слово, но и структура: активный залог может превратиться в пассивный, существительное — в глагол ('the destruction of' → 'destroyed').",
      "Если вопрос и фрагмент текста совпадают почти дословно — это часто ловушка (дистрактор), а настоящий ответ спрятан в перефразированном месте рядом.",
    ],
    example: {
      text: "Текст: «...allow trees to exchange... chemical warning signals.» Вопрос: «Trees can alert each other to danger using chemicals.»",
      note: "'exchange chemical warning signals' и 'alert each other to danger using chemicals' — это одна и та же мысль совершенно разными словами. Именно так выглядит 90% совпадений вопрос-текст.",
    },
  },
  {
    id: "time-management",
    title: "Тайм-менеджмент на экзамене",
    whenToUse: "На реальном тесте: 3 текста, 40 вопросов, 60 минут (включая перенос ответов).",
    howTo: [
      "В среднем — 20 минут на текст. Но третий текст обычно самый сложный: если чувствуешь, что застрял, лучше двигаться дальше и вернуться, чем терять время.",
      "Не обязательно решать тексты по порядку 1→2→3. Многие сначала бегло смотрят все три и начинают с того, что кажется легче по теме.",
      "Не залипай на одном вопросе больше 1-2 минут — поставь любой ответ (никогда не оставляй пустым, штрафа за неверный ответ нет) и иди дальше, вернёшься в конце если останется время.",
      "В конце оставь 2-3 минуты на проверку: правильно ли перенесены ответы в бланк, нет ли лишних слов в Summary Completion.",
    ],
    example: {
      text: "Стратегия: 17 минут на текст 1 → 20 минут на текст 2 → 23 минуты на текст 3.",
      note: "Раз тексты усложняются, логично закладывать чуть меньше времени на первый (обычно самый простой) и больше на третий — но конкретное распределение подбирается под себя на практике.",
    },
  },
  {
    id: "common-traps",
    title: "Типичные ловушки составителей теста",
    whenToUse: "На любом типе задания — экзамен специально включает варианты, которые выглядят правильными на первый взгляд.",
    howTo: [
      "Подмена чисел: в тексте '15%', в неверном варианте ответа — '50%' или '1.5%'. Всегда сверяй цифры отдельно, не полагаясь на память.",
      "Отрицание: добавление 'not', 'except', 'unless' переворачивает смысл. Читай внимательно частицы отрицания — их легко проскочить глазами.",
      "Совпадение слов ≠ совпадение смысла: вариант ответа может содержать те же слова, что и текст, но в другом порядке или контексте, из-за чего смысл меняется.",
      "Обобщение вместо частного: текст говорит 'some researchers believe', а неверный вариант заявляет это как общепризнанный факт ('scientists have proven').",
    ],
    example: {
      text: "Текст: «Some scientists argue that this challenges the traditional view.» Ловушка: «Scientists have proven that competition does not exist in forests.»",
      note: "'Some scientists argue' (мнение части учёных) превращено в 'have proven' (доказанный факт) — это классическая ловушка-обобщение, которую легко принять за верный ответ, если читать невнимательно.",
    },
  },
  {
    id: "yes-no-not-given",
    title: "Yes/No/Not Given — не путать с True/False/Not Given",
    whenToUse: "Когда в задании написано именно YES/NO/NOT GIVEN (а не TRUE/FALSE) — это отдельный тип, обычно встречается в текстах, где автор высказывает мнение или аргумент.",
    howTo: [
      "Главное отличие: True/False/Not Given проверяет ФАКТЫ из текста. Yes/No/Not Given проверяет МНЕНИЕ АВТОРА — согласуется ли утверждение с точкой зрения именно автора текста.",
      "YES — автор явно согласен с утверждением. NO — автор явно не согласен (даже если факт как таковой верен, но автор оспаривает именно эту интерпретацию). NOT GIVEN — автор не высказывает мнения по этому конкретному пункту.",
      "Ищи слова, которые выражают позицию автора: 'clearly', 'unfortunately', 'it is unlikely that', 'surprisingly' — они выдают отношение автора к теме.",
      "Если текст просто описывает факт без оценки — и вопрос требует оценки — это обычно NOT GIVEN, а не YES или NO.",
    ],
    example: {
      text: "Утверждение: 'The traditional view of forest competition is now outdated.' — в тексте, где автор пишет: 'Some scientists argue that this challenges the traditional Darwinian view...'",
      note: "Автор не заявляет прямо от своего имени, что старый взгляд 'устарел' — он лишь сообщает, что НЕКОТОРЫЕ учёные так считают, сохраняя нейтральность. Это NOT GIVEN, а не YES — потому что это не собственная позиция автора, а пересказ чужого мнения.",
    },
  },
  {
    id: "paragraph-structure",
    title: "Paragraph Structure & Function",
    whenToUse: "For Matching Headings or Matching Information — you need to identify not just what a paragraph says, but what job it does within the whole text.",
    howTo: [
      "Most paragraphs open with a topic sentence stating the main idea; the rest of the paragraph supports it with examples, reasons, or evidence.",
      "Ask what role the paragraph plays: does it introduce a problem, describe a process, give a counter-argument, or offer a solution?",
      "For Matching Headings, the heading must match the paragraph's overall function, not just one detail mentioned inside it.",
      "Watch for paragraphs that shift function partway through — for example, starting with a fact, then pivoting to a counter-argument.",
    ],
    example: {
      text: "\"Not all researchers agree on how deliberate this cooperation is. Sceptics point out that fungi may simply be moving resources...\"",
      note: "This paragraph's function is to introduce doubt and a counter-argument — not just to state another fact. Its role in the text is to complicate the earlier claim, which is exactly what a matching heading needs to capture.",
    },
  },
  {
    id: "note-taking",
    title: "Note-taking & Word Limits",
    whenToUse: "For Summary, Table, Flow-chart, and Notes Completion tasks, where instructions specify an exact word limit.",
    howTo: [
      "Always check the exact instruction first — 'NO MORE THAN TWO WORDS AND/OR A NUMBER' is different from 'ONE WORD ONLY'. Read it before you start, not after.",
      "A number (e.g. '2010', '15%') usually counts as one word, unless it is written out in full ('fifteen').",
      "Hyphenated words (e.g. 'well-being') are usually counted as one word — but always check the specific instructions of that task.",
      "While scanning, jot down only the essential words — full sentences waste time and rarely fit the gap grammatically anyway.",
      "After finishing, recount the words in every answer — going over the limit makes an otherwise correct answer wrong.",
    ],
    example: {
      text: "Instruction: 'Complete the notes below. Use NO MORE THAN TWO WORDS from the passage.' Text: '...connected by a vast web of thread-like fungi known as mycorrhizae.'",
      note: "'Thread-like fungi' is two words and fits the limit. Something like 'a vast web of thread-like fungi' would be far too long and marked wrong, even though it's also technically taken from the text.",
    },
  },
  {
    id: "grammatical-prediction",
    title: "Grammatical Prediction",
    whenToUse: "For Sentence Completion and Matching Sentence Endings — before searching the text, predict what kind of word or phrase must grammatically fit the gap.",
    howTo: [
      "Read the sentence around the gap carefully: is a noun needed? A verb? An adjective? This narrows down what you're scanning for before you even start reading the passage.",
      "Check what comes immediately before and after the gap — a missing article ('a', 'the') or preposition often signals exactly what part of speech is required.",
      "For Matching Sentence Endings, the ending must be grammatically compatible with the sentence beginning, not just logically plausible — eliminate any option that would create a grammar error.",
      "Predicting the grammar first, then scanning for a matching word, is faster than reading every candidate sentence in full.",
    ],
    example: {
      text: "Sentence stem: 'Trees connected through fungal networks are able to exchange...'",
      note: "After 'exchange' we need a noun or noun phrase — something being exchanged. This immediately rules out any sentence ending that starts with a verb or a lone adjective, before you've even read its content.",
    },
  },
];

// ===========================================================
//  ТАБЛИЦА ПЕРЕВОДА БАЛЛОВ В BAND SCORE (Academic Reading)
// ===========================================================
// Справочная — примерное соответствие (реальная шкала может немного
// отличаться между версиями теста).
export const BAND_SCORE_TABLE = [
  { correct: "39–40", band: "9.0" },
  { correct: "37–38", band: "8.5" },
  { correct: "35–36", band: "8.0" },
  { correct: "33–34", band: "7.5" },
  { correct: "30–32", band: "7.0" },
  { correct: "27–29", band: "6.5" },
  { correct: "23–26", band: "6.0" },
  { correct: "19–22", band: "5.5" },
  { correct: "15–18", band: "5.0" },
  { correct: "13–14", band: "4.5" },
];

export const READING_UNITS = [
  {
    id: "read-1",
    order: 1,
    title: "Юнит 1 — The Silent Language of Trees",
    level: "Band 5.5–6",
    topic: "Environmental Science",
    passage:
`For centuries, foresters assumed that trees competed with one another for light, water and nutrients, much like rival businesses fighting for the same customers. Recent research, however, has revealed a far more cooperative picture. Beneath the forest floor, the roots of most trees are connected by a vast web of thread-like fungi known as mycorrhizae. This underground network, sometimes nicknamed the "wood wide web", allows trees to exchange not only nutrients but also chemical warning signals.

When a tree is attacked by insects, it can release chemical compounds into the network that alert neighbouring trees of the same species. Those neighbours, in turn, begin producing defensive chemicals of their own before the insects even reach them. In one well-known study, researchers found that undamaged trees connected to an infested tree produced significantly more defensive enzymes than trees growing in isolation nearby.

The network also appears to support weaker or younger trees. Older, larger trees — sometimes called "mother trees" because of the central role they play — have been observed transferring carbon and nutrients through fungal connections to seedlings growing in their shade, where sunlight is scarce. Some scientists argue that this challenges the traditional Darwinian view of forests as arenas of pure competition, suggesting instead that survival often depends on cooperation between generations.

Not all researchers agree on how deliberate this cooperation is. Sceptics point out that fungi may simply be moving resources to wherever is most efficient for the fungi themselves, with any benefit to the trees being an incidental side effect rather than a coordinated strategy. Testing these competing explanations is difficult, since the underground networks are hard to observe directly and experiments risk disturbing the very systems being studied.

Regardless of the exact mechanism, the practical implications are significant. Foresters who once cleared away older trees to make room for new growth are increasingly reconsidering the practice, since removing a "mother tree" may cut off the support network that younger trees rely on. As understanding of these hidden connections grows, it may reshape not only forestry practices but also broader ideas about competition and cooperation in the natural world.`,
    tasks: [
      {
        type: "tfng",
        title: "True / False / Not Given — разбор и практика",
        instructions: "Согласны ли следующие утверждения с информацией в тексте? Выберите TRUE, FALSE или NOT GIVEN.",
        strategy: [
          "TRUE — текст прямо подтверждает утверждение. FALSE — текст прямо противоречит. NOT GIVEN — в тексте просто нет информации об этом (тема может быть упомянута, но нужных деталей нет).",
          "Самая частая ошибка — путать FALSE и NOT GIVEN. Прежде чем ставить FALSE, спроси себя: 'текст правда говорит обратное, или я просто не нашёл(-ла) подтверждения?' Если не нашёл(-ла) — это NOT GIVEN.",
          "Утверждения обычно идут в том же порядке, что и информация в тексте — двигайся по тексту последовательно, не перескакивай.",
          "Выдели в утверждении 1-2 ключевых слова и ищи их — или их синонимы — в тексте. Дословных совпадений почти никогда не бывает.",
          "Следи за словами-усилителями и ограничителями: 'always', 'only', 'all', 'never' — часто именно они делают верное по смыслу утверждение ложным, потому что текст даёт более осторожную формулировку.",
        ],
        walkthrough: {
          text: "Example: 'Trees only communicate with members of the same species.'",
          steps: [
            "Ключевые слова утверждения: 'only' (ограничитель) + 'same species'.",
            "Ищем в тексте упоминание того, с кем именно трееs 'общаются'. Во втором абзаце: 'alert neighbouring trees of the same species' — да, про этот вид общения сказано именно 'того же вида'.",
            "Но слово 'only' в утверждении добавляет условие: коммуникация ТОЛЬКО с тем же видом, никогда с другими. Текст нигде не утверждает и не отрицает, что деревья разных видов не могут обмениваться сигналами — об этом просто не сказано.",
            "Значит, часть про 'alert neighbouring trees of the same species' — правда, но добавленное 'only' делает утверждение шире, чем то, что подтверждает текст.",
          ],
          answer: "NOT GIVEN",
          whyNotOthers: "Не FALSE, потому что текст не говорит обратного ('деревья общаются и с другими видами') — он просто не затрагивает этот вопрос. Не TRUE, потому что текст не подтверждает исключительность ('only').",
        },
        items: [
          { id: "r1-1", text: "Foresters have always believed that trees cooperate rather than compete.", answer: "FALSE" },
          { id: "r1-2", text: "Mycorrhizal fungi connect the roots of different trees underground.", answer: "TRUE" },
          { id: "r1-3", text: "Trees under insect attack can warn other trees of the same species.", answer: "TRUE" },
          { id: "r1-4", text: "Mother trees only transfer resources to trees of a different species.", answer: "NOT GIVEN" },
          { id: "r1-5", text: "All scientists agree that the transfer of resources between trees is a deliberate strategy.", answer: "FALSE" },
          { id: "r1-6", text: "Researchers have found it easy to test whether fungi act deliberately or not.", answer: "FALSE" },
          { id: "r1-7", text: "The study found that isolated trees produced more defensive enzymes than trees connected to an infested tree.", answer: "FALSE" },
          { id: "r1-8", text: "Mother trees are typically older and larger than the seedlings they support.", answer: "TRUE" },
          { id: "r1-9", text: "Experiments on fungal networks are simple to conduct without affecting the network itself.", answer: "FALSE" },
          { id: "r1-10", text: "Some foresters have changed their practices as a result of this research.", answer: "TRUE" },
        ],
      },
    ],
  },

  // Юниты 2–10: добавляются по этой же схеме после утверждения формата Юнита 1.
  // 2 — Matching Headings, 3 — Matching Information, 4 — Summary Completion,
  // 5 — Multiple Choice, 6–10 — смешанная практика по нарастанию сложности.
];

export function scoreReadingUnit(unit, userAnswers) {
  // userAnswers: { [itemId]: <ответ пользователя> }
  let correct = 0, total = 0;
  const details = []; // [{ id, ok, correctAnswer, userAnswer, type, question }]

  for (const task of unit.tasks) {
    for (const item of task.items) {
      total++;
      let ok = false;
      let displayCorrect = item.answer;
      let displayUser = userAnswers[item.id];
      let question = item.text || item.paragraph || "Summary gap";

      if (task.type === "summary") {
        const accepted = item.answer.map(a => a.trim().toLowerCase());
        ok = accepted.includes(String(userAnswers[item.id] || "").trim().toLowerCase());
        displayCorrect = item.answer[0];
      } else if (task.type === "heading-match") {
        ok = userAnswers[item.id] === item.answer;
        displayCorrect = task.headings[item.answer];
        displayUser = userAnswers[item.id] !== undefined ? task.headings[userAnswers[item.id]] : undefined;
      } else if (task.type === "mcq") {
        ok = userAnswers[item.id] === item.answer;
        displayCorrect = item.opts[item.answer];
        displayUser = userAnswers[item.id] !== undefined ? item.opts[userAnswers[item.id]] : undefined;
      } else {
        // tfng, info-match
        ok = userAnswers[item.id] === item.answer;
      }

      if (ok) correct++;
      details.push({ id: item.id, ok, type: task.type, question, correctAnswer: displayCorrect, userAnswer: displayUser });
    }
  }
  return { correct, total, pct: total ? Math.round((correct / total) * 100) : 0, details };
}
