import React, { useState, useEffect } from 'react';
import {
  Farm, Crop, FarmFinances, WeatherData, ShieldRiskOverview, MarketPrice,
  ProductListing, BuyerProfile, SOSContact, NotificationItem, CropScanResult,
  LanguageCode
} from './types';
import { translations } from './i18n/translations';
import {
  farmApi, weatherApi, shieldApi, marketApi, cropDoctorApi, sosApi,
  notificationsApi, syncApi
} from './services/api';
import { offlineStorage } from './services/offlineStorage';
import { SplashScreen } from './components/SplashScreen';
import { Header } from './components/Header';
import { Sidebar } from './components/Sidebar';
import { BottomNav } from './components/BottomNav';
import { SosModal } from './components/SosModal';
import { NotificationsModal } from './components/NotificationsModal';

import { AuthPage } from './pages/AuthPage';
import { LanguageSelectionPage } from './pages/LanguageSelectionPage';
import { OnboardingPage } from './pages/OnboardingPage';
import { DashboardPage } from './pages/DashboardPage';
import { ShieldPage } from './pages/ShieldPage';
import { WeatherPage } from './pages/WeatherPage';
import { CropDoctorPage } from './pages/CropDoctorPage';
import { FarmAIPage } from './pages/FarmAIPage';
import { DirectPage } from './pages/DirectPage';
import { AdminPage } from './pages/AdminPage';

type FlowState = 'splash' | 'auth' | 'language' | 'onboarding' | 'app';

export default function App() {
  const [flowState, setFlowState] = useState<FlowState>('splash');
  const [currentTab, setCurrentTab] = useState<string>('dashboard');
  const [language, setLanguage] = useState<LanguageCode>('en');
  const [farmerName, setFarmerName] = useState<string>('Karunya');

  const [isOffline, setIsOffline] = useState<boolean>(
    typeof navigator !== 'undefined' ? !navigator.onLine : false
  );

  // Core Farm Data State
  const [farms, setFarms] = useState<Farm[]>([]);
  const [currentFarm, setCurrentFarm] = useState<Farm | null>(null);
  const [crops, setCrops] = useState<Crop[]>([]);
  const [currentCrop, setCurrentCrop] = useState<Crop | null>(null);
  const [finances, setFinances] = useState<FarmFinances | null>(null);
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [advisories, setAdvisories] = useState<any[]>([]);
  const [risk, setRisk] = useState<ShieldRiskOverview | null>(null);
  const [marketPrices, setMarketPrices] = useState<MarketPrice[]>([]);
  const [listings, setListings] = useState<ProductListing[]>([]);
  const [buyers, setBuyers] = useState<BuyerProfile[]>([]);
  const [recentScans, setRecentScans] = useState<CropScanResult[]>([]);
  const [sosContacts, setSosContacts] = useState<SOSContact[]>([]);
  const [notifications, setNotifications] = useState<NotificationItem[]>([]);

  // Modals
  const [sosOpen, setSosOpen] = useState<boolean>(false);
  const [notificationsOpen, setNotificationsOpen] = useState<boolean>(false);

  // Online / Offline synchronization listeners
  useEffect(() => {
    const handleOnline = () => {
      setIsOffline(false);
      const queue = offlineStorage.getSyncQueue();
      if (queue.length > 0) {
        console.log('[FARMZEN] Online connection restored. Syncing queue...');
        syncApi.syncQueue(queue).then(() => {
          offlineStorage.clearSyncQueue();
          console.log('[FARMZEN] Offline sync completed successfully.');
        });
      }
    };
    const handleOffline = () => setIsOffline(true);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  // Saved language preference in localStorage
  useEffect(() => {
    const savedLang = localStorage.getItem('farmzen_lang') as LanguageCode;
    if (savedLang && translations[savedLang]) {
      setLanguage(savedLang);
    }
  }, []);

  const handleSelectLanguage = (lang: LanguageCode) => {
    setLanguage(lang);
    localStorage.setItem('farmzen_lang', lang);
  };

  // Load backend data
  const loadCoreData = async () => {
    try {
      const farmsList = await farmApi.getFarms();
      setFarms(farmsList);
      const activeFarm = farmsList[0];
      setCurrentFarm(activeFarm);

      if (activeFarm) {
        const [cropsList, fin, wthr, adv, rsk, mp, list, byrs, scans, sos, notifs] =
          await Promise.all([
            farmApi.getCrops(activeFarm.id),
            farmApi.getFinances(activeFarm.id),
            weatherApi.getCurrent(activeFarm.id),
            weatherApi.getAdvisories(activeFarm.id),
            shieldApi.getRisk(activeFarm.id),
            marketApi.getMarketPrices(),
            marketApi.getListings(),
            marketApi.getBuyers(),
            cropDoctorApi.getHistory(),
            sosApi.getContacts(),
            notificationsApi.getAll()
          ]);

        setCrops(cropsList);
        setCurrentCrop(cropsList[0] || null);
        setFinances(fin);
        setWeather(wthr);
        setAdvisories(adv);
        setRisk(rsk);
        setMarketPrices(mp);
        setListings(list);
        setBuyers(byrs);
        setRecentScans(scans);
        setSosContacts(sos);
        setNotifications(notifs);
      }
    } catch (err) {
      console.warn('Initial data load completed via local cache fallback:', err);
    }
  };

  useEffect(() => {
    loadCoreData();
  }, []);

  // When farmer switches farm
  const handleSelectFarm = async (farm: Farm) => {
    setCurrentFarm(farm);
    try {
      const [cropsList, fin, wthr, adv, rsk] = await Promise.all([
        farmApi.getCrops(farm.id),
        farmApi.getFinances(farm.id),
        weatherApi.getCurrent(farm.id),
        weatherApi.getAdvisories(farm.id),
        shieldApi.getRisk(farm.id)
      ]);
      setCrops(cropsList);
      setCurrentCrop(cropsList[0] || null);
      setFinances(fin);
      setWeather(wthr);
      setAdvisories(adv);
      setRisk(rsk);
    } catch (err) {
      console.warn('Error loading switched farm data:', err);
    }
  };

  // 1. SPLASH SCREEN (2-3 seconds)
  if (flowState === 'splash') {
    return (
      <SplashScreen
        onFinish={() => {
          // After splash, ALWAYS go to Login/Register as mandated by user spec!
          setFlowState('auth');
        }}
      />
    );
  }

  // 2. AUTH SCREEN (Login / Register)
  if (flowState === 'auth') {
    return (
      <AuthPage
        language={language}
        onSuccess={(name, isNewUser) => {
          setFarmerName(name);
          if (isNewUser) {
            // New user goes: Language -> Onboarding -> Dashboard
            setFlowState('language');
          } else {
            // Returning user goes directly to Dashboard
            setFlowState('app');
          }
        }}
        onQuickDemo={() => {
          // Instant demo farm review
          setFarmerName('Karunya');
          setFlowState('app');
        }}
      />
    );
  }

  // 3. LANGUAGE SELECTION SCREEN
  if (flowState === 'language') {
    return (
      <LanguageSelectionPage
        selectedLanguage={language}
        onSelectLanguage={handleSelectLanguage}
        onContinue={() => setFlowState('onboarding')}
      />
    );
  }

  // 4. MULTI-STEP ONBOARDING WIZARD (Step 1 to 4)
  if (flowState === 'onboarding') {
    return (
      <OnboardingPage
        language={language}
        farmerName={farmerName}
        onFinishOnboarding={(newFarm) => {
          setCurrentFarm(newFarm);
          setFarms(prev => [newFarm, ...prev]);
          loadCoreData();
          setFlowState('app');
        }}
      />
    );
  }

  const unreadNotifs = notifications.filter(n => !n.is_read).length;

  // 5. MAIN APPLICATION (Dashboard & 5 Interactive Modules)
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex font-sans transition-colors">
      {/* Desktop Left Sidebar Navigation */}
      {currentFarm && (
        <Sidebar
          currentTab={currentTab}
          onSelectTab={setCurrentTab}
          language={language}
          onOpenSos={() => setSosOpen(true)}
          onOpenNotifications={() => setNotificationsOpen(true)}
          unreadCount={unreadNotifs}
          farmerName={farmerName}
          farmName={currentFarm.farm_name}
          onLogout={() => setFlowState('auth')}
        />
      )}

      {/* Right Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Header */}
        {currentFarm && (
          <Header
            currentTab={currentTab}
            onSelectTab={setCurrentTab}
            language={language}
            onSelectLanguage={handleSelectLanguage}
            currentFarm={currentFarm}
            farms={farms}
            onSelectFarm={handleSelectFarm}
            isOffline={isOffline}
            onOpenSos={() => setSosOpen(true)}
            onOpenNotifications={() => setNotificationsOpen(true)}
            unreadCount={unreadNotifs}
          />
        )}

        {/* Main View Area */}
        <main className="flex-1 w-full mx-auto px-4 sm:px-6 pt-5">
          {currentFarm && currentCrop && weather && risk && finances ? (
            <>
              {currentTab === 'dashboard' && (
                <DashboardPage
                  currentFarm={currentFarm}
                  currentCrop={currentCrop}
                  weather={weather}
                  risk={risk}
                  marketPrices={marketPrices}
                  language={language}
                  onNavigate={setCurrentTab}
                  onOpenVoiceAI={() => setCurrentTab('ai')}
                  farmerName={farmerName}
                />
              )}

              {currentTab === 'shield' && (
                <ShieldPage
                  currentFarm={currentFarm}
                  finances={finances}
                  risk={risk}
                  language={language}
                  onOpenSos={() => setSosOpen(true)}
                />
              )}

              {currentTab === 'weather' && (
                <WeatherPage
                  currentFarm={currentFarm}
                  currentCrop={currentCrop}
                  weather={weather}
                  advisories={advisories}
                  language={language}
                />
              )}

              {currentTab === 'cropDoctor' && (
                <CropDoctorPage
                  currentCrop={currentCrop}
                  recentScans={recentScans}
                  language={language}
                  onOpenSos={() => setSosOpen(true)}
                />
              )}

              {currentTab === 'ai' && (
                <FarmAIPage
                  currentFarm={currentFarm}
                  currentCrop={currentCrop}
                  language={language}
                />
              )}

              {currentTab === 'direct' && (
                <DirectPage
                  currentFarm={currentFarm}
                  currentCrop={currentCrop}
                  marketPrices={marketPrices}
                  listings={listings}
                  buyers={buyers}
                  language={language}
                  onRefreshListings={loadCoreData}
                />
              )}

              {currentTab === 'admin' && (
                <AdminPage language={language} />
              )}
            </>
          ) : (
            <div className="py-24 text-center space-y-3">
              <div className="w-12 h-12 rounded-full border-4 border-emerald-500 border-t-transparent animate-spin mx-auto" />
              <p className="text-xs text-slate-500 font-mono tracking-wider">
                CALIBRATING FARM DATA...
              </p>
            </div>
          )}
        </main>

        {/* Mobile Ergonomic Bottom Nav */}
        <BottomNav
          currentTab={currentTab}
          onSelectTab={setCurrentTab}
          language={language}
          onOpenSos={() => setSosOpen(true)}
        />
      </div>

      {/* Verified SOS Emergency Modal */}
      <SosModal
        isOpen={sosOpen}
        onClose={() => setSosOpen(false)}
        contacts={sosContacts}
        language={language}
      />

      {/* Notifications Modal */}
      <NotificationsModal
        isOpen={notificationsOpen}
        onClose={() => setNotificationsOpen(false)}
        notifications={notifications}
        onMarkRead={(id) => {
          notificationsApi.markRead(id);
          setNotifications(prev => prev.map(n => n.id === id ? { ...n, is_read: true } : n));
        }}
        language={language}
      />
    </div>
  );
}
