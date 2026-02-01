'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { items, months } from '@/data/seed';
import { OnThisDayEntry, Item } from '@/types';
import Link from 'next/link';

interface OnThisDayProps {
  compact?: boolean;
}

export function OnThisDay({ compact = false }: OnThisDayProps) {
  const [entries, setEntries] = useState<OnThisDayEntry[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Get today's date (using February 1st as per the current time context)
    const today = new Date();
    const month = today.getMonth(); // 0-indexed (0 = January)
    const day = today.getDate();

    // Find items that trended on this day across all years
    const monthId = months.find(m => 
      m.shortName?.toLowerCase() === today.toLocaleString('en-US', { month: 'short' }).toLowerCase()
    )?.id;

    if (monthId) {
      const dayEntries: OnThisDayEntry[] = items
        .filter(item => item.monthId === monthId)
        .slice(0, 10) // Limit to 10 entries
        .map((item, index) => ({
          id: `${item.id}-${index}`,
          item,
          year: parseInt(item.yearId || '2016'),
          monthId: item.monthId,
          significance: (item.popularityScore && item.popularityScore >= 95) ? 'high' as const : 
                       (item.popularityScore && item.popularityScore >= 85) ? 'medium' as const : 'low' as const
        }))
        .sort((a, b) => b.year - a.year); // Most recent first

      setEntries(dayEntries);
    }
    setIsLoading(false);
  }, []);

  const currentEntry = entries[currentIndex];

  const nextEntry = () => {
    setCurrentIndex((prev) => (prev + 1) % entries.length);
  };

  const prevEntry = () => {
    setCurrentIndex((prev) => (prev - 1 + entries.length) % entries.length);
  };

  if (isLoading) {
    return (
      <Card className="bg-black/50 border-white/10">
        <CardContent className="p-6 text-center">
          <div className="animate-pulse text-gray-400">Loading...</div>
        </CardContent>
      </Card>
    );
  }

  if (entries.length === 0) {
    return (
      <Card className="bg-black/50 border-white/10">
        <CardContent className="p-6 text-center">
          <span className="text-4xl mb-4 block">📅</span>
          <p className="text-gray-400">No trends found for today</p>
          <p className="text-sm text-gray-500 mt-2">Check back later!</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="bg-gradient-to-br from-retro-purple/20 to-retro-teal/20 border-white/10 overflow-hidden">
      <CardContent className={compact ? 'p-4' : 'p-6'}>
        <div className="flex items-center gap-3 mb-4">
          <span className="text-2xl">📅</span>
          <div>
            <h3 className="text-lg font-bold text-white">On This Day</h3>
            <p className="text-sm text-gray-400">
              {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric' })}
            </p>
          </div>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={currentEntry?.id}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            {currentEntry && (
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div 
                    className="w-16 h-16 rounded-lg bg-gradient-to-br from-retro-teal/30 to-retro-purple/30 
                               flex items-center justify-center flex-shrink-0"
                  >
                    <span className="text-3xl">📈</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs font-mono text-retro-teal px-2 py-0.5 rounded bg-retro-teal/20">
                        {currentEntry.year}
                      </span>
                      {currentEntry.significance === 'high' && (
                        <span className="text-xs font-mono text-yellow-400 px-2 py-0.5 rounded bg-yellow-400/20">
                          🔥 Trending
                        </span>
                      )}
                    </div>
                    <h4 className="text-lg font-bold text-white truncate">
                      {currentEntry.item.title}
                    </h4>
                    <p className={`text-sm text-gray-400 line-clamp-${compact ? '1' : '2'}`}>
                      {currentEntry.item.description}
                    </p>
                  </div>
                </div>

                {!compact && currentEntry.item.popularityScore && (
                  <div className="flex items-center gap-2">
                    <div className="flex-1 h-2 bg-white/10 rounded-full overflow-hidden">
                      <motion.div
                        className="h-full bg-gradient-to-r from-retro-teal to-retro-purple rounded-full"
                        initial={{ width: 0 }}
                        animate={{ width: `${currentEntry.item.popularityScore}%` }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                      />
                    </div>
                    <span className="text-xs font-mono text-retro-teal">
                      {currentEntry.item.popularityScore}%
                    </span>
                  </div>
                )}

                {currentEntry.item.slug && (
                  <Link href={`/trend/${currentEntry.item.slug}`}>
                    <Button variant="outline" size="sm" className="w-full border-retro-teal/30 text-retro-teal hover:bg-retro-teal/20">
                      Learn More →
                    </Button>
                  </Link>
                )}
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        {entries.length > 1 && (
          <div className="flex items-center justify-between mt-4 pt-4 border-t border-white/10">
            <Button
              variant="ghost"
              size="sm"
              onClick={prevEntry}
              className="text-gray-400 hover:text-white"
            >
              ← Previous
            </Button>
            <div className="flex gap-1">
              {entries.slice(0, 5).map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentIndex(i)}
                  className={`w-2 h-2 rounded-full transition-all ${
                    i === currentIndex ? 'bg-retro-teal w-4' : 'bg-white/20'
                  }`}
                />
              ))}
              {entries.length > 5 && (
                <span className="text-xs text-gray-500 ml-2">+{entries.length - 5}</span>
              )}
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={nextEntry}
              className="text-gray-400 hover:text-white"
            >
              Next →
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
