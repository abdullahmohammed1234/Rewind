'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Year } from '@/types';

interface CassetteYearCardProps {
  year: Year;
  index: number;
}

const gradientColors: Record<string, { from: string; to: string; accent: string }> = {
  '2012': { from: '#FF6B6B', to: '#FF8E53', accent: '#FFD93D' },
  '2013': { from: '#FF6B9D', to: '#C44FFF', accent: '#4F8FFF' },
  '2014': { from: '#4F8FFF', to: '#4FFFC4', accent: '#C44FFF' },
  '2015': { from: '#4FFFC4', to: '#4F8FFF', accent: '#FF6B9D' },
  '2016': { from: '#FFE14F', to: '#FF9F4F', accent: '#FF6B9D' },
  '2017': { from: '#FF4F6B', to: '#FF6B9D', accent: '#C44FFF' },
  '2018': { from: '#C44FFF', to: '#4F8FFF', accent: '#4FFFC4' },
  '2019': { from: '#FF9F4F', to: '#FF6B9D', accent: '#C44FFF' },
  '2020': { from: '#4FFFC4', to: '#C44FFF', accent: '#FF6B9D' },
  '2021': { from: '#4F8FFF', to: '#C44FFF', accent: '#FFE14F' },
  '2022': { from: '#FF6B9D', to: '#FFE14F', accent: '#4FFFC4' },
  '2023': { from: '#FF6B9D', to: '#FF9F4F', accent: '#4F8FFF' },
  '2024': { from: '#C44FFF', to: '#FF6B9D', accent: '#4FFFC4' },
  '2025': { from: '#4FFFC4', to: '#4F8FFF', accent: '#FF6B9D' },
};

export function CassetteYearCard({ year, index }: CassetteYearCardProps) {
  const colors = gradientColors[year.id] || { from: '#FF6B9D', to: '#C44FFF', accent: '#4FFFC4' };

  return (
    <Link href={`/year/${year.year}`}>
      <motion.div
        initial={{ opacity: 0, y: 30, rotateX: -10 }}
        animate={{ opacity: 1, y: 0, rotateX: 0 }}
        transition={{ duration: 0.5, delay: index * 0.1 }}
        whileHover={{ scale: 1.05, y: -8 }}
        whileTap={{ scale: 0.98 }}
        className="cursor-pointer perspective-1000"
      >
        {/* Cassette Tape Container */}
        <div className="relative w-[280px] h-[180px] mx-auto">
          {/* Main cassette body */}
          <div 
            className="absolute inset-0 rounded-xl overflow-hidden"
            style={{
              background: 'linear-gradient(180deg, #3a3a3a 0%, #2a2a2a 50%, #1a1a1a 100%)',
              boxShadow: '0 4px 20px rgba(0, 0, 0, 0.5), inset 0 2px 4px rgba(255, 255, 255, 0.1), inset 0 -2px 4px rgba(0, 0, 0, 0.3)'
            }}
          >
            {/* Top screws */}
            <div className="absolute top-2 left-3 w-2 h-2 rounded-full bg-[#4a4a4a]" style={{ boxShadow: 'inset 0 1px 2px rgba(0, 0, 0, 0.5)' }} />
            <div className="absolute top-2 right-3 w-2 h-2 rounded-full bg-[#4a4a4a]" style={{ boxShadow: 'inset 0 1px 2px rgba(0, 0, 0, 0.5)' }} />
            
            {/* Label area */}
            <div 
              className="absolute top-4 left-5 right-5 h-[85px] rounded-lg flex flex-col justify-center items-center p-3 overflow-hidden"
              style={{
                background: `linear-gradient(135deg, ${colors.from} 0%, ${colors.to} 100%)`,
                boxShadow: 'inset 0 2px 4px rgba(0, 0, 0, 0.2)'
              }}
            >
              {/* Label lines decoration */}
              <div 
                className="absolute top-2 left-3 right-3 h-4"
                style={{
                  background: 'repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(255, 255, 255, 0.15) 3px, rgba(255, 255, 255, 0.15) 4px)'
                }}
              />
              
              {/* Year text */}
              <motion.span 
                className="text-4xl font-bold text-white drop-shadow-lg z-10"
                style={{ textShadow: '2px 2px 4px rgba(0, 0, 0, 0.3)' }}
                animate={{ scale: [1, 1.02, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                {year.year}
              </motion.span>
              
              {/* Theme text */}
              <span className="text-xs text-white/80 uppercase tracking-widest mt-1 z-10">
                {year.theme || 'Time Capsule'}
              </span>
              
              {/* Decorative corner */}
              <div 
                className="absolute -top-2 -right-2 w-8 h-8 rotate-45"
                style={{ background: colors.accent, opacity: 0.3 }}
              />
            </div>
            
            {/* Tape window */}
            <div 
              className="absolute bottom-[35px] left-1/2 -translate-x-1/2 w-[130px] h-[35px] rounded-md border-2 border-[#3a3a3a] overflow-hidden"
              style={{ background: 'rgba(0, 0, 0, 0.8)' }}
            >
              {/* Tape reels */}
              <div className="absolute inset-0 flex items-center justify-between px-4">
                <motion.div 
                  className="w-6 h-6 rounded-full border-2 border-[#3a3a3a] relative"
                  style={{ background: 'radial-gradient(circle, #1a1a1a 30%, #0f0f0f 70%)' }}
                  animate={{ rotate: 360 }}
                  transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
                >
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-2 h-2 rounded-full bg-[#0a0a0a] border border-[#2a2a2a]" />
                  </div>
                </motion.div>
                
                {/* Tape between reels */}
                <div className="flex-1 h-1 mx-2 bg-[#2a2a2a] rounded" />
                
                <motion.div 
                  className="w-6 h-6 rounded-full border-2 border-[#3a3a3a] relative"
                  style={{ background: 'radial-gradient(circle, #1a1a1a 30%, #0f0f0f 70%)' }}
                  animate={{ rotate: 360 }}
                  transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
                >
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-2 h-2 rounded-full bg-[#0a0a0a] border border-[#2a2a2a]" />
                  </div>
                </motion.div>
              </div>
            </div>
            
            {/* Bottom details */}
            <div className="absolute bottom-2 left-0 right-0 flex justify-center gap-4">
              <div className="w-3 h-3 rounded-sm bg-[#2a2a2a]" />
              <div className="w-3 h-3 rounded-sm bg-[#2a2a2a]" />
            </div>
            
            {/* Side notches */}
            <div className="absolute top-1/2 -translate-y-1/2 left-1 w-1 h-8 bg-[#1a1a1a] rounded" />
            <div className="absolute top-1/2 -translate-y-1/2 right-1 w-1 h-8 bg-[#1a1a1a] rounded" />
          </div>
          
          {/* Hover glow effect */}
          <motion.div 
            className="absolute inset-0 rounded-xl pointer-events-none"
            initial={{ opacity: 0 }}
            whileHover={{ opacity: 1 }}
            style={{
              background: `radial-gradient(circle at center, ${colors.from}20 0%, transparent 70%)`,
              filter: 'blur(20px)'
            }}
          />
        </div>
        
        {/* Description below cassette */}
        <motion.p 
          className="text-center text-sm text-gray-400 mt-3 px-4 line-clamp-2 max-w-[280px] mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: index * 0.1 + 0.3 }}
        >
          {year.description}
        </motion.p>
      </motion.div>
    </Link>
  );
}
