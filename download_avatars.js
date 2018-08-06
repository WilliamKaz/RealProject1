var https = require('https');
var request = require('request')
var Process = process.argv.slice(2)
var repo = Process[1];
var userName = Process[0];
var gotRepo;
var gotUser;


// function getRepoContributors(repoOwner, repoName, cb) {
//     console.log("Errors:", err);
//     request.get('https://api.github.com/repos/jquery/jquery/contributors')
//     .on('response', function(response){
//       console.log(response.statusCode + " " +response.headers['content-type'] );
//     })

//     console.log("Result:", result);

// }
function getRepoContributors(repoOwner, repoName, cb) {
  var url = "https://api.github.com/repos/" + repoOwner + "/" + repoName + "/contributors";
  request(url, function(err, res, body) {
    cb(err, body);
  });
}
getRepoContributors(userName, repo )

console.log('Welcome to the GitHub Avatar Downloader!');

// getRepoContributors("jquery", "jquery", function(err, result) {

// });

