/**
 * Implement these functions following the node style callback pattern
 */

var fs = require('fs');
var request = require('request');

// This function should retrieve the first line of the file at `filePath`
var pluckFirstLineFromFile = function (filePath, callback) {
  var body = '';
  fs.readFile(filePath, function(err, data) {
    if (err) {
      callback(err);
    } else {
      body += data;
      var lines = body.split('\n');
      callback(err, lines[0]);
    }
  });
};

// This function should retrieve the status code of a GET request to `url`
var getStatusCode = function (url, callback) {
  console.log('URL-------------------', url);
  
  request(url, function (error, response, body) {
    if (error) {
      callback(error, null);
    } else {
      callback(error, response.statusCode);
    }
  });
};

// Export these functions so we can test them and reuse them in later exercises
module.exports = {
  getStatusCode: getStatusCode,
  pluckFirstLineFromFile: pluckFirstLineFromFile
};
