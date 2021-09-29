import { getApiKey, getApiCall, postFunction } from './requests'

let geonamesArray, geonamesObject, lat, lng, cityName, countryName
let destination = document.getElementById('destination');
let cordinates = {}

// This function will return the cordinates
async function getCordinates(apiKey) {
    const apiCall = `http://api.geonames.org/searchJSON?q=${destination.value}&maxRows=1&username=${apiKey.GEONAMES_USERNAME}`;
    geonamesObject = await getApiCall(apiCall)
    geonamesArray = geonamesObject.geonames[0]
    lat = geonamesArray.lat
    lng = geonamesArray.lng
    cityName = geonamesArray.name
    countryName = geonamesArray.countryName
    console.log(geonamesArray)
    cordinates = {
        latitude: lat,
        lngitude: lng,
        city: cityName,
        country: countryName
    }
    console.log(cordinates)
    return cordinates
}

async function cordinatesHandler() {
    try {
        let route = '/getApiKey'
        await getApiKey(route)
            .then(async function (apiKey) {
                return await getCordinates(apiKey)
            })
            .then(async function (data) { //To save the geonamesArray in the server
                return await postFunction('/postCordinates', data)
            })
    } catch (error) {
        console.log("Error: ", error)
    }
}

export { cordinatesHandler }