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

    describe("Weather.find callback result", () => {
      let stub;
      let weather = require("Weather-JS");
      let location = "London, England";
      let degreeType = "C";

      beforeEach(() => {
        // forecast = new Forecast();
        // stub = sinon.stub(forecast, "getWeather");
        stub = sinon.stub(weather, "find");
      });

      afterEach(() => {
        // forecast = null;
        stub.restore();
      });

      it("Tests callback weather.find returns weather JSON object with correct location and degree type", () => {
        let json = require('../static-resource/weather.json');
        // stub.yields([json]);
        stub.returns(json);

        // let result = forecast.getWeather(location, degreeType);
        let result = weather.find(location, degreeType, stub);

        expect(result[0].location.name).to.equal(location);
        expect(result[0].location.degreetype).to.equal(degreeType);
      });

      it("Tests callback weather.find throws an error", () => {
        let errMsg = "Error Thrown";
        // stub.yields(null, [errMsg]);
        stub.returns(errMsg);

        let result = weather.find();
        expect(result).to.equal(errMsg);
      });

    });

  });

});
