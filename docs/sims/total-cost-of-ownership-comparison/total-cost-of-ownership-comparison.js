// Total Cost of Ownership Comparison — Chart.js stacked horizontal bars
// CANVAS_HEIGHT: 640
// Bloom: Evaluate — students see the full 5-year cost of owning four different vehicles.

document.addEventListener('DOMContentLoaded', function () {
    const main = document.querySelector('main');
    main.style.cssText = 'padding:14px;max-width:960px;margin:0 auto;font-family:Arial,sans-serif;';

    const title = document.createElement('h2');
    title.textContent = 'True 5-Year Cost of Owning a Car';
    title.style.cssText = 'text-align:center;font-size:18px;margin:0 0 4px 0;color:#222;';
    main.appendChild(title);
    const sub = document.createElement('div');
    sub.textContent = 'Purchase price is only one piece. Insurance, fuel, and maintenance often cost more.';
    sub.style.cssText = 'text-align:center;font-size:12px;color:#666;margin-bottom:12px;';
    main.appendChild(sub);

    const state = { miles: 12000, gas: 3.50 };

    const ctrls = document.createElement('div');
    ctrls.style.cssText = 'display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-bottom:10px;padding:10px;background:#fafafa;border:1px solid #ddd;border-radius:4px;font-size:12px;';
    main.appendChild(ctrls);
    const milesBox = document.createElement('div');
    milesBox.innerHTML = `<div style="font-weight:bold;">Miles per year: <span id="milesVal">${state.miles.toLocaleString()}</span></div>`;
    const milesSlider = document.createElement('input');
    milesSlider.type = 'range'; milesSlider.min = 5000; milesSlider.max = 25000; milesSlider.step = 1000; milesSlider.value = state.miles;
    milesSlider.style.width = '100%';
    milesSlider.addEventListener('input', () => {
        state.miles = parseInt(milesSlider.value);
        document.getElementById('milesVal').textContent = state.miles.toLocaleString();
        update();
    });
    milesBox.appendChild(milesSlider);
    ctrls.appendChild(milesBox);

    const gasBox = document.createElement('div');
    gasBox.innerHTML = `<div style="font-weight:bold;">Gas price: $<span id="gasVal">${state.gas.toFixed(2)}</span>/gal</div>`;
    const gasSlider = document.createElement('input');
    gasSlider.type = 'range'; gasSlider.min = 2.0; gasSlider.max = 6.0; gasSlider.step = 0.10; gasSlider.value = state.gas;
    gasSlider.style.width = '100%';
    gasSlider.addEventListener('input', () => {
        state.gas = parseFloat(gasSlider.value);
        document.getElementById('gasVal').textContent = state.gas.toFixed(2);
        update();
    });
    gasBox.appendChild(gasSlider);
    ctrls.appendChild(gasBox);

    const vehicles = [
        { name: 'New luxury sedan ($45k)',      price: 45000, rate: 7,  months: 60, mpg: 25, insAnnual: 2000, maint: 8000, reg: 2500, endValue: 18000 },
        { name: 'New economy car ($25k)',       price: 25000, rate: 6,  months: 60, mpg: 35, insAnnual: 1200, maint: 4000, reg: 1500, endValue: 10000 },
        { name: '3-yr-old mid-size ($18k)',     price: 18000, rate: 8,  months: 48, mpg: 30, insAnnual: 1000, maint: 5500, reg: 1200, endValue: 9000 },
        { name: '10-yr-old economy ($5k cash)', price: 5000,  rate: 0,  months: 0,  mpg: 32, insAnnual: 800,  maint: 7000, reg: 800,  endValue: 3000 }
    ];

    function compute(v) {
        const r = v.rate / 100 / 12;
        let interest = 0;
        if (v.months > 0 && r > 0) {
            const payment = v.price * r * Math.pow(1 + r, v.months) / (Math.pow(1 + r, v.months) - 1);
            interest = payment * v.months - v.price;
        }
        const fuel = Math.round((state.miles * 5 / v.mpg) * state.gas);
        const insurance = v.insAnnual * 5;
        const registration = v.reg;
        const purchase = v.price;
        const depreciation = -(v.endValue);
        const total = purchase + interest + fuel + insurance + v.maint + registration + depreciation;
        return { purchase, interest, fuel, insurance, maint: v.maint, registration, depreciation, total };
    }

    const chartWrap = document.createElement('div');
    chartWrap.style.cssText = 'height:380px;position:relative;';
    main.appendChild(chartWrap);
    const canvas = document.createElement('canvas');
    chartWrap.appendChild(canvas);

    const summary = document.createElement('div');
    summary.style.cssText = 'margin-top:12px;font-size:12px;';
    main.appendChild(summary);

    const insight = document.createElement('div');
    insight.style.cssText = 'margin-top:10px;padding:10px 14px;background:#fff8e1;border-left:4px solid #f9a825;border-radius:4px;font-size:12px;';
    insight.innerHTML = `
        <strong>Key insights:</strong>
        <ul style="margin:6px 0 0 18px;padding:0;">
            <li>Insurance, fuel, and maintenance usually cost more than depreciation.</li>
            <li>A 3-year-old car often costs about the same over 5 years as a new economy car — with less up-front risk.</li>
            <li>The "cheap" $5k car still costs ~$350/month once you add everything up.</li>
            <li>People compare monthly payments; they should compare total 5-year cost.</li>
        </ul>`;
    main.appendChild(insight);

    let chart = null;
    function update() {
        const computed = vehicles.map(v => compute(v));
        const labels = vehicles.map(v => v.name);

        const categories = [
            { key: 'purchase',     label: 'Purchase price', color: '#c62828' },
            { key: 'interest',     label: 'Interest',       color: '#e65100' },
            { key: 'insurance',    label: 'Insurance',      color: '#f9a825' },
            { key: 'fuel',         label: 'Fuel',           color: '#2e7d32' },
            { key: 'maint',        label: 'Maintenance',    color: '#1565c0' },
            { key: 'registration', label: 'Reg / taxes',    color: '#6a1b9a' },
            { key: 'depreciation', label: 'Resale credit',  color: '#757575' }
        ];

        const datasets = categories.map(c => ({
            label: c.label,
            data: computed.map(x => x[c.key]),
            backgroundColor: c.color,
            borderWidth: 1,
            borderColor: '#fff'
        }));

        if (chart) {
            chart.data.datasets = datasets;
            chart.update();
        } else {
            chart = new Chart(canvas, {
                type: 'bar',
                data: { labels, datasets },
                options: {
                    indexAxis: 'y',
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        title: { display: true, text: '5-year cost breakdown (resale credit shown as negative)', font: { size: 13 } },
                        legend: { position: 'bottom', labels: { font: { size: 11 } } },
                        tooltip: { callbacks: { label: (c) => c.dataset.label + ': $' + c.parsed.x.toLocaleString() } }
                    },
                    scales: {
                        x: { stacked: true, ticks: { callback: v => '$' + (v / 1000).toFixed(0) + 'k' } },
                        y: { stacked: true }
                    }
                }
            });
        }

        // Table
        summary.innerHTML = `
            <table style="width:100%;border-collapse:collapse;">
                <tr style="background:#f0f0f0;">
                    <th style="padding:6px;text-align:left;">Vehicle</th>
                    <th style="padding:6px;text-align:right;">5-year total</th>
                    <th style="padding:6px;text-align:right;">Per month</th>
                </tr>
                ${vehicles.map((v, i) => `
                    <tr>
                        <td style="padding:6px;border-bottom:1px solid #eee;">${v.name}</td>
                        <td style="padding:6px;border-bottom:1px solid #eee;text-align:right;font-weight:bold;">$${Math.round(computed[i].total).toLocaleString()}</td>
                        <td style="padding:6px;border-bottom:1px solid #eee;text-align:right;">$${Math.round(computed[i].total / 60).toLocaleString()}</td>
                    </tr>`).join('')}
            </table>`;
    }
    update();
});
