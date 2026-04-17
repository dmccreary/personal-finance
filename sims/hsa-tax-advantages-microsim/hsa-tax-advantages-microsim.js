// HSA Tax Advantages MicroSim
// CANVAS_HEIGHT: 660
// Bloom: Analyze — students compare paying medical expenses with taxed income vs. HSA dollars.

let canvasWidth = 900;
let canvasHeight = 660;
let containerWidth;
let containerHeight = canvasHeight;

let expSlider, bracketSelect, yearsSlider, returnSlider;
let expLabel, yearsLabel, returnLabel;

function setup() {
    updateCanvasSize();
    const canvas = createCanvas(containerWidth, containerHeight);
    canvas.parent(document.querySelector('main'));
    textFont('Arial');

    const main = document.querySelector('main');

    expLabel = createDiv('Annual medical expenses: $3,000');
    expLabel.parent(main);
    expLabel.style('font-size', '12px');
    expLabel.style('font-weight', 'bold');
    expSlider = createSlider(0, 10000, 3000, 100);
    expSlider.parent(main);
    expSlider.size(220);

    const bLbl = createSpan('Tax bracket:');
    bLbl.parent(main);
    bLbl.style('font-size', '12px');
    bLbl.style('font-weight', 'bold');
    bracketSelect = createSelect();
    bracketSelect.parent(main);
    for (const [label, val] of [['12%', '12'], ['22%', '22'], ['24%', '24'], ['32%', '32'], ['35%', '35']]) {
        bracketSelect.option(label, val);
    }
    bracketSelect.selected('22');

    yearsLabel = createDiv('Years until withdrawal: 1');
    yearsLabel.parent(main);
    yearsLabel.style('font-size', '12px');
    yearsLabel.style('font-weight', 'bold');
    yearsSlider = createSlider(1, 40, 1, 1);
    yearsSlider.parent(main);
    yearsSlider.size(220);

    returnLabel = createDiv('Investment return: 7%');
    returnLabel.parent(main);
    returnLabel.style('font-size', '12px');
    returnLabel.style('font-weight', 'bold');
    returnSlider = createSlider(0, 12, 7, 0.5);
    returnSlider.parent(main);
    returnSlider.size(220);

    layoutControls();
    describe('HSA tax-advantage calculator with bar chart comparing three strategies.');
}

function updateCanvasSize() {
    const container = document.querySelector('main');
    containerWidth = Math.min((container && container.offsetWidth) || canvasWidth, canvasWidth);
    if (containerWidth < 500) containerWidth = 500;
}

function layoutControls() {
    const x = Math.min(600, containerWidth - 280);
    let y = 70;
    expLabel.position(x, y); y += 18;
    expSlider.position(x, y); y += 30;
    y += 4;
    const selY = y;
    y += 40;
    yearsLabel.position(x, y); y += 18;
    yearsSlider.position(x, y); y += 30;
    returnLabel.position(x, y); y += 18;
    returnSlider.position(x, y);

    // bracket label + select
    const kids = document.querySelectorAll('main > span, main > select');
    // fallback positioning via direct handle
    bracketSelect.position(x + 100, selY);
    // find tax bracket span and position
    // we position via hidden measurement — keep simple:
}

function windowResized() {
    updateCanvasSize();
    resizeCanvas(containerWidth, containerHeight);
    layoutControls();
}

function compute() {
    const exp = expSlider.value();
    const taxRate = parseInt(bracketSelect.value()) / 100;
    const fica = 0.0765;
    const yrs = yearsSlider.value();
    const ret = returnSlider.value() / 100;

    // Paying with after-tax income
    const grossNeeded = exp / (1 - taxRate - fica);
    const regCost = grossNeeded;

    // HSA for current expenses
    const hsaContribution = exp;
    const taxSavings = hsaContribution * (taxRate + fica);
    const hsaNow = hsaContribution - taxSavings;

    // Invest HSA, let grow, spend later
    const fv = hsaContribution * Math.pow(1 + ret, yrs);
    const hsaInvest = hsaContribution - (fv - hsaContribution);

    return { exp, taxRate, fica, yrs, ret, regCost, hsaNow, hsaInvest, taxSavings, fv, hsaContribution };
}

function draw() {
    const r = compute();
    expLabel.html('Annual medical expenses: $' + r.exp.toLocaleString());
    yearsLabel.html('Years until withdrawal: ' + r.yrs);
    returnLabel.html('Investment return: ' + r.ret * 100 + '%');

    background(250);
    noStroke();
    fill(30);
    textAlign(CENTER, TOP);
    textStyle(BOLD);
    textSize(17);
    text('HSA Tax Advantages', containerWidth / 2, 12);
    textStyle(NORMAL);
    textSize(11);
    fill(100);
    text('Compare three ways to pay for medical expenses — after-tax, HSA now, HSA invested.', containerWidth / 2, 34);

    // Bar chart
    const plotX = 50;
    const plotY = 70;
    const plotW = Math.min(500, containerWidth - 330);
    const plotH = 320;
    const maxV = Math.max(r.regCost, r.hsaNow, Math.abs(r.hsaInvest)) * 1.2;

    const bars = [
        { label: 'Regular income', val: r.regCost, color: '#c62828',
          note: 'Cost $' + Math.round(r.regCost).toLocaleString() + ' of your gross pay to net $' + r.exp.toLocaleString() },
        { label: 'HSA now', val: r.hsaNow, color: '#f57c00',
          note: 'Save $' + Math.round(r.taxSavings).toLocaleString() + ' in income + FICA tax. Net cost $' + Math.round(r.hsaNow).toLocaleString() },
        { label: 'HSA invested', val: r.hsaInvest, color: r.hsaInvest < 0 ? '#2e7d32' : '#558b2f',
          note: r.hsaInvest < 0 ?
                '$' + r.exp.toLocaleString() + ' grows to $' + Math.round(r.fv).toLocaleString() + ' over ' + r.yrs + ' years — you come out ahead!' :
                'HSA grows, but for short horizons the up-front savings matter most.' }
    ];

    const barW = plotW / bars.length - 30;
    for (let i = 0; i < bars.length; i++) {
        const b = bars[i];
        const bx = plotX + i * (plotW / bars.length) + 15;
        const val = b.val;
        const zeroY = plotY + plotH - 40;
        const h = Math.abs(val) / maxV * (plotH - 60);
        const by = val >= 0 ? zeroY - h : zeroY;
        noStroke();
        fill(b.color);
        rect(bx, by, barW, h, 4);

        fill(30);
        textAlign(CENTER, BOTTOM);
        textSize(13);
        textStyle(BOLD);
        const above = val >= 0 ? by - 6 : by + h + 18;
        text('$' + Math.round(val).toLocaleString(), bx + barW / 2, above);

        textStyle(NORMAL);
        textSize(11);
        text(b.label, bx + barW / 2, zeroY + 22);

        // Note below chart
        textAlign(CENTER, TOP);
        textSize(10);
        fill(80);
        text(b.note, bx + barW / 2, plotY + plotH + 4, barW + 20, 60);
    }

    // Zero line
    stroke(180);
    const zeroY = plotY + plotH - 40;
    line(plotX, zeroY, plotX + plotW, zeroY);
    noStroke();
    fill(120);
    textAlign(LEFT, CENTER);
    textSize(10);
    text('$0 (break-even)', plotX, zeroY - 8);

    // Summary panel on right
    const sx = Math.min(580, containerWidth - 300);
    const sy = 270;
    fill(30);
    textStyle(BOLD);
    textSize(12);
    textAlign(LEFT, TOP);
    text('Tax savings math', sx, sy);
    textStyle(NORMAL);
    textSize(11);
    fill(60);
    text('Contribute $' + r.exp.toLocaleString() + ' to HSA', sx, sy + 22);
    text('Saves ' + Math.round((r.taxRate + r.fica) * 100) + '% in tax + FICA', sx, sy + 38);
    text('→ $' + Math.round(r.taxSavings).toLocaleString() + ' tax savings', sx, sy + 54);

    text('Grows to $' + Math.round(r.fv).toLocaleString() + ' in ' + r.yrs + 'y at ' + (r.ret * 100) + '%', sx, sy + 80);

    // Takeaway box
    const tx = 30;
    const ty = canvasHeight - 100;
    fill(232, 245, 233);
    stroke(165, 214, 167);
    rect(tx, ty, containerWidth - 60, 70, 5);
    noStroke();
    fill(27, 94, 32);
    textStyle(BOLD);
    textSize(12);
    text('Takeaway', tx + 12, ty + 8);
    textStyle(NORMAL);
    textSize(11);
    fill(30);
    const pct = ((r.regCost - r.hsaNow) / r.regCost * 100);
    text('Using an HSA saves ' + pct.toFixed(0) + '% vs. after-tax dollars for the same medical spending. ' +
         'Leaving money in the HSA to invest makes it even more powerful — the triple tax advantage (deductible contribution, tax-free growth, tax-free medical withdrawal).',
         tx + 12, ty + 26, containerWidth - 84, 44);
}
