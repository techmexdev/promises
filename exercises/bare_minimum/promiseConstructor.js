/**
 * Implement these promise-returning functions.
 * Any successful value should be made available in the next `then` block chained
 * to the function invocation, while errors should be available in the `catch` block
 */

var fs = require('fs');
var request = require('request');
var Promise = require('bluebird');

// This function should retrieve the first line of the file at `filePath`
var pluckFirstLineFromFileAsync = function(filePath) {
  Promise.promisifyAll(fs);
  var body = '';
  return fs.readFileAsync(filePath)
    .then(results => {
      body += results;
      return body.split('\n')[0];
    });
};

// This function should retrieve the status code of a GET request to `url`
var getStatusCodeAsync = function(url) {
  Promise.promisifyAll(request);
  return request.getAsync(url).then(response => {
    return response.statusCode;
  });
};

// Export these functions so we can test them and reuse them in later exercises
module.exports = {
  getStatusCodeAsync: getStatusCodeAsync,
  pluckFirstLineFromFileAsync: pluckFirstLineFromFileAsync
};
