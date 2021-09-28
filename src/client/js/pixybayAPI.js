import { getApiKey, getApiCall, postFunction } from './requests'
let destination = document.getElementById('destination');

async function getImage(apiKey) {
    const apiCall = `https://pixabay.com/api/?key=${apiKey.PIXYBAY_KEY}&q=${destination.value}&orientation=horizontal&category=buildings&per_page=3`;
    let PixybayObject = await getApiCall(apiCall)
    let imgformatURL = {
        url: PixybayObject.hits[0].webformatURL
    }
    return imgformatURL
}

async function imageHandler() {
    try {
        let route = '/getApiKey'
        await getApiKey(route)
            .then(async function (apiKey) {
                return await getImage(apiKey)
            })
            .then(async function (data) { //To save the geonamesArray in the server
                return await postFunction('/postImgURL', data)
            })
    } catch (error) {
        console.log("Error: ", error)
    }
}

export { imageHandler }