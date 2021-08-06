#!/usr/bin/env node
const package  = require('./package.json')
const argparse = require('argparse')

function main() {
    let args        = parse()
    let directories = args.directory
}

function parse() {
    let { description, version } = package
    let parser = new argparse.ArgumentParser({ description })
    parser.add_argument('-V', '--version', { help: 'show version information and exit', action: 'version', version })
    parser.add_argument('directory',       { nargs: '+', help: 'input directory that contains the manuscripts' })
    return parser.parse_args()
}

main()
