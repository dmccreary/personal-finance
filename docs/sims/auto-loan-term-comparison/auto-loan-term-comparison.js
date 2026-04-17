// Auto Loan Term Comparison — Chart.js line chart with underwater fill
// CANVAS_HEIGHT: 780
// Bloom: Analyze — students see how loan term length affects interest and underwater months.

document.addEventListener('DOMContentLoaded', function () {
    const main = document.querySelector('main');
    main.style.cssText = 'padding:14px;max-width:960px;margin:0 auto;font-family:Arial,sans-serif;';

    const title = document.createElement('h2');
    title.textContent = 'Auto Loan Term Comparison';
    title.style.cssText = 'text-align:center;font-size:18px;margin:0 0 4px 0;color:#222;';
    main.appendChild(title);
    const sub = document.createElement('div');
    sub.textContent = 'Watch what happens to your loan balance vs. the car\'s value as you stretch out the term.';
    sub.style.cssText = 'text-align:center;font-size:12px;color:#666;margin-bottom:12px;';
    main.appendChild(sub);

    const state = { price: 25000, down: 2500, rate: 7, term: 60 };

    const ctrls = document.createElement('div');
    ctrls.style.cssText = 'display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:10px;margin-bottom:10px;padding:10px;background:#fafafa;border:1px solid #ddd;border-radius:4px;';
    main.appendChild(ctrls);
    const inputs = [
        { key: 'price', label: 'Purchase price', min: 10000, max: 60000, step: 500, fmt: v => '$' + v.toLocaleString() },
        { key: 'down',  label: 'Down payment',   min: 0,     max: 15000, step: 250, fmt: v => '$' + v.toLocaleString() },
        { key: 'rate',  label: 'Interest rate',  min: 2,     max: 18,    step: 0.25, fmt: v => v + '%' }
    ];
    for (const c of inputs) {
        const box = document.createElement('div');
        const lbl = document.createElement('div');
        lbl.style.cssText = 'font-size:11px;font-weight:bold;';
        lbl.textContent = c.label + ': ' + c.fmt(state[c.key]);
        box.appendChild(lbl);
        const s = document.createElement('input');
        s.type = 'range';
        s.min = c.min; s.max = c.max; s.step = c.step; s.value = state[c.key];
        s.style.width = '100%';
        s.addEventListener('input', () => {
            state[c.key] = parseFloat(s.value);
            lbl.textContent = c.label + ': ' + c.fmt(state[c.key]);
            update();
        });
        box.appendChild(s);
        ctrls.appendChild(box);
    }

    // Term buttons
    const termBox = document.createElement('div');
    termBox.innerHTML = '<div style="font-size:11px;font-weight:bold;">Term length</div>';
    const termRow = document.createElement('div');
    for (const t of [36, 48, 60, 72, 84]) {
        const b = document.createElement('button');
        b.textContent = t + ' mo';
        b.dataset.term = t;
        b.style.cssText = `margin-right:4px;margin-top:4px;padding:4px 10px;border:1px solid #999;background:${t === state.term ? '#1565c0' : '#fff'};color:${t === state.term ? '#fff' : '#333'};border-radius:3px;cursor:pointer;font-size:11px;`;
        b.addEventListener('click', () => {
            state.term = t;
            termRow.querySelectorAll('button').forEach(x => {
                const on = parseInt(x.dataset.term) === t;
                x.style.background = on ? '#1565c0' : '#fff';
                x.style.color = on ? '#fff' : '#333';
            });
            update();
        });
        termRow.appendChild(b);
    }
    termBox.appendChild(termRow);
    ctrls.appendChild(termBox);

    // Chart
    const chartWrap = document.createElement('div');
    chartWrap.style.cssText = 'height:340px;position:relative;';
    main.appendChild(chartWrap);
    const canvas = document.createElement('canvas');
    chartWrap.appendChild(canvas);

    // Summary + comparison table
    const summary = document.createElement('div');
    summary.style.cssText = 'margin-top:12px;font-size:12px;';
    main.appendChild(summary);

    function amortization(price, down, rateAnnual, term) {
        const principal = price - down;
        const r = rateAnnual / 100 / 12;
        const payment = r === 0 ? principal / term : principal * r * Math.pow(1 + r, term) / (Math.pow(1 + r, term) - 1);
        const balances = [principal];
        let bal = principal;
        let totalInterest = 0;
        for (let m = 1; m <= term; m++) {
            const interest = bal * r;
            const principalPaid = payment - interest;
            bal = Math.max(0, bal - principalPaid);
            totalInterest += interest;
            balances.push(bal);
        }
        return { payment, balances, totalInterest };
    }

    function carValue(price, month) {
        // 20% first-year depreciation, then 15% per year, interpolated monthly
        const y = month / 12;
        if (y <= 1) return price * (1 - 0.20 * y);
        return price * 0.80 * Math.pow(0.85, y - 1);
    }

    let chart = null;
    function update() {
        const months = Math.max(state.term, 84);
        const { payment, balances, totalInterest } = amortization(state.price, state.down, state.rate, state.term);
        const values = [];
        for (let m = 0; m <= months; m++) values.push(Math.round(carValue(state.price, m)));
        const balsExtended = [...balances];
        while (balsExtended.length < months + 1) balsExtended.push(0);

        const labels = [];
        for (let m = 0; m <= months; m++) labels.push(m);

        let underwaterMonths = 0;
        for (let m = 0; m <= state.term; m++) {
            if (balsExtended[m] > values[m]) underwaterMonths++;
        }

        const datasets = [
            { label: 'Loan balance', data: balsExtended.map(v => Math.round(v)), borderColor: '#c62828', backgroundColor: 'rgba(198,40,40,0.15)', tension: 0.1, borderWidth: 3, fill: false },
            { label: 'Car value', data: values, borderColor: '#1565c0', backgroundColor: '#1565c0', tension: 0.1, borderWidth: 3, fill: false }
        ];

        if (chart) {
            chart.data.labels = labels;
            chart.data.datasets = datasets;
            chart.update();
        } else {
            chart = new Chart(canvas, {
                type: 'line',
                data: { labels, datasets },
                options: {
                    responsive: true, maintainAspectRatio: false,
                    plugins: {
                        title: { display: true, text: 'Loan balance vs. car value (by month)', font: { size: 13 } },
                        legend: { position: 'bottom' },
                        tooltip: { callbacks: { label: (c) => c.dataset.label + ': $' + c.parsed.y.toLocaleString() } }
                    },
                    elements: { point: { radius: 0 } },
                    scales: {
                        x: { title: { display: true, text: 'Months since purchase' }, ticks: { maxTicksLimit: 10 } },
                        y: { ticks: { callback: v => '$' + (v / 1000).toFixed(0) + 'k' } }
                    }
                }
            });
        }

        // Compare table across terms
        const termRows = [36, 48, 60, 72, 84].map(t => {
            const a = amortization(state.price, state.down, state.rate, t);
            let uw = 0;
            for (let m = 0; m <= t; m++) if (a.balances[m] > carValue(state.price, m)) uw++;
            return { term: t, payment: a.payment, totalInt: a.totalInterest, underwater: uw };
        });

        let rec = 'Best if affordable';
        if (state.term === 48) rec = 'Good balance';
        else if (state.term === 60) rec = 'Maximum recommended';
        else if (state.term === 72) rec = '⚠️ Long underwater period';
        else if (state.term === 84) rec = '⚠️ AVOID — car outlives loan';

        summary.innerHTML = `
            <div style="padding:12px;background:#eef5fb;border-left:4px solid #1565c0;border-radius:4px;margin-bottom:8px;">
                <strong>Monthly payment: $${Math.round(payment).toLocaleString()}</strong>  ·
                Total interest: <strong>$${Math.round(totalInterest).toLocaleString()}</strong>  ·
                Total paid: $${Math.round(payment * state.term).toLocaleString()}  ·
                Underwater: <strong>${underwaterMonths} months</strong>  ·
                <span style="color:${state.term >= 72 ? '#c62828' : '#2e7d32'};">${rec}</span>
            </div>
            <table style="width:100%;border-collapse:collapse;">
                <tr style="background:#f0f0f0;">
                    <th style="padding:6px;text-align:left;">Term</th>
                    <th style="padding:6px;text-align:right;">Monthly</th>
                    <th style="padding:6px;text-align:right;">Total interest</th>
                    <th style="padding:6px;text-align:right;">Months underwater</th>
                    <th style="padding:6px;text-align:left;">Verdict</th>
                </tr>
                ${termRows.map(r => {
                    const verdict = r.term <= 36 ? 'Best' : r.term === 48 ? 'Balanced' :
                                    r.term === 60 ? 'Max recommended' :
                                    r.term === 72 ? 'Risky' : 'Avoid';
                    const color = r.term <= 48 ? '#2e7d32' : r.term === 60 ? '#f57c00' : '#c62828';
                    const active = r.term === state.term ? 'background:#fff9c4;font-weight:bold;' : '';
                    return `<tr style="${active}">
                        <td style="padding:6px;border-bottom:1px solid #eee;">${r.term} mo</td>
                        <td style="padding:6px;border-bottom:1px solid #eee;text-align:right;">$${Math.round(r.payment).toLocaleString()}</td>
                        <td style="padding:6px;border-bottom:1px solid #eee;text-align:right;">$${Math.round(r.totalInt).toLocaleString()}</td>
                        <td style="padding:6px;border-bottom:1px solid #eee;text-align:right;">${r.underwater}</td>
                        <td style="padding:6px;border-bottom:1px solid #eee;color:${color};">${verdict}</td>
                    </tr>`;
                }).join('')}
            </table>
            <div style="margin-top:10px;padding:10px 14px;background:#fff8e1;border-left:4px solid #f9a825;border-radius:4px;">
                <strong>Key insight:</strong> if you can't afford a 48-month loan, you probably can't afford that car.
                Longer terms keep you in debt while the car loses value — a recipe for being underwater.
            </div>`;
    }
    update();
});
