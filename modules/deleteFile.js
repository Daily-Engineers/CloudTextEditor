const fs = require('fs');

let deleteFile = function (fileName){
    try {
        //try to delete file.
        fs.unlinkSync('./temp/' + fileName + '.txt');
        return
    } catch (err) {
        console.log('Error: File delete failed');
        return
    }
}


module.exports = deleteFile;
