import React from 'react';
import { Calculator, Hash, Grid3X3, TrendingUp } from 'lucide-react';
import type { TraditionalResults } from '../types';

interface TraditionalResultsProps {
  results: TraditionalResults;
}

export const TraditionalResults: React.FC<TraditionalResultsProps> = ({ results }) => {
  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full mb-4">
          <Calculator className="w-8 h-8 text-white" />
        </div>
        <h3 className="text-2xl font-bold text-gray-800 mb-2">النتائج التقليدية</h3>
        <p className="text-gray-600">الحسابات الأساسية وفقاً لعلم الجفر التقليدي</p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Name Analysis */}
        <div className="bg-white rounded-xl p-6 border border-green-200 shadow-lg">
          <h4 className="font-bold text-green-800 mb-4 flex items-center gap-2">
            <Hash className="w-5 h-5" />
            تحليل الاسم: {results.nameAnalysis.word}
          </h4>
          <div className="space-y-2">
            {results.nameAnalysis.letters.map((letter, index) => (
              <div key={index} className="flex justify-between items-center py-1 border-b border-gray-100 last:border-b-0">
                <span className="font-medium text-gray-700">{letter.letter}</span>
                <span className="text-green-600 font-semibold">{letter.value}</span>
              </div>
            ))}
            <div className="flex justify-between items-center pt-2 border-t-2 border-green-200 font-bold text-green-800">
              <span>المجموع</span>
              <span>{results.nameAnalysis.total}</span>
            </div>
          </div>
        </div>

        {/* Mother Analysis */}
        <div className="bg-white rounded-xl p-6 border border-blue-200 shadow-lg">
          <h4 className="font-bold text-blue-800 mb-4 flex items-center gap-2">
            <Hash className="w-5 h-5" />
            تحليل اسم الأم: {results.motherAnalysis.word}
          </h4>
          <div className="space-y-2">
            {results.motherAnalysis.letters.map((letter, index) => (
              <div key={index} className="flex justify-between items-center py-1 border-b border-gray-100 last:border-b-0">
                <span className="font-medium text-gray-700">{letter.letter}</span>
                <span className="text-blue-600 font-semibold">{letter.value}</span>
              </div>
            ))}
            <div className="flex justify-between items-center pt-2 border-t-2 border-blue-200 font-bold text-blue-800">
              <span>المجموع</span>
              <span>{results.motherAnalysis.total}</span>
            </div>
          </div>
        </div>

        {/* Question Analysis */}
        <div className="bg-white rounded-xl p-6 border border-purple-200 shadow-lg md:col-span-2">
          <h4 className="font-bold text-purple-800 mb-4 flex items-center gap-2">
            <Hash className="w-5 h-5" />
            تحليل السؤال: {results.questionAnalysis.word}
          </h4>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-2">
            {results.questionAnalysis.letters.map((letter, index) => (
              <div key={index} className="flex flex-col items-center p-2 bg-purple-50 rounded-lg">
                <span className="font-medium text-gray-700 text-lg">{letter.letter}</span>
                <span className="text-purple-600 font-semibold text-sm">{letter.value}</span>
              </div>
            ))}
          </div>
          <div className="flex justify-between items-center pt-4 border-t-2 border-purple-200 font-bold text-purple-800">
            <span>المجموع</span>
            <span>{results.questionAnalysis.total}</span>
          </div>
        </div>
      </div>

      {/* Summary */}
      <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl p-6 border border-indigo-200">
        <h4 className="font-bold text-indigo-800 mb-4 flex items-center gap-2">
          <TrendingUp className="w-5 h-5" />
          الملخص العددي
        </h4>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <div className="text-center p-4 bg-white rounded-lg shadow-sm">
            <div className="text-2xl font-bold text-indigo-600">{results.totalValue}</div>
            <div className="text-sm text-gray-600">المجموع الكلي</div>
          </div>
          <div className="text-center p-4 bg-white rounded-lg shadow-sm">
            <div className="text-2xl font-bold text-purple-600">{results.reducedValue}</div>
            <div className="text-sm text-gray-600">الرقم المختزل</div>
          </div>
          <div className="text-center p-4 bg-white rounded-lg shadow-sm">
            <div className="text-2xl font-bold text-green-600">{results.wafqSize}×{results.wafqSize}</div>
            <div className="text-sm text-gray-600">حجم الوفق</div>
          </div>
        </div>
      </div>

      {/* Wafq Grid */}
      <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-lg">
        <h4 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
          <Grid3X3 className="w-5 h-5" />
          الوفق المحسوب
        </h4>
        <div className="flex justify-center">
          <div 
            className="grid gap-1 p-4 bg-gray-50 rounded-lg"
            style={{ gridTemplateColumns: `repeat(${results.wafqSize}, minmax(0, 1fr))` }}
          >
            {results.wafqGrid.flat().map((number, index) => (
              <div
                key={index}
                className="w-12 h-12 flex items-center justify-center bg-white border border-gray-300 rounded font-semibold text-gray-700 text-sm"
              >
                {number}
              </div>
            ))}
          </div>
        </div>
        <p className="text-center text-sm text-gray-600 mt-4">
          استخدم هذا الوفق للتأمل والتركيز الروحي
        </p>
      </div>
    </div>
  );
};