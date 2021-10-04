import './styles/resets.scss'
import './styles/base.scss'
import './styles/footer.scss'
import './styles/form.scss'
import './styles/header.scss'
import { handleSubmit } from './js/formHandler'

const btnInput = document.getElementById('btnSubmit')
const departureDate = document.getElementById('departure')
const destination = document.getElementById('destination')
let today

// It returns the departure date diference with the current date
function countdown() {
    
    departureDate.setAttribute('min', today)
    console.log(departureDate.value)

    return countdown
}

// a and b are javascript Date objects
function dateDiffInDays(a, b) {
    const _MS_PER_DAY = 1000 * 60 * 60 * 24;

    // Discard the time and time-zone information.
    const utc1 = Date.UTC(a.getFullYear(), a.getMonth(), a.getDate());
    console.log(utc1)
    const utc2 = Date.UTC(b.getFullYear(), b.getMonth(), b.getDate());
    console.log(utc2)

    return Math.floor((utc2 - utc1) / _MS_PER_DAY);
}

function getDifference() {

    today = new Date()
    let dd = String(today.getDate()).padStart(2, '0')
    let mm = String(today.getMonth() + 1).padStart(2, '0') //January is 0!
    let yyyy = today.getFullYear()

    today = yyyy + '-' + mm + '-' + dd
    console.log(today)
    console.log(departureDate.value)
    // test it
    let difference = dateDiffInDays(new Date(today), new Date(departureDate.value));
    console.log(difference)
}

btnInput.addEventListener("click", async () => {
    // countdown()
    getDifference()
    if (destination.value == "") {
        alert('Please enter your destination')
    } else if (departureDate.value == "") {
        alert('Please enter your departure date')
    } else {
        handleSubmit()
        // getDifference()
    }
})