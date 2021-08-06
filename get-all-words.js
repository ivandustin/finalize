#!/usr/bin/env node
const package     = require('./package.json')
const argparse    = require('argparse')
const expand      = require('./src/expand')
const load        = require('./src/load')
const sort_object = require('./src/sort-object')

function main() {
    let args        = parse()
    let directories = args.directory
    let filepaths   = expand(directories)
    let manuscripts = filepaths.map(load).map(entry => entry.data)
    let index       = make_index(manuscripts)
    index           = sort_object(index)
    index           = filter(index, args.f)
    print(index)
}

function parse() {
    let { version } = package
    let parser = new argparse.ArgumentParser()
    parser.add_argument('-V', '--version', { help: 'show version information and exit', action: 'version', version })
    parser.add_argument('directory',       { nargs: '+', help: 'input directory that contains the manuscripts' })
    parser.add_argument('-f',              { help: 'filter output by the first letter' })
    return parser.parse_args()
}

function identity(value) {
    return value
}

function make_index(manuscripts) {
    let index = {}
    manuscripts.forEach(function(manuscript) {
        manuscript.forEach(function(verse) {
            verse.manuscripts.forEach(function(manuscript) {
                let { words } = manuscript
                words.filter(identity).forEach(function(word) {
                    if (index[word] === undefined)
                        index[word] = 0
                    index[word]++
                })
            })
        })
    })
    return index
}

function print(index) {
    let total = Object.keys(index).length
    console.table(index)
    console.log('TOTAL ROWS', total)
}

function filter(index, filter) {
    if (filter) {
        let result = {}
        for (let key in index) {
            if (key[0] == filter[0]) {
                result[key] = index[key]
            }
        }
        return result
    }
    return index
}

main()
