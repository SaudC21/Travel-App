import { cordinatesHandler } from './geonamesAPI'
import { weatherHandler } from './weatherBitAPI'
import { imageHandler } from './pixybayAPI'
import moment from 'moment';

let cordinates = {}
let lat, lng
const departureDate = document.getElementById('departure')
const destination = document.getElementById('destination')

// It returns the departure date diference with the current date
function countdown () {
    let currentDate = moment().format('YYYY-MM-DD').split('-')
    let departDate = moment(departureDate).format('YYYY-MM-DD').split('-')
    console.log('current Date: ', currentDate)
    console.log('departure Date: ', departDate)

    // Get the difference
    let cDate = moment([
        Number(currentDate[0]),
        Number(currentDate[1]),
        Number(currentDate[2]) 
    ])
    let dDate = moment([
        Number(departDate[0]),
        Number(departDate[1]),
        Number(departDate[2]) 
    ])

    let countdown = dDate.diff(cDate, 'days')
    console.log(countdown)
    return countdown
}

async function handleSubmit() {
    console.log(`
        Handlesubmit Method
    `)
    countdown()
    await cordinatesHandler()
    await weatherHandler()
    await imageHandler()
}

export { handleSubmit }