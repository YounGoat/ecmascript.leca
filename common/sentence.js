'use strict';

const MODULE_REQUIRE = 1
	/* built-in */
	
	/* NPM */
	, noda = require('noda')
	
	/* in-package */
	, Case = noda.inRequire('class/Case')
	;


const sentence = new Case({
	
	wordFormatter: (word, index) => {
		if (index == 0) return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
		else return word.toLowerCase();
	},
	
	splitter: / /,
	jointer: ' ',
	
	wordParser: (word, index) => {
		if (word.length == 0) return false;

		if (index == 0) {
			return /^[A-Z][a-z]*$/.test(word) ? word.toLowerCase() : false;
		}
		else {
			return /^[a-z]+$/.test(word) ? word : false;
		}
	},
	
});

module.exports = sentence;