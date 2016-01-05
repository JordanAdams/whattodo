#!/usr/bin/env node

import fs from 'fs'
import program from 'commander'
import indexAction from '../cli/index'

const {version} = JSON.parse(fs.readFileSync('./package.json'));

program.version(version)

program.parse(process.argv)

indexAction(process.argv.slice(2))
