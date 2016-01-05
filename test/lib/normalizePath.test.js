import 'should'
import normalizePath from '../../src/lib/normalizePath'
import path from 'path'

describe('lib/normalizePath', function() {
    it('should make relative paths absolute', function() {
        const normalized = normalizePath('myfile.js')
        const absolute   = path.join(process.cwd(), 'myfile.js')

        normalized.should.eql(absolute)
    })

    it('should not affect absolute paths', function() {
        const absolute = '/path/to/myfile.js'
        const normalized = normalizePath(absolute)

        normalized.should.eql(absolute)
    })

    it('should normalize paths', function() {
        const pathA = '/this//is/a/path/../.'

        normalizePath(pathA).should.eql(
            path.normalize(pathA)
        )
    })

    it('should normalize paths with trailing slashes', function() {
        const pathB = '/this//is/another/path/'

        normalizePath(pathB).should.eql(
            path.normalize(pathB)
        )
    })
})
