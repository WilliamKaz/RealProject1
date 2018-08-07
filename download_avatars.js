//reqire file system and request node modules
var fs =require('fs');
var request = require('request');
// my API key obstructed through passing a secret module js file
var secret = require('./secret.js');
var Process = process.argv.slice(2);
var repo = Process[1];
var owner= Process[0];
var gotRepo;
var container = [];

// our higher order function that does the heavy listing and sets of a chain of callbacks
function getRepoContributors(repoOwner, repoName, cb) {
  // if arguments are not defined we will pass an error
  if (repoOwner === undefined || repoName === undefined ) {
    console.log('YOU goofed, please pass the required arguments');
  }
  // else we will run a request for the argument deifined project repo
  else {
   var options = {
    url: "https://api.github.com/repos/" + repoOwner + "/" + repoName + "/contributors",
    headers: {
      'User-Agent': 'request',
      'Authorization': 'token ' + secret.GITHUB_TOKEN
    }
  };
  // return callback function
  request(options, function(err, res, body) {
    cb(err, body);
  });
  }
}

// loop thru our returned API JSON onbject map ad parse it into a new array of just user avatars
getRepoContributors(owner, repo, function(err, result) {
    console.log("Errors:", err);
    gotRepo =  JSON.parse(result);
    container = gotRepo.forEach(function(user){
      // we make sure we are defineing each url by the username ascociated
    downloadImageByURL(user.avatar_url, user.login) });
});

// download function that is a callback for our getcontributors function, as it passes through
// users and their avatars it will download them with this script
function downloadImageByURL(url, filePath) {
    request.get(url).pipe(fs.createWriteStream('./avatars/' + filePath + '.png'));
}

console.log('Welcome to the GitHub Avatar Downloader!');