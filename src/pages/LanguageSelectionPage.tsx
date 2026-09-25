import React, { useState } from 'react';
import { Logo } from '../components/Logo';
import { LanguageCode } from '../types';
import { translations } from '../i18n/translations';
import { Globe, ArrowRight, CheckCircle2 } from 'lucide-react';

interface LanguageSelectionPageProps {
  selectedLanguage: LanguageCode;
  onSelectLanguage: (lang: LanguageCode) => void;
  onContinue: () => void;
}

interface LangOption {
  code: LanguageCode;
  name: string;
  nativeName: string;
  greeting: string;
  flag: string;
}

export const LanguageSelectionPage: React.FC<LanguageSelectionPageProps> = ({
  selectedLanguage,
  onSelectLanguage,
  onContinue
}) => {
  const [currentLang, setCurrentLang] = useState<LanguageCode>(selectedLanguage);

  const languages: LangOption[] = [
    {
      code: 'en',
      name: 'English',
      nativeName: 'English',
      greeting: 'Welcome to FarmZen',
      flag: '🇬🇧'
    },
    {
      code: 'ta',
      name: 'Tamil',
      nativeName: 'தமிழ்',
      greeting: 'ஃபாம்சென் உங்களை வரவேற்கிறது',
      flag: '🇮🇳'
    },
    {
      code: 'te',
      name: 'Telugu',
      nativeName: 'తెలుగు',
      greeting: 'ఫార్మ్‌జెన్‌కు స్వాగతం',
      flag: '🇮🇳'
    },
    {
      code: 'kn',
      name: 'Kannada',
      nativeName: 'ಕನ್ನಡ',
      greeting: 'ಫಾರ್ಮ್‌ಜೆನ್‌ಗೆ ಸುಸ್ವಾಗತ',
      flag: '🇮🇳'
    },
    {
      code: 'ml',
      name: 'Malayalam',
      nativeName: 'മലയാളം',
      greeting: 'ഫാംസെനിലേക്ക് സ്വാഗതം',
      flag: '🇮🇳'
    },
    {
      code: 'hi',
      name: 'Hindi',
      nativeName: 'हिन्दी',
      greeting: 'फार्मज़ेन में आपका स्वागत है',
      flag: '🇮🇳'
    }
  ];

  const handleSelect = (code: LanguageCode) => {
    setCurrentLang(code);
    onSelectLanguage(code);
  };

  return (
    <div className="min-h-screen relative flex items-center justify-center p-4 bg-gradient-to-br from-emerald-950 via-slate-950 to-emerald-950 text-white overflow-hidden">
      {/* Background glow & particles */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-emerald-500/10 blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full bg-teal-500/10 blur-3xl pointer-events-none" />

      <div className="relative z-10 w-full max-w-2xl my-8">
        <div className="bg-slate-900/85 backdrop-blur-xl rounded-3xl p-6 sm:p-10 shadow-2xl border border-emerald-500/30 space-y-6">
          {/* Header */}
          <div className="text-center space-y-2">
            <div className="flex justify-center mb-3">
              <Logo size="lg" variant="light" />
            </div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-900/60 border border-emerald-700/50 text-emerald-300 text-xs font-semibold">
              <Globe className="w-3.5 h-3.5" />
              <span>Select Your Language / உங்கள் மொழியைத் தேர்ந்தெடுக்கவும்</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold font-display text-white">
              Choose Preferred Language
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 max-w-md mx-auto">
              Your entire agricultural experience, alerts, and AI voice will speak in this regional language.
            </p>
          </div>

          {/* 6 Language Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-2">
            {languages.map((lang) => {
              const isSelected = currentLang === lang.code;
              return (
                <button
                  key={lang.code}
                  onClick={() => handleSelect(lang.code)}
                  className={`p-4 rounded-2xl border text-left transition-all relative overflow-hidden flex items-center justify-between group ${
                    isSelected
                      ? 'border-emerald-500 bg-emerald-950/70 shadow-lg ring-2 ring-emerald-500/30'
                      : 'border-slate-800 bg-slate-950/50 hover:border-slate-700 hover:bg-slate-900/50'
                  }`}
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-base">{lang.flag}</span>
                      <span className="text-base sm:text-lg font-bold font-display text-white">
                        {lang.nativeName}
                      </span>
                      <span className="text-xs text-slate-400 font-mono">({lang.name})</span>
                    </div>
                    <p className="text-xs text-emerald-300/90 font-medium">
                      {lang.greeting}
                    </p>
                  </div>

                  {isSelected && (
                    <div className="w-6 h-6 rounded-full bg-emerald-500 text-slate-950 flex items-center justify-center shrink-0">
                      <CheckCircle2 className="w-4 h-4" />
                    </div>
                  )}
                </button>
              );
            })}
          </div>

          {/* Continue CTA */}
          <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
            <span className="text-xs text-slate-400">
              Selected: <span className="font-bold text-emerald-400">{languages.find(l => l.code === currentLang)?.name}</span>
            </span>

            <button
              onClick={onContinue}
              className="px-6 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs sm:text-sm shadow-lg shadow-emerald-500/25 active:scale-95 transition-all flex items-center gap-2"
            >
              <span>CONTINUE</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
