// Auto Insurance Coverage Scenarios — interactive decision tree
// CANVAS_HEIGHT: 720
// Bloom: Apply — students trace which auto insurance coverage pays in each scenario.

document.addEventListener('DOMContentLoaded', function () {
    const main = document.querySelector('main');
    main.style.cssText = 'padding:14px;max-width:960px;margin:0 auto;font-family:Arial,sans-serif;';

    const title = document.createElement('h2');
    title.textContent = 'Which Auto Insurance Coverage Pays?';
    title.style.cssText = 'text-align:center;font-size:18px;margin:0 0 4px 0;color:#222;';
    main.appendChild(title);
    const sub = document.createElement('div');
    sub.textContent = 'Pick a scenario to trace coverage. Hover any coverage pill to see what it means.';
    sub.style.cssText = 'text-align:center;font-size:12px;color:#666;margin-bottom:14px;';
    main.appendChild(sub);

    const coverageDefs = {
        liability:      'Liability: pays for damage YOU cause to others (their car, their injuries). Required in most states.',
        collision:      'Collision: pays for YOUR car when you hit another car or object. Subject to deductible.',
        comprehensive:  'Comprehensive: pays for non-collision damage — theft, weather, animals, vandalism. Deductible applies.',
        medpay:         'MedPay: pays YOUR medical expenses regardless of fault. Small supplement to health insurance.',
        um:             'Uninsured Motorist (UM): pays you if an at-fault driver has no insurance.',
        uim:            'Underinsured Motorist (UIM): pays you if the at-fault driver\'s limits are too low.',
        gap:            'Gap insurance: pays the difference between what you owe on the loan and the car\'s cash value.',
        theirs:         'Their liability coverage: the other driver\'s insurance pays you, up to their limits.',
        none:           'No coverage: you pay out of pocket.'
    };

    const scenarios = [
        { id: 'rearend', title: 'You rear-end another car',
          icon: '🚗💥', color: '#d32f2f',
          rows: [
            { label: 'Their car & injuries',   pay: 'liability',     kind: 'self',   note: 'Up to your liability limits' },
            { label: 'Your car',               pay: 'collision',     kind: 'self',   note: 'Minus your deductible' },
            { label: 'Your injuries',          pay: 'medpay',        kind: 'self',   note: 'Or use your health insurance' }
          ],
          outcome: 'You pay your deductible. Premium will likely go up at renewal.' },
        { id: 'rearended', title: 'Another driver rear-ends you (they are insured)',
          icon: '💥🚗', color: '#f57c00',
          rows: [
            { label: 'Your car & injuries',    pay: 'theirs',        kind: 'other',  note: 'Their liability coverage pays you' }
          ],
          outcome: 'No out-of-pocket cost for you if their limits are enough. Your premium should not go up.' },
        { id: 'uninsured', title: 'You\'re hit by an uninsured driver',
          icon: '❌🚗', color: '#c62828',
          rows: [
            { label: 'Your car & injuries',    pay: 'um',            kind: 'self',   note: 'Requires UM coverage on your policy' },
            { label: 'Alternative',            pay: 'collision',     kind: 'self',   note: 'Then sue the driver (often uncollectible)' }
          ],
          outcome: 'Without UM coverage, you may recover nothing. This is why UM is so important.' },
        { id: 'underinsured', title: 'At-fault driver has low limits',
          icon: '🤏🚗', color: '#ef6c00',
          rows: [
            { label: 'First, up to their limits', pay: 'theirs',     kind: 'other',  note: 'Their liability pays until exhausted' },
            { label: 'Gap above their limits',   pay: 'uim',         kind: 'self',   note: 'UIM pays the rest, up to your limit' }
          ],
          outcome: 'Your UIM makes up the shortfall. Without UIM you absorb the gap.' },
        { id: 'deer', title: 'Deer runs into your car',
          icon: '🦌', color: '#388e3c',
          rows: [
            { label: 'Your car damage',        pay: 'comprehensive', kind: 'self',   note: 'Yes — comprehensive, NOT collision' }
          ],
          outcome: 'Minimal premium impact — not-at-fault for weather/animal events.' },
        { id: 'weather', title: 'Hail, flood, or fallen tree',
          icon: '⛈️', color: '#1976d2',
          rows: [
            { label: 'Your car damage',        pay: 'comprehensive', kind: 'self',   note: 'Natural disasters are comprehensive events' }
          ],
          outcome: 'Premium impact is usually small. Comprehensive deductible applies.' },
        { id: 'theft', title: 'Car is stolen',
          icon: '🕵️', color: '#6a1b9a',
          rows: [
            { label: 'Car cash value',         pay: 'comprehensive', kind: 'self',   note: 'Actual cash value, not replacement cost' },
            { label: 'Loan balance > value',   pay: 'gap',           kind: 'self',   note: 'Only if you have gap insurance' }
          ],
          outcome: 'Without gap insurance, you could still owe the lender after payout.' },
        { id: 'liability-only', title: 'You cause accident, only carry liability',
          icon: '⚠️', color: '#b71c1c',
          rows: [
            { label: 'Their damages',          pay: 'liability',     kind: 'self',   note: 'Up to your limits' },
            { label: 'Your car',               pay: 'none',          kind: 'none',   note: 'No collision coverage = you pay yourself' }
          ],
          outcome: 'Common for older cars (<$4k value) where collision premiums exceed the car\'s worth.' }
    ];

    const grid = document.createElement('div');
    grid.style.cssText = 'display:grid;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));gap:8px;margin-bottom:14px;';
    main.appendChild(grid);

    const detail = document.createElement('div');
    detail.style.cssText = 'padding:14px;border:1px solid #ddd;border-radius:6px;background:#fafafa;min-height:180px;font-size:13px;';
    detail.innerHTML = '<em>Click a scenario above to see which coverage pays.</em>';
    main.appendChild(detail);

    const tipBox = document.createElement('div');
    tipBox.style.cssText = 'margin-top:12px;padding:10px 14px;background:#eef5fb;border-left:4px solid #1565c0;border-radius:4px;font-size:12px;color:#333;';
    tipBox.innerHTML = `
        <strong>Coverage cheat sheet:</strong>
        <ul style="margin:6px 0 0 18px;padding:0;">
            <li><strong>Liability</strong> protects others from you. It's required in most states.</li>
            <li><strong>Collision + Comprehensive</strong> protect your car — drop them once your car is worth less than ~$4,000.</li>
            <li><strong>UM/UIM</strong> protects you from bad/poor drivers — cheap and often overlooked.</li>
            <li><strong>Gap</strong> matters only if your loan balance exceeds your car's cash value.</li>
        </ul>`;
    main.appendChild(tipBox);

    scenarios.forEach(s => {
        const card = document.createElement('div');
        card.style.cssText = `border:1px solid ${s.color};border-left:6px solid ${s.color};background:#fff;padding:10px;border-radius:4px;cursor:pointer;`;
        card.innerHTML = `
            <div style="font-size:22px;">${s.icon}</div>
            <div style="font-weight:bold;font-size:12px;color:#333;">${s.title}</div>`;
        card.addEventListener('click', () => showDetail(s));
        grid.appendChild(card);
    });

    function showDetail(s) {
        let html = `<div style="font-weight:bold;font-size:15px;color:${s.color};margin-bottom:8px;">${s.icon} ${s.title}</div>`;
        html += '<table style="width:100%;border-collapse:collapse;font-size:12px;">';
        html += '<tr style="background:#f0f0f0;"><th style="padding:6px;text-align:left;">What</th><th style="padding:6px;text-align:left;">Who pays</th><th style="padding:6px;text-align:left;">Notes</th></tr>';
        for (const r of s.rows) {
            const bg = r.kind === 'self' ? '#e3f2fd' : r.kind === 'other' ? '#fff3e0' : '#ffebee';
            const col = r.kind === 'self' ? '#1565c0' : r.kind === 'other' ? '#e65100' : '#c62828';
            const coverage = coverageDefs[r.pay].split(':')[0];
            html += `<tr>
                <td style="padding:6px;border-bottom:1px solid #eee;">${r.label}</td>
                <td style="padding:6px;border-bottom:1px solid #eee;">
                    <span title="${coverageDefs[r.pay]}" style="display:inline-block;padding:3px 8px;border-radius:12px;background:${bg};color:${col};font-weight:bold;cursor:help;">${coverage}</span>
                </td>
                <td style="padding:6px;border-bottom:1px solid #eee;color:#555;">${r.note}</td>
            </tr>`;
        }
        html += '</table>';
        html += `<div style="margin-top:10px;padding:8px;background:#e8f5e9;border-left:4px solid #2e7d32;border-radius:3px;font-size:12px;"><strong>Outcome:</strong> ${s.outcome}</div>`;
        detail.innerHTML = html;
    }
});
