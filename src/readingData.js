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
      {
        title: "The Secret Life of Deep-Sea Vents",
        text:
`Far below the ocean's surface, where sunlight never penetrates, hydrothermal vents release mineral-rich water heated by underlying volcanic activity, creating conditions that support surprisingly abundant and diverse ecosystems entirely independent of photosynthesis, the process that sustains nearly all other life on Earth.

At the base of these ecosystems lie chemosynthetic bacteria, microorganisms capable of deriving energy from chemical reactions involving compounds such as hydrogen sulphide, rather than from sunlight, effectively performing a role analogous to that of plants in more familiar surface ecosystems.

Larger organisms found near these vents, including giant tube worms lacking mouths or digestive systems, have evolved to house these bacteria internally in a symbiotic relationship, receiving nutrients produced by their bacterial residents in exchange for providing a stable, chemical-rich habitat.

The extreme conditions surrounding hydrothermal vents, including scalding temperatures, crushing pressure, and highly acidic or toxic chemical compositions, would prove instantly lethal to the vast majority of surface-dwelling organisms, yet vent ecosystems display a remarkable degree of biodiversity found nowhere else on the planet.

Scientists studying these environments have drawn comparisons to conditions that may have existed on early Earth, and some researchers speculate that similar chemosynthetic ecosystems could theoretically exist elsewhere in the solar system, on moons such as Europa or Enceladus, where subsurface oceans are thought to lie beneath thick layers of ice.`,
        questions: [
          { id: "cg-11", prompt: "In Paragraph 1, what does 'penetrates' most likely mean?", opts: ["Damages", "Passes through or into", "Reflects away", "Freezes solid"], answer: 1, exp: "'Sunlight never penetrates' at that depth — meaning light cannot pass through the water to reach it." },
          { id: "cg-12", prompt: "In Paragraph 2, what does 'chemosynthetic' most likely mean, based on context?", opts: ["Related to producing energy from chemical reactions rather than sunlight", "Related to underwater volcanoes specifically", "A type of large sea creature", "A term for deep-sea temperature"], answer: 0, exp: "The sentence directly defines it: 'deriving energy from chemical reactions... rather than from sunlight'." },
          { id: "cg-13", prompt: "In Paragraph 3, what does 'symbiotic' most likely mean?", opts: ["Competitive and harmful to both parties", "A mutually beneficial relationship between two different organisms", "A relationship where one organism destroys another", "Unrelated organisms living far apart"], answer: 1, exp: "The worms and bacteria exchange nutrients for habitat — a clear description of mutual benefit." },
          { id: "cg-14", prompt: "In Paragraph 4, what does 'lethal' most likely mean?", opts: ["Harmless", "Deadly", "Beneficial", "Temporary"], answer: 1, exp: "'Instantly lethal to the vast majority of surface-dwelling organisms', contrasted with vent life thriving there, clearly means deadly." },
          { id: "cg-15", prompt: "In Paragraph 5, what does 'subsurface' most likely mean?", opts: ["Located above the surface", "Located beneath the surface", "Located far away in space", "Related to volcanic activity only"], answer: 1, exp: "'Subsurface oceans... thought to lie beneath thick layers of ice' directly explains the term as 'beneath the surface'." },
        ],
      },
      {
        title: "The Language of Bird Song",
        text:
`Ornithologists have long been fascinated by the complexity of bird song, a behaviour that, in many species, serves functions far more sophisticated than simple noise-making, encompassing territory defence, mate attraction, and, in some species, remarkably intricate vocal learning processes.

Unlike many animal calls, which tend to be innate and largely fixed from birth, the songs of certain bird species, including many songbirds, must be learned during a specific developmental period by listening to and mimicking adult members of their species, a process that bears intriguing similarities to human language acquisition.

Young birds deprived of exposure to adult song during this critical window often develop abnormal or simplified songs as adults, a finding that has made certain songbird species a valuable model organism for researchers studying the neurological basis of vocal learning more broadly, including implications for human speech development.

Some species exhibit remarkable vocal mimicry abilities extending well beyond their own species' repertoire, incorporating sounds from other birds, mechanical noises, or even fragments of human speech into their own vocalisations, a phenomenon whose evolutionary purpose remains a subject of ongoing scientific debate.

Researchers studying regional variation in bird song have identified distinct "dialects" among geographically separated populations of the same species, differences that can become pronounced enough that individuals from distant populations sometimes fail to respond appropriately to each other's songs during territorial or courtship encounters.`,
        questions: [
          { id: "cg-16", prompt: "In Paragraph 1, what does 'ornithologists' most likely mean?", opts: ["Scientists who study birds", "Scientists who study music", "People who train pets", "People who study rocks"], answer: 0, exp: "Their fascination with 'the complexity of bird song' identifies them as bird researchers." },
          { id: "cg-17", prompt: "In Paragraph 2, what does 'innate' most likely mean?", opts: ["Learned through careful practice", "Present from birth, not learned", "Extremely rare", "Related to territory defence only"], answer: 1, exp: "It's contrasted directly with songs that 'must be learned' — innate means the opposite, inborn." },
          { id: "cg-18", prompt: "In Paragraph 3, what does 'deprived' most likely mean?", opts: ["Given extra amounts of something", "Prevented from having or experiencing something", "Rewarded for good behaviour", "Trained more intensively"], answer: 1, exp: "'Deprived of exposure to adult song' leading to abnormal songs means they were prevented from having that exposure." },
          { id: "cg-19", prompt: "In Paragraph 4, what does 'mimicry' most likely mean?", opts: ["The ability to imitate or copy sounds", "A type of bird nest", "A method of catching insects", "A form of aggressive display"], answer: 0, exp: "'Incorporating sounds from other birds, mechanical noises... into their own vocalisations' describes imitation." },
          { id: "cg-20", prompt: "In Paragraph 5, what does 'dialects' most likely refer to, in this context?", opts: ["Different bird species entirely", "Regional variations in song among the same species", "A type of bird disease", "A method scientists use to track birds"], answer: 1, exp: "The text explicitly defines it as differences 'among geographically separated populations of the same species'." },
        ],
      },
      {
        title: "The Craft of Traditional Boatbuilding",
        text:
`Long before modern shipyards relied on computer-aided design and industrial machinery, traditional boatbuilders across many coastal cultures developed sophisticated techniques passed down through generations, often relying entirely on accumulated experiential knowledge rather than formal engineering calculations.

One such technique, known as "plank-on-frame" construction, involves first erecting a skeletal wooden frame that defines the vessel's shape, before attaching individual wooden planks to the exterior of this frame, a sequence that offers greater structural flexibility than alternative methods where the outer hull is built first.

Achieving a watertight seal between adjoining planks traditionally required caulking, a process involving forcing fibrous material, often derived from plant fibres, into the narrow seams between planks before sealing them with tar or a similar waterproof substance, a labour-intensive task requiring considerable skill.

Many traditional boatbuilding techniques have proven remarkably durable, with vessels constructed using centuries-old methods still functioning effectively in various fishing and cultural contexts today, even as industrial fibreglass and metal-hulled vessels have come to dominate large-scale commercial shipping.

Recognising the cultural and historical value of these disappearing skills, various maritime museums and cultural preservation organisations have established apprenticeship programmes intended to ensure that specialised traditional boatbuilding knowledge is not lost entirely as the number of practitioners with direct experiential knowledge continues to dwindle.`,
        questions: [
          { id: "cg-21", prompt: "In Paragraph 1, what does 'experiential' most likely mean?", opts: ["Based on direct practice and experience", "Based on computer calculations", "Based on random guessing", "Based on scientific formulas"], answer: 0, exp: "It's contrasted with 'formal engineering calculations' — experiential knowledge comes from direct practice." },
          { id: "cg-22", prompt: "In Paragraph 2, what does 'erecting' most likely mean?", opts: ["Demolishing or removing", "Building or putting up", "Painting or decorating", "Selling or trading"], answer: 1, exp: "'Erecting a skeletal wooden frame' describes constructing/putting up the frame." },
          { id: "cg-23", prompt: "In Paragraph 3, what does 'caulking' most likely refer to?", opts: ["A type of boat engine", "Sealing gaps between planks to make them watertight", "A method of painting boats", "A type of sail material"], answer: 1, exp: "The sentence explicitly describes the process: forcing fibre into seams and sealing with tar for a watertight result." },
          { id: "cg-24", prompt: "In Paragraph 4, what does 'durable' most likely mean?", opts: ["Fragile and short-lived", "Long-lasting and able to withstand wear", "Extremely expensive", "Difficult to construct"], answer: 1, exp: "Vessels 'still functioning effectively' after centuries directly illustrates durability." },
          { id: "cg-25", prompt: "In Paragraph 5, what does 'dwindle' most likely mean?", opts: ["Increase steadily", "Decrease gradually", "Remain exactly the same", "Multiply rapidly"], answer: 1, exp: "The number of practitioners 'continues to dwindle' as skills are described as 'disappearing' — meaning a gradual decrease." },
        ],
      },
    ],
  },
  {
    id: "paraphrase",
    title: "Paraphrase Recognition",
    whenToUse: "Constantly. Questions almost never use the same words as the text — the exam specifically tests whether you recognise the same idea in different wording.",
    howTo: [
      "Don't search the text for an exact word match to the question — if you're looking for those exact words, you'll likely miss the answer.",
      "Learn to spot synonym pairs: increase → rise / grow; important → significant / crucial; because → due to / as a result of.",
      "It's not just single words that change — structure changes too: active voice can become passive, a noun can become a verb ('the destruction of' → 'destroyed').",
      "If a question and a piece of text match almost word for word, that's often a trap (distractor) — the real answer is usually hidden in a paraphrased spot nearby.",
    ],
    example: {
      text: "Text: \"...allow trees to exchange... chemical warning signals.\" Question: \"Trees can alert each other to danger using chemicals.\"",
      note: "'exchange chemical warning signals' and 'alert each other to danger using chemicals' express the same idea in completely different words. This is what about 90% of question-text matches actually look like.",
    },
    passages: [
      {
        title: "The Rise of Remote Work",
        text:
`The proportion of employees working remotely at least part of the time increased dramatically following 2020, and many organisations that initially viewed the shift as a temporary emergency measure have since made it a permanent feature of their operations.

Proponents argue that remote work arrangements can improve employee wellbeing by eliminating lengthy commutes and offering greater flexibility over daily schedules, while also allowing companies to recruit talent from a much wider geographic pool than a single office location would normally permit.

Critics, however, contend that extended periods away from a shared physical workspace can gradually erode the informal social bonds and spontaneous collaboration that often drive innovation within a team, particularly for employees who joined an organisation after remote arrangements were already in place.

In response to these competing concerns, a growing number of companies have adopted hybrid models, requiring staff to be present in the office for a specified number of days each week while permitting remote work for the remainder, in an attempt to balance flexibility against the perceived benefits of in-person interaction.

Long-term research into the productivity effects of these various arrangements remains limited, and existing studies often produce conflicting results depending on the industry, role type, and specific work arrangement being examined, making broad generalisations about which approach performs best difficult to support with confidence.`,
        questions: [
          { id: "pp-1", prompt: "Which is the best paraphrase of: 'The proportion of employees working remotely at least part of the time increased dramatically following 2020'?", opts: ["After 2020, far more employees began working from home at least some of the time.", "Before 2020, most employees already worked remotely part-time.", "After 2020, all employees were required to work remotely full-time.", "The number of remote employees decreased sharply after 2020."], answer: 0, exp: "Option B reverses the timing, C overstates with 'all/full-time', and D reverses the direction of change." },
          { id: "pp-2", prompt: "Which is the best paraphrase of: 'remote work arrangements can improve employee wellbeing by eliminating lengthy commutes'?", opts: ["Remote work may boost employee wellbeing partly because it removes long journeys to work.", "Remote work always harms employee wellbeing due to isolation.", "Commuting has no effect on employee wellbeing at all.", "Employees are required to commute even when working remotely."], answer: 0, exp: "Option B reverses the claim's direction; C and D contradict the idea that commuting affects wellbeing." },
          { id: "pp-3", prompt: "Which is the best paraphrase of: 'extended periods away from a shared physical workspace can gradually erode... informal social bonds and spontaneous collaboration'?", opts: ["Working away from a shared office for a long time can slowly weaken casual relationships and unplanned teamwork among colleagues.", "Physical offices have no impact on team collaboration.", "Remote work instantly destroys all workplace relationships.", "Social bonds only form in remote work settings."], answer: 0, exp: "Option C overstates with 'instantly' and 'all', when the original says 'gradually'; B and D contradict the original claim." },
          { id: "pp-4", prompt: "Which is the best paraphrase of: 'a growing number of companies have adopted hybrid models, requiring staff to be present in the office for a specified number of days each week'?", opts: ["More and more companies now use hybrid arrangements, where employees must come to the office for a set number of days weekly.", "All companies have abandoned hybrid models in favour of fully remote work.", "Hybrid models require employees to work from home every day.", "No companies currently use hybrid work arrangements."], answer: 0, exp: "Option B is the opposite claim; C misdescribes 'hybrid' as fully remote; D directly contradicts 'a growing number'." },
          { id: "pp-5", prompt: "Which is the best paraphrase of: 'Long-term research... remains limited, and existing studies often produce conflicting results'?", opts: ["There isn't much long-term research yet, and the studies that do exist don't always agree with each other.", "Extensive long-term research has conclusively proven which work arrangement is most productive.", "All studies on this topic agree completely with one another.", "No research has ever been conducted on this topic."], answer: 0, exp: "Option B overstates certainty; C contradicts 'conflicting results'; D overstates 'remains limited' as 'none'." },
        ],
      },
      {
        title: "Coral Reefs and Ocean Acidification",
        text:
`As atmospheric carbon dioxide levels continue to rise, oceans absorb a substantial portion of this excess gas, triggering a chemical reaction that gradually lowers the pH of seawater, a process commonly referred to as ocean acidification.

This shift in ocean chemistry poses a particular threat to coral reefs, since the calcium carbonate structures that corals rely on to build their skeletons become more difficult to form and more prone to dissolving as surrounding waters become increasingly acidic.

Beyond corals themselves, a wide range of other marine organisms that construct shells or skeletons from calcium carbonate, including certain plankton species at the base of the marine food web, face similar structural challenges under acidifying conditions.

Some researchers have identified certain coral species and populations that appear more resilient to these chemical changes than others, raising cautious hope that selective conservation efforts focused on naturally hardier populations might help preserve at least some reef ecosystems into the future.

Nonetheless, most scientists studying the issue emphasise that reducing global carbon emissions remains the only measure capable of addressing ocean acidification at the scale required, since localised conservation efforts alone cannot offset a chemical process occurring across the entire planet's oceans.`,
        questions: [
          { id: "pp-6", prompt: "Which is the best paraphrase of: 'oceans absorb a substantial portion of this excess gas, triggering a chemical reaction that gradually lowers the pH of seawater'?", opts: ["The ocean takes in a large amount of the extra carbon dioxide, which slowly makes seawater more acidic.", "The ocean releases carbon dioxide into the atmosphere, raising its pH.", "Seawater pH has remained completely stable despite rising carbon dioxide.", "This process happens instantly rather than gradually."], answer: 0, exp: "Option B reverses the direction of the process; C contradicts the claim entirely; D contradicts 'gradually'." },
          { id: "pp-7", prompt: "Which is the best paraphrase of: 'the calcium carbonate structures... become more difficult to form and more prone to dissolving'?", opts: ["It becomes harder for corals to build their skeletal structures, and these structures are more likely to dissolve.", "Coral skeletons become stronger and more resistant to dissolving.", "Corals no longer need calcium carbonate to survive.", "Only fully grown corals are affected by this issue."], answer: 0, exp: "Option B is the opposite claim; C and D introduce unsupported claims not present in the original." },
          { id: "pp-8", prompt: "Which is the best paraphrase of: 'a wide range of other marine organisms that construct shells or skeletons from calcium carbonate... face similar structural challenges'?", opts: ["Many other sea creatures that build shells from calcium carbonate encounter comparable problems.", "Only coral is affected by ocean acidification; no other species are at risk.", "Marine plankton are entirely immune to acidification.", "Calcium carbonate structures are unaffected by ocean chemistry."], answer: 0, exp: "Option B directly contradicts 'a wide range of other... organisms'; C contradicts the specific mention of plankton being affected." },
          { id: "pp-9", prompt: "Which is the best paraphrase of: 'certain coral species... appear more resilient to these chemical changes than others, raising cautious hope'?", opts: ["Some coral types seem to handle these chemical changes better than others, offering a degree of hope.", "All coral species are equally vulnerable, with no exceptions.", "Scientists have proven conclusively that all reefs will survive.", "No coral populations show any resistance to acidification."], answer: 0, exp: "Option B contradicts 'more resilient than others'; C overstates 'cautious hope' as proof; D directly contradicts the claim." },
          { id: "pp-10", prompt: "Which is the best paraphrase of: 'most scientists... emphasise that reducing global carbon emissions remains the only measure capable of addressing ocean acidification at the scale required'?", opts: ["The majority of scientists believe that cutting global carbon emissions is the only way to tackle this problem on a large enough scale.", "Scientists agree that local conservation alone can fully solve ocean acidification.", "No solution to ocean acidification currently exists, according to scientists.", "All scientists disagree about how to address this issue."], answer: 0, exp: "Option B contradicts the text's claim that local efforts 'alone cannot offset' the problem; D contradicts 'most scientists emphasise' (implying general agreement)." },
        ],
      },
      {
        title: "The Growth of Electric Vehicles",
        text:
`Global sales of electric vehicles have grown at a remarkable pace over the past decade, driven by a combination of falling battery costs, expanding charging infrastructure, and increasingly stringent government emissions regulations in many major automotive markets.

Despite this rapid growth, electric vehicles still represent a relatively small fraction of the total global vehicle fleet, meaning that even continued high growth rates in new sales will take considerable time to meaningfully reduce the overall environmental footprint of road transportation as a whole.

Battery technology remains a central constraint on further adoption, since current lithium-ion batteries are relatively expensive to manufacture, require specific rare minerals whose extraction raises its own environmental and ethical concerns, and gradually lose capacity over repeated charging cycles.

Charging infrastructure availability varies dramatically between regions, with some countries investing heavily in extensive public charging networks while others lag considerably behind, a disparity that continues to influence consumer confidence in purchasing an electric vehicle for long-distance travel.

Industry analysts generally expect continued growth in electric vehicle adoption over the coming decade, though most acknowledge that achieving full replacement of internal combustion vehicles will likely require sustained advances in battery technology alongside substantial, continued infrastructure investment.`,
        questions: [
          { id: "pp-11", prompt: "Which is the best paraphrase of: 'Global sales of electric vehicles have grown at a remarkable pace over the past decade'?", opts: ["Electric vehicle sales worldwide have increased very quickly over the last ten years.", "Electric vehicle sales have declined steadily over the past decade.", "Electric vehicles were invented exactly ten years ago.", "Sales of electric vehicles have remained completely flat for a decade."], answer: 0, exp: "Option B reverses the direction; C and D are unsupported or contradicted by 'grown at a remarkable pace'." },
          { id: "pp-12", prompt: "Which is the best paraphrase of: 'electric vehicles still represent a relatively small fraction of the total global vehicle fleet'?", opts: ["Electric vehicles make up only a small portion of all vehicles worldwide right now.", "Electric vehicles now make up the majority of the world's vehicles.", "All vehicles worldwide are now electric.", "The total global vehicle fleet has stopped growing."], answer: 0, exp: "Options B and C directly contradict 'small fraction'; D introduces an unrelated claim." },
          { id: "pp-13", prompt: "Which is the best paraphrase of: 'current lithium-ion batteries are relatively expensive to manufacture... and gradually lose capacity over repeated charging cycles'?", opts: ["Today's batteries cost a lot to make and slowly hold less charge the more they're used.", "Batteries are extremely cheap and never lose any capacity.", "Batteries improve in capacity the more they are charged.", "Battery manufacturing has no environmental concerns at all."], answer: 0, exp: "Options B and C are the opposite of the claim; D contradicts the mention of environmental/ethical concerns." },
          { id: "pp-14", prompt: "Which is the best paraphrase of: 'Charging infrastructure availability varies dramatically between regions'?", opts: ["How much charging infrastructure exists is very different depending on the region.", "Charging infrastructure is identical in every country.", "No country has any charging infrastructure yet.", "Charging infrastructure has no effect on consumer decisions."], answer: 0, exp: "Option B is the opposite claim; D contradicts the paragraph's final clause about consumer confidence." },
          { id: "pp-15", prompt: "Which is the best paraphrase of: 'achieving full replacement of internal combustion vehicles will likely require sustained advances in battery technology alongside... infrastructure investment'?", opts: ["Fully replacing petrol/diesel cars will probably need ongoing battery improvements and continued investment in infrastructure.", "Internal combustion vehicles have already been completely replaced.", "No further battery technology improvements are needed.", "Infrastructure investment is irrelevant to electric vehicle adoption."], answer: 0, exp: "Option B overstates as already complete; C and D contradict the stated requirements." },
        ],
      },
      {
        title: "The Psychology of Nostalgia",
        text:
`For much of the twentieth century, nostalgia was regarded by psychologists primarily as a negative emotional state, often associated with homesickness or an inability to adjust to present circumstances, a view that has shifted considerably following more recent research into its psychological functions.

Contemporary research suggests that nostalgic reflection, rather than being purely maladaptive, can serve several beneficial psychological functions, including strengthening a sense of personal identity, increasing feelings of social connectedness, and providing comfort during periods of stress or uncertainty.

Experimental studies have found that inducing nostalgic feelings in participants, often through recalling a cherished memory or listening to music from an earlier period of their life, can measurably increase reported feelings of optimism about the future, an effect that initially struck researchers as counterintuitive.

Not all instances of nostalgic reflection produce equally positive effects, however; researchers have found that the benefits appear strongest when nostalgic memories are recalled voluntarily and reflected upon positively, rather than being triggered involuntarily in contexts associated with loss or distress.

This shift in scientific understanding has had practical applications beyond academic psychology, with some therapeutic approaches now incorporating structured nostalgic reflection as a tool for supporting emotional wellbeing, particularly among older adults or individuals experiencing significant life transitions.`,
        questions: [
          { id: "pp-16", prompt: "Which is the best paraphrase of: 'nostalgia was regarded... as a negative emotional state... a view that has shifted considerably following more recent research'?", opts: ["Psychologists used to see nostalgia mainly negatively, but this view has changed a lot due to newer research.", "Psychologists have always viewed nostalgia as entirely positive.", "No research has ever been done on nostalgia.", "The view of nostalgia has remained completely unchanged for a century."], answer: 0, exp: "Option D directly contradicts 'shifted considerably'; B and C misrepresent the described history." },
          { id: "pp-17", prompt: "Which is the best paraphrase of: 'nostalgic reflection... can serve several beneficial psychological functions, including strengthening... personal identity, increasing... social connectedness'?", opts: ["Thinking nostalgically can help people in several positive ways, such as feeling more connected to others and having a stronger sense of who they are.", "Nostalgia has been proven to have no psychological benefits whatsoever.", "Nostalgia only affects a person's diet.", "Social connectedness is completely unrelated to nostalgia."], answer: 0, exp: "Options B and D directly contradict the listed benefits; C introduces an unrelated, unsupported claim." },
          { id: "pp-18", prompt: "Which is the best paraphrase of: 'inducing nostalgic feelings in participants... can measurably increase reported feelings of optimism about the future'?", opts: ["Making people feel nostalgic can actually make them feel more hopeful about what's ahead.", "Nostalgic feelings always make people feel worse about the future.", "Optimism has no connection to memory recall.", "This effect was expected by all researchers from the start."], answer: 0, exp: "Option B is the opposite effect; D contradicts 'counterintuitive', which implies researchers didn't expect it." },
          { id: "pp-19", prompt: "Which is the best paraphrase of: 'the benefits appear strongest when nostalgic memories are recalled voluntarily... rather than being triggered involuntarily in contexts associated with loss or distress'?", opts: ["Nostalgia tends to help most when people choose to remember positively, not when it's triggered by upsetting situations.", "All nostalgic memories produce identical benefits regardless of context.", "Nostalgia only has negative effects in every circumstance.", "Involuntary nostalgic memories always produce the strongest benefits."], answer: 0, exp: "Option D is the reverse of the claim; B and C ignore the described distinction between voluntary and involuntary recall." },
          { id: "pp-20", prompt: "Which is the best paraphrase of: 'some therapeutic approaches now incorporating structured nostalgic reflection as a tool for supporting emotional wellbeing'?", opts: ["Certain therapy methods now use organised nostalgic reflection to help support people's emotional health.", "No therapeutic approaches have ever used nostalgia.", "Nostalgia is banned from all forms of therapy.", "This shift has had no practical applications beyond theory."], answer: 0, exp: "Options B and C directly contradict the claim; D contradicts the paragraph's opening about practical applications." },
        ],
      },
      {
        title: "The Evolution of Video Game Storytelling",
        text:
`Video games have evolved considerably as a storytelling medium since their early decades, when narrative elements were typically minimal or entirely absent, serving mainly as a thin justification for gameplay mechanics rather than a meaningful component of the overall experience.

Advances in technology, including improved graphics, voice acting, and expanded memory capacity, have progressively allowed developers to construct more elaborate narratives, complex character development, and branching storylines that respond meaningfully to player choices throughout a game.

Some contemporary games have been praised by critics for achieving a level of emotional depth and narrative complexity comparable to acclaimed works in film or literature, prompting ongoing academic debate about whether video games should be considered a legitimate artistic medium in their own right.

Not all developers prioritise narrative complexity, however; many successful games continue to focus primarily on gameplay mechanics, competitive multiplayer systems, or open-ended sandbox experiences, where storytelling plays a secondary or even negligible role in overall player engagement.

Industry analysts note that the diversity of approaches within the medium, ranging from narrative-driven experiences to purely mechanics-focused titles, reflects the breadth of what players seek from games, suggesting that narrative-rich and narrative-light approaches are likely to continue coexisting rather than one displacing the other.`,
        questions: [
          { id: "pp-21", prompt: "Which is the best paraphrase of: 'narrative elements were typically minimal or entirely absent, serving mainly as a thin justification for gameplay mechanics'?", opts: ["Early games usually had very little or no story, which mostly just gave a basic reason for the gameplay to exist.", "Early video games always had complex, detailed storylines.", "Gameplay mechanics were unimportant in early video games.", "Narrative was the most important part of early games."], answer: 0, exp: "Options B and D are the opposite of the claim; C contradicts the described focus on mechanics over story." },
          { id: "pp-22", prompt: "Which is the best paraphrase of: 'Advances in technology... have progressively allowed developers to construct more elaborate narratives, complex character development, and branching storylines'?", opts: ["As technology improved, game creators were gradually able to build richer stories, deeper characters, and plots that could change based on choices.", "Technology has made storytelling in games simpler over time.", "Character development has become impossible with modern technology.", "Branching storylines were common before any technological advances."], answer: 0, exp: "Option B reverses the claim's direction; C and D contradict the described progression enabled by technology." },
          { id: "pp-23", prompt: "Which is the best paraphrase of: 'Some contemporary games have been praised... for achieving a level of emotional depth and narrative complexity comparable to acclaimed works in film or literature'?", opts: ["Certain modern games have received praise for having stories as emotionally rich and complex as celebrated films or books.", "No video game has ever been compared favourably to film or literature.", "All video games are considered inferior to films in every respect.", "Critics have universally condemned narrative in video games."], answer: 0, exp: "Options B, C and D all contradict the described praise and comparison to acclaimed film/literature." },
          { id: "pp-24", prompt: "Which is the best paraphrase of: 'many successful games continue to focus primarily on gameplay mechanics... where storytelling plays a secondary or even negligible role'?", opts: ["A lot of popular games still focus mainly on how they play, with story being a minor or almost unimportant element.", "All successful games prioritise storytelling above everything else.", "Gameplay mechanics have disappeared from modern games entirely.", "Storytelling is always the most important element in successful games."], answer: 0, exp: "Options B and D directly contradict this paragraph's point that many games treat story as secondary." },
          { id: "pp-25", prompt: "Which is the best paraphrase of: 'narrative-rich and narrative-light approaches are likely to continue coexisting rather than one displacing the other'?", opts: ["Games with lots of story and games with little story will probably both keep existing side by side, rather than one type disappearing.", "Narrative-rich games will completely replace all other types of games.", "Narrative-light games have already disappeared from the market.", "Only one storytelling approach can succeed in the future."], answer: 0, exp: "Options B, C and D all contradict 'coexisting rather than one displacing the other'." },
        ],
      },
    ],
  },
  {
    id: "time-management",
    title: "Time Management",
    whenToUse: "On the real exam: 3 passages, 40 questions, 60 minutes (including transferring answers).",
    howTo: [
      "On average, aim for about 20 minutes per passage. But Passage 3 is usually the hardest — if you feel stuck, it's often better to move on and come back than to lose time there.",
      "You don't have to tackle passages in order 1→2→3. Many test-takers skim all three first and start with whichever looks easiest.",
      "Don't get stuck on one question for more than 1-2 minutes — put down any answer (never leave a blank; there's no penalty for a wrong answer) and move on, returning later if time allows.",
      "Save 2-3 minutes at the end to check: have you transferred all answers correctly, and does every Summary Completion answer respect the word limit?",
    ],
    example: {
      text: "A sample time plan: 17 minutes for Passage 1 → 20 minutes for Passage 2 → 23 minutes for Passage 3.",
      note: "Since passages tend to get harder, it makes sense to budget slightly less time for the first (usually easiest) and more for the third — but the exact split is something you calibrate through practice.",
    },
    practice: [
      { id: "tm-1", text: "You've just started the Reading test. What's a sensible first move before diving into Passage 1?", opts: ["Immediately start reading Passage 1 word for word from the beginning.", "Quickly skim all three passages first to judge which looks easiest.", "Read all 40 questions in detail before looking at any passage.", "Start with Passage 3, since it's always the hardest and needs the most time."], answer: 1, exp: "A quick skim across all three helps you decide a sensible order and calibrate expectations, without wasting the limited 60 minutes." },
      { id: "tm-2", text: "You're 22 minutes into the test and still on Question 8 of Passage 1 (out of about 13-14 questions). What should you do?", opts: ["Keep going at the same pace no matter what — Passage 1 must be finished perfectly.", "Recognise you're behind schedule, answer as best you can, and move toward wrapping up this passage soon.", "Abandon Passage 1 entirely and skip straight to Passage 3.", "Go back and re-read the whole passage from the start to check for mistakes."], answer: 1, exp: "Time-boxing means adjusting your pace when you notice you're behind, not rigidly pushing on or panicking and abandoning a passage entirely." },
      { id: "tm-3", text: "You've spent nearly 3 minutes on a single Matching Headings question and still aren't sure. What's the best approach?", opts: ["Keep analysing until you're 100% certain, however long it takes.", "Make your best guess now, mark it to revisit if time allows, and move on.", "Leave it blank and come back only if you finish everything else with time to spare.", "Skip the entire task type for the rest of the test."], answer: 1, exp: "Leaving answers blank risks losing marks for no reason (there's no penalty for wrong answers) — always put something down before moving on." },
      { id: "tm-4", text: "With 5 minutes left in the test and 3 questions still unanswered, what should you prioritise?", opts: ["Carefully re-reading the passage one more time for accuracy.", "Filling in an answer for every remaining question, even a guess.", "Reviewing questions you've already answered correctly.", "Skipping the last few questions since they don't matter much."], answer: 1, exp: "With no penalty for incorrect answers, guessing on every remaining question maximises your possible score — leaving them blank guarantees zero marks for those." },
      { id: "tm-5", text: "Which order of tackling the three passages is most defensible?", opts: ["Always strictly in the order given (1, 2, 3), regardless of content.", "Whichever order feels most efficient after a quick skim — often, but not always, easier passages first.", "Always start with Passage 3, since it's traditionally the hardest.", "Random order, since order doesn't affect performance."], answer: 1, exp: "There's no rule requiring passages to be done in order — many test-takers benefit from starting with whichever seems most approachable after a quick skim." },
      { id: "tm-6", text: "You finish Passage 2 with 4 minutes to spare compared to your plan. What's the best use of this extra time?", opts: ["Immediately move on and try to bank the extra minutes for later.", "Take a short break before continuing.", "Use it to double-check your Passage 2 answers, then move to Passage 3.", "Go back and completely redo Passage 1 from scratch."], answer: 2, exp: "A quick check of what you've just completed, before its details fade from memory, is more useful than banking time vaguely or restarting earlier work." },
      { id: "tm-7", text: "For Summary Completion, you're unsure between two possible words for a gap. What's a reasonable time-management approach?", opts: ["Spend as long as needed until you're fully certain, even if it takes 5+ minutes.", "Pick the more grammatically fitting option quickly, mark it for review, and continue.", "Leave the gap blank permanently rather than risk a wrong guess.", "Restart the entire Summary Completion task from the beginning."], answer: 1, exp: "A quick, grammatically-informed choice keeps you moving; you can revisit it later if time allows, but stalling indefinitely on one gap costs you elsewhere." },
      { id: "tm-8", text: "Roughly how long should transferring and checking answers take at the very end, if you're managing time well?", opts: ["0 minutes — there's no time for this.", "2-3 minutes, reserved deliberately in your overall time plan.", "15-20 minutes, checking every single answer in depth.", "It doesn't matter, since answers are graded electronically regardless."], answer: 1, exp: "Reserving a small, deliberate buffer (2-3 minutes) for final checks is realistic and catches careless errors without eating into passage-solving time." },
      { id: "tm-9", text: "You notice Passage 3 has an unusually dense, technical topic you find difficult. What's a reasonable strategy?", opts: ["Panic and give up on the passage entirely.", "Allocate slightly more time to it than the others, since difficulty was anticipated, but keep a firm cap.", "Spend unlimited time on it since it's 'the important one'.", "Skip straight to guessing on every question without reading anything."], answer: 1, exp: "Anticipating a harder passage and budgeting slightly more time for it, within a firm limit, beats both giving up and having no plan at all." },
      { id: "tm-10", text: "What's the main risk of not practising with a timer before the real exam?", opts: ["There is no risk — timing only matters on exam day.", "You may misjudge your natural pace and run out of time unexpectedly during the real test.", "Timed practice makes you slower overall.", "Untimed practice is always more effective for learning content."], answer: 1, exp: "Practising under real time constraints is the only way to accurately calibrate your pace — without it, exam-day time pressure often comes as an unpleasant surprise." },
      { id: "tm-11", text: "You realise with 10 minutes remaining that you haven't started Passage 3 at all. What's the most sensible approach?", opts: ["Give up on Passage 3 entirely and leave it blank.", "Skim the questions quickly, answer any you can based on obvious keyword matches, and guess on the rest.", "Spend all 10 minutes reading Passage 3 carefully from start to finish.", "Go back and redo Passage 1 instead."], answer: 1, exp: "With very little time left, quickly targeting easy wins and guessing the rest maximises your score far better than a slow full read or giving up entirely." },
      { id: "tm-12", text: "Which is a better use of the first 30 seconds after starting a new passage?", opts: ["Reading every question in full detail before looking at the passage.", "Quickly skimming the passage's title and structure to build a general sense of its topic.", "Immediately guessing on all questions without reading anything.", "Memorising the passage word for word."], answer: 1, exp: "A brief skim orients you to the topic and structure, making the detailed reading that follows faster and more targeted." },
      { id: "tm-13", text: "You've completed Passage 1 in 15 minutes, faster than planned. What should you do with the saved time?", opts: ["Waste it by doing nothing.", "Carry it forward mentally as extra buffer for a potentially harder passage later.", "Redo Passage 1 twice for no reason.", "Immediately end the test early."], answer: 1, exp: "Banking saved time as flexible buffer for a harder passage is more useful than any of the alternatives." },
      { id: "tm-14", text: "For a Matching Features question with many options, what's an efficient approach?", opts: ["Read every single option in full detail multiple times before starting.", "Scan for names or key terms in the question first, then locate them efficiently in the text.", "Randomly guess without reading anything.", "Skip all Matching Features questions on principle."], answer: 1, exp: "Targeted scanning for specific names or terms is far faster than repeatedly reading every option in full." },
      { id: "tm-15", text: "True or false: it's generally a good idea to write very long, detailed notes in the margin for every question.", opts: ["True — detailed notes are always worth the time.", "False — brief keyword notes are usually more time-efficient than long notes.", "True, but only for Passage 3.", "False — no notes should ever be taken."], answer: 1, exp: "Short keyword notes capture what's needed without eating into your limited time, unlike lengthy notes." },
      { id: "tm-16", text: "You're unsure whether to double-check your Passage 1 answers now or wait until the very end. What's generally best?", opts: ["Check immediately after each passage while it's fresh, if time allows, rather than saving all checking for the very end.", "Never check any answers at all.", "Only check answers for Passage 3.", "Wait until after the test has ended to check."], answer: 0, exp: "Checking while the passage is still fresh in memory is more effective than trying to recall details much later." },
      { id: "tm-17", text: "Which is the more realistic time-management goal for someone practising at home?", opts: ["Always finishing 20 minutes early on every practice test.", "Gradually improving pace through repeated timed practice, tracking where time is lost.", "Never practising under time pressure at all.", "Memorising all possible passage topics in advance."], answer: 1, exp: "Steady, tracked improvement through timed practice is a realistic and effective goal, unlike the other options." },
      { id: "tm-18", text: "If you find yourself re-reading the same sentence three or four times without understanding it, what's a reasonable response?", opts: ["Keep re-reading it as many times as needed, however long that takes.", "Move on temporarily, answer other questions, and return to it with fresh eyes if time allows.", "Immediately give up on the entire passage.", "Skip the rest of the test entirely."], answer: 1, exp: "Stepping away and returning later, rather than getting stuck, protects your overall time budget." },
      { id: "tm-19", text: "Which statement about guessing is accurate for the IELTS Reading test?", opts: ["Wrong answers are penalised, so guessing is risky.", "There's no penalty for wrong answers, so guessing is always better than leaving a blank.", "Guessing is against the exam rules.", "Guessing only works for Multiple Choice questions."], answer: 1, exp: "IELTS Reading has no penalty for incorrect answers, so an educated (or even random) guess is always better than a blank." },
      { id: "tm-20", text: "What's a practical way to build better exam-day time awareness before the real test?", opts: ["Avoid checking the clock during practice tests entirely.", "Practice with a visible timer and periodically check progress against a rough per-passage schedule.", "Only ever practice without any time limit.", "Rely on the exam invigilator to manage your time for you."], answer: 1, exp: "Practising with a timer and checkpoints builds the pacing instincts needed for the real, timed exam." },
      { id: "tm-21", text: "You have exactly 1 minute left and one Summary Completion gap unanswered. What should you do?", opts: ["Leave it blank since there's no time to think it through properly.", "Write your best guess based on grammar and any recalled context, even under time pressure.", "Spend the last minute reviewing already-correct answers instead.", "Skip straight to submitting without attempting it."], answer: 1, exp: "A quick, informed guess still has a chance of being correct — a blank guarantees zero marks." },
      { id: "tm-22", text: "Which is a more efficient way to handle question types you find personally difficult, like Matching Headings?", opts: ["Practice them extensively beforehand so they take less time on test day.", "Avoid ever practising them and hope they don't appear.", "Skip them entirely on the real test regardless of the time available.", "Assume they'll magically become easy without practice."], answer: 0, exp: "Targeted practice on your weaker question types is the only reliable way to speed them up before the real exam." },
      { id: "tm-23", text: "Why is it useful to know the typical structure of the IELTS Reading test (3 passages, increasing difficulty) in advance?", opts: ["It has no practical use for time management.", "It allows you to set realistic per-passage time expectations rather than being surprised mid-test.", "It guarantees a perfect score regardless of preparation.", "It means you don't need to read the passages at all."], answer: 1, exp: "Knowing the structure lets you plan your time budget realistically instead of reacting to surprises mid-test." },
      { id: "tm-24", text: "If a Matching Information question asks you to find where in the text a statistic is mentioned, what's the time-efficient approach?", opts: ["Read the entire passage in full detail from start to finish for every single question.", "Scan specifically for numbers or statistical language relevant to the question, rather than reading everything.", "Guess randomly without scanning at all.", "Skip the passage entirely."], answer: 1, exp: "Targeted scanning for the specific type of information needed (a statistic) is far faster than full, detailed reading." },
      { id: "tm-25", text: "Overall, which mindset best supports good time management on test day?", opts: ["Perfectionism — refusing to move on until every answer feels 100% certain.", "Flexibility — adjusting pace in response to how the test is actually going, rather than rigidly following a fixed plan no matter what.", "Panic — abandoning your plan entirely at the first sign of difficulty.", "Indifference — not tracking time at all."], answer: 1, exp: "Flexibility — adjusting based on real progress — outperforms both rigid perfectionism and panic or indifference." },
    ],
  },
  {
    id: "common-traps",
    title: "Common Examiner Traps",
    whenToUse: "On any task type — the exam deliberately includes options that look correct at first glance.",
    howTo: [
      "Number substitution: the text says '15%', a wrong option says '50%' or '1.5%'. Always double-check figures directly rather than relying on memory.",
      "Negation: adding 'not', 'except', 'unless' reverses meaning. Read negating words carefully — they're easy for the eye to skip over.",
      "Matching words ≠ matching meaning: a wrong option can reuse the text's exact words, but in a different order or context, changing what they mean.",
      "Overgeneralisation: the text says 'some researchers believe', but a wrong option states it as universally accepted fact ('scientists have proven').",
    ],
    example: {
      text: "Text: \"Some scientists argue that this challenges the traditional view.\" Trap: \"Scientists have proven that competition does not exist in forests.\"",
      note: "'Some scientists argue' (the opinion of a subset) has been turned into 'have proven' (an established fact) — a classic overgeneralisation trap that's easy to mistake for a correct answer if you're not reading carefully.",
    },
    passages: [
      {
        title: "The Economics of Urban Beekeeping",
        text:
`Over the past fifteen years, urban beekeeping has grown into a widespread hobby and, for some, a modest commercial enterprise, with an estimated 35% increase in registered hives in major cities across Europe and North America since 2010.

Proponents argue that city environments, somewhat counterintuitively, can offer bees a more diverse and less pesticide-exposed foraging landscape than many industrial agricultural areas, where large monoculture fields limit flower variety and chemical use is often heavier.

Not everyone views the trend favourably, however. Some ecologists caution that a rapid rise in managed honeybee colonies within a limited urban area can create excessive competition for available flowers, potentially disadvantaging wild native bee species that already face pressure from habitat loss.

A small number of cities have responded to these concerns by introducing hive-density regulations, capping the number of colonies permitted per unit of land area in a given district, though such policies currently remain the exception rather than the rule.

Researchers generally agree that further long-term monitoring is needed before firm conclusions can be drawn about the net ecological impact of urban beekeeping, particularly regarding its effects on wild pollinator populations in densely hived areas.`,
        questions: [
          { id: "ct-1", prompt: "According to the text, by what percentage did registered urban hives increase since 2010?", opts: ["15%", "35%", "50%", "10%"], answer: 1, exp: "The text says '35% increase... since 2010'. The '15' trap comes from confusing it with 'fifteen years' mentioned in the same sentence." },
          { id: "ct-2", prompt: "Which statement accurately reflects Paragraph 3?", opts: ["All ecologists agree urban beekeeping is entirely harmless to wild bees.", "Some ecologists are concerned that urban beekeeping could disadvantage wild native bee species.", "No wild bee species face any pressure from habitat loss.", "Ecologists have proven urban beekeeping causes no competition for flowers."], answer: 1, exp: "Options A, C and D each insert an absolute claim ('all', 'no', 'proven... no') the text doesn't support — classic traps versus the actual 'some ecologists caution' wording." },
          { id: "ct-3", prompt: "Which best reflects what Paragraph 2 says about city environments for bees?", opts: ["City environments are always better for bees than any farmland.", "City environments may sometimes offer more diverse, less pesticide-exposed foraging than some industrial agricultural areas.", "All industrial farms use excessive pesticides.", "Bees cannot survive in agricultural areas at all."], answer: 1, exp: "The original uses softened language ('somewhat counterintuitively... can offer', 'many industrial agricultural areas') — the other options convert this into absolute, universal claims." },
          { id: "ct-4", prompt: "According to Paragraph 4, how many cities have introduced hive-density regulations?", opts: ["Most cities", "All cities", "A small number of cities", "No cities"], answer: 2, exp: "The text specifically says 'a small number of cities' and that such policies 'remain the exception rather than the rule' — 'most' or 'all' would misrepresent this scope." },
          { id: "ct-5", prompt: "Which best reflects Paragraph 5?", opts: ["Researchers have already reached firm, final conclusions about urban beekeeping's ecological impact.", "Researchers generally believe more long-term monitoring is still needed before firm conclusions can be drawn.", "No research has ever been conducted on this topic.", "All researchers completely disagree with each other about this topic."], answer: 1, exp: "The text explicitly says further monitoring 'is needed before firm conclusions can be drawn' — the opposite of already having reached firm conclusions." },
        ],
      },
      {
        title: "The Debate Over Standardised Testing",
        text:
`Standardised testing has long served as a central tool for evaluating student performance in education systems worldwide, with proponents arguing that it provides an objective, consistent measure that allows fair comparison across different schools and regions.

Critics, however, argue that such tests often measure a narrow set of skills, primarily the ability to recall facts and apply routine procedures under time pressure, potentially at the expense of creativity, critical thinking, and other abilities that are harder to quantify.

A number of studies have found correlations between standardised test scores and factors such as household income, leading some researchers to argue that the tests may inadvertently reflect socioeconomic advantage as much as individual academic ability.

In response to such criticisms, several education systems have experimented with alternative or supplementary assessment methods, including project-based evaluations and portfolio assessments, though these approaches are often more time-consuming and costly to administer consistently at scale.

Despite ongoing debate, standardised tests remain deeply embedded in most national education systems, and few policymakers have proposed eliminating them entirely, focusing instead on incremental reforms intended to address some of the concerns raised by critics.`,
        questions: [
          { id: "ct-6", prompt: "Which best reflects what Paragraph 1 says about standardised testing?", opts: ["All educators agree standardised tests are the best possible measure of ability.", "Proponents argue it offers an objective, consistent way to compare performance across schools.", "Standardised testing has only existed for the past few years.", "No one has ever criticised standardised testing."], answer: 1, exp: "Option A overstates ('all educators agree'); C misstates its long history ('long served'); D contradicts the extensive criticism described later in the text." },
          { id: "ct-7", prompt: "According to Paragraph 2, what do critics say standardised tests primarily measure?", opts: ["Creativity and critical thinking above all else.", "Mainly factual recall and routine procedure application under time pressure.", "Only artistic ability.", "Nothing measurable at all."], answer: 1, exp: "The text states tests measure 'primarily... facts and... routine procedures' — the opposite of what critics say is being neglected (creativity, critical thinking)." },
          { id: "ct-8", prompt: "Which best reflects Paragraph 3?", opts: ["Studies have proven that household income directly causes low intelligence.", "Some researchers note a correlation between test scores and household income, suggesting scores may partly reflect socioeconomic factors.", "There is no relationship at all between income and test scores.", "All test scores are determined solely by family wealth."], answer: 1, exp: "The text describes a 'correlation' noted by 'some researchers' — not a proven causal claim ('directly causes') or an absolute claim ('solely')." },
          { id: "ct-9", prompt: "According to Paragraph 4, what is a noted drawback of alternative assessment methods?", opts: ["They are illegal in most countries.", "They are often more time-consuming and costly to administer at scale.", "They have completely replaced standardised testing everywhere.", "They require no teacher involvement at all."], answer: 1, exp: "The text specifically names cost and time as the drawback — not legality or complete replacement, which are unsupported additions." },
          { id: "ct-10", prompt: "Which best reflects Paragraph 5?", opts: ["Most policymakers want to eliminate standardised testing completely.", "Standardised tests remain widely used, with most reform efforts being incremental rather than aiming for elimination.", "Standardised testing has already been abolished in most countries.", "There is no ongoing debate about standardised testing."], answer: 1, exp: "The text explicitly says 'few policymakers have proposed eliminating them entirely' — directly contradicting option A, and reform is described as 'incremental', not abolition." },
        ],
      },
      {
        title: "The Debate Over School Start Times",
        text:
`A growing body of sleep research has prompted school districts in various countries to reconsider the traditional early morning start times common in secondary education, with some studies suggesting that adolescent circadian rhythms naturally shift later during puberty, making very early starts biologically mismatched with teenage sleep patterns.

Proponents of later start times point to studies showing improvements in student attendance, mood, and even academic performance following delayed start times in some pilot districts, though researchers caution that results have varied depending on how much start times were shifted and how other aspects of the school schedule were adjusted.

Not everyone supports changing start times, however; critics raise practical concerns about the knock-on effects on after-school activities, parents' work schedules, and public transportation systems that would need to be reorganised around a shifted school day.

A small number of school districts that implemented later start times have reported measurable, though modest, improvements in certain outcomes, while others have found less conclusive results, leading most researchers to caution against assuming uniformly large benefits across all contexts.

Given these mixed findings, policymakers in most regions have moved cautiously, often piloting changes in a small number of schools before considering wider implementation, rather than mandating immediate, system-wide changes to start times.`,
        questions: [
          { id: "ct-11", prompt: "Which best reflects Paragraph 1?", opts: ["All schools worldwide have already shifted to later start times.", "Some research suggests adolescent circadian rhythms shift later, prompting some districts to reconsider early start times.", "Sleep research has found no connection between start times and teenage biology.", "Early start times have been proven completely harmless to all students."], answer: 1, exp: "Option A overstates ('all schools... already'); C and D directly contradict the described research findings." },
          { id: "ct-12", prompt: "Which best reflects Paragraph 2?", opts: ["All studies agree that later start times improve every measured outcome equally.", "Some studies show improvements after delayed start times, but results vary by context.", "Later start times have been proven to harm student attendance.", "No research has ever studied school start times."], answer: 1, exp: "Option A overstates uniformity; the text explicitly says 'results have varied' — a classic overgeneralisation trap." },
          { id: "ct-13", prompt: "Which best reflects Paragraph 3?", opts: ["Everyone agrees that changing start times is a good idea with no drawbacks.", "Critics raise practical concerns about effects on activities, work schedules, and transportation.", "No one has ever raised concerns about changing school start times.", "Public transportation is completely unaffected by school start times."], answer: 1, exp: "Options A, C and D all contradict the paragraph's description of critics' concerns." },
          { id: "ct-14", prompt: "Which best reflects Paragraph 4?", opts: ["Every district that changed start times reported dramatic, uniform improvements.", "Some districts reported modest improvements while others found less conclusive results, prompting caution about generalising.", "No district has ever tried changing start times.", "Results have been completely consistent across all districts studied."], answer: 1, exp: "Option A overstates with 'dramatic, uniform'; D directly contradicts the described variation in findings." },
          { id: "ct-15", prompt: "Which best reflects Paragraph 5?", opts: ["Most regions have already mandated system-wide changes immediately.", "Policymakers in most regions have moved cautiously, often piloting changes first.", "No policymakers have considered this issue at all.", "All pilot programmes have been abandoned."], answer: 1, exp: "Option A directly contradicts 'moved cautiously... piloting changes' rather than mandating immediate system-wide change." },
        ],
      },
      {
        title: "The Debate Over Genetically Modified Crops",
        text:
`Since their commercial introduction in the 1990s, genetically modified (GM) crops have become widely used in several major agricultural economies, particularly for crops such as soybeans, maize, and cotton, engineered primarily for traits including pest resistance and herbicide tolerance.

Proponents argue that GM crops have contributed to increased yields and reduced pesticide use in some contexts, potentially offering environmental and economic benefits compared with certain conventional farming practices, though the magnitude of these benefits varies considerably depending on the specific crop, region, and farming practices involved.

Critics raise a range of concerns, including the potential for reduced genetic diversity in agricultural systems, the development of herbicide-resistant weeds in some regions, and broader questions about corporate control over seed markets, rather than concerns about direct human health effects, which the scientific consensus generally does not support as a significant risk.

Regulatory approaches to GM crops vary considerably between countries, with some nations adopting relatively permissive regulatory frameworks while others impose strict restrictions or outright bans, reflecting differing public attitudes, political considerations, and interpretations of the available scientific evidence.

Despite decades of use and extensive scientific study, public opinion regarding GM crops remains divided in many countries, with surveys suggesting that consumer attitudes are often influenced by factors beyond scientific evidence alone, including trust in regulatory institutions and broader attitudes toward large agricultural corporations.`,
        questions: [
          { id: "ct-16", prompt: "Which best reflects Paragraph 1?", opts: ["GM crops have never been used commercially anywhere.", "GM crops have been widely used since the 1990s in several major agricultural economies for specific traits.", "GM crops are used exclusively for one single crop type worldwide.", "GM crops were banned immediately after their introduction."], answer: 1, exp: "Options A, C and D all contradict the described widespread commercial use since the 1990s across multiple crops." },
          { id: "ct-17", prompt: "Which best reflects Paragraph 2?", opts: ["GM crops have been proven to provide identical benefits in every region and context.", "GM crops may offer benefits like increased yields in some contexts, though the extent varies.", "GM crops have no environmental or economic effects whatsoever.", "All conventional farming practices are worse than GM farming in every respect."], answer: 1, exp: "Option A overstates uniformity ('identical... every region'); the text explicitly says the magnitude 'varies considerably'." },
          { id: "ct-18", prompt: "Which best reflects Paragraph 3?", opts: ["The primary scientific concern about GM crops is direct harm to human health.", "Critics' main concerns include genetic diversity, herbicide-resistant weeds, and seed market control — not proven human health risks.", "There are no criticisms of GM crops whatsoever.", "Scientific consensus strongly supports human health risks from GM crops."], answer: 1, exp: "The text explicitly says human health effects are 'not support[ed] as a significant risk' by scientific consensus — options A and D claim the opposite." },
          { id: "ct-19", prompt: "Which best reflects Paragraph 4?", opts: ["All countries regulate GM crops in exactly the same way.", "Regulatory approaches vary considerably between countries, from permissive to strict or banned.", "No country has ever regulated GM crops.", "GM crops are banned in every country worldwide."], answer: 1, exp: "Options A and D both overstate uniformity where the text explicitly describes considerable variation between countries." },
          { id: "ct-20", prompt: "Which best reflects Paragraph 5?", opts: ["Public opinion on GM crops is completely unified worldwide.", "Public opinion remains divided, influenced by factors beyond scientific evidence alone.", "Scientific study has fully resolved all public disagreement on this topic.", "No surveys have ever examined public attitudes toward GM crops."], answer: 1, exp: "Options A and C both contradict 'remains divided... despite decades of... scientific study'." },
        ],
      },
      {
        title: "The History of Public Libraries",
        text:
`While informal book-lending arrangements existed in various forms throughout history, the modern concept of a free, publicly funded lending library accessible to the general public without membership fees emerged largely during the nineteenth century, closely tied to broader social movements promoting universal literacy and public education.

Early public library advocates, including notable philanthropist Andrew Carnegie, funded the construction of thousands of library buildings across multiple countries, though Carnegie's funding model typically required local communities to commit to ongoing operational funding rather than covering the library's complete costs indefinitely.

Public libraries have continually adapted their services over time, expanding well beyond simple book lending to include, in many contemporary libraries, internet access, digital media collections, community meeting spaces, and various educational programming aimed at serving diverse community needs beyond traditional reading.

Funding for public libraries has faced periodic pressure in various countries, particularly during periods of broader economic downturn or government budget constraints, leading some libraries to reduce operating hours or consolidate branches, though closures have generally been the exception rather than a universal trend.

Despite predictions in past decades that the rise of digital technology and the internet would render physical libraries largely obsolete, many public libraries have instead successfully repositioned themselves as important community hubs, with usage patterns shifting toward different services rather than declining uniformly across the board.`,
        questions: [
          { id: "ct-21", prompt: "Which best reflects Paragraph 1?", opts: ["No book-lending arrangements of any kind existed before the nineteenth century.", "The modern free public library concept emerged mainly in the nineteenth century, tied to literacy movements.", "Public libraries have always required membership fees.", "Universal literacy movements had no connection to library development."], answer: 1, exp: "Option A overstates — the text says 'informal' lending existed earlier, just not the modern free public model; C and D directly contradict the text." },
          { id: "ct-22", prompt: "Which best reflects Paragraph 2?", opts: ["Andrew Carnegie personally covered all library costs forever, with no community contribution required.", "Carnegie funded many library buildings, but typically required communities to commit to ongoing operational funding.", "Carnegie had no involvement in library history.", "No library buildings were funded during this period."], answer: 1, exp: "The text specifically notes the funding model 'required local communities to commit to ongoing... funding' — not indefinite full coverage by Carnegie, ruling out option A." },
          { id: "ct-23", prompt: "Which best reflects Paragraph 3?", opts: ["Libraries today offer only book lending, unchanged since the 1800s.", "Many contemporary libraries have expanded services well beyond book lending, including internet access and community spaces.", "No library has ever offered internet access.", "Educational programming is banned in public libraries."], answer: 1, exp: "Options A, C and D all contradict the described expansion of services in many contemporary libraries." },
          { id: "ct-24", prompt: "Which best reflects Paragraph 4?", opts: ["All public libraries worldwide have permanently closed due to funding issues.", "Some libraries have faced funding pressure and reduced hours, but closures have generally been the exception.", "No library has ever faced any funding pressure.", "Government budget constraints have never affected libraries."], answer: 1, exp: "Option A overstates dramatically ('all... permanently closed'), directly contradicting 'closures have generally been the exception'." },
          { id: "ct-25", prompt: "Which best reflects Paragraph 5?", opts: ["Digital technology has made all physical libraries completely obsolete, exactly as predicted.", "Despite predictions of obsolescence, many libraries have repositioned themselves successfully as community hubs.", "Library usage has declined uniformly and dramatically everywhere.", "No predictions were ever made about libraries and digital technology."], answer: 1, exp: "Option A directly contradicts the paragraph's point that the predictions of obsolescence did not come true as expected." },
        ],
      },
    ],
  },
  {
    id: "yes-no-not-given",
    title: "Yes/No/Not Given (vs True/False/Not Given)",
    whenToUse: "When the task specifically says YES/NO/NOT GIVEN (not TRUE/FALSE) — this is a separate task type, usually found in texts where the author expresses an opinion or argument.",
    howTo: [
      "The key difference: True/False/Not Given checks FACTS in the text. Yes/No/Not Given checks the AUTHOR'S OPINION — does the statement match the author's own point of view?",
      "YES — the author clearly agrees with the statement. NO — the author clearly disagrees (even if the underlying fact is true, the author disputes this particular interpretation). NOT GIVEN — the author doesn't express an opinion on this specific point.",
      "Look for words that reveal the author's stance: 'clearly', 'unfortunately', 'it is unlikely that', 'surprisingly' — these signal the author's attitude toward the topic.",
      "If the text simply reports a fact with no evaluation — and the question asks about an evaluation — it's usually NOT GIVEN, not YES or NO.",
    ],
    example: {
      text: "Statement: 'The traditional view of forest competition is now outdated.' — in a text where the author writes: 'Some scientists argue that this challenges the traditional Darwinian view...'",
      note: "The author never claims, in their own voice, that the old view is 'outdated' — they only report that SOME scientists believe this, staying neutral themselves. This is NOT GIVEN, not YES — because it's not the author's own position, just a report of someone else's opinion.",
    },
    passages: [
      {
        title: "Why Cities Should Ban Cars from Their Centres",
        text:
`It is time for major cities to seriously reconsider the assumption that private cars deserve unrestricted access to urban centres. For decades, planners have designed cities around vehicles rather than people, and the result has been polluted air, dangerous streets, and public spaces dominated by parked cars rather than pedestrians.

Some critics argue that banning cars would harm local businesses that depend on customers arriving by vehicle. This concern, while understandable, is not well supported by the evidence from cities that have already pedestrianised central districts; retail revenues in many such areas have in fact increased, not decreased, following the removal of car traffic.

Public transport, cycling infrastructure, and pedestrian zones can absolutely replace the private car for most urban journeys, provided cities invest properly in these alternatives before restricting car access, rather than treating restriction and investment as separate, sequential steps.

Admittedly, residents with mobility impairments and those living far from public transport routes face legitimate challenges under such policies, and any serious car-restriction plan must include exemptions and alternative transport solutions for these groups specifically.

Ultimately, the environmental and public health benefits of reduced urban car use are substantial enough that cities should pursue this path decisively, rather than continuing to delay meaningful action out of excessive caution about temporary inconvenience.`,
        questions: [
          { id: "yn-1", prompt: "The author believes cities have historically prioritised vehicles over people in their design.", opts: ["YES", "NO", "NOT GIVEN"], answer: 0, exp: "The author explicitly states 'planners have designed cities around vehicles rather than people' — this is the author's own claim." },
          { id: "yn-2", prompt: "The author believes banning cars definitely harms local business revenue.", opts: ["YES", "NO", "NOT GIVEN"], answer: 1, exp: "The author explicitly disputes this, citing evidence that revenues 'have in fact increased, not decreased'." },
          { id: "yn-3", prompt: "The author believes public transport investment should happen only after car restrictions are already in place.", opts: ["YES", "NO", "NOT GIVEN"], answer: 1, exp: "The author says cities should 'invest properly in these alternatives before restricting car access' — the reverse order to the statement." },
          { id: "yn-4", prompt: "The author believes people with disabilities need special consideration in car-restriction policies.", opts: ["YES", "NO", "NOT GIVEN"], answer: 0, exp: "The author explicitly states such plans 'must include exemptions and alternative transport solutions for these groups specifically'." },
          { id: "yn-5", prompt: "The author has personally been in a car accident in a European city.", opts: ["YES", "NO", "NOT GIVEN"], answer: 2, exp: "The author's personal experiences are never mentioned anywhere in the text." },
        ],
      },
      {
        title: "The Case for a Four-Day Work Week",
        text:
`The traditional five-day, forty-hour work week is a relic of early twentieth-century industrial practice, not a scientifically optimal arrangement for modern knowledge work, and it is well past time that more employers seriously experiment with a four-day alternative.

Sceptics often assume that reducing working days would proportionally reduce output, but pilot programmes conducted across several countries have generally found that overall productivity remains largely stable, suggesting that many employees are simply more efficient when given a stronger incentive to focus during working hours.

Critics who argue that a shorter week is only feasible for office-based knowledge work have a point worth taking seriously; extending this model to sectors such as healthcare or manufacturing, where continuous coverage is essential, will require considerably more creative scheduling solutions than simply cutting one day from everyone's calendar.

Some commentators worry that four-day weeks might simply compress the same workload into fewer, more stressful days, defeating the purpose of the reform entirely; this is a legitimate risk that employers must actively guard against through genuine workload reduction, not merely schedule compression.

Despite these legitimate implementation challenges, the overall case for exploring a four-day week remains compelling, and businesses that dismiss it outright, without at least piloting the idea, are likely underestimating both the wellbeing benefits for staff and the potential recruitment advantages in a competitive labour market.`,
        questions: [
          { id: "yn-6", prompt: "The author believes the traditional five-day work week is based on solid scientific evidence for modern jobs.", opts: ["YES", "NO", "NOT GIVEN"], answer: 1, exp: "The author calls it 'a relic... not a scientifically optimal arrangement' — a clear rejection." },
          { id: "yn-7", prompt: "The author believes productivity necessarily drops when working days are reduced.", opts: ["YES", "NO", "NOT GIVEN"], answer: 1, exp: "The author cites pilot programmes finding 'overall productivity remains largely stable' — directly contradicting the statement." },
          { id: "yn-8", prompt: "The author believes extending a four-day week to healthcare and manufacturing will be simple and require no extra planning.", opts: ["YES", "NO", "NOT GIVEN"], answer: 1, exp: "The author says this 'will require considerably more creative scheduling solutions' — the opposite of simple." },
          { id: "yn-9", prompt: "The author believes workload compression without actual reduction defeats the purpose of a four-day week.", opts: ["YES", "NO", "NOT GIVEN"], answer: 0, exp: "The author explicitly agrees this is a 'legitimate risk' that 'defeat[s] the purpose of the reform entirely'." },
          { id: "yn-10", prompt: "The author has personally implemented a four-day week at their own company.", opts: ["YES", "NO", "NOT GIVEN"], answer: 2, exp: "The author's own workplace practices are never mentioned." },
        ],
      },
      {
        title: "Should Homework Be Abolished in Primary Schools?",
        text:
`The practice of assigning homework to primary school children, particularly those under the age of ten, deserves far more scrutiny than it typically receives from parents and educators who simply assume it is a necessary and beneficial part of schooling.

Research on the academic benefits of homework at the primary level is, at best, mixed, with several studies finding negligible or even negative correlations between homework volume and academic achievement for younger children specifically, in contrast to somewhat stronger evidence for older secondary students.

Proponents often argue that homework teaches valuable time-management and responsibility skills from an early age; this claim, while intuitively appealing, is rarely tested rigorously, and alternative activities such as reading for pleasure or unstructured play may cultivate similar skills just as effectively, if not more so.

It would be an overstatement to claim that all homework for young children is entirely without value; certain forms, such as brief daily reading with a parent, appear to offer modest genuine benefit and should probably be preserved even under a substantially reduced homework model.

On balance, primary schools should move toward drastically reducing formal homework assignments for younger students, reserving the bulk of structured, graded homework for secondary education, where the evidence for its benefit is considerably more robust.`,
        questions: [
          { id: "yn-11", prompt: "The author believes homework's value is already widely questioned by parents and educators today.", opts: ["YES", "NO", "NOT GIVEN"], answer: 1, exp: "The author says it 'deserves far more scrutiny than it typically receives', implying most people do NOT question it enough currently." },
          { id: "yn-12", prompt: "The author believes research clearly proves homework significantly boosts young children's academic performance.", opts: ["YES", "NO", "NOT GIVEN"], answer: 1, exp: "The author describes the evidence as 'mixed' with 'negligible or even negative correlations' for younger children." },
          { id: "yn-13", prompt: "The author believes reading for pleasure could develop skills similar to those claimed for homework.", opts: ["YES", "NO", "NOT GIVEN"], answer: 0, exp: "The author explicitly states alternatives 'may cultivate similar skills just as effectively, if not more so'." },
          { id: "yn-14", prompt: "The author believes all homework for young children should be eliminated completely with no exceptions.", opts: ["YES", "NO", "NOT GIVEN"], answer: 1, exp: "The author says brief daily reading with a parent 'should probably be preserved' — not a complete elimination." },
          { id: "yn-15", prompt: "The author has taught primary school for over twenty years.", opts: ["YES", "NO", "NOT GIVEN"], answer: 2, exp: "The author's professional background is never mentioned in the text." },
        ],
      },
      {
        title: "In Defence of Reading Physical Books",
        text:
`Despite the undeniable convenience of e-readers and audiobooks, something valuable is lost when physical books disappear entirely from our reading habits, and readers who have abandoned print entirely may be sacrificing more than they realise for the sake of convenience.

Some argue that the format of a book, whether digital or physical, makes no meaningful difference to comprehension or enjoyment, but a growing body of research on reading comprehension suggests that readers of print books often retain narrative details and sequence of events somewhat better than readers of the identical text in digital form.

It would be unfair, however, to dismiss digital reading as universally inferior; e-readers offer genuine, substantial benefits for readers with visual impairments, frequent travellers managing luggage weight, and anyone seeking near-instant access to an enormous catalogue of titles unavailable through physical bookstores or libraries.

The physical book's tactile and visual permanence, including the ability to flip back easily to a previous chapter or visually recall a passage's position on the page, may partly explain the comprehension advantages some studies have identified, though this mechanism remains an active area of ongoing research.

Rather than insisting on the superiority of one single format for every reader, the most sensible position is that both physical and digital books have legitimate places in a well-rounded reading life, with the specific choice depending on the individual reader's circumstances and the type of content involved.`,
        questions: [
          { id: "yn-16", prompt: "The author believes physical books offer no advantages over digital formats.", opts: ["YES", "NO", "NOT GIVEN"], answer: 1, exp: "The author argues print may offer comprehension advantages — the opposite of 'no advantages'." },
          { id: "yn-17", prompt: "The author believes digital reading formats have no genuine benefits at all.", opts: ["YES", "NO", "NOT GIVEN"], answer: 1, exp: "The author explicitly lists genuine benefits of e-readers: visual impairments, travel, catalogue access." },
          { id: "yn-18", prompt: "The author believes readers of print books may retain narrative details somewhat better than digital readers.", opts: ["YES", "NO", "NOT GIVEN"], answer: 0, exp: "This matches the author's own claim directly, citing research on retention." },
          { id: "yn-19", prompt: "The author believes one single format is objectively superior for every reader in every situation.", opts: ["YES", "NO", "NOT GIVEN"], answer: 1, exp: "The author explicitly rejects this, arguing 'both physical and digital books have legitimate places'." },
          { id: "yn-20", prompt: "The author owns an e-reader personally.", opts: ["YES", "NO", "NOT GIVEN"], answer: 2, exp: "The author's personal possessions are never mentioned in the text." },
        ],
      },
      {
        title: "The Ethics of Zoos in the Modern Era",
        text:
`Modern zoos present themselves as institutions dedicated primarily to conservation and education, yet it is worth questioning honestly whether this self-presentation always matches the reality of how many zoo animals actually live, particularly larger species with complex behavioural and spatial needs.

Defenders of zoos point to legitimate successes in captive breeding programmes that have helped prevent the extinction of several endangered species, a genuine achievement that critics of zoos in general terms sometimes fail to adequately acknowledge.

Nonetheless, evidence of abnormal, repetitive behaviours in certain captive animals, particularly large carnivores and highly intelligent species such as elephants, suggests that even well-funded, well-intentioned facilities frequently struggle to provide adequate space and stimulation for these particular species specifically.

A reasonable middle position, rather than calling for the wholesale abolition of all zoos, would involve phasing out captivity specifically for species demonstrably unsuited to typical enclosure conditions, while continuing conservation-focused breeding and habitat programmes for species that adapt reasonably well to managed care.

This more selective, evidence-based approach would allow the genuine conservation benefits zoos provide to continue, while directly addressing the most serious ethical concerns, rather than forcing a simplistic choice between defending zoos entirely or condemning them wholesale.`,
        questions: [
          { id: "yn-21", prompt: "The author believes zoos' claims about their conservation and education mission always accurately reflect reality.", opts: ["YES", "NO", "NOT GIVEN"], answer: 1, exp: "The author explicitly questions 'whether this self-presentation always matches the reality' — expressing doubt, not agreement." },
          { id: "yn-22", prompt: "The author believes captive breeding programmes have achieved real conservation successes.", opts: ["YES", "NO", "NOT GIVEN"], answer: 0, exp: "The author calls this 'a genuine achievement' — a clear, direct agreement." },
          { id: "yn-23", prompt: "The author believes all species suffer equally from being kept in captivity.", opts: ["YES", "NO", "NOT GIVEN"], answer: 1, exp: "The author specifically points to 'large carnivores and highly intelligent species such as elephants', implying not all species are equally affected." },
          { id: "yn-24", prompt: "The author believes all zoos everywhere should be immediately abolished.", opts: ["YES", "NO", "NOT GIVEN"], answer: 1, exp: "The author explicitly proposes 'a reasonable middle position... rather than... wholesale abolition'." },
          { id: "yn-25", prompt: "The author has visited more than fifty zoos in different countries.", opts: ["YES", "NO", "NOT GIVEN"], answer: 2, exp: "The author's personal history of zoo visits is never mentioned." },
        ],
      },
    ],
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
    passages: [
      {
        title: "The Placebo Effect in Modern Medicine",
        text:
`The placebo effect, in which patients experience genuine physiological or psychological improvement after receiving a treatment with no active therapeutic ingredient, has puzzled and fascinated medical researchers for decades, raising fundamental questions about the relationship between belief and biology.

Neuroscientific studies using brain imaging have identified measurable changes in pain-processing regions of the brain following placebo administration, suggesting that the effect involves genuine neurological changes rather than simply patients imagining improvement or misreporting their symptoms.

Not all conditions respond equally to placebo treatment, however; while pain, depression, and certain gastrointestinal symptoms often show meaningful placebo responses, conditions with more objectively measurable biological markers, such as bacterial infections, generally do not improve through placebo administration alone.

A particularly striking demonstration of this phenomenon came from a study in which patients were explicitly told they were receiving a placebo pill with no active ingredient, yet still reported measurable symptom improvement compared with patients receiving no treatment at all.

These findings have prompted some researchers to explore whether carefully designed placebo-based interventions might be ethically incorporated into mainstream treatment approaches for certain conditions, though significant ethical and practical questions about transparency and informed consent remain unresolved.`,
        questions: [
          { id: "ps-1", prompt: "What is the function of Paragraph 1?", opts: ["To introduce the topic and pose an intriguing question about it", "To present a counter-argument", "To provide a concluding recommendation", "To give a specific numerical example"], answer: 0, exp: "It opens the topic and frames the puzzle ('raising fundamental questions'), typical of an introduction." },
          { id: "ps-2", prompt: "What is the function of Paragraph 2?", opts: ["To introduce an entirely new, unrelated topic", "To explain a possible mechanism behind the phenomenon introduced in Paragraph 1", "To argue against the existence of the placebo effect", "To conclude the discussion"], answer: 1, exp: "It elaborates with a neuroscientific mechanism, building directly on Paragraph 1's topic." },
          { id: "ps-3", prompt: "What is the function of Paragraph 3?", opts: ["To restate Paragraph 2's point in different words", "To introduce a limitation or qualification to the earlier claims", "To provide the article's final conclusion", "To describe an unrelated medical condition"], answer: 1, exp: "'Not all conditions respond equally... however' signals a qualifying counterpoint, not a restatement or conclusion." },
          { id: "ps-4", prompt: "What is the function of Paragraph 4?", opts: ["To provide a specific supporting example or piece of evidence", "To contradict everything stated earlier in the text", "To introduce the topic for the first time", "To offer a policy recommendation"], answer: 0, exp: "It describes one specific study — a concrete illustrative example, not a new topic or contradiction." },
          { id: "ps-5", prompt: "What is the function of Paragraph 5?", opts: ["To introduce the main topic for the first time", "To discuss implications and remaining open questions, functioning as a conclusion", "To provide a counter-example disproving Paragraph 4", "To repeat Paragraph 1 word for word"], answer: 1, exp: "It looks forward to implications and unresolved questions — a typical concluding function." },
        ],
      },
      {
        title: "The Debate Over Autonomous Vehicles",
        text:
`Self-driving vehicle technology, once confined to science fiction, has advanced to the point where limited autonomous driving features are now commercially available in some markets, prompting urgent debate about safety, regulation, and the pace of wider adoption.

Proponents point to data suggesting that human error contributes to the vast majority of traffic accidents, arguing that sufficiently advanced autonomous systems could substantially reduce road fatalities once the technology matures and achieves widespread adoption.

Sceptics counter that current autonomous systems still struggle with unusual or unpredictable scenarios that human drivers navigate intuitively, and that a small number of high-profile accidents involving autonomous vehicles have significantly undermined public trust in the technology's current readiness.

One frequently cited incident involved an autonomous vehicle failing to correctly identify a pedestrian crossing outside a designated crosswalk at night, an edge case that highlighted persistent limitations in current object-detection systems under specific lighting and behavioural conditions.

Given these competing considerations, most regulators have adopted a cautious, incremental approach to approving autonomous vehicle deployment, favouring extensive real-world testing and gradual expansion over rapid, wide-scale rollout.`,
        questions: [
          { id: "ps-6", prompt: "What is the function of Paragraph 1?", opts: ["To introduce the topic and its current relevance", "To provide a concluding recommendation", "To give a specific counter-example", "To restate the article's title"], answer: 0, exp: "It establishes the topic and why it matters now — a classic introduction." },
          { id: "ps-7", prompt: "What is the function of Paragraph 2?", opts: ["To present an argument in favour of the technology", "To contradict Paragraph 1 entirely", "To conclude the discussion", "To introduce an unrelated topic"], answer: 0, exp: "It presents proponents' supporting argument, directly following from the debate introduced in Paragraph 1." },
          { id: "ps-8", prompt: "What is the function of Paragraph 3?", opts: ["To repeat Paragraph 2's argument in different words", "To present a counter-argument or opposing view", "To provide the article's final conclusion", "To introduce the topic for the first time"], answer: 1, exp: "'Sceptics counter that...' directly signals an opposing viewpoint to Paragraph 2." },
          { id: "ps-9", prompt: "What is the function of Paragraph 4?", opts: ["To provide a specific example supporting the concerns raised in Paragraph 3", "To introduce a completely new topic", "To argue in favour of autonomous vehicles", "To conclude the article"], answer: 0, exp: "It gives one concrete incident illustrating the scepticism raised in Paragraph 3." },
          { id: "ps-10", prompt: "What is the function of Paragraph 5?", opts: ["To introduce the topic for the first time", "To summarise the regulatory response as a conclusion, given the competing considerations", "To provide another counter-example", "To repeat Paragraph 3 exactly"], answer: 1, exp: "'Given these competing considerations' signals a synthesising conclusion drawing on both sides." },
        ],
      },
      {
        title: "The Rediscovery of Fermented Foods",
        text:
`Fermented foods, once primarily associated with specific regional cuisines and traditional preservation methods, have experienced a significant resurgence in popularity across many countries over the past fifteen years, driven partly by growing interest in gut health.

This renewed interest is grounded in emerging scientific research on the gut microbiome, which has identified plausible mechanisms by which the live bacterial cultures present in properly fermented foods might influence digestion, immune function, and even aspects of mental health.

Nonetheless, many health claims associated with fermented foods have outpaced the current scientific evidence, with researchers cautioning that much of the existing research relies on small sample sizes or laboratory conditions that may not directly translate to typical dietary patterns.

A notable exception involves certain well-studied probiotic strains used in specific yoghurt products, where larger clinical trials have demonstrated modest but measurable benefits for particular digestive conditions in some patient populations.

Overall, while fermented foods appear to offer genuine potential benefits worth further investigation, nutrition experts generally advise against treating them as a cure-all, recommending instead that they be incorporated as one part of a broadly varied and balanced diet.`,
        questions: [
          { id: "ps-11", prompt: "What is the function of Paragraph 1?", opts: ["To introduce the topic and its recent popularity", "To provide a specific counter-example", "To conclude the discussion", "To describe an unrelated food safety issue"], answer: 0, exp: "It introduces the trend and its timeframe — a standard opening function." },
          { id: "ps-12", prompt: "What is the function of Paragraph 2?", opts: ["To explain the scientific reasoning behind the trend introduced in Paragraph 1", "To contradict Paragraph 1 entirely", "To provide the article's conclusion", "To introduce a completely unrelated topic"], answer: 0, exp: "It elaborates with the scientific basis (gut microbiome research) for the trend just introduced." },
          { id: "ps-13", prompt: "What is the function of Paragraph 3?", opts: ["To repeat Paragraph 2's claims without adding anything", "To introduce a cautionary counter-argument about the evidence", "To provide the article's final conclusion", "To describe a specific successful case"], answer: 1, exp: "'Nonetheless... have outpaced the current scientific evidence' signals a cautionary counterpoint." },
          { id: "ps-14", prompt: "What is the function of Paragraph 4?", opts: ["To provide a specific supporting example that partially qualifies the caution in Paragraph 3", "To contradict everything stated earlier", "To introduce the main topic for the first time", "To offer an unrelated recommendation"], answer: 0, exp: "'A notable exception' signals a specific example that nuances, rather than contradicts, the caution above." },
          { id: "ps-15", prompt: "What is the function of Paragraph 5?", opts: ["To introduce the topic for the first time", "To provide a balanced concluding recommendation", "To provide another specific counter-example", "To repeat Paragraph 1 exactly"], answer: 1, exp: "'Overall...' signals a summarising, balanced conclusion typical of a final paragraph." },
        ],
      },
      {
        title: "The Spread of Misinformation Online",
        text:
`The rapid spread of misinformation across social media platforms has become a significant concern for researchers, policymakers, and technology companies alike, prompting extensive study into how false information travels and why it often outpaces accurate corrections.

Research analysing large datasets of social media activity has found that false stories are often shared more quickly and more widely than accurate ones, a pattern researchers attribute partly to the tendency of novel or emotionally striking claims to attract more attention regardless of accuracy.

It would be an oversimplification, however, to attribute the problem solely to platform algorithms; human psychological tendencies, including confirmation bias and a preference for information confirming existing beliefs, play an equally significant role in the spread and persistence of false claims.

A widely studied case involved a false health claim that spread rapidly across multiple platforms during a public health emergency, reaching millions of users before fact-checking organisations could issue corrections, by which point the original claim had already been shared far more widely than any subsequent correction.

Addressing this challenge effectively will likely require a combination of platform-level interventions, improved public media literacy, and faster fact-checking mechanisms, rather than relying on any single solution to fully resolve such a multifaceted problem.`,
        questions: [
          { id: "ps-16", prompt: "What is the function of Paragraph 1?", opts: ["To introduce the topic and its significance", "To provide a specific example", "To offer a concluding recommendation", "To present a counter-argument"], answer: 0, exp: "It frames the general concern and sets up the topic for the rest of the article." },
          { id: "ps-17", prompt: "What is the function of Paragraph 2?", opts: ["To explain research findings that elaborate on the problem introduced in Paragraph 1", "To contradict Paragraph 1", "To conclude the article", "To introduce a completely unrelated topic"], answer: 0, exp: "It provides research detail (sharing speed/patterns) elaborating on the problem just introduced." },
          { id: "ps-18", prompt: "What is the function of Paragraph 3?", opts: ["To repeat Paragraph 2 exactly", "To complicate or qualify the explanation given in Paragraph 2", "To provide the final conclusion", "To introduce the topic for the first time"], answer: 1, exp: "'It would be an oversimplification, however...' clearly signals a qualifying complication to the prior explanation." },
          { id: "ps-19", prompt: "What is the function of Paragraph 4?", opts: ["To provide a specific real-world example illustrating the points made earlier", "To contradict everything stated earlier in the text", "To introduce a brand new, unrelated topic", "To conclude the discussion"], answer: 0, exp: "It gives one concrete case illustrating the dynamics described in the previous two paragraphs." },
          { id: "ps-20", prompt: "What is the function of Paragraph 5?", opts: ["To introduce the topic for the first time", "To offer a concluding recommendation synthesising the discussion", "To provide another specific example", "To repeat Paragraph 3 word for word"], answer: 1, exp: "It proposes solutions synthesising the whole discussion — a typical concluding role." },
        ],
      },
      {
        title: "The Comeback of Analogue Photography",
        text:
`Despite the near-total dominance of digital photography for most everyday purposes, film photography has experienced a modest but persistent resurgence over the past decade, particularly among younger photographers who did not grow up using film as their primary medium.

Enthusiasts often cite the deliberate, unhurried process of shooting film, including the limited number of exposures per roll and the delayed gratification of waiting for development, as offering a meaningfully different creative experience compared with the instant feedback of digital cameras.

This revival has not been without practical obstacles, however, since the number of companies still manufacturing film stock and processing chemicals has declined considerably since digital photography became dominant, occasionally leading to higher prices and reduced availability of certain film types.

Some manufacturers have responded to renewed demand by reintroducing previously discontinued film stocks, with at least one major company reporting that a specific reintroduced black-and-white film sold out its initial production run within weeks of release.

While film photography is highly unlikely to challenge digital photography's overall market dominance, industry observers generally agree that a stable, if niche, market for analogue photography appears likely to persist for the foreseeable future, rather than disappearing entirely as some once predicted.`,
        questions: [
          { id: "ps-21", prompt: "What is the function of Paragraph 1?", opts: ["To introduce the topic and its recent trend", "To provide a specific counter-example", "To conclude the discussion", "To describe an unrelated technology"], answer: 0, exp: "It introduces the resurgence trend and its context — a standard opening." },
          { id: "ps-22", prompt: "What is the function of Paragraph 2?", opts: ["To explain the reasons behind the trend introduced in Paragraph 1", "To contradict Paragraph 1", "To provide the article's conclusion", "To introduce an unrelated topic"], answer: 0, exp: "It elaborates on WHY enthusiasts value film — direct support for Paragraph 1's claim." },
          { id: "ps-23", prompt: "What is the function of Paragraph 3?", opts: ["To repeat Paragraph 2 without adding new information", "To introduce a practical challenge or complication to the trend", "To provide the final conclusion", "To describe an unrelated case"], answer: 1, exp: "'This revival has not been without practical obstacles, however' clearly signals a complicating factor." },
          { id: "ps-24", prompt: "What is the function of Paragraph 4?", opts: ["To provide a specific example of an industry response to demand", "To contradict everything stated earlier", "To introduce the topic for the first time", "To offer an unrelated recommendation"], answer: 0, exp: "It gives a concrete example (a specific sold-out film) of how manufacturers responded to the trend." },
          { id: "ps-25", prompt: "What is the function of Paragraph 5?", opts: ["To introduce the topic for the first time", "To provide a balanced concluding assessment of the trend's future", "To provide another counter-example", "To repeat Paragraph 1 exactly"], answer: 1, exp: "It offers a forward-looking, balanced assessment — a typical concluding function." },
        ],
      },
    ],
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
    passages: [
      {
        title: "The Development of Refrigeration Technology",
        text:
`Before mechanical refrigeration became widespread, households and businesses relied on natural ice, harvested from frozen lakes and rivers during winter and stored in insulated buildings known as icehouses for use throughout the warmer months, a practice that supported a substantial commercial ice trade throughout the nineteenth century.

The first practical mechanical refrigeration systems emerged in the mid-nineteenth century, relying on the physical principle that a gas expanding rapidly absorbs heat from its surroundings, a mechanism still fundamental to virtually all refrigeration and air conditioning systems used today.

Early mechanical refrigerators were large, expensive, and primarily used in commercial settings such as breweries and meatpacking facilities, since the compressors of the period were too bulky, costly, and often too dangerous, given the toxic refrigerant gases used, for practical household installation.

The introduction of safer synthetic refrigerants during the 1920s and 1930s made compact, affordable household refrigerators commercially viable for the first time, leading to rapid adoption across many households in wealthier nations over the following decades.

In more recent decades, environmental concerns about the ozone-depleting and greenhouse-warming properties of certain refrigerant chemicals have prompted international agreements phasing out the most harmful substances, driving ongoing research into more environmentally sustainable refrigeration technologies.`,
        questions: [
          { id: "nt-1", prompt: "Complete using NO MORE THAN TWO WORDS: Before mechanical refrigeration, people used ___ harvested from frozen lakes.", opts: ["natural ice", "natural ice harvested from frozen lakes", "mechanical refrigeration", "insulated buildings"], answer: 0, exp: "'Natural ice' is exactly two words and matches the text; option B is far over the limit despite also appearing in the text." },
          { id: "nt-2", prompt: "Complete using NO MORE THAN THREE WORDS: Early refrigeration relies on the principle that expanding gas ___.", opts: ["absorbs heat from its surroundings", "absorbs heat", "releases cold air", "increases in volume"], answer: 1, exp: "'Absorbs heat' is two words and captures the key mechanism; option A repeats the exact text but exceeds the three-word limit." },
          { id: "nt-3", prompt: "Complete using NO MORE THAN TWO WORDS: Early refrigerators were used in facilities such as breweries and ___.", opts: ["meatpacking facilities", "meatpacking facilities primarily", "household kitchens", "ice houses"], answer: 0, exp: "'Meatpacking facilities' fits the two-word limit; option C contradicts the text, which says these were NOT used in households yet." },
          { id: "nt-4", prompt: "Complete using NO MORE THAN TWO WORDS: Household refrigerators became viable after safer ___ were introduced in the 1920s-30s.", opts: ["synthetic refrigerants", "synthetic refrigerants safer", "toxic refrigerant gases", "natural ice methods"], answer: 0, exp: "'Synthetic refrigerants' matches the text and the word limit; option C describes the earlier, more dangerous refrigerants, the opposite of the answer needed." },
          { id: "nt-5", prompt: "Complete using ONE WORD ONLY: Certain refrigerant chemicals are both ozone-depleting and ___.", opts: ["greenhouse-warming", "extremely explosive", "completely harmless", "highly flammable"], answer: 0, exp: "'Greenhouse-warming' (hyphenated, counted as one word) is the exact term used in the text; the other options are not mentioned or contradict it." },
        ],
      },
      {
        title: "The Physiology of Marathon Running",
        text:
`Long-distance runners preparing for marathon events undergo months of progressive training designed to improve cardiovascular efficiency, increase the muscles' capacity to store and utilise glycogen, and build the structural resilience of tendons and connective tissue against repetitive impact.

A well-known phenomenon among marathon runners, often referred to informally as "hitting the wall", typically occurs around the 30-kilometre mark, when the body's stored glycogen reserves become substantially depleted, forcing a shift toward the less efficient metabolism of fat for energy.

To delay this depletion, many runners adopt a strategy known as carbohydrate loading in the days before a race, deliberately increasing carbohydrate intake to maximise glycogen storage in muscle tissue ahead of the anticipated demands of the event.

During the race itself, many runners consume carbohydrate gels or sports drinks at regular intervals, a practice intended to supplement dwindling glycogen stores and delay the onset of fatigue for as long as possible during the later stages of the race.

Beyond nutrition, psychological factors including pacing strategy, mental resilience, and prior race experience have also been shown to meaningfully influence a runner's ability to maintain performance during the physically demanding final kilometres of a marathon.`,
        questions: [
          { id: "nt-6", prompt: "Complete using NO MORE THAN TWO WORDS: 'Hitting the wall' typically occurs around the ___ mark.", opts: ["30-kilometre", "30 kilometres approximately", "10-kilometre", "finish line"], answer: 0, exp: "'30-kilometre' (hyphenated, one word) fits the limit and matches the text exactly." },
          { id: "nt-7", prompt: "Complete using NO MORE THAN TWO WORDS: Before a race, many runners increase carbohydrate intake through a strategy called ___.", opts: ["carbohydrate loading", "carbohydrate loading strategy", "glycogen depletion", "protein loading"], answer: 0, exp: "'Carbohydrate loading' is exactly two words; 'glycogen depletion' is the opposite concept — what loading tries to prevent." },
          { id: "nt-8", prompt: "Complete using NO MORE THAN TWO WORDS: During the race, runners consume gels or ___ to delay fatigue.", opts: ["sports drinks", "sports drinks regularly", "plain water only", "protein shakes"], answer: 0, exp: "'Sports drinks' matches the text and the limit; the other options are not what the text names." },
          { id: "nt-9", prompt: "Complete using ONE WORD ONLY: Training improves cardiovascular efficiency and the muscles' capacity to store ___.", opts: ["glycogen", "glycogen and fat", "tendons", "oxygen"], answer: 0, exp: "'Glycogen' is the single word named as what muscles store; 'tendons' relates to a different point (structural resilience), not storage capacity." },
          { id: "nt-10", prompt: "Complete using ONE WORD ONLY: Besides nutrition, ___ strategy and mental resilience influence marathon performance.", opts: ["pacing", "pacing carefully planned", "hydration", "nutrition"], answer: 0, exp: "'Pacing' is named alongside mental resilience; 'nutrition' is explicitly contrasted ('beyond nutrition'), so it can't be the answer." },
        ],
      },
      {
        title: "The Discovery of Insulin",
        text:
`Prior to the 1920s, a diagnosis of type 1 diabetes was almost universally fatal, typically within a year or two, as the body's inability to produce insulin left blood sugar levels dangerously and progressively unregulated with no effective medical treatment available.

In 1921, researchers Frederick Banting and Charles Best, working in a laboratory at the University of Toronto, successfully extracted a substance from the pancreas of dogs that, when injected into diabetic animals, dramatically lowered their blood sugar levels.

The first human patient treated with this extracted substance, a fourteen-year-old boy named Leonard Thompson, received his initial injection in January 1922, marking a pivotal moment in the treatment of diabetes, though his first dose was later refined due to impurities causing an allergic reaction.

Recognising the urgent global need for this treatment, the researchers controversially sold the patent rights for a symbolic sum of just one dollar, a decision intended to ensure that insulin production would remain affordable and widely accessible rather than restricted by expensive licensing.

Banting and his colleague John Macleod were awarded the Nobel Prize in Physiology or Medicine in 1923 for this discovery, though the decision proved controversial within the small research team, given differing views on how credit for the breakthrough should be properly distributed.`,
        questions: [
          { id: "nt-11", prompt: "Complete using ONE WORD ONLY: Before the 1920s, type 1 diabetes was almost always ___.", opts: ["fatal", "fatal within decades", "curable", "rare"], answer: 0, exp: "'Fatal' is the single word matching the text; the others contradict it or add unnecessary length." },
          { id: "nt-12", prompt: "Complete using ONE WORD ONLY: In 1921, Banting and Best extracted a substance from the ___ of dogs.", opts: ["pancreas", "pancreas of dogs specifically", "liver", "bloodstream"], answer: 0, exp: "'Pancreas' is the single-word organ named in the text; the others are incorrect organs." },
          { id: "nt-13", prompt: "Complete using NO MORE THAN TWO WORDS: The first human patient was a fourteen-year-old boy named ___.", opts: ["Leonard Thompson", "Leonard Thompson, aged fourteen", "Frederick Banting", "Charles Best"], answer: 0, exp: "'Leonard Thompson' is the patient's name and exactly two words; Banting and Best were the researchers, not the patient." },
          { id: "nt-14", prompt: "Complete using NO MORE THAN TWO WORDS: The researchers sold the patent rights for just ___.", opts: ["one dollar", "one dollar symbolically", "one million dollars", "no payment"], answer: 0, exp: "'One dollar' matches the text exactly within the limit; it was a symbolic $1 sale, not free or a large sum." },
          { id: "nt-15", prompt: "Complete using ONE WORD ONLY: Banting and ___ received the Nobel Prize in 1923.", opts: ["Macleod", "John Macleod together", "Best", "Thompson"], answer: 0, exp: "'Macleod' fits a one-word limit; notably, Best (despite his role in the discovery) did not receive the prize, a real historical controversy the text alludes to." },
        ],
      },
      {
        title: "The Architecture of Termite Mounds",
        text:
`Termite mounds, some reaching heights of several metres, represent one of the most sophisticated examples of structural engineering found in the natural world, constructed collaboratively by colonies containing millions of individual termites working without centralised direction or blueprints.

A central function of the mound's complex internal structure is thermoregulation, maintaining a remarkably stable internal temperature for the colony despite significant fluctuations in external conditions, achieved through an intricate network of internal tunnels that facilitate passive air circulation.

Some termite species construct mounds oriented with their narrow edge facing the midday sun, a design researchers believe minimises direct solar heating during the hottest part of the day while maximising exposure during cooler morning and evening hours.

The construction material itself, a mixture of soil, saliva, and faecal matter, hardens over time into a material of remarkable structural durability, with abandoned mounds sometimes remaining structurally intact for many decades after the colony itself has died out.

Engineers and architects have drawn direct inspiration from termite mound ventilation systems when designing energy-efficient buildings, incorporating passive cooling principles observed in termite architecture to reduce reliance on mechanical air conditioning in some notable modern construction projects.`,
        questions: [
          { id: "nt-16", prompt: "Complete using ONE WORD ONLY: Termite mounds are built by colonies containing millions of ___.", opts: ["termites", "individual termites working", "worker ants", "queen termites"], answer: 0, exp: "'Termites' is the single word needed; 'worker ants' and 'queen termites' are incorrect substitutions not supported by the text." },
          { id: "nt-17", prompt: "Complete using ONE WORD ONLY: The mound's internal structure helps maintain a stable ___ for the colony.", opts: ["temperature", "internal temperature always", "humidity", "food supply"], answer: 0, exp: "'Temperature' is the specific word the text names (thermoregulation); humidity and food supply are not what's described." },
          { id: "nt-18", prompt: "Complete using ONE WORD ONLY: Some mounds are oriented with their narrow edge facing the ___ sun.", opts: ["midday", "midday and evening", "morning", "setting"], answer: 0, exp: "'Midday' is the exact single word from the text; the mound is oriented to minimise midday heat specifically." },
          { id: "nt-19", prompt: "Complete using NO MORE THAN TWO WORDS: Mound material is a mixture of soil, saliva, and ___.", opts: ["faecal matter", "faecal matter mixed in", "plant fibres", "tree resin"], answer: 0, exp: "'Faecal matter' is exactly two words and matches the text's list of materials." },
          { id: "nt-20", prompt: "Complete using ONE WORD ONLY: Engineers have drawn inspiration from termite ___ systems for energy-efficient buildings.", opts: ["ventilation", "ventilation and cooling systems", "construction materials", "defence systems"], answer: 0, exp: "'Ventilation' is the single word the text specifically names as the source of inspiration, not construction materials generally." },
        ],
      },
      {
        title: "The Development of Braille",
        text:
`Louis Braille, who lost his sight in early childhood following an accident, developed the tactile reading and writing system that today bears his name while still a teenage student at a school for blind children in Paris during the 1820s.

Braille's system was significantly inspired by an earlier military communication method known as "night writing", originally devised for silent communication among soldiers, which Braille adapted and considerably simplified into a more practical and compact form suited to everyday reading.

Each Braille character is composed of a specific arrangement of raised dots within a fixed six-dot cell, a compact and consistent design that allows a trained reader's fingertip to distinguish characters efficiently through touch alone, without requiring excessive space.

Despite its evident advantages, Braille's system faced considerable institutional resistance for several decades following its initial development, with some educators at the time preferring alternative, less efficient tactile systems already established within existing curricula.

Braille's system eventually achieved widespread international adoption, and today it has been adapted for use in numerous languages and specialised contexts, including mathematical and musical notation, extending well beyond its original application to standard alphabetic text.`,
        questions: [
          { id: "nt-21", prompt: "Complete using ONE WORD ONLY: Louis Braille developed his system while a student at a school in ___.", opts: ["Paris", "Paris, France specifically", "London", "a military academy"], answer: 0, exp: "'Paris' is the single-word location named in the text." },
          { id: "nt-22", prompt: "Complete using NO MORE THAN TWO WORDS: Braille's system was inspired by a military method called ___.", opts: ["night writing", "night writing method", "Morse code", "sign language"], answer: 0, exp: "'Night writing' is exactly two words and the exact term used in the text; Morse code and sign language are not mentioned." },
          { id: "nt-23", prompt: "Complete using ONE WORD ONLY: Each Braille character uses a fixed ___ cell.", opts: ["six-dot", "six-dot raised", "eight-dot", "four-dot"], answer: 0, exp: "'Six-dot' (hyphenated, one word) matches the text exactly; the other numbers are incorrect." },
          { id: "nt-24", prompt: "Complete using ONE WORD ONLY: Braille's system faced considerable ___ resistance for decades.", opts: ["institutional", "institutional and political", "public", "government"], answer: 0, exp: "'Institutional' is the exact word used (referring to educators/institutions), not public or government resistance generally." },
          { id: "nt-25", prompt: "Complete using ONE WORD ONLY: Braille has since been adapted for mathematical and ___ notation.", opts: ["musical", "musical and artistic", "scientific", "legal"], answer: 0, exp: "'Musical' is the exact word paired with 'mathematical' in the text; scientific and legal notation are not mentioned." },
        ],
      },
    ],
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
    passages: [
      {
        title: "The Physics of Rainbows",
        text:
`Rainbows form when sunlight passes through countless tiny water droplets suspended in the air after rainfall, with each droplet acting as a miniature prism that splits white light into its constituent colours through a combination of refraction and internal reflection.

The specific angle at which light exits a raindrop, roughly 42 degrees relative to the original direction of sunlight, determines which colour reaches an observer's eye from any given droplet, explaining why a rainbow appears as a continuous band rather than from a single point.

Because this optical effect depends entirely on the relative positions of the sun, the water droplets, and the observer, no two people ever technically see exactly the same rainbow, since each observer's eye receives light from a slightly different set of droplets.

Double rainbows occur when light reflects twice inside water droplets rather than once, producing a fainter secondary arc with its colour order reversed relative to the brighter primary rainbow that appears beneath it.

Under exceptionally rare atmospheric conditions, additional faint rainbows, sometimes called supernumerary bows, can appear as narrow bands just inside the primary arc, caused by a more complex wave interference effect that classical geometric explanations alone cannot fully account for.`,
        questions: [
          { id: "gp-1", prompt: "Sentence stem: 'Rainbows form when sunlight passes through countless tiny water droplets suspended in the ___.' Grammatically, what is needed here?", opts: ["A noun (a place or thing)", "A verb", "An adverb", "A conjunction"], answer: 0, exp: "After 'the', a noun is needed — here, 'air'. Articles like 'the' almost always signal a following noun." },
          { id: "gp-2", prompt: "Sentence stem: '...determines which colour reaches an observer's eye from any given ___.' Grammatically, what is needed?", opts: ["A verb in the past tense", "A noun (a thing or object)", "An adjective describing colour", "A preposition"], answer: 1, exp: "After 'any given', a noun is needed — here, 'droplet'. 'Given' functions as an adjective modifying the coming noun." },
          { id: "gp-3", prompt: "Sentence stem: '...no two people ever technically ___ exactly the same rainbow.' Grammatically, what is needed?", opts: ["A noun", "A verb (an action)", "An adjective", "A preposition"], answer: 1, exp: "The subject 'no two people' needs a main verb — here, 'see'. 'Ever technically' are adverbs modifying the coming verb." },
          { id: "gp-4", prompt: "Sentence stem: '...producing a fainter secondary arc with its colour order ___ relative to the brighter primary rainbow.' Grammatically, what is needed?", opts: ["A verb in the present tense", "A past participle/adjective describing a state", "A plural noun", "An adverb of time"], answer: 1, exp: "'Colour order [___]' needs a word describing its state — here, 'reversed', a past participle acting as an adjective." },
          { id: "gp-5", prompt: "Sentence stem: '...caused by a more complex wave interference effect that classical geometric explanations alone cannot fully ___.' Grammatically, what is needed?", opts: ["A noun", "A verb (an action)", "An adjective", "A conjunction"], answer: 1, exp: "'Explanations... cannot fully [___]' needs a main verb — here, 'account for'." },
        ],
      },
      {
        title: "The Economics of Airline Pricing",
        text:
`Airline ticket prices for the same flight can vary dramatically depending on when a passenger books, a practice known as dynamic pricing that relies on sophisticated algorithms analysing demand patterns, booking history, and remaining seat availability in real time.

Contrary to popular belief, booking a flight far in advance does not always guarantee the lowest possible fare, since airlines frequently adjust prices upward or downward multiple times per day in response to shifting demand signals and competitor pricing.

Business travellers, who often book closer to their travel date and have less flexibility regarding specific flight times, are frequently charged substantially more than leisure travellers who can adjust their schedules to take advantage of cheaper fares.

Airlines also segment pricing by cabin class and fare type, offering multiple price points for functionally similar seats that differ mainly in terms of refundability, baggage allowances, and other ancillary conditions attached to the ticket.

Some economists argue that this pricing complexity ultimately benefits price-sensitive consumers willing to remain flexible, while effectively charging a premium to those who value certainty and convenience over cost savings.`,
        questions: [
          { id: "gp-6", prompt: "Sentence stem: 'Airline ticket prices... can vary dramatically depending on when a passenger ___.' Grammatically, what is needed?", opts: ["A noun", "A verb (an action)", "An adjective", "A preposition"], answer: 1, exp: "After 'a passenger', the subject needs a verb — here, 'books'." },
          { id: "gp-7", prompt: "Sentence stem: '...booking a flight far in advance does not always guarantee the lowest possible ___.' Grammatically, what is needed?", opts: ["A verb", "A noun (a thing)", "An adverb", "A conjunction"], answer: 1, exp: "After the adjective 'lowest possible', a noun is needed — here, 'fare'." },
          { id: "gp-8", prompt: "Sentence stem: '...leisure travellers who can adjust their schedules to take advantage of ___.' Grammatically, what is needed?", opts: ["A noun phrase", "A verb in the past tense", "An adjective alone", "A subject pronoun"], answer: 0, exp: "'Take advantage of' must be followed by a noun phrase — here, 'cheaper fares'." },
          { id: "gp-9", prompt: "Sentence stem: '...functionally similar seats that differ mainly in terms of ___.' Grammatically, what is needed?", opts: ["A verb", "A noun or list of nouns", "An adverb", "A conjunction alone"], answer: 1, exp: "'In terms of' is followed by a noun or list of nouns — here, 'refundability, baggage allowances...'." },
          { id: "gp-10", prompt: "Sentence stem: '...price-sensitive consumers willing to remain ___.' Grammatically, what is needed?", opts: ["A noun", "An adjective", "A verb in past tense", "A preposition"], answer: 1, exp: "'Remain' is a linking verb here, requiring an adjective to follow — 'flexible'." },
        ],
      },
      {
        title: "The Migration Patterns of Monarch Butterflies",
        text:
`Monarch butterflies undertake one of the most remarkable migratory journeys in the insect world, travelling thousands of kilometres between breeding grounds in North America and overwintering sites in central Mexico, a journey no single individual butterfly completes in its entirety.

Because a monarch's lifespan is typically only a few weeks, the full migratory cycle spans multiple generations, with a special longer-lived generation, sometimes called the "super generation", undertaking the lengthy southward journey to Mexico each autumn.

Remarkably, monarchs that have never previously visited Mexico are somehow able to navigate accurately to the same specific forest locations their ancestors used the previous year, a phenomenon that continues to intrigue researchers studying insect navigation mechanisms.

Scientists have proposed that monarchs rely on a combination of the sun's position and an internal magnetic compass sense to maintain their bearings during the journey, though the precise mechanism remains only partially understood despite decades of dedicated research.

In recent decades, monarch populations have declined significantly, a trend researchers largely attribute to habitat loss along the migratory route, particularly the reduction of milkweed plants that monarch caterpillars depend on exclusively for food.`,
        questions: [
          { id: "gp-11", prompt: "Sentence stem: '...overwintering sites in ___.' Grammatically, what is needed?", opts: ["A verb", "A place name or noun", "An adjective", "A conjunction"], answer: 1, exp: "After 'in', a place noun is needed — here, 'central Mexico'." },
          { id: "gp-12", prompt: "Sentence stem: '...the full migratory cycle ___ multiple generations.' Grammatically, what is needed?", opts: ["A noun", "A verb (an action)", "An adjective", "A preposition"], answer: 1, exp: "The subject 'the full migratory cycle' needs a main verb — here, 'spans'." },
          { id: "gp-13", prompt: "Sentence stem: '...forest locations their ancestors used the ___ year.' Grammatically, what is needed?", opts: ["A verb", "An adjective describing time", "A plural noun", "A conjunction"], answer: 1, exp: "'The [___] year' needs an adjective modifying 'year' — here, 'previous'." },
          { id: "gp-14", prompt: "Sentence stem: '...an internal magnetic compass sense to maintain their ___ during the journey.' Grammatically, what is needed?", opts: ["A verb", "A noun (a thing)", "An adverb", "A preposition"], answer: 1, exp: "'Maintain their [___]' needs a noun — here, 'bearings'." },
          { id: "gp-15", prompt: "Sentence stem: '...monarch caterpillars depend on exclusively for ___.' Grammatically, what is needed?", opts: ["A noun", "A verb", "An adjective", "A conjunction"], answer: 0, exp: "'For [___]' needs a noun — here, 'food'." },
        ],
      },
      {
        title: "The Invention of the Printing Press",
        text:
`Johannes Gutenberg's development of a movable-type printing press in the German city of Mainz around 1440 is widely regarded as one of the most transformative technological innovations in human history, dramatically accelerating the spread of written knowledge across Europe.

Prior to Gutenberg's innovation, books were typically copied by hand, a slow and labour-intensive process that made written material scarce, expensive, and largely inaccessible to anyone outside wealthy institutions such as monasteries, universities, or royal courts.

Gutenberg's key innovation involved casting individual metal letters that could be arranged, reused, and rearranged for each new page, a significant improvement over earlier printing methods that had relied on carving an entire page's text into a single, non-reusable wooden block.

Within just fifty years of Gutenberg's press, printing had spread to hundreds of cities across Europe, and it is estimated that millions of books had been printed, a scale of production entirely unimaginable under the earlier hand-copying system.

Historians frequently credit the printing press with accelerating the Protestant Reformation, the Scientific Revolution, and rising literacy rates more broadly, since it allowed ideas to circulate far more rapidly and widely than manuscript copying alone had ever permitted.`,
        questions: [
          { id: "gp-16", prompt: "Sentence stem: '...one of the most transformative technological ___ in human history.' Grammatically, what is needed?", opts: ["A verb", "A plural noun", "An adverb", "A preposition"], answer: 1, exp: "After 'technological', a plural noun is needed — here, 'innovations'." },
          { id: "gp-17", prompt: "Sentence stem: 'Prior to Gutenberg's innovation, books were typically ___ by hand.' Grammatically, what is needed?", opts: ["A noun", "A past participle/verb form", "An adjective alone", "A conjunction"], answer: 1, exp: "'Were typically [___] by hand' is a passive construction needing a past participle — here, 'copied'." },
          { id: "gp-18", prompt: "Sentence stem: '...could be arranged, reused, and rearranged for each new ___.' Grammatically, what is needed?", opts: ["A verb", "A noun", "An adverb", "A preposition"], answer: 1, exp: "After 'each new', a noun is needed — here, 'page'." },
          { id: "gp-19", prompt: "Sentence stem: '...it is estimated that millions of books had been ___.' Grammatically, what is needed?", opts: ["A noun", "A past participle (passive verb form)", "An adjective", "A conjunction"], answer: 1, exp: "'Had been [___]' is a passive perfect construction needing a past participle — here, 'printed'." },
          { id: "gp-20", prompt: "Sentence stem: '...far more rapidly and widely than manuscript copying alone had ever ___.' Grammatically, what is needed?", opts: ["A noun", "A verb (past participle)", "An adjective", "A preposition"], answer: 1, exp: "'Had ever [___]' needs a past participle to complete the perfect tense — here, 'permitted'." },
        ],
      },
      {
        title: "The Science of Volcanic Eruptions",
        text:
`Volcanic eruptions occur when molten rock, gases, and ash trapped beneath the Earth's surface find a pathway to escape, driven by immense pressure that builds up within magma chambers located several kilometres underground.

The explosiveness of a given eruption depends significantly on the viscosity of the magma involved, with thick, viscous magma trapping gases more effectively and therefore producing far more violent eruptions than thinner, more fluid magma types.

Volcanologists monitor a range of warning signs before a potential eruption, including small earthquakes caused by moving magma, ground deformation detectable via satellite measurements, and changes in the volume or composition of gases released from a volcano's surface.

Despite considerable scientific progress in monitoring techniques, predicting the precise timing of a volcanic eruption remains extremely difficult, since the underlying processes driving an eruption can accelerate or stall unpredictably over periods ranging from days to years.

Historically, some of the deadliest volcanic disasters have resulted not directly from lava flows but from associated hazards such as pyroclastic flows, fast-moving currents of superheated gas and volcanic debris capable of destroying everything in their path within minutes.`,
        questions: [
          { id: "gp-21", prompt: "Sentence stem: '...trapped beneath the Earth's surface find a pathway to ___.' Grammatically, what is needed?", opts: ["A noun", "A verb (an action)", "An adjective", "A conjunction"], answer: 1, exp: "'A pathway to [___]' needs a base-form verb — here, 'escape'." },
          { id: "gp-22", prompt: "Sentence stem: 'The explosiveness of a given eruption depends significantly on the ___ of the magma involved.' Grammatically, what is needed?", opts: ["A verb", "A noun", "An adverb", "A preposition"], answer: 1, exp: "After 'the' and before 'of', a noun is needed — here, 'viscosity'." },
          { id: "gp-23", prompt: "Sentence stem: '...changes in the volume or composition of gases released from a volcano's ___.' Grammatically, what is needed?", opts: ["A verb", "A noun", "An adjective", "A conjunction"], answer: 1, exp: "After the possessive \"volcano's\", a noun is needed — here, 'surface'." },
          { id: "gp-24", prompt: "Sentence stem: '...predicting the precise timing of a volcanic eruption remains extremely ___.' Grammatically, what is needed?", opts: ["A noun", "An adjective", "A verb", "A preposition"], answer: 1, exp: "'Remains extremely [___]' needs an adjective after the linking verb 'remains' — here, 'difficult'." },
          { id: "gp-25", prompt: "Sentence stem: '...capable of destroying everything in their path within ___.' Grammatically, what is needed?", opts: ["A noun (a time expression)", "A verb", "An adjective alone", "A conjunction"], answer: 0, exp: "'Within [___]' needs a time-expressing noun — here, 'minutes'." },
        ],
      },
    ],
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
    id: "unit-1",
    order: 1,
    title: "IELTS Reading Practice",
    texts: [
      {
        id: "text-1",
        title: "The Silent Language of Trees",
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
          {
            type: "heading-match",
            title: "Matching Headings",
            instructions: "The passage above has five paragraphs (in order). Choose the correct heading for each from the list below. There are more headings than paragraphs.",
            strategy: [
              "Match the paragraph's overall function, not one detail inside it.",
              "Watch for headings that fit the passage's topic generally but belong to a different specific paragraph.",
            ],
            headings: [
              "A traditional view challenged by new evidence",
              "Chemical alarms between neighbouring trees",
              "Support flowing from old to young",
              "Doubts about how intentional the process really is",
              "A shift in forestry practice",
              "The financial cost of maintaining forests",
              "Where the underground network was first discovered",
            ],
            items: [
              { id: "r1h-1", paragraph: "Paragraph 1", answer: 0 },
              { id: "r1h-2", paragraph: "Paragraph 2", answer: 1 },
              { id: "r1h-3", paragraph: "Paragraph 3", answer: 2 },
              { id: "r1h-4", paragraph: "Paragraph 4", answer: 3 },
              { id: "r1h-5", paragraph: "Paragraph 5", answer: 4 },
            ],
          },
          {
            type: "info-match",
            title: "Matching Information",
            instructions: "The passage has five paragraphs, A–E. Which paragraph contains each piece of information below?",
            strategy: [
              "Scan for the specific fact named in the question, not the paragraph's general topic.",
              "The information may be one sentence within a paragraph about something else overall.",
            ],
            paragraphLabels: ["A", "B", "C", "D", "E"],
            items: [
              { id: "r1i-1", text: "the nickname given to the underground fungal network", answer: "A" },
              { id: "r1i-2", text: "a study measuring the production of defensive enzymes", answer: "B" },
              { id: "r1i-3", text: "the term used for older trees that support seedlings", answer: "C" },
              { id: "r1i-4", text: "an alternative explanation proposed by sceptics", answer: "D" },
              { id: "r1i-5", text: "a change in real-world forestry practice", answer: "E" },
            ],
          },
          {
            type: "summary",
            title: "Summary Completion",
            instructions: "Complete the summary below. Use NO MORE THAN TWO WORDS from the passage for each answer.",
            strategy: [
              "Identify the part of speech needed before searching the text.",
              "Use a nearby word shared with the summary as your anchor point in the passage.",
            ],
            summaryTemplate:
              "Trees are connected underground by {0} that allow chemical communication between neighbours under attack. Older trees, called {1}, transfer nutrients to young seedlings, challenging the traditional {2} view of competition. Sceptics argue this may simply benefit the {3} rather than reflecting a deliberate strategy. As a result, some foresters have begun reconsidering the {4} of older trees.",
            items: [
              { id: "r1s-1", answer: ["mycorrhizal fungi", "fungi"] },
              { id: "r1s-2", answer: ["mother trees"] },
              { id: "r1s-3", answer: ["Darwinian"] },
              { id: "r1s-4", answer: ["fungi"] },
              { id: "r1s-5", answer: ["clearing"] },
            ],
          },
          {
            type: "mcq",
            title: "Multiple Choice",
            instructions: "Choose the correct letter, A, B, C or D, for each question.",
            strategy: [
              "Predict the answer yourself before reading the options.",
              "Eliminate options that add claims the passage never actually makes.",
            ],
            items: [
              { id: "r1m-1", text: "According to the passage, what happens when a tree is attacked by insects?", opts: ["It dies within days", "It releases chemicals that warn neighbouring trees of the same species", "It stops photosynthesis entirely", "It grows faster to compensate"], answer: 1 },
              { id: "r1m-2", text: "Why do sceptics doubt that fungal resource-sharing is a deliberate strategy?", opts: ["Trees cannot communicate in any way", "Fungi might simply move resources to wherever is most efficient for themselves", "The phenomenon has never actually been observed", "Trees are known only to compete, never cooperate"], answer: 1 },
              { id: "r1m-3", text: "Why is it difficult to test whether the cooperation between trees is deliberate?", opts: ["Underground networks are hard to observe without disturbing them", "No equipment exists to study tree roots", "Trees refuse to grow near researchers", "Fungi are too small to detect at all"], answer: 0 },
              { id: "r1m-4", text: "What has prompted some foresters to reconsider clearing older trees?", opts: ["A new government regulation", "The realisation that mother trees may support a wider network of seedlings", "A shortage of timber", "Pressure from local tourism boards"], answer: 1 },
            ],
          },
          {
            type: "ynng",
            title: "Yes / No / Not Given",
            instructions: "Do the following statements agree with the views of the writer? Choose YES if the statement agrees, NO if it contradicts, or NOT GIVEN if it's impossible to say.",
            strategy: [
              "This checks the WRITER'S opinion, not just facts — look for the writer's own framing, not just what other researchers are quoted as saying.",
              "If the writer only reports that opinions differ, without taking a side, that's usually NOT GIVEN.",
            ],
            items: [
              { id: "r1y-1", text: "The writer believes understanding tree networks could change how people think about cooperation in nature more broadly.", opts: ["YES", "NO", "NOT GIVEN"], answer: 0 },
              { id: "r1y-2", text: "The writer believes scientists have reached full agreement on why trees share resources.", opts: ["YES", "NO", "NOT GIVEN"], answer: 1 },
              { id: "r1y-3", text: "The writer believes fungi definitely act out of altruism toward trees.", opts: ["YES", "NO", "NOT GIVEN"], answer: 2 },
              { id: "r1y-4", text: "The writer has personally studied mycorrhizal networks in a laboratory.", opts: ["YES", "NO", "NOT GIVEN"], answer: 2 },
            ],
          },
        ],
      },
      {
        id: "text-2",
        title: "The Urban Heat Island Effect",
        level: "Band 6–6.5",
        topic: "Environmental Science / Urban Studies",
        passage:
    `Cities around the world are frequently several degrees warmer than the surrounding rural or suburban areas, a phenomenon known as the urban heat island effect. This temperature difference is most pronounced during the evening and at night, when built-up areas release heat absorbed during the day far more slowly than natural landscapes do.
    
    A central cause of this effect lies in the materials used in urban construction. Asphalt, concrete, and dark rooftops absorb a much greater proportion of incoming solar radiation than vegetation or soil, and these materials also have a high thermal mass, allowing them to retain heat long after sunset and release it gradually overnight.
    
    The reduction of vegetation in cities compounds this problem, since plants cool their surroundings through a process called evapotranspiration, in which water evaporates from leaves and draws heat away from the surrounding air. Additional contributing factors include waste heat released by vehicles, air conditioning systems, and industrial processes, all of which are far more concentrated in dense urban environments.
    
    The consequences of urban heat islands extend beyond simple discomfort. Elevated nighttime temperatures have been linked to increased energy consumption, as residents rely more heavily on air conditioning, as well as heightened health risks during heatwaves, particularly for elderly residents and those without access to adequate cooling.
    
    In response, many cities have begun experimenting with mitigation strategies, including the installation of reflective or "cool" roofing materials that absorb less solar radiation, the expansion of urban tree canopy and green roofs, and the strategic design of streets to improve airflow and reduce heat trapping between buildings.
    
    Despite growing awareness, implementing these measures at a citywide scale remains challenging, since retrofitting existing infrastructure is often costly, and competing priorities for limited municipal budgets can delay large-scale adoption, even where the long-term benefits for public health and energy savings are well established.`,
        tasks: [
          {
            type: "heading-match",
            title: "Matching Headings — Practice",
            instructions: "The passage above has six paragraphs (in order, top to bottom). Choose the correct heading for each paragraph listed below from the list of headings. There are more headings than paragraphs — you will not use them all.",
            strategy: [
              "First skim all the headings and try to understand the general idea of each one — this saves time before you start matching.",
              "Look for the main idea of each paragraph (usually in the first sentence), not individual details mentioned partway through.",
              "Beware of headings that match a topic discussed SOMEWHERE in the text but not in that specific paragraph — this is the single most common trap in this task type.",
              "A heading must cover the paragraph's overall function, not just one example or detail inside it.",
            ],
            walkthrough: {
              text: "Paragraph 1: 'Cities around the world are frequently several degrees warmer... This temperature difference is most pronounced during the evening and at night...'",
              steps: [
                "Skim the paragraph: the main point is that cities are warmer than surrounding areas, especially at night.",
                "Check the heading 'The financial benefits of urban parks' — completely unrelated topic (parks, money), eliminate immediately.",
                "Check 'The role of construction materials in trapping heat' — this sounds plausible and IS discussed in the text, but not in THIS paragraph; it's actually the topic of Paragraph 2. This is the classic trap.",
                "Check 'A phenomenon most noticeable after dark' — this matches 'most pronounced during the evening and at night' precisely, and captures the paragraph's main point.",
              ],
              answer: "A phenomenon most noticeable after dark",
              whyNotOthers: "The construction-materials heading belongs to Paragraph 2, not Paragraph 1 — always check that a plausible-sounding heading actually matches the specific paragraph in front of you, not just the passage as a whole.",
            },
            headings: [
              "A costly and slow path to change",
              "The role of construction materials in trapping heat",
              "Effects on residents' health and expenses",
              "A phenomenon most noticeable after dark",
              "The financial benefits of urban parks",
              "Losing nature's natural cooling system",
              "Attempts to reduce the problem",
              "A history of city planning failures",
            ],
            items: [
              { id: "r2-1", paragraph: "Paragraph 2", answer: 1 },
              { id: "r2-2", paragraph: "Paragraph 3", answer: 5 },
              { id: "r2-3", paragraph: "Paragraph 4", answer: 2 },
              { id: "r2-4", paragraph: "Paragraph 5", answer: 6 },
              { id: "r2-5", paragraph: "Paragraph 6", answer: 0 },
            ],
          },
          {
            type: "tfng",
            title: "True / False / Not Given",
            instructions: "Do the statements agree with the information in the passage? Write TRUE, FALSE or NOT GIVEN.",
            strategy: [
              "Watch for qualifiers like 'always', 'only', 'most' — they often decide TRUE vs NOT GIVEN.",
              "Check facts against the exact wording, not your general impression of the paragraph.",
            ],
            items: [
              { id: "r2t-1", text: "The urban heat island effect is most noticeable during the daytime.", answer: "FALSE" },
              { id: "r2t-2", text: "Asphalt and concrete have a high thermal mass, allowing them to retain heat.", answer: "TRUE" },
              { id: "r2t-3", text: "Plants cool their surroundings through a process called evapotranspiration.", answer: "TRUE" },
              { id: "r2t-4", text: "Elevated nighttime temperatures have been linked to increased energy consumption.", answer: "TRUE" },
              { id: "r2t-5", text: "All cities have already fully implemented heat-reducing mitigation strategies.", answer: "FALSE" },
              { id: "r2t-6", text: "Retrofitting existing infrastructure is generally quick and inexpensive.", answer: "FALSE" },
            ],
          },
          {
            type: "info-match",
            title: "Matching Information",
            instructions: "The passage has six paragraphs, A–F. Which paragraph contains each piece of information below?",
            strategy: [
              "Scan for the specific fact named, not the paragraph's general topic.",
              "Questions are often scrambled — don't assume order matches the passage.",
            ],
            paragraphLabels: ["A", "B", "C", "D", "E", "F"],
            items: [
              { id: "r2i-1", text: "the specific term used to describe this temperature phenomenon", answer: "A" },
              { id: "r2i-2", text: "materials that absorb a large proportion of solar radiation", answer: "B" },
              { id: "r2i-3", text: "the reason vegetation loss reduces natural cooling", answer: "C" },
              { id: "r2i-4", text: "a specific health risk mentioned for elderly residents", answer: "D" },
              { id: "r2i-5", text: "a mitigation measure related to street design", answer: "E" },
              { id: "r2i-6", text: "a mention of limited municipal budgets", answer: "F" },
            ],
          },
          {
            type: "summary",
            title: "Summary Completion",
            instructions: "Complete the summary below. Use NO MORE THAN TWO WORDS from the passage for each answer.",
            strategy: [
              "Identify the required part of speech before scanning the text.",
              "Recount your words against the limit before finalising each answer.",
            ],
            summaryTemplate:
              "The urban heat island effect occurs partly because materials like asphalt and concrete have a high {0}, causing them to retain heat overnight. The loss of {1} in cities also reduces natural cooling through evapotranspiration. Consequences include higher {2} consumption and health risks during heatwaves. Cities have begun expanding tree canopy and green roofs, though limited {3} budgets often slow adoption.",
            items: [
              { id: "r2s-1", answer: ["thermal mass"] },
              { id: "r2s-2", answer: ["vegetation"] },
              { id: "r2s-3", answer: ["energy"] },
              { id: "r2s-4", answer: ["municipal"] },
            ],
          },
          {
            type: "mcq",
            title: "Multiple Choice",
            instructions: "Choose the correct letter, A, B, C or D, for each question.",
            strategy: [
              "Predict an answer before reading the options.",
              "Eliminate options that add claims the passage never makes.",
            ],
            items: [
              { id: "r2m-1", text: "According to the passage, why do cities retain heat longer than rural areas?", opts: ["Because they have more trees", "Because construction materials like asphalt have high thermal mass", "Because they receive more sunlight overall", "Because they are located near the equator"], answer: 1 },
              { id: "r2m-2", text: "What is evapotranspiration, according to the passage?", opts: ["A process where water evaporates from leaves and cools the surrounding air", "A type of urban construction material", "A method for measuring city temperatures", "A government policy for reducing emissions"], answer: 0 },
              { id: "r2m-3", text: "Which of the following is mentioned as a mitigation strategy?", opts: ["Banning all vehicles from city centres", "Reflective or 'cool' roofing materials", "Relocating residents to rural areas", "Increasing industrial production"], answer: 1 },
              { id: "r2m-4", text: "According to the passage, why is implementing mitigation measures citywide challenging?", opts: ["There is no scientific support for these measures", "Retrofitting is often costly and competes with other budget priorities", "Residents oppose all environmental policies", "The technology does not yet exist"], answer: 1 },
            ],
          },
          {
            type: "ynng",
            title: "Yes / No / Not Given",
            instructions: "Do the statements agree with the views of the writer? Choose YES, NO, or NOT GIVEN.",
            strategy: [
              "This checks the writer's own opinion, not just facts reported.",
              "If the writer only reports what's happening without judging it, that's often NOT GIVEN.",
            ],
            items: [
              { id: "r2y-1", text: "The writer believes the long-term benefits of heat-reduction measures are well established.", opts: ["YES", "NO", "NOT GIVEN"], answer: 0 },
              { id: "r2y-2", text: "The writer believes cost is the only barrier to implementing these measures.", opts: ["YES", "NO", "NOT GIVEN"], answer: 1 },
              { id: "r2y-3", text: "The writer believes all cities have equal financial resources to address this issue.", opts: ["YES", "NO", "NOT GIVEN"], answer: 2 },
              { id: "r2y-4", text: "The writer has personally visited multiple cities to study this phenomenon.", opts: ["YES", "NO", "NOT GIVEN"], answer: 2 },
            ],
          },
        ],
      },
      {
        id: "text-3",
        title: "The Evolution of the Bicycle",
        level: "Band 6.5–7",
        topic: "History of Technology",
        passage:
    `The earliest documented ancestor of the modern bicycle, a wooden vehicle without pedals known as the "draisine" or "running machine", was patented by German inventor Karl von Drais in 1817, allowing riders to propel themselves forward by pushing off the ground with their feet while balancing on two wheels. Contemporary observers were reportedly divided over whether the contraption represented a genuine advance in personal transport or merely an eccentric curiosity destined for obscurity.
    
    Pedals were not added directly to the front wheel until the 1860s, in a design commonly called the "boneshaker" due to its rigid iron frame and wooden wheels, which transmitted every bump in the road directly to the rider with little cushioning. Contemporaries nonetheless regarded the innovation as a meaningful improvement, however uncomfortable, since it eliminated the need for the rider's feet to touch the ground at all while in motion.
    
    The 1870s saw the emergence of the high-wheel bicycle, popularly known as the "penny-farthing", featuring an oversized front wheel that allowed greater speed per pedal rotation but made the machine notoriously unstable and prone to throwing riders over the handlebars during sudden stops. Manufacturers persisted with the design for over a decade regardless, evidently judging the appeal of increased speed to outweigh the considerable risks involved.
    
    A major design breakthrough arrived in 1885 with the "safety bicycle", which introduced a chain-driven rear wheel and two similarly sized wheels, dramatically improving stability and making cycling accessible to a far wider range of riders, including women, for whom earlier designs had been particularly impractical. Sales figures from the period suggest that this broadened appeal translated into a substantial and lasting expansion of the cycling market as a whole.
    
    The invention of pneumatic (air-filled) rubber tyres by John Boyd Dunlop in 1888 further transformed the riding experience, significantly improving comfort and traction compared with the solid rubber tyres used previously, and the technology was rapidly adopted across the industry within just a few years. Within a remarkably short span, manufacturers who had initially dismissed the innovation as an unnecessary refinement found themselves compelled to adopt it merely to remain competitive.
    
    Beyond its technical evolution, the bicycle had a profound social impact, particularly in the late nineteenth century, when it offered many women unprecedented personal mobility and independence, a change some historians have directly linked to broader shifts in women's fashion and social expectations during the period. Whether this shift in personal freedom should be attributed primarily to the bicycle itself, or to broader social currents already underway, remains a matter of some scholarly disagreement.`,
        tasks: [
          {
            type: "info-match",
            title: "Matching Information — Practice",
            instructions: "The passage above has six paragraphs, A–F (in order, top to bottom). Which paragraph contains each piece of information below? NB: the questions are not necessarily in the same order as the paragraphs.",
            strategy: [
              "Unlike Matching Headings, this task asks about a specific detail or fact — scan for keywords related to the question, not the paragraph's general topic.",
              "The information you need might be just one sentence within a longer paragraph — don't rule a paragraph out just because its overall topic seems different.",
              "The order of the questions is often deliberately scrambled — don't assume Question 1 is in Paragraph A.",
              "Paraphrase matters here too — the question will rarely use the exact same words as the passage.",
            ],
            walkthrough: {
              text: "Question: 'Which paragraph mentions a design that made cycling more accessible to women?'",
              steps: [
                "Key concept: accessibility for women — scan for related words like 'women', 'accessible', 'wider range of riders'.",
                "Paragraph F also mentions women, but its focus is fashion and social expectations — a broader social impact, not a specific design feature.",
                "Paragraph D explicitly says the safety bicycle design made cycling 'accessible to a far wider range of riders, including women, for whom earlier designs had been particularly impractical' — this directly answers the question.",
              ],
              answer: "Paragraph D",
              whyNotOthers: "Paragraph F is a tempting trap because it also mentions women, but it discusses social and cultural impact, not the specific design feature the question asks about.",
            },
            paragraphLabels: ["A", "B", "C", "D", "E", "F"],
            items: [
              { id: "r3-1", text: "a bicycle design known for being particularly unstable", answer: "C" },
              { id: "r3-2", text: "the invention of air-filled tyres", answer: "E" },
              { id: "r3-3", text: "a vehicle that had no pedals at all", answer: "A" },
              { id: "r3-4", text: "a link between cycling and changes in women's fashion", answer: "F" },
              { id: "r3-5", text: "a rigid frame that transmitted every bump to the rider", answer: "B" },
            ],
          },
          {
            type: "tfng",
            title: "True / False / Not Given",
            instructions: "Do the statements agree with the information in the passage? Write TRUE, FALSE or NOT GIVEN.",
            strategy: [
              "Check exact wording, not your general impression.",
              "Watch for qualifiers like 'only' or 'all' that can flip TRUE into FALSE.",
            ],
            items: [
              { id: "r3t-1", text: "The draisine had pedals.", answer: "FALSE" },
              { id: "r3t-2", text: "The boneshaker had a rigid iron frame.", answer: "TRUE" },
              { id: "r3t-3", text: "The penny-farthing was known for being very stable.", answer: "FALSE" },
              { id: "r3t-4", text: "The safety bicycle used a chain-driven rear wheel.", answer: "TRUE" },
              { id: "r3t-5", text: "Pneumatic tyres were less comfortable than solid rubber tyres.", answer: "FALSE" },
              { id: "r3t-6", text: "The bicycle had an impact on women's social independence.", answer: "TRUE" },
            ],
          },
          {
            type: "heading-match",
            title: "Matching Headings",
            instructions: "The passage above has six paragraphs (in order). Choose the correct heading for each from the list below. There are more headings than paragraphs.",
            strategy: [
              "Match the paragraph's overall function, not one detail inside it.",
              "Eliminate headings that fit a different paragraph in the passage.",
            ],
            headings: [
              "An early vehicle without pedals",
              "A rough ride on a rigid frame",
              "An exciting but hazardous design",
              "Widening access through better balance",
              "A change in tyre technology",
              "New freedoms beyond the machine itself",
              "Bicycle racing gains in popularity",
              "The decline of bicycle manufacturing",
            ],
            items: [
              { id: "r3h-1", paragraph: "Paragraph A", answer: 0 },
              { id: "r3h-2", paragraph: "Paragraph B", answer: 1 },
              { id: "r3h-3", paragraph: "Paragraph C", answer: 2 },
              { id: "r3h-4", paragraph: "Paragraph D", answer: 3 },
              { id: "r3h-5", paragraph: "Paragraph E", answer: 4 },
              { id: "r3h-6", paragraph: "Paragraph F", answer: 5 },
            ],
          },
          {
            type: "summary",
            title: "Summary Completion",
            instructions: "Complete the summary below. Use NO MORE THAN TWO WORDS from the passage for each answer.",
            strategy: [
              "Identify the required part of speech before scanning the text.",
              "Recount your words against the limit before finalising each answer.",
            ],
            summaryTemplate:
              "The earliest bicycle ancestor, the {0}, had no pedals and required riders to push off the ground. Pedals were added in the 1860s in a design called the {1}, known for its uncomfortable ride. The high-wheel 'penny-farthing' of the 1870s offered speed but was notoriously {2}. The 1885 safety bicycle introduced a {3}-driven rear wheel, making cycling accessible to more riders. Later, {4} tyres improved comfort significantly.",
            items: [
              { id: "r3s-1", answer: ["draisine"] },
              { id: "r3s-2", answer: ["boneshaker"] },
              { id: "r3s-3", answer: ["unstable"] },
              { id: "r3s-4", answer: ["chain"] },
              { id: "r3s-5", answer: ["pneumatic"] },
            ],
          },
          {
            type: "mcq",
            title: "Multiple Choice",
            instructions: "Choose the correct letter, A, B, C or D, for each question.",
            strategy: [
              "Predict an answer before reading the options.",
              "Eliminate options that add claims the passage never makes.",
            ],
            items: [
              { id: "r3m-1", text: "According to the passage, how did the draisine allow riders to move?", opts: ["By pedalling continuously", "By pushing off the ground with their feet", "By using a hand crank", "By a small motor"], answer: 1 },
              { id: "r3m-2", text: "Why was the penny-farthing considered dangerous?", opts: ["It had no brakes at all", "Its oversized front wheel made it unstable and prone to throwing riders over the handlebars", "It was made entirely of glass", "It could only be ridden downhill"], answer: 1 },
              { id: "r3m-3", text: "What made the safety bicycle a major breakthrough?", opts: ["It was the first bicycle with wheels", "It introduced chain drive and similarly sized wheels, improving stability and accessibility", "It was the fastest bicycle ever built", "It eliminated the need for tyres"], answer: 1 },
              { id: "r3m-4", text: "According to the passage, what effect did pneumatic tyres have?", opts: ["They made bicycles heavier and slower", "They significantly improved comfort and traction compared to solid rubber tyres", "They were rejected by the industry for decades", "They had no noticeable effect on riding"], answer: 1 },
            ],
          },
          {
            type: "ynng",
            title: "Yes / No / Not Given",
            instructions: "Do the statements agree with the views of the writer? Choose YES, NO, or NOT GIVEN.",
            strategy: [
              "This checks the writer's own opinion, not just facts reported.",
              "If a claim is attributed to 'some historians' rather than stated by the writer directly, it's often NOT GIVEN.",
            ],
            items: [
              { id: "r3y-1", text: "The writer believes the bicycle contributed to greater independence for women in the late nineteenth century.", opts: ["YES", "NO", "NOT GIVEN"], answer: 0 },
              { id: "r3y-2", text: "The writer believes the connection between cycling and women's fashion changes is proven beyond any doubt.", opts: ["YES", "NO", "NOT GIVEN"], answer: 2 },
              { id: "r3y-3", text: "The writer believes the penny-farthing was the safest bicycle design of its time.", opts: ["YES", "NO", "NOT GIVEN"], answer: 1 },
              { id: "r3y-4", text: "The writer has personally ridden a penny-farthing.", opts: ["YES", "NO", "NOT GIVEN"], answer: 2 },
            ],
          },
        ],
      },
      {
        id: "text-4",
        title: "The Development of GPS Technology",
        level: "Band 7–7.5",
        topic: "Technology",
        passage:
    `The Global Positioning System, commonly known as GPS, originated from a United States military project in the 1970s, designed to provide precise location and timing information anywhere on Earth using a network of orbiting satellites. That such a system should ultimately become indispensable to civilian life would likely have struck its original architects, who conceived of it in exclusively strategic terms, as scarcely conceivable.
    
    The system relies on a constellation of at least 24 satellites, each transmitting continuous radio signals containing the exact time and the satellite's precise orbital position; a GPS receiver calculates its own location by measuring the time delay of signals received from at least four different satellites simultaneously. This technique, known as trilateration, depends critically on the exceptional precision of the atomic clocks each satellite carries, since even a minuscule timing discrepancy can translate into a substantial positional error on the ground.
    
    Although designed primarily for military applications, the U.S. government made a degraded, less accurate version of the signal available for civilian use starting in the 1980s, before removing this intentional signal degradation entirely in 2000, dramatically improving the accuracy available to ordinary consumers overnight. The rationale underpinning this policy, subsequently referred to as Selective Availability, was rooted in concerns that adversarial actors might otherwise exploit the system's precision for hostile purposes.
    
    Modern GPS receivers, now embedded in smartphones, vehicles, and countless other devices, can typically determine a location to within a few metres, a level of precision that has enabled applications ranging from everyday navigation to precision agriculture and disaster response coordination. This proliferation of applications has, in turn, generated an economic dependency so pervasive that any significant disruption to the system would carry consequences extending well beyond mere inconvenience.
    
    Despite its ubiquity, GPS signals are relatively weak by the time they reach Earth's surface and can be disrupted by physical obstructions such as tall buildings or dense forest canopy, as well as by deliberate interference, prompting ongoing research into backup and complementary positioning technologies. Consequently, engineers have increasingly turned to hybrid positioning approaches that combine GPS with inertial sensors and, in certain contexts, terrestrial radio signals, in order to preserve positional accuracy during the brief intervals when satellite reception is degraded or lost altogether.`,
        tasks: [
          {
            type: "summary",
            title: "Summary Completion — Practice",
            instructions: "Complete the summary below. Use NO MORE THAN TWO WORDS from the passage for each answer.",
            strategy: [
              "Read the whole summary once before filling any gaps — it usually follows the same order as the passage, which helps you locate each answer faster.",
              "Identify the part of speech needed for each gap (noun, adjective, etc.) before searching the text — this narrows down what you're looking for.",
              "The answer is almost always the word or phrase immediately next to a 'landmark' word that also appears in the summary — use that shared word as your anchor point in the text.",
              "Always recount your words against the limit before finalising an answer — a technically-correct answer that's too long is still marked wrong.",
            ],
            walkthrough: {
              text: "Summary: 'GPS began as a ___ project in the 1970s.'",
              steps: [
                "Identify what's needed: an adjective or noun modifying 'project'.",
                "Scan the passage for '1970s' as the anchor — Paragraph 1 says 'originated from a United States military project in the 1970s'.",
                "The word immediately before 'project' in the text is 'military' — that's the answer.",
              ],
              answer: "military",
              whyNotOthers: "Summary Completion answers are almost always positioned right next to a word that also appears in the summary itself (here, 'project' and '1970s') — use those shared words as anchors rather than re-reading the whole passage.",
            },
            summaryTemplate:
              "GPS began as a {0} project in the 1970s, using a network of satellites to provide location and timing data. A receiver determines its position by measuring the {1} of signals from at least four satellites. Until 2000, civilian signals were deliberately {2}, limiting their accuracy; since then, consumer devices can typically pinpoint a location to within a few {3}. However, GPS signals can be blocked by physical obstacles or {4} interference.",
            items: [
              { id: "r4-1", answer: ["military"] },
              { id: "r4-2", answer: ["time delay"] },
              { id: "r4-3", answer: ["degraded"] },
              { id: "r4-4", answer: ["metres"] },
              { id: "r4-5", answer: ["deliberate"] },
            ],
          },
          {
            type: "tfng",
            title: "True / False / Not Given",
            instructions: "Do the statements agree with the information in the passage? Write TRUE, FALSE or NOT GIVEN.",
            strategy: [
              "Check exact wording against the passage.",
              "Watch for numbers — a common trap is a slightly wrong figure.",
            ],
            items: [
              { id: "r4t-1", text: "GPS originated as a US military project in the 1970s.", answer: "TRUE" },
              { id: "r4t-2", text: "A GPS receiver needs signals from only two satellites to calculate its location.", answer: "FALSE" },
              { id: "r4t-3", text: "Civilian GPS signals were deliberately made less accurate before 2000.", answer: "TRUE" },
              { id: "r4t-4", text: "Modern GPS receivers cannot be embedded in smartphones.", answer: "FALSE" },
              { id: "r4t-5", text: "GPS signals can be disrupted by tall buildings or dense forest.", answer: "TRUE" },
              { id: "r4t-6", text: "GPS signals are extremely strong by the time they reach Earth's surface.", answer: "FALSE" },
            ],
          },
          {
            type: "heading-match",
            title: "Matching Headings",
            instructions: "The passage above has five paragraphs (in order). Choose the correct heading for each from the list below. There are more headings than paragraphs.",
            strategy: [
              "Match the paragraph's overall function, not one detail inside it.",
              "Eliminate headings that fit a different paragraph in the passage.",
            ],
            headings: [
              "A military origin",
              "How location is calculated",
              "Opening the system to everyday users",
              "From military tool to everyday device",
              "Limits of an invisible signal",
              "The cost of satellite launches",
              "A brief history of space exploration",
            ],
            items: [
              { id: "r4h-1", paragraph: "Paragraph 1", answer: 0 },
              { id: "r4h-2", paragraph: "Paragraph 2", answer: 1 },
              { id: "r4h-3", paragraph: "Paragraph 3", answer: 2 },
              { id: "r4h-4", paragraph: "Paragraph 4", answer: 3 },
              { id: "r4h-5", paragraph: "Paragraph 5", answer: 4 },
            ],
          },
          {
            type: "info-match",
            title: "Matching Information",
            instructions: "The passage has five paragraphs, A–E. Which paragraph contains each piece of information below?",
            strategy: [
              "Scan for the specific fact named, not the paragraph's general topic.",
              "Questions are often scrambled — don't assume order matches the passage.",
            ],
            paragraphLabels: ["A", "B", "C", "D", "E"],
            items: [
              { id: "r4i-1", text: "the minimum number of satellites a receiver needs", answer: "B" },
              { id: "r4i-2", text: "the year intentional signal degradation was removed", answer: "C" },
              { id: "r4i-3", text: "an example of an application enabled by modern GPS precision", answer: "D" },
              { id: "r4i-4", text: "a type of obstacle that can block GPS signals", answer: "E" },
              { id: "r4i-5", text: "the original purpose GPS was designed for", answer: "A" },
            ],
          },
          {
            type: "mcq",
            title: "Multiple Choice",
            instructions: "Choose the correct letter, A, B, C or D, for each question.",
            strategy: [
              "Predict an answer before reading the options.",
              "Eliminate options that add claims the passage never makes.",
            ],
            items: [
              { id: "r4m-1", text: "How many satellites does a GPS receiver need to calculate its location, according to the passage?", opts: ["At least two", "At least three", "At least four", "Exactly one"], answer: 2 },
              { id: "r4m-2", text: "What happened to civilian GPS accuracy in the year 2000?", opts: ["It was degraded intentionally for the first time", "Intentional signal degradation was removed, improving accuracy", "GPS was shut down entirely", "It became available for the first time"], answer: 1 },
              { id: "r4m-3", text: "According to the passage, what can disrupt GPS signals?", opts: ["Only extreme cold temperatures", "Physical obstructions like tall buildings and dense forest canopy", "Nothing can disrupt GPS signals", "Only nighttime conditions"], answer: 1 },
              { id: "r4m-4", text: "What is one application of modern GPS mentioned in the passage?", opts: ["Precision agriculture", "Weather forecasting", "Underwater exploration", "Space travel"], answer: 0 },
            ],
          },
          {
            type: "ynng",
            title: "Yes / No / Not Given",
            instructions: "Do the statements agree with the views of the writer? Choose YES, NO, or NOT GIVEN.",
            strategy: [
              "This checks the writer's own opinion, not just facts reported.",
              "Personal-experience claims not mentioned anywhere are always NOT GIVEN.",
            ],
            items: [
              { id: "r4y-1", text: "The writer believes removing intentional signal degradation had a major positive impact on ordinary consumers.", opts: ["YES", "NO", "NOT GIVEN"], answer: 0 },
              { id: "r4y-2", text: "The writer believes GPS is completely immune to interference.", opts: ["YES", "NO", "NOT GIVEN"], answer: 1 },
              { id: "r4y-3", text: "The writer believes GPS technology will soon be replaced entirely by a different system.", opts: ["YES", "NO", "NOT GIVEN"], answer: 2 },
              { id: "r4y-4", text: "The writer worked directly on the original GPS military project.", opts: ["YES", "NO", "NOT GIVEN"], answer: 2 },
            ],
          },
        ],
      },
      {
        id: "text-5",
        title: "The Science of Colour Perception in Animals",
        level: "Band 7.5–8",
        topic: "Biology",
        passage:
    `Human vision relies on three types of colour-sensitive cells, known as cones, allowing people to perceive a broad spectrum of colour through combinations of red, green, and blue light sensitivity. However, this three-cone system, while effective, represents only one of many colour perception strategies found throughout the animal kingdom. This apparent diversity invites a reconsideration of the tacit assumption, common outside specialist circles, that human vision constitutes some kind of perceptual benchmark against which other species' capacities might meaningfully be measured.
    
    Many bird species possess four types of cones rather than three, extending their colour perception into the ultraviolet range, a part of the spectrum entirely invisible to humans. This additional sensitivity plays a significant role in mate selection for some species, since certain plumage patterns visible under ultraviolet light are imperceptible to human observers entirely. That such visually encoded information should remain wholly inaccessible to an outside observer lacking the requisite photoreceptors underscores the extent to which perceptual experience is contingent upon the particular sensory apparatus an organism happens to possess.
    
    At the other end of the spectrum, most mammals other than primates possess only two types of cones, limiting their colour discrimination considerably compared with humans. This is generally attributed to an evolutionary history in which many early mammals were primarily active at night, when colour vision offers less practical advantage than sensitivity to low light levels. This trade-off illustrates a broader evolutionary principle whereby sensory capacities are seldom optimised in isolation, but rather calibrated against the specific ecological pressures an organism's ancestors confronted.
    
    Mantis shrimp represent an extreme case, possessing up to sixteen types of photoreceptors, far exceeding the three or four found in most other animals. Curiously, however, research suggests that mantis shrimp may not necessarily process colour information more effectively than animals with fewer receptor types, since having more receptor types does not automatically translate into more sophisticated colour discrimination in the brain's processing centres. This counterintuitive finding has prompted some researchers to speculate that the apparent redundancy may instead serve a distinct function, such as enabling extraordinarily rapid, if comparatively coarse, colour categorisation rather than the fine-grained discrimination a mammalian visual system achieves.
    
    These considerable variations across species illustrate an important broader principle in evolutionary biology: sensory systems tend to evolve in response to an organism's specific ecological needs, rather than progressing toward some universal standard of sensory sophistication, meaning that no single species' perceptual system can accurately be described as objectively "better" than another's in any absolute sense. Any temptation to impose a hierarchical ranking upon these divergent systems, however intuitively appealing, therefore risks conflating the parochial standards of human perception with an objective, species-independent measure that the available evidence simply does not support.`,
        tasks: [
          {
            type: "mcq",
            title: "Multiple Choice — Practice",
            instructions: "Choose the correct letter, A, B, C or D, for each question.",
            strategy: [
              "Read the question stem carefully and try to predict the answer yourself before looking at the options.",
              "Eliminate options that are only partially true or that add extra information the text doesn't actually support.",
              "Watch for options that reuse exact words from the passage but subtly change the meaning through a small addition or omission.",
              "For 'why' or inference questions, the correct answer must be directly supported by a specific sentence — not just plausible general knowledge about the topic.",
            ],
            walkthrough: {
              text: "Question: 'What can be inferred about the mantis shrimp's sixteen photoreceptor types?' A) They guarantee superior colour vision. B) They do not necessarily result in more sophisticated colour processing. C) They are used only for detecting predators. D) They evolved specifically for underwater navigation.",
              steps: [
                "Locate the relevant part of the text: Paragraph 4 discusses mantis shrimp specifically.",
                "The text says more receptor types 'does not automatically translate into more sophisticated colour discrimination' — this directly matches option B, and directly contradicts option A.",
                "Options C and D introduce claims (predator detection, underwater navigation) that are never mentioned in the text at all — eliminate them as unsupported additions.",
              ],
              answer: "B) They do not necessarily result in more sophisticated colour processing.",
              whyNotOthers: "Option A is the tempting 'obvious' assumption — more receptors must mean better vision — which the text specifically warns against. C and D sound plausible but are entirely unsupported by the passage.",
            },
            items: [
              { id: "r5-1", text: "According to the passage, human colour vision is based on how many types of cones?", opts: ["Two", "Three", "Four", "Sixteen"], answer: 1 },
              { id: "r5-2", text: "Why is ultraviolet colour perception significant for some bird species?", opts: ["It helps them see better at night", "It plays a role in mate selection through plumage patterns invisible to humans", "It allows them to detect predators more easily", "It has no known biological function"], answer: 1 },
              { id: "r5-3", text: "According to the passage, why do most non-primate mammals have limited colour vision?", opts: ["They evolved primarily to be active at night, when colour vision is less useful", "They lack the necessary eye structures entirely", "Colour vision was never present in early animal ancestors", "They rely entirely on smell instead of sight"], answer: 0 },
              { id: "r5-4", text: "What does the passage suggest about mantis shrimp's colour perception?", opts: ["Having more photoreceptor types definitely makes their colour perception more sophisticated", "More receptor types do not necessarily mean more sophisticated colour processing in the brain", "They cannot perceive colour at all", "Their visual system is identical to that of birds"], answer: 1 },
              { id: "r5-5", text: "What broader conclusion does the passage draw about sensory systems across species?", opts: ["All species are evolving toward the same ideal sensory system", "Human sensory systems are objectively the most advanced", "Sensory systems evolve according to each species' specific ecological needs, not a universal standard", "Sensory sophistication can be ranked objectively across all species"], answer: 2 },
            ],
          },
          {
            type: "tfng",
            title: "True / False / Not Given",
            instructions: "Do the statements agree with the information in the passage? Write TRUE, FALSE or NOT GIVEN.",
            strategy: [
              "Check exact wording against the passage.",
              "Watch for absolute words like 'all' or 'exactly' that can flip TRUE into FALSE.",
            ],
            items: [
              { id: "r5t-1", text: "Humans have three types of colour-sensitive cones.", answer: "TRUE" },
              { id: "r5t-2", text: "All animals perceive colour using exactly three types of cones.", answer: "FALSE" },
              { id: "r5t-3", text: "Some birds can see into the ultraviolet range.", answer: "TRUE" },
              { id: "r5t-4", text: "Most non-primate mammals have more cone types than humans.", answer: "FALSE" },
              { id: "r5t-5", text: "Mantis shrimp definitely process colour information more effectively than all other animals.", answer: "FALSE" },
              { id: "r5t-6", text: "Sensory systems evolve to suit each species' specific ecological needs.", answer: "TRUE" },
            ],
          },
          {
            type: "heading-match",
            title: "Matching Headings",
            instructions: "The passage above has five paragraphs (in order). Choose the correct heading for each from the list below. There are more headings than paragraphs.",
            strategy: [
              "Match the paragraph's overall function, not one detail inside it.",
              "Eliminate headings that fit a different paragraph in the passage.",
            ],
            headings: [
              "The building blocks of human colour vision",
              "Seeing beyond human limits for mating success",
              "A vision system shaped by nocturnal habits",
              "More receptors, not necessarily better vision",
              "No single 'best' way to see the world",
              "The discovery of the first colour-blind species",
              "How colour vision aids camouflage",
            ],
            items: [
              { id: "r5h-1", paragraph: "Paragraph 1", answer: 0 },
              { id: "r5h-2", paragraph: "Paragraph 2", answer: 1 },
              { id: "r5h-3", paragraph: "Paragraph 3", answer: 2 },
              { id: "r5h-4", paragraph: "Paragraph 4", answer: 3 },
              { id: "r5h-5", paragraph: "Paragraph 5", answer: 4 },
            ],
          },
          {
            type: "info-match",
            title: "Matching Information",
            instructions: "The passage has five paragraphs, A–E. Which paragraph contains each piece of information below?",
            strategy: [
              "Scan for the specific fact named, not the paragraph's general topic.",
              "Questions are often scrambled — don't assume order matches the passage.",
            ],
            paragraphLabels: ["A", "B", "C", "D", "E"],
            items: [
              { id: "r5i-1", text: "an example of a species with far more photoreceptor types than most others", answer: "D" },
              { id: "r5i-2", text: "a reason some birds have an advantage in choosing mates", answer: "B" },
              { id: "r5i-3", text: "an evolutionary explanation linked to nighttime activity", answer: "C" },
              { id: "r5i-4", text: "a general principle about how sensory systems evolve", answer: "E" },
              { id: "r5i-5", text: "the three colours combined in human cone sensitivity", answer: "A" },
            ],
          },
          {
            type: "summary",
            title: "Summary Completion",
            instructions: "Complete the summary below. Use NO MORE THAN TWO WORDS from the passage for each answer.",
            strategy: [
              "Identify the required part of speech before scanning the text.",
              "Recount your words against the limit before finalising each answer.",
            ],
            summaryTemplate:
              "Human colour vision relies on three types of {0}, sensitive to red, green, and blue light. Some birds have a fourth cone type that extends into the {1} range, useful for {2} selection. Most non-primate mammals, by contrast, have only two cone types, likely because early mammals were mainly active at {3}. Mantis shrimp have up to sixteen photoreceptor types, but this does not necessarily mean {4} colour processing.",
            items: [
              { id: "r5s-1", answer: ["cones"] },
              { id: "r5s-2", answer: ["ultraviolet"] },
              { id: "r5s-3", answer: ["mate"] },
              { id: "r5s-4", answer: ["night"] },
              { id: "r5s-5", answer: ["better", "more sophisticated"] },
            ],
          },
          {
            type: "ynng",
            title: "Yes / No / Not Given",
            instructions: "Do the statements agree with the views of the writer? Choose YES, NO, or NOT GIVEN.",
            strategy: [
              "This checks the writer's own opinion, not just facts reported.",
              "Look for the writer's own concluding argument, often signalled near the end of a passage.",
            ],
            items: [
              { id: "r5y-1", text: "The writer believes no species' visual system can be objectively ranked as better than another's.", opts: ["YES", "NO", "NOT GIVEN"], answer: 0 },
              { id: "r5y-2", text: "The writer believes human colour vision is the most advanced in the animal kingdom.", opts: ["YES", "NO", "NOT GIVEN"], answer: 1 },
              { id: "r5y-3", text: "The writer believes mantis shrimp definitely have superior colour perception due to their many receptors.", opts: ["YES", "NO", "NOT GIVEN"], answer: 1 },
              { id: "r5y-4", text: "The writer has conducted original laboratory research on mantis shrimp vision.", opts: ["YES", "NO", "NOT GIVEN"], answer: 2 },
            ],
          },
        ],
      },
    ],
  },

  // Юниты 6–10: смешанная практика по нарастанию сложности — добавляются по этой же схеме.
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
