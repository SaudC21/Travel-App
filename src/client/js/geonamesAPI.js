let geonamesArray, geonamesObject, lat, lng
let destination = document.getElementById('destination');
let cordinates = {}

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
    if (destination.value == "") {
        alert('Please enter your destination')
    } else {
        const apiCall = `http://api.geonames.org/searchJSON?q=${destination.value}&maxRows=1&username=${userName}`;
        const response = await fetch(apiCall);
        try {
            const data = await response.json();
            return data;
        } catch (error) {
            console.log("error: ", error);
        }
    }
}

// Function to POST data to server
const postCordinates = async (url = '', data = {}) => {
    const response = await fetch(url, {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        credentials: 'same-origin', // include, *same-origin, omit
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data), // body data type must match "Content-Type" header       
    })
    try {
        const data = await response.json()
        return data
    } catch (error) {
        console.log('Error: ', error)
    }
}

// This function will return the cordinates
async function getCordinates(apiKey) {
    geonamesObject = await getApiCall(apiKey.GEONAMES_USERNAME)
    geonamesArray = geonamesObject.geonames[0]
    lat = geonamesArray.lat
    lng = geonamesArray.lng
    cordinates = {
        latitude: lat,
        lngitude: lng
    }
    return cordinates
}

async function cordinatesHandler() {
    try {
        getApiKey()
            .then(async function (apiKey) {
                return await getCordinates(apiKey)
            })
            .then(async function (data) { //To save the geonamesArray in the server
                return await postCordinates('/postGeonamesAPI', data)
            })
    } catch (error) {
        console.log("Error: ", error)
    }
}

export { cordinatesHandler }