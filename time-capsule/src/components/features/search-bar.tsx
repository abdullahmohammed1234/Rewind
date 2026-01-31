'use client';

import { useState, useMemo, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, X, TrendingUp, Calendar, Tag } from 'lucide-react';
import { items, years, categories } from '@/data/seed';
import { Item, CategoryType } from '@/types';
import { Badge } from '@/components/ui/badge';

interface SearchBarProps {
  onSelectItem?: (item: Item) => void;
  placeholder?: string;
  showFilters?: boolean;
}

export function SearchBar({ 
  onSelectItem, 
  placeholder = "Search trends, memes, songs...",
  showFilters = true 
}: SearchBarProps) {
  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<CategoryType | 'all'>('all');

  // Filter items based on search query
  const filteredItems = useMemo(() => {
    if (!query.trim()) return [];

    const lowerQuery = query.toLowerCase();
    
    return items
      .filter((item) => {
        const matchesQuery = 
          item.title.toLowerCase().includes(lowerQuery) ||
          item.description.toLowerCase().includes(lowerQuery) ||
          (item.impact?.toLowerCase().includes(lowerQuery)) ||
          (item.creator?.toLowerCase().includes(lowerQuery));
        
        const matchesCategory = selectedCategory === 'all' || item.categoryId === selectedCategory;
        
        return matchesQuery && matchesCategory;
      })
      .sort((a, b) => {
        // Sort by popularity score descending
        return (b.popularityScore || 0) - (a.popularityScore || 0);
      })
      .slice(0, 10); // Limit to 10 results
  }, [query, selectedCategory]);

  // Get category info
  const getCategoryInfo = (categoryId: string) => {
    return categories.find((c) => c.id === categoryId) || { 
      id: categoryId, 
      name: categoryId, 
      type: 'other' as CategoryType,
      icon: '📦' 
    };
  };

  // Get year info
  const getYearInfo = (yearId: string) => {
    return years.find((y) => y.id === yearId);
  };

  const handleSelect = useCallback((item: Item) => {
    if (onSelectItem) {
      onSelectItem(item);
    } else {
      window.location.href = `/trend/${item.slug}`;
    }
    setQuery('');
    setIsOpen(false);
  }, [onSelectItem]);

  const clearSearch = useCallback(() => {
    setQuery('');
    setIsOpen(false);
  }, []);

  return (
    <div className="relative w-full max-w-2xl mx-auto">
      {/* Search Input */}
      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-retro-gray" />
        <input
          type="text"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setIsOpen(true);
          }}
          onFocus={() => setIsOpen(true)}
          placeholder={placeholder}
          className="w-full pl-12 pr-12 py-4 bg-white/90 backdrop-blur-sm border-2 border-retro-teal/30 rounded-xl 
                     text-retro-dark placeholder:text-retro-gray/60 focus:outline-none focus:border-retro-teal
                     shadow-lg text-lg"
        />
        {query && (
          <button
            onClick={clearSearch}
            className="absolute right-4 top-1/2 -translate-y-1/2 p-1 hover:bg-retro-teal/10 rounded-full transition-colors"
          >
            <X className="w-5 h-5 text-retro-gray" />
          </button>
        )}
      </div>

      {/* Category Filters */}
      {showFilters && (
        <div className="mt-3 flex flex-wrap gap-2">
          <button
            onClick={() => setSelectedCategory('all')}
            className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all ${
              selectedCategory === 'all'
                ? 'bg-retro-teal text-white'
                : 'bg-white/80 text-retro-gray hover:bg-retro-teal/10'
            }`}
          >
            All
          </button>
          {categories.slice(0, 6).map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.type)}
              className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all flex items-center gap-1.5 ${
                selectedCategory === category.type
                  ? 'bg-retro-teal text-white'
                  : 'bg-white/80 text-retro-gray hover:bg-retro-teal/10'
              }`}
            >
              <span>{category.icon}</span>
              <span>{category.name}</span>
            </button>
          ))}
        </div>
      )}

      {/* Search Results Dropdown */}
      <AnimatePresence>
        {isOpen && query && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute top-full left-0 right-0 mt-2 bg-white/95 backdrop-blur-sm 
                       border-2 border-retro-teal/20 rounded-xl shadow-xl overflow-hidden z-50"
          >
            {filteredItems.length > 0 ? (
              <div className="max-h-96 overflow-y-auto">
                {filteredItems.map((item, index) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    onClick={() => handleSelect(item)}
                    className="flex items-start gap-4 p-4 hover:bg-retro-teal/5 cursor-pointer 
                               border-b border-retro-teal/10 last:border-0 transition-colors"
                  >
                    {/* Icon placeholder */}
                    <div className="w-12 h-12 bg-gradient-to-br from-retro-teal/20 to-retro-purple/20 
                                    rounded-lg flex items-center justify-center flex-shrink-0">
                      <span className="text-xl">
                        {getCategoryInfo(item.categoryId).icon}
                      </span>
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-semibold text-retro-dark truncate">
                          {item.title}
                        </h3>
                        {item.popularityScore && item.popularityScore >= 95 && (
                          <TrendingUp className="w-4 h-4 text-retro-teal flex-shrink-0" />
                        )}
                      </div>
                      <p className="text-sm text-retro-gray line-clamp-2 mb-2">
                        {item.description}
                      </p>
                      <div className="flex items-center gap-3">
                        <Badge variant="secondary" className="text-xs">
                          {getCategoryInfo(item.categoryId).name}
                        </Badge>
                        {item.yearId && (
                          <span className="text-xs text-retro-gray flex items-center gap-1">
                            <Calendar className="w-3 h-3" />
                            {item.yearId}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Popularity score */}
                    {item.popularityScore && (
                      <div className="flex-shrink-0 text-center">
                        <div className="text-lg font-bold text-retro-teal">
                          {item.popularityScore}%
                        </div>
                        <div className="text-xs text-retro-gray">viral</div>
                      </div>
                    )}
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="p-8 text-center">
                <Search className="w-12 h-12 mx-auto text-retro-gray/30 mb-3" />
                <p className="text-retro-gray">No results found for "{query}"</p>
                <p className="text-sm text-retro-gray/60 mt-1">
                  Try different keywords or categories
                </p>
              </div>
            )}

            {/* Footer with stats */}
            <div className="p-3 bg-retro-cream/50 border-t border-retro-teal/10 flex items-center justify-between text-xs text-retro-gray">
              <span>
                {filteredItems.length} result{filteredItems.length !== 1 ? 's' : ''} found
              </span>
              <span className="flex items-center gap-1">
                <Tag className="w-3 h-3" />
                Press ⌘K to focus
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Click outside to close */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-40" 
          onClick={() => setIsOpen(false)}
        />
      )}
    </div>
  );
}

// Hook for keyboard shortcut
export function useSearchShortcut() {
  const [isOpen, setIsOpen] = useState(false);

  // Toggle with Cmd+K
  useState(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      }
      if (e.key === 'Escape') {
        setIsOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  });

  return { isOpen, setIsOpen };
}
