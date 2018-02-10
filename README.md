#	leca
__Letter Case Transformer__

[![total downloads of leca](https://img.shields.io/npm/dt/leca.svg)](https://www.npmjs.com/package/leca)
[![leca's License](https://img.shields.io/npm/l/leca.svg)](https://www.npmjs.com/package/leca)
[![latest version of leca](https://img.shields.io/npm/v/leca.svg)](https://www.npmjs.com/package/leca)

To customise your own letter case transformer.

##	Table of contents

*	[Get Started](#get-started)
*	[API](#api)
* 	[Examples](#examples)
*	[References](#references)

##	Links

*	[CHANGE LOG](./CHANGELOG.md)
*	[Homepage](https://github.com/YounGoat/ecmascript.leca)

##	Get Started

```javascript
const leca = require('leca');

leca.camel.test('camelCase'); 
// RETURN true

leca.camel.parse('camelCase');
// RETURN [ "camel", "case" ];

leca.camel.format('Camel', 'CASE');
// RETURN "camelCase"
```

##	API

###	leca.Case

*	class __leca.Case__(object *options*)  
	Hereafter use __\<ci\>__ to represent an instance of __leca.Case__. [See below](#case-constructor-options) for details of *options*.

*	boolean __\<ci\>.test__(string *text*)  
	Return `true` if *text* matches the __\<ci\>__. Otherwise return `false`.
	
*	string[] | false __\<ci\>.parse__(string *text*)  
	Split *text* into words.  
	`false` will be returned if *text* doesnot match the case (e.g. doesnot start with __options.prefix__).

*	string | false __\<ci\>.format__(string[] *words*)  
	Combine the words together according to the case format.  
	`false` will be returned if any word doesnot match the case (depends on __options.wordFormatter__).

<a name="case-constructor-options"></a>
Following options may be used in `new leca.Case(options)` to define a letter case:

-	__options.prefix__ string OPTIONAL  
	What matching texts start with.  

-	__options.postfix__ string OPTIONAL  
	What matching texts end with.

-	__options.jointer__ string | Function OPTIONAL DEFAULT `""`  
	Used in formatting.  
	As a string, it will be put between every two words.  
	As a function, it should conform to:
	```javascript
	/**
	 * @param {number} [index]
	 * @param {string} [left]
	 * @param {string} [right]
	 * @return {string}
	 */
	function(index, left, right) {
		// ...
	}
	```
-	__options.splitter__ string | RegExp OPTIONAL  
	Used in parsing.

-	__options.terms__ string[] OPTIONAL  
	Words to be preserved with its original style.   
	In other words, the *terms* will escape from the constrains of __options.wordFormatter__ and __options.wordParser__.

-	__options.wordFormatter__ Function OPTIONAL  
	Used in formatting.  
	It should conform to:
	```javascript
	/**
	 * @param {string}  word
	 * @param {number} [index]
	 * @return {string}
	 */
	function(word, index) {
		// ...
	}
	```

-	__options.wordParser__ Function OPTIONAL  
	Used in parsing.  
	It should conform to:
	```javascript
	/**
	 * @param {string}  word
	 * @return {string | false}
	 */
	function(word) {
		// ...
	}
	```

###	Predefined Common Letter Cases

*	__leca.camel__  
	See [test unit](./test/common/camel.js) for examples.

##  Examples

Developers can learn how to create own letter case by __leca__ via unit tests and predefined common letter cases:

*	Test Unit: [customised](./test/customised.js)
*	Code: [common/camel](./common/camel.js)

##  References

*	WIKIPEDIA: [Letter case](https://en.wikipedia.org/wiki/Letter_case)