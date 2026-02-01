'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { AnimatedSection } from '@/components/features/animated-section';
import { AllTimeLeaderboard } from '@/components/features/leaderboard';
import { Button } from '@/components/ui/button';
import { categories, getTopItemsAllTime } from '@/data/seed';
import { cn } from '@/lib/utils';

export default function AllTimePage() {
  const [activeCategory, setActiveCategory] = useState('memes');
  const activeCategoryData = categories.find(c => c.id === activeCategory);
  const topItems = getTopItemsAllTime(activeCategory, 10);

  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      {/* Animated background */}
      <div className="fixed inset-0 animated-gradient opacity-10 pointer-events-none" />

      {/* Hero Section */}
      <section className="relative py-20 px-4 overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, -20, 0],
                opacity: [0.3, 0.8, 0.3],
                rotate: [0, 360],
              }}
              transition={{
                duration: 4 + Math.random() * 2,
                repeat: Infinity,
                delay: Math.random() * 2,
              }}
            >
              {['🏆', '⭐', '🎵', '😂', '📺'][i % 5]}
            </motion.div>
          ))}
        </div>

        <div className="max-w-6xl mx-auto text-center relative z-10">
          {/* Back button */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="absolute left-0 top-0"
          >
            <Link href="/">
              <Button variant="ghost" className="text-gray-400 hover:text-white">
                ← Back to Home
              </Button>
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <motion.span 
              className="text-8xl mb-6 block"
              animate={{ rotate: [0, 10, 0, -10, 0], scale: [1, 1.1, 1] }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              🏆
            </motion.span>
            <h1 className="text-5xl md:text-7xl font-black text-white mb-4">
              All-Time <span className="bg-gradient-to-r from-[#FFE14F] to-[#FF9F4F] bg-clip-text text-transparent">Legends</span>
            </h1>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              The greatest hits across all years. The memes, songs, and trends that transcended their time.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Category Tabs */}
      <section className="py-8 px-4 sticky top-0 bg-[#0a0a0a]/90 backdrop-blur-lg z-20 border-b border-white/10">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-wrap justify-center gap-2">
            {categories.slice(0, 7).map((cat) => {
              const isActive = activeCategory === cat.id;
              
              return (
                <motion.button
                  key={cat.id}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setActiveCategory(cat.id)}
                  className={cn(
                    'px-5 py-3 rounded-full flex items-center gap-2 transition-all',
                    isActive 
                      ? 'bg-gradient-to-r from-[#FFE14F] to-[#FF9F4F] text-black font-bold' 
                      : 'bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white'
                  )}
                >
                  <span className="text-xl">{cat.icon}</span>
                  <span>{cat.name}</span>
                </motion.button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Leaderboard */}
      <section className="py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <AnimatedSection animation="fadeUp">
            {activeCategoryData && topItems.length > 0 ? (
              <AllTimeLeaderboard 
                items={topItems} 
                category={activeCategoryData}
                maxItems={10}
              />
            ) : (
              <div className="text-center py-16">
                <span className="text-6xl mb-4 block">🔍</span>
                <p className="text-gray-400">No items found for this category</p>
              </div>
            )}
          </AnimatedSection>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 px-4 border-t border-white/10">
        <div className="max-w-6xl mx-auto">
          <AnimatedSection animation="fadeUp">
            <h2 className="text-2xl font-bold text-white text-center mb-8">
              📊 Hall of Fame Stats
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {[
                { label: 'Total Legends', value: '50+', icon: '🏆', color: '#FFE14F' },
                { label: 'Years Covered', value: '14', icon: '📅', color: '#FF6B9D' },
                { label: 'Categories', value: '7', icon: '📂', color: '#C44FFF' },
                { label: 'User Votes', value: '1M+', icon: '👥', color: '#4FFFC4' },
              ].map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  whileHover={{ scale: 1.05 }}
                  className="p-6 rounded-2xl bg-white/5 border border-white/10 text-center"
                >
                  <span className="text-4xl mb-3 block">{stat.icon}</span>
                  <div className="text-3xl font-black" style={{ color: stat.color }}>
                    {stat.value}
                  </div>
                  <div className="text-sm text-gray-400">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Category Highlights */}
      <section className="py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <AnimatedSection animation="fadeUp">
            <h2 className="text-2xl font-bold text-white text-center mb-8">
              🌟 Category Champions
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {categories.slice(0, 6).map((cat, i) => {
                const topItem = getTopItemsAllTime(cat.id, 1)[0];
                if (!topItem) return null;

                return (
                  <motion.div
                    key={cat.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                    whileHover={{ y: -5, scale: 1.02 }}
                    onClick={() => setActiveCategory(cat.id)}
                    className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-white/20 cursor-pointer transition-all"
                  >
                    <div className="flex items-center gap-3 mb-4">
                      <span className="text-3xl">{cat.icon}</span>
                      <div>
                        <h3 className="font-bold text-white">{cat.name}</h3>
                        <p className="text-xs text-gray-400">All-Time #1</p>
                      </div>
                      <span className="ml-auto text-2xl">🥇</span>
                    </div>
                    <div className="p-4 rounded-xl bg-white/5">
                      <h4 className="font-semibold text-white mb-1">{topItem.title}</h4>
                      <p className="text-sm text-gray-400 line-clamp-2">{topItem.description}</p>
                      <div className="mt-2 text-xs text-gray-500">
                        From {topItem.yearId} • Score: {topItem.engagementScore}
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 border-t border-white/10">
        <div className="max-w-4xl mx-auto text-center">
          <AnimatedSection animation="fadeUp">
            <h2 className="text-3xl font-bold text-white mb-4">
              Want to explore by year?
            </h2>
            <p className="text-gray-400 mb-8">
              Dive into specific years to see what was trending month by month
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/years">
                <Button size="lg" className="bg-gradient-to-r from-[#FF6B9D] to-[#C44FFF] hover:opacity-90">
                  Browse All Years 📅
                </Button>
              </Link>
              <Link href="/mycapsule">
                <Button size="lg" variant="outline" className="border-[#4FFFC4] text-[#4FFFC4] hover:bg-[#4FFFC4]/10">
                  Create Your Capsule ✨
                </Button>
              </Link>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </div>
  );
}
