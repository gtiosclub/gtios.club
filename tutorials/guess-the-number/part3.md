---
title: Part 3 - Generate Random Numbers
permalink: guess-the-number-part3.html
sidebar: tutorials
---

In order for this guessing game to work, we first need to have a number to guess! Go to ViewController.swift and add a function that will generate a random number called `generateRandomNumber`. Before we add any code to this function, we need to first add four variables that we will need for this game:

```swift
let lowerBound = 1
let upperBound = 100
var numberToGuess: Int!
var numberOfGuesses = 0
```
Now we can add the `generateRandomNumber` function to this file:

```swift
func generateRandomNumber() {
    numberToGuess = Int(arc4random_uniform(100)) + 1
}
```
With this function, we randomly generate a number within the range of 1-100 and assign the number to the variable `numberToGuess`. arc4random_uniform(N) is upperbound exclusive (0 - 99) so you need to add 1 to make 1 - 100.

While this is great, we need to make sure that at the start of the app, a random number is generated. In order to do that, we will call the function we just created in the already existing `viewDidLoad` function in `ViewController.swift` like so:

```swift
override func viewDidLoad() {
    super.viewDidLoad()
    generateRandomNumber()
}
```

The `viewDidLoad` function is called once when the view controller is loaded onto the app -- you could say its the main function of your view controller! Every `UIViewController` will have this function, so if you have any initial screen setup work to do, do it in `viewDidLoad`.

Now when the application launches, a number will randomly be generated and saved to `numberToGuess`! Let's continue by finally connecting our submit button to the Swift file!

### A Button for All: IBAction
An IBOutlet is a connected **variable** to a UI element. An IBAction is a connected **action/function** to a UI element. For a button, an IBAction is a function called when the button is pressed on the screen.

Just like we did for the label and the textfield in Part 2, control-click the button and drag it to `ViewController.swift` right below everything. In the pop-up screen, **change the connection type** from `Outlet` to `Action`. Go ahead and name the function `submitButtonPressed`.

<p align="center"> <img src="../images/guess-the-number/ibaction.png" align="center" style="max-width:300px"> </p>

After the IBAction function has been created, add two lines of code inside:

```swift
@IBAction func submitButtonPressed(_ sender: UIButton) {
    generateRandomNumber()
    print("\(numberToGuess)")
}
```

Your code should look like such: 

<p align="center"> <img src="../images/guess-the-number/endPart3.png" align="center" style="max-width:75%"> </p>

Run the app press the submit button. Your console should be outputting new randomly generated numbers every time! Dope.

### Next Time

Now we have successfully connected our button to our code through an `IBAction` connection! In the next part, we will work on the logic behind the game!

#### [Part 4: Writing the Game Logic](guess-the-number-part4)
