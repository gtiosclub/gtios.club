---
layout: tutorial_pages
part: 7
title: Completed WeatherViewController
permalink: /weather-completed-part-7/
---

```swift
import UIKit
import CoreLocation

class WeatherViewController: UIViewController, CLLocationManagerDelegate {
    
    let locationManager = CLLocationManager()
    
    @IBOutlet weak var weatherLocation: UILabel!
    @IBOutlet weak var weatherDescription: UILabel!
    @IBOutlet weak var temperature: UILabel!
    @IBOutlet weak var weatherIcon: UILabel!
    
    
    @IBAction func refreshButtonPressed(_ sender: UIBarButtonItem) {
        locationManager.requestLocation()
    }

    
    //MARK: - Access the location
    
    override func viewDidLoad() {
        locationManager.delegate = self
        locationManager.requestWhenInUseAuthorization()
        locationManager.requestLocation()
    }
    
    func locationManager(_ manager: CLLocationManager, didUpdateLocations locations: [CLLocation]) {
        if let location = locations.first {
            let longitude = String(location.coordinate.longitude)
            let latitude = String(location.coordinate.latitude)
            
            DarkSkyService.weatherForCoordinates(latitude: latitude, longitude: longitude) { weatherData, error in
                
                if let weatherData = weatherData {
                    self.updateLabels(with: weatherData, at: location)
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
    
    func handleError(message: String) {
        let alert = UIAlertController(title: "Error Loading Forecast", message: message, preferredStyle: .alert)
        alert.addAction(UIAlertAction(title: "OK", style: .default, handler: nil))
        self.present(alert, animated: true, completion: nil)
    }
    
    
    //MARK: - Update the UI
    
    let emojiIcons = [
        "clear-day" : "☀️",
        "clear-night" : "🌙",
        "rain" : "☔️",
        "snow" : "❄️",
        "sleet" : "🌨",
        "wind" : "🌬",
        "fog" : "🌫",
        "cloudy" : "☁️",
        "partly-cloudy-day" : "🌤",
        "partly-cloudy-night" : "🌥"
    ]
    
    func updateLabels(with data: WeatherData, at location: CLLocation) {
        self.temperature.text = data.temperature
        self.weatherDescription.text = data.description
        self.weatherIcon.text = emojiIcons[data.icon] ?? "❓"
        
        CLGeocoder().reverseGeocodeLocation(location) { placemarks, error in
            let locationName = placemarks?.first?.locality ?? "Unknown Location"
            self.weatherLocation.text = locationName
        }
    }
    
}
```

<p></p>