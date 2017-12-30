---
layout: tutorial_pages
part: 2
title: Creating your Note Object
permalink: /notes-part-2/
---

We're going to need an object to store information about our notes. Each note is going to have three parts:

1. A title
2. A body
3. A timestamp for when the note was last updated
   * This will be used for sorting the notes

In Xcode, create a new Swift file using `File -> New -> File` (or ⌘N). Hit next and name the file `Note.swift`.


#### The Note class
```swift
class Note {
    var title: String
    var body: String
    var lastUpdated: Date
    
    init(title: String, body: String, lastUpdated: Date) {
        self.title = title
        self.body = body
        self.lastUpdated = lastUpdated
    }
}
```

First, we defined a `Note` object with a `String` for the title and body and with a `Date` for the timestamp. 

Second, we create a basic initializer which assigns values to all of the properties. 

### Recap

You created a Note class with a title, body and timestamp.

[]({{ site.baseurl }}{% link tutorials/notes/part3.md %})
