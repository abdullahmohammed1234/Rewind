'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Trophy, 
  Lock, 
  Sparkles, 
  Star, 
  Crown, 
  Gift,
  ChevronDown,
  X
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useGamification } from '@/hooks/useGamification';
import { Achievement } from '@/hooks/useGamification';

const rarityColors = {
  common: 'from-gray-400 to-gray-500',
  rare: 'from-blue-400 to-blue-600',
  epic: 'from-purple-400 to-purple-600',
  legendary: 'from-yellow-400 to-orange-500',
};

const rarityGlow = {
  common: 'shadow-gray-500/50',
  rare: 'shadow-blue-500/50',
  epic: 'shadow-purple-500/50',
  legendary: 'shadow-yellow-500/50',
};

interface AchievementBadgeProps {
  achievement: Achievement;
  isEarned: boolean;
  progress: number;
  earnedAt?: string;
}

function AchievementBadge({ achievement, isEarned, progress, earnedAt }: AchievementBadgeProps) {
  const [showDetails, setShowDetails] = useState(false);

  const progressPercent = Math.min((progress / achievement.requirement) * 100, 100);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ scale: isEarned ? 1.05 : 1 }}
      className={`flex flex-col items-center ${isEarned ? 'cursor-pointer' : 'cursor-not-allowed'}`}
      onClick={() => isEarned && setShowDetails(true)}
    >
      {/* Badge container */}
      <div className={`relative w-20 h-20 rounded-2xl flex items-center justify-center
        ${isEarned 
          ? `bg-gradient-to-br ${rarityColors[achievement.rarity]} shadow-lg ${rarityGlow[achievement.rarity]}`
          : 'bg-gray-700/50'
        }
        transition-all duration-300
      `}>
        {/* Icon */}
        <span className="text-3xl filter drop-shadow-lg">
          {achievement.icon}
        </span>

        {/* Lock overlay for unearned */}
        {!isEarned && (
          <div className="absolute inset-0 bg-gray-900/60 rounded-2xl flex items-center justify-center">
            <Lock className="w-6 h-6 text-gray-400" />
          </div>
        )}

        {/* Earned indicator */}
        {isEarned && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="absolute -top-1 -right-1 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center shadow-lg z-10"
          >
            <span className="text-white text-xs">✓</span>
          </motion.div>
        )}

        {/* Rarity indicator */}
        {isEarned && (
          <div className={`absolute -bottom-1 left-1/2 transform -translate-x-1/2 px-2 py-0.5 rounded-full text-[10px] font-bold z-10
            ${achievement.rarity === 'legendary' ? 'bg-yellow-500 text-yellow-900' :
              achievement.rarity === 'epic' ? 'bg-purple-500 text-white' :
              achievement.rarity === 'rare' ? 'bg-blue-500 text-white' :
              'bg-gray-400 text-gray-900'}
          `}>
            {achievement.rarity[0].toUpperCase()}
          </div>
        )}
      </div>

      {/* Name display */}
      <p className={`mt-2 text-xs font-medium text-center ${isEarned ? 'text-white' : 'text-gray-400'} max-w-[80px] truncate`}>
        {achievement.name}
      </p>

      {/* Progress bar for unearned */}
      {!isEarned && (
        <div className="mt-1 w-full">
          <div className="h-1 bg-gray-700 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-retro-teal rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${progressPercent}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>
          <p className="text-[10px] text-gray-500 mt-0.5 text-center">
            {progress}/{achievement.requirement}
          </p>
        </div>
      )}
    </motion.div>
  );
}

export function AchievementsBadges() {
  const { 
    earnedAchievements, 
    availableAchievements, 
    getAchievementProgress,
    stats 
  } = useGamification();
  
  const [selectedAchievement, setSelectedAchievement] = useState<Achievement | null>(null);
  const [showAll, setShowAll] = useState(false);

  // Combine earned and available achievements
  const allAchievements = [
    ...earnedAchievements.map((ea) => ({
      ...ea,
      isEarned: true,
      progress: ea.requirement,
      earnedAt: ea.earnedAt,
    })),
    ...availableAchievements.map((aa) => {
      const { progress } = getAchievementProgress(aa.id);
      return {
        ...aa,
        isEarned: false,
        progress,
        earnedAt: undefined,
      };
    }),
  ];

  // Sort: earned first, then by rarity, then by progress
  const sortedAchievements = allAchievements
    .sort((a, b) => {
      if (a.isEarned !== b.isEarned) return a.isEarned ? -1 : 1;
      const rarityOrder = { legendary: 0, epic: 1, rare: 2, common: 3 };
      if (rarityOrder[a.rarity] !== rarityOrder[b.rarity]) {
        return rarityOrder[a.rarity] - rarityOrder[b.rarity];
      }
      return b.progress - a.progress;
    })
    .slice(0, showAll ? allAchievements.length : 8);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-xl flex items-center justify-center shadow-lg">
            <Trophy className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-white">Achievements</h2>
            <p className="text-sm text-gray-400">
              {earnedAchievements.length}/{earnedAchievements.length + availableAchievements.length} Unlocked
            </p>
          </div>
        </div>

        {/* Progress ring */}
        <div className="relative w-16 h-16">
          <svg className="w-16 h-16 transform -rotate-90">
            <circle
              cx="32"
              cy="32"
              r="28"
              stroke="currentColor"
              strokeWidth="4"
              fill="none"
              className="text-gray-700"
            />
            <motion.circle
              cx="32"
              cy="32"
              r="28"
              stroke="currentColor"
              strokeWidth="4"
              fill="none"
              className="text-yellow-500"
              strokeDasharray={176}
              initial={{ strokeDashoffset: 176 }}
              animate={{ 
                strokeDashoffset: 176 - (176 * earnedAchievements.length / allAchievements.length) 
              }}
              transition={{ duration: 1 }}
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-sm font-bold text-white">
              {Math.round((earnedAchievements.length / allAchievements.length) * 100)}%
            </span>
          </div>
        </div>
      </div>

      {/* Achievements grid */}
      <div className="grid grid-cols-4 gap-4">
        {sortedAchievements.map((achievement, index) => (
          <motion.div
            key={achievement.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <AchievementBadge
              achievement={achievement}
              isEarned={achievement.isEarned}
              progress={achievement.progress}
              earnedAt={achievement.earnedAt}
            />
          </motion.div>
        ))}
      </div>

      {/* Show more button */}
      {allAchievements.length > 8 && (
        <button
          onClick={() => setShowAll(!showAll)}
          className="w-full flex items-center justify-center gap-2 py-3 bg-gray-800/50 rounded-xl text-gray-400 hover:text-white hover:bg-gray-800 transition-all"
        >
          {showAll ? (
            <>
              <ChevronDown className="w-4 h-4 rotate-180" />
              Show Less
            </>
          ) : (
            <>
              <ChevronDown className="w-4 h-4" />
              Show All ({allAchievements.length})
            </>
          )}
        </button>
      )}

      {/* Stats summary */}
      <Card className="bg-gray-800/50 border-0">
        <CardContent className="p-4">
          <div className="grid grid-cols-4 gap-4 text-center">
            <div>
              <div className="text-2xl font-bold text-yellow-400">
                {earnedAchievements.filter(a => a.rarity === 'legendary').length}
              </div>
              <div className="text-xs text-gray-400">Legendary</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-purple-400">
                {earnedAchievements.filter(a => a.rarity === 'epic').length}
              </div>
              <div className="text-xs text-gray-400">Epic</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-blue-400">
                {earnedAchievements.filter(a => a.rarity === 'rare').length}
              </div>
              <div className="text-xs text-gray-400">Rare</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-gray-400">
                {earnedAchievements.filter(a => a.rarity === 'common').length}
              </div>
              <div className="text-xs text-gray-400">Common</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Achievement detail modal */}
      <AnimatePresence>
        {selectedAchievement && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4"
            onClick={() => setSelectedAchievement(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-gray-800 rounded-2xl p-6 max-w-md w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-4">
                  <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${rarityColors[selectedAchievement.rarity]} flex items-center justify-center text-4xl`}>
                    {selectedAchievement.icon}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white">{selectedAchievement.name}</h3>
                    <Badge variant="secondary" className="mt-1">
                      {selectedAchievement.rarity}
                    </Badge>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedAchievement(null)}
                  className="p-2 hover:bg-gray-700 rounded-lg transition-colors"
                >
                  <X className="w-5 h-5 text-gray-400" />
                </button>
              </div>

              <p className="text-gray-300 mb-4">{selectedAchievement.description}</p>

              <div className="bg-gray-900 rounded-xl p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-400">Progress</span>
                  <span className="text-sm text-white">
                    {selectedAchievement.requirement}/{selectedAchievement.requirement}
                  </span>
                </div>
                <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-green-500 rounded-full"
                    style={{ width: '100%' }}
                  />
                </div>
              </div>

              <div className="mt-4 flex items-center gap-2 text-sm text-gray-400">
                <Gift className="w-4 h-4" />
                Earned on {new Date().toLocaleDateString()}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
