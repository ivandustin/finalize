const fs   = require('fs')
const path = require('path')

function expand(filepaths) {
    return filepaths.map(function(filepath) {
        if (fs.lstatSync(filepath).isDirectory())
            return fs.readdirSync(filepath).map(filename => path.join(filepath, filename))
        return filepath
    }).flat()
}

module.exports = expand
