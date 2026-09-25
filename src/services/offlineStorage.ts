// Offline and Low-Network Storage Engine for FARMZEN

export interface SyncOperation {
  id: string;
  type: 'EXPENSE_ADD' | 'LISTING_ADD' | 'FARM_UPDATE' | 'CROP_SCAN';
  payload: any;
  timestamp: string;
}

class OfflineStorageManager {
  private queueKey = 'farmzen_sync_queue';

  isOnline(): boolean {
    return typeof navigator !== 'undefined' ? navigator.onLine : true;
  }

  getSyncQueue(): SyncOperation[] {
    try {
      const data = localStorage.getItem(this.queueKey);
      return data ? JSON.parse(data) : [];
    } catch {
      return [];
    }
  }

  addToSyncQueue(type: SyncOperation['type'], payload: any) {
    const queue = this.getSyncQueue();
    const op: SyncOperation = {
      id: 'sync-' + Date.now(),
      type,
      payload,
      timestamp: new Date().toISOString()
    };
    queue.push(op);
    localStorage.setItem(this.queueKey, JSON.stringify(queue));
    return op;
  }

  clearSyncQueue() {
    localStorage.removeItem(this.queueKey);
  }

  saveCache(key: string, data: any) {
    try {
      localStorage.setItem(`farmzen_cache_${key}`, JSON.stringify({
        data,
        timestamp: new Date().toISOString()
      }));
    } catch (e) {
      console.warn('Storage quota reached or error writing cache:', e);
    }
  }

  getCache<T>(key: string): { data: T; timestamp: string } | null {
    try {
      const item = localStorage.getItem(`farmzen_cache_${key}`);
      return item ? JSON.parse(item) : null;
    } catch {
      return null;
    }
  }
}

export const offlineStorage = new OfflineStorageManager();
