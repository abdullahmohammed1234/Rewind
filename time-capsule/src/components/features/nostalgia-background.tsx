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

  return (
    <div 
      ref={containerRef}
      className="min-h-screen relative overflow-hidden bg-[#0a0a0a]"
    >
      {/* Animated gradient background */}
      <div className="fixed inset-0 animated-gradient opacity-20 pointer-events-none" />

      {/* Grain overlay */}
      <div 
        className="fixed inset-0 pointer-events-none opacity-[0.02] z-50"
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
            {[2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024].map((year, i) => (
              <motion.span
                key={year}
                className="absolute text-[15vw] font-black select-none"
                style={{
                  left: `${5 + (i * 8)}%`,
                  top: `${20 + Math.sin(i) * 15}%`,
                  background: 'linear-gradient(135deg, rgba(255, 107, 157, 0.1) 0%, rgba(196, 79, 255, 0.1) 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
                animate={{
                  y: [0, -30, 0],
                  opacity: [0.1, 0.3, 0.1],
                }}
                transition={{
                  duration: 5 + i * 0.5,
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

      {/* Floating particles */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        {[...Array(30)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 rounded-full"
            style={{
              background: ['#FF6B9D', '#C44FFF', '#4FFFC4', '#4F8FFF'][i % 4],
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -50, 0],
              opacity: [0.2, 0.6, 0.2],
            }}
            transition={{
              duration: 4 + Math.random() * 3,
              repeat: Infinity,
              delay: Math.random() * 3,
            }}
          />
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
}
