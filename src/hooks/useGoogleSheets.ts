import { useCallback, useEffect, useRef, useState } from 'react';
import {
  fetchWorkshops,
  fetchRecipes,
  fetchVideos,
  fetchAbout,
  fetchCommittees,
  fetchUniversities,
} from '../services/googleSheetsService';
import useContentStore, { ContentType } from '../store/contentStore';
import { Workshop, Recipe, Video, About, Committee, University } from '../types';

// ─── Types ────────────────────────────────────────────────────────────────────

type DataMap = {
  workshops: Workshop;
  recipes: Recipe;
  videos: Video;
  about: About;
  committees: Committee;
  universities: University;
};

interface UseGoogleSheetsResult<T extends ContentType> {
  data: DataMap[T][] | null;
  loading: boolean;
  error: string | null;
  refetch: () => void;
}

// ─── Constants ────────────────────────────────────────────────────────────────

const CACHE_TTL_MS = 5 * 60 * 1000; // 5 minutes

const fetchers: Record<ContentType, () => Promise<any>> = {
  workshops: fetchWorkshops,
  recipes: fetchRecipes,
  videos: fetchVideos,
  about: fetchAbout,
  committees: fetchCommittees,
  universities: fetchUniversities,
};

// ─── Hook ─────────────────────────────────────────────────────────────────────

function useGoogleSheets<T extends ContentType>(type: T): UseGoogleSheetsResult<T> {
  const store = useContentStore();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Prevents double-fetch in React 18 strict mode
  const fetchingRef = useRef(false);

  const isCacheFresh = useCallback(() => {
    const lastSync = store.lastSyncTime[type];
    return store[type] !== null && lastSync !== undefined && Date.now() - lastSync < CACHE_TTL_MS;
  }, [store, type]);

  const setters: Record<ContentType, (data: any[]) => void> = {
    workshops: store.setWorkshops,
    recipes: store.setRecipes,
    videos: store.setVideos,
    about: store.setAbout,
    committees: store.setCommittees,
    universities: store.setUniversities,
  };

  const load = useCallback(async () => {
    if (fetchingRef.current) return;
    fetchingRef.current = true;

    setLoading(true);
    setError(null);

    try {
      const result = await fetchers[type]();
      if ('error' in result) {
        setError(result.error);
      } else {
        setters[type](result);
      }
    } finally {
      setLoading(false);
      fetchingRef.current = false;
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [type]);

  useEffect(() => {
    if (!isCacheFresh()) {
      load();
    }
  }, [isCacheFresh, load]);

  const refetch = useCallback(() => {
    fetchingRef.current = false;
    load();
  }, [load]);

  return {
    data: (store[type] as DataMap[T][] | null),
    loading,
    error,
    refetch,
  };
}

export default useGoogleSheets;
