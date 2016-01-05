import fs from 'mz/fs'
import path from 'path'
import Q from 'q'
import parser from './parser'
import flattenDeep from 'lodash/array/flattenDeep'

export default {
    /**
     * Directories to ignore.
     * @type {Array}
     */
    ignore: [
        'node_modules',
        '.git',
        'bower_components',
        'vendor'
    ],

    /**
     * Processes file at the given path.
     *
     * @param  {String}  filePath File path.
     * @return {Promise}          Results.
     */
    file: function (filePath) {
        return fs.readFile(filePath, 'utf8')
            .then(contents => parser.parse(contents))
            .then(results => results.map(result => {
                return { path: filePath, ...result }
            }))
    },

    /**
     * Processes files in directory at the given path.
     *
     * @param  {String}        dirPath Directory path.
     * @return {Promise|Array}         Results.
     */
    dir: function (dirPath) {
        if (this.ignore.indexOf(path.basename(dirPath)) >= 0) {
            return []
        }

        const promises = fs.readdir(dirPath)
            .then(items => items.map(item => {
                const itemPath = path.join(dirPath, item)

                return this.path(itemPath)
            }))

        return Q.all(promises).then(flattenDeep)
    },

    /**
     * Processes anything at the given path.
     *
     * @param  {String}  searchPath Path.
     * @return {Promise}            Results.
     */
    path: function (searchPath) {
        return fs.stat(searchPath)
            .then(stat => {
                if (stat.isFile()) return this.file(searchPath)
                if (stat.isDirectory()) return this.dir(searchPath)

                throw new Error('Unable to process path: ' + searchPath)
            })
    }
}
