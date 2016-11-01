---
title: Part 6 - Populating your Table View Cells
permalink: table-view-part6.html
sidebar: tutorials
---

Now that we have a reference to the cell's label, we can customize it on-demand. We want to add a new method to the `ScoreCell` class that takes a person's name and can update the cell appropriately. Here's what we want:

```swift
func decorate(for name: String, in controller: ViewController) {
    let score = controller.scores[name] ?? 0
    self.label.text = "\(name): \(score)"
}
```

The function takes a name and the `ViewController` object in order to *decorate* the cell as desired. We could have passed in the score explicitly instead of using the `ViewController` as a middle-man, but this choice will come in handy later.

To take the function line-by-line:

```swift
let score = controller.scores[name] ?? 0
```

This line uses the `controller` argument to access the View Controller's `scores` dictionary. `scores[name]` returns the score associated with the given name. Accessing a value from a dictionary returns an Optional, though, because it's possible that the name doesn't exist in the dictionary. In that case, `scores[name]` would return `nil`. Adding `?? 0`, the *nil-coalescing operator*, applies a default value whenever the value to the left is `nil`.

To sum it up in one sentence, the line either retrieves the score associated with the name or uses 0 if that name doesn't exist in the `scores` dictionary.

```swift
self.label.text = "\(name): \(score)"
```

This line builds the string we want to display on the label. The `\( )` is Swift's special *String Interpolation* syntax, which allows you to insert variables into strings. This could have been done with `name + ": " + String(score)`, but string interpolation is more *~swifty~*.

### Using the `decorate` method

Now that the `ScoreCell` is customizable, we can revisit the `cellForRowAtIndexPath` method. We'll rewrite it to look like this:

```swift
func tableView(_ tableView: UITableView, cellForRowAt indexPath: IndexPath) -> UITableViewCell {
    let cell = tableView.dequeueReusableCell(withIdentifier: "score", for: indexPath) as! ScoreCell
    
    let row = indexPath.row
    let name = Array(scores.keys)[row]
    cell.decorate(for: name, in: self)
    
    return cell
}
```

Again, we'll take a line-by-line look:

```swift
let cell = tableView.dequeueReusableCell(withIdentifier: "score", for: indexPath) as! ScoreCell
```

This line is mostly the same as what we had before, but there's two differences. First off, we save a reference to the cell so that we can do `cell.decorate` later. The `as! ScoreCell` is crucial, though. The `dequeueReusableCell` function returns a `UITableViewCell` object, but we can only access the `decorate` method on a `ScoreCell` object. 

We have to up-cast the cell to a `ScoreCell`. We know that our cell with the `score` identifier will always be a `ScoreCell`, but that's not enough for the compiler. Marking the cast with an `as!` tells the compiler to ignore the possibility that the cell might not be a `ScoreCell`. This lets us not have to worry about unwrapping an optional. *`as!` is an unsafe operation and will crash your app if it fails, but it's safe to use in this context because we know it should always succeed.*

```swift
let row = indexPath.row
```

An `NSIndexPath` is a small object that contains a `section` and a `row`. Table Views can have multiple sections, but our table view only has one. We get the `row` from the `indexPath` and save it for the next line.

```swift
let name = Array(scores.keys)[row]
```

On this line, we grab a name out of the `scores` dictionary. The problem with dictionaries, though, is that they're inherently unordered. `Arrays(scores.keys)` converts our unordered dictionary `["Cal" : 0, "Brian" : 0, "Komal" : 0]` into an explicitly ordered array, `["Cal", "Brian", "Komal"]`. The order of the array's elements will be arbitrary, but it's good enough for this app. Once we have an array, we can access the n-th item through standard array-accessor syntax.

```swift
cell.decorate(for: name, in: self)
```

This line is where we pull it all together. We actually call the `decorate` method on our `Score Cell`, passing the name and the `ViewController` as expected.

```swift
return cell
```

After we've populated the cell with content, we `return` it so the Table View can start using it.

### Checking our progress

If you run the app in the simulator, the rows should actually match the dictionary now:

<p align="center"> <img src="../images/table-view/P6/screenshot1.png" height="450px" align="center"> </p>

And if you update the dictionary to something like `var scores = ["Cal" : 1, "Brian" : 5, "Komal" : 2, "Kevin" : 3, "Luke" : 0, "Tim" : 4, "Steve" : 6, "Bill" : 0]`, you should see the changes reflected when you re-run the app:

<p align="center"> <img src="../images/table-view/P6/screenshot2.png" height="450px" align="center"> </p>

### Recap

You wrote a `decorate` function that lets the `ViewController` populate individual cells with content.

### Next Time

We'll wrap up by implementing the add and subtract buttons.

#### [Part 7: Adding User Interaction](../part7)