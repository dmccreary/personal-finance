// Needs vs Wants Categorization MicroSim
// Students click expense cards to categorize them as needs or wants

// Canvas dimensions - REQUIRED structure
let canvasWidth = 800;
let drawHeight = 430;
let controlHeight = 80;
let canvasHeight = drawHeight + controlHeight;
let margin = 15;
let defaultTextSize = 16;

// Game state
let expenses = [];
let currentExpenseIndex = 0;
let score = 0;
let totalAnswered = 0;
let feedback = '';
let feedbackTimer = 0;
let gameComplete = false;

// Buttons
let needButton;
let wantButton;
let dependsButton;
let resetButton;
let gotItButton;

// Difficulty level
let difficultyLevel = 1; // 1=Easy, 2=Medium, 3=Hard

// Expense data with category and explanation
const expenseData = [
  // Clear NEEDS (Easy)
  {item: "Rent for apartment", category: "need", difficulty: 1, explanation: "Housing is a basic necessity for shelter and safety."},
  {item: "Groceries - basic foods", category: "need", difficulty: 1, explanation: "Food is essential for survival and health."},
  {item: "Car insurance", category: "need", difficulty: 1, explanation: "Required by law and protects you from financial risk."},
  {item: "Health insurance", category: "need", difficulty: 1, explanation: "Essential protection against catastrophic medical expenses."},
  {item: "Electric bill", category: "need", difficulty: 1, explanation: "Utilities are necessary for basic living conditions."},
  {item: "Phone bill", category: "need", difficulty: 1, explanation: "Essential for emergency communication and employment."},
  {item: "Student loan payment", category: "need", difficulty: 1, explanation: "Legal obligation to repay borrowed money."},
  {item: "Prescription medication", category: "need", difficulty: 1, explanation: "Necessary for health and medical treatment."},
  {item: "Minimum credit card payment", category: "need", difficulty: 1, explanation: "Required to avoid penalties and protect credit score."},

  // Clear WANTS (Easy)
  {item: "Netflix subscription", category: "want", difficulty: 1, explanation: "Entertainment is enjoyable but not essential for survival."},
  {item: "Gym membership", category: "want", difficulty: 1, explanation: "You can exercise without paying for a gym."},
  {item: "Cable TV", category: "want", difficulty: 1, explanation: "Entertainment service that's nice to have but not necessary."},
  {item: "Latest iPhone", category: "want", difficulty: 1, explanation: "A basic phone meets communication needs; latest model is a luxury."},
  {item: "Coffee shop visits", category: "want", difficulty: 1, explanation: "You can make coffee at home for much less."},
  {item: "Designer fashion", category: "want", difficulty: 1, explanation: "Basic clothing is a need; expensive brands are a want."},
  {item: "Concert tickets", category: "want", difficulty: 1, explanation: "Entertainment and recreation are wants, not needs."},
  {item: "Gaming console", category: "want", difficulty: 1, explanation: "Gaming is entertainment, which is a want."},
  {item: "Vacation savings", category: "want", difficulty: 1, explanation: "Travel is enjoyable but not essential."},

  // Medium difficulty - Some context needed
  {item: "Internet service", category: "need", difficulty: 2, explanation: "In modern context, internet is essential for work, education, and essential services."},
  {item: "Work clothes", category: "need", difficulty: 2, explanation: "Appropriate attire is required for employment."},
  {item: "Gas for commuting to work", category: "need", difficulty: 2, explanation: "Transportation to work is necessary to earn income."},
  {item: "Emergency fund contribution", category: "need", difficulty: 2, explanation: "Financial safety net is essential for long-term security."},
  {item: "Textbooks for classes", category: "need", difficulty: 2, explanation: "Required materials for education."},
  {item: "Haircut", category: "need", difficulty: 2, explanation: "Basic grooming is necessary for professional appearance."},
  {item: "Laundry", category: "need", difficulty: 2, explanation: "Clean clothing is necessary for health and professional appearance."},

  // Context-dependent (Hard)
  {item: "Car payment", category: "depends", difficulty: 3, explanation: "Need if required for work/no public transit. Want if alternatives exist."},
  {item: "Steak and premium foods", category: "depends", difficulty: 3, explanation: "Food is a need, but premium options are wants."},
  {item: "Vitamins and supplements", category: "depends", difficulty: 3, explanation: "Need if doctor-recommended; otherwise typically a want."},
  {item: "Extra debt payment", category: "depends", difficulty: 3, explanation: "Wise financial decision, but beyond minimum is technically a want."},
  {item: "Hair coloring/styling", category: "depends", difficulty: 3, explanation: "Basic grooming is a need, but styling services are typically wants."}
];

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(canvasWidth, canvasHeight);
  canvas.parent(document.querySelector('main'));

  // Initialize expenses based on difficulty
  initializeExpenses();

  // Create buttons in control area
  needButton = createButton('NEED');
  needButton.position(margin, drawHeight + 20);
  needButton.mousePressed(() => checkAnswer('need'));
  needButton.style('background-color', '#90EE90');
  needButton.style('padding', '15px 30px');
  needButton.style('font-size', '18px');
  needButton.style('font-weight', 'bold');
  needButton.style('border', '2px solid #228B22');
  needButton.style('border-radius', '5px');
  needButton.style('cursor', 'pointer');

  wantButton = createButton('WANT');
  wantButton.position(margin + 150, drawHeight + 20);
  wantButton.mousePressed(() => checkAnswer('want'));
  wantButton.style('background-color', '#87CEEB');
  wantButton.style('padding', '15px 30px');
  wantButton.style('font-size', '18px');
  wantButton.style('font-weight', 'bold');
  wantButton.style('border', '2px solid #4682B4');
  wantButton.style('border-radius', '5px');
  wantButton.style('cursor', 'pointer');

  dependsButton = createButton('IT DEPENDS');
  dependsButton.position(margin + 300, drawHeight + 20);
  dependsButton.mousePressed(() => checkAnswer('depends'));
  dependsButton.style('background-color', '#FFE4B5');
  dependsButton.style('padding', '15px 30px');
  dependsButton.style('font-size', '18px');
  dependsButton.style('font-weight', 'bold');
  dependsButton.style('border', '2px solid #FFA500');
  dependsButton.style('border-radius', '5px');
  dependsButton.style('cursor', 'pointer');

  resetButton = createButton('Reset Game');
  resetButton.position(margin + 520, drawHeight + 20);
  resetButton.mousePressed(resetGame);
  resetButton.style('padding', '15px 20px');
  resetButton.style('font-size', '16px');
  resetButton.style('border-radius', '5px');
  resetButton.style('cursor', 'pointer');

  // Got it button (initially hidden)
  gotItButton = createButton('Got it!');
  gotItButton.position(canvasWidth/2 - 50, drawHeight/2 + 20);
  gotItButton.mousePressed(nextQuestion);
  gotItButton.style('padding', '12px 30px');
  gotItButton.style('font-size', '18px');
  gotItButton.style('font-weight', 'bold');
  gotItButton.style('background-color', '#4CAF50');
  gotItButton.style('color', 'white');
  gotItButton.style('border', 'none');
  gotItButton.style('border-radius', '5px');
  gotItButton.style('cursor', 'pointer');
  gotItButton.hide();

  describe('Interactive needs vs wants categorization game where students click buttons to categorize expenses', LABEL);
}

function draw() {
  updateCanvasSize();

  // Drawing area background
  fill('aliceblue');
  strokeWeight(1);
  stroke('silver')
  rect(0, 0, width, drawHeight);

  // Control area background
  fill('white');
  rect(0, drawHeight, width, controlHeight);

  // Title
  fill('black');
  textSize(32);
  textAlign(CENTER, TOP);
  noStroke();
  text('Needs vs Wants', canvasWidth/2, margin);

  // Progress
  textSize(18);
  text(`Question ${currentExpenseIndex + 1} of ${expenses.length}`, canvasWidth/2, margin + 45);
  text(`Score: ${score}/${totalAnswered}`, canvasWidth/2, margin + 75);

  if (!gameComplete) {
    // Always display the expense card
    displayExpenseCard();

    // Display feedback if there is any
    if (feedbackTimer > 0) {
      displayFeedback();
    }
  } else {
    displayGameComplete();
  }

  // Instructions in control area
  fill('black');
  textSize(14);
  textAlign(CENTER, TOP);
  text('Click the button that best describes this expense:', canvasWidth*.4, drawHeight + 5);

  // Reset defaults
  textAlign(LEFT, CENTER);
  textSize(defaultTextSize);
}

function displayExpenseCard() {
  if (currentExpenseIndex >= expenses.length) {
    gameComplete = true;
    return;
  }

  let expense = expenses[currentExpenseIndex];

  // Card background - positioned higher up
  fill(255);
  stroke('silver');
  strokeWeight(3);
  rectMode(CENTER);
  let cardWidth = canvasWidth - 100;
  let cardHeight = 60;
  let cardX = canvasWidth / 2;
  let cardY = 150;
  rect(cardX, cardY, cardWidth, cardHeight, 10);

  // Expense text
  fill('black');
  noStroke();
  textSize(20);
  textAlign(CENTER, CENTER);
  text(expense.item, cardX, cardY);

  rectMode(CORNER);
}

function displayFeedback() {
  let expense = expenses[currentExpenseIndex];

  // Feedback box - positioned below the expense card
  fill(255, 255, 200);
  stroke('orange');
  strokeWeight(3);
  rectMode(CENTER);
  let boxWidth = canvasWidth - 100;
  let boxHeight = 200;
  let boxY = 300; // Position below expense card
  rect(canvasWidth/2, boxY, boxWidth, boxHeight, 10);

  // Feedback text - centered
  fill('blue');
  noStroke();
  textSize(20);
  textAlign(CENTER, CENTER);
  text(feedback, canvasWidth/2, boxY - 60);

  // Explanation - centered
  if (expense && expense.explanation) {
    textSize(16);
    fill('darkgreen');
    textAlign(CENTER, CENTER);
    // Center the text - when using CENTER alignment, x is the center point
    let textWidth = boxWidth - 100;
    text(expense.explanation, canvasWidth/2, boxY-15, textWidth);
  }

  rectMode(CORNER);

  // Show Got it button
  gotItButton.show();
  gotItButton.position(canvasWidth/2 - 50, boxY + 30);
}

function displayGameComplete() {
  fill('white');
  stroke('darkgreen');
  strokeWeight(3);
  rectMode(CENTER);
  rect(canvasWidth/2, drawHeight/2, canvasWidth - 100, 250, 10);

  fill('darkgreen');
  noStroke();
  textSize(32);
  textAlign(CENTER, CENTER);
  text('Game Complete!', canvasWidth/2, drawHeight/2 - 80);

  textSize(24);
  fill('black');
  let percentage = totalAnswered > 0 ? round((score / totalAnswered) * 100) : 0;
  text(`Final Score: ${score}/${totalAnswered} (${percentage}%)`, canvasWidth/2, drawHeight/2 - 30);

  textSize(18);
  let message = '';
  if (percentage >= 90) {
    message = 'Excellent! You understand needs vs wants very well!';
  } else if (percentage >= 75) {
    message = 'Great job! You have a good grasp of the concept.';
  } else if (percentage >= 60) {
    message = 'Good work! Review the explanations to improve.';
  } else {
    message = 'Keep practicing! Remember: Needs are essential, wants are optional.';
  }
  textAlign(CENTER, CENTER);
  text(message, canvasWidth/2, drawHeight/2 + 20, canvasWidth - 200);

  textSize(16);
  fill('darkblue');
  textAlign(CENTER, CENTER);
  text('Key Insight: Context matters! A car might be a need if required for work, but a want if you live near public transportation.', canvasWidth/2, drawHeight/2 + 75, canvasWidth - 200);

  rectMode(CORNER);
}

function checkAnswer(answer) {
  if (gameComplete || feedbackTimer > 0) return;

  let expense = expenses[currentExpenseIndex];
  let correct = (expense.category === answer);

  // Allow "depends" answers for context-dependent items
  if (expense.category === 'depends' && (answer === 'need' || answer === 'want')) {
    correct = true;
    feedback = `Good thinking! This one depends on context.`;
  } else if (correct) {
    feedback = `✓ Correct! ${expense.category === 'depends' ? 'Context matters here.' : ''}`;
    score++;
  } else {
    feedback = `✗ Not quite. This is a ${expense.category}.`;
  }

  totalAnswered++;
  feedbackTimer = 1; // Flag that we're showing feedback
}

function nextQuestion() {
  currentExpenseIndex++;
  feedbackTimer = 0;

  // Hide Got it button
  gotItButton.hide();

  if (currentExpenseIndex >= expenses.length) {
    gameComplete = true;
  }
}

function initializeExpenses() {
  // Filter expenses based on difficulty
  let filteredExpenses = expenseData.filter(e => e.difficulty <= difficultyLevel);

  // Shuffle expenses
  expenses = shuffle(filteredExpenses);

  // Reset game state
  currentExpenseIndex = 0;
  score = 0;
  totalAnswered = 0;
  feedback = '';
  feedbackTimer = 0;
  gameComplete = false;
}

function resetGame() {
  initializeExpenses();
}

function windowResized() {
  updateCanvasSize();
  resizeCanvas(canvasWidth, canvasHeight);

  // Reposition buttons
  if (typeof needButton !== 'undefined') {
    needButton.position(margin, drawHeight + 20);
  }
  if (typeof wantButton !== 'undefined') {
    wantButton.position(margin + 150, drawHeight + 20);
  }
  if (typeof dependsButton !== 'undefined') {
    dependsButton.position(margin + 300, drawHeight + 20);
  }
  if (typeof resetButton !== 'undefined') {
    resetButton.position(margin + 520, drawHeight + 20);
  }
  if (typeof gotItButton !== 'undefined') {
    gotItButton.position(canvasWidth/2 - 50, drawHeight/2 + 80);
  }
}

function updateCanvasSize() {
  const container = document.querySelector('main');
  if (container) {
    canvasWidth = container.offsetWidth;
  }
}
