import {Forecast} from "../../src/forecasts/forecast.js";

describe("Forecast", () => {
  let forecast;

  describe("getWeather", () => {
    let expectedErrMsg;

    beforeEach(() => {
      forecast = new Forecast();
      expectedErrMsg = "Values undefined";
    });

    afterEach(() => {
      forecast = null;
    });

    describe("with falsy params", () => {
      it("Return early when either params undefined", () => {
        expect(forecast.getWeather(undefined, undefined)).to.equal(expectedErrMsg);
      });

      it("Return early when params are null", () => {
          expect(forecast.getWeather(null, null)).to.equal(expectedErrMsg);
      });

      it("Return early when params are 0", () => {
        expect(forecast.getWeather(0, 0)).to.equal(expectedErrMsg);
      });

      it("Return early when params are NaN", () => {
        expect(forecast.getWeather(NaN, NaN)).to.equal(expectedErrMsg);
      });

    });

    describe("With valid params", () => { //Where are you running the function here? e.g. calling get weather?
      let callback;
      let json;
      let location = "London, England";
      let degreeType = "C";
      let errArg = 666;

      beforeEach(() => {
        forecast = new Forecast();
        json = require('../static-resource/weather.json'); //Maybe rename this to static weather resource

        callback = sinon.stub(forecast, "getWeather"); //This is not what you want to stub
        callback.withArgs(location, degreeType).returns(json); // Look at yields when testing the callback, you want to stub weather.find
      });

      afterEach(() => {
        forecast = null;
        callback.restore();
      });

      it("Returns weather info for location specified in celcius", () => { //This is not testing the get weather function
        let result = callback(location, degreeType);
        expect(result[0].location.name).to.equal(location);
        expect(result[0].location.degreetype).to.equal(degreeType);
      });

      it("Callback throws error with wrong data", () => { //This isn't testing the get weather function or callback
        expect(callback(errArg)).to.equal(errArg);
        callback.withArgs(errArg).throws(errArg);
      });

    });

  });

});
