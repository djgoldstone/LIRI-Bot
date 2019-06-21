var dotenv = require("dotenv").config();
var keys = require("./keys.js");
var Spotify = require('node-spotify-api');
var fs = require("fs");
const chalk = require('chalk');
var axios = require("axios");
var moment = require("moment");
const chalkAnimation = require('chalk-animation');
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
            spotifySongSearch("Ace of Base");
        }
    break;
    case ("movie-this"):
        if (args.length > 0) {
            movieThis(args);
        } else {
            movieThis("Mr. Nobody");
        }
    break;
    case ("concert-this"):
        if (args.length > 0) {
            concertThis(args);
        }
    break;
    case ("do-what-it-says"):
        doWhatItSays();
    break;
    default:
        chalkAnimation.glitch(chalk.greenBright("You broke LIRI, please restart terminal and enter a command next time..."));
}
//switch statement that determines if a command has been issued and calls the corresponding function
//Added a case to switch statement to account for movie-this command that takes in args as the argument to the movieThis function, if no arugment is provided it will default to Mr. Nobody.

function concertThis(artist) {
    var URL = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp";
    axios.get(URL).then(
  function(response) {
    //   console.log(response.data);
      for(var i = 0; i < 3; i++) {
        console.log(chalk.greenBright("------------------------------------------"));
        console.log(chalk.bold("Venue Name: ") + chalk.greenBright(response.data[i].venue.name));
        console.log(chalk.bold("Venue Location: ") + chalk.greenBright(response.data[i].venue.city + ", " + response.data[i].venue.country));
        console.log(chalk.bold("Date: ") + chalk.greenBright(moment(response.data[i].datetime).format("L")));
        //formatted datetime using moment().format("L") for US style internationalization (MM-DD-YYYY)
        console.log("------------------------------------------");
      }
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
//declared function which takes artist as an argument
//stored query url in a variable and added artist variable to query
//iterated through response with a for loop to display 3 results including venue, location, and date

function spotifySongSearch(song) {
spotify.search({ type: "track", query: song, limit: 1 }).then(function(response) {
    for (var i = 0; i < response.tracks.items.length; i++){
        var songData = response.tracks.items[i];
        console.log(chalk.greenBright("--------------------------------------------"));
        console.log(chalk.greenBright("The artist is: ") + chalk.bold(songData.artists[0].name));
        console.log(chalk.greenBright("The song title is: ") + songData.name);
        console.log(chalk.greenBright("The album name is: ") + songData.album.name);
        console.log(chalk.greenBright("This is a preview on Spotify: ") + songData.preview_url);
        console.log(chalk.greenBright("--------------------------------------------"));
    }
}).catch(function(err) {
    console.log(err);
});
};
//function that takes an argument of song and searches spotify's api for the queried song title and returns the artist name, song title, album name, and a preview of the song on spotify

function movieThis(movieTitle) {
    axios.get("http://www.omdbapi.com/?t=" + movieTitle + "&y=&plot=short&apikey=trilogy").then(
  function(response) {
    var movieJSON = response.data;
    console.log(chalk.greenBright("-----------------------"));
    console.log(chalk.greenBright("Movie Title: ") + chalk.bold(movieJSON.Title));
    console.log(chalk.greenBright("Release Year: ") + movieJSON.Year);
    console.log(chalk.greenBright("IMDB Rating: ") + movieJSON.Ratings[0].Value);
    console.log(chalk.greenBright("Rotten Tomatoes Rating: ") + movieJSON.Ratings[1].Value);
    console.log(chalk.greenBright("Country Produced: ") + movieJSON.Country);
    console.log(chalk.greenBright("Language: ") + movieJSON.Language);
    console.log(chalk.greenBright("Plot: ") + movieJSON.Plot);
    console.log(chalk.greenBright("Actors: ") + movieJSON.Actors);
    console.log(chalk.greenBright("-----------------------"));
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