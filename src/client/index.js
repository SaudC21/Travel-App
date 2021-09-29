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
    today = new Date()
    let dd = String(today.getDate()).padStart(2, '0')
    let mm = String(today.getMonth() + 1).padStart(2, '0') //January is 0!
    let yyyy = today.getFullYear()

    today = yyyy + '-' + mm + '-' + dd
    departureDate.setAttribute('min', today)

    return countdown
}

countdown()

function getDifference() { // To-do Make the 'departureDate' format like this mm/dd/yyyy to subtract it from 'today'
    console.log(departureDate.value)
    const diffTime = Math.abs(departureDate - today)
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    console.log(diffTime + " milliseconds")
    console.log(diffDays + " days")
}

btnInput.addEventListener("click", async () => {
    if (destination.value == "") {
        alert('Please enter your destination')
    } else {
        handleSubmit()
        // getDifference()
    }
})