# AI Writing Markers Reference

Comprehensive checklist of patterns that signal AI-generated text. Sourced from Wikipedia:Signs of AI writing, writing editors on X, and detection research. Use during Pass 1 of pre-publish-check.

## Vocabulary Flags

Flag when 3+ appear in the same section. Any single use in an unnatural context is also a flag.

**Tier 1 (near-certain AI tells):**
delve, tapestry (abstract), realm, pivotal, meticulous/meticulously, underscore (verb), showcase/showcasing, intricate/intricacies, interplay, fostering, testament, nestled, vibrant

**Tier 2 (suspicious in clusters):**
landscape (metaphorical), paradigm, holistic, robust, seamless, innovative, cutting-edge, unprecedented, multifaceted, crucial, comprehensive, transformative, navigate (metaphorical), embark, streamline, enhance, harness (verb, "harness the power"), leverage (verb, non-financial), utilize (instead of "use"), synergy, underpinnings, garner, enduring, groundbreaking, profound

**Tier 3 (hedging/filler words to scrutinize):**
notably, arguably, certainly, furthermore, moreover, additionally, it bears noting, perhaps most importantly, generally speaking, in many cases, could potentially

## Phrase-Level Markers

**Throat-clearing openers:**
- "In today's rapidly evolving [landscape/world]"
- "In today's ever-evolving [X]"
- "It's important to note that" / "It's worth noting that"
- "To be clear,"
- "Let's dive in" / "Let's delve into"

**Sycophantic/engagement patterns:**
- "Certainly!" / "Great question!" / "That's a really interesting point"
- Concluding engagement-bait questions ("What was the one thing that leveled up...?")

**False balance templates:**
- "While there are certainly benefits, it's also important to consider the potential drawbacks"
- "While X is impressive, Y remains a challenge"
- Always presenting both sides even when one side is clearly stronger

**Canned significance:**
- "This represents a significant step forward"
- "At its core"
- "The key takeaway here is"
- "This raises important questions about" (without specifying the questions)

**Closing/transition filler:**
- "In summary" / "In conclusion" / "In essence"
- "That said," / "Moving on," / "With that in mind,"
- "At the end of the day"

**Vague attributions:**
- "Experts argue..." / "Observers have cited..." / "Many believe..."
- "valuable insights" / "reflecting/symbolizing/contributing to..."

## Structural Markers

**"It's not X, it's Y" (negative parallelism):**
- "It's not just X, it's Y"
- "Not only X, but also Y"
- "Not X, but Y"
- "Not a mirror but a portal"
Flagged by WIRED editors and the Wikipedia guide as one of the strongest AI structural tells. One per post is fine if natural. Multiple = obvious AI.

**Rule of three (tricolon lists):**
- Three parallel items, often with near-synonyms: "global SEO professionals, marketing experts, and growth hackers"
- AI defaults to groups of three when listing adjectives, benefits, takeaways, or examples
- Not always wrong, but flag clusters of tricolons

**Elegant variation / copula avoidance:**
- Replacing "is" with "serves as" / "stands as" / "marks" / "represents" / "boasts" / "features"
- Swapping synonyms to avoid repeating a word, even when repetition would be clearer

**Bold-header bullet lists:**
- Each item starts with **boldfaced header** followed by colon and description
- The single most distinctive AI formatting pattern per detection researchers

**Uniform paragraph structure:**
- Topic sentence + 2-3 supporting points + summary sentence, repeated identically
- Human writing varies paragraph shape

**Sandwich structure for opinions:**
- Positive framing, then concern, then reassurance
- Never just the concern on its own

## Punctuation Markers

**Em-dash overuse:**
- AI uses em-dashes as rhetorical bridges far more than human writers
- Flagged by WIRED senior writer, book authors, and multiple editors on X as "AI punctuation"
- Check: count em-dashes per 1000 words. Compare against author's published baseline. Flag if significantly above.
- Many em-dashes can be replaced with periods, commas, or "and"

**Semicolon patterns:**
- AI tends toward specific semicolon usage patterns that differ from human writing

## Rhythm and Tone Markers

**Monotonous sentence length:**
- Uniform medium-length sentences throughout
- Human writing varies: "One word. Then a normal one. Then something a little longer than it needs to be."
- Check standard deviation of sentence lengths

**Zero genuine voice quirks:**
- No sentence fragments, no intentional rule-breaking, no idiosyncratic punctuation
- Too-clean grammar throughout

**Generic hyperbole in casual context:**
- Formal verbs in casual text
- Promotional tone where personal voice should be

**Whiplash hedging:**
- Making a strong claim then immediately undermining it in the next sentence

## Quick Audit Checklist

1. Ctrl+F for Tier 1 vocabulary → rewrite any hits with plainer words
2. Count em-dashes → replace most with periods/commas, check against author baseline
3. Search "not X, it's Y" / "not only...but" → rephrase or cut
4. Flag rule-of-three lists → break pattern or vary
5. Check for bold-header bullet list structure → convert to narrative
6. Read aloud for rhythm → vary sentence length
7. Check tone: any promotional fluff, vague attributions, or engagement bait? Make specific or cut
8. Look for uniform paragraph shapes → vary structure
