'use strict';

const MODULE_REQUIRE = 1
	/* built-in */
	
	/* NPM */
	, noda = require('noda')
	
	/* in-package */
	, Case = noda.inRequire('class/Case')
	;


const camel = new Case({
	
	wordFormatter: (word, index) => {
		if (index == 0) return word.toLowerCase();
		else return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
	},
	
	splitter : /(?=[A-Z])/,

	wordParser: (word) => {
		return /^[a-zA-Z]+$/.test(word) ? word.toLowerCase() : false;
	},
	
});

module.exports = camel;