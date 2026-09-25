import React, { useState } from 'react';
import { Logo } from '../components/Logo';
import { LanguageCode } from '../types';
import { translations } from '../i18n/translations';
import {
  Lock, Phone, Mail, User, MapPin, ArrowRight, ShieldCheck, Sparkles,
  CheckCircle2, KeyRound, Leaf
} from 'lucide-react';

interface AuthPageProps {
  language: LanguageCode;
  onSuccess: (farmerName: string, isNewUser?: boolean) => void;
  onQuickDemo: () => void;
}

export const AuthPage: React.FC<AuthPageProps> = ({
  language,
  onSuccess,
  onQuickDemo
}) => {
  const t = translations[language] || translations.en;
  const [mode, setMode] = useState<'login' | 'register'>('login');
  const [useOtp, setUseOtp] = useState<boolean>(false);
  const [otpSent, setOtpSent] = useState<boolean>(false);

  // Login Form
  const [loginIdentifier, setLoginIdentifier] = useState('9876543210');
  const [loginPassword, setLoginPassword] = useState('farmzen123');
  const [loginOtp, setLoginOtp] = useState('');

  // Register Form
  const [regFullName, setRegFullName] = useState('');
  const [regMobile, setRegMobile] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regPassword, setRegPassword] = useState('');
  const [regVillage, setRegVillage] = useState('');
  const [regDistrict, setRegDistrict] = useState('');
  const [regState, setRegState] = useState('');

  const [loading, setLoading] = useState(false);

  const heroImage = '/src/assets/images/farmzen_hero_landscape_1790307231565.jpg';

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      onSuccess(loginIdentifier === '9876543210' ? 'Karunya' : 'Farmer', false);
    }, 600);
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      onSuccess(regFullName || 'Karunya', true);
    }, 600);
  };

  return (
    <div className="min-h-screen relative flex items-center justify-center p-4 bg-gradient-to-br from-emerald-950 via-slate-950 to-emerald-950 text-white overflow-hidden">
      {/* Background Farm Landscape with Scrim */}
      <img
        src={heroImage}
        alt="Farm backdrop"
        className="absolute inset-0 w-full h-full object-cover opacity-20 filter blur-sm scale-105"
      />
      <div className="absolute inset-0 bg-radial-gradient from-transparent via-slate-950/70 to-slate-950" />

      {/* Floating organic particle aesthetics */}
      <div className="absolute top-10 left-10 w-72 h-72 rounded-full bg-emerald-500/10 blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-80 h-80 rounded-full bg-emerald-600/15 blur-3xl pointer-events-none" />

      <div className="relative z-10 w-full max-w-md my-8">
        {/* Card Container with Glassmorphism */}
        <div className="bg-slate-900/80 backdrop-blur-xl rounded-3xl p-6 sm:p-8 shadow-2xl border border-emerald-500/30">
          {/* Logo & Header */}
          <div className="text-center space-y-2 mb-6">
            <div className="flex justify-center">
              <Logo size="lg" variant="light" />
            </div>
            <p className="text-xs text-emerald-300 font-medium tracking-wide">
              "Decide Better. Farm Smarter. Sell Better."
            </p>
          </div>

          {/* Quick Demo Mode Badge */}
          <div className="mb-5 p-3 rounded-2xl bg-emerald-950/80 border border-emerald-500/40 flex items-center justify-between gap-3">
            <div className="flex items-center gap-2.5">
              <img
                src="/src/assets/images/farmzen_farmer_avatar_1790308877352.jpg"
                alt="Farmer avatar"
                className="w-9 h-9 rounded-full object-cover border border-emerald-400 shrink-0"
              />
              <div className="text-xs">
                <span className="font-bold text-emerald-300 block">Instant Farmer Demo</span>
                <span className="text-[11px] text-slate-300">Explore pre-configured farm directly</span>
              </div>
            </div>
            <button
              onClick={onQuickDemo}
              className="px-3 py-1.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs shadow-md shadow-emerald-500/20 active:scale-95 transition-all whitespace-nowrap"
            >
              Enter Farm
            </button>
          </div>

          {/* Mode Switcher Tabs */}
          <div className="grid grid-cols-2 p-1 bg-slate-950/60 rounded-xl mb-6 border border-slate-800">
            <button
              onClick={() => setMode('login')}
              className={`py-2 text-xs font-bold rounded-lg transition-all ${
                mode === 'login'
                  ? 'bg-emerald-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              LOGIN
            </button>
            <button
              onClick={() => setMode('register')}
              className={`py-2 text-xs font-bold rounded-lg transition-all ${
                mode === 'register'
                  ? 'bg-emerald-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              CREATE ACCOUNT
            </button>
          </div>

          {/* LOGIN FORM */}
          {mode === 'login' ? (
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1.5">
                  Mobile Number or Email
                </label>
                <div className="relative flex items-center">
                  <Phone className="w-4 h-4 text-emerald-400 absolute left-3" />
                  <input
                    type="text"
                    required
                    value={loginIdentifier}
                    onChange={(e) => setLoginIdentifier(e.target.value)}
                    placeholder="9876543210 or email"
                    className="w-full bg-slate-950/70 border border-slate-700/80 rounded-xl pl-9 pr-3 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 transition-colors"
                  />
                </div>
              </div>

              {!useOtp ? (
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="text-xs font-semibold text-slate-300">
                      Password
                    </label>
                    <button
                      type="button"
                      onClick={() => setUseOtp(true)}
                      className="text-[11px] text-emerald-400 hover:underline"
                    >
                      Login with OTP instead
                    </button>
                  </div>
                  <div className="relative flex items-center">
                    <Lock className="w-4 h-4 text-emerald-400 absolute left-3" />
                    <input
                      type="password"
                      required
                      value={loginPassword}
                      onChange={(e) => setLoginPassword(e.target.value)}
                      placeholder="••••••••"
                      className="w-full bg-slate-950/70 border border-slate-700/80 rounded-xl pl-9 pr-3 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 transition-colors"
                    />
                  </div>
                </div>
              ) : (
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="text-xs font-semibold text-slate-300">
                      One-Time Password (OTP)
                    </label>
                    <button
                      type="button"
                      onClick={() => setUseOtp(false)}
                      className="text-[11px] text-emerald-400 hover:underline"
                    >
                      Use Password
                    </button>
                  </div>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={loginOtp}
                      onChange={(e) => setLoginOtp(e.target.value)}
                      placeholder="6-digit OTP"
                      className="flex-1 bg-slate-950/70 border border-slate-700/80 rounded-xl px-3 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
                    />
                    <button
                      type="button"
                      onClick={() => setOtpSent(true)}
                      className="px-3 py-2.5 bg-slate-800 hover:bg-slate-700 text-xs font-semibold rounded-xl text-emerald-300 border border-slate-700"
                    >
                      {otpSent ? 'Resend' : 'Send OTP'}
                    </button>
                  </div>
                  {otpSent && (
                    <span className="text-[10px] text-emerald-400 mt-1 block">
                      OTP sent: use <span className="font-mono font-bold">123456</span> for demo
                    </span>
                  )}
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full mt-2 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 active:scale-98 text-white font-bold text-xs sm:text-sm shadow-lg shadow-emerald-600/30 flex items-center justify-center gap-2 transition-all"
              >
                <span>{loading ? 'Authenticating...' : 'LOGIN TO FARMZEN'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          ) : (
            /* REGISTER FORM */
            <form onSubmit={handleRegister} className="space-y-3">
              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1">Full Name</label>
                <div className="relative flex items-center">
                  <User className="w-4 h-4 text-emerald-400 absolute left-3" />
                  <input
                    type="text"
                    required
                    value={regFullName}
                    onChange={(e) => setRegFullName(e.target.value)}
                    placeholder="e.g. Karunya S."
                    className="w-full bg-slate-950/70 border border-slate-700/80 rounded-xl pl-9 pr-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-xs font-semibold text-slate-300 block mb-1">Mobile Number</label>
                  <input
                    type="tel"
                    required
                    value={regMobile}
                    onChange={(e) => setRegMobile(e.target.value)}
                    placeholder="9876543210"
                    className="w-full bg-slate-950/70 border border-slate-700/80 rounded-xl px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-slate-300 block mb-1">Password</label>
                  <input
                    type="password"
                    required
                    value={regPassword}
                    onChange={(e) => setRegPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full bg-slate-950/70 border border-slate-700/80 rounded-xl px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-2">
                <div>
                  <label className="text-[11px] font-semibold text-slate-300 block mb-1">Village</label>
                  <input
                    type="text"
                    required
                    value={regVillage}
                    onChange={(e) => setRegVillage(e.target.value)}
                    placeholder="Village"
                    className="w-full bg-slate-950/70 border border-slate-700/80 rounded-xl px-2 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
                  />
                </div>
                <div>
                  <label className="text-[11px] font-semibold text-slate-300 block mb-1">District</label>
                  <input
                    type="text"
                    required
                    value={regDistrict}
                    onChange={(e) => setRegDistrict(e.target.value)}
                    placeholder="District"
                    className="w-full bg-slate-950/70 border border-slate-700/80 rounded-xl px-2 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
                  />
                </div>
                <div>
                  <label className="text-[11px] font-semibold text-slate-300 block mb-1">State</label>
                  <input
                    type="text"
                    required
                    value={regState}
                    onChange={(e) => setRegState(e.target.value)}
                    placeholder="State"
                    className="w-full bg-slate-950/70 border border-slate-700/80 rounded-xl px-2 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full mt-2 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 active:scale-98 text-white font-bold text-xs sm:text-sm shadow-lg shadow-emerald-600/30 flex items-center justify-center gap-2 transition-all"
              >
                <span>{loading ? 'Creating Account...' : 'CREATE FARMZEN ACCOUNT'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          )}

          {/* Trust Footnote */}
          <div className="mt-6 pt-4 border-t border-slate-800 flex items-center justify-center gap-2 text-[11px] text-slate-400">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            <span>Encrypted Farmer Data Privacy · PMFBY & IMD Integrated</span>
          </div>
        </div>
      </div>
    </div>
  );
};
