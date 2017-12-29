# iOS Club gh-pages site

Jekyll site for hosting iOS tutorials.

## Critical Information Regarding Redesign

### Tutorials:
* Tutorial navbar is configured in `_data/tutorials/side-nav.yml`.
* Images must be stores in `images/..`.
* Every tutorial .md file should start with the following front-matter:
```
---
layout: tutorial_pages
part: (enter tutorial part number here)
title: (enter tutorial part title here)
permalink: /(hyphenated main tutorial title followed by part and number)/
---

# Example
---
layout: tutorial_pages
part: 2
title: Setting Up Your View
permalink: /guess-the-number-part-2/ 
---
```

* Local links (meaning links linking to other pages on the site) in .md files should be formatted like so:
```
[]({{ site.baseurl }}{% link tutorials/guess-the-number/part3.md %})

# where site.baseurl and link are keywords and everything following the link keyword
# is a path to the page you want to link to, starting at the root directory
```

* .md files that aren't part of a series (as in they are standalone pages and don't have a link to the next part) should end with an empty paragraph tag on a new line in order to format correctly.
```
# Example

This is a stand alone .md file with no further links.

<p></p>
```

* images in .md files will automatically by the right size. No need to declare a width/height anymore. However, if you want an image to be a particular size you can specify a size less than 350px in the image tag like so: `<img src="..." style="max-width:325px !important" />`

#### Schedules:
* The schedules file has been changed from markdown to JSON.
* Schedule data is configured in `_data/schedules/`
* Active schedule data is configured in current-schedule.json
* Schedule data should follow the following format:
```
{
    "semester": "term and year",
    "meetings": [
        {
            "date": "mm/dd",
            "subject": "Either the name of the app or No Meeting if there is no meeting",
            "description": "A description of the concepts being taught. If there is no meeting then a reason for why there is no meeting" 
        }
    ]
}

# For examples on formatting view past schedules on the website
```

* To move a schedule from active to past:
    * Open current-schedule.json
    * Copy the entire JSON structure starting from line 1
    * Open past-schedule.json
    * In the past-meetings array, paste the JSON structure you copied earlier as the first item in the array
    * Be sure to put a comma after pasting the JSON structure, to ensure that the past-meetings array remains comma separated

## Club Officers:
* Officer data is configured in `_data/officers/team.yml`.