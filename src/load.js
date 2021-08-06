const path = require('path')
const read = require('./read')

function load(filepath) {
    let data     = read(filepath)
    let filename = path.basename(filepath)
    return { filename, data }
}

module.exports = load
