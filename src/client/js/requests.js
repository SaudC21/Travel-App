import 'regenerator-runtime/runtime'

// Function to GET the api key from server side
async function getApiKey(route) {
    const response = await fetch(route);
    try {
        const data = await response.json();
        return data;
    } catch (error) {
        console.log("ERORR", error);
    }
}

// Function to fetch api data
async function getApiCall(apiCall) {
    const response = await fetch(apiCall);
    try {
        const data = await response.json();
        return data;
    } catch (error) {
        console.log("error: ", error);
    }
}

// Function to POST data to server
const postFunction = async (url = '', data = {}) => {
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

export { getApiCall, getApiKey, postFunction }