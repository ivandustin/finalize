#!/usr/bin/env node
const package           = require('./package.json')
const argparse          = require('argparse')
const expand            = require('./src/expand')
const load              = require('./src/load')
const is_single_reading = require('./src/is-single-reading')

function main() {
    let args        = parse()
    let directories = args.directory
    let filepaths   = expand(directories)
    let manuscripts = filepaths.map(load).map(entry => entry.data)
    let filtered    = filter(manuscripts)
    print(filtered)
}

function parse() {
    let { version } = package
    let parser = new argparse.ArgumentParser()
    parser.add_argument('-V', '--version', { help: 'show version information and exit', action: 'version', version })
    parser.add_argument('directory',       { nargs: '+', help: 'input directory that contains the manuscripts' })
    return parser.parse_args()
}

function filter(manuscripts) {
    return manuscripts.map(function(manuscript) {
        return manuscript.filter(function(verse) {
            return is_single_reading(verse)
        })
    })
}

function print(manuscripts) {
    let books = manuscripts.filter(entry => entry.length > 0).length
    let total = manuscripts.map(entry => entry.length).reduce((a, b)=> a + b, 0)
    manuscripts.forEach(function(verses) {
        if (verses.length > 0) {
            let first = verses[0]
            let book  = first.book
            console.log('BOOK', book)
            verses.forEach(function(entry) {
                let { chapter, verse } = entry
                console.log(`    CHAPTER ${chapter} VERSE ${verse}`)
            })
        }
    })
    console.log()
    console.log('TOTAL BOOKS', books)
    console.log('TOTAL VERSES', total)
}

main()
