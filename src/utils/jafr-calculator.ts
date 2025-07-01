import type { LetterAnalysis, WordAnalysis, TraditionalResults } from '../types';

// Arabic letter values according to traditional Jafr system
const ARABIC_LETTER_VALUES: Record<string, number> = {
  'ا': 1, 'أ': 1, 'إ': 1, 'آ': 1,
  'ب': 2,
  'ج': 3,
  'د': 4,
  'ه': 5, 'ة': 5,
  'و': 6, 'ؤ': 6,
  'ز': 7,
  'ح': 8,
  'ط': 9,
  'ي': 10, 'ى': 10, 'ئ': 10, 'ء': 10,
  'ك': 20,
  'ل': 30,
  'م': 40,
  'ن': 50,
  'س': 60,
  'ع': 70,
  'ف': 80,
  'ص': 90,
  'ق': 100,
  'ر': 200,
  'ش': 300,
  'ت': 400,
  'ث': 500,
  'خ': 600,
  'ذ': 700,
  'ض': 800,
  'ظ': 900,
  'غ': 1000
};

export class JafrCalculator {
  static analyzeWord(word: string): WordAnalysis {
    const cleanWord = word.replace(/[^\u0600-\u06FF]/g, ''); // Keep only Arabic letters
    const letters: LetterAnalysis[] = [];
    let total = 0;

    for (const letter of cleanWord) {
      const value = ARABIC_LETTER_VALUES[letter] || 0;
      letters.push({ letter, value });
      total += value;
    }

    return {
      word: cleanWord,
      letters,
      total
    };
  }

  static reduceToSingleDigit(number: number): number {
    while (number > 9) {
      number = number.toString().split('').reduce((sum, digit) => sum + parseInt(digit), 0);
    }
    return number;
  }

  static generateWafq(size: number, startValue: number): number[][] {
    const grid: number[][] = Array(size).fill(null).map(() => Array(size).fill(0));
    
    if (size % 2 === 1) {
      // Odd magic square (Siamese method)
      let row = 0;
      let col = Math.floor(size / 2);
      
      for (let num = startValue; num < startValue + (size * size); num++) {
        grid[row][col] = num;
        
        const newRow = (row - 1 + size) % size;
        const newCol = (col + 1) % size;
        
        if (grid[newRow][newCol] !== 0) {
          row = (row + 1) % size;
        } else {
          row = newRow;
          col = newCol;
        }
      }
    } else {
      // Even magic square (simplified approach)
      let num = startValue;
      for (let i = 0; i < size; i++) {
        for (let j = 0; j < size; j++) {
          grid[i][j] = num++;
        }
      }
    }
    
    return grid;
  }

  static calculateTraditionalResults(
    name: string,
    mother: string,
    question: string
  ): TraditionalResults {
    const nameAnalysis = this.analyzeWord(name);
    const motherAnalysis = this.analyzeWord(mother);
    const questionAnalysis = this.analyzeWord(question);
    
    const totalValue = nameAnalysis.total + motherAnalysis.total + questionAnalysis.total;
    const reducedValue = this.reduceToSingleDigit(totalValue);
    const wafqSize = Math.max(3, Math.min(9, reducedValue));
    const wafqGrid = this.generateWafq(wafqSize, reducedValue);

    return {
      nameAnalysis,
      motherAnalysis,
      questionAnalysis,
      totalValue,
      reducedValue,
      wafqSize,
      wafqGrid
    };
  }
}