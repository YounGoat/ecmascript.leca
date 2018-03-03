'use strict';

const MODULE_REQUIRE = 1
	/* built-in */
	
	/* NPM */
	, noda = require('noda')
	
	/* in-package */
	, Case = noda.inRequire('class/Case')
	;

function wordFormatter(word, index) {
	if (word.length == 1 && index == 0) return word.toLowerCase();
	return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
}

function wordParser(word, index) {
	if (index == 0 && word.length == 1) return /[a-z]/.test(word) ? word : false;
	return /^[A-Z][a-z]*$/.test(word) ? word.toLowerCase() : false;
}

const baseOptions = {
	splitter: /(?=[A-Z])/,
	wordFormatter,
	wordParser,
};

/**
 * Create a camel case which may contain specified terms.
 * @param  {string|string[]} terms
 */
function terms(terms) {
	if (typeof terms == 'string') terms = [ terms ];
	let splitter = text => {
		let words = [];

		while (text.length) {
			let word = null;
			for (let i = 0; i < terms.length; i++) {
				if (text.startsWith(terms[i])) {
					word = terms[i];
					break;
				}
			}
			if (!word) {
				/^(.[^A-Z]*)/.test(text);
				word = RegExp.$1;
			}
			
			words.push(word);
			text = text.substr(word.length);
		}
		return words;
	}
	return new Case(Object.assign(baseOptions, { terms, splitter }));
}

const bicaps = new Case(baseOptions);

Object.assign(bicaps, { terms });

module.exports = bicaps;