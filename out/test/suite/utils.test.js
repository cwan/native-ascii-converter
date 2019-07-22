"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const assert = require("assert");
const utils = require("../../utils");
suite('utils Test Suite', () => {
    test('nativeToAscii test', () => {
        assert.equal('', utils.nativeToAscii(''));
        assert.equal('ABC 123=!"#$%&\'()=^|', utils.nativeToAscii('ABC 123=!"#$%&\'()=^|'));
        assert.equal('\\u3042\\u3044\\u3046\\u3048\\u304a', utils.nativeToAscii('あいうえお'));
        assert.equal('\\u30421\\u30442\\u30463\\u30484\\u304a', utils.nativeToAscii('あ1い2う3え4お'));
        assert.equal('\\ud840\\udc0b', utils.nativeToAscii('𠀋'));
        assert.equal('\\uD840\\uDC0B\\u304A', utils.nativeToAscii('𠀋お', false));
    });
    test('asciiToNative test', () => {
        assert.equal('', utils.nativeToAscii(''));
        assert.equal('ABC 123=!"#$%&\'()=^|', utils.asciiToNative('ABC 123=!"#$%&\'()=^|'));
        assert.equal('あいうえお', utils.asciiToNative('\\u3042\\u3044\\u3046\\u3048\\u304a'));
        assert.equal('あ1い2う3え4お', utils.asciiToNative('\\u30421\\u30442\\u30463\\u30484\\u304a'));
        assert.equal('𠀋', utils.asciiToNative('\\ud840\\udc0b'));
        assert.equal('𠀋お', utils.asciiToNative('\\uD840\\uDC0B\\u304A'));
    });
});
//# sourceMappingURL=utils.test.js.map