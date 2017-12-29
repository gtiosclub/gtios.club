---
layout: tutorial_pages
part: 1
title: Creating your Xcode Project
permalink: /notes-part-1/
---

In this tutorial you will be creating a notes app which has two screens:

1. A note list screen containing a tableview used to display a list of notes

<p align="center"> <img src="../images/notes/P1/screenshot1.png" height="300px" align="center"> </p>

2. A note list screen containing a text field and text view where notes can be created, edited, or viewed. 

<p align="center"> <img src="../images/notes/P1/screenshot2.png" height="300px" align="center"> </p>

First, create a new Xcode project the same way as in previous tutorials. 

1. Choose "Create a new Xcode project" from the main screen or "File -> New -> Project"
2. Choose "Single View Application" 
3. Product Options
  *	 Product Name - Notes
  *	 Language - Swift
  *	 Devices - Universal
  *	 Uncheck use Core Data/unit tests/ui tests

Next, we're going to delete some stuff that we no longer need.

1. Delete ViewController.swift
2. Open Main.storyboard and delete the only scene in the middle of the file.

### Recap

You set up your Xcode project and deleted some of the default files that we won't need. 

[]({{ site.baseurl }}{% link tutorials/notes/part2.md %})
