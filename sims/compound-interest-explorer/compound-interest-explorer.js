// Compound Interest Explorer
// CANVAS_HEIGHT: 620
// Bloom: Analyze — students manipulate time, rate, and contribution to see compounding dominate over decades.

let canvasWidth = 800;
let drawHeight = 420;
let controlHeight = 170;
let canvasHeight = drawHeight + controlHeight + 30;
let margin = 50;
let containerWidth;
let containerHeight = canvasHeight;

let principalSlider, contribSlider, returnSlider, yearsSlider;
let showGrowthToggle;

let principal = 1000;
let monthlyContrib = 100;
let annualReturn = 7;
let years = 30;
let showGrowth = true;

function setup() {
    updateCanvasSize();
    const canvas = createCanvas(containerWidth, containerHeight);
    canvas.parent(document.querySelector('main'));
    textFont('Arial');

    const ctrlY = drawHeight + 15;
    principalSlider = createSlider(0, 10000, 1000, 100);
    principalSlider.position(margin, ctrlY);
    principalSlider.size(180);
    principalSlider.parent(document.querySelector('main'));

    contribSlider = createSlider(0, 500, 100, 10);
    contribSlider.position(margin + 260, ctrlY);
    contribSlider.size(180);
    contribSlider.parent(document.querySelector('main'));

    returnSlider = createSlider(0, 12, 7, 0.5);
    returnSlider.position(margin, ctrlY + 50);
    returnSlider.size(180);
    returnSlider.parent(document.querySelector('main'));

    yearsSlider = createSlider(5, 50, 30, 1);
    yearsSlider.position(margin + 260, ctrlY + 50);
    yearsSlider.size(180);
    yearsSlider.parent(document.querySelector('main'));

    showGrowthToggle = createCheckbox('Show principal + growth breakdown', true);
    showGrowthToggle.position(margin, ctrlY + 105);
    showGrowthToggle.parent(document.querySelector('main'));
    showGrowthToggle.style('font-size', '13px');

    describe('Interactive compound interest simulation with sliders for principal, contribution, return, and time horizon.');
}

function updateCanvasSize() {
    const container = (document.querySelector('main') && document.querySelector('main').elt)
        || document.querySelector('main');
    containerWidth = Math.min((container && container.offsetWidth) || canvasWidth, canvasWidth);
    if (containerWidth < 400) containerWidth = 400;
}

function windowResized() {
    updateCanvasSize();
    resizeCanvas(containerWidth, containerHeight);
}

function draw() {
    principal = principalSlider.value();
    monthlyContrib = contribSlider.value();
    annualReturn = returnSlider.value();
    years = yearsSlider.value();
    showGrowth = showGrowthToggle.checked();

    background(250);

    // Title
    fill(30);
    noStroke();
    textAlign(CENTER, TOP);
    textSize(16);
    textStyle(BOLD);
    text('Compound Interest Explorer', containerWidth / 2, 8);
    textStyle(NORMAL);

    const data = computeSeries();
    drawChart(data);
    drawReadouts(data);
    drawLabels();
}

function computeSeries() {
    const monthlyRate = (annualReturn / 100) / 12;
    const savingsRate = 0.005 / 12;
    const months = years * 12;
    const points = [];
    const savingsPoints = [];
    let balance = principal;
    let savings = principal;
    let contributions = principal;

    points.push({ year: 0, balance, contributions, growth: 0 });
    savingsPoints.push({ year: 0, balance: savings });

    for (let m = 1; m <= months; m++) {
        balance = balance * (1 + monthlyRate) + monthlyContrib;
        savings = savings * (1 + savingsRate) + monthlyContrib;
        contributions += monthlyContrib;
        if (m % 12 === 0) {
            const year = m / 12;
            points.push({ year, balance, contributions, growth: balance - contributions });
            savingsPoints.push({ year, balance: savings });
        }
    }
    return { points, savingsPoints, finalBalance: balance, totalContributions: contributions, savingsBalance: savings };
}

function drawChart(data) {
    const chartLeft = margin + 30;
    const chartTop = 35;
    const chartRight = containerWidth - margin - 10;
    const chartBottom = drawHeight - 40;
    const chartW = chartRight - chartLeft;
    const chartH = chartBottom - chartTop;

    // Axes
    stroke(200);
    strokeWeight(1);
    line(chartLeft, chartBottom, chartRight, chartBottom);
    line(chartLeft, chartTop, chartLeft, chartBottom);

    const maxY = Math.max(data.finalBalance, 100) * 1.05;
    // Y gridlines
    const steps = 5;
    textAlign(RIGHT, CENTER);
    textSize(10);
    noStroke();
    fill(120);
    for (let i = 0; i <= steps; i++) {
        const v = (maxY / steps) * i;
        const y = chartBottom - (v / maxY) * chartH;
        stroke(235);
        line(chartLeft, y, chartRight, y);
        noStroke();
        fill(120);
        text(fmtShort(v), chartLeft - 6, y);
    }

    // X ticks
    textAlign(CENTER, TOP);
    const xSteps = Math.min(years, 10);
    for (let i = 0; i <= xSteps; i++) {
        const year = (years / xSteps) * i;
        const x = chartLeft + (year / years) * chartW;
        stroke(220);
        line(x, chartBottom, x, chartBottom + 4);
        noStroke();
        fill(120);
        text(Math.round(year) + 'y', x, chartBottom + 8);
    }

    // Draw stacked area
    noStroke();
    if (showGrowth) {
        // Contributions (blue)
        fill(70, 130, 200, 200);
        beginShape();
        vertex(chartLeft, chartBottom);
        for (const p of data.points) {
            const x = chartLeft + (p.year / years) * chartW;
            const y = chartBottom - (p.contributions / maxY) * chartH;
            vertex(x, y);
        }
        vertex(chartLeft + chartW, chartBottom);
        endShape(CLOSE);

        // Growth on top (green)
        fill(80, 180, 120, 200);
        beginShape();
        for (const p of data.points) {
            const x = chartLeft + (p.year / years) * chartW;
            const y = chartBottom - (p.contributions / maxY) * chartH;
            vertex(x, y);
        }
        for (let i = data.points.length - 1; i >= 0; i--) {
            const p = data.points[i];
            const x = chartLeft + (p.year / years) * chartW;
            const y = chartBottom - (p.balance / maxY) * chartH;
            vertex(x, y);
        }
        endShape(CLOSE);
    } else {
        // Total balance area
        fill(70, 130, 200, 200);
        beginShape();
        vertex(chartLeft, chartBottom);
        for (const p of data.points) {
            const x = chartLeft + (p.year / years) * chartW;
            const y = chartBottom - (p.balance / maxY) * chartH;
            vertex(x, y);
        }
        vertex(chartLeft + chartW, chartBottom);
        endShape(CLOSE);
    }

    // Savings comparison line (dashed)
    stroke(180, 60, 60);
    strokeWeight(2);
    drawingContext.setLineDash([5, 4]);
    noFill();
    beginShape();
    for (const p of data.savingsPoints) {
        const x = chartLeft + (p.year / years) * chartW;
        const y = chartBottom - (p.balance / maxY) * chartH;
        vertex(x, y);
    }
    endShape();
    drawingContext.setLineDash([]);

    // Legend
    const legX = chartLeft + 10;
    const legY = chartTop + 10;
    textAlign(LEFT, CENTER);
    textSize(11);
    noStroke();
    if (showGrowth) {
        fill(70, 130, 200); rect(legX, legY, 12, 12);
        fill(30); text('Contributions', legX + 18, legY + 6);
        fill(80, 180, 120); rect(legX, legY + 18, 12, 12);
        fill(30); text('Investment growth', legX + 18, legY + 24);
    } else {
        fill(70, 130, 200); rect(legX, legY, 12, 12);
        fill(30); text('Balance (invested)', legX + 18, legY + 6);
    }
    stroke(180, 60, 60); strokeWeight(2);
    drawingContext.setLineDash([5, 4]);
    line(legX, legY + 40, legX + 12, legY + 40);
    drawingContext.setLineDash([]);
    noStroke();
    fill(30);
    text('0.5% savings account', legX + 18, legY + 40);
}

function drawReadouts(data) {
    const rx = containerWidth - 230;
    const ry = 45;
    noStroke();
    fill(245, 248, 252);
    stroke(200);
    rect(rx, ry, 220, 110, 6);
    noStroke();
    fill(40);
    textAlign(LEFT, TOP);
    textSize(11);
    textStyle(BOLD);
    text('Results after ' + years + ' years', rx + 10, ry + 8);
    textStyle(NORMAL);
    textSize(11);
    text('Final balance:', rx + 10, ry + 28);
    text('Total contributions:', rx + 10, ry + 46);
    text('Investment growth:', rx + 10, ry + 64);
    text('Savings (0.5%):', rx + 10, ry + 86);
    textAlign(RIGHT, TOP);
    textStyle(BOLD);
    fill(40, 120, 60);
    text('$' + fmt(data.finalBalance), rx + 210, ry + 28);
    fill(40);
    text('$' + fmt(data.totalContributions), rx + 210, ry + 46);
    fill(40, 120, 60);
    text('$' + fmt(data.finalBalance - data.totalContributions), rx + 210, ry + 64);
    fill(160, 60, 60);
    text('$' + fmt(data.savingsBalance), rx + 210, ry + 86);
    textStyle(NORMAL);
}

function drawLabels() {
    const ctrlY = drawHeight + 15;
    noStroke();
    fill(40);
    textAlign(LEFT, BOTTOM);
    textSize(11);
    text('Starting principal: $' + principal, margin, ctrlY - 2);
    text('Monthly contribution: $' + monthlyContrib, margin + 260, ctrlY - 2);
    text('Annual return: ' + annualReturn.toFixed(1) + '%', margin, ctrlY + 48);
    text('Time horizon: ' + years + ' years', margin + 260, ctrlY + 48);
}

function fmt(v) {
    return Math.round(v).toLocaleString('en-US');
}
function fmtShort(v) {
    if (v >= 1e6) return '$' + (v / 1e6).toFixed(1) + 'M';
    if (v >= 1e3) return '$' + Math.round(v / 1e3) + 'k';
    return '$' + Math.round(v);
}
