require("dotenv").config();
var axios = require("axios");
//keys
var keys = require("./keys.js");

//Moment
var moment = require('moment');
moment().format();
var artist;


// var spotify = new Spotify(keys.spotify);

var bandsInTown = `https://rest.bandsintown.com/artists/${artist}/events?app_id=${keys.bandsInTown.id}`

var userInput = process.argv[2];
var arguments = process.argv;
var userSearch = "";


for (let i = 3; i < arguments.length; i++) {

    if (i > 3 && i < arguments.length) {
        userSearch = userSearch + "+" + arguments[i];
    } 
    
    
    else {
        userSearch += arguments[i];

    }

}

switch (userInput) {
    case "concert-this":
        console.log(userSearch);

        artist = userSearch;
        console.log(artist);

        var bandsInTown = `https://rest.bandsintown.com/artists/${artist}/events?app_id=${keys.bandsInTown.id}`
       

        axios
            .get(bandsInTown)
            .then(function (response) {

                for (let i = 0; i < response.data.length; i++) {

                    let time = response.data[i].datetime;

                  

                    console.log(`Venue: ${response.data[i].venue.name}`);
                    console.log(`Venue Location: ${response.data[i].venue.city}`);
                 console.log(`Date of Event: ${moment(time, "YYYY-MM-DDTHH:mm:ss" ).format("MM/DD/YYYY")}`);
                // console.log(`Date of Event: ${moment(time).format("MM/DD/YYYY")}`);
                    // console.log(`Date of Event: ${response.data[i].venue.datetime}`);
                    console.log("========================================================================")


                }


            })
            .catch(function (error) {

                return console.log(error);
            })



        break;

    case "spotify-this-song":
        console.log("spotify");
        break;

    case "movie-this":
        console.log("omdb");
        break;

    case "do-what-it-says":
        console.log("text");
        break;

}