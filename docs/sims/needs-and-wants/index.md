---
title: Needs vs Wants
description: An interactive categorization game where students practice distinguishing between essential expenses (needs) and optional expenses (wants).
image: /sims/needs-and-wants/needs-and-wants.png
og:image: /sims/needs-and-wants/needs-and-wants.png
quality_score: 95
---

# Needs vs Wants

<iframe src="main.html" height="520px" width="100%" scrolling="no"></iframe>

[Run the Needs vs Wants MicroSim Fullscreen](./main.html){ .md-button .md-button--primary }
[Edit the Needs vs Wants MicroSim on the P5.js Editor](https://editor.p5js.org/dmccreary/sketches/diM_ZI9aH)
## Embedding This MicroSim

You can include this MicroSim on your website using the following `iframe`:

```html
<iframe src="https://dmccreary.github.io/personal-finance/sims/needs-and-wants/main.html" height="610px" width="100%" scrolling="no"></iframe>
```

## Description

The Needs vs Wants MicroSim is an interactive educational game that helps students develop critical financial literacy skills by practicing the categorization of expenses. Through this game-based learning experience, students work through 30 different expense scenarios, clicking buttons to identify each as a "Need," a "Want," or "It Depends" on context.

This MicroSim addresses one of the foundational concepts in personal finance: understanding the difference between essential expenses that are necessary for survival and well-being (needs) versus discretionary expenses that enhance quality of life but aren't strictly necessary (wants). Making this distinction is crucial for effective budgeting, financial planning, and achieving financial goals.

### Key Features

- **30 Expense Scenarios**: Students categorize a variety of realistic expenses including rent, subscriptions, groceries, insurance, and entertainment
- **Three-Category System**: Expenses are categorized as Needs (green), Wants (blue), or It Depends (yellow) for context-dependent items
- **Immediate Feedback**: Students receive instant feedback on each answer with explanations
- **Progress Tracking**: Visual score display shows current progress (X out of Y correct)
- **Educational Insights**: Each expense includes an explanation of why it's categorized that way
- **Context Awareness**: Some expenses are intentionally ambiguous to teach that context matters (e.g., a car payment might be a need if required for work, but a want if public transportation is available)
- **Final Score Summary**: Personalized feedback based on performance percentage

### Learning Objectives (Bloom's Taxonomy)

This MicroSim addresses multiple cognitive levels:

- **Remembering**: Recall the definitions of needs vs wants
- **Understanding**: Explain the difference between essential and discretionary expenses
- **Applying**: Categorize real-world expenses correctly
- **Analyzing**: Distinguish between clear-cut and context-dependent expenses
- **Evaluating**: Judge whether borderline expenses are truly necessary

## Lesson Plan

### Prerequisites

Students should understand:
- Basic financial vocabulary (expense, budget, income)
- The concept of limited resources requiring choices
- That people make trade-offs with their money

### Estimated Time

15-20 minutes for gameplay and discussion

### Learning Sequence

**1. Introduction (3 minutes)**
- Define "needs" as expenses essential for survival, safety, and basic well-being
- Define "wants" as expenses that enhance life but aren't strictly necessary
- Explain that context matters: the same expense might be different for different people

**2. Independent Practice (10 minutes)**
- Students play through the MicroSim individually or in pairs
- Encourage students to read the feedback explanations carefully
- Have students note any expenses they found surprising or disagreed with

**3. Class Discussion (5-7 minutes)**

Facilitate discussion around:
- Which expenses were easiest/hardest to categorize? Why?
- Which expenses surprised you?
- Can you think of situations where an expense might switch from want to need?
- How does the "cheaper alternative test" help? (If a cheaper option exists that meets the basic need, the expensive version is a want)

**4. Real-World Application**

Ask students to:
- List 5 of their own monthly expenses
- Categorize each as need or want
- Identify one "want" they could reduce or eliminate to free up money for savings

### Discussion Questions

1. **Critical Thinking**: "Is internet service a need or a want? How has this changed over time?"
   - *Teaching point*: Needs can evolve with society and technology

2. **Context Matters**: "When might a gym membership be a need instead of a want?"
   - *Teaching point*: Physical therapy, doctor-recommended exercise, professional athletes

3. **The Gray Area**: "What about 'emergency fund contribution'? Is saving a need or want?"
   - *Teaching point*: Financial security is a need, making emergency fund contributions essential

4. **Budget Impact**: "If someone spends 80% of their income on wants, what problems might they face?"
   - *Teaching point*: Insufficient funds for needs, no emergency savings, debt accumulation

### Assessment Opportunities

- **Formative**: Observe student performance score in the game (target: 75%+)
- **Discussion**: Listen for sophisticated reasoning about context-dependent expenses
- **Application**: Review students' categorization of their own expenses
- **Quiz Question**: "Explain why 'latest iPhone' is a want while 'phone bill' is a need"

### Extension Activities

**For Advanced Students**:
- Create a personal budget dividing expenses by needs/wants
- Research the 50/30/20 budgeting rule (50% needs, 30% wants, 20% savings)
- Analyze how needs/wants differ across income levels and cultures

**For Struggling Students**:
- Start with just the clear-cut examples
- Use the "cheaper alternative test": If a cheaper version exists, the expensive option is a want
- Create visual flashcards for common expenses

### Connection to Course Concepts

This MicroSim connects to:
- **Budgeting** (Chapter 3): Needs vs wants helps prioritize budget categories
- **Financial Goal Setting** (Chapter 1): Understanding wants helps identify areas to reduce spending
- **Opportunity Cost** (Chapter 1): Every want chosen means less money for needs or savings
- **Emergency Fund** (Chapter 3): Distinguishing needs helps calculate how large an emergency fund should be

### Tips for Effective Use

1. **Before Playing**: Define needs and wants clearly, give 2-3 examples of each
2. **During Play**: Encourage students to read explanations, not just try to get points
3. **After Playing**: Facilitate discussion about surprising or controversial items
4. **Follow-Up**: Have students track their own spending for a week and categorize each expense

### Common Student Misconceptions

- **"If I use it regularly, it's a need"**: Frequency doesn't determine necessity
  - *Example*: Daily coffee shop visits are still a want

- **"If I can't imagine life without it, it's a need"**: Emotional importance ≠ necessity
  - *Example*: Streaming services feel essential but aren't

- **"Needs and wants are the same for everyone"**: Context matters!
  - *Example*: Car ownership depends on available transportation alternatives

### Pedagogical Approach

This MicroSim uses game-based learning principles:
- **Immediate feedback** helps reinforce correct categorization
- **Progressive revelation** of explanations builds understanding
- **Score tracking** motivates engagement without high-stakes pressure
- **Context-dependent items** develop critical thinking skills
- **Realistic scenarios** connect to students' lived experiences

The three-category system (Need/Want/Depends) is pedagogically important because it:
- Acknowledges that personal finance isn't always black and white
- Develops analytical thinking about context
- Prevents oversimplification of complex financial decisions
- Teaches that individual circumstances matter in financial planning

### Academic Alignment

This MicroSim aligns with:
- **National Standards for Financial Literacy**: Standard I (Earning Income), Standard III (Saving)
- **Jump$tart Coalition**: Financial Responsibility and Decision Making
- **Council for Economic Education**: Personal Finance competency areas

### Accessibility Notes

- High contrast color scheme (green/blue/yellow) supports colorblind users
- Large text (28px for expense items) supports readability
- Click-based interaction (no drag-and-drop) supports various input methods
- Text-based feedback supports screen readers

---

**Technical Details**:
- Built with p5.js 1.11.10
- Width-responsive design adapts to container
- No external dependencies beyond p5.js library
- Can be embedded via iframe in any learning management system

**For Educators**: This MicroSim can be easily modified to include expenses relevant to your students' specific context. Contact the developer for customization assistance.

## Code Documentation

### File Structure

The Needs vs Wants MicroSim consists of four main files:

- **needs-and-wants.js** - Core p5.js JavaScript simulation logic
- **main.html** - HTML wrapper that loads p5.js and the simulation
- **index.md** - This documentation page with lesson plans and examples
- **metadata.json** - Educational metadata following Dublin Core standards

### JavaScript Code Overview

The simulation is built using p5.js with a clean separation between:

1. **Canvas Layout**: Two-region design
   - Drawing area (430px height) - displays expense cards and feedback
   - Control area (80px height) - contains action buttons

2. **Game State Variables**:
   ```javascript
   let expenses = [];              // Array of expense objects to categorize
   let currentExpenseIndex = 0;    // Current question number
   let score = 0;                  // Number of correct answers
   let totalAnswered = 0;          // Total questions answered
   let showingFeedback = false;    // Whether feedback is currently displayed
   let gameComplete = false;       // Whether all questions answered
   ```

3. **Expense Data Structure**: Each expense has:
   - `item` - The expense description (e.g., "Rent for apartment")
   - `category` - Classification: "need", "want", or "depends"
   - `difficulty` - Level: 1 (easy), 2 (medium), 3 (hard)
   - `explanation` - Educational context for why it's categorized that way

### Key Functions

**setup()** - Initializes the canvas, creates buttons, loads expenses
- Creates Need (green), Want (blue), It Depends (yellow) buttons
- Creates Reset Game button
- Creates "Got it!" button (initially hidden)
- Shuffles expenses for varied gameplay

**draw()** - Main rendering loop
- Draws background regions (aliceblue for drawing, white for controls)
- Displays title and score
- Shows expense card or game complete screen
- Renders feedback when answer is given

**displayExpenseCard()** - Shows current expense
- White card with silver border positioned at top (y=150)
- 60px height, centered text
- Only visible when not showing game complete

**displayFeedback()** - Shows answer result
- Yellow feedback box below expense card (y=300)
- Displays correct/incorrect message in blue
- Shows explanation in dark green
- Reveals "Got it!" button to proceed

**checkAnswer(answer)** - Processes user's categorization
- Compares answer to correct category
- Handles "depends" logic (accepts need or want)
- Updates score and displays feedback
- Prevents multiple answers per question

**nextQuestion()** - Advances to next expense
- Increments question index
- Hides feedback and "Got it!" button
- Checks for game completion

**displayGameComplete()** - Final score screen
- Shows percentage and personalized message
- Provides educational insight about context
- Appears when all expenses categorized

### UI Control Flow

1. User sees expense card with question
2. User clicks Need, Want, or It Depends
3. Feedback appears with explanation
4. Answer buttons remain visible but disabled
5. User clicks "Got it!" to continue
6. Next question appears
7. Repeat until all questions answered
8. Final score displayed with Reset option

### Responsive Design

The simulation adapts to container width:
- `updateCanvasSize()` reads container width
- Canvas resizes on window resize events
- Buttons reposition based on canvas width
- Text wrapping adjusts to available space

### Educational Design Patterns

**Scaffolded Learning**:
- Clear categorization (needs are essential)
- Ambiguous items teach critical thinking
- Explanations provide immediate learning

**Feedback Design**:
- Immediate (appears on click)
- Explanatory (why it's categorized that way)
- Non-punitive (encourages learning from mistakes)

**Engagement Mechanics**:
- Progress tracking (question X of Y)
- Score display (reinforcement without high stakes)
- Personalized completion messages
- Button-controlled pacing (self-directed learning)

### Customization Guide

To modify expenses for your context:

1. **Edit expenseData array** (lines 31-76):
   ```javascript
   {
     item: "Your expense description",
     category: "need", // or "want" or "depends"
     difficulty: 1,    // 1=easy, 2=medium, 3=hard
     explanation: "Why this is categorized this way"
   }
   ```

2. **Adjust difficulty filtering**:
   - Change `difficultyLevel` (line 29) to show only certain difficulty levels
   - 1 = only clear-cut items
   - 2 = includes some context-dependent items
   - 3 = all items including ambiguous cases

3. **Modify scoring messages** (lines 270-279):
   - Adjust percentage thresholds
   - Customize feedback messages for different score ranges

4. **Change visual styling**:
   - Button colors: lines 88-111 (Need, Want, Depends buttons)
   - Feedback box color: line 219 (currently yellow)
   - Card dimensions: lines 199-201 (expense card)

### Testing the Code

You can test the JavaScript directly in the p5.js editor:

1. Go to [https://editor.p5js.org/](https://editor.p5js.org/)
2. Copy the contents of `needs-and-wants.js`
3. Paste into the editor
4. Click Play to test
5. Make modifications and see results immediately

### Performance Considerations

- **Minimal computational load**: Simple rendering, no complex physics
- **30 questions**: Completes in 5-10 minutes
- **No external API calls**: All data embedded in code
- **Efficient redrawing**: Only updates on state changes
- **Mobile-friendly**: Works on tablets and smartphones

### Browser Compatibility

Tested and working on:
- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+
- Mobile Safari (iOS 14+)
- Chrome Mobile (Android 10+)

### Future Enhancement Ideas

Potential extensions for advanced implementations:

1. **Difficulty selector**: Let students choose easy/medium/hard
2. **Category explanations**: Add "Why?" button for each category
3. **Personal budget**: Have students add their own expenses
4. **Data export**: Download results as CSV for analysis
5. **Comparison mode**: Show how different people categorize same expense
6. **Multiplayer**: Students compare categorizations with peers
7. **Time tracking**: Analyze how long students spend on each question
8. **Adaptive difficulty**: Adjust based on student performance

### Support and Contribution

This MicroSim is part of the Personal Finance with AI course:
- **Repository**: [github.com/dmccreary/personal-finance](https://github.com/dmccreary/personal-finance)
- **Issues**: Report bugs or request features via GitHub Issues
- **License**: CC BY-NC-SA 4.0 for non-commercial educational use

For questions about implementation or customization, please open an issue in the repository.
