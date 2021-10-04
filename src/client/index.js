import { postFunction } from './requests'
import './styles/resets.scss'
import './styles/base.scss'
import './styles/footer.scss'
import './styles/form.scss'
import './styles/header.scss'
import { handleSubmit } from './js/formHandler'
import { getCordinates } from './js/formHandler'
import 'regenerator-runtime/runtime'


const btnInput = document.getElementById('btnSubmit')
const departureDate = document.getElementById('departure')
const destination = document.getElementById('destination')
let today, remDays, weather, cordinates, imgURL
const cardContainer = document.getElementById('card-container')
const cityImg = document.getElementById('cityImg');
const destinationTitle = document.getElementById('desTitle');
const countdown = document.getElementById('countdown');
const weatherIcon = document.getElementById('weatherIcon');
const temp = document.getElementById('temp');
const description = document.getElementById('description');

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

// To get imgURL from server
async function getImgURL() {
    let response = await fetch('/getImgURL')
    try {
        const data = await response.json()
        return data;
    } catch (error) {
        console.log('ERROR: ', error)
    }
}

// Post remaining days to server


// To update to user interface for the user to see the information
async function updatUI() {
    console.log(`
        updatUI Method
    `)
    erase()
    weather = await getWeather()
    cordinates = await getCordinates()
    console.log(cordinates)
    imgURL = await getImgURL()
    console.log(imgURL)
    remDays = getDifference()
    await postFunction('/postCountdown', data)

    cardContainer.style = 'background-color: #778592;';
    cityImg.src = imgURL.url
    countdown.innerHTML = `Your Distination in ${remDays} days`
    description.innerHTML = weather.weather.description
    temp.innerHTML = `${Math.round(weather.temp)}°C`
    if (cordinates.city.length + cordinates.country.length <= 20) {
        destinationTitle.innerHTML = `${cordinates.city} ${cordinates.country}`
    } else {
        destinationTitle.innerHTML = `${cordinates.city} ${cordinates.countryCode}`
    }
}

function erase() {
    cardContainer.style = ``;
    cityImg.src = ``
    countdown.innerHTML = ``
    description.innerHTML = ``
    temp.innerHTML = ``
    destinationTitle.innerHTML = ``
}

// Here to handle any click for the button
btnInput.addEventListener("click", async () => {
    if (destination.value == "") {
        alert('Please enter your destination')
    } else if (departureDate.value == "") {
        alert('Please enter your departure date')
    } else {
        handleSubmit()
    }
})

export { updatUI }
