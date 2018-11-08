'use strict';

const MODULE_REQUIRE = 1
	/* built-in */
	
	/* NPM */
	, noda = require('noda')
	
	/* in-package */
	, Case = noda.inRequire('class/Case')

	/* in-file */
	, lcwords = [
		// articles
		'a', 
		'an', 
		'the',
		
		// coordinating conjunctions
		'and', 
		'but', 
		'or', 
		'for', 
		'nor',
		'so',
		'yet',

		// prepositions
		'above',
		'about',
		'across',
		'against',
		'along',
		'among',
		'around',
		'at',
		'before',
		'behind',
		'below',
		'beneath',
		'beside',
		'between',
		'beyond',
		'by',
		'down',
		'during',
		'except',
		'for',
		'from',
		'in',
		'inside',
		'into',
		'like',
		'near',
		'of',
		'off',
		'on',
		'since',
		'to',
		'toward',
		'through',
		'under',
		'until',
		'up',
		'upon',
		'with',
		'within',
	]
	;

function wordFormatter(word, index, length) {
	let lc = word.toLowerCase();
	if (index == 0 || index == length - 1 || !lcwords.includes(lc)) {
		return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
	}
	else {
		return lc;
	}
}

function wordParser(word, index, length) {
	if (word.length == 0) return false;

	let lc = word.toLowerCase();

	// First and last word should always be with first letter uppercase.
	if (index == 0 || index == length - 1 || !lcwords.includes(lc)) {
		return /^[A-Z][a-z]*$/.test(word) ? lc : false;
	}
	else {
		return word == lc ? word : false;
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