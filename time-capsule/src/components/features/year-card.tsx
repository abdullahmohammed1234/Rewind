'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Year } from '@/types';
import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface YearCardProps {
  year: Year;
  index: number;
}

export function YearCard({ year, index }: YearCardProps) {
  const gradientColors: Record<string, string> = {
    '2012': 'from-orange-400 to-pink-500',
    '2013': 'from-pink-400 to-purple-500',
    '2014': 'from-blue-400 to-cyan-500',
    '2015': 'from-green-400 to-emerald-500',
    '2016': 'from-yellow-400 to-orange-500',
    '2017': 'from-red-400 to-pink-500',
    '2018': 'from-purple-400 to-indigo-500',
  };

  return (
    <Link href={`/year/${year.year}`}>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: index * 0.1 }}
        whileHover={{ scale: 1.03, y: -5 }}
        whileTap={{ scale: 0.98 }}
        className="cursor-pointer"
      >
        <Card className="relative overflow-hidden group h-64">
          {/* Background gradient */}
          <div
            className={cn(
              'absolute inset-0 bg-gradient-to-br opacity-90 transition-opacity group-hover:opacity-100',
              gradientColors[year.id] || 'from-retro-teal to-retro-purple'
            )}
          />

          {/* Pattern overlay */}
          <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_2px_2px,currentColor_1px,transparent_0)] bg-[length:8px_8px]" />

          {/* Content */}
          <div className="relative z-10 h-full flex flex-col justify-between p-6">
            <div>
              <motion.span
                className="text-6xl font-bold text-white/20 font-mono"
                animate={{ rotate: [0, 2, 0, -2, 0] }}
                transition={{ duration: 4, repeat: Infinity }}
              >
                {year.year}
              </motion.span>
            </div>

            <div>
              <h3 className="text-2xl font-bold text-white mb-2">
                {year.year}
              </h3>
              <p className="text-sm text-white/80 line-clamp-2">
                {year.description}
              </p>
            </div>
          </div>

          {/* Hover effect */}
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />

          {/* Decorative corner */}
          <div className="absolute top-0 right-0 w-16 h-16 overflow-hidden">
            <div className="absolute top-0 right-0 w-16 h-16 bg-white/20 transform rotate-45 translate-x-8 -translate-y-8" />
          </div>
        </Card>
      </motion.div>
    </Link>
  );
}
