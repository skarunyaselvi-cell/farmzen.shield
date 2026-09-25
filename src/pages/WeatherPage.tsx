import React, { useState } from 'react';
import { Farm, Crop, WeatherData, FarmAdvisory, LanguageCode } from '../types';
import { translations } from '../i18n/translations';
import {
  CloudSun, CloudRain, Wind, Droplets, Compass, Sun, Sunrise, Sunset,
  MapPin, CheckCircle, AlertCircle, Info, BarChart3, Clock, Calendar
} from 'lucide-react';
import {
  ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid
} from 'recharts';

interface WeatherPageProps {
  currentFarm: Farm;
  currentCrop: Crop;
  weather: WeatherData;
  advisories: FarmAdvisory[];
  language: LanguageCode;
}

export const WeatherPage: React.FC<WeatherPageProps> = ({
  currentFarm,
  currentCrop,
  weather,
  advisories,
  language
}) => {
  const t = translations[language];
  const [activeTab, setActiveTab] = useState<'today' | 'hourly' | '7days' | 'advisory' | 'rainfall'>('today');

  const chartData = weather.daily_forecast.map((f) => ({
    day: f.day,
    rainfall: f.rainfall_est_mm,
    rainChance: f.rain_chance,
    temp: f.max_temp
  }));

  return (
    <div className="space-y-6 pb-20">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-sky-950/10 pb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-sky-600 text-white flex items-center justify-center shadow-md">
            <CloudSun className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-2xl sm:text-4xl font-black font-editorial heading-weather tracking-tight animate-heading-reveal">
              FARMZEN WEATHER
            </h1>
            <div className="underline-weather w-28 sm:w-36 mt-1.5 animate-underline-glow" />
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              {t.weather.subtitle}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 text-xs font-medium text-sky-800 dark:text-sky-300 bg-sky-50 dark:bg-sky-950 px-3 py-1.5 rounded-xl border border-sky-200 dark:border-sky-800">
          <MapPin className="w-3.5 h-3.5" />
          <span>{currentFarm.village}, {currentFarm.district}</span>
          <span className="text-[10px] text-sky-600 dark:text-sky-400 font-mono">(IMD Station)</span>
        </div>
      </div>

      {/* THREE-STEP INTELLIGENCE PIPELINE */}
      <div className="p-3.5 rounded-2xl bg-sky-50/80 dark:bg-sky-950/40 border border-sky-200/60 dark:border-sky-800/40 grid grid-cols-1 md:grid-cols-3 gap-2.5 text-xs">
        <div className="flex items-center gap-2 text-slate-700 dark:text-slate-300">
          <span className="w-5 h-5 rounded-full bg-sky-600 text-white flex items-center justify-center text-[11px] font-bold shrink-0">1</span>
          <div>
            <span className="font-bold block text-sky-950 dark:text-sky-200">WHAT YOU ENTER</span>
            <span className="text-[11px] text-slate-500">{currentFarm.village}, {currentFarm.district} · {currentFarm.soil_type}</span>
          </div>
        </div>

        <div className="flex items-center gap-2 text-slate-700 dark:text-slate-300">
          <span className="w-5 h-5 rounded-full bg-sky-600 text-white flex items-center justify-center text-[11px] font-bold shrink-0">2</span>
          <div>
            <span className="font-bold block text-sky-950 dark:text-sky-200">WHAT FARMZEN UNDERSTANDS</span>
            <span className="text-[11px] text-slate-500">IMD 31°C · 35-50mm Rain within 48h · 78% Humidity</span>
          </div>
        </div>

        <div className="flex items-center gap-2 text-slate-700 dark:text-slate-300">
          <span className="w-5 h-5 rounded-full bg-sky-600 text-white flex items-center justify-center text-[11px] font-bold shrink-0">3</span>
          <div>
            <span className="font-bold block text-sky-950 dark:text-sky-200">WHAT FARMZEN RECOMMENDS</span>
            <span className="text-[11px] text-slate-500">Defer irrigation 24-36h · Postpone chemical spray</span>
          </div>
        </div>
      </div>

      {/* Weather Tabs Bar */}
      <div className="flex items-center gap-1.5 p-1 bg-slate-100 dark:bg-slate-800 rounded-xl overflow-x-auto">
        {[
          { id: 'today', label: 'Today Summary' },
          { id: 'hourly', label: 'Hourly' },
          { id: '7days', label: '7 Days' },
          { id: 'advisory', label: 'Farm Advisories' },
          { id: 'rainfall', label: 'Rainfall Graph' }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`px-4 py-2 text-xs font-semibold rounded-lg transition-all whitespace-nowrap ${
              activeTab === tab.id
                ? 'bg-sky-600 text-white shadow-sm'
                : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* TAB 1: TODAY SUMMARY */}
      {activeTab === 'today' && (
        <div className="space-y-5">
          {/* Main Weather Hero Card with Live Atmosphere & Tree Canopy Visual */}
          <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-sky-800/40 min-h-[300px] sm:min-h-[340px] flex flex-col justify-between">
            {/* Background Image: Tree canopy and dynamic sky */}
            <img
              src="/src/assets/images/weather_sky_bg_1790310111087.jpg"
              alt="Farm tree canopy under dynamic weather sky"
              className="absolute inset-0 w-full h-full object-cover object-center filter brightness-90 animate-plant-sway"
              onError={(e) => {
                e.currentTarget.style.display = 'none';
              }}
            />

            {/* Weather Overlay Gradients */}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-sky-950/40" />
            <div className="absolute inset-0 bg-gradient-to-r from-sky-950/80 via-transparent to-slate-950/60" />

            {/* Sunlight Sweep & Rain Particle Effect */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
              <div className="w-[120%] h-full bg-gradient-to-r from-transparent via-sky-200/15 to-transparent animate-sunlight-sweep" />
            </div>

            <div className="relative z-10 p-6 sm:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6 text-white">
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold uppercase tracking-widest text-sky-300 bg-sky-950/80 px-2.5 py-0.5 rounded-full border border-sky-700/50">
                    Field Microclimate Station
                  </span>
                  <span className="text-[11px] font-mono text-emerald-300 bg-emerald-950/60 px-2 py-0.5 rounded-md border border-emerald-800/40">
                    IMD Radar Sync
                  </span>
                </div>

                <div className="flex items-baseline gap-4">
                  <span className="text-5xl sm:text-6xl font-black font-display tracking-tight text-white drop-shadow">
                    {weather.temperature}°C
                  </span>
                  <div className="space-y-0.5">
                    <span className="text-sm font-semibold text-sky-200 block">
                      Feels like {weather.feels_like}°C
                    </span>
                    <span className="text-sm font-bold text-amber-300 font-mono flex items-center gap-1.5">
                      <Sun className="w-4 h-4 text-amber-400" />
                      {weather.condition}
                    </span>
                  </div>
                </div>

                <div className="p-3.5 rounded-2xl bg-black/50 backdrop-blur-md border border-sky-500/30 max-w-lg">
                  <p className="text-xs sm:text-sm text-sky-100 leading-relaxed font-medium">
                    {weather.soil_advice}
                  </p>
                </div>
              </div>

              {/* Rain Risk Gauge on Hero */}
              <div className="bg-black/60 backdrop-blur-md p-4 sm:p-5 rounded-2xl border border-sky-500/40 text-center space-y-2 min-w-[180px]">
                <span className="text-[11px] font-bold text-sky-300 uppercase tracking-wider block">
                  Next 48h Precipitation
                </span>
                <span className="text-3xl font-black font-mono text-emerald-300 block">
                  45 mm
                </span>
                <span className="text-[11px] text-amber-300 font-semibold block">
                  High Inundation Risk
                </span>
              </div>
            </div>

            {/* Quick Metrics Strip */}
            <div className="relative z-10 px-6 sm:px-8 py-3 bg-black/40 backdrop-blur-sm border-t border-sky-500/20 grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs text-slate-200">
              <div className="flex items-center gap-1.5">
                <Droplets className="w-3.5 h-3.5 text-sky-400" />
                <span>Humidity: <strong className="text-white">{weather.humidity}%</strong></span>
              </div>
              <div className="flex items-center gap-1.5">
                <Wind className="w-3.5 h-3.5 text-sky-400" />
                <span>Wind: <strong className="text-white">{weather.wind_speed} km/h</strong></span>
              </div>
              <div className="flex items-center gap-1.5">
                <CloudRain className="w-3.5 h-3.5 text-sky-400" />
                <span>Chance of Rain: <strong className="text-white">{weather.rain_probability}%</strong></span>
              </div>
              <div className="flex items-center gap-1.5">
                <Compass className="w-3.5 h-3.5 text-sky-400" />
                <span>Cloud Cover: <strong className="text-white">{weather.cloud_cover}%</strong></span>
              </div>
            </div>
          </div>

          {/* Quick Hourly Strip */}
          <div className="bg-white dark:bg-slate-900 rounded-2xl p-5 shadow-sm border border-slate-200/80 dark:border-slate-800 space-y-3">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white">
              {t.weather.hourlyForecast}
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
              {weather.hourly_forecast.map((h, i) => (
                <div key={i} className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800 text-center space-y-1">
                  <span className="text-xs text-slate-500 block font-mono">{h.time}</span>
                  <span className="text-lg font-bold font-mono text-slate-900 dark:text-white block">{h.temp}°C</span>
                  <div className="flex items-center justify-center gap-1 text-[11px] text-sky-600 dark:text-sky-400 font-semibold">
                    <Droplets className="w-3 h-3" />
                    <span>{h.rain_chance}%</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: HOURLY PROGRESSION */}
      {activeTab === 'hourly' && (
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 shadow-sm border border-slate-200/80 dark:border-slate-800 space-y-4">
          <h3 className="text-base font-bold text-slate-900 dark:text-white">
            Detailed Hourly Atmospheric Trajectory
          </h3>
          <div className="divide-y divide-slate-100 dark:divide-slate-800">
            {weather.hourly_forecast.map((h, idx) => (
              <div key={idx} className="py-3 flex items-center justify-between text-xs sm:text-sm">
                <div className="flex items-center gap-3">
                  <Clock className="w-4 h-4 text-sky-600" />
                  <span className="font-mono font-bold text-slate-800 dark:text-slate-200">{h.time}</span>
                  <span className="text-slate-500">{h.condition}</span>
                </div>
                <div className="flex items-center gap-4">
                  <span className="font-bold font-mono text-slate-900 dark:text-white">{h.temp}°C</span>
                  <span className="text-sky-600 dark:text-sky-400 font-semibold">{h.rain_chance}% Rain</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 3: 7-DAY FORECAST */}
      {activeTab === '7days' && (
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 shadow-sm border border-slate-200/80 dark:border-slate-800 space-y-4">
          <h3 className="text-base font-bold text-slate-900 dark:text-white">
            {t.weather.sevenDayForecast}
          </h3>

          <div className="divide-y divide-slate-100 dark:divide-slate-800">
            {weather.daily_forecast.map((d, idx) => (
              <div key={idx} className="py-3.5 flex items-center justify-between gap-2 text-xs sm:text-sm">
                <div className="flex items-center gap-3 w-36">
                  <span className="font-bold text-slate-900 dark:text-white">{d.day}</span>
                  <span className="text-xs text-slate-400 font-mono">{d.date}</span>
                </div>

                <div className="hidden sm:block text-slate-600 dark:text-slate-300 text-xs">
                  {d.condition}
                </div>

                <div className="flex items-center gap-4 text-right">
                  <div className="flex items-center gap-1 text-sky-600 dark:text-sky-400 text-xs font-semibold">
                    <CloudRain className="w-3.5 h-3.5" />
                    <span>{d.rain_chance}%</span>
                    <span className="text-[11px] text-slate-400">({d.rainfall_est_mm}mm)</span>
                  </div>
                  <div className="font-mono text-xs sm:text-sm font-bold text-slate-900 dark:text-white">
                    {d.max_temp}° / {d.min_temp}°
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 4: AGRONOMIC ADVISORIES */}
      {activeTab === 'advisory' && (
        <div className="space-y-4">
          {advisories.map((adv) => (
            <div
              key={adv.id}
              className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-2"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-sky-700 dark:text-sky-400 bg-sky-50 dark:bg-sky-950 px-2.5 py-1 rounded-md border border-sky-200 dark:border-sky-800">
                  {adv.condition}
                </span>
                <span className="text-xs font-semibold text-slate-400 font-mono">
                  {adv.crop_target}
                </span>
              </div>

              <div className="space-y-1">
                <div className="text-xs font-bold text-slate-500 uppercase tracking-wider">Field Impact</div>
                <p className="text-xs sm:text-sm text-slate-800 dark:text-slate-200">
                  {adv.farm_impact}
                </p>
              </div>

              <div className="p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200/70 dark:border-emerald-800/40">
                <div className="text-xs font-bold text-emerald-800 dark:text-emerald-300">Action Required:</div>
                <p className="text-xs text-emerald-950 dark:text-emerald-200 mt-0.5 font-medium">
                  {adv.action_required}
                </p>
              </div>

              <div className="text-[11px] text-slate-400 pt-1">
                Advisory Source: {adv.source}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* TAB 5: RAINFALL CHART */}
      {activeTab === 'rainfall' && (
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 shadow-sm border border-slate-200/80 dark:border-slate-800 space-y-4">
          <div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              7-Day Projected Rainfall (mm)
            </h3>
            <p className="text-xs text-slate-500">Anticipated precipitation to calibrate drainage and fertilizer timing</p>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" opacity={0.15} />
                <XAxis dataKey="day" tick={{ fontSize: 12 }} />
                <YAxis tick={{ fontSize: 12 }} />
                <Tooltip
                  formatter={(val: any) => [`${val} mm`, 'Rainfall']}
                  contentStyle={{ borderRadius: 12, fontSize: 12, backgroundColor: '#0f172a', color: '#fff' }}
                />
                <Bar dataKey="rainfall" fill="#0284c7" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}
    </div>
  );
};
