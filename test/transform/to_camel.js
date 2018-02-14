'use strict';

const MODULE_REQUIRE = 1
    /* built-in */
    , assert = require('assert')

    /* NPM */
    , noda = require('noda')
    
    /* in-package */
    , leca = noda.inRequire('index')
    ;

describe.only('Used as transformer', () => {
    it('toCamel', () => {
        let ci = new leca.Case({
			splitter: /[\s_\-]/,
			jointer: '-',
            wordFormatter: word => word.toLowerCase(),
		}); 
		
		console.log(ci.reformat('3.0 a simple test'));
    
        assert.equal('foo-bar', ci.reformat('foo BAR'));
	});
});