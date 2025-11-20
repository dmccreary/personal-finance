# Personal Finance with AI

[![MkDocs](https://img.shields.io/badge/Made%20with-MkDocs-526CFE?logo=materialformkdocs)](https://www.mkdocs.org/)
[![Material for MkDocs](https://img.shields.io/badge/Material%20for%20MkDocs-526CFE?logo=materialformkdocs)](https://squidfunk.github.io/mkdocs-material/)
[![GitHub Pages](https://img.shields.io/badge/View%20on-GitHub%20Pages-blue?logo=github)](https://dmccreary.github.io/personal-finance/)
[![GitHub](https://img.shields.io/badge/GitHub-dmccreary%2Fpersonal--finance-blue?logo=github)](https://github.com/dmccreary/personal-finance)
[![Claude Code](https://img.shields.io/badge/Built%20with-Claude%20Code-DA7857?logo=anthropic)](https://claude.ai/code)
[![p5.js](https://img.shields.io/badge/p5.js-ED225D?logo=p5.js&logoColor=white)](https://p5js.org/)
[![License: CC BY-NC-SA 4.0](https://img.shields.io/badge/License-CC%20BY--NC--SA%204.0-lightgrey.svg)](https://creativecommons.org/licenses/by-nc-sa/4.0/)

## View the Live Site

Visit the interactive textbook at: **[https://dmccreary.github.io/personal-finance/](https://dmccreary.github.io/personal-finance/)**

## Overview

This is an AI-driven intelligent textbook on personal finance designed specifically for high school students in Minnesota, where passing a personal finance course is a graduation requirement. Built using MkDocs with the Material theme, it incorporates learning graphs, concept dependencies, interactive MicroSims (p5.js simulations), and AI-assisted content generation.

The textbook follows Bloom's Taxonomy (2001 revision) for learning outcomes and uses concept dependency graphs to ensure proper prerequisite sequencing. All content is generated and curated using Claude AI skills, making it a Level 2+ intelligent textbook with interactive elements that transform abstract financial concepts into engaging, hands-on learning experiences.

Whether you're a high school student learning personal finance for the first time, an educator looking for comprehensive course materials aligned with state standards, or a lifelong learner seeking to strengthen your financial literacy, this textbook provides practical, real-world financial knowledge with interactive tools that make complex concepts accessible and actionable.

## Site Status and Metrics

| Metric | Count | Link |
|--------|-------|------|
| **Chapters** | 12 | [View Chapters](https://dmccreary.github.io/personal-finance/chapters/) |
| **Concepts in Learning Graph** | 200 | [Learning Graph](https://dmccreary.github.io/personal-finance/learning-graph/) |
| **Glossary Terms** | 200 | [Glossary](https://dmccreary.github.io/personal-finance/glossary/) |
| **FAQ Questions** | 6 | [FAQ](https://dmccreary.github.io/personal-finance/faq/) |
| **Quiz Questions** | 120 | [Chapter Quizzes](https://dmccreary.github.io/personal-finance/chapters/) |
| **Diagrams** | 19 | - |
| **Equations** | 721 | - |
| **MicroSims** | 12 | [Interactive Simulations](https://dmccreary.github.io/personal-finance/sims/) |
| **Total Words** | 117,541 | - |
| **Hyperlinks** | 458 | - |
| **Equivalent Pages** | ~480 | - |

**Completion Status:** Approximately 75% complete (active content development phase)

## Key Features

### Comprehensive Coverage

Twelve chapters covering all essential personal finance topics required for Minnesota's graduation standards:

1. **Foundational Financial Concepts** - Core principles and terminology
2. **Banking & Cash Management** - Account types, checks, and cash flow
3. **Budgeting & Financial Planning** - Creating and maintaining budgets
4. **Credit & Debt Management** - Understanding credit scores and debt
5. **Saving & Investing** - Building wealth through smart strategies
6. **Income & Taxes** - Understanding paychecks and tax obligations
7. **Insurance & Risk Management** - Protecting against financial loss
8. **Major Purchases & Loans** - Homes, cars, and financing decisions
9. **Consumer Protection & Financial Security** - Fraud prevention and rights
10. **College & Education Planning** - Financing higher education
11. **Career Planning & Income** - Building earning potential
12. **Retirement & Long-term Planning** - Securing your financial future

### Interactive Learning Elements

- **12 MicroSims** - Interactive p5.js simulations including:
  - Compound Interest Visualizer
  - College Loan Payback Calculator
  - Active vs Indexed Funds Comparison
  - Social Security Crossover Analysis
  - FICO Score Spectrum Explorer
  - Inflation Rate Simulator
  - Interest Rate Impact Visualizer
  - Stock Market Historical Returns
  - US Treasury Bills Explorer
  - Yield Curve Analyzer

- **Learning Graph** - Visual concept dependency map with 200 interconnected concepts
- **Glossary** - ISO 11179-compliant definitions for all 200 key terms
- **Real-world Stories** - Case studies demonstrating financial principles in action

### AI-Powered Development

Built using Claude AI skills for:
- Learning graph generation with concept dependencies
- Chapter structure and content generation
- Glossary creation following ISO standards
- Quality metrics and validation
- Interactive simulation specifications

## Getting Started

### View the Published Site

The easiest way to use this textbook is to visit the live site:

**[https://dmccreary.github.io/personal-finance/](https://dmccreary.github.io/personal-finance/)**

### Clone and Build Locally

If you want to customize the content or run it locally:

#### Prerequisites

- Python 3.7 or higher
- Git

#### Installation

1. **Clone the repository:**

```bash
git clone https://github.com/dmccreary/personal-finance.git
cd personal-finance
```

2. **Install MkDocs and dependencies:**

```bash
pip install mkdocs
pip install mkdocs-material
```

3. **Build the site:**

```bash
mkdocs build
```

4. **Serve locally with live reload:**

```bash
mkdocs serve
```

Open your browser to `http://localhost:8000` to view the site.

#### Deploy to GitHub Pages

```bash
mkdocs gh-deploy
```

This will build the site and push it to the `gh-pages` branch.

### Using the Textbook

**Navigation:**
- Use the left sidebar to browse chapters and sections
- Click the search icon to search all content
- Each chapter includes quizzes and practice exercises (in development)

**Interactive MicroSims:**
- Access via the "MicroSims" section in the navigation
- Each simulation runs standalone in your browser
- Adjust parameters with sliders and controls to explore financial scenarios
- No installation or plugins required

**Learning Graph:**
- Visualize concept dependencies and relationships
- Click nodes to see concept details
- Understand prerequisite knowledge for advanced topics

## Repository Structure

```
personal-finance/
├── docs/                                    # MkDocs documentation source
│   ├── chapters/                            # Chapter content
│   │   ├── 01-foundational-financial-concepts/
│   │   │   ├── index.md                    # Chapter content
│   │   │   └── quiz.md                     # Chapter quiz
│   │   ├── 02-banking-and-cash-management/
│   │   │   ├── index.md
│   │   │   ├── quiz.md
│   │   │   └── regions-of-a-personal-check.md
│   │   └── ...                             # Additional chapters (3-12)
│   ├── sims/                                # Interactive p5.js MicroSims
│   │   ├── compound-interest-visualizer/
│   │   │   ├── index.html                  # Standalone simulation
│   │   │   ├── index.md                    # Documentation
│   │   │   └── metadata.json               # Dublin Core metadata
│   │   ├── learning-graph/                 # Learning graph visualization
│   │   ├── college-loan-payback/
│   │   ├── social-security-crossover/
│   │   └── ...                             # Additional MicroSims
│   ├── learning-graph/                      # Learning graph data
│   │   ├── learning-graph.csv              # Concept dependencies
│   │   ├── learning-graph.json             # vis-network format
│   │   ├── concept-list.md                 # Complete concept list
│   │   ├── quality-metrics.md              # Quality analysis
│   │   ├── book-metrics.md                 # Overall book metrics
│   │   └── chapter-metrics.md              # Chapter-by-chapter stats
│   ├── stories/                             # Real-world case studies
│   │   ├── passive-investing.md
│   │   └── selection-bias/
│   ├── prompts/                             # AI generation prompts
│   ├── resources/                           # Additional resources
│   │   └── mn-legislation.md               # Minnesota requirements
│   ├── img/                                 # Images and graphics
│   ├── css/                                 # Custom styling
│   ├── js/                                  # Custom JavaScript
│   ├── index.md                             # Home page
│   ├── course-description.md                # Course overview
│   ├── glossary.md                          # 200 ISO-compliant terms
│   ├── references.md                        # Curated references
│   ├── how-we-built-this-site.md           # Development process
│   ├── feedback.md                          # User feedback form
│   ├── license.md                           # License details
│   └── contact.md                           # Contact information
├── site/                                    # Generated site (not in git)
├── mkdocs.yml                               # MkDocs configuration
├── README.md                                # This file
└── LICENSE                                  # License file
```

## Reporting Issues

Found a bug, typo, or have a suggestion for improvement? Please report it:

**[GitHub Issues](https://github.com/dmccreary/personal-finance/issues)**

When reporting issues, please include:

- Description of the problem or suggestion
- Steps to reproduce (for bugs)
- Expected vs actual behavior
- Screenshots (if applicable)
- Browser/environment details (for MicroSims)

## Contributing

Contributions are welcome! This is an educational resource designed to help students learn personal finance, and improvements benefit everyone.

**Ways to contribute:**

- Report issues or suggest improvements
- Fix typos or improve explanations
- Create new MicroSims or interactive elements
- Add quiz questions or practice exercises
- Suggest additional real-world examples or stories
- Improve accessibility or mobile experience

To contribute:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/improvement`)
3. Make your changes
4. Test locally with `mkdocs serve`
5. Commit your changes (`git commit -m 'Add improvement'`)
6. Push to your branch (`git push origin feature/improvement`)
7. Open a Pull Request

## License

This work is licensed under the **[Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International License](https://creativecommons.org/licenses/by-nc-sa/4.0/)**.

**You are free to:**

- **Share** — copy and redistribute the material in any medium or format
- **Adapt** — remix, transform, and build upon the material

**Under the following terms:**

- **Attribution** — Give appropriate credit with a link to the original
- **NonCommercial** — No commercial use without permission
- **ShareAlike** — Distribute contributions under the same license

See [LICENSE](docs/license.md) for full details.

### Educational Use

This textbook is specifically designed for educational purposes. Teachers, students, and educational institutions are encouraged to use, adapt, and share this resource for non-commercial educational activities.

## Acknowledgements

This project is built on the shoulders of giants in the open source and educational communities:

- **[MkDocs](https://www.mkdocs.org/)** - Static site generator optimized for project documentation
- **[Material for MkDocs](https://squidfunk.github.io/mkdocs-material/)** - Beautiful, responsive theme with excellent search and navigation
- **[p5.js](https://p5js.org/)** - Creative coding library from Processing Foundation and NYU ITP
- **[vis-network](https://visjs.org/)** - Network visualization library for interactive learning graphs
- **[Claude AI](https://claude.ai)** by Anthropic - AI-assisted content generation and educational design
- **[GitHub Pages](https://pages.github.com/)** - Free hosting for open educational resources
- **[Python](https://www.python.org/)** community - Data processing and automation tools

Special thanks to:
- The State of Minnesota for requiring personal finance education
- Teachers and educators who provide feedback and suggestions
- Students who use this resource and help identify areas for improvement
- The open source community that makes projects like this possible

## Citation

If you use this textbook in your teaching, research, or curriculum development, please cite it as:

```
McCreary, D. (2025). Personal Finance with AI: An Interactive Intelligent Textbook.
GitHub. https://github.com/dmccreary/personal-finance
```

**BibTeX:**

```bibtex
@misc{mccreary2025personalfinance,
  author = {McCreary, Dan},
  title = {Personal Finance with AI: An Interactive Intelligent Textbook},
  year = {2025},
  publisher = {GitHub},
  url = {https://github.com/dmccreary/personal-finance},
  note = {AI-driven educational resource for high school personal finance}
}
```

## Contact

**Dan McCreary**

- **LinkedIn:** [linkedin.com/in/danmccreary](https://www.linkedin.com/in/danmccreary/)
- **GitHub:** [@dmccreary](https://github.com/dmccreary)
- **Website:** Via the [Contact Page](https://dmccreary.github.io/personal-finance/contact/)

Questions, suggestions, or collaboration opportunities? Feel free to connect on LinkedIn, open an issue on GitHub, or use the feedback form on the website.

---

**Note:** This is an active development project. Content is continuously being improved and expanded. Check the [book metrics](https://dmccreary.github.io/personal-finance/learning-graph/book-metrics/) for the latest status.
