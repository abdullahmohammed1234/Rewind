'use client';

import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Heart, Calendar, Star, Download, Trash2 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { categories, items } from '@/data/seed';
import { Item, Year } from '@/types';

interface PersonalizedWrappedProps {
  year?: Year;
}

export function PersonalizedWrapped({ year }: PersonalizedWrappedProps) {
  const { 
    favorites, 
    removeFavorite, 
    isFavorite, 
    getUserWrapped, 
    clearFavorites,
    exportWrapped 
  } = useLocalStorage();
  
  const [showDetails, setShowDetails] = useState(false);

  // Get year-specific data
  const yearId = year?.id || '2016';
  const yearFavorites = favorites.filter((f) => f.item.yearId === yearId);
  
  const userWrapped = useMemo(() => {
    return getUserWrapped(parseInt(yearId));
  }, [getUserWrapped, yearId]);

  // Calculate stats
  const stats = useMemo(() => {
    const totalItems = yearFavorites.length;
    const categoriesUsed = new Set(yearFavorites.map((f) => f.item.categoryId));
    const topCategory = categoriesUsed.size > 0 
      ? Array.from(categoriesUsed).map((id) => ({
          id,
          ...categories.find((c) => c.id === id),
          count: yearFavorites.filter((f) => f.item.categoryId === id).length
        })).sort((a, b) => b.count - a.count)[0]
      : null;

    return {
      totalItems,
      categoriesCount: categoriesUsed.size,
      topCategory,
    };
  }, [yearFavorites]);

  // Get item by ID helper
  const getItemById = (id: string): Item | undefined => {
    return items.find((item) => item.id === id);
  };

  if (favorites.length === 0) {
    return (
      <Card className="bg-white/90 backdrop-blur-sm">
        <CardContent className="p-8 text-center">
          <div className="w-16 h-16 mx-auto mb-4 bg-retro-teal/10 rounded-full flex items-center justify-center">
            <Heart className="w-8 h-8 text-retro-teal" />
          </div>
          <h3 className="text-xl font-bold text-retro-dark mb-2">
            No Favorites Yet
          </h3>
          <p className="text-retro-gray mb-4">
            Start adding trends to your favorites to create your personalized wrapped!
          </p>
          <Button asChild>
            <a href="/years">Explore Trends</a>
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header Card */}
      <Card className="bg-gradient-to-br from-retro-teal/20 to-retro-purple/20 border-0">
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-2xl font-bold text-retro-dark flex items-center gap-2">
                <Sparkles className="w-6 h-6 text-retro-teal" />
                Your {yearId} Wrapped
              </h2>
              <p className="text-retro-gray mt-1">
                A personalized recap of your favorite trends
              </p>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" onClick={exportWrapped}>
                <Download className="w-4 h-4 mr-2" />
                Export
              </Button>
              <Button variant="outline" size="sm" onClick={clearFavorites}>
                <Trash2 className="w-4 h-4 mr-2" />
                Clear
              </Button>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-3 gap-4">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="text-center p-4 bg-white/50 rounded-xl"
            >
              <div className="text-3xl font-bold text-retro-teal">
                {stats.totalItems}
              </div>
              <div className="text-sm text-retro-gray">Favorites</div>
            </motion.div>
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.1 }}
              className="text-center p-4 bg-white/50 rounded-xl"
            >
              <div className="text-3xl font-bold text-retro-purple">
                {stats.categoriesCount}
              </div>
              <div className="text-sm text-retro-gray">Categories</div>
            </motion.div>
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-center p-4 bg-white/50 rounded-xl"
            >
              <div className="text-3xl font-bold text-retro-pink">
                {yearId}
              </div>
              <div className="text-sm text-retro-gray">Year</div>
            </motion.div>
          </div>
        </CardContent>
      </Card>

      {/* Top Category */}
      {stats.topCategory && (
        <Card className="bg-white/90 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Star className="w-5 h-5 text-yellow-500" />
              Your Top Category
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-4 p-4 bg-retro-yellow/10 rounded-xl">
              <span className="text-4xl">{stats.topCategory.icon}</span>
              <div>
                <h3 className="text-xl font-bold text-retro-dark">
                  {stats.topCategory.name}
                </h3>
                <p className="text-retro-gray">
                  You saved {stats.topCategory.count} items in this category
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Favorites List */}
      <Card className="bg-white/90 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Heart className="w-5 h-5 text-retro-pink" />
            Your Favorites ({yearFavorites.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {yearFavorites.map((favorite, index) => {
              const category = categories.find((c) => c.id === favorite.item.categoryId);
              return (
                <motion.div
                  key={favorite.item.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="flex items-center gap-4 p-4 bg-retro-cream/50 rounded-xl 
                             hover:bg-retro-cream transition-colors group"
                >
                  {/* Rank */}
                  <div className="w-8 h-8 bg-retro-teal text-white rounded-full 
                                  flex items-center justify-center font-bold text-sm">
                    {index + 1}
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <h4 className="font-semibold text-retro-dark truncate">
                      {favorite.item.title}
                    </h4>
                    <div className="flex items-center gap-2 mt-1">
                      <Badge variant="secondary" className="text-xs">
                        {category?.icon} {category?.name}
                      </Badge>
                      {favorite.item.popularityScore && (
                        <span className="text-xs text-retro-gray">
                          {favorite.item.popularityScore}% viral
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Added date */}
                  <div className="text-xs text-retro-gray flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    {new Date(favorite.addedAt).toLocaleDateString()}
                  </div>

                  {/* Remove button */}
                  <button
                    onClick={() => removeFavorite(favorite.item.id)}
                    className="p-2 text-retro-gray hover:text-retro-pink 
                             opacity-0 group-hover:opacity-100 transition-all"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </motion.div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* View Details Toggle */}
      <Button
        variant="outline"
        className="w-full"
        onClick={() => setShowDetails(!showDetails)}
      >
        {showDetails ? 'Hide Details' : 'View More Details'}
      </Button>

      {/* Additional Details */}
      {showDetails && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          className="space-y-4"
        >
          <Card className="bg-white/90 backdrop-blur-sm">
            <CardHeader>
              <CardTitle>Category Breakdown</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {Array.from(new Set(yearFavorites.map((f) => f.item.categoryId)))
                  .map((categoryId) => {
                    const category = categories.find((c) => c.id === categoryId);
                    const count = yearFavorites.filter((f) => f.item.categoryId === categoryId).length;
                    const percentage = Math.round((count / yearFavorites.length) * 100);
                    
                    return (
                      <div key={categoryId} className="space-y-2">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <span>{category?.icon}</span>
                            <span className="font-medium">{category?.name}</span>
                          </div>
                          <span className="text-retro-gray">{count} items ({percentage}%)</span>
                        </div>
                        <div className="h-2 bg-retro-cream rounded-full overflow-hidden">
                          <motion.div
                            className="h-full bg-retro-teal rounded-full"
                            initial={{ width: 0 }}
                            animate={{ width: `${percentage}%` }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                          />
                        </div>
                      </div>
                    );
                  })}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      )}
    </div>
  );
}

// Add to Favorites Button Component
interface AddToFavoritesButtonProps {
  item: Item;
}

export function AddToFavoritesButton({ item }: AddToFavoritesButtonProps) {
  const { toggleFavorite, isFavorite: isFav } = useLocalStorage();
  const fav = isFav(item.id);

  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={() => toggleFavorite(item)}
      className={`flex items-center gap-2 px-4 py-2 rounded-full font-medium transition-all ${
        fav
          ? 'bg-retro-pink text-white'
          : 'bg-retro-teal/10 text-retro-teal hover:bg-retro-teal/20'
      }`}
    >
      <Heart className={`w-4 h-4 ${fav ? 'fill-current' : ''}`} />
      <span>{fav ? 'Saved' : 'Save to Wrapped'}</span>
    </motion.button>
  );
}
