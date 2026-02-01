'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';

interface ShareButtonProps {
  title: string;
  description?: string;
  url?: string;
  hashtags?: string[];
}

export function ShareButton({ title, description, url, hashtags = [] }: ShareButtonProps) {
  const [showMenu, setShowMenu] = useState(false);

  const shareUrls = {
    twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url || window.location.href)}&hashtags=${hashtags.join(',')}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url || window.location.href)}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url || window.location.href)}`,
    copy: '',
  };

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(url || window.location.href);
      alert('Link copied to clipboard!');
    } catch (err) {
      console.error('Failed to copy:', err);
    }
    setShowMenu(false);
  };

  return (
    <div className="relative">
      <Button
        variant="outline"
        size="sm"
        onClick={() => setShowMenu(!showMenu)}
        className="flex items-center gap-2"
      >
        <span>📤</span>
        Share
      </Button>

      <AnimatePresence>
        {showMenu && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute right-0 top-full mt-2 bg-white rounded-xl shadow-xl border border-retro-teal/20 p-2 z-50 min-w-[200px]"
          >
            <div className="space-y-1">
              <button
                onClick={() => {
                  window.open(shareUrls.twitter, '_blank');
                  setShowMenu(false);
                }}
                className="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-retro-teal/10 transition-colors text-left"
              >
                <span className="text-xl">🐦</span>
                <span className="text-sm">Share on Twitter</span>
              </button>
              
              <button
                onClick={() => {
                  window.open(shareUrls.facebook, '_blank');
                  setShowMenu(false);
                }}
                className="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-retro-teal/10 transition-colors text-left"
              >
                <span className="text-xl">📘</span>
                <span className="text-sm">Share on Facebook</span>
              </button>
              
              <button
                onClick={() => {
                  window.open(shareUrls.linkedin, '_blank');
                  setShowMenu(false);
                }}
                className="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-retro-teal/10 transition-colors text-left"
              >
                <span className="text-xl">💼</span>
                <span className="text-sm">Share on LinkedIn</span>
              </button>
              
              <hr className="my-2 border-retro-teal/10" />
              
              <button
                onClick={handleCopyLink}
                className="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-retro-teal/10 transition-colors text-left"
              >
                <span className="text-xl">🔗</span>
                <span className="text-sm">Copy Link</span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
