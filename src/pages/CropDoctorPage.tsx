import React, { useState, useRef } from 'react';
import { Crop, CropScanResult, LanguageCode } from '../types';
import { translations } from '../i18n/translations';
import { cropDoctorApi } from '../services/api';
import {
  Stethoscope, Camera, Upload, CheckCircle2, AlertTriangle, ShieldCheck,
  History, Sparkles, RefreshCw, Info, HelpCircle, Layers, ArrowRight
} from 'lucide-react';

interface CropDoctorPageProps {
  currentCrop: Crop;
  recentScans: CropScanResult[];
  language: LanguageCode;
  onOpenSos: () => void;
}

export const CropDoctorPage: React.FC<CropDoctorPageProps> = ({
  currentCrop,
  recentScans,
  language,
  onOpenSos
}) => {
  const t = translations[language];
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [selectedImage, setSelectedImage] = useState<string | null>(
    '/src/assets/images/crop_doctor_leaf_scan_1790307243294.jpg'
  );
  const [isScanning, setIsScanning] = useState<boolean>(false);
  const [scanStepText, setScanStepText] = useState<string>('Uploading image...');
  const [currentResult, setCurrentResult] = useState<CropScanResult | null>(recentScans[0] || null);
  const [viewHistory, setViewHistory] = useState<boolean>(false);

  // Sample leaf images for instant 1-click test demonstration
  const sampleLeafOptions = [
    {
      title: 'Tomato Foliage (Early Blight Sample)',
      path: '/src/assets/images/crop_doctor_leaf_scan_1790307243294.jpg',
      cropHint: 'Tomato Leaf'
    },
    {
      title: 'General Field Crop Sample',
      path: '/src/assets/images/farmzen_hero_landscape_1790307231565.jpg',
      cropHint: 'Paddy Rice'
    }
  ];

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const base64 = event.target?.result as string;
      setSelectedImage(base64);
      triggerDiagnosis(base64, currentCrop.crop_name);
    };
    reader.readAsDataURL(file);
  };

  const triggerDiagnosis = async (imageBase64: string, cropHint: string) => {
    setIsScanning(true);
    setScanStepText('Uploading image...');

    const t1 = setTimeout(() => setScanStepText('Analyzing crop...'), 400);
    const t2 = setTimeout(() => setScanStepText('Detecting symptoms...'), 800);
    const t3 = setTimeout(() => setScanStepText('Comparing agricultural knowledge...'), 1200);
    const t4 = setTimeout(() => setScanStepText('Generating result...'), 1600);

    try {
      const result = await cropDoctorApi.scanImage(imageBase64, cropHint);
      setCurrentResult(result);
    } catch (err) {
      console.error('Scan error:', err);
    } finally {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
      setIsScanning(false);
    }
  };

  return (
    <div className="space-y-6 pb-20">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-teal-950/10 pb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-teal-600 text-white flex items-center justify-center shadow-md">
            <Stethoscope className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-2xl sm:text-4xl font-black font-editorial heading-crop tracking-tight animate-heading-reveal">
              FARMZEN CROP DOCTOR
            </h1>
            <div className="underline-crop w-32 sm:w-44 mt-1.5 animate-underline-glow" />
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              {t.cropDoctor.subtitle}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setViewHistory(!viewHistory)}
            className="px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-800 text-xs font-semibold text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors flex items-center gap-1.5"
          >
            <History className="w-3.5 h-3.5" />
            <span>{t.cropDoctor.history} ({recentScans.length})</span>
          </button>
        </div>
      </div>

      {/* THREE-STEP INTELLIGENCE PIPELINE */}
      <div className="p-3.5 rounded-2xl bg-teal-50/80 dark:bg-teal-950/40 border border-teal-200/60 dark:border-teal-800/40 grid grid-cols-1 md:grid-cols-3 gap-2.5 text-xs">
        <div className="flex items-center gap-2 text-slate-700 dark:text-slate-300">
          <span className="w-5 h-5 rounded-full bg-teal-600 text-white flex items-center justify-center text-[11px] font-bold shrink-0">1</span>
          <div>
            <span className="font-bold block text-teal-950 dark:text-teal-200">WHAT YOU ENTER</span>
            <span className="text-[11px] text-slate-500">Captured or Uploaded {currentCrop.crop_name} Leaf Photo</span>
          </div>
        </div>

        <div className="flex items-center gap-2 text-slate-700 dark:text-slate-300">
          <span className="w-5 h-5 rounded-full bg-teal-600 text-white flex items-center justify-center text-[11px] font-bold shrink-0">2</span>
          <div>
            <span className="font-bold block text-teal-950 dark:text-teal-200">WHAT FARMZEN UNDERSTANDS</span>
            <span className="text-[11px] text-slate-500">Concentric necrotic lesions · 87% Early Blight Match</span>
          </div>
        </div>

        <div className="flex items-center gap-2 text-slate-700 dark:text-slate-300">
          <span className="w-5 h-5 rounded-full bg-teal-600 text-white flex items-center justify-center text-[11px] font-bold shrink-0">3</span>
          <div>
            <span className="font-bold block text-teal-950 dark:text-teal-200">WHAT FARMZEN RECOMMENDS</span>
            <span className="text-[11px] text-slate-500">Prune lower leaves · Pseudomonas 5g/L bio-shield</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Camera Scanner Viewfinder */}
        <div className="lg:col-span-5 space-y-4">
          <div className="relative rounded-3xl overflow-hidden bg-slate-950 border-2 border-emerald-500/40 shadow-xl aspect-4/3 flex items-center justify-center">
            {selectedImage ? (
              <img
                src={selectedImage}
                alt="Selected plant leaf for scanning"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            ) : (
              <div className="text-center p-6 text-slate-400 space-y-2">
                <Camera className="w-12 h-12 mx-auto text-emerald-500 opacity-60" />
                <p className="text-xs">{t.cropDoctor.frameGuide}</p>
              </div>
            )}

            {/* Scanner HUD Overlay Corners */}
            <div className="absolute inset-4 pointer-events-none border-2 border-dashed border-emerald-400/50 rounded-2xl flex flex-col justify-between p-3">
              <div className="flex justify-between">
                <div className="w-4 h-4 border-t-2 border-l-2 border-emerald-400" />
                <div className="w-4 h-4 border-t-2 border-r-2 border-emerald-400" />
              </div>
              <div className="flex justify-between">
                <div className="w-4 h-4 border-b-2 border-l-2 border-emerald-400" />
                <div className="w-4 h-4 border-b-2 border-r-2 border-emerald-400" />
              </div>
            </div>

            {/* Animated Laser Scan Line during scanning */}
            {isScanning && (
              <div className="absolute inset-x-0 h-1 bg-gradient-to-r from-transparent via-emerald-400 to-transparent shadow-[0_0_20px_#10b981] animate-scanline" />
            )}

            {/* Live status badge */}
            <div className="absolute top-3 left-3 bg-black/60 backdrop-blur-md px-2.5 py-1 rounded-full text-[10px] font-mono text-emerald-300 border border-emerald-500/30 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
              <span>{isScanning ? scanStepText.toUpperCase() : 'AI VISION READY'}</span>
            </div>
          </div>

          {/* Action buttons: Scan & Upload */}
          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={() => {
                if (selectedImage) {
                  triggerDiagnosis(selectedImage, currentCrop.crop_name);
                } else if (fileInputRef.current) {
                  fileInputRef.current.click();
                }
              }}
              disabled={isScanning}
              className="py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-md shadow-emerald-600/20 active:scale-95 transition-all"
            >
              <Sparkles className="w-4 h-4" />
              <span>{isScanning ? 'Analyzing...' : t.cropDoctor.scanCrop}</span>
            </button>

            <button
              onClick={() => fileInputRef.current?.click()}
              className="py-3 px-4 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-100 font-bold text-xs flex items-center justify-center gap-2 border border-slate-200 dark:border-slate-700 transition-colors"
            >
              <Upload className="w-4 h-4" />
              <span>{t.cropDoctor.uploadPhoto}</span>
            </button>

            <input
              type="file"
              ref={fileInputRef}
              accept="image/*"
              className="hidden"
              onChange={handleFileUpload}
            />
          </div>

          {/* Preset Sample Leaf Demonstrators */}
          <div className="bg-slate-50 dark:bg-slate-800/60 p-3.5 rounded-2xl border border-slate-200/80 dark:border-slate-700/60 space-y-2">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
              1-Tap Demo Sample Leaves
            </span>
            <div className="space-y-1.5">
              {sampleLeafOptions.map((sample, i) => (
                <button
                  key={i}
                  onClick={() => {
                    setSelectedImage(sample.path);
                    triggerDiagnosis(sample.path, sample.cropHint);
                  }}
                  className="w-full text-left p-2 rounded-xl text-xs bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-emerald-500 transition-colors flex items-center justify-between"
                >
                  <span className="font-medium text-slate-700 dark:text-slate-300">{sample.title}</span>
                  <ArrowRight className="w-3.5 h-3.5 text-emerald-500" />
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Diagnostic Results Card */}
        <div className="lg:col-span-7 space-y-5">
          {currentResult ? (
            <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 shadow-sm border border-slate-200/80 dark:border-slate-800 space-y-5">
              {/* Diagnosis Header */}
              <div className="flex items-start justify-between gap-3 border-b border-slate-100 dark:border-slate-800 pb-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
                      {currentResult.crop_detected}
                    </span>
                    <span>·</span>
                    <span className="text-xs font-mono text-slate-400">
                      {currentResult.problem_type}
                    </span>
                  </div>

                  <h2 className="text-xl sm:text-2xl font-bold font-display text-slate-900 dark:text-white">
                    {currentResult.possible_problem}
                  </h2>
                </div>

                <div className="text-right shrink-0">
                  <div className="text-xs text-slate-400">Confidence</div>
                  <div className="text-2xl font-black font-mono text-emerald-600 dark:text-emerald-400">
                    {currentResult.confidence_percentage}%
                  </div>
                </div>
              </div>

              {/* Observed Symptoms */}
              <div className="space-y-2">
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  {t.cropDoctor.symptoms}
                </h3>
                <ul className="space-y-1 text-xs text-slate-700 dark:text-slate-300">
                  {currentResult.symptoms.map((s, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-emerald-500 font-bold">•</span>
                      <span>{s}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Immediate Field Action */}
              <div className="p-4 rounded-2xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800/40 space-y-1">
                <div className="flex items-center gap-1.5 text-xs font-bold text-amber-800 dark:text-amber-300">
                  <AlertTriangle className="w-4 h-4" />
                  <span>Immediate Action:</span>
                </div>
                <p className="text-xs text-amber-950 dark:text-amber-200 font-medium">
                  {currentResult.suggested_actions.immediate}
                </p>
              </div>

              {/* Organic & Eco-Friendly Approach */}
              <div className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/40 space-y-2">
                <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-800 dark:text-emerald-300">
                  <ShieldCheck className="w-4 h-4" />
                  <span>{t.cropDoctor.organicApproach}</span>
                </div>
                <ul className="space-y-1 text-xs text-emerald-950 dark:text-emerald-200">
                  {currentResult.suggested_actions.organic.map((org, i) => (
                    <li key={i} className="flex items-start gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 shrink-0 text-emerald-600 mt-0.5" />
                      <span>{org}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Approved Chemical Option (If necessary) */}
              <div className="space-y-2">
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  {t.cropDoctor.chemicalOption}
                </h3>
                <ul className="space-y-1 text-xs text-slate-600 dark:text-slate-300 font-mono">
                  {currentResult.suggested_actions.chemical.map((chem, i) => (
                    <li key={i} className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/60 dark:border-slate-800">
                      {chem}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Prevention for next stage */}
              <div className="space-y-2">
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  {t.cropDoctor.preventionTips}
                </h3>
                <ul className="space-y-1 text-xs text-slate-700 dark:text-slate-300">
                  {currentResult.prevention.map((prev, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-emerald-500">✓</span>
                      <span>{prev}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Scientific Decision Support Disclaimer */}
              <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-start gap-2 text-[11px] text-slate-400">
                <Info className="w-4 h-4 shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold">Notice: </span>
                  {currentResult.scientific_disclaimer} Source: {currentResult.source}.
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-white dark:bg-slate-900 rounded-3xl p-12 text-center border border-slate-200/80 dark:border-slate-800 space-y-3">
              <Stethoscope className="w-12 h-12 mx-auto text-slate-300" />
              <h3 className="text-base font-bold text-slate-700 dark:text-slate-200">
                No Diagnostic Scan Loaded
              </h3>
              <p className="text-xs text-slate-500 max-w-sm mx-auto">
                Capture a photo or choose a sample leaf on the left to run our botanical vision model.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
