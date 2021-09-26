let GEONAMES_USERNAME, geoObject
const btnInput = document.getElementById('btnSubmit');

import './styles/resets.scss'
import './styles/base.scss'
import './styles/footer.scss'
import './styles/form.scss'
import './styles/header.scss'

// Function to GET the api key from server side
async function getApiKey() {
    const response = await fetch('/getApiKey');
    try {
        const data = await response.json();
        return data;
    } catch (error) {
        console.log("ERORR", error);
    }
}

// Function to fetch api data
async function getApiCall(userName) {
    const apiCall = `http://api.geonames.org/searchJSON?q=London&maxRows=1&username=${userName}`;
    const response = await fetch(apiCall);
    try {
        const data = await response.json();
        return data;
    } catch (error) {
        console.log("error: ", error);
    }
}

async function handleSubmit() {
    console.log(`
        Handlesubmit
    `)
    try {
        getApiKey()
            .then(function (apiKey) {
                geoObject = getApiCall(apiKey.GEONAMES_USERNAME)
                console.log(geoObject)
            })
    } catch (error) {
        console.log("invalid url", error)
    }
}

btnInput.addEventListener("click", async () => {
    handleSubmit()
})