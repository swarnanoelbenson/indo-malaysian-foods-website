import { create } from 'zustand';
import { Workshop, Recipe, Video, About, Committee, University } from '../types';
import {
  fetchWorkshops,
  fetchRecipes,
  fetchVideos,
  fetchAbout,
  fetchCommittees,
  fetchUniversities,
} from '../services/googleSheetsService';

// ─── Types ────────────────────────────────────────────────────────────────────

export type ContentType =
  | 'workshops'
  | 'recipes'
  | 'videos'
  | 'about'
  | 'committees'
  | 'universities';

interface ContentState {
  workshops: Workshop[] | null;
  recipes: Recipe[] | null;
  videos: Video[] | null;
  about: About[] | null;
  committees: Committee[] | null;
  universities: University[] | null;
  loading: boolean;
  error: string | null;
  lastSyncTime: Partial<Record<ContentType, number>>;
}

interface ContentActions {
  setWorkshops: (data: Workshop[]) => void;
  setRecipes: (data: Recipe[]) => void;
  setVideos: (data: Video[]) => void;
  setAbout: (data: About[]) => void;
  setCommittees: (data: Committee[]) => void;
  setUniversities: (data: University[]) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  updateLastSyncTime: (contentType: ContentType) => void;
  syncAll: () => Promise<void>;
  clearCache: () => void;
}

type ContentStore = ContentState & ContentActions;

// ─── Store ────────────────────────────────────────────────────────────────────

const useContentStore = create<ContentStore>((set, get) => ({
  // ── State ──────────────────────────────────────────────────────────────────
  workshops: null,
  recipes: null,
  videos: null,
  about: null,
  committees: null,
  universities: null,
  loading: false,
  error: null,
  lastSyncTime: {},

  // ── Per-type setters ───────────────────────────────────────────────────────
  setWorkshops: (data) =>
    set((s) => ({
      workshops: data,
      lastSyncTime: { ...s.lastSyncTime, workshops: Date.now() },
    })),

  setRecipes: (data) =>
    set((s) => ({
      recipes: data,
      lastSyncTime: { ...s.lastSyncTime, recipes: Date.now() },
    })),

  setVideos: (data) =>
    set((s) => ({
      videos: data,
      lastSyncTime: { ...s.lastSyncTime, videos: Date.now() },
    })),

  setAbout: (data) =>
    set((s) => ({
      about: data,
      lastSyncTime: { ...s.lastSyncTime, about: Date.now() },
    })),

  setCommittees: (data) =>
    set((s) => ({
      committees: data,
      lastSyncTime: { ...s.lastSyncTime, committees: Date.now() },
    })),

  setUniversities: (data) =>
    set((s) => ({
      universities: data,
      lastSyncTime: { ...s.lastSyncTime, universities: Date.now() },
    })),

  // ── Global flags ───────────────────────────────────────────────────────────
  setLoading: (loading) => set({ loading }),
  setError: (error) => set({ error }),

  updateLastSyncTime: (contentType) =>
    set((s) => ({
      lastSyncTime: { ...s.lastSyncTime, [contentType]: Date.now() },
    })),

  // ── syncAll ────────────────────────────────────────────────────────────────
  // Fetches all content types in parallel. Intended for the Admin "Sync Now" button.
  syncAll: async () => {
    set({ loading: true, error: null });

    const [workshops, recipes, videos, about, committees, universities] =
      await Promise.all([
        fetchWorkshops(),
        fetchRecipes(),
        fetchVideos(),
        fetchAbout(),
        fetchCommittees(),
        fetchUniversities(),
      ]);

    const now = Date.now();
    const errors: string[] = [];

    set((s) => {
      const nextSyncTime = { ...s.lastSyncTime };
      const updates: Partial<ContentState> = {};

      if ('error' in workshops) {
        errors.push(`workshops: ${workshops.error}`);
      } else {
        updates.workshops = workshops;
        nextSyncTime.workshops = now;
      }

      if ('error' in recipes) {
        errors.push(`recipes: ${recipes.error}`);
      } else {
        updates.recipes = recipes;
        nextSyncTime.recipes = now;
      }

      if ('error' in videos) {
        errors.push(`videos: ${videos.error}`);
      } else {
        updates.videos = videos;
        nextSyncTime.videos = now;
      }

      if ('error' in about) {
        errors.push(`about: ${about.error}`);
      } else {
        updates.about = about;
        nextSyncTime.about = now;
      }

      if ('error' in committees) {
        errors.push(`committees: ${committees.error}`);
      } else {
        updates.committees = committees;
        nextSyncTime.committees = now;
      }

      if ('error' in universities) {
        errors.push(`universities: ${universities.error}`);
      } else {
        updates.universities = universities;
        nextSyncTime.universities = now;
      }

      return {
        ...updates,
        lastSyncTime: nextSyncTime,
        loading: false,
        error: errors.length > 0 ? errors.join(' | ') : null,
      };
    });
  },

  // ── clearCache ─────────────────────────────────────────────────────────────
  clearCache: () =>
    set({
      workshops: null,
      recipes: null,
      videos: null,
      about: null,
      committees: null,
      universities: null,
      lastSyncTime: {},
      error: null,
    }),
}));

export default useContentStore;
