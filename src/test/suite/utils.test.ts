import * as assert from 'assert';
import * as utils from '../../utils';

const dataList: Array<{native: string, ascii: string, upperCase?: boolean}> = [
  {
    native: '',
    ascii: ''
  },
  {
    native: 'ABC 123=!"#$%&\'()=^|',
    ascii: 'ABC 123=!"#$%&\'()=^|'
  },
  {
    native: 'あいうえお',
    ascii: '\\u3042\\u3044\\u3046\\u3048\\u304a'
  },
  {
    native: 'あ1い2う3え4お',
    ascii: '\\u30421\\u30442\\u30463\\u30484\\u304a'
  },
  {
    native: '𠀋',
    ascii: '\\ud840\\udc0b'
  },
  {
    native: '𠀋お',
    ascii: '\\uD840\\uDC0B\\u304A',
    upperCase: true
  },
  {
    native: '¡ ÿ',
    ascii: '\\u00a1 \\u00ff'
  },
  {
    native: '\\',
    ascii: '\\'
  },
  {
    native: '\\/mnt\\/record\\',
    ascii: '\\/mnt\\/record\\'
  }
];

suite('utils Test Suite', () => {

  test('nativeToAscii test', () => {
    dataList.forEach(data => {
      assert.equal(data.ascii, utils.nativeToAscii(data.native, !data.upperCase));
    });
  });

  test('asciiToNative test', () => {
    dataList.forEach(data => {
      assert.equal(data.native, utils.asciiToNative(data.ascii));
    });
  });
});
