var twit = require('twit');
var config = require('./config.js');

var Twitter = new twit(config);

var retweet = function(){
  var params = {
    q: "#blackhistorymonth",
    result_type: 'recent',
    lang: 'en'
  }

  Twitter.get('search/tweets', params, function(err, data){
    if (!err) {
      //grab ID of tweet to rt
      var retweetId = data.statuses[0].id_str;
      //tell it to rt
      Twitter.post('statuses/retweet/:id', {
        id: retweetId
      }, function(err, response){
        if (response) {
          console.log("Successful retweet!");
        }
        if (err) {
          console.log("Error 1: Unsuccesful retweet.");
          console.log("" +err);
        }
      });
    }
    else {
      console.log("Error 2: Unsuccessful search.");
    }
  });
}
retweet();
setInterval(retweet, 36000000)

var favoriteTweet = function() {
  var params = {
    q: '#blackhistorymonth',
    result_type: 'recent',
    lang: 'en'
  }

  Twitter.get('search/tweets', params, function(err, data){

    var tweet = data.statuses;
    var randomTweet = ranDom(tweet);
    // checks if tweet exists
    if (typeof randomTweet != 'undefined') {
      //tells twitter to fav tweet
      Twitter.post('favorites/create', {id: randomTweet.id_str}, function(err, response){
        if(err){
          console.log('Error 1: Unsuccessful favorite.');
        }
        else {
          console.log("Successful favorite!");
        }
      });
    }
  });
}

favoriteTweet();
setInterval(favoriteTweet, 600000);

function ranDom(arr) {
  var index = Math.floor(Math.random()*arr.length);
  return arr[index];
};
