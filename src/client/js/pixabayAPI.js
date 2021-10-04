import { getApiKey, getApiCall, postFunction } from './requests'
import { getCordinates } from './formHandler'
import 'regenerator-runtime/runtime'

let destination = document.getElementById('destination');

let cordinates, PixabayObject

async function getImage(apiKey) {
    let apiCall = `https://pixabay.com/api/?key=${apiKey.PIXABAY_KEY}&q=${destination.value}&orientation=horizontal&category=buildings&per_page=3`;
    PixabayObject = await getApiCall(apiCall)
    if (PixabayObject.hits.length == 0) {
        cordinates = await getCordinates()
        apiCall = `https://pixabay.com/api/?key=${apiKey.PIXABAY_KEY}&q=${cordinates.country}&orientation=horizontal&category=buildings&per_page=3`;
        PixabayObject = await getApiCall(apiCall)
    }
    let imgformatURL = {
        url: PixabayObject.hits[0].webformatURL
    }
    return imgformatURL
}

async function imageHandler() {
    try {
        let route = '/getApiKey'
        await getApiKey(route)
            .then(async function (apiKey) {
                let imgURL = await getImage(apiKey)
                return imgURL
            })
            .then(async function (data) { //To save the geonamesArray in the server
                return await postFunction('/postImgURL', data)
            })
    } catch (error) {
        console.log("Error: ", error)
    }
}

export { imageHandler }