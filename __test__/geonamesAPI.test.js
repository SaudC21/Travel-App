// Import the js file to test
import { cordinatesHandler } from "../src/client/js/geonamesAPI";
// The describe() function
describe("Testing the URL validity", () => {
   // The test() function
   test("Testing the checkForName() function", () => {
      expect(cordinatesHandler).toBeDefined();
   })
});