---
title: Part 5 - Parsing with SwiftyJSON
permalink: weather-part5.html
sidebar: tutorials
---

We have our forecast JSON from Dark Sky, but we want to parse that into a natural Swift object. We'll create a new file called `WeatherData.swift` and start it off with a simple struct:

```swift
import SwiftyJSON

struct WeatherData {
    
    var temperature: String
    var description: String
    var icon: String
    
}
```

In Swift, a struct is a special type of object. They're passed around by value instead of by reference and they have some performance benefits. They make a lot of sense for small objects like this `WeatherData`.

We want this object to be able to initialize itself from the JSON object returned by Alamofire. We can create a new initializer that starts to access the data:

```swift
init(data: Any) {
    let json = JSON(data)
}
```

The JSON object that we saw in the Alamofire response looked like this:

```
{
    currently = {
        apparentTemperature = "43.67";
        cloudCover = 0;
        dewPoint = "40.32";
        humidity = "0.8";
        icon = "clear-day";
        ozone = "289.27";
        precipIntensity = 0;
        precipProbability = 0;
        pressure = "1027.76";
        summary = Clear;
        temperature = "46.23";
        time = 1480048337;
        windBearing = 242;
        windSpeed = "5.18";
    };
    ...
}
```

Using SwiftyJSON, we can access individual properies by doing stuff like `json["currently"]["temperature"].float` or `json["currently"]["icon"].string`. 

In this initializer, we need to set a value for each of the WeatherData's properties. The SwiftJSON calls will return an optional value, so we'll need to provide default choices in case the value doesn't actually exist:

```swift
let currentWeather = json["currently"]

if let temperature = currentWeather["temperature"].float {
    self.temperature = String(format: "%.0f", temperature) + " ºF"
} else {
    self.temperature = "--"
}

self.description = currentWeather["summary"].string ?? "--"
self.icon = currentWeather["icon"].string ?? "--"
```

For the temperature, we access the numerical value and then convert it to a String. If the temperature doesn't exist, we give it a placeholder.

For the description and icon, we can use the shorthand nil-coalescing operator `??`. It has a mouthful of a name, but is very convenient. If the value on the left is nil / doesn't exist, it'll use the default value on the right. 

Your final `WeatherData` struct should look like this:

```swift
struct WeatherData {
    
    var temperature: String
    var description: String
    var icon: String
    
    init(data: Any) {
        let json = JSON(data)
        let currentWeather = json["currently"]

        if let temperature = currentWeather["temperature"].float {
            self.temperature = String(format: "%.0f", temperature) + " ºF"
        } else {
            self.temperature = "--"
        }

        self.description = currentWeather["summary"].string ?? "--"
        self.icon = currentWeather["icon"].string ?? "--"
    }
}
```

### Updating the network call

Now that we actually have a `WeatherData` object, we can update our `weatherForCoordinates` method. Open up the `DarkSkyService.swift` file again.

You want to change the completion handler to `(WeatherData?, Error?) -> ()` and the success case to `completion(WeatherData(data: result), nil)`. Now the function should look like this:

```swift
static func weatherForCoordinates(latitude: String, longitude: String, completion: @escaping (WeatherData?, Error?) -> ()) {
    
    let url = baseURL + apiKey + "/\(latitude),\(longitude)"
    
    Alamofire.request(url).responseJSON { response in
        switch response.result {
        case .success(let result):
            completion(WeatherData(data: result), nil)
        case .failure(let error):
            completion(nil, error)
        }
    }
    
}
```

If you run the app again, you should see it print out a WeatherData object: 
```
Optional(Weather_App.WeatherData(temperature: "45 ºF", description: "Clear", icon: "clear-day"))
```

## Next Time

Now that we can request a forecast for a location, we'll use CoreLocation to get the user's longitude and latitude.

#### [Part 6: Using CoreLocation](weather-part6)