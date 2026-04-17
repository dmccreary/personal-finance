# Personal Finance with AI — Project Guidelines

## Learning Mascot: Sylvia the Squirrel

### Character Overview

- **Name**: Sylvia
- **Species**: Red squirrel with a large bushy tail
- **Personality**: Thrifty, curious, encouraging, practical
- **Catchphrase**: "A nut saved is a nut earned!"
- **Visual**: Warm reddish-brown fur, cream-colored belly, small round glasses, a forest-green vest, and a golden acorn in one paw

### Voice Characteristics

- Uses simple, down-to-earth language — avoids jargon or explains it immediately
- Occasionally uses acorn/nut metaphors for money (e.g., "stashing acorns" = saving)
- Refers to students as "savers" or "planners"
- Normalizes mistakes; money topics can feel intimidating, and Sylvia's job is to make them feel manageable
- Signature phrases: "A nut saved is a nut earned!", "Time to stash that acorn.", "Every little bit compounds."

---

## Writing Style Guide (Sylvia's Voice)

All chapter prose should feel like it could be read aloud by Sylvia. Write in a friendly, encouraging, practical register throughout — not only inside mascot admonitions. The mascot admonitions amplify a voice that's already present in the main text.

### Core Principles

1. **Second person, warm and direct.** Write "you" not "the reader" or "one." Students should feel Sylvia is talking *to them*, not *about* them.
2. **Short sentences beat long ones.** Aim for an average sentence length under 20 words. Break complex ideas across two short sentences instead of one long one with commas.
3. **Define jargon immediately, in plain English.** The first time a term like "APR," "escrow," or "diversification" appears, define it in a clause — don't wait for the glossary.
4. **Concrete examples over abstract rules.** Numbers, dollar amounts, and real scenarios beat generalities. "Saving $50 a week for 30 years grows to about $165,000 at 7%" teaches more than "compound interest is powerful."
5. **Normalize struggle.** Money topics intimidate people. Use phrases like "This one takes a minute to sink in," "Most people get this wrong at first," or "It's okay if you read this twice." Never shame confusion.
6. **Encouragement without cheerleading.** Avoid exclamation-point overload and empty praise. Sylvia is warm, not peppy. One "you've got this" lands better than ten.
7. **Practical over theoretical.** Favor "what you can do with this" framings. Every major concept should connect to a decision a student will actually face.
8. **Use acorn/nut metaphors sparingly.** One or two per chapter max. Overuse turns the mascot into a gimmick.

### Words and Phrases to Prefer

| Instead of | Prefer |
|---|---|
| "utilize" | "use" |
| "in order to" | "to" |
| "purchase" | "buy" |
| "commence" | "start" |
| "facilitate" | "help" |
| "it is important to note that" | (just state the point) |
| "in conclusion" | (just say the conclusion) |
| "individuals" | "people" or "you" |
| "leverage" (as a verb) | "use" |
| "financial instruments" | "tools" or name the specific thing |

### Tone Guardrails

- **Don't lecture.** If a paragraph feels like a textbook lecturing the student, rewrite it as Sylvia explaining the same idea to a friend.
- **Don't moralize.** "You should never carry a credit card balance" lands badly. "Carrying a balance is expensive — here's what it costs" teaches the same lesson without judgment.
- **Don't assume wealth or privilege.** Many students reading this will have tight budgets, family financial stress, or no generational wealth background. Frame advice inclusively.
- **Don't write condescending disclaimers.** "This might be hard for beginners" reads as patronizing. Just explain clearly.

### American English

Always use American English spelling: "color" not "colour", "center" not "centre", "analyze" not "analyse", "favor" not "favour".

---

## Mascot Placement in Chapters

This section gives precise rules for adding Sylvia admonitions to chapter pages. Follow these rules exactly — they come from the `book-installer` mascot skill and prevent the most common mistakes.

### Chapter Appearance Budget

**Every chapter must have exactly:**

- **1 welcome admonition** at the very top, after the `# Heading`
- **1 celebration admonition** at the very bottom, before any quiz/next-chapter link

**Every chapter may additionally have, as the content calls for it:**

- **2–3 thinking admonitions** on genuine "aha" insights (key concepts, not every definition)
- **1–2 tip admonitions** for practical money-saving hints
- **0–2 warning admonitions** for common mistakes students make
- **0–1 encouraging admonition** on the single hardest section (if any)
- **mascot-neutral** only when nothing else fits — prefer the typed variants

**Soft target: 5–6 mascot admonitions per chapter. Hard cap: 10.** Fit beats frequency — if a section genuinely calls for a mascot admonition, add it. If it doesn't, skip it. Never add a mascot just to hit a count, and never exceed 10 in a single chapter.

### Placement Mechanics

**Admonition syntax** — always place the `<img>` inside the body, never the title:

```markdown
!!! mascot-welcome "Welcome to Chapter N"
    <img src="../../img/mascot/welcome.png" class="mascot-admonition-img" alt="Sylvia waving welcome">
    Body text goes here on the same indent level as the img tag.
```

**Image path rules** (count directories from the rendered page URL, not the `.md` file):

| Page location | src path |
|---|---|
| `docs/chapters/NN-name/index.md` | `../../img/mascot/POSE.png` |
| `docs/chapters/NN-name/some-subtopic.md` | `../../img/mascot/POSE.png` |
| `docs/index.md` (home) | `img/mascot/POSE.png` |
| `docs/learning-graph/PAGE.md` | `../../img/mascot/POSE.png` |

**Required mkdocs extensions** (already configured): `md_in_html`, `admonition`, `attr_list`, `pymdownx.details`, `pymdownx.superfences`. The `md_in_html` extension is what lets the `<img>` tag render inside the admonition body.

**Never do any of these:**

- Put mascot images in the admonition title bar
- Omit the `alt` attribute
- Place two mascot admonitions back-to-back with no prose between them
- Use a pose filename that doesn't match the admonition type (e.g., `welcome.png` inside a `mascot-warning` box)
- Write more than 3 sentences of body text — if it's longer, it's prose, not a mascot moment

### Pose ↔ Admonition Mapping

| Admonition type | Pose file | When to use |
|---|---|---|
| `mascot-welcome` | `welcome.png` | Top of every chapter. Preview what's coming. |
| `mascot-thinking` | `thinking.png` | A real "aha" insight — not a definition, an *implication*. |
| `mascot-tip` | `tip.png` | A concrete, actionable tip the student can apply this week. |
| `mascot-warning` | `warning.png` | A common mistake that costs real money. |
| `mascot-encourage` | `encouraging.png` | The single hardest section of the chapter. |
| `mascot-celebration` | `celebration.png` | End of chapter. Name what they now know. |
| `mascot-neutral` | `neutral.png` | General aside when no typed variant fits. Use sparingly. |

### Templates for Each Chapter

Copy these templates when adding Sylvia to a chapter. Replace the placeholder text but keep the structure.

**Chapter opening (required):**

```markdown
!!! mascot-welcome "Welcome to Chapter N"
    <img src="../../img/mascot/welcome.png" class="mascot-admonition-img" alt="Sylvia waving welcome">
    A nut saved is a nut earned! In this chapter, we'll look at [TOPIC]. By the end, you'll be able to [ONE CONCRETE SKILL].
```

**Key insight (2–3 per chapter):**

```markdown
!!! mascot-thinking "Key Insight"
    <img src="../../img/mascot/thinking.png" class="mascot-admonition-img" alt="Sylvia thinking">
    [ONE SENTENCE NAMING THE INSIGHT.] [ONE SENTENCE EXPLAINING WHY IT MATTERS FOR A REAL DECISION.]
```

**Helpful tip (0–2 per chapter):**

```markdown
!!! mascot-tip "Sylvia's Tip"
    <img src="../../img/mascot/tip.png" class="mascot-admonition-img" alt="Sylvia giving a tip">
    [ONE CONCRETE ACTION THE STUDENT CAN TAKE.] [OPTIONAL ONE-SENTENCE REASON.]
```

**Common mistake warning (0–2 per chapter):**

```markdown
!!! mascot-warning "Watch Out"
    <img src="../../img/mascot/warning.png" class="mascot-admonition-img" alt="Sylvia warning">
    [NAME THE COMMON MISTAKE.] [ONE SENTENCE ON WHAT IT ACTUALLY COSTS.]
```

**Encouragement on a hard section (0–1 per chapter):**

```markdown
!!! mascot-encourage "You've Got This"
    <img src="../../img/mascot/encouraging.png" class="mascot-admonition-img" alt="Sylvia encouraging">
    [ACKNOWLEDGE THAT THIS TOPIC IS HARD.] [NORMALIZE REREADING OR GETTING IT WRONG.]
```

**Chapter closer (required):**

```markdown
!!! mascot-celebration "Well Done"
    <img src="../../img/mascot/celebration.png" class="mascot-admonition-img" alt="Sylvia celebrating">
    You just added another acorn to your stash. You now know [NAME 2–3 SPECIFIC THINGS THEY CAN DO].
```

### Process for Updating an Existing Chapter

When asked to "add Sylvia" to an existing chapter, follow this exact sequence:

1. **Read the entire chapter first.** Identify the top, the bottom, the 2–3 highest-leverage insights, any genuinely tricky section, any common-mistake footgun, and any practical tip.
2. **Place the welcome admonition** immediately after the `# Chapter N — Title` line, before any prose.
3. **Place the celebration admonition** as the last content on the page (before quiz links, if any).
4. **Insert thinking admonitions after the paragraph that establishes each key insight** — not before. Sylvia reflects on what the student just read.
5. **Insert tips and warnings at natural decision points** in the text — where the student is about to choose or do something.
6. **Insert the encouragement admonition only if a section genuinely needs it.** Most chapters don't. If in doubt, leave it out.
7. **Enforce the 5–6 admonition cap.** Count before committing. If over, remove the weakest.
8. **Verify image paths.** For pages at `docs/chapters/NN-name/index.md`, the path is `../../img/mascot/POSE.png`.
9. **Preview with `mkdocs serve`** and visit the chapter before reporting done.

### Verification Checklist (before considering a chapter update complete)

- [ ] Exactly one `mascot-welcome` at the top
- [ ] Exactly one `mascot-celebration` at the bottom
- [ ] Total mascot admonitions between 3 and 10 (soft target 5–6; add more only when each earns its place)
- [ ] No two mascot admonitions appear back-to-back without prose between them
- [ ] Every `<img>` is inside the body, not the title
- [ ] Every `src` path resolves (check by serving locally)
- [ ] Every `alt` attribute is present and descriptive
- [ ] Pose filename matches admonition type (welcome→welcome.png, etc.)
- [ ] Body text in each admonition is 1–3 sentences
- [ ] No exclamation-point overload; Sylvia is warm, not hyperactive
- [ ] Chapter still reads well if all mascot admonitions are temporarily removed — mascot enhances, never replaces, the prose

### Do's and Don'ts (quick reference)

**Do:**

- Use Sylvia to warmly introduce new topics
- Include the catchphrase in chapter-opening welcomes
- Keep Sylvia's dialogue brief (1–3 sentences)
- Match the pose/image to the content type

**Don't:**

- Use Sylvia more than 10 times in any single chapter (soft target 5–6; add beyond only when each admonition genuinely earns its spot)
- Place mascot admonitions back-to-back
- Use Sylvia as pure decoration — every appearance should add warmth or wayfinding value
- Change Sylvia's personality or speech patterns across chapters
