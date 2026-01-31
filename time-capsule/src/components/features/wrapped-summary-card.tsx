'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Item } from '@/types';
import { ArrowRight } from 'lucide-react';

interface WrappedSummaryCardProps {
  item: Item;
  rank: number;
  categoryIcon?: string;
}

export function WrappedSummaryCard({ 
  item, 
  rank,
  categoryIcon = '⭐'
}: WrappedSummaryCardProps) {
  return (
    <Link href={`/trend/${item.slug}`}>
      <motion.div
        whileHover={{ scale: 1.02, y: -3 }}
        whileTap={{ scale: 0.98 }}
        className="cursor-pointer"
      >
        <Card className="relative overflow-hidden group h-full">
          {/* Rank badge */}
          <div className="absolute top-3 left-3 z-10">
            <motion.div
              className="w-10 h-10 rounded-full bg-retro-teal text-white flex items-center justify-center font-bold text-lg shadow-lg"
              animate={{ rotate: [0, 5, 0, -5, 0] }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              #{rank}
            </motion.div>
          </div>

          {/* Category icon */}
          <div className="absolute top-3 right-3 z-10">
            <span className="text-2xl filter drop-shadow-md">
              {categoryIcon}
            </span>
          </div>

          {/* Content */}
          <CardContent className="p-6 pt-14">
            <h3 className="text-xl font-bold text-retro-dark mb-2 group-hover:text-retro-teal transition-colors">
              {item.title}
            </h3>
            <p className="text-sm text-retro-gray line-clamp-2 mb-4">
              {item.description}
            </p>
            
            {/* Popularity bar */}
            <div className="flex items-center gap-3">
              <div className="flex-1 h-2 bg-retro-cream rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-retro-teal rounded-full"
                  initial={{ width: 0 }}
                  whileInView={{ width: `${item.popularityScore || 70}%` }}
                  transition={{ duration: 1, delay: 0.2 }}
                />
              </div>
              <span className="text-xs font-mono text-retro-teal">
                {item.popularityScore || 70}%
              </span>
            </div>

            {/* Arrow indicator */}
            <motion.div
              className="absolute bottom-4 right-4 text-retro-teal opacity-0 group-hover:opacity-100 transition-opacity"
              initial={{ x: -5 }}
              whileHover={{ x: 0 }}
            >
              <ArrowRight size={20} />
            </motion.div>
          </CardContent>
        </Card>
      </motion.div>
    </Link>
  );
}
