// Electronic Payment Systems Comparison — interactive decision tree
// CANVAS_HEIGHT: 620
// Bloom: Apply — students choose appropriate electronic payment methods for different scenarios.

document.addEventListener('DOMContentLoaded', function () {
    const main = document.querySelector('main');
    main.style.cssText = 'padding:14px;max-width:860px;margin:0 auto;font-family:Arial,sans-serif;';

    const title = document.createElement('h2');
    title.textContent = 'Electronic Payment Systems: Which Should I Use?';
    title.style.cssText = 'text-align:center;font-size:18px;margin:0 0 6px 0;color:#222;';
    main.appendChild(title);

    const sub = document.createElement('div');
    sub.textContent = 'Pick your scenario to see the recommended payment method.';
    sub.style.cssText = 'text-align:center;font-size:12px;color:#666;margin-bottom:14px;';
    main.appendChild(sub);

    const scenarios = [
        { id: 'friend-small', title: 'Pay a friend or family member (< $1,000)',
          rec: 'P2P app (Venmo, Cash App, Zelle)', kind: 'good',
          detail: 'Free, instant, and convenient for small transfers between people who know each other.',
          fees: 'Usually $0 for bank-linked transfers; 1.5–3% for instant debit-card payouts.' },
        { id: 'friend-large', title: 'Pay a friend (> $1,000)',
          rec: 'ACH bank transfer or check', kind: 'caution',
          detail: 'P2P apps have transaction limits (often $1,000–$5,000/week). ACH is free and handles larger amounts.',
          fees: 'Free. Takes 1–3 business days.' },
        { id: 'recurring-bill', title: 'Recurring monthly bill',
          rec: 'Automatic ACH / bank bill-pay', kind: 'good',
          detail: 'Set it up once and never forget to pay. Most banks offer free bill-pay.',
          fees: 'Free at almost every bank.' },
        { id: 'one-time-bill', title: 'One-time bill',
          rec: 'Bank bill-pay or debit card', kind: 'good',
          detail: 'Free, trackable, no stamps. Most merchants accept either.',
          fees: 'Free.' },
        { id: 'big-urgent', title: 'Large purchase, time-sensitive (real estate, wire to lawyer)',
          rec: 'Wire transfer', kind: 'warning',
          detail: 'Same-day and guaranteed, but irreversible. Never wire to someone you don\'t know.',
          fees: '$15–$35 domestic; $35–$50 international.' },
        { id: 'big-patient', title: 'Large purchase, not urgent',
          rec: 'ACH transfer', kind: 'good',
          detail: 'Handles any amount for free. Takes 1–3 business days.',
          fees: 'Free.' },
        { id: 'intl-big', title: 'International payment, urgent',
          rec: 'Wire transfer', kind: 'caution',
          detail: 'Fastest international option but expensive. Confirm the recipient carefully.',
          fees: '$35–$50 plus currency exchange spread.' },
        { id: 'intl-small', title: 'International payment, not urgent',
          rec: 'Wise or PayPal', kind: 'good',
          detail: 'Better exchange rates and lower fees than bank wires for most amounts.',
          fees: '0.5–2% of amount; 1–3 business days.' },
        { id: 'store-inperson', title: 'In-person store purchase',
          rec: 'Debit or credit card', kind: 'good',
          detail: 'Fast and widely accepted. Credit cards add fraud protection.',
          fees: 'Free to consumer.' },
        { id: 'store-online', title: 'Online store purchase',
          rec: 'Credit card (preferred)', kind: 'info',
          detail: 'Credit cards limit liability for fraud to $0 and let you dispute charges.',
          fees: 'Free to consumer.' }
    ];

    const color = { good: '#2e7d32', caution: '#f9a825', warning: '#c62828', info: '#1565c0' };
    const bg = { good: '#e8f5e9', caution: '#fff8e1', warning: '#ffebee', info: '#e3f2fd' };
    const icon = { good: '✓', caution: '!', warning: '⚠', info: 'i' };

    const grid = document.createElement('div');
    grid.style.cssText = 'display:grid;grid-template-columns:repeat(auto-fit,minmax(240px,1fr));gap:10px;';
    main.appendChild(grid);

    const detail = document.createElement('div');
    detail.style.cssText = 'margin-top:16px;padding:14px;border:1px solid #ddd;border-radius:6px;background:#fafafa;min-height:80px;font-size:13px;line-height:1.5;';
    detail.innerHTML = '<em>Click a scenario above to see details.</em>';
    main.appendChild(detail);

    scenarios.forEach(s => {
        const card = document.createElement('div');
        card.style.cssText = `border:1px solid ${color[s.kind]};border-left:6px solid ${color[s.kind]};background:${bg[s.kind]};padding:10px;border-radius:4px;cursor:pointer;transition:transform .1s;`;
        card.onmouseover = () => card.style.transform = 'translateY(-2px)';
        card.onmouseout = () => card.style.transform = 'translateY(0)';
        card.innerHTML = `
            <div style="font-weight:bold;font-size:12px;color:#333;margin-bottom:6px;">${s.title}</div>
            <div style="font-size:13px;"><span style="display:inline-block;width:20px;height:20px;line-height:20px;text-align:center;border-radius:50%;background:${color[s.kind]};color:#fff;font-weight:bold;margin-right:6px;">${icon[s.kind]}</span><strong>${s.rec}</strong></div>
        `;
        card.addEventListener('click', () => {
            detail.innerHTML = `
                <div style="font-weight:bold;font-size:14px;color:${color[s.kind]};margin-bottom:6px;">${s.title}</div>
                <div><strong>Recommended:</strong> ${s.rec}</div>
                <div style="margin-top:6px;">${s.detail}</div>
                <div style="margin-top:6px;color:#666;font-size:12px;"><strong>Fees/timing:</strong> ${s.fees}</div>
            `;
        });
        grid.appendChild(card);
    });

    const insights = document.createElement('div');
    insights.style.cssText = 'margin-top:14px;padding:10px 14px;background:#f5f5f5;border-radius:4px;font-size:12px;color:#444;';
    insights.innerHTML = `
        <strong>Key insights:</strong>
        <ul style="margin:6px 0 0 18px;padding:0;">
            <li>P2P apps are great for friends, not strangers.</li>
            <li>Wire transfers are expensive and irreversible — use sparingly.</li>
            <li>ACH is free and sufficient for most needs.</li>
            <li>Never wire money to someone you don't know.</li>
        </ul>`;
    main.appendChild(insights);
});
