require("dotenv").config();

var keys = require("./keys.js");

// var spotify = new Spotify(keys.spotify);

let userInput = process.argv[2];

switch (userInput) {
    case "concert-this":
        console.log("bandsintown");
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