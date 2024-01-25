const { error } = require('console');
var fs = require('fs');

var data = {
    firstName: 'Ilyas',
    lstName: 'Sayyed'
}

fs.writeFile('data.jason', JSON.stringify(data), (err) => {
    if(err) {
        console.log(err);
    } else {
        console.log("Data written to a file");
    }
})