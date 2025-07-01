import React, { useState } from 'react';
import { Calculator, Sparkles, Key, AlertCircle, Globe, MapPin } from 'lucide-react';
import type { JafrAnalysisRequest } from '../types';

interface JafrFormProps {
  onSubmit: (request: JafrAnalysisRequest, apiKey?: string) => void;
  isLoading: boolean;
}

export const JafrForm: React.FC<JafrFormProps> = ({ onSubmit, isLoading }) => {
  const [formData, setFormData] = useState<JafrAnalysisRequest>({
    name: '',
    mother: '',
    question: ''
  });
  const [apiKey, setApiKey] = useState('');
  const [showApiKey, setShowApiKey] = useState(false);
  const [questionType, setQuestionType] = useState('personal');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.name && formData.mother && formData.question) {
      onSubmit(formData, apiKey || undefined);
    }
  };

  const handleInputChange = (field: keyof JafrAnalysisRequest, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const questionExamples = {
    personal: [
      'هل سأحقق الشهرة التي أتمناها؟',
      'متى سأتزوج؟',
      'هل سأنجح في عملي الجديد؟',
      'كيف ستكون صحتي في المستقبل؟'
    ],
    geographical: [
      'هل الانتقال إلى دبي مناسب لي؟',
      'أيهما أفضل لي: مصر أم السعودية؟',
      'هل السفر إلى أمريكا سيحقق أحلامي؟',
      'متى سأعود إلى بلدي؟'
    ],
    financial: [
      'هل سأصبح ثرياً؟',
      'متى سيتحسن وضعي المالي؟',
      'هل استثماري سينجح؟',
      'أين أجد الرزق الوفير؟'
    ],
    relationships: [
      'هل سأجد شريك حياتي قريباً؟',
      'هل علاقتي الحالية ستنجح؟',
      'متى سأرزق بالأطفال؟',
      'كيف أحسن علاقتي بأسرتي؟'
    ]
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-white rounded-2xl shadow-2xl p-8 border border-purple-100">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-purple-500 to-blue-600 rounded-full mb-4">
            <Calculator className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-3xl font-bold text-gray-800 mb-2">🧿 احسب جفرك الآن 🔮</h2>
          <p className="text-gray-600">أدخل بياناتك للحصول على تحليل جفري دقيق وشامل</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                الاسم الأول
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 text-right"
                placeholder="أدخل اسمك الأول (مثال: محمد، فاطمة)"
                required
                dir="rtl"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                اسم الأم
              </label>
              <input
                type="text"
                value={formData.mother}
                onChange={(e) => handleInputChange('mother', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 text-right"
                placeholder="أدخل اسم والدتك (مثال: عائشة، خديجة)"
                required
                dir="rtl"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                نوع السؤال
              </label>
              <div className="grid grid-cols-2 gap-2 mb-3">
                <button
                  type="button"
                  onClick={() => setQuestionType('personal')}
                  className={`p-2 rounded-lg text-sm font-medium transition-all ${
                    questionType === 'personal'
                      ? 'bg-purple-100 text-purple-700 border-2 border-purple-300'
                      : 'bg-gray-50 text-gray-600 border border-gray-200'
                  }`}
                >
                  <Sparkles className="w-4 h-4 inline mr-1" />
                  شخصي
                </button>
                <button
                  type="button"
                  onClick={() => setQuestionType('geographical')}
                  className={`p-2 rounded-lg text-sm font-medium transition-all ${
                    questionType === 'geographical'
                      ? 'bg-blue-100 text-blue-700 border-2 border-blue-300'
                      : 'bg-gray-50 text-gray-600 border border-gray-200'
                  }`}
                >
                  <Globe className="w-4 h-4 inline mr-1" />
                  جغرافي
                </button>
                <button
                  type="button"
                  onClick={() => setQuestionType('financial')}
                  className={`p-2 rounded-lg text-sm font-medium transition-all ${
                    questionType === 'financial'
                      ? 'bg-green-100 text-green-700 border-2 border-green-300'
                      : 'bg-gray-50 text-gray-600 border border-gray-200'
                  }`}
                >
                  <MapPin className="w-4 h-4 inline mr-1" />
                  مالي
                </button>
                <button
                  type="button"
                  onClick={() => setQuestionType('relationships')}
                  className={`p-2 rounded-lg text-sm font-medium transition-all ${
                    questionType === 'relationships'
                      ? 'bg-pink-100 text-pink-700 border-2 border-pink-300'
                      : 'bg-gray-50 text-gray-600 border border-gray-200'
                  }`}
                >
                  <Sparkles className="w-4 h-4 inline mr-1" />
                  عاطفي
                </button>
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                السؤال أو الموضوع
              </label>
              <textarea
                value={formData.question}
                onChange={(e) => handleInputChange('question', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 text-right resize-none"
                placeholder="اكتب سؤالك بوضوح ودقة..."
                rows={3}
                required
                dir="rtl"
              />
              
              {/* أمثلة الأسئلة */}
              <div className="mt-3 p-3 bg-gray-50 rounded-lg">
                <p className="text-xs font-medium text-gray-600 mb-2">أمثلة للأسئلة:</p>
                <div className="space-y-1">
                  {questionExamples[questionType as keyof typeof questionExamples].map((example, index) => (
                    <button
                      key={index}
                      type="button"
                      onClick={() => handleInputChange('question', example)}
                      className="block w-full text-right text-xs text-gray-500 hover:text-purple-600 hover:bg-white p-2 rounded transition-all"
                    >
                      • {example}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="border-t pt-6">
            <div className="flex items-center justify-between mb-4">
              <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                <Key className="w-4 h-4" />
                مفتاح DeepSeek API (للتحليل المتقدم)
              </label>
              <button
                type="button"
                onClick={() => setShowApiKey(!showApiKey)}
                className="text-purple-600 hover:text-purple-700 text-sm font-medium"
              >
                {showApiKey ? 'إخفاء' : 'إظهار'}
              </button>
            </div>
            
            {showApiKey && (
              <div className="space-y-3">
                <input
                  type="password"
                  value={apiKey}
                  onChange={(e) => setApiKey(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                  placeholder="أدخل مفتاح OpenRouter API للحصول على تحليل ذكي متقدم"
                />
                <div className="flex items-start gap-2 p-3 bg-blue-50 rounded-lg">
                  <AlertCircle className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
                  <div className="text-xs text-blue-700">
                    <p className="font-medium mb-1">🔮 للحصول على تحليل جفري متقدم بالذكاء الاصطناعي:</p>
                    <p>
                      احصل على مفتاح API مجاني من{' '}
                      <a 
                        href="https://openrouter.ai/" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="underline hover:text-blue-800 font-medium"
                      >
                        OpenRouter.ai
                      </a>
                      {' '}واختر نموذج DeepSeek للحصول على تفسير روحاني عميق ودقيق.
                    </p>
                    <p className="mt-1 text-blue-600">
                      ✨ بدون المفتاح: ستحصل على التحليل التقليدي الأساسي فقط
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>

          <button
            type="submit"
            disabled={isLoading || !formData.name || !formData.mother || !formData.question}
            className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white py-4 px-6 rounded-xl font-semibold text-lg hover:from-purple-700 hover:to-blue-700 focus:ring-4 focus:ring-purple-300 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {isLoading ? (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                🔮 جاري التحليل الجفري...
              </>
            ) : (
              <>
                <Sparkles className="w-5 h-5" />
                🧿 احسب الجفر واكشف المستقبل
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
};