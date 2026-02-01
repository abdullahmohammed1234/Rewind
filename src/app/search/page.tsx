'use client';

import { motion } from 'framer-motion';
import { NostalgiaBackground } from '@/components/features/nostalgia-background';
import { AnimatedSection } from '@/components/features/animated-section';
import { SearchBar } from '@/components/features/search-bar';
import { TrendCard } from '@/components/features/trend-card';
import { items, years } from '@/data/seed';
import { useState } from 'react';

export default function SearchPage() {
  const [searchResults, setSearchResults] = useState(items.slice(0, 6));

  const handleSearchResults = (results: typeof items) => {
    setSearchResults(results);
  };

  return (
    <NostalgiaBackground>
      <div className="min-h-screen py-12 px-4">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <AnimatedSection animation="fadeUp">
            <div className="text-center mb-12">
              <h1 className="text-4xl md:text-5xl font-bold text-retro-dark mb-4">
                Search Trends
              </h1>
              <p className="text-xl text-retro-gray max-w-2xl mx-auto">
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
              <div className="p-4 bg-retro-teal/10 rounded-xl text-center">
                <div className="text-2xl font-bold text-retro-teal">{items.length}+</div>
                <div className="text-sm text-retro-gray">Trends</div>
              </div>
              <div className="p-4 bg-retro-purple/10 rounded-xl text-center">
                <div className="text-2xl font-bold text-retro-purple">{years.length}</div>
                <div className="text-sm text-retro-gray">Years</div>
              </div>
              <div className="p-4 bg-retro-pink/10 rounded-xl text-center">
                <div className="text-2xl font-bold text-retro-pink">10</div>
                <div className="text-sm text-retro-gray">Categories</div>
              </div>
              <div className="p-4 bg-retro-yellow/20 rounded-xl text-center">
                <div className="text-2xl font-bold text-retro-dark">2016</div>
                <div className="text-sm text-retro-gray">Most Viral</div>
              </div>
            </div>
          </AnimatedSection>

          {/* Popular Trends Section */}
          <AnimatedSection animation="fadeUp" delay={0.3}>
            <div className="mt-12">
              <h2 className="text-2xl font-bold text-retro-dark mb-6 flex items-center gap-2">
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
              <h2 className="text-2xl font-bold text-retro-dark mb-6 flex items-center gap-2">
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
                    className="p-4 bg-white/80 rounded-xl text-center hover:shadow-lg 
                             transition-all hover:-translate-y-1"
                  >
                    <span className="text-3xl block mb-2">{cat.icon}</span>
                    <span className="font-medium text-retro-dark">{cat.name}</span>
                  </a>
                ))}
              </div>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </NostalgiaBackground>
  );
}
