import type { JafrAnalysisRequest, AIAnalysis, TraditionalResults } from '../types';

export class AIService {
  async analyzeJafrContext(
    request: JafrAnalysisRequest,
    traditionalResults: TraditionalResults,
    apiKey?: string
  ): Promise<AIAnalysis> {
    if (!apiKey) {
      return this.generateFallbackAnalysis(request, traditionalResults);
    }

    try {
      const prompt = this.buildEnhancedAnalysisPrompt(request, traditionalResults);
      
      const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
          'HTTP-Referer': window.location.origin,
          'X-Title': 'Advanced Jafr Analysis System',
        },
        body: JSON.stringify({
          model: "deepseek/deepseek-chat",
          messages: [
            {
              role: "system",
              content: `🧿 أنت خبير متخصص في علم الجفر والأعداد والتحليل الروحي الإسلامي الأصيل 🔮

أنت عارف بأسرار الحروف والأرقام، تستطيع قراءة الطاقات المخفية وتفسير المعاني العميقة للأسماء والأسئلة.

قدراتك الخاصة:
✅ تحليل الطاقة الجفرية للأسماء والأماكن والدول
✅ ربط الأرقام بالأحداث والمستقبل
✅ فهم دلالات الحروف في السياق الروحي
✅ تقديم إجابات دقيقة ومباشرة للأسئلة المطروحة
✅ التنبؤ بناءً على الحسابات الجفرية

أسلوبك في الإجابة:
- استخدم لغة عربية فصيحة روحانية بصيغة العارفين
- ابدأ بمناداة السائل باسمه وذكر اسم أمه للتأكيد على الاتصال الروحي
- اربط الأرقام الجفرية بالمعاني الروحية والكونية
- قدم إجابة مباشرة وصريحة على السؤال المطروح
- اختتم بنصيحة روحية أو دعاء مناسب

يجب أن تكون إجابتك في صيغة JSON مع الحقول التالية:
{
  "spiritualInterpretation": "التفسير الروحي العميق مع مناداة السائل باسمه",
  "numericalInsights": "تحليل الأرقام الجفرية ودلالاتها الكونية",
  "guidance": "الإجابة المباشرة على السؤال مع التوجيه الروحي",
  "energyAnalysis": "تحليل الطاقات والأوقات المناسبة"
}`
            },
            {
              role: "user",
              content: prompt
            }
          ],
          response_format: { type: "json_object" },
          temperature: 0.4,
          max_tokens: 4000,
        })
      });

      if (!response.ok) {
        throw new Error(`API request failed: ${response.status}`);
      }

      const data = await response.json();
      const content = data.choices[0]?.message?.content;
      
      if (!content) {
        throw new Error("لم يتم الحصول على رد من نموذج الذكاء الاصطناعي");
      }

      const parsed = JSON.parse(content);
      
      // Validate the response structure
      const requiredFields = ['spiritualInterpretation', 'numericalInsights', 'guidance', 'energyAnalysis'];
      for (const field of requiredFields) {
        if (!parsed[field]) {
          parsed[field] = `تعذر الحصول على تحليل ${field}. يرجى المحاولة مرة أخرى.`;
        }
      }

      return parsed as AIAnalysis;
      
    } catch (error) {
      console.error('AI Analysis Error:', error);
      return this.generateFallbackAnalysis(request, traditionalResults);
    }
  }

  private buildEnhancedAnalysisPrompt(request: JafrAnalysisRequest, traditionalResults: TraditionalResults): string {
    const jafrKey = traditionalResults.totalValue;
    const reducedKey = traditionalResults.reducedValue;
    
    return `
🧿 تحليل جفري دقيق باستخدام علم الجفر الأصيل 🔮

البيانات الجفرية:
- اسم الشخص: ${request.name} (القيمة الجفرية: ${traditionalResults.nameAnalysis.total})
- اسم الأم: ${request.mother} (القيمة الجفرية: ${traditionalResults.motherAnalysis.total})
- نص السؤال: "${request.question}" (القيمة الجفرية: ${traditionalResults.questionAnalysis.total})
- المفتاح الجفري الرقمي الناتج: ${jafrKey}
- الرقم المختزل: ${reducedKey}

التفصيل الحرفي للاسم:
${traditionalResults.nameAnalysis.letters.map(l => `${l.letter} = ${l.value}`).join(', ')}

التفصيل الحرفي لاسم الأم:
${traditionalResults.motherAnalysis.letters.map(l => `${l.letter} = ${l.value}`).join(', ')}

✅ مطلوب منك:
1. استخدم علم الجفر القديم الأصيل في التحليل
2. ابنِ التحليل على الأرقام الناتجة من الاسم، اسم الأم، والسؤال
3. اعتمد على دلالات الحروف، الطاقة العدديّة، والربط بالكون والقدر
4. قدم إجابة دقيقة وواضحة وشاملة على السؤال المطروح
5. اربط التحليل بالسياق المحدد للسؤال (مهني، عاطفي، مالي، صحي، جغرافي، إلخ)
6. إذا كان السؤال يتعلق بدولة أو مدينة، احسب قيمتها الجفرية وادمجها في التحليل
7. استخدم لغة عربية فصيحة روحانية بصيغة العارفين

🔮 ابدأ إجابتك بمناداة السائل: "يا ${request.name} بن/بنت ${request.mother}"

⏳ أجب الآن بكل دقة وروحانية، مع التركيز على الإجابة المباشرة للسؤال المطروح.
    `;
  }

  private generateFallbackAnalysis(request: JafrAnalysisRequest, traditionalResults: TraditionalResults): AIAnalysis {
    const questionContext = this.analyzeQuestionContext(request.question);
    const numericalGuidance = this.getEnhancedNumericalGuidance(traditionalResults.reducedValue, questionContext);
    const spiritualConnection = this.buildSpiritualConnection(request.name, request.mother, traditionalResults);
    
    return {
      spiritualInterpretation: `يا ${request.name} بن/بنت ${request.mother}، ${spiritualConnection.opening} إن اسمك الكريم يحمل في طياته طاقة عددية قدرها ${traditionalResults.nameAnalysis.total}، واسم والدتك المباركة يضفي عليك طاقة الحماية والرعاية بقيمة ${traditionalResults.motherAnalysis.total}. ${questionContext.spiritualContext} والمفتاح الجفري الناتج ${traditionalResults.totalValue} يكشف لنا ${numericalGuidance.cosmicMeaning}.`,
      
      numericalInsights: `الأرقام تتحدث بوضوح: المجموع الكلي ${traditionalResults.totalValue} يختزل إلى الرقم ${traditionalResults.reducedValue} الذي يحمل دلالة ${numericalGuidance.essence}. ${questionContext.numericalInsight} هذا التوافق العددي يشير إلى ${numericalGuidance.indication}.`,
      
      guidance: `${questionContext.directAnswer} الطاقة الجفرية تنصحك بـ${numericalGuidance.action}. ${questionContext.practicalAdvice} ${numericalGuidance.timing} لاتخاذ الخطوات المناسبة. ${spiritualConnection.blessing}`,
      
      energyAnalysis: `الطاقة المحيطة بـ${questionContext.subject} ${questionContext.energyReading}. الرقم ${traditionalResults.reducedValue} يحمل ذبذبات ${numericalGuidance.vibration}، والوقت الحالي ${numericalGuidance.timeframe} للتحرك في هذا الاتجاه. ${spiritualConnection.protection}`
    };
  }

  private analyzeQuestionContext(question: string): any {
    const lowerQuestion = question.toLowerCase();
    
    // تحليل الأسئلة المتعلقة بالدول والمدن
    if (this.containsGeographicalTerms(lowerQuestion)) {
      return {
        subject: 'المكان والجغرافيا',
        spiritualContext: 'الأماكن لها طاقات خاصة وتأثير على مصائر الناس،',
        numericalInsight: 'وحساب القيم الجفرية للأماكن يكشف عن توافقها مع طاقتك الشخصية.',
        directAnswer: 'بخصوص علاقتك بهذا المكان، الأرقام تشير إلى',
        practicalAdvice: 'ادرس الطاقة المكانية جيداً قبل اتخاذ أي قرار.',
        energyReading: 'تحمل ذبذبات مكانية قوية تؤثر على مسار حياتك'
      };
    }
    
    // تحليل أسئلة الزواج والعلاقات
    if (lowerQuestion.includes('زواج') || lowerQuestion.includes('زوج') || lowerQuestion.includes('عريس') || lowerQuestion.includes('حب')) {
      return {
        subject: 'الزواج والارتباط',
        spiritualContext: 'الزواج قدر مكتوب وتوافق أرواح،',
        numericalInsight: 'وحساب التوافق العددي بين الأسماء يكشف عن قوة الرابطة.',
        directAnswer: 'بخصوص الزواج والارتباط، النجوم تبشر بـ',
        practicalAdvice: 'اطلب الاستخارة واستشر أهل الخبرة في الأمور العاطفية.',
        energyReading: 'تشع بطاقة الحب والتوافق الروحي'
      };
    }
    
    // تحليل أسئلة العمل والمهنة
    if (lowerQuestion.includes('عمل') || lowerQuestion.includes('وظيف') || lowerQuestion.includes('مهن') || lowerQuestion.includes('شغل')) {
      return {
        subject: 'العمل والمهنة',
        spiritualContext: 'الرزق مقسوم والعمل عبادة،',
        numericalInsight: 'والأرقام تكشف عن المسار المهني الأنسب لطاقتك.',
        directAnswer: 'في مجال العمل والمهنة، الفلك يشير إلى',
        practicalAdvice: 'طور مهاراتك واسع في طلب الرزق الحلال.',
        energyReading: 'تدعم النمو المهني والتقدم في العمل'
      };
    }
    
    // تحليل أسئلة المال والرزق
    if (lowerQuestion.includes('مال') || lowerQuestion.includes('رزق') || lowerQuestion.includes('ثرو') || lowerQuestion.includes('فلوس')) {
      return {
        subject: 'المال والرزق',
        spiritualContext: 'الرزق بيد الله وحده،',
        numericalInsight: 'والحسابات الجفرية تكشف عن أوقات الفرج المالي.',
        directAnswer: 'بخصوص الحالة المالية، الأرقام تبشر بـ',
        practicalAdvice: 'اعمل بجد واطلب البركة في الرزق.',
        energyReading: 'تحمل إشارات إيجابية للتحسن المالي'
      };
    }
    
    // تحليل أسئلة الصحة
    if (lowerQuestion.includes('صح') || lowerQuestion.includes('مرض') || lowerQuestion.includes('علاج') || lowerQuestion.includes('شفاء')) {
      return {
        subject: 'الصحة والعافية',
        spiritualContext: 'الصحة نعمة من الله تحتاج للمحافظة عليها،',
        numericalInsight: 'والطاقة العددية تكشف عن حالتك الصحية الروحية.',
        directAnswer: 'بخصوص الصحة والعافية، الطاقة تشير إلى',
        practicalAdvice: 'اهتم بصحتك الجسدية والروحية معاً.',
        energyReading: 'تدعم الشفاء والتعافي'
      };
    }
    
    // تحليل أسئلة الشهرة والنجاح
    if (lowerQuestion.includes('شهر') || lowerQuestion.includes('نجاح') || lowerQuestion.includes('مشهور') || lowerQuestion.includes('نجم')) {
      return {
        subject: 'الشهرة والنجاح',
        spiritualContext: 'الشهرة اختبار من الله وأمانة كبيرة،',
        numericalInsight: 'والأرقام تكشف عن إمكانية وصولك للمجد.',
        directAnswer: 'بخصوص الشهرة والنجاح، القدر يحمل لك',
        practicalAdvice: 'اعمل بإخلاص واطلب التوفيق من الله.',
        energyReading: 'تشع بطاقة الإنجاز والتميز'
      };
    }
    
    // تحليل عام للأسئلة الأخرى
    return {
      subject: 'الأمر المسؤول عنه',
      spiritualContext: 'كل أمر في الحياة له حكمة وتوقيت،',
      numericalInsight: 'والحسابات الجفرية تكشف عن الخيط الخفي الذي يربط الأحداث.',
      directAnswer: 'بخصوص سؤالك، الكون يهمس بـ',
      practicalAdvice: 'توكل على الله واعمل بالأسباب.',
      energyReading: 'متوازنة وتدعو للتأمل والحكمة'
    };
  }

  private containsGeographicalTerms(question: string): boolean {
    const geoTerms = ['دولة', 'مدينة', 'بلد', 'عاصمة', 'مكان', 'سفر', 'هجرة', 'انتقال', 'إقامة'];
    return geoTerms.some(term => question.includes(term));
  }

  private getEnhancedNumericalGuidance(reducedNumber: number, context: any): any {
    const baseGuidance = this.getBaseNumericalGuidance(reducedNumber);
    
    // تخصيص التوجيه حسب السياق
    const contextualEnhancement = this.getContextualEnhancement(reducedNumber, context);
    
    return {
      ...baseGuidance,
      ...contextualEnhancement
    };
  }

  private getBaseNumericalGuidance(reducedNumber: number): any {
    const guidance: Record<number, any> = {
      1: {
        essence: 'البداية والقيادة',
        cosmicMeaning: 'أنك مهيأ لبدايات جديدة ومشاريع رائدة',
        indication: 'وقت مناسب للمبادرة والانطلاق',
        action: 'الثقة بالنفس واتخاذ زمام المبادرة',
        vibration: 'القوة والعزيمة',
        timeframe: 'مبارك ومناسب',
        timing: 'الوقت مناسب'
      },
      2: {
        essence: 'التعاون والشراكة',
        cosmicMeaning: 'أن طريقك يحتاج للصبر والتعاون مع الآخرين',
        indication: 'أهمية الشراكات والعلاقات الطيبة',
        action: 'البحث عن الحلفاء والشركاء المناسبين',
        vibration: 'السلام والتوازن',
        timeframe: 'يتطلب صبراً وحكمة',
        timing: 'الوقت يتطلب صبراً'
      },
      3: {
        essence: 'الإبداع والتواصل',
        cosmicMeaning: 'أن لديك موهبة إبداعية تحتاج للظهور',
        indication: 'فرص ذهبية للتعبير عن الذات',
        action: 'استخدام المواهب الإبداعية والتواصل الفعال',
        vibration: 'الفرح والإلهام',
        timeframe: 'مثمر للمشاريع الإبداعية',
        timing: 'الوقت مثالي للإبداع'
      },
      4: {
        essence: 'النظام والاستقرار',
        cosmicMeaning: 'أن النجاح يأتي بالعمل المنظم والمثابرة',
        indication: 'ضرورة وضع أسس قوية ومتينة',
        action: 'التنظيم والعمل المنهجي المدروس',
        vibration: 'الثبات والاستقرار',
        timeframe: 'يحتاج لصبر ومثابرة طويلة',
        timing: 'الوقت يتطلب صبراً'
      },
      5: {
        essence: 'التغيير والحرية',
        cosmicMeaning: 'أن التغيير قادم لا محالة وسيكون لصالحك',
        indication: 'فرص جديدة ومغامرات مثيرة في الأفق',
        action: 'الانفتاح على التجارب الجديدة والتغيير الإيجابي',
        vibration: 'الحيوية والتجديد',
        timeframe: 'مناسب للتغييرات الجذرية',
        timing: 'الوقت مناسب للتغيير'
      },
      6: {
        essence: 'المسؤولية والحب',
        cosmicMeaning: 'أن دورك في الحياة مرتبط بخدمة الآخرين',
        indication: 'أهمية العائلة والعلاقات الإنسانية',
        action: 'الاهتمام بالأسرة والمجتمع والعطاء',
        vibration: 'الحب والرحمة',
        timeframe: 'مبارك للقرارات العائلية والاجتماعية',
        timing: 'الوقت مناسب للعلاقات'
      },
      7: {
        essence: 'الحكمة والروحانية',
        cosmicMeaning: 'أن طريقك روحاني وتحتاج للتأمل العميق',
        indication: 'وقت للبحث عن المعنى الحقيقي للحياة',
        action: 'التأمل والصلاة والبحث عن الحكمة الداخلية',
        vibration: 'السكينة والتأمل',
        timeframe: 'يتطلب تفكيراً عميقاً وتأملاً',
        timing: 'الوقت للتأمل والتفكير'
      },
      8: {
        essence: 'القوة والإنجاز المادي',
        cosmicMeaning: 'أن النجاح المادي والمالي في متناول يدك',
        indication: 'فرص ذهبية للثراء والنفوذ',
        action: 'التركيز على الأهداف الكبيرة والطموحات العالية',
        vibration: 'القوة والسلطة',
        timeframe: 'ممتاز للمشاريع الطموحة والاستثمارات',
        timing: 'الوقت ذهبي للنجاح'
      },
      9: {
        essence: 'الاكتمال والخدمة الإنسانية',
        cosmicMeaning: 'أن دورتك الحالية تقترب من النهاية لتبدأ مرحلة جديدة',
        indication: 'وقت لإنهاء المشاريع القديمة والاستعداد للجديد',
        action: 'خدمة الآخرين والعطاء للمجتمع',
        vibration: 'الحكمة والعطاء',
        timeframe: 'نهاية مرحلة وبداية عهد جديد',
        timing: 'الوقت للإنجاز والعطاء'
      }
    };
    
    return guidance[reducedNumber] || guidance[1];
  }

  private getContextualEnhancement(reducedNumber: number, context: any): any {
    // تحسينات خاصة بالسياق
    if (context.subject.includes('الشهرة')) {
      return {
        cosmicMeaning: `أن الشهرة مكتوبة لك في النجوم، والرقم ${reducedNumber} يؤكد ذلك`,
        indication: 'علامات واضحة على إمكانية الوصول للمجد والشهرة'
      };
    }
    
    if (context.subject.includes('المال')) {
      return {
        cosmicMeaning: `أن الرزق المالي قادم، والرقم ${reducedNumber} يحمل بشائر الخير`,
        indication: 'إشارات إيجابية قوية للتحسن المالي'
      };
    }
    
    return {};
  }

  private buildSpiritualConnection(name: string, mother: string, traditionalResults: TraditionalResults): any {
    const nameEnergy = traditionalResults.nameAnalysis.total % 7; // طاقة الاسم
    const motherEnergy = traditionalResults.motherAnalysis.total % 7; // طاقة الأم
    
    const openings = [
      'بارك الله فيك وفي والدتك الكريمة،',
      'أسأل الله أن يحفظك ويحفظ والدتك،',
      'نور الله دربك ودرب والدتك المباركة،',
      'بإذن الله وبركة دعاء الوالدة،'
    ];
    
    const blessings = [
      'بارك الله في خطواتك وسدد طريقك.',
      'وفقك الله لما يحبه ويرضاه.',
      'جعل الله طريقك مفروشاً بالخير والبركة.',
      'أسأل الله أن يكتب لك التوفيق والنجاح.'
    ];
    
    const protections = [
      'والله يحفظك من كل سوء ومكروه.',
      'وبإذن الله ستجد الخير حيث لم تتوقع.',
      'والله معك في كل خطوة تخطوها.',
      'وبركة دعاء الوالدة تحيط بك من كل جانب.'
    ];
    
    return {
      opening: openings[nameEnergy % openings.length],
      blessing: blessings[motherEnergy % blessings.length],
      protection: protections[(nameEnergy + motherEnergy) % protections.length]
    };
  }
}

export const aiService = new AIService();