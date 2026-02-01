'use client';

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { retroSound } from '@/lib/sound';

type Theme = 'retro' | 'cyberpunk';

function getInitialTheme(): Theme {
  if (typeof window === 'undefined') return 'retro';
  const saved = localStorage.getItem('timecapsule-theme') as Theme;
  if (saved) return saved;
  if (window.matchMedia('(prefers-color-scheme: dark)').matches) return 'cyberpunk';
  return 'retro';
}

export function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>('retro');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setTheme(getInitialTheme());
  }, []);

  const toggleTheme = () => {
    retroSound.click();
    const newTheme = theme === 'retro' ? 'cyberpunk' : 'retro';
    setTheme(newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('timecapsule-theme', newTheme);
  };

  if (!mounted) return null;

  return (
    <motion.button
      onClick={toggleTheme}
      className="fixed top-20 right-4 z-50 p-3 rounded-full shadow-lg"
      style={{
        background: theme === 'cyberpunk'
          ? 'linear-gradient(135deg, #1a1a2e, #16213e)'
          : 'linear-gradient(135deg, var(--retro-cream), var(--retro-beige))',
        border: theme === 'cyberpunk'
          ? '2px solid #00ff88'
          : '2px solid var(--retro-teal)',
      }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      onMouseEnter={() => retroSound.hover()}
    >
      <motion.div
        animate={{ rotate: theme === 'cyberpunk' ? 180 : 0 }}
        transition={{ duration: 0.3 }}
        className="text-xl"
      >
        {theme === 'cyberpunk' ? '🌙' : '☀️'}
      </motion.div>
    </motion.button>
  );
}

// Sound toggle component
export function SoundToggle() {
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <motion.button
      onClick={() => {
        retroSound.click();
        setSoundEnabled(!soundEnabled);
        retroSound.setEnabled(!soundEnabled);
      }}
      className="fixed top-20 right-16 z-50 p-3 rounded-full shadow-lg"
      style={{
        background: 'linear-gradient(135deg, var(--retro-cream), var(--retro-beige))',
        border: '2px solid var(--retro-purple)',
      }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      onMouseEnter={() => retroSound.hover()}
    >
      <motion.div
        animate={{ scale: soundEnabled ? 1 : 0.8 }}
        transition={{ duration: 0.2 }}
        className="text-xl"
      >
        {soundEnabled ? '🔊' : '🔇'}
      </motion.div>
    </motion.button>
  );
}
