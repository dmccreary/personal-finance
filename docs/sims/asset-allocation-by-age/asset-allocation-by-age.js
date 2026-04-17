// Asset Allocation by Age - Chart.js stacked bar
// CANVAS_HEIGHT: 560
// Bloom: Apply — students identify a reasonable starting allocation for their age and risk tolerance.

document.addEventListener('DOMContentLoaded', function () {
    const main = document.querySelector('main');
    main.style.padding = '12px';
    main.style.maxWidth = '780px';
    main.style.margin = '0 auto';

    const title = document.createElement('h2');
    title.textContent = 'Asset Allocation by Age';
    title.style.cssText = 'text-align:center;font-size:18px;margin:0 0 8px 0;color:#222;';
    main.appendChild(title);

    const subtitle = document.createElement('div');
    subtitle.textContent = 'How a typical portfolio shifts from stocks toward bonds as retirement approaches.';
    subtitle.style.cssText = 'text-align:center;font-size:12px;color:#666;margin-bottom:10px;';
    main.appendChild(subtitle);

    // Controls
    const controls = document.createElement('div');
    controls.style.cssText = 'text-align:center;margin:10px 0 14px 0;font-size:13px;';
    controls.innerHTML = `
        <label style="margin-right:12px;"><strong>Risk profile:</strong></label>
        <label style="margin-right:10px;"><input type="radio" name="risk" value="conservative"> Conservative</label>
        <label style="margin-right:10px;"><input type="radio" name="risk" value="moderate" checked> Moderate</label>
        <label><input type="radio" name="risk" value="aggressive"> Aggressive</label>
    `;
    main.appendChild(controls);

    const chartWrap = document.createElement('div');
    chartWrap.style.cssText = 'position:relative;width:100%;height:380px;';
    const canvas = document.createElement('canvas');
    canvas.id = 'allocChart';
    chartWrap.appendChild(canvas);
    main.appendChild(chartWrap);

    const profiles = {
        conservative: {
            stocks: [70, 65, 55, 45, 30, 25],
            bonds:  [25, 30, 35, 40, 50, 50],
            cash:   [ 5,  5, 10, 15, 20, 25]
        },
        moderate: {
            stocks: [90, 85, 75, 65, 50, 40],
            bonds:  [10, 15, 20, 25, 35, 40],
            cash:   [ 0,  0,  5, 10, 15, 20]
        },
        aggressive: {
            stocks: [100, 95, 90, 80, 65, 55],
            bonds:  [ 0,  5, 10, 20, 30, 35],
            cash:   [ 0,  0,  0,  0,  5, 10]
        }
    };

    const ages = ['Age 20', 'Age 30', 'Age 40', 'Age 50', 'Age 60', 'Age 70'];

    const rationale = {
        stocks: 'Stocks provide long-term growth but carry short-term volatility.',
        bonds: 'Bonds add stability and produce income with less risk than stocks.',
        cash: 'Cash and CDs preserve principal for near-term needs.'
    };

    let current = 'moderate';

    function buildData(profile) {
        const p = profiles[profile];
        return {
            labels: ages,
            datasets: [
                {
                    label: 'Stocks',
                    backgroundColor: '#4caf50',
                    data: p.stocks,
                    stack: 's'
                },
                {
                    label: 'Bonds',
                    backgroundColor: '#1976d2',
                    data: p.bonds,
                    stack: 's'
                },
                {
                    label: 'Cash / CDs',
                    backgroundColor: '#fbc02d',
                    data: p.cash,
                    stack: 's'
                }
            ]
        };
    }

    const ctx = canvas.getContext('2d');
    const chart = new Chart(ctx, {
        type: 'bar',
        data: buildData(current),
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: { position: 'bottom' },
                tooltip: {
                    callbacks: {
                        label: function (ctx) {
                            const label = ctx.dataset.label;
                            const val = ctx.parsed.y;
                            const key = label.toLowerCase().split(' ')[0].replace('/', '');
                            const why = rationale[key === 'cash' ? 'cash' : key] || '';
                            return [`${label}: ${val}%`, why];
                        }
                    }
                },
                title: { display: false }
            },
            scales: {
                x: { stacked: true, title: { display: false } },
                y: {
                    stacked: true,
                    min: 0,
                    max: 100,
                    ticks: { callback: v => v + '%' },
                    title: { display: true, text: 'Percent of portfolio' }
                }
            }
        }
    });

    controls.querySelectorAll('input[name="risk"]').forEach(r => {
        r.addEventListener('change', e => {
            current = e.target.value;
            const d = buildData(current);
            chart.data.datasets.forEach((ds, i) => ds.data = d.datasets[i].data);
            chart.update();
        });
    });
});
