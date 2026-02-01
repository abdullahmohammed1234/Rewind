'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Item } from '@/types';

interface TrendCardProps {
  item: Item;
  compact?: boolean;
}

export function TrendCard({ item, compact = false }: TrendCardProps) {
  return (
    <Link href={`/trend/${item.slug}`}>
      <motion.div
        whileHover={{ scale: 1.02, y: -2 }}
        whileTap={{ scale: 0.98 }}
      >
        <Card className="overflow-hidden group bg-black/50 border-white/10 hover:border-retro-teal/50 transition-all">
          {/* Image placeholder with gradient */}
          <div 
            className="h-32 bg-gradient-to-br from-retro-teal/20 to-retro-purple/20 
                       flex items-center justify-center relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,currentColor_0%,transparent_70%)] opacity-10" />
            <span className="text-4xl group-hover:scale-110 transition-transform duration-300">
              {/* Placeholder for trend icon */}
              📈
            </span>
          </div>
          
          <CardContent className={compact ? 'p-3' : 'p-4'}>
            <h3 className={compact ? 'font-semibold text-sm' : 'font-bold text-lg'}>
              {item.title}
            </h3>
            {!compact && (
              <p className="text-sm text-gray-400 mt-1 line-clamp-2">
                {item.description}
              </p>
            )}
            {item.popularityScore && (
              <div className="mt-2 flex items-center gap-2">
                <div className="flex-1 h-1.5 bg-white/10 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-retro-teal rounded-full"
                    initial={{ width: 0 }}
                    whileInView={{ width: `${item.popularityScore}%` }}
                    transition={{ duration: 0.8 }}
                  />
                </div>
                <span className="text-xs font-mono text-retro-teal">
                  {item.popularityScore}%
                </span>
              </div>
            )}
          </CardContent>
        </Card>
      </motion.div>
    </Link>
  );
}
