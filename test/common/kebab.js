'use strict';

const MODULE_REQUIRE = 1
    /* built-in */
    , assert = require('assert')

    /* NPM */
    , noda = require('noda')
    
    /* in-package */
    , leca = noda.inRequire('index')
    ;

describe('predefined case: kebab', () => {
    it('format', () => {
        let words = [ 'i', 'LOVE', 'you' ];
        let text = 'i-love-you';
        assert.equal(text, leca.kebab.format(words));
    });

    it('parse', () => {
        let text = 'i-love-you';
        let words = [ 'i', 'love', 'you' ];
        assert.deepEqual(words, leca.kebab.parse(text));
    });

    it('test', () => {
        assert(leca.kebab.test('i-love-you'));

        // Mess case: Upper case.
        assert(!leca.kebab.test('i-Love-you'));

        // Exceeding characters: number.
        assert(!leca.kebab.test('i-love-you-2'));

        // Exceeding characters: spaces.
        assert(!leca.kebab.test('i love-you'));
    });

    it('terms', () => {
        let kebab = leca.kebab.terms(['I', 'LOVE']);
        let text = 'I-LOVE-you';
        let words = [ 'I', 'LOVE', 'you' ];
        assert.deepEqual(words, kebab.parse(text));
        assert.equal(text, kebab.format(words));
    });
});