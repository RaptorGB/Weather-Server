import {Forecast} from "../../src/forecasts/forecast.js";
import * as weather from "weather-js";
import {staticWeather} from "../static-resource/weather.json"; //Mock data

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
        forecast.getWeather(undefined, undefined, (err, result) => {
          expect(err).to.equal(expectedErrMsg);
        });
      });

      it("Return early when params are null", () => {
          forecast.getWeather(null, null, (err, result) => {
            expect(err).to.equal(expectedErrMsg);
          });
      });

      it("Return early when params are 0", () => {
        forecast.getWeather(0, 0, (err, result) => {
          expect(err).to.equal(expectedErrMsg);
        });
      });

      it("Return early when params are NaN", () => {
        forecast.getWeather(NaN, NaN, (err, result) => {
          expect(err).to.equal(expectedErrMsg);
        });
      });

    });

    describe("Weather.find callback result", () => {
      let stub;

      beforeEach(() => {
        forecast = new Forecast();
        stub = sinon.stub(weather, "find"); //Stub any callout to this method
        expectedErrMsg = "CallbackError";
      });

      afterEach(() => {
        forecast = null;
        stub.restore();
      });

      it("Tests getWeather returns json object", () => {
        stub.yields(null, staticWeather); //Mock test data
        forecast.getWeather("London, England", "C", (err, result) => {
          expect(result[0].name).to.equal(staticWeather[0].name);
          expect(result[0].degreetype).to.equal(staticWeather[0].degreetype);
        });
      });

      it("Tests getWeather callback throws an error", () => {
        stub.yields(expectedErrMsg);
        forecast.getWeather("London, England", "C", (err, result) => {
          expect(err).to.equal(expectedErrMsg);
        });
      });

    });

  });

});
