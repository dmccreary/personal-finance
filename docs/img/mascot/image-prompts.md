# Sylvia the Squirrel — AI Image Generation Prompts

Character: **Sylvia the Squirrel**, pedagogical mascot for *Personal Finance with AI*.

Generate each pose at **1024x1024** with a fully transparent background, then trim padding and resize for web (target under 100KB). Save the results in `docs/img/mascot/` with the filenames indicated.

Each prompt below is self-contained — paste any single prompt into your AI image tool without needing the others.

---

## 1. Neutral Pose — `neutral.png`

```
Please generate a new pose for Sylvia the Squirrel.
A modern flat vector cartoon illustration of Sylvia the Squirrel, a friendly
pedagogical mascot for a personal finance textbook. Sylvia is a red squirrel
with warm reddish-brown fur, a cream-colored belly, a large bushy tail,
wearing small round glasses and a small forest-green vest. She holds a
single golden acorn in one paw. Sylvia has large, kind eyes and a gentle
closed-mouth smile. The character is small and compact, suitable for
icon-sized display. Style: modern flat vector, clean lines, transparent
background, suitable for embedding in educational content. No text in image.

Sylvia stands upright in a relaxed, neutral pose facing the viewer directly,
with a calm and friendly closed-mouth smile. Her paws rest naturally at her
sides with no specific gesture, holding the acorn in one paw. The pose is
balanced and unassuming — suitable as a general-purpose or default
illustration.
Filename: neutral.png

Please generate a new png image now with a fully transparent background now.
```

---

## 2. Welcome Pose — `welcome.png`

```
Please generate a new pose for Sylvia the Squirrel.
A modern flat vector cartoon illustration of Sylvia the Squirrel, a friendly
pedagogical mascot for a personal finance textbook. Sylvia is a red squirrel
with warm reddish-brown fur, a cream-colored belly, a large bushy tail,
wearing small round glasses and a small forest-green vest. She holds a
single golden acorn in one paw. Sylvia has large, kind eyes and a gentle
closed-mouth smile. The character is small and compact, suitable for
icon-sized display. Style: modern flat vector, clean lines, transparent
background, suitable for embedding in educational content. No text in image.

Sylvia is waving cheerfully with one paw, facing the viewer with a warm,
welcoming expression. The pose suggests "welcome" and "let's get started."
Filename: welcome.png

Please generate a new png image now with a fully transparent background now.
```

---

## 3. Thinking Pose — `thinking.png`

```
Please generate a new pose for Sylvia the Squirrel.
A modern flat vector cartoon illustration of Sylvia the Squirrel, a friendly
pedagogical mascot for a personal finance textbook. Sylvia is a red squirrel
with warm reddish-brown fur, a cream-colored belly, a large bushy tail,
wearing small round glasses and a small forest-green vest. She holds a
single golden acorn in one paw. Sylvia has large, kind eyes and a gentle
closed-mouth smile. The character is small and compact, suitable for
icon-sized display. Style: modern flat vector, clean lines, transparent
background, suitable for embedding in educational content. No text in image.

Sylvia has one paw on her chin in a thoughtful pose, with a small lightbulb
or thought bubble above her head. The pose suggests deep thinking and
discovery — as if she's just figured out a clever financial insight.
Filename: thinking.png

Please generate a new png image now with a fully transparent background now.
```

---

## 4. Tip Pose — `tip.png`

```
Please generate a new pose for Sylvia the Squirrel.
A modern flat vector cartoon illustration of Sylvia the Squirrel, a friendly
pedagogical mascot for a personal finance textbook. Sylvia is a red squirrel
with warm reddish-brown fur, a cream-colored belly, a large bushy tail,
wearing small round glasses and a small forest-green vest. She holds a
single golden acorn in one paw. Sylvia has large, kind eyes and a gentle
closed-mouth smile. The character is small and compact, suitable for
icon-sized display. Style: modern flat vector, clean lines, transparent
background, suitable for embedding in educational content. No text in image.

Sylvia is pointing upward with one paw as if sharing an important money-saving
tip. Expression is helpful and knowing. A small gold star or sparkle appears
near the pointing gesture.
Filename: tip.png

Please generate a new png image now with a fully transparent background now.
```

---

## 5. Warning Pose — `warning.png`

```
Please generate a new pose for Sylvia the Squirrel.
A modern flat vector cartoon illustration of Sylvia the Squirrel, a friendly
pedagogical mascot for a personal finance textbook. Sylvia is a red squirrel
with warm reddish-brown fur, a cream-colored belly, a large bushy tail,
wearing small round glasses and a small forest-green vest. She holds a
single golden acorn in one paw. Sylvia has large, kind eyes and a gentle
closed-mouth smile. The character is small and compact, suitable for
icon-sized display. Style: modern flat vector, clean lines, transparent
background, suitable for embedding in educational content. No text in image.

Sylvia holds up both paws in a gentle "stop" or "be careful" gesture.
Expression is concerned but caring. A small exclamation mark or caution
symbol appears nearby — signaling a common financial pitfall to avoid.
Filename: warning.png

Please generate a new png image now with a fully transparent background now.
```

---

## 6. Encouraging Pose — `encouraging.png`

```
Please generate a new pose for Sylvia the Squirrel.
A modern flat vector cartoon illustration of Sylvia the Squirrel, a friendly
pedagogical mascot for a personal finance textbook. Sylvia is a red squirrel
with warm reddish-brown fur, a cream-colored belly, a large bushy tail,
wearing small round glasses and a small forest-green vest. She holds a
single golden acorn in one paw. Sylvia has large, kind eyes and a gentle
closed-mouth smile. The character is small and compact, suitable for
icon-sized display. Style: modern flat vector, clean lines, transparent
background, suitable for embedding in educational content. No text in image.

Sylvia gives a thumbs-up paw gesture with a reassuring, supportive smile.
The pose radiates confidence and "you can do it" energy — appropriate for
encouraging students through difficult financial topics.
Filename: encouraging.png

Please generate a new png image now with a fully transparent background now.
```

---

## 7. Celebration Pose — `celebration.png`

```
Please generate a new pose for Sylvia the Squirrel.
A modern flat vector cartoon illustration of Sylvia the Squirrel, a friendly
pedagogical mascot for a personal finance textbook. Sylvia is a red squirrel
with warm reddish-brown fur, a cream-colored belly, a large bushy tail,
wearing small round glasses and a small forest-green vest. She holds a
single golden acorn in one paw. Sylvia has large, kind eyes and a gentle
closed-mouth smile. The character is small and compact, suitable for
icon-sized display. Style: modern flat vector, clean lines, transparent
background, suitable for embedding in educational content. No text in image.

Sylvia is jumping with both paws raised high in celebration, bushy tail
fluffed with excitement. Expression is joyful and proud. Small golden
confetti or sparkling coins fall around the character.
Filename: celebration.png

Please generate a new png image now with a fully transparent background now.
```

---

## After Generation

1. Save the seven PNG files to `docs/img/mascot/` with the exact filenames above.
2. Trim excess transparent padding (optional but strongly recommended):

```bash
python $BK_HOME/src/image-utils/trim-padding-from-image.py docs/img/mascot/neutral.png
python $BK_HOME/src/image-utils/trim-padding-from-image.py docs/img/mascot/welcome.png
python $BK_HOME/src/image-utils/trim-padding-from-image.py docs/img/mascot/thinking.png
python $BK_HOME/src/image-utils/trim-padding-from-image.py docs/img/mascot/tip.png
python $BK_HOME/src/image-utils/trim-padding-from-image.py docs/img/mascot/warning.png
python $BK_HOME/src/image-utils/trim-padding-from-image.py docs/img/mascot/encouraging.png
python $BK_HOME/src/image-utils/trim-padding-from-image.py docs/img/mascot/celebration.png
```

3. Preview all seven variants at `/learning-graph/mascot-test/` after running `mkdocs serve`.
