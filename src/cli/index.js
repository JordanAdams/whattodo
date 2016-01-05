import Q from 'q'
import flattenDeep from 'lodash/array/flattenDeep'
import groupBy from 'lodash/collection/groupBy'
import normalizePath from '../lib/normalizePath'
import processor from '../lib/processor'
import printer from './printer.js'

/**
 * Parses the given paths and prints the results.
 * If no paths are passed, the working dir is used.
 * 
 * @param {Array} paths Paths to parse.
 */
export default function(paths = []) {
    if (!paths.length) {
        paths = [process.cwd()]
    }

    const results = paths.map(normalizePath).map(p => processor.path(p))

    Q.all(results)
        .then(flattenDeep)
        .then(results => groupBy(results, 'path'))
        .then(results => printer.print(results))
        .catch(err => console.error(err.stack))
}
