import React from 'react';
import { X, Bell, CloudRain, TrendingUp, AlertOctagon, CheckCheck, Clock } from 'lucide-react';
import { NotificationItem, LanguageCode } from '../types';
import { translations } from '../i18n/translations';

interface NotificationsModalProps {
  isOpen: boolean;
  onClose: () => void;
  notifications: NotificationItem[];
  onMarkRead: (id: string) => void;
  language: LanguageCode;
}

export const NotificationsModal: React.FC<NotificationsModalProps> = ({
  isOpen,
  onClose,
  notifications,
  onMarkRead,
  language
}) => {
  const t = translations[language];

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-lg bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden max-h-[85vh] flex flex-col">
        {/* Header */}
        <div className="px-5 py-4 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400 flex items-center justify-center">
              <Bell className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-base font-bold text-slate-900 dark:text-white">
                {t.nav.notifications}
              </h2>
              <p className="text-xs text-slate-500">Live farm bulletins & active advisories</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 text-slate-400 hover:text-slate-600 dark:hover:text-white rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Notifications List */}
        <div className="p-4 overflow-y-auto space-y-3 divide-y divide-slate-100 dark:divide-slate-800">
          {notifications.map((n) => {
            const isUnread = !n.is_read;
            return (
              <div
                key={n.id}
                onClick={() => onMarkRead(n.id)}
                className={`pt-3 first:pt-0 p-3 rounded-xl cursor-pointer transition-colors ${
                  isUnread
                    ? 'bg-emerald-50/70 dark:bg-emerald-950/30 border border-emerald-200/50 dark:border-emerald-800/40'
                    : 'hover:bg-slate-50 dark:hover:bg-slate-800/50'
                }`}
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-2">
                    {n.type === 'WEATHER' && <CloudRain className="w-4 h-4 text-sky-600" />}
                    {n.type === 'MARKET' && <TrendingUp className="w-4 h-4 text-emerald-600" />}
                    {n.type === 'DISEASE' && <AlertOctagon className="w-4 h-4 text-amber-600" />}
                    <h3 className={`text-xs sm:text-sm font-semibold ${isUnread ? 'text-slate-900 dark:text-white font-bold' : 'text-slate-700 dark:text-slate-300'}`}>
                      {n.title}
                    </h3>
                  </div>
                  {isUnread && (
                    <span className="w-2 h-2 rounded-full bg-emerald-500 shrink-0 mt-1" />
                  )}
                </div>

                <p className="mt-1 text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                  {n.message}
                </p>

                <div className="mt-2 flex items-center justify-between text-[11px] text-slate-400">
                  <span>Source: {n.source}</span>
                  <div className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    <span>Recent</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="p-3 bg-slate-50 dark:bg-slate-950 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs">
          <span className="text-slate-400">Official real-time updates</span>
          <button
            onClick={onClose}
            className="px-3 py-1 font-semibold text-emerald-600 hover:text-emerald-700"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
