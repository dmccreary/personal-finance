// Spending Pattern Analysis
// CANVAS_HEIGHT: 700
// Bloom: Analyze — students spot spending patterns across time and category.

let canvasWidth = 960;
let canvasHeight = 700;
let containerWidth;
let containerHeight = canvasHeight;

let viewSelect, scenarioSelect, budgetSlider;
let data;
const categories = [
    { key: 'housing',   label: 'Housing',       color: '#1565c0' },
    { key: 'food',      label: 'Food & dining', color: '#f57c00' },
    { key: 'transport', label: 'Transportation',color: '#6a1b9a' },
    { key: 'entertain', label: 'Entertainment', color: '#c2185b' },
    { key: 'shopping',  label: 'Shopping',      color: '#00838f' },
    { key: 'other',     label: 'Other',         color: '#4e342e' }
];

function setup() {
    updateCanvasSize();
    const canvas = createCanvas(containerWidth, containerHeight);
    canvas.parent(document.querySelector('main'));
    textFont('Arial');

    const main = document.querySelector('main');

    viewSelect = createSelect();
    viewSelect.parent(main);
    viewSelect.option('Monthly trend', 'trend');
    viewSelect.option('Category breakdown', 'category');
    viewSelect.option('Calendar heatmap', 'heatmap');
    viewSelect.option('Day-of-month pattern', 'dom');

    scenarioSelect = createSelect();
    scenarioSelect.parent(main);
    scenarioSelect.option('College student', 'student');
    scenarioSelect.option('Young professional', 'young');
    scenarioSelect.option('Impulse spender', 'impulse');
    scenarioSelect.option('Budget-conscious', 'budget');
    scenarioSelect.changed(() => generateData(scenarioSelect.value()));

    budgetSlider = createSlider(500, 5000, 2500, 100);
    budgetSlider.parent(main);

    layoutControls();
    generateData('young');
    describe('Spending analysis with 4 visualization modes and 4 scenario datasets.');
}

function layoutControls() {
    const y = canvasHeight - 60;
    viewSelect.position(20, y);
    scenarioSelect.position(200, y);
    budgetSlider.position(380, y + 3);
    budgetSlider.size(200);
}

function updateCanvasSize() {
    const container = document.querySelector('main');
    containerWidth = Math.min((container && container.offsetWidth) || canvasWidth, canvasWidth);
    if (containerWidth < 500) containerWidth = 500;
}

function windowResized() {
    updateCanvasSize();
    resizeCanvas(containerWidth, containerHeight);
    layoutControls();
}

function seededRandom(seed) {
    let s = seed;
    return () => {
        s = (s * 9301 + 49297) % 233280;
        return s / 233280;
    };
}

function generateData(scenario) {
    const rng = seededRandom({ student: 42, young: 100, impulse: 7, budget: 13 }[scenario] || 1);
    const months = 12;
    const daily = [];
    const today = new Date();
    for (let d = 0; d < months * 30; d++) {
        const date = new Date(today);
        date.setDate(date.getDate() - (months * 30 - d));
        const dow = date.getDay();
        const dom = date.getDate();
        const isWeekend = dow === 0 || dow === 6;
        const isPayday = dom === 1 || dom === 15;
        const spend = {};
        for (const c of categories) {
            let base = 0;
            if (c.key === 'housing') base = dom === 1 ? 1200 : 0;
            else if (c.key === 'food') base = 18 + rng() * 25 + (isWeekend ? 20 : 0);
            else if (c.key === 'transport') base = dow === 0 ? 0 : 8 + rng() * 15;
            else if (c.key === 'entertain') base = isWeekend ? 10 + rng() * 50 : rng() * 15;
            else if (c.key === 'shopping') base = rng() * 20 + (isPayday ? 80 : 0);
            else base = rng() * 10;

            if (scenario === 'student' && c.key === 'housing') base = dom === 1 ? 600 : 0;
            if (scenario === 'impulse') {
                if (c.key === 'shopping') base += rng() * 60;
                if (c.key === 'entertain') base += rng() * 30;
            }
            if (scenario === 'budget') base *= 0.7;
            spend[c.key] = Math.max(0, base);
        }
        daily.push({ date, spend });
    }
    // Aggregate by month and category
    const monthly = {};
    for (const d of daily) {
        const k = d.date.getFullYear() + '-' + (d.date.getMonth() + 1);
        if (!monthly[k]) {
            monthly[k] = { label: d.date.toLocaleString(undefined, { month: 'short' }), date: new Date(d.date), cat: {} };
            for (const c of categories) monthly[k].cat[c.key] = 0;
        }
        for (const c of categories) monthly[k].cat[c.key] += d.spend[c.key];
    }
    data = { daily, monthly: Object.values(monthly), scenario };
}

function draw() {
    background(250);
    noStroke();
    fill(30);
    textAlign(CENTER, TOP);
    textStyle(BOLD);
    textSize(17);
    text('Spending Pattern Analysis', containerWidth / 2, 12);
    textStyle(NORMAL);
    textSize(11);
    fill(100);
    text('Switch views and scenarios to spot patterns. Budget reference line adjusts with slider.', containerWidth / 2, 34);

    const plotT = 60;
    const plotB = canvasHeight - 200;
    const plotL = 60;
    const plotR = containerWidth - 30;
    const budget = budgetSlider.value();

    const view = viewSelect.value();
    if (view === 'trend') drawTrend(plotL, plotT, plotR, plotB, budget);
    else if (view === 'category') drawCategory(plotL, plotT, plotR, plotB, budget);
    else if (view === 'heatmap') drawHeatmap(plotL, plotT, plotR, plotB);
    else drawDOM(plotL, plotT, plotR, plotB);

    drawInsights(plotL, plotB + 20, plotR, budget);
}

function drawTrend(l, t, r, b, budget) {
    const months = data.monthly;
    const totals = months.map(m => Object.values(m.cat).reduce((a, c) => a + c, 0));
    const maxVal = Math.max(budget * 1.3, ...totals) * 1.05;

    stroke(235); strokeWeight(1);
    for (let i = 0; i <= 5; i++) {
        const y = map(i, 0, 5, b, t);
        line(l, y, r, y);
        noStroke();
        fill(120); textSize(9); textAlign(RIGHT, CENTER);
        text('$' + Math.round((maxVal * i) / 5).toLocaleString(), l - 4, y);
        stroke(235);
    }

    // Category stacked lines (just draw each category line)
    for (const c of categories) {
        stroke(c.color); noFill(); strokeWeight(2);
        beginShape();
        months.forEach((m, i) => {
            const x = map(i, 0, months.length - 1, l, r);
            const y = map(m.cat[c.key], 0, maxVal, b, t);
            vertex(x, y);
        });
        endShape();
    }

    // Budget line
    stroke(200, 80, 80);
    strokeWeight(1.5);
    drawingContext.setLineDash([5, 4]);
    const yB = map(budget, 0, maxVal, b, t);
    line(l, yB, r, yB);
    drawingContext.setLineDash([]);
    noStroke();
    fill(200, 80, 80);
    textSize(10); textAlign(LEFT, BOTTOM);
    text('Budget: $' + budget.toLocaleString(), l + 8, yB - 2);

    // X labels
    noStroke(); fill(120); textSize(10); textAlign(CENTER, TOP);
    months.forEach((m, i) => {
        if (i % 2 === 0 || months.length < 10) {
            const x = map(i, 0, months.length - 1, l, r);
            text(m.label, x, b + 6);
        }
    });

    drawLegend(l, t);
}

function drawCategory(l, t, r, b, budget) {
    const totals = {};
    for (const c of categories) totals[c.key] = 0;
    for (const m of data.monthly) for (const c of categories) totals[c.key] += m.cat[c.key];
    const avgMonth = {};
    for (const c of categories) avgMonth[c.key] = totals[c.key] / data.monthly.length;

    const barH = 28;
    const maxAvg = Math.max(budget * 0.6, ...Object.values(avgMonth));
    noStroke();
    textAlign(LEFT, CENTER);
    textSize(12);
    for (let i = 0; i < categories.length; i++) {
        const c = categories[i];
        const y = t + 20 + i * (barH + 10);
        fill(30);
        text(c.label, l, y + barH / 2);
        const barL = l + 130;
        const barW = r - 30 - barL;
        fill(235);
        rect(barL, y, barW, barH, 3);
        const w = (avgMonth[c.key] / maxAvg) * barW;
        fill(c.color);
        rect(barL, y, w, barH, 3);
        fill(30);
        textAlign(RIGHT, CENTER);
        text('$' + Math.round(avgMonth[c.key]).toLocaleString() + '/mo', barL + barW + 0, y + barH / 2);
        textAlign(LEFT, CENTER);
    }
    fill(90);
    textSize(11);
    text('Average monthly spend per category', l, t + 4);
}

function drawHeatmap(l, t, r, b) {
    const months = data.monthly.slice(-6);
    const cellW = (r - l - 40) / 31;
    const cellH = (b - t - 30) / months.length;
    const totals = [];
    for (const m of months) {
        const daily = [];
        for (let d = 1; d <= 31; d++) daily.push(0);
        totals.push(daily);
    }
    for (const entry of data.daily) {
        const mi = months.findIndex(m => m.date.getMonth() === entry.date.getMonth() && m.date.getFullYear() === entry.date.getFullYear());
        if (mi === -1) continue;
        const sum = Object.values(entry.spend).reduce((a, c) => a + c, 0);
        totals[mi][entry.date.getDate() - 1] += sum;
    }
    const allVals = totals.flat().filter(v => v > 0);
    const maxV = Math.max(...allVals, 1);

    noStroke();
    textSize(10); textAlign(CENTER, BOTTOM); fill(120);
    for (let d = 0; d < 31; d++) {
        if ((d + 1) % 5 === 0 || d === 0 || d === 30) {
            text(d + 1, l + 60 + d * cellW + cellW / 2, t + 18);
        }
    }

    for (let mi = 0; mi < months.length; mi++) {
        textAlign(RIGHT, CENTER); fill(60);
        text(months[mi].label, l + 55, t + 30 + mi * cellH + cellH / 2);
        for (let d = 0; d < 31; d++) {
            const v = totals[mi][d];
            const intensity = v / maxV;
            const col = lerpColor(color(255, 243, 224), color(183, 28, 28), Math.min(1, intensity));
            fill(v === 0 ? color(245) : col);
            stroke(255);
            rect(l + 60 + d * cellW, t + 30 + mi * cellH, cellW - 1, cellH - 1);
        }
    }
}

function drawDOM(l, t, r, b) {
    const totals = new Array(31).fill(0);
    const counts = new Array(31).fill(0);
    for (const entry of data.daily) {
        const d = entry.date.getDate() - 1;
        const sum = Object.values(entry.spend).reduce((a, c) => a + c, 0);
        totals[d] += sum;
        counts[d]++;
    }
    const avg = totals.map((s, i) => counts[i] > 0 ? s / counts[i] : 0);
    const maxV = Math.max(...avg) * 1.1;
    const barW = (r - l - 10) / 31;

    stroke(230); strokeWeight(1);
    for (let i = 0; i <= 4; i++) {
        const y = map(i, 0, 4, b - 20, t + 20);
        line(l, y, r, y);
        noStroke(); fill(120); textSize(9); textAlign(RIGHT, CENTER);
        text('$' + Math.round((maxV * i) / 4), l - 4, y);
        stroke(230);
    }
    noStroke();
    for (let d = 0; d < 31; d++) {
        const h = ((avg[d]) / maxV) * (b - t - 40);
        const x = l + d * barW;
        fill(d === 0 || d === 14 ? color(200, 80, 80) : color(30, 136, 229));
        rect(x, b - 20 - h, barW - 2, h);
    }
    fill(120); textSize(10); textAlign(CENTER, TOP);
    for (let d = 0; d < 31; d += 5) text(d + 1, l + d * barW + barW / 2, b - 16);
    fill(50); textSize(10); textAlign(CENTER, TOP);
    text('Avg spend by day of month (red = payday spikes)', (l + r) / 2, t + 4);
}

function drawLegend(l, t) {
    let ly = t + 6;
    textAlign(LEFT, CENTER);
    textSize(10);
    for (const c of categories) {
        fill(c.color); noStroke();
        rect(l + 10, ly - 4, 10, 10);
        fill(30);
        text(c.label, l + 26, ly);
        ly += 13;
    }
}

function drawInsights(l, y, r, budget) {
    const totals = {};
    for (const c of categories) totals[c.key] = 0;
    for (const m of data.monthly) for (const c of categories) totals[c.key] += m.cat[c.key];
    const nMonths = data.monthly.length;
    const monthlyAvg = Object.values(totals).reduce((a, b) => a + b, 0) / nMonths;

    let weekend = 0, weekday = 0, wkc = 0, wdc = 0;
    for (const entry of data.daily) {
        const sum = Object.values(entry.spend).reduce((a, b) => a + b, 0);
        if (entry.date.getDay() === 0 || entry.date.getDay() === 6) { weekend += sum; wkc++; }
        else { weekday += sum; wdc++; }
    }
    const wkAvg = weekend / Math.max(1, wkc);
    const wdAvg = weekday / Math.max(1, wdc);
    const wkPct = wdAvg > 0 ? (wkAvg / wdAvg - 1) * 100 : 0;

    const overBudget = monthlyAvg > budget;

    noStroke();
    fill(245);
    stroke(210);
    rect(l, y, r - l, 110, 5);
    noStroke();
    fill(30);
    textAlign(LEFT, TOP);
    textStyle(BOLD);
    textSize(12);
    text('Insights', l + 10, y + 6);
    textStyle(NORMAL);
    textSize(11);
    const insights = [];
    insights.push(`• Average spending: $${Math.round(monthlyAvg).toLocaleString()}/month  (budget $${budget.toLocaleString()}) — ${overBudget ? 'OVER' : 'within'} budget.`);
    if (wkPct > 10) insights.push(`• You spend ${wkPct.toFixed(0)}% more on weekends. Plan weekend activities with a set limit.`);
    const foodAvg = totals.food / nMonths;
    if (foodAvg > 500) insights.push(`• Dining/food averages $${Math.round(foodAvg)}/month — a classic place to find savings.`);
    insights.push('• Even $5/day = $1,825/year. Small patterns add up fast.');

    let ly = y + 24;
    fill(50);
    for (const t of insights) {
        text(t, l + 14, ly, r - l - 24);
        ly += 20;
    }
}
