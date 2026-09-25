import React, { useState } from 'react';
import { Farm, Crop, FarmFinances, LanguageCode } from '../types';
import { translations } from '../i18n/translations';
import { farmApi } from '../services/api';
import {
  User, Sprout, DollarSign, Target, CheckCircle2, ArrowRight, ArrowLeft, X
} from 'lucide-react';

interface OnboardingModalProps {
  isOpen: boolean;
  onClose: () => void;
  language: LanguageCode;
  onCompleted: () => void;
}

export const OnboardingModal: React.FC<OnboardingModalProps> = ({
  isOpen,
  onClose,
  language,
  onCompleted
}) => {
  const t = translations[language];
  const [step, setStep] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(false);

  const [formData, setFormData] = useState({
    // Step 1: About You
    fullName: 'M. Selvam',
    mobile: '9876543210',
    village: 'Ammapettai',
    district: 'Thanjavur',
    state: 'Tamil Nadu',
    // Step 2: Your Farm
    farmName: 'Cauvery Delta Green Fields',
    ownershipType: 'OWNED',
    areaAcres: 4.5,
    soilType: 'Alluvial Loam',
    waterSource: 'Canal & Borewell',
    irrigationType: 'Drip & Furrow',
    // Step 3: Your Crop
    cropName: 'Paddy / Rice',
    variety: 'CR-1009 Sub-1',
    cropStage: 'Tillering to Panicle Initiation',
    plantingDate: '2026-07-20',
    expectedHarvestDate: '2026-11-25',
    // Step 4: Your Finances
    cultivationInvestment: 68500,
    loanAmount: 45000,
    repaymentDate: '2026-11-30',
    expectedHarvestValue: 145000,
    hasInsurance: true,
    // Step 5: Farm Goal
    farmGoal: 'Protect my crop & manage financial risk'
  });

  if (!isOpen) return null;

  const handleSubmit = async () => {
    setLoading(true);
    try {
      await farmApi.createFarm({
        farm_name: formData.farmName,
        ownership_type: formData.ownershipType as any,
        area_acres: Number(formData.areaAcres),
        village: formData.village,
        district: formData.district,
        state: formData.state,
        soil_type: formData.soilType,
        water_source: formData.waterSource,
        irrigation_type: formData.irrigationType,
        farm_goal: formData.farmGoal
      });
      onCompleted();
      onClose();
    } catch (err) {
      console.error('Onboarding submission error:', err);
      onCompleted();
      onClose();
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/70 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-xl bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-emerald-500/30 overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header with Step Tracker */}
        <div className="p-5 border-b border-slate-100 dark:border-slate-800 bg-emerald-50/50 dark:bg-emerald-950/40 flex items-center justify-between">
          <div>
            <span className="text-[11px] font-bold text-emerald-700 dark:text-emerald-400 uppercase tracking-wider">
              Step {step} of 5
            </span>
            <h2 className="text-lg font-bold font-display text-slate-900 dark:text-white">
              {step === 1 && '1. About You (விவசாயி விவரம்)'}
              {step === 2 && '2. Your Farm Land (பண்ணை விவரம்)'}
              {step === 3 && '3. Your Crop (பயிர் விவரம்)'}
              {step === 4 && '4. Your Finances & Loan (நிதி விவரம்)'}
              {step === 5 && '5. Your Primary Farm Goal (முக்கிய இலக்கு)'}
            </h2>
          </div>
          <button onClick={onClose} className="p-1 text-slate-400 hover:text-slate-600 rounded-lg">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <div className="p-6 overflow-y-auto space-y-4 flex-1">
          {/* STEP 1: ABOUT YOU */}
          {step === 1 && (
            <div className="space-y-3">
              <div>
                <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block mb-1">Full Name</label>
                <input
                  type="text"
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-transparent text-xs text-slate-900 dark:text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block mb-1">Mobile Number</label>
                  <input
                    type="text"
                    value={formData.mobile}
                    onChange={(e) => setFormData({ ...formData, mobile: e.target.value })}
                    className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-transparent text-xs text-slate-900 dark:text-white"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block mb-1">Village</label>
                  <input
                    type="text"
                    value={formData.village}
                    onChange={(e) => setFormData({ ...formData, village: e.target.value })}
                    className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-transparent text-xs text-slate-900 dark:text-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block mb-1">District</label>
                  <input
                    type="text"
                    value={formData.district}
                    onChange={(e) => setFormData({ ...formData, district: e.target.value })}
                    className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-transparent text-xs text-slate-900 dark:text-white"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block mb-1">State</label>
                  <input
                    type="text"
                    value={formData.state}
                    onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                    className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-transparent text-xs text-slate-900 dark:text-white"
                  />
                </div>
              </div>
            </div>
          )}

          {/* STEP 2: YOUR FARM */}
          {step === 2 && (
            <div className="space-y-3">
              <div>
                <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block mb-1">Farm Name</label>
                <input
                  type="text"
                  value={formData.farmName}
                  onChange={(e) => setFormData({ ...formData, farmName: e.target.value })}
                  className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-transparent text-xs text-slate-900 dark:text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block mb-1">Ownership</label>
                  <select
                    value={formData.ownershipType}
                    onChange={(e) => setFormData({ ...formData, ownershipType: e.target.value })}
                    className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-transparent text-xs text-slate-900 dark:text-white"
                  >
                    <option value="OWNED">Owned (சொந்த நிலம்)</option>
                    <option value="LEASED">Leased (குத்தகை)</option>
                    <option value="RENTED">Rented (வாடகை)</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block mb-1">Total Acres</label>
                  <input
                    type="number"
                    step="0.5"
                    value={formData.areaAcres}
                    onChange={(e) => setFormData({ ...formData, areaAcres: Number(e.target.value) })}
                    className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-transparent text-xs text-slate-900 dark:text-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block mb-1">Soil Type</label>
                  <input
                    type="text"
                    value={formData.soilType}
                    onChange={(e) => setFormData({ ...formData, soilType: e.target.value })}
                    className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-transparent text-xs text-slate-900 dark:text-white"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block mb-1">Irrigation Method</label>
                  <input
                    type="text"
                    value={formData.irrigationType}
                    onChange={(e) => setFormData({ ...formData, irrigationType: e.target.value })}
                    className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-transparent text-xs text-slate-900 dark:text-white"
                  />
                </div>
              </div>
            </div>
          )}

          {/* STEP 3: YOUR CROP */}
          {step === 3 && (
            <div className="space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block mb-1">Crop Name</label>
                  <input
                    type="text"
                    value={formData.cropName}
                    onChange={(e) => setFormData({ ...formData, cropName: e.target.value })}
                    className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-transparent text-xs text-slate-900 dark:text-white"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block mb-1">Variety</label>
                  <input
                    type="text"
                    value={formData.variety}
                    onChange={(e) => setFormData({ ...formData, variety: e.target.value })}
                    className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-transparent text-xs text-slate-900 dark:text-white"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block mb-1">Current Crop Stage</label>
                <input
                  type="text"
                  value={formData.cropStage}
                  onChange={(e) => setFormData({ ...formData, cropStage: e.target.value })}
                  className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-transparent text-xs text-slate-900 dark:text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block mb-1">Sowing/Planting Date</label>
                  <input
                    type="date"
                    value={formData.plantingDate}
                    onChange={(e) => setFormData({ ...formData, plantingDate: e.target.value })}
                    className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-transparent text-xs text-slate-900 dark:text-white"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block mb-1">Expected Harvest Date</label>
                  <input
                    type="date"
                    value={formData.expectedHarvestDate}
                    onChange={(e) => setFormData({ ...formData, expectedHarvestDate: e.target.value })}
                    className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-transparent text-xs text-slate-900 dark:text-white"
                  />
                </div>
              </div>
            </div>
          )}

          {/* STEP 4: YOUR FINANCES */}
          {step === 4 && (
            <div className="space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block mb-1">Cultivation Investment (₹)</label>
                  <input
                    type="number"
                    value={formData.cultivationInvestment}
                    onChange={(e) => setFormData({ ...formData, cultivationInvestment: Number(e.target.value) })}
                    className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-transparent text-xs text-slate-900 dark:text-white"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block mb-1">Loan / Debt Amount (₹)</label>
                  <input
                    type="number"
                    value={formData.loanAmount}
                    onChange={(e) => setFormData({ ...formData, loanAmount: Number(e.target.value) })}
                    className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-transparent text-xs text-slate-900 dark:text-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block mb-1">Expected Harvest Value (₹)</label>
                  <input
                    type="number"
                    value={formData.expectedHarvestValue}
                    onChange={(e) => setFormData({ ...formData, expectedHarvestValue: Number(e.target.value) })}
                    className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-transparent text-xs text-slate-900 dark:text-white"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block mb-1">Repayment Due Date</label>
                  <input
                    type="date"
                    value={formData.repaymentDate}
                    onChange={(e) => setFormData({ ...formData, repaymentDate: e.target.value })}
                    className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-transparent text-xs text-slate-900 dark:text-white"
                  />
                </div>
              </div>

              <div className="pt-2">
                <label className="flex items-center gap-2 cursor-pointer text-xs text-slate-700 dark:text-slate-300 font-medium">
                  <input
                    type="checkbox"
                    checked={formData.hasInsurance}
                    onChange={(e) => setFormData({ ...formData, hasInsurance: e.target.checked })}
                    className="w-4 h-4 rounded text-emerald-600 focus:ring-emerald-500"
                  />
                  <span>Enrolled in PMFBY Pradhan Mantri Fasal Bima Yojana</span>
                </label>
              </div>
            </div>
          )}

          {/* STEP 5: YOUR FARM GOAL */}
          {step === 5 && (
            <div className="space-y-2">
              <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block mb-2">
                What is your highest priority for FARMZEN support?
              </label>

              {[
                'Protect my crop & manage financial risk',
                'Reduce unnecessary expenses & optimize inputs',
                'Improve harvest yield & soil health',
                'Understand weather impact & irrigation timing',
                'Detect crop disease early with AI vision',
                'Find better direct market buyers & fair prices'
              ].map((goal, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setFormData({ ...formData, farmGoal: goal })}
                  className={`w-full text-left p-3 rounded-xl text-xs font-medium border transition-all flex items-center justify-between ${
                    formData.farmGoal === goal
                      ? 'border-emerald-500 bg-emerald-50/80 dark:bg-emerald-950/50 text-emerald-900 dark:text-emerald-200 shadow-sm'
                      : 'border-slate-200 dark:border-slate-800 hover:border-slate-300 text-slate-700 dark:text-slate-300'
                  }`}
                >
                  <span>{goal}</span>
                  {formData.farmGoal === goal && <CheckCircle2 className="w-4 h-4 text-emerald-600" />}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Footer Controls */}
        <div className="p-4 bg-slate-50 dark:bg-slate-950 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
          {step > 1 ? (
            <button
              onClick={() => setStep(step - 1)}
              className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:text-slate-800 flex items-center gap-1.5"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back</span>
            </button>
          ) : <div />}

          {step < 5 ? (
            <button
              onClick={() => setStep(step + 1)}
              className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center gap-1.5 shadow-md shadow-emerald-600/20"
            >
              <span>Next</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          ) : (
            <button
              onClick={handleSubmit}
              disabled={loading}
              className="px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 text-white font-bold text-xs flex items-center gap-1.5 shadow-md shadow-emerald-600/20"
            >
              <span>{loading ? 'Activating Farm...' : 'Complete Setup & Enter FarmZen'}</span>
              <CheckCircle2 className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
