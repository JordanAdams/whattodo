#!/usr/bin/env node

import fs from 'fs'
import path from 'path'
import program from 'commander'
import indexAction from '../cli/index'

const pkgJsonPath = path.join(__dirname, '../../package.json')
const {version} = JSON.parse(fs.readFileSync(pkgJsonPath))

program.version(version)

program.parse(process.argv)

indexAction(process.argv.slice(2))
