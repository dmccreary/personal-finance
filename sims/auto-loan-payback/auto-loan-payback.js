// Auto Loan Payback Calculator MicroSim
// Canvas dimensions
let canvasWidth = 900;
let canvasHeight = 600;
let graphWidth = 600;
let controlPanelWidth = 300;
let margin = 15;
let defaultTextSize = 12;

// Global variables for responsive design
let containerWidth;
let containerHeight = canvasHeight;

// Loan parameters
let purchasePrice = 25000;
let downPayment = 2500;
let interestRate = 7.0;
let loanTerm = 60; // months
let includeGapInsurance = false;

// Calculated values
let loanAmount = 0;
let monthlyPayment = 0;
let totalInterest = 0;
let loanBalances = [];
let carValues = [];
let underwaterMonths = 0;

// UI Controls
let purchasePriceSlider, downPaymentSlider, interestRateSlider;
let termButtons = [];
let compareButton, resetButton, gapInsuranceCheckbox;

// Chart.js chart object
let myChart = null;

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(containerWidth, containerHeight);
  canvas.parent(document.querySelector('main'));

  // Create controls
  createControls();

  // Initial calculation
  calculateLoan();

  describe('Auto loan calculator showing loan balance vs car value over time, with comparison of different loan terms', LABEL);
}

function createControls() {
  let yPos = 50;
  let xPos = graphWidth + margin;

  // Purchase price slider
  purchasePriceSlider = createSlider(10000, 50000, 25000, 1000);
  purchasePriceSlider.position(xPos, yPos);
  purchasePriceSlider.size(250);
  yPos += 40;

  // Down payment slider
  downPaymentSlider = createSlider(0, 10000, 2500, 500);
  downPaymentSlider.position(xPos, yPos);
  downPaymentSlider.size(250);
  yPos += 40;

  // Interest rate slider
  interestRateSlider = createSlider(2, 18, 7, 0.5);
  interestRateSlider.position(xPos, yPos);
  interestRateSlider.size(250);
  yPos += 60;

  // Term buttons
  let terms = [36, 48, 60, 72];
  let buttonY = yPos;
  for (let i = 0; i < terms.length; i++) {
    let btn = createButton(terms[i] + ' mo');
    btn.position(xPos + (i * 65), buttonY);
    btn.size(60, 30);
    btn.mousePressed(() => {
      loanTerm = terms[i];
      calculateLoan();
    });
    termButtons.push(btn);
  }
  yPos += 50;

  // Gap insurance checkbox
  gapInsuranceCheckbox = createCheckbox(' Gap Insurance', false);
  gapInsuranceCheckbox.position(xPos, yPos);
  gapInsuranceCheckbox.changed(() => {
    includeGapInsurance = gapInsuranceCheckbox.checked();
    calculateLoan();
  });
  yPos += 40;

  // Compare button
  compareButton = createButton('Compare Terms');
  compareButton.position(xPos, yPos);
  compareButton.size(120, 30);
  compareButton.mousePressed(showComparison);

  // Reset button
  resetButton = createButton('Reset');
  resetButton.position(xPos + 130, yPos);
  resetButton.size(120, 30);
  resetButton.mousePressed(resetToDefaults);
}

function draw() {
  background(250);

  // Update values from sliders
  purchasePrice = purchasePriceSlider.value();
  downPayment = downPaymentSlider.value();
  interestRate = interestRateSlider.value();

  // Recalculate if values changed
  calculateLoan();

  // Draw graph area
  drawGraph();

  // Draw control panel
  drawControlPanel();

  // Draw comparison table if needed
  if (showComparisonTable) {
    drawComparisonTable();
  }
}

function calculateLoan() {
  loanAmount = purchasePrice - downPayment;

  // Calculate monthly payment using PMT formula
  let monthlyRate = interestRate / 100 / 12;

  if (monthlyRate === 0) {
    monthlyPayment = loanAmount / loanTerm;
    totalInterest = 0;
  } else {
    monthlyPayment = loanAmount * (monthlyRate * Math.pow(1 + monthlyRate, loanTerm)) /
                     (Math.pow(1 + monthlyRate, loanTerm) - 1);
    totalInterest = (monthlyPayment * loanTerm) - loanAmount;
  }

  // Calculate amortization schedule (loan balances)
  loanBalances = [];
  let balance = loanAmount;
  loanBalances.push(balance);

  for (let month = 1; month <= loanTerm; month++) {
    let interestPayment = balance * monthlyRate;
    let principalPayment = monthlyPayment - interestPayment;
    balance -= principalPayment;
    balance = Math.max(0, balance); // Ensure non-negative
    loanBalances.push(balance);
  }

  // Calculate car depreciation values
  carValues = [];
  carValues.push(purchasePrice);

  let currentValue = purchasePrice;
  for (let month = 1; month <= loanTerm; month++) {
    // First year: 20% total depreciation (1.67% per month)
    // Subsequent years: 15% per year (1.25% per month)
    if (month <= 12) {
      currentValue = purchasePrice * (1 - (0.20 * month / 12));
    } else {
      let yearsElapsed = month / 12;
      let firstYearValue = purchasePrice * 0.80;
      let additionalYears = yearsElapsed - 1;
      currentValue = firstYearValue * Math.pow(0.85, additionalYears);
    }
    carValues.push(currentValue);
  }

  // Calculate underwater months
  underwaterMonths = 0;
  for (let i = 0; i < Math.min(loanBalances.length, carValues.length); i++) {
    if (loanBalances[i] > carValues[i]) {
      underwaterMonths++;
    }
  }

  // Update chart
  updateChart();
}

function updateChart() {
  // Destroy existing chart if it exists
  if (myChart) {
    myChart.destroy();
  }

  // Create chart canvas if it doesn't exist
  let chartCanvas = document.getElementById('loanChart');
  if (!chartCanvas) {
    chartCanvas = document.createElement('canvas');
    chartCanvas.id = 'loanChart';
    chartCanvas.width = graphWidth - margin * 2;
    chartCanvas.height = canvasHeight - margin * 4;
    chartCanvas.style.position = 'absolute';
    chartCanvas.style.left = margin + 'px';
    chartCanvas.style.top = margin * 2 + 'px';
    document.body.appendChild(chartCanvas);
  }

  // Create labels for months
  let labels = [];
  for (let i = 0; i <= loanTerm; i++) {
    labels.push(i);
  }

  // Create underwater area data (difference when loan > value)
  let underwaterData = [];
  for (let i = 0; i < Math.min(loanBalances.length, carValues.length); i++) {
    if (loanBalances[i] > carValues[i]) {
      underwaterData.push(loanBalances[i] - carValues[i]);
    } else {
      underwaterData.push(0);
    }
  }

  // Create chart
  myChart = new Chart(chartCanvas, {
    type: 'line',
    data: {
      labels: labels,
      datasets: [
        {
          label: 'Loan Balance',
          data: loanBalances,
          borderColor: 'rgb(220, 53, 69)',
          backgroundColor: 'rgba(220, 53, 69, 0.1)',
          borderWidth: 3,
          yAxisID: 'y',
          tension: 0.1
        },
        {
          label: 'Car Value',
          data: carValues,
          borderColor: 'rgb(13, 110, 253)',
          backgroundColor: 'rgba(13, 110, 253, 0.1)',
          borderWidth: 3,
          yAxisID: 'y',
          tension: 0.1
        },
        {
          label: 'Underwater Amount',
          data: underwaterData,
          borderColor: 'rgba(220, 53, 69, 0.3)',
          backgroundColor: 'rgba(220, 53, 69, 0.2)',
          borderWidth: 0,
          fill: true,
          yAxisID: 'y',
          tension: 0.1
        }
      ]
    },
    options: {
      responsive: false,
      interaction: {
        mode: 'index',
        intersect: false,
      },
      plugins: {
        title: {
          display: true,
          text: 'Loan Balance vs Car Value Over Time',
          font: {
            size: 18
          }
        },
        legend: {
          display: true,
          position: 'top'
        },
        tooltip: {
          callbacks: {
            label: function(context) {
              let label = context.dataset.label || '';
              if (label) {
                label += ': ';
              }
              label += '$' + numberWithCommas(Math.round(context.parsed.y));
              return label;
            }
          }
        }
      },
      scales: {
        x: {
          title: {
            display: true,
            text: 'Months',
            font: {
              size: 14
            }
          }
        },
        y: {
          title: {
            display: true,
            text: 'Dollar Amount ($)',
            font: {
              size: 14
            }
          },
          ticks: {
            callback: function(value) {
              return '$' + numberWithCommas(value);
            }
          }
        }
      }
    }
  });
}

function drawGraph() {
  // Graph area background
  fill(255);
  stroke(200);
  strokeWeight(1);
  rect(0, 0, graphWidth, canvasHeight);

  // Title area
  fill(240);
  noStroke();
  rect(0, 0, graphWidth, 30);

  // The actual graph is drawn by Chart.js
}

function drawControlPanel() {
  // Control panel background
  fill(245);
  stroke(200);
  strokeWeight(1);
  rect(graphWidth, 0, controlPanelWidth, canvasHeight);

  // Title
  fill(0);
  noStroke();
  textSize(16);
  textAlign(LEFT, TOP);
  textStyle(BOLD);
  text('Controls', graphWidth + margin, margin);

  // Labels and values
  textStyle(NORMAL);
  textSize(12);
  let yPos = 50;
  let xPos = graphWidth + margin;

  text('Purchase Price:', xPos, yPos - 20);
  text('$' + numberWithCommas(purchasePrice), xPos + 200, yPos - 20);
  yPos += 40;

  text('Down Payment:', xPos, yPos - 20);
  text('$' + numberWithCommas(downPayment), xPos + 200, yPos - 20);
  yPos += 40;

  text('Interest Rate:', xPos, yPos - 20);
  text(interestRate + '%', xPos + 200, yPos - 20);
  yPos += 40;

  text('Loan Term:', xPos, yPos);
  yPos += 50;

  // Results section
  yPos += 40;
  fill(0);
  textStyle(BOLD);
  textSize(14);
  text('Results', xPos, yPos);
  textStyle(NORMAL);
  textSize(12);
  yPos += 25;

  text('Loan Amount:', xPos, yPos);
  text('$' + numberWithCommas(Math.round(loanAmount)), xPos, yPos + 15);
  yPos += 40;

  text('Monthly Payment:', xPos, yPos);
  textStyle(BOLD);
  textSize(16);
  fill(0, 100, 0);
  text('$' + numberWithCommas(Math.round(monthlyPayment)), xPos, yPos + 15);
  textStyle(NORMAL);
  textSize(12);
  fill(0);
  yPos += 45;

  text('Total Interest:', xPos, yPos);
  text('$' + numberWithCommas(Math.round(totalInterest)), xPos, yPos + 15);
  yPos += 40;

  text('Total Paid:', xPos, yPos);
  text('$' + numberWithCommas(Math.round(loanAmount + totalInterest)), xPos, yPos + 15);
  yPos += 40;

  text('Months Underwater:', xPos, yPos);
  if (underwaterMonths > 0) {
    fill(200, 0, 0);
    textStyle(BOLD);
  }
  text(underwaterMonths, xPos, yPos + 15);
  textStyle(NORMAL);
  fill(0);
  yPos += 50;

  // Warnings
  drawWarnings(xPos, yPos);
}

function drawWarnings(x, y) {
  textSize(11);
  let warningY = y;

  // Warning for long loan terms
  if (loanTerm > 60) {
    fill(220, 53, 69);
    textStyle(BOLD);
    text('⚠ Very long loan term', x, warningY);
    textStyle(NORMAL);
    textSize(10);
    text('increases risk', x, warningY + 12);
    textSize(11);
    warningY += 30;
  }

  // Warning for underwater period
  if (underwaterMonths > 24) {
    fill(255, 193, 7);
    textStyle(BOLD);
    text('⚠ Consider gap insurance', x, warningY);
    textStyle(NORMAL);
    textSize(10);
    text('Underwater > 24 months', x, warningY + 12);
    textSize(11);
    warningY += 30;
  }

  // Insight
  fill(13, 110, 253);
  textStyle(ITALIC);
  textSize(10);
  text('Shorter terms save', x, warningY);
  text('thousands in interest', x, warningY + 12);
}

let showComparisonTable = false;

function showComparison() {
  showComparisonTable = !showComparisonTable;
}

function drawComparisonTable() {
  // Draw overlay
  fill(255, 255, 255, 240);
  stroke(0);
  strokeWeight(2);
  rect(50, 50, canvasWidth - 100, canvasHeight - 100);

  // Title
  fill(0);
  noStroke();
  textSize(18);
  textStyle(BOLD);
  textAlign(CENTER, TOP);
  text('Loan Term Comparison', canvasWidth / 2, 70);

  // Table headers
  textSize(12);
  textAlign(LEFT, TOP);
  let tableX = 80;
  let tableY = 110;
  let colWidth = 140;

  text('Term', tableX, tableY);
  text('Monthly Payment', tableX + colWidth, tableY);
  text('Total Interest', tableX + colWidth * 2, tableY);
  text('Underwater', tableX + colWidth * 3, tableY);
  text('Recommendation', tableX + colWidth * 4, tableY);

  tableY += 30;
  textStyle(NORMAL);

  // Calculate for each term
  let terms = [36, 48, 60, 72];
  for (let term of terms) {
    let result = calculateForTerm(term);

    text(term + ' mo', tableX, tableY);
    text('$' + numberWithCommas(Math.round(result.payment)), tableX + colWidth, tableY);
    text('$' + numberWithCommas(Math.round(result.interest)), tableX + colWidth * 2, tableY);
    text(result.underwater + ' mo', tableX + colWidth * 3, tableY);

    // Recommendation
    if (term === 36) {
      fill(0, 150, 0);
      text('Best if affordable', tableX + colWidth * 4, tableY);
    } else if (term === 48) {
      fill(0, 100, 200);
      text('Good balance', tableX + colWidth * 4, tableY);
    } else if (term === 60) {
      fill(200, 150, 0);
      text('Maximum recommended', tableX + colWidth * 4, tableY);
    } else {
      fill(200, 0, 0);
      text('⚠ Avoid if possible', tableX + colWidth * 4, tableY);
    }
    fill(0);

    tableY += 25;
  }

  // Close button
  textAlign(CENTER, CENTER);
  textStyle(BOLD);
  textSize(14);
  let closeX = canvasWidth - 100;
  let closeY = 60;
  fill(220, 53, 69);
  rect(closeX, closeY, 40, 25);
  fill(255);
  text('Close', closeX + 20, closeY + 12);
}

function calculateForTerm(term) {
  let amount = purchasePrice - downPayment;
  let rate = interestRate / 100 / 12;
  let payment = amount * (rate * Math.pow(1 + rate, term)) / (Math.pow(1 + rate, term) - 1);
  let interest = (payment * term) - amount;

  // Calculate underwater months
  let balances = [amount];
  let balance = amount;
  for (let month = 1; month <= term; month++) {
    let interestPayment = balance * rate;
    let principalPayment = payment - interestPayment;
    balance -= principalPayment;
    balances.push(Math.max(0, balance));
  }

  let values = [purchasePrice];
  let value = purchasePrice;
  for (let month = 1; month <= term; month++) {
    if (month <= 12) {
      value = purchasePrice * (1 - (0.20 * month / 12));
    } else {
      let yearsElapsed = month / 12;
      let firstYearValue = purchasePrice * 0.80;
      let additionalYears = yearsElapsed - 1;
      value = firstYearValue * Math.pow(0.85, additionalYears);
    }
    values.push(value);
  }

  let underwater = 0;
  for (let i = 0; i < Math.min(balances.length, values.length); i++) {
    if (balances[i] > values[i]) {
      underwater++;
    }
  }

  return {
    payment: payment,
    interest: interest,
    underwater: underwater
  };
}

function resetToDefaults() {
  purchasePriceSlider.value(25000);
  downPaymentSlider.value(2500);
  interestRateSlider.value(7);
  loanTerm = 60;
  includeGapInsurance = false;
  gapInsuranceCheckbox.checked(false);
  showComparisonTable = false;
  calculateLoan();
}

function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function mousePressed() {
  // Check if clicking on comparison table close button
  if (showComparisonTable) {
    let closeX = canvasWidth - 100;
    let closeY = 60;
    if (mouseX >= closeX && mouseX <= closeX + 40 && mouseY >= closeY && mouseY <= closeY + 25) {
      showComparisonTable = false;
    }
  }
}

function windowResized() {
  updateCanvasSize();
  resizeCanvas(containerWidth, containerHeight);

  // Reposition controls
  let yPos = 50;
  let xPos = graphWidth + margin;

  purchasePriceSlider.position(xPos, yPos);
  yPos += 40;
  downPaymentSlider.position(xPos, yPos);
  yPos += 40;
  interestRateSlider.position(xPos, yPos);
  yPos += 60;

  for (let i = 0; i < termButtons.length; i++) {
    termButtons[i].position(xPos + (i * 65), yPos);
  }
  yPos += 50;

  gapInsuranceCheckbox.position(xPos, yPos);
  yPos += 40;

  compareButton.position(xPos, yPos);
  resetButton.position(xPos + 130, yPos);

  // Update chart canvas position
  let chartCanvas = document.getElementById('loanChart');
  if (chartCanvas) {
    chartCanvas.style.left = margin + 'px';
    chartCanvas.style.top = (margin * 2) + 'px';
  }
}

function updateCanvasSize() {
  const container = document.querySelector('main').getBoundingClientRect();
  containerWidth = Math.max(900, Math.floor(container.width));
  canvasWidth = containerWidth;
}
