// Compound Interest Growth Comparison — traditional vs high-yield savings
// CANVAS_HEIGHT: 600
// Bloom: Analyze — students compare growth between traditional and high-yield savings over time.

let canvasWidth = 900;
let canvasHeight = 600;
let containerWidth;
let containerHeight = canvasHeight;

let initSlider, monthlySlider, tradSlider, hySlider, yearsSlider;
let labels = {};

function setup() {
    updateCanvasSize();
    const c = createCanvas(containerWidth, containerHeight);
    c.parent(document.querySelector('main'));
    textFont('Arial');
    const main = document.querySelector('main');

    const ctrlY = canvasHeight - 180;
    function addCtrl(key, label, min, max, def, step, x, y) {
        const l = createDiv(label);
        l.position(x, y);
        l.parent(main);
        l.style('font-size', '12px');
        l.style('font-weight', 'bold');
        labels[key] = l;
        const s = createSlider(min, max, def, step);
        s.position(x, y + 18);
        s.size(180);
        s.parent(main);
        return s;
    }
    initSlider    = addCtrl('init', 'Initial deposit: $5,000',        100,  10000, 5000, 100, 30,  ctrlY);
    monthlySlider = addCtrl('month','Monthly deposit: $100',            0,   1000,  100,  10, 230, ctrlY);
    tradSlider    = addCtrl('trad', 'Traditional APY: 0.5%',          0.1,    1.0,  0.5, 0.1, 430, ctrlY);
    hySlider      = addCtrl('hy',   'High-Yield APY: 4.5%',           3.0,    6.0,  4.5, 0.1, 630, ctrlY);
    yearsSlider   = addCtrl('years','Years: 10',                        1,     30,   10,   1,  30, ctrlY + 60);

    describe('Comparison of traditional and high-yield savings account growth over time.');
}

function updateCanvasSize() {
    const container = document.querySelector('main');
    containerWidth = Math.min((container && container.offsetWidth) || canvasWidth, canvasWidth);
    if (containerWidth < 500) containerWidth = 500;
}

function windowResized() {
    updateCanvasSize();
    resizeCanvas(containerWidth, containerHeight);
}

function computeSeries(p, pmt, annualRate, years) {
    const rMonthly = annualRate / 12;
    const months = years * 12;
    const points = [{ year: 0, balance: p }];
    let bal = p;
    for (let m = 1; m <= months; m++) {
        bal = bal * (1 + rMonthly) + pmt;
        if (m % 12 === 0) points.push({ year: m / 12, balance: bal });
    }
    return points;
}

function draw() {
    const p = initSlider.value();
    const pmt = monthlySlider.value();
    const tradRate = tradSlider.value() / 100;
    const hyRate = hySlider.value() / 100;
    const years = yearsSlider.value();

    labels.init.html('Initial deposit: $' + p.toLocaleString());
    labels.month.html('Monthly deposit: $' + pmt);
    labels.trad.html('Traditional APY: ' + (tradRate * 100).toFixed(1) + '%');
    labels.hy.html('High-Yield APY: ' + (hyRate * 100).toFixed(1) + '%');
    labels.years.html('Years: ' + years);

    const trad = computeSeries(p, pmt, tradRate, years);
    const hy = computeSeries(p, pmt, hyRate, years);
    const finalTrad = trad[trad.length - 1].balance;
    const finalHy = hy[hy.length - 1].balance;
    const diff = finalHy - finalTrad;
    const contributed = p + pmt * 12 * years;

    background(250);
    noStroke();
    fill(30);
    textAlign(CENTER, TOP);
    textStyle(BOLD);
    textSize(17);
    text('Traditional vs. High-Yield Savings Growth', containerWidth / 2, 10);
    textStyle(NORMAL);

    // Chart
    const plotL = 70, plotR = containerWidth - 30;
    const plotT = 50,  plotB = canvasHeight - 220;
    const plotW = plotR - plotL;
    const plotH = plotB - plotT;
    const maxY = Math.max(finalHy, 100) * 1.1;

    // Grid
    stroke(230);
    strokeWeight(1);
    textAlign(RIGHT, CENTER);
    textSize(10);
    for (let i = 0; i <= 5; i++) {
        const y = plotT + (plotH / 5) * i;
        line(plotL, y, plotR, y);
        noStroke();
        fill(120);
        text('$' + fmtK(maxY - (maxY / 5) * i), plotL - 6, y);
        stroke(230);
    }
    noStroke();
    fill(120);
    textAlign(CENTER, TOP);
    for (let i = 0; i <= Math.min(years, 10); i++) {
        const yr = Math.round((years / Math.min(years, 10)) * i);
        const x = plotL + (yr / years) * plotW;
        text(yr + 'y', x, plotB + 6);
    }

    // Shaded difference
    fill(255, 215, 0, 100);
    noStroke();
    beginShape();
    for (const pt of hy) {
        const x = plotL + (pt.year / years) * plotW;
        const y = plotT + (1 - pt.balance / maxY) * plotH;
        vertex(x, y);
    }
    for (let i = trad.length - 1; i >= 0; i--) {
        const pt = trad[i];
        const x = plotL + (pt.year / years) * plotW;
        const y = plotT + (1 - pt.balance / maxY) * plotH;
        vertex(x, y);
    }
    endShape(CLOSE);

    // Lines
    noFill();
    stroke(40, 140, 70);
    strokeWeight(3);
    beginShape();
    for (const pt of hy) {
        const x = plotL + (pt.year / years) * plotW;
        const y = plotT + (1 - pt.balance / maxY) * plotH;
        vertex(x, y);
    }
    endShape();

    stroke(60, 100, 180);
    beginShape();
    for (const pt of trad) {
        const x = plotL + (pt.year / years) * plotW;
        const y = plotT + (1 - pt.balance / maxY) * plotH;
        vertex(x, y);
    }
    endShape();

    // Legend
    noStroke();
    fill(40, 140, 70);
    rect(plotL + 10, plotT + 10, 14, 14);
    fill(30); textAlign(LEFT, CENTER); textSize(11);
    text('High-Yield: $' + Math.round(finalHy).toLocaleString(), plotL + 30, plotT + 17);
    fill(60, 100, 180);
    rect(plotL + 10, plotT + 30, 14, 14);
    fill(30);
    text('Traditional: $' + Math.round(finalTrad).toLocaleString(), plotL + 30, plotT + 37);
    fill(255, 215, 0);
    rect(plotL + 10, plotT + 50, 14, 14);
    fill(30);
    text('Difference: $' + Math.round(diff).toLocaleString(), plotL + 30, plotT + 57);

    // Insight
    noStroke();
    fill(30);
    textAlign(CENTER, TOP);
    textSize(12);
    const monthsEq = pmt > 0 ? Math.round(diff / pmt) : 0;
    text('You contributed $' + Math.round(contributed).toLocaleString() +
         '. High-yield earned $' + Math.round(diff).toLocaleString() + ' more' +
         (pmt > 0 ? ' — about ' + monthsEq + ' months of your contributions.' : '.'),
         containerWidth / 2, plotB + 30);
}

function fmtK(v) {
    if (v >= 1e6) return (v / 1e6).toFixed(1) + 'M';
    if (v >= 1000) return Math.round(v / 1000) + 'k';
    return Math.round(v);
}
