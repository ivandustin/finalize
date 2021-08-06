function sort_object(object) {
    let keys = Object.keys(object).sort()
    return keys.reduce(function(new_object, key) {
        new_object[key] = object[key]
        return new_object
    }, {})
}

module.exports = sort_object
