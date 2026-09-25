import { LanguageCode } from '../types';

export interface TranslationDict {
  brand: string;
  tagline: string;
  nav: {
    home: string;
    shield: string;
    weather: string;
    cropDoctor: string;
    ai: string;
    direct: string;
    sos: string;
    profile: string;
    notifications: string;
    admin: string;
    signOut: string;
  };
  pipeline: {
    step1: string;
    step2: string;
    step3: string;
  };
  common: {
    loading: string;
    save: string;
    cancel: string;
    submit: string;
    offlineMode: string;
    offlineNotice: string;
    synced: string;
    demoNotice: string;
    verified: string;
    officialSource: string;
    callNow: string;
    viewDetails: string;
    selectLanguage: string;
    change: string;
    active: string;
    switchFarm: string;
    next: string;
    back: string;
  };
  dashboard: {
    greeting: string;
    farmToday: string;
    todayBriefing: string;
    briefWeather: string;
    briefCrop: string;
    briefRisk: string;
    briefMarket: string;
    threeActionsTitle: string;
    action1Title: string;
    action1Desc: string;
    action2Title: string;
    action2Desc: string;
    action3Title: string;
    action3Desc: string;
    askAiHero: string;
    tapToSpeak: string;
    coreModulesTitle: string;
    coreModulesSubtitle: string;
    shieldTitle: string;
    shieldDesc: string;
    weatherTitle: string;
    weatherDesc: string;
    cropDoctorTitle: string;
    cropDoctorDesc: string;
    aiTitle: string;
    aiDesc: string;
    directTitle: string;
    directDesc: string;
  };
  shield: {
    title: string;
    subtitle: string;
    overallRisk: string;
    riskDescription: string;
    weatherRisk: string;
    cropHealthRisk: string;
    diseaseRisk: string;
    pestRisk: string;
    waterRisk: string;
    marketRisk: string;
    financeRisk: string;
    financialExposure: string;
    totalInvestment: string;
    expectedIncome: string;
    loanObligation: string;
    upcomingRepayment: string;
    insuranceCoverage: string;
    whatIfTitle: string;
    whatIfSubtitle: string;
    cropLossSlider: string;
    estimatedGap: string;
    recoveryRoutes: string;
    alertsTitle: string;
  };
  weather: {
    title: string;
    subtitle: string;
    selectLocation: string;
    useGps: string;
    advisoryTitle: string;
    hourlyForecast: string;
    sevenDayForecast: string;
    humidity: string;
    wind: string;
    rainChance: string;
    rainfall: string;
    soilImpact: string;
    todaySummary: string;
    meaningTitle: string;
  };
  cropDoctor: {
    title: string;
    subtitle: string;
    scanCrop: string;
    uploadPhoto: string;
    frameGuide: string;
    analyzing: string;
    possibleProblem: string;
    confidence: string;
    severity: string;
    symptoms: string;
    suggestedTreatments: string;
    organicApproach: string;
    chemicalOption: string;
    preventionTips: string;
    disclaimer: string;
    history: string;
  };
  ai: {
    title: string;
    subtitle: string;
    placeholder: string;
    send: string;
    tapToSpeak: string;
    listening: string;
    understanding: string;
    thinking: string;
    speaking: string;
    suggestedQuestions: string[];
    disclaimer: string;
  };
  direct: {
    title: string;
    subtitle: string;
    marketPrices: string;
    modalPrice: string;
    priceTrend: string;
    myListings: string;
    listProduceBtn: string;
    potentialBuyers: string;
    buyerOfferedPrice: string;
    quantityReq: string;
    createListingTitle: string;
    produceCrop: string;
    quantity: string;
    expectedRate: string;
  };
  sos: {
    title: string;
    subtitle: string;
    callWarning: string;
    cropInsuranceHelpline: string;
    kisanCallCenter: string;
    districtOfficer: string;
    emergencyAssistance: string;
  };
}

export const translations: Record<LanguageCode, TranslationDict> = {
  en: {
    brand: 'FARMZEN',
    tagline: 'Decide Better. Farm Smarter. Sell Better.',
    nav: {
      home: 'Home',
      shield: 'Shield',
      weather: 'Weather',
      cropDoctor: 'Crop Doctor',
      ai: 'FarmZen AI',
      direct: 'Direct Market',
      sos: 'Emergency SOS',
      profile: 'Farm Profile',
      notifications: 'Alerts',
      admin: 'Admin Console',
      signOut: 'Sign Out / Switch'
    },
    pipeline: {
      step1: 'WHAT YOU ENTER',
      step2: 'WHAT FARMZEN UNDERSTANDS',
      step3: 'WHAT FARMZEN RECOMMENDS'
    },
    common: {
      loading: 'Loading agricultural insights...',
      save: 'Save Changes',
      cancel: 'Cancel',
      submit: 'Confirm & Proceed',
      offlineMode: 'OFFLINE MODE',
      offlineNotice: 'Cached farm data is active. All supported tools remain available.',
      synced: 'All changes synchronized with server',
      demoNotice: 'Agricultural Decision Support Platform',
      verified: 'Verified Official Support',
      officialSource: 'Source',
      callNow: 'Call Direct',
      viewDetails: 'View Details',
      selectLanguage: 'Language / மொழி',
      change: 'Change',
      active: 'Active',
      switchFarm: 'Switch Farm',
      next: 'Next',
      back: 'Back'
    },
    dashboard: {
      greeting: 'Good Morning',
      farmToday: 'WHAT IS HAPPENING TO MY FARM TODAY?',
      todayBriefing: 'TODAY ON YOUR FARM',
      briefWeather: 'Weather',
      briefCrop: 'Crop Health',
      briefRisk: 'Risk Shield',
      briefMarket: 'Market Benchmark',
      threeActionsTitle: "TODAY'S 3 ACTIONS",
      action1Title: '1. Leaf Scouting',
      action1Desc: 'Check tomato leaves for yellowing or early concentric fungal spots due to morning humidity.',
      action2Title: '2. Drainage & Weather',
      action2Desc: 'Rain is expected tomorrow (35-50 mm showers). Defer today’s irrigation and inspect bund drains.',
      action3Title: '3. Market Price Review',
      action3Desc: 'Review today’s wholesale price (up +9.6% in nearby APMC) and check direct retail bulk buyer requests.',
      askAiHero: 'Ask FarmZen Anything',
      tapToSpeak: 'ASK FARMZEN 🎙',
      coreModulesTitle: 'CORE FARMZEN MODULES',
      coreModulesSubtitle: 'Click any module to open full interactive workspace',
      shieldTitle: '1. FARMZEN SHIELD',
      shieldDesc: 'Agricultural + financial risk protection. Monitor PACS loan against harvest realization with the What-If loss simulator.',
      weatherTitle: '2. FARMZEN WEATHER',
      weatherDesc: 'IMD-grounded forecasts, hourly progression, 7-day field calendar, and soil water retention guidance.',
      cropDoctorTitle: '3. FARMZEN CROP DOCTOR',
      cropDoctorDesc: 'Computer vision plant disease identification with organic bio-agents and approved chemical remedies.',
      aiTitle: '4. FARMZEN AI',
      aiDesc: '24/7 intelligent farming assistant supporting regional voice conversations and tailored farm context.',
      directTitle: '5. FARMZEN DIRECT',
      directDesc: 'Wholesale mandi benchmark rates, direct farmgate produce listings, and verified bulk buyer connections.'
    },
    shield: {
      title: 'FARMZEN SHIELD',
      subtitle: 'Protect your farm before risk becomes loss.',
      overallRisk: 'Overall Farm Risk',
      riskDescription: 'Composite score calculated from weather forecast, disease pressure, market trends & debt obligations.',
      weatherRisk: 'Weather Impact',
      cropHealthRisk: 'Plant Vigor',
      diseaseRisk: 'Disease Pressure',
      pestRisk: 'Pest Probability',
      waterRisk: 'Irrigation Balance',
      marketRisk: 'Price Volatility',
      financeRisk: 'Financial Exposure',
      financialExposure: 'Estimated Financial Position',
      totalInvestment: 'Cultivation Investment',
      expectedIncome: 'Projected Harvest Value',
      loanObligation: 'Active Debt Obligations',
      upcomingRepayment: 'Next Repayment Date',
      insuranceCoverage: 'PMFBY Crop Insurance',
      whatIfTitle: 'Interactive Crop-Loss What-If Simulator',
      whatIfSubtitle: 'Calculate financial exposure and pre-plan recovery if crop damage occurs',
      cropLossSlider: 'Simulate Crop Loss Percentage',
      estimatedGap: 'Projected Financial Deficit',
      recoveryRoutes: 'Actionable Recovery Pathways',
      alertsTitle: 'Active Shield Warnings'
    },
    weather: {
      title: 'FARMZEN WEATHER',
      subtitle: 'Weather Insights Grounded in Farm Impact & Agricultural Actions',
      selectLocation: 'Farm Location & Microclimate',
      useGps: 'Use Current GPS',
      advisoryTitle: 'Agronomic Farm Advisory',
      hourlyForecast: 'Hourly Weather Progression',
      sevenDayForecast: '7-Day Field Planning Forecast',
      humidity: 'Humidity',
      wind: 'Wind Speed',
      rainChance: 'Rain Probability',
      rainfall: 'Expected Rainfall',
      soilImpact: 'Soil Moisture & Field Advisory',
      todaySummary: 'Today Summary',
      meaningTitle: "WHAT DOES TODAY'S WEATHER MEAN FOR MY FARM?"
    },
    cropDoctor: {
      title: 'FARMZEN CROP DOCTOR',
      subtitle: 'Computer Vision & AI Leaf Health Diagnostic Engine',
      scanCrop: 'Scan My Crop',
      uploadPhoto: 'Upload Field Photo',
      frameGuide: 'Position the affected leaf or fruit inside the scanner frame under daylight.',
      analyzing: 'Scanning your crop & comparing agronomy knowledge...',
      possibleProblem: 'Possible Diagnosis',
      confidence: 'Confidence Score',
      severity: 'Severity Level',
      symptoms: 'Observed Field Symptoms',
      suggestedTreatments: 'Recommended Field Action',
      organicApproach: 'Eco-Friendly & Organic Solution',
      chemicalOption: 'Approved Chemical Treatment (If Necessary)',
      preventionTips: 'Preventive Measures for Next Phase',
      disclaimer: 'Decision support estimate. For severe outbreaks, verify with local Agriculture Officer.',
      history: 'Recent Diagnostic Scans'
    },
    ai: {
      title: 'FARMZEN AI ASSISTANT',
      subtitle: 'Your intelligent farming assistant with text, voice and farm context.',
      placeholder: 'Ask about fertilizer, pests, rainfall, market rates or financial advice...',
      send: 'Ask',
      tapToSpeak: 'Tap to Speak',
      listening: 'Listening to your voice...',
      understanding: 'Understanding agricultural query...',
      thinking: 'Consulting agronomy models & farm context...',
      speaking: 'Responding in your language...',
      suggestedQuestions: [
        'Will rain affect my tomato crop this week?',
        'What fertilizer should I apply at flowering stage?',
        'What is today’s modal price for tomatoes in nearby mandi?',
        'How do I file a PMFBY crop loss claim within 72 hours?'
      ],
      disclaimer: 'FarmZen provides agricultural guidance based on scientific advisories and your farm data.'
    },
    direct: {
      title: 'FARMZEN DIRECT',
      subtitle: 'Know the market. Find opportunities. Sell smarter.',
      marketPrices: 'Live Mandi Market Benchmark',
      modalPrice: 'Modal Price',
      priceTrend: 'Weekly Trend',
      myListings: 'My Produce Listings',
      listProduceBtn: '+ List Harvest for Sale',
      potentialBuyers: 'Verified Direct Buyers Looking for Produce',
      buyerOfferedPrice: 'Offered Price',
      quantityReq: 'Required Quantity',
      createListingTitle: 'Create Direct Produce Listing',
      produceCrop: 'Crop / Commodity',
      quantity: 'Quantity Available',
      expectedRate: 'Expected Price per kg/quintal'
    },
    sos: {
      title: 'FARMZEN SOS',
      subtitle: 'Verified Agricultural Emergency, Crop Loss & Officer Helplines',
      callWarning: 'Direct connection to verified government and institutional helplines.',
      cropInsuranceHelpline: 'PMFBY Krishi Rakshak (Official 14447)',
      kisanCallCenter: 'Kisan Call Centre (Toll-Free 1800-180-1551)',
      districtOfficer: 'District Agriculture & Extension Officer',
      emergencyAssistance: 'State Disaster Management Agriculture Cell'
    }
  },

  ta: {
    brand: 'FARMZEN',
    tagline: 'சிறந்த முடிவு. அறிவார்ந்த விவசாயம். சிறந்த விற்பனை.',
    nav: {
      home: 'முகப்பு',
      shield: 'ஷீல்ட் பாதுகாப்பு',
      weather: 'வானிலை',
      cropDoctor: 'பயிர் மருத்துவர்',
      ai: 'ஃபாம்சென் AI',
      direct: 'நேரடி சந்தை',
      sos: 'அவசர உதவி SOS',
      profile: 'என் பண்ணை',
      notifications: 'எச்சரிக்கைகள்',
      admin: 'நிர்வாகம்',
      signOut: 'வெளியேறு / மாற்று'
    },
    pipeline: {
      step1: 'நீங்கள் உள்ளிடுவது',
      step2: 'ஃபாம்சென் அறிவது',
      step3: 'பரிந்துரைக்கப்படும் நடவடிக்கை'
    },
    common: {
      loading: 'விவசாய தகவல்கள் ஏற்றப்படுகின்றன...',
      save: 'சேமிக்க',
      cancel: 'ரத்து செய்',
      submit: 'உறுதிப்படுத்துக',
      offlineMode: 'ஆஃப்லைன் முறை',
      offlineNotice: 'சேமிக்கப்பட்ட பண்ணை தகவல்கள் பயன்பாட்டில் உள்ளன. இணையம் இன்றி இயங்கும்.',
      synced: 'அனைத்து விவரங்களும் சர்வரில் ஒத்திசைக்கப்பட்டன',
      demoNotice: 'விவசாய முடிவெடுக்கும் ஆதரவு தளம்',
      verified: 'சரிபார்க்கப்பட்ட அரசு ஆதரவு',
      officialSource: 'அரசு மூலம்',
      callNow: 'உடனே அழைக்க',
      viewDetails: 'விவரங்கள் பார்க்க',
      selectLanguage: 'மொழி / Language',
      change: 'மாற்று',
      active: 'செயலில்',
      switchFarm: 'பண்ணை மாற்று',
      next: 'அடுத்து',
      back: 'பின்னால்'
    },
    dashboard: {
      greeting: 'காலை வணக்கம்',
      farmToday: 'இன்று என் பண்ணையில் என்ன நடக்கிறது?',
      todayBriefing: 'இன்று உங்கள் பண்ணையில்',
      briefWeather: 'வானிலை',
      briefCrop: 'பயிர் நலம்',
      briefRisk: 'இடர் ஷீல்ட்',
      briefMarket: 'சந்தை நிலவரம்',
      threeActionsTitle: 'இன்றைய 3 முக்கிய விவசாய நடவடிக்கைகள்',
      action1Title: '1. இலை ஆய்வு',
      action1Desc: 'அதிகாலை ஈரப்பதம் காரணமாக தக்காளி கீழ் இலைகளில் மஞ்சள் நிறம் அல்லது கரும்புள்ளிகள் உள்ளதா என கண்காணிக்கவும்.',
      action2Title: '2. வடிகால் & மழை',
      action2Desc: 'நாளை 35-50 மி.மீ மழை எதிர்பார்க்கப்படுகிறது. இன்றைய பாசனத்தை தள்ளிவைத்து வடிகால் வாய்க்கால்களை சரிபார்க்கவும்.',
      action3Title: '3. சந்தை விலை மதிப்பாய்வு',
      action3Desc: 'அருகிலுள்ள மண்டி மொத்த விலை +9.6% உயர்ந்துள்ளது. நேரடி மொத்த கொள்முதல் கோரிக்கைகளை ஆராயவும்.',
      askAiHero: 'ஃபாம்சென் AI-யிடம் கேளுங்கள்',
      tapToSpeak: 'FARMZEN-ஐ கேளுங்கள் 🎙',
      coreModulesTitle: 'முக்கிய ஃபாம்சென் பிரிவுகள்',
      coreModulesSubtitle: 'முழுமையான பக்கத்தைத் திறக்க ஏதேனும் ஒரு பிரிவைத் தொடவும்',
      shieldTitle: '1. ஃபாம்சென் ஷீல்ட்',
      shieldDesc: 'விவசாய மற்றும் நிதிப் பாதுகாப்பு. பயிர் இழப்பு சிமுலேட்டர் மூலம் கடன் மற்றும் மகசூல் இடைவெளியை கண்காணிக்கவும்.',
      weatherTitle: '2. ஃபாம்சென் வானிலை',
      weatherDesc: 'இந்திய வானிலை ஆய்வு மைய முன்னறிவிப்பு, மணிநேர நிலவரம், 7-நாள் திட்டம் மற்றும் மண் பாசன ஆலோசனை.',
      cropDoctorTitle: '3. ஃபாம்சென் பயிர் மருத்துவர்',
      cropDoctorDesc: 'புகைப்படம் எடுத்து பயிர் இலை நோய்களைக் கண்டறிந்து இயற்கை மற்றும் பரிந்துரைக்கப்பட்ட மருந்துகளைப் பெறவும்.',
      aiTitle: '4. ஃபாம்சென் AI',
      aiDesc: '24/7 விவசாய உதவியாளர். பண்ணை சூழலை உணர்ந்து குரல் மற்றும் எழுத்து மூலம் தமிழில் பதிலளிக்கும்.',
      directTitle: '5. ஃபாம்சென் நேரடி சந்தை',
      directDesc: 'மண்டி விலை நிலவரம், இடைத்தரகரின்றி விளைபொருள் விற்பனை பதிவு மற்றும் சரிபார்க்கப்பட்ட மொத்த வாங்குபவர்கள்.'
    },
    shield: {
      title: 'ஃபாம்சென் ஷீல்ட்',
      subtitle: 'ஆபத்து நஷ்டமாக மாறுவதற்கு முன் உங்கள் பண்ணையைப் பாதுகாக்கவும்.',
      overallRisk: 'ஒட்டுமொத்த பண்ணை இடர்',
      riskDescription: 'வானிலை, பூச்சித் தாக்குதல், சந்தை மற்றும் கடன் சுமை அடிப்படையில் கணக்கிடப்பட்ட பாதுகாப்பு நிலை.',
      weatherRisk: 'வானிலை தாக்கம்',
      cropHealthRisk: 'பயிர் வீரியம்',
      diseaseRisk: 'நோய் தாக்குதல் இடர்',
      pestRisk: 'பூச்சி வாய்ப்பு',
      waterRisk: 'பாசன நிலை',
      marketRisk: 'விலை ஏற்ற இறக்கம்',
      financeRisk: 'நிதி இடர்நிலை',
      financialExposure: 'கணக்கிடப்பட்ட நிதி நிலைமை',
      totalInvestment: 'சாகுபடி முதலீடு',
      expectedIncome: 'எதிர்பார்க்கப்படும் மகசூல் மதிப்பு',
      loanObligation: 'கடன் பொறுப்பு',
      upcomingRepayment: 'அடுத்த தவணை தேதி',
      insuranceCoverage: 'பயிர் காப்பீடு PMFBY',
      whatIfTitle: 'பயிர் இழப்பு மாதிரி கால்குலேட்டர் (What-If)',
      whatIfSubtitle: 'பயிர் சேதம் ஏற்பட்டால் ஏற்படும் நிதி இடைவெளியை முன்கூட்டியே கணக்கிட்டு திட்டமிடுங்கள்',
      cropLossSlider: 'பயிர் இழப்பு சதவீதத்தை மாற்றவும்',
      estimatedGap: 'எதிர்பார்க்கப்படும் நிதி பற்றாக்குறை',
      recoveryRoutes: 'மீட்பு வழிகள் மற்றும் இழப்பீட்டு உதவிகள்',
      alertsTitle: 'முக்கிய ஷீல்ட் எச்சரிக்கைகள்'
    },
    weather: {
      title: 'ஃபாம்சென் வானிலை',
      subtitle: 'வானிலை மாற்றமும் உங்கள் பயிர்களுக்கான நேரடி கள ஆலோசனையும்',
      selectLocation: 'பண்ணை அமைவிடம்',
      useGps: 'தற்போதைய ஜிபிஎஸ் பயன்படுத்தவும்',
      advisoryTitle: 'விவசாயிகளுக்கு இன்றைய வானிலை ஆலோசனை',
      hourlyForecast: 'மணிநேர வானிலை',
      sevenDayForecast: '7-நாள் பண்ணை திட்டமிடல் முன்னறிவிப்பு',
      humidity: 'ஈரப்பதம்',
      wind: 'காற்றின் வேகம்',
      rainChance: 'மழை வாய்ப்பு',
      rainfall: 'எதிர்பார்க்கப்படும் மழை அளவு',
      soilImpact: 'மண் ஈரப்பதம் மற்றும் பாசன ஆலோசனை',
      todaySummary: 'இன்றைய சுருக்கம்',
      meaningTitle: 'இன்றைய வானிலை என் பண்ணைக்கு என்ன சொல்கிறது?'
    },
    cropDoctor: {
      title: 'ஃபாம்சென் பயிர் மருத்துவர்',
      subtitle: 'கேமரா ஸ்கேன் மூலம் பயிர் இலை நோய்களைக் கண்டறிதல்',
      scanCrop: 'பயிரை ஸ்கேன் செய் 📷',
      uploadPhoto: 'புகைப்படம் பதிவேற்று',
      frameGuide: 'பாதிக்கப்பட்ட இலையை நல்ல வெளிச்சத்தில் சட்டத்திற்குள் வைக்கவும்.',
      analyzing: 'உங்கள் பயிரை ஸ்கேன் செய்து விவசாய அறிவோடு ஒப்பிடுகிறது...',
      possibleProblem: 'சாத்தியமான பாதிப்பு',
      confidence: 'துல்லியம்',
      severity: 'தீவிரம்',
      symptoms: 'கண்டறியப்பட்ட அறிகுறிகள்',
      suggestedTreatments: 'பரிந்துரைக்கப்படும் நடவடிக்கைகள்',
      organicApproach: 'இயற்கை சூழல் முறை தீர்வு',
      chemicalOption: 'அங்கீகரிக்கப்பட்ட மருந்து (தேவையெனில்)',
      preventionTips: 'அடுத்த கட்ட தடுப்பு முறைகள்',
      disclaimer: 'இது ஒரு முடிவெடுக்கும் உதவி மட்டுமே. கடுமையான பாதிப்புக்கு உள்ளூர் வேளாண் அலுவலரை அணுகவும்.',
      history: 'முந்தைய ஸ்கேன் விவரங்கள்'
    },
    ai: {
      title: 'ஃபாம்சென் AI உதவியாளர்',
      subtitle: 'உங்கள் பண்ணைக்கான அறிவார்ந்த விவசாய வழிகாட்டி.',
      placeholder: 'உரம், நோய், மழை, சந்தை விலை அல்லது கடன் பற்றி கேளுங்கள்...',
      send: 'கேள்',
      tapToSpeak: 'பேச தட்டவும் 🎙',
      listening: 'கேட்கிறது...',
      understanding: 'கேள்வியைப் புரிந்து கொள்கிறது...',
      thinking: 'பண்ணை சூழலை ஆராய்கிறது...',
      speaking: 'தமிழில் பதிலளிக்கிறது...',
      suggestedQuestions: [
        'இந்த வாரம் மழை என் தக்காளி பயிரை பாதிக்குமா?',
        'பூக்கும் பருவத்தில் என்ன உரம் இட வேண்டும்?',
        'அருகிலுள்ள சந்தையில் தக்காளி இன்றைய சராசரி விலை என்ன?',
        'பயிர் சேதத்திற்கு PMFBY காப்பீட்டுக்கு 72 மணி நேரத்தில் எவ்வாறு மனு செய்வது?'
      ],
      disclaimer: 'அறிவியல் ஆய்வுகள் மற்றும் உங்கள் பண்ணைத் தரவுகளின் அடிப்படையில் AI வழிகாட்டுகிறது.'
    },
    direct: {
      title: 'ஃபாம்சென் நேரடி சந்தை',
      subtitle: 'சந்தையை அறிவோம். வாய்ப்புகளைக் காண்போம். புத்திசாலித்தனமாக விற்போம்.',
      marketPrices: 'மண்டி நேரடி விலை நிலவரம்',
      modalPrice: 'சராசரி விலை',
      priceTrend: 'வாராந்திர போக்கு',
      myListings: 'என் விளைபொருள் விற்பனை',
      listProduceBtn: '+ என் விளைச்சலை விற்க பதிவு செய்',
      potentialBuyers: 'கொள்முதல் செய்ய விரும்பும் சரிபார்க்கப்பட்ட வாங்குபவர்கள்',
      buyerOfferedPrice: 'வழங்கும் விலை',
      quantityReq: 'தேவைப்படும் அளவு',
      createListingTitle: 'புதிய விற்பனை பதிவு உருவாக்கு',
      produceCrop: 'பயிர் / விளைபொருள்',
      quantity: 'இருப்பு அளவு',
      expectedRate: 'எதிர்பார்க்கும் விலை (கிலோ/குவிண்டால்)'
    },
    sos: {
      title: 'ஃபாம்சென் அவசர உதவி SOS',
      subtitle: 'உறுதிப்படுத்தப்பட்ட அரசு விவசாய மற்றும் காப்பீட்டு உதவி எண்கள்',
      callWarning: 'அரசு மற்றும் விவசாய அதிகாரிகளுடன் நேரடி தொலைபேசி இணைப்பு.',
      cropInsuranceHelpline: 'PMFBY கிரிஷி ரக்ஷக் (அதிகாரப்பூர்வ 14447)',
      kisanCallCenter: 'கிசான் கால் சென்டர் (இலவச எண் 1800-180-1551)',
      districtOfficer: 'மாவட்ட வேளாண்மை அலுவலர்',
      emergencyAssistance: 'பேரிடர் மேலாண்மை விவசாய பிரிவு'
    }
  },

  hi: {
    brand: 'FARMZEN',
    tagline: 'सही निर्णय। समझदार खेती। बेहतर बिक्री।',
    nav: {
      home: 'होम',
      shield: 'शील्ड सुरक्षा',
      weather: 'मौसम',
      cropDoctor: 'फसल डॉक्टर',
      ai: 'फार्मज़ेन AI',
      direct: 'सीधा बाजार',
      sos: 'आपातकालीन सहायता',
      profile: 'मेरा खेत',
      notifications: 'अलर्ट',
      admin: 'प्रशासन',
      signOut: 'लॉगआउट / बदलें'
    },
    pipeline: {
      step1: 'आपकी प्रविष्टि (इनपुट)',
      step2: 'फार्मज़ेन का विश्लेषण',
      step3: 'अनुशंसित कृषि कार्य'
    },
    common: {
      loading: 'कृषि जानकारी लोड हो रही है...',
      save: 'सुरक्षित करें',
      cancel: 'रद्द करें',
      submit: 'पुष्टि करें',
      offlineMode: 'ऑफलाइन मोड',
      offlineNotice: 'सहेजी गई जानकारी उपलब्ध है। बिना इंटरनेट के भी उपयोग कर सकते हैं।',
      synced: 'सभी जानकारी सर्वर पर सिंक हो गई है',
      demoNotice: 'कृषि निर्णय सहायता प्रणाली',
      verified: 'सत्यापित सरकारी सहायता',
      officialSource: 'स्रोत',
      callNow: 'कॉल करें',
      viewDetails: 'विवरण देखें',
      selectLanguage: 'भाषा / Language',
      change: 'बदलें',
      active: 'सक्रिय',
      switchFarm: 'खेत बदलें',
      next: 'आगे',
      back: 'पीछे'
    },
    dashboard: {
      greeting: 'शुभ प्रभात',
      farmToday: 'आज मेरे खेत में क्या हो रहा है?',
      todayBriefing: 'आज आपके खेत में',
      briefWeather: 'मौसम',
      briefCrop: 'फसल स्वास्थ्य',
      briefRisk: 'जोखिम शील्ड',
      briefMarket: 'मंडी भाव',
      threeActionsTitle: 'आज के 3 मुख्य कृषि कार्य',
      action1Title: '1. पत्तियों का निरीक्षण',
      action1Desc: 'सुबह की नमी के कारण टमाटर की निचली पत्तियों पर पीलापन या धब्बे जांचें।',
      action2Title: '2. जल निकासी और मौसम',
      action2Desc: 'कल 35-50 मिमी वर्षा संभावित है। आज की सिंचाई टालें और मेड़ों की नालियां साफ करें।',
      action3Title: '3. मंडी भाव समीक्षा',
      action3Desc: 'नजदीकी मंडी में थोक भाव +9.6% बढ़ा है। सीधे खरीदारों की मांग देखें।',
      askAiHero: 'फार्मज़ेन AI से पूछें',
      tapToSpeak: 'फार्मज़ेन से पूछें 🎙',
      coreModulesTitle: 'मुख्य फार्मज़ेन प्रणालियां',
      coreModulesSubtitle: 'विस्तृत कार्यक्षेत्र खोलने के लिए किसी भी मॉड्यूल पर क्लिक करें',
      shieldTitle: '1. फार्मज़ेन शील्ड',
      shieldDesc: 'कृषि एवं वित्तीय सुरक्षा। फसल नुकसान सिम्युलेटर से संभावित घाटे और कर्ज जोखिम का आकलन करें।',
      weatherTitle: '2. फार्मज़ेन मौसम',
      weatherDesc: 'IMD मौसम पूर्वानुमान, घंटेवार रिपोर्ट, 7-दिवसीय योजना और मिट्टी नमी परामर्श।',
      cropDoctorTitle: '3. फार्मज़ेन फसल डॉक्टर',
      cropDoctorDesc: 'कैमरा स्कैन से फसल रोग पहचानें और जैविक व अनुशंसित रासायनिक उपचार पाएं।',
      aiTitle: '4. फार्मज़ेन AI',
      aiDesc: '24/7 बुद्धिमान कृषि सहायक जो खेत की स्थिति समझकर हिंदी में आवाज से सलाह देता है।',
      directTitle: '5. फार्मज़ेन सीधा बाजार',
      directDesc: 'मंडी लाइव भाव, सीधी फसल बिक्री पंजीकरण और सत्यापित थोक खरीदारों से जुड़ाव।'
    },
    shield: {
      title: 'फार्मज़ेन शील्ड',
      subtitle: 'नुकसान होने से पहले अपने खेत को सुरक्षित करें।',
      overallRisk: 'खेत का कुल जोखिम',
      riskDescription: 'मौसम, कीट प्रकोप, बाजार मूल्य और कर्ज देनदारी के आधार पर गणना की गई है।',
      weatherRisk: 'मौसम प्रभाव',
      cropHealthRisk: 'फसल विकास',
      diseaseRisk: 'बीमारी का खतरा',
      pestRisk: 'कीट की संभावना',
      waterRisk: 'सिंचाई संतुलन',
      marketRisk: 'मूल्य उतार-चढ़ाव',
      financeRisk: 'वित्तीय भार',
      financialExposure: 'अनुमानित वित्तीय स्थिति',
      totalInvestment: 'खेती में लागत',
      expectedIncome: 'संभावित उपज मूल्य',
      loanObligation: 'सक्रिय ऋण देनदारी',
      upcomingRepayment: 'अगली किस्त की तारीख',
      insuranceCoverage: 'फसल बीमा PMFBY',
      whatIfTitle: 'फसल नुकसान सिम्युलेटर (What-If)',
      whatIfSubtitle: 'यदि फसल को नुकसान हो तो वित्तीय अंतर का आकलन करें और पूर्व योजना बनाएं',
      cropLossSlider: 'फसल नुकसान का प्रतिशत चुनें',
      estimatedGap: 'अनुमानित वित्तीय कमी',
      recoveryRoutes: 'राहत और सुधार के उपाय',
      alertsTitle: 'मुख्य शील्ड चेतावनियां'
    },
    weather: {
      title: 'फार्मज़ेन मौसम',
      subtitle: 'मौसम का पूर्वानुमान और खेत के लिए सटीक सलाह',
      selectLocation: 'खेत का स्थान',
      useGps: 'GPS का उपयोग करें',
      advisoryTitle: 'आज की कृषि मौसम सलाह',
      hourlyForecast: 'घंटेवार पूर्वानुमान',
      sevenDayForecast: '7-दिवसीय कृषि कार्य योजना',
      humidity: 'नमी',
      wind: 'हवा की गति',
      rainChance: 'बारिश की संभावना',
      rainfall: 'अनुमानित वर्षा',
      soilImpact: 'मिट्टी की नमी एवं सिंचाई सलाह',
      todaySummary: 'आज का सारांश',
      meaningTitle: 'आज का मौसम मेरे खेत के लिए क्या मायने रखता है?'
    },
    cropDoctor: {
      title: 'फार्मज़ेन फसल डॉक्टर',
      subtitle: 'कैमरा स्कैन से फसल रोग की पहचान',
      scanCrop: 'फसल स्कैन करें 📷',
      uploadPhoto: 'फोटो अपलोड करें',
      frameGuide: 'प्रभावित पत्ती को रोशनी में स्कैनर फ्रेम के बीच में रखें।',
      analyzing: 'आपकी फसल स्कैन कर कृषि ज्ञान से मिलान किया जा रहा है...',
      possibleProblem: 'संभावित समस्या',
      confidence: 'सटीकता',
      severity: 'गंभीरता',
      symptoms: 'पहचाने गए लक्षण',
      suggestedTreatments: 'सुझाए गए उपचार',
      organicApproach: 'जैविक और प्राकृतिक समाधान',
      chemicalOption: 'अनुशंसित रासायनिक उपचार (यदि आवश्यक हो)',
      preventionTips: 'आगे के लिए रोकथाम उपाय',
      disclaimer: 'यह एक निर्णय सहायता अनुमान है। गंभीर प्रकोप के लिए स्थानीय कृषि अधिकारी से संपर्क करें।',
      history: 'हाल के स्कैन की जानकारी'
    },
    ai: {
      title: 'फार्मज़ेन AI सहायक',
      subtitle: 'आपकी भाषा और खेत के संदर्भ के साथ कृषि मार्गदर्शक।',
      placeholder: 'खाद, रोग, बारिश, मंडी भाव या फसल बीमा के बारे में पूछें...',
      send: 'पूछें',
      tapToSpeak: 'बोलने के लिए टैप करें 🎙',
      listening: 'सुन रहा है...',
      understanding: 'प्रश्न समझ रहा है...',
      thinking: 'खेत के आंकड़ों का विश्लेषण कर रहा है...',
      speaking: 'हिंदी में उत्तर दे रहा है...',
      suggestedQuestions: [
        'क्या इस हफ्ते बारिश से मेरी टमाटर की फसल प्रभावित होगी?',
        'फूल आने की अवस्था में कौन सी खाद डालनी चाहिए?',
        'नजदीकी मंडी में टमाटर का आज का औसत भाव क्या है?',
        'फसल क्षति होने पर 72 घंटे में PMFBY में दावा कैसे दर्ज करें?'
      ],
      disclaimer: 'वैज्ञानिक कृषि पद्धतियों और आपके खेत के आंकड़ों के आधार पर AI सलाह देता है।'
    },
    direct: {
      title: 'फार्मज़ेन सीधा बाजार',
      subtitle: 'बाजार को जानें। बेहतर अवसर पाएं। समझदारी से बेचें।',
      marketPrices: 'मंडी लाइव भाव सूचकांक',
      modalPrice: 'औसत भाव',
      priceTrend: 'साप्ताहिक रुझान',
      myListings: 'मेरी फसल लिस्टिंग',
      listProduceBtn: '+ फसल बेचने के लिए दर्ज करें',
      potentialBuyers: 'सत्यापित सीधे खरीदार',
      buyerOfferedPrice: 'प्रस्तावित भाव',
      quantityReq: 'आवश्यक मात्रा',
      createListingTitle: 'नई फसल लिस्टिंग बनाएं',
      produceCrop: 'फसल / उत्पाद',
      quantity: 'उपलब्ध मात्रा',
      expectedRate: 'अपेक्षित भाव (प्रति किलो/क्विंटल)'
    },
    sos: {
      title: 'फार्मज़ेन आपातकालीन सहायता SOS',
      subtitle: 'सत्यापित सरकारी कृषि एवं फसल बीमा हेल्पलाइन',
      callWarning: 'आधिकारिक सरकारी हेल्पलाइन से सीधा संपर्क।',
      cropInsuranceHelpline: 'PMFBY कृषि रक्षक (आधिकारिक 14447)',
      kisanCallCenter: 'किसान कॉल सेंटर (टोल-फ्री 1800-180-1551)',
      districtOfficer: 'जिला कृषि अधिकारी',
      emergencyAssistance: 'आपदा प्रबंधन कृषि प्रकोष्ठ'
    }
  },

  te: {
    brand: 'FARMZEN',
    tagline: 'మంచి నిర్ణయం. తెలివైన వ్యవసాయం. ఉత్తమ విక్రయం.',
    nav: {
      home: 'హోమ్',
      shield: 'షీల్డ్ రక్షణ',
      weather: 'వాతావరణం',
      cropDoctor: 'పంట డాక్టర్',
      ai: 'ఫార్మ్‌జెన్ AI',
      direct: 'డైరెక్ట్ మార్కెట్',
      sos: 'SOS సహాయం',
      profile: 'నా పొలం',
      notifications: 'హెచ్చరికలు',
      admin: 'అడ్మిన్',
      signOut: 'లాగ్అవుట్ / మార్చు'
    },
    pipeline: {
      step1: 'మీరు నమోదు చేసినది',
      step2: 'ఫార్మ్‌జెన్ విశ్లేషణ',
      step3: 'సిఫార్సు చేసిన వ్యవసాయ చర్య'
    },
    common: {
      loading: 'వ్యవసాయ సమాచారం లోడ్ అవుతోంది...',
      save: 'భద్రపరచు',
      cancel: 'రద్దు',
      submit: 'నిర్ధారించు',
      offlineMode: 'ఆఫ్‌లైన్ మోడ్',
      offlineNotice: 'సేవ్ చేసిన సమాచారం అందుబాటులో ఉంది. ఇంటర్నెట్ లేకపోయినా పనిచేస్తుంది.',
      synced: 'అన్ని వివరాలు సర్వర్‌తో సమకాలీకరించబడ్డాయి',
      demoNotice: 'వ్యవసాయ నిర్ణయ మద్దతు వ్యవస్థ',
      verified: 'ధృవీకరించబడిన మద్దతు',
      officialSource: 'మూలం',
      callNow: 'కాల్ చేయండి',
      viewDetails: 'వివరాలు చూడండి',
      selectLanguage: 'భాష / Language',
      change: 'మార్చు',
      active: 'యాక్టివ్',
      switchFarm: 'పొలం మార్చు',
      next: 'తదుపరి',
      back: 'వెనుకకు'
    },
    dashboard: {
      greeting: 'శుభోదయం',
      farmToday: 'ఈ రోజు నా పొలంలో ఏం జరుగుతోంది?',
      todayBriefing: 'ఈ రోజు మీ పొలంలో',
      briefWeather: 'వాతావరణం',
      briefCrop: 'పంట ఆరోగ్యం',
      briefRisk: 'రిస్క్ షీల్డ్',
      briefMarket: 'మార్కెట్ ధర',
      threeActionsTitle: 'ఈ రోజు చేయాల్సిన 3 ముఖ్యమైన పనులు',
      action1Title: '1. ఆకుల పరిశీలన',
      action1Desc: 'తేమ కారణంగా టమోటా దిగువ ఆకులపై పసుపు రంగు లేదా మచ్చలను గమనించండి.',
      action2Title: '2. నీటి పారుదల & వర్షం',
      action2Desc: 'రేపు 35-50 మి.మీ వర్షం పడే అవకాశం ఉంది. నేటి తడిని వాయిదా వేసి కాలువలను శుభ్రం చేయండి.',
      action3Title: '3. మార్కెట్ ధర సమీక్ష',
      action3Desc: 'మార్కెట్లో టమోటా క్వింటాల్ ధర +9.6% పెరిగింది. కొనుగోలుదారుల వివరాలు చూడండి.',
      askAiHero: 'ఫార్మ్‌జెన్ AI ని అడగండి',
      tapToSpeak: 'ఫార్మ్‌జెన్‌ని అడగండి 🎙',
      coreModulesTitle: 'ప్రధాన ఫార్మ్‌జెన్ విభాగాలు',
      coreModulesSubtitle: 'వివరాలు చూడటానికి ఏదైనా విభాగంపై క్లిక్ చేయండి',
      shieldTitle: '1. ఫార్మ్‌జెన్ షీల్డ్',
      shieldDesc: 'వ్యవసాయ మరియు ఆర్థిక రిస్క్ రక్షణ. పంట నష్ట సిమ్యులేటర్‌తో ముందస్తు రక్షణ చర్యలు చేపట్టండి.',
      weatherTitle: '2. ఫార్మ్‌జెన్ వాతావరణం',
      weatherDesc: 'IMD వాతావరణ నివేదిక, గంటల వారీ సమాచారం, 7 రోజుల ప్రణాళిక మరియు సాగు సలహాలు.',
      cropDoctorTitle: '3. ఫార్మ్‌జెన్ పంట డాక్టర్',
      cropDoctorDesc: 'కెమెరాతో ఆకులను స్కాన్ చేసి తెగుళ్ళను గుర్తించి సేంద్రీయ పరిష్కారాలు పొందండి.',
      aiTitle: '4. ఫార్మ్‌జెన్ AI',
      aiDesc: 'తెలుగులో మాట్లాడే 24/7 ఏఐ వ్యవసాయ సలహాదారు.',
      directTitle: '5. ఫార్మ్‌జెన్ డైరెక్ట్ మార్కెట్',
      directDesc: 'మార్కెట్ తాజా ధరలు, పంట అమ్మకం నమోదు మరియు ధృవీకరించబడిన కొనుగోలుదారులు.'
    },
    shield: {
      title: 'ఫార్మ్‌జెన్ షీల్డ్',
      subtitle: 'పంట నష్టం మరియు ఆర్థిక నష్టాల నుండి రక్షణ పొందండి.',
      overallRisk: 'పొలం మొత్తం రిస్క్',
      riskDescription: 'వాతావరణం, తెగుళ్ళు, మార్కెట్ ధరలు మరియు రుణ భారం ఆధారంగా అంచనా వేయబడింది.',
      weatherRisk: 'వాతావరణ ప్రభావం',
      cropHealthRisk: 'పంట బలం',
      diseaseRisk: 'వ్యాధి ముప్పు',
      pestRisk: 'పురుగుల ఉధృతి',
      waterRisk: 'నీటి లభ్యత',
      marketRisk: 'ధరల అస్థిరత',
      financeRisk: 'ఆర్థిక భారం',
      financialExposure: 'అంచనా వేసిన ఆర్థిక స్థితి',
      totalInvestment: 'పెట్టుబడి మొత్తం',
      expectedIncome: 'ఆశించిన పంట విలువ',
      loanObligation: 'రుణ బాధ్యత',
      upcomingRepayment: 'తదుపరి వాయిదా తేదీ',
      insuranceCoverage: 'పంట బీమా స్థితి',
      whatIfTitle: 'పంట నష్ట సిమ్యులేటర్ (What-If)',
      whatIfSubtitle: 'పంట నష్టం జరిగితే ఆర్థిక అంతరాన్ని లెక్కించి ముందస్తు రక్షణ చర్యలు చేపట్టండి',
      cropLossSlider: 'నష్ట శాతాన్ని స్లైడ్ చేయండి',
      estimatedGap: 'అంచనా వేసిన ఆర్థిక లోటు',
      recoveryRoutes: 'ఆర్థిక ఉపశమన మార్గాలు',
      alertsTitle: 'ముఖ్యమైన షీల్డ్ అలర్ట్‌లు'
    },
    weather: {
      title: 'ఫార్మ్‌జెన్ వాతావరణం',
      subtitle: 'వాతావరణ మార్పుల ఆధారంగా పొలానికి ఖచ్చితమైన సలహా',
      selectLocation: 'పొలం స్థానం',
      useGps: 'GPS ఉపయోగించండి',
      advisoryTitle: 'ఈ రోజు వ్యవసాయ వాతావరణ సలహా',
      hourlyForecast: 'గంటల వారీ సూచన',
      sevenDayForecast: '7 రోజుల వాతావరణ ప్రణాళిక',
      humidity: 'తేమ శాతం',
      wind: 'గాలి వేగం',
      rainChance: 'వర్షం పడే అవకాశం',
      rainfall: 'వర్షపాతం అంచనా',
      soilImpact: 'నేల తేమ మరియు సాగు సలహా',
      todaySummary: 'ఈ రోజు సారాంశం',
      meaningTitle: 'ఈ రోజు వాతావరణం నా పంటకు ఏమి చెబుతోంది?'
    },
    cropDoctor: {
      title: 'ఫార్మ్‌జెన్ పంట డాక్టర్',
      subtitle: 'కెమెరాతో పంట ఆకులను స్కాన్ చేసి తెగుళ్ళను గుర్తించండి',
      scanCrop: 'పంటను స్కాన్ చేయండి 📷',
      uploadPhoto: 'ఫోటో అప్‌లోడ్ చేయండి',
      frameGuide: 'బాధిత ఆకును వెలుతురులో ఫ్రేమ్ మధ్యలో ఉంచండి.',
      analyzing: 'ఆకును స్కాన్ చేసి వ్యవసాయ సమాచారంతో సరిపోల్చుతోంది...',
      possibleProblem: 'అనుమానిత సమస్య',
      confidence: 'ఖచ్చితత్వం',
      severity: 'తీవ్రత',
      symptoms: 'గుర్తించిన లక్షణాలు',
      suggestedTreatments: 'సిఫార్సు చేసిన నివారణ చర్యలు',
      organicApproach: 'సేంద్రీయ పరిష్కారం',
      chemicalOption: 'రసాయన పరిష్కారం (అవసరమైతే)',
      preventionTips: 'ముందస్తు జాగ్రత్తలు',
      disclaimer: 'ఇది సహాయక అంచనా మాత్రమే. తీవ్రమైన తెగుళ్ళకు స్థానిక కృషి అధికారిని సంప్రదించండి.',
      history: 'గత స్కాన్ వివరాలు'
    },
    ai: {
      title: 'ఫార్మ్‌జెన్ AI సహాయకుడు',
      subtitle: 'మీ భాష మరియు పొలం వివరాలతో కూడిన వ్యవసాయ మార్గదర్శి.',
      placeholder: 'ఎరువులు, విత్తనాలు, మార్కెట్ ధరలు లేదా బీమా గురించి అడగండి...',
      send: 'అడుగు',
      tapToSpeak: 'మాట్లాడటానికి నొక్కండి 🎙',
      listening: 'వింటోంది...',
      understanding: 'ప్రశ్నను అర్థం చేసుకుంటోంది...',
      thinking: 'పంట డేటాను విశ్లేషిస్తోంది...',
      speaking: 'తెలుగులో సమాధానం ఇస్తోంది...',
      suggestedQuestions: [
        'ఈ వారం వర్షం నా టమోటా పంటను దెబ్బతీస్తుందా?',
        'పూత దశలో ఏ ఎరువులు వాడాలి?',
        'సమీప మార్కెట్‌లో టమోటా క్వింటాల్ ధర ఎంత?',
        'పంట నష్టపరిహారం కోసం 72 గంటల్లో PMFBY లో ఎలా దరఖాస్తు చేయాలి?'
      ],
      disclaimer: 'శాస్త్రీయ వ్యవసాయ పద్ధతులు మరియు మీ పొలం వివరాల ఆధారంగా AI మార్గదర్శకత్వం ఇస్తుంది.'
    },
    direct: {
      title: 'ఫార్మ్‌జెన్ డైరెక్ట్ మార్కెట్',
      subtitle: 'మార్కెట్‌ను తెలుసుకోండి. మంచి ధరను పొందండి.',
      marketPrices: 'మార్కెట్ యార్డ్ తాజా ధరలు',
      modalPrice: 'సగటు ధర',
      priceTrend: 'వారపు ట్రెండ్',
      myListings: 'నా విక్రయ వివరాలు',
      listProduceBtn: '+ పంట అమ్మకానికి ఉంచండి',
      potentialBuyers: 'ధృవీకరించబడిన కొనుగోలుదారులు',
      buyerOfferedPrice: 'ఆఫర్ చేసిన ధర',
      quantityReq: 'కావలసిన పరిమాణం',
      createListingTitle: 'కొత్త విక్రయం నమోదు చేయండి',
      produceCrop: 'పంట పేరు',
      quantity: 'అందుబాటులో ఉన్న పరిమాణం',
      expectedRate: 'ఆశించే ధర (కేజీ లేదా క్వింటాల్ కు)'
    },
    sos: {
      title: 'ఫార్మ్‌జెన్ అత్యవసర సహాయం (SOS)',
      subtitle: 'ధృవీకరించబడిన ప్రభుత్వ వ్యవసాయ హెల్ప్‌లైన్‌లు',
      callWarning: 'అధికారిక హెల్ప్‌లైన్‌లకు నేరుగా కాల్ చేయండి.',
      cropInsuranceHelpline: 'PMFBY కృషి రక్షక్ (అధికారిక 14447)',
      kisanCallCenter: 'కిసాన్ కాల్ సెంటర్ (టోల్ ఫ్రీ 1800-180-1551)',
      districtOfficer: 'జిల్లా వ్యవసాయ అధికారి',
      emergencyAssistance: 'విపత్తు నిర్వహణ వ్యవసాయ విభాగం'
    }
  },

  kn: {
    brand: 'FARMZEN',
    tagline: 'ಉತ್ತಮ ನಿರ್ಧಾರ. ಬುದ್ಧಿವಂತ ಕೃಷಿ. ಉತ್ತಮ ಮಾರಾಟ.',
    nav: {
      home: 'ಮುಖಪುಟ',
      shield: 'ಶೀಲ್ಡ್ ರಕ್ಷಣೆ',
      weather: 'ಹವಾಮಾನ',
      cropDoctor: 'ಬೆಳೆ ವೈದ್ಯ',
      ai: 'ಫಾರ್ಮ್‌ಜೆನ್ AI',
      direct: 'ನೇರ ಮಾರುಕಟ್ಟೆ',
      sos: 'ತುರ್ತು SOS',
      profile: 'ನನ್ನ ಜಮೀನು',
      notifications: 'ಎಚ್ಚರಿಕೆಗಳು',
      admin: 'ಆಡಳಿತ',
      signOut: 'ಲಾಗ್‌ಔಟ್ / ಬದಲಿಸಿ'
    },
    pipeline: {
      step1: 'ನೀವು ನಮೂದಿಸಿದ ಮಾಹಿತಿ',
      step2: 'ಫಾರ್ಮ್‌ಜೆನ್ ವಿಶ್ಲೇಷಣೆ',
      step3: 'ಶಿಫಾರಸು ಮಾಡಿದ ಕೃಷಿ ಕ್ರಮ'
    },
    common: {
      loading: 'ಕೃಷಿ ಮಾಹಿತಿ ಲೋಡ್ ಆಗುತ್ತಿದೆ...',
      save: 'ಉಳಿಸು',
      cancel: 'ರದ್ದುಮಾಡು',
      submit: 'ದೃಢೀಕರಿಸಿ',
      offlineMode: 'ಆಫ್‌ಲೈನ್ ಮೋಡ್',
      offlineNotice: 'ಉಳಿಸಿದ ಮಾಹಿತಿ ಲಭ್ಯವಿದೆ. ಇಂಟರ್ನೆಟ್ ಇಲ್ಲದೆಯೂ ಬಳಸಬಹುದು.',
      synced: 'ಎಲ್ಲಾ ವಿವರಗಳನ್ನು ಸರ್ವರ್‌ಗೆ ಸಿಂಕ್ ಮಾಡಲಾಗಿದೆ',
      demoNotice: 'ಕೃಷಿ ನಿರ್ಧಾರ ಬೆಂಬಲ ವ್ಯವಸ್ಥೆ',
      verified: 'ಪರಿಶೀಲಿಸಿದ ಸರ್ಕಾರಿ ನೆರವು',
      officialSource: 'ಮೂಲ',
      callNow: 'ಈಗಲೇ ಕರೆ ಮಾಡಿ',
      viewDetails: 'ವಿವರ ನೋಡಿ',
      selectLanguage: 'ಭಾಷೆ / Language',
      change: 'ಬದಲಿಸಿ',
      active: 'ಸಕ್ರಿಯ',
      switchFarm: 'ಜಮೀನು ಬದಲಿಸಿ',
      next: 'ಮುಂದೆ',
      back: 'ಹಿಂದೆ'
    },
    dashboard: {
      greeting: 'ಶುಭೋದಯ',
      farmToday: 'ಇಂದು ನನ್ನ ಜಮೀನಿನಲ್ಲಿ ಏನಾಗುತ್ತಿದೆ?',
      todayBriefing: 'ಇಂದು ನಿಮ್ಮ ಜಮೀನಿನಲ್ಲಿ',
      briefWeather: 'ಹವಾಮಾನ',
      briefCrop: 'ಬೆಳೆ ಆರೋಗ್ಯ',
      briefRisk: 'ರಿಸ್ಕ್ ಶೀಲ್ಡ್',
      briefMarket: 'ಮಾರುಕಟ್ಟೆ ದರ',
      threeActionsTitle: 'ಇಂದಿನ 3 ಪ್ರಮುಖ ಕೃಷಿ ಕಾರ್ಯಗಳು',
      action1Title: '1. ಎಲೆಗಳ ತಪಾಸಣೆ',
      action1Desc: 'ಮುಂಜಾನೆಯ ತೇವಾಂಶದಿಂದ ಟೊಮೇಟೊ ಎಲೆಗಳಲ್ಲಿ ಹಳದಿ ಬಣ್ಣ ಅಥವಾ ಕಪ್ಪು ಚುಕ್ಕೆಗಳಿವೆಯೇ ಎಂದು ಗಮನಿಸಿ.',
      action2Title: '2. ಒಳಚರಂಡಿ ಮತ್ತು ಮಳೆ',
      action2Desc: 'ನಾಳೆ 35-50 ಮಿ.ಮೀ ಮಳೆಯ ನಿರೀಕ್ಷೆಯಿದೆ. ಇಂದಿನ ನೀರಾವರಿಯನ್ನು ಮುಂದೂಡಿ ಕಾಲುವೆಗಳನ್ನು ಸರಿಪಡಿಸಿ.',
      action3Title: '3. ಮಾರುಕಟ್ಟೆ ದರ ಪರಿಶೀಲನೆ',
      action3Desc: 'ಮಾರುಕಟ್ಟೆಯಲ್ಲಿ ಟೊಮೇಟೊ ಸಗಟು ದರ +9.6% ಹೆಚ್ಚಾಗಿದೆ. ನೇರ ಖರೀದಿದಾರರ ಬೇಡಿಕೆಯನ್ನು ಪರಿಶೀಲಿಸಿ.',
      askAiHero: 'ಫಾರ್ಮ್‌ಜೆನ್ AI ಗೆ ಕೇಳಿ',
      tapToSpeak: 'ಫಾರ್ಮ್‌ಜೆನ್‌ಗೆ ಕೇಳಿ 🎙',
      coreModulesTitle: 'ಪ್ರಮುಖ ಫಾರ್ಮ್‌ಜೆನ್ ಮಾಡ್ಯೂಲ್‌ಗಳು',
      coreModulesSubtitle: 'ಸಂಪೂರ್ಣ ವಿವರಗಳಿಗಾಗಿ ಯಾವುದೇ ಮಾಡ್ಯೂಲ್ ಮೇಲೆ ಕ್ಲಿಕ್ ಮಾಡಿ',
      shieldTitle: '1. ಫಾರ್ಮ್‌ಜೆನ್ ಶೀಲ್ಡ್',
      shieldDesc: 'ಕೃಷಿ ಮತ್ತು ಆರ್ಥಿಕ ಅಪಾಯಗಳ ರಕ್ಷಣೆ. ಬೆಳೆ ನಷ್ಟ ಸಿಮ್ಯುಲೇಟರ್ ಮೂಲಕ ಆರ್ಥಿಕ ಕೊರತೆಯನ್ನು ನಿರ್ವಹಿಸಿ.',
      weatherTitle: '2. ಫಾರ್ಮ್‌ಜೆನ್ ಹವಾಮಾನ',
      weatherDesc: 'IMD ಹವಾಮಾನ ವರದಿ, ಗಂಟೆಗಳ ಮುನ್ಸೂಚನೆ, 7 ದಿನಗಳ ಕೃಷಿ ಯೋಜನೆ ಮತ್ತು ಮಣ್ಣಿನ ತೇವಾಂಶ ಸಲಹೆ.',
      cropDoctorTitle: '3. ಫಾರ್ಮ್‌ಜೆನ್ ಬೆಳೆ ವೈದ್ಯ',
      cropDoctorDesc: 'ಕ್ಯಾಮೆರಾ ಸ್ಕ್ಯಾನ್ ಮೂಲಕ ಎಲೆ ರೋಗಗಳನ್ನು ಪತ್ತೆಹಚ್ಚಿ ಸಾವಯವ ಮತ್ತು ರಕ್ಷಣಾತ್ಮಕ ಪರಿಹಾರಗಳನ್ನು ಪಡೆಯಿರಿ.',
      aiTitle: '4. ಫಾರ್ಮ್‌ಜೆನ್ AI',
      aiDesc: 'ಕನ್ನಡದಲ್ಲಿ ಮಾತನಾಡುವ 24/7 ಬುದ್ಧಿವಂತ ಕೃಷಿ ಮಾರ್ಗದರ್ಶಿ.',
      directTitle: '5. ಫಾರ್ಮ್‌ಜೆನ್ ನೇರ ಮಾರುಕಟ್ಟೆ',
      directDesc: 'ಲೈವ್ ಮಾರುಕಟ್ಟೆ ದರಗಳು, ಬೆಳೆ ಮಾರಾಟ ನೋಂದಣಿ ಮತ್ತು ಪರಿಶೀಲಿಸಿದ ನೇರ ಖರೀದಿದಾರರ ಸಂಪರ್ಕ.'
    },
    shield: {
      title: 'ಫಾರ್ಮ್‌ಜೆನ್ ಶೀಲ್ಡ್',
      subtitle: 'ಬೆಳೆ ನಷ್ಟವಾಗುವ ಮುನ್ನ ನಿಮ್ಮ ಜಮೀನನ್ನು ರಕ್ಷಿಸಿಕೊಳ್ಳಿ.',
      overallRisk: 'ಒಟ್ಟಾರೆ ಕೃಷಿ ಅಪಾಯದ ಸೂಚ್ಯಂಕ',
      riskDescription: 'ಹವಾಮಾನ, ಕೀಟಬಾಧೆ, ಮಾರುಕಟ್ಟೆ ಬೆಲೆ ಮತ್ತು ಸಾಲದ ಆಧಾರದ ಮೇಲೆ ಲೆಕ್ಕಹಾಕಲಾಗಿದೆ.',
      weatherRisk: 'ಹವಾಮಾನ ಪರಿಣಾಮ',
      cropHealthRisk: 'ಬೆಳೆಯ ಶಕ್ತಿ',
      diseaseRisk: 'ರೋಗದ ಅಪಾಯ',
      pestRisk: 'ಕೀಟಗಳ ಸಾಧ್ಯತೆ',
      waterRisk: 'ನೀರಾವರಿ ಸಮತೋಲನ',
      marketRisk: 'ಬೆಲೆ ಏರಿಳಿತ',
      financeRisk: 'ಆರ್ಥಿಕ ಹೊರೆ',
      financialExposure: 'ಅಂದಾಜು ಆರ್ಥಿಕ ಸ್ಥಿತಿ',
      totalInvestment: 'ಹೂಡಿಕೆ ಮೊತ್ತ',
      expectedIncome: 'ನಿರೀಕ್ಷಿತ ಬೆಳೆ ಮೌಲ್ಯ',
      loanObligation: 'ಸಾಲದ ಹೊಣೆಗಾರಿಕೆ',
      upcomingRepayment: 'ಮುಂದಿನ ಕಂತಿನ ದಿನಾಂಕ',
      insuranceCoverage: 'ಬೆಳೆ ವಿಮೆ ಸ್ಥಿತಿ',
      whatIfTitle: 'ಬೆಳೆ ನಷ್ಟ ಸಿಮ್ಯುಲೇಟರ್ (What-If)',
      whatIfSubtitle: 'ಬೆಳೆ ಹಾನಿಯಾದರೆ ಆರ್ಥಿಕ ಕೊರತೆಯನ್ನು ಲೆಕ್ಕಹಾಕಿ ಮುಂಚಿತವಾಗಿ ಚೇತರಿಕೆ ಯೋಜನೆ ಮಾಡಿ',
      cropLossSlider: 'ಬೆಳೆ ನಷ್ಟದ ಪ್ರಮಾಣ ಬದಲಿಸಿ',
      estimatedGap: 'ನಿರೀಕ್ಷಿತ ಆರ್ಥಿಕ ಕೊರತೆ',
      recoveryRoutes: 'ಪರಿಹಾರ ಮತ್ತು ನೆರವಿನ ಮಾರ್ಗಗಳು',
      alertsTitle: 'ಮುಖ್ಯ ಶೀಲ್ಡ್ ಎಚ್ಚರಿಕೆಗಳು'
    },
    weather: {
      title: 'ಫಾರ್ಮ್‌ಜೆನ್ ಹವಾಮಾನ',
      subtitle: 'ಹವಾಮಾನ ಮುನ್ಸೂಚನೆ ಮತ್ತು ಬೆಳೆಗಳಿಗೆ ಸೂಕ್ತ ಸಲಹೆ',
      selectLocation: 'ಜಮೀನಿನ ಸ್ಥಳ',
      useGps: 'GPS ಬಳಸಿ',
      advisoryTitle: 'ಇಂದಿನ ಕೃಷಿ ಹವಾಮಾನ ಸಲಹೆ',
      hourlyForecast: 'ಗಂಟೆಗಳ ಮುನ್ಸೂಚನೆ',
      sevenDayForecast: '7 ದಿನಗಳ ಕೃಷಿ ಯೋಜನೆ',
      humidity: 'ತೇವಾಂಶ',
      wind: 'ಗಾಳಿಯ ವೇಗ',
      rainChance: 'ಮಳೆಯ ಸಾಧ್ಯತೆ',
      rainfall: 'ನಿರೀಕ್ಷಿತ ಮಳೆ ಪ್ರಮಾಣ',
      soilImpact: 'ಮಣ್ಣಿನ ತೇವಾಂಶ ಮತ್ತು ನೀರಾವರಿ ಸಲಹೆ',
      todaySummary: 'ಇಂದಿನ ಸಾರಾಂಶ',
      meaningTitle: 'ಇಂದಿನ ಹವಾಮಾನವು ನನ್ನ ಬೆಳೆಗೆ ಏನು ಹೇಳುತ್ತದೆ?'
    },
    cropDoctor: {
      title: 'ಫಾರ್ಮ್‌ಜೆನ್ ಬೆಳೆ ವೈದ್ಯ',
      subtitle: 'ಕ್ಯಾಮೆರಾ ಸ್ಕ್ಯಾನ್ ಮೂಲಕ ಎಲೆ ರೋಗಗಳನ್ನು ಪತ್ತೆಹಚ್ಚಿ',
      scanCrop: 'ಬೆಳೆ ಸ್ಕ್ಯಾನ್ ಮಾಡಿ 📷',
      uploadPhoto: 'ಫೋಟೋ ಅಪ್‌ಲೋಡ್ ಮಾಡಿ',
      frameGuide: 'ರೋಗಪೀಡಿತ ಎಲೆಯನ್ನು ಚೌಕಟ್ಟಿನ ಮಧ್ಯದಲ್ಲಿ ಸರಿಯಾಗಿ ಇರಿಸಿ.',
      analyzing: 'ಎಲೆಯನ್ನು ಸ್ಕ್ಯಾನ್ ಮಾಡಿ ಕೃಷಿ ಮಾಹಿತಿಯೊಂದಿಗೆ ತಾಳೆ ನೋಡಲಾಗುತ್ತಿದೆ...',
      possibleProblem: 'ಸಂಭಾವ್ಯ ಸಮಸ್ಯೆ',
      confidence: 'ನಿಖರತೆ',
      severity: 'ತೀವ್ರತೆ',
      symptoms: 'ಕಂಡುಬಂದ ಲಕ್ಷಣಗಳು',
      suggestedTreatments: 'ಶಿಫಾರಸು ಮಾಡಿದ ಕ್ರಮಗಳು',
      organicApproach: 'ಸಾವಯವ ಪರಿಹಾರ',
      chemicalOption: 'ರಾಸಾಯನಿಕ ಪರಿಹಾರ (ಅಗತ್ಯವಿದ್ದಲ್ಲಿ)',
      preventionTips: 'ಮುನ್ನೆಚ್ಚರಿಕೆ ಕ್ರಮಗಳು',
      disclaimer: 'ಇದು ಸಲಹಾ ಅಂದಾಜು ಮಾತ್ರ. ಹೆಚ್ಚಿನ ಮಾಹಿತಿಗಾಗಿ ಸ್ಥಳೀಯ ಕೃಷಿ ಅಧಿಕಾರಿಯನ್ನು ಭೇಟಿ ಮಾಡಿ.',
      history: 'ಹಿಂದಿನ ಸ್ಕ್ಯಾನ್ ವಿವರಗಳು'
    },
    ai: {
      title: 'ಫಾರ್ಮ್‌ಜೆನ್ AI ಸಹಾಯಕ',
      subtitle: 'ನಿಮ್ಮ ಭಾಷೆ ಮತ್ತು ಜಮೀನಿನ ವಿವರಗಳೊಂದಿಗೆ ಕೃಷಿ ಮಾರ್ಗದರ್ಶಿ.',
      placeholder: 'ಗೊಬ್ಬರ, ರೋಗ, ಮಳೆ, ಮಾರುಕಟ್ಟೆ ಅಥವಾ ವಿಮೆ ಬಗ್ಗೆ ಕೇಳಿ...',
      send: 'ಕೇಳಿ',
      tapToSpeak: 'ಮಾತನಾಡಲು ಟ್ಯಾಪ್ ಮಾಡಿ 🎙',
      listening: 'ಕೇಳಿಸಿಕೊಳ್ಳುತ್ತಿದೆ...',
      understanding: 'ಪ್ರಶ್ನೆಯನ್ನು ಅರ್ಥಮಾಡಿಕೊಳ್ಳಲಾಗುತ್ತಿದೆ...',
      thinking: 'ಕೃಷಿ ಮಾಹಿತಿಯನ್ನು ವಿಶ್ಲೇಷಿಸಲಾಗುತ್ತಿದೆ...',
      speaking: 'ಕನ್ನಡದಲ್ಲಿ ಉತ್ತರಿಸುತ್ತಿದೆ...',
      suggestedQuestions: [
        'ಈ ವಾರ ಮಳೆ ಬಂದರೆ ಟೊಮೇಟೊ ಬೆಳೆಗೆ ತೊಂದರೆಯಾಗುತ್ತದೆಯೇ?',
        'ಹೂವಾಡುವ ಹಂತದಲ್ಲಿ ಯಾವ ಗೊಬ್ಬರ ಬಳಸಬೇಕು?',
        'ಹತ್ತಿರದ ಎಪಿಎಂಸಿಯಲ್ಲಿ ಟೊಮೇಟೊ ಇಂದಿನ ದರ ಎಷ್ಟು?',
        'ಬೆಳೆ ಹಾನಿಯಾದರೆ 72 ಗಂಟೆಗಳಲ್ಲಿ PMFBY ನಲ್ಲಿ ಅರ್ಜಿ ಸಲ್ಲಿಸುವುದು ಹೇಗೆ?'
      ],
      disclaimer: 'ವೈಜ್ಞಾನಿಕ ಕೃಷಿ ಪದ್ಧತಿ ಮತ್ತು ನಿಮ್ಮ ಜಮೀನಿನ ವಿವರಗಳ ಆಧಾರದ ಮೇಲೆ AI ಮಾರ್ಗದರ್ಶನ ನೀಡುತ್ತದೆ.'
    },
    direct: {
      title: 'ಫಾರ್ಮ್‌ಜೆನ್ ನೇರ ಮಾರುಕಟ್ಟೆ',
      subtitle: 'ಮಾರುಕಟ್ಟೆ ತಿಳಿಯಿರಿ. ಉತ್ತಮ ದರ ಪಡೆಯಿರಿ.',
      marketPrices: 'ಮಂಡಿ ಮಾರುಕಟ್ಟೆ ಲೈವ್ ದರಗಳು',
      modalPrice: 'ಸರಾಸರಿ ದರ',
      priceTrend: 'ವಾರದ ಟ್ರೆಂಡ್',
      myListings: 'ನನ್ನ ಮಾರಾಟ ಪಟ್ಟಿ',
      listProduceBtn: '+ ಬೆಳೆ ಮಾರಾಟಕ್ಕೆ ನೋಂದಾಯಿಸಿ',
      potentialBuyers: 'ಪರಿಶೀಲಿಸಿದ ನೇರ ಖರೀದಿದಾರರು',
      buyerOfferedPrice: 'ನೀಡುವ ಬೆಲೆ',
      quantityReq: 'ಬೇಕಾದ ಪ್ರಮಾಣ',
      createListingTitle: 'ಹೊಸ ಮಾರಾಟ ಪಟ್ಟಿ ರಚಿಸಿ',
      produceCrop: 'ಬೆಳೆಯ ಹೆಸರು',
      quantity: 'ಲಭ್ಯವಿರುವ ಪ್ರಮಾಣ',
      expectedRate: 'ನಿರೀಕ್ಷಿತ ದರ (ಕೆಜಿ/ಕ್ವಿಂಟಾಲ್)'
    },
    sos: {
      title: 'ಫಾರ್ಮ್‌ಜೆನ್ ತುರ್ತು ನೆರವು SOS',
      subtitle: 'ಪರಿಶೀಲಿಸಿದ ಸರ್ಕಾರಿ ಕೃಷಿ ಸಹಾಯವಾಣಿಗಳು',
      callWarning: 'ಅಧಿಕೃತ ಸರ್ಕಾರಿ ಸಹಾಯವಾಣಿಗಳಿಗೆ ನೇರ ಕರೆ ಸಂಪರ್ಕ.',
      cropInsuranceHelpline: 'PMFBY ಕೃಷಿ ರಕ್ಷಕ್ (ಅಧಿಕೃತ 14447)',
      kisanCallCenter: 'ಕಿಸಾನ್ ಕಾಲ್ ಸೆಂಟರ್ (ಉಚಿತ ಸಂಖ್ಯೆ 1800-180-1551)',
      districtOfficer: 'ಜಿಲ್ಲಾ ಕೃಷಿ ಅಧಿಕಾರಿ',
      emergencyAssistance: 'ವಿಪತ್ತು ನಿರ್ವಹಣಾ ಕೃಷಿ ಘಟಕ'
    }
  },

  ml: {
    brand: 'FARMZEN',
    tagline: 'നല്ല തീരുമാനം. മികച്ച കൃഷി. മികച്ച വിപണനം.',
    nav: {
      home: 'ഹോം',
      shield: 'ഷീൽഡ് സംരക്ഷണം',
      weather: 'കാലാവസ്ഥ',
      cropDoctor: 'വിള ഡോക്ടർ',
      ai: 'ഫാംസെൻ AI',
      direct: 'ഡയറക്റ്റ് മാർക്കറ്റ്',
      sos: 'സഹായം SOS',
      profile: 'എന്റെ തോട്ടം',
      notifications: 'അറിയിപ്പുകൾ',
      admin: 'അഡ്മിൻ',
      signOut: 'ലോഗ്ഔട്ട് / മാറ്റുക'
    },
    pipeline: {
      step1: 'നിങ്ങൾ നൽകിയ വിവരങ്ങൾ',
      step2: 'ഫാംസെൻ വിശകലനം',
      step3: 'ശുപാർശ ചെയ്യുന്ന കൃഷി നടപടി'
    },
    common: {
      loading: 'വിവരങ്ങൾ ലഭ്യമാക്കുന്നു...',
      save: 'സൂക്ഷിക്കുക',
      cancel: 'റദ്ദാക്കുക',
      submit: 'സ്ഥിരീകരിക്കുക',
      offlineMode: 'ഓഫ്‌ലൈൻ മോഡ്',
      offlineNotice: 'സംഭരിച്ച വിവരങ്ങൾ ലഭ്യമാണ്. ഇന്റർനെറ്റ് ഇല്ലാതെയും ഉപയോഗിക്കാം.',
      synced: 'വിവരങ്ങൾ പൂർണ്ണമായി സിങ്ക് ചെയ്തു',
      demoNotice: 'കാർഷിക തീരുമാന പിന്തുണാ സംവിധാനം',
      verified: 'സ്ഥിരീകരിച്ച സർക്കാർ പിന്തുണ',
      officialSource: 'ഉറവിടം',
      callNow: 'വിളിക്കുക',
      viewDetails: 'വിവരങ്ങൾ കാണുക',
      selectLanguage: 'ഭാഷ / Language',
      change: 'മാറ്റുക',
      active: 'സജീവം',
      switchFarm: 'തോട്ടം മാറ്റുക',
      next: 'അടുത്തത്',
      back: 'പിന്നോട്ട്'
    },
    dashboard: {
      greeting: 'ശുഭദിനം',
      farmToday: 'ഇന്ന് എന്റെ കൃഷിയിടത്തിൽ എന്താണ് സംഭവിക്കുന്നത്?',
      todayBriefing: 'ഇന്ന് നിങ്ങളുടെ തോട്ടത്തിൽ',
      briefWeather: 'കാലാവസ്ഥ',
      briefCrop: 'വിള ആരോഗ്യം',
      briefRisk: 'റിസ്ക് ഷീൽഡ്',
      briefMarket: 'വിപണി വില',
      threeActionsTitle: 'ഇന്നത്തെ 3 പ്രധാന കൃഷി പ്രവർത്തനങ്ങൾ',
      action1Title: '1. ഇല പരിശോധന',
      action1Desc: 'ഈർപ്പം കാരണം തക്കാളി താഴത്തെ ഇലകളിൽ മഞ്ഞനിറമോ കറുത്ത പാടുകളോ ഉണ്ടോ എന്ന് നിരീക്ഷിക്കുക.',
      action2Title: '2. ഡ്രെയിനേജ് & മഴ',
      action2Desc: 'നാളെ 35-50 മി.മീ മഴ പ്രതീക്ഷിക്കുന്നു. ഇന്നത്തെ നന ഒഴിവാക്കി ചാലുകൾ വൃത്തിയാക്കുക.',
      action3Title: '3. വിപണി വില അവലോകനം',
      action3Desc: 'വിപണിയിൽ തക്കാളി മൊത്തവില +9.6% വർദ്ധിച്ചു. നേരിട്ടുള്ള വാങ്ങലുകാരുടെ വിവരങ്ങൾ പരിശോധിക്കുക.',
      askAiHero: 'ഫാംസെൻ AI-യോട് ചോദിക്കൂ',
      tapToSpeak: 'ഫാംസെനോട് ചോദിക്കൂ 🎙',
      coreModulesTitle: 'പ്രധാന ഫാംസെൻ മൊഡ്യൂളുകൾ',
      coreModulesSubtitle: 'വിശദാംശങ്ങൾ കാണാൻ ഏതെങ്കിലും മൊഡ്യൂളിൽ തൊടുക',
      shieldTitle: '1. ഫാംസെൻ ഷീൽഡ്',
      shieldDesc: 'കാർഷിക സാമ്പത്തിക സംരക്ഷണം. വിളനഷ്ട സിമുലേറ്റർ ഉപയോഗിച്ച് കടബാധ്യതയും നഷ്ട സാധ്യതയും പരിശോധിക്കാം.',
      weatherTitle: '2. ഫാംസെൻ കാലാവസ്ഥ',
      weatherDesc: 'IMD കാലാവസ്ഥ റിപ്പോർട്ട്, മണിക്കൂർ വിവരങ്ങൾ, 7 ദിവസത്തെ പദ്ധതി, മണ്ണ് നനവ് നിർദ്ദേശങ്ങൾ.',
      cropDoctorTitle: '3. ഫാംസെൻ വിള ഡോക്ടർ',
      cropDoctorDesc: 'ക്യാമറ സ്കാൻ വഴി ഇലകളിലെ രോഗങ്ങൾ തിരിച്ചറിഞ്ഞ് ജൈവ പരിഹാരങ്ങൾ നേടാം.',
      aiTitle: '4. ഫാംസെൻ AI',
      aiDesc: 'മലയാളത്തിൽ സംസാരിക്കുന്ന 24/7 കാർഷിക ഉപദേശകൻ.',
      directTitle: '5. ഫാംസെൻ ഡയറക്റ്റ് മാർക്കറ്റ്',
      directDesc: 'ലൈവ് വിപണി വിലകൾ, വിള വിൽപ്പന രജിസ്ട്രേഷൻ, നേരിട്ടുള്ള വാങ്ങലുകാരുടെ വിവരങ്ങൾ.'
    },
    shield: {
      title: 'ഫാംസെൻ ഷീൽഡ്',
      subtitle: 'വിളനാശവും സാമ്പത്തിക നഷ്ടവും മുൻകൂട്ടി കണ്ട് ഒഴിവാക്കാം.',
      overallRisk: 'തോട്ടത്തിലെ ആകെ റിസ്ക്',
      riskDescription: 'കാലാവസ്ഥ, കീടങ്ങൾ, വിപണി വില, കടബാധ്യത എന്നിവയുടെ അടിസ്ഥാനത്തിൽ കണക്കാക്കിയത്.',
      weatherRisk: 'കാലാവസ്ഥ ആഘാതം',
      cropHealthRisk: 'വിളയുടെ കരുത്ത്',
      diseaseRisk: 'രോഗസാധ്യത',
      pestRisk: 'കീടബാധ സാധ്യത',
      waterRisk: 'ജലസേചന നില',
      marketRisk: 'വിലയിലെ മാറ്റങ്ങൾ',
      financeRisk: 'സാമ്പത്തിക ബാധ്യത',
      financialExposure: 'പ്രതീക്ഷിത സാമ്പത്തിക നില',
      totalInvestment: 'കൃഷി നിക്ഷേപം',
      expectedIncome: 'പ്രതീക്ഷിക്കുന്ന വിള മൂല്യം',
      loanObligation: 'വായ്പ ബാധ്യത',
      upcomingRepayment: 'അടുത്ത തിരിച്ചടവ് തീയതി',
      insuranceCoverage: 'വിള ഇൻഷുറൻസ് PMFBY',
      whatIfTitle: 'വിളനഷ്ട കാൽക്കുലേറ്റർ (What-If)',
      whatIfSubtitle: 'വിളനാശമുണ്ടായാൽ ഉണ്ടാകുന്ന സാമ്പത്തിക വിടവ് മുൻകൂട്ടി കണ്ട് പരിഹാരം കണ്ടെത്തുക',
      cropLossSlider: 'നഷ്ട ശതമാനം മാറ്റുക',
      estimatedGap: 'പ്രതീക്ഷിക്കുന്ന സാമ്പത്തിക കമ്മിയളവ്',
      recoveryRoutes: 'പരിഹാര മാർഗ്ഗങ്ങളും സഹായങ്ങളും',
      alertsTitle: 'ഷീൽഡ് സുരക്ഷാ മുന്നറിയിപ്പുകൾ'
    },
    weather: {
      title: 'ഫാംസെൻ കാലാവസ്ഥ',
      subtitle: 'കാലാവസ്ഥ മാറ്റങ്ങളും നിങ്ങളുടെ വിളകൾക്കായുള്ള നിർദ്ദേശങ്ങളും',
      selectLocation: 'കൃഷിയിട സ്ഥലം',
      useGps: 'GPS ഉപയോഗിക്കുക',
      advisoryTitle: 'ഇന്നത്തെ കാർഷിക കാലാവസ്ഥാ നിർദ്ദേശം',
      hourlyForecast: 'മണിക്കൂർ തിരിച്ചുള്ള റിപ്പോർട്ട്',
      sevenDayForecast: '7 ദിവസത്തെ കാലാവസ്ഥ പദ്ധതി',
      humidity: 'ഈർപ്പം',
      wind: 'കാറ്റിന്റെ വേഗത',
      rainChance: 'മഴ സാധ്യത',
      rainfall: 'പ്രതീക്ഷിക്കുന്ന മഴ',
      soilImpact: 'മണ്ണ് ഈർപ്പവും ജലസേചന നിർദ്ദേശവും',
      todaySummary: 'ഇന്നത്തെ സംഗ്രഹം',
      meaningTitle: 'ഇന്നത്തെ കാലാവസ്ഥ എന്റെ വിളകൾക്ക് എന്താണ് അർത്ഥമാക്കുന്നത്?'
    },
    cropDoctor: {
      title: 'ഫാംസെൻ വിള ഡോക്ടർ',
      subtitle: 'ക്യാമറ സ്കാൻ വഴി ഇലകളിലെ രോഗങ്ങൾ തിരിച്ചറിയുക',
      scanCrop: 'വിള സ്കാൻ ചെയ്യുക 📷',
      uploadPhoto: 'ഫോട്ടോ അപ്‌ലോഡ് ചെയ്യുക',
      frameGuide: 'രോഗബാധിതമായ ഇല നല്ല വെളിച്ചത്തിൽ ഫ്രെയിമിനുള്ളിൽ വയ്ക്കുക.',
      analyzing: 'വിവരങ്ങൾ കൃഷി ഡാറ്റാബേസുമായി ഒത്തുനോക്കുന്നു...',
      possibleProblem: 'സാധ്യമായ രോഗം',
      confidence: 'കൃത്യത',
      severity: 'തീവ്രത',
      symptoms: 'കണ്ടെത്തിയ ലക്ഷണങ്ങൾ',
      suggestedTreatments: 'ശുപാർശ ചെയ്യുന്ന പ്രതിവിധികൾ',
      organicApproach: 'ജൈവ പരിഹാരം',
      chemicalOption: 'രാസ പരിഹാരം (ആവശ്യമെങ്കിൽ മാത്രം)',
      preventionTips: 'പ്രതിരോധ നിർദ്ദേശങ്ങൾ',
      disclaimer: 'ഇതൊരു സഹായക വിവരമാണ്. ഗുരുതരമായ രോഗബാധയ്ക്ക് കൃഷി ഓഫീസറെ സമീപിക്കുക.',
      history: 'മുൻപ് സ്കാൻ ചെയ്ത വിവരങ്ങൾ'
    },
    ai: {
      title: 'ഫാംസെൻ AI സഹായി',
      subtitle: 'നിങ്ങളുടെ ഭാഷയിലും തോട്ടത്തിലെ സാഹചര്യങ്ങൾക്കനുസരിച്ചും പ്രവർത്തിക്കുന്ന കാർഷിക സഹായി.',
      placeholder: 'വളം, കീടം, മഴ, വിപണി നിരക്കുകൾ എന്നിവയെക്കുറിച്ച് ചോദിക്കൂ...',
      send: 'ചോദിക്കൂ',
      tapToSpeak: 'സംസാരിക്കാൻ തൊടുക 🎙',
      listening: 'ശ്രദ്ധിക്കുന്നു...',
      understanding: 'ചോദ്യം മനസ്സിലാക്കുന്നു...',
      thinking: 'വിവരങ്ങൾ വിശകലനം ചെയ്യുന്നു...',
      speaking: 'മലയാളത്തിൽ മറുപടി നൽകുന്നു...',
      suggestedQuestions: [
        'ഈ ആഴ്ചയിലെ മഴ എന്റെ തക്കാളി കൃഷിയെ ബാധിക്കുമോ?',
        'പൂവിടുന്ന സമയത്ത് എന്ത് വളമാണ് നൽകേണ്ടത്?',
        'അടുത്തുള്ള വിപണിയിൽ ഇന്നത്തെ തക്കാളി വില എത്രയാണ്?',
        'വിളനാശത്തിന് 72 മണിക്കൂറിനുള്ളിൽ PMFBY യിൽ എങ്ങനെ അപേക്ഷിക്കാം?'
      ],
      disclaimer: 'ശാസ്ത്രീയ കാർഷിക നിർദ്ദേശങ്ങളുടെയും തോട്ടത്തിലെ വിവരങ്ങളുടെയും അടിസ്ഥാനത്തിൽ പ്രവർത്തിക്കുന്നു.'
    },
    direct: {
      title: 'ഫാംസെൻ ഡയറക്റ്റ് മാർക്കറ്റ്',
      subtitle: 'വിപണി അറിയാം. കൂടുതൽ അവസരങ്ങൾ കണ്ടെത്താം. മികച്ച രീതിയിൽ വിൽക്കാം.',
      marketPrices: 'വിപണി ലൈവ് നിരക്കുകൾ',
      modalPrice: 'ശരാശരി നിരക്ക്',
      priceTrend: 'പ്രതിവാര ട്രെൻഡ്',
      myListings: 'എന്റെ വിളകൾ',
      listProduceBtn: '+ വിള വിൽക്കാൻ രജിസ്റ്റർ ചെയ്യുക',
      potentialBuyers: 'സ്ഥിരീകരിച്ച നേരിട്ടുള്ള വാങ്ങലുകാർ',
      buyerOfferedPrice: 'നൽകുന്ന വില',
      quantityReq: 'ആവശ്യമായ അളവ്',
      createListingTitle: 'പുതിയ വിൽപ്പന വിവരങ്ങൾ',
      produceCrop: 'വിളയുടെ പേര്',
      quantity: 'ലഭ്യമായ അളവ്',
      expectedRate: 'പ്രതീക്ഷിക്കുന്ന വില (കിലോഗ്രാം/ക്വിന്റൽ)'
    },
    sos: {
      title: 'ഫാംസെൻ അടിയന്തര സഹായം SOS',
      subtitle: 'സർക്കാർ കാർഷിക എമർജൻസി ഹെൽപ്പ്‌ലൈനുകൾ',
      callWarning: 'ഔദ്യോഗിക സർക്കാർ ഹെൽപ്പ്‌ലൈനുകളിലേക്ക് നേരിട്ട് വിളിക്കാം.',
      cropInsuranceHelpline: 'PMFBY കൃഷി രക്ഷക് (ഔദ്യോഗിക 14447)',
      kisanCallCenter: 'കിസാൻ കോൾ സെന്റർ (ടോൾ ഫ്രീ 1800-180-1551)',
      districtOfficer: 'ജില്ലാ കൃഷി ഓഫീസർ',
      emergencyAssistance: 'ദുരന്തനിവാരണ കാർഷിക വിഭാഗം'
    }
  }
};
