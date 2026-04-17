// Property Insurance Value Comparison — Chart.js stacked bar
// CANVAS_HEIGHT: 700
// Bloom: Apply — students estimate the replacement value of their belongings.

document.addEventListener('DOMContentLoaded', function () {
    const main = document.querySelector('main');
    main.style.cssText = 'padding:14px;max-width:960px;margin:0 auto;font-family:Arial,sans-serif;';

    const title = document.createElement('h2');
    title.textContent = 'How Much Is Your Stuff Worth?';
    title.style.cssText = 'text-align:center;font-size:18px;margin:0 0 4px 0;color:#222;';
    main.appendChild(title);
    const sub = document.createElement('div');
    sub.textContent = 'Most people underestimate by half. Adjust the sliders to match what you own.';
    sub.style.cssText = 'text-align:center;font-size:12px;color:#666;margin-bottom:14px;';
    main.appendChild(sub);

    const scenarios = {
        minimal:   { electronics: 1800, furniture: 1500, clothing: 1500, kitchen: 500,  other: 1200 },
        moderate:  { electronics: 4500, furniture: 5000, clothing: 3500, kitchen: 1500, other: 3500 },
        extensive: { electronics: 9000, furniture: 12000, clothing: 7500, kitchen: 4000, other: 12500 }
    };

    const catColors = {
        electronics: '#1565c0',
        furniture:   '#e65100',
        clothing:    '#6a1b9a',
        kitchen:     '#2e7d32',
        other:       '#c2185b'
    };
    const catLabels = {
        electronics: 'Electronics',
        furniture:   'Furniture',
        clothing:    'Clothing & Accessories',
        kitchen:     'Kitchen & Household',
        other:       'Other (bike, books, décor)'
    };

    // Chart canvas
    const chartWrap = document.createElement('div');
    chartWrap.style.cssText = 'height:340px;position:relative;';
    main.appendChild(chartWrap);
    const canvas = document.createElement('canvas');
    chartWrap.appendChild(canvas);

    // Sliders for user scenario
    const slidersBox = document.createElement('div');
    slidersBox.style.cssText = 'margin-top:14px;padding:12px;background:#fafafa;border:1px solid #ddd;border-radius:6px;';
    main.appendChild(slidersBox);
    slidersBox.innerHTML = '<div style="font-weight:bold;font-size:13px;margin-bottom:6px;">Your belongings</div>';

    const userValues = { ...scenarios.moderate };
    const sliderRefs = {};
    for (const key of Object.keys(catLabels)) {
        const row = document.createElement('div');
        row.style.cssText = 'display:grid;grid-template-columns:180px 1fr 80px;align-items:center;gap:10px;margin:4px 0;';
        const lbl = document.createElement('span');
        lbl.textContent = catLabels[key];
        lbl.style.cssText = `color:${catColors[key]};font-weight:bold;font-size:12px;`;
        row.appendChild(lbl);
        const s = document.createElement('input');
        s.type = 'range';
        s.min = 0; s.max = 20000; s.step = 100; s.value = userValues[key];
        row.appendChild(s);
        const v = document.createElement('span');
        v.style.cssText = 'font-size:12px;text-align:right;';
        v.textContent = '$' + userValues[key].toLocaleString();
        row.appendChild(v);
        s.addEventListener('input', () => {
            userValues[key] = parseInt(s.value);
            v.textContent = '$' + userValues[key].toLocaleString();
            updateChart();
        });
        sliderRefs[key] = s;
        slidersBox.appendChild(row);
    }

    const presetRow = document.createElement('div');
    presetRow.style.cssText = 'margin-top:8px;text-align:center;';
    presetRow.innerHTML = '<span style="font-size:11px;color:#666;margin-right:6px;">Load preset:</span>';
    for (const [key, label] of [['minimal', 'College student'], ['moderate', 'Young professional'], ['extensive', 'Homeowner']]) {
        const btn = document.createElement('button');
        btn.textContent = label;
        btn.style.cssText = 'margin:0 4px;padding:4px 10px;border:1px solid #999;background:#fff;border-radius:3px;cursor:pointer;font-size:11px;';
        btn.addEventListener('click', () => {
            Object.assign(userValues, scenarios[key]);
            for (const k of Object.keys(sliderRefs)) {
                sliderRefs[k].value = userValues[k];
                sliderRefs[k].parentNode.querySelector('span:last-child').textContent = '$' + userValues[k].toLocaleString();
            }
            updateChart();
        });
        presetRow.appendChild(btn);
    }
    slidersBox.appendChild(presetRow);

    // Summary
    const summary = document.createElement('div');
    summary.style.cssText = 'margin-top:12px;padding:12px;background:#eef5fb;border-left:4px solid #1565c0;border-radius:4px;font-size:13px;';
    main.appendChild(summary);

    // Tips
    const tips = document.createElement('div');
    tips.style.cssText = 'margin-top:10px;padding:10px 14px;background:#fff8e1;border-left:4px solid #f9a825;border-radius:4px;font-size:12px;';
    tips.innerHTML = `
        <strong>Three things to do this month:</strong>
        <ul style="margin:6px 0 0 18px;padding:0;">
            <li>Walk through each room and take a video on your phone — that's your inventory.</li>
            <li>Keep receipts for items over $500 in a cloud folder.</li>
            <li>For jewelry, instruments, or art over $1,500, ask for a "scheduled item" rider.</li>
        </ul>`;
    main.appendChild(tips);

    function sumCat(obj, key) {
        return [scenarios.minimal[key], scenarios.moderate[key], scenarios.extensive[key], obj[key]];
    }

    const datasets = Object.keys(catLabels).map(key => ({
        label: catLabels[key],
        data: [scenarios.minimal[key], scenarios.moderate[key], scenarios.extensive[key], userValues[key]],
        backgroundColor: catColors[key],
        borderWidth: 1,
        borderColor: '#fff'
    }));

    const chart = new Chart(canvas, {
        type: 'bar',
        data: {
            labels: ['Minimal (student)', 'Moderate (professional)', 'Extensive (homeowner)', 'Your estimate'],
            datasets
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                title: { display: true, text: 'Replacement value by category', font: { size: 14 } },
                legend: { position: 'bottom', labels: { font: { size: 11 } } },
                tooltip: {
                    callbacks: {
                        label: (ctx) => ctx.dataset.label + ': $' + ctx.parsed.y.toLocaleString()
                    }
                }
            },
            scales: {
                x: { stacked: true },
                y: { stacked: true, ticks: { callback: v => '$' + v.toLocaleString() } }
            }
        }
    });

    function updateChart() {
        Object.keys(catLabels).forEach((key, i) => {
            chart.data.datasets[i].data[3] = userValues[key];
        });
        chart.update();
        const total = Object.values(userValues).reduce((a, b) => a + b, 0);
        const recommended = Math.round(total * 1.5 / 5000) * 5000;
        const low = Math.round(total / 1500);
        const high = Math.round(total / 1000);
        summary.innerHTML = `
            <div style="font-weight:bold;font-size:14px;">Your total: $${total.toLocaleString()}</div>
            <div>Recommended coverage: about <strong>$${recommended.toLocaleString()}</strong> (1.5× your total, to account for replacement inflation).</div>
            <div style="margin-top:4px;">Typical renters or homeowners policy for this level: <strong>$${low}–$${high}/month</strong> depending on location and deductible.</div>`;
    }
    updateChart();
});
