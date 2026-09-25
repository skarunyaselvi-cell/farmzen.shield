import React from 'react';
import { X, PhoneCall, AlertTriangle, ShieldAlert, FileText, CheckCircle2, ExternalLink } from 'lucide-react';
import { SOSContact, LanguageCode } from '../types';
import { translations } from '../i18n/translations';

interface SosModalProps {
  isOpen: boolean;
  onClose: () => void;
  contacts: SOSContact[];
  language: LanguageCode;
}

export const SosModal: React.FC<SosModalProps> = ({
  isOpen,
  onClose,
  contacts,
  language
}) => {
  const t = translations[language];

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/70 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-2xl bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-red-500/30 overflow-hidden max-h-[90vh] flex flex-col">
        {/* Red Warning Header */}
        <div className="bg-gradient-to-r from-red-600 via-rose-600 to-red-700 px-5 py-4 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
              <ShieldAlert className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold font-display">{t.sos.title}</h2>
              <p className="text-xs text-red-100">{t.sos.subtitle}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg hover:bg-white/20 transition-colors text-white min-w-[36px] min-h-[36px] flex items-center justify-center"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Informational Banner */}
        <div className="bg-red-50 dark:bg-red-950/40 px-5 py-3 border-b border-red-200/50 dark:border-red-900/30 flex items-start gap-2.5 text-xs text-red-800 dark:text-red-300">
          <AlertTriangle className="w-4 h-4 shrink-0 text-red-600 mt-0.5" />
          <div>
            <span className="font-bold">CRITICAL 72-HOUR NOTICE:</span> If unseasonal rain, hailstorm, or flood damaged your crop, report loss within 72 hours to PMFBY helpline <span className="font-mono font-bold">14447</span> or your local Agricultural Officer for claim survey.
          </div>
        </div>

        {/* Contacts List */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-4 divide-y divide-slate-100 dark:divide-slate-800">
          {contacts.map((c) => (
            <div key={c.id} className="pt-3 first:pt-0 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="space-y-1 max-w-md">
                <div className="flex items-center gap-2">
                  <h3 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white">
                    {c.name}
                  </h3>
                  {c.is_verified && (
                    <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 px-2 py-0.5 rounded-md border border-emerald-200 dark:border-emerald-800">
                      <CheckCircle2 className="w-3 h-3" />
                      Verified
                    </span>
                  )}
                </div>

                <div className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                  {c.department} · {c.district}, {c.state}
                </div>

                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                  {c.description}
                </p>

                <div className="text-[11px] text-slate-400 font-mono">
                  Language: {c.language}
                </div>
              </div>

              {/* Call Now Action Button with tel: */}
              <div className="shrink-0 flex sm:flex-col items-center gap-2">
                <a
                  href={`tel:${c.phone_number}`}
                  className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-md shadow-red-600/20 active:scale-95 transition-all"
                >
                  <PhoneCall className="w-4 h-4" />
                  <span>Call {c.phone_number}</span>
                </a>

                {c.source_url && (
                  <a
                    href={c.source_url}
                    target="_blank"
                    rel="noreferrer"
                    className="text-[11px] text-slate-500 hover:text-emerald-600 flex items-center gap-1 underline underline-offset-2"
                  >
                    <span>Official Portal</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Footer info */}
        <div className="p-4 bg-slate-50 dark:bg-slate-950 border-t border-slate-200 dark:border-slate-800 text-[11px] text-slate-500 flex items-center justify-between">
          <span>All contacts verified with Ministry of Agriculture and PMFBY</span>
          <button
            onClick={onClose}
            className="px-3 py-1 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:text-slate-900"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
