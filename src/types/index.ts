export type LanguageCode = 'en' | 'ta' | 'te' | 'kn' | 'ml' | 'hi';

export interface User {
  id: string;
  uuid: string;
  mobile: string;
  email: string;
  role: 'FARMER' | 'ADMIN';
  language: LanguageCode;
  is_verified: boolean;
  is_active: boolean;
  created_at: string;
}

export interface FarmerProfile {
  id: string;
  user_id: string;
  full_name: string;
  village: string;
  taluk: string;
  block: string;
  district: string;
  state: string;
  pincode: string;
  preferred_language: LanguageCode;
  profile_photo?: string;
  created_at: string;
}

export interface Farm {
  id: string;
  farmer_id: string;
  farm_name: string;
  ownership_type: 'OWNED' | 'RENTED' | 'LEASED';
  area_acres: number;
  latitude: number;
  longitude: number;
  village: string;
  taluk: string;
  district: string;
  state: string;
  soil_type: string;
  water_source: string;
  irrigation_type: string;
  farm_goal: string;
  created_at: string;
}

export interface Crop {
  id: string;
  farm_id: string;
  crop_name: string;
  local_name: string;
  variety: string;
  crop_category: string;
  planting_date: string;
  expected_harvest_date: string;
  crop_stage: string;
  area_acres: number;
  soil_type: string;
  irrigation_method: string;
  health_status: 'HEALTHY' | 'MODERATE' | 'ATTENTION_NEEDED' | 'AT_RISK';
  created_at: string;
}

export interface FarmFinances {
  id: string;
  farm_id: string;
  cultivation_investment: number;
  land_rent: number;
  lease_cost: number;
  loan_amount: number;
  loan_provider: string;
  loan_interest_rate: number;
  monthly_repayment: number;
  repayment_date: string;
  expected_harvest_value: number;
  expected_income: number;
  current_income: number;
  insurance_status: 'ACTIVE' | 'NOT_ACTIVE' | 'PENDING';
  insurance_provider: string;
  insurance_policy_number: string;
  other_expenses: number;
}

export interface Expense {
  id: string;
  farm_id: string;
  category: 'SEEDS' | 'FERTILIZER' | 'PEST_CONTROL' | 'LABOUR' | 'IRRIGATION' | 'MACHINERY' | 'TRANSPORT' | 'RENT' | 'LEASE' | 'LOAN' | 'OTHER';
  description: string;
  amount: number;
  expense_date: string;
  created_at: string;
}

export interface Income {
  id: string;
  farm_id: string;
  source: string;
  amount: number;
  income_date: string;
  crop_id?: string;
  description: string;
  created_at: string;
}

export interface WeatherData {
  temperature: number;
  feels_like: number;
  humidity: number;
  rainfall_mm: number;
  rain_probability: number;
  wind_speed: number;
  wind_direction: string;
  cloud_cover: number;
  condition: string;
  icon: string;
  sunrise: string;
  sunset: string;
  uv_index: number;
  source: string;
  updated_at: string;
  soil_advice: string;
  hourly_forecast: Array<{
    time: string;
    temp: number;
    rain_chance: number;
    condition: string;
  }>;
  daily_forecast: Array<{
    day: string;
    date: string;
    max_temp: number;
    min_temp: number;
    rain_chance: number;
    condition: string;
    rainfall_est_mm: number;
  }>;
}

export interface FarmAdvisory {
  id: string;
  condition: string;
  farm_impact: string;
  action_required: string;
  urgency: 'HIGH' | 'MEDIUM' | 'NORMAL';
  crop_target: string;
  source: string;
}

export interface ShieldRiskCategory {
  name: string;
  score: number; // 0 to 100
  status: 'LOW' | 'MODERATE' | 'HIGH' | 'CRITICAL';
  description: string;
  impact: string;
  suggested_action: string;
}

export interface ShieldRiskOverview {
  overall_score: number;
  risk_level: 'LOW' | 'MODERATE' | 'HIGH' | 'CRITICAL';
  summary: string;
  categories: {
    weather: ShieldRiskCategory;
    crop_health: ShieldRiskCategory;
    disease: ShieldRiskCategory;
    pest: ShieldRiskCategory;
    water: ShieldRiskCategory;
    market: ShieldRiskCategory;
    finance: ShieldRiskCategory;
  };
  key_alerts: Array<{
    id: string;
    type: string;
    title: string;
    message: string;
    severity: 'CRITICAL' | 'WARNING' | 'INFO';
    action: string;
    source: string;
  }>;
}

export interface WhatIfSimulation {
  loss_percentage: number;
  original_expected_income: number;
  projected_income: number;
  estimated_loss: number;
  investment_exposure: number;
  financial_gap: number;
  loan_repayment_risk: string;
  recommended_recovery_routes: Array<{
    name: string;
    description: string;
    potential_relief: string;
    action_step: string;
    source: string;
  }>;
}

export interface CropScanResult {
  id: string;
  timestamp: string;
  image_url?: string;
  crop_detected: string;
  possible_problem: string;
  problem_type: 'DISEASE' | 'PEST' | 'DEFICIENCY' | 'HEALTHY';
  confidence_percentage: number;
  severity: 'MILD' | 'MODERATE' | 'SEVERE' | 'NONE';
  symptoms: string[];
  possible_causes: string[];
  suggested_actions: {
    organic: string[];
    chemical: string[];
    immediate: string;
  };
  prevention: string[];
  scientific_disclaimer: string;
  source: string;
}

export interface MarketPrice {
  id: string;
  crop: string;
  commodity: string;
  market_name: string;
  district: string;
  state: string;
  min_price: number;
  modal_price: number;
  max_price: number;
  unit: string;
  yesterday_price: number;
  trend_percentage: number;
  trend_direction: 'UP' | 'DOWN' | 'STABLE';
  updated_at: string;
  source: string;
}

export interface ProductListing {
  id: string;
  farmer_id: string;
  farmer_name: string;
  crop_name: string;
  variety: string;
  quantity: number;
  unit: string;
  expected_price: number;
  harvest_date: string;
  location: string;
  quality_grade: string;
  delivery_preference: string;
  status: 'ACTIVE' | 'OFFERS_RECEIVED' | 'SOLD' | 'ARCHIVED';
  photo_url?: string;
  created_at: string;
}

export interface BuyerProfile {
  id: string;
  business_name: string;
  buyer_type: 'RETAILER' | 'WHOLESALER' | 'RESTAURANT' | 'FPO' | 'FOOD_PROCESSOR';
  location: string;
  distance_km: number;
  crop_required: string;
  quantity_required: string;
  offered_price_range: string;
  verification_status: 'VERIFIED' | 'COMMUNITY_VERIFIED';
  contact_number: string;
  pickup_available: boolean;
}

export interface SOSContact {
  id: string;
  name: string;
  department: string;
  category: 'INSURANCE' | 'AGRI_OFFICER' | 'GOV_SCHEME' | 'EMERGENCY' | 'CROP_LOSS';
  phone_number: string;
  state: string;
  district: string;
  language: string;
  description: string;
  source_url: string;
  is_verified: boolean;
  last_verified_at: string;
}

export interface NotificationItem {
  id: string;
  type: 'WEATHER' | 'CROP' | 'DISEASE' | 'PEST' | 'FINANCE' | 'MARKET' | 'SOS' | 'AI';
  title: string;
  message: string;
  severity: 'HIGH' | 'MEDIUM' | 'LOW';
  source: string;
  is_read: boolean;
  created_at: string;
}

export interface GovernmentScheme {
  id: string;
  scheme_name: string;
  description: string;
  eligibility: string;
  benefits: string;
  application_process: string;
  state: string;
  source_url: string;
  last_verified_at: string;
}
