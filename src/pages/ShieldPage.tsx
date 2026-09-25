import React, { useState, useEffect } from 'react';
import { Farm, FarmFinances, ShieldRiskOverview, WhatIfSimulation, LanguageCode } from '../types';
import { translations } from '../i18n/translations';
import { shieldApi } from '../services/api';
import {
  Shield, AlertTriangle, TrendingUp, TrendingDown, DollarSign, Umbrella, FileCheck,
  ChevronRight, RefreshCw, Layers, Sparkles, Sun, CheckCircle2, ArrowUpRight, Info
} from 'lucide-react';

interface ShieldPageProps {
  currentFarm: Farm;
  finances: FarmFinances;
  risk: ShieldRiskOverview;
  language: LanguageCode;
  onOpenSos: () => void;
}

export const ShieldPage: React.FC<ShieldPageProps> = ({
  currentFarm,
  finances,
  risk,
  language,
  onOpenSos
}) => {
  const t = translations[language] || translations.en;
  const [lossPercent, setLossPercent] = useState<number>(50);
  const [simulation, setSimulation] = useState<WhatIfSimulation | null>(null);
  const [loadingSim, setLoadingSim] = useState<boolean>(false);
  const [selectedRiskCategory, setSelectedRiskCategory] = useState<string>('weather');

  const shieldHeroImage = '/src/assets/images/shield_hero_bg_1790310083063.jpg';

  // Trigger what-if calculation on percentage change
  useEffect(() => {
    let isMounted = true;
    setLoadingSim(true);
    shieldApi.simulateLoss(currentFarm.id, lossPercent)
      .then((data) => {
        if (isMounted) {
          setSimulation(data);
          setLoadingSim(false);
        }
      })
      .catch(() => {
        if (isMounted) setLoadingSim(false);
      });

    return () => { isMounted = false; };
  }, [currentFarm.id, lossPercent]);

  // Specific risk factor categories as required
  const riskCategoriesList = [
    {
      key: 'weather',
      name: 'Weather Risk',
      icon: '🌦',
      score: risk.categories?.weather?.score ?? 35,
      status: risk.categories?.weather?.status ?? 'Elevated',
      description: 'IMD alert: 45mm rainfall expected in 48 hours with isolated waterlogging risk.',
      action: 'Ensure perimeter field drainage trenches are clear.'
    },
    {
      key: 'crop',
      name: 'Crop Risk',
      icon: '🌱',
      score: risk.categories?.crop_health?.score ?? 28,
      status: risk.categories?.crop_health?.status ?? 'MODERATE',
      description: 'Vegetative tillering phase progressing on schedule. Canopy density optimal.',
      action: 'Apply micro-nutrient foliar spray once rain clears.'
    },
    {
      key: 'water',
      name: 'Water Risk',
      icon: '💧',
      score: risk.categories?.water?.score ?? 32,
      status: risk.categories?.water?.status ?? 'MODERATE',
      description: 'Groundwater table at 4.2m depth with canal replenishment scheduled this Friday.',
      action: 'Pause pump tube well operations to save power and water.'
    },
    {
      key: 'pest',
      name: 'Pest / Disease Risk',
      icon: '🐛',
      score: risk.categories?.pest?.score ?? 22,
      status: risk.categories?.pest?.status ?? 'LOW',
      description: 'Stem borer pheromone trap counts remain below economic threshold (2 moths/trap).',
      action: 'Keep routine 3-day trap surveillance active.'
    },
    {
      key: 'market',
      name: 'Market Risk',
      icon: '📊',
      score: risk.categories?.market?.score ?? 25,
      status: risk.categories?.market?.status ?? 'LOW',
      description: 'Regional Mandi arrivals are steady with modal prices trending +9.6% above MSP.',
      action: 'Book forward harvest slots on FARMZEN Direct.'
    },
    {
      key: 'financial',
      name: 'Financial Risk',
      icon: '💰',
      score: risk.categories?.finance?.score ?? 30,
      status: risk.categories?.finance?.status ?? 'MODERATE',
      description: 'Loan interest subsidized at 4% under PACS. PMFBY crop insurance active.',
      action: 'Maintain repayment buffer for November due date.'
    }
  ];

  const activeCategory = riskCategoriesList.find(c => c.key === selectedRiskCategory) || riskCategoriesList[0];

  return (
    <div className="space-y-6 pb-20">
      {/* 1. VISUAL HERO ENVIRONMENT BASED ON CONCEPT 1 */}
      {/* Plant growing from soil + stacks of coins + upward financial graph */}
      <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-emerald-900/30 min-h-[360px] sm:min-h-[420px] flex flex-col justify-between">
        {/* Background Image with Responsive Cropping */}
        <img
          src={shieldHeroImage}
          alt="Plant growing from soil with coins and upward financial graph"
          className="absolute inset-0 w-full h-full object-cover object-center filter brightness-90 animate-plant-sway"
          onError={(e) => {
            // Graceful fallback to hero landscape if needed
            e.currentTarget.src = '/src/assets/images/farmzen_shield_protection_1790307268373.jpg';
          }}
        />

        {/* Cinematic Atmospheric Overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-black/40" />
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-950/80 via-transparent to-slate-950/70" />

        {/* Soft Sunlight Sweep Effect */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="w-[120%] h-full bg-gradient-to-r from-transparent via-amber-200/20 to-transparent animate-sunlight-sweep" />
        </div>

        {/* Interactive SVG Financial Growth Graph Overlay with small glowing particles */}
        <div className="absolute inset-0 pointer-events-none opacity-45 sm:opacity-65 flex items-end">
          <svg className="w-full h-48 sm:h-64" viewBox="0 0 1000 240" fill="none" preserveAspectRatio="none">
            {/* Soft gradient fill under graph line */}
            <defs>
              <linearGradient id="shieldGrowthGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#10B981" stopOpacity="0.35" />
                <stop offset="100%" stopColor="#047857" stopOpacity="0.0" />
              </linearGradient>
              <filter id="glow">
                <feGaussianBlur stdDeviation="3.5" result="coloredBlur" />
                <feMerge>
                  <feMergeNode in="coloredBlur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>
            <path
              d="M0,210 C150,200 260,175 420,130 C580,85 750,70 1000,20 L1000,240 L0,240 Z"
              fill="url(#shieldGrowthGrad)"
            />
            {/* Animated Graph Line Drawing Itself Upward */}
            <path
              d="M0,210 C150,200 260,175 420,130 C580,85 750,70 1000,20"
              stroke="#34D399"
              strokeWidth="4"
              className="animate-graph-draw"
              filter="url(#glow)"
            />
            {/* Glowing Data Nodes along the Graph */}
            <circle cx="210" cy="188" r="5" fill="#FBBF24" className="animate-coin-gleam" />
            <circle cx="420" cy="130" r="6" fill="#34D399" className="animate-pulse" />
            <circle cx="680" cy="80" r="5" fill="#FBBF24" className="animate-coin-gleam" />
            <circle cx="950" cy="28" r="7" fill="#6EE7B7" filter="url(#glow)" />
          </svg>
        </div>

        {/* Top Header Tag Inside Hero */}
        <div className="relative z-10 p-6 sm:p-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 backdrop-blur-md border border-emerald-400/40 text-emerald-300 flex items-center justify-center shadow-lg animate-shield-glow">
              <Shield className="w-6 h-6 text-emerald-300" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-bold uppercase tracking-widest text-emerald-400 bg-emerald-950/80 px-2.5 py-0.5 rounded-full border border-emerald-700/50">
                  Financial Protection System
                </span>
                <span className="text-[11px] font-mono text-amber-300 bg-amber-950/60 px-2 py-0.5 rounded-md border border-amber-800/40">
                  PMFBY Active
                </span>
              </div>
              <div className="mt-1">
                <h1 className="text-3xl sm:text-5xl font-black font-editorial heading-shield tracking-tight animate-heading-reveal">
                  FARMZEN SHIELD
                </h1>
                <div className="underline-shield w-28 sm:w-36 mt-2 animate-underline-glow" />
              </div>
            </div>
          </div>

          <button
            onClick={onOpenSos}
            className="px-4 py-2.5 rounded-xl bg-red-600/90 hover:bg-red-500 text-white font-bold text-xs flex items-center gap-2 backdrop-blur-md shadow-lg shadow-red-900/40 transition-all active:scale-95 self-start sm:self-auto"
          >
            <AlertTriangle className="w-4 h-4 text-white animate-bounce" />
            <span>Kisan SOS / Krishi Rakshak</span>
          </button>
        </div>

        {/* Hero Bottom Banner Text */}
        <div className="relative z-10 p-6 sm:p-8 pt-0">
          <div className="max-w-2xl bg-slate-950/75 backdrop-blur-md p-4 sm:p-5 rounded-2xl border border-emerald-500/30 shadow-xl">
            <p className="text-sm sm:text-base font-semibold text-emerald-100 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-400 shrink-0" />
              “Protect your farm financially while the farm grows.”
            </p>
            <p className="text-xs text-slate-300 mt-1 leading-relaxed">
              Understand your comprehensive exposure before risks turn into debt. Dynamic protection calibrated with real-time IMD microclimate, PACS loan agreements, and ICAR advisory models.
            </p>
          </div>
        </div>
      </div>

      {/* 2. THREE-STEP INTELLIGENCE PIPELINE */}
      <div className="p-4 rounded-2xl bg-emerald-50/80 dark:bg-emerald-950/40 border border-emerald-200/60 dark:border-emerald-800/40 grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
        <div className="flex items-center gap-2.5 text-slate-700 dark:text-slate-300">
          <span className="w-6 h-6 rounded-full bg-emerald-600 text-white flex items-center justify-center text-xs font-bold shrink-0">1</span>
          <div>
            <span className="font-bold block text-emerald-950 dark:text-emerald-200">WHAT YOU ENTER</span>
            <span className="text-[11px] text-slate-500 dark:text-slate-400">₹{finances.cultivation_investment.toLocaleString('en-IN')} cost · ₹{finances.loan_amount.toLocaleString('en-IN')} loan · PMFBY {finances.insurance_status}</span>
          </div>
        </div>

        <div className="flex items-center gap-2.5 text-slate-700 dark:text-slate-300">
          <span className="w-6 h-6 rounded-full bg-emerald-600 text-white flex items-center justify-center text-xs font-bold shrink-0">2</span>
          <div>
            <span className="font-bold block text-emerald-950 dark:text-emerald-200">WHAT FARMZEN UNDERSTANDS</span>
            <span className="text-[11px] text-slate-500 dark:text-slate-400">{risk.overall_score}% {risk.risk_level} Risk · 2.1x Harvest Buffer</span>
          </div>
        </div>

        <div className="flex items-center gap-2.5 text-slate-700 dark:text-slate-300">
          <span className="w-6 h-6 rounded-full bg-emerald-600 text-white flex items-center justify-center text-xs font-bold shrink-0">3</span>
          <div>
            <span className="font-bold block text-emerald-950 dark:text-emerald-200">WHAT FARMZEN RECOMMENDS</span>
            <span className="text-[11px] text-slate-500 dark:text-slate-400">Unblock field drains · File 72h PMFBY claim if inundated</span>
          </div>
        </div>
      </div>

      {/* 3. FARM RISK SECTION (Weather, Crop, Water, Pest/Disease, Market, Financial) */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 shadow-sm border border-slate-200/80 dark:border-slate-800 space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 dark:border-slate-800 pb-3">
          <div>
            <h2 className="text-lg font-bold font-display text-slate-900 dark:text-white flex items-center gap-2">
              <Shield className="w-5 h-5 text-emerald-600" />
              <span>FARM RISK BREAKDOWN</span>
            </h2>
            <p className="text-xs text-slate-500">Live multi-factor vulnerability assessment for your farm</p>
          </div>
          <div className="flex items-center gap-2 text-xs font-mono text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 px-3 py-1 rounded-full border border-emerald-200 dark:border-emerald-800">
            <span>Overall Farm Risk:</span>
            <span className="font-bold text-sm">{risk.overall_score}% ({risk.risk_level})</span>
          </div>
        </div>

        {/* 6 Interactive Risk Cards as requested */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {riskCategoriesList.map((cat) => {
            const isSelected = selectedRiskCategory === cat.key;
            const badgeColor = cat.score < 25 ? 'text-emerald-700 bg-emerald-100 dark:bg-emerald-950' : cat.score < 50 ? 'text-amber-700 bg-amber-100 dark:bg-amber-950' : 'text-red-700 bg-red-100 dark:bg-red-950';

            return (
              <button
                key={cat.key}
                onClick={() => setSelectedRiskCategory(cat.key)}
                className={`p-3.5 rounded-2xl border text-left transition-all relative overflow-hidden ${
                  isSelected
                    ? 'border-emerald-500 bg-emerald-50/90 dark:bg-emerald-950/60 shadow-md ring-2 ring-emerald-500/30'
                    : 'border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 bg-slate-50/70 dark:bg-slate-800/40'
                }`}
              >
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-lg">{cat.icon}</span>
                  <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${badgeColor}`}>
                    {cat.status}
                  </span>
                </div>
                <div className="text-xs font-bold text-slate-800 dark:text-slate-200 truncate">
                  {cat.name}
                </div>
                <div className="text-xl font-black font-mono text-slate-900 dark:text-white mt-1">
                  {cat.score}%
                </div>
              </button>
            );
          })}
        </div>

        {/* Interactive Active Factor Deep-Dive Panel */}
        <div className="p-4 rounded-2xl bg-emerald-950/5 dark:bg-emerald-950/40 border border-emerald-200/80 dark:border-emerald-800/60 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Active Factor</div>
            <div className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-1.5 mt-0.5">
              <span>{activeCategory.icon}</span>
              <span>{activeCategory.name}</span>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-300 mt-1 leading-relaxed">
              {activeCategory.description}
            </p>
          </div>

          <div>
            <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Vulnerability Status</div>
            <div className="mt-1 flex items-baseline gap-2">
              <span className="text-2xl font-extrabold font-mono text-slate-900 dark:text-white">
                {activeCategory.score}%
              </span>
              <span className="text-xs font-semibold text-emerald-600">Threshold: Safe &lt; 40%</span>
            </div>
            <div className="w-full bg-slate-200 dark:bg-slate-800 h-2 rounded-full overflow-hidden mt-1.5">
              <div
                className="bg-emerald-500 h-full rounded-full transition-all duration-500"
                style={{ width: `${Math.min(100, activeCategory.score * 1.5)}%` }}
              />
            </div>
          </div>

          <div>
            <div className="text-[11px] font-bold text-emerald-700 dark:text-emerald-400 uppercase tracking-wider">Recommended Action</div>
            <p className="text-xs font-semibold text-emerald-900 dark:text-emerald-200 mt-1 leading-relaxed">
              {activeCategory.action}
            </p>
            <div className="mt-2 text-[11px] text-slate-500 flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
              <span>Shield monitors sensor & advisory updates continuously</span>
            </div>
          </div>
        </div>
      </div>

      {/* 4. FINANCIAL EXPOSURE CARDS (Investment, Loan, Expected Income, Repayment, Insurance) */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 shadow-sm border border-slate-200/80 dark:border-slate-800 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 dark:border-slate-800 pb-3">
          <div>
            <h2 className="text-lg font-bold font-display text-slate-900 dark:text-white flex items-center gap-2">
              <DollarSign className="w-5 h-5 text-amber-500" />
              <span>FINANCIAL EXPOSURE & LIQUIDITY</span>
            </h2>
            <p className="text-xs text-slate-500">Your seasonal cultivation investment versus harvest debt obligations</p>
          </div>
          <span className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950 px-2.5 py-1 rounded-md border border-emerald-200 dark:border-emerald-800">
            <FileCheck className="w-3.5 h-3.5" />
            PMFBY Protected
          </span>
        </div>

        {/* 5 Financial Exposure Cards as requested */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3.5">
          {/* 1. Investment */}
          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-800 space-y-1">
            <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
              {t.shield.totalInvestment}
            </div>
            <div className="text-xl font-bold font-mono text-slate-900 dark:text-white">
              ₹{finances.cultivation_investment.toLocaleString('en-IN')}
            </div>
            <div className="text-[11px] text-slate-400">Seeds, fertilizer, diesel, labor</div>
          </div>

          {/* 2. Loan */}
          <div className="p-4 rounded-2xl bg-amber-50/70 dark:bg-amber-950/30 border border-amber-200/70 dark:border-amber-800/40 space-y-1">
            <div className="text-[11px] font-bold text-amber-700 dark:text-amber-400 uppercase tracking-wider">
              {t.shield.loanObligation}
            </div>
            <div className="text-xl font-bold font-mono text-amber-800 dark:text-amber-300">
              ₹{finances.loan_amount.toLocaleString('en-IN')}
            </div>
            <div className="text-[11px] text-amber-600">{finances.loan_interest_rate}% PACS Subsidized</div>
          </div>

          {/* 3. Expected Income */}
          <div className="p-4 rounded-2xl bg-emerald-50/80 dark:bg-emerald-950/30 border border-emerald-200/70 dark:border-emerald-800/40 space-y-1">
            <div className="text-[11px] font-bold text-emerald-700 dark:text-emerald-400 uppercase tracking-wider">
              {t.shield.expectedIncome}
            </div>
            <div className="text-xl font-bold font-mono text-emerald-800 dark:text-emerald-300">
              ₹{finances.expected_harvest_value.toLocaleString('en-IN')}
            </div>
            <div className="text-[11px] text-emerald-600">At modal rate ₹34/kg</div>
          </div>

          {/* 4. Repayment */}
          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-800 space-y-1">
            <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
              {t.shield.upcomingRepayment}
            </div>
            <div className="text-base font-bold font-mono text-slate-800 dark:text-slate-200">
              {finances.repayment_date}
            </div>
            <div className="text-[11px] text-emerald-600 font-semibold">66 Days Remaining</div>
          </div>

          {/* 5. Insurance */}
          <div className="p-4 rounded-2xl bg-sky-50/80 dark:bg-sky-950/30 border border-sky-200/70 dark:border-sky-800/40 space-y-1">
            <div className="text-[11px] font-bold text-sky-700 dark:text-sky-400 uppercase tracking-wider">
              Insurance Policy
            </div>
            <div className="text-xs font-bold font-mono text-sky-800 dark:text-sky-200 truncate">
              {finances.insurance_policy_number}
            </div>
            <div className="text-[11px] text-sky-600">PMFBY Claim Ready</div>
          </div>
        </div>
      </div>

      {/* 5. CROP LOSS SIMULATOR (10%, 25%, 50%, 75%, 100%) */}
      <div className="bg-gradient-to-br from-slate-900 via-emerald-950 to-slate-950 text-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-emerald-600/50 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-emerald-800/40 pb-4">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-bold text-emerald-400 uppercase tracking-wider mb-1">
              <Layers className="w-4 h-4" />
              <span>Interactive Decision Protection</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold font-display text-white">
              CROP LOSS SIMULATOR
            </h2>
            <p className="text-xs text-slate-300">
              Simulate damage scenarios to know your exact remaining income and relief options
            </p>
          </div>

          <div className="text-right">
            <span className="text-xs text-slate-400 block">Baseline Expected Income:</span>
            <span className="text-lg font-mono font-bold text-emerald-300">
              ₹{finances.expected_harvest_value.toLocaleString('en-IN')}
            </span>
          </div>
        </div>

        {/* 5 Specific Preset Buttons: 10%, 25%, 50%, 75%, 100% */}
        <div className="space-y-4 bg-black/40 p-5 sm:p-6 rounded-2xl border border-emerald-800/40">
          <div className="flex items-center justify-between">
            <label className="text-xs sm:text-sm font-bold text-slate-200">
              SELECT SIMULATED LOSS PERCENTAGE:
            </label>
            <span className="text-2xl sm:text-3xl font-black font-display text-amber-400">
              {lossPercent}% Damage
            </span>
          </div>

          {/* Loss Slider */}
          <input
            type="range"
            min="0"
            max="100"
            step="5"
            value={lossPercent}
            onChange={(e) => setLossPercent(Number(e.target.value))}
            className="w-full h-3 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-emerald-500 focus:outline-none"
          />

          {/* Requested 5 Presets + 0% */}
          <div className="grid grid-cols-6 gap-2 pt-1">
            {[0, 10, 25, 50, 75, 100].map((preset) => (
              <button
                key={preset}
                onClick={() => setLossPercent(preset)}
                className={`py-2 px-1 rounded-xl text-xs font-mono font-bold transition-all text-center ${
                  lossPercent === preset
                    ? 'bg-emerald-500 text-slate-950 shadow-lg shadow-emerald-500/30 scale-105'
                    : 'bg-slate-800/80 text-slate-300 hover:bg-slate-700 hover:text-white'
                }`}
              >
                {preset}%
              </button>
            ))}
          </div>
        </div>

        {/* Animated Visual Simulator Output */}
        {simulation && (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {/* Estimated Loss */}
            <div className="p-5 rounded-2xl bg-red-950/40 border border-red-500/40 space-y-1.5 transition-all">
              <span className="text-xs font-bold uppercase tracking-wider text-red-300">
                Estimated Crop Loss
              </span>
              <div className="text-2xl sm:text-3xl font-black font-mono text-red-400">
                -₹{simulation.estimated_loss.toLocaleString('en-IN')}
              </div>
              <span className="text-[11px] text-red-200/80 block">
                Direct harvest yield deficit calculation
              </span>
            </div>

            {/* Expected Remaining Income */}
            <div className="p-5 rounded-2xl bg-emerald-950/40 border border-emerald-500/40 space-y-1.5 transition-all">
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-300">
                Expected Remaining Income
              </span>
              <div className="text-2xl sm:text-3xl font-black font-mono text-emerald-400">
                ₹{simulation.projected_income.toLocaleString('en-IN')}
              </div>
              <span className="text-[11px] text-emerald-200/80 block">
                Estimated net salvage value after damage
              </span>
            </div>

            {/* Financial Gap */}
            <div className="p-5 rounded-2xl bg-amber-950/40 border border-amber-500/40 space-y-1.5 transition-all">
              <span className="text-xs font-bold uppercase tracking-wider text-amber-300">
                Financial Gap & Debt Risk
              </span>
              <div className="text-2xl sm:text-3xl font-black font-mono text-amber-400">
                ₹{simulation.financial_gap.toLocaleString('en-IN')}
              </div>
              <span className="text-[11px] text-amber-200/80 block">
                {simulation.loan_repayment_risk}
              </span>
            </div>
          </div>
        )}

        {/* Possible Recovery Options */}
        {simulation && (
          <div className="space-y-3 pt-2">
            <h3 className="text-sm font-bold text-emerald-300 uppercase tracking-wider flex items-center justify-between">
              <span>Possible Recovery Options ({simulation.recommended_recovery_routes.length})</span>
              <span className="text-[11px] font-normal text-slate-400">Official Relief Pathways</span>
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
              {simulation.recommended_recovery_routes.map((r, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-2xl bg-slate-900/80 border border-emerald-800/50 space-y-2 hover:border-emerald-500/60 transition-colors"
                >
                  <div className="flex items-start justify-between gap-2">
                    <h4 className="text-sm font-bold text-white">
                      {r.name}
                    </h4>
                    <span className="text-[11px] font-mono font-bold bg-emerald-900/90 text-emerald-300 px-2.5 py-0.5 rounded-full whitespace-nowrap">
                      {r.potential_relief}
                    </span>
                  </div>

                  <p className="text-xs text-slate-300 leading-relaxed">
                    {r.description}
                  </p>

                  <div className="pt-2 border-t border-emerald-900/60 flex items-center justify-between text-xs">
                    <span className="text-emerald-400 font-semibold">{r.action_step}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Clear Estimation Disclaimer as required */}
        <div className="p-3 rounded-xl bg-black/50 border border-slate-700/60 flex items-center gap-2 text-xs text-slate-400">
          <Info className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>
            <strong>Official Notice:</strong> All values, loss figures, and gap calculations displayed above are algorithmic estimates for contingency preparedness and do not substitute official Revenue/Krishi Vigyan Kendra crop loss survey certificates.
          </span>
        </div>
      </div>
    </div>
  );
};
