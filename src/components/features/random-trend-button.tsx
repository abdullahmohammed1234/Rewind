'use client';

import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { getRandomItem, items } from '@/data/seed';
import { Item } from '@/types';
import Link from 'next/link';

interface RandomTrendButtonProps {
  variant?: 'primary' | 'secondary';
  size?: 'sm' | 'md' | 'lg';
  showResult?: boolean;
}

export function RandomTrendButton({ 
  variant = 'primary', 
  size = 'md',
  showResult = true 
}: RandomTrendButtonProps) {
  const [isAnimating, setIsAnimating] = useState(false);
  const [randomItem, setRandomItem] = useState<Item | null>(null);
  const [showConfetti, setShowConfetti] = useState(false);

  const handleRandomize = useCallback(() => {
    if (isAnimating) return;
    
    setIsAnimating(true);
    setRandomItem(null);
    setShowConfetti(false);
    
    // Animation sequence
    const item = getRandomItem();
    if (item) {
      setRandomItem(item);
    }
    
    // Animate for a bit
    setTimeout(() => {
      setIsAnimating(false);
      setShowConfetti(true);
    }, 800);
  }, [isAnimating]);

  const getButtonContent = () => {
    if (isAnimating) {
      return (
        <div className="flex items-center gap-2">
          <motion.span
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
          >
            🎲
          </motion.span>
          <span>Searching...</span>
        </div>
      );
    }
    
    return (
      <div className="flex items-center gap-2">
        <span>🎲</span>
        <span>Surprise Me!</span>
      </div>
    );
  };

  const buttonSizes = {
    sm: 'text-sm px-4 py-2',
    md: 'text-lg px-6 py-3',
    lg: 'text-xl px-8 py-4'
  };

  return (
    <div className="space-y-4">
      <AnimatePresence mode="wait">
        {showResult && randomItem && !isAnimating && (
          <motion.div
            key={randomItem.id}
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="bg-gradient-to-br from-retro-purple/30 via-retro-pink/20 to-retro-teal/20 border border-white/10 rounded-2xl p-6"
            >
              <div className="flex items-start gap-4">
                <motion.div
                  animate={{ 
                    scale: [1, 1.2, 1],
                    rotate: [0, 10, -10, 0]
                  }}
                  transition={{ duration: 0.5, repeat: Infinity, repeatDelay: 2 }}
                  className="text-5xl"
                >
                  ✨
                </motion.div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xs font-mono text-retro-teal px-2 py-0.5 rounded bg-retro-teal/20">
                      {randomItem.yearId}
                    </span>
                    {randomItem.popularityScore && randomItem.popularityScore >= 90 && (
                      <span className="text-xs font-mono text-yellow-400 px-2 py-0.5 rounded bg-yellow-400/20">
                        🔥 Hot
                      </span>
                    )}
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">
                    {randomItem.title}
                  </h3>
                  <p className="text-gray-400 text-sm mb-4 line-clamp-2">
                    {randomItem.description}
                  </p>
                  <div className="flex flex-wrap gap-3">
                    <Link href={`/trend/${randomItem.slug}`}>
                      <Button size="sm" className="bg-gradient-to-r from-[#FF6B9D] to-[#C44FFF] hover:opacity-90">
                        Explore This Trend →
                      </Button>
                    </Link>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={handleRandomize}
                      className="border-retro-teal/30 text-retro-teal hover:bg-retro-teal/20"
                    >
                      Another One! 🎲
                    </Button>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Confetti effect */}
      <AnimatePresence>
        {showConfetti && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 pointer-events-none z-50 flex items-center justify-center"
          >
            {[...Array(20)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute"
                style={{
                  left: `${20 + Math.random() * 60}%`,
                  top: `${30 + Math.random() * 30}%`,
                }}
                initial={{ opacity: 1, y: 0, scale: 1 }}
                animate={{ 
                  opacity: 0, 
                  y: 100 + Math.random() * 100, 
                  scale: 0,
                  rotate: Math.random() * 360
                }}
                transition={{ duration: 1 + Math.random(), delay: Math.random() * 0.3 }}
              >
                <span className="text-2xl">
                  {['🎉', '✨', '🌟', '💫', '🎊'][Math.floor(Math.random() * 5)]}
                </span>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      <Button
        onClick={handleRandomize}
        disabled={isAnimating}
        className={`
          ${variant === 'primary' 
            ? 'bg-gradient-to-r from-[#FF6B9D] to-[#C44FFF] hover:opacity-90 border-0' 
            : 'border-retro-teal/50 text-retro-teal hover:bg-retro-teal/20 bg-transparent'
          }
          ${buttonSizes[size]}
        `}
      >
        {getButtonContent()}
      </Button>
    </div>
  );
}

// Compact version for smaller spaces
export function RandomTrendButtonCompact({ onRandom }: { onRandom?: (item: Item) => void }) {
  const [randomItem, setRandomItem] = useState<Item | null>(null);

  const handleRandomize = useCallback(() => {
    const item = getRandomItem();
    if (item) {
      setRandomItem(item);
      onRandom?.(item);
    }
  }, [onRandom]);

  return (
    <div className="space-y-2">
      <Button
        onClick={handleRandomize}
        variant="outline"
        size="sm"
        className="border-retro-teal/30 text-retro-teal hover:bg-retro-teal/20 w-full"
      >
        <span className="mr-2">🎲</span>
        Surprise Me!
      </Button>
      
      {randomItem && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className="overflow-hidden"
        >
          <Link href={`/trend/${randomItem.slug}`}>
            <div className="p-3 bg-black/30 border border-white/10 rounded-lg hover:border-retro-teal/50 transition-all cursor-pointer">
              <div className="flex items-center gap-3">
                <span className="text-2xl">✨</span>
                <div>
                  <div className="text-xs text-retro-teal">{randomItem.yearId}</div>
                  <div className="text-sm font-medium text-white truncate max-w-[200px]">
                    {randomItem.title}
                  </div>
                </div>
              </div>
            </div>
          </Link>
        </motion.div>
      )}
    </div>
  );
}
