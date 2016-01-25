import _ from 'lodash'
import path from 'path'
import chalk from 'chalk'
import Table from 'cli-table'

export default {
  /**
   * Prints a collection of results.
   * @param  {Object} results Parsing results.
   */
  print: function (results) {
    const output = _
      .chain(results)
        .values()
        .reject(_.isEmpty)
        .map(this.fileBlock.bind(this))
        .value()
        .join('\n')

    console.log(output)
  },

  fileBlock: function (results) {
    const filePath = path.relative(process.cwd(), results[0].path)
    const heading = chalk.bold(`\n  ${filePath}`)

    const body = _
      .chain(results)
      .sortBy('line')
      .map(this.commentRow)
      .thru(this.commentsTable)
      .value()

    return heading + '\n' + body
  },

  commentRow: function(comment) {
    return [
      chalk.gray(comment.line + ':'),
      chalk.green('@' + comment.tag.toLowerCase()),
      comment.value
    ]
  },

  /**
   * Prints a table with the given rows.
   * @param  {Array} rows Table rows.
   */
  commentsTable: function (rows) {
    const resultsTable = new Table({
      chars: {
        'top': '',
        'top-mid': '',
        'top-left': '',
        'top-right': '',
        'bottom': '',
        'bottom-mid': '',
        'bottom-left': '',
        'bottom-right': '',
        'left': '    ',
        'left-mid': '',
        'mid': '',
        'mid-mid': '',
        'right': '',
        'right-mid': '',
        'middle': '  '
      },
      style: { 'padding-left': 0, 'padding-right': 0 }
    })

    rows.forEach(row => resultsTable.push(row))
    return resultsTable.toString()
  }
}
