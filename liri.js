require("dotenv").config();
var axios = require("axios");
//keys
var keys = require("./keys.js");

//Moment
var moment = require('moment');
moment().format();
//Spotify//
var Spotify = require('node-spotify-api');
var spotify = new Spotify(keys.spotify);



var bandsInTown = `https://rest.bandsintown.com/artists/${artist}/events?app_id=${keys.bandsInTown.id}`
var artist;

var omdb = `http://www.omdbapi.com/?t=${title}&apikey=${keys.omdb.id}`

var fs = require("fs");

var userInput = process.argv[2];
var arguments = process.argv;
var userSearch = "";
var title = "";



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


        artist = userSearch || console.log("Oops! You forgot to put an artist/band! You can go to the Star Lounge!");


        bandsInTown = `https://rest.bandsintown.com/artists/${artist}/events?app_id=${keys.bandsInTown.id}`


        axios
            .get(bandsInTown)
            .then(function (response) {

                for (let i = 0; i < response.data.length; i++) {

                    let time = response.data[i].datetime;



                    console.log(`Venue: ${response.data[i].venue.name}`);
                    console.log(`Venue Location: ${response.data[i].venue.city}`);
                    console.log(`Date of Event: ${moment(time, "YYYY-MM-DDTHH:mm:ss").format("MM/DD/YYYY")}`);
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

        spotify
            .search({ type: 'track', query: userSearch || " Ace of Base The Sign" })
            .then(function (response) {



                for (let i = 0; i < response.tracks.items.length; i++) {

                    console.log(`Artist(s): ${response.tracks.items[i].artists[0].name}`);
                    console.log(`Song Name: ${response.tracks.items[i].name}`);
                    console.log(`Link to Song: ${response.tracks.items[i].external_urls.spotify}`);
                    console.log(`Album: ${response.tracks.items[i].album.name}`);
                    console.log("=============================================================");



                }

            })
            .catch(function (err) {


                console.log(err);
            });





        break;

    case "movie-this":
        function noSearch() {

            console.log(`If you haven't watched "Mr. Nobody" then you should: http://www.imdb.com/title/tt0485947/`)
            return console.log("It's on Netflix!")
        }
        title = userSearch
        omdb = `http://www.omdbapi.com/?t=${title}&apikey=${keys.omdb.id}`

        axios
            .get(omdb)
            .then(function (response) {


                title = userSearch || noSearch();


                if (title === userSearch) {

                    console.log("====================================");
                    console.log(`Title: ${response.data.Title}`);
                    console.log(`Year: ${response.data.Year}`);
                    console.log(`IMDB Rating: ${response.data.imdbRating}`);
                    console.log(`Rotten Tomatoes Rating: ${response.data.Ratings[0].Value}`);
                    console.log(`Country: ${response.data.Country}`);
                    console.log(`Language: ${response.data.Language}`);
                    console.log(`Plot: ${response.data.Plot}`);
                    console.log(`Actors: ${response.data.Actors}`)
                    console.log("====================================");

                }



            })

            .catch(function (error) {

                return console.log(error);
            })



        break;


    case "do-what-it-says":

        let randomStringArray;
        let randomStrings;

        fs.readFile("./random.txt", "utf8", function (err, data) {
            if (err) {
                return console.log(err)
            };

            randomStringArray = data.toString().split("\n");



            randomStrings = randomStringArray[Math.floor(Math.random() * randomStringArray.length)];

            // console.log(randomStrings);


            var whatSays = randomStrings.split(",");

            arguments[2] = whatSays[0];
            arguments[3] = whatSays[1];

            // console.log(whatSays[0]);
            // console.log(whatSays[1])

            if (arguments[2] === "spotify-this-song") {

                spotify
                    .search({ type: 'track', query: arguments[3] })
                    .then(function (response) {



                        for (let i = 0; i < response.tracks.items.length; i++) {

                            console.log(`Artist(s): ${response.tracks.items[i].artists[0].name}`);
                            console.log(`Song Name: ${response.tracks.items[i].name}`);
                            console.log(`Link to Song: ${response.tracks.items[i].external_urls.spotify}`);
                            console.log(`Album: ${response.tracks.items[i].album.name}`);
                            console.log("=============================================================");



                        }

                    })
                    .catch(function (err) {


                        console.log(err);
                    });






            }

            else if (arguments[2] === "movie-this") {
              
                title = arguments[3];
                // console.log(title);
                omdb = `http://www.omdbapi.com/?t=${title}&apikey=${keys.omdb.id}`

                axios
                    .get(omdb)
                    .then(function (response) {


                        title = arguments[3];
                       



                            console.log("====================================");
                            console.log(`Title: ${response.data.Title}`);
                            console.log(`Year: ${response.data.Year}`);
                            console.log(`IMDB Rating: ${response.data.imdbRating}`);
                            console.log(`Rotten Tomatoes Rating: ${response.data.Ratings[0].Value}`);
                            console.log(`Country: ${response.data.Country}`);
                            console.log(`Language: ${response.data.Language}`);
                            console.log(`Plot: ${response.data.Plot}`);
                            console.log(`Actors: ${response.data.Actors}`)
                            console.log("====================================");

                        



                    })

                    .catch(function (error) {

                        return console.log(error);
                    })


            }


        });

        break;


}

var totalInput = userInput + " " + userSearch


fs.appendFile("log.txt", totalInput, "utf8", function (err) {


    if (err) {
        console.log(err);
    }


});