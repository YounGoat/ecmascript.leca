'use strict';

const MODULE_REQUIRE = 1
	/* built-in */
	
	/* NPM */
	, noda = require('noda')
	
	/* in-package */
	, Case = noda.inRequire('class/Case')
	;

const leca = Object.assign({ Case }, noda.inRequireDir('common'));
module.exports = leca;