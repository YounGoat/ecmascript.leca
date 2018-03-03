#	leca
__Letter Case Transformer__

[![build status of github.com/YounGoat/ecmascript.leca](https://travis-ci.org/YounGoat/ecmascript.leca.svg?branch=master)](https://travis-ci.org/YounGoat/ecmascript.leca)
[![total downloads of leca](https://img.shields.io/npm/dt/leca.svg)](https://www.npmjs.com/package/leca)
[![leca's License](https://img.shields.io/npm/l/leca.svg)](https://www.npmjs.com/package/leca)
[![latest version of leca](https://img.shields.io/npm/v/leca.svg)](https://www.npmjs.com/package/leca)

To define your own letter case style and to deal with text by it. Or, to deal with text with predefined letter case styles.

##	Table of contents

*	[Get Started](#get-started)
*	[API](#api)
	*	[leca.Case](#lecacase)
	*	[Predefined Common Letter Cases](#predefined-common-letter-cases)
* 	[Examples](#examples)
*	[References](#references)

##	Links

*	[CHANGE LOG](./CHANGELOG.md)
*	[Homepage](https://github.com/YounGoat/ecmascript.leca)

##	Get Started

Use predefined common case styles:

```javascript
const leca = require('leca');

leca.camel.test('camelCase'); 
// RETURN true

leca.camle.test('camel case');
// RETURN false

leca.camel.parse('camelCase');
// RETURN [ "camel", "case" ];

leca.camel.format('Camel', 'CASE');
// RETURN "camelCase"
```

Or, create your own case style:

```javascript
const leca = require('leca');
const myCase = new leca.Case({
  // Used to split a formatted string.
  splitter: /(?=[A-Z])/,

  // Used to transform a word on formatting.
  wordFormatter: (word, index) => {
    if (index == 0) {
      return word.toLowerCase();
    }
    else {
      return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
    }
  },

  // Used to transform a word on parsing.
  wordParser: (word) => {
    return /^[a-zA-Z]+$/.test(word) ? word.toLowerCase() : false;
  }
});
myCase.test('camelCase');       // RETURN true
myCase.test('camel case');      // RETURN false
myCase.parse('camelCase');      // RETURN [ "camel", "case" ]
myCase.format('Camel', 'CASE'); // RETURN "camelCase"
```


##	API

###	leca.Case

An instance of class `leca.Case` represents a case style.

*	class __leca.Case__(object *options*)  
	Hereafter use __\<ci\>__ to represent an instance of __leca.Case__. [See below](#case-constructor-options) for details of *options*.

*	boolean __\<ci\>.test__(string *text*)  
	Return `true` if *text* matches the __\<ci\>__. Otherwise return `false`.
	
*	string[] | false __\<ci\>.parse__(string *text*)  
	Split *text* into words.  
	`false` will be returned if *text* doesnot match the case (e.g. doesnot start with __options.prefix__).

*	string | false __\<ci\>.format__(string[] *words* | ...*words*)  
	Combine the words together according to the case format.  
	`false` will be returned if any word doesnot match the case (depends on __options.wordFormatter__).

*	string | false __\<ci\>.reformat__(string *text*)  
	Parse the *text* and format the words according to the case's format rule.

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
	 * @param {number} [length] Total count of words
	 * @return {string}
	 */
	function(word, index, length) {
		// ...
	}
	```

-	__options.wordParser__ Function OPTIONAL  
	Used in parsing.  
	It should conform to:
	```javascript
	/**
	 * @param {string}  word
	 * @param {number} [index]
	 * @param {number} [length] Total count of words
	 * @return {string | false}
	 */
	function(word, index, length) {
		// ...
	}
	```

###	Predefined Common Letter Cases

For the convenience of developers, the most frequently-used letter case styles are predefined. Developers may access a predefined case style in form of `leca.<stylename>`, e.g.
```javascript
const leca = require('leca');

// Access the predefined case style named "camel".
const mycase = leca.camel;

// ATTENTION: All predefined style names are lowercase, and there are no 
// punctuations or word "case" in names. Please DO NOT take the following for 
// granted:
leca.Pascal         // undefined
leca.camelCase      // undefined
leca['kebab-case']  // undefined
leca.snake_case     // undefined

// For those who have some kind of compulsive disorder, or just only wanna make
// code more comprehensible, invoke `leca()` may be helpful:
leca('Pascal')     === leca.pascal
leca('camelCase')  === leca.camel
leca('kebab-case') === leca.kebab
leca('snake_case') === leca.snake
```

In addition, some (acctually only 1 so far) accompanying methods are offered for each predefined letter case:

*	Case __leca.\*.terms__(string | string[] *terms*)  
	Return case instance based on corresponding predfined leca.Case. e.g.
	```javascript
	leca.camelCase.terms(['HTTP', 'HTTPS']).parse('myHTTPClient');
	// RETURN [ "my", "HTTP", "client" ]
	```

This is multi-cultural world, and a letter case style will be named differently in different occassions. With respect to more people, __leca__ offers some alias for the foregoing predefined case style. 

Next table shows aavailable predefined case styles:

| predefined case   | case name        | example        | remark            |
|:---------------   |:---------        |:-------------- |:----------------- |
| __leca.bicaps__\* | BiCapitalization | *AltaVista* <br> *eBay* |          | 
| __leca.camel__    | camelCase        | *iPhone*       |                   |
| __leca.kebab__    | kebab-case       | *kebab-case*   |                   |
| __leca.pascal__   | PascalCase       | *PostScript*   |                   |
| __leca.sentence__ | Sentence case    | *I love you*   |                   |
| __leca.snake__    | snake_case       | *i_love_you*   |                   |
| __leca.title__\*  | Title Case       | *I Love Your*  |                   |

ATTENTION: __Case postfixed with asterisk \* may be in dispute with its impletation in *leca*. Please BE CAREFUL by yourself when using them.__

##  Examples

Developers can learn how to create own letter case by __leca__ via unit tests and predefined common letter cases:

*	Test Unit: [customised](./test/customised.js)
*	Code: [common/bicaps](./common/bicaps.js)
*	Code: [common/camel](./common/camel.js)
*	Code: [common/kebab](./common/kebab.js)
*	Code: [common/pascal](./common/pascal.js)
*	Code: [common/sentence](./common/sentence.js)
*	Code: [common/snake](./common/snake.js)
*	Code: [common/title](./common/title.js)

##  References

*	WIKIPEDIA: [Letter case](https://en.wikipedia.org/wiki/Letter_case)
*	[TitleCase](http://titlecase.com), online case converters
*	[Guidelines for Using Capital Letters](https://www.thoughtco.com/guidelines-for-using-capital-letters-1691724)
