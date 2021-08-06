const fs = require('fs')

function read(filepath) {
    return JSON.parse(fs.readFileSync(filepath).toString())
}

module.exports = read
