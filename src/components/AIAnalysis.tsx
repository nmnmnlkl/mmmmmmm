import React from 'react';
import { Brain, Lightbulb, Compass, Zap, Star, Moon } from 'lucide-react';
import type { AIAnalysis } from '../types';

interface AIAnalysisProps {
  analysis: AIAnalysis;
}

export const AIAnalysis: React.FC<AIAnalysisProps> = ({ analysis }) => {
  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full mb-4 animate-pulse-glow">
          <Brain className="w-8 h-8 text-white" />
        </div>
        <h3 className="text-2xl font-bold text-gray-800 mb-2">🔮 التحليل الجفري المتقدم</h3>
        <p className="text-gray-600">تفسير روحاني عميق بالذكاء الاصطناعي</p>
      </div>

      <div className="grid gap-6">
        {/* Spiritual Interpretation */}
        <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-xl p-6 border border-purple-200 shadow-lg">
          <h4 className="font-bold text-purple-800 mb-3 flex items-center gap-2">
            <Star className="w-5 h-5" />
            🌟 التفسير الروحي والكوني
          </h4>
          <div className="prose prose-sm max-w-none text-gray-700 leading-relaxed">
            <p className="text-base">{analysis.spiritualInterpretation}</p>
          </div>
        </div>

        {/* Numerical Insights */}
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-200 shadow-lg">
          <h4 className="font-bold text-blue-800 mb-3 flex items-center gap-2">
            <Brain className="w-5 h-5" />
            🔢 تحليل الأرقام والطاقات
          </h4>
          <div className="prose prose-sm max-w-none text-gray-700 leading-relaxed">
            <p className="text-base">{analysis.numericalInsights}</p>
          </div>
        </div>

        {/* Guidance */}
        <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-6 border border-green-200 shadow-lg">
          <h4 className="font-bold text-green-800 mb-3 flex items-center gap-2">
            <Compass className="w-5 h-5" />
            🧭 التوجيه والإرشاد الروحي
          </h4>
          <div className="prose prose-sm max-w-none text-gray-700 leading-relaxed">
            <p className="text-base">{analysis.guidance}</p>
          </div>
        </div>

        {/* Energy Analysis */}
        <div className="bg-gradient-to-r from-orange-50 to-yellow-50 rounded-xl p-6 border border-orange-200 shadow-lg">
          <h4 className="font-bold text-orange-800 mb-3 flex items-center gap-2">
            <Moon className="w-5 h-5" />
            🌙 تحليل الطاقات والأوقات
          </h4>
          <div className="prose prose-sm max-w-none text-gray-700 leading-relaxed">
            <p className="text-base">{analysis.energyAnalysis}</p>
          </div>
        </div>
      </div>

      {/* Spiritual Footer */}
      <div className="bg-gradient-to-r from-gray-50 to-purple-50 rounded-xl p-6 border border-gray-200 text-center">
        <div className="flex justify-center items-center gap-2 mb-3">
          <Star className="w-5 h-5 text-yellow-500" />
          <Zap className="w-5 h-5 text-purple-500" />
          <Moon className="w-5 h-5 text-blue-500" />
        </div>
        <p className="text-sm text-gray-600 italic">
          "وَاللَّهُ يَعْلَمُ وَأَنتُمْ لَا تَعْلَمُونَ" - هذا التحليل للاسترشاد والتأمل، والله أعلم بالغيب
        </p>
      </div>
    </div>
  );
};