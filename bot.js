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
        }
      });
    }
    else {
      console.log("Error 2: Unsuccessful search.");
    }
  });
}
retweet();
setInterval(retweet, 60000)
