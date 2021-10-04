// Import the js file to test
import { imageHandler } from "../src/client/js/pixabayAPI";
// The describe() function
describe("Testing the URL validity", () => {
   // The test() function
   test("Testing the checkForName() function", () => {
      expect(imageHandler).toBeDefined();
   })
});