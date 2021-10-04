// Import the js file to test
import { cordinatesHandler } from "../src/client/js/geonamesAPI";
// The describe() function
describe("Testing cordinatesHandler function", () => {
   // The test() function
   test("Testing the cordinatesHandler() function", () => {
      expect(cordinatesHandler).toBeDefined();
   })
});