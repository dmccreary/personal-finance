// Emergency Fund Building Roadmap
// CANVAS_HEIGHT: 720
// Bloom: Apply — students plan an emergency fund timeline from their own numbers.

let canvasWidth = 900;
let canvasHeight = 720;
let containerWidth;
let containerHeight = canvasHeight;

let inputs = {};
let presetSelect;
let saveBtn;

const defaults = {
    housing: 1200, utilities: 150, groceries: 400, transport: 250,
    insurance: 150, debt: 100, other: 100, balance: 500, savings: 200
};
const presets = {
    student:   { housing: 600, utilities: 80,  groceries: 250, transport: 100, insurance: 80,  debt: 50,  other: 80,  balance: 200,  savings: 100 },
    young:     { housing: 1400, utilities: 180, groceries: 400, transport: 300, insurance: 180, debt: 200, other: 120, balance: 1000, savings: 300 },
    family:    { housing: 2200, utilities: 350, groceries: 900, transport: 500, insurance: 350, debt: 400, other: 200, balance: 2000, savings: 400 }
};

function setup() {
    updateCanvasSize();
    const canvas = createCanvas(containerWidth, containerHeight);
    canvas.parent(document.querySelector('main'));
    textFont('Arial');

    buildInputs();
    loadPreset('default');
    describe('Emergency fund roadmap with expense inputs, milestones, and timeline estimates.');
}

function updateCanvasSize() {
    const container = document.querySelector('main');
    containerWidth = Math.min((container && container.offsetWidth) || canvasWidth, canvasWidth);
    if (containerWidth < 500) containerWidth = 500;
}

function windowResized() {
    updateCanvasSize();
    resizeCanvas(containerWidth, containerHeight);
    layoutInputs();
}

function buildInputs() {
    const main = document.querySelector('main');
    presetSelect = createSelect();
    presetSelect.parent(main);
    presetSelect.option('— Preset —', '');
    presetSelect.option('Typical college student', 'student');
    presetSelect.option('Young professional', 'young');
    presetSelect.option('Family household', 'family');
    presetSelect.changed(() => {
        const v = presetSelect.value();
        if (v) loadPreset(v);
    });

    const fields = [
        ['housing', 'Housing'], ['utilities', 'Utilities'], ['groceries', 'Groceries'],
        ['transport', 'Transportation'], ['insurance', 'Insurance'], ['debt', 'Min debt payments'],
        ['other', 'Other essentials'], ['balance', 'Current balance'], ['savings', 'Monthly savings']
    ];
    for (const [key, label] of fields) {
        const l = createSpan(label + ': $');
        l.parent(main);
        l.style('font-size', '11px');
        const inp = createInput(String(defaults[key]));
        inp.parent(main);
        inp.size(70);
        inp.attribute('type', 'number');
        inp.style('font-size', '12px');
        inputs[key] = { label: l, input: inp };
    }

    layoutInputs();
}

function layoutInputs() {
    const x = Math.min(540, containerWidth - 260);
    let y = 70;
    presetSelect.position(x, y - 26);
    const keys = ['housing', 'utilities', 'groceries', 'transport', 'insurance', 'debt', 'other', 'balance', 'savings'];
    for (const k of keys) {
        inputs[k].label.position(x, y);
        inputs[k].input.position(x + 140, y - 2);
        y += 26;
    }
}

function loadPreset(name) {
    const v = name === 'default' ? defaults : presets[name] || defaults;
    for (const k in v) {
        if (inputs[k]) inputs[k].input.value(v[k]);
    }
}

function readValue(key) {
    const v = parseFloat(inputs[key].input.value());
    return isNaN(v) || v < 0 ? 0 : v;
}

function draw() {
    background(250);

    const essentials = readValue('housing') + readValue('utilities') + readValue('groceries') +
                       readValue('transport') + readValue('insurance') + readValue('debt') + readValue('other');
    const starter = 1000;
    const threeMo = essentials * 3;
    const sixMo = essentials * 6;
    const balance = readValue('balance');
    const savings = readValue('savings');

    // Title
    noStroke();
    fill(30);
    textAlign(CENTER, TOP);
    textStyle(BOLD);
    textSize(17);
    text('Emergency Fund Building Roadmap', containerWidth / 2, 12);
    textStyle(NORMAL);
    textSize(11);
    fill(100);
    text('Fill in essential expenses and current savings to see your journey.', containerWidth / 2, 34);

    // Roadmap
    const roadX = 60;
    const roadTop = 80;
    const roadBottom = canvasHeight - 140;
    const roadW = 22;

    // Path background
    noStroke();
    fill(230);
    rect(roadX - roadW / 2, roadTop, roadW, roadBottom - roadTop, roadW / 2);

    // Fill based on progress toward 6-month
    const progressFrac = sixMo > 0 ? Math.min(1, balance / sixMo) : 0;
    const fillH = (roadBottom - roadTop) * progressFrac;
    const barGrad = progressFrac < 0.33 ? color(198, 40, 40) :
                    progressFrac < 0.66 ? color(251, 192, 45) : color(46, 125, 50);
    fill(barGrad);
    rect(roadX - roadW / 2, roadBottom - fillH, roadW, fillH, roadW / 2);

    // Milestones
    const milestones = [
        { label: 'START', sub: 'No emergency fund', amt: 0, pos: 0 },
        { label: 'Starter', sub: '$1,000 buffer', amt: starter, pos: Math.min(1, starter / (sixMo || 1)) },
        { label: '3-Month', sub: '$' + Math.round(threeMo).toLocaleString(), amt: threeMo, pos: 0.5 },
        { label: '6-Month', sub: '$' + Math.round(sixMo).toLocaleString(), amt: sixMo, pos: 1.0 }
    ];

    for (const m of milestones) {
        const y = roadBottom - m.pos * (roadBottom - roadTop);
        const reached = balance >= m.amt;
        stroke(reached ? color(46, 125, 50) : color(160));
        strokeWeight(2);
        fill(reached ? color(200, 230, 201) : 255);
        circle(roadX, y, 24);
        noStroke();
        fill(30);
        textAlign(LEFT, CENTER);
        textStyle(BOLD);
        textSize(12);
        text(m.label, roadX + 22, y - 6);
        textStyle(NORMAL);
        textSize(10);
        fill(90);
        text(m.sub, roadX + 22, y + 8);
        if (reached) {
            fill(46, 125, 50);
            textSize(14);
            text('✓', roadX - 4, y);
        }
    }

    // Character position
    const charY = roadBottom - Math.min(1, progressFrac) * (roadBottom - roadTop);
    fill(21, 101, 192);
    noStroke();
    triangle(roadX + 16, charY, roadX + 28, charY - 8, roadX + 28, charY + 8);

    // Right: summary
    const x = Math.min(540, containerWidth - 260);
    const y = canvasHeight - 360;
    noStroke();
    fill(30);
    textAlign(LEFT, TOP);
    textStyle(BOLD);
    textSize(13);
    text('Your numbers', x, y);
    textStyle(NORMAL);
    textSize(11);
    fill(50);
    text('Essential monthly expenses:  $' + Math.round(essentials).toLocaleString(), x, y + 20);
    text('Starter goal:                   $' + starter.toLocaleString(), x, y + 36);
    text('3-month goal:                  $' + Math.round(threeMo).toLocaleString(), x, y + 52);
    text('6-month goal:                  $' + Math.round(sixMo).toLocaleString(), x, y + 68);

    textStyle(BOLD);
    text('Progress', x, y + 92);
    textStyle(NORMAL);
    text('Current balance:   $' + balance.toLocaleString() +
         '  (' + (progressFrac * 100).toFixed(0) + '%)', x, y + 110);

    // Timeline
    textStyle(BOLD);
    text('Timeline at $' + savings + '/mo', x, y + 138);
    textStyle(NORMAL);
    if (savings <= 0) {
        fill(198, 40, 40);
        text('Increase your monthly savings to build a timeline.', x, y + 158);
    } else {
        const toStarter = Math.max(0, starter - balance);
        const toThree = Math.max(0, threeMo - balance);
        const toSix = Math.max(0, sixMo - balance);
        const daysStart = Math.ceil(toStarter / savings * 30);
        const monthsThree = toThree / savings;
        const monthsSix = toSix / savings;
        fill(50);
        text('Starter: ' + (toStarter === 0 ? 'achieved ✓' : daysStart + ' days'), x, y + 156);
        text('3-month: ' + (toThree === 0 ? 'achieved ✓' : monthsThree.toFixed(1) + ' months'), x, y + 172);
        text('6-month: ' + (toSix === 0 ? 'achieved ✓' : monthsSix.toFixed(1) + ' months'), x, y + 188);

        if (toSix > 0) {
            const eta = new Date();
            eta.setMonth(eta.getMonth() + Math.ceil(monthsSix));
            fill(46, 125, 50);
            text('Full 6-month fund by: ' + eta.toLocaleDateString(undefined, { year: 'numeric', month: 'short' }), x, y + 210);
        }
    }

    // Insight
    const iy = canvasHeight - 100;
    noStroke();
    fill(245);
    stroke(210);
    rect(30, iy, containerWidth - 60, 60, 4);
    noStroke();
    fill(30);
    textAlign(LEFT, TOP);
    textSize(11);
    let msg;
    if (balance < starter) msg = 'First goal: a $1,000 buffer covers most small emergencies (car repair, urgent dental visit).';
    else if (balance < threeMo) msg = 'Good start! A 3-month fund covers most single-income disruptions.';
    else if (balance < sixMo) msg = 'You\'re protected against most job losses. Pushing to 6 months handles overlapping emergencies.';
    else msg = '🎉 Fully funded. You can now shift extra savings toward investing and long-term goals.';
    text(msg, 42, iy + 8, containerWidth - 80);
    fill(100);
    textSize(10);
    text('Reminder: emergency funds are for emergencies — not sales, vacations, or planned expenses.',
         42, iy + 36, containerWidth - 80);
}
