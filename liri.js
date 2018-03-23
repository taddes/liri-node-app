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

// if (process.argv[3] !="" && process.argv[3] != null) {
//     var value = process.argv[3].trim();
// } else  {
//     value = ("Mr.+Nobody");
// }

var value = process.argv.slice(3).join("+");
    //set up query to OMDB API
    var queryUrl = "http://www.omdbapi.com/?t=" + value + "&apikey=4645abe9";

    // console.log(queryUrl);

    request(queryUrl, function (error, response, body) {
  

        if (!error && response.statusCode === 200) {

            console.log("Here is the movie info you requested about " + value.toUpperCase() + ", Taddes, comliments of me, Liri: ");
            console.log("========================MOVIES========================");
            console.log("Title: " + JSON.parse(body).Title);
            console.log("Year of Release: " + JSON.parse(body).Year);
            console.log("IMDB Rating: " + JSON.parse(body).Ratings[0].Value);
            console.log("Rotten Tomatoes Rating: " + JSON.parse(body).Ratings[1].Value);
            console.log("Country/Countires of Production: " + JSON.parse(body).Country);
            console.log("Language: " + JSON.parse(body).Language);
            console.log("Plot: " + JSON.parse(body).Plot);
            console.log("Actors: " + JSON.parse(body).Actors);
            console.log("========================MOVIES========================");
        }

         
    })

} //end of movieThis function

function spotifyThisSong() {

    // var value = process.argv.slice(3).join("+");
    // console.log("value: " + value);

    var spotify = new Spotify(keys.spotify);
    
    var value = process.argv.slice(3).join(" ");

    spotify.search({ type: 'track', query: value, limit: 1}, function (err, data) {
        if (err) {
            return console.log('Error occurred: ' + err);
        }

        
        console.log(value);

        //declaration to break down code needed to access pathway
        var songInfo = data.tracks.items[1];
        // console.log(songInfo);
        console.log("Here is the song info on " + value.toUpperCase() + " that you requested, Taddes, comliments of me, Liri: ");
        console.log("========================SPOTIFY========================");
        console.log("Artist(s): " + songInfo.artists[0].name);
        console.log("Song Name: " +songInfo.album.name);
        console.log("Album: " +songInfo.album.name);
        if( songInfo.preview_url === null) {
            console.log("No song preview link available");
        } else {
            console.log("Album Preview URL: " +songInfo.preview_url);
        }
        console.log("========================SPOTIFY========================");
    });


} //end of spotifyThisSong function

//Twitter Module Function
function myTweets() {
    var client = new Twitter(keys.twitter);

      var params = {screen_name: 'taddes_k', count: 20};
      client.get('statuses/user_timeline', params, function(error, tweets, response) {
        if (!error) {
        //   console.log(tweets);
        }
        console.log("Here are your Tweets, Taddes, comliments of me, Liri: ");
        console.log("========================Tweets========================");
        for (var i = 0; i < tweets.length ; i++) {
            console.log("Tweet No." + i + ": " +  tweets[i].text);
        }
        console.log("========================Tweets========================");
      });
}




var fs = require("fs");

function doWhatItSays(){
	fs.readFile("random.txt", "utf8", function(error, data){
		console.log(data);
	})

}

//output to log.txt function BONUS
function appendToLog() {


fs.appendFile("log.txt", "\n" + value, function (error) {
    if (error) {
        return console.log("ERROR: " + error);
    }
})
}


