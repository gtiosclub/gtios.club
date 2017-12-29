---
layout: tutorial_pages
part: 7
title: Persistence
permalink: /notes-part-7/
---

### Intro to UserDefaults

UserDefaults (or NSUserDefaults when used in Objective-C) is a very simple way for iOS apps to store small amounts of data on the device. Due to its simplicity, UserDefaults can only store and retrieve data when identified by a String key and may only contain the following types: 

 * String
 * Data
 * Number
 * Date
 * Array (containing only the types in this list)
 * Dictionary (containing only the types in this list)

We want to save Note objects but unfortunetly Apple didn't design UserDefaults with our app in mind. That just means that we have to "serialize" our Note objects to types that UserDefaults can understand and "deserialize" them back into Note objects.

Vocab Cheat Sheet

 * Persistence - stays around after the program has stopped
 * Serialize - transform an object into a format which can be stored
 * Deserialize - extracting an object from a stored format

Open up NoteDatabase.swift and let's create an area for us to implement our persistence logic. Since this is separate from all of our other code, let's embed it it's own type.

```swift
class NoteDatabase {
    init() {
        notes = Persistence.load()
    }
    ...
    private func synchronize() {
        notes.sort(by: { $0.lastUpdated > $1.lastUpdated })
        Persistence.save(notes: notes)
    }
	 
     private struct Persistence {
        private static let key = "Notes.NoteDatabase.Key"
        static func save(notes: [Note]) {
        
        }
        
        static func load() -> [Note] {
        
        }
    }
}
```

Create 2 empty method calls for saving and loading Notes. We're going to call save every time we synchronize and load when the NoteDatabase is created. The `key` variable will be used to uniquely identify our notes.

### Saving notes to UserDefaults

```swift
static func save(notes: [Note]) {
    var data: [[String:Any]] = [] // 1
    for note in notes {
        let noteData: [String:Any] = ["title" : note.title, "body" : note.body, "lastUpdated" : note.lastUpdated] // 2
        data.append(noteData)
    }
    UserDefaults.standard.set(data, forKey: Persistence.key) // 3
}
```

##### Breakdown

1. Create an array to store the serialized notes
2. Convert the notes into a Dictionary using the keys "title", "body" and "lastUpdated" then add them to our array
3. Access the `standard` instance of UserDefaults and associated the serialized array of notes with the key we declared earlier.

### Loading notes from UserDefaults

```swift
static func load() -> [Note] {
    // 1
    let savedData = UserDefaults.standard.array(forKey: Persistence.key) as? [[String:AnyObject]] ?? []
    var array: [Note] = []
    for noteData in savedData {
        // 2
        if let title = noteData["title"] as? String,
            let body = noteData["body"] as? String,
            let lastUpdated = noteData["lastUpdated"] as? Date {
            // 3
            array.append(Note(title: title, body: body, lastUpdated: lastUpdated))
        }
    }
    return array
}
```

##### Breakdown

1. Retrieve the existing array of data from UserDefaults (or just use an empty array as a backup)
2. Iterate through the serialized data, attempt to extract the title, body and lastUpdated fields and cast them to the correct type
3. After you have deserialized the required fields create and save a Note object

Launch the app and you will see that your notes are saved even when you relaunch the app. 

### Recap
In this section you learned how to use UserDefaults to persist data across launches and how to serialize/deserialize custom objects.

At this point the Notes app is complete, congratulations. 😀
