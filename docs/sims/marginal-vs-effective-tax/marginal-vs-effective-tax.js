// Marginal vs. Effective Tax Rate MicroSim
// CANVAS_HEIGHT: 620
// Bloom: Analyze — students see concretely that marginal rate rarely equals effective rate.

let canvasWidth = 900;
let canvasHeight = 620;
let containerWidth;
let containerHeight = canvasHeight;

let incomeSlider, incomeLabel;
let filingSelect;
let hoverBracket = -1;

const brackets2025 = {
    single: [
        { top: 11925,  rate: 0.10 },
        { top: 48475,  rate: 0.12 },
        { top: 103350, rate: 0.22 },
        { top: 197300, rate: 0.24 },
        { top: 250525, rate: 0.32 },
        { top: 626350, rate: 0.35 },
        { top: Infinity, rate: 0.37 }
    ],
    mfj: [
        { top: 23850,  rate: 0.10 },
        { top: 96950,  rate: 0.12 },
        { top: 206700, rate: 0.22 },
        { top: 394600, rate: 0.24 },
        { top: 501050, rate: 0.32 },
        { top: 751600, rate: 0.35 },
        { top: Infinity, rate: 0.37 }
    ],
    hoh: [
        { top: 17000,  rate: 0.10 },
        { top: 64850,  rate: 0.12 },
        { top: 103350, rate: 0.22 },
        { top: 197300, rate: 0.24 },
        { top: 250500, rate: 0.32 },
        { top: 626350, rate: 0.35 },
        { top: Infinity, rate: 0.37 }
    ]
};

const stdDeduction = { single: 15000, mfj: 30000, hoh: 22500 };

const bracketColors = ['#81c784', '#64b5f6', '#4fc3f7', '#ffb74d', '#ff8a65', '#e57373', '#c62828'];

function setup() {
    updateCanvasSize();
    const canvas = createCanvas(containerWidth, containerHeight);
    canvas.parent(document.querySelector('main'));
    textFont('Arial');

    incomeLabel = createDiv('Gross Income: $60,000');
    incomeLabel.position(40, canvasHeight - 85);
    incomeLabel.parent(document.querySelector('main'));
    incomeLabel.style('font-size', '13px');
    incomeLabel.style('font-weight', 'bold');

    incomeSlider = createSlider(0, 500000, 60000, 1000);
    incomeSlider.position(40, canvasHeight - 65);
    incomeSlider.size(Math.min(400, containerWidth - 80));
    incomeSlider.parent(document.querySelector('main'));

    filingSelect = createSelect();
    filingSelect.position(Math.min(460, containerWidth - 220), canvasHeight - 65);
    filingSelect.parent(document.querySelector('main'));
    filingSelect.option('Single', 'single');
    filingSelect.option('Married Filing Jointly', 'mfj');
    filingSelect.option('Head of Household', 'hoh');
    filingSelect.selected('single');

    describe('Interactive calculator showing how federal income tax is owed bracket by bracket.');
}

function updateCanvasSize() {
    const container = document.querySelector('main');
    containerWidth = Math.min((container && container.offsetWidth) || canvasWidth, canvasWidth);
    if (containerWidth < 500) containerWidth = 500;
}

function windowResized() {
    updateCanvasSize();
    resizeCanvas(containerWidth, containerHeight);
    incomeLabel.position(40, canvasHeight - 85);
    incomeSlider.position(40, canvasHeight - 65);
    incomeSlider.size(Math.min(400, containerWidth - 80));
    filingSelect.position(Math.min(460, containerWidth - 220), canvasHeight - 65);
}

function computeTax(income, status) {
    const std = stdDeduction[status];
    const taxable = Math.max(0, income - std);
    const brs = brackets2025[status];
    let tax = 0;
    let prev = 0;
    const slices = [];
    let marginal = brs[0].rate;
    for (let i = 0; i < brs.length; i++) {
        const b = brs[i];
        if (taxable <= prev) break;
        const top = Math.min(taxable, b.top);
        const sliceIncome = top - prev;
        const sliceTax = sliceIncome * b.rate;
        tax += sliceTax;
        slices.push({ idx: i, income: sliceIncome, tax: sliceTax, rate: b.rate, from: prev, to: top });
        marginal = b.rate;
        prev = b.top;
    }
    const effective = income > 0 ? tax / income : 0;
    return { tax, taxable, slices, marginal, effective, std };
}

function draw() {
    const income = incomeSlider.value();
    const status = filingSelect.value();
    const r = computeTax(income, status);
    incomeLabel.html('Gross Income: $' + income.toLocaleString());

    background(252);

    // Title
    noStroke();
    fill(30);
    textAlign(CENTER, TOP);
    textStyle(BOLD);
    textSize(17);
    text('Marginal vs. Effective Tax Rate', containerWidth / 2, 10);
    textStyle(NORMAL);
    textSize(11);
    fill(100);
    text('Hover any bracket slice to see the tax owed on that portion of income.', containerWidth / 2, 32);

    // Readouts
    const readTop = 55;
    const readW = (containerWidth - 60) / 2;
    drawReadout(30, readTop, readW, 'Marginal Rate', (r.marginal * 100).toFixed(0) + '%', 'Rate on your next dollar', '#c62828');
    drawReadout(40 + readW, readTop, readW, 'Effective Rate', (r.effective * 100).toFixed(1) + '%', 'Total tax ÷ gross income', '#1976d2');

    // Column 1: stacked taxable income
    const col1X = 50;
    const col1Y = 150;
    const col1W = 100;
    const col1H = canvasHeight - 260;
    drawTaxableStack(col1X, col1Y, col1W, col1H, r);

    // Column 2: bracket detail
    const col2X = col1X + col1W + 40;
    const col2Y = col1Y;
    const col2W = containerWidth - col2X - 40;
    drawBracketDetail(col2X, col2Y, col2W, col1H, r, income);
}

function drawReadout(x, y, w, label, big, sub, col) {
    noStroke();
    fill(255);
    stroke(220);
    rect(x, y, w, 75, 6);
    noStroke();
    fill(90);
    textAlign(LEFT, TOP);
    textSize(12);
    text(label, x + 14, y + 10);
    fill(col);
    textStyle(BOLD);
    textSize(32);
    text(big, x + 14, y + 26);
    textStyle(NORMAL);
    fill(110);
    textSize(11);
    text(sub, x + 14, y + 62);
}

function drawTaxableStack(x, y, w, h, r) {
    noStroke();
    fill(30);
    textAlign(CENTER, BOTTOM);
    textStyle(BOLD);
    textSize(12);
    text('Your taxable income', x + w / 2, y - 6);
    textStyle(NORMAL);

    // background
    fill(240);
    stroke(200);
    rect(x, y, w, h, 4);

    if (r.taxable <= 0) {
        noStroke();
        fill(100);
        textAlign(CENTER, CENTER);
        textSize(11);
        text('Below standard\ndeduction', x + w / 2, y + h / 2);
        return;
    }

    const maxTaxable = Math.max(r.taxable, 50000);
    let cy = y + h;
    hoverBracket = -1;
    for (let i = 0; i < r.slices.length; i++) {
        const s = r.slices[i];
        const segH = (s.income / maxTaxable) * h;
        noStroke();
        fill(bracketColors[i]);
        rect(x, cy - segH, w, segH);
        const inside = mouseX > x && mouseX < x + w && mouseY > cy - segH && mouseY < cy;
        if (inside) hoverBracket = i;

        if (segH > 18) {
            fill(20);
            textAlign(CENTER, CENTER);
            textSize(10);
            text((s.rate * 100).toFixed(0) + '%', x + w / 2, cy - segH / 2);
        }
        cy -= segH;
    }
    noStroke();
    fill(80);
    textAlign(CENTER, TOP);
    textSize(10);
    text('Taxable: $' + Math.round(r.taxable).toLocaleString(), x + w / 2, y + h + 6);
    text('(std deduction $' + r.std.toLocaleString() + ')', x + w / 2, y + h + 20);
}

function drawBracketDetail(x, y, w, h, r, income) {
    noStroke();
    fill(30);
    textAlign(LEFT, BOTTOM);
    textStyle(BOLD);
    textSize(12);
    text('Tax owed per bracket', x, y - 6);
    textStyle(NORMAL);

    const numRows = Math.max(1, r.slices.length);
    const rowH = Math.min(38, (h - 80) / Math.max(numRows, 1));
    let cy = y + 4;
    let totalTax = 0;
    for (let i = 0; i < r.slices.length; i++) {
        const s = r.slices[i];
        totalTax += s.tax;
        const rowColor = i === hoverBracket ? color(255, 249, 196) : color(255);
        stroke(220);
        fill(rowColor);
        rect(x, cy, w, rowH, 3);
        noStroke();

        fill(bracketColors[i]);
        rect(x + 6, cy + rowH / 2 - 7, 14, 14);
        fill(30);
        textAlign(LEFT, CENTER);
        textSize(11);
        text('$' + Math.round(s.from).toLocaleString() + ' – $' + (s.to === Infinity ? '∞' : Math.round(s.to).toLocaleString()),
             x + 28, cy + rowH / 2);
        textAlign(CENTER, CENTER);
        text((s.rate * 100).toFixed(0) + '%', x + w * 0.55, cy + rowH / 2);
        textAlign(RIGHT, CENTER);
        text('$' + Math.round(s.tax).toLocaleString(), x + w - 10, cy + rowH / 2);
        cy += rowH + 2;
    }

    // Summary bar
    const sumY = y + h - 50;
    noStroke();
    fill(30);
    textAlign(LEFT, TOP);
    textStyle(BOLD);
    textSize(12);
    text('Total federal income tax:  $' + Math.round(r.tax).toLocaleString(), x, sumY);
    text('Take-home after federal tax:  $' + Math.round(income - r.tax).toLocaleString(), x, sumY + 20);
    textStyle(NORMAL);
    textSize(10);
    fill(110);
    text('Excludes FICA and state tax.', x, sumY + 40);
}
