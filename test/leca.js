'use strict';

const MODULE_REQUIRE = 1
    /* built-in */
    , assert = require('assert')

    /* NPM */
    , noda = require('noda')
    
    /* in-package */
    , leca = noda.inRequire('index')
    ;

describe('assistant methods', () => {
	it('leca()', () => {
		assert.equal(leca('camelCase' ), leca.camel );
		assert.equal(leca('Pascal'    ), leca.pascal);
		assert.equal(leca('snake_case'), leca.snake );
	});
});
