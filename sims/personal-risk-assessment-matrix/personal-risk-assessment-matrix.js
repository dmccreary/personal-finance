// Personal Risk Assessment Matrix — 2x2 likelihood vs impact
// CANVAS_HEIGHT: 780
// Bloom: Evaluate — students place risks on the matrix and learn when to insure.

document.addEventListener('DOMContentLoaded', function () {
    const main = document.querySelector('main');
    main.style.cssText = 'padding:14px;max-width:980px;margin:0 auto;font-family:Arial,sans-serif;';

    const title = document.createElement('h2');
    title.textContent = 'Personal Risk Assessment Matrix';
    title.style.cssText = 'text-align:center;font-size:18px;margin:0 0 4px 0;color:#222;';
    main.appendChild(title);
    const sub = document.createElement('div');
    sub.textContent = 'Click any risk dot to see a strategy. The quadrant tells you whether to insure, accept, or avoid.';
    sub.style.cssText = 'text-align:center;font-size:12px;color:#666;margin-bottom:14px;';
    main.appendChild(sub);

    const risks = [
        { id: 'health',       label: 'Major health emergency', likelihood: 0.7, impact: 0.9, typicalCost: '$50k–$500k', freq: '~2%/yr',
          strategy: 'INSURE. Health insurance is the #1 priority — a single hospitalization can wipe out a family.' },
        { id: 'atfault',      label: 'You cause a bad car accident', likelihood: 0.55, impact: 0.85, typicalCost: '$30k–$300k', freq: '~3%/yr',
          strategy: 'INSURE. Auto liability is legally required and the upper limits of most policies are surprisingly affordable.' },
        { id: 'fire',         label: 'Apartment fire', likelihood: 0.2, impact: 0.7, typicalCost: '~$25k', freq: '~0.3%/yr',
          strategy: 'INSURE. Renters insurance is very cheap (~$15/mo) and covers theft too.' },
        { id: 'death',        label: 'Early death (with dependents)', likelihood: 0.1, impact: 1.0, typicalCost: '$500k–$2M lost income', freq: '~0.1%/yr young',
          strategy: 'INSURE. Term life is cheap when young and you have people depending on your income.' },
        { id: 'disability',   label: 'Long-term disability', likelihood: 0.4, impact: 0.85, typicalCost: 'Years of income', freq: '~3% lifetime',
          strategy: 'INSURE. Disability is more likely than early death and devastating without coverage.' },
        { id: 'fender',       label: 'Minor fender-bender', likelihood: 0.7, impact: 0.35, typicalCost: '~$2,000', freq: '~10%/yr',
          strategy: 'ACCEPT. Use a high deductible and pay small repairs yourself.' },
        { id: 'theft',        label: 'Stolen laptop', likelihood: 0.5, impact: 0.3, typicalCost: '~$1,500', freq: '~5%/yr',
          strategy: 'ACCEPT or cover via renters insurance. A standalone policy is rarely worth it.' },
        { id: 'phone',        label: 'Cracked phone screen', likelihood: 0.85, impact: 0.05, typicalCost: '~$200', freq: '~20%/yr',
          strategy: 'ACCEPT. Phone insurance costs more than self-insuring over a few years.' },
        { id: 'ticket',       label: 'Parking ticket', likelihood: 0.9, impact: 0.02, typicalCost: '~$50', freq: 'several/yr',
          strategy: 'BUDGET. Can\'t insure — just plan for them.' },
        { id: 'dui',          label: 'DUI arrest', likelihood: 0.95, impact: 0.9, typicalCost: '$10k+ fines & insurance hikes', freq: 'if you drive drunk',
          strategy: 'AVOID. No insurance will help — change behavior. Use rideshare.' }
    ];

    // Matrix SVG
    const svgNS = 'http://www.w3.org/2000/svg';
    const svg = document.createElementNS(svgNS, 'svg');
    svg.setAttribute('viewBox', '0 0 800 440');
    svg.setAttribute('width', '100%');
    svg.style.cssText = 'background:#fafafa;border:1px solid #ddd;border-radius:6px;';
    main.appendChild(svg);

    const padL = 80, padR = 40, padT = 40, padB = 60;

    // Quadrant backgrounds
    function quadRect(x, y, w, h, fill) {
        const r = document.createElementNS(svgNS, 'rect');
        r.setAttribute('x', x); r.setAttribute('y', y);
        r.setAttribute('width', w); r.setAttribute('height', h);
        r.setAttribute('fill', fill);
        r.setAttribute('stroke', '#ccc');
        svg.appendChild(r);
    }
    const midX = padL + (800 - padL - padR) / 2;
    const midY = padT + (440 - padT - padB) / 2;
    // Low impact, low likelihood (bottom-left): accept — green
    quadRect(padL, midY, midX - padL, (440 - padB) - midY, '#c8e6c9');
    // High likelihood, low impact (top-left): reduce — yellow
    quadRect(padL, padT, midX - padL, midY - padT, '#fff9c4');
    // Low likelihood, high impact (bottom-right): INSURE — red
    quadRect(midX, midY, (800 - padR) - midX, (440 - padB) - midY, '#ffcdd2');
    // High likelihood, high impact (top-right): AVOID — dark red
    quadRect(midX, padT, (800 - padR) - midX, midY - padT, '#b0bec5');

    // Quadrant labels
    function svgText(x, y, str, opts = {}) {
        const t = document.createElementNS(svgNS, 'text');
        t.setAttribute('x', x); t.setAttribute('y', y);
        t.setAttribute('fill', opts.fill || '#333');
        t.setAttribute('font-size', opts.size || 11);
        t.setAttribute('font-family', 'Arial');
        if (opts.bold) t.setAttribute('font-weight', 'bold');
        if (opts.anchor) t.setAttribute('text-anchor', opts.anchor);
        t.textContent = str;
        svg.appendChild(t);
    }

    svgText((padL + midX) / 2, midY + 20, 'Accept', { anchor: 'middle', bold: true, fill: '#2e7d32', size: 14 });
    svgText((padL + midX) / 2, midY + 35, 'Pay yourself, use high deductibles', { anchor: 'middle', size: 10, fill: '#2e7d32' });
    svgText((padL + midX) / 2, padT + 20, 'Reduce / budget for it', { anchor: 'middle', bold: true, fill: '#f57f17', size: 13 });
    svgText((padL + midX) / 2, padT + 35, 'Plan these into your budget', { anchor: 'middle', size: 10, fill: '#f57f17' });
    svgText((midX + 800 - padR) / 2, midY + 20, 'INSURE', { anchor: 'middle', bold: true, fill: '#b71c1c', size: 16 });
    svgText((midX + 800 - padR) / 2, midY + 40, 'This is why insurance exists', { anchor: 'middle', size: 10, fill: '#b71c1c' });
    svgText((midX + 800 - padR) / 2, padT + 20, 'Avoid / change behavior', { anchor: 'middle', bold: true, fill: '#455a64', size: 13 });
    svgText((midX + 800 - padR) / 2, padT + 35, 'Insurance will be costly here', { anchor: 'middle', size: 10, fill: '#455a64' });

    // Axes labels
    svgText((padL + 800 - padR) / 2, 440 - padB + 40, 'Financial impact →', { anchor: 'middle', bold: true, size: 12 });
    const yAxisLabel = document.createElementNS(svgNS, 'text');
    yAxisLabel.setAttribute('x', 20);
    yAxisLabel.setAttribute('y', (padT + 440 - padB) / 2);
    yAxisLabel.setAttribute('font-size', 12);
    yAxisLabel.setAttribute('font-weight', 'bold');
    yAxisLabel.setAttribute('text-anchor', 'middle');
    yAxisLabel.setAttribute('transform', `rotate(-90 20 ${(padT + 440 - padB) / 2})`);
    yAxisLabel.textContent = '← Likelihood';
    svg.appendChild(yAxisLabel);

    svgText(padL, 440 - padB + 20, 'Low <$1k', { size: 10, fill: '#555' });
    svgText(midX, 440 - padB + 20, '$10k', { size: 10, fill: '#555', anchor: 'middle' });
    svgText(800 - padR, 440 - padB + 20, '$100k+', { size: 10, fill: '#555', anchor: 'middle' });
    svgText(padL - 6, 440 - padB, 'Low', { size: 10, fill: '#555', anchor: 'end' });
    svgText(padL - 6, midY, 'Med', { size: 10, fill: '#555', anchor: 'end' });
    svgText(padL - 6, padT + 4, 'High', { size: 10, fill: '#555', anchor: 'end' });

    // Plot risks
    const plotW = 800 - padR - padL;
    const plotH = 440 - padB - padT;
    for (const r of risks) {
        const cx = padL + r.impact * plotW;
        const cy = 440 - padB - r.likelihood * plotH;
        const c = document.createElementNS(svgNS, 'circle');
        c.setAttribute('cx', cx); c.setAttribute('cy', cy);
        c.setAttribute('r', 8);
        c.setAttribute('fill', quadColor(r.impact, r.likelihood));
        c.setAttribute('stroke', '#fff');
        c.setAttribute('stroke-width', 2);
        c.style.cursor = 'pointer';
        c.addEventListener('click', () => showRisk(r));
        svg.appendChild(c);
        svgText(cx + 10, cy + 3, r.label, { size: 10 });
    }

    function quadColor(impact, likelihood) {
        if (impact >= 0.5 && likelihood >= 0.5) return '#455a64';
        if (impact >= 0.5) return '#c62828';
        if (likelihood >= 0.5) return '#f57c00';
        return '#2e7d32';
    }

    const detail = document.createElement('div');
    detail.style.cssText = 'margin-top:12px;padding:12px;border:1px solid #ddd;border-radius:6px;background:#fafafa;min-height:80px;font-size:13px;';
    detail.innerHTML = '<em>Click any dot above to see the recommended strategy.</em>';
    main.appendChild(detail);

    function showRisk(r) {
        const kind = quadColor(r.impact, r.likelihood);
        const kindLabel = kind === '#c62828' ? 'INSURE' :
                          kind === '#455a64' ? 'AVOID / change behavior' :
                          kind === '#f57c00' ? 'Reduce / budget' : 'Accept';
        detail.innerHTML = `
            <div style="font-weight:bold;font-size:14px;color:${kind};">${r.label}</div>
            <div style="font-size:12px;color:#555;margin:4px 0;">Typical cost: ${r.typicalCost}  ·  Frequency: ${r.freq}</div>
            <div style="display:inline-block;padding:3px 10px;border-radius:14px;background:${kind};color:#fff;font-weight:bold;font-size:12px;">${kindLabel}</div>
            <div style="margin-top:8px;">${r.strategy}</div>`;
    }

    // Priority summary
    const summary = document.createElement('div');
    summary.style.cssText = 'margin-top:14px;padding:12px;background:#f5f5f5;border-radius:6px;font-size:12px;';
    summary.innerHTML = `
        <strong>Insurance priority list</strong>
        <ol style="margin:6px 0 0 18px;padding:0;">
            <li><strong style="color:#b71c1c;">Critical:</strong> health insurance, auto liability, renters/home</li>
            <li><strong style="color:#e65100;">Important:</strong> term life (if dependents), disability (if working)</li>
            <li><strong style="color:#1565c0;">Consider:</strong> umbrella policy, higher liability limits</li>
            <li><strong style="color:#616161;">Usually skip:</strong> extended warranties, credit insurance, whole life for young adults</li>
        </ol>
        <div style="margin-top:8px;color:#666;">Rule of thumb: <em>Don't insure what you can afford to replace.</em></div>`;
    main.appendChild(summary);
});
