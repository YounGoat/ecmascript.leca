'use strict';

const MODULE_REQUIRE = 1
	/* built-in */
	
	/* NPM */
	, noda = require('noda')
	
	/* in-package */
	, Case = noda.inRequire('class/Case')
	;

function wordFormatter(word, index) {
	if (index == 0) return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
	else return word.toLowerCase();
}

function wordParser(word, index) {
	if (word.length == 0) return false;

	if (index == 0) {
		return /^[A-Z][a-z]*$/.test(word) ? word.toLowerCase() : false;
	}
	else {
		return /^[a-z]+$/.test(word) ? word : false;
	}
}

const splitter = / /;
const jointer = ' ';

const baseOptions = {
	splitter,
	jointer,
	wordFormatter,
	wordParser,
};

/**
 * Create a sentence case which may contain specified terms.
 * @param  {string|string[]} terms
 */
function terms(terms) {
	if (typeof terms == 'string') terms = [ terms ];
	return new Case(Object.assign(baseOptions, { terms }));
}

const sentence = new Case(baseOptions);

Object.assign(sentence, { terms });

module.exports = sentence;