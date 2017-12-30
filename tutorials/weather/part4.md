---
layout: tutorial_pages
part: 4
title: Reading from the Dark Sky API
permalink: /weather-part-4/
---

To get access to the current weather forecast, we'll be using Alamofire to access the **Dark Sky** Weather API. We'll encapsulate this functionality in its own class called `DarkSkyService`. Create and open a new file called `DarkSkyService.swift`.

Inside this class, you want to add string constants for the API's base URL and an API Key. You can get your own key [here](https://darksky.net/dev/register).

```swift
import Alamofire

public class DarkSkyService {
    
    private static let baseURL = "https://api.darksky.net/forecast/"
    private static let apiKey = "YOUR_API_KEY"
    
}
```

We'll also add a function called `weatherForCoordinates` that takes a latitude, a longitude, and can give back an object that contains the Weather Data. Since we don't have a special object for that yet, we'll just use the `Any` type for now.


Most functions would just return a value, but that doesn't work for asynchronous network calls. Instead we want to use a completion handler. This completion handler is a function that takes either a Weather Data object (`Any` for now) or an Alamofire Error object. We can express this as `(Any?, Error?) -> ()`.

Our function will take in two String objects and one `(Any?, Error?) -> ()` function:

```swift
static func weatherForCoordinates(latitude: String, longitude: String, completion: @escaping (Any?, Error?) -> ()) {

}
```

We have to mark the completion handler function as `@escaping` because we'll give it to Alamofire later. This will allow the function to "escape" its initial scope, which is not allowed by default.

### Calling the API

Before we can call the API, we need to build our request URL. A Dark Sky request looks like `https://api.darksky.net/forecast/(api-key)/(latitude),(longitude)`. 

For example, if you enter the URL `https://api.darksky.net/forecast/YOUR_API_KEY/37.7749,122.4194` in your web browser, you'll get the current forecast information for San Francisco.

We can build this URL by adding `let url = baseURL + apiKey + "\(latitude),\(longitude)"`.

Then we can fire off an Alamofire request like so:

```swift
Alamofire.request(url).responseJSON { response in
    switch response.result {
    case .success(let result):
        completion(result, nil)
    case .failure(let error):
        completion(nil, error)
    }
}
```

The `response` object is an enum with associated objects. It can either represent a Success and include a result, or represent a Failure and include an error. You can read more about the specifics of associated enum values in the [Swift Language Guide](https://developer.apple.com/library/content/documentation/Swift/Conceptual/Swift_Programming_Language/Enumerations.html#//apple_ref/doc/uid/TP40014097-CH12-ID148).

With these two pieces together, your function should look like this:

```swift
static func weatherForCoordinates(latitude: String, longitude: String, completion: @escaping (Any?, Error?) -> ()) {
    
    let url = baseURL + apiKey + "/\(latitude),\(longitude)"
    
    Alamofire.request(url).responseJSON { response in
        switch response.result {
        case .success(let result):
            completion(result, nil)
        case .failure(let error):
            completion(nil, error)
        }
    }
    
}
```

### Testing our function

Now we want to test our function and make sure everything works so far. Add this method to your `WeatherViewController.swift`:

```swift
override func viewWillAppear(_ animated: Bool) {
    DarkSkyService.weatherForCoordinates(latitude: "37", longitude: "122") { (response, error) in
        print("\(response)")
        print("\(error)")
    }
}
```

If you did everything right, you should see weather forecast at the bottom of your Xcode window:

```swift
Optional({
    currently =     {
        apparentTemperature = "43.67";
        cloudCover = 0;
        dewPoint = "40.32";
        humidity = "0.8";
        icon = "clear-day";
        ...
```

### Next Time

We have a functional network call. In the next part, we'll use **SwiftyJSON** to parse the forecast text into a Swift object.

[]({{ site.baseurl }}{% link tutorials/weather/part5.md %})