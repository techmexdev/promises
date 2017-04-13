/*
 * Write a function WITH NO CALLBACKS that,
 * (1) reads a GitHub username from a `readFilePath`
 *     (the username will be the first line of the file)
 * (2) then, sends a request to the GitHub API for the user's profile
 * (3) then, writes the JSON response of the API to `writeFilePath`
 *
 * HINT: We exported some similar promise-returning functions in previous exercises
 */

var fs = require('fs');
var request = require('request');
var Promise = require('bluebird');



var fetchProfileAndWriteToFile = function(readFilePath, writeFilePath) {
  Promise.promisifyAll(fs);
  Promise.promisifyAll(request);
  var body = '';
  return fs.readFileAsync(readFilePath)
    .then(fileContent => {
      body += fileContent;
      return body.split('\n')[0];
    })
    .then(userName => {
      return request.getAsync(`https://api.github.com/users/${userName}`)
        .then(response => {
          return response.body;
        });
    })
    .then(profileInfo => {
      return fs.writeFileAsync(writeFilePath, profileInfo);
    });
};

// Export these functions so we can test them
module.exports = {
  fetchProfileAndWriteToFile: fetchProfileAndWriteToFile
};
