'use client';

import { useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Download, 
  Share2, 
  Instagram, 
  Twitter, 
  Facebook, 
  Link as LinkIcon,
  Check,
  Sparkles,
  Trophy,
  Flame,
  Star
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useGamification } from '@/hooks/useGamification';
import { useLocalStorage } from '@/hooks/useLocalStorage';

interface ShareableWrappedCardProps {
  year?: string;
  title?: string;
  subtitle?: string;
}

export function ShareableWrappedCard({ 
  year = '2016',
  title = 'Your Year Wrapped',
  subtitle = 'A journey through nostalgia'
}: ShareableWrappedCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isCopied, setIsCopied] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const { stats } = useGamification();
  const { favorites } = useLocalStorage();

  // Calculate stats for the wrapped card
  const yearFavorites = favorites.filter((f) => f.item.yearId === year);
  const topCategory = yearFavorites.length > 0 
    ? yearFavorites.reduce((acc, curr) => {
        const count = yearFavorites.filter((f) => f.item.categoryId === curr.item.categoryId).length;
        if (count > acc.count) {
          return { category: curr.item.categoryId, count };
        }
        return acc;
      }, { category: '', count: 0 })
    : { category: 'trends', count: 0 };

  const achievements = stats.achievements.length;
  const streak = stats.streak;

  // Generate random "vibe" for the card
  const vibes = [
    { emoji: '🔥', name: 'On Fire', color: 'from-orange-500 to-red-600' },
    { emoji: '⭐', name: 'Star Power', color: 'from-yellow-400 to-orange-500' },
    { emoji: '💎', name: 'Diamond', color: 'from-cyan-400 to-blue-500' },
    { emoji: '🎯', name: 'Target', color: 'from-red-500 to-pink-600' },
    { emoji: '🚀', name: 'Blast Off', color: 'from-purple-500 to-indigo-600' },
  ];

  const randomVibe = vibes[Math.floor(Math.random() * vibes.length)];

  // Download card as image
  const downloadCard = async () => {
    if (!cardRef.current) return;
    
    setIsGenerating(true);
    
    try {
      // Dynamic import to avoid SSR issues
      const html2canvas = (await import('html2canvas')).default;
      
      const canvas = await html2canvas(cardRef.current, {
        backgroundColor: '#1a1a2e',
        scale: 2,
        useCORS: true,
        logging: false,
      });
      
      const link = document.createElement('a');
      link.download = `my-${year}-wrapped.png`;
      link.href = canvas.toDataURL('image/png');
      link.click();
    } catch (error) {
      console.error('Failed to generate image:', error);
    }
    
    setIsGenerating(false);
  };

  // Copy share text
  const copyShareText = async () => {
    const shareText = `🎉 My ${year} Wrapped!\n\n🔥 ${yearFavorites.length} trends explored\n🏆 ${achievements} achievements earned\n⚡ ${streak} day streak\n\nExplore your own nostalgic journey! #Rewind #${year}Wrapped`;
    
    try {
      await navigator.clipboard.writeText(shareText);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    } catch (error) {
      console.error('Failed to copy:', error);
    }
  };

  // Share on social media
  const shareOnSocial = (platform: string) => {
    const url = encodeURIComponent(window.location.href);
    const text = encodeURIComponent(`🎉 My ${year} Wrapped! I explored ${yearFavorites.length} trends and earned ${achievements} achievements. Check out your nostalgic journey! #Rewind #${year}Wrapped`);
    
    let shareUrl = '';
    switch (platform) {
      case 'twitter':
        shareUrl = `https://twitter.com/intent/tweet?text=${text}&url=${url}`;
        break;
      case 'facebook':
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${url}`;
        break;
      case 'instagram':
        // Instagram doesn't have a web share API, so we just copy the text
        copyShareText();
        return;
    }
    
    if (shareUrl) {
      window.open(shareUrl, '_blank', 'width=600,height=400');
    }
  };

  return (
    <div className="space-y-6">
      {/* The shareable card */}
      <div className="relative">
        <motion.div
          ref={cardRef}
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="bg-gradient-to-br from-[#1a1a2e] via-[#16213e] to-[#0f3460] rounded-3xl p-8 shadow-2xl overflow-hidden relative"
          style={{ width: '400px', maxWidth: '100%' }}
        >
          {/* Background pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 left-0 w-40 h-40 bg-retro-teal rounded-full blur-3xl" />
            <div className="absolute bottom-0 right-0 w-40 h-40 bg-retro-purple rounded-full blur-3xl" />
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-60 h-60 bg-retro-pink rounded-full blur-3xl" />
          </div>

          {/* Content */}
          <div className="relative z-10">
            {/* Header */}
            <div className="text-center mb-6">
              <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-1 mb-4">
                <Sparkles className="w-4 h-4 text-yellow-400" />
                <span className="text-sm text-white/80">Your {year} Wrapped</span>
              </div>
              
              <h2 className="text-3xl font-bold text-white mb-2">{title}</h2>
              <p className="text-white/60">{subtitle}</p>
            </div>

            {/* Main stats */}
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 text-center">
                <div className="text-4xl mb-2">📊</div>
                <div className="text-2xl font-bold text-white">{yearFavorites.length}</div>
                <div className="text-xs text-white/60">Trends Explored</div>
              </div>
              
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 text-center">
                <div className="text-4xl mb-2">🏆</div>
                <div className="text-2xl font-bold text-white">{achievements}</div>
                <div className="text-xs text-white/60">Achievements</div>
              </div>
              
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 text-center">
                <div className="text-4xl mb-2">🔥</div>
                <div className="text-2xl font-bold text-white">{streak}</div>
                <div className="text-xs text-white/60">Day Streak</div>
              </div>
              
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 text-center">
                <div className="text-4xl mb-2">⭐</div>
                <div className="text-2xl font-bold text-white">{stats.yearsExplored.size}</div>
                <div className="text-xs text-white/60">Years Explored</div>
              </div>
            </div>

            {/* Vibe badge */}
            <div className="flex justify-center mb-6">
              <div className={`bg-gradient-to-r ${randomVibe.color} rounded-full px-6 py-2 flex items-center gap-2 shadow-lg`}>
                <span className="text-2xl">{randomVibe.emoji}</span>
                <span className="text-white font-bold">{randomVibe.name}</span>
              </div>
            </div>

            {/* Footer */}
            <div className="text-center pt-4 border-t border-white/10">
              <p className="text-white/40 text-sm">rewind.app/{year}</p>
            </div>

            {/* Decorative elements */}
            <div className="absolute top-4 right-4">
              <div className="w-12 h-12 bg-retro-teal/20 rounded-full flex items-center justify-center">
                <Trophy className="w-6 h-6 text-retro-teal" />
              </div>
            </div>
            
            <div className="absolute bottom-4 left-4">
              <div className="w-10 h-10 bg-retro-purple/20 rounded-full flex items-center justify-center">
                <Flame className="w-5 h-5 text-retro-purple" />
              </div>
            </div>
            
            <div className="absolute top-1/2 right-2 transform -translate-y-1/2">
              <div className="w-8 h-8 bg-retro-pink/20 rounded-full flex items-center justify-center">
                <Star className="w-4 h-4 text-retro-pink" />
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Action buttons */}
      <div className="flex flex-col gap-3">
        {/* Download button */}
        <Button
          onClick={downloadCard}
          disabled={isGenerating}
          className="w-full bg-gradient-to-r from-retro-teal to-retro-purple text-white border-0"
        >
          <Download className="w-4 h-4 mr-2" />
          {isGenerating ? 'Generating...' : 'Download Image'}
        </Button>

        {/* Share buttons */}
        <div className="grid grid-cols-4 gap-2">
          <Button
            variant="outline"
            onClick={() => shareOnSocial('twitter')}
            className="flex flex-col items-center gap-1 py-3"
          >
            <Twitter className="w-5 h-5" />
            <span className="text-xs">Twitter</span>
          </Button>
          
          <Button
            variant="outline"
            onClick={() => shareOnSocial('facebook')}
            className="flex flex-col items-center gap-1 py-3"
          >
            <Facebook className="w-5 h-5" />
            <span className="text-xs">Facebook</span>
          </Button>
          
          <Button
            variant="outline"
            onClick={() => shareOnSocial('instagram')}
            className="flex flex-col items-center gap-1 py-3"
          >
            <Instagram className="w-5 h-5" />
            <span className="text-xs">Instagram</span>
          </Button>
          
          <Button
            variant="outline"
            onClick={copyShareText}
            className="flex flex-col items-center gap-1 py-3"
          >
            {isCopied ? (
              <Check className="w-5 h-5 text-green-500" />
            ) : (
              <LinkIcon className="w-5 h-5" />
            )}
            <span className="text-xs">{isCopied ? 'Copied!' : 'Copy'}</span>
          </Button>
        </div>
      </div>

      {/* Share text preview */}
      <Card className="bg-gray-800/50 border-0 p-4">
        <h4 className="text-sm font-medium text-gray-400 mb-2">Share Preview:</h4>
        <p className="text-sm text-white/80 font-mono">
          🎉 My {year} Wrapped! 🔥 {yearFavorites.length} trends explored | 🏆 {achievements} achievements | ⚡ {streak} day streak
        </p>
      </Card>
    </div>
  );
}
