import {Forecast} from "../../src/forecasts/forecast.js";

describe("Forecast", () => {

  describe("getWeather", () => {
    let forecast, expectedErrMsg;

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

      it("Return early when second param undefined", () => {
        expect(forecast.getWeather(2, undefined)).to.equal(expectedErrMsg);
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

    /*1. do a new describe with something like with valid params
      2. Look at how to sub using sinon, stub weather.find
    3. For that to work you need to look at yielding on a stub in sinon, because yielding is used on callbacks which weather.find has*/

  });

});
