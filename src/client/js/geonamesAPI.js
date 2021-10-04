import { getApiKey, getApiCall, postFunction } from './requests'

let geonamesArray, geonamesObject, lat, lng, cityName, countryName
let destination = document.getElementById('destination');
let cordinates = {
    latitude: 'notFound',
    lngitude: 'notFound',
    city: 'notFound',
    country: 'notFound'
}

// This function will return the cordinates
async function getCordinates(apiKey) {
    const apiCall = `http://api.geonames.org/searchJSON?q=${destination.value}&maxRows=1&username=${apiKey.GEONAMES_USERNAME}`;
    geonamesObject = await getApiCall(apiCall)
    if (geonamesObject.totalResultsCount == 0) {
        alert('Please re-enter a correct destination')
        return cordinates
    } else {
        geonamesArray = geonamesObject.geonames[0]
        console.log(geonamesArray)
        cordinates = {
            latitude: geonamesArray.lat,
            lngitude: geonamesArray.lng,
            city: geonamesArray.name,
            country: geonamesArray.countryName
        }
        return cordinates
    }
}

async function cordinatesHandler() {
    try {
        let route = '/getApiKey'
        await getApiKey(route)
            .then(async function (apiKey) {
                return await getCordinates(apiKey)
            })
            .then(async function (data) { //To save the geonamesArray in the server
                if (cordinates.city == 'notFound') {
                    await postFunction('/postCordinates', cordinates)
                    return
                } else {
                    return await postFunction('/postCordinates', data)
                }
            })
    } catch (error) {
        console.log("Error: ", error)
    }
}

export { cordinatesHandler }