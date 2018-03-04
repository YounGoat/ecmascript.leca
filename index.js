'use strict';

const MODULE_REQUIRE = 1
	/* built-in */
	
	/* NPM */
	, noda = require('noda')
	
	/* in-package */
	, Case = noda.inRequire('class/Case')
	, alias = noda.inRequire('alias')
	;

/**
 * Find a matching predefined case style.
 * @param  {string} casename
 * @return leca.Case
 */
function leca(casename) {
	casename = casename
		.toLowerCase()
		.replace(/case$/, '')
		.replace(/[^a-z]/g, '')
		;
	return leca[casename];
}

Object.assign(leca, { Case }, noda.inRequireDir('common'));

for (let name in alias) {
	leca[name] = leca[ alias[name] ];
}

module.exports = leca;