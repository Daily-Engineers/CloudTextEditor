const fs = require('fs');

let saveFile = function(content, fileName, cb) {

    var fws = fs.createWriteStream('./temp/' + fileName + '.txt');

    fws.write(content);
    fws.end()
    fws.on('finish', cb);
    return
}
module.exports = saveFile;