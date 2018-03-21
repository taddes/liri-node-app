//DotENV require and config
require("dotenv").config();

//OMDB API KEY
//&apikey=4645abe9

//Request configure and save to variable request
var request = require('request');

//Spotify-API Module
var Spotify = require('node-spotify-api');


//Twitter npm Module
var Twitter = require('twitter');

var spotify = new Spotify(keys.spotify);
var client = new Twitter(keys.twitter);

// `my-tweets`
//`spotify-this-song`
//`movie-this`
// `do-what-it-says`
