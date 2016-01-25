import _, { flattenDeep, groupBy, values } from 'lodash'
import processor from '../lib/processor'
import printer from './printer.js'
import Q from 'q'

/**
 * Parses the given paths and prints the results.
 * If no paths are passed, the working dir is used.
 *
 * @param {Array} paths Paths to parse.
 */
export default function (globs = ['./']) {
  processor.processGlob(globs[0])

  Q.all(globs.map(processor.processGlob))
    .then(flattenDeep)
    .then(r => groupBy(r, 'path'))
    .then(results => printer.print(results))
    .done()
}
