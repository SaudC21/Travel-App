import { getApiKey, getApiCall, postFunction } from './requests'
import { getCordinates } from './formHandler'

let cordinates, weatherObject
let weather = { 
    description: 'notFound'
}

// This function will return the cordinates
async function getWeather(apiKey) {
    cordinates = await getCordinates()
    if (cordinates.latitude == 'notFound') {
        return weather
    } else {
        let apiCall = `https://api.weatherbit.io/v2.0/forecast/daily?lat=${cordinates.latitude}&lon=${cordinates.lngitude}&key=${apiKey.WEAHTERBIT_KEY}`;
        weatherObject = await getApiCall(apiCall)
        weather = weatherObject.data[0]
        return weather
    }
}

async function weatherHandler() {
    try {
        let route = '/getApiKey'
        await getApiKey(route)
            .then(async function (apiKey) {
                return await getWeather(apiKey)
            })
            .then(async function (data) { //To save the geonamesArray in the server
                if (data.description == 'notFound') {
                    await postFunction('/postweather', data)
                    return
                } else {
                    return await postFunction('/postweather', data)
                }
            })
    } catch (error) {
        console.log("Error: ", error)
    }
}

export { weatherHandler }