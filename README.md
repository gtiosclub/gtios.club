## iOS Club gh-pages site

Jekyll site for hosting iOS tutorials.

### Critical Information:

Sidebar is configured in `_data/tutorials.yml`.

Images must be stores in `images/..`.

Every .md file should start with the following front-matter:
```
---
title: Part 1 - Creating your Xcode Project
permalink: calculator-part1.html
sidebar: tutorials
---
```

Permalinks cannot have subdirectories. `calculator/part1.html` is an invalid permalink.

Links to pages should be formatted as `[name](permalink)` aka `[Part 1](calculator-part1)`.