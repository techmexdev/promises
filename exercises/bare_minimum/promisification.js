/**
 * Create the promise returning `Async` suffixed versions of the functions below,
 * Promisify them if you can, otherwise roll your own promise returning function
 */ 

var fs = require('fs');
var request = require('request');
var crypto = require('crypto');
var Promise = require('bluebird');

// (1) Asyncronous HTTP request
var getGitHubProfile = function(user, callback) {
  var options = {
    url: 'https://api.github.com/users/' + user,
    headers: { 'User-Agent': 'request' },
    json: true  // will JSON.parse(body) for us
  };

  request.get(options, function(err, res, body) {
    if (err) {
      callback(err, null);
    } else if (body.message) {
      callback(new Error('Failed to get GitHub profile: ' + body.message), null);
    } else {
      callback(null, body);
    }
  });
};

var getGitHubProfileAsync = function(user) {
  Promise.promisifyAll(request);
  return request.getAsync(`https://api.github.com/users/${user}`)
    .then(response => {
      if (JSON.parse(response.body).message === 'Not Found') {
        throw new Error(['Not Found', 'Failed to get GitHub profile']);
      }
      return JSON.parse(response.body);
    });
};


// (2) Asyncronous token generation
var generateRandomToken = function(callback) {
  crypto.randomBytes(20, function(err, buffer) {
    if (err) { return callback(err, null); }
    callback(null, buffer.toString('hex'));
  });
};

var generateRandomTokenAsync = function() {
  Promise.promisifyAll(crypto);
  return crypto.randomBytesAsync(20).then(response => {
    return response.toString('hex');
  });
};


// (3) Asyncronous file manipulation
var readFileAndMakeItFunny = function(filePath, callback) {
  fs.readFile(filePath, 'utf8', function(err, file) {
    if (err) { return callback(err); }
   
    var funnyFile = file.split('\n')
      .map(function(line) {
        return line + ' lol';
      })
      .join('\n');

    callback(funnyFile);
  });
};

var readFileAndMakeItFunnyAsync = function(filePath) {
  Promise.promisifyAll(fs);
  var body = '';
  return fs.readFileAsync(filePath).then(response=> {
    body += response;
    var lines = body.split('\n');
    
    var result = lines.map(function(line) {
      return line += ' lol';
    }).join('\n');

    return result;
  });
};

// Export these functions so we can test them and reuse them in later exercises
module.exports = {
  getGitHubProfileAsync: getGitHubProfileAsync,
  generateRandomTokenAsync: generateRandomTokenAsync,
  readFileAndMakeItFunnyAsync: readFileAndMakeItFunnyAsync
};
