# LIRI node app

LIRI is like iPhone's SIRI. However, while SIRI is a Speech Interpretation and Recognition Interface, LIRI is a Language Interpretation and Recognition Interface. LIRI will is command line node app that takes in parameters and gives back data.
<br>

![Crystals](liri.png)
<hr>

There are 4 primary functions Liri can execute. In order for them to work, the following NPM packages must be installed: `node-spotify-api`, `request`, `dotenv`, `request`, and  `fs`.  After accessing your  Node.js terminal, initiate the liri.js program by typing `node liri.js ` and enter one these four functions:

* `my-tweets`
Allows a user to access and print their 20 most recent tweets.

* `spotify-this-song`
Takes user input for a given song and displays data on that specific song, including the artist, song name, album and a preview URL of the song on Spotify.

* `movie-this`
Takes user input for a given move and displays data from the OMDB API database.  The information returned includes IMDB and Rotten Tomatoes ratings, the country of production, a brief plot synopsis, and the actors. 

* `do-what-it-says`
Takes user input and executes code that is stored in the random.txt file.  If these actions correspond to one of the above functions (ie. spotify-this-song), this code will execute the given function.

<hr>
