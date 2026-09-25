import React from 'react';
import { Logo } from './Logo';
import { LanguageCode, Farm } from '../types';
import { translations } from '../i18n/translations';
import { Globe, PhoneCall, ShieldCheck, WifiOff, RefreshCw, ChevronDown, Bell } from 'lucide-react';

interface HeaderProps {
  currentTab: string;
  onSelectTab: (tab: string) => void;
  language: LanguageCode;
  onSelectLanguage: (lang: LanguageCode) => void;
  currentFarm: Farm;
  farms: Farm[];
  onSelectFarm: (farm: Farm) => void;
  isOffline: boolean;
  onOpenSos: () => void;
  onOpenNotifications: () => void;
  unreadCount?: number;
}

export const Header: React.FC<HeaderProps> = ({
  currentTab,
  onSelectTab,
  language,
  onSelectLanguage,
  currentFarm,
  farms,
  onSelectFarm,
  isOffline,
  onOpenSos,
  onOpenNotifications,
  unreadCount = 0
}) => {
  const t = translations[language];
  const [langMenuOpen, setLangMenuOpen] = React.useState(false);
  const [farmMenuOpen, setFarmMenuOpen] = React.useState(false);

  const langNames: Record<LanguageCode, string> = {
    en: 'English',
    ta: 'தமிழ்',
    te: 'తెలుగు',
    kn: 'ಕನ್ನಡ',
    ml: 'മലയാളം',
    hi: 'हिन्दी'
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 dark:bg-slate-950/90 backdrop-blur-md border-b border-emerald-900/10 dark:border-emerald-800/20">
      {/* Offline Mode Banner when disconnected */}
      {isOffline && (
        <div className="bg-amber-600 text-white px-4 py-1 text-xs font-semibold flex items-center justify-between shadow-inner">
          <div className="flex items-center gap-2">
            <WifiOff className="w-3.5 h-3.5" />
            <span>{t.common.offlineMode} — {t.common.offlineNotice}</span>
          </div>
          <span className="text-[11px] opacity-90">Cached Data Active</span>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-3 sm:px-6 h-16 flex items-center justify-between">
        {/* Zone 1: Mobile & Tablet Brand Logo + Farm Switcher */}
        <div className="flex items-center gap-3 sm:gap-4 shrink-0 overflow-visible">
          <button
            onClick={() => onSelectTab('dashboard')}
            className="lg:hidden flex items-center focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 rounded-lg shrink-0 overflow-visible py-1"
            title="FARMZEN Home"
          >
            <Logo size="sm" variant="auto" />
          </button>

          {/* Farm Switcher Dropdown */}
          <div className="relative">
            <button
              onClick={() => { setFarmMenuOpen(!farmMenuOpen); setLangMenuOpen(false); }}
              className="flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-medium text-emerald-900 dark:text-emerald-200 bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200/60 dark:border-emerald-800/50 rounded-xl hover:bg-emerald-100/70 transition-colors"
            >
              <span className="truncate max-w-[140px] font-bold">{currentFarm.farm_name}</span>
              <ChevronDown className="w-3.5 h-3.5 opacity-70" />
            </button>

            {farmMenuOpen && (
              <div className="absolute left-0 mt-2 w-64 bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 p-2 z-50">
                <div className="text-[11px] font-semibold text-slate-500 px-2 py-1 uppercase tracking-wider">
                  {t.common.switchFarm}
                </div>
                {farms.map((f) => (
                  <button
                    key={f.id}
                    onClick={() => { onSelectFarm(f); setFarmMenuOpen(false); }}
                    className={`w-full text-left px-2.5 py-2 text-xs rounded-xl transition-colors flex items-center justify-between ${
                      f.id === currentFarm.id
                        ? 'bg-emerald-500 text-white font-semibold'
                        : 'text-slate-700 dark:text-slate-200 hover:bg-emerald-50 dark:hover:bg-slate-800'
                    }`}
                  >
                    <div>
                      <div className="truncate font-medium">{f.farm_name}</div>
                      <div className="text-[10px] opacity-80">{f.village}, {f.district} ({f.area_acres} ac)</div>
                    </div>
                    {f.id === currentFarm.id && <ShieldCheck className="w-4 h-4 shrink-0" />}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Zone 2: Title / Status Center Banner */}
        <div className="hidden sm:flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
          <span className="w-2 h-2 rounded-full bg-emerald-500" />
          <span className="font-semibold text-slate-700 dark:text-slate-300">FARMZEN OS</span>
          <span>·</span>
          <span>IMD & e-NAM Synced</span>
        </div>

        {/* Zone 3: Actions (Language switcher, Notifications, SOS Trigger) */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Language Selector Dropdown */}
          <div className="relative">
            <button
              onClick={() => { setLangMenuOpen(!langMenuOpen); setFarmMenuOpen(false); }}
              className="flex items-center gap-1 px-2.5 py-1.5 text-xs font-medium text-slate-700 dark:text-slate-200 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 rounded-lg transition-colors"
              aria-label="Select Regional Language"
            >
              <Globe className="w-3.5 h-3.5 text-emerald-600" />
              <span className="font-semibold">{langNames[language]}</span>
              <ChevronDown className="w-3 h-3 opacity-60" />
            </button>

            {langMenuOpen && (
              <div className="absolute right-0 mt-2 w-44 bg-white dark:bg-slate-900 rounded-xl shadow-xl border border-slate-200 dark:border-slate-800 p-1.5 z-50">
                <div className="text-[10px] font-semibold text-slate-400 px-2 py-1 uppercase">Select Language</div>
                {(Object.keys(langNames) as LanguageCode[]).map((code) => (
                  <button
                    key={code}
                    onClick={() => { onSelectLanguage(code); setLangMenuOpen(false); }}
                    className={`w-full text-left px-2.5 py-1.5 text-xs rounded-lg transition-colors flex items-center justify-between ${
                      code === language
                        ? 'bg-emerald-600 text-white font-bold'
                        : 'text-slate-700 dark:text-slate-200 hover:bg-emerald-50 dark:hover:bg-slate-800'
                    }`}
                  >
                    <span>{langNames[code]}</span>
                    {code === language && <span className="text-[10px]">✓</span>}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Notifications Button */}
          <button
            onClick={onOpenNotifications}
            className="relative p-2 text-slate-600 dark:text-slate-300 hover:text-emerald-600 rounded-lg transition-colors min-w-[40px] min-h-[40px] flex items-center justify-center"
            title="Alerts & Notifications"
          >
            <Bell className="w-4 h-4" />
            {unreadCount > 0 && (
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full ring-2 ring-white dark:ring-slate-950" />
            )}
          </button>

          {/* Emergency SOS Trigger Button */}
          <button
            onClick={onOpenSos}
            className="px-3 py-1.5 text-xs font-bold text-white bg-red-600 hover:bg-red-700 active:scale-95 rounded-lg shadow-sm transition-all flex items-center gap-1.5 whitespace-nowrap"
          >
            <PhoneCall className="w-3.5 h-3.5 animate-pulse" />
            <span>SOS</span>
          </button>
        </div>
      </div>
    </header>
  );
};
