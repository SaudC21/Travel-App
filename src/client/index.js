import './styles/resets.scss'
import './styles/base.scss'
import './styles/footer.scss'
import './styles/form.scss'
import './styles/header.scss'
import { handleSubmit } from './js/formHandler'

const btnInput = document.getElementById('btnSubmit')
const departureDate = document.getElementById('departure')
const destination = document.getElementById('destination')
let today, remDays, weather

// a and b are javascript Date objects
function dateDiffInDays(a, b) {
    const MS_PER_DAY = 1000 * 60 * 60 * 24;

    // Discard the time and time-zone information.
    const utc1 = Date.UTC(a.getFullYear(), a.getMonth(), a.getDate());
    const utc2 = Date.UTC(b.getFullYear(), b.getMonth(), b.getDate());

    return Math.floor((utc2 - utc1) / MS_PER_DAY);
}

// This function to get the number of days difference between two dates
function getDifference() {

    today = new Date()
    let dd = String(today.getDate()).padStart(2, '0')
    let mm = String(today.getMonth() + 1).padStart(2, '0') //January is 0!
    let yyyy = today.getFullYear()

    today = yyyy + '-' + mm + '-' + dd
    // test it
    let difference = dateDiffInDays(new Date(today), new Date(departureDate.value));
    return difference
}

// Here to handle any click for the button
btnInput.addEventListener("click", async () => {
    if (destination.value == "") {
        alert('Please enter your destination')
    } else if (departureDate.value == "") {
        alert('Please enter your departure date')
    } else {
        handleSubmit()
        updatUI()
    }
})

// To get weather from server
async function getWeather() {
    let response = await fetch('/getWeather')
    try {
        const data = await response.json()
        return data;
    } catch (error) {
        console.log('ERROR: ', error)
    }
}


// To update to user interface for the user to see the information
function updatUI() {
    
}