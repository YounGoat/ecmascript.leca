'use strict';

const MODULE_REQUIRE = 1
    /* built-in */
    , assert = require('assert')

    /* NPM */
    , noda = require('noda')
    
    /* in-package */
    , leca = noda.inRequire('index')
    ;

describe('predefined cases: pascal', () => {
    it('format', () => {
        let words = [ 'ching', 'is', 'QUEEN', 'of', 'MINE' ];
        let text = 'ChingIsQueenOfMine';
        assert.equal(text, leca.pascal.format(words));
    });

    it('parse', () => {
        let text = 'ChingIsQueenOfMine';
        let words = [ 'ching', 'is', 'queen', 'of', 'mine' ];
        assert.deepEqual(words, leca.pascal.parse(text));
    });

    it('test', () => {
        assert(leca.pascal.test('ChingIsQueenOfMine'));
        assert(!leca.pascal.test('chingIsQueenOfMine'));
        assert(!leca.pascal.test('ching_IsQueenOfMine'));
        assert(!leca.pascal.parse('chingIsQueenOfMine'));
        assert(!leca.pascal.parse('ching_IsQueenOfMine'));
    });

    it('terms', () => {
        let pascal = leca.pascal.terms('MyMajesty');
        let text = 'ChingIsMyMajesty';
        let words = [ 'ching', 'is', 'MyMajesty' ];
        assert.deepEqual(words, pascal.parse(text));
        assert.equal(text, pascal.format(words));
    });
});