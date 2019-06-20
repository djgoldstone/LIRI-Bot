var dotenv = require("dotenv").config();
var keys = require("./keys.js");
var Spotify = require('node-spotify-api');
var fs = require("fs");
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
    case ("do-what-it-says"):
        doWhatItSays();
    break;
    default:
        console.log("Error: please try again...");
}
//switch statement that determines if a command has been issued and calls the corresponding function

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

function doWhatItSays() {
    fs.readFile("random.txt", "utf8", function(error, data) {
        var txt = data.split(",");
        if (txt[0] === "spotify-this-song") {
            spotifySongSearch(txt[1]);
        }
        
    })
};
//function that reads the random.txt file, splits the input data provided at the comma, and determines which command is being issued with a given input