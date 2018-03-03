'use strict';

const MODULE_REQUIRE = 1
    /* built-in */
    , assert = require('assert')

    /* NPM */
    , noda = require('noda')
    
    /* in-package */
    , leca = noda.inRequire('index')
    ;

describe('predefined case: sentence', () => {
    it('format', () => {
        let words = [ 'i', 'LOVE', 'you' ];
        let text = 'I Love You';
        assert.equal(text, leca.title.format(words));
    });

    it('parse', () => {
        let text = 'I Love You';
        let words = [ 'i', 'love', 'you' ];
        assert.deepEqual(words, leca.title.parse(text));
    });

    it('test', () => {
        assert(leca.title.test('I Love You'));

        // prepositions SHOULD be lowercase.
        assert(leca.title.test('Ching Is King of Mine'));

        // Mess case: Initial letter not capitalized.
        assert(!leca.title.test('I love you'));

        // Mess case: Upper case in not-first words.
        assert(!leca.title.test('I LOVE YOU'));

        // Mess case: Initial letter not capitalized.
        assert(!leca.title.test('i love you'));

        // Exceeding characters: number.
        assert(!leca.title.test('i love you'));

        // Exceeding characters: special character.
        assert(!leca.title.test('i _love_ you'));
    });

    it('terms', () => {
        let title = leca.title.terms('LOVE');
        let text = 'I LOVE You';
        let words = [ 'i', 'LOVE', 'you' ];
        assert.deepEqual(words, title.parse(text));
        assert.equal(text, title.format(words));
    });
});