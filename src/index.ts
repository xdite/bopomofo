import pinyin from 'pinyin';
import { pinyinToZhuyinMap } from './pinyinToZhuyinMap';

function pinyinToZhuyin(text: string): string[][] {
  const pinyinResult = pinyin(text, { style: pinyin.STYLE_TONE2 });
  
  return pinyinResult.map((syllables: string[]) => 
    syllables.map((syllable: string) => {
      let zhuyin = '';
      let tone = '';
      
      // Extract tone
      if (syllable.match(/[1-4]$/)) {
        tone = syllable.slice(-1);
        syllable = syllable.slice(0, -1);
      }
      
      // Convert to Zhuyin
      for (let i = 0; i < syllable.length; i++) {
        const chunk = syllable.slice(i);
        for (let j = chunk.length; j > 0; j--) {
          const subChunk = chunk.slice(0, j);
          if (pinyinToZhuyinMap[subChunk]) {
            zhuyin += pinyinToZhuyinMap[subChunk];
            i += j - 1;
            break;
          }
        }
      }
      
      // Add tone mark
      if (tone) {
        zhuyin += ['', 'ˉ', 'ˊ', 'ˇ', 'ˋ'][parseInt(tone)];
      }
      
      return zhuyin;
    })
  );
}

export default pinyinToZhuyin;