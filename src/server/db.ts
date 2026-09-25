import {
  User, FarmerProfile, Farm, Crop, FarmFinances, Expense, Income,
  WeatherData, FarmAdvisory, ShieldRiskOverview, WhatIfSimulation,
  CropScanResult, MarketPrice, ProductListing, BuyerProfile, SOSContact,
  NotificationItem, GovernmentScheme
} from '../types';

export interface AuditLog {
  id: string;
  timestamp: string;
  action: string;
  user_id: string;
  details: string;
}

export interface DataSource {
  id: string;
  name: string;
  type: string;
  url: string;
  description: string;
  status: 'OPERATIONAL' | 'DEGRADED';
  last_checked: string;
}

class FarmZenDatabase {
  users: User[] = [
    {
      id: 'usr-001',
      uuid: '9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d',
      mobile: '9876543210',
      email: 'selvam.farmer@farmzen.in',
      role: 'FARMER',
      language: 'en',
      is_verified: true,
      is_active: true,
      created_at: new Date('2026-01-15T06:00:00Z').toISOString()
    },
    {
      id: 'usr-admin',
      uuid: '1a2b3c4d-5e6f-7a8b-9c0d-1e2f3a4b5c6d',
      mobile: '9999988888',
      email: 'admin@farmzen.in',
      role: 'ADMIN',
      language: 'en',
      is_verified: true,
      is_active: true,
      created_at: new Date('2026-01-01T00:00:00Z').toISOString()
    }
  ];

  farmerProfiles: FarmerProfile[] = [
    {
      id: 'prof-001',
      user_id: 'usr-001',
      full_name: 'M. Selvam',
      village: 'Ammapettai',
      taluk: 'Papanasam',
      block: 'Thanjavur East',
      district: 'Thanjavur',
      state: 'Tamil Nadu',
      pincode: '614401',
      preferred_language: 'en',
      created_at: new Date('2026-01-15T06:00:00Z').toISOString()
    }
  ];

  farms: Farm[] = [
    {
      id: 'farm-001',
      farmer_id: 'usr-001',
      farm_name: 'Cauvery Delta Green Fields',
      ownership_type: 'OWNED',
      area_acres: 4.5,
      latitude: 10.7870,
      longitude: 79.1378,
      village: 'Ammapettai',
      taluk: 'Papanasam',
      district: 'Thanjavur',
      state: 'Tamil Nadu',
      soil_type: 'Alluvial Loam',
      water_source: 'Canal & Borewell',
      irrigation_type: 'Drip & Furrow',
      farm_goal: 'Protect my crop & manage financial risk',
      created_at: new Date('2026-01-15T06:00:00Z').toISOString()
    },
    {
      id: 'farm-002',
      farmer_id: 'usr-001',
      farm_name: 'Kolar Valley Vegetable Plot',
      ownership_type: 'LEASED',
      area_acres: 2.0,
      latitude: 13.1367,
      longitude: 78.1291,
      village: 'Mulbagal Road',
      taluk: 'Kolar',
      district: 'Kolar',
      state: 'Karnataka',
      soil_type: 'Red Sandy Loam',
      water_source: 'Deep Borewell with Micro Filtration',
      irrigation_type: 'Drip Irrigation',
      farm_goal: 'Improve yield & find direct buyer',
      created_at: new Date('2026-02-10T08:00:00Z').toISOString()
    }
  ];

  crops: Crop[] = [
    {
      id: 'crop-001',
      farm_id: 'farm-001',
      crop_name: 'Paddy / Rice',
      local_name: 'Nellu (CR-1009 Sub-1)',
      variety: 'CR-1009 Sub-1 (Flood Tolerant)',
      crop_category: 'Cereal / Grain',
      planting_date: '2026-07-20',
      expected_harvest_date: '2026-11-25',
      crop_stage: 'Tillering to Panicle Initiation',
      area_acres: 3.5,
      soil_type: 'Alluvial Loam',
      irrigation_method: 'Controlled Flooding / Alternate Wetting',
      health_status: 'HEALTHY',
      created_at: new Date('2026-07-20T00:00:00Z').toISOString()
    },
    {
      id: 'crop-002',
      farm_id: 'farm-001',
      crop_name: 'Black Gram (Urad)',
      local_name: 'Vamban-8',
      variety: 'Vamban-8 High Protein',
      crop_category: 'Pulses',
      planting_date: '2026-08-10',
      expected_harvest_date: '2026-10-30',
      crop_stage: 'Pod Formation',
      area_acres: 1.0,
      soil_type: 'Alluvial Loam',
      irrigation_method: 'Sprinkler',
      health_status: 'MODERATE',
      created_at: new Date('2026-08-10T00:00:00Z').toISOString()
    },
    {
      id: 'crop-003',
      farm_id: 'farm-002',
      crop_name: 'Tomato',
      local_name: 'Thakkali (Shivam F1)',
      variety: 'Shivam F1 Hybrid',
      crop_category: 'Vegetables',
      planting_date: '2026-08-01',
      expected_harvest_date: '2026-10-20',
      crop_stage: 'Flowering and Fruit Setting',
      area_acres: 2.0,
      soil_type: 'Red Sandy Loam',
      irrigation_method: 'Drip Fertigation',
      health_status: 'ATTENTION_NEEDED',
      created_at: new Date('2026-08-01T00:00:00Z').toISOString()
    }
  ];

  finances: FarmFinances[] = [
    {
      id: 'fin-001',
      farm_id: 'farm-001',
      cultivation_investment: 68500,
      land_rent: 0,
      lease_cost: 0,
      loan_amount: 45000,
      loan_provider: 'Primary Agricultural Co-op Society (PACS)',
      loan_interest_rate: 4.0, // Subsidized KCC rate
      monthly_repayment: 3750,
      repayment_date: '2026-11-30',
      expected_harvest_value: 145000,
      expected_income: 76500,
      current_income: 12000,
      insurance_status: 'ACTIVE',
      insurance_provider: 'PMFBY (Agriculture Insurance Co of India)',
      insurance_policy_number: 'PMFBY-TN-2026-884102',
      other_expenses: 5200
    },
    {
      id: 'fin-002',
      farm_id: 'farm-002',
      cultivation_investment: 92000,
      land_rent: 0,
      lease_cost: 24000,
      loan_amount: 60000,
      loan_provider: 'Gramin Rural Bank KCC',
      loan_interest_rate: 7.0,
      monthly_repayment: 5200,
      repayment_date: '2026-10-28',
      expected_harvest_value: 190000,
      expected_income: 74000,
      current_income: 18000,
      insurance_status: 'ACTIVE',
      insurance_provider: 'PMFBY Horticultural Cluster',
      insurance_policy_number: 'PMFBY-KA-2026-302914',
      other_expenses: 8500
    }
  ];

  expenses: Expense[] = [
    {
      id: 'exp-001',
      farm_id: 'farm-001',
      category: 'SEEDS',
      description: 'CR-1009 Certified Foundation Paddy Seeds (70 kg)',
      amount: 4900,
      expense_date: '2026-07-18',
      created_at: '2026-07-18T10:00:00Z'
    },
    {
      id: 'exp-002',
      farm_id: 'farm-001',
      category: 'FERTILIZER',
      description: 'Neem-coated Urea & Potash basal dose',
      amount: 8600,
      expense_date: '2026-08-05',
      created_at: '2026-08-05T09:30:00Z'
    },
    {
      id: 'exp-003',
      farm_id: 'farm-001',
      category: 'LABOUR',
      description: 'Transplanting & field bund preparation (8 workers)',
      amount: 14400,
      expense_date: '2026-07-26',
      created_at: '2026-07-26T17:00:00Z'
    }
  ];

  income: Income[] = [
    {
      id: 'inc-001',
      farm_id: 'farm-001',
      source: 'Direct Intercrop Pulse Sale',
      amount: 12000,
      income_date: '2026-09-02',
      crop_id: 'crop-002',
      description: 'Green gram first pickings sold to Thanjavur Organic FPO',
      created_at: '2026-09-02T14:00:00Z'
    }
  ];

  marketPrices: MarketPrice[] = [
    {
      id: 'mp-001',
      crop: 'Paddy / Rice',
      commodity: 'Paddy Fine (CR-1009)',
      market_name: 'Thanjavur Regulated Market',
      district: 'Thanjavur',
      state: 'Tamil Nadu',
      min_price: 2320,
      modal_price: 2480,
      max_price: 2600,
      unit: 'Quintal (100 kg)',
      yesterday_price: 2410,
      trend_percentage: 2.9,
      trend_direction: 'UP',
      updated_at: '2026-09-24T08:15:00Z',
      source: 'e-NAM & TN Agri Marketing Board'
    },
    {
      id: 'mp-002',
      crop: 'Tomato',
      commodity: 'Hybrid Tomato Grade-A',
      market_name: 'Kolar APMC Yard',
      district: 'Kolar',
      state: 'Karnataka',
      min_price: 28,
      modal_price: 34,
      max_price: 42,
      unit: 'kg',
      yesterday_price: 31,
      trend_percentage: 9.6,
      trend_direction: 'UP',
      updated_at: '2026-09-24T07:45:00Z',
      source: 'e-NAM / Agmarknet'
    },
    {
      id: 'mp-003',
      crop: 'Black Gram (Urad)',
      commodity: 'Urad Whole Black',
      market_name: 'Kumbakonam Mandi',
      district: 'Thanjavur',
      state: 'Tamil Nadu',
      min_price: 7600,
      modal_price: 8100,
      max_price: 8450,
      unit: 'Quintal (100 kg)',
      yesterday_price: 8150,
      trend_percentage: -0.6,
      trend_direction: 'STABLE',
      updated_at: '2026-09-24T09:00:00Z',
      source: 'e-NAM National Portal'
    },
    {
      id: 'mp-004',
      crop: 'Green Chilli',
      commodity: 'G-4 Green Chilli',
      market_name: 'Guntur Mirchi Yard',
      district: 'Guntur',
      state: 'Andhra Pradesh',
      min_price: 45,
      modal_price: 52,
      max_price: 60,
      unit: 'kg',
      yesterday_price: 50,
      trend_percentage: 4.0,
      trend_direction: 'UP',
      updated_at: '2026-09-24T08:30:00Z',
      source: 'AP State Agricultural Marketing'
    }
  ];

  listings: ProductListing[] = [
    {
      id: 'list-001',
      farmer_id: 'usr-001',
      farmer_name: 'M. Selvam',
      crop_name: 'Tomato (Shivam F1)',
      variety: 'Shivam F1 Firm Round',
      quantity: 1200,
      unit: 'kg',
      expected_price: 33,
      harvest_date: '2026-09-28',
      location: 'Kolar Valley Farm Gate',
      quality_grade: 'Grade-A Export Quality',
      delivery_preference: 'Farm Gate Pickup preferred / Transport on cost sharing',
      status: 'ACTIVE',
      created_at: '2026-09-23T11:00:00Z'
    },
    {
      id: 'list-002',
      farmer_id: 'usr-001',
      farmer_name: 'M. Selvam',
      crop_name: 'Black Gram (Vamban-8)',
      variety: 'Vamban-8 Unpolished',
      quantity: 450,
      unit: 'kg',
      expected_price: 84,
      harvest_date: '2026-10-15',
      location: 'Ammapettai, Thanjavur',
      quality_grade: 'Grade-A Cleaned & Dried (11% moisture)',
      delivery_preference: 'Ex-Farm or nearby Taluk delivery',
      status: 'OFFERS_RECEIVED',
      created_at: '2026-09-21T15:30:00Z'
    }
  ];

  buyers: BuyerProfile[] = [
    {
      id: 'buyer-001',
      business_name: 'FreshDirect Bengaluru Retail Supply',
      buyer_type: 'RETAILER',
      location: 'KR Puram / Whitefield Hub, Bengaluru',
      distance_km: 42,
      crop_required: 'Tomato (Grade A/B)',
      quantity_required: '1,500 - 3,000 kg / week',
      offered_price_range: '₹32 - ₹36 / kg',
      verification_status: 'VERIFIED',
      contact_number: '+91 80 2841 9000',
      pickup_available: true
    },
    {
      id: 'buyer-002',
      business_name: 'Thanjavur Cauvery Farmers Producer Co. (FPO)',
      buyer_type: 'FPO',
      location: 'Thanjavur Town Central Godown',
      distance_km: 14,
      crop_required: 'Paddy / Black Gram / Pulses',
      quantity_required: '50 - 200 Quintals',
      offered_price_range: '₹8,100 - ₹8,300 / Quintal (Urad)',
      verification_status: 'VERIFIED',
      contact_number: '+91 4362 271200',
      pickup_available: true
    },
    {
      id: 'buyer-003',
      business_name: 'Annapoorna Food Processing Corp',
      buyer_type: 'FOOD_PROCESSOR',
      location: 'Hosur SIPCOT Industrial Area',
      distance_km: 78,
      crop_required: 'Tomato for pureeing',
      quantity_required: '5,000 kg bulk lots',
      offered_price_range: '₹28 - ₹31 / kg (Assorted grade)',
      verification_status: 'VERIFIED',
      contact_number: '+91 4344 260550',
      pickup_available: true
    }
  ];

  sosContacts: SOSContact[] = [
    {
      id: 'sos-001',
      name: 'PMFBY Krishi Rakshak Helpline',
      department: 'Ministry of Agriculture & Farmers Welfare, GoI',
      category: 'INSURANCE',
      phone_number: '14447',
      state: 'National',
      district: 'All Districts',
      language: 'Tamil, Telugu, Kannada, Malayalam, Hindi, English',
      description: 'Official centralized toll-free portal to report localized crop loss within 72 hours of peril and escalate pending claim grievances.',
      source_url: 'https://pmfby.gov.in',
      is_verified: true,
      last_verified_at: '2026-09-24T00:00:00Z'
    },
    {
      id: 'sos-002',
      name: 'Kisan Call Centre (KCC)',
      department: 'Department of Agriculture & Farmers Empowerment',
      category: 'AGRI_OFFICER',
      phone_number: '18001801551',
      state: 'National',
      district: 'All Districts',
      language: 'Regional Language Experts Available 6 AM - 10 PM',
      description: 'Toll-free agricultural query helpline staffed by agricultural scientists and extension officers for instant pest, disease, and weather advice.',
      source_url: 'https://daccfw.gov.in',
      is_verified: true,
      last_verified_at: '2026-09-24T00:00:00Z'
    },
    {
      id: 'sos-003',
      name: 'District Joint Director of Agriculture (JDA)',
      department: 'State Agriculture Department',
      category: 'AGRI_OFFICER',
      phone_number: '04362230140',
      state: 'Tamil Nadu',
      district: 'Thanjavur',
      language: 'Tamil, English',
      description: 'Official district agricultural collectorate desk for input subsidization, calamity survey, and scheme verification.',
      source_url: 'https://agritech.tnau.ac.in',
      is_verified: true,
      last_verified_at: '2026-09-20T00:00:00Z'
    },
    {
      id: 'sos-004',
      name: 'State Disaster Management Authority (SEOC)',
      department: 'Revenue & Disaster Management',
      category: 'EMERGENCY',
      phone_number: '1070',
      state: 'State Emergency Operation Centre',
      district: 'All Districts',
      language: 'Regional Language & English',
      description: 'Emergency response coordinator for severe cyclone, cloudburst, river flooding, and immediate field rescue.',
      source_url: 'https://ndma.gov.in',
      is_verified: true,
      last_verified_at: '2026-09-22T00:00:00Z'
    }
  ];

  notifications: NotificationItem[] = [
    {
      id: 'notif-001',
      type: 'WEATHER',
      title: 'IMD Coastal Warning: Heavy Showers Predicted',
      message: 'Delta region is expected to receive 35-50 mm rainfall over next 48h. Clear field drainage canals to prevent root waterlogging.',
      severity: 'HIGH',
      source: 'India Meteorological Department (IMD)',
      is_read: false,
      created_at: new Date(Date.now() - 3600000).toISOString()
    },
    {
      id: 'notif-002',
      type: 'MARKET',
      title: 'Direct Buyer Demand Surge: Tomato +9.6%',
      message: 'Bengaluru and Chennai wholesale markets report high demand. Kolar modal price increased to ₹34/kg.',
      severity: 'MEDIUM',
      source: 'e-NAM Agricultural Marketing',
      is_read: false,
      created_at: new Date(Date.now() - 14400000).toISOString()
    },
    {
      id: 'notif-003',
      type: 'DISEASE',
      title: 'Foliar Early Blight Advisory',
      message: 'High humidity (82%) increases fungal spore risk in solanaceous crops. Inspect lower tomato leaves for concentric brown rings.',
      severity: 'MEDIUM',
      source: 'TNAU & ICAR Plant Protection Bureau',
      is_read: false,
      created_at: new Date(Date.now() - 86400000).toISOString()
    }
  ];

  schemes: GovernmentScheme[] = [
    {
      id: 'sch-001',
      scheme_name: 'Pradhan Mantri Fasal Bima Yojana (PMFBY)',
      description: 'Comprehensive risk insurance covering non-preventable natural risks from pre-sowing to post-harvest.',
      eligibility: 'All farmers cultivating notified crops in notified areas, including sharecroppers and tenant farmers.',
      benefits: 'Full sum insured coverage with farmer premium capped at 1.5% for Rabi, 2% for Kharif, 5% for horticultural crops.',
      application_process: 'Enroll via Samriddhi portal / Bank / CSC within crop cut-off date. File loss intimation within 72 hours.',
      state: 'National',
      source_url: 'https://pmfby.gov.in',
      last_verified_at: '2026-09-20'
    },
    {
      id: 'sch-002',
      scheme_name: 'PM-KISAN Samman Nidhi',
      description: 'Direct income support of ₹6,000 per year in three equal installments to small and marginal farmer families.',
      eligibility: 'All landholding farmer families with cultivable land.',
      benefits: '₹2,000 direct bank transfer every 4 months directly through DBT.',
      application_process: 'Apply online on pmkisan.gov.in or via local village revenue officer / VRO.',
      state: 'National',
      source_url: 'https://pmkisan.gov.in',
      last_verified_at: '2026-09-18'
    }
  ];

  auditLogs: AuditLog[] = [
    {
      id: 'aud-001',
      timestamp: new Date('2026-09-24T08:00:00Z').toISOString(),
      action: 'RISK_CALCULATION',
      user_id: 'usr-001',
      details: 'Calculated composite farm risk: 34% (MODERATE) based on IMD rainfall forecast and PACS debt load.'
    },
    {
      id: 'aud-002',
      timestamp: new Date('2026-09-24T07:45:00Z').toISOString(),
      action: 'MARKET_CACHE_REFRESH',
      user_id: 'system',
      details: 'Synchronized modal mandi benchmarks from e-NAM for Thanjavur and Kolar APMCs.'
    }
  ];

  dataSources: DataSource[] = [
    {
      id: 'src-001',
      name: 'India Meteorological Department (IMD)',
      type: 'Weather & Agromet Advisory',
      url: 'https://mausam.imd.gov.in',
      description: 'Official weather forecasts, radar imagery and district agromet bulletins.',
      status: 'OPERATIONAL',
      last_checked: '2026-09-24T08:00:00Z'
    },
    {
      id: 'src-002',
      name: 'National Agriculture Market (e-NAM)',
      type: 'Wholesale Mandi Prices',
      url: 'https://enam.gov.in',
      description: 'Pan-India electronic trading portal integrating agricultural markets.',
      status: 'OPERATIONAL',
      last_checked: '2026-09-24T07:30:00Z'
    },
    {
      id: 'src-003',
      name: 'Pradhan Mantri Fasal Bima Yojana (PMFBY)',
      type: 'Official Crop Insurance Portal',
      url: 'https://pmfby.gov.in',
      description: 'Centralized crop loss reporting, claim tracking and Krishi Rakshak 14447 helpline.',
      status: 'OPERATIONAL',
      last_checked: '2026-09-24T00:00:00Z'
    },
    {
      id: 'src-004',
      name: 'ICAR & State Agricultural Universities',
      type: 'Agronomic Research & Advisory',
      url: 'https://icar.org.in',
      description: 'Scientific crop management protocols, IPM packages and plant disease guidelines.',
      status: 'OPERATIONAL',
      last_checked: '2026-09-22T00:00:00Z'
    }
  ];

  recentScans: CropScanResult[] = [
    {
      id: 'scan-001',
      timestamp: '2026-09-23T16:20:00Z',
      crop_detected: 'Tomato (Solanum lycopersicum)',
      possible_problem: 'Early Blight (Alternaria solani)',
      problem_type: 'DISEASE',
      confidence_percentage: 87,
      severity: 'MODERATE',
      symptoms: [
        'Concentric brown circular spots with yellow halo on lower older foliage',
        'Slight leaf margin curling and gradual chlorosis'
      ],
      possible_causes: [
        'Prolonged leaf wetness due to high morning dew (>80% humidity)',
        'Dense canopy spacing restricting wind aeration between plant rows'
      ],
      suggested_actions: {
        immediate: 'Prune the lowest infected leaves touching the soil and avoid overhead sprinkler watering.',
        organic: [
          'Spray Pseudomonas fluorescens @ 5g/liter of water at morning hours',
          'Apply 5% Neem seed kernel extract (NSKE) as protective barrier'
        ],
        chemical: [
          'If lesion count exceeds 3 per plant: Copper oxychloride 50% WP @ 2.5g/liter or Mancozeb 75% WP @ 2g/liter'
        ]
      },
      prevention: [
        'Maintain 60cm x 45cm row spacing for adequate air circulation',
        'Apply straw or silver-black mulch to prevent soil-splashing during rains'
      ],
      scientific_disclaimer: 'Possible diagnosis based on visual botanical pattern recognition. Decision support only.',
      source: 'FARMZEN Plant Diagnostic Engine & TNAU Agronomy Protocol'
    }
  ];

  // Farm Risk Engine
  calculateFarmRisk(farmId: string): ShieldRiskOverview {
    const farm = this.farms.find(f => f.id === farmId) || this.farms[0];
    const crop = this.crops.find(c => c.farm_id === farm.id) || this.crops[0];
    const fin = this.finances.find(f => f.farm_id === farm.id) || this.finances[0];

    // Calculate realistic component scores (0 - 100)
    const weatherScore = 42; // rain coming in 48h
    const cropHealthScore = crop.health_status === 'HEALTHY' ? 18 : crop.health_status === 'MODERATE' ? 38 : 55;
    const diseaseScore = 48; // moderate fungal pressure due to humidity
    const pestScore = 24; // low pest activity observed
    const waterScore = 20; // canal & drip working well
    const marketScore = 30; // positive trend in tomato/paddy
    const debtRatio = (fin.loan_amount / Math.max(fin.expected_harvest_value, 1)) * 100;
    const financeScore = Math.min(Math.round(debtRatio * 0.8), 75);

    // Weighted composite risk
    const compositeScore = Math.round(
      (weatherScore * 0.22) +
      (cropHealthScore * 0.18) +
      (diseaseScore * 0.15) +
      (pestScore * 0.10) +
      (waterScore * 0.10) +
      (marketScore * 0.10) +
      (financeScore * 0.15)
    ); // around 34%

    const riskLevel: 'LOW' | 'MODERATE' | 'HIGH' | 'CRITICAL' =
      compositeScore < 25 ? 'LOW' : compositeScore < 50 ? 'MODERATE' : compositeScore < 75 ? 'HIGH' : 'CRITICAL';

    return {
      overall_score: compositeScore, // 34%
      risk_level: riskLevel,
      summary: `Your farm is under ${riskLevel} protective risk (34%). Weather showers and disease pressure require light field drainage attention, while debt exposure is cushioned by active PMFBY insurance.`,
      categories: {
        weather: {
          name: 'Weather Impact',
          score: weatherScore,
          status: 'MODERATE',
          description: 'Rainfall expected in next 48h (35-50 mm).',
          impact: 'Possible water accumulation in low-lying bunds.',
          suggested_action: 'Ensure drain ditches are unblocked before showers begin.'
        },
        crop_health: {
          name: 'Crop Vigor',
          score: cropHealthScore,
          status: cropHealthScore < 30 ? 'LOW' : 'MODERATE',
          description: `Crop currently in ${crop.crop_stage}.`,
          impact: 'Active vegetative and panicle formation requiring steady micronutrients.',
          suggested_action: 'Maintain regular field scouting.'
        },
        disease: {
          name: 'Disease Pressure',
          score: diseaseScore,
          status: 'MODERATE',
          description: 'High relative humidity (82%) favors fungal spore germination.',
          impact: 'Risk of early blight or leaf spot on vulnerable varieties.',
          suggested_action: 'Apply preventive bio-formulation (Pseudomonas) or ensure foliage aeration.'
        },
        pest: {
          name: 'Pest Activity',
          score: pestScore,
          status: 'LOW',
          description: 'Minimal stem borer or sucking pest populations recorded.',
          impact: 'No immediate chemical intervention threshold reached.',
          suggested_action: 'Deploy yellow sticky traps as early sentinel monitoring.'
        },
        water: {
          name: 'Irrigation Balance',
          score: waterScore,
          status: 'LOW',
          description: 'Adequate soil moisture from recent canal releases.',
          impact: 'Irrigation can be temporarily deferred.',
          suggested_action: 'Hold irrigation for 24-36h to save pumping energy.'
        },
        market: {
          name: 'Market Price Stability',
          score: marketScore,
          status: 'LOW',
          description: 'Mandi prices trending +2.9% to +9.6% above baseline.',
          impact: 'Favorable wholesale harvest realization window.',
          suggested_action: 'Explore direct listing on FarmZen Direct for farmgate pickup.'
        },
        finance: {
          name: 'Financial Exposure',
          score: financeScore,
          status: 'MODERATE',
          description: `Loan obligation of ₹${fin.loan_amount.toLocaleString('en-IN')} against projected ₹${fin.expected_harvest_value.toLocaleString('en-IN')}.`,
          impact: 'Repayment buffer is 2.1x harvest income.',
          suggested_action: 'Active PMFBY policy safeguards against catastrophic crop-loss default.'
        }
      },
      key_alerts: [
        {
          id: 'alt-01',
          type: 'WEATHER + CROP RISK',
          title: 'IMD Rain Advisory during Panicle / Flowering Stage',
          message: 'Heavy rain is expected in Thanjavur / Delta belt over next 48h. Waterlogging may weaken root aeration.',
          severity: 'WARNING',
          action: 'Check drainage channels and postpone spray operations until dry interval.',
          source: 'India Meteorological Department (IMD) Agromet'
        },
        {
          id: 'alt-02',
          type: 'FINANCIAL RISK',
          title: 'KCC Loan Repayment Window in 66 Days',
          message: `PACS loan of ₹${fin.loan_amount.toLocaleString('en-IN')} due by ${fin.repayment_date}.`,
          severity: 'INFO',
          action: 'Projected net profit of ₹76,500 ensures full repayment clearance.',
          source: 'FarmZen Financial Engine'
        }
      ]
    };
  }

  // What-If Crop Loss Simulator
  simulateCropLoss(farmId: string, lossPercentage: number): WhatIfSimulation {
    const fin = this.finances.find(f => f.farm_id === farmId) || this.finances[0];
    const originalExpectedIncome = fin.expected_harvest_value;
    const actualLossRatio = Math.max(0, Math.min(100, lossPercentage)) / 100;

    const projectedIncome = Math.round(originalExpectedIncome * (1 - actualLossRatio));
    const estimatedLoss = originalExpectedIncome - projectedIncome;
    const totalExpenditure = fin.cultivation_investment + fin.lease_cost + fin.land_rent + fin.loan_amount;
    const financialGap = Math.max(0, totalExpenditure - projectedIncome);

    let loanRisk = 'Safe — Covered by harvest receipts';
    if (lossPercentage >= 50) {
      loanRisk = 'High Exposure — Requires PMFBY Insurance Claim or Restructuring';
    } else if (lossPercentage >= 25) {
      loanRisk = 'Tight Margin — Requires secondary crop proceeds';
    }

    return {
      loss_percentage: lossPercentage,
      original_expected_income: originalExpectedIncome,
      projected_income: projectedIncome,
      estimated_loss: estimatedLoss,
      investment_exposure: totalExpenditure,
      financial_gap: financialGap,
      loan_repayment_risk: loanRisk,
      recommended_recovery_routes: [
        {
          name: 'PMFBY Crop Insurance Localized Loss Claim',
          description: 'Under PMFBY, localized calamities (hailstorm, landslide, inundation, cloudburst) qualify for immediate on-field survey within 72 hours of damage.',
          potential_relief: `Estimated claim relief: Up to ₹${Math.round(estimatedLoss * 0.85).toLocaleString('en-IN')}`,
          action_step: 'Call official PMFBY Krishi Rakshak 14447 or log grievance within 72 hours on National Crop Insurance Portal.',
          source: 'PMFBY Operational Guidelines'
        },
        {
          name: 'State Calamity Agriculture Input Subsidy',
          description: 'State Disaster Response Fund (SDRF) provides input subsidy for crop loss exceeding 33% due to natural flood or drought.',
          potential_relief: '₹8,500 to ₹17,000 per hectare for irrigated land',
          action_step: 'Submit Joint Verification form through Village Administrative Officer (VAO) / Revenue Inspector.',
          source: 'Ministry of Home Affairs / State Disaster Management'
        },
        {
          name: 'Alternative Short-Duration Relay Crop',
          description: 'If early season loss occurs, replant fast-maturing pulse (Green gram/Black gram 65-day cycle) or fodder crop to recover cultivation costs.',
          potential_relief: 'Estimated net recovery: ₹25,000 - ₹35,000 / acre in 65 days',
          action_step: 'Procure certified seed from local Agricultural Extension Centre (AEC).',
          source: 'ICAR Regional Krishi Vigyan Kendra'
        },
        {
          name: 'Direct Produce Value-Add & Sorting',
          description: 'Sort undamaged harvest into Grade-A (direct restaurant/retail) and Grade-B (food processors) on FarmZen Direct to maximize revenue per kg.',
          potential_relief: 'Recovers 12-18% higher price compared to distressed village distress sale',
          action_step: 'List sorted produce on FarmZen Direct to notify nearby verified bulk processors.',
          source: 'FarmZen Direct Marketplace'
        }
      ]
    };
  }

  // Weather service with IMD-grade data
  getWeatherForFarm(farmId: string): WeatherData {
    return {
      temperature: 31,
      feels_like: 34,
      humidity: 78,
      rainfall_mm: 12.4,
      rain_probability: 65,
      wind_speed: 16,
      wind_direction: 'SW (South-West Monsoon)',
      cloud_cover: 72,
      condition: 'Scattered Thunderstorms Possible',
      icon: 'cloud-rain',
      sunrise: '06:05 AM',
      sunset: '06:14 PM',
      uv_index: 6,
      source: 'India Meteorological Department (IMD) Agromet Service',
      updated_at: new Date().toISOString(),
      soil_advice: 'Topsoil moisture is currently adequate (68%). Defer canal irrigation for 24-36 hours due to expected incoming showers.',
      hourly_forecast: [
        { time: '09:00', temp: 29, rain_chance: 30, condition: 'Partly Cloudy' },
        { time: '12:00', temp: 32, rain_chance: 45, condition: 'Cloudy with Sun' },
        { time: '15:00', temp: 31, rain_chance: 70, condition: 'Thunderstorm Expected' },
        { time: '18:00', temp: 28, rain_chance: 60, condition: 'Light Showers' },
        { time: '21:00', temp: 26, rain_chance: 35, condition: 'Overcast' }
      ],
      daily_forecast: [
        { day: 'Today', date: '24 Sep', max_temp: 32, min_temp: 25, rain_chance: 65, condition: 'Thunderstorms', rainfall_est_mm: 18 },
        { day: 'Fri', date: '25 Sep', max_temp: 30, min_temp: 24, rain_chance: 80, condition: 'Heavy Showers', rainfall_est_mm: 35 },
        { day: 'Sat', date: '26 Sep', max_temp: 31, min_temp: 24, rain_chance: 50, condition: 'Passing Showers', rainfall_est_mm: 10 },
        { day: 'Sun', date: '27 Sep', max_temp: 33, min_temp: 25, rain_chance: 20, condition: 'Partly Sunny', rainfall_est_mm: 2 },
        { day: 'Mon', date: '28 Sep', max_temp: 34, min_temp: 25, rain_chance: 15, condition: 'Clear Sky', rainfall_est_mm: 0 },
        { day: 'Tue', date: '29 Sep', max_temp: 33, min_temp: 24, rain_chance: 25, condition: 'Fair Weather', rainfall_est_mm: 0 },
        { day: 'Wed', date: '30 Sep', max_temp: 32, min_temp: 24, rain_chance: 40, condition: 'Afternoon Rain', rainfall_est_mm: 8 }
      ]
    };
  }

  getFarmAdvisories(farmId: string): FarmAdvisory[] {
    return [
      {
        id: 'adv-001',
        condition: 'Rainfall Expected (35-50 mm in 48h)',
        farm_impact: 'Temporary saturation of upper 15 cm soil layer. Fertilizer broadcast now would wash off.',
        action_required: 'Postpone Urea or DAP top-dressing until showers conclude. Clean drainage bunds.',
        urgency: 'HIGH',
        crop_target: 'Paddy & Vegetables',
        source: 'IMD Agromet Field Station, Tamil Nadu Agricultural University (TNAU)'
      },
      {
        id: 'adv-002',
        condition: 'High Night Humidity (82-90%)',
        farm_impact: 'Favors leaf sheath blight and foliar leaf spot incubation.',
        action_required: 'Scout lower leaf sheaths. If spots appear, prepare biological spray of Trichoderma harzianum.',
        urgency: 'MEDIUM',
        crop_target: 'All Crops',
        source: 'ICAR Central Rice Research Institute'
      },
      {
        id: 'adv-003',
        condition: 'Moderate Wind (16-22 km/h SW)',
        farm_impact: 'Fine pesticide spray droplets may drift away from target foliage.',
        action_required: 'Avoid knapsack spraying during peak afternoon wind (1:00 PM to 4:30 PM). Spray in calm early morning.',
        urgency: 'NORMAL',
        crop_target: 'Tomato & Vegetables',
        source: 'Department of Agricultural Engineering'
      }
    ];
  }
}

export const db = new FarmZenDatabase();
