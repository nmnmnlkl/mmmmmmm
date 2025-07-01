import React from 'react';
import { Star, Moon, Sparkles, Zap } from 'lucide-react';

export const Header: React.FC = () => {
  return (
    <header className="relative bg-gradient-to-r from-purple-900 via-blue-900 to-indigo-900 text-white py-16 overflow-hidden">
      <div className="absolute inset-0 bg-black/20"></div>
      <div className="absolute inset-0">
        <div className="absolute top-10 left-10 animate-pulse">
          <Star className="w-4 h-4 text-yellow-300" />
        </div>
        <div className="absolute top-20 right-20 animate-pulse delay-1000">
          <Sparkles className="w-6 h-6 text-purple-300" />
        </div>
        <div className="absolute bottom-10 left-1/4 animate-pulse delay-500">
          <Moon className="w-5 h-5 text-blue-300" />
        </div>
        <div className="absolute top-1/3 right-1/3 animate-pulse delay-700">
          <Star className="w-3 h-3 text-pink-300" />
        </div>
        <div className="absolute bottom-20 right-10 animate-pulse delay-300">
          <Zap className="w-4 h-4 text-yellow-400" />
        </div>
        <div className="absolute top-1/2 left-10 animate-pulse delay-900">
          <Sparkles className="w-3 h-3 text-purple-400" />
        </div>
      </div>
      
      <div className="relative max-w-4xl mx-auto text-center px-6">
        <div className="mb-6">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full mb-4 shadow-2xl animate-pulse-glow">
            <Star className="w-10 h-10 text-white" />
          </div>
        </div>
        
        <h1 className="text-5xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-yellow-300 via-pink-300 to-purple-300 bg-clip-text text-transparent">
          🧿 نظام الجفر الذكي المتقدم 🔮
        </h1>
        
        <p className="text-xl md:text-2xl text-purple-100 mb-6 leading-relaxed">
          اكتشف أسرار الأرقام والحروف في التراث الإسلامي الأصيل
        </p>
        
        <div className="flex flex-wrap justify-center gap-4 text-sm text-purple-200">
          <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full backdrop-blur-sm">
            <Star className="w-4 h-4" />
            <span>حسابات جفرية دقيقة</span>
          </div>
          <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full backdrop-blur-sm">
            <Sparkles className="w-4 h-4" />
            <span>تحليل ذكي متقدم</span>
          </div>
          <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full backdrop-blur-sm">
            <Moon className="w-4 h-4" />
            <span>تفسير روحي عميق</span>
          </div>
          <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full backdrop-blur-sm">
            <Zap className="w-4 h-4" />
            <span>إجابات دقيقة ومباشرة</span>
          </div>
        </div>
        
        <div className="mt-8 text-center">
          <p className="text-purple-200 text-sm italic">
            "وَعِندَهُ مَفَاتِحُ الْغَيْبِ لَا يَعْلَمُهَا إِلَّا هُوَ" - الأنعام 59
          </p>
        </div>
      </div>
    </header>
  );
};