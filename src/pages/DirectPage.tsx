import React, { useState } from 'react';
import { Farm, Crop, MarketPrice, ProductListing, BuyerProfile, LanguageCode } from '../types';
import { translations } from '../i18n/translations';
import { marketApi } from '../services/api';
import {
  Store, TrendingUp, TrendingDown, Plus, CheckCircle2, MapPin, Truck,
  PhoneCall, ShieldCheck, Tag, ShoppingCart, Calendar, ArrowRight, X,
  BadgeCheck, Clock, Building2, ChevronRight, Sparkles, Filter, Info
} from 'lucide-react';
import {
  ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid
} from 'recharts';

interface DirectPageProps {
  currentFarm: Farm;
  currentCrop: Crop;
  marketPrices: MarketPrice[];
  listings: ProductListing[];
  buyers: BuyerProfile[];
  language: LanguageCode;
  onRefreshListings: () => void;
}

export const DirectPage: React.FC<DirectPageProps> = ({
  currentFarm,
  currentCrop,
  marketPrices,
  listings,
  buyers,
  language,
  onRefreshListings
}) => {
  const t = translations[language] || translations.en;
  const [showAddModal, setShowAddModal] = useState<boolean>(false);
  const [selectedCropFilter, setSelectedCropFilter] = useState<string>('All');
  const [newListing, setNewListing] = useState({
    crop_name: currentCrop.crop_name,
    variety: currentCrop.variety,
    quantity: 1200,
    unit: 'kg',
    expected_price: 36,
    harvest_date: '2026-10-15',
    quality_grade: 'Grade-A Export Quality',
    delivery_preference: 'Farm Gate Pickup Preferred'
  });

  const directMarketBgImage = '/src/assets/images/direct_market_bg_1790310098515.jpg';

  const handleCreateListing = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await marketApi.createListing(newListing);
      setShowAddModal(false);
      onRefreshListings();
    } catch (err) {
      console.error('Error creating listing:', err);
    }
  };

  // Ticker items
  const tickerItems = [
    { crop: '🌾 Basmati Rice', price: '₹34/kg', trend: '+4.5%', up: true },
    { crop: '🍅 Hybrid Tomato', price: '₹28/kg', trend: '+9.2%', up: true },
    { crop: '🌽 Yellow Maize', price: '₹22/kg', trend: '-1.4%', up: false },
    { crop: '🥕 Hill Carrots', price: '₹32/kg', trend: '+2.8%', up: true },
    { crop: '🧅 Red Onion', price: '₹38/kg', trend: '+6.1%', up: true },
    { crop: '🥔 Potato Jyoti', price: '₹19/kg', trend: '-0.8%', up: false },
    { crop: '🌱 Green Gram', price: '₹74/kg', trend: '+3.7%', up: true },
    { crop: '🌶 Guntur Chilli', price: '₹185/kg', trend: '+5.0%', up: true }
  ];

  // Price Trend Chart Data for Rice / Tomato
  const priceTrendData = [
    { date: 'Sep 01', mandiRate: 29, buyerBid: 31 },
    { date: 'Sep 06', mandiRate: 30, buyerBid: 32 },
    { date: 'Sep 11', mandiRate: 31, buyerBid: 33 },
    { date: 'Sep 16', mandiRate: 33, buyerBid: 35 },
    { date: 'Sep 21', mandiRate: 32, buyerBid: 35 },
    { date: 'Sep 25', mandiRate: 34, buyerBid: 37 },
    { date: 'Oct 02 (Est)', mandiRate: 36, buyerBid: 39 }
  ];

  // Detailed Today's Market Table items
  const todaysMarketRows = [
    {
      crop: 'Rice (Paddy - Common)',
      market: `${currentFarm.district} APMC Mandi`,
      price: 34,
      unit: 'kg',
      yesterday: 31,
      trend: '+9.6%',
      trendUp: true,
      updatedTime: '10:15 AM Today',
      source: 'Agmarknet / e-NAM Live'
    },
    {
      crop: 'Tomato (Local Hybrid)',
      market: 'Central Vegetable Mandi',
      price: 28,
      unit: 'kg',
      yesterday: 25,
      trend: '+12.0%',
      trendUp: true,
      updatedTime: '09:45 AM Today',
      source: 'State Marketing Board'
    },
    {
      crop: 'Maize (Kharif)',
      market: 'Grain Market Yard',
      price: 22,
      unit: 'kg',
      yesterday: 23,
      trend: '-4.3%',
      trendUp: false,
      updatedTime: '08:30 AM Today',
      source: 'e-NAM Portal'
    },
    {
      crop: 'Cotton (Medium Staple)',
      market: 'Regional Cotton Complex',
      price: 72,
      unit: 'kg',
      yesterday: 69,
      trend: '+4.3%',
      trendUp: true,
      updatedTime: '11:00 AM Today',
      source: 'Cotton Corp of India'
    },
    {
      crop: 'Green Gram (Moong)',
      market: 'Pulse Yard APMC',
      price: 74,
      unit: 'kg',
      yesterday: 71,
      trend: '+4.2%',
      trendUp: true,
      updatedTime: '10:00 AM Today',
      source: 'e-NAM Live Feed'
    }
  ];

  // Nearby Markets List
  const nearbyMarkets = [
    {
      name: `${currentFarm.district} Principal Yard`,
      distance: '12 km',
      modalPrice: '₹34/kg',
      arrivals: '2,400 Quintals',
      status: 'High Demand',
      timing: '06:00 AM - 02:00 PM'
    },
    {
      name: 'North Taluk Rural Hub',
      distance: '24 km',
      modalPrice: '₹35.5/kg',
      arrivals: '1,100 Quintals',
      status: 'Active Bidding',
      timing: '07:00 AM - 01:30 PM'
    },
    {
      name: 'Interstate Terminal Market',
      distance: '48 km',
      modalPrice: '₹37/kg',
      arrivals: '5,800 Quintals',
      status: 'Bulk Export Gate',
      timing: '24 Hours Open'
    }
  ];

  // Verified Buyers List
  const verifiedBuyersList = [
    {
      id: 'b1',
      name: 'Kisan Agro Foods Pvt Ltd',
      type: 'Direct Food Processor',
      location: `${currentFarm.district} Industrial Area (18 km)`,
      cropRequired: 'Paddy / Basmati Rice',
      quantity: '25 Metric Tons',
      offeredPrice: '₹37 / kg',
      paymentTerms: 'Immediate RTGS / NEFT on Weighment',
      verifiedBadge: 'APMC Licensed & FSSAI Verified',
      rating: 4.9,
      phone: '+91 94440 88219'
    },
    {
      id: 'b2',
      name: 'Sahyadri Farmers Producer Co.',
      type: 'Registered FPO Consortium',
      location: 'Taluk Hub (14 km)',
      cropRequired: 'Vegetables & Hybrid Tomatoes',
      quantity: '10 Metric Tons',
      offeredPrice: '₹30 / kg',
      paymentTerms: 'Direct Farmer Bank Account (T+1)',
      verifiedBadge: 'Ministry of Agriculture Verified FPO',
      rating: 4.8,
      phone: '+91 98842 11904'
    },
    {
      id: 'b3',
      name: 'FreshDirect Retail Chains',
      type: 'Organized Supermarket Buyer',
      location: 'Metro Distribution Center (35 km)',
      cropRequired: 'Grade-A Vegetables & Grains',
      quantity: '15 Metric Tons',
      offeredPrice: '₹38.5 / kg',
      paymentTerms: 'Farmgate Pickup Included · Zero Mandi Cess',
      verifiedBadge: 'Direct Corporate License',
      rating: 4.9,
      phone: '+91 97721 44530'
    }
  ];

  return (
    <div className="space-y-6 pb-20">
      {/* 1. VISUAL HERO ENVIRONMENT BASED ON CONCEPT 2 */}
      {/* Illustrated agricultural market filled with produce, farmers, baskets, tractor */}
      <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-amber-900/30 min-h-[380px] sm:min-h-[440px] flex flex-col justify-between">
        {/* Parallax Background Layer - Slower movement */}
        <div className="absolute inset-0 overflow-hidden">
          <img
            src={directMarketBgImage}
            alt="Illustrated agricultural mandi market with produce and farmers"
            className="w-full h-full object-cover object-center filter brightness-95 transform scale-105 hover:scale-100 transition-transform duration-1000"
            onError={(e) => {
              e.currentTarget.src = '/src/assets/images/farmzen_direct_produce_1790307256120.jpg';
            }}
          />
        </div>

        {/* Soft Depth Gradients & Overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/50 to-black/35" />
        <div className="absolute inset-0 bg-gradient-to-r from-amber-950/70 via-transparent to-slate-950/60" />

        {/* Animated Floating Parallax Elements (Foreground produce, baskets, leaves) */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {/* Floating leaf 1 */}
          <div className="absolute top-12 left-10 text-2xl animate-float-gentle opacity-80 filter drop-shadow">
            🍃
          </div>
          {/* Floating tomato icon */}
          <div className="absolute bottom-24 right-16 text-3xl animate-bounce opacity-85 filter drop-shadow" style={{ animationDuration: '4s' }}>
            🍅
          </div>
          {/* Floating wheat stalk */}
          <div className="absolute top-20 right-28 text-2xl animate-float-gentle opacity-75 filter drop-shadow" style={{ animationDelay: '1.5s' }}>
            🌾
          </div>
          {/* Floating basket */}
          <div className="absolute bottom-16 left-32 text-2xl animate-pulse opacity-80 filter drop-shadow">
            🧺
          </div>
        </div>

        {/* Hero Top Content */}
        <div className="relative z-10 p-6 sm:p-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-amber-500/25 backdrop-blur-md border border-amber-400/40 text-amber-300 flex items-center justify-center shadow-lg">
              <Store className="w-6 h-6 text-amber-300" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-bold uppercase tracking-widest text-amber-400 bg-amber-950/80 px-2.5 py-0.5 rounded-full border border-amber-700/50">
                  Digital Farm Market
                </span>
                <span className="text-[11px] font-mono text-emerald-300 bg-emerald-950/60 px-2 py-0.5 rounded-md border border-emerald-800/40">
                  Zero Middlemen · Direct Farmgate
                </span>
              </div>
              <div className="mt-1">
                <h1 className="text-3xl sm:text-5xl font-black font-editorial heading-direct tracking-tight animate-heading-reveal">
                  FARMZEN DIRECT
                </h1>
                <div className="underline-direct w-28 sm:w-36 mt-2 animate-underline-glow" />
              </div>
            </div>
          </div>

          <button
            onClick={() => setShowAddModal(true)}
            className="px-5 py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-xs sm:text-sm flex items-center gap-2 shadow-xl shadow-emerald-600/30 active:scale-95 transition-all self-start sm:self-auto"
          >
            <Plus className="w-4 h-4" />
            <span>List Harvest Produce</span>
          </button>
        </div>

        {/* Hero Tagline Card */}
        <div className="relative z-10 p-6 sm:p-8 pt-0">
          <div className="max-w-2xl bg-slate-950/80 backdrop-blur-md p-4 sm:p-5 rounded-2xl border border-amber-500/30 shadow-xl">
            <h2 className="text-base sm:text-lg font-bold text-amber-100 flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-amber-400" />
              “Know the market. Find opportunities. Sell smarter.”
            </h2>
            <p className="text-xs text-slate-300 mt-1 leading-relaxed">
              Connect directly with verified institutional buyers, food processors, and FPOs. Track real-time APMC wholesale rates and sell at your farm gate with zero commission deductions.
            </p>
          </div>
        </div>
      </div>

      {/* 2. SUBTLE ANIMATED MARKET TICKER */}
      <div className="relative overflow-hidden rounded-2xl bg-slate-900 border border-amber-900/40 p-2 shadow-md">
        <div className="flex items-center">
          <div className="shrink-0 px-3 py-1 bg-amber-500 text-slate-950 text-xs font-black uppercase tracking-wider rounded-lg flex items-center gap-1.5 shadow-sm">
            <Store className="w-3.5 h-3.5" />
            <span>LIVE TICKER</span>
          </div>

          <div className="overflow-hidden whitespace-nowrap w-full ml-3">
            <div className="animate-ticker flex items-center gap-6 text-xs font-mono font-medium text-slate-200">
              {/* Repeat items twice for seamless loop */}
              {[...tickerItems, ...tickerItems].map((item, idx) => (
                <div key={idx} className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md hover:bg-white/10 transition-colors">
                  <span className="font-semibold text-white">{item.crop}</span>
                  <span className="text-amber-300 font-bold">{item.price}</span>
                  <span className={`text-[11px] font-bold ${item.up ? 'text-emerald-400' : 'text-red-400'}`}>
                    {item.trend}
                  </span>
                  <span className="text-slate-600">|</span>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="px-3 pt-1 text-[10px] text-slate-400 text-right">
          * Real-time benchmark data synchronized with e-NAM APMC terminals
        </div>
      </div>

      {/* 3. TODAY'S MARKET TABLE */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 shadow-sm border border-slate-200/80 dark:border-slate-800 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 dark:border-slate-800 pb-3">
          <div>
            <h2 className="text-lg font-bold font-display text-slate-900 dark:text-white flex items-center gap-2">
              <span>TODAY'S MARKET</span>
              <span className="text-xs font-mono text-emerald-600 bg-emerald-50 dark:bg-emerald-950 px-2 py-0.5 rounded-full border border-emerald-200 dark:border-emerald-800">
                Official Wholesale APMC
              </span>
            </h2>
            <p className="text-xs text-slate-500">Live commodity prices across your regional market yards</p>
          </div>

          <div className="text-xs text-slate-400 font-mono flex items-center gap-1">
            <Clock className="w-3.5 h-3.5" />
            <span>Updated 15 mins ago</span>
          </div>
        </div>

        {/* Responsive Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-200 dark:border-slate-800 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                <th className="pb-3 pl-2">Crop</th>
                <th className="pb-3">Market</th>
                <th className="pb-3">Price</th>
                <th className="pb-3">Unit</th>
                <th className="pb-3">Yesterday</th>
                <th className="pb-3">Trend</th>
                <th className="pb-3">Updated Time</th>
                <th className="pb-3 pr-2">Source</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60 font-medium">
              {todaysMarketRows.map((row, idx) => (
                <tr key={idx} className="hover:bg-slate-50/80 dark:hover:bg-slate-800/40 transition-colors">
                  <td className="py-3 pl-2 font-bold text-slate-900 dark:text-white">
                    {row.crop}
                  </td>
                  <td className="py-3 text-slate-600 dark:text-slate-300">
                    {row.market}
                  </td>
                  <td className="py-3 font-mono font-bold text-base text-slate-900 dark:text-white">
                    ₹{row.price}
                  </td>
                  <td className="py-3 text-slate-500 font-mono">
                    /{row.unit}
                  </td>
                  <td className="py-3 text-slate-500 font-mono">
                    ₹{row.yesterday}
                  </td>
                  <td className="py-3">
                    <span className={`inline-flex items-center gap-0.5 px-2 py-0.5 rounded font-bold font-mono text-[11px] ${
                      row.trendUp ? 'text-emerald-700 bg-emerald-50 dark:bg-emerald-950' : 'text-red-700 bg-red-50 dark:bg-red-950'
                    }`}>
                      {row.trendUp ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                      {row.trend}
                    </span>
                  </td>
                  <td className="py-3 text-slate-500 font-mono">
                    {row.updatedTime}
                  </td>
                  <td className="py-3 pr-2 text-slate-500 text-[11px]">
                    <span className="px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                      {row.source}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* 4. NEARBY MARKETS & 5. PRICE TRENDS ANIMATED CHART */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Nearby Markets Section */}
        <div className="lg:col-span-5 bg-white dark:bg-slate-900 rounded-3xl p-6 shadow-sm border border-slate-200/80 dark:border-slate-800 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
            <div>
              <h2 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                <MapPin className="w-4 h-4 text-emerald-600" />
                <span>NEARBY MARKETS</span>
              </h2>
              <p className="text-xs text-slate-500">Mandi arrival volumes & yard distances</p>
            </div>
            <span className="text-xs text-emerald-600 font-bold font-mono">3 Active</span>
          </div>

          <div className="space-y-3">
            {nearbyMarkets.map((m, idx) => (
              <div
                key={idx}
                className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/80 dark:border-slate-800 space-y-2 hover:border-emerald-500/50 transition-colors"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white">
                      {m.name}
                    </h3>
                    <span className="text-[11px] text-emerald-600 font-semibold">{m.distance} away from your farm</span>
                  </div>
                  <span className="text-base font-bold font-mono text-emerald-700 dark:text-emerald-400">
                    {m.modalPrice}
                  </span>
                </div>

                <div className="pt-2 border-t border-slate-200/60 dark:border-slate-700/60 flex items-center justify-between text-[11px] text-slate-500">
                  <span>Arrivals: <strong className="text-slate-800 dark:text-slate-200">{m.arrivals}</strong></span>
                  <span className="px-2 py-0.5 rounded bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 font-medium">
                    {m.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Price Trends Animated Chart */}
        <div className="lg:col-span-7 bg-white dark:bg-slate-900 rounded-3xl p-6 shadow-sm border border-slate-200/80 dark:border-slate-800 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 dark:border-slate-800 pb-3">
            <div>
              <h2 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                <TrendingUp className="w-4 h-4 text-emerald-600" />
                <span>PRICE TRENDS & HARVEST FORECAST</span>
              </h2>
              <p className="text-xs text-slate-500">30-day modal rate progression vs buyer bid demand</p>
            </div>
            <div className="flex items-center gap-3 text-xs">
              <span className="flex items-center gap-1 text-slate-500">
                <span className="w-3 h-3 rounded-full bg-slate-400" /> Mandi Modal
              </span>
              <span className="flex items-center gap-1 text-emerald-600 font-bold">
                <span className="w-3 h-3 rounded-full bg-emerald-500" /> Direct Buyer Bid
              </span>
            </div>
          </div>

          <div className="h-56 w-full pt-2">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={priceTrendData}>
                <defs>
                  <linearGradient id="colorBuyer" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10B981" stopOpacity={0.4}/>
                    <stop offset="95%" stopColor="#10B981" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorMandi" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#94A3B8" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#94A3B8" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" opacity={0.15} />
                <XAxis dataKey="date" tick={{ fontSize: 11 }} />
                <YAxis domain={[25, 42]} tick={{ fontSize: 11 }} />
                <Tooltip
                  formatter={(value: any) => [`₹${value}/kg`, 'Price']}
                  contentStyle={{ backgroundColor: '#0F172A', borderColor: '#334155', borderRadius: '12px', color: '#fff', fontSize: '12px' }}
                />
                <Area type="monotone" dataKey="buyerBid" stroke="#10B981" strokeWidth={3} fillOpacity={1} fill="url(#colorBuyer)" name="Direct Buyer Bid" />
                <Area type="monotone" dataKey="mandiRate" stroke="#94A3B8" strokeWidth={2} strokeDasharray="4 4" fillOpacity={1} fill="url(#colorMandi)" name="Mandi Benchmark" />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          <div className="p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-xs text-emerald-900 dark:text-emerald-200 flex items-center justify-between">
            <span className="font-semibold">Harvest Outlook: Premium expected at +14% above MSP by early October.</span>
            <span className="text-[11px] font-mono text-emerald-600 dark:text-emerald-400">High Confidence</span>
          </div>
        </div>
      </div>

      {/* 6. POTENTIAL BUYERS (Buyer, Location, Crop Required, Quantity, Price, Verification Badge) */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 shadow-sm border border-slate-200/80 dark:border-slate-800 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 dark:border-slate-800 pb-3">
          <div>
            <h2 className="text-lg font-bold font-display text-slate-900 dark:text-white flex items-center gap-2">
              <BadgeCheck className="w-5 h-5 text-emerald-600" />
              <span>POTENTIAL BUYERS</span>
            </h2>
            <p className="text-xs text-slate-500">Verified institutional buyers looking for farmgate harvest pickup</p>
          </div>
          <span className="text-xs font-semibold text-emerald-700 dark:text-emerald-300 bg-emerald-100 dark:bg-emerald-950 px-3 py-1 rounded-full border border-emerald-300/40">
            3 Verified Leads Available
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {verifiedBuyersList.map((b) => (
            <div
              key={b.id}
              className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/80 dark:border-slate-800 space-y-3.5 flex flex-col justify-between hover:shadow-md transition-shadow"
            >
              <div className="space-y-2">
                {/* Verification Badge */}
                <div className="flex items-center justify-between">
                  <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-800 dark:text-emerald-300 bg-emerald-100 dark:bg-emerald-950/80 px-2.5 py-0.5 rounded-full border border-emerald-300 dark:border-emerald-700">
                    <ShieldCheck className="w-3 h-3 text-emerald-600" />
                    {b.verifiedBadge}
                  </span>
                  <span className="text-xs font-bold text-amber-500">★ {b.rating}</span>
                </div>

                {/* Buyer Name & Type */}
                <div>
                  <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                    {b.name}
                  </h3>
                  <p className="text-[11px] text-slate-500 font-medium">{b.type}</p>
                </div>

                {/* Location */}
                <div className="flex items-center gap-1.5 text-xs text-slate-600 dark:text-slate-300">
                  <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                  <span className="truncate">{b.location}</span>
                </div>

                {/* Crop & Quantity */}
                <div className="p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 space-y-1.5">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-400">Crop Required:</span>
                    <span className="font-bold text-slate-900 dark:text-white">{b.cropRequired}</span>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-400">Quantity:</span>
                    <span className="font-bold font-mono text-slate-900 dark:text-white">{b.quantity}</span>
                  </div>
                  <div className="flex items-center justify-between text-xs pt-1 border-t border-slate-100 dark:border-slate-800">
                    <span className="text-emerald-600 font-semibold">Offered Price:</span>
                    <span className="font-extrabold font-mono text-emerald-700 dark:text-emerald-400 text-sm">
                      {b.offeredPrice}
                    </span>
                  </div>
                </div>

                {/* Payment terms */}
                <p className="text-[11px] text-slate-500 leading-tight">
                  💳 {b.paymentTerms}
                </p>
              </div>

              {/* Contact Button */}
              <a
                href={`tel:${b.phone}`}
                className="w-full py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 dark:bg-emerald-600 dark:hover:bg-emerald-500 text-white font-bold text-xs flex items-center justify-center gap-2 active:scale-95 transition-all shadow-sm"
              >
                <PhoneCall className="w-3.5 h-3.5" />
                <span>Contact Direct ({b.phone})</span>
              </a>
            </div>
          ))}
        </div>
      </div>

      {/* CREATE HARVEST LISTING MODAL */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 w-full max-w-lg rounded-3xl p-6 shadow-2xl border border-slate-200 dark:border-slate-800 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <Store className="w-5 h-5 text-amber-500" />
                <h3 className="text-base font-bold text-slate-900 dark:text-white">
                  Post Harvest Produce to FARMZEN Direct
                </h3>
              </div>
              <button
                onClick={() => setShowAddModal(false)}
                className="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-500 hover:text-slate-900"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleCreateListing} className="space-y-3.5 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-600 dark:text-slate-400 font-bold mb-1">
                    Crop Name
                  </label>
                  <input
                    type="text"
                    value={newListing.crop_name}
                    onChange={(e) => setNewListing({ ...newListing, crop_name: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500 font-semibold"
                    required
                  />
                </div>

                <div>
                  <label className="block text-slate-600 dark:text-slate-400 font-bold mb-1">
                    Variety
                  </label>
                  <input
                    type="text"
                    value={newListing.variety}
                    onChange={(e) => setNewListing({ ...newListing, variety: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-600 dark:text-slate-400 font-bold mb-1">
                    Quantity (kg)
                  </label>
                  <input
                    type="number"
                    value={newListing.quantity}
                    onChange={(e) => setNewListing({ ...newListing, quantity: Number(e.target.value) })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500 font-mono font-bold"
                    required
                  />
                </div>

                <div>
                  <label className="block text-slate-600 dark:text-slate-400 font-bold mb-1">
                    Target Price (₹/kg)
                  </label>
                  <input
                    type="number"
                    value={newListing.expected_price}
                    onChange={(e) => setNewListing({ ...newListing, expected_price: Number(e.target.value) })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500 font-mono font-bold"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-600 dark:text-slate-400 font-bold mb-1">
                  Expected Harvest Date
                </label>
                <input
                  type="date"
                  value={newListing.harvest_date}
                  onChange={(e) => setNewListing({ ...newListing, harvest_date: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  required
                />
              </div>

              <div>
                <label className="block text-slate-600 dark:text-slate-400 font-bold mb-1">
                  Quality Grade
                </label>
                <select
                  value={newListing.quality_grade}
                  onChange={(e) => setNewListing({ ...newListing, quality_grade: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                >
                  <option value="Grade-A Export Quality">Grade-A Export Quality (Clean & Sorted)</option>
                  <option value="Grade-B Domestic Mandi">Grade-B Domestic Mandi Quality</option>
                  <option value="Organic Certified Standard">Organic Certified Standard</option>
                </select>
              </div>

              <div className="pt-2 flex items-center justify-end gap-2 border-t border-slate-100 dark:border-slate-800">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold shadow-md shadow-emerald-600/30"
                >
                  Broadcast to Buyers
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
