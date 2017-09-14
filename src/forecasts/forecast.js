import * as weather from "weather-js";

export class Forecast {

  getWeather(location, degreeType) {
    //Ensure values exist
    if(!degreeType || !location) return "Values undefined";

    weather.find({search: location, degreeType: degreeType}, function(err, result) {
      if(err) console.log(err);
      var json = JSON.stringify(result, null, 2);

      return json;
    });

  }

}
