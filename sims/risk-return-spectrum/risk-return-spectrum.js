// Risk-Return Spectrum Infographic
// CANVAS_HEIGHT: 560
// Bloom: Analyze — students compare asset classes and see that higher expected returns always come with higher potential loss.

let canvasWidth = 800;
let canvasHeight = 560;
let containerWidth;
let containerHeight = canvasHeight;

let viewToggle;
let showReal = false;
let hoverIdx = -1;

const assets = [
    { name: 'Savings', risk: 1, nominal: 0.5, bestYr: 1, worstYr: 0, horizon: '0–1 yr', def: 'FDIC-insured bank deposits; principal cannot lose value.' },
    { name: 'High-Yield Savings', risk: 1, nominal: 4, bestYr: 5, worstYr: 0.5, horizon: '0–2 yr', def: 'Online bank savings paying rates roughly equal to short Treasuries.' },
    { name: 'CDs', risk: 2, nominal: 4, bestYr: 5.5, worstYr: 0.5, horizon: '0.5–5 yr', def: 'Time deposits with a guaranteed rate if held to maturity.' },
    { name: 'Treasuries', risk: 3, nominal: 4, bestYr: 14, worstYr: -8, horizon: '1–30 yr', def: 'Loans to the U.S. government — virtually no default risk.' },
    { name: 'Municipal Bonds', risk: 4, nominal: 4.5, bestYr: 15, worstYr: -10, horizon: '5–20 yr', def: 'Bonds issued by state or local governments; often federally tax-free.' },
    { name: 'Corporate Bonds', risk: 5, nominal: 5.5, bestYr: 20, worstYr: -15, horizon: '5–20 yr', def: 'Loans to companies; higher yield than Treasuries but credit risk varies.' },
    { name: '60/40 Balanced', risk: 6, nominal: 7, bestYr: 25, worstYr: -20, horizon: '10+ yr', def: 'Classic mix of 60% stocks and 40% bonds for moderate growth.' },
    { name: 'Stock Index Fund', risk: 8, nominal: 10, bestYr: 38, worstYr: -37, horizon: '10+ yr', def: 'Broad-market fund that owns hundreds of companies at once.' },
    { name: 'Individual Stocks', risk: 10, nominal: 10, bestYr: 200, worstYr: -100, horizon: '10+ yr', def: 'Single-company ownership; large upside but full-loss possibility.' }
];

const inflation = 3.0;

function setup() {
    updateCanvasSize();
    const canvas = createCanvas(containerWidth, containerHeight);
    canvas.parent(document.querySelector('main'));
    textFont('Arial');

    viewToggle = createCheckbox('Show real return (after ~3% inflation)', false);
    viewToggle.position(40, canvasHeight - 45);
    viewToggle.parent(document.querySelector('main'));
    viewToggle.style('font-size', '13px');

    describe('Scatter-style infographic plotting asset classes by risk and expected return with hover tooltips.');
}

function updateCanvasSize() {
    const container = document.querySelector('main');
    containerWidth = Math.min((container && container.offsetWidth) || canvasWidth, canvasWidth);
    if (containerWidth < 400) containerWidth = 400;
}

function windowResized() {
    updateCanvasSize();
    resizeCanvas(containerWidth, containerHeight);
    viewToggle.position(40, canvasHeight - 45);
}

function draw() {
    showReal = viewToggle.checked();
    background(252);

    // Title
    fill(30);
    noStroke();
    textAlign(CENTER, TOP);
    textSize(17);
    textStyle(BOLD);
    text('Risk vs. Return Spectrum', containerWidth / 2, 10);
    textStyle(NORMAL);
    textSize(11);
    fill(100);
    text('Higher returns always come bundled with higher potential loss.', containerWidth / 2, 32);

    const plotL = 70;
    const plotR = containerWidth - 40;
    const plotT = 60;
    const plotB = canvasHeight - 110;
    const plotW = plotR - plotL;
    const plotH = plotB - plotT;

    // Axis labels
    const maxReturn = showReal ? 9 : 12;
    const minReturn = showReal ? -3 : 0;

    stroke(210);
    strokeWeight(1);
    // grid
    textAlign(RIGHT, CENTER);
    textSize(10);
    noStroke();
    fill(120);
    for (let r = minReturn; r <= maxReturn; r += 2) {
        const y = map(r, minReturn, maxReturn, plotB, plotT);
        stroke(235); line(plotL, y, plotR, y);
        noStroke(); fill(120);
        text(r + '%', plotL - 6, y);
    }
    textAlign(CENTER, TOP);
    for (let x = 0; x <= 10; x += 2) {
        const px = map(x, 0, 10, plotL, plotR);
        stroke(235); line(px, plotT, px, plotB);
        noStroke(); fill(120);
        text(x, px, plotB + 6);
    }

    // Inflation line
    if (!showReal) {
        stroke(200, 80, 80);
        strokeWeight(1.5);
        drawingContext.setLineDash([5, 4]);
        const yInf = map(inflation, minReturn, maxReturn, plotB, plotT);
        line(plotL, yInf, plotR, yInf);
        drawingContext.setLineDash([]);
        noStroke();
        fill(200, 80, 80);
        textAlign(LEFT, CENTER);
        textSize(10);
        text('avg. inflation (~3%)', plotL + 8, yInf - 8);
    }

    // Axis titles
    noStroke();
    fill(50);
    textAlign(CENTER, CENTER);
    textSize(12);
    textStyle(BOLD);
    text('Risk →', (plotL + plotR) / 2, plotB + 28);
    push();
    translate(20, (plotT + plotB) / 2);
    rotate(-HALF_PI);
    text(showReal ? 'Real return (after inflation)' : 'Expected annual return', 0, 0);
    pop();
    textStyle(NORMAL);

    // Plot points
    hoverIdx = -1;
    for (let i = 0; i < assets.length; i++) {
        const a = assets[i];
        const x = map(a.risk, 0, 10, plotL, plotR);
        const ret = showReal ? a.nominal - inflation : a.nominal;
        const y = map(ret, minReturn, maxReturn, plotB, plotT);
        const col = lerpColor(color(70, 140, 200), color(220, 90, 80), a.risk / 10);
        const d = dist(mouseX, mouseY, x, y);
        const r = d < 14 ? 14 : 10;
        if (d < 14 && hoverIdx === -1) hoverIdx = i;

        stroke(255);
        strokeWeight(2);
        fill(col);
        circle(x, y, r);

        noStroke();
        fill(50);
        textAlign(CENTER, BOTTOM);
        textSize(10);
        text(a.name, x, y - 10);
    }

    // Tooltip
    if (hoverIdx >= 0) {
        const a = assets[hoverIdx];
        const boxW = 270;
        const boxH = 90;
        let tx = mouseX + 12;
        let ty = mouseY + 12;
        if (tx + boxW > containerWidth) tx = mouseX - boxW - 12;
        if (ty + boxH > canvasHeight - 60) ty = mouseY - boxH - 12;
        fill(255);
        stroke(80);
        strokeWeight(1);
        rect(tx, ty, boxW, boxH, 6);
        noStroke();
        fill(20);
        textAlign(LEFT, TOP);
        textSize(12);
        textStyle(BOLD);
        text(a.name, tx + 10, ty + 8);
        textStyle(NORMAL);
        textSize(11);
        text(a.def, tx + 10, ty + 26, boxW - 20, 40);
        fill(80);
        textSize(10);
        text('Typical horizon: ' + a.horizon, tx + 10, ty + 62);
        text('Best/worst year: +' + a.bestYr + '% / ' + a.worstYr + '%', tx + 10, ty + 74);
    }
}
