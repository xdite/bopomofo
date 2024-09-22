import pinyinToZhuyin from './index';

describe('pinyinToZhuyin', () => {
  test('converts "中心" to Zhuyin correctly', () => {
    const result = pinyinToZhuyin('中心');
    expect(result).toEqual([['ㄓㄨㄥˉ'], ['ㄒㄧㄣˉ']]);
  });

  test('converts "你好" to Zhuyin correctly', () => {
    const result = pinyinToZhuyin('你好');
    expect(result).toEqual([['ㄋㄧˇ'], ['ㄏㄠˇ']]);
  });

  test('converts "臺灣" to Zhuyin correctly', () => {
    const result = pinyinToZhuyin('臺灣');
    expect(result).toEqual([['ㄊㄞˊ'], ['ㄨㄢˉ']]);
  });

  test('converts "再見" to Zhuyin correctly', () => {
    const result = pinyinToZhuyin('再見');
    expect(result).toEqual([['ㄗㄞˋ'], ['ㄐㄧㄢˋ']]);
  });

  test('converts "學習" to Zhuyin correctly', () => {
    const result = pinyinToZhuyin('學習');
    expect(result).toEqual([['ㄒㄩㄝˊ'], ['ㄒㄧˊ']]);
  });
});