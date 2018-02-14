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
        let text = 'I love you';
        assert.equal(text, leca.sentence.format(words));
    });

    it('parse', () => {
        let text = 'I love you';
        let words = [ 'i', 'love', 'you' ];
        assert.deepEqual(words, leca.sentence.parse(text));
    });

    it('test', () => {
        assert(leca.sentence.test('I love you too'));

        // Mess case: Upper case in not-first words.
        assert(!leca.sentence.test('I LOVE YOU'));

        // Mess case: Initial letter not capitalized.
        assert(!leca.sentence.test('i love you'));

        // Exceeding characters: number.
        assert(!leca.sentence.test('i love you 2'));

        // Exceeding characters: special character.
        assert(!leca.sentence.test('i _love_ you'));
    });

    it('terms', () => {
        let sentence = leca.sentence.terms('LOVE');
        let text = 'I LOVE you';
        let words = [ 'i', 'LOVE', 'you' ];
        assert.deepEqual(words, sentence.parse(text));
        assert.equal(text, sentence.format(words));
    });
});