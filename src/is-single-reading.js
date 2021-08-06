function is_single_reading(verse) {
    let scores = verse.manuscripts.map(function(manuscript) {
        return manuscript.words.filter(identity).length
    })
    return scores.filter(identity).length == 1 && verse.reduction.filter(identity).length == 0
}

function identity(value) {
    return value
}

module.exports = is_single_reading
