'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { AnimatedSection } from '@/components/features/animated-section';
import { CassetteYearCard } from '@/components/features/cassette-year-card';
import { Button } from '@/components/ui/button';
import { years } from '@/data/seed';

export default function YearsPage() {
  // Group years by decade
  const yearsByDecade = years.reduce((acc, year) => {
    const decade = Math.floor(year.year / 10) * 10;
    if (!acc[decade]) acc[decade] = [];
    acc[decade].push(year);
    return acc;
  }, {} as Record<number, typeof years>);

  const decades = Object.keys(yearsByDecade).map(Number).sort((a, b) => b - a);

  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      {/* Animated background */}
      <div className="fixed inset-0 animated-gradient opacity-10 pointer-events-none" />

      {/* Header */}
      <section className="py-20 px-4 relative">
        <div className="max-w-7xl mx-auto">
          <AnimatedSection animation="fadeUp">
            <div className="text-center mb-16">
              <motion.span 
                className="text-7xl mb-6 block"
                animate={{ rotate: [0, 5, 0, -5, 0] }}
                transition={{ duration: 4, repeat: Infinity }}
              >
                📼
              </motion.span>
              <h1 className="text-5xl md:text-7xl font-black text-white mb-6">
                <span className="bg-gradient-to-r from-[#FF6B9D] via-[#C44FFF] to-[#4F8FFF] bg-clip-text text-transparent">
                  Capsules
                </span>
              </h1>
              <p className="text-xl text-gray-400 max-w-2xl mx-auto">
                Journey through the evolution of internet culture, one cassette at a time.
                Each tape holds the memories of a year.
              </p>
            </div>
          </AnimatedSection>

          {/* Decade sections */}
          {decades.map((decade, decadeIndex) => (
            <div key={decade} className="mb-20">
              <AnimatedSection animation="fadeUp" delay={decadeIndex * 0.1}>
                <div className="flex items-center gap-4 mb-8">
                  <div className="h-px flex-1 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
                  <h2 className="text-2xl font-bold text-white">
                    {decade}s
                  </h2>
                  <div className="h-px flex-1 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
                </div>
              </AnimatedSection>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 justify-items-center">
                {yearsByDecade[decade]
                  .sort((a, b) => b.year - a.year)
                  .map((year, index) => (
                    <CassetteYearCard 
                      key={year.id} 
                      year={year} 
                      index={index + decadeIndex * 10} 
                    />
                  ))}
              </div>
            </div>
          ))}

          {/* Coming Soon */}
          <AnimatedSection animation="fadeUp" delay={0.5}>
            <motion.div 
              whileHover={{ scale: 1.02 }}
              className="mt-16 p-8 rounded-3xl text-center"
              style={{
                background: 'linear-gradient(135deg, rgba(79, 255, 196, 0.1) 0%, rgba(79, 143, 255, 0.1) 100%)',
                border: '2px dashed rgba(79, 255, 196, 0.3)'
              }}
            >
              <motion.span 
                className="text-5xl mb-4 block"
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                🚀
              </motion.span>
              <h3 className="text-2xl font-bold text-white mb-2">
                More Years Coming Soon!
              </h3>
              <p className="text-gray-400 max-w-md mx-auto">
                We're constantly adding new years and updating existing capsules with more content.
                Stay tuned for the full archive!
              </p>
            </motion.div>
          </AnimatedSection>

          {/* Quick navigation */}
          <AnimatedSection animation="fadeUp" delay={0.6}>
            <div className="mt-16 text-center">
              <h3 className="text-lg font-semibold text-white mb-4">Quick Jump</h3>
              <div className="flex flex-wrap justify-center gap-2">
                {years.map((year) => (
                  <Link key={year.id} href={`/year/${year.year}`}>
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      className="px-3 py-1 rounded-full bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white text-sm transition-all"
                    >
                      {year.year}
                    </motion.button>
                  </Link>
                ))}
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </div>
  );
}
