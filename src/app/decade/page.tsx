'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { AnimatedSection } from '@/components/features/animated-section';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { decades } from '@/data/seed';
import Footer from '@/components/footer';

export default function DecadeIndexPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-gray-900 to-black">
      {/* Animated background particles */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        {[...Array(30)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 rounded-full"
            style={{
              background: ['#FF6B9D', '#C44FFF', '#4FFFC4', '#4F8FFF'][i % 4],
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -50, 0],
              opacity: [0.2, 0.6, 0.2],
            }}
            transition={{
              duration: 4 + Math.random() * 4,
              repeat: Infinity,
              delay: Math.random() * 3,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 min-h-screen py-8 px-4">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <AnimatedSection animation="fadeUp">
            <div className="text-center mb-16">
              <motion.div
                className="inline-block mb-6"
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <span className="text-8xl">🕐</span>
              </motion.div>
              <h1 className="text-5xl md:text-7xl font-black text-white mb-4">
                <span className="bg-gradient-to-r from-[#FF6B9D] via-[#C44FFF] to-[#4F8FFF] bg-clip-text text-transparent">
                  Decade View
                </span>
              </h1>
              <p className="text-xl text-gray-400 max-w-2xl mx-auto">
                Explore the internet culture that defined each era. From early viral videos to the social media explosion.
              </p>
            </div>
          </AnimatedSection>

          {/* Decades Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            {decades.map((decade, index) => (
              <AnimatedSection key={decade.id} animation="fadeUp" delay={0.1 * (index + 1)}>
                <Link href={`/decade/${decade.id}`}>
                  <motion.div
                    whileHover={{ scale: 1.02, y: -5 }}
                    className="group"
                  >
                    <Card className="bg-gradient-to-br from-retro-purple/20 via-retro-pink/10 to-transparent border-white/10 hover:border-retro-teal/50 transition-all overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-br from-retro-purple/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                      <CardContent className="p-8 relative z-10">
                        <div className="flex items-start gap-6">
                          <motion.div
                            className="text-7xl"
                            animate={{ scale: [1, 1.1, 1] }}
                            transition={{ duration: 3, repeat: Infinity, delay: index * 0.5 }}
                          >
                            {decade.coverEmoji}
                          </motion.div>
                          <div className="flex-1">
                            <h2 className="text-3xl font-black text-white mb-2">
                              {decade.name}
                            </h2>
                            <p className="text-gray-400 mb-4 line-clamp-2">
                              {decade.description}
                            </p>
                            <div className="flex items-center gap-4 text-sm">
                              <span className="px-3 py-1 bg-retro-teal/20 border border-retro-teal/50 text-retro-teal rounded-full">
                                {decade.summary.totalTrends} Trends
                              </span>
                              <span className="px-3 py-1 bg-retro-purple/20 border border-retro-purple/50 text-retro-purple rounded-full">
                                10 Years
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="mt-6 flex items-center justify-between">
                          <span className="text-sm text-gray-500">
                            {decade.summary.iconicMoments.length} iconic moments
                          </span>
                          <motion.span
                            className="text-retro-teal"
                            whileHover={{ x: 5 }}
                          >
                            Explore →
                          </motion.span>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                </Link>
              </AnimatedSection>
            ))}
          </div>

          {/* Quick Stats */}
          <AnimatedSection animation="fadeUp" delay={0.5}>
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-white mb-6 text-center">
                What You'll Discover
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  { label: 'Viral Moments', value: '50+', icon: '🔥' },
                  { label: 'Iconic Trends', value: '100+', icon: '📈' },
                  { label: 'Cultural Shifts', value: '20+', icon: '🌍' },
                  { label: 'Memories', value: '1000s', icon: '💭' }
                ].map((stat, i) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 + 0.1 * i }}
                  >
                    <Card className="bg-black/40 border-white/10 text-center">
                      <CardContent className="p-6">
                        <span className="text-3xl mb-2 block">{stat.icon}</span>
                        <div className="text-3xl font-black text-white">{stat.value}</div>
                        <div className="text-sm text-gray-400">{stat.label}</div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </div>
          </AnimatedSection>

          {/* Navigation */}
          <AnimatedSection animation="fadeUp" delay={0.7}>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/years">
                <Button variant="outline" className="border-white/20 text-white hover:bg-white/10">
                  ← Explore by Year
                </Button>
              </Link>
              <Link href="/all-time">
                <Button className="bg-gradient-to-r from-[#FF6B9D] to-[#C44FFF] hover:opacity-90">
                  View All-Time Legends →
                </Button>
              </Link>
            </div>
          </AnimatedSection>
        </div>
      </div>

      <Footer />
    </div>
  );
}
