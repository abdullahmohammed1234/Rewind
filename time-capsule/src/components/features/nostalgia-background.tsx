'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

interface NostalgiaBackgroundProps {
  children: React.ReactNode;
  showFloatingYears?: boolean;
}

export function NostalgiaBackground({ 
  children, 
  showFloatingYears = false 
}: NostalgiaBackgroundProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 1], ['0%', '50%']);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <div 
      ref={containerRef}
      className="min-h-screen relative overflow-hidden bg-retro-cream"
    >
      {/* Grain overlay */}
      <div 
        className="fixed inset-0 pointer-events-none opacity-[0.03] z-50"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Floating years in background */}
      {showFloatingYears && (
        <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
          <motion.div 
            style={{ y }}
            className="absolute inset-0 flex items-center justify-center"
          >
            {[2012, 2013, 2014, 2015, 2016, 2017, 2018].map((year, i) => (
              <motion.span
                key={year}
                className="absolute text-[20vw] font-bold text-retro-teal/5 select-none"
                style={{
                  left: `${15 + (i * 12)}%`,
                  top: `${20 + Math.sin(i) * 10}%`,
                }}
                animate={{
                  y: [0, -20, 0],
                  opacity: [0.3, 0.6, 0.3],
                }}
                transition={{
                  duration: 4 + i * 0.5,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              >
                {year}
              </motion.span>
            ))}
          </motion.div>
        </div>
      )}

      {/* Content */}
      <motion.div 
        style={{ opacity }}
        className="relative z-10"
      >
        {children}
      </motion.div>
    </div>
  );
}
