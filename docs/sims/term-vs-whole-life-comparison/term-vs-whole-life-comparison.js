// Term vs. Whole Life Comparison — Chart.js line graph
// CANVAS_HEIGHT: 720
// Bloom: Evaluate — students compare "buy term and invest the difference" vs. whole life.

document.addEventListener('DOMContentLoaded', function () {
    const main = document.querySelector('main');
    main.style.cssText = 'padding:14px;max-width:960px;margin:0 auto;font-family:Arial,sans-serif;';

    const title = document.createElement('h2');
    title.textContent = 'Term Life + Invest  vs.  Whole Life';
    title.style.cssText = 'text-align:center;font-size:18px;margin:0 0 4px 0;color:#222;';
    main.appendChild(title);
    const sub = document.createElement('div');
    sub.textContent = 'Over 20–30 years, which strategy leaves you richer?';
    sub.style.cssText = 'text-align:center;font-size:12px;color:#666;margin-bottom:12px;';
    main.appendChild(sub);

    // Controls
    const ctrls = document.createElement('div');
    ctrls.style.cssText = 'display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:10px;margin-bottom:12px;padding:10px;background:#fafafa;border:1px solid #ddd;border-radius:4px;';
    main.appendChild(ctrls);

    const state = { age: 25, coverage: 500000, term: 20, invRate: 7, wlRate: 3, showAfter: true };
    const controls = [
        { key: 'age', label: 'Your age', min: 20, max: 40, step: 1 },
        { key: 'coverage', label: 'Coverage', min: 100000, max: 2000000, step: 50000, fmt: v => '$' + v.toLocaleString() },
        { key: 'invRate', label: 'Invest return %', min: 4, max: 12, step: 0.5, fmt: v => v + '%' },
        { key: 'wlRate', label: 'Whole life cash value %', min: 2, max: 5, step: 0.1, fmt: v => v + '%' }
    ];
    for (const c of controls) {
        const box = document.createElement('div');
        const lbl = document.createElement('div');
        lbl.style.cssText = 'font-size:11px;font-weight:bold;';
        lbl.textContent = c.label + ': ' + (c.fmt ? c.fmt(state[c.key]) : state[c.key]);
        box.appendChild(lbl);
        const s = document.createElement('input');
        s.type = 'range';
        s.min = c.min; s.max = c.max; s.step = c.step; s.value = state[c.key];
        s.style.width = '100%';
        s.addEventListener('input', () => {
            state[c.key] = parseFloat(s.value);
            lbl.textContent = c.label + ': ' + (c.fmt ? c.fmt(state[c.key]) : state[c.key]);
            update();
        });
        box.appendChild(s);
        ctrls.appendChild(box);
    }
    const termBox = document.createElement('div');
    const termLbl = document.createElement('div');
    termLbl.style.cssText = 'font-size:11px;font-weight:bold;';
    termLbl.textContent = 'Term length';
    termBox.appendChild(termLbl);
    const termSel = document.createElement('select');
    for (const y of [10, 20, 30]) {
        const opt = document.createElement('option');
        opt.value = y; opt.textContent = y + ' years';
        if (y === state.term) opt.selected = true;
        termSel.appendChild(opt);
    }
    termSel.addEventListener('change', () => { state.term = parseInt(termSel.value); update(); });
    termBox.appendChild(termSel);
    ctrls.appendChild(termBox);

    // Chart
    const chartWrap = document.createElement('div');
    chartWrap.style.cssText = 'height:360px;position:relative;';
    main.appendChild(chartWrap);
    const canvas = document.createElement('canvas');
    chartWrap.appendChild(canvas);

    const summary = document.createElement('div');
    summary.style.cssText = 'margin-top:12px;padding:12px;background:#eef5fb;border-left:4px solid #1565c0;border-radius:4px;font-size:13px;';
    main.appendChild(summary);

    const tips = document.createElement('div');
    tips.style.cssText = 'margin-top:10px;padding:10px 14px;background:#fff8e1;border-left:4px solid #f9a825;border-radius:4px;font-size:12px;';
    tips.innerHTML = `
        <strong>Caveats:</strong> "buy term and invest the difference" only works if you <em>actually invest</em> the difference.
        Whole life can still make sense for lifetime coverage needs or estate planning — but for most people under 50, term wins.`;
    main.appendChild(tips);

    function termPremiumMonthly(age, coverage) {
        // Rough approximation: term cost scales ~linearly with age and coverage
        const base = 15 + (age - 25) * 1.5;
        return base * (coverage / 500000);
    }
    function wholeLifePremiumMonthly(age, coverage) {
        const base = 350 + (age - 25) * 8;
        return base * (coverage / 500000);
    }

    function simulate() {
        const years = 35;
        const labels = [];
        const termDB = [], termInv = [], termTotal = [];
        const wlDB = [], wlCash = [], wlTotal = [];

        const tPrem = termPremiumMonthly(state.age, state.coverage);
        const wlPrem = wholeLifePremiumMonthly(state.age, state.coverage);
        const diffMonthly = Math.max(0, wlPrem - tPrem);

        let invBal = 0;
        let cashBal = 0;
        const rm = state.invRate / 100 / 12;
        const wlm = state.wlRate / 100 / 12;
        for (let y = 0; y <= years; y++) {
            labels.push('Yr ' + y);
            // Term + invest
            for (let m = 0; m < 12 && y > 0; m++) {
                invBal = invBal * (1 + rm) + diffMonthly;
            }
            const inTerm = y <= state.term;
            termDB.push(inTerm ? state.coverage : 0);
            termInv.push(Math.round(invBal));
            termTotal.push((inTerm ? state.coverage : 0) + Math.round(invBal));

            // Whole life
            // Cash value share of premium: 20% yrs 1-5, 40% yrs 6-10, 60% yrs 11+
            for (let m = 0; m < 12 && y > 0; m++) {
                const share = y <= 5 ? 0.20 : y <= 10 ? 0.40 : 0.60;
                cashBal = cashBal * (1 + wlm) + wlPrem * share;
            }
            wlDB.push(state.coverage);
            wlCash.push(Math.round(cashBal));
            wlTotal.push(state.coverage + Math.round(cashBal));
        }

        return { labels, termDB, termInv, termTotal, wlDB, wlCash, wlTotal, tPrem, wlPrem, diffMonthly, years };
    }

    let chart = null;
    function update() {
        const r = simulate();
        const datasets = [
            { label: 'Term + Invest: total', data: r.termTotal, borderColor: '#1565c0', backgroundColor: '#1565c0', tension: 0.2, borderWidth: 3, fill: false },
            { label: 'Term + Invest: investments only', data: r.termInv, borderColor: '#1565c0', borderDash: [4, 4], backgroundColor: '#1565c0', tension: 0.2, borderWidth: 2, fill: false },
            { label: 'Whole Life: total', data: r.wlTotal, borderColor: '#e65100', backgroundColor: '#e65100', tension: 0.2, borderWidth: 3, fill: false },
            { label: 'Whole Life: cash value only', data: r.wlCash, borderColor: '#e65100', borderDash: [4, 4], backgroundColor: '#e65100', tension: 0.2, borderWidth: 2, fill: false }
        ];
        if (chart) {
            chart.data.labels = r.labels;
            chart.data.datasets = datasets;
            chart.update();
        } else {
            chart = new Chart(canvas, {
                type: 'line',
                data: { labels: r.labels, datasets },
                options: {
                    responsive: true, maintainAspectRatio: false,
                    plugins: {
                        title: { display: true, text: 'Total value over time (death benefit + cash/investments)', font: { size: 13 } },
                        legend: { position: 'bottom', labels: { font: { size: 11 } } },
                        tooltip: { callbacks: { label: (c) => c.dataset.label + ': $' + c.parsed.y.toLocaleString() } }
                    },
                    scales: {
                        y: { ticks: { callback: v => '$' + (v / 1000).toFixed(0) + 'k' } }
                    }
                }
            });
        }

        // Summary
        const at20 = 20;
        const at30 = Math.min(30, r.years);
        const t20 = r.termTotal[at20], w20 = r.wlTotal[at20];
        const t30 = r.termTotal[at30], w30 = r.wlTotal[at30];
        const invOnly30 = r.termInv[at30];

        summary.innerHTML = `
            <div><strong>Monthly premiums at age ${state.age}:</strong>
                Term $${Math.round(r.tPrem)}  ·  Whole Life $${Math.round(r.wlPrem)}  ·
                Difference available to invest: <strong>$${Math.round(r.diffMonthly)}/month</strong>
            </div>
            <table style="width:100%;margin-top:6px;border-collapse:collapse;font-size:12px;">
                <tr style="background:#f0f0f0;"><th style="padding:6px;text-align:left;"></th>
                    <th style="padding:6px;text-align:right;">After 20 yrs</th>
                    <th style="padding:6px;text-align:right;">After 30 yrs (term expired)</th></tr>
                <tr><td style="padding:6px;color:#1565c0;font-weight:bold;">Term + Invest total</td>
                    <td style="padding:6px;text-align:right;">$${t20.toLocaleString()}</td>
                    <td style="padding:6px;text-align:right;">$${invOnly30.toLocaleString()} <span style="color:#888;font-size:11px;">(no DB)</span></td></tr>
                <tr><td style="padding:6px;color:#e65100;font-weight:bold;">Whole Life total</td>
                    <td style="padding:6px;text-align:right;">$${w20.toLocaleString()}</td>
                    <td style="padding:6px;text-align:right;">$${w30.toLocaleString()}</td></tr>
                <tr><td style="padding:6px;font-weight:bold;">Difference</td>
                    <td style="padding:6px;text-align:right;color:${t20 > w20 ? '#2e7d32' : '#c62828'};font-weight:bold;">
                        ${t20 > w20 ? '+' : ''}$${(t20 - w20).toLocaleString()}</td>
                    <td style="padding:6px;text-align:right;color:${invOnly30 > w30 ? '#2e7d32' : '#c62828'};font-weight:bold;">
                        ${invOnly30 > w30 ? '+' : ''}$${(invOnly30 - w30).toLocaleString()}</td></tr>
            </table>`;
    }
    update();
});
