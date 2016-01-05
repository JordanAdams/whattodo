import 'should'
import parser from '../../src/lib/parser'

describe('lib/parser', function() {
    it('should support double slash style', function() {
        const code = '// TODO: do something'
        const results = parser.parseDoubleSlashStyle(code)

        results.should.eql([{
            raw: code,
            tag: 'TODO',
            value: 'do something',
            line: 1
        }])
    })

    it('should support hash style', function() {
        const code = '# TODO: do something'
        const results = parser.parseHashStyle(code)

        results.should.eql([{
            raw: code,
            tag: 'TODO',
            value: 'do something',
            line: 1
        }])
    })

    it('should support double dash style', function() {
        const code = '-- TODO: do something'
        const results = parser.parseDoubleHyphenStyle(code)

        results.should.eql([{
            raw: code,
            tag: 'TODO',
            value: 'do something',
            line: 1
        }])
    })

    it('should support slash star block style', function() {
        const code = `
            /* TODO: do something */
            /**
             * not relevant
             * @fixme it's broken
             */
        `

        const results = parser.parseSlashStarBlockStyle(code)

        results.should.containEql({
            raw: '/* TODO: do something */',
            tag: 'TODO',
            value: 'do something',
            line: 2
        })

        results.should.containEql({
            raw: `/**
             * not relevant
             * @fixme it's broken
             */`,
            tag: 'FIXME',
            value: 'it\'s broken',
            line: 3
        })
    })

    it('should support multiple comments', function() {
        const code = `
            # TODO: do something
            // TODO: another thing
        `
        const results = parser.parse(code)

        results.should.containEql({
            raw: '# TODO: do something',
            tag: 'TODO',
            value: 'do something',
            line: 2
        })

        results.should.containEql({
            raw: '// TODO: another thing',
            tag: 'TODO',
            value: 'another thing',
            line: 3
        })
    })

    it('should support different tags', function() {
        const code = `
            # FIXME: this is broken
            -- TODO: do something
        `

        const results = parser.parse(code)

        results.should.containEql({
            raw: '# FIXME: this is broken',
            tag: 'FIXME',
            value: 'this is broken',
            line: 2
        })

        results.should.containEql({
            raw: '-- TODO: do something',
            tag: 'TODO',
            value: 'do something',
            line: 3
        })
    })

    it('should support varied tag formats', function() {
        const code = `
            // @FIXME this is broken
            -- todo do something
        `

        const results = parser.parse(code)

        results.should.containEql({
            raw: '// @FIXME this is broken',
            tag: 'FIXME',
            value: 'this is broken',
            line: 2
        })

        results.should.containEql({
            raw: '-- todo do something',
            tag: 'TODO',
            value: 'do something',
            line: 3
        })
    })
})
