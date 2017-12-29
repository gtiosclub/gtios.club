---
layout: tutorial_pages
part: 6
title: Using CoreLocation
permalink: /weather-part-6/
---

We'll use **CoreLocation** to access the user's longitude and latitude. It's an iOS system framework, so no need to install it with CocoaPods. 

Before we can start using CoreLocation, we need to configure our app's privacy settings. We can't access the user's location without asking them first, and we only need to use their location when they have the app open. 

Open your app's `Info.plist`. You can add a new property by mousing over an existing property and clicking the plus button:

<p align="center"> <img src="../images/weather/default plist.png" align="center" height="140px"> </p>

You want to add the `Privacy - Location When In Use Usage Description` property. This tells our app that we want to be able to access the user's location. Set it to be a String and then add a value that describes why we need to access their location.

It should look something like this:

<p align="center"> <img src="../images/weather/final plist.png" align="center" height="110px"> </p>

### Requesting Authorization

Now that we're configured to use CoreLocation, we can go back to our `WeatherViewController`. We need to `import CoreLocation` and add a `CLLocationManager` property. 

We also need to turn our WeatherViewController into a `CLLocationManagerDelegate`. This way, the Location Manager can send us information.

```swift
import UIKit
import CoreLocation

class WeatherViewController: UIViewController, CLLocationManagerDelegate {
    
    let locationManager = CLLocationManager()
    
    ...
```

We need to actually tell this location manager to use our View Controller as its delegate. We can do that in a `viewDidLoad` method:

```swift
override func viewDidLoad() {
    locationManager.delegate = self
    locationManager.requestWhenInUseAuthorization()
}
```

We can also request in-use authorization. This prompts the user with the standard location-access dialog. If you run the app now, you should see this alert:

<p align="center"> <img src="../images/weather/permission%20dialog.png" align="center" height="500px"> </p>

Note how it includes that description we included in our `Info.plist`. Once you tap *Allow*, the app will authorized to access your location.

### Accessing the User's Location

We can ask CoreLocation to fetch the user's location by calling `locationManager.requestLocation()`. We want to do this when the app first launches and whenever the user presses the Refresh button. You want to add that line to `viewDidLoad` and `refreshButtonPressed`:

```swift
@IBAction func refreshButtonPressed(_ sender: UIBarButtonItem) {
    locationManager.requestLocation()
}

override func viewDidLoad() {
    locationManager.delegate = self
    locationManager.requestWhenInUseAuthorization()
    locationManager.requestLocation()
}
```

That function call doesn't actually give us the user's location, though. CoreLocation will pass the coordinates to the Location Manager's delegate, which happens to be our `WeatherViewController`.

Since our View Controller is a `CLLocationManagerDelegate`, we need to add methods for our request's success case and failure case:

```swift
func locationManager(_ manager: CLLocationManager, didUpdateLocations locations: [CLLocation]) {
        
}
    
func locationManager(_ manager: CLLocationManager, didFailWithError error: Error) {
    print(error)
}
```

The Location Manager will always call one of these methods after we call `locationManager.requestLocation()`.

### Using the Location

`locationManager(_:didUpdateLocations:)` gives us an array of `CLLocation` objects. We can take the first one of those and peel out the longitude and latitude:

```swift
if let location = locations.first {
    let longitude = String(location.coordinate.longitude)
    let latitude = String(location.coordinate.latitude)
    
}
```

Once we have the user's location, we can send the longitude and latitude to Dark Sky:

```swift
DarkSkyService.weatherForCoordinates(latitude: latitude, longitude: longitude) { weatherData, error in
    
    if let weatherData = weatherData {
        print(weatherData)
    }
    
    else if let error = error {
        print(error)
    }
    
}
```

### Error Handling

So far, we've just done `print(error)` whenever we had an error to worry about. This isn't very helpful for an actual user, so we need to add some sort of alert. We can write a method called `handleAlert` that presents a `UIAlertController`:

```swift
func handleError(message: String) {
    let alert = UIAlertController(title: "Error Loading Forecast", message: message, preferredStyle: .alert)
    alert.addAction(UIAlertAction(title: "OK", style: .default, handler: nil))
    self.present(alert, animated: true, completion: nil)
}
```

Using this method, we can add proper error handling to our methods:

```swift
func locationManager(_ manager: CLLocationManager, didUpdateLocations locations: [CLLocation]) {
    if let location = locations.first {
        let longitude = String(location.coordinate.longitude)
        let latitude = String(location.coordinate.latitude)
        
        DarkSkyService.weatherForCoordinates(latitude: latitude, longitude: longitude) { weatherData, error in
            
            if let weatherData = weatherData {
                print(weatherData)
            }
            
            else if let _ = error {
                self.handleError(message: "Unable to load the forecast for your location.")
            }
            
        }
    }
}

func locationManager(_ manager: CLLocationManager, didFailWithError error: Error) {
    handleError(message: "Unable to load your location.")
}
```

### Next Time

Now that we have a proper forecast for the user's location, we'll update the text labels to show the temperature, an emoji representing the weather, and the city name.

[]({{ site.baseurl }}{% link tutorials/weather/part7.md %})