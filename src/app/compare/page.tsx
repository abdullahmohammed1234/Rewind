'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { AnimatedSection } from '@/components/features/animated-section';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { years } from '@/data/seed';
import Footer from '@/components/footer';

export default function ComparePage() {
  const [year1, setYear1] = useState<string>('2015');
  const [year2, setYear2] = useState<string>('2016');

  const year1Data = years.find(y => y.id === year1);
  const year2Data = years.find(y => y.id === year2);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-gray-900 to-black">
      {/* Animated background particles */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 rounded-full bg-white/10"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -100, 0],
              opacity: [0, 0.5, 0],
            }}
            transition={{
              duration: 5 + Math.random() * 5,
              repeat: Infinity,
              delay: Math.random() * 5,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 min-h-screen py-8 px-4">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <AnimatedSection animation="fadeUp">
            <div className="text-center mb-12">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.5 }}
                className="text-6xl mb-4"
              >
                ⚖️
              </motion.div>
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                Compare Years
              </h1>
              <p className="text-xl text-gray-400">
                See how different years of internet culture stack up.
              </p>
            </div>
          </AnimatedSection>

          {/* Year Selectors */}
          <AnimatedSection animation="fadeUp" delay={0.1}>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-8 mb-12">
              <div className="flex flex-col items-center gap-2">
                <label className="text-sm font-medium text-gray-400">Year 1</label>
                <select
                  value={year1}
                  onChange={(e) => setYear1(e.target.value)}
                  className="px-4 py-2 rounded-lg bg-white/10 border border-white/20 text-white focus:border-retro-teal focus:outline-none"
                >
                  {years.map(y => (
                    <option key={y.id} value={y.id}>{y.year}</option>
                  ))}
                </select>
              </div>

              <div className="text-2xl text-retro-purple font-bold">VS</div>

              <div className="flex flex-col items-center gap-2">
                <label className="text-sm font-medium text-gray-400">Year 2</label>
                <select
                  value={year2}
                  onChange={(e) => setYear2(e.target.value)}
                  className="px-4 py-2 rounded-lg bg-white/10 border border-white/20 text-white focus:border-retro-purple focus:outline-none"
                >
                  {years.map(y => (
                    <option key={y.id} value={y.id}>{y.year}</option>
                  ))}
                </select>
              </div>
            </div>
          </AnimatedSection>

          {/* Comparison Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Year 1 */}
            <AnimatedSection animation="fadeUp" delay={0.2}>
              <motion.div
                whileHover={{ scale: 1.02 }}
                className="h-full bg-black/50 border border-white/10 rounded-2xl p-6 hover:border-retro-teal/50 transition-all"
              >
                <CardHeader>
                  <CardTitle className="text-3xl text-retro-teal">{year1Data?.year}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-400 mb-6">{year1Data?.description}</p>
                  
                  <h3 className="font-bold text-white mb-3">Top Trends:</h3>
                  <ul className="space-y-2">
                    {year1Data?.topTrends?.map((trend, i) => (
                      <li key={i} className="flex items-center gap-2 text-gray-300">
                        <span className="w-2 h-2 rounded-full bg-retro-teal" />
                        <span>{trend}</span>
                      </li>
                    ))}
                  </ul>

                  <Link href={`/year/${year1Data?.year}`}>
                    <Button className="mt-6 w-full bg-retro-teal hover:bg-retro-teal/80 text-white">
                      Explore {year1Data?.year} →
                    </Button>
                  </Link>
                </CardContent>
              </motion.div>
            </AnimatedSection>

            {/* Year 2 */}
            <AnimatedSection animation="fadeUp" delay={0.3}>
              <motion.div
                whileHover={{ scale: 1.02 }}
                className="h-full bg-black/50 border border-white/10 rounded-2xl p-6 hover:border-retro-purple/50 transition-all"
              >
                <CardHeader>
                  <CardTitle className="text-3xl text-retro-purple">{year2Data?.year}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-400 mb-6">{year2Data?.description}</p>
                  
                  <h3 className="font-bold text-white mb-3">Top Trends:</h3>
                  <ul className="space-y-2">
                    {year2Data?.topTrends?.map((trend, i) => (
                      <li key={i} className="flex items-center gap-2 text-gray-300">
                        <span className="w-2 h-2 rounded-full bg-retro-purple" />
                        <span>{trend}</span>
                      </li>
                    ))}
                  </ul>

                  <Link href={`/year/${year2Data?.year}`}>
                    <Button className="mt-6 w-full bg-retro-purple hover:bg-retro-purple/80 text-white">
                      Explore {year2Data?.year} →
                    </Button>
                  </Link>
                </CardContent>
              </motion.div>
            </AnimatedSection>
          </div>

          {/* Fun Comparison Stats */}
          <AnimatedSection animation="fadeUp" delay={0.4}>
            <motion.div
              whileHover={{ scale: 1.01 }}
              className="mt-8 p-6 bg-black/50 border border-white/10 rounded-2xl"
            >
              <h3 className="text-xl font-bold text-white text-center mb-6">
                📊 Quick Comparison
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="p-4 bg-white/5 rounded-xl"
                >
                  <div className="text-2xl font-bold text-retro-teal">
                    {parseInt(year2) - parseInt(year1)}
                  </div>
                  <div className="text-sm text-gray-400">Years Apart</div>
                </motion.div>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="p-4 bg-white/5 rounded-xl"
                >
                  <div className="text-2xl font-bold text-white">
                    {year1Data?.topTrends?.length || 0}
                  </div>
                  <div className="text-sm text-gray-400">Year 1 Trends</div>
                </motion.div>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="p-4 bg-white/5 rounded-xl"
                >
                  <div className="text-2xl font-bold text-retro-purple">
                    {year2Data?.topTrends?.length || 0}
                  </div>
                  <div className="text-sm text-gray-400">Year 2 Trends</div>
                </motion.div>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="p-4 bg-white/5 rounded-xl"
                >
                  <div className="text-2xl font-bold text-retro-pink">
                    {Math.abs((year2Data?.topTrends?.length || 0) - (year1Data?.topTrends?.length || 0))}
                  </div>
                  <div className="text-sm text-gray-400">Trend Difference</div>
                </motion.div>
              </div>
            </motion.div>
          </AnimatedSection>

          {/* CTA */}
          <AnimatedSection animation="fadeUp" delay={0.5}>
            <div className="text-center mt-12">
              <p className="text-gray-400 mb-4">
                Want to dive deeper into one of these years?
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/years">
                  <Button size="lg" className="bg-gradient-to-r from-[#FF6B9D] to-[#C44FFF] hover:opacity-90 text-white">
                    Browse All Years 📅
                  </Button>
                </Link>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </div>

      <Footer />
    </div>
  );
}
