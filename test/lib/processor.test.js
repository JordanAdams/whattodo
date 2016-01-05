import 'should'
import path from 'path'
import processor from '../../src/lib/processor'

describe('lib/processor', function() {
    it('should process a single file', function() {
        const filePath = path.join(__dirname, '../fixtures/example.js')

        return processor.file(filePath).should.finally.containDeep([
            {
                path: filePath,
                raw: '// todo: do something',
                tag: 'TODO',
                value: 'do something',
                line: 7
            },
            {
                path: filePath,
                raw: `/**\n * description\n * @fixme fix this\n */`,
                tag: 'FIXME',
                value: 'fix this',
                line: 1
            }
        ])
    })

    it('should process a directory', function() {
        const dirPath = path.join(__dirname, '../fixtures/')

        return processor.dir(dirPath).should.finally.containDeep([
            {
                path: path.join(dirPath, 'example.js'),
                raw: '// todo: do something',
                tag: 'TODO',
                value: 'do something',
                line: 7
            },
            {
                path: path.join(dirPath, '/dir/sample.php'),
                raw: '// @fixme: it\'s broken',
                tag: 'FIXME',
                value: 'it\'s broken',
                line: 3
            }
        ])
    })
})
