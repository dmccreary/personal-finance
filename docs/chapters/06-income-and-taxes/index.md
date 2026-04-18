---
title: Income and Taxes
description: Understanding paychecks, withholding, federal and state income taxes, tax forms, deductions, credits, and tax-advantaged accounts
generated_by: claude skill chapter-content-generator
date: 2026-04-17 16:38:38
version: 0.07
---

# Income and Taxes

!!! mascot-welcome "Welcome to Chapter 6"
    <img src="../../img/mascot/welcome.png" class="mascot-admonition-img" alt="Sylvia waving welcome">
    A nut saved is a nut earned! In this chapter, you'll learn what happens to your paycheck between "earned" and "deposited," how the tax system actually works, and how to keep more of what you earn without doing anything shady. By the end, you'll be able to read a pay stub, understand your tax bracket, and file a basic return with confidence.

## Summary

This chapter demystifies income and taxation, helping you understand how to read your paycheck and navigate the tax system. You'll learn the difference between gross and net income, how paycheck withholding works, and the purpose of key tax forms like the W-4, W-2, and Form 1040. The chapter covers federal income tax, state income tax, and FICA taxes, explaining concepts like marginal vs. effective tax rates and tax brackets. You'll learn about tax filing requirements, the difference between standard deductions and itemizing, and how tax credits differ from tax deductions. The chapter also introduces tax planning strategies and tax-advantaged accounts that can help you minimize your tax burden and maximize your wealth over time.

## Concepts Covered

This chapter covers the following 19 concepts from the learning graph:

109. Gross Income
110. Net Income
111. Paycheck Withholding
112. W-4 Form
113. W-2 Form
114. Federal Income Tax
115. State Income Tax
116. FICA Taxes
117. Tax Filing
118. Form 1040
119. Standard Deduction
120. Itemized Deductions
121. Tax Credits
122. Tax Deductions
123. Marginal Tax Rate
124. Effective Tax Rate
125. Tax Brackets
126. Tax Planning
127. Tax-Advantaged Accounts

## Prerequisites

This chapter builds on concepts from:

- [Chapter 1: Foundational Financial Concepts](../01-foundational-financial-concepts/index.md) - Income statements and financial decision making
- [Chapter 5: Saving and Investing](../05-saving-and-investing/index.md) - Investment account types

---

## Reading Your Paycheck

Your first paycheck usually delivers a small shock. You were told you'd make, say, $18 an hour for 40 hours a week — $720 — but the number that lands in your account is closer to $575. Where did the other $145 go? Taxes, mostly, along with a few other deductions. Understanding exactly what got taken out is the first step to being in control of your money.

### Gross Income

**Gross income** is the total amount you earn before any taxes or deductions are subtracted. If you're paid $20 per hour and work 40 hours in a week, your gross pay for that week is $800. On a salary, gross income is the number in your offer letter — the "$50,000 a year" figure — before anything else happens.

Gross income matters because it's the starting point for almost every other calculation: tax withholding, retirement contributions, benefit eligibility, loan applications. When a lender asks about your income, they usually mean gross annual income.

### Net Income

**Net income** is what's left after all deductions are taken out of your gross pay. It's sometimes called "take-home pay" because it's the amount that actually shows up in your bank account. The difference between gross and net can easily be 20–30%, depending on your tax bracket, retirement contributions, and benefit selections.

The main things that get subtracted between gross and net:

- Federal income tax withholding
- State income tax withholding (in most states)
- FICA taxes (Social Security and Medicare)
- Health insurance premiums (your share)
- Retirement contributions (401(k), 403(b))
- Other benefits (HSA, FSA, commuter benefits)

A sample pay stub helps make this concrete. Picture a 22-year-old earning $50,000/year, paid every two weeks:

| Line | Biweekly Amount |
|---|---|
| Gross pay (2 weeks) | $1,923.08 |
| Federal income tax withheld | –$173.00 |
| Social Security tax (6.2%) | –$119.23 |
| Medicare tax (1.45%) | –$27.88 |
| State income tax (varies) | –$77.00 |
| Health insurance premium | –$60.00 |
| 401(k) contribution (5%) | –$96.15 |
| **Net pay** | **$1,369.82** |

That's about 71% of gross pay hitting the bank account. The rest isn't gone — most of it is doing something useful (paying for benefits, building retirement savings, funding public services) — but understanding the breakdown helps you plan your budget around the number that actually reaches you.

#### Diagram: Anatomy of a Pay Stub


<iframe src="../../sims/paycheck-breakdown/main.html" width="100%" height="582px" scrolling="no"></iframe>
[Run Anatomy of a Pay Stub Fullscreen](../../sims/paycheck-breakdown/main.html)

<details markdown="1">
<summary>Pay Stub Breakdown Infographic</summary>
Type: interactive-infographic
**sim-id:** paycheck-breakdown<br/>
**Library:** p5.js<br/>
**Status:** Specified

An interactive infographic showing a labeled sample pay stub with hover-to-explain tooltips on each deduction line.

Layout: a realistic pay stub graphic on the left, an itemized bar chart on the right showing the same data visually. Hovering over a line on the pay stub highlights the matching bar segment and shows a tooltip with a plain-English explanation and the relevant tax concept.

Lines to include with tooltips:

- Gross Pay ("Your total earnings before anything is taken out")
- Federal Withholding ("An estimate of your federal income tax, set by your W-4")
- Social Security Tax ("6.2% to fund retirement benefits for current retirees")
- Medicare Tax ("1.45% to fund healthcare for current retirees")
- State Tax ("Varies by state — some states have no income tax")
- Health Insurance ("Your share of the premium for employer-sponsored health coverage")
- 401(k) Contribution ("Pre-tax retirement savings — reduces your taxable income")
- Net Pay ("What actually lands in your account")

Includes a salary slider ($20,000–$150,000) that recalculates all values dynamically. Canvas 900x500, responsive. Learning objective (Bloom: Understanding): Students identify each paycheck component and explain what it funds.

Implementation: p5.js with responsive layout and hover tooltips.
</details>

## Paycheck Withholding

### Paycheck Withholding

**Paycheck withholding** is the portion of each paycheck your employer sends to the government on your behalf — mostly for federal and state income taxes. The U.S. uses a "pay as you go" system: rather than owing a huge tax bill at year-end, you pay in small pieces throughout the year.

Withholding is an estimate, not an exact amount. If your employer withholds too much, you get the extra back as a tax refund in the spring. If they withhold too little, you owe the difference (and sometimes a small penalty). The goal is to get the withholding roughly right so you neither owe a lot nor get an unusually large refund.

!!! mascot-warning "A Big Refund Isn't Free Money"
    <img src="../../img/mascot/warning.png" class="mascot-admonition-img" alt="Sylvia warning">
    It feels like a windfall — but a $3,000 tax refund means you lent the government $250 a month all year at 0% interest. That same $250 going into a savings account at 4% or an index fund would have earned you real money. Adjust your W-4 so your refund is small (or zero). The goal is accuracy, not surprise bonuses.

### W-4 Form

The **W-4 Form** is the document you fill out when you start a new job to tell your employer how much tax to withhold from each paycheck. The IRS redesigned the W-4 in 2020, and it's now much simpler than the old version — no more confusing allowances.

The new W-4 has five steps:

1. **Personal information** — name, address, filing status (single, married, head of household)
2. **Multiple jobs or working spouse** — only if you have more than one job or your spouse also works
3. **Dependents** — credits for qualifying children or other dependents
4. **Other adjustments** — extra withholding, other income, or additional deductions
5. **Sign and date**

For most new workers with a single job, you fill out Step 1, skip to Step 5, and you're done. The IRS provides a free **Tax Withholding Estimator** (at irs.gov) that can help you fine-tune the form if your situation is more complex.

You can update your W-4 anytime — not just when you start the job. Good times to revisit it: after a raise, marriage, having a child, buying a home, or starting a side hustle.

### W-2 Form

The **W-2 Form** is the annual summary your employer sends you in January reporting everything you earned and everything that was withheld in the previous calendar year. You'll need it to file your tax return, and your employer is legally required to mail (or electronically deliver) it by January 31.

Key boxes on the W-2:

- **Box 1** — Wages, tips, and other compensation (the taxable amount)
- **Box 2** — Federal income tax withheld
- **Box 3–6** — Social Security and Medicare wages and taxes
- **Box 12** — Special items like 401(k) contributions (code D) or HSA contributions (code W)
- **Box 15–17** — State wages and state income tax withheld

If you worked multiple jobs in the same year, you'll get a W-2 from each one. All of them need to go on your tax return.

## Federal, State, and FICA Taxes

Your paycheck is pulled in three different directions at once. Understanding what each chunk funds makes the whole system feel less arbitrary.

### Federal Income Tax

**Federal income tax** is the tax you pay to the U.S. federal government on your earnings. It's the largest tax most workers pay, and it funds everything from defense and Social Security to education and infrastructure. Federal tax uses a **progressive** structure — the more you earn, the higher the rate on the additional dollars.

The exact amount you owe depends on three main things:

- Your **taxable income** (gross income minus deductions)
- Your **filing status** (single, married filing jointly, etc.)
- Any **credits** you qualify for

### State Income Tax

**State income tax** is levied by most U.S. states on top of the federal tax. Rates and rules vary dramatically:

- **No state income tax:** Alaska, Florida, Nevada, South Dakota, Tennessee, Texas, Washington, Wyoming. (New Hampshire taxes only certain interest and dividend income.)
- **Flat-rate states:** a single percentage applies to all income (e.g., Pennsylvania at ~3.07%)
- **Progressive states:** brackets similar to the federal system (e.g., California, New York)

Where you live genuinely affects your take-home pay. A $70,000 salary in Texas and the same $70,000 in California yield very different net incomes. This can matter a lot when you're choosing between job offers in different states.

### FICA Taxes

**FICA taxes** — named after the Federal Insurance Contributions Act — are the taxes that fund Social Security and Medicare. Unlike income tax, FICA applies at a flat rate regardless of income level (with one exception below).

| Tax | Rate (employee share) | What It Funds | Wage Limit (2025) |
|---|---|---|---|
| Social Security | 6.2% | Retirement and disability benefits | Up to $168,600 |
| Medicare | 1.45% | Healthcare for age 65+ | No limit |
| Additional Medicare | 0.9% | Same as Medicare | On wages above $200k (single) |

Your employer pays a matching amount, so the total going into Social Security and Medicare on your behalf is 15.3%. Self-employed people pay both halves themselves (called self-employment tax), which is why gig workers and freelancers face a surprisingly big tax bill without an employer covering half.

FICA taxes are not optional and you can't deduct them. Unlike income tax, there's no refund mechanism for FICA — what comes out stays out.

## How Tax Brackets Work

### Tax Brackets

**Tax brackets** are the income ranges the federal government uses to apply different tax rates. The U.S. uses a **progressive bracket system** — higher ranges of income are taxed at higher rates. For 2025 (single filers), the federal brackets are:

| Rate | Taxable Income Range (Single) |
|---|---|
| 10% | $0 – $11,925 |
| 12% | $11,926 – $48,475 |
| 22% | $48,476 – $103,350 |
| 24% | $103,351 – $197,300 |
| 32% | $197,301 – $250,525 |
| 35% | $250,526 – $626,350 |
| 37% | $626,351+ |

Here's the key insight people miss: these rates apply to ranges of income, not to all your income. Moving into a higher bracket doesn't re-tax all your earlier dollars at the higher rate. Only the dollars inside that bracket get taxed at that bracket's rate.

### Marginal Tax Rate

Your **marginal tax rate** is the rate that applies to your next dollar of income — in other words, the rate of your top bracket. It's the right rate to use when evaluating whether a raise, a bonus, or a side hustle is worth it on an after-tax basis.

Example: if your taxable income is $60,000 as a single filer, you're in the 22% bracket. Your marginal rate is 22%. If you earn an extra $1,000 (say, a bonus), about $220 of it goes to federal income tax, and you keep about $780.

### Effective Tax Rate

Your **effective tax rate** is the average rate across all your income — total tax paid divided by total taxable income. Because lower brackets apply to the first portion of your income, your effective rate is always lower than your marginal rate.

Example for a single filer earning $60,000 (assume standard deduction of $15,000 → taxable income $45,000):

- First $11,925 × 10% = $1,192.50
- Next $33,075 × 12% = $3,969.00
- Total federal income tax: **$5,161.50**
- Effective rate: $5,161.50 ÷ $60,000 = **8.6%**

Even though this person's marginal rate is 12%, their effective rate is only 8.6% because the first chunk of their income is taxed at just 10%.

!!! mascot-thinking "Marginal vs. Effective Is the Most Useful Distinction in All of Taxes"
    <img src="../../img/mascot/thinking.png" class="mascot-admonition-img" alt="Sylvia thinking">
    You'll hear people say "I don't want a raise — it'll push me into a higher bracket and I'll take home less." That's a myth. Only the dollars inside the new bracket get the higher rate — the rest of your income is untouched. A raise always means more take-home pay. When in doubt, remember: marginal rate answers "what happens to my next dollar," effective rate answers "what's my overall tax burden."

#### Diagram: Marginal vs. Effective Tax Rate


<iframe src="../../sims/marginal-vs-effective-tax/main.html" width="100%" height="622px" scrolling="no"></iframe>
[Run Marginal vs. Effective Tax Rate Fullscreen](../../sims/marginal-vs-effective-tax/main.html)

<details markdown="1">
<summary>Marginal vs. Effective Tax MicroSim</summary>
Type: microsim
**sim-id:** marginal-vs-effective-tax<br/>
**Library:** p5.js<br/>
**Status:** Specified

An interactive MicroSim that shows how federal income tax is calculated bracket by bracket.

Controls:

- Income slider ($0 to $500,000, default $60,000)
- Filing status dropdown (Single, Married Filing Jointly, Head of Household)
- Year selector (2024, 2025)

Visualization:

- A vertical stacked bar on the left representing the user's taxable income, divided into color-coded segments by bracket (10%, 12%, 22%, 24%, 32%, 35%, 37%)
- A matching horizontal chart on the right showing the tax owed per bracket
- Two large readouts at the top: "Marginal Rate: X%" and "Effective Rate: Y%"
- A bar at the bottom shows "What you keep" vs "What you pay" with exact dollar amounts

As the user moves the income slider, the segments fill in and the readouts update live. Hovering any bracket shows the income range and dollars of tax in that bracket.

Canvas 900x550, responsive. Learning objective (Bloom: Analyzing): Students see concretely that marginal rate never equals effective rate (except at very low incomes) and understand how the progressive system works.

Implementation: p5.js with responsive layout and live calculation.
</details>

## Filing Your Taxes

### Tax Filing

**Tax filing** is the annual process of reporting your income to the IRS (and your state) and either paying any remaining tax owed or receiving a refund of what was over-withheld. For most people, the deadline is April 15 of the year after the income was earned — so 2025 income is filed by April 15, 2026.

You generally need to file a federal return if you:

- Earned more than the standard deduction ($15,000 for single filers in 2025)
- Had self-employment income of $400 or more
- Had any taxes withheld that you want refunded
- Owe special taxes (additional Medicare, early withdrawal penalties, etc.)

Even if you're not required to file, it often makes sense to do so — you might be owed a refund of withheld taxes, or eligible for refundable credits like the Earned Income Tax Credit.

**Ways to file:**

- **IRS Free File** — free software provided through IRS partners for most filers under certain income limits
- **Commercial software** — TurboTax, H&R Block, FreeTaxUSA, TaxSlayer (ranging from free to $100+)
- **IRS Direct File** — free government-run service (expanding to more states each year)
- **A professional tax preparer** — CPA or enrolled agent, worthwhile for complex situations
- **Paper filing** — mail a printed return (slowest option; refunds take weeks longer)

### Form 1040

**Form 1040** is the main federal tax return form for individuals. It's where all your income, deductions, credits, and payments come together to calculate whether you owe additional tax or are owed a refund. Modern tax software walks you through the equivalent questions and fills out the form behind the scenes — but it's still worth knowing what it contains.

The form's logic flows in a predictable sequence:

1. **Identify yourself and your filing status** — name, address, Social Security number, single/married/etc.
2. **Report all income** — W-2 wages, interest, dividends, capital gains, self-employment income
3. **Subtract deductions** — either the standard deduction or itemized deductions
4. **Calculate tax owed** using the brackets on your taxable income
5. **Subtract credits** that reduce tax owed dollar-for-dollar
6. **Subtract payments already made** through withholding or estimated taxes
7. **Refund or payment owed** — the final line tells you whether the IRS owes you or vice versa

For a first-time filer with one W-2 job and no unusual situations, the return takes 20–30 minutes in decent software.

## Deductions and Credits

This is the part of the tax system where people lose the most money by not understanding the rules. Deductions and credits do different jobs, and confusing them costs you real dollars.

### Tax Deductions

**Tax deductions** reduce your *taxable income* — the amount of income that gets run through the tax brackets. A $1,000 deduction doesn't save you $1,000 in tax; it saves you whatever your marginal rate is, multiplied by $1,000.

Example: you're in the 22% bracket. A $1,000 deduction saves you $1,000 × 22% = $220 in federal tax. Useful, but not dollar-for-dollar.

Common deductions include contributions to traditional 401(k) and IRA accounts, HSA contributions, student loan interest (up to $2,500/year), and the standard or itemized deduction we'll cover next.

### Standard Deduction

The **standard deduction** is a flat amount the IRS lets everyone subtract from their income without needing to justify any specific expenses. The 2025 amounts are:

| Filing Status | Standard Deduction (2025) |
|---|---|
| Single | $15,000 |
| Head of Household | $22,500 |
| Married Filing Jointly | $30,000 |

For the vast majority of filers — roughly 90% since the 2018 tax law changes — the standard deduction is larger than any itemized deductions they'd claim, so it's the right choice.

### Itemized Deductions

**Itemized deductions** are specific expenses you can deduct one by one instead of taking the standard deduction. You'd only itemize if your total allowable expenses are larger than the standard deduction. Common itemized deductions include:

- Mortgage interest (on home loans up to $750,000)
- State and local taxes (SALT, capped at $10,000)
- Charitable donations
- Medical expenses above 7.5% of income
- Casualty losses in federally declared disasters

For most young workers who rent and don't make large charitable contributions, itemizing wouldn't come close to the standard deduction. That usually changes once you own a home with significant mortgage interest, or earn a lot and donate generously.

### Tax Credits

**Tax credits** reduce your tax *owed* dollar-for-dollar, which makes them much more valuable than deductions of the same amount. A $1,000 credit saves you $1,000 regardless of your tax bracket.

| Feature | Deduction | Credit |
|---|---|---|
| What it reduces | Taxable income | Tax owed |
| Value of $1,000 | Bracket × $1,000 (e.g. $220 at 22%) | $1,000 |
| Examples | 401(k), IRA, student loan interest | Child Tax Credit, Saver's Credit, Education Credits |

Important credits for young adults:

- **Saver's Credit** — up to $1,000 for low-to-moderate earners who contribute to a retirement account
- **American Opportunity Credit** — up to $2,500/year for the first four years of college
- **Lifetime Learning Credit** — up to $2,000/year for continuing education
- **Earned Income Tax Credit (EITC)** — for low-to-moderate earners, refundable (can produce a refund even if you owe no tax)
- **Child Tax Credit** — $2,000 per qualifying child, partly refundable

**Refundable** credits can produce a refund even if you owe no tax; **nonrefundable** credits only reduce your tax to zero. The EITC is the most common refundable credit and is specifically designed to help lower-income workers.

## Tax Planning and Tax-Advantaged Accounts

### Tax Planning

**Tax planning** is the legal strategy of arranging your finances to minimize the taxes you owe over your lifetime. It's not tax evasion (which is illegal) — it's using the rules Congress wrote to reduce your bill. Everyone from low-wage workers to billionaires does it; the difference is how much they know about the rules.

Simple tax planning moves for young adults:

- **Contribute to a 401(k) up to the employer match** — your match is effectively an untaxed raise
- **Contribute to a Roth IRA** — pay taxes now at your low bracket, grow tax-free forever
- **Use an HSA if you have an HDHP** — triple tax advantage (deductible in, tax-free growth, tax-free out for medical)
- **Hold investments more than a year** — qualifies for lower long-term capital gains rates (see Chapter 5)
- **Contribute to traditional retirement accounts in high-income years** — lower your taxable income now
- **Bunch deductions** — if you're near the standard deduction threshold, doubling up charitable giving in alternating years can push you over the line

Tax planning isn't a once-a-year activity at filing time. The decisions you make in March — like whether to contribute to a Roth or traditional account — shape what you owe in April of the following year.

!!! mascot-tip "Sylvia's Tip: The Roth IRA Is Almost Too Good to Skip"
    <img src="../../img/mascot/tip.png" class="mascot-admonition-img" alt="Sylvia giving a tip">
    If you're young and in a low tax bracket, a Roth IRA is one of the best deals in the tax code. You pay a little tax now, and every dollar of future growth is tax-free forever. Even $50 a month starting in your first job compounds to real money by retirement. Open one at any major brokerage — there's no minimum at most of them.

### Tax-Advantaged Accounts

**Tax-advantaged accounts** are special accounts that reduce or eliminate taxes on contributions, growth, or withdrawals. There are three main flavors of tax advantage:

- **Tax-deferred** — contributions reduce your taxable income now; you pay taxes when you withdraw (e.g., Traditional 401(k), Traditional IRA)
- **Tax-exempt** — contributions are made with after-tax money; all growth and qualified withdrawals are tax-free (e.g., Roth IRA, Roth 401(k))
- **Triple tax-advantaged** — contributions deductible, growth tax-free, qualified withdrawals tax-free (e.g., HSA for medical expenses)

| Account | Contribution Limit (2025) | Tax Treatment | Best For |
|---|---|---|---|
| 401(k) | $23,500 (under 50) | Tax-deferred (traditional) or tax-exempt (Roth) | Employer-sponsored retirement, especially with match |
| Traditional IRA | $7,000 | Tax-deferred | Anyone without a 401(k); high earners today, lower earners in retirement |
| Roth IRA | $7,000 | Tax-exempt | Young adults, anyone in a low tax bracket now |
| HSA | $4,300 (self-only) | Triple tax-advantaged | Anyone with a high-deductible health plan |
| 529 Plan | Varies by state | Tax-free for qualified education expenses | College savings |

We'll dive deeper into retirement accounts in Chapter 12. The key takeaway for now: using these accounts is usually far more valuable than picking better investments. A mediocre fund in a Roth IRA often beats a brilliant fund in a taxable account because the tax drag is gone.

## Chapter Summary

Here are the most important ideas from this chapter:

**Gross vs. net income** — gross is what you earn before anything is taken out; net is what lands in your account. Budget around net, but think in terms of gross when making decisions like retirement contribution rates.

**Withholding is an estimate** — the W-4 tells your employer how much tax to take out each paycheck. A huge refund means you withheld too much; owing money means you withheld too little. Aim for roughly even.

**Three taxes pull from every paycheck** — federal income tax (progressive), state income tax (varies wildly by state), and FICA (flat 7.65% for Social Security and Medicare). Self-employed people pay FICA on both sides.

**Marginal ≠ effective** — your marginal rate is the rate on your next dollar of income; your effective rate is the average across all your income. Moving into a higher bracket never reduces total take-home pay.

**Filing is usually simpler than it sounds** — the W-2 has most of what you need, and modern tax software handles the form. File by April 15, and use free options when you qualify.

**Credits beat deductions** — a $1,000 credit saves you $1,000 in taxes. A $1,000 deduction saves you roughly $100–$370 depending on your bracket. Look for credits you qualify for, especially the Saver's Credit, EITC, and education credits.

**Tax-advantaged accounts are the best legal tax shelter** — 401(k), Roth IRA, HSA, and 529 plans each let you reduce taxes now, grow tax-free, or withdraw tax-free. Using them regularly is worth more than years of clever investing.

**Tax planning is legal and worth doing** — small decisions throughout the year (where to save, what to contribute, when to sell) have bigger lifetime effects than last-minute filing-day tricks.

Next, we'll look at insurance and risk management — how to protect yourself and your stuff so that one bad event can't undo years of careful planning.

!!! mascot-celebration "Well Done"
    <img src="../../img/mascot/celebration.png" class="mascot-admonition-img" alt="Sylvia celebrating">
    You just added another big acorn to your stash. You now know how to read a pay stub, fill out a W-4 sensibly, calculate your own marginal and effective tax rates, pick between the standard deduction and itemizing, and recognize when a credit is worth more than a deduction. That's more tax literacy than most working adults ever acquire.

## References

1. [Understanding Taxes - Your First Job](https://apps.irs.gov/app/understandingTaxes/teacher/whys_thm06_les02.jsp) - 2024 - IRS - Official IRS educational resource teaching students about tax responsibilities when starting their first job, focusing on Form W-4 completion, the pay-as-you-go withholding system, and maintaining financial records.
