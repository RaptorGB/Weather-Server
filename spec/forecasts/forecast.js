import {Forecast} from "../../src/forecasts/forecast.js";
import * as weather from "weather-js";
import * as staticWeather from "../static-resource/weather.json";

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

    describe("Weather.find callback result", () => {
      let stub;

      beforeEach(() => {
        expectedErrorMessage = "CallbackError";
        stub = sinon.stub(weather, "find");
        console.log(stub);
      });

      afterEach(() => {
      stub.restore();
      });

      it("Tests getWeather returns json object", (done) => {
        stub.yields(null, staticWeather);
        forecast.getWeather("London, England", "C", (err, result) => {
          expect(result[0].name).to.equal(staticWeather[0].name);
          expect(result[0].degreetype).to.equal(staticWeather[0].degreetype);
          done();
        });
      });

      it("Tests getWeather callback throws an error", (done) => {
        stub.yields("fuck");
        forecast.getWeather("London, England", "C", (err, result) => {
          expect(err).to.equal(expectedErrorMessage);
          done();
        });
      });
    });
  });
});
