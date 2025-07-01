import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Header } from './components/Header';
import { JafrForm } from './components/JafrForm';
import { TraditionalResults } from './components/TraditionalResults';
import { AIAnalysis } from './components/AIAnalysis';
import { Footer } from './components/Footer';
import { JafrCalculator } from './utils/jafr-calculator';
import { aiService } from './services/ai-service';
import type { JafrAnalysisRequest, AnalysisResult } from './types';

function App() {
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleAnalysis = async (request: JafrAnalysisRequest, apiKey?: string) => {
    setIsLoading(true);
    setError(null);
    
    try {
      // Calculate traditional results
      const traditional = JafrCalculator.calculateTraditionalResults(
        request.name,
        request.mother,
        request.question
      );

      let ai: any = undefined;
      
      // Get AI analysis if API key is provided
      if (apiKey) {
        try {
          ai = await aiService.analyzeJafrContext(request, traditional, apiKey);
        } catch (aiError) {
          console.warn('AI analysis failed, continuing with traditional results only:', aiError);
          // Don't set error, just continue without AI analysis
        }
      }

      setResult({
        traditional,
        ai
      });

      // Scroll to results
      setTimeout(() => {
        const resultsElement = document.getElementById('results');
        if (resultsElement) {
          resultsElement.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);

    } catch (err) {
      console.error('Analysis error:', err);
      setError('حدث خطأ أثناء التحليل. يرجى المحاولة مرة أخرى.');
    } finally {
      setIsLoading(false);
    }
  };

  const resetAnalysis = () => {
    setResult(null);
    setError(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-50" dir="rtl">
      <Header />
      
      <main className="max-w-6xl mx-auto px-6 py-12">
        <AnimatePresence mode="wait">
          {!result ? (
            <motion.div
              key="form"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
            >
              <JafrForm onSubmit={handleAnalysis} isLoading={isLoading} />
              
              {error && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="mt-6 max-w-2xl mx-auto"
                >
                  <div className="bg-red-50 border border-red-200 rounded-xl p-4 text-center">
                    <p className="text-red-700 font-medium">{error}</p>
                  </div>
                </motion.div>
              )}
            </motion.div>
          ) : (
            <motion.div
              key="results"
              id="results"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="space-y-12"
            >
              <div className="text-center">
                <button
                  onClick={resetAnalysis}
                  className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-6 py-3 rounded-xl font-semibold hover:from-purple-700 hover:to-blue-700 transition-all duration-200 shadow-lg"
                >
                  تحليل جديد
                </button>
              </div>

              <TraditionalResults results={result.traditional} />
              
              {result.ai && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  <AIAnalysis analysis={result.ai} />
                </motion.div>
              )}
              
              {!result.ai && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="text-center"
                >
                  <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 max-w-2xl mx-auto">
                    <h4 className="font-semibold text-blue-800 mb-2">للحصول على التحليل الذكي</h4>
                    <p className="text-blue-700 text-sm">
                      أضف مفتاح OpenRouter API في النموذج أعلاه للحصول على تحليل ذكي متقدم 
                      يتضمن التفسير الروحي والتوجيه الشخصي المخصص لسؤالك.
                    </p>
                  </div>
                </motion.div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      <Footer />
    </div>
  );
}

export default App;