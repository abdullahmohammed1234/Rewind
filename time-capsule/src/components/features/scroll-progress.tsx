'use client';

import { motion, useScroll, useSpring } from 'framer-motion';
import { useEffect, useState } from 'react';

export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const checkTheme = () => {
      const theme = document.documentElement.getAttribute('data-theme');
      setIsDark(theme === 'cyberpunk');
    };
    checkTheme();
    const observer = new MutationObserver(checkTheme);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });
    return () => observer.disconnect();
  }, []);

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-1.5 z-50 origin-left"
      style={{
        scaleX,
        background: isDark
          ? 'linear-gradient(90deg, #00ff88, #ff00ff, #00ffff)'
          : 'linear-gradient(90deg, var(--retro-teal), var(--retro-purple))',
        boxShadow: isDark
          ? '0 0 10px #00ff88, 0 0 20px #ff00ff'
          : '0 0 10px var(--retro-teal)',
      }}
    />
  );
}

// Wrapped Progress Card for year/month pages
export function WrappedProgressCard({ 
  totalMonths = 12, 
  completedMonths = 0 
}: { 
  totalMonths?: number;
  completedMonths?: number;
}) {
  const progress = (completedMonths / totalMonths) * 100;
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const checkTheme = () => {
      const theme = document.documentElement.getAttribute('data-theme');
      setIsDark(theme === 'cyberpunk');
    };
    checkTheme();
    const observer = new MutationObserver(checkTheme);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });
    return () => observer.disconnect();
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="fixed bottom-20 right-4 z-40 p-4 rounded-xl backdrop-blur-md border-2"
      style={{
        background: isDark
          ? 'rgba(0, 0, 0, 0.8)'
          : 'rgba(255, 255, 255, 0.8)',
        borderColor: isDark
          ? '#00ff88'
          : 'var(--retro-teal)',
      }}
    >
      <div className="text-xs font-mono mb-2 text-retro-gray dark:text-retro-cream">
        {completedMonths} / {totalMonths} months explored
      </div>
      <div className="w-32 h-3 bg-retro-cream dark:bg-retro-dark rounded-full overflow-hidden">
        <motion.div
          className="h-full rounded-full"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.5 }}
          style={{
            background: isDark
              ? 'linear-gradient(90deg, #00ff88, #ff00ff)'
              : 'var(--retro-teal)',
          }}
        />
      </div>
      <div className="text-xs font-mono mt-1 text-center text-retro-teal">
        {Math.round(progress)}% Complete
      </div>
    </motion.div>
  );
}
