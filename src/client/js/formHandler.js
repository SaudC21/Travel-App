import { cordinatesHandler } from './geonamesAPI'

let cordinates = {}
let lat, lng
const destination = document.getElementById('destination');

async function getCordinates() {
    const response = await fetch('/getGeonamesAPI');
    try {
        const data = await response.json();
        return data;
    } catch (error) {
        console.log("ERORR", error);
    }
}

async function handleSubmit() {
    console.log(`
        Handlesubmit Method
    `)

    await cordinatesHandler()
    cordinates = await getCordinates()
    console.log(cordinates)
}

export { handleSubmit }