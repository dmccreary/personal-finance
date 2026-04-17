// Phishing Email Anatomy — interactive red-flag hunt
// CANVAS_HEIGHT: 760
// Bloom: Evaluate — students spot phishing red flags in a realistic fake email.

document.addEventListener('DOMContentLoaded', function () {
    const main = document.querySelector('main');
    main.style.cssText = 'padding:14px;max-width:900px;margin:0 auto;font-family:Arial,sans-serif;';

    const title = document.createElement('h2');
    title.textContent = 'Anatomy of a Phishing Email';
    title.style.cssText = 'text-align:center;font-size:18px;margin:0 0 4px 0;color:#222;';
    main.appendChild(title);
    const sub = document.createElement('div');
    sub.innerHTML = 'Click each <span style="background:#fff59d;padding:0 4px;">highlighted</span> area to reveal the red flag.';
    sub.style.cssText = 'text-align:center;font-size:12px;color:#666;margin-bottom:12px;';
    main.appendChild(sub);

    const emailBox = document.createElement('div');
    emailBox.style.cssText = 'background:#fff;border:1px solid #999;border-radius:4px;padding:16px;font-family:Arial,sans-serif;font-size:13px;line-height:1.5;max-width:700px;margin:0 auto;';
    main.appendChild(emailBox);

    const flags = [
        { text: 'support@chase-secure-alert.com', flag: 'Sender email mismatch',
          detail: 'The real Chase uses chase.com, not "chase-secure-alert.com". Scammers register look-alike domains. Always hover over the sender to see the true address.' },
        { text: 'Dear Valued Customer', flag: 'Generic greeting',
          detail: 'Your real bank knows your name. "Dear Customer" or "Dear Account Holder" is a major red flag — scammers send millions of emails and can\'t personalize them.' },
        { text: 'Your account will be SUSPENDED in 24 hours!', flag: 'Urgency & threats',
          detail: 'Scammers create panic so you act before thinking. Real banks do not lock accounts by email on a 24-hour countdown. Take a breath.' },
        { text: 'http://chase-verify.secure-login-portal.net/verify', flag: 'Suspicious link',
          detail: 'The real domain here is "secure-login-portal.net", not chase.com. Always read the URL right-to-left from the last ".com" or ".net" backward — that\'s the real owner.' },
        { text: 'we has detected', flag: 'Grammar errors',
          detail: 'Legitimate corporate emails go through editors. Grammar mistakes, odd capitalization, and awkward phrasing are telltale signs of a scam.' },
        { text: 'Please confirm your SSN, debit card number, PIN, and online banking password', flag: 'Requests for sensitive info',
          detail: 'Your bank NEVER asks for your PIN, full SSN, or password by email. Anyone asking for all four is not your bank.' },
        { text: 'Failure to comply will result in permanent account closure', flag: 'Pressure tactics',
          detail: 'Real banks don\'t "permanently close" accounts for failing to reply to an email. They send paper mail, call, or flag inside your app.' }
    ];

    function span(flagObj) {
        return `<span class="flag" data-idx="${flags.indexOf(flagObj)}" style="background:#fff59d;padding:1px 3px;border-radius:2px;cursor:pointer;border:1px dashed #f57f17;">${flagObj.text}</span>`;
    }

    emailBox.innerHTML = `
        <div style="border-bottom:1px solid #ccc;padding-bottom:8px;margin-bottom:8px;font-size:12px;color:#555;">
            <div><strong>From:</strong> Chase Secure Alerts &lt;${span(flags[0])}&gt;</div>
            <div><strong>To:</strong> me@example.com</div>
            <div><strong>Subject:</strong> 🚨 URGENT: Account Security Alert</div>
            <div><strong>Date:</strong> Tue, Apr 16 2026, 2:47 AM</div>
        </div>
        <p>${span(flags[1])},</p>
        <p>${span(flags[2])}
        Our security team ${span(flags[4])} unusual activity on your checking account.
        To avoid interruption of service, you must verify your identity immediately.</p>
        <p>Click below to confirm your account:<br>
        ${span(flags[3])}</p>
        <p>${span(flags[5])} so we can verify you are the account holder.</p>
        <p>${span(flags[6])}.</p>
        <p>Thank you for your cooperation,<br>
        Chase Customer Protection Team</p>
    `;

    const foundBox = document.createElement('div');
    foundBox.style.cssText = 'margin-top:14px;padding:10px 14px;background:#fafafa;border:1px solid #ddd;border-radius:4px;font-size:12px;min-height:80px;';
    foundBox.innerHTML = '<em>Click any highlighted area to learn why it\'s a red flag. Flags found: <strong id="count">0</strong> / ' + flags.length + '</em>';
    main.appendChild(foundBox);

    const list = document.createElement('ul');
    list.style.cssText = 'margin:8px 0 0 18px;padding:0;';
    foundBox.appendChild(list);

    const found = new Set();
    document.querySelectorAll('.flag').forEach(el => {
        el.addEventListener('click', () => {
            const idx = parseInt(el.dataset.idx);
            if (found.has(idx)) return;
            found.add(idx);
            el.style.background = '#c8e6c9';
            el.style.border = '1px solid #2e7d32';
            const li = document.createElement('li');
            li.innerHTML = `<strong style="color:#c62828;">${flags[idx].flag}:</strong> ${flags[idx].detail}`;
            li.style.marginBottom = '4px';
            list.appendChild(li);
            document.getElementById('count').textContent = found.size;
            if (found.size === flags.length) {
                const done = document.createElement('div');
                done.style.cssText = 'margin-top:10px;padding:10px;background:#c8e6c9;border-left:4px solid #2e7d32;border-radius:3px;font-weight:bold;color:#1b5e20;';
                done.textContent = '✓ Great job — you found every red flag. If you see ANY of these in a real email, delete it.';
                foundBox.appendChild(done);
            }
        });
    });

    const safe = document.createElement('div');
    safe.style.cssText = 'margin-top:12px;padding:10px 14px;background:#e3f2fd;border-left:4px solid #1565c0;border-radius:4px;font-size:12px;';
    safe.innerHTML = `
        <strong>If you ever get an email like this:</strong>
        <ol style="margin:6px 0 0 18px;padding:0;">
            <li>Don\'t click any links. Open your bank\'s app directly instead.</li>
            <li>Forward the email to your bank\'s reporting address (e.g., phishing@chase.com).</li>
            <li>Delete it. Never reply.</li>
            <li>If you did click — change your password and call your bank.</li>
        </ol>`;
    main.appendChild(safe);
});
