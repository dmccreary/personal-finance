// FDIC Insurance Coverage Scenarios
// CANVAS_HEIGHT: 720
// Bloom: Apply — students add accounts and see which dollars are FDIC-insured and which aren't.

let canvasWidth = 900;
let canvasHeight = 720;
let containerWidth;
let containerHeight = canvasHeight;

let accounts = [];
let nextId = 1;

const COVERAGE_INDIVIDUAL = 250000;
const COVERAGE_JOINT = 500000;
const COVERAGE_RETIREMENT = 250000;

function setup() {
    updateCanvasSize();
    const canvas = createCanvas(containerWidth, containerHeight);
    canvas.parent(document.querySelector('main'));
    textFont('Arial');

    buildControls();
    loadScenario('default');
    describe('Interactive FDIC coverage calculator with add-account controls and pie chart.');
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

let btnIndividual, btnJoint, btnIRA, btnTrust, btnReset;
let scenarioSelect;
let accountsDiv;

function buildControls() {
    const main = document.querySelector('main');

    scenarioSelect = createSelect();
    scenarioSelect.parent(main);
    scenarioSelect.option('— Preset scenarios —', '');
    scenarioSelect.option('Recent college grad', 'grad');
    scenarioSelect.option('Young professional', 'young');
    scenarioSelect.option('Higher earner', 'higher');
    scenarioSelect.option('Married couple', 'couple');
    scenarioSelect.changed(() => {
        const v = scenarioSelect.value();
        if (v) loadScenario(v);
    });

    btnIndividual = createButton('+ Individual');
    btnIndividual.parent(main);
    btnIndividual.mousePressed(() => addAccount('individual', 25000));

    btnJoint = createButton('+ Joint');
    btnJoint.parent(main);
    btnJoint.mousePressed(() => addAccount('joint', 100000));

    btnIRA = createButton('+ IRA');
    btnIRA.parent(main);
    btnIRA.mousePressed(() => addAccount('retirement', 50000));

    btnTrust = createButton('+ Trust');
    btnTrust.parent(main);
    btnTrust.mousePressed(() => addAccount('trust', 100000));

    btnReset = createButton('Reset');
    btnReset.parent(main);
    btnReset.mousePressed(() => { accounts = []; rebuildAccountsUI(); });

    accountsDiv = createDiv('');
    accountsDiv.parent(main);
    accountsDiv.style('font-size', '12px');
    accountsDiv.style('font-family', 'Arial');

    layoutControls();
}

function layoutControls() {
    const leftX = 20;
    const topY = canvasHeight - 60;
    scenarioSelect.position(leftX, topY);
    btnIndividual.position(leftX + 200, topY);
    btnJoint.position(leftX + 295, topY);
    btnIRA.position(leftX + 360, topY);
    btnTrust.position(leftX + 410, topY);
    btnReset.position(leftX + 475, topY);
    accountsDiv.position(leftX, 70);
    accountsDiv.size(460, canvasHeight - 140);
    accountsDiv.style('overflow-y', 'auto');
}

function addAccount(type, balance) {
    accounts.push({ id: nextId++, type, balance, beneficiaries: 2 });
    rebuildAccountsUI();
}

function rebuildAccountsUI() {
    accountsDiv.html('');
    if (accounts.length === 0) {
        accountsDiv.html('<div style="color:#888;padding:8px;">Click a preset above or add accounts using the buttons below.</div>');
        return;
    }
    accounts.forEach((a) => {
        const typeLabel = labelFor(a.type);
        const color = colorFor(a.type);
        const row = createDiv('');
        row.parent(accountsDiv);
        row.style('border', '1px solid #ddd');
        row.style('border-left', `5px solid ${color}`);
        row.style('background', '#fff');
        row.style('padding', '6px 8px');
        row.style('margin-bottom', '6px');
        row.style('border-radius', '4px');

        const head = createDiv(`<strong>${typeLabel}</strong> <span id="bal${a.id}">$${a.balance.toLocaleString()}</span>`);
        head.parent(row);
        head.style('font-size', '12px');
        head.style('margin-bottom', '4px');

        const slider = createSlider(0, 500000, a.balance, 1000);
        slider.parent(row);
        slider.size(300);
        slider.input(() => {
            a.balance = slider.value();
            document.getElementById('bal' + a.id).textContent = '$' + a.balance.toLocaleString();
        });

        if (a.type === 'trust') {
            const benDiv = createDiv('Beneficiaries: ');
            benDiv.parent(row);
            benDiv.style('font-size', '11px');
            benDiv.style('display', 'inline-block');
            benDiv.style('margin-left', '8px');
            const benSel = createSelect();
            benSel.parent(benDiv);
            for (let i = 1; i <= 5; i++) benSel.option(i);
            benSel.selected(a.beneficiaries);
            benSel.changed(() => { a.beneficiaries = parseInt(benSel.value()); });
        }

        const del = createButton('✕');
        del.parent(row);
        del.style('margin-left', '6px');
        del.style('font-size', '11px');
        del.mousePressed(() => {
            accounts = accounts.filter(x => x.id !== a.id);
            rebuildAccountsUI();
        });
    });
}

function labelFor(type) {
    return { individual: 'Individual account', joint: 'Joint account',
             retirement: 'Retirement (IRA)', trust: 'Trust account' }[type];
}
function colorFor(type) {
    return { individual: '#1976d2', joint: '#388e3c',
             retirement: '#7b1fa2', trust: '#f57c00' }[type];
}

function loadScenario(name) {
    accounts = [];
    if (name === 'grad') {
        addAccount('individual', 15000);
        addAccount('individual', 10000);
    } else if (name === 'young') {
        addAccount('individual', 30000);
        addAccount('individual', 100000);
        addAccount('retirement', 50000);
    } else if (name === 'higher') {
        addAccount('individual', 50000);
        addAccount('individual', 300000);
    } else if (name === 'couple') {
        addAccount('joint', 400000);
        addAccount('individual', 150000);
    } else {
        addAccount('individual', 50000);
        addAccount('individual', 225000);
    }
}

function computeCoverage() {
    let indivTotal = 0, jointTotal = 0, retireTotal = 0, trustTotal = 0;
    let trustCoverage = 0;
    for (const a of accounts) {
        if (a.type === 'individual') indivTotal += a.balance;
        else if (a.type === 'joint') jointTotal += a.balance;
        else if (a.type === 'retirement') retireTotal += a.balance;
        else if (a.type === 'trust') {
            trustTotal += a.balance;
            trustCoverage += 250000 * (a.beneficiaries || 1);
        }
    }
    const indivInsured = Math.min(indivTotal, COVERAGE_INDIVIDUAL);
    const jointInsured = Math.min(jointTotal, COVERAGE_JOINT);
    const retireInsured = Math.min(retireTotal, COVERAGE_RETIREMENT);
    const trustInsured = Math.min(trustTotal, trustCoverage);
    const total = indivTotal + jointTotal + retireTotal + trustTotal;
    const insured = indivInsured + jointInsured + retireInsured + trustInsured;
    return {
        total, insured, uninsured: total - insured,
        categories: [
            { name: 'Individual', total: indivTotal, insured: indivInsured, cap: COVERAGE_INDIVIDUAL, color: '#1976d2' },
            { name: 'Joint', total: jointTotal, insured: jointInsured, cap: COVERAGE_JOINT, color: '#388e3c' },
            { name: 'Retirement', total: retireTotal, insured: retireInsured, cap: COVERAGE_RETIREMENT, color: '#7b1fa2' },
            { name: 'Trust', total: trustTotal, insured: trustInsured, cap: trustCoverage, color: '#f57c00' }
        ].filter(c => c.total > 0)
    };
}

function draw() {
    background(250);
    // Title
    noStroke();
    fill(30);
    textAlign(CENTER, TOP);
    textStyle(BOLD);
    textSize(17);
    text('FDIC Insurance Coverage Scenarios', containerWidth / 2, 12);
    textStyle(NORMAL);
    textSize(11);
    fill(100);
    text('Add accounts on the left. See which dollars are insured on the right.', containerWidth / 2, 34);

    // Right panel
    const rightX = 500;
    const rightW = containerWidth - rightX - 20;
    drawCoveragePanel(rightX, 70, rightW);
}

function drawCoveragePanel(x, y, w) {
    const r = computeCoverage();

    // Pie chart
    const cx = x + w / 2;
    const cy = y + 120;
    const rad = 90;
    noStroke();
    if (r.total === 0) {
        fill(230);
        circle(cx, cy, rad * 2);
        fill(120);
        textAlign(CENTER, CENTER);
        textSize(11);
        text('No accounts', cx, cy);
    } else {
        const insuredFrac = r.insured / r.total;
        fill(46, 125, 50);
        arc(cx, cy, rad * 2, rad * 2, -HALF_PI, -HALF_PI + insuredFrac * TWO_PI, PIE);
        if (r.uninsured > 0) {
            fill(198, 40, 40);
            arc(cx, cy, rad * 2, rad * 2, -HALF_PI + insuredFrac * TWO_PI, -HALF_PI + TWO_PI, PIE);
        }
        fill(30);
        textAlign(CENTER, CENTER);
        textSize(11);
        text((insuredFrac * 100).toFixed(0) + '% insured', cx, cy);
    }

    // Summary
    const sumY = y + 230;
    fill(30);
    textAlign(LEFT, TOP);
    textSize(12);
    textStyle(BOLD);
    text('Summary', x, sumY);
    textStyle(NORMAL);
    textSize(11);
    text('Total deposited:  $' + r.total.toLocaleString(), x, sumY + 20);
    fill(46, 125, 50);
    text('Total insured:    $' + r.insured.toLocaleString(), x, sumY + 36);
    fill(r.uninsured > 0 ? color(198, 40, 40) : color(100));
    textStyle(r.uninsured > 0 ? BOLD : NORMAL);
    text('Uninsured:        $' + r.uninsured.toLocaleString(), x, sumY + 52);
    textStyle(NORMAL);

    // Risk meter
    const mY = sumY + 80;
    stroke(200); noFill();
    rect(x, mY, w, 12, 4);
    noStroke();
    const riskFrac = r.total === 0 ? 0 : r.uninsured / r.total;
    const meterColor = riskFrac === 0 ? color(46, 125, 50) :
                       riskFrac < 0.25 ? color(251, 192, 45) : color(198, 40, 40);
    fill(meterColor);
    rect(x, mY, w * Math.max(0.04, riskFrac || 0.04), 12, 4);
    fill(100);
    textSize(10);
    text(r.uninsured === 0 ? 'Fully insured ✓' :
         riskFrac < 0.25 ? 'Some uninsured — review' : 'Significant uninsured amount', x, mY + 16);

    // Recommendations
    const rY = mY + 40;
    textSize(11);
    fill(30);
    textStyle(BOLD);
    text('Recommendations', x, rY);
    textStyle(NORMAL);
    fill(80);
    let lines;
    if (r.uninsured === 0) {
        lines = ['✓ All your deposits are protected.',
                 '✓ No action needed at current balances.'];
    } else {
        lines = ['• Open accounts at a second bank (adds $250k coverage per category).',
                 '• Consider joint accounts — they insure up to $500k.',
                 '• Move excess into investments (not FDIC, but potential growth).',
                 '• Trust accounts add $250k per named beneficiary.'];
    }
    let ly = rY + 18;
    textSize(10);
    for (const l of lines) {
        text(l, x, ly, w);
        ly += 16;
    }

    // Category breakdown
    const bY = ly + 10;
    fill(30);
    textStyle(BOLD);
    textSize(11);
    text('By category', x, bY);
    textStyle(NORMAL);
    textSize(10);
    let by = bY + 16;
    for (const c of r.categories) {
        fill(c.color);
        rect(x, by, 10, 10);
        fill(30);
        text(c.name + ': $' + c.total.toLocaleString() +
             ' (insured $' + c.insured.toLocaleString() + ' / cap $' + c.cap.toLocaleString() + ')',
             x + 16, by);
        by += 14;
    }
}
