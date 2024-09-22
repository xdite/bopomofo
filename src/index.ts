import { pinyinToZhuyinMap } from './pinyinToZhuyinMap';
import pinyin from 'pinyin';

export function pinyinToZhuyin(input: string): string[][] {
  // Convert the input to pinyin
  const pinyinArray = pinyin(input, { style: pinyin.STYLE_TONE2 });
  
  // Convert pinyin to Zhuyin
  return pinyinArray.map((pinyinOptions: string[]) => {
    const pinyinSyllable = pinyinOptions[0]; // Take the first pinyin option
    let zhuyin = '';
    let i = 0;
    let tone = '';
    
    while (i < pinyinSyllable.length) {
      const char = pinyinSyllable[i].toLowerCase();
      
      // Check for tone number
      if (char >= '0' && char <= '5') {
        tone = char;
        i++;
        continue;
      }
      
      // Check for special cases first
      const specialCases = ['xiong', 'ying', 'yun', 'yu', 'shi', 'zhi', 'chi', 'ri', 'zi', 'ci', 'si', 'yi', 'wu', 'yin', 'in', 'jing', 'jin'];
      const matchedSpecialCase = specialCases.find(sc => pinyinSyllable.substr(i).toLowerCase().startsWith(sc));
      if (matchedSpecialCase) {
        zhuyin += pinyinToZhuyinMap[matchedSpecialCase];
        i += matchedSpecialCase.length;
        continue;
      }
      
      // Check for three-letter compounds
      if (i < pinyinSyllable.length - 2) {
        const threeLetters = pinyinSyllable.substr(i, 3).toLowerCase();
        if (pinyinToZhuyinMap[threeLetters]) {
          zhuyin += pinyinToZhuyinMap[threeLetters];
          i += 3;
          continue;
        }
      }
      // Check for two-letter compounds
      if (i < pinyinSyllable.length - 1) {
        const twoLetters = pinyinSyllable.substr(i, 2).toLowerCase();
        if (pinyinToZhuyinMap[twoLetters]) {
          zhuyin += pinyinToZhuyinMap[twoLetters];
          i += 2;
          continue;
        }
      }
      // If no compound found, check for single letter
      if (pinyinToZhuyinMap[char]) {
        zhuyin += pinyinToZhuyinMap[char];
      }
      i++;
    }
    
    // Add tone symbol
    zhuyin += getToneSymbol(tone);
    
    return [zhuyin];
  });
}

function getToneSymbol(tone: string): string {
  const toneSymbols = ['ˉ', 'ˊ', 'ˇ', 'ˋ', '˙'];
  return toneSymbols[parseInt(tone) - 1] || 'ˉ'; // Default to neutral tone if no tone is specified
}