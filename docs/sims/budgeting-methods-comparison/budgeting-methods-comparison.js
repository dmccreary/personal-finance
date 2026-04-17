// Budgeting Methods Comparison with Quiz
// CANVAS_HEIGHT: 1100
// Bloom: Evaluate — students pick the budgeting method that fits their personality and situation.

document.addEventListener('DOMContentLoaded', function () {
    const main = document.querySelector('main');
    main.style.cssText = 'padding:16px;max-width:980px;margin:0 auto;font-family:Arial,sans-serif;';

    const title = document.createElement('h2');
    title.textContent = 'Three Popular Budgeting Approaches';
    title.style.cssText = 'text-align:center;font-size:20px;margin:0 0 4px 0;color:#222;';
    main.appendChild(title);

    const sub = document.createElement('div');
    sub.textContent = 'Compare the methods, then take the 5-question quiz to find which fits you.';
    sub.style.cssText = 'text-align:center;font-size:12px;color:#666;margin-bottom:14px;';
    main.appendChild(sub);

    const methods = [
        { key: '50/30/20', name: '50/30/20 Rule', tag: 'Simple percentages, big impact',
          color: '#1565c0', bg: '#e3f2fd', icon: '◔',
          complexity: 1, time: '1–2 hrs/month', detail: 'Low', flexibility: 'High',
          bestFor: ['Budgeting beginners', 'People who dislike detail', 'Variable income', 'Want simple rules'],
          how: ['50% of income → needs', '30% → wants', '20% → savings/debt', 'Track by % not every transaction'] },
        { key: 'zero', name: 'Zero-Based Budget', tag: 'Every dollar has a job',
          color: '#2e7d32', bg: '#e8f5e9', icon: '▦',
          complexity: 4, time: '3–5 hrs/month', detail: 'Very high', flexibility: 'Medium',
          bestFor: ['Detail-oriented', 'Specific goals', 'Want maximum control', 'Aggressive debt payers'],
          how: ['Allocate 100% before month starts', 'Every $ assigned to a category', 'Adjust as month goes', 'Income − expenses = $0'] },
        { key: 'envelope', name: 'Envelope Method', tag: 'Cash makes it real',
          color: '#e65100', bg: '#fff3e0', icon: '✉',
          complexity: 2, time: '2–3 hrs/month', detail: 'Medium', flexibility: 'Low',
          bestFor: ['Visual/tactile learners', 'Card overspenders', 'Breaking bad habits', 'Want physical limits'],
          how: ['Withdraw cash start of month', 'Divide into envelopes', 'Spend only envelope cash', 'Empty = stop spending'] }
    ];

    const grid = document.createElement('div');
    grid.style.cssText = 'display:grid;grid-template-columns:repeat(auto-fit,minmax(260px,1fr));gap:12px;margin-bottom:18px;';
    main.appendChild(grid);

    methods.forEach(m => {
        const card = document.createElement('div');
        card.style.cssText = `background:${m.bg};border:1px solid ${m.color};border-top:6px solid ${m.color};border-radius:6px;padding:14px;`;
        const stars = '★'.repeat(m.complexity) + '☆'.repeat(5 - m.complexity);
        card.innerHTML = `
            <div style="text-align:center;font-size:34px;color:${m.color};">${m.icon}</div>
            <div style="font-weight:bold;font-size:15px;color:${m.color};text-align:center;">${m.name}</div>
            <div style="text-align:center;font-style:italic;font-size:11px;color:#666;margin-bottom:8px;">"${m.tag}"</div>
            <div style="font-size:12px;margin-bottom:8px;">
                <div>Complexity: <span style="color:${m.color};">${stars}</span></div>
                <div>Time: ${m.time}</div>
                <div>Detail: ${m.detail}</div>
                <div>Flexibility: ${m.flexibility}</div>
            </div>
            <div style="font-size:12px;font-weight:bold;margin-top:6px;color:#333;">Best for</div>
            <ul style="margin:4px 0 6px 16px;padding:0;font-size:11px;">
                ${m.bestFor.map(x => `<li>${x}</li>`).join('')}
            </ul>
            <div style="font-size:12px;font-weight:bold;color:#333;">How it works</div>
            <ol style="margin:4px 0 0 18px;padding:0;font-size:11px;">
                ${m.how.map(x => `<li>${x}</li>`).join('')}
            </ol>`;
        grid.appendChild(card);
    });

    // Quiz
    const quizTitle = document.createElement('h3');
    quizTitle.textContent = 'Which method fits you best?';
    quizTitle.style.cssText = 'text-align:center;font-size:16px;margin:10px 0 4px 0;';
    main.appendChild(quizTitle);

    const quizSub = document.createElement('div');
    quizSub.textContent = 'Answer 5 quick questions. Your score updates as you go.';
    quizSub.style.cssText = 'text-align:center;font-size:11px;color:#666;margin-bottom:12px;';
    main.appendChild(quizSub);

    const questions = [
        { q: 'How much detail do you enjoy?',
          opts: [ ['Minimal — big picture only', { '50/30/20': 1 }],
                  ['Some — categories, not every transaction', { envelope: 1 }],
                  ['Maximum — I want to track everything', { zero: 1 }] ] },
        { q: 'What is your main budgeting challenge?',
          opts: [ ['I don\'t save enough', { '50/30/20': 1, zero: 1 }],
                  ['I overspend with cards', { envelope: 1 }],
                  ['I don\'t know where my money goes', { zero: 1 }],
                  ['I need something simple to start', { '50/30/20': 1 }] ] },
        { q: 'How much time can you spend budgeting?',
          opts: [ ['1–2 hours/month max', { '50/30/20': 1 }],
                  ['2–4 hours/month is fine', { envelope: 1 }],
                  ['4+ hours/month, no problem', { zero: 1 }] ] },
        { q: 'Variable or steady income?',
          opts: [ ['Very variable (freelance, tips)', { '50/30/20': 1 }],
                  ['Somewhat variable', { envelope: 1 }],
                  ['Very steady salary', { zero: 1 }] ] },
        { q: 'Your personality?',
          opts: [ ['Flexible, big-picture thinker', { '50/30/20': 1 }],
                  ['Like tangible, physical systems', { envelope: 1 }],
                  ['Detail-oriented, love optimization', { zero: 1 }] ] }
    ];

    const score = { '50/30/20': 0, zero: 0, envelope: 0 };
    const answered = new Array(questions.length).fill(null);

    const quizBox = document.createElement('div');
    quizBox.style.cssText = 'border:1px solid #ddd;border-radius:6px;padding:12px;background:#fafafa;margin-bottom:12px;';
    main.appendChild(quizBox);

    questions.forEach((q, qi) => {
        const qDiv = document.createElement('div');
        qDiv.style.cssText = 'margin-bottom:10px;';
        qDiv.innerHTML = `<div style="font-weight:bold;font-size:12px;margin-bottom:4px;">${qi + 1}. ${q.q}</div>`;
        q.opts.forEach((opt, oi) => {
            const [label, delta] = opt;
            const btn = document.createElement('button');
            btn.textContent = label;
            btn.style.cssText = 'display:block;width:100%;text-align:left;padding:5px 10px;margin:2px 0;border:1px solid #bbb;background:#fff;border-radius:3px;cursor:pointer;font-size:12px;';
            btn.addEventListener('click', () => {
                if (answered[qi] !== null) {
                    const prev = q.opts[answered[qi]][1];
                    for (const k in prev) score[k] -= prev[k];
                }
                for (const k in delta) score[k] += delta[k];
                answered[qi] = oi;
                Array.from(qDiv.querySelectorAll('button')).forEach((b, bi) => {
                    b.style.background = bi === oi ? '#e3f2fd' : '#fff';
                    b.style.borderColor = bi === oi ? '#1565c0' : '#bbb';
                });
                updateResult();
            });
            qDiv.appendChild(btn);
        });
        quizBox.appendChild(qDiv);
    });

    const result = document.createElement('div');
    result.style.cssText = 'margin-top:8px;padding:12px;border-radius:6px;background:#fff;border:1px dashed #999;font-size:13px;text-align:center;min-height:70px;';
    result.innerHTML = '<em>Answer the questions to see your recommended method.</em>';
    main.appendChild(result);

    function updateResult() {
        const entries = Object.entries(score).sort((a, b) => b[1] - a[1]);
        const totalAnswered = answered.filter(x => x !== null).length;
        if (totalAnswered === 0) {
            result.innerHTML = '<em>Answer the questions to see your recommended method.</em>';
            return;
        }
        const [bestKey, bestScore] = entries[0];
        const m = methods.find(x => x.key === bestKey);
        const scoreDetail = entries.map(([k, v]) => {
            const mm = methods.find(x => x.key === k);
            return `<span style="color:${mm.color};font-weight:bold;">${mm.name}: ${v}</span>`;
        }).join('  ·  ');
        result.innerHTML = `
            <div style="color:${m.color};font-weight:bold;font-size:15px;">Your recommended method: ${m.name}</div>
            <div style="font-size:11px;color:#555;margin-top:4px;">${scoreDetail}</div>
            <div style="font-size:11px;color:#666;margin-top:8px;">Try different methods to find what works for YOU — many people combine approaches.</div>`;
    }

    // Hybrid section
    const hybrid = document.createElement('div');
    hybrid.style.cssText = 'margin-top:10px;padding:12px;background:#f5f5f5;border-radius:6px;font-size:12px;color:#333;';
    hybrid.innerHTML = `
        <strong>Mix and match — a common hybrid:</strong>
        <ul style="margin:6px 0 0 18px;padding:0;">
            <li>Use <strong style="color:#1565c0;">50/30/20</strong> as the overall framework.</li>
            <li>Use <strong style="color:#2e7d32;">zero-based</strong> inside the 50% needs bucket to squeeze out waste.</li>
            <li>Use <strong style="color:#e65100;">envelopes</strong> for the 30% wants bucket to cap overspending.</li>
        </ul>`;
    main.appendChild(hybrid);
});
