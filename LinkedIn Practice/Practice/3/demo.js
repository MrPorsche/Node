var fs = require('fs');
var data = require('./data.json')

console.log(data.firstName);

fs.readFile('./data.json', "UTF-8", (err, data) => {
    var data = JSON.parse(data)
    console.log(data.lstName)
});