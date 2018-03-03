'use strict';

const MODULE_REQUIRE = 1
	/* built-in */
	
	/* NPM */
	
	/* in-package */

	/* in-file */
	;

class Case {
	/**
	 * @param  {string}   [options.prefix]         prefix of formatted text
	 * @param  {string}   [options.postfix]        postfix of formatted text
	 * @param  {string}   [options.jointer]        used in formatting
	 * @param  {Function} [options.jointer]        used in formatting
	 * @param  {string}   [options.splitter=""]    used in parsing
	 * @param  {RegExp}   [options.splitter]       used in parsing
	 * @param  {string[]} [options.terms]          terms to preserve
	 * @param  {Function} [options.wordFormatter]  used to format word in formatting
	 * @param  {Function} [options.wordParser]     used to parse word in parsing
	 */
	constructor(options) {
		options = Object.assign({
			splitter: '',
			terms: [],
		}, options);

		// jointer
		if (!['undefined', 'string', 'function'].includes(typeof options.jointer)) {
			throw new Error('Case jointer should be a string or function');
		}

		// splitter
		if (!['string', 'function'].includes(typeof options.splitter) 
			&& !(options.splitter instanceof RegExp)) {
			throw new Error('Case splitter should be a string, function or RegExp');
		}

		// wordFormatter
		if (!['undefined', 'function'].includes(typeof options.wordParser)) {
			throw new Error('Case wordFormatter should be a function');
		}

		// wordParser
		if (!['undefined', 'function'].includes(typeof options.wordParser)) {
			throw new Error('Case wordParser should be a function');
		}

		if (!(options.terms instanceof Array)) {
			throw new Error('Case terms should be an Array');
		}

		this.options = options;
	}

	test(text) {
		let words = this.parse(text);
		if (words === false) {
			return false;
		}
		else {
			return this.format(words) == text;
		}
	}

	parse(text) {
		let options = this.options;
		
		if (options.prefix) {
			if (!text.startsWith(options.prefix)) return false;
			text = text.slice(options.prefix.length);
		}

		if (options.postfix) {
			if (!text.endsWith(options.postfix)) return false;
			text = text.slice(0, - options.postfix.length);
		}
		
		let words;
		if (typeof options.splitter == 'function') {
			words = options.splitter(text);
		} 
		else {
			words = text.split(options.splitter);
		}

		let invalidFound = false;
		if (options.wordParser) {
			for (let i = 0; i < words.length; i++) {
				if (options.terms.includes(words[i])) continue;
				
				let pw = options.wordParser(words[i], i, words.length);
				if (invalidFound = (pw === false)) break;
				else words[i] = pw;
			}
		}
		if (invalidFound) return false;

		return words;
	}

	format(words) {
		words = Array.prototype.concat.apply([], Array.from(arguments));

		let outputs = [];
		let options = this.options;

		if (options.prefix) {
			outputs.push(options.prefix);
		}

		let invalidFound = false;
		for (let index = 0; index < words.length; index++) {
			if (index > 0) {
				if (typeof options.jointer == 'string') {
					outputs.push(options.jointer);
				}
				else if (typeof options.jointer == 'function') {
					outputs.push(options.jointer(index, words[index-1], words[index+1]));
				}
			}
			if (options.wordFormatter && !options.terms.includes(words[index])) {
				let fw = options.wordFormatter(words[index], index, words.length);
				if (invalidFound = (fw === false)) break;
				else outputs.push(fw);
			}
			else {
				outputs.push(words[index]);
			}
		}
		if (invalidFound) return false;

		if (options.postfix) {
			outputs.push(options.postfix);
		}
		
		return outputs.join('');
	}

	reformat(text) {
		let words = this.parse(text);
		return words ? this.format(words) : false;
	}
}

module.exports = Case;