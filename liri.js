var dotenv = require("dotenv").config();
var keys = require("./keys.js");
var Spotify = require('node-spotify-api');
var fs = require("fs");
var axios = require("axios");
var moment = require("moment");
//variables assigned to require for each package

var spotify = new Spotify(keys.spotify);
//variable assigned spotify keys


var command = process.argv[2];
var args = process.argv.slice(3);
//variables assigned to the LIRI bot command and user input

switch (command) {
    case ("spotify-this-song"):
        if (args.length > 0) {
            spotifySongSearch(args);
        } else {
            spotifySongSearch("The Sign");
        }
    break;
    case ("movie-this"):
        if (args.length > 0) {
            movieThis(args);
        } else {
            movieThis("Mr. Nobody");
        }
    break;
    case ("do-what-it-says"):
        doWhatItSays();
    break;
    default:
        console.log("Error: please try again...");
}
//switch statement that determines if a command has been issued and calls the corresponding function
//Added a case to switch statement to account for movie-this command that takes in args as the argument to the movieThis function, if no arugment is provided it will default to Mr. Nobody.


function spotifySongSearch(song) {
spotify.search({ type: "track", query: song, limit: 1 }).then(function(response) {
    for (var i = 0; i < response.tracks.items.length; i++){
        var songData = response.tracks.items[i];
        console.log("--------------------------------------------");
        console.log("The artist is: " + songData.artists[0].name);
        console.log("The song title is: " + songData.name);
        console.log("The album name is: " + songData.album.name);
        console.log("This is a preview on Spotify: " + songData.preview_url);
        console.log("--------------------------------------------");
    }
    // console.log(JSON.stringify(response, null, 2));
}).catch(function(err) {
    console.log(err);
});
};
//function that takes an argument of song and searches spotify's api for the queried song title and returns the artist name, song title, album name, and a preview of the song on spotify

function movieThis(movieTitle) {
    axios.get("http://www.omdbapi.com/?t=" + movieTitle + "&y=&plot=short&apikey=trilogy").then(
  function(response) {
    var movieJSON = response.data;
    console.log("-----------------------");
    console.log("Movie Title: " + movieJSON.Title);
    console.log("Release Year: " + movieJSON.Year);
    console.log("IMDB Rating: " + movieJSON.Ratings[0].Value);
    console.log("Rotten Tomatoes Rating: " + movieJSON.Ratings[1].Value);
    console.log("Country Produced: " + movieJSON.Country);
    console.log("Language: " + movieJSON.Language);
    console.log("Plot: " + movieJSON.Plot);
    console.log("Actors: " + movieJSON.Actors);
    console.log("-----------------------");
  })
  .catch(function(error) {
    if (error.response) {
      console.log("---------------Data---------------");
      console.log(error.response.data);
      console.log("---------------Status---------------");
      console.log(error.response.status);
      console.log("---------------Status---------------");
      console.log(error.response.headers);
    } else if (error.request) {
      console.log(error.request);
    } else {
      console.log("Error", error.message);
    }
    console.log(error.config);
  });

};
//declared a function movieThis that takes in a movie title as an argument then uses axios to request a JSON object from omdb's API. The response data was then stored in a variable called movieJSON for easier accessing of keys. Then the keys corresponding to movie title, release year, imdb rating, rotten tomatoes rating, country, and language were logged to console. 

function doWhatItSays() {
    fs.readFile("random.txt", "utf8", function(error, data) {
        var txt = data.split(",");
        if (txt[0] === "spotify-this-song") {
            spotifySongSearch(txt[1]);
        }
        
    })
};
//function that reads the random.txt file, splits the input data provided at the comma, and determines which command is being issued with a given input