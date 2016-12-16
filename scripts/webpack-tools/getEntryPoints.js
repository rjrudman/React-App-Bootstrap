//Looks in defined directories to automatically add them as entry points
var rootDirs = [
    { prefix: 'pages', directory: './scripts/pages' }
];

var fs = require('fs');

function getFiles (dir, files_) {
    files_ = files_ || [];
    var files = fs.readdirSync(dir);
    for (var i in files) {
        //Remove the extension of the file
        var fileName = files[i].replace(/\.[^/.]+$/, "")
        var filePath = dir + '/' + files[i];
        if (fs.statSync(filePath).isDirectory()){
            getFiles(filePath, files_);
        } else {
            var fileObj = {
                fileName: fileName,
                filePath: filePath
            }
            files_.push(fileObj);
        }
    }
    return files_;
}

function getEntryPoints(existingEntryPoints) {
    for (var rootDir of rootDirs) {
        var files = getFiles(rootDir.directory);
        for (var file of files) {
            existingEntryPoints[rootDir.prefix + '.' + file.fileName] = file.filePath;
        }
    }

    return existingEntryPoints;
}

module.exports = getEntryPoints;