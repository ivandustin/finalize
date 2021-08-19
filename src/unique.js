function unique(array) {
    return array.filter((value, index)=> array.indexOf(value) == index)
}

module.exports = unique
