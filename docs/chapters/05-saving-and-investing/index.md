---
title: Saving and Investing
description: An introduction to risk, return, investment vehicles, compound interest, and portfolio construction for long-term wealth building
generated_by: claude skill chapter-content-generator
date: 2026-04-17 16:38:38
version: 0.07
---

# Saving and Investing

!!! mascot-welcome "Welcome to Chapter 5"
    <img src="../../img/mascot/welcome.png" class="mascot-admonition-img" alt="Sylvia waving welcome">
    A nut saved is a nut earned! In this chapter, you'll learn how to turn money you save into money that grows on its own. By the end, you'll know how to pick between stocks, bonds, and funds, how compound interest quietly does the heavy lifting, and how to build a simple portfolio you can actually stick with for decades.

## Summary

This chapter introduces the fundamentals of investing and building wealth through savings and investment vehicles. You'll learn about the relationship between risk and return, how to assess your own risk tolerance and investment time horizon, and the power of compound interest over time. The chapter covers major investment types including stocks, bonds, mutual funds, ETFs, and index funds, explaining the differences between active and passive investing strategies. You'll explore essential portfolio management concepts like asset allocation, diversification, and rebalancing, as well as practical strategies like dollar-cost averaging. The chapter also covers different investment account types and introduces tax implications including capital gains. Understanding these concepts is critical for building long-term wealth and achieving financial independence.

## Concepts Covered

This chapter covers the following 30 concepts from the learning graph:

79. Certificates of Deposit
80. Investment Fundamentals
81. Risk and Return
82. Risk Tolerance
83. Investment Time Horizon
84. Stock Market
85. Individual Stocks
86. Market Indices
87. Bonds
88. Fixed Income Securities
89. Treasury Bonds
90. Corporate Bonds
91. Municipal Bonds
92. Mutual Funds
93. Exchange-Traded Funds
94. Index Funds
95. Active vs Passive Investing
96. Expense Ratios
97. Compound Interest
98. Rule of 72
99. Dollar-Cost Averaging
100. Asset Allocation
101. Diversification
102. Portfolio Rebalancing
103. Market Volatility
104. Bull Market
105. Bear Market
106. Investment Account Types
107. Taxable Investment Accounts
108. Capital Gains

## Prerequisites

This chapter builds on concepts from:

- [Chapter 1: Foundational Financial Concepts](../01-foundational-financial-concepts/index.md) - Time value of money, assets and liabilities, financial goal setting
- [Chapter 2: Banking and Cash Management](../02-banking-and-cash-management/index.md) - Savings accounts and financial institutions
- [Chapter 3: Budgeting and Financial Planning](../03-budgeting-and-financial-planning/index.md) - Emergency funds and automatic savings

---

## From Saving to Investing

Saving and investing look similar from the outside — both involve setting money aside instead of spending it — but they do very different jobs. **Saving** keeps your money safe and available. **Investing** puts your money to work so it can grow faster than prices rise.

You need both. Savings cover short-term needs like emergencies, next year's car repair, or a deposit on an apartment. Investments cover long-term goals like retirement, a home down payment a decade away, or your future kids' college. A good rule: if you need the money in the next 3 years, keep it in savings. If you don't, consider investing it.

### Certificates of Deposit

A **certificate of deposit (CD)** is a savings product that pays a guaranteed interest rate in exchange for leaving your money alone for a fixed period — usually 3 months to 5 years. You deposit a lump sum, agree not to touch it, and the bank pays a higher rate than a regular savings account in return.

CDs bridge the gap between pure saving and real investing. They're federally insured up to $250,000 through the FDIC (banks) or NCUA (credit unions), so the principal can't lose value. The trade-off is access: pull the money out early and you'll pay a penalty that usually wipes out several months of interest.

When CDs make sense:

- You have a specific expense 1–3 years away (car, wedding, tuition payment)
- You want a better rate than a savings account without taking any market risk
- Interest rates are high and you want to lock one in

When they don't make sense:

- You might need the money on short notice — use a high-yield savings account instead
- You're saving for a goal more than 5 years away — investing will likely earn far more
- You're trying to fight inflation long-term — CD rates rarely keep up

### Investment Fundamentals

Investing means buying an asset with the expectation it will grow in value or generate income over time. The three most common asset classes for everyday investors are:

- **Stocks** — small ownership shares of a company
- **Bonds** — loans you make to a government or company that pay interest
- **Funds** — baskets that hold many stocks or bonds at once (mutual funds, ETFs, index funds)

The goal isn't to get rich quickly. The goal is to earn a return that beats inflation by a meaningful margin over many years. Historically, a diversified stock portfolio has returned around 7% per year after inflation. That sounds modest, but compounded over 40 years, it turns $5,000 into roughly $75,000 — without adding another dollar.

## Risk, Return, and You

### Risk and Return

The single most important principle in investing is that **risk and return are linked**. Investments that might pay more also might lose more. Investments that are safer pay less. There is no free lunch. Anyone promising high returns with no risk is either confused or lying.

Before we look at the risk-return spectrum, it helps to know what the endpoints mean. On the low end, we have cash and insured savings — the principal can't disappear, but the return barely beats inflation. On the high end, we have individual stocks — the company might double in value or go bankrupt.

#### Diagram: Risk-Return Spectrum


<iframe src="../../sims/risk-return-spectrum/main.html" width="100%" height="562px" scrolling="no"></iframe>
[Run Risk-Return Spectrum Fullscreen](../../sims/risk-return-spectrum/main.html)

<details markdown="1">
<summary>Risk-Return Spectrum Infographic</summary>
Type: interactive-infographic
**sim-id:** risk-return-spectrum<br/>
**Library:** p5.js<br/>
**Status:** Specified

A horizontal spectrum infographic showing investment types arranged by historical risk and expected return. The X-axis represents risk (low on left, high on right), and the Y-axis represents expected long-term annual return.

Plot points from left to right:

- Cash/Savings Account (risk 1, return 0.5%)
- High-Yield Savings (risk 1, return 4%)
- CDs (risk 2, return 4%)
- Treasury Bonds (risk 3, return 4%)
- Municipal Bonds (risk 4, return 4.5%)
- Corporate Bonds (risk 5, return 5.5%)
- Balanced Fund 60/40 (risk 6, return 7%)
- Stock Index Fund (risk 8, return 10%)
- Individual Stocks (risk 10, return 10% average, much higher variance)

Each point is a labeled circle. Hovering over a point displays a tooltip with a one-sentence definition, typical holding period, and historical best/worst annual return. A dashed line labeled "average inflation (~3%)" runs horizontally. A toggle button switches between "nominal return" and "real return (after inflation)" views.

Canvas 900x500 responsive to window resize. Learning objective (Bloom: Analyzing): Students compare asset classes and see that higher return expectations always come bundled with higher potential loss.

Implementation: p5.js with hover tooltips and responsive layout.
</details>

### Risk Tolerance

**Risk tolerance** is how much loss you can stomach without panicking and selling. It has two parts: how much volatility you can handle emotionally, and how much you can afford to lose financially. Both matter.

A quick test: imagine you invested $10,000 and six months later checked the balance to find $6,500. Do you:

- **A.** Calmly leave it alone, understanding that markets fluctuate
- **B.** Feel uneasy but hold on
- **C.** Pull it all out immediately to stop the bleeding

If you answered C, you have low risk tolerance — you'd sell at the worst possible moment and lock in the loss. You're better off with a more conservative mix that won't swing as hard.

!!! mascot-thinking "Risk Isn't About Losing Money — It's About Selling at the Bottom"
    <img src="../../img/mascot/thinking.png" class="mascot-admonition-img" alt="Sylvia thinking">
    A 30% drop only becomes a permanent loss when you sell. Historically, the market has recovered from every single crash — eventually. Your real risk as an investor is picking a strategy you won't stick with when things get ugly. A portfolio you'll hold through a bear market will beat a "better" portfolio you'll abandon in a panic.

### Investment Time Horizon

**Investment time horizon** is how long until you'll need the money. It's the single biggest factor in how aggressively you should invest. The longer your horizon, the more short-term losses you can absorb, because you have time to wait for recoveries.

Rough guidelines:

- **Less than 3 years:** Savings accounts, CDs. No stock exposure.
- **3–7 years:** Mix of bonds and conservative funds. Modest stock exposure.
- **7–15 years:** Mostly stocks, some bonds. Market dips have time to recover.
- **15+ years:** Heavy stock exposure. Time is your biggest advantage.

At 18, a dollar you invest for retirement has a ~50-year horizon. That's why starting early matters so much — even small amounts compound into large sums over decades.

## The Stock Market

### Stock Market

The **stock market** is the collection of exchanges where shares of publicly traded companies are bought and sold. In the U.S., the two largest are the New York Stock Exchange (NYSE) and the Nasdaq. When you hear "the market was up 1% today," people are usually referring to a market index (we'll define indices in a moment).

Three ideas will help you make sense of market news:

1. Stock prices reflect what investors collectively *expect* a company to earn in the future, not just what it's earning today
2. Short-term price moves are mostly noise — driven by news, mood, and trading algorithms
3. Long-term prices track actual business performance — companies that consistently grow profits tend to rise over years and decades

### Individual Stocks

An **individual stock** is a single share of ownership in one company. If Apple has about 15 billion shares outstanding and you own 10, you own roughly 0.00000007% of Apple. When Apple's business does well, your share is worth more; when it does poorly, less.

Individual stocks offer the possibility of large gains — and the possibility of total loss. Companies like Enron, Lehman Brothers, and Bed Bath & Beyond went from household names to zero within a few years. Even successful companies can decline painfully (Meta dropped 76% in 2022 before recovering).

For most young investors, picking individual stocks isn't the right first move. Studies consistently show that professional stock pickers underperform simple index funds over long periods. If a person who does it full-time can't beat the average, an amateur shouldn't expect to either.

!!! mascot-warning "Don't Start with Individual Stocks"
    <img src="../../img/mascot/warning.png" class="mascot-admonition-img" alt="Sylvia warning">
    It's tempting to buy one share of a brand-name company just because you know the name. But a portfolio of 3–5 stocks is a gamble, not a plan — one bankruptcy can wipe out years of gains. Start with a broad index fund that owns hundreds of companies at once. Once you have a solid foundation, you can allocate a small "play money" portion (under 5%) to individual picks if you enjoy it.

### Market Indices

A **market index** is a scorecard that tracks the performance of a group of stocks to represent a market or segment of it. The three you'll hear about most:

- **S&P 500** — the 500 largest U.S. companies. The most widely watched benchmark.
- **Dow Jones Industrial Average** — 30 large, established U.S. companies. Older and less representative, but commonly quoted.
- **Nasdaq Composite** — thousands of stocks listed on the Nasdaq exchange, heavy on technology.

You can't invest directly in an index, but you can buy a fund that tracks one. When someone says "I invest in the S&P 500," they almost always mean they own a fund that holds all 500 of those companies in roughly the same proportions as the index itself.

## Bonds and Fixed Income

### Bonds

A **bond** is a loan. When you buy a bond, you're lending money to a government or company for a set period — say, 10 years — in exchange for regular interest payments (called the **coupon**) and the return of your original loan (the **principal**) at the end.

Bonds are usually less volatile than stocks because the return is contractual: the issuer legally owes you the interest and principal. The main risks are:

- **Credit risk** — the issuer might fail to pay (default)
- **Interest rate risk** — if rates rise, existing bonds with lower rates drop in market value
- **Inflation risk** — a fixed-dollar interest payment buys less over time

### Fixed Income Securities

**Fixed income securities** is the broader term for investments that pay predictable, scheduled interest — bonds being the most common example. The "fixed" refers to the payment schedule, not the market value. If you hold a bond to maturity, you get exactly what was promised. If you sell early, the market price varies.

Now that you know what a bond is and what "fixed income" means, the following table compares the three main government-and-government-adjacent types you'll encounter.

| Type | Issuer | Typical Yield | Tax Treatment | Risk |
|---|---|---|---|---|
| Treasury Bonds | U.S. federal government | Low–moderate | No state/local tax on interest | Virtually no default risk |
| Municipal Bonds | State and local governments | Low | Interest often federally tax-free | Varies by issuer |
| Corporate Bonds | Companies | Moderate–high | Fully taxable | Varies from safe to risky |

### Treasury Bonds

**Treasury bonds** are debt issued by the U.S. federal government. They come in several flavors — Treasury bills (under 1 year), notes (2–10 years), and bonds (20–30 years) — but they're often grouped together as "Treasuries." Because they're backed by the full taxing power of the U.S. government, they're considered among the safest investments in the world.

Their interest is exempt from state and local income tax, which makes them particularly attractive in high-tax states. You can buy them directly from the government through TreasuryDirect.gov or through a brokerage account.

### Corporate Bonds

**Corporate bonds** are loans to companies. A corporation issues bonds to finance operations, expansions, or acquisitions, and pays interest to bondholders until the bonds mature. Because companies can go bankrupt, corporate bonds carry more risk than Treasuries — and therefore pay higher interest.

Corporate bonds are rated by agencies like Moody's and S&P. **Investment-grade** bonds (BBB/Baa and above) are considered relatively safe. **High-yield** or **junk** bonds (below BBB) pay more but carry real default risk.

### Municipal Bonds

**Municipal bonds** ("munis") are issued by state and local governments to fund things like schools, roads, and water systems. Their biggest appeal is that the interest is usually exempt from federal income tax, and if you buy bonds issued by your own state, often exempt from state tax too.

Because of the tax advantage, munis tend to pay lower headline interest rates than taxable bonds — but on an after-tax basis, they can come out ahead for higher earners. For most young adults in lower tax brackets, municipal bonds aren't usually the right fit yet.

## Mutual Funds, ETFs, and Index Funds

Buying individual stocks and bonds is a lot of work — and risky unless you spread your money widely. **Funds** solve this problem by pooling money from many investors and buying a basket of securities together. You buy a single share of the fund and instantly own a slice of everything inside.

Before we compare the three types, let's define each one in plain terms so the table that follows reinforces what you already know.

### Mutual Funds

A **mutual fund** is a professionally managed pool of money that buys a collection of stocks, bonds, or both. You send in your dollars, a fund company issues you shares, and the fund's manager makes the buy-and-sell decisions. Mutual funds price once per day, after the market closes.

### Exchange-Traded Funds

An **exchange-traded fund (ETF)** holds a basket of securities like a mutual fund but trades on an exchange like a stock, throughout the day. ETFs typically have lower costs than mutual funds and are more tax-efficient because of how their shares are created and redeemed.

### Index Funds

An **index fund** is a mutual fund or ETF designed to track a specific market index rather than beat it. An S&P 500 index fund simply holds all 500 stocks in the same proportions as the index and charges almost nothing for the service. Most investing experts — including legendary investors like Warren Buffett — recommend low-cost index funds as the default choice for long-term investors.

Here's how the three compare at a glance:

| Feature | Mutual Fund | ETF | Index Fund |
|---|---|---|---|
| How it trades | Once daily | Throughout the day | Either (mutual or ETF format) |
| Typical expense ratio | 0.5% – 1.5% | 0.03% – 0.5% | 0.03% – 0.20% |
| Minimum investment | Often $1,000+ | Price of one share | Often $0–$1,000 |
| Tax efficiency | Lower | Higher | Higher |

### Active vs. Passive Investing

**Active investing** tries to beat the market by picking winning stocks or timing the market. A fund manager researches companies, buys ones they believe are undervalued, and sells ones they think are overpriced. Active funds charge higher fees — typically 0.5% to 1.5% per year — to pay for that research.

**Passive investing** takes a different approach: give up trying to beat the market and simply match it by holding an index fund. Passive funds charge tiny fees (often under 0.10%) because there's no stock picking to pay for.

Over 20-year periods, roughly 85–90% of active funds underperform their benchmark index. The math is brutal: a 1% fee drag, compounded over 40 years, can reduce your final balance by more than 25%. Most of the time, less is more.

### Expense Ratios

An **expense ratio** is the annual fee a fund charges, expressed as a percentage of your balance. A 0.05% expense ratio means you pay $5 per year for every $10,000 invested. A 1% ratio means $100 per year.

That gap sounds small. It isn't. Compounded over decades, a 1% annual fee eats an enormous chunk of your returns. On a $10,000 investment growing at 7% for 40 years:

- At 0.05% expense ratio: ends around $147,000
- At 1.00% expense ratio: ends around $102,000

That's $45,000 in fees, paid in exchange for returns that are almost certainly worse than the low-cost fund. Fees are the one variable you can control — always prefer the lower expense ratio when comparing similar funds.

!!! mascot-tip "Sylvia's Tip: Check the Expense Ratio Before You Buy"
    <img src="../../img/mascot/tip.png" class="mascot-admonition-img" alt="Sylvia giving a tip">
    Every fund is legally required to publish its expense ratio. Before you put a single dollar in, look it up. If it's above 0.25%, ask why. A broad-market index fund should cost 0.10% or less — anything higher needs to justify itself with a better reason than "it's what my dad uses."

## The Power of Compounding

### Compound Interest

**Compound interest** is interest earned on both your original money and on the interest you've already earned. In year one, you earn interest on your deposit. In year two, you earn interest on your deposit *plus* last year's interest. In year three, you earn interest on all of that. The growth accelerates over time — slowly at first, then dramatically.

The formula for compound interest is:

\[ A = P(1 + r/n)^{nt} \]

Where:

- \( A \) is the final amount
- \( P \) is your starting principal
- \( r \) is the annual interest rate (as a decimal)
- \( n \) is the number of times interest compounds per year
- \( t \) is time in years

An example makes it concrete. You invest $5,000 at age 20 at 7% per year and never add another dollar:

- Age 30: ~$9,800
- Age 40: ~$19,300
- Age 50: ~$37,900
- Age 60: ~$74,600
- Age 70: ~$146,700

Your $5,000 turned into almost $147,000 — and the last decade alone added over $70,000. That's compounding's signature move: most of the growth happens at the end.

#### Diagram: Compound Interest Explorer


<iframe src="../../sims/compound-interest-explorer/main.html" width="100%" height="422px" scrolling="no"></iframe>
[Run Compound Interest Explorer Fullscreen](../../sims/compound-interest-explorer/main.html)

<details markdown="1">
<summary>Compound Interest MicroSim</summary>
Type: microsim
**sim-id:** compound-interest-explorer<br/>
**Library:** p5.js<br/>
**Status:** Specified

An interactive MicroSim that lets students explore how compound interest builds wealth over time.

Controls (top panel):

- Starting principal slider ($0 to $10,000, default $1,000)
- Monthly contribution slider ($0 to $500, default $100)
- Annual return slider (0% to 12%, default 7%)
- Time horizon slider (5 to 50 years, default 30)
- Toggle: "Show principal only" vs "Show principal + growth" (stacked area)

Visualization:

- X-axis is years, Y-axis is balance in dollars
- Stacked area chart showing cumulative contributions (bottom, blue) and investment growth (top, green)
- A readout displays final balance, total contributions, and total growth
- A second readout shows what the same contributions would produce in a 0.5% savings account, for comparison

Canvas 800x500, responsive to window resize. Learning objective (Bloom: Analyzing): Students manipulate time horizon and return rate to see how compounding dominates over decades and understand why starting early matters more than contributing more later.

Implementation: p5.js with live-updating chart.
</details>

### Rule of 72

The **Rule of 72** is a mental-math shortcut that tells you roughly how long it takes an investment to double at a given annual return. Divide 72 by the annual rate:

\[ \text{Years to double} \approx \frac{72}{\text{annual return }\%} \]

Examples:

- At 2%: 72 ÷ 2 = 36 years to double
- At 6%: 72 ÷ 6 = 12 years
- At 9%: 72 ÷ 9 = 8 years
- At 12%: 72 ÷ 12 = 6 years

This is useful for quick sanity checks. If someone promises to double your money in 2 years, the implied return is 72/2 = 36% per year — roughly three times the stock market's long-term average. That's almost always a red flag.

### Dollar-Cost Averaging

**Dollar-cost averaging (DCA)** is investing the same dollar amount at regular intervals — say, $200 every two weeks out of your paycheck — regardless of what the market is doing. When prices are high, your $200 buys fewer shares. When prices are low, it buys more. You end up with a better average cost than if you'd tried to time the market.

Dollar-cost averaging works because it removes emotion from the decision. You don't have to know whether the market is about to rise or fall — you just keep buying. Over time, this beats trying to guess tops and bottoms, which even professionals get wrong consistently.

The easiest way to do it: set up an automatic contribution from your paycheck or bank account into an index fund. You'll invest through good years and bad without thinking about it.

## Building a Portfolio

!!! mascot-encourage "You've Got This"
    <img src="../../img/mascot/encouraging.png" class="mascot-admonition-img" alt="Sylvia encouraging">
    Portfolio construction is the section where people tend to freeze up — there are a lot of knobs and no single right answer. That's okay. A reasonable portfolio you can explain in one sentence will outperform a "perfect" one you don't understand. Read this section twice if you need to; getting it roughly right is what matters.

### Asset Allocation

**Asset allocation** is how you divide your investments among major asset classes — mainly stocks and bonds, but also cash, real estate, and others. It's the single most important decision you'll make as an investor. Studies have found that asset allocation explains about 90% of the variation in portfolio returns. What specific stock or fund you pick matters far less than your overall mix.

A classic rule of thumb is "110 minus your age" in stocks, with the remainder in bonds. At age 20, that's 90% stocks, 10% bonds. At age 60, it's 50% stocks, 50% bonds. The logic: when you're young, you can ride out market dips and want growth. When you're older, you need stability because you're drawing on the money.

#### Diagram: Asset Allocation by Age


<iframe src="../../sims/asset-allocation-by-age/main.html" width="100%" height="562px" scrolling="no"></iframe>
[Run Asset Allocation by Age Fullscreen](../../sims/asset-allocation-by-age/main.html)

<details markdown="1">
<summary>Asset Allocation by Age Chart</summary>
Type: chart
**sim-id:** asset-allocation-by-age<br/>
**Library:** Chart.js<br/>
**Status:** Specified

A stacked bar chart with age groups on the x-axis (20, 30, 40, 50, 60, 70) and percent allocation on the y-axis (0%–100%).

Each bar is divided into three stacked segments:

- Stocks (green, bottom)
- Bonds (blue, middle)
- Cash / CDs (yellow, top)

Suggested allocations:

- Age 20: 90% stocks, 10% bonds, 0% cash
- Age 30: 85% stocks, 15% bonds, 0% cash
- Age 40: 75% stocks, 20% bonds, 5% cash
- Age 50: 65% stocks, 25% bonds, 10% cash
- Age 60: 50% stocks, 35% bonds, 15% cash
- Age 70: 40% stocks, 40% bonds, 20% cash

A radio selector switches between "Conservative," "Moderate," and "Aggressive" presets. Hovering any bar segment shows the percentage and a one-sentence rationale.

Canvas 700x450, responsive. Learning objective (Bloom: Applying): Students identify a reasonable starting allocation for their age and adjust based on risk tolerance.

Implementation: Chart.js stacked bar with responsive design.
</details>

### Diversification

**Diversification** is spreading your money across many different investments so no single failure can sink your portfolio. A single-stock portfolio lives and dies with one company. A 500-stock index fund portfolio can weather dozens of bankruptcies and still keep growing.

Diversification happens at several levels:

- **Across companies** — hold many stocks, not a few
- **Across industries** — tech, healthcare, consumer goods, energy
- **Across asset classes** — stocks, bonds, cash
- **Across geographies** — U.S. and international markets
- **Across time** — dollar-cost averaging

The beautiful thing about modern index funds is that they build most of this diversification for you. A single total-market fund instantly owns thousands of companies across every sector of the economy.

### Portfolio Rebalancing

**Portfolio rebalancing** is the practice of periodically restoring your portfolio to its target allocation. Say you decide on 80% stocks and 20% bonds. After a strong year for stocks, you might find yourself at 88% stocks and 12% bonds. Rebalancing means selling some stocks (or directing new contributions to bonds) to bring the mix back to 80/20.

Rebalancing does two useful things. First, it keeps your risk level in check — an unrebalanced portfolio drifts toward whatever's been growing fastest, which is often what's about to cool off. Second, it mechanically forces you to buy low and sell high: you're trimming what went up and buying what lagged.

Most investors rebalance once a year, or when any asset class drifts more than 5 percentage points from target. Some fund types (like target-date funds) rebalance automatically and are a great "set it and forget it" option.

## Understanding Market Behavior

### Market Volatility

**Market volatility** is how much prices swing up and down over short periods. A highly volatile market moves 2–3% per day; a calm market moves a fraction of that. Volatility often rises during uncertain times — recessions, geopolitical shocks, surprising earnings reports.

Volatility isn't the same as risk, though they're related. A long-term investor who doesn't plan to sell can shrug off daily volatility. For someone who needs the money next month, the same swings are a real problem. Your time horizon decides whether volatility matters to you.

### Bull Market and Bear Market

A **bull market** is a sustained period of rising stock prices, typically defined as a gain of 20% or more from a recent low. A **bear market** is the opposite — a drop of 20% or more from a recent high. The names come from how each animal attacks: bulls thrust upward with their horns, bears swipe downward with their paws.

Some perspective on how frequent each is:

- The U.S. stock market has been in a bull market roughly 75% of the time since 1950
- Average bull market: ~5 years, gains ~150%
- Average bear market: ~12 months, loses ~35%
- Bears always end, though they feel permanent at the time

The lesson isn't that bear markets are harmless — they hurt. The lesson is that long-term investors who stay invested through bear markets come out far ahead of those who panic and sell. Every bear in U.S. history has eventually been followed by a new bull that reached higher highs than the previous one.

## Investment Accounts and Taxes

### Investment Account Types

Where you hold your investments matters almost as much as what you invest in. The main **investment account types** are:

- **Taxable brokerage accounts** — no tax advantages, but full flexibility; you can withdraw anytime
- **Traditional IRA / 401(k)** — contributions reduce your taxes now; you pay tax on withdrawals in retirement
- **Roth IRA / Roth 401(k)** — contributions are taxed now; withdrawals in retirement are tax-free
- **HSA (Health Savings Account)** — triple tax-advantaged for medical expenses
- **529 plans** — tax-advantaged for education expenses

We'll cover retirement accounts in depth in Chapter 12. For now, the key idea is that tax-advantaged accounts grow faster because you're not paying taxes along the way. A Roth IRA is especially powerful for young adults because you're likely in a low tax bracket now and decades of growth will eventually be withdrawn tax-free.

### Taxable Investment Accounts

A **taxable investment account** (often called a "brokerage account") has no special tax treatment — you pay taxes on dividends and capital gains in the year they're earned. The upside is flexibility: you can deposit any amount, invest in almost anything, and withdraw at any time without penalty.

Taxable accounts are the right tool for:

- Goals that fall between "next year" and "retirement" — a home down payment, a sabbatical, starting a business
- Investing more than your annual retirement-account limits allow
- Building flexible long-term wealth outside of age-restricted accounts

### Capital Gains

A **capital gain** is the profit from selling an investment for more than you paid. If you bought a stock at $50 and sold at $80, your capital gain is $30 per share. Losses work the same way in reverse and can offset gains at tax time.

Capital gains come in two flavors, taxed very differently:

- **Short-term capital gains** — on investments held one year or less. Taxed as ordinary income (your regular tax bracket — up to 37% federal).
- **Long-term capital gains** — on investments held more than one year. Taxed at preferential rates of 0%, 15%, or 20% depending on your income.

The one-year rule is a big deal. Selling a stock at a $1,000 profit after 11 months could cost you $240+ in tax; selling the same stock a month later could cost you $0–$150. Holding for the long term is often more tax-efficient as well as less stressful.

## Chapter Summary

You now have the foundation of how investing works. Here are the big ideas:

**Saving vs. investing** — savings protect your short-term needs; investing grows your long-term wealth. Use CDs and high-yield savings for money you need in the next 1–3 years, and invest the rest.

**Risk and return are linked** — there's no such thing as high returns with no risk. Higher expected return always comes with higher potential loss, and your time horizon determines how much volatility you can afford to take on.

**Stocks, bonds, and funds** are the three main asset classes. Stocks give ownership and growth potential; bonds give loans with predictable interest; funds give instant diversification by bundling many securities into one package.

**Index funds beat most alternatives** — because active managers rarely beat their benchmarks after fees, a low-cost broad-market index fund is the best default for most long-term investors.

**Compounding is the engine** — starting early with modest amounts beats starting late with large amounts. The Rule of 72 gives a quick estimate of doubling time, and dollar-cost averaging lets you invest steadily without trying to time the market.

**Asset allocation and diversification** explain most of your returns. Pick a stock/bond mix appropriate for your age and risk tolerance, diversify broadly (an index fund does this for you), and rebalance annually.

**Market behavior is predictable in the long run, not the short** — bull markets dominate bear markets over decades, but bears feel permanent when they happen. Investors who stay the course outperform those who panic.

**Where you invest matters almost as much as what** — use tax-advantaged accounts like a Roth IRA first, then taxable accounts for flexibility. Hold investments more than a year to qualify for long-term capital gains rates.

Next, we'll look at how income and taxes work — how to read your paycheck, file a return, and use tax-advantaged accounts to keep more of what you earn.

!!! mascot-celebration "Well Done"
    <img src="../../img/mascot/celebration.png" class="mascot-admonition-img" alt="Sylvia celebrating">
    You just covered the same material that most adults never learn. You now know how to tell a stock from a bond from a fund, why expense ratios matter, how compounding turns small deposits into big piles of acorns, and how to build a portfolio that matches your age and goals. Time to stash that acorn — every little bit compounds.

## References

1. [How to Start Investing as a Teenager](https://www.fool.com/investing/how-to-invest/investing-for-teens/) - 2024 - The Motley Fool - Comprehensive guide providing teenagers and parents with a roadmap for beginning an investment journey, emphasizing compound interest as a powerful wealth-building tool and offering five key steps from learning basics to making first purchases.

2. [The Best Index Funds and How to Start Investing](https://www.nerdwallet.com/article/investing/how-to-invest-in-index-funds) - 2024 - NerdWallet - Educational article providing guidance on selecting index funds and beginning an investment journey with interactive navigation and tools to help users compare and understand index fund options.
