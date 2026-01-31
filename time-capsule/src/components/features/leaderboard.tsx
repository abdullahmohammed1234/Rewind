'use client';

import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { LeaderboardEntry } from '@/types';
import { cn } from '@/lib/utils';

interface LeaderboardProps {
  title: string;
  subtitle?: string;
  entries: LeaderboardEntry[];
  icon?: string;
  onItemClick?: (entry: LeaderboardEntry) => void;
}

export function Leaderboard({ title, subtitle, entries, icon = '🏆', onItemClick }: LeaderboardProps) {
  const getRankStyle = (rank: number) => {
    if (rank === 1) return 'bg-yellow-400 text-yellow-900';
    if (rank === 2) return 'bg-gray-300 text-gray-800';
    if (rank === 3) return 'bg-orange-300 text-orange-900';
    return 'bg-retro-teal text-white';
  };

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="text-center mb-6">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.3 }}
          className="text-4xl mb-2"
        >
          {icon}
        </motion.div>
        <h3 className="text-2xl font-bold text-retro-dark">{title}</h3>
        {subtitle && <p className="text-retro-gray">{subtitle}</p>}
      </div>

      {/* Top 3 Podium */}
      {entries.length >= 3 && (
        <div className="flex justify-center items-end gap-4 mb-8">
          {/* 2nd Place */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-center"
          >
            <div className="w-16 h-16 rounded-full bg-gray-300 flex items-center justify-center text-2xl font-bold mb-2 mx-auto">
              {entries[1].item.title.charAt(0)}
            </div>
            <div className="bg-gray-100 rounded-t-xl px-4 py-3 w-24">
              <p className="text-sm font-bold truncate">{entries[1].item.title}</p>
              <p className="text-xs text-retro-gray">{entries[1].item.popularityScore}</p>
            </div>
            <div className="w-24 h-16 bg-gray-300 rounded-b-xl flex items-center justify-center">
              <span className="text-2xl font-bold text-gray-700">2</span>
            </div>
          </motion.div>

          {/* 1st Place */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-center"
          >
            <div className="w-20 h-20 rounded-full bg-yellow-400 flex items-center justify-center text-3xl font-bold mb-2 mx-auto shadow-lg">
              {entries[0].item.title.charAt(0)}
            </div>
            <div className="bg-yellow-100 rounded-t-xl px-6 py-4 w-32">
              <p className="font-bold truncate">{entries[0].item.title}</p>
              <p className="text-sm text-retro-gray">{entries[0].item.popularityScore}</p>
            </div>
            <div className="w-32 h-24 bg-yellow-400 rounded-b-xl flex items-center justify-center shadow-lg">
              <span className="text-4xl font-bold text-yellow-700">1</span>
            </div>
          </motion.div>

          {/* 3rd Place */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-center"
          >
            <div className="w-16 h-16 rounded-full bg-orange-300 flex items-center justify-center text-2xl font-bold mb-2 mx-auto">
              {entries[2].item.title.charAt(0)}
            </div>
            <div className="bg-orange-100 rounded-t-xl px-4 py-3 w-24">
              <p className="text-sm font-bold truncate">{entries[2].item.title}</p>
              <p className="text-xs text-retro-gray">{entries[2].item.popularityScore}</p>
            </div>
            <div className="w-24 h-12 bg-orange-300 rounded-b-xl flex items-center justify-center">
              <span className="text-2xl font-bold text-orange-700">3</span>
            </div>
          </motion.div>
        </div>
      )}

      {/* Rest of the list */}
      <div className="space-y-2">
        {entries.slice(3).map((entry, index) => (
          <motion.div
            key={entry.item.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.05 + 0.3 }}
          >
            <Card 
              className={cn(
                'cursor-pointer transition-all duration-200 hover:scale-[1.02]',
                'hover:border-retro-teal/40'
              )}
              onClick={() => onItemClick?.(entry)}
            >
              <CardContent className="p-3">
                <div className="flex items-center gap-3">
                  <div className={cn(
                    'w-10 h-10 rounded-full flex items-center justify-center font-bold text-lg shrink-0',
                    getRankStyle(entry.rank)
                  )}>
                    {entry.rank}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-retro-dark truncate">
                      {entry.item.title}
                    </p>
                    <p className="text-sm text-retro-gray truncate">
                      {entry.item.description}
                    </p>
                  </div>
                  <div className="text-right shrink-0">
                    <p className="font-bold text-retro-teal">{entry.item.popularityScore}</p>
                    {entry.weeksOnChart && (
                      <p className="text-xs text-retro-gray">{entry.weeksOnChart} weeks</p>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
