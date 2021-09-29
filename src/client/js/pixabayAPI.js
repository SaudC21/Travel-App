import { getApiKey, getApiCall, postFunction } from './requests'
let destination = document.getElementById('destination');

let defaultImg = {
    url: 'https://cdn.pixabay.com/photo/2016/12/06/14/33/log-cabin-1886620_960_720.jpg'
}

async function getImage(apiKey) {
    const apiCall = `https://pixabay.com/api/?key=${apiKey.PIXABAY_KEY}&q=${destination.value}&orientation=horizontal&category=buildings&per_page=3`;
    let PixabayObject = await getApiCall(apiCall)
    console.log(PixabayObject)
    if (PixabayObject.hits.length == 0) {
        return defaultImg
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
                console.log(data)
                return await postFunction('/postImgURL', data)
            })
    } catch (error) {
        console.log("Error: ", error)
    }
}

export { imageHandler }