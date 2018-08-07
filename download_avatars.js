var fs =require('fs');
var request = require('request');
var secret = require('./secret.js');
var Process = process.argv.slice(2);
var repo = Process[1];
var owner= Process[0];
var gotRepo;
var container = [];

function getRepoContributors(repoOwner, repoName, cb) {
  if (repoOwner === undefined || repoName === undefined ) {
    console.log('YOU goofed, please pass the required arguments');
  } else {
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
}


getRepoContributors(owner, repo, function(err, result) {
    console.log("Errors:", err);
    gotRepo =  JSON.parse(result);
    container = gotRepo.forEach(function(user){
    downloadImageByURL(user.avatar_url, user.login) });
});


function downloadImageByURL(url, filePath) {
    request.get(url).pipe(fs.createWriteStream('./avatars/' + filePath + '.png'));

  // fs.writeFile()
}



console.log('Welcome to the GitHub Avatar Downloader!');
