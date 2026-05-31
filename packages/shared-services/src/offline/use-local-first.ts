'use client';

import { useCallback, useEffect, useState } from 'react';
import { syncEngine } from './sync-engine';

/**
 * React hook for local-first DuckDB sync with PostgreSQL backend.
 */
export function useLocalFirst() {
  const [isOnline, setIsOnline] = useState(
    typeof navigator !== 'undefined' ? navigator.onLine : true
  );
  const [isSyncing, setIsSyncing] = useState(false);
  const [lastSync, setLastSync] = useState<number | null>(null);

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    syncEngine.initSchema().catch(() => undefined);
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  const sync = useCallback(async () => {
    setIsSyncing(true);
    try {
      await syncEngine.pull();
      setLastSync(Date.now());
    } finally {
      setIsSyncing(false);
    }
  }, []);

  useEffect(() => {
    if (isOnline) {
      sync().catch(() => undefined);
    }
  }, [isOnline, sync]);

  return { isOnline, isSyncing, lastSync, sync };
}
