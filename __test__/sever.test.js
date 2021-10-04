// Import the js file to test
import { print } from "../src/server/index";
// The describe() function
describe("Testing printing on server side", () => {
   // The test() function
   test("Testing the print() function", () => {
      expect(print).toBeDefined();
   })
});