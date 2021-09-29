import { cordinatesHandler } from './geonamesAPI'
import { weatherHandler } from './weatherBitAPI'
import { imageHandler } from './pixabayAPI'

let lat, lng

async function handleSubmit() {
    console.log(`
        Handlesubmit Method
    `)
    await cordinatesHandler()
    await weatherHandler()
    await imageHandler()
}

export { handleSubmit }