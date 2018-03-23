//DotENV require and config
require("dotenv").config();

var keys = require("./keys.js");
//Request for OMDB API Module
var request = require('request');

//Spotify-API NPM Module
var Spotify = require('node-spotify-api');

//Twitter npm Module
var Twitter = require('twitter');


//assign movieTitle var to argv[2]
var action = process.argv[2];
var value = process.argv[3];

//switch statement, containing functions to designate liri commands
switch (action) {
    case "my-tweets":
        myTweets();
        break;

    case "spotify-this-song":
        spotifyThisSong();
        break;

    case "movie-this":
        movieThis();
        break;

    case "do-what-it-says":
        doWhatItSays();
        break;

    default: 
        console.log("Unexpected command line argument");
}


//MovieThis Function to access OMDB API

function movieThis() {


 var value = process.argv.slice(3).join("+");
 console.log("value: " + value);

    //set up query to OMDB API
    var queryUrl = "http://www.omdbapi.com/?t=" + value + "&apikey=4645abe9";

    console.log(queryUrl);

    request(queryUrl, function (error, response, body) {

        if (!error && response.statusCode === 200) {

            console.log("Title: " + JSON.parse(body).Title);
            console.log("Year of Release: " + JSON.parse(body).Year);
            console.log("IMDB Rating: " + JSON.parse(body).Ratings[0].Value);
            console.log("Rotten Tomatoes Rating: " + JSON.parse(body).Ratings[1].Value);
            console.log("Country/Countires of Production: " + JSON.parse(body).Country);
            console.log("Language: " + JSON.parse(body).Language);
            console.log("Plot: " + JSON.parse(body).Plot);
            console.log("Actors: " + JSON.parse(body).Actors);
        }
    })

} //end of movieThis function

function spotifyThisSong() {

    // var value = process.argv.slice(3).join("+");
    // console.log("value: " + value);

    var spotify = new Spotify(keys.spotify);
    // {
    //     id: process.env.SPOTIFY_ID,
    //     secret: process.env.SPOTIFY_SECRET
    // });

    spotify.search({ type: 'track', query: value, limit: 1 }, function (err, data) {
        if (err) {
            return console.log('Error occurred: ' + err);
        }
        var songInfo = data.tracks.items[0];
        console.log(songInfo.artists[0].name);
        console.log(songInfo.album.name);
    });


} //end of spotifyThisSong function

//Twitter Module Function
function myTweets() {
    var client = new Twitter(keys.twitter);

      var params = {screen_name: 'taddes_k', count: 20};
      client.get('statuses/user_timeline', params, function(error, tweets, response) {
        if (!error) {
          console.log(tweets);
        }
        for (var i = 0; i <tweets.length ; i++) {
            console.log(tweets[i].text);
        }
      });
}

//output to log.txt function BONUS


var fs = require("fs");

function appendToLog() {


fs.appendFile("log.txt", "\n" + value, function (error) {
    if (error) {
        return console.log("ERROR: " + error);
    }
})
}


