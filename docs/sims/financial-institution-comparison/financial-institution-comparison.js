// Financial Institution Comparison — three-column comparison infographic
// CANVAS_HEIGHT: 720
// Bloom: Analyze — students compare banks, credit unions, and online banks on key criteria.

document.addEventListener('DOMContentLoaded', function () {
    const main = document.querySelector('main');
    main.style.cssText = 'padding:14px;max-width:960px;margin:0 auto;font-family:Arial,sans-serif;';

    const title = document.createElement('h2');
    title.textContent = 'Compare Financial Institutions';
    title.style.cssText = 'text-align:center;font-size:18px;margin:0 0 4px 0;color:#222;';
    main.appendChild(title);

    const sub = document.createElement('div');
    sub.textContent = 'Hover cells for details. Filter at the bottom to see which type wins on what you care about.';
    sub.style.cssText = 'text-align:center;font-size:12px;color:#666;margin-bottom:14px;';
    main.appendChild(sub);

    const institutions = [
        { key: 'bank',   name: 'Commercial Bank', icon: '🏦', theme: '#1565c0', bg: '#e3f2fd' },
        { key: 'cu',     name: 'Credit Union',    icon: '🤝', theme: '#2e7d32', bg: '#e8f5e9' },
        { key: 'online', name: 'Online Bank',     icon: '📱', theme: '#6a1b9a', bg: '#f3e5f5' }
    ];

    const rows = [
        { label: 'Ownership', key: 'ownership',
          vals: { bank: 'Shareholder-owned for-profit',
                  cu: 'Member-owned nonprofit',
                  online: 'Shareholder-owned for-profit' },
          details: { bank: 'Profits go to shareholders, which pressures fees up and rates down.',
                     cu: 'Profits return to members as lower fees and better rates.',
                     online: 'Still for-profit, but cheaper operations (no branches) pass savings on.' } },
        { label: 'Branches', key: 'branches',
          vals: { bank: 'Many locations', cu: 'Fewer locations', online: 'No physical branches' },
          details: { bank: 'Convenient if you need in-person help or cash deposits.',
                     cu: 'Often share branches through CO-OP networks to extend reach.',
                     online: 'Everything is done via app or website. No walk-in service.' } },
        { label: 'Fees', key: 'fees', winner: 'online',
          vals: { bank: 'Higher fees', cu: 'Lower fees', online: 'Lowest fees' },
          details: { bank: 'Monthly maintenance fees are common unless you meet minimums.',
                     cu: 'Lower overdraft, ATM, and monthly fees than big banks.',
                     online: 'Most online banks have no monthly fees and reimburse ATM use.' } },
        { label: 'Savings APY', key: 'rates', winner: 'online',
          vals: { bank: 'Low (0.01–0.1%)', cu: 'Medium', online: 'Highest (4–5%)' },
          details: { bank: 'Big banks rarely compete on rate — they rely on convenience.',
                     cu: 'Better than banks, often similar to online on CDs.',
                     online: 'Top APYs because they have no branch real estate to pay for.' } },
        { label: 'Technology', key: 'tech', winner: 'online',
          vals: { bank: 'Advanced apps', cu: 'Good apps', online: 'Best apps' },
          details: { bank: 'Big budgets fund polished apps and lots of features.',
                     cu: 'Smaller IT teams — functional but sometimes behind.',
                     online: 'Tech-first by design. App quality is the product.' } },
        { label: 'Insurance', key: 'insurance',
          vals: { bank: 'FDIC up to $250k', cu: 'NCUA up to $250k', online: 'FDIC up to $250k' },
          details: { bank: 'FDIC is a federal agency; coverage is identical at every member bank.',
                     cu: 'NCUA is the credit-union equivalent — same $250k per depositor.',
                     online: 'Look for the FDIC logo. Cash-management apps need closer reading.' } },
        { label: 'Best for', key: 'bestfor',
          vals: { bank: 'Comprehensive services', cu: 'Lower costs & community', online: 'Best rates & tech users' },
          details: { bank: 'Full-service banking with loans, mortgages, and wealth management.',
                     cu: 'Members who value community ties and modest balances.',
                     online: 'Savers comfortable doing everything through an app.' } }
    ];

    let filter = null;
    const filterWinners = { fees: 'online', convenience: 'bank', rates: 'online' };

    const grid = document.createElement('div');
    grid.style.cssText = 'display:grid;grid-template-columns:180px 1fr 1fr 1fr;gap:1px;background:#ddd;border:1px solid #ddd;border-radius:6px;overflow:hidden;';
    main.appendChild(grid);

    const headEmpty = document.createElement('div');
    headEmpty.style.cssText = 'background:#fafafa;padding:12px;';
    grid.appendChild(headEmpty);

    institutions.forEach(inst => {
        const h = document.createElement('div');
        h.style.cssText = `background:${inst.bg};padding:14px;text-align:center;cursor:pointer;`;
        h.innerHTML = `<div style="font-size:28px;">${inst.icon}</div>
                       <div style="font-weight:bold;color:${inst.theme};margin-top:4px;">${inst.name}</div>`;
        h.addEventListener('click', () => {
            filter = filter === inst.key ? null : inst.key;
            render();
        });
        grid.appendChild(h);
    });

    const detailBox = document.createElement('div');
    detailBox.style.cssText = 'margin-top:14px;padding:12px;border:1px solid #ddd;border-radius:6px;background:#fafafa;min-height:60px;font-size:13px;line-height:1.5;';
    detailBox.innerHTML = '<em>Hover any cell to read the details.</em>';

    rows.forEach(r => {
        const label = document.createElement('div');
        label.style.cssText = 'background:#fafafa;padding:10px 12px;font-weight:bold;font-size:12px;color:#333;display:flex;align-items:center;';
        label.textContent = r.label;
        grid.appendChild(label);
        institutions.forEach(inst => {
            const cell = document.createElement('div');
            cell.dataset.inst = inst.key;
            cell.dataset.row = r.key;
            cell.style.cssText = 'background:#fff;padding:10px 12px;font-size:12px;text-align:center;cursor:pointer;transition:background .1s;';
            cell.textContent = r.vals[inst.key];
            cell.addEventListener('mouseenter', () => {
                detailBox.innerHTML = `<strong style="color:${inst.theme};">${inst.name} — ${r.label}:</strong> ${r.details[inst.key]}`;
                cell.style.background = inst.bg;
            });
            cell.addEventListener('mouseleave', () => {
                applyCellStyle(cell, inst, r);
            });
            grid.appendChild(cell);
        });
    });

    main.appendChild(detailBox);

    const filterBar = document.createElement('div');
    filterBar.style.cssText = 'margin-top:14px;padding:10px;background:#f5f5f5;border-radius:6px;font-size:12px;text-align:center;';
    filterBar.innerHTML = '<strong>Filter by priority:</strong> ';
    const filters = [
        { key: null, label: 'None' },
        { key: 'fees', label: 'Lowest fees' },
        { key: 'convenience', label: 'Most convenient' },
        { key: 'rates', label: 'Best rates' }
    ];
    filters.forEach(f => {
        const btn = document.createElement('button');
        btn.textContent = f.label;
        btn.style.cssText = 'margin:0 4px;padding:4px 10px;border:1px solid #999;background:#fff;border-radius:4px;cursor:pointer;';
        btn.addEventListener('click', () => {
            filter = f.key;
            render();
        });
        filterBar.appendChild(btn);
    });
    main.appendChild(filterBar);

    function applyCellStyle(cell, inst, r) {
        let bg = '#fff';
        let bold = false;
        if (filter && typeof filter === 'string' && !filterWinners[filter] && filter === inst.key) {
            bg = inst.bg;
            bold = true;
        } else if (filter && filterWinners[filter]) {
            if (inst.key === filterWinners[filter]) { bg = '#fffde7'; bold = true; }
        }
        cell.style.background = bg;
        cell.style.fontWeight = bold ? 'bold' : 'normal';
    }

    function render() {
        const cells = grid.querySelectorAll('[data-inst]');
        cells.forEach(cell => {
            const inst = institutions.find(i => i.key === cell.dataset.inst);
            const r = rows.find(x => x.key === cell.dataset.row);
            applyCellStyle(cell, inst, r);
        });
    }
    render();

    const insights = document.createElement('div');
    insights.style.cssText = 'margin-top:12px;padding:10px 14px;background:#eef5fb;border-left:4px solid #1565c0;border-radius:4px;font-size:12px;color:#333;';
    insights.innerHTML = `<strong>The short version:</strong>
        Online banks win on rates and fees. Credit unions win on community and middle-of-the-road rates.
        Big banks win on branch access and full-service banking. Many people use two institutions at once.`;
    main.appendChild(insights);
});
