import React, { useState, useEffect } from 'react';
import { adminApi, schemesApi } from '../services/api';
import { GovernmentScheme, LanguageCode } from '../types';
import { translations } from '../i18n/translations';
import {
  ShieldAlert, Database, Server, CheckCircle2, AlertCircle, FileText,
  ExternalLink, Activity, Users, Layers, Clock
} from 'lucide-react';

interface AdminPageProps {
  language: LanguageCode;
}

export const AdminPage: React.FC<AdminPageProps> = ({ language }) => {
  const t = translations[language];
  const [overview, setOverview] = useState<any>(null);
  const [schemes, setSchemes] = useState<GovernmentScheme[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    Promise.all([adminApi.getOverview(), schemesApi.getAll()])
      .then(([ov, sch]) => {
        setOverview(ov);
        setSchemes(sch);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Admin fetch error:', err);
        setLoading(false);
      });
  }, []);

  if (loading || !overview) {
    return (
      <div className="py-20 text-center text-xs text-slate-500 font-mono">
        Loading FARMZEN System Administration Console...
      </div>
    );
  }

  return (
    <div className="space-y-6 pb-20">
      <div className="border-b border-slate-200 dark:border-slate-800 pb-4 flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold font-display text-slate-900 dark:text-white">
            FARMZEN System Administration & Data Governance
          </h1>
          <p className="text-xs text-slate-500">Platform telemetry, verified data sources and security audits</p>
        </div>
        <span className="text-xs font-mono font-semibold text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950 px-2.5 py-1 rounded-md border border-emerald-200 dark:border-emerald-800">
          Role: ADMIN
        </span>
      </div>

      {/* Platform Counters */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-1">
          <div className="flex items-center gap-1.5 text-xs text-slate-500">
            <Users className="w-3.5 h-3.5" />
            <span>Active Farmers</span>
          </div>
          <div className="text-2xl font-black font-mono text-slate-900 dark:text-white">
            {overview.total_users}
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-1">
          <div className="flex items-center gap-1.5 text-xs text-slate-500">
            <Layers className="w-3.5 h-3.5" />
            <span>Registered Farms</span>
          </div>
          <div className="text-2xl font-black font-mono text-slate-900 dark:text-white">
            {overview.total_farms}
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-1">
          <div className="flex items-center gap-1.5 text-xs text-slate-500">
            <FileText className="w-3.5 h-3.5" />
            <span>Produce Listings</span>
          </div>
          <div className="text-2xl font-black font-mono text-emerald-600">
            {overview.active_listings}
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-1">
          <div className="flex items-center gap-1.5 text-xs text-slate-500">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>Verified Buyers</span>
          </div>
          <div className="text-2xl font-black font-mono text-emerald-600">
            {overview.verified_buyers}
          </div>
        </div>
      </div>

      {/* Verified Official Data Sources */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 shadow-sm border border-slate-200/80 dark:border-slate-800 space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-base font-bold text-slate-900 dark:text-white">
              Official Data Integration Sources
            </h2>
            <p className="text-xs text-slate-500">Real-time connectors ensuring verifiable agricultural and market integrity</p>
          </div>
          <Server className="w-5 h-5 text-emerald-600" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
          {overview.data_sources?.map((ds: any) => (
            <div
              key={ds.id}
              className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-800 space-y-2"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white">
                  {ds.name}
                </span>
                <span className="text-[10px] font-bold text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950 px-2 py-0.5 rounded border border-emerald-200 dark:border-emerald-800">
                  {ds.status}
                </span>
              </div>

              <div className="text-xs text-slate-500">{ds.type}</div>
              <p className="text-xs text-slate-600 dark:text-slate-300">{ds.description}</p>

              <div className="pt-2 flex items-center justify-between text-[11px] text-slate-400 font-mono">
                <span>Checked: {new Date(ds.last_checked).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                <a
                  href={ds.url}
                  target="_blank"
                  rel="noreferrer"
                  className="text-emerald-600 hover:text-emerald-700 flex items-center gap-1 font-sans font-semibold"
                >
                  <span>Portal</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Audit Logs */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 shadow-sm border border-slate-200/80 dark:border-slate-800 space-y-4">
        <h2 className="text-base font-bold text-slate-900 dark:text-white">
          Security & Audit Logs
        </h2>

        <div className="space-y-2">
          {overview.audit_logs?.map((log: any) => (
            <div
              key={log.id}
              className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs"
            >
              <div className="space-y-0.5">
                <div className="flex items-center gap-2">
                  <span className="font-mono font-bold text-slate-800 dark:text-slate-200">{log.action}</span>
                  <span className="text-slate-400 font-mono text-[11px]">user: {log.user_id}</span>
                </div>
                <p className="text-slate-600 dark:text-slate-400 text-xs">{log.details}</p>
              </div>

              <div className="text-[11px] text-slate-400 font-mono shrink-0 ml-3">
                {new Date(log.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
