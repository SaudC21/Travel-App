import { cordinatesHandler } from './geonamesAPI'
import { weatherHandler } from './weatherBitAPI'
import { imageHandler } from './pixabayAPI'
import { updatUI } from '../index'

let destination = document.getElementById('destination');
let departure = document.getElementById('departure');

// To get cordinates from server
async function getCordinates() {
    let response = await fetch('/getCordinates')
    try {
        const data = await response.json()
        return data;
    } catch (error) {
        console.log('ERROR: ', error)
    }
}

async function handleSubmit() {
    console.log(`
        Handlesubmit Method
    `)
    await cordinatesHandler()
    let cordinates = await getCordinates()
    if (cordinates.city == 'notFound') {
        return
    } else {
        await weatherHandler()
        await imageHandler()
    }    
    updatUI()
}

export { handleSubmit, getCordinates }