import * as weather from "weather-js";

export class Forecast {

  getWeather(location, degreeType, callback) {
    if(!degreeType || !location) return callback("Values undefined");

    weather.find({search: location, degreeType: degreeType}, function(err, result) {
      if(err) return callback(err);
      return callback(null, result);
    });
  }

}
