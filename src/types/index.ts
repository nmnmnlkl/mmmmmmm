export interface JafrAnalysisRequest {
  name: string;
  mother: string;
  question: string;
}

export interface LetterAnalysis {
  letter: string;
  value: number;
}

export interface WordAnalysis {
  word: string;
  letters: LetterAnalysis[];
  total: number;
}

export interface TraditionalResults {
  nameAnalysis: WordAnalysis;
  motherAnalysis: WordAnalysis;
  questionAnalysis: WordAnalysis;
  totalValue: number;
  reducedValue: number;
  wafqSize: number;
  wafqGrid: number[][];
}

export interface AIAnalysis {
  spiritualInterpretation: string;
  numericalInsights: string;
  guidance: string;
  energyAnalysis: string;
}

export interface AnalysisResult {
  traditional: TraditionalResults;
  ai?: AIAnalysis;
  combinedInterpretation?: string;
}