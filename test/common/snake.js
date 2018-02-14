'use strict';

const MODULE_REQUIRE = 1
    /* built-in */
    , assert = require('assert')

    /* NPM */
    , noda = require('noda')
    
    /* in-package */
    , leca = noda.inRequire('index')
    ;

describe('predefined case: snake', () => {
    it('format', () => {
        let words = [ 'i', 'LOVE', 'you' ];
        let text = 'i_love_you';
        assert.equal(text, leca.snake.format(words));
    });

    it('parse', () => {
        let text = 'i_love_you';
        let words = [ 'i', 'love', 'you' ];
        assert.deepEqual(words, leca.snake.parse(text));
    });

    it('test', () => {
        assert(leca.snake.test('i_love_you'));

        // Mess case: Upper case.
        assert(!leca.snake.test('i_Love_you'));

        // Exceeding characters: number.
        assert(!leca.snake.test('i_love_you_2'));

        // Exceeding characters: spaces.
        assert(!leca.snake.test('i love_you'));
    });

    it('terms', () => {
        let snake = leca.snake.terms(['I', 'LOVE']);
        let text = 'I_LOVE_you';
        let words = [ 'I', 'LOVE', 'you' ];
        assert.deepEqual(words, snake.parse(text));
        assert.equal(text, snake.format(words));
    });
});