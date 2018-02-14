'use strict';

const MODULE_REQUIRE = 1
	/* built-in */
	
	/* NPM */
	, noda = require('noda')
	
	/* in-package */
	, Case = noda.inRequire('class/Case')
	;

function wordFormatter(word, index) {
	if (index == 0) return word.toLowerCase();
	else return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
}

function wordParser(word) {
	return /^[a-zA-Z]+$/.test(word) ? word.toLowerCase() : false;
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

const camel = new Case(baseOptions);

Object.assign(camel, { terms });

module.exports = camel;