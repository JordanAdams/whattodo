import fs from 'mz/fs'
import parser from './parser'
import normalizePath from './normalizePath'
import glob from 'glob-promise'
import Q from 'q'

/**
 * Processes file at the given path.
 *
 * @param  {String}  filePath File path.
 * @return {Promise}          Results.
 */
function processFile(path) {
  return fs.readFile(path, 'utf8')
    .then(contents => {
      return parser.parse(contents)
    })
    .then(results => results.map(result => {
      return { path, ...result }
    }))
}

/**
 * Processes files which match a glob.
 *
 * @param  {String} pattern Glob pattern.
 * @return {Promise}         Results.
 */
function processGlob(pattern) {
  return glob(pattern, { nodir: true })
    .then(paths => {
      return paths.map(normalizePath).map(processFile)
    })
    .then(Q.all)
}

export default { processGlob, processFile }
