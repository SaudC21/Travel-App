// Import the js file to test
import 'regenerator-runtime/runtime'
const req = require('supertest')
const app = require('../src/server/index')
// The describe() function
describe("Get", () => {
   // The it() function
   it("function ", async () => {
      const res = await req(app)
         .get('/getgeonamesAPIKey')
         .expect('saudc21')
   })
});