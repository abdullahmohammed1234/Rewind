'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Month } from '@/types';
import { cn } from '@/lib/utils';

interface MonthTimelineProps {
  months: Month[];
  currentMonth?: string;
  year: number;
}

export function MonthTimeline({ months, currentMonth, year }: MonthTimelineProps) {
  return (
    <div className="w-full overflow-x-auto py-8">
      <div className="flex gap-3 min-w-max px-4">
        {months.map((month, index) => {
          const isActive = currentMonth === month.id;
          const monthNumber = index + 1;
          
          return (
            <Link key={month.id} href={`/year/${year}/${month.id}`}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={cn(
                  'relative px-6 py-4 rounded-xl cursor-pointer transition-all duration-300',
                  isActive
                    ? 'bg-retro-teal text-white shadow-lg'
                    : 'bg-white/60 hover:bg-white/80 text-retro-dark'
                )}
              >
                {/* Month number */}
                <div className="text-xs font-mono opacity-60 mb-1">
                  {monthNumber.toString().padStart(2, '0')}
                </div>
                
                {/* Month name */}
                <div className="font-bold text-lg">
                  {month.shortName || month.name}
                </div>
                
                {/* Active indicator */}
                {isActive && (
                  <motion.div
                    layoutId="activeMonth"
                    className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-white rounded-full"
                  />
                )}
              </motion.div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
