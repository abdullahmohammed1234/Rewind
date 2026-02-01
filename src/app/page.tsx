'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { AnimatedSection } from '@/components/features/animated-section';
import { CassetteYearCard } from '@/components/features/cassette-year-card';
import { OnThisDay } from '@/components/features/on-this-day';
import { RandomTrendButton } from '@/components/features/random-trend-button';
import { Button } from '@/components/ui/button';
import { years, categories } from '@/data/seed';
import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import Footer from '@/components/footer';

export default function Home() {
  const featuredYear = years.find(y => y.id === '2016');
  const recentYears = years.slice(-6).reverse();

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-gray-900 to-black">
      {/* Animated background particles */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 rounded-full"
            style={{
              background: ['#FF6B9D', '#C44FFF', '#4FFFC4', '#4F8FFF'][i % 4],
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.3, 0.8, 0.3],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center px-4 py-20 overflow-hidden">
        <div className="max-w-5xl mx-auto text-center relative z-10">
          {/* Logo/Icon */}
          <motion.div
            initial={{ opacity: 0, scale: 0.5, rotate: -10 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 0.8, type: 'spring' }}
            className="mb-8"
          >
            <span className="text-9xl filter drop-shadow-2xl">📼</span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-5xl md:text-8xl font-black mb-6"
          >
            <span className="bg-gradient-to-r from-[#FF6B9D] via-[#C44FFF] to-[#4F8FFF] bg-clip-text text-transparent">
              Rewind
            </span>
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-xl md:text-2xl text-gray-300 max-w-2xl mx-auto mb-4"
          >
            Relive the memes, music, and moments that defined each year of internet culture.
          </motion.p>
          
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="text-sm text-gray-500 mb-10"
          >
            Your Spotify Wrapped for the entire internet 🎵
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link href="/years">
              <Button size="lg" className="text-lg px-8 bg-gradient-to-r from-[#FF6B9D] to-[#C44FFF] hover:opacity-90 border-0">
                Explore Capsules 📅
              </Button>
            </Link>
            <Link href="/mycapsule">
              <Button variant="outline" size="lg" className="text-lg px-8 border-[#C44FFF] text-[#C44FFF] hover:bg-[#C44FFF]/10">
                My Capsule ✨
              </Button>
            </Link>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="text-gray-500 text-sm font-mono"
          >
            Scroll to explore ↓
          </motion.div>
        </motion.div>
      </section>

      {/* Capsules Section */}
      <section className="py-20 px-4 relative">
        <div className="max-w-7xl mx-auto">
          <AnimatedSection animation="fadeUp">
            <div className="text-center mb-16">
              <motion.span 
                className="text-6xl mb-4 block"
                animate={{ rotate: [0, 5, 0, -5, 0] }}
                transition={{ duration: 4, repeat: Infinity }}
              >
                🌍
              </motion.span>
              <h2 className="text-4xl md:text-5xl font-black text-white mb-4">
                <span className="bg-gradient-to-r from-[#4FFFC4] to-[#4F8FFF] bg-clip-text text-transparent">
                  Capsules
                </span>
              </h2>
              <p className="text-gray-400 max-w-2xl mx-auto text-lg">
                Explore the collective memories of the internet. Each capsule contains the top trends, 
                memes, music, and moments that defined that year.
              </p>
            </div>
          </AnimatedSection>

          {/* Categories Preview */}
          <AnimatedSection animation="fadeUp" delay={0.2}>
            <div className="flex flex-wrap justify-center gap-3 mb-12">
              {categories.slice(0, 7).map((cat, i) => (
                <motion.div
                  key={cat.id}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.1 * i }}
                  whileHover={{ scale: 1.1 }}
                  className="px-4 py-2 rounded-full bg-white/5 border border-white/10 flex items-center gap-2 cursor-pointer hover:border-retro-teal/50 transition-all"
                >
                  <span className="text-xl">{cat.icon}</span>
                  <span className="text-white text-sm font-medium">{cat.name}</span>
                </motion.div>
              ))}
            </div>
          </AnimatedSection>

          {/* Year Cassettes Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center">
            {recentYears.map((year, index) => (
              <CassetteYearCard key={year.id} year={year} index={index} />
            ))}
          </div>

          {/* View All Button */}
          <AnimatedSection animation="fadeUp" delay={0.5}>
            <div className="text-center mt-12">
              <Link href="/years">
                <Button variant="outline" size="lg" className="border-[#4FFFC4] text-[#4FFFC4] hover:bg-[#4FFFC4]/10">
                  View All Years →
                </Button>
              </Link>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* MyCapsule Section */}
      <section className="py-20 px-4 relative overflow-hidden">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#C44FFF]/5 to-transparent pointer-events-none" />
        
        <div className="max-w-6xl mx-auto relative z-10">
          <AnimatedSection animation="fadeUp">
            <div className="text-center mb-12">
              <motion.span 
                className="text-6xl mb-4 block"
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                💜
              </motion.span>
              <h2 className="text-4xl md:text-5xl font-black text-white mb-4">
                My<span className="bg-gradient-to-r from-[#FF6B9D] to-[#C44FFF] bg-clip-text text-transparent">Capsule</span>
              </h2>
              <p className="text-gray-400 max-w-2xl mx-auto text-lg">
                Create your own personal rewind. Save your favorite moments, 
                photos, and memories from each year.
              </p>
            </div>
          </AnimatedSection>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {[
              { 
                icon: '📸', 
                title: 'Add Your Memories', 
                desc: 'Upload photos, videos, and notes from your year',
                color: '#FF6B9D'
              },
              { 
                icon: '🔒', 
                title: 'Seal Your Capsule', 
                desc: 'Lock it until a future date for a surprise reveal',
                color: '#C44FFF'
              },
              { 
                icon: '🤝', 
                title: 'Share with Friends', 
                desc: 'Post to your gallery and share your memories',
                color: '#4FFFC4'
              },
            ].map((feature, i) => (
              <AnimatedSection key={feature.title} animation="fadeUp" delay={0.2 * (i + 1)}>
                <motion.div 
                  whileHover={{ y: -5, scale: 1.02 }}
                  className="p-8 rounded-2xl bg-black/50 border border-white/10 hover:border-white/20 transition-all cursor-pointer"
                  style={{ 
                    boxShadow: `0 0 30px ${feature.color}10`
                  }}
                >
                  <span className="text-5xl mb-4 block">{feature.icon}</span>
                  <h3 className="text-xl font-bold text-white mb-2">{feature.title}</h3>
                  <p className="text-gray-400">{feature.desc}</p>
                </motion.div>
              </AnimatedSection>
            ))}
          </div>

          {/* CTA */}
          <AnimatedSection animation="fadeUp" delay={0.6}>
            <div className="text-center">
              <Link href="/mycapsule">
                <Button size="lg" className="text-lg px-10 bg-gradient-to-r from-[#FF6B9D] to-[#C44FFF] hover:opacity-90 border-0">
                  Create Your Capsule 🚀
                </Button>
              </Link>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* All-Time Top Picks Preview */}
      <section className="py-20 px-4 relative">
        <div className="max-w-6xl mx-auto">
          <AnimatedSection animation="fadeUp">
            <div className="text-center mb-12">
              <motion.span 
                className="text-6xl mb-4 block"
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
              >
                🏆
              </motion.span>
              <h2 className="text-4xl md:text-5xl font-black text-white mb-4">
                All-Time <span className="bg-gradient-to-r from-[#FFE14F] to-[#FF9F4F] bg-clip-text text-transparent">Legends</span>
              </h2>
              <p className="text-gray-400 max-w-2xl mx-auto text-lg">
                The greatest hits across all years. The memes, songs, and trends that transcended their time.
              </p>
            </div>
          </AnimatedSection>

          {/* Quick stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
            {[
              { label: 'Years Archived', value: years.length, icon: '📅' },
              { label: 'Categories', value: categories.length, icon: '📂' },
              { label: 'Trends Tracked', value: '100+', icon: '📈' },
              { label: 'User Votes', value: '0', icon: '👥' },
            ].map((stat, i) => (
              <AnimatedSection key={stat.label} animation="scaleIn" delay={0.1 * i}>
                <motion.div 
                  whileHover={{ scale: 1.05 }}
                  className="p-6 rounded-xl bg-black/50 border border-white/10 text-center"
                >
                  <span className="text-3xl mb-2 block">{stat.icon}</span>
                  <div className="text-3xl font-black text-white">{stat.value}</div>
                  <div className="text-sm text-gray-400">{stat.label}</div>
                </motion.div>
              </AnimatedSection>
            ))}
          </div>

          <AnimatedSection animation="fadeUp" delay={0.4}>
            <div className="text-center">
              <Link href="/all-time">
                <Button variant="outline" size="lg" className="border-[#FFE14F] text-[#FFE14F] hover:bg-[#FFE14F]/10">
                  View All-Time Charts →
                </Button>
              </Link>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* New Features Section - On This Day & Random Trend */}
      <section className="py-20 px-4 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#FF6B9D]/5 to-transparent pointer-events-none" />
        
        <div className="max-w-6xl mx-auto relative z-10">
          <AnimatedSection animation="fadeUp">
            <div className="text-center mb-12">
              <motion.span 
                className="text-6xl mb-4 block"
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                🎲
              </motion.span>
              <h2 className="text-4xl md:text-5xl font-black text-white mb-4">
                Discover Something <span className="bg-gradient-to-r from-[#FF6B9D] to-[#C44FFF] bg-clip-text text-transparent">New</span>
              </h2>
              <p className="text-gray-400 max-w-2xl mx-auto text-lg">
                Explore what was trending today in history or get a random surprise!
              </p>
            </div>
          </AnimatedSection>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
            {/* On This Day */}
            <AnimatedSection animation="fadeUp" delay={0.1}>
              <OnThisDay compact={false} />
            </AnimatedSection>

            {/* Random Trend */}
            <AnimatedSection animation="fadeUp" delay={0.2}>
              <Card className="bg-gradient-to-br from-retro-purple/20 to-retro-teal/20 border-white/10 overflow-hidden h-full">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-2xl">🎲</span>
                    <div>
                      <h3 className="text-lg font-bold text-white">Random Discovery</h3>
                      <p className="text-sm text-gray-400">Surprise me with a trend!</p>
                    </div>
                  </div>
                  <RandomTrendButton variant="primary" size="md" showResult={true} />
                </CardContent>
              </Card>
            </AnimatedSection>
          </div>

          {/* Decade View Link */}
          <AnimatedSection animation="fadeUp" delay={0.3}>
            <motion.div 
              whileHover={{ scale: 1.02 }}
              className="p-8 rounded-2xl bg-gradient-to-r from-retro-teal/20 via-retro-purple/20 to-retro-pink/20 border border-white/10"
            >
              <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                <div className="flex items-center gap-4">
                  <span className="text-5xl">🕐</span>
                  <div>
                    <h3 className="text-2xl font-bold text-white">Decade View</h3>
                    <p className="text-gray-400">Explore the internet culture that defined each era</p>
                  </div>
                </div>
                <Link href="/decade">
                  <Button size="lg" className="bg-gradient-to-r from-[#4FFFC4] to-[#4F8FFF] hover:opacity-90 border-0 whitespace-nowrap">
                    Explore Decades →
                  </Button>
                </Link>
              </div>
            </motion.div>
          </AnimatedSection>
        </div>
      </section>

      {/* Why Rewind Section */}
      <section className="py-20 px-4 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#4F8FFF]/5 to-transparent pointer-events-none" />
        
        <div className="max-w-6xl mx-auto relative z-10">
          <AnimatedSection animation="fadeUp">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Why Rewind?
              </h2>
              <p className="text-gray-400 max-w-2xl mx-auto">
                Rediscover the viral moments that shaped our digital culture.
              </p>
            </div>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { icon: '🧠', title: 'Memory Lane', desc: 'Relive the trends you grew up with', color: '#FF6B9D' },
              { icon: '📊', title: 'Data Driven', desc: 'See what truly defined each year', color: '#C44FFF' },
              { icon: '🎨', title: 'Visual Journey', desc: 'Beautiful, scrollable timelines', color: '#4FFFC4' },
            ].map((feature, i) => (
              <AnimatedSection key={feature.title} animation="fadeUp" delay={0.2 * (i + 1)}>
                <motion.div 
                  whileHover={{ y: -5 }}
                  className="p-8 rounded-2xl bg-black/50 border border-white/10 text-center hover:border-white/20 transition-all"
                >
                  <span className="text-5xl mb-4 block">{feature.icon}</span>
                  <h3 className="text-xl font-bold text-white mb-2">{feature.title}</h3>
                  <p className="text-gray-400">{feature.desc}</p>
                </motion.div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Gamification Section */}
      <section className="py-20 px-4 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-retro-teal/5 to-transparent pointer-events-none" />
        
        <div className="max-w-6xl mx-auto relative z-10">
          <AnimatedSection animation="fadeUp">
            <div className="text-center mb-12">
              <motion.span 
                className="text-6xl mb-4 block"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                🎮
              </motion.span>
              <h2 className="text-4xl md:text-5xl font-black text-white mb-4">
                Your <span className="bg-gradient-to-r from-[#4FFFC4] to-[#4F8FFF] bg-clip-text text-transparent">Journey</span>
              </h2>
              <p className="text-gray-400 max-w-2xl mx-auto text-lg">
                Track your progress, earn achievements, and share your nostalgic journey with friends!
              </p>
            </div>
          </AnimatedSection>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Left: Streak & Achievements */}
            <div className="space-y-6">
              {/* This would import from components but keeping it simple */}
              <motion.div 
                whileHover={{ scale: 1.02 }}
                className="p-6 rounded-2xl bg-black/50 border border-white/10"
              >
                <h3 className="text-xl font-bold text-white mb-4">Your Stats</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 rounded-xl bg-white/5">
                    <div className="text-2xl font-bold text-retro-teal">0</div>
                    <div className="text-sm text-gray-400">Current Streak</div>
                  </div>
                  <div className="p-4 rounded-xl bg-white/5">
                    <div className="text-2xl font-bold text-retro-purple">0</div>
                    <div className="text-sm text-gray-400">Achievements</div>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Right: Shareable Wrapped Card */}
            <div>
              <motion.div
                whileHover={{ scale: 1.02 }}
                className="p-8 rounded-2xl bg-gradient-to-br from-[#FF6B9D]/20 via-[#C44FFF]/20 to-[#4F8FFF]/20 border border-white/10"
              >
                <h3 className="text-xl font-bold text-white mb-4 text-center">2016 Wrapped</h3>
                <div className="text-center">
                  <span className="text-6xl mb-4 block">📼</span>
                  <p className="text-gray-400">Your personalized year summary</p>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
