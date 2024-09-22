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
      // 注意：特殊情况的处理顺序非常重要，以确保正确转换
      // 1. 首先处理最长的特殊组合（如 'xiong'），以避免被错误地拆分
      // 2. 然后处理可能引起歧义的组合（如 'jin' 和 'jing'），确保 'jing' 在 'jin' 之前
      // 3. 接着处理其他常见的特殊组合
      // 4. 最后处理单个韵母，如 'i', 'u' 等
      // 这个顺序确保了像 "銀行"(yin2 hang2)、"音響"(yin1 xiang3) 和 "環境"(huan2 jing4) 这样的词能被正确处理
      const specialCases = [
        'xiong', 'jing', 'ying', 'yun', 'jin', 'yin',
        'ang', 'eng', 'ing', 'ong',
        'yu', 'shi', 'zhi', 'chi', 'ri', 'zi', 'ci', 'si',
        'yi', 'wu', 'in'
      ];
      const matchedSpecialCase = specialCases.find(sc => pinyinSyllable.substr(i).toLowerCase().startsWith(sc));
      if (matchedSpecialCase) {
        zhuyin += pinyinToZhuyinMap[matchedSpecialCase];
        i += matchedSpecialCase.length;
        continue;
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