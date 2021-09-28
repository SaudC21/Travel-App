import { cordinatesHandler } from './geonamesAPI'
import { weatherHandler } from './weatherBitAPI'
import { imageHandler } from './pixybayAPI'

let cordinates = {}
let lat, lng
const destination = document.getElementById('destination');

async function handleSubmit() {
    console.log(`
        Handlesubmit Method
    `)

    await cordinatesHandler()
    await weatherHandler()
    await imageHandler()
}

export { handleSubmit }