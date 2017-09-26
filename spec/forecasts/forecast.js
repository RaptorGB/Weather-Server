import {Forecast} from "../../src/forecasts/forecast.js";
import * as weather from "weather-js";
import * as staticWeather from "../static-resource/weather.json";

console.log("staticWeather>", staticWeather);
console.log("weather>", weather);

describe("Forecast", () => {

  describe("getWeather", () => {
    let forecast,
    expectedErrorMessage;

    beforeEach(() => {
      forecast = new Forecast();
      expectedErrorMessage = "Values undefined";
    });

    afterEach(() => {
      forecast = null;
    });

    describe("with falsy params", () => {
      it("Return early when either params undefined", (done) => {
        forecast.getWeather(undefined, undefined, (err, result) => {
          expect(err).to.equal(expectedErrorMessage);
          done();
        });
      });

      it("Return early when params are null", (done) => {
        forecast.getWeather(null, null, (err, result) => {
          expect(err).to.equal(expectedErrorMessage);
          done();
        });
      });

      it("Return early when params are 0", (done) => {
        forecast.getWeather(0, 0, (err, result) => {
          expect(err).to.equal(expectedErrorMessage);
          done();
        });
      });

      it("Return early when params are NaN", (done) => {
        forecast.getWeather(NaN, NaN, (err, result) => {
          expect(err).to.equal(expectedErrorMessage);
          done();
        });
      });
    });

    describe("When weather.find is called", () => {

      beforeEach(() => {
        forecast = new Forecast();
        sinon.stub(weather, "find");
        expectedErrorMessage = "CallbackError";
      });

      afterEach(() => {
        forecast = null;
        weather.find.restore();
      });

      it("should callback with the result", (done) => {
        weather.find.yields(null, staticWeather);
        forecast.getWeather("London, England", "C", (err, result) => {
          console.log("result>", result);
          console.log("err>", err);
          expect(result).to.equal(staticWeather);
          done();
        });
      });

      it("Should callback with error", (done) => {
        weather.find.yields(expectedErrorMessage);
        forecast.getWeather("London, England", "C", (err, result) => {
          expect(err).to.equal(expectedErrorMessage);
          done();
        });
      });
    });
  });
});
