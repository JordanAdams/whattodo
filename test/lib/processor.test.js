import 'should'
import path from 'path'
import processor from '../../src/lib/processor'
import _ from 'lodash'

describe('lib/processor', function () {
  it('should process a single file', function () {
    const filePath = path.join(__dirname, '../fixtures/example.js')
    const results = processor.processFile(filePath)

    return results.should.eventually.have.length(2)
  })

  it('should process a glob', function () {
    const glob = path.join(__dirname, '../fixtures/**/*.{js,php}')
    const results = processor.processGlob(glob)

    return results
      .then(_.flatten)
      .should.eventually.have.length(3)
  })
})
