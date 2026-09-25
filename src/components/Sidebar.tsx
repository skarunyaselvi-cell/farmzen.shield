import React from 'react';
import { Logo } from './Logo';
import { LanguageCode, Farm } from '../types';
import { translations } from '../i18n/translations';
import {
  Home, Shield, CloudSun, Stethoscope, Bot, Store, Bell, User,
  PhoneCall, LogOut, ChevronRight
} from 'lucide-react';

interface SidebarProps {
  currentTab: string;
  onSelectTab: (tab: string) => void;
  language: LanguageCode;
  onOpenSos: () => void;
  onOpenNotifications: () => void;
  unreadCount?: number;
  farmerName: string;
  farmName: string;
  onLogout: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  currentTab,
  onSelectTab,
  language,
  onOpenSos,
  onOpenNotifications,
  unreadCount = 0,
  farmerName,
  farmName,
  onLogout
}) => {
  const t = translations[language] || translations.en;

  const navItems = [
    { id: 'dashboard', label: t.nav.home, icon: Home },
    { id: 'shield', label: t.nav.shield, icon: Shield },
    { id: 'weather', label: t.nav.weather, icon: CloudSun },
    { id: 'cropDoctor', label: t.nav.cropDoctor, icon: Stethoscope },
    { id: 'ai', label: t.nav.ai, icon: Bot },
    { id: 'direct', label: t.nav.direct, icon: Store }
  ];

  return (
    <aside className="hidden lg:flex w-68 xl:w-72 flex-col justify-between bg-white dark:bg-slate-950 border-r border-slate-200/80 dark:border-slate-800 p-5 xl:p-6 h-screen sticky top-0 shrink-0 select-none z-30">
      <div className="space-y-6">
        {/* Full FARMZEN Brand Logo - Unclipped on all desktop sizes */}
        <button
          onClick={() => onSelectTab('dashboard')}
          className="text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 rounded-xl p-1.5 -ml-1.5 block shrink-0 hover:opacity-95 transition-opacity overflow-visible"
          title="FARMZEN Home"
        >
          <Logo size="md" variant="auto" showTagline={true} />
        </button>

        {/* Farmer & Farm Context Card */}
        <div className="p-3.5 rounded-2xl bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-200/60 dark:border-emerald-800/40 space-y-1">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-xs font-bold text-emerald-950 dark:text-emerald-200 truncate">
              {farmerName}
            </span>
          </div>
          <p className="text-[11px] text-slate-500 dark:text-slate-400 truncate">
            {farmName}
          </p>
        </div>

        {/* Main 5 Primary Feature Navigation Links */}
        <nav className="space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onSelectTab(item.id)}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                  isActive
                    ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/20'
                    : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-900'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon className={`w-4 h-4 ${isActive ? 'stroke-[2.5px]' : 'stroke-2'}`} />
                  <span>{item.label}</span>
                </div>
                {isActive && <ChevronRight className="w-3.5 h-3.5" />}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Bottom Controls: Notifications, SOS & Logout */}
      <div className="space-y-2 pt-4 border-t border-slate-100 dark:border-slate-800">
        <button
          onClick={onOpenNotifications}
          className="w-full flex items-center justify-between px-3.5 py-2 text-xs font-medium text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-900 rounded-xl transition-colors"
        >
          <div className="flex items-center gap-3">
            <Bell className="w-4 h-4 text-slate-400" />
            <span>{t.nav.notifications}</span>
          </div>
          {unreadCount > 0 && (
            <span className="px-2 py-0.5 text-[10px] font-bold rounded-full bg-emerald-500 text-slate-950">
              {unreadCount}
            </span>
          )}
        </button>

        {/* SOS Button */}
        <button
          onClick={onOpenSos}
          className="w-full flex items-center justify-center gap-2 px-3.5 py-2.5 text-xs font-bold text-white bg-red-600 hover:bg-red-700 active:scale-98 rounded-xl shadow-sm transition-all"
        >
          <PhoneCall className="w-3.5 h-3.5 animate-pulse" />
          <span>EMERGENCY SOS</span>
        </button>

        <button
          onClick={onLogout}
          className="w-full flex items-center gap-3 px-3.5 py-2 text-xs text-slate-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-950/30 rounded-xl transition-colors"
        >
          <LogOut className="w-4 h-4" />
          <span>Sign Out / Switch</span>
        </button>
      </div>
    </aside>
  );
};
