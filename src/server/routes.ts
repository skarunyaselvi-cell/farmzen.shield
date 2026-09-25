import { Router, Request, Response } from 'express';
import { db } from './db';
import { analyzeCropImage, askFarmZenAI } from './geminiService';
import { Farm, Crop, FarmFinances, Expense, Income, ProductListing, LanguageCode } from '../types';

export const apiRouter = Router();

// Health check
apiRouter.get('/health', (req: Request, res: Response) => {
  res.json({
    status: 'UP',
    platform: 'FARMZEN MASTER AGRICULTURE PLATFORM',
    version: '2026.1.0',
    services: {
      shieldEngine: 'OPERATIONAL',
      weatherService: 'OPERATIONAL (IMD Synced)',
      cropDoctorAI: 'OPERATIONAL (Gemini 3.8 Flash Multimodal)',
      marketDirect: 'OPERATIONAL (e-NAM Benchmark)',
      sosHelplines: 'OPERATIONAL (Verified PMFBY 14447)'
    },
    timestamp: new Date().toISOString()
  });
});

// Auth endpoints
apiRouter.post('/auth/login', (req: Request, res: Response) => {
  const { mobile } = req.body;
  const user = db.users.find(u => u.mobile === mobile) || db.users[0];
  const profile = db.farmerProfiles.find(p => p.user_id === user.id) || db.farmerProfiles[0];
  res.json({
    success: true,
    token: 'jwt-token-farmzen-' + user.id,
    user,
    profile
  });
});

apiRouter.post('/auth/register', (req: Request, res: Response) => {
  const { fullName, mobile, village, district, state, language = 'en' } = req.body;
  const newUser = {
    id: 'usr-' + Date.now(),
    uuid: 'usr-uuid-' + Date.now(),
    mobile: mobile || '9876543210',
    email: `${(fullName || 'farmer').toLowerCase().replace(/\s+/g, '')}@farmzen.in`,
    role: 'FARMER' as const,
    language: (language as LanguageCode) || 'en',
    is_verified: true,
    is_active: true,
    created_at: new Date().toISOString()
  };
  db.users.push(newUser);

  const newProfile = {
    id: 'prof-' + Date.now(),
    user_id: newUser.id,
    full_name: fullName || 'M. Selvam',
    village: village || 'Ammapettai',
    taluk: 'Papanasam',
    block: district ? `${district} Central` : 'Delta Zone',
    district: district || 'Thanjavur',
    state: state || 'Tamil Nadu',
    pincode: '614401',
    preferred_language: (language as LanguageCode) || 'en',
    created_at: new Date().toISOString()
  };
  db.farmerProfiles.push(newProfile);

  res.json({
    success: true,
    token: 'jwt-token-farmzen-' + newUser.id,
    user: newUser,
    profile: newProfile
  });
});

apiRouter.get('/auth/me', (req: Request, res: Response) => {
  const user = db.users[0];
  const profile = db.farmerProfiles.find(p => p.user_id === user.id) || db.farmerProfiles[0];
  res.json({ user, profile });
});

// Farms endpoints
apiRouter.get('/farms', (req: Request, res: Response) => {
  res.json({ success: true, data: db.farms });
});

apiRouter.get('/farms/:farmId', (req: Request, res: Response) => {
  const farm = db.farms.find(f => f.id === req.params.farmId) || db.farms[0];
  res.json({ success: true, data: farm });
});

apiRouter.post('/farms', (req: Request, res: Response) => {
  const farmData = req.body;
  const newFarm: Farm = {
    id: 'farm-' + Date.now(),
    farmer_id: db.users[0].id,
    farm_name: farmData.farm_name || 'My New Farm',
    ownership_type: farmData.ownership_type || 'OWNED',
    area_acres: Number(farmData.area_acres) || 3.0,
    latitude: Number(farmData.latitude) || 10.7870,
    longitude: Number(farmData.longitude) || 79.1378,
    village: farmData.village || 'Ammapettai',
    taluk: farmData.taluk || 'Papanasam',
    district: farmData.district || 'Thanjavur',
    state: farmData.state || 'Tamil Nadu',
    soil_type: farmData.soil_type || 'Alluvial Loam',
    water_source: farmData.water_source || 'Borewell & Canal',
    irrigation_type: farmData.irrigation_type || 'Drip Irrigation',
    farm_goal: farmData.farm_goal || 'Protect crop & maximize income',
    created_at: new Date().toISOString()
  };
  db.farms.push(newFarm);
  res.status(201).json({ success: true, data: newFarm });
});

// Crops
apiRouter.get('/farms/:farmId/crops', (req: Request, res: Response) => {
  const crops = db.crops.filter(c => c.farm_id === req.params.farmId);
  res.json({ success: true, data: crops.length ? crops : [db.crops[0]] });
});

apiRouter.post('/farms/:farmId/crops', (req: Request, res: Response) => {
  const cData = req.body;
  const newCrop: Crop = {
    id: 'crop-' + Date.now(),
    farm_id: req.params.farmId,
    crop_name: cData.crop_name || 'Tomato',
    local_name: cData.local_name || cData.crop_name || 'Thakkali',
    variety: cData.variety || 'Hybrid Improved',
    crop_category: cData.crop_category || 'Vegetable',
    planting_date: cData.planting_date || new Date().toISOString().split('T')[0],
    expected_harvest_date: cData.expected_harvest_date || '2026-11-20',
    crop_stage: cData.crop_stage || 'Vegetative Growth',
    area_acres: Number(cData.area_acres) || 2.0,
    soil_type: cData.soil_type || 'Loamy',
    irrigation_method: cData.irrigation_method || 'Drip',
    health_status: 'HEALTHY',
    created_at: new Date().toISOString()
  };
  db.crops.push(newCrop);
  res.status(201).json({ success: true, data: newCrop });
});

// Finances
apiRouter.get('/farms/:farmId/finances', (req: Request, res: Response) => {
  const fin = db.finances.find(f => f.farm_id === req.params.farmId) || db.finances[0];
  res.json({ success: true, data: fin });
});

apiRouter.put('/farms/:farmId/finances', (req: Request, res: Response) => {
  const existingFin = db.finances.find(f => f.farm_id === req.params.farmId);
  if (existingFin) {
    Object.assign(existingFin, req.body);
    res.json({ success: true, data: existingFin });
  } else {
    const newFin: FarmFinances = {
      ...db.finances[0],
      ...req.body,
      id: 'fin-' + Date.now(),
      farm_id: req.params.farmId
    };
    db.finances.push(newFin);
    res.json({ success: true, data: newFin });
  }
});

// Expenses & Income
apiRouter.get('/farms/:farmId/expenses', (req: Request, res: Response) => {
  const exp = db.expenses.filter(e => e.farm_id === req.params.farmId);
  res.json({ success: true, data: exp });
});

apiRouter.post('/farms/:farmId/expenses', (req: Request, res: Response) => {
  const newExp: Expense = {
    id: 'exp-' + Date.now(),
    farm_id: req.params.farmId,
    category: req.body.category || 'OTHER',
    description: req.body.description || 'Agricultural expense',
    amount: Number(req.body.amount) || 0,
    expense_date: req.body.expense_date || new Date().toISOString().split('T')[0],
    created_at: new Date().toISOString()
  };
  db.expenses.unshift(newExp);
  res.status(201).json({ success: true, data: newExp });
});

apiRouter.get('/farms/:farmId/income', (req: Request, res: Response) => {
  const inc = db.income.filter(i => i.farm_id === req.params.farmId);
  res.json({ success: true, data: inc });
});

apiRouter.post('/farms/:farmId/income', (req: Request, res: Response) => {
  const newInc: Income = {
    id: 'inc-' + Date.now(),
    farm_id: req.params.farmId,
    source: req.body.source || 'Produce Sale',
    amount: Number(req.body.amount) || 0,
    income_date: req.body.income_date || new Date().toISOString().split('T')[0],
    crop_id: req.body.crop_id,
    description: req.body.description || 'Harvest revenue',
    created_at: new Date().toISOString()
  };
  db.income.unshift(newInc);
  res.status(201).json({ success: true, data: newInc });
});

// Weather
apiRouter.get('/farms/:farmId/weather/current', (req: Request, res: Response) => {
  const data = db.getWeatherForFarm(req.params.farmId);
  res.json({ success: true, data, source: 'India Meteorological Department (IMD)' });
});

apiRouter.get('/farms/:farmId/weather/advisory', (req: Request, res: Response) => {
  const data = db.getFarmAdvisories(req.params.farmId);
  res.json({ success: true, data });
});

// Shield
apiRouter.get('/shield/:farmId/risk', (req: Request, res: Response) => {
  const risk = db.calculateFarmRisk(req.params.farmId);
  res.json({ success: true, data: risk });
});

apiRouter.post('/shield/:farmId/simulate', (req: Request, res: Response) => {
  const lossPercentage = Number(req.body.loss_percentage ?? 25);
  const sim = db.simulateCropLoss(req.params.farmId, lossPercentage);
  res.json({ success: true, data: sim });
});

// Crop Doctor AI
apiRouter.post('/crop-doctor/scan', async (req: Request, res: Response) => {
  try {
    const { imageBase64, mimeType = 'image/jpeg', cropHint = 'Crop Leaf' } = req.body;
    const result = await analyzeCropImage(imageBase64 || '', mimeType, cropHint);
    res.json({ success: true, data: result });
  } catch (err: any) {
    res.status(500).json({ success: false, message: err?.message || 'Error diagnosing crop' });
  }
});

apiRouter.get('/crop-doctor/history', (req: Request, res: Response) => {
  res.json({ success: true, data: db.recentScans });
});

// FarmZen AI Chat
apiRouter.post('/ai/chat', async (req: Request, res: Response) => {
  try {
    const { message, farmId, language = 'en' } = req.body;
    const farm_id = farmId || db.farms[0].id;
    const reply = await askFarmZenAI(message, farm_id, language as LanguageCode);
    res.json({ success: true, data: reply });
  } catch (err: any) {
    res.status(500).json({ success: false, message: err?.message || 'Error processing AI chat' });
  }
});

// Direct Market
apiRouter.get('/direct/market-prices', (req: Request, res: Response) => {
  res.json({ success: true, data: db.marketPrices });
});

apiRouter.get('/direct/listings', (req: Request, res: Response) => {
  res.json({ success: true, data: db.listings });
});

apiRouter.post('/direct/listings', (req: Request, res: Response) => {
  const lData = req.body;
  const newListing: ProductListing = {
    id: 'list-' + Date.now(),
    farmer_id: db.users[0].id,
    farmer_name: db.farmerProfiles[0].full_name,
    crop_name: lData.crop_name || 'Vegetables',
    variety: lData.variety || 'Standard Quality',
    quantity: Number(lData.quantity) || 500,
    unit: lData.unit || 'kg',
    expected_price: Number(lData.expected_price) || 30,
    harvest_date: lData.harvest_date || '2026-10-05',
    location: lData.location || db.farms[0].village,
    quality_grade: lData.quality_grade || 'Grade-A',
    delivery_preference: lData.delivery_preference || 'Farm Gate Pickup',
    status: 'ACTIVE',
    photo_url: lData.photo_url,
    created_at: new Date().toISOString()
  };
  db.listings.unshift(newListing);
  res.status(201).json({ success: true, data: newListing });
});

apiRouter.get('/direct/buyers', (req: Request, res: Response) => {
  res.json({ success: true, data: db.buyers });
});

// SOS Contacts
apiRouter.get('/sos/contacts', (req: Request, res: Response) => {
  res.json({ success: true, data: db.sosContacts });
});

// Notifications
apiRouter.get('/notifications', (req: Request, res: Response) => {
  res.json({ success: true, data: db.notifications });
});

apiRouter.put('/notifications/:id/read', (req: Request, res: Response) => {
  const notif = db.notifications.find(n => n.id === req.params.id);
  if (notif) notif.is_read = true;
  res.json({ success: true, data: notif });
});

// Schemes
apiRouter.get('/schemes', (req: Request, res: Response) => {
  res.json({ success: true, data: db.schemes });
});

// Admin
apiRouter.get('/admin/overview', (req: Request, res: Response) => {
  res.json({
    success: true,
    data: {
      total_users: db.users.length,
      total_farms: db.farms.length,
      total_crops: db.crops.length,
      active_listings: db.listings.length,
      verified_buyers: db.buyers.length,
      data_sources: db.dataSources,
      audit_logs: db.auditLogs
    }
  });
});

// Offline Sync endpoint
apiRouter.post('/sync', (req: Request, res: Response) => {
  const { queue } = req.body;
  console.log(`Received offline sync batch: ${queue?.length || 0} operations.`);
  res.json({
    success: true,
    processed: queue?.length || 0,
    synced_at: new Date().toISOString()
  });
});
