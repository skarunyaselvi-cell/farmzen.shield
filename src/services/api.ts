import {
  Farm, Crop, FarmFinances, Expense, Income, WeatherData, FarmAdvisory,
  ShieldRiskOverview, WhatIfSimulation, CropScanResult, MarketPrice,
  ProductListing, BuyerProfile, SOSContact, NotificationItem, GovernmentScheme,
  LanguageCode
} from '../types';
import { offlineStorage } from './offlineStorage';

async function fetchWithFallback<T>(url: string, options?: RequestInit, cacheKey?: string): Promise<T> {
  try {
    const res = await fetch(url, options);
    if (!res.ok) {
      throw new Error(`HTTP error ${res.status}`);
    }
    const json = await res.json();
    const data = json.data !== undefined ? json.data : json;
    if (cacheKey) {
      offlineStorage.saveCache(cacheKey, data);
    }
    return data as T;
  } catch (err) {
    if (cacheKey) {
      const cached = offlineStorage.getCache<T>(cacheKey);
      if (cached) {
        console.info(`[FARMZEN Offline] Served ${cacheKey} from local cached snapshot`);
        return cached.data;
      }
    }
    throw err;
  }
}

export const farmApi = {
  getFarms: () => fetchWithFallback<Farm[]>('/api/farms', undefined, 'farms'),
  getFarm: (id: string) => fetchWithFallback<Farm>(`/api/farms/${id}`, undefined, `farm_${id}`),
  createFarm: async (data: Partial<Farm>) => {
    try {
      const res = await fetch('/api/farms', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      return await res.json();
    } catch {
      offlineStorage.addToSyncQueue('FARM_UPDATE', data);
      return { success: true, data: { ...data, id: 'offline-farm-' + Date.now() }, offline: true };
    }
  },
  getCrops: (farmId: string) => fetchWithFallback<Crop[]>(`/api/farms/${farmId}/crops`, undefined, `crops_${farmId}`),
  getFinances: (farmId: string) => fetchWithFallback<FarmFinances>(`/api/farms/${farmId}/finances`, undefined, `finances_${farmId}`),
  getExpenses: (farmId: string) => fetchWithFallback<Expense[]>(`/api/farms/${farmId}/expenses`, undefined, `expenses_${farmId}`),
  addExpense: async (farmId: string, expense: Partial<Expense>) => {
    try {
      const res = await fetch(`/api/farms/${farmId}/expenses`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(expense)
      });
      return await res.json();
    } catch {
      offlineStorage.addToSyncQueue('EXPENSE_ADD', { farmId, ...expense });
      return { success: true, data: { ...expense, id: 'offline-exp-' + Date.now() }, offline: true };
    }
  },
  getIncome: (farmId: string) => fetchWithFallback<Income[]>(`/api/farms/${farmId}/income`, undefined, `income_${farmId}`)
};

export const weatherApi = {
  getCurrent: (farmId: string) => fetchWithFallback<WeatherData>(`/api/farms/${farmId}/weather/current`, undefined, `weather_${farmId}`),
  getAdvisories: (farmId: string) => fetchWithFallback<FarmAdvisory[]>(`/api/farms/${farmId}/weather/advisory`, undefined, `weather_adv_${farmId}`)
};

export const shieldApi = {
  getRisk: (farmId: string) => fetchWithFallback<ShieldRiskOverview>(`/api/shield/${farmId}/risk`, undefined, `shield_risk_${farmId}`),
  simulateLoss: async (farmId: string, lossPercentage: number) => {
    return fetchWithFallback<WhatIfSimulation>('/api/shield/' + farmId + '/simulate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ loss_percentage: lossPercentage })
    }, `shield_sim_${farmId}_${lossPercentage}`);
  }
};

export const cropDoctorApi = {
  scanImage: async (imageBase64: string, cropHint?: string) => {
    const res = await fetch('/api/crop-doctor/scan', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ imageBase64, cropHint })
    });
    const json = await res.json();
    return json.data as CropScanResult;
  },
  getHistory: () => fetchWithFallback<CropScanResult[]>('/api/crop-doctor/history', undefined, 'crop_scans')
};

export const aiApi = {
  chat: async (message: string, farmId: string, language: LanguageCode = 'en') => {
    const res = await fetch('/api/ai/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message, farmId, language })
    });
    const json = await res.json();
    return json.data as { text: string; source: string; audioAvailable: boolean };
  }
};

export const marketApi = {
  getMarketPrices: () => fetchWithFallback<MarketPrice[]>('/api/direct/market-prices', undefined, 'market_prices'),
  getListings: () => fetchWithFallback<ProductListing[]>('/api/direct/listings', undefined, 'direct_listings'),
  createListing: async (listing: Partial<ProductListing>) => {
    try {
      const res = await fetch('/api/direct/listings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(listing)
      });
      return await res.json();
    } catch {
      offlineStorage.addToSyncQueue('LISTING_ADD', listing);
      return { success: true, data: { ...listing, id: 'offline-listing-' + Date.now() }, offline: true };
    }
  },
  getBuyers: () => fetchWithFallback<BuyerProfile[]>('/api/direct/buyers', undefined, 'direct_buyers')
};

export const sosApi = {
  getContacts: () => fetchWithFallback<SOSContact[]>('/api/sos/contacts', undefined, 'sos_contacts')
};

export const notificationsApi = {
  getAll: () => fetchWithFallback<NotificationItem[]>('/api/notifications', undefined, 'notifications'),
  markRead: async (id: string) => {
    await fetch(`/api/notifications/${id}/read`, { method: 'PUT' });
  }
};

export const schemesApi = {
  getAll: () => fetchWithFallback<GovernmentScheme[]>('/api/schemes', undefined, 'schemes')
};

export const adminApi = {
  getOverview: () => fetchWithFallback<any>('/api/admin/overview')
};

export const syncApi = {
  syncQueue: async (queue: any[]) => {
    const res = await fetch('/api/sync', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ queue })
    });
    return await res.json();
  }
};
