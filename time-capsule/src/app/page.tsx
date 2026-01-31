'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { NostalgiaBackground } from '@/components/features/nostalgia-background';
import { AnimatedSection } from '@/components/features/animated-section';
import { Button } from '@/components/ui/button';
import { years } from '@/data/seed';

export default function Home() {
  const featuredYear = years.find(y => y.id === '2016');

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
              Explore the memes, music, and moments that defined each year of internet culture.
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

      {/* Featured Preview Section */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <AnimatedSection animation="fadeUp">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-retro-dark mb-4">
                Why TimeCapsule?
              </h2>
              <p className="text-retro-gray max-w-2xl mx-auto">
                Rediscover the viral moments that shaped our digital culture.
              </p>
            </div>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { icon: '🧠', title: 'Memory Lane', desc: 'Relive the trends you grew up with' },
              { icon: '📊', title: 'Data Driven', desc: 'See what truly defined each year' },
              { icon: '🎨', title: 'Visual Journey', desc: 'Beautiful, scrollable timelines' },
            ].map((feature, i) => (
              <AnimatedSection key={feature.title} animation="fadeUp" delay={0.2 * (i + 1)}>
                <div className="bg-white/60 backdrop-blur-sm rounded-xl p-8 text-center hover:bg-white/80 transition-colors">
                  <span className="text-5xl mb-4 block">{feature.icon}</span>
                  <h3 className="text-xl font-bold text-retro-dark mb-2">{feature.title}</h3>
                  <p className="text-retro-gray">{feature.desc}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Years Preview */}
      <section className="py-20 px-4 bg-retro-teal/5">
        <div className="max-w-6xl mx-auto">
          <AnimatedSection animation="fadeUp">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-retro-dark mb-4">
                Available Years
              </h2>
              <p className="text-retro-gray max-w-2xl mx-auto">
                Dive into the archives from 2012 to 2018
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
