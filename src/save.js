const fs = require('fs')

function save(filepath, object) {
    return fs.writeFileSync(filepath, JSON.stringify(object, null, 4))
}

module.exports = save
