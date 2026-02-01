'use client';

import { motion } from 'framer-motion';
import { AnimatedSection } from '@/components/features/animated-section';
import { SearchBar } from '@/components/features/search-bar';
import { TrendCard } from '@/components/features/trend-card';
import { items, years } from '@/data/seed';
import { useState } from 'react';
import Footer from '@/components/footer';

export default function SearchPage() {
  const [searchResults, setSearchResults] = useState(items.slice(0, 6));

  const handleSearchResults = (results: typeof items) => {
    setSearchResults(results);
  };

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

      <div className="relative z-10 min-h-screen py-12 px-4">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <AnimatedSection animation="fadeUp">
            <div className="text-center mb-12">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.5 }}
                className="text-6xl mb-4"
              >
                🔍
              </motion.div>
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                Search Trends
              </h1>
              <p className="text-xl text-gray-400 max-w-2xl mx-auto">
                Find any trend, meme, song, or viral moment from 2012-2024
              </p>
            </div>
          </AnimatedSection>

          {/* Search Bar */}
          <AnimatedSection animation="fadeUp" delay={0.1}>
            <SearchBar 
              onSelectItem={(item) => {
                window.location.href = `/trend/${item.slug}`;
              }}
              placeholder="Search for memes, songs, trends..."
              showFilters={false}
            />
          </AnimatedSection>

          {/* Quick Stats */}
          <AnimatedSection animation="fadeUp" delay={0.2}>
            <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4">
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="p-4 bg-black/50 border border-white/10 rounded-xl text-center"
              >
                <div className="text-2xl font-bold text-retro-teal">{items.length}+</div>
                <div className="text-sm text-gray-400">Trends</div>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="p-4 bg-black/50 border border-white/10 rounded-xl text-center"
              >
                <div className="text-2xl font-bold text-retro-purple">{years.length}</div>
                <div className="text-sm text-gray-400">Years</div>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="p-4 bg-black/50 border border-white/10 rounded-xl text-center"
              >
                <div className="text-2xl font-bold text-retro-pink">10</div>
                <div className="text-sm text-gray-400">Categories</div>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="p-4 bg-black/50 border border-white/10 rounded-xl text-center"
              >
                <div className="text-2xl font-bold text-retro-orange">2016</div>
                <div className="text-sm text-gray-400">Most Viral</div>
              </motion.div>
            </div>
          </AnimatedSection>

          {/* Popular Trends Section */}
          <AnimatedSection animation="fadeUp" delay={0.3}>
            <div className="mt-12">
              <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                <span>🔥</span>
                <span>Popular Right Now</span>
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {items
                  .sort((a, b) => (b.popularityScore || 0) - (a.popularityScore || 0))
                  .slice(0, 6)
                  .map((item, index) => (
                    <TrendCard key={item.id} item={item} compact />
                  ))}
              </div>
            </div>
          </AnimatedSection>

          {/* Categories Quick Links */}
          <AnimatedSection animation="fadeUp" delay={0.4}>
            <div className="mt-12">
              <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                <span>📁</span>
                <span>Browse by Category</span>
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                {[
                  { icon: '😂', name: 'Memes', href: '/all-time?category=memes' },
                  { icon: '🎵', name: 'Music', href: '/all-time?category=music' },
                  { icon: '💃', name: 'Dances', href: '/all-time?category=dances' },
                  { icon: '🎮', name: 'Gaming', href: '/all-time?category=gaming' },
                  { icon: '⭐', name: 'Celebrities', href: '/all-time?category=celebrities' },
                ].map((cat) => (
                  <a
                    key={cat.name}
                    href={cat.href}
                    className="p-4 bg-black/50 border border-white/10 rounded-xl text-center hover:border-retro-teal/50 transition-all hover:-translate-y-1"
                  >
                    <span className="text-3xl block mb-2">{cat.icon}</span>
                    <span className="font-medium text-white">{cat.name}</span>
                  </a>
                ))}
              </div>
            </div>
          </AnimatedSection>
        </div>
      </div>

      <Footer />
    </div>
  );
}
