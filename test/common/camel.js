'use strict';

const MODULE_REQUIRE = 1
    /* built-in */
    , assert = require('assert')

    /* NPM */
    , noda = require('noda')
    
    /* in-package */
    , leca = noda.inRequire('index')
    ;

describe('predefined cases: camel', () => {
    it('format', () => {
        let words = [ 'ching', 'is', 'QUEEN', 'of', 'MINE' ];
        let text = 'chingIsQueenOfMine';
        assert.equal(text, leca.camel.format(words));
    });

    it('parse', () => {
        let text = 'chingIsQueenOfMine';
        let words = [ 'ching', 'is', 'queen', 'of', 'mine' ];
        assert.deepEqual(words, leca.camel.parse(text));
    });

    it('test', () => {
        assert(leca.camel.test('chingIsQueenOfMine'));
        assert(!leca.camel.test('ching_IsQueenOfMine'));
    });

    it('terms', () => {
        let camel = leca.camel.terms('MyMajesty');
        let text = 'chingIsMyMajesty';
        let words = [ 'ching', 'is', 'MyMajesty' ];
        assert.deepEqual(words, camel.parse(text));
        assert.equal(text, camel.format(words));
    });
});