#   leca Change Log

Notable changes to this project will be documented in this file. This project adheres to [Semantic Versioning 2.0.0](http://semver.org/).

##	[0.0.10] - Mar 4th, 2018

*	Alias `leca.lowercamel` added.
*	Alias `leca.uppercamel` added.

##	[0.0.9] - Mar 3rd, 2018

*	Package main entrance becomes function `leca()`.
*	In `new leca.Case(options)`, the third parameter `length` is passed into `options.wordFormatter()` and `options.wordParser()`.
*	Predefined case `leca.bicaps` added.
*	Predefined case `leca.title` added.
*	[README.md] improved greatly.

##	[0.0.8] - Feb 15th, 2018

*	Predefined case `leca.kebab` added.
*	Predefined case `leca.pascal` added.
*	Predefined case creator `leca.kebab.terms()` added.
*	Predefined case creator `leca.pascal.terms()` added.
*	Restrict `leca.camel.parse()`  to return false when the first character is upper case.

##	[0.0.7] - Feb 14th, 2018

*	Make `<case>.format()` to accept seperated string arguments beyond a string array.
*	Sub method `<case>.reformat()` added.

##	[0.0.6] - Feb 14th, 2018

*	Predefined case `leca.snake` added.
*	Predefined case creator `leca.snake.terms()` added.
*	Predefined case creator `leca.camel.terms()` added.
*	Predefined case creator `leca.sentence.terms()` added.

##	[0.0.2] - Feb 12th, 2018

*	Predefined case `leca.sentence` added.

##	[0.0.1] - Feb 11th, 2018

Released.

---
This CHANGELOG.md follows [*Keep a CHANGELOG*](http://keepachangelog.com/).
