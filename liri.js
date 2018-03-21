//DotENV require and config
require("dotenv").config();


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
}


//MovieThis Function to access OMDB API

function movieThis() {

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

    var spotify = new Spotify({
        id: "<your spotify client id>",
        secret: "<your spotify client secret>"
    });

    spotify.search({ type: 'track', query: 'All the Small Things' }, function (err, data) {
        if (err) {
            return console.log('Error occurred: ' + err);
        }

        console.log(data);
    });


} //end of spotifyThisSong function

function myTweets() {
    var client = new Twitter({
        consumer_key: '',
        consumer_secret: '',
        access_token_key: '',
        access_token_secret: ''
      });
       
      var params = {screen_name: 'nodejs'};
      client.get('statuses/user_timeline', params, function(error, tweets, response) {
        if (!error) {
          console.log(tweets);
        }
      });
}


// var spotify = new Spotify(keys.spotify);
// var client = new Twitter(keys.twitter);

//output to log.txt function BONUS

function appendToLog() {
var fs = require("fs");

fs.appendFile("log.txt", "\n" + value, function (error) {
    if (error) {
        return console.log("ERROR: " + error);

    }
})
}


