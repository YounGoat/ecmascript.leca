'use strict';

const MODULE_REQUIRE = 1
	/* built-in */
	
	/* NPM */
	, noda = require('noda')
	
	/* in-package */
	, Case = noda.inRequire('class/Case')
	;

function wordFormatter(word, index) {
	return word.toLowerCase();
}

function wordParser(word) {
	return /^[a-z]+$/.test(word) ? word : false;
}

const baseOptions = {
	jointer: '_',
	splitter: '_',
	wordFormatter,
	wordParser,
};

/**
 * Create a camel case which may contain specified terms.
 * @param  {string|string[]} terms
 */
function terms(terms) {
	if (typeof terms == 'string') terms = [ terms ];
	return new Case(Object.assign(baseOptions, { terms }));
}

const snake = new Case(baseOptions);

Object.assign(snake, { terms });

module.exports = snake;