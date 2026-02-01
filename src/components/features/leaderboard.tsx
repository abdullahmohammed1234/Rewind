'use client';

import { motion } from 'framer-motion';
import { Item, Category } from '@/types';
import { cn } from '@/lib/utils';

interface LeaderboardProps {
  items: Item[];
  category: Category;
  showVotes?: boolean;
  maxItems?: number;
}

export function Leaderboard({ items, category, showVotes = true, maxItems = 5 }: LeaderboardProps) {
  const displayItems = items.slice(0, maxItems);

  const getRankStyle = (rank: number) => {
    switch (rank) {
      case 1:
        return 'bg-gradient-to-r from-yellow-400 to-amber-500 text-black';
      case 2:
        return 'bg-gradient-to-r from-gray-300 to-gray-400 text-black';
      case 3:
        return 'bg-gradient-to-r from-amber-600 to-amber-700 text-white';
      default:
        return 'bg-white/10 text-white';
    }
  };

  const getTrendIcon = (rank: number, previousRank?: number) => {
    if (!previousRank) return '🆕';
    if (rank < previousRank) return '📈';
    if (rank > previousRank) return '📉';
    return '➡️';
  };

  return (
    <div className="space-y-3">
      {/* Header */}
      <div className="flex items-center gap-3 mb-4">
        <span className="text-3xl">{category.icon}</span>
        <div>
          <h3 className="text-xl font-bold text-white">{category.name}</h3>
          <p className="text-sm text-gray-400">Top {maxItems} of the year</p>
        </div>
      </div>

      {/* Leaderboard items */}
      <div className="space-y-2">
        {displayItems.map((item, index) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ x: 5, scale: 1.01 }}
            className={cn(
              'flex items-center gap-4 p-4 rounded-xl transition-all cursor-pointer',
              'bg-white/5 border border-white/10 hover:border-white/20 hover:bg-white/10'
            )}
          >
            {/* Rank badge */}
            <div 
              className={cn(
                'w-10 h-10 rounded-full flex items-center justify-center font-bold text-lg shrink-0',
                getRankStyle(index + 1)
              )}
            >
              {index + 1}
            </div>

            {/* Item info */}
            <div className="flex-1 min-w-0">
              <h4 className="font-semibold text-white truncate">{item.title}</h4>
              <p className="text-sm text-gray-400 truncate">{item.description}</p>
            </div>

            {/* Stats */}
            {showVotes && (
              <div className="text-right shrink-0">
                <div className="text-lg font-bold text-white">
                  {item.popularityScore}
                </div>
                <div className="text-xs text-gray-400">
                  {item.userVotes?.toLocaleString()} votes
                </div>
              </div>
            )}

            {/* Trend indicator */}
            <div className="text-xl shrink-0">
              {index < 3 ? ['🥇', '🥈', '🥉'][index] : ''}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

// Compact version for sidebar or smaller spaces
export function LeaderboardCompact({ items, category, maxItems = 3 }: LeaderboardProps) {
  const displayItems = items.slice(0, maxItems);

  return (
    <div className="space-y-2">
      <div className="flex items-center gap-2 mb-3">
        <span className="text-xl">{category.icon}</span>
        <h4 className="font-semibold text-white">{category.name}</h4>
      </div>

      {displayItems.map((item, index) => (
        <motion.div
          key={item.id}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: index * 0.05 }}
          className="flex items-center gap-2 text-sm"
        >
          <span className="text-gray-500 w-4">{index + 1}.</span>
          <span className="text-white truncate flex-1">{item.title}</span>
          <span className="text-gray-400">{item.popularityScore}</span>
        </motion.div>
      ))}
    </div>
  );
}

// All-time leaderboard with year indicators
interface AllTimeLeaderboardProps {
  items: Item[];
  category: Category;
  maxItems?: number;
}

export function AllTimeLeaderboard({ items, category, maxItems = 10 }: AllTimeLeaderboardProps) {
  const displayItems = items.slice(0, maxItems);

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3 mb-6">
        <span className="text-4xl">{category.icon}</span>
        <div>
          <h3 className="text-2xl font-bold text-white">All-Time {category.name}</h3>
          <p className="text-sm text-gray-400">The greatest hits across all years</p>
        </div>
      </div>

      <div className="space-y-3">
        {displayItems.map((item, index) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            whileHover={{ scale: 1.02 }}
            className={cn(
              'relative p-5 rounded-2xl overflow-hidden cursor-pointer transition-all',
              index === 0 && 'bg-gradient-to-r from-yellow-500/20 to-amber-500/20 border-2 border-yellow-500/50',
              index === 1 && 'bg-gradient-to-r from-gray-400/20 to-gray-500/20 border border-gray-400/50',
              index === 2 && 'bg-gradient-to-r from-amber-600/20 to-amber-700/20 border border-amber-600/50',
              index > 2 && 'bg-white/5 border border-white/10 hover:border-white/20'
            )}
          >
            <div className="flex items-center gap-4">
              {/* Large rank number */}
              <div className={cn(
                'text-5xl font-black',
                index === 0 && 'text-yellow-400',
                index === 1 && 'text-gray-300',
                index === 2 && 'text-amber-500',
                index > 2 && 'text-white/30'
              )}>
                {index + 1}
              </div>

              {/* Item details */}
              <div className="flex-1">
                <h4 className="text-xl font-bold text-white">{item.title}</h4>
                <p className="text-sm text-gray-400 line-clamp-1">{item.description}</p>
                <div className="flex items-center gap-4 mt-2">
                  <span className="text-xs px-2 py-1 rounded-full bg-white/10 text-gray-300">
                    {item.yearId}
                  </span>
                  <span className="text-xs text-gray-400">
                    {item.engagementScore} engagement
                  </span>
                </div>
              </div>

              {/* Trophy for top 3 */}
              {index < 3 && (
                <div className="text-4xl">
                  {['🏆', '🥈', '🥉'][index]}
                </div>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
