---
title: Auto Loan Payback Calculator
description: Interactive simulation showing how loan term length affects monthly payments, total interest, and the underwater period when you owe more than the car is worth.
quality_score: 85
---

# Auto Loan Payback MicroSim

<iframe src="main.html" height="650" scrolling="no"></iframe>

[Run the Auto Loan Payback MicroSim](./main.html){ .md-button .md-button--primary }

[Edit the Auto Loan Payback MicroSim on the p5.js Editor](https://editor.p5js.org/)

## Sample iframe

Copy the text below directly into your course web page.

```html
<iframe src="https://dmccreary.github.io/finance-for-life/sims/auto-loan-payback/main.html" height="650" scrolling="no"></iframe>
```

## Purpose

Allow students to explore how loan term length affects monthly payments, total interest paid, and when they'll owe more than the car is worth.

## Learning Objective

**Analyzing** - Examine how different loan terms affect total costs and the relationship between loan balance and vehicle value over time.

## Key Insights

- **Shorter terms save thousands in interest** - A 36-month loan can save over $3,000 compared to a 72-month loan
- **Being underwater means you can't sell the car without bringing cash** - You owe more than the car is worth
- **If you can't afford a 4-year loan, you can't afford that car** - Financial advisors recommend 48-month maximum
- **72-month loans keep you in debt while the car loses value rapidly** - Avoid if possible

## Default Parameters

- Purchase price: $25,000
- Down payment: $2,500
- Loan amount: $22,500
- Interest rate: 7%
- Term: 60 months
- Depreciation: 20% first year, 15% per year thereafter

## Interactive Features

- Adjust purchase price, down payment, interest rate, and loan term
- View dual-axis graph showing loan balance vs car value over time
- See "underwater" periods highlighted in red when loan exceeds car value
- Compare all loan terms in a single table
- View warnings for risky loan parameters

## Calculations

### Monthly Payment Formula

```
PMT = P × [r(1+r)^n] / [(1+r)^n - 1]
```

where:
- P = principal (loan amount)
- r = monthly interest rate
- n = number of months

### Car Depreciation

- Month 0: Purchase price
- Month 12: 80% of purchase price (20% depreciation)
- Each year after: 85% of previous year value (15% depreciation)
- Monthly values are interpolated

## References

- [Edmunds Auto Loan Calculator](https://www.edmunds.com/calculators/auto-loan.html)
- [Consumer Reports: How Long Should Your Car Loan Be?](https://www.consumerreports.org/cars/car-financing/how-long-should-your-car-loan-be/)
- [NerdWallet: Auto Loan Calculator](https://www.nerdwallet.com/calculator/auto-loan-calculator)

## Lesson Plan

### Learning Objectives

After completing this activity, students will be able to:

1. **Analyze** how different loan terms affect monthly payments and total interest paid
2. **Evaluate** the relationship between loan balance and vehicle depreciation
3. **Apply** the monthly payment formula to real-world scenarios
4. **Identify** when a borrower becomes "underwater" on an auto loan

### Target Audience

High school students and young adults considering their first car purchase.

### Prerequisites

- Basic understanding of loans and interest
- Familiarity with percentages and basic algebra

### Activities

1. **Exploration**: Adjust sliders to find the shortest loan term that fits a $400/month budget
2. **Comparison**: Compare total interest paid for 36 vs 72 month loans
3. **Analysis**: Identify at what month the borrower is no longer underwater

### Assessment

- Calculate the total cost difference between a 4-year and 6-year loan
- Explain why financial advisors recommend a maximum 48-month term
- Describe what "underwater" means and why it matters
