require("dotenv").config();
var axios = require("axios");
var keys = require("./keys.js");
var Spotify = require('node-spotify-api');

var songName = "";

var spotify = new Spotify(keys.spotify);



