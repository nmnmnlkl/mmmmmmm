import React from 'react';
import { Heart, Star, Moon } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-gradient-to-r from-gray-900 to-purple-900 text-white py-12 mt-16">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center">
          <div className="flex justify-center items-center gap-2 mb-4">
            <Star className="w-6 h-6 text-yellow-400" />
            <h3 className="text-2xl font-bold">نظام الجفر الذكي المتقدم</h3>
            <Moon className="w-6 h-6 text-blue-400" />
          </div>
          
          <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
            نظام متطور لحساب الجفر والأعداد وفقاً للتراث الإسلامي الأصيل، 
            مع إمكانيات التحليل الذكي المتقدم لفهم أعمق للمعاني الروحية والعددية.
          </p>
          
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            <div className="text-center">
              <div className="w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-3">
                <Star className="w-6 h-6" />
              </div>
              <h4 className="font-semibold mb-2">حسابات دقيقة</h4>
              <p className="text-sm text-gray-400">
                حسابات الجفر وفقاً للقواعد التقليدية المعتمدة
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-3">
                <Moon className="w-6 h-6" />
              </div>
              <h4 className="font-semibold mb-2">تحليل ذكي</h4>
              <p className="text-sm text-gray-400">
                تفسير متقدم بالذكاء الاصطناعي للمعاني العميقة
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-3">
                <Heart className="w-6 h-6" />
              </div>
              <h4 className="font-semibold mb-2">تراث أصيل</h4>
              <p className="text-sm text-gray-400">
                مبني على أسس علم الجفر في التراث الإسلامي
              </p>
            </div>
          </div>
          
          <div className="border-t border-gray-700 pt-6">
            <p className="text-gray-400 text-sm">
              © 2025 نظام الجفر الذكي المتقدم. جميع الحقوق محفوظة.
            </p>
            <p className="text-gray-500 text-xs mt-2">
              هذا النظام مخصص للأغراض التعليمية والثقافية فقط
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};