"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const assert = require("assert");
const functions = require("../../functions");
suite('Functions Test Suite', () => {
    test('nativeToAscii test', () => {
        assert.equal('', functions.nativeToAscii(''));
        assert.equal('ABC 123=!"#$%&\'()=^|', functions.nativeToAscii('ABC 123=!"#$%&\'()=^|'));
        assert.equal('\\u3042\\u3044\\u3046\\u3048\\u304a', functions.nativeToAscii('あいうえお'));
        assert.equal('\\u30421\\u30442\\u30463\\u30484\\u304a', functions.nativeToAscii('あ1い2う3え4お'));
        assert.equal('\\ud840\\udc0b', functions.nativeToAscii('𠀋'));
        assert.equal('\\uD840\\uDC0B\\u304A', functions.nativeToAscii('𠀋お', false));
    });
    test('asciiToNative test', () => {
        assert.equal('', functions.nativeToAscii(''));
        assert.equal('ABC 123=!"#$%&\'()=^|', functions.asciiToNative('ABC 123=!"#$%&\'()=^|'));
        assert.equal('あいうえお', functions.asciiToNative('\\u3042\\u3044\\u3046\\u3048\\u304a'));
        assert.equal('あ1い2う3え4お', functions.asciiToNative('\\u30421\\u30442\\u30463\\u30484\\u304a'));
        assert.equal('𠀋', functions.asciiToNative('\\ud840\\udc0b'));
        assert.equal('𠀋お', functions.asciiToNative('\\uD840\\uDC0B\\u304A'));
    });
});
//# sourceMappingURL=functions.test.js.map