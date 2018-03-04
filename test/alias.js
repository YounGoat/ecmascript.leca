'use strict';

const MODULE_REQUIRE = 1
    /* built-in */
    , assert = require('assert')

    /* NPM */
    , noda = require('noda')
    
    /* in-package */
    , leca = noda.inRequire('index')
    ;

describe('alias', () => {
	it('lowercamel', () => {
		assert.equal(leca.lowercamel, leca.camel);
	});

	it('uppercamel', () => {
		assert.equal(leca.uppercamel, leca.pascal);
	});
});
