var fs = require('fs');
var axios = require('axios').default;
var chalk = require('chalk');

var fileContent = fs.readFileSync('listafix.txt', 'utf-8');

var usernames = fileContent.split('\n').map(username => username.trim());

usernames.forEach(function (currentUsername) {
  var options = {
    method: 'GET',
    url: 'https://twitter.com/i/api/i/users/username_available.json',
    params: { full_name: 'Lucas', suggest: 'true', username: currentUsername },
    headers: {
      Authorization: 'Bearer AAAAAAAAAAAAAAAAAAAAANRILgAAAAAAnNwIzUejRCOuH5E6I8xnZz4puTs%3D1Zv7ttfk8LF81IUq16cHjhLTvJu4FA33AGWWjCpTnA',
      'x-guest-token': '1541486022587998209'
    }
  };
  axios.request(options).then(function (response) {
    if (!response.data.valid) {
      console.log(chalk.red(`NO DISPONIBLE: ${currentUsername}`));
    } else {
      console.log(chalk.green(`DISPONIBLE: ${currentUsername}`));
    }
  }).catch(function (error) {
    console.error(error);
  });
});