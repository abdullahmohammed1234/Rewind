'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { NostalgiaBackground } from '@/components/features/nostalgia-background';
import { AnimatedSection } from '@/components/features/animated-section';
import { Button } from '@/components/ui/button';
import { years, categories } from '@/data/seed';

export default function Home() {
  const featuredYear = years.find(y => y.id === '2016');

  const features = [
    { 
      icon: '📅', 
      title: 'General Capsules', 
      desc: 'Explore yearly trends across memes, music, style, products, dances, TV, and celebrities',
      href: '/years',
      color: 'bg-blue-500'
    },
    { 
      icon: '🏆', 
      title: 'All-Time Picks', 
      desc: 'See the most iconic trends that defined internet culture across all years',
      href: '/all-time',
      color: 'bg-yellow-500'
    },
    { 
      icon: '📦', 
      title: 'MyCapsule', 
      desc: 'Create your personal time capsule with photos, memories, and favorites',
      href: '/my-capsule',
      color: 'bg-purple-500'
    },
    { 
      icon: '📊', 
      title: 'Compare Years', 
      desc: 'See how different years stack up against each other',
      href: '/compare',
      color: 'bg-green-500'
    },
  ];

  return (
    <NostalgiaBackground showFloatingYears>
      <div className="min-h-screen flex flex-col">
        {/* Hero Section */}
        <section className="flex-1 flex items-center justify-center px-4 py-20">
          <div className="max-w-4xl mx-auto text-center">
            {/* Logo/Icon */}
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              className="mb-8"
            >
              <span className="text-8xl">📼</span>
            </motion.div>

            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-5xl md:text-7xl font-bold text-retro-dark mb-6"
            >
              Relive the{' '}
              <span className="text-retro-teal">Internet</span>
              <br />
              <span className="text-retro-purple">Every Year</span>
            </motion.h1>

            {/* Subheadline */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-xl md:text-2xl text-retro-gray max-w-2xl mx-auto mb-10"
            >
              Explore the memes, music, trends, and moments that defined each year of internet culture.
              <br />
              <span className="text-sm opacity-70">A Spotify Wrapped-style journey through digital history.</span>
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <Link href="/years">
                <Button size="lg" className="text-lg px-8">
                  Start Exploring 📅
                </Button>
              </Link>
              {featuredYear && (
                <Link href={`/year/${featuredYear.year}`}>
                  <Button variant="outline" size="lg" className="text-lg px-8">
                    Featured: {featuredYear.year} ✨
                  </Button>
                </Link>
              )}
            </motion.div>
          </div>
        </section>

        {/* Floating year indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 text-retro-gray/50 text-sm font-mono"
        >
          Scroll to explore ↓
        </motion.div>
      </div>

      {/* Features Section */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <AnimatedSection animation="fadeUp">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-retro-dark mb-4">
                Explore TimeCapsule
              </h2>
              <p className="text-retro-gray max-w-2xl mx-auto">
                Rediscover the viral moments that shaped our digital culture through multiple perspectives.
              </p>
            </div>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, i) => (
              <AnimatedSection key={feature.title} animation="fadeUp" delay={0.1 * (i + 1)}>
                <Link href={feature.href}>
                  <motion.div
                    whileHover={{ scale: 1.05, y: -5 }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-white/60 backdrop-blur-sm rounded-xl p-6 text-center hover:bg-white/80 transition-all h-full cursor-pointer shadow-md hover:shadow-xl"
                  >
                    <span className="text-5xl mb-4 block">{feature.icon}</span>
                    <h3 className="text-xl font-bold text-retro-dark mb-2">{feature.title}</h3>
                    <p className="text-retro-gray text-sm">{feature.desc}</p>
                  </motion.div>
                </Link>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Categories Preview */}
      <section className="py-20 px-4 bg-retro-teal/5">
        <div className="max-w-6xl mx-auto">
          <AnimatedSection animation="fadeUp">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-retro-dark mb-4">
                Categories
              </h2>
              <p className="text-retro-gray max-w-2xl mx-auto">
                Browse trends across all your favorite categories
              </p>
            </div>
          </AnimatedSection>

          <div className="flex flex-wrap justify-center gap-4">
            {categories.slice(0, 8).map((category, i) => (
              <AnimatedSection key={category.id} animation="scaleIn" delay={0.05 * i}>
                <Link href={`/years`}>
                  <motion.div
                    whileHover={{ scale: 1.1, y: -3 }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-white rounded-full px-6 py-3 shadow-md cursor-pointer hover:shadow-lg transition-all flex items-center gap-2"
                  >
                    <span className="text-2xl">{category.icon}</span>
                    <span className="font-medium text-retro-dark">{category.name}</span>
                  </motion.div>
                </Link>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Years Preview */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <AnimatedSection animation="fadeUp">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-retro-dark mb-4">
                Available Years
              </h2>
              <p className="text-retro-gray max-w-2xl mx-auto">
                Dive into the archives from 2012 to 2024
              </p>
            </div>
          </AnimatedSection>

          <div className="flex flex-wrap justify-center gap-4">
            {years.map((year, i) => (
              <AnimatedSection key={year.id} animation="scaleIn" delay={0.1 * i}>
                <Link href={`/year/${year.year}`}>
                  <motion.div
                    whileHover={{ scale: 1.05, y: -3 }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-white rounded-xl px-6 py-4 shadow-md cursor-pointer hover:shadow-lg transition-shadow"
                  >
                    <span className="text-2xl font-bold text-retro-teal">{year.year}</span>
                  </motion.div>
                </Link>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 border-t border-retro-teal/10">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-retro-gray mb-4">
            Made with ❤️ for XHacks 2026
          </p>
          <p className="text-sm text-retro-gray/50">
            A nostalgic journey through internet culture
          </p>
        </div>
      </footer>
    </NostalgiaBackground>
  );
}
