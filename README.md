## iOS Club gh-pages site

Jekyll site for hosting iOS tutorials.

### Critical Information Regarding Redesign:

**Tutorials**
* Tutorial navbar is configured in `_data/tutorials/side-nav.yml`.
* Images must be stores in `images/..`.
* Every tutorial .md file should start with the following front-matter:
```
---
layout: tutorial_pages
part: ( enter tutorial part number here )
title: ( enter tutorial part title here )
permalink: ( /hyphenated main tutorial title followed by part and number/ )
---

# Example
---
layout: tutorial_pages
part: 2
title: Setting Up Your View
permalink: /guess-the-number-part-2/ # dont forget the leading and trailing /'s
---
```

* Local links (meaning links linking to other pages on the site) in .md files should be formatted like so:
```
[]({{ site.baseurl }}{% link tutorials/guess-the-number/part3.md %})

# where site.baseurl and link are keywords and everything following the link keyword
# is a path to the page you want to link to, starting at the root directory
```

* .md files that aren't part of a series (as in they are standalone pages and don't have a link to the next part) should end with an empty paragraph tag on a new line in order to format correctly
```
# Example
This is a stand alone .md file with no further links.
<p></p>
```