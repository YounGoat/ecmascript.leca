'use strict';

const MODULE_REQUIRE = 1
    /* built-in */
    , assert = require('assert')

    /* NPM */
    , noda = require('noda')
    
    /* in-package */
    , leca = noda.inRequire('index')
    ;

describe('predefined cases: bicaps', () => {
    it('format, first word has only one character', () => {
        let words = [ 'i', 'Mac' ];
        let text = 'iMac';
        assert.equal(text, leca.bicaps.format(words));
    });

    it('format, others', () => {
        let words = [ 'Post', 'Script' ];
        let text = 'PostScript';
        assert.equal(text, leca.bicaps.format(words));
    });

    it('parse, first word has only one character', () => {
        let text = 'iMac';
        let words = [ 'i', 'mac' ];
        assert.deepEqual(words, leca.bicaps.parse(text));
    });

    it('parse, others', () => {
        let text = 'PostScript';
        let words = [ 'post', 'script' ];
        assert.deepEqual(words, leca.bicaps.parse(text));
    });

    it('test', () => {
        assert(leca.bicaps.test('iMac'));
        assert(leca.bicaps.test('PostScript'));
        assert(!leca.bicaps.test('IMac'));
        assert(!leca.bicaps.test('postScript'));
        assert(!leca.bicaps.parse('Post.Script'));
        assert(!leca.bicaps.parse('post_script'));
    });

    it('terms', () => {
        let bicaps = leca.bicaps.terms('HTTP');
        let text = 'HTTPClient';
        let words = [ 'HTTP', 'client' ];
        assert.deepEqual(words, bicaps.parse(text));
        assert.equal(text, bicaps.format(words));
    });
});