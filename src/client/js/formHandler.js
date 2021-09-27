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
    const apiCall = `http://api.geonames.org/searchJSON?q=${destination}&maxRows=1&username=${userName}`;
    const response = await fetch(apiCall);
    try {
        const data = await response.json();
        return data;
    } catch (error) {
        console.log("error: ", error);
    }
}

function getGeonamesArray () {
    try {
        getApiKey()
            .then(async function (apiKey) {
                geonamesObject = await getApiCall(apiKey.GEONAMES_USERNAME)
                geonamesArray = geonamesObject.geonames[0]
                console.log(geonamesArray)
                lat = geonamesArray.lat
                lng = geonamesArray.lng
                return geonamesArray
            })
    } catch (error) {
        console.log("Error: ", error)
    }
}

async function handleSubmit() {
    console.log(`
        Handlesubmit
    `)
    getGeonamesArray()
    
}
