const fetch = require("node-fetch")

export const firebaseConfig = {
    apiKey: "AIzaSyAZa8PMMLLRg4xw7YWNv9UUhpZF-ytH5Js",
    authDomain: "cbsd-project-b6bca.firebaseapp.com",
    databaseURL: "https://cbsd-project-b6bca.firebaseio.com",
    projectId: "cbsd-project-b6bca",
    storageBucket: "cbsd-project-b6bca.appspot.com",
    messagingSenderId: "319764165449",
    appId: "1:319764165449:web:ba190b539d405f662ca098",
    measurementId: "G-5S92BWGCD2"
}

export const countriesAPI = (country) => {
    return fetch(`https://api.opencagedata.com/geocode/v1/json?q=${country}&key=bc242637ff4a4107b0eae494a73b5f2a&pretty=1`)
        .then((response) => response.json())
        .then((data) => {
            return {
                geometry: data.results[0].geometry
            }
        })

}