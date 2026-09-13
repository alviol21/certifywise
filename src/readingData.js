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
      {
        title: "The Science of Habit Formation",
        text:
`Habits account for a remarkably large proportion of daily human behaviour, with some psychologists estimating that automatic, habitual actions make up somewhere between a third and nearly half of what people do on an average day, often without any conscious deliberation at all.

Neuroscientific research has identified a specific brain structure, the basal ganglia, as playing a central role in encoding habitual behaviour, effectively allowing the brain to conserve mental effort by shifting well-practised actions from a deliberate decision-making process to something closer to automatic execution.

A widely referenced model describes habit formation as a three-part loop consisting of a cue that triggers the behaviour, the routine or action itself, and a reward that reinforces the association, strengthening the loop each time it is repeated until the behaviour becomes largely automatic.

Breaking an established habit has proven considerably more difficult than psychologists once assumed, since the neural pathway underlying the habit does not simply disappear once a person stops performing the behaviour; instead, it appears to remain largely intact and can be reactivated relatively easily under stress or in a familiar triggering context.

Given this resilience, many behaviour-change specialists now recommend focusing not on eliminating an unwanted habit loop directly, but on identifying its original cue and substituting a new, healthier routine that still delivers a comparable reward, an approach that research suggests tends to produce more durable long-term change.`,
        questions: [
          { id: "sk-11", prompt: "What is the main idea of Paragraph 1?", opts: ["Humans rarely act out of habit.", "A substantial portion of daily behaviour is automatic and habitual.", "Habits only affect a tiny fraction of daily actions.", "People are always consciously aware of their habits."], answer: 1, exp: "The paragraph's point is the scale of habitual behaviour (a third to nearly half of daily actions), not a specific example." },
          { id: "sk-12", prompt: "What is the main idea of Paragraph 2?", opts: ["The basal ganglia has no role in behaviour.", "A specific brain structure helps make habitual behaviour more automatic, saving mental effort.", "The brain requires more effort for habitual actions than new ones.", "Neuroscience has found no link between the brain and habits."], answer: 1, exp: "The paragraph explains the brain mechanism (basal ganglia) that conserves effort via automatic execution." },
          { id: "sk-13", prompt: "What is the main idea of Paragraph 3?", opts: ["Habits form through a repeating cycle of cue, routine, and reward.", "Habits form randomly with no identifiable pattern.", "Rewards play no role in habit formation.", "Habits form instantly after a single repetition."], answer: 0, exp: "The paragraph describes the specific three-part loop model — its whole point is that there IS a clear, repeating pattern." },
          { id: "sk-14", prompt: "What is the main idea of Paragraph 4?", opts: ["Habits are very easy to eliminate permanently.", "Once formed, habit-related neural pathways tend to persist and can resurface under stress, making habits hard to break.", "Neural pathways for habits disappear the moment a behaviour stops.", "Breaking habits has become easier than psychologists once thought."], answer: 1, exp: "The paragraph's point is resilience and persistence of habit pathways — the opposite of easy elimination." },
          { id: "sk-15", prompt: "What is the main idea of Paragraph 5?", opts: ["Directly eliminating a habit loop is the recommended approach.", "Replacing a habit's routine with a healthier one, while keeping the same cue and reward, tends to produce more lasting change.", "Behaviour-change specialists recommend ignoring cues entirely.", "There is no effective strategy for changing habits."], answer: 1, exp: "The paragraph recommends substitution (same cue/reward, new routine) rather than direct elimination." },
        ],
      },
      {
        title: "The Global Decline of Bee Populations",
        text:
`Over the past two decades, beekeepers and researchers across North America and Europe have documented significant declines in managed honeybee colonies, alongside broader concerns about wild pollinator populations, prompting sustained scientific attention to a phenomenon with potentially serious implications for global food production.

No single cause has been identified as solely responsible for these declines; instead, researchers generally point to a combination of factors, including exposure to certain classes of pesticides, the spread of parasitic mites, habitat loss due to agricultural intensification, and the effects of pathogens that spread more easily within densely managed colonies.

Among these factors, the Varroa mite has received particular attention, since it not only weakens bees directly by feeding on their tissue but also serves as a vector for several viral diseases, creating compounding health problems that can rapidly destabilise an otherwise seemingly healthy colony.

The economic stakes extend well beyond honey production itself, since bees and other pollinators are estimated to contribute to the pollination of a substantial share of globally significant food crops, meaning that sustained pollinator decline could eventually affect the availability and cost of numerous fruits, vegetables, and nuts.

In response, a range of mitigation efforts have been introduced, from stricter regulation of certain pesticides in some regions to the planting of pollinator-friendly wildflower habitats near agricultural land, though researchers caution that reversing the broader downward trend will likely require sustained, coordinated action across multiple fronts simultaneously.`,
        questions: [
          { id: "sk-16", prompt: "What is the main idea of Paragraph 1?", opts: ["Bee populations have shown no notable changes in recent decades.", "Significant declines in bee populations have been documented and have drawn serious scientific attention.", "Only honey production has been affected by bee population changes.", "Beekeepers have stopped tracking colony health."], answer: 1, exp: "The paragraph establishes the overall phenomenon (documented decline, scientific attention), not a specific narrow detail." },
          { id: "sk-17", prompt: "What is the main idea of Paragraph 2?", opts: ["A single clear cause explains all bee population decline.", "Researchers attribute the decline to a combination of several different factors.", "Pesticides are the only factor considered relevant.", "Habitat loss has been ruled out as a contributing factor."], answer: 1, exp: "The paragraph explicitly states 'no single cause' and lists multiple contributing factors." },
          { id: "sk-18", prompt: "What is the main idea of Paragraph 3?", opts: ["The Varroa mite has no significant impact on bee health.", "The Varroa mite both directly weakens bees and spreads disease, compounding colony health problems.", "Viral diseases in bees are unrelated to mites.", "Varroa mites only affect a tiny number of colonies worldwide."], answer: 1, exp: "The paragraph's focus is the mite's dual/compounding harm — direct weakening plus disease vector." },
          { id: "sk-19", prompt: "What is the main idea of Paragraph 4?", opts: ["Bee decline has no economic implications beyond honey.", "Pollinator decline could affect the availability and cost of many important food crops.", "Bees contribute nothing to global food production.", "Only nuts are affected by pollinator decline."], answer: 1, exp: "The paragraph broadens the stakes to food crops generally, not just honey or a single crop type." },
          { id: "sk-20", prompt: "What is the main idea of Paragraph 5?", opts: ["No mitigation efforts have been attempted anywhere.", "Various mitigation efforts are underway, but reversing the trend will likely require sustained, coordinated action.", "The bee decline problem has already been fully solved.", "Pesticide regulation alone has completely resolved the issue."], answer: 1, exp: "The paragraph lists efforts underway while cautioning that a full reversal needs broader, coordinated action." },
        ],
      },
      {
        title: "The Renaissance of Vinyl Records",
        text:
`After decades of steep decline following the rise of cassette tapes and, later, compact discs, vinyl record sales have experienced a sustained resurgence over the past fifteen years, with annual sales figures in several major markets climbing for over a decade in a row, defying earlier predictions that the format would fade into obscurity.

Part of this revival has been attributed to a growing appetite among some listeners for a more tangible, deliberate listening experience, in contrast to the largely intangible, algorithm-driven nature of streaming platforms, where songs can be skipped instantly and background listening is common.

Collectors and enthusiasts frequently cite the distinct qualities of album artwork, liner notes, and the physical ritual of placing a record on a turntable as meaningful parts of the appeal, elements that are typically diminished or entirely absent in digital formats regardless of audio quality.

The resurgence has not been without practical difficulties, however, since the number of pressing plants capable of manufacturing vinyl records shrank dramatically during the format's decline, creating production bottlenecks and lengthy waiting times that have occasionally frustrated both major labels and independent artists alike.

Industry analysts remain divided over whether the format's current popularity represents a durable long-term shift in listening habits or a more temporary nostalgia-driven trend, though the willingness of major artists to release new albums on vinyl alongside digital formats suggests that, for now at least, the format retains genuine commercial relevance.`,
        questions: [
          { id: "sk-21", prompt: "What is the main idea of Paragraph 1?", opts: ["Vinyl sales have continued declining without interruption for decades.", "Vinyl sales have seen a sustained revival over the past fifteen years, defying earlier predictions.", "Cassette tapes have replaced vinyl as the dominant format.", "Vinyl sales peaked only once, decades ago, and never recovered."], answer: 1, exp: "The paragraph's point is the reversal — sustained recent growth contradicting the format's earlier decline." },
          { id: "sk-22", prompt: "What is the main idea of Paragraph 2?", opts: ["Streaming and vinyl offer an identical listening experience.", "Part of vinyl's appeal lies in offering a more tangible, deliberate experience compared to streaming.", "No listeners value a physical listening experience.", "Streaming platforms require more deliberate listening than vinyl."], answer: 1, exp: "The paragraph contrasts vinyl's tangible experience with streaming's intangible, skippable nature." },
          { id: "sk-23", prompt: "What is the main idea of Paragraph 3?", opts: ["Album artwork and liner notes are irrelevant to vinyl's appeal.", "Physical elements like artwork and the ritual of playing a record are seen as meaningful parts of vinyl's appeal.", "Digital formats offer superior physical packaging.", "Turntables are no longer used by vinyl enthusiasts."], answer: 1, exp: "The paragraph lists these physical elements specifically as part of the appeal, contrasted with digital formats lacking them." },
          { id: "sk-24", prompt: "What is the main idea of Paragraph 4?", opts: ["Vinyl production has faced no practical challenges during its revival.", "A shortage of pressing plants has created production bottlenecks and delays during vinyl's resurgence.", "There are now more pressing plants than ever before.", "Major labels have been unaffected by production issues."], answer: 1, exp: "The paragraph's focus is the practical difficulty (fewer plants, bottlenecks) accompanying the revival." },
          { id: "sk-25", prompt: "What is the main idea of Paragraph 5?", opts: ["All analysts agree vinyl's popularity is purely temporary nostalgia.", "Analysts are divided on whether vinyl's revival is durable or temporary, though major artists continue releasing vinyl.", "No major artists currently release music on vinyl.", "The format has already lost all commercial relevance."], answer: 1, exp: "The paragraph explicitly states analysts 'remain divided', while noting continued vinyl releases as a sign of relevance." },
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
      {
        title: "The Discovery of Penicillin",
        text:
`In September 1928, the Scottish bacteriologist Alexander Fleming returned to his laboratory at St Mary's Hospital in London after a summer holiday and noticed that one of his petri dishes, left uncovered by accident, had become contaminated with a blue-green mould. Around the mould, he observed a clear ring where the surrounding bacteria appeared to have been destroyed.

Fleming identified the mould as belonging to the genus Penicillium and published his initial findings in 1929, naming the antibacterial substance it produced "penicillin". Despite the significance of the discovery, Fleming struggled to isolate and stabilise the compound in sufficient quantities, and his early research attracted relatively little attention within the wider scientific community for almost a decade.

The breakthrough that transformed penicillin from a laboratory curiosity into a usable medicine came a decade later, when a team led by Howard Florey and Ernst Boris Chain at the University of Oxford developed methods to purify and mass-produce the substance. Their work, published in 1940, demonstrated penicillin's remarkable effectiveness in treating bacterial infections in mice.

The first human patient to receive penicillin, a police constable named Albert Alexander, was treated in February 1941 after developing a severe infection from a scratch. Although he initially showed dramatic improvement, the limited supply of the drug ran out before treatment could be completed, and he later died, a case that nonetheless demonstrated penicillin's potential when supplies were sufficient.

By 1944, in the lead-up to the D-Day invasion, penicillin production in the United States had been scaled up dramatically, reaching a level sufficient to treat all Allied forces requiring it. Fleming, Florey, and Chain were jointly awarded the Nobel Prize in Physiology or Medicine in 1945 for their contributions to what has since been regarded as one of the most significant medical discoveries of the twentieth century.`,
        questions: [
          { id: "sc-11", prompt: "In what year did Fleming first notice the mould in his petri dish?", opts: ["1928", "1929", "1940", "1945"], answer: 0, exp: "The text states 'In September 1928... Fleming... noticed... a blue-green mould.'" },
          { id: "sc-12", prompt: "What did Fleming name the antibacterial substance?", opts: ["Chainicillin", "Florecillin", "Penicillin", "Alexandrin"], answer: 2, exp: "The text says he named it 'penicillin'." },
          { id: "sc-13", prompt: "Who led the Oxford team that developed methods to mass-produce penicillin?", opts: ["Alexander Fleming alone", "Howard Florey and Ernst Boris Chain", "Albert Alexander", "A team in the United States"], answer: 1, exp: "The text names 'a team led by Howard Florey and Ernst Boris Chain'." },
          { id: "sc-14", prompt: "In what month and year was the first human patient treated with penicillin?", opts: ["September 1928", "1929", "February 1941", "1944"], answer: 2, exp: "The text says Albert Alexander 'was treated in February 1941'." },
          { id: "sc-15", prompt: "In what year did Fleming, Florey and Chain receive the Nobel Prize?", opts: ["1928", "1940", "1941", "1945"], answer: 3, exp: "The text states they 'were jointly awarded the Nobel Prize... in 1945'." },
        ],
      },
      {
        title: "The Construction of the Panama Canal",
        text:
`The idea of building a canal across the narrow isthmus of Panama to connect the Atlantic and Pacific Oceans dates back centuries, but serious construction efforts did not begin until 1881, when a French company led by Ferdinand de Lesseps, fresh from his success with the Suez Canal, undertook the project.

The French effort ultimately failed, hampered by tropical diseases including malaria and yellow fever, engineering challenges far greater than those encountered in Egypt, and financial mismanagement. By the time the project was abandoned in 1889, an estimated 22,000 workers had died, and the venture had cost investors enormous sums of money.

The United States acquired the rights to the project in 1904, after Panama, with American support, declared independence from Colombia. Under the leadership of chief engineer John Frank Stevens and later George Washington Goethals, American engineers adopted a lock-based canal design rather than the sea-level canal the French had attempted.

Construction was completed in 1914, at a total cost to the United States of roughly $375 million, and the canal officially opened to commercial traffic on 15 August of that year. Improved sanitation measures, including extensive mosquito-control programmes led by physician William Gorgas, dramatically reduced disease-related deaths compared with the French phase of construction.

Control of the canal remained with the United States for the rest of the twentieth century, until a series of treaties signed in 1977 established a gradual transfer of authority, with full control passing to Panama on 31 December 1999, a date that remains a significant national holiday in the country.`,
        questions: [
          { id: "sc-16", prompt: "In what year did the French construction effort on the Panama Canal begin?", opts: ["1869", "1881", "1889", "1904"], answer: 1, exp: "The text says 'serious construction efforts did not begin until 1881'." },
          { id: "sc-17", prompt: "Approximately how many workers died during the French phase of construction?", opts: ["2,200", "22,000", "220,000", "12,000"], answer: 1, exp: "The text states 'an estimated 22,000 workers had died'." },
          { id: "sc-18", prompt: "In what year did the United States acquire the rights to the canal project?", opts: ["1899", "1904", "1914", "1977"], answer: 1, exp: "The text says 'The United States acquired the rights to the project in 1904'." },
          { id: "sc-19", prompt: "On what date did the canal officially open to commercial traffic?", opts: ["15 August 1914", "31 December 1999", "4 July 1904", "1 January 1977"], answer: 0, exp: "The text states the canal 'officially opened to commercial traffic on 15 August' 1914." },
          { id: "sc-20", prompt: "On what date did full control of the canal pass to Panama?", opts: ["15 August 1914", "1977", "31 December 1999", "1889"], answer: 2, exp: "The text says 'full control passing to Panama on 31 December 1999'." },
        ],
      },
      {
        title: "The Origins of the Modern Olympic Games",
        text:
`The modern Olympic Games trace their origin to the efforts of French educator Pierre de Coubertin, who proposed reviving the ancient Greek tradition at a conference held in Paris in 1894. His proposal led to the founding of the International Olympic Committee that same year.

The first modern Olympic Games were held in Athens in 1896, featuring approximately 241 athletes from 14 nations competing across 43 events in 9 different sports. The event was considered a success, though attendance and international participation remained modest compared with later editions.

Women were not permitted to compete in the first Games, and it was not until the 1900 Paris Olympics that female athletes were allowed to participate, initially only in a small number of sports such as tennis and golf. Full gender parity in the number of events took over a century longer to achieve.

The Winter Olympics were introduced considerably later than the Summer Games, with the first edition held in Chamonix, France, in 1924, featuring events such as figure skating, ice hockey, and various skiing disciplines that were unsuited to a summer competition format.

Today, the Summer Olympics attract several thousand athletes from over 200 nations, a dramatic expansion from the 14 nations present in 1896, reflecting both the growth of international sport and the increasing number of countries recognised for competition by the International Olympic Committee.`,
        questions: [
          { id: "sc-21", prompt: "In what year did Pierre de Coubertin propose reviving the Olympic Games?", opts: ["1894", "1896", "1900", "1924"], answer: 0, exp: "The text says he made the proposal 'at a conference held in Paris in 1894'." },
          { id: "sc-22", prompt: "How many nations competed at the first modern Olympics in Athens?", opts: ["9", "14", "43", "241"], answer: 1, exp: "The text states '241 athletes from 14 nations' competed at the first Games." },
          { id: "sc-23", prompt: "In which city and year did women first compete in the Olympics?", opts: ["Athens, 1896", "Paris, 1900", "Chamonix, 1924", "London, 1908"], answer: 1, exp: "The text says female athletes were first allowed to participate at 'the 1900 Paris Olympics'." },
          { id: "sc-24", prompt: "Where were the first Winter Olympics held?", opts: ["Athens", "Paris", "Chamonix, France", "Los Angeles"], answer: 2, exp: "The text states the first Winter Olympics were 'held in Chamonix, France, in 1924'." },
          { id: "sc-25", prompt: "Approximately how many nations participate in the Summer Olympics today, according to the text?", opts: ["Over 200", "Exactly 43", "14", "9"], answer: 0, exp: "The text says today's Games attract athletes 'from over 200 nations'." },
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
      {
        title: "The Hidden Cost of Food Waste",
        text:
`Across the global food supply chain, from farms to retail shelves to household kitchens, a substantial proportion of all food produced is never actually eaten, a phenomenon that has drawn increasing attention from policymakers, environmental scientists, and the food industry alike in recent years.

Estimates suggest that roughly a third of all food produced globally for human consumption is lost or wasted at some stage, with the specific causes varying considerably between wealthier and poorer nations: in developing countries, losses tend to occur earlier in the supply chain due to inadequate storage and transport infrastructure, while in wealthier nations, waste is more concentrated at the retail and consumer stages.

The environmental consequences of this waste extend well beyond the food itself, since producing food that is ultimately discarded also wastes the water, land, energy, and labour invested in growing, processing, and transporting it, while decomposing food waste in landfills generates methane, a greenhouse gas considerably more potent than carbon dioxide.

In response, a range of initiatives have emerged to address different points along the supply chain, including apps connecting consumers with surplus food from restaurants and grocery stores, changes to labelling practices intended to reduce confusion over expiration dates, and policy measures in some countries requiring large retailers to donate unsold edible food rather than discard it.

Despite these efforts, experts caution that meaningfully reducing food waste at a global scale will likely require coordinated change across multiple actors simultaneously, from consumer behaviour and retailer practices to agricultural policy and infrastructure investment, rather than any single intervention acting in isolation.`,
        questions: [
          { id: "pr-11", prompt: "Based on the title alone, what would you predict this text discusses?", opts: ["A recipe collection for using leftover food.", "The scale and consequences of food being wasted, and possibly what's being done about it.", "A history of farming techniques.", "An argument that food waste doesn't actually happen."], answer: 1, exp: "The title's key terms — 'hidden cost' and 'food waste' — predict a discussion of scale, consequences, and likely responses." },
          { id: "pr-12", prompt: "Having read Paragraph 1, what would you expect Paragraph 2 to cover?", opts: ["Specific data on how much food is wasted and where.", "An unrelated discussion of restaurant menus.", "A conclusion that no food waste exists.", "The history of agriculture in general."], answer: 0, exp: "After introducing the phenomenon, a logical next step is quantifying it — which Paragraph 2 does with the 'roughly a third' estimate." },
          { id: "pr-13", prompt: "Having read Paragraphs 1-2, what would you predict comes next?", opts: ["A repeat of the same statistics.", "The broader consequences of this waste, such as environmental impact.", "An unrelated topic switch.", "A biography of a food scientist."], answer: 1, exp: "After establishing scale, texts commonly move to consequences — Paragraph 3 covers environmental impact." },
          { id: "pr-14", prompt: "Given that Paragraph 3 discussed consequences, what is a natural next step?", opts: ["Solutions or responses being attempted.", "A return to the initial statistics with no new information.", "An unrelated new problem.", "The text ending abruptly."], answer: 0, exp: "After consequences, a balanced text typically presents responses or solutions — Paragraph 4 covers various initiatives." },
          { id: "pr-15", prompt: "Based on the pattern (problem → data → consequences → solutions), what would you expect the final paragraph to do?", opts: ["Introduce a completely unrelated topic.", "Offer a balanced concluding note on the challenge of solving the problem at scale.", "Simply repeat Paragraph 1.", "End with no concluding thoughts at all."], answer: 1, exp: "Texts structured this way typically end with a nuanced conclusion — Paragraph 5 notes the need for coordinated, multi-actor change." },
        ],
      },
      {
        title: "The Rise of Citizen Science",
        text:
`In recent decades, scientific research has increasingly come to rely not only on professional researchers but also on large numbers of volunteers, often with no formal scientific training, who contribute to data collection and analysis through what has come to be known as citizen science.

This approach has proven particularly valuable in fields requiring observations across vast geographic areas or extended time periods, such as tracking bird migration patterns, monitoring water quality in local streams, or classifying distant galaxies in astronomical images, tasks that would be prohibitively expensive or time-consuming for small professional research teams alone.

The growth of smartphone technology and dedicated mobile applications has significantly accelerated this trend, making it substantially easier for volunteers to record and submit observations in real time, while also allowing project organisers to verify data quality and provide immediate feedback to participants.

Critics have raised concerns about the reliability of data collected by untrained volunteers, prompting many citizen science projects to implement quality-control measures such as requiring multiple independent observations to confirm a single data point, or having a subset of submissions reviewed by expert volunteers or professional scientists.

Despite these concerns, numerous peer-reviewed studies have now been published using citizen-science-generated data, and many researchers argue that, when properly managed, the sheer scale of data achievable through mass public participation can outweigh the risks associated with less rigorous training, particularly for research questions requiring extensive geographic or temporal coverage.`,
        questions: [
          { id: "pr-16", prompt: "Based on the title alone, what would you predict this text discusses?", opts: ["A history of famous individual scientists.", "How ordinary volunteers are increasingly contributing to scientific research.", "An argument that citizen science should be banned.", "A guide to becoming a professional scientist."], answer: 1, exp: "The title's terms — 'rise' and 'citizen science' — predict a discussion of growing volunteer participation in research." },
          { id: "pr-17", prompt: "Having read Paragraph 1, what would you expect Paragraph 2 to cover?", opts: ["Specific examples of where this approach has proven useful.", "An unrelated discussion of professional scientist salaries.", "A conclusion that citizen science never works.", "The history of the scientific method generally."], answer: 0, exp: "After introducing the concept, a logical next step is illustrating it with examples — which Paragraph 2 does." },
          { id: "pr-18", prompt: "Having read Paragraphs 1-2, what would you predict comes next?", opts: ["A repeat of the same examples.", "A factor that has helped this trend grow, such as technology.", "An unrelated topic switch.", "The text ending immediately."], answer: 1, exp: "After examples, texts often explain what has enabled or accelerated the trend — Paragraph 3 covers smartphone technology." },
          { id: "pr-19", prompt: "Given that Paragraph 3 discussed technology's role, what is a natural next step in a balanced text?", opts: ["Concerns or criticisms of the approach.", "A repeat of the technology discussion.", "An unrelated new topic.", "No further development."], answer: 0, exp: "A balanced text describing benefits and enablers typically follows with criticisms — Paragraph 4 raises reliability concerns." },
          { id: "pr-20", prompt: "Based on the pattern (concept → examples → enabling factor → criticism), what would you expect the final paragraph to do?", opts: ["Introduce a completely unrelated topic.", "Offer a balanced response to the criticism and an overall assessment.", "Simply repeat Paragraph 1.", "End with no concluding thoughts at all."], answer: 1, exp: "Paragraph 5 responds to the criticism with a balanced assessment, exactly as this pattern would predict." },
        ],
      },
      {
        title: "The Debate Over Universal Basic Income",
        text:
`Universal basic income, a policy proposal involving regular, unconditional cash payments made to all citizens regardless of employment status or income level, has moved from a niche academic idea to a subject of serious policy debate and experimentation in numerous countries over the past decade.

Proponents argue that such a policy could provide a stronger safety net than existing welfare systems, particularly as automation and artificial intelligence threaten to displace significant numbers of workers from traditional employment, while also reducing the administrative complexity associated with means-tested benefit programmes.

Several pilot programmes have been conducted in various countries and cities to test these claims empirically, generally measuring outcomes such as recipients' employment status, mental health, and overall life satisfaction, with early results in some trials suggesting modest positive effects without the significant reduction in work effort that critics had predicted.

Critics, however, raise concerns about the substantial cost of implementing such a policy at a national scale, questioning whether the necessary tax increases or budget reallocations would be politically feasible or economically sustainable, particularly in countries with already strained public finances.

Given the limited scale and duration of pilot programmes conducted so far, most economists agree that considerably more research is needed before drawing firm conclusions about how a permanent, nationwide universal basic income might function in practice, particularly regarding its long-term effects on labour markets and government budgets.`,
        questions: [
          { id: "pr-21", prompt: "Based on the title alone, what would you predict this text discusses?", opts: ["A step-by-step guide to personal budgeting.", "A policy idea involving payments to all citizens, and the arguments for and against it.", "The history of taxation systems.", "An argument that all welfare programmes should be eliminated."], answer: 1, exp: "The title's terms — 'debate' and 'universal basic income' — predict a balanced discussion of a specific policy proposal." },
          { id: "pr-22", prompt: "Having read Paragraph 1, what would you expect Paragraph 2 to cover?", opts: ["Arguments in favour of the policy.", "An unrelated history of currency.", "A conclusion that the idea has been abandoned everywhere.", "Details of a completely different policy."], answer: 0, exp: "After introducing the concept, a logical next step is presenting supporting arguments — which Paragraph 2 does." },
          { id: "pr-23", prompt: "Having read Paragraphs 1-2, what would you predict comes next?", opts: ["A repeat of the same arguments.", "Evidence from real-world testing of the idea.", "An unrelated topic switch.", "The text ending immediately."], answer: 1, exp: "After arguments, texts often move to empirical evidence — Paragraph 3 covers pilot programme results." },
          { id: "pr-24", prompt: "Given that Paragraph 3 presented supportive pilot evidence, what is a natural next step in a balanced text?", opts: ["Criticisms or concerns about the policy.", "A repeat of the same evidence.", "An unrelated new topic.", "No further development."], answer: 0, exp: "A balanced text presenting supportive evidence typically follows with criticism — Paragraph 4 raises cost concerns." },
          { id: "pr-25", prompt: "Based on the pattern (concept → benefits → evidence → criticism), what would you expect the final paragraph to do?", opts: ["Introduce a completely unrelated topic.", "Offer a balanced conclusion noting the need for more research.", "Simply repeat Paragraph 1.", "End with no concluding thoughts at all."], answer: 1, exp: "Paragraph 5 concludes by noting the need for more research — a balanced, measured ending typical of this structure." },
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
      {
        title: "The Myth of Multitasking",
        text:
`Despite being widely regarded as a valuable modern skill, the ability to genuinely perform multiple cognitively demanding tasks simultaneously has been repeatedly called into question by cognitive psychology research, which suggests that what people typically experience as multitasking is, in most cases, rapid switching between tasks rather than true simultaneous processing.

This rapid switching carries a measurable cost, commonly referred to as "switching cost", since the brain requires a brief period to disengage from one task and reorient itself to another, a process that, repeated frequently throughout a work session, can meaningfully reduce overall efficiency and increase the likelihood of errors.

Not all forms of simultaneous activity are equally affected, however; researchers generally distinguish between tasks that compete for the same cognitive resources, such as reading and composing an email at the same time, and tasks that draw on largely separate resources, such as walking while listening to a podcast, where genuine parallel processing is more plausible.

Some studies have identified a small subset of individuals, sometimes informally termed "supertaskers", who appear to show minimal performance decline when juggling multiple demanding tasks, though this group is thought to represent a small percentage of the population rather than a skill that most people can reliably develop through practice.

Given this research, many productivity experts now recommend structuring work around focused, single-task periods rather than attempting simultaneous multitasking, particularly for tasks requiring sustained concentration, while reserving genuine multitasking for combinations of tasks that draw on clearly distinct cognitive resources.`,
        questions: [
          { id: "dr-11", prompt: "Which statement most precisely reflects Paragraph 1?", opts: ["Research has fully confirmed that multitasking is always beneficial.", "Research suggests that what feels like multitasking is usually rapid task-switching, not true simultaneous processing.", "No research has ever examined multitasking.", "Multitasking has been proven impossible for all people in all situations."], answer: 1, exp: "Option A contradicts the text's skepticism; D overstates with 'impossible for all people' when the text later describes exceptions." },
          { id: "dr-12", prompt: "Which statement most accurately reflects Paragraph 2?", opts: ["Switching cost has no measurable effect on performance.", "Repeated task-switching carries a cost that can reduce efficiency and increase errors.", "Switching between tasks always improves accuracy.", "The brain requires no time at all to switch between tasks."], answer: 1, exp: "Options A, C and D all contradict the described 'switching cost' and its negative effects." },
          { id: "dr-13", prompt: "Which statement most precisely reflects Paragraph 3?", opts: ["All simultaneous activities are equally affected by switching costs.", "Tasks competing for the same cognitive resources are more affected than tasks using separate resources.", "Walking and listening to a podcast cannot be done simultaneously.", "No distinction exists between different types of simultaneous activity."], answer: 1, exp: "The paragraph explicitly distinguishes ('not all... equally affected') between resource-competing and resource-separate tasks." },
          { id: "dr-14", prompt: "Which statement most accurately reflects Paragraph 4?", opts: ["Most people can become 'supertaskers' with enough practice.", "A small subset of people show minimal performance decline when multitasking, but this is not typical or easily trainable.", "No one has ever been found to multitask well.", "Supertaskers represent the majority of the population."], answer: 1, exp: "The text says this is 'a small percentage', not a trainable skill for 'most people' — ruling out A and D." },
          { id: "dr-15", prompt: "Which statement most precisely reflects Paragraph 5?", opts: ["Experts recommend multitasking for all types of work.", "Experts generally recommend single-task focus, reserving multitasking for tasks using distinct cognitive resources.", "Experts believe multitasking should be avoided in every possible scenario.", "Focused single-task periods are discouraged by productivity experts."], answer: 1, exp: "The text gives a nuanced recommendation (single-task focus generally, multitasking reserved for specific cases) — not an absolute rule either way." },
        ],
      },
      {
        title: "The Physics of Bridge Design",
        text:
`Bridge engineering has evolved considerably since ancient times, when simple beam and arch designs were the primary options available, to the present day, where a wide range of structural types, including suspension, cable-stayed, and truss bridges, allow engineers to span distances and support loads that would have been unimaginable to earlier builders.

Suspension bridges, among the most visually striking designs, rely on large main cables anchored at each end and suspended between tall towers, with the roadway hung from these cables by numerous smaller vertical cables; this design distributes weight efficiently and allows suspension bridges to span exceptionally long distances without intermediate support in the water below.

Not all long-span bridges use suspension designs, however; cable-stayed bridges, which connect the roadway directly to towers via diagonal cables rather than a single large curved main cable, have become increasingly popular for moderately long spans, offering many of the visual and structural benefits of suspension bridges at typically lower construction costs.

Regardless of the specific design chosen, all bridges must account for a range of forces beyond simply supporting static weight, including wind loads, which can cause significant oscillation in long-span structures, and, in many regions, the possibility of seismic activity, which requires additional engineering measures to prevent structural failure during an earthquake.

The catastrophic collapse of the Tacoma Narrows Bridge in 1940, caused by wind-induced oscillations that engineers at the time had not adequately anticipated, remains one of the most frequently cited case studies in engineering education, having prompted significant and lasting changes to how wind effects are modelled and accounted for in modern bridge design.`,
        questions: [
          { id: "dr-16", prompt: "Which statement most precisely reflects Paragraph 1?", opts: ["Bridge designs have remained unchanged since ancient times.", "Bridge engineering has advanced significantly from simple ancient designs to a wide range of modern structural types.", "Only arch bridges are used today.", "Ancient builders had access to all modern bridge designs."], answer: 1, exp: "Options A, C and D all contradict the described historical progression from simple to varied modern designs." },
          { id: "dr-17", prompt: "Which statement most accurately reflects Paragraph 2?", opts: ["Suspension bridges require intermediate support structures in the water for every span.", "Suspension bridges distribute weight via main cables and towers, allowing long spans without intermediate water support.", "Suspension bridges cannot span long distances.", "The roadway in a suspension bridge is not connected to any cables."], answer: 1, exp: "The text explicitly says suspension bridges span 'without intermediate support in the water below' — the opposite of option A." },
          { id: "dr-18", prompt: "Which statement most precisely reflects Paragraph 3?", opts: ["All long-span bridges use suspension designs exclusively.", "Cable-stayed bridges offer a lower-cost alternative to suspension bridges for moderately long spans.", "Cable-stayed bridges have become less popular over time.", "Cable-stayed bridges use a single large curved cable, just like suspension bridges."], answer: 1, exp: "The paragraph opens with 'Not all... use suspension designs', directly contradicting option A, and D misdescribes cable-stayed design." },
          { id: "dr-19", prompt: "Which statement most accurately reflects Paragraph 4?", opts: ["Only suspension bridges need to account for wind loads.", "All bridges, regardless of design, must account for forces like wind and, in some regions, seismic activity.", "Static weight is the only force bridges need to consider.", "Seismic activity is irrelevant to bridge engineering everywhere."], answer: 1, exp: "The text says 'regardless of the specific design chosen, all bridges must account for' these forces — ruling out A, C and D." },
          { id: "dr-20", prompt: "Which statement most precisely reflects Paragraph 5?", opts: ["The Tacoma Narrows collapse had no lasting impact on bridge engineering.", "The 1940 Tacoma Narrows collapse, caused by unanticipated wind effects, led to lasting changes in bridge design practices.", "Engineers fully anticipated the wind effects that caused the Tacoma Narrows collapse.", "The Tacoma Narrows Bridge collapsed due to seismic activity."], answer: 1, exp: "The text says the oscillations were something engineers 'had not adequately anticipated' — contradicting C, and the cause was wind, not seismic activity (D)." },
        ],
      },
      {
        title: "The Discovery of Antarctica's Subglacial Lakes",
        text:
`For much of the twentieth century, scientists generally assumed that the ice sheets covering Antarctica rested directly on solid, frozen bedrock throughout the continent, with little consideration given to the possibility of liquid water existing beneath such an extreme thickness of ice.

This assumption began to change in the 1970s and 1990s, when researchers using radar and seismic surveys identified evidence of what appeared to be large bodies of liquid water trapped beneath the ice, kept unfrozen by geothermal heat from below and the immense insulating pressure of the ice sheet above.

The largest and most extensively studied of these subglacial lakes, Lake Vostok, is estimated to be comparable in size to some of the larger lakes found on other continents, and is believed to have remained isolated from the Earth's atmosphere for possibly millions of years.

Not all subglacial lakes are permanently isolated, however; some are now known to be connected by channels of water flowing slowly beneath the ice, occasionally draining and refilling over periods of months or years in events detectable through satellite measurements of the ice surface above them.

Scientific interest in these lakes extends well beyond geology alone, since their long isolation makes them potentially valuable analogues for studying how life might survive in similarly extreme, isolated environments, including those that could exist beneath the icy surfaces of certain moons elsewhere in the solar system.`,
        questions: [
          { id: "dr-21", prompt: "Which statement most precisely reflects Paragraph 1?", opts: ["Scientists have always known about liquid water beneath Antarctic ice.", "For much of the twentieth century, scientists generally assumed the ice rested on solid bedrock, without considering liquid water beneath it.", "No ice sheets exist in Antarctica.", "Antarctic bedrock has never been studied by scientists."], answer: 1, exp: "Options A, C and D all contradict the described historical assumption and the extensive ice sheets covering Antarctica." },
          { id: "dr-22", prompt: "Which statement most accurately reflects Paragraph 2?", opts: ["Radar and seismic surveys found no evidence of anything beneath the ice.", "Evidence from radar and seismic surveys suggested liquid water bodies kept unfrozen by geothermal heat and ice pressure.", "The water beneath the ice was found to be completely frozen solid.", "This discovery was made in the nineteenth century."], answer: 1, exp: "Options A and C directly contradict the described discovery of liquid water; D misstates the timeframe (1970s-1990s, not the 1800s)." },
          { id: "dr-23", prompt: "Which statement most precisely reflects Paragraph 3?", opts: ["Lake Vostok is one of the smallest subglacial lakes known.", "Lake Vostok is comparable in size to some larger lakes elsewhere and may have been isolated for millions of years.", "Lake Vostok has been in regular contact with the atmosphere.", "Lake Vostok was discovered only very recently, within the last few years."], answer: 1, exp: "Option A contradicts 'comparable in size to some of the larger lakes'; C contradicts the described isolation from the atmosphere." },
          { id: "dr-24", prompt: "Which statement most accurately reflects Paragraph 4?", opts: ["All subglacial lakes remain permanently and completely isolated from each other.", "Some subglacial lakes are connected by channels and occasionally drain and refill, detectable via satellite.", "No subglacial lake has ever been observed draining.", "Satellite measurements cannot detect any changes related to these lakes."], answer: 1, exp: "The paragraph opens with 'Not all... are permanently isolated', directly contradicting option A, and describes detectable draining events." },
          { id: "dr-25", prompt: "Which statement most precisely reflects Paragraph 5?", opts: ["Scientific interest in these lakes is limited strictly to geology.", "These lakes are of interest partly because they could serve as analogues for studying life in extreme, isolated environments elsewhere.", "These lakes have no relevance to research about other planets or moons.", "No scientist has expressed interest in studying life in these lakes."], answer: 1, exp: "The text explicitly says interest 'extends well beyond geology alone' and mentions relevance to 'moons elsewhere in the solar system' — contradicting A and C." },
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

Their use as currency was strikingly wides
