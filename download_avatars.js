var https = require('https');
var request = require('request');
var secret = require('./secret.js');
var Process = process.argv.slice(2)
var repo = Process[1];
var userName = Process[0];
var gotRepo;
var gotUser;
var avUrl = [];
var container = [];


// function getRepoContributors(repoOwner, repoName, cb) {
//     console.log("Errors:", err);
//     request.get('https://api.github.com/repos/jquery/jquery/contributors')
//     .on('response', function(response){
//       console.log(response.statusCode + " " +response.headers['content-type'] );
//     })

//     console.log("Result:", result);

// }
function getRepoContributors(repoOwner, repoName, cb) {
   var options = {
    url: "https://api.github.com/repos/" + repoOwner + "/" + repoName + "/contributors",
    headers: {
      'User-Agent': 'request',
      'Authorization': 'token ' + secret.GITHUB_TOKEN
    }

  };

  request(options, function(err, res, body) {
    cb(err, body);
  });
}

getRepoContributors("jquery", "jquery", function(err, result) {
  console.log("Errors:", err);
  // console.log("Result:", result);
  // console.log( JSON.parse(result));
  for (var i = 0; i < result.length; i++) {
     container.push(JSON.parse(result[i].avatar_url));
  }
  console.log( container);
});
// getRepoContributors(userName, repo )

console.log('Welcome to the GitHub Avatar Downloader!');

// getRepoContributors("jquery", "jquery", function(err, result) {

// });

