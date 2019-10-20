require("dotenv").config();
var axios = require("axios");

var keys = require("./keys.js");
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

                    console.log(`Venue: ${response.data[i].venue.name}`);
                    console.log(`Venue Location: ${response.data[i].venue.city}`);
                    console.log(`Date of Event: ${response.data[i].venue.datetime}`);
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