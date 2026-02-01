'use client';

import { useMemo } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { items, categories } from '@/data/seed';
import { Item, RelatedTrend } from '@/types';
import Link from 'next/link';

interface RelatedTrendsProps {
  currentItem: Item;
  maxDisplay?: number;
}

export function RelatedTrends({ currentItem, maxDisplay = 4 }: RelatedTrendsProps) {
  const relatedTrends = useMemo(() => {
    const allTrends = items.filter(i => i.id !== currentItem.id);
    
    // Score each trend based on relevance
    const scored = allTrends.map(item => {
      let score = 0;
      const relationTypes: RelatedTrend['relationType'][] = [];

      // Same category gets highest score
      if (item.categoryId === currentItem.categoryId) {
        score += 50;
        relationTypes.push('similar_category');
      }

      // Same era (within 2 years) gets good score
      const currentYear = parseInt(currentItem.yearId || '2016');
      const itemYear = parseInt(item.yearId || '2016');
      if (Math.abs(currentYear - itemYear) <= 2) {
        score += 30;
        relationTypes.push('same_era');
      }

      // Check for cultural succession/predecessor based on years
      if (itemYear > currentYear && itemYear - currentYear <= 3) {
        score += 20;
        relationTypes.push('cultural_successor');
      } else if (currentYear > itemYear && currentYear - itemYear <= 3) {
        score += 20;
        relationTypes.push('cultural_predecessor');
      }

      // Title similarity bonus
      const titleWords = currentItem.title.toLowerCase().split(' ');
      const itemWords = item.title.toLowerCase().split(' ');
      const commonWords = titleWords.filter(w => w.length > 3 && itemWords.includes(w));
      if (commonWords.length > 0) {
        score += commonWords.length * 5;
      }

      return {
        id: `related-${item.id}`,
        item,
        relationType: relationTypes[0] || 'similar_category',
        relevanceScore: Math.min(score, 100)
      };
    });

    // Sort by score and return top items
    return scored
      .sort((a, b) => b.relevanceScore - a.relevanceScore)
      .slice(0, maxDisplay);
  }, [currentItem, maxDisplay]);

  const getRelationLabel = (type: RelatedTrend['relationType']) => {
    switch (type) {
      case 'similar_category':
        return 'Same Category';
      case 'same_era':
        return 'From the Era';
      case 'cultural_successor':
        return 'What Came Next';
      case 'cultural_predecessor':
        return 'What Came Before';
      default:
        return 'Related';
    }
  };

  const getRelationEmoji = (type: RelatedTrend['relationType']) => {
    switch (type) {
      case 'similar_category':
        return '📂';
      case 'same_era':
        return '🕐';
      case 'cultural_successor':
        return '⏩';
      case 'cultural_predecessor':
        return '⏪';
      default:
        return '🔗';
    }
  };

  if (relatedTrends.length === 0) {
    return null;
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <span className="text-xl">💡</span>
        <h3 className="text-lg font-bold text-white">If You Liked This, Check Out...</h3>
      </div>

      <div className="grid gap-3">
        {relatedTrends.map((trend, index) => (
          <motion.div
            key={trend.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Link href={`/trend/${trend.item.slug}`}>
              <Card className="bg-black/30 border-white/10 hover:border-retro-teal/50 transition-all cursor-pointer group">
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-retro-purple/20 to-retro-teal/20 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                      <span className="text-2xl">{getRelationEmoji(trend.relationType)}</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-xs font-mono text-retro-teal px-2 py-0.5 rounded bg-retro-teal/20">
                          {getRelationLabel(trend.relationType)}
                        </span>
                        {trend.relevanceScore >= 70 && (
                          <span className="text-xs text-yellow-400">🔥</span>
                        )}
                      </div>
                      <h4 className="text-sm font-semibold text-white truncate group-hover:text-retro-teal transition-colors">
                        {trend.item.title}
                      </h4>
                      {trend.item.yearId && (
                        <p className="text-xs text-gray-500">{trend.item.yearId}</p>
                      )}
                    </div>
                    <div className="flex-shrink-0">
                      <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center">
                        <motion.div
                          className="text-retro-teal"
                          whileHover={{ x: 5 }}
                        >
                          →
                        </motion.div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          </motion.div>
        ))}
      </div>

      <div className="text-center pt-2">
        <Button 
          variant="ghost" 
          size="sm" 
          className="text-gray-400 hover:text-white text-xs"
          onClick={() => {
            // Could navigate to search with category filter
            window.location.href = `/search?category=${currentItem.categoryId}`;
          }}
        >
          View more in {categories.find(c => c.id === currentItem.categoryId)?.name || 'this category'} →
        </Button>
      </div>
    </div>
  );
}
