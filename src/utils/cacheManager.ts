// Cache Manager Utility
export class CacheManager {
  private static instance: CacheManager;
  private swRegistration: ServiceWorkerRegistration | null = null;

  private constructor() {}

  static getInstance(): CacheManager {
    if (!CacheManager.instance) {
      CacheManager.instance = new CacheManager();
    }
    return CacheManager.instance;
  }

  // Register service worker
  async registerServiceWorker(): Promise<void> {
    if ('serviceWorker' in navigator) {
      try {
        this.swRegistration = await navigator.serviceWorker.register('/sw.js');
        console.log('Service Worker registered successfully:', this.swRegistration);
        
        // Listen for updates
        this.swRegistration.addEventListener('updatefound', () => {
          const newWorker = this.swRegistration!.installing;
          if (newWorker) {
            newWorker.addEventListener('statechange', () => {
              if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                // New content is available, automatically update
                this.autoUpdate();
              }
            });
          }
        });
      } catch (error) {
        console.error('Service Worker registration failed:', error);
      }
    }
  }

  // Clear all caches (PWA + Browser)
  async clearAllCaches(): Promise<void> {
    try {
      // Clear PWA caches
      if ('caches' in window) {
        const cacheNames = await caches.keys();
        await Promise.all(
          cacheNames.map(cacheName => {
            console.log('Clearing PWA cache:', cacheName);
            return caches.delete(cacheName);
          })
        );
      }

      // Clear browser cache for the domain
      if ('caches' in window) {
        await caches.delete('portfolio-cache-v1');
      }

      // Clear service worker cache
      if (this.swRegistration) {
        this.swRegistration.active?.postMessage({ type: 'CLEAR_CACHE' });
      }

      // Clear localStorage and sessionStorage
      localStorage.clear();
      sessionStorage.clear();

      // Clear IndexedDB
      if ('indexedDB' in window) {
        const databases = await window.indexedDB.databases();
        databases.forEach(db => {
          if (db.name) {
            window.indexedDB.deleteDatabase(db.name);
          }
        });
      }

      console.log('All caches cleared successfully');
    } catch (error) {
      console.error('Error clearing caches:', error);
    }
  }

  // Clear specific cache
  async clearCache(cacheName: string): Promise<void> {
    try {
      if ('caches' in window) {
        await caches.delete(cacheName);
        console.log(`Cache cleared: ${cacheName}`);
      }
    } catch (error) {
      console.error(`Error clearing cache ${cacheName}:`, error);
    }
  }

  // Force update and reload
  async forceUpdate(): Promise<void> {
    try {
      // Clear all caches
      await this.clearAllCaches();
      
      // Unregister service worker
      if (this.swRegistration) {
        await this.swRegistration.unregister();
      }
      
      // Reload the page
      window.location.reload();
    } catch (error) {
      console.error('Error forcing update:', error);
    }
  }

  // Automatic update without user interaction
  private async autoUpdate(): Promise<void> {
    try {
      console.log('Auto-updating application...');
      
      // Clear all caches
      await this.clearAllCaches();
      
      // Reload the page to get fresh content
      window.location.reload();
    } catch (error) {
      console.error('Error during auto-update:', error);
    }
  }

  // Check for updates
  async checkForUpdates(): Promise<void> {
    if (this.swRegistration) {
      await this.swRegistration.update();
    }
  }

  // Get cache status
  async getCacheStatus(): Promise<{ pwa: boolean; browser: boolean }> {
    const status = {
      pwa: false,
      browser: false
    };

    try {
      if ('serviceWorker' in navigator) {
        status.pwa = !!navigator.serviceWorker.controller;
      }
      
      if ('caches' in window) {
        const cacheNames = await caches.keys();
        status.browser = cacheNames.length > 0;
      }
    } catch (error) {
      console.error('Error checking cache status:', error);
    }

    return status;
  }
}

// Export singleton instance
export const cacheManager = CacheManager.getInstance();
