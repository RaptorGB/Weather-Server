import {Forecast} from "../../src/forecasts/forecast.js";
import * as weather from "weather-js";
import {staticWeather} from "../static-resource/weather.json";

describe("Forecast", () => {
  let forecast;

  describe("getWeather", () => {
    let expectedErrorMessage;

    beforeEach(() => {
      forecast = new Forecast();
      expectedErrorMessage = "Values undefined";
    });

    afterEach(() => {
      forecast = null;
    });

    describe("with falsy params", () => {
      it("Return early when params undefined", () => {
        forecast.getWeather(undefined, undefined, (err, result) => {
          expect(err).to.equal(expectedErrorMessage);
        });
      });

      it("Return early when params are null", () => {
          forecast.getWeather(null, null, (err, result) => {
            expect(err).to.equal(expectedErrorMessage);
          });
      });

      it("Return early when params are 0", () => {
        forecast.getWeather(0, 0, (err, result) => {
          expect(err).to.equal(expectedErrorMessage);
        });
      });

      it("Return early when params are NaN", () => {
        forecast.getWeather(NaN, NaN, (err, result) => {
          expect(err).to.equal(expectedErrorMessage);
        });
      });

    });

    describe("When weather.find is called", () => {
      let weatherFind;

      beforeEach(() => {
        forecast = new Forecast();
        weatherFind = sinon.stub(weather, "find");
        expectedErrorMessage = "CallbackError";
      });

      afterEach(() => {
        forecast = null;
        weatherFind.restore();
      });

      it("Should return callback json result", () => {
        weatherFind.yields(null, staticWeather);
        forecast.getWeather("London, England", "C", (err, result) => {
          expect(result[0].name).to.equal(staticWeather[0].name);
          expect(result[0].degreetype).to.equal(staticWeather[0].degreetype);
        });
      });

      it("Should callback with error", () => {
        weatherFind.yields(expectedErrorMessage);
        forecast.getWeather("London, England", "C", (err, result) => {
          expect(err).to.equal(expectedErrorMessage);
        });
      });

    });

  });

});
