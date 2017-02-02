---
title: Part 3 - Designing the first View Controller
permalink: about-me-part3.html
sidebar: tutorials
---

Now that we're familiar with Autolayout and Interface Builder, we can start designing the first View Controller. It has a few labels in it by default, but you can delete them.

<p align="center"> <img src="../images/about-me/first view controller.png" align="center" style="max-width:300px"> </p>

We'll start by adding a `Label` to the View Controller. In the View Palette, you can search for "label" and then drag one onto the canvas. 

<p align="center"> <img src="../images/about-me/label.png" align="center" style="max-width:250px"> </p>
<p align="center"> <img src="../images/about-me/label in controller.png" align="center" style="max-width:500px"> </p>

### Our First Constraints

Before we go any farther, we want to add constraints to this label. We want it pinned to the top left corner, so we can add these constraints:

 * 20 pixels from the top
 * 20 pixels from the left
 
Notably, we don't have to tell the label what it's **size** should be. Since the label has a font size and a piece of text ("Label" at 17pt font by default), Autolayout knows how big it should be. This expected size is the label's **intrinsic size**. 

It's fairly straightforward to add these two constraints. At the bottom right of the canvas, there's a set of buttons to manage constraints:

<p align="center"> <img src="../images/about-me/constraint buttons.png" align="center" style="max-width:250px"> </p>

The second button from the left (the one that looks like a Tie Fighter) lets us add new constraints. Select the label and click this button.

<p align="center"> <img src="../images/about-me/adding label constraints.png" align="center" style="max-width:300px"> </p>

At the top of the popup, you can control the **Spacing to neaest neighbor**. Typing a value or clicking the dotted red arrow adds a new constraint relative to the closest neighbor in that direction.

In this case, we want to set the label to be 20 pixels from the top of the screen and 20 pixels from the left of the screen. Set those values and click *Add 2 Constraints* at the bottom.

<p align="center"> <img src="../images/about-me/label needs update.png" align="center" style="max-width:250px"> </p>

Back in the canvas, your label should have turned orange. This means that it's current frame in Interface Builder isn't correct based on the constraints you've specified. 

The dotted orange line is the frame your constraints specify. If you press the key command `Command-Option-Equals` **(⌘⌥=)**, the view's frame will update. It should snap in place and turn blue: 

<p align="center"> <img src="../images/about-me/label updated frame.png" align="center" style="max-width:200px"> </p>

Blue is good. It means your constraints are working correctly (as long as you see what you expect).

### Customizing the Label

With the label constrained, we can customize it however we want. Select the label and then visit the **Attributes Inspector** on the left.

<p align="center"> <img src="../images/about-me/customizing the label.png" align="center" style="max-width:300px"> </p>

You can set the text, font, and color to whatever you like. As you update the label's settins in the Attribute Inspector, the label should update accordingly. 

<p align="center"> <img src="../images/about-me/customized label.png" align="center" style="max-width:350px"> </p>

### Adding an Image and a Button

Below the label, drop an `Image View` and a `Button` into the View Controller (you can find them in the View Palatte by searching for "image" or "button"):

<p align="center"> <img src="../images/about-me/with image and button.png" align="center" style="max-width:300px"> </p>

These constraints are also pretty straightforward. We want the Image View and Button to be 20 pixels away from all of their neighbors. 

We can add these constraints to the Image View:

<p align="center"> <img src="../images/about-me/image view constraints.png" align="center" style="max-width:300px"> </p>

And we can add these constraints to the button:

<p align="center"> <img src="../images/about-me/button constraints.png" align="center" style="max-width:300px"> </p>

We specifically don't need to add a top constraint to the button. Since we already said *"the image view is 20 pixels above the button"*, it would be redundant to also say *"the button is 20 pixels below the image view"*.

With these constraints added and the frames updated *(⌘⌥=)*, your View Controller should look something like this:

<p align="center"> <img src="../images/about-me/first controller no image.png" align="center" style="max-width:300px"> </p>

Since the label and the button have text, the both have an **Intrinsic Size**. Since the image view is empty, it doesn't care what its size is. Autolayout will allow the label and button to be their natural size and the Image View will grow to fill the space in between.

In Part 4, we'll add an image to this Image View and finish up this View Controller.

#### [Part 4: Adding an Image](about-me-part4)