'use client';

import { useState, useEffect, useCallback } from 'react';
import { Item, Category } from '@/types';

export interface FavoriteItem {
  item: Item;
  addedAt: string;
  notes?: string;
}

export interface UserWrapped {
  id: string;
  year: number;
  favoriteItems: FavoriteItem[];
  topCategories: { category: Category; count: number }[];
  totalFavorites: number;
  createdAt: string;
}

// Key for localStorage
const STORAGE_KEY = 'rewind-wrapped';

export function useLocalStorage() {
  const [favorites, setFavorites] = useState<FavoriteItem[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        setFavorites(JSON.parse(stored));
      }
    } catch (error) {
      console.error('Failed to load favorites:', error);
    }
    setIsLoaded(true);
  }, []);

  // Save to localStorage whenever favorites change
  useEffect(() => {
    if (isLoaded) {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites));
      } catch (error) {
        console.error('Failed to save favorites:', error);
      }
    }
  }, [favorites, isLoaded]);

  // Add item to favorites
  const addFavorite = useCallback((item: Item, notes?: string) => {
    const newFavorite: FavoriteItem = {
      item,
      addedAt: new Date().toISOString(),
      notes,
    };

    setFavorites((prev) => {
      // Check if already exists
      if (prev.some((f) => f.item.id === item.id)) {
        return prev;
      }
      return [...prev, newFavorite];
    });

    return newFavorite;
  }, []);

  // Remove item from favorites
  const removeFavorite = useCallback((itemId: string) => {
    setFavorites((prev) => prev.filter((f) => f.item.id !== itemId));
  }, []);

  // Toggle favorite
  const toggleFavorite = useCallback((item: Item) => {
    const isFavorite = favorites.some((f) => f.item.id === item.id);
    if (isFavorite) {
      removeFavorite(item.id);
    } else {
      addFavorite(item);
    }
  }, [favorites, addFavorite, removeFavorite]);

  // Check if item is favorited
  const isFavorite = useCallback((itemId: string) => {
    return favorites.some((f) => f.item.id === itemId);
  }, [favorites]);

  // Get user wrapped summary
  const getUserWrapped = useCallback((year: number): UserWrapped => {
    const yearFavorites = favorites.filter((f) => f.item.yearId === String(year));
    const categoryCount: Record<string, { category: Category; count: number }> = {};

    yearFavorites.forEach((f) => {
      if (!categoryCount[f.item.categoryId]) {
        // We'll use a simple approach - count by category name
        categoryCount[f.item.categoryId] = { 
          category: { id: f.item.categoryId, name: f.item.categoryId, type: 'other' },
          count: 0 
        };
      }
      categoryCount[f.item.categoryId].count++;
    });

    const topCategories = Object.values(categoryCount)
      .sort((a, b) => b.count - a.count);

    return {
      id: `wrapped-${year}-${Date.now()}`,
      year,
      favoriteItems: yearFavorites,
      topCategories,
      totalFavorites: yearFavorites.length,
      createdAt: new Date().toISOString(),
    };
  }, [favorites]);

  // Clear all favorites
  const clearFavorites = useCallback(() => {
    setFavorites([]);
    localStorage.removeItem(STORAGE_KEY);
  }, []);

  // Export wrapped data
  const exportWrapped = useCallback(() => {
    const data = {
      favorites,
      exportedAt: new Date().toISOString(),
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'rewind-wrapped.json';
    a.click();
    URL.revokeObjectURL(url);
  }, [favorites]);

  return {
    favorites,
    isLoaded,
    addFavorite,
    removeFavorite,
    toggleFavorite,
    isFavorite,
    getUserWrapped,
    clearFavorites,
    exportWrapped,
    totalFavorites: favorites.length,
  };
}

// Hook for persisting user preferences
export function useUserPreferences() {
  const [preferences, setPreferences] = useState({
    theme: 'light' as 'light' | 'dark',
    showNostalgiaEffects: true,
    autoPlaySounds: false,
  });
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem('rewind-preferences');
      if (stored) {
        setPreferences(JSON.parse(stored));
      }
    } catch (error) {
      console.error('Failed to load preferences:', error);
    }
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    if (isLoaded) {
      try {
        localStorage.setItem('rewind-preferences', JSON.stringify(preferences));
      } catch (error) {
        console.error('Failed to save preferences:', error);
      }
    }
  }, [preferences, isLoaded]);

  const updatePreference = useCallback(<K extends keyof typeof preferences>(
    key: K,
    value: typeof preferences[K]
  ) => {
    setPreferences((prev) => ({ ...prev, [key]: value }));
  }, []);

  return {
    preferences,
    isLoaded,
    updatePreference,
  };
}
