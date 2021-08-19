#!/usr/bin/env node
const package     = require('./package.json')
const argparse    = require('argparse')
const collatia    = require('collatia')
const expand      = require('./src/expand')
const load        = require('./src/load')
const unique      = require('./src/unique')
const sort_object = require('./src/sort-object')

function main() {
    let args        = parse()
    let list        = args.l
    let directories = args.directory
    let filepaths   = expand(directories)
    let manuscripts = filepaths.map(load).map(entry => entry.data)
    let index       = create_index(manuscripts)
    let overlines   = Object.keys(index)

    if (list) {
        print_references(list, overlines, index)
    } else {
        console.table(overlines)
        console.log('TOTAL', overlines.length)
    }
}

function parse() {
    let { version } = package
    let parser = new argparse.ArgumentParser()
    parser.add_argument('-V', '--version', { help: 'show version information and exit', action: 'version', version })
    parser.add_argument('directory',       { nargs: '+', help: 'input directory that contains the manuscripts' })
    parser.add_argument('-l',              { metavar: 'INDEX', help: 'list references' })
    return parser.parse_args()
}

function create_index(manuscripts) {
    let index = {}
    manuscripts.forEach(function(manuscript) {
        manuscript.forEach(function(verse) {
            let words     = verse.reduction
            let overlines = unique(words.filter(collatia.overline.all))
            overlines.forEach(function(word) {
                if (index[word] === undefined)
                    index[word] = []
                index[word].push(verse)
            })
        })
    })
    return sort_object(index)
}

function print_references(i, words, index) {
    let word   = words[i]
    let verses = index[word]
    let table  = verses.map(function(entry) {
        let { book, chapter, verse } = entry
        return { book, chapter, verse }
    })
    console.log('WORD', word)
    console.table(table)
    console.log('TOTAL', table.length)
}

main()
