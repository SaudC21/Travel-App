import { getApiKey, getApiCall, postFunction } from './requests'
import { getCordinates } from './formHandler'
import { dateDiffInDays } from '../index'
import 'regenerator-runtime/runtime'
let destination = document.getElementById('destination')
let cordinates, weatherObject
let weather = {
    description: 'notFound'
}

// Function to GET the remaining days from server side
async function getRemDays() {
    const response = await fetch('/getCountdown');
    try {
        const data = await response.json();
        return data;
    } catch (error) {
        console.log("ERORR", error);
    }
}

// This function will return the cordinates
async function getWeather(apiKey) {
    cordinates = await getCordinates()
    let remainingDays = await getRemDays()
    console.log(remainingDays)
    if (cordinates.latitude == 'notFound') {
        return weather
    } else {
        if (dateDiffInDays() < 8) {
            let apiCall = `https://api.weatherbit.io/v2.0/forecast/daily?lat=${cordinates.latitude}&lon=${cordinates.lngitude}&key=${apiKey.WEAHTERBIT_KEY}`;
            weatherObject = await getApiCall(apiCall)
            weather = weatherObject.data[0]
            return weather
        } else {
            let apiCall = `https://api.weatherbit.io/v2.0/forecast/daily?lat=${cordinates.latitude}&lon=${cordinates.lngitude}&key=${apiKey.WEAHTERBIT_KEY}`;
            weatherObject = await getApiCall(apiCall)
            weather = weatherObject.data[0]
            return weather
        }
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