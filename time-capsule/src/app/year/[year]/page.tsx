'use client';

import { useParams } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { AnimatedSection } from '@/components/features/animated-section';
import { Leaderboard, LeaderboardCompact } from '@/components/features/leaderboard';
import { Button } from '@/components/ui/button';
import { getYearById, getMonthsByYear, categories, getLeaderboardByCategory, getYearStats } from '@/data/seed';
import { cn } from '@/lib/utils';

export default function YearPage() {
  const params = useParams();
  const year = parseInt(params.year as string);
  const yearId = year.toString();
  const yearData = getYearById(yearId);
  const months = getMonthsByYear(yearId);
  const [activeCategory, setActiveCategory] = useState('music');

  if (!yearData) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center">
        <div className="text-center">
          <span className="text-8xl mb-4 block">📼</span>
          <h1 className="text-4xl font-bold text-white mb-4">Year not found</h1>
          <p className="text-gray-400 mb-8">This capsule hasn't been created yet.</p>
          <Link href="/years">
            <Button className="bg-gradient-to-r from-[#FF6B9D] to-[#C44FFF]">Back to Years</Button>
          </Link>
        </div>
      </div>
    );
  }

  const stats = getYearStats(yearId);
  const activeLeaderboard = getLeaderboardByCategory(activeCategory, yearId);
  const activeCategoryData = categories.find(c => c.id === activeCategory);

  // Get top item from each category for the wrapped summary
  const topItems = categories.slice(0, 7).map(cat => {
    const items = getLeaderboardByCategory(cat.id, yearId);
    return { category: cat, item: items[0] };
  }).filter(x => x.item);

  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      {/* Animated background */}
      <div className="fixed inset-0 animated-gradient opacity-10 pointer-events-none" />

      {/* Hero Section */}
      <section className="relative py-20 px-4 overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(15)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 rounded-full bg-white/20"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                opacity: [0.2, 0.8, 0.2],
                scale: [1, 1.5, 1],
              }}
              transition={{
                duration: 2 + Math.random() * 2,
                repeat: Infinity,
                delay: Math.random() * 2,
              }}
            />
          ))}
        </div>

        <div className="max-w-6xl mx-auto text-center relative z-10">
          {/* Back button */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="absolute left-0 top-0"
          >
            <Link href="/years">
              <Button variant="ghost" className="text-gray-400 hover:text-white">
                ← Back to Years
              </Button>
            </Link>
          </motion.div>

          {/* Year display */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="mb-6"
          >
            <motion.span 
              className="text-6xl mb-4 block"
              animate={{ rotate: [0, 5, 0, -5, 0] }}
              transition={{ duration: 4, repeat: Infinity }}
            >
              📼
            </motion.span>
            <h1 className="text-7xl md:text-9xl font-black bg-gradient-to-r from-[#FF6B9D] via-[#C44FFF] to-[#4F8FFF] bg-clip-text text-transparent">
              {year}
            </h1>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-gray-300 max-w-2xl mx-auto mb-8"
          >
            {yearData.description}
          </motion.p>

          {/* Quick stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex flex-wrap justify-center gap-6"
          >
            {stats.byCategory.filter(s => s.count > 0).slice(0, 5).map((stat, i) => (
              <div key={stat.category.id} className="text-center">
                <span className="text-2xl">{stat.category.icon}</span>
                <div className="text-2xl font-bold text-white">{stat.count}</div>
                <div className="text-xs text-gray-400">{stat.category.name}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Year Wrapped Summary */}
      <section className="py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <AnimatedSection animation="fadeUp">
            <div className="rounded-3xl overflow-hidden" style={{
              background: 'linear-gradient(135deg, rgba(255, 107, 157, 0.1) 0%, rgba(196, 79, 255, 0.1) 50%, rgba(79, 143, 255, 0.1) 100%)',
              border: '1px solid rgba(255, 255, 255, 0.1)'
            }}>
              <div className="p-8">
                <h2 className="text-3xl font-bold text-white text-center mb-8">
                  🎬 {year} Wrapped
                </h2>
                
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
                  {topItems.map(({ category, item }, i) => (
                    <motion.div
                      key={category.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.1 }}
                      whileHover={{ scale: 1.05, y: -5 }}
                      className="p-4 rounded-xl bg-white/5 border border-white/10 hover:border-white/20 cursor-pointer transition-all text-center"
                    >
                      <span className="text-3xl mb-2 block">{category.icon}</span>
                      <div className="text-xs text-gray-400 mb-1">#{1} {category.name}</div>
                      <div className="text-sm font-semibold text-white line-clamp-2">{item.title}</div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Category Tabs & Leaderboards */}
      <section className="py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <AnimatedSection animation="fadeUp">
            <h2 className="text-3xl font-bold text-white text-center mb-8">
              📊 Leaderboards by Category
            </h2>
          </AnimatedSection>

          {/* Category tabs */}
          <AnimatedSection animation="fadeUp" delay={0.1}>
            <div className="flex flex-wrap justify-center gap-2 mb-8">
              {categories.slice(0, 7).map((cat) => {
                const isActive = activeCategory === cat.id;
                const hasItems = getLeaderboardByCategory(cat.id, yearId).length > 0;
                
                return (
                  <motion.button
                    key={cat.id}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setActiveCategory(cat.id)}
                    disabled={!hasItems}
                    className={cn(
                      'px-4 py-2 rounded-full flex items-center gap-2 transition-all',
                      isActive 
                        ? 'bg-gradient-to-r from-[#FF6B9D] to-[#C44FFF] text-white' 
                        : 'bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white',
                      !hasItems && 'opacity-50 cursor-not-allowed'
                    )}
                  >
                    <span>{cat.icon}</span>
                    <span className="text-sm font-medium">{cat.name}</span>
                  </motion.button>
                );
              })}
            </div>
          </AnimatedSection>

          {/* Active leaderboard */}
          <AnimatedSection animation="fadeUp" delay={0.2}>
            <div className="max-w-3xl mx-auto">
              {activeCategoryData && activeLeaderboard.length > 0 ? (
                <Leaderboard 
                  items={activeLeaderboard} 
                  category={activeCategoryData}
                  maxItems={5}
                />
              ) : (
                <div className="text-center py-12">
                  <span className="text-6xl mb-4 block">🔍</span>
                  <p className="text-gray-400">No items found for this category in {year}</p>
                </div>
              )}
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* All Categories Grid */}
      <section className="py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <AnimatedSection animation="fadeUp">
            <h2 className="text-3xl font-bold text-white text-center mb-8">
              🗂️ All Categories
            </h2>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.slice(0, 9).map((cat, i) => {
              const items = getLeaderboardByCategory(cat.id, yearId);
              if (items.length === 0) return null;
              
              return (
                <AnimatedSection key={cat.id} animation="fadeUp" delay={0.1 * i}>
                  <motion.div
                    whileHover={{ y: -5 }}
                    className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-white/20 transition-all"
                  >
                    <LeaderboardCompact items={items} category={cat} maxItems={3} />
                    
                    <button 
                      onClick={() => setActiveCategory(cat.id)}
                      className="mt-4 text-sm text-[#C44FFF] hover:text-[#FF6B9D] transition-colors"
                    >
                      View full leaderboard →
                    </button>
                  </motion.div>
                </AnimatedSection>
              );
            })}
          </div>
        </div>
      </section>

      {/* Month Timeline */}
      {months.length > 0 && (
        <section className="py-12 px-4">
          <div className="max-w-6xl mx-auto">
            <AnimatedSection animation="fadeUp">
              <h2 className="text-3xl font-bold text-white text-center mb-8">
                📅 Explore by Month
              </h2>
            </AnimatedSection>

            <AnimatedSection animation="fadeUp" delay={0.1}>
              <div className="flex flex-wrap justify-center gap-3">
                {months.map((month, i) => (
                  <Link key={month.id} href={`/year/${year}/${month.id}`}>
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: i * 0.05 }}
                      whileHover={{ scale: 1.1, y: -3 }}
                      whileTap={{ scale: 0.95 }}
                      className="px-4 py-3 rounded-xl bg-white/5 border border-white/10 hover:border-[#C44FFF]/50 hover:bg-white/10 cursor-pointer transition-all"
                    >
                      <div className="text-lg font-bold text-white">{month.shortName}</div>
                    </motion.div>
                  </Link>
                ))}
              </div>
            </AnimatedSection>
          </div>
        </section>
      )}

      {/* Navigation */}
      <section className="py-12 px-4 border-t border-white/10">
        <div className="max-w-6xl mx-auto">
          <div className="flex justify-between items-center">
            {year > 2012 && (
              <Link href={`/year/${year - 1}`}>
                <Button variant="ghost" className="text-gray-400 hover:text-white">
                  ← {year - 1}
                </Button>
              </Link>
            )}
            <Link href="/years">
              <Button variant="outline" className="border-white/20 text-white hover:bg-white/10">
                All Years
              </Button>
            </Link>
            {year < 2025 && (
              <Link href={`/year/${year + 1}`}>
                <Button variant="ghost" className="text-gray-400 hover:text-white">
                  {year + 1} →
                </Button>
              </Link>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
