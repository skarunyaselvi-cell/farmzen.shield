import React from 'react';
import {
  Farm, Crop, WeatherData, ShieldRiskOverview, MarketPrice, LanguageCode
} from '../types';
import { translations } from '../i18n/translations';
import {
  Shield, CloudSun, Stethoscope, Bot, Store, ArrowRight, Mic, MapPin,
  TrendingUp, CheckCircle2, AlertTriangle, Droplets, Sparkles, Activity
} from 'lucide-react';

interface DashboardPageProps {
  currentFarm: Farm;
  currentCrop: Crop;
  weather: WeatherData;
  risk: ShieldRiskOverview;
  marketPrices: MarketPrice[];
  language: LanguageCode;
  onNavigate: (tab: string) => void;
  onOpenVoiceAI: () => void;
  farmerName: string;
}

export const DashboardPage: React.FC<DashboardPageProps> = ({
  currentFarm,
  currentCrop,
  weather,
  risk,
  marketPrices,
  language,
  onNavigate,
  onOpenVoiceAI,
  farmerName
}) => {
  const t = translations[language] || translations.en;

  const heroImage = '/src/assets/images/global_village_bg_1790310124090.jpg';

  // Topic-specific visual environments for the 5 feature cards
  const shieldCardImage = '/src/assets/images/shield_hero_bg_1790310083063.jpg';
  const directCardImage = '/src/assets/images/direct_market_bg_1790310098515.jpg';
  const weatherCardImage = '/src/assets/images/weather_sky_bg_1790310111087.jpg';
  const cropDoctorCardImage = '/src/assets/images/crop_doctor_leaf_scan_1790307243294.jpg';
  const farmAiCardImage = '/src/assets/images/farmzen_ai_smart_agri_1790310969472.jpg';

  const riskColor = risk.overall_score < 30 ? 'text-emerald-400' : risk.overall_score < 60 ? 'text-amber-400' : 'text-red-400';

  return (
    <div className="space-y-7 pb-20 max-w-6xl mx-auto">
      {/* 1. HERO FARM GREETING BANNER WITH GLOBAL VILLAGE VISUAL */}
      <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-emerald-950/20 min-h-[250px] sm:min-h-[290px] flex items-end">
        <img
          src={heroImage}
          alt="Lush green Indian agricultural farm village at golden hour"
          className="absolute inset-0 w-full h-full object-cover object-center filter brightness-95 animate-plant-sway"
          referrerPolicy="no-referrer"
          onError={(e) => {
            e.currentTarget.src = '/src/assets/images/farmzen_hero_landscape_1790307231565.jpg';
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/50 to-black/25" />
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-950/60 via-transparent to-black/40" />

        {/* Floating sunlight sweep */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="w-[120%] h-full bg-gradient-to-r from-transparent via-amber-100/15 to-transparent animate-sunlight-sweep" />
          <div className="absolute top-6 left-8 text-2xl animate-float-gentle opacity-75">🍃</div>
          <div className="absolute top-10 right-12 text-2xl animate-float-gentle opacity-70" style={{ animationDelay: '2s' }}>🌾</div>
        </div>

        <div className="relative z-10 p-6 sm:p-8 w-full flex flex-col sm:flex-row sm:items-end justify-between gap-4 text-white">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-xs font-semibold text-emerald-300">
              <span className="px-2.5 py-0.5 rounded-full bg-emerald-950/80 border border-emerald-700/60 flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-emerald-400" />
                <span>{currentFarm.village}, {currentFarm.district}</span>
              </span>
              <span>·</span>
              <span className="text-slate-300">{currentFarm.area_acres} Acres ({currentFarm.soil_type})</span>
            </div>

            <h1 className="text-2xl sm:text-4xl font-black tracking-tight font-editorial text-white drop-shadow animate-heading-reveal">
              Good Morning, {farmerName} 🌱
            </h1>

            <p className="text-xs sm:text-sm text-emerald-200 font-medium">
              “Decide Better · Farm Smarter · Sell Better”
            </p>
          </div>

          {/* Voice Action Button: ASK FARMZEN */}
          <button
            onClick={onOpenVoiceAI}
            className="px-5 py-3 rounded-2xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-extrabold text-xs sm:text-sm shadow-lg shadow-emerald-500/30 flex items-center justify-center gap-2.5 active:scale-95 transition-all whitespace-nowrap self-start sm:self-auto cursor-pointer"
          >
            <Mic className="w-4 h-4 text-slate-950 animate-pulse" />
            <span>ASK FARMZEN 🎙</span>
          </button>
        </div>
      </div>

      {/* 2. COMPACT DAILY BRIEFING (WEATHER · CROP · RISK · MARKET) */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl p-4 sm:p-5 shadow-sm border border-slate-200/80 dark:border-slate-800">
        <div className="text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-3">
          TODAY ON YOUR FARM
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          {/* Weather Brief */}
          <div
            onClick={() => onNavigate('weather')}
            className="p-3 rounded-xl bg-sky-50/70 dark:bg-sky-950/30 border border-sky-200/60 dark:border-sky-800/40 cursor-pointer hover:shadow-md transition-all space-y-1"
          >
            <div className="flex items-center justify-between text-sky-800 dark:text-sky-300">
              <span className="text-[11px] font-bold uppercase">🌦 Weather</span>
              <span className="text-xs font-mono font-bold">{weather.temperature}°C</span>
            </div>
            <div className="text-xs font-semibold text-slate-800 dark:text-slate-200 truncate">
              {weather.condition}
            </div>
            <div className="text-[10px] text-sky-600 dark:text-sky-400 font-medium">
              {weather.rain_probability}% Rain chance ({weather.rainfall_mm}mm)
            </div>
          </div>

          {/* Crop Brief */}
          <div
            onClick={() => onNavigate('cropDoctor')}
            className="p-3 rounded-xl bg-emerald-50/70 dark:bg-emerald-950/30 border border-emerald-200/60 dark:border-emerald-800/40 cursor-pointer hover:shadow-md transition-all space-y-1"
          >
            <div className="flex items-center justify-between text-emerald-800 dark:text-emerald-300">
              <span className="text-[11px] font-bold uppercase">🌱 Crop Health</span>
              <span className="text-[10px] font-mono font-bold text-emerald-600 bg-emerald-100 dark:bg-emerald-900 px-1.5 py-0.5 rounded">
                {currentCrop.health_status}
              </span>
            </div>
            <div className="text-xs font-semibold text-slate-800 dark:text-slate-200 truncate">
              {currentCrop.crop_name} ({currentCrop.variety})
            </div>
            <div className="text-[10px] text-slate-500 dark:text-slate-400 truncate">
              {currentCrop.crop_stage}
            </div>
          </div>

          {/* Risk Brief */}
          <div
            onClick={() => onNavigate('shield')}
            className="p-3 rounded-xl bg-emerald-950/40 border border-emerald-800/40 cursor-pointer hover:shadow-md transition-all space-y-1"
          >
            <div className="flex items-center justify-between text-emerald-300">
              <span className="text-[11px] font-bold uppercase">🛡 Risk Shield</span>
              <span className={`text-xs font-mono font-bold ${riskColor}`}>{risk.overall_score}%</span>
            </div>
            <div className="text-xs font-semibold text-white">
              {risk.risk_level} Level
            </div>
            <div className="text-[10px] text-emerald-400">
              Protected by PMFBY Insurance
            </div>
          </div>

          {/* Market Brief */}
          <div
            onClick={() => onNavigate('direct')}
            className="p-3 rounded-xl bg-amber-50/70 dark:bg-amber-950/30 border border-amber-200/60 dark:border-amber-800/40 cursor-pointer hover:shadow-md transition-all space-y-1"
          >
            <div className="flex items-center justify-between text-amber-800 dark:text-amber-300">
              <span className="text-[11px] font-bold uppercase">🛒 Market Benchmark</span>
              <span className="text-xs font-mono font-bold text-emerald-600">+9.6%</span>
            </div>
            <div className="text-xs font-semibold text-slate-800 dark:text-slate-200 truncate">
              Tomato ₹34/kg · APMC
            </div>
            <div className="text-[10px] text-amber-700 dark:text-amber-400">
              3 Verified wholesale buyers nearby
            </div>
          </div>
        </div>
      </div>

      {/* 3. TODAY'S 3 KEY ACTIONS */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl p-4 sm:p-5 shadow-sm border border-slate-200/80 dark:border-slate-800 space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
            <h2 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white tracking-wide font-editorial">
              TODAY'S 3 ACTIONS
            </h2>
          </div>
          <span className="text-xs text-slate-400 font-mono">Real-time Agricultural Priority</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {/* Action 1 */}
          <div
            onClick={() => onNavigate('cropDoctor')}
            className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 cursor-pointer hover:border-emerald-500 transition-all space-y-1 group"
          >
            <div className="text-xs font-bold text-emerald-600 dark:text-emerald-400 flex items-center justify-between">
              <span>1. Leaf Scouting</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
            </div>
            <p className="text-xs text-slate-800 dark:text-slate-200 font-medium">
              Check tomato leaves for yellowing or early concentric fungal spots due to high morning humidity.
            </p>
          </div>

          {/* Action 2 */}
          <div
            onClick={() => onNavigate('weather')}
            className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 cursor-pointer hover:border-sky-500 transition-all space-y-1 group"
          >
            <div className="text-xs font-bold text-sky-600 dark:text-sky-400 flex items-center justify-between">
              <span>2. Drainage & Weather</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
            </div>
            <p className="text-xs text-slate-800 dark:text-slate-200 font-medium">
              Rain is expected tomorrow (35-50 mm showers). Defer today's irrigation and inspect field bund drains.
            </p>
          </div>

          {/* Action 3 */}
          <div
            onClick={() => onNavigate('direct')}
            className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 cursor-pointer hover:border-amber-500 transition-all space-y-1 group"
          >
            <div className="text-xs font-bold text-amber-600 dark:text-amber-400 flex items-center justify-between">
              <span>3. Market Price Review</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
            </div>
            <p className="text-xs text-slate-800 dark:text-slate-200 font-medium">
              Review today's wholesale price (up +9.6% in nearby APMC) and check direct retail bulk buyer requests.
            </p>
          </div>
        </div>
      </div>

      {/* 4. THE FIVE PRIMARY FEATURE MODULE CARDS — WITH EMBEDDED VISUAL ENVIRONMENTS */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-base sm:text-lg font-black text-slate-900 dark:text-white font-editorial tracking-tight">
              CORE FARMZEN MODULES
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Interactive visual workspaces with real-time farm intelligence
            </p>
          </div>
          <span className="text-xs text-emerald-600 dark:text-emerald-400 font-semibold hidden sm:inline">
            5 Modules Active
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {/* ========================================================
              CARD 1: FARMZEN SHIELD
              Concept: Plant growing from soil + coin stacks + upward graph
              Accent: Green -> gold -> emerald
             ======================================================== */}
          <div
            onClick={() => onNavigate('shield')}
            className="card-visual-environment relative rounded-3xl overflow-hidden text-white cursor-pointer shadow-lg hover:shadow-2xl border border-emerald-500/30 group flex flex-col justify-between min-h-[260px] bg-slate-950"
          >
            {/* Visual Environment Background */}
            <div className="absolute inset-0 overflow-hidden">
              <img
                src={shieldCardImage}
                alt="Plant growing with stacks of coins and financial growth graph"
                className="card-bg-zoom w-full h-full object-cover object-center filter brightness-90 saturate-110"
                onError={(e) => {
                  e.currentTarget.src = '/src/assets/images/farmzen_shield_protection_1790307268373.jpg';
                }}
              />
            </div>

            {/* Dark emerald transparent layer to keep text readable */}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-emerald-950/75 to-slate-950/60" />
            <div className="absolute inset-0 bg-emerald-900/20 mix-blend-multiply" />

            {/* Glowing borders & highlight shimmer */}
            <div className="absolute inset-0 rounded-3xl border border-emerald-400/20 group-hover:border-emerald-400/60 transition-colors pointer-events-none" />

            {/* Card Content Top */}
            <div className="relative z-10 p-5 space-y-2.5">
              <div className="flex items-center justify-between">
                <span className="inline-flex items-center gap-1.5 text-xs font-black uppercase tracking-wider text-emerald-300 bg-emerald-950/80 px-2.5 py-1 rounded-full border border-emerald-600/40 backdrop-blur-md">
                  <Shield className="w-3.5 h-3.5 text-emerald-400" />
                  1. FARMZEN SHIELD
                </span>
                <span className="text-[11px] font-mono text-amber-300 font-bold bg-slate-950/80 px-2 py-0.5 rounded-md border border-amber-500/40 backdrop-blur-md">
                  34% MODERATE
                </span>
              </div>

              <div>
                <h3 className="text-xl font-black font-editorial heading-shield leading-snug drop-shadow">
                  Risk & Financial Shield
                </h3>
                <div className="underline-shield w-12 mt-1.5 group-hover:w-20 transition-all duration-300" />
              </div>

              <p className="text-xs text-slate-200 leading-relaxed font-medium line-clamp-3">
                Financial risk protection with interactive What-If loss simulator, PMFBY coverage, and loan exposure calculators.
              </p>
            </div>

            {/* Card Content Bottom */}
            <div className="relative z-10 p-5 pt-0 flex items-center justify-between text-xs font-bold text-emerald-300">
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>Simulate Loss Risk</span>
              </span>
              <span className="flex items-center gap-1 group-hover:translate-x-1 transition-transform text-white">
                <span>Open Shield</span>
                <ArrowRight className="w-4 h-4 text-emerald-400" />
              </span>
            </div>
          </div>

          {/* ========================================================
              CARD 2: FARMZEN DIRECT
              Concept: Illustrated agricultural mandi market with produce & farmers
              Accent: Green -> orange -> yellow
             ======================================================== */}
          <div
            onClick={() => onNavigate('direct')}
            className="card-visual-environment relative rounded-3xl overflow-hidden text-white cursor-pointer shadow-lg hover:shadow-2xl border border-amber-500/30 group flex flex-col justify-between min-h-[260px] bg-slate-950"
          >
            {/* Visual Environment Background */}
            <div className="absolute inset-0 overflow-hidden">
              <img
                src={directCardImage}
                alt="Illustrated agricultural market filled with produce, farmers, baskets and village atmosphere"
                className="card-bg-zoom w-full h-full object-cover object-center filter brightness-90 saturate-115"
                onError={(e) => {
                  e.currentTarget.src = '/src/assets/images/farmzen_direct_produce_1790307256120.jpg';
                }}
              />
            </div>

            {/* Warm dark overlay to keep text readable */}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-amber-950/75 to-slate-950/60" />
            <div className="absolute inset-0 bg-amber-950/20 mix-blend-multiply" />

            {/* Glowing borders & highlight shimmer */}
            <div className="absolute inset-0 rounded-3xl border border-amber-400/20 group-hover:border-amber-400/60 transition-colors pointer-events-none" />

            {/* Card Content Top */}
            <div className="relative z-10 p-5 space-y-2.5">
              <div className="flex items-center justify-between">
                <span className="inline-flex items-center gap-1.5 text-xs font-black uppercase tracking-wider text-amber-300 bg-amber-950/80 px-2.5 py-1 rounded-full border border-amber-600/40 backdrop-blur-md">
                  <Store className="w-3.5 h-3.5 text-amber-400" />
                  2. FARMZEN DIRECT
                </span>
                <span className="text-[11px] font-mono text-emerald-300 font-bold bg-slate-950/80 px-2 py-0.5 rounded-md border border-emerald-500/40 backdrop-blur-md">
                  e-NAM LIVE
                </span>
              </div>

              <div>
                <h3 className="text-xl font-black font-editorial heading-direct leading-snug drop-shadow">
                  Digital Farm Market
                </h3>
                <div className="underline-direct w-12 mt-1.5 group-hover:w-20 transition-all duration-300" />
              </div>

              <p className="text-xs text-slate-200 leading-relaxed font-medium line-clamp-3">
                Live mandi price tickers, direct buyer connections, farm-gate listings, and zero-commission wholesale trading.
              </p>
            </div>

            {/* Card Content Bottom */}
            <div className="relative z-10 p-5 pt-0 flex items-center justify-between text-xs font-bold text-amber-300">
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
                <span>3 Verified Buyers</span>
              </span>
              <span className="flex items-center gap-1 group-hover:translate-x-1 transition-transform text-white">
                <span>Enter Market</span>
                <ArrowRight className="w-4 h-4 text-amber-400" />
              </span>
            </div>
          </div>

          {/* ========================================================
              CARD 3: FARMZEN WEATHER
              Concept: Looking upward through tree canopy into blue sky
              Accent: Sky blue -> cyan -> soft white
             ======================================================== */}
          <div
            onClick={() => onNavigate('weather')}
            className="card-visual-environment relative rounded-3xl overflow-hidden text-white cursor-pointer shadow-lg hover:shadow-2xl border border-sky-500/30 group flex flex-col justify-between min-h-[260px] bg-slate-950"
          >
            {/* Visual Environment Background */}
            <div className="absolute inset-0 overflow-hidden">
              <img
                src={weatherCardImage}
                alt="Looking up through tree canopy into vivid dynamic sky"
                className="card-bg-zoom w-full h-full object-cover object-center filter brightness-90 saturate-110"
              />
            </div>

            {/* Soft sky-blue / dark overlay for contrast */}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-sky-950/75 to-slate-950/55" />
            <div className="absolute inset-0 bg-sky-950/20 mix-blend-multiply" />

            {/* Glowing borders */}
            <div className="absolute inset-0 rounded-3xl border border-sky-400/20 group-hover:border-sky-400/60 transition-colors pointer-events-none" />

            {/* Card Content Top */}
            <div className="relative z-10 p-5 space-y-2.5">
              <div className="flex items-center justify-between">
                <span className="inline-flex items-center gap-1.5 text-xs font-black uppercase tracking-wider text-sky-300 bg-sky-950/80 px-2.5 py-1 rounded-full border border-sky-600/40 backdrop-blur-md">
                  <CloudSun className="w-3.5 h-3.5 text-sky-400" />
                  3. FARMZEN WEATHER
                </span>
                <span className="text-[11px] font-mono text-sky-300 font-bold bg-slate-950/80 px-2 py-0.5 rounded-md border border-sky-500/40 backdrop-blur-md">
                  IMD 31°C
                </span>
              </div>

              <div>
                <h3 className="text-xl font-black font-editorial heading-weather leading-snug drop-shadow">
                  Microclimate Advisories
                </h3>
                <div className="underline-weather w-12 mt-1.5 group-hover:w-20 transition-all duration-300" />
              </div>

              <p className="text-xs text-slate-200 leading-relaxed font-medium line-clamp-3">
                “What does today's weather mean for my farm?” 7-day field planning, rain radar, and crop water advisories.
              </p>
            </div>

            {/* Card Content Bottom */}
            <div className="relative z-10 p-5 pt-0 flex items-center justify-between text-xs font-bold text-sky-300">
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-sky-400 animate-pulse" />
                <span>Rain in 24h</span>
              </span>
              <span className="flex items-center gap-1 group-hover:translate-x-1 transition-transform text-white">
                <span>View Advisories</span>
                <ArrowRight className="w-4 h-4 text-sky-400" />
              </span>
            </div>
          </div>

          {/* ========================================================
              CARD 4: FARMZEN CROP DOCTOR
              Concept: Plant health leaf diagnosis with laser scan visual
              Accent: Leaf green -> lime -> warm yellow
             ======================================================== */}
          <div
            onClick={() => onNavigate('cropDoctor')}
            className="card-visual-environment relative rounded-3xl overflow-hidden text-white cursor-pointer shadow-lg hover:shadow-2xl border border-lime-500/30 group flex flex-col justify-between min-h-[260px] bg-slate-950"
          >
            {/* Visual Environment Background */}
            <div className="absolute inset-0 overflow-hidden">
              <img
                src={cropDoctorCardImage}
                alt="Crop leaf scan diagnosis visual"
                className="card-bg-zoom w-full h-full object-cover object-center filter brightness-90 saturate-110"
              />
            </div>

            {/* Deep organic green overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-emerald-950/80 to-slate-950/60" />
            <div className="absolute inset-0 bg-emerald-950/25 mix-blend-multiply" />

            {/* Subtle animated scanline shimmer across leaf */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-30">
              <div className="w-full h-1 bg-gradient-to-r from-transparent via-lime-400 to-transparent animate-scanline" />
            </div>

            {/* Glowing borders */}
            <div className="absolute inset-0 rounded-3xl border border-lime-400/20 group-hover:border-lime-400/60 transition-colors pointer-events-none" />

            {/* Card Content Top */}
            <div className="relative z-10 p-5 space-y-2.5">
              <div className="flex items-center justify-between">
                <span className="inline-flex items-center gap-1.5 text-xs font-black uppercase tracking-wider text-lime-300 bg-emerald-950/80 px-2.5 py-1 rounded-full border border-lime-600/40 backdrop-blur-md">
                  <Stethoscope className="w-3.5 h-3.5 text-lime-400" />
                  4. CROP DOCTOR
                </span>
                <span className="text-[11px] font-mono text-lime-300 font-bold bg-slate-950/80 px-2 py-0.5 rounded-md border border-lime-500/40 backdrop-blur-md">
                  VISION AI
                </span>
              </div>

              <div>
                <h3 className="text-xl font-black font-editorial heading-crop leading-snug drop-shadow">
                  AI Leaf Diagnostics
                </h3>
                <div className="underline-crop w-12 mt-1.5 group-hover:w-20 transition-all duration-300" />
              </div>

              <p className="text-xs text-slate-200 leading-relaxed font-medium line-clamp-3">
                Scan leaf foliage for early blight, powdery mildew, and pests. Receive dual organic biological and approved chemical solutions.
              </p>
            </div>

            {/* Card Content Bottom */}
            <div className="relative z-10 p-5 pt-0 flex items-center justify-between text-xs font-bold text-lime-300">
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-lime-400 animate-pulse" />
                <span>Instant Photo Scan</span>
              </span>
              <span className="flex items-center gap-1 group-hover:translate-x-1 transition-transform text-white">
                <span>Diagnose Plant</span>
                <ArrowRight className="w-4 h-4 text-lime-400" />
              </span>
            </div>
          </div>

          {/* ========================================================
              CARD 5: FARMZEN AI
              Concept: Modern technology + agriculture visual environment
              Accent: Emerald -> cyan -> subtle violet
             ======================================================== */}
          <div
            onClick={() => onNavigate('ai')}
            className="card-visual-environment relative rounded-3xl overflow-hidden text-white cursor-pointer shadow-lg hover:shadow-2xl border border-cyan-500/30 group flex flex-col justify-between min-h-[260px] bg-slate-950 md:col-span-2 lg:col-span-2"
          >
            {/* Visual Environment Background */}
            <div className="absolute inset-0 overflow-hidden">
              <img
                src={farmAiCardImage}
                alt="Modern agricultural AI technology environment"
                className="card-bg-zoom w-full h-full object-cover object-center filter brightness-90 saturate-115"
                onError={(e) => {
                  e.currentTarget.src = '/src/assets/images/farmzen_hero_landscape_1790307231565.jpg';
                }}
              />
            </div>

            {/* Deep modern tech-emerald/violet overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/80 to-purple-950/50" />
            <div className="absolute inset-0 bg-gradient-to-r from-emerald-950/80 via-cyan-950/60 to-purple-950/70" />

            {/* Glowing borders */}
            <div className="absolute inset-0 rounded-3xl border border-cyan-400/20 group-hover:border-cyan-400/60 transition-colors pointer-events-none" />

            {/* Card Content Top */}
            <div className="relative z-10 p-5 space-y-2.5">
              <div className="flex items-center justify-between">
                <span className="inline-flex items-center gap-1.5 text-xs font-black uppercase tracking-wider text-cyan-300 bg-slate-950/80 px-2.5 py-1 rounded-full border border-cyan-600/40 backdrop-blur-md">
                  <Bot className="w-3.5 h-3.5 text-cyan-400" />
                  5. FARMZEN AI ASSISTANT
                </span>
                <span className="text-[11px] font-mono text-purple-300 font-bold bg-slate-950/80 px-2.5 py-0.5 rounded-md border border-purple-500/40 backdrop-blur-md">
                  6 INDIAN LANGUAGES · REGIONAL VOICE
                </span>
              </div>

              <div>
                <h3 className="text-xl sm:text-2xl font-black font-editorial heading-ai leading-snug drop-shadow">
                  Regional Agronomy AI Assistant
                </h3>
                <div className="underline-ai w-16 mt-1.5 group-hover:w-28 transition-all duration-300" />
              </div>

              <p className="text-xs sm:text-sm text-slate-200 leading-relaxed font-medium max-w-xl">
                Speak or type in Tamil, Telugu, Kannada, Malayalam, Hindi, or English. Calibrated specifically with your {currentFarm.district} farm, soil, and {currentCrop.crop_name} crop context.
              </p>
            </div>

            {/* Card Content Bottom */}
            <div className="relative z-10 p-5 pt-0 flex items-center justify-between text-xs font-bold text-cyan-300">
              <span className="flex items-center gap-2">
                <Mic className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
                <span>Voice STT / TTS Enabled</span>
              </span>
              <span className="flex items-center gap-1 group-hover:translate-x-1 transition-transform text-white">
                <span>Start Conversation</span>
                <ArrowRight className="w-4 h-4 text-cyan-400" />
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
