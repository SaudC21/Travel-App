import { handleSubmit } from './js/formHandler'

let GEONAMES_USERNAME
let geonamesArray, geonamesObject, lat, lng
const destination = document.getElementById('destination');

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
    console.log(destination)
    const apiCall = `http://api.geonames.org/searchJSON?q=${destination}&maxRows=1&username=${userName}`;
    const response = await fetch(apiCall);
    try {
        const data = await response.json();
        return data;
    } catch (error) {
        console.log("error: ", error);
    }
}

// Function to POST data to server
const postArticle = async (url = '', data = {}) => {
    const response = await fetch(url, {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        credentials: 'same-origin', // include, *same-origin, omit
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data), // body data type must match "Content-Type" header        
    });
}

function getGeonamesArray () { 
    try {
        console.log(destination)
        getApiKey()
            .then(async function (apiKey) {
                geonamesObject = await getApiCall(apiKey.GEONAMES_USERNAME)
                geonamesArray = geonamesObject.geonames[0]
                console.log(geonamesArray)
                lat = geonamesArray.lat
                lng = geonamesArray.lng
                return geonamesObject
            })
            .then(function (data) {
                console.log('Post data from client')
                postArticle('/postGeonamesAPI', data)
            })
    } catch (error) {
        console.log("Error: ", error)
    }
}

export { getGeonamesArray }