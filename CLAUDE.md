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

### Mascot Admonition Format

Always place the mascot image in the admonition body, never in the title bar:

    !!! mascot-welcome "Title Here"
        <img src="../../img/mascot/welcome.png" class="mascot-admonition-img" alt="Sylvia waving welcome">
        Admonition text goes here after the img tag.

The `src` path is relative to the rendered page URL, not the markdown file. Because MkDocs uses directory URLs, for a chapter page at `chapters/NN-chapter-name/index.md`, use `../../img/mascot/`.

### Placement Rules

| Context | Admonition Type | Frequency |
|---------|----------------|-----------|
| General note / sidebar | mascot-neutral | As needed |
| Chapter opening | mascot-welcome | Every chapter |
| Key concept / "aha" moment | mascot-thinking | 2-3 per chapter |
| Helpful tip | mascot-tip | As needed |
| Common money mistake | mascot-warning | As needed |
| End of chapter / milestone | mascot-celebration | Once per chapter |
| Difficult topic | mascot-encourage | Where students may struggle |

### Do's and Don'ts

**Do:**

- Use Sylvia to warmly introduce new topics
- Include the catchphrase in chapter-opening welcomes
- Keep Sylvia's dialogue brief (1–3 sentences)
- Match the pose/image to the content type

**Don't:**

- Use Sylvia more than 5–6 times per chapter
- Place mascot admonitions back-to-back
- Use Sylvia as pure decoration — every appearance should add warmth or wayfinding value
- Change Sylvia's personality or speech patterns across chapters
