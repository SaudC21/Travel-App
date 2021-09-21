import { checkForName } from '../js/nameChecker'

let formText, apiKey
let resultsId = document.getElementById('results');
let modelId = document.getElementById('model');
let agreementId = document.getElementById('agreement');
let subjectivityId = document.getElementById('subjectivity');
let confidenceId = document.getElementById('confidence');
let ironyId = document.getElementById('irony');
let scoreTagId = document.getElementById('score_tag');

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

// Function to check the url if it's valid
function checkURL(url) {
    if (checkForName(url)) {
        return url;
    } else {
        console.log("Invalid url")
        return url;
    }
}

// Function to fetch api data
async function getApiCall(apiKey) {
    const apiCall = `https://api.meaningcloud.com/sentiment-2.1?key=${apiKey}&lang=auto&url=${formText}`;
    const response = await fetch(apiCall);
    try {
        const data = await response.json();
        return data;
    } catch (error) {
        console.log("error: ", error);
    }
}

// Function to POST data to server
const postArticle = async (url = '', data = {}) => {
    const response = await fetch(url, {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        credentials: 'same-origin', // include, *same-origin, omit
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data), // body data type must match "Content-Type" header        
    });
}

// Function to deal input when it's submitted
async function handleSubmit() {
    erase()
    waiting()

    formText = document.getElementById('name').value;
    const urlCheck = checkURL(formText); // Call the checkURL function

    if (urlCheck) {
        try {
            getApiKey()
            .then(function (apiKey) {
                return getApiCall(apiKey.api)
            })
            .then(function (data) {
                postArticle('/postData', data)
            })
            .then(function () {
                updateUI()
            })
        } catch (error) {
            console.log("invalid url", error)
        }
        
    } else {
        alert("Please double check the URL");
    }

}

// It will print 'Waiting..' until the user recive the info
function waiting() {
    resultsId.innerHTML = 'Information are coming...';
}

// This function will erase all results
function erase() {
    resultsId.innerHTML = '';
    modelId.innerHTML = '';
    agreementId.innerHTML = '';
    subjectivityId.innerHTML = '';
    confidenceId.innerHTML = '';
    ironyId.innerHTML = '';
    scoreTagId.innerHTML = '';
}

const updateUI = async () => {
    let request = await fetch('/getData');
    try {
        let lastEntry = await request.json();
        resultsId.innerHTML = 'Results';
        if(lastEntry.model == 'general_en') {
            modelId.innerHTML = 'Model: English';
        } else {
            modelId.innerHTML = 'Model: ' + lastEntry.model;
        }
        agreementId.innerHTML = 'Agreement: ' + lastEntry.agreement;
        subjectivityId.innerHTML = 'Subjectivity: ' + lastEntry.subjectivity;
        confidenceId.innerHTML = 'Confidence: ' + lastEntry.confidence + '%';
        ironyId.innerHTML = 'Irony: ' + lastEntry.irony;
        scoreTagId.innerHTML = 'Score tag: ' + lastEntry.score_tag;
    } catch (error) {
        console.log("Error updateUI: ", error);
    }
}

export { handleSubmit }