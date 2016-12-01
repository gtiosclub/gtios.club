---
title: Part 4 - Writing the Game Logic
permalink: guess-the-number-part4.html
sidebar: tutorials
---

In the past three parts, we created our Xcode project and the interface for our game. Pressing the "Submit" button generates a random number, but that's not what we really want...In this part, we're going to write the logic of our game so we can know if a player made the right guess or not.

### submitButtonPressed

Up to this point, our `submitButtonPressed` function looks like this:

```swift
@IBAction func submitButtonPressed(_ sender: UIButton) {
    generateRandomNumber()
    print("\(numberToGuess)")
}
```
Let's change it so that when "Submit" is pressed, we can access the number that was entered. We already have an `IBOutlet` to our `UITextField` called `guessTextField`. Now all we need to do is get its text.

```swift
@IBAction func submitButtonPressed(_ sender: UIButton) {
    if let guess = guessTextField.text {
        if let guessInt = Int(guess) {
            numberOfGuesses = numberOfGuesses + 1
            print(guessInt)
        }
    }
}
```
Great! So now we know which number was entered. Let's now check if it is the winning number.

## validateGuess

Now that we are able to get the player's input from the `UITextField`, we want to check if the player made the right guess, or if the number was out of our bounds (1-100 inclusive). For this, we will write a function called `validateGuess` which will have one argument, an `Int`. We want to check 4 things: if the number is out of bounds, if the number is smaller than the number to guess, if the number is bigger than the number to guess, or if the number IS the number to guess.

```swift
func validateGuess(_ guess: Int) {
    if guess < lowerBound || guess > upperBound {
        print("Your guess should be between 1 and 100!")
    } else if guess < numberToGuess {
        print("Higher!")
    } else if guess > numberToGuess {
        print("Lower!")
    } else {
        print("You win!")
        numberOfGuesses = 0
        generateRandomNumber()
    }
}
```

## One more thing

We have our `validateGuess` function ready, now all we need to do is call it every time "Submit" is pressed. Replace the print call with `validateGuess(guessInt)`

```swift
@IBAction func submitButtonPressed(_ sender: UIButton) {
    if let guess = guessTextField.text {
        if let guessInt = Int(guess) {
            numberOfGuesses = numberOfGuesses + 1
            validateGuess(guessInt)
        }
    }
}
```

Run your app and try it! Your console should output the proper messages based on your text field input when you press submit.

### Next Time
The logic of our app looks great, but we need some way to notify the player that he or she has won, or that there is something wrong with their guess. We will do this by adding some alerts in part 5.

#### [Part 5: Adding Alerts](guess-the-number-part5)