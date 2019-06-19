require("dotenv").config();
// var axios = require("axios");
var keys = require("./keys.js");
var Spotify = require('node-spotify-api');

// var songName = "";

var spotify = new Spotify(keys.spotify);

spotify.search({ type: "track", query: "All The Small Things" }).then(function(response) {
    for (var i = 0; i < response.tracks.items.length; i++){
        var songData = response.tracks.items[i];
        console.log("The artist is: " + songData.artists[0].name);
    }
    // console.log(JSON.stringify(response, null, 2));
}).catch(function(err) {
    console.log(err);
});