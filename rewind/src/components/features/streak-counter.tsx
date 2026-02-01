'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { Flame, Calendar, Clock, Trophy } from 'lucide-react';
import { useGamification } from '@/hooks/useGamification';

interface StreakCounterProps {
  showDetails?: boolean;
}

export function StreakCounter({ showDetails = true }: StreakCounterProps) {
  const { stats, streakMessage, yearsToMaintainStreak, isLoaded } = useGamification();

  if (!isLoaded) {
    return null;
  }

  const streakVariants = {
    initial: { scale: 0.8, opacity: 0 },
    animate: { 
      scale: 1, 
      opacity: 1,
      transition: { type: 'spring', stiffness: 200, damping: 15 }
    },
    pulse: {
      scale: [1, 1.05, 1],
      transition: { duration: 2, repeat: Infinity }
    }
  };

  const fireColors = [
    '#FF6B6B', // Day 1-2
    '#FF8E53', // Day 3-6
    '#FFA502', // Day 7-13
    '#FF6348', // Day 14-29
    '#FF4757', // Day 30+
  ];

  const getFireColor = () => {
    if (stats.streak >= 30) return fireColors[4];
    if (stats.streak >= 14) return fireColors[3];
    if (stats.streak >= 7) return fireColors[2];
    if (stats.streak >= 3) return fireColors[1];
    return fireColors[0];
  };

  const getStreakEmoji = () => {
    if (stats.streak >= 365) return '👑';
    if (stats.streak >= 30) return '🔥';
    if (stats.streak >= 7) return '⚡';
    if (stats.streak >= 3) return '🌟';
    return '✨';
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="relative"
    >
      {/* Main streak card */}
      <div className="bg-gradient-to-br from-orange-500/20 to-red-500/20 rounded-2xl p-6 border border-orange-500/30 backdrop-blur-sm">
        <div className="flex items-center justify-between">
          {/* Streak display */}
          <div className="flex items-center gap-4">
            <motion.div
              variants={streakVariants}
              initial="initial"
              animate="animate"
              className="relative"
            >
              {/* Fire icon with glow */}
              <div 
                className="w-16 h-16 rounded-full flex items-center justify-center"
                style={{ 
                  background: `radial-gradient(circle, ${getFireColor()}40 0%, transparent 70%)`,
                  boxShadow: `0 0 30px ${getFireColor()}60`
                }}
              >
                <motion.div
                  variants={streakVariants}
                  animate="pulse"
                  className="text-4xl"
                >
                  {getStreakEmoji()}
                </motion.div>
              </div>
            </motion.div>

            <div>
              <div className="flex items-center gap-2">
                <Flame className="w-6 h-6 text-orange-500" />
                <span className="text-4xl font-bold text-white">{stats.streak}</span>
              </div>
              <p className="text-orange-200 text-sm font-medium">Day Streak</p>
            </div>
          </div>

          {/* Motivational message */}
          <div className="text-right">
            <p className="text-orange-100 text-sm max-w-[200px]">
              {streakMessage}
            </p>
          </div>
        </div>

        {/* Progress bar for next milestone */}
        {stats.streak > 0 && (
          <div className="mt-4">
            <div className="flex justify-between text-xs text-orange-200 mb-1">
              <span>Progress to next milestone</span>
              <span>
                {stats.streak < 7 ? `${7 - stats.streak} days` :
                 stats.streak < 30 ? `${30 - stats.streak} days` :
                 stats.streak < 365 ? `${365 - stats.streak} days` : 'MAX!'}
              </span>
            </div>
            <div className="h-2 bg-orange-500/20 rounded-full overflow-hidden">
              <motion.div
                className="h-full rounded-full"
                style={{ background: getFireColor() }}
                initial={{ width: 0 }}
                animate={{ 
                  width: `${Math.min((stats.streak / (stats.streak < 7 ? 7 : stats.streak < 30 ? 30 : 365)) * 100, 100)}%`
                }}
                transition={{ duration: 0.5 }}
              />
            </div>
          </div>
        )}
      </div>

      {/* Years to maintain streak message */}
      {showDetails && yearsToMaintainStreak > 0 && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          className="mt-3 flex items-center gap-2 text-sm text-gray-400 bg-gray-800/50 rounded-lg px-4 py-2"
        >
          <Calendar className="w-4 h-4" />
          <span>
            Explore <strong className="text-white">{yearsToMaintainStreak} more {yearsToMaintainStreak === 1 ? 'year' : 'years'}</strong> to maintain your streak!
          </span>
        </motion.div>
      )}

      {/* Streak statistics */}
      {showDetails && stats.streak > 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="mt-4 grid grid-cols-3 gap-3"
        >
          <div className="bg-gray-800/50 rounded-xl p-3 text-center">
            <Clock className="w-5 h-5 text-blue-400 mx-auto mb-1" />
            <p className="text-white font-bold">{stats.streak}h</p>
            <p className="text-xs text-gray-400">Time Spent</p>
          </div>
          <div className="bg-gray-800/50 rounded-xl p-3 text-center">
            <Trophy className="w-5 h-5 text-yellow-400 mx-auto mb-1" />
            <p className="text-white font-bold">{stats.achievements.length}</p>
            <p className="text-xs text-gray-400">Achievements</p>
          </div>
          <div className="bg-gray-800/50 rounded-xl p-3 text-center">
            <Flame className="w-5 h-5 text-orange-400 mx-auto mb-1" />
            <p className="text-white font-bold">{stats.yearsExplored.size}</p>
            <p className="text-xs text-gray-400">Years Explored</p>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
}
