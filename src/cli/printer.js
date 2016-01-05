import forIn from 'lodash/object/forIn'
import sortBy from 'lodash/collection/sortBy'
import path from 'path'
import chalk from 'chalk'
import Table from 'cli-table'

export default {
    /**
     * Prints a collection of results.
     * @param  {Object} results Parsing results.
     */
    print: function (results) {
        forIn(results, (file, filePath) => {
            filePath = path.relative(process.cwd(), filePath)

            console.log(chalk.bold('\n  %s'), filePath)

            // sort & map file to [line, tag, value]
            const rows = sortBy(file, 'line')
                .map(comment => {
                    return [
                        '    ' + chalk.gray(comment.line + ':'),
                        chalk.green('@' + comment.tag.toLowerCase()),
                        comment.value
                    ]
                })

            this.table(rows)
        })
    },

    /**
     * Prints a table with the given rows.
     * @param  {Array} rows Table rows.
     */
    table: function (rows) {
        const resultsTable = new Table({
            chars: { 'top': '',    'top-mid': '',    'top-left': '',    'top-right': '',
                     'bottom': '', 'bottom-mid': '', 'bottom-left': '', 'bottom-right': '',
                     'left': '',   'left-mid': '',   'mid': '',         'mid-mid': '',
                     'right': '',  'right-mid': '',  'middle': ' ' },
            style: { 'padding-left': 0, 'padding-right': 0 }
        });

        rows.forEach(row => resultsTable.push(row))

        console.log(resultsTable.toString())
    }
}
