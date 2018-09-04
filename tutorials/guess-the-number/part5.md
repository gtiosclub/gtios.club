---
layout: tutorial_pages
part: 5
title: Adding Alerts
permalink: /guess-the-number-part-5/
---

Our app is almost done. You can already play and enter guesses until you get the right number. However, you can't really see if you've won or if your guess is too high or too low. In this part of the tutorial, we will be adding some alerts, as well as updating our `guessLabel`, to notify the player on the state of the game.

### guessLabel

First, we want to make sure that our `guessLabel` changes when the player's guess is higher or lower than the number to guess. If the player's guess is higher, we'll ask for a lower number, and vice versa. Update your `validateGuess` function to look like this:

```swift
func validateGuess(_ guess: Int) {
    if guess < lowerBound || guess > upperBound {
        print("Your guess should be between 1 and 100!")
    } else if guess < numberToGuess {
        guessLabel.text = "Higher! ⬆️"
    } else if guess > numberToGuess {
        guessLabel.text = "Lower! ⬇️"
    } else {
        print("You win!")
        numberOfGuesses = 0
        generateRandomNumber()
    }
}
```   
As you can see, `guessLabel` will now show "Higher! ⬆️" or "Lower! ⬇️", depending on the player's input. This is because we have an `IBOutlet` connection to guessLabel, so anything we do in code for guessLabel will update on the UI. When you run your app and play, you will see something like this:

<p align="center"> <img src="../images/guess-the-number/lowerhigher.png" align="center" style="max-width:75%"> </p>

### UIAlertController

Now, we will be adding some alerts to warn players when they enter a guess lower than 1 or higher than 100, and to let them know when they've won. To do this, we will write two new helper functions: `showBoundsAlert` and `showWinAlert`.

```swift
func showBoundsAlert() {
    let alert = UIAlertController(title: "Hey!", message: "Your guess should be between 1 and 100!", preferredStyle: .alert)
    let action = UIAlertAction(title: "Got it", style: .default, handler: nil)
    alert.addAction(action)
    self.present(alert, animated: true, completion: nil)
}
```   
Now we can replace this line of code in `validateGuess`:

```swift
print("Your guess should be between 1 and 100!")
```   

with this line of code:

```swift
showBoundsAlert()
```  

We will do something similar for our `showWinAlert` function:

```swift
func showWinAlert() {
    let alert = UIAlertController(title: "Congrats! 🎉", message: "You won with a total of \(numberOfGuesses) guesses", preferredStyle: .alert)
    let action = UIAlertAction(title: "Play again", style: .default, handler: nil)
    alert.addAction(action)    
    self.present(alert, animated: true, completion: nil)
}
```

Replace `print("You win!")` with `showWinAlert()`.

As you can see, your win alert message also lets players know how many guesses they made until they got the right number. Your final `validateGuess` function will look like this:

```swift
func validateGuess(_ guess: Int) {
    if guess < lowerBound || guess > upperBound {
        showBoundsAlert()
    } else if guess < numberToGuess {
        guessLabel.text = "Higher! ⬆️"
    } else if guess > numberToGuess {
        guessLabel.text = "Lower! ⬇️"
    } else {
        // You win yay!
        showWinAlert()
        guessLabel.text = "Guess the Number" // reset the label before restart game
        numberOfGuesses = 0
        generateRandomNumber()
    }
    guessTextField.text = "" // reset textField after guess so you don't have to delete previous guess
}

```
When you run your app and play, you should see something like this:

<p align="center"> <img src="../images/guess-the-number/alerts.png" align="center" style="max-width: 75%"> </p>

### Recap
You created your very first iOS app, congrats!

You learned how to use Interface Builder, how to link your storyboard to your code, and how to create custom alerts.

If you have any feedback for this tutorial, contact us at iosgatech@gmail.com.
