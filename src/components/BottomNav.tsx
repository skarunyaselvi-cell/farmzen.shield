import React from 'react';
import { Home, Shield, CloudSun, Stethoscope, Bot, Store, PhoneCall } from 'lucide-react';
import { LanguageCode } from '../types';
import { translations } from '../i18n/translations';

interface BottomNavProps {
  currentTab: string;
  onSelectTab: (tab: string) => void;
  language: LanguageCode;
  onOpenSos: () => void;
}

export const BottomNav: React.FC<BottomNavProps> = ({
  currentTab,
  onSelectTab,
  language,
  onOpenSos
}) => {
  const t = translations[language];

  const items = [
    { id: 'dashboard', label: t.nav.home, icon: Home },
    { id: 'shield', label: t.nav.shield, icon: Shield },
    { id: 'weather', label: t.nav.weather, icon: CloudSun },
    { id: 'cropDoctor', label: t.nav.cropDoctor, icon: Stethoscope },
    { id: 'ai', label: t.nav.ai, icon: Bot }
  ];

  return (
    <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 dark:bg-slate-950/95 backdrop-blur-md border-t border-slate-200 dark:border-slate-800 safe-area-pb">
      <div className="grid grid-cols-5 items-center h-16 px-1">
        {items.map((item) => {
          const Icon = item.icon;
          const isActive = currentTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onSelectTab(item.id)}
              className={`flex flex-col items-center justify-center min-h-[44px] py-1 transition-colors ${
                isActive ? 'text-emerald-600 dark:text-emerald-400 font-bold' : 'text-slate-500 hover:text-slate-800 dark:text-slate-400'
              }`}
            >
              <Icon className={`w-5 h-5 ${isActive ? 'stroke-[2.5px] scale-110 transition-transform' : 'stroke-2'}`} />
              <span className="text-[10px] truncate max-w-[62px] mt-0.5 tracking-tight">
                {item.label}
              </span>
            </button>
          );
        })}
      </div>

      {/* Floating Action SOS Button on mobile */}
      <button
        onClick={onOpenSos}
        aria-label="Emergency Agricultural SOS"
        className="fixed bottom-20 right-4 z-50 w-13 h-13 rounded-full bg-red-600 hover:bg-red-700 text-white shadow-xl shadow-red-600/30 flex items-center justify-center active:scale-95 transition-transform"
      >
        <PhoneCall className="w-6 h-6 animate-bounce" />
      </button>
    </nav>
  );
};
