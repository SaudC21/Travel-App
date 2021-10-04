// Import the js file to test
import { weatherHandler } from "../src/client/js/weatherBitAPI";
// The describe() function
describe("Testing the URL validity", () => {
   // The test() function
   test("Testing the checkForName() function", () => {
      expect(weatherHandler).toBeDefined();
   })
});