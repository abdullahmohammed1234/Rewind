'use client';

import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Filter, X } from 'lucide-react';
import { categories, items } from '@/data/seed';
import { Category, Item, CategoryType } from '@/types';
import { Badge } from '@/components/ui/badge';

interface CategoryFilterProps {
  items: Item[];
  onFilterChange: (filteredItems: Item[]) => void;
  showCounts?: boolean;
}

export function CategoryFilter({ 
  items, 
  onFilterChange, 
  showCounts = true 
}: CategoryFilterProps) {
  const [selectedCategories, setSelectedCategories] = useState<CategoryType[]>([]);
  const [isExpanded, setIsExpanded] = useState(false);

  // Calculate item counts per category
  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    items.forEach((item) => {
      counts[item.categoryId] = (counts[item.categoryId] || 0) + 1;
    });
    return counts;
  }, [items]);

  // Filter items based on selected categories
  const filteredItems = useMemo(() => {
    if (selectedCategories.length === 0) {
      return items;
    }
    return items.filter((item) => 
      selectedCategories.includes(item.categoryId as CategoryType)
    );
  }, [items, selectedCategories]);

  // Notify parent when filter changes
  const handleFilterChange = (newFilters: CategoryType[]) => {
    setSelectedCategories(newFilters);
    onFilterChange(filteredItems);
  };

  const toggleCategory = (categoryType: CategoryType) => {
    const newFilters = selectedCategories.includes(categoryType)
      ? selectedCategories.filter((c) => c !== categoryType)
      : [...selectedCategories, categoryType];
    handleFilterChange(newFilters);
  };

  const clearFilters = () => {
    setSelectedCategories([]);
    onFilterChange(items);
  };

  const hasActiveFilters = selectedCategories.length > 0;

  return (
    <div className="mb-6">
      {/* Filter header */}
      <div className="flex items-center justify-between mb-4">
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="flex items-center gap-2 px-4 py-2 bg-retro-teal/10 rounded-lg 
                     text-retro-teal hover:bg-retro-teal/20 transition-colors"
        >
          <Filter className="w-5 h-5" />
          <span className="font-medium">Filters</span>
          {hasActiveFilters && (
            <Badge variant="secondary" className="ml-2">
              {selectedCategories.length}
            </Badge>
          )}
        </button>

        {hasActiveFilters && (
          <button
            onClick={clearFilters}
            className="flex items-center gap-2 px-3 py-1.5 text-sm text-retro-gray 
                       hover:text-retro-dark transition-colors"
          >
            <X className="w-4 h-4" />
            Clear all
          </button>
        )}
      </div>

      {/* Category chips */}
      <AnimatePresence>
        <motion.div
          initial={false}
          animate={{ height: 'auto' }}
          className="flex flex-wrap gap-2"
        >
          {categories.map((category) => {
            const count = categoryCounts[category.id] || 0;
            const isSelected = selectedCategories.includes(category.type);

            return (
              <motion.button
                key={category.id}
                onClick={() => toggleCategory(category.type)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`inline-flex items-center gap-2 px-4 py-2 rounded-full 
                           text-sm font-medium transition-all ${
                             isSelected
                               ? 'bg-retro-teal text-white shadow-lg'
                               : 'bg-white/80 text-retro-gray hover:bg-retro-teal/10'
                           }`}
              >
                <span>{category.icon}</span>
                <span>{category.name}</span>
                {showCounts && (
                  <Badge 
                    variant={isSelected ? 'default' : 'secondary'}
                    className={`text-xs ${
                      isSelected 
                        ? 'bg-white/20 text-white' 
                        : 'bg-retro-cream text-retro-gray'
                    }`}
                  >
                    {count}
                  </Badge>
                )}
              </motion.button>
            );
          })}
        </motion.div>
      </AnimatePresence>

      {/* Active filters summary */}
      {hasActiveFilters && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-4 p-3 bg-retro-purple/10 rounded-lg border border-retro-purple/20"
        >
          <p className="text-sm text-retro-gray">
            Showing <span className="font-semibold text-retro-dark">{filteredItems.length}</span> items
            from <span className="font-semibold text-retro-dark">{selectedCategories.length}</span> category
            {selectedCategories.length !== 1 ? 'ies' : 'y'}
          </p>
        </motion.div>
      )}
    </div>
  );
}

// Simple filter bar (horizontal)
export function FilterBar({ 
  items, 
  onFilterChange,
  compact = false 
}: CategoryFilterProps & { compact?: boolean }) {
  const [selectedCategories, setSelectedCategories] = useState<CategoryType[]>([]);

  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    items.forEach((item) => {
      counts[item.categoryId] = (counts[item.categoryId] || 0) + 1;
    });
    return counts;
  }, [items]);

  const filteredItems = useMemo(() => {
    if (selectedCategories.length === 0) {
      return items;
    }
    return items.filter((item) => 
      selectedCategories.includes(item.categoryId as CategoryType)
    );
  }, [items, selectedCategories]);

  const toggleCategory = (categoryType: CategoryType) => {
    const newFilters = selectedCategories.includes(categoryType)
      ? selectedCategories.filter((c) => c !== categoryType)
      : [...selectedCategories, categoryType];
    setSelectedCategories(newFilters);
    onFilterChange(filteredItems);
  };

  const clearFilters = () => {
    setSelectedCategories([]);
    onFilterChange(items);
  };

  if (compact) {
    return (
      <div className="flex flex-wrap gap-1.5 mb-4">
        {categories.slice(0, 5).map((category) => {
          const count = categoryCounts[category.id] || 0;
          const isSelected = selectedCategories.includes(category.type);

          return (
            <button
              key={category.id}
              onClick={() => toggleCategory(category.type)}
              className={`inline-flex items-center gap-1 px-3 py-1.5 rounded-full 
                         text-xs font-medium transition-all ${
                           isSelected
                             ? 'bg-retro-teal text-white'
                             : 'bg-white/60 text-retro-gray hover:bg-retro-teal/10'
                         }`}
            >
              <span>{category.icon}</span>
              <span>{category.name}</span>
            </button>
          );
        })}
        
        {selectedCategories.length > 0 && (
          <button
            onClick={clearFilters}
            className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full 
                       text-xs font-medium bg-retro-pink/20 text-retro-pink"
          >
            <X className="w-3 h-3" />
            Clear
          </button>
        )}
      </div>
    );
  }

  return (
    <div className="flex flex-wrap gap-2">
      {categories.map((category) => {
        const count = categoryCounts[category.id] || 0;
        const isSelected = selectedCategories.includes(category.type);

        return (
          <button
            key={category.id}
            onClick={() => toggleCategory(category.type)}
            className={`inline-flex items-center gap-2 px-4 py-2 rounded-full 
                       text-sm font-medium transition-all ${
                         isSelected
                           ? 'bg-retro-teal text-white'
                           : 'bg-white/80 text-retro-gray hover:bg-retro-teal/10'
                       }`}
          >
            <span>{category.icon}</span>
            <span>{category.name}</span>
            <Badge 
              variant={isSelected ? 'default' : 'secondary'}
              className={`text-xs ${
                isSelected 
                  ? 'bg-white/20 text-white' 
                  : 'bg-retro-cream text-retro-gray'
              }`}
            >
              {count}
            </Badge>
          </button>
        );
      })}
    </div>
  );
}
