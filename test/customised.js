'use strict';

const MODULE_REQUIRE = 1
    /* built-in */
    , assert = require('assert')

    /* NPM */
    , noda = require('noda')
    
    /* in-package */
    , leca = noda.inRequire('index')
    ;

describe('customised cases', () => {
    it('prefix & postfix', () => {
        let ci = new leca.Case({
            prefix: '__',
            postfix: '__',
        });
        
        assert(ci.test('__f__'));
        assert(!ci.test('f'));

        assert.equal('__f__', ci.format(['f']));
        assert.deepEqual(['f'], ci.parse('__f__'));
    });

    it('jointer (string)', () => {
        let ci = new leca.Case({
            jointer: '_',
        });

        let text = 'ching_is_queen_of_mine';
        let words = ['ching', 'is', 'queen', 'of', 'mine'];
        assert.equal(text, ci.format(words));
    });

    it('jointer (Function)', () => {
        let ci = new leca.Case({
            jointer: (index, left, right) => `-${index}-`,
        });

        let words = ['ching', 'is', 'queen', 'of', 'mine'];
        let text = 'ching-1-is-2-queen-3-of-4-mine';
        assert.equal(text, ci.format(words));
    });

    it('splitter (string)', () => {
        let ci = new leca.Case({
            splitter: '_',
        });
        let text = 'ching_is_queen_of_mine';
        let words = ['ching', 'is', 'queen', 'of', 'mine'];
        assert.deepEqual(words, ci.parse(text));
    });

    it('splitter (RegExp)', () => {
        let ci = new leca.Case({
            splitter: /\.+/,
        });
        let text = 'ching..is...queen.of.....mine';
        let words = ['ching', 'is', 'queen', 'of', 'mine'];
        assert.deepEqual(words, ci.parse(text));
    });
    
    it('wordFormatter', () => {
        let ci = new leca.Case({
            jointer: '/',
            wordFormatter: word => word.toLowerCase(),
        });
        let text = 'ching/is/queen/of/mine';
        let words = ['ching', 'is', 'QUEEN', 'of', 'mine'];
        assert.equal(text, ci.format(words)); 
    });

    it('wordFormatter (return false)', () => {
        let ci = new leca.Case({
            wordFormatter: word => /[a-z]+/.test(word) ? word : false,
        });
        let words = ['foo', '1'];
        assert(!ci.format(words)); 
    });

    it('wordParser', () => {
        let ci = new leca.Case({
            splitter: '/',
            wordParser: word => word.toLowerCase(),
        });
        let text = 'ching/is/QUEEN/of/mine';
        let words = ['ching', 'is', 'queen', 'of', 'mine'];
        assert.deepEqual(words, ci.parse(text)); 
    });

    it('wordParser (return false)', () => {
        let ci = new leca.Case({
            splitter: '/',
            wordParser: word => /[a-z]+/.test(word) ? word : false,
        });
        let text = 'foo/1';
        assert(!ci.parse(text));
    });

    it('terms', () => {
        let ci = new leca.Case({
            splitter: '/',
            jointer: '/',
            terms: ['QUEEN'],
            wordParser: word => word.toLowerCase(),
            wordFormatter: word => word.toLowerCase(),
        });

        if ('parse') {
            let text = 'ching/is/QUEEN/of/MINE';
            let words = ['ching', 'is', 'QUEEN', 'of', 'mine'];
            assert.deepEqual(words, ci.parse(text));
        }

        if ('format') {
            let text = 'ching/is/QUEEN/of/mine';
            let words = ['ching', 'is', 'QUEEN', 'of', 'MINE'];
            assert.equal(text, ci.format(words));
        }
    });
});