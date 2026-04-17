// Paycheck Breakdown Infographic
// CANVAS_HEIGHT: 580
// Bloom: Understand — students identify each paycheck component and explain what it funds.

let canvasWidth = 900;
let canvasHeight = 580;
let containerWidth;
let containerHeight = canvasHeight;

let salarySlider;
let salaryLabel;
let hoverKey = null;

const deductionDefs = {
    gross:        { label: 'Gross Pay', color: '#455a64', explain: 'Your total earnings before anything is taken out.' },
    federal:      { label: 'Federal Tax', color: '#1565c0', explain: 'Estimated federal income tax, set by your W-4.' },
    ss:           { label: 'Social Security', color: '#2e7d32', explain: '6.2% funding retirement benefits for current retirees.' },
    medicare:     { label: 'Medicare', color: '#66bb6a', explain: '1.45% funding healthcare for current retirees.' },
    state:        { label: 'State Tax', color: '#7b1fa2', explain: 'Varies by state — some states have no income tax.' },
    health:       { label: 'Health Insurance', color: '#ef6c00', explain: 'Your share of the employer-sponsored health premium.' },
    retirement:   { label: '401(k) (5%)', color: '#00838f', explain: 'Pre-tax retirement savings — reduces taxable income.' },
    net:          { label: 'Net Pay', color: '#2e7d32', explain: 'What actually lands in your bank account.' }
};

function setup() {
    updateCanvasSize();
    const canvas = createCanvas(containerWidth, containerHeight);
    canvas.parent(document.querySelector('main'));
    textFont('Arial');

    const ctrlTop = canvasHeight - 50;
    salaryLabel = createDiv('Annual salary: $50,000');
    salaryLabel.position(40, ctrlTop - 20);
    salaryLabel.parent(document.querySelector('main'));
    salaryLabel.style('font-size', '13px');
    salaryLabel.style('font-weight', 'bold');

    salarySlider = createSlider(20000, 150000, 50000, 1000);
    salarySlider.position(40, ctrlTop);
    salarySlider.size(Math.min(400, containerWidth - 80));
    salarySlider.parent(document.querySelector('main'));

    describe('Interactive infographic showing how gross pay becomes net pay after tax and deduction lines.');
}

function updateCanvasSize() {
    const container = document.querySelector('main');
    containerWidth = Math.min((container && container.offsetWidth) || canvasWidth, canvasWidth);
    if (containerWidth < 500) containerWidth = 500;
}

function windowResized() {
    updateCanvasSize();
    resizeCanvas(containerWidth, containerHeight);
    salarySlider.position(40, canvasHeight - 50);
    salarySlider.size(Math.min(400, containerWidth - 80));
    salaryLabel.position(40, canvasHeight - 70);
}

function computeDeductions(annual) {
    const biweekly = annual / 26;
    // Simplified federal tax estimation using 2025 single brackets, standard deduction
    const taxable = Math.max(0, annual - 15000);
    let fedAnnual = 0;
    const brackets = [
        [11925, 0.10], [48475, 0.12], [103350, 0.22],
        [197300, 0.24], [250525, 0.32], [626350, 0.35], [Infinity, 0.37]
    ];
    let prev = 0;
    for (const [top, rate] of brackets) {
        if (taxable <= prev) break;
        const slice = Math.min(taxable, top) - prev;
        fedAnnual += slice * rate;
        prev = top;
    }
    const fed = fedAnnual / 26;
    const ss = biweekly * 0.062;
    const medicare = biweekly * 0.0145;
    const state = annual >= 30000 ? biweekly * 0.04 : biweekly * 0.025;
    const health = 60;
    const retirement = biweekly * 0.05;
    const totalDeductions = fed + ss + medicare + state + health + retirement;
    const net = biweekly - totalDeductions;
    return {
        gross: biweekly,
        federal: fed, ss, medicare, state, health, retirement, net,
        totalDeductions
    };
}

function draw() {
    const annual = salarySlider.value();
    salaryLabel.html('Annual salary: $' + annual.toLocaleString());

    background(250);

    // Title
    noStroke();
    fill(30);
    textAlign(CENTER, TOP);
    textSize(17);
    textStyle(BOLD);
    text('Anatomy of a Biweekly Pay Stub', containerWidth / 2, 12);
    textStyle(NORMAL);
    textSize(11);
    fill(100);
    text('Hover any line or bar segment to see what it funds.', containerWidth / 2, 34);

    const d = computeDeductions(annual);

    // Left: pay stub
    const stubX = 30;
    const stubY = 60;
    const stubW = Math.min(390, containerWidth * 0.45);
    const stubH = 380;
    drawPayStub(stubX, stubY, stubW, stubH, d);

    // Right: bar chart
    const barX = stubX + stubW + 30;
    const barY = stubY;
    const barW = containerWidth - barX - 30;
    const barH = stubH;
    drawBar(barX, barY, barW, barH, d);

    // Tooltip
    if (hoverKey && deductionDefs[hoverKey]) {
        const def = deductionDefs[hoverKey];
        const bw = 260;
        const bh = 56;
        let tx = mouseX + 12;
        let ty = mouseY + 12;
        if (tx + bw > containerWidth) tx = mouseX - bw - 12;
        fill(255);
        stroke(80);
        rect(tx, ty, bw, bh, 5);
        noStroke();
        fill(30);
        textAlign(LEFT, TOP);
        textStyle(BOLD);
        textSize(12);
        text(def.label, tx + 10, ty + 8);
        textStyle(NORMAL);
        textSize(11);
        text(def.explain, tx + 10, ty + 26, bw - 20, bh - 30);
    }
}

function drawPayStub(x, y, w, h, d) {
    noStroke();
    fill(255);
    stroke(190);
    rect(x, y, w, h, 6);

    noStroke();
    fill(30);
    textAlign(LEFT, TOP);
    textStyle(BOLD);
    textSize(13);
    text('Biweekly Pay Stub', x + 14, y + 10);
    textStyle(NORMAL);

    const rows = [
        { key: 'gross',      label: 'Gross Pay',              val:  d.gross,      sign: '' },
        { key: 'federal',    label: 'Federal Withholding',    val: -d.federal,    sign: '-' },
        { key: 'ss',         label: 'Social Security (6.2%)', val: -d.ss,         sign: '-' },
        { key: 'medicare',   label: 'Medicare (1.45%)',       val: -d.medicare,   sign: '-' },
        { key: 'state',      label: 'State Tax',              val: -d.state,      sign: '-' },
        { key: 'health',     label: 'Health Insurance',       val: -d.health,     sign: '-' },
        { key: 'retirement', label: '401(k) Contribution',    val: -d.retirement, sign: '-' },
        { key: 'net',        label: 'NET PAY',                val:  d.net,        sign: '', bold: true }
    ];

    const rowH = (h - 42) / rows.length;
    let cy = y + 38;
    hoverKey = null;
    for (const r of rows) {
        const rx = x + 6;
        const rw = w - 12;
        const inside = mouseX > rx && mouseX < rx + rw && mouseY > cy && mouseY < cy + rowH;
        if (inside) {
            fill(240, 245, 252);
            noStroke();
            rect(rx, cy, rw, rowH, 3);
            hoverKey = r.key;
        }
        if (r.bold) {
            noStroke();
            fill(232, 245, 233);
            rect(rx, cy, rw, rowH, 3);
        }
        noStroke();
        const col = deductionDefs[r.key].color;
        fill(col);
        rect(rx + 6, cy + rowH / 2 - 5, 10, 10);

        fill(30);
        textAlign(LEFT, CENTER);
        textSize(11);
        if (r.bold) textStyle(BOLD);
        text(r.label, rx + 24, cy + rowH / 2);
        textAlign(RIGHT, CENTER);
        text(r.sign + '$' + Math.round(Math.abs(r.val)).toLocaleString(), rx + rw - 10, cy + rowH / 2);
        textStyle(NORMAL);
        cy += rowH;
    }
}

function drawBar(x, y, w, h, d) {
    noStroke();
    fill(30);
    textAlign(LEFT, TOP);
    textStyle(BOLD);
    textSize(13);
    text('Where your biweekly paycheck goes', x, y + 10);
    textStyle(NORMAL);

    const total = d.gross;
    const order = [
        { key: 'net',        val: d.net },
        { key: 'federal',    val: d.federal },
        { key: 'ss',         val: d.ss },
        { key: 'medicare',   val: d.medicare },
        { key: 'state',      val: d.state },
        { key: 'health',     val: d.health },
        { key: 'retirement', val: d.retirement }
    ];

    const barTop = y + 42;
    const barLeft = x + 10;
    const barW = w - 20;
    const barH = 40;
    let cx = barLeft;
    for (const seg of order) {
        const segW = (seg.val / total) * barW;
        const def = deductionDefs[seg.key];
        const inside = mouseX > cx && mouseX < cx + segW && mouseY > barTop && mouseY < barTop + barH;
        fill(def.color);
        stroke(255);
        strokeWeight(1);
        rect(cx, barTop, segW, barH);
        if (inside) hoverKey = seg.key;
        cx += segW;
    }

    // Legend list
    let ly = barTop + barH + 20;
    textAlign(LEFT, CENTER);
    textSize(11);
    for (const seg of order) {
        const def = deductionDefs[seg.key];
        noStroke();
        fill(def.color);
        rect(x + 10, ly - 6, 12, 12);
        fill(30);
        text(def.label, x + 28, ly);
        textAlign(RIGHT, CENTER);
        const pct = (seg.val / total) * 100;
        text('$' + Math.round(seg.val).toLocaleString() + '  (' + pct.toFixed(1) + '%)', x + w - 10, ly);
        textAlign(LEFT, CENTER);
        ly += 22;
    }
}
