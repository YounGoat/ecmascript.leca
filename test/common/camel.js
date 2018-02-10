'use strict';

const MODULE_REQUIRE = 1
    /* built-in */
    , assert = require('assert')

    /* NPM */
    , noda = require('noda')
    
    /* in-package */
    , leca = noda.inRequire('index')
    ;

describe('predefined cases', () => {
    let words = [ 'ching', 'is', 'QUEEN', 'of', 'MINE' ];

    it('camelCase', () => {
        assert.equal('chingIsQueenOfMine', leca.camel.format(words));
        assert.deepEqual([ 'ching', 'is', 'queen', 'of', 'mine' ], leca.camel.parse('chingIsQueenOfMine'));
        assert(leca.camel.test('chingIsQueenOfMine'));
        assert(!leca.camel.test('ching_IsQueenOfMine'));
    });
    
});