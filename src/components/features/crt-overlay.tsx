'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { retroSound } from '@/lib/sound';

export function CRTOverlay() {
  const [enabled, setEnabled] = useState(false);
  const [scanlinePosition, setScanlinePosition] = useState(0);

  useEffect(() => {
    // Animate scanlines
    const interval = setInterval(() => {
      setScanlinePosition(prev => (prev + 1) % 100);
    }, 50);
    return () => clearInterval(interval);
  }, []);

  const toggleCRT = () => {
    retroSound.click();
    setEnabled(!enabled);
  };

  return (
    <>
      {/* CRT Toggle Button */}
      <motion.button
        className="fixed bottom-4 right-4 z-50 px-4 py-2 bg-retro-dark text-retro-cream rounded-full font-mono text-sm shadow-lg"
        onClick={toggleCRT}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onMouseEnter={() => retroSound.hover()}
        onClickCapture={() => retroSound.click()}
      >
        {enabled ? '📺 CRT: ON' : '📺 CRT: OFF'}
      </motion.button>

      {/* CRT Overlay */}
      <AnimatePresence>
        {enabled && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 pointer-events-none z-40"
            style={{
              background: `
                repeating-linear-gradient(
                  0deg,
                  transparent,
                  transparent 2px,
                  rgba(0, 0, 0, 0.1) 2px,
                  rgba(0, 0, 0, 0.1) 4px
                )
              `,
              backgroundSize: '100% 4px',
            }}
          >
            {/* Scanline moving effect */}
            <motion.div
              className="absolute inset-0"
              style={{
                background: `linear-gradient(
                  to bottom,
                  transparent 50%,
                  rgba(0, 0, 0, 0.3) 51%
                )`,
                backgroundSize: '100% 8px',
                animation: 'scanline 8s linear infinite',
              }}
            />

            {/* Screen curvature effect */}
            <div
              className="absolute inset-0"
              style={{
                background: `
                  radial-gradient(
                    ellipse at center,
                    transparent 0%,
                    rgba(0, 0, 0, 0.4) 100%
                  )
                `,
              }}
            />

            {/* Vignette */}
            <div
              className="absolute inset-0"
              style={{
                boxShadow: 'inset 0 0 150px rgba(0, 0, 0, 0.9)',
              }}
            />

            {/* RGB split effect on edges */}
            <div
              className="absolute inset-0"
              style={{
                boxShadow: `
                  inset 0 0 50px rgba(255, 0, 0, 0.1),
                  inset 0 0 50px rgba(0, 255, 0, 0.1),
                  inset 0 0 50px rgba(0, 0, 255, 0.1)
                `,
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* CRT Keyframes */}
      <style jsx>{`
        @keyframes scanline {
          0% { transform: translateY(0); }
          100% { transform: translateY(8px); }
        }
      `}</style>
    </>
  );
}
