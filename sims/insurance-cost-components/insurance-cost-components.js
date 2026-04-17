// Insurance Cost Components — premium, deductible, copay, OOP max
// CANVAS_HEIGHT: 560
// Bloom: Understand — students see how insurance cost components fit together across a year.

document.addEventListener('DOMContentLoaded', function () {
    const main = document.querySelector('main');
    main.style.cssText = 'padding:14px;max-width:900px;margin:0 auto;font-family:Arial,sans-serif;';

    const title = document.createElement('h2');
    title.textContent = 'Anatomy of Insurance Costs';
    title.style.cssText = 'text-align:center;font-size:18px;margin:0 0 4px 0;color:#222;';
    main.appendChild(title);
    const sub = document.createElement('div');
    sub.textContent = 'Four pieces work together: premium, deductible, coinsurance/copays, and out-of-pocket max.';
    sub.style.cssText = 'text-align:center;font-size:12px;color:#666;margin-bottom:14px;';
    main.appendChild(sub);

    const comp = [
        { key: 'premium',     color: '#1565c0', title: 'Premium',        value: '$200/month = $2,400/year',
          def: 'Regular payment you make whether or not you use insurance. Paid every month to keep coverage active.' },
        { key: 'deductible',  color: '#e65100', title: 'Deductible',     value: '$1,500',
          def: 'Amount you pay before insurance starts covering costs. Resets every calendar year.' },
        { key: 'copay',       color: '#f9a825', title: 'Copay / Coinsurance', value: '$30 per visit, 20% after deductible',
          def: 'Your share of each service after meeting the deductible. Copay = fixed dollar amount. Coinsurance = percentage.' },
        { key: 'oop',         color: '#2e7d32', title: 'Out-of-pocket max', value: '$6,000',
          def: 'Maximum YOU will pay in a year (not counting premium). After this, insurance covers 100%.' }
    ];

    const cardRow = document.createElement('div');
    cardRow.style.cssText = 'display:grid;grid-template-columns:repeat(auto-fit,minmax(180px,1fr));gap:8px;margin-bottom:14px;';
    main.appendChild(cardRow);

    comp.forEach(c => {
        const card = document.createElement('div');
        card.style.cssText = `border:1px solid ${c.color};border-top:5px solid ${c.color};background:#fff;padding:10px;border-radius:4px;cursor:help;`;
        card.title = c.def;
        card.innerHTML = `
            <div style="font-weight:bold;font-size:13px;color:${c.color};">${c.title}</div>
            <div style="font-size:12px;color:#333;margin:4px 0;">${c.value}</div>
            <div style="font-size:11px;color:#666;">${c.def}</div>`;
        cardRow.appendChild(card);
    });

    // Year timeline visualization
    const svgNS = 'http://www.w3.org/2000/svg';
    const svg = document.createElementNS(svgNS, 'svg');
    svg.setAttribute('viewBox', '0 0 820 220');
    svg.setAttribute('width', '100%');
    svg.style.cssText = 'background:#fafafa;border:1px solid #ddd;border-radius:4px;';
    main.appendChild(svg);

    function rect(x, y, w, h, fill, stroke) {
        const r = document.createElementNS(svgNS, 'rect');
        r.setAttribute('x', x); r.setAttribute('y', y);
        r.setAttribute('width', w); r.setAttribute('height', h);
        r.setAttribute('fill', fill);
        if (stroke) r.setAttribute('stroke', stroke);
        r.setAttribute('rx', 3);
        svg.appendChild(r);
        return r;
    }
    function svgText(x, y, str, opts = {}) {
        const t = document.createElementNS(svgNS, 'text');
        t.setAttribute('x', x); t.setAttribute('y', y);
        t.setAttribute('fill', opts.fill || '#222');
        t.setAttribute('font-size', opts.size || 11);
        t.setAttribute('font-family', 'Arial');
        if (opts.bold) t.setAttribute('font-weight', 'bold');
        if (opts.anchor) t.setAttribute('text-anchor', opts.anchor);
        t.textContent = str;
        svg.appendChild(t);
    }

    // Timeline axis
    const axisY = 170;
    svg.appendChild((() => { const l = document.createElementNS(svgNS, 'line'); l.setAttribute('x1', 40); l.setAttribute('x2', 780); l.setAttribute('y1', axisY); l.setAttribute('y2', axisY); l.setAttribute('stroke', '#555'); l.setAttribute('stroke-width', 1); return l; })());
    for (let m = 0; m <= 12; m++) {
        const x = 40 + (740 / 12) * m;
        const tick = document.createElementNS(svgNS, 'line');
        tick.setAttribute('x1', x); tick.setAttribute('x2', x);
        tick.setAttribute('y1', axisY); tick.setAttribute('y2', axisY + 4);
        tick.setAttribute('stroke', '#555');
        svg.appendChild(tick);
        if (m % 2 === 0) svgText(x, axisY + 16, (m === 0 ? 'Jan' : m === 12 ? 'Dec' : 'M' + m), { anchor: 'middle', fill: '#666' });
    }

    // Premium bar
    rect(40, 30, 740, 22, '#1565c0');
    svgText(50, 45, 'Premium: $200/month × 12 = $2,400', { fill: '#fff', bold: true });

    // Deductible
    rect(40, 65, 160, 30, '#e65100');
    svgText(120, 84, 'Deductible $1,500', { fill: '#fff', bold: true, anchor: 'middle', size: 11 });

    // Copays scattered
    const copayPositions = [220, 260, 330, 400, 470, 540, 600, 660];
    copayPositions.forEach((x, i) => {
        rect(x, 110, 20, 18, '#f9a825');
        svgText(x + 10, 123, '$30', { size: 9, anchor: 'middle' });
    });
    svgText(460, 103, 'Copays/coinsurance after deductible', { anchor: 'middle', size: 11, fill: '#555' });

    // OOP max line
    const oopX = 600;
    const oopLine = document.createElementNS(svgNS, 'line');
    oopLine.setAttribute('x1', oopX); oopLine.setAttribute('x2', oopX);
    oopLine.setAttribute('y1', 25); oopLine.setAttribute('y2', 160);
    oopLine.setAttribute('stroke', '#2e7d32');
    oopLine.setAttribute('stroke-width', 2);
    oopLine.setAttribute('stroke-dasharray', '4 3');
    svg.appendChild(oopLine);
    svgText(oopX + 6, 32, 'Out-of-pocket max $6,000', { fill: '#2e7d32', size: 10, bold: true });
    rect(oopX, 135, 180, 22, '#c8e6c9');
    svgText(oopX + 90, 150, 'Insurance covers 100%', { anchor: 'middle', size: 11, fill: '#1b5e20', bold: true });

    svgText(410, 16, 'Insurance cost timeline (one year)', { anchor: 'middle', bold: true, size: 13 });

    // Toggle: example scenario
    const toggle = document.createElement('button');
    toggle.textContent = 'Show example: $10,000 surgery →';
    toggle.style.cssText = 'margin-top:10px;padding:8px 12px;border:1px solid #1565c0;background:#fff;color:#1565c0;font-weight:bold;border-radius:4px;cursor:pointer;';
    main.appendChild(toggle);

    const example = document.createElement('div');
    example.style.cssText = 'display:none;margin-top:10px;padding:12px;border:1px solid #ddd;border-radius:6px;background:#fafafa;font-size:12px;';
    main.appendChild(example);

    toggle.addEventListener('click', () => {
        const visible = example.style.display === 'block';
        example.style.display = visible ? 'none' : 'block';
        toggle.textContent = visible ? 'Show example: $10,000 surgery →' : 'Hide example';
        if (!visible) renderExample();
    });

    function renderExample() {
        example.innerHTML = `
            <div style="font-weight:bold;font-size:13px;margin-bottom:8px;">You have surgery costing $10,000</div>
            <table style="width:100%;border-collapse:collapse;font-size:12px;">
                <tr style="background:#f0f0f0;">
                    <th style="padding:6px;text-align:left;">Piece</th>
                    <th style="padding:6px;text-align:right;">You pay</th>
                    <th style="padding:6px;text-align:right;">Insurance pays</th>
                </tr>
                <tr><td style="padding:6px;border-bottom:1px solid #eee;">Premium (always, all year)</td><td style="padding:6px;text-align:right;color:#1565c0;">$2,400</td><td style="padding:6px;text-align:right;">—</td></tr>
                <tr><td style="padding:6px;border-bottom:1px solid #eee;">First $1,500 of bill (deductible)</td><td style="padding:6px;text-align:right;color:#e65100;">$1,500</td><td style="padding:6px;text-align:right;">$0</td></tr>
                <tr><td style="padding:6px;border-bottom:1px solid #eee;">Next $4,500 (20% coinsurance)</td><td style="padding:6px;text-align:right;color:#f9a825;">$900</td><td style="padding:6px;text-align:right;">$3,600</td></tr>
                <tr><td style="padding:6px;border-bottom:1px solid #eee;">Remaining $4,000 (after OOP max reached)</td><td style="padding:6px;text-align:right;color:#2e7d32;">$0</td><td style="padding:6px;text-align:right;">$4,000</td></tr>
                <tr style="background:#fff9c4;font-weight:bold;">
                    <td style="padding:6px;">TOTAL</td>
                    <td style="padding:6px;text-align:right;">$4,800 (incl. premium)</td>
                    <td style="padding:6px;text-align:right;">$7,600</td>
                </tr>
            </table>
            <div style="margin-top:8px;color:#555;">Without insurance, the same surgery would cost you $10,000 out of pocket — plus any leverage the hospital loses from not having an insurer negotiate rates.</div>`;
    }
});
