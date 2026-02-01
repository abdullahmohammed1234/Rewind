'use client';

import Link from 'next/link';
import { useParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { AnimatedSection } from '@/components/features/animated-section';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { getItemBySlug } from '@/data/seed';
import { getCategoryById } from '@/data/seed';
import { UnifiedEmbed } from '@/components/features/embeds';
import Footer from '@/components/footer';

export default function TrendPage() {
  const params = useParams();
  const slug = params.slug as string;
  const item = getItemBySlug(slug);

  if (!item) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-gray-900 to-black flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">🔍</div>
          <h1 className="text-4xl font-bold text-white mb-4">Trend not found</h1>
          <Link href="/years">
            <Button className="bg-gradient-to-r from-[#FF6B9D] to-[#C44FFF]">Explore Years</Button>
          </Link>
        </div>
      </div>
    );
  }

  const category = getCategoryById(item.categoryId);

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
        <div className="max-w-4xl mx-auto">
          {/* Breadcrumb */}
          <AnimatedSection animation="fadeUp">
            <div className="flex items-center gap-2 text-sm text-gray-400 mb-6">
              <Link href="/" className="hover:text-retro-teal transition-colors">Home</Link>
              <span>/</span>
              <Link href="/years" className="hover:text-retro-teal transition-colors">Years</Link>
              <span>/</span>
              <span className="text-white">{item.title}</span>
            </div>
          </AnimatedSection>

          {/* Header */}
          <AnimatedSection animation="fadeUp" delay={0.1}>
            <div className="text-center mb-8">
              <motion.div
                className="inline-block mb-4"
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <span className="text-8xl">{category?.icon || '📈'}</span>
              </motion.div>
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                {item.title}
              </h1>
              <div className="flex items-center justify-center gap-4">
                {category && (
                  <motion.span
                    whileHover={{ scale: 1.05 }}
                    className="px-4 py-2 bg-retro-teal/20 border border-retro-teal/50 text-retro-teal rounded-full text-sm font-medium"
                  >
                    {category.name}
                  </motion.span>
                )}
                {item.popularityScore && (
                  <motion.span
                    whileHover={{ scale: 1.05 }}
                    className="px-4 py-2 bg-retro-purple/20 border border-retro-purple/50 text-retro-purple rounded-full text-sm font-medium"
                  >
                    Popularity: {item.popularityScore}%
                  </motion.span>
                )}
              </div>
            </div>
          </AnimatedSection>

          {/* Main Content */}
          <AnimatedSection animation="fadeUp" delay={0.2}>
            <motion.div
              whileHover={{ scale: 1.01 }}
              className="mb-8 bg-black/50 border border-white/10 rounded-2xl p-8"
            >
              <h2 className="text-xl font-bold text-white mb-4">
                About This Trend
              </h2>
              <p className="text-lg text-gray-400 leading-relaxed">
                {item.description}
              </p>
            </motion.div>
          </AnimatedSection>

          {/* Embed Section */}
          {item.embed && (
            <AnimatedSection animation="fadeUp" delay={0.25}>
              <motion.div
                whileHover={{ scale: 1.01 }}
                className="mb-8 bg-black/50 border border-white/10 rounded-2xl overflow-hidden"
              >
                <div className="p-6">
                  <h2 className="text-xl font-bold text-white mb-4">
                    📺 Media & Context
                  </h2>
                  <UnifiedEmbed
                    type={item.embed.type}
                    id={item.embed.id}
                    title={item.embed.title}
                  />
                </div>
              </motion.div>
            </AnimatedSection>
          )}

          {/* Timeline */}
          {item.timeline && (
            <AnimatedSection animation="fadeUp" delay={0.3}>
              <motion.div
                whileHover={{ scale: 1.01 }}
                className="mb-8 bg-black/50 border border-white/10 rounded-2xl p-8"
              >
                <h2 className="text-xl font-bold text-white mb-6">
                  📅 Timeline
                </h2>
                <div className="flex flex-col md:flex-row items-center gap-4">
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    className="flex-1 text-center p-4 bg-white/5 rounded-xl"
                  >
                    <div className="text-sm text-gray-400 mb-1">Started</div>
                    <div className="text-lg font-bold text-retro-teal">
                      {item.timeline.start}
                    </div>
                  </motion.div>
                  {item.timeline.peak && (
                    <>
                      <div className="text-2xl text-retro-purple">→</div>
                      <motion.div
                        whileHover={{ scale: 1.05 }}
                        className="flex-1 text-center p-4 bg-white/5 rounded-xl"
                      >
                        <div className="text-sm text-gray-400 mb-1">Peak Popularity</div>
                        <div className="text-lg font-bold text-retro-purple">
                          {item.timeline.peak}
                        </div>
                      </motion.div>
                    </>
                  )}
                  {item.timeline.end && (
                    <>
                      <div className="text-2xl text-retro-pink">→</div>
                      <motion.div
                        whileHover={{ scale: 1.05 }}
                        className="flex-1 text-center p-4 bg-white/5 rounded-xl"
                      >
                        <div className="text-sm text-gray-400 mb-1">Ended</div>
                        <div className="text-lg font-bold text-retro-pink">
                          {item.timeline.end}
                        </div>
                      </motion.div>
                    </>
                  )}
                </div>
              </motion.div>
            </AnimatedSection>
          )}

          {/* Impact */}
          {item.impact && (
            <AnimatedSection animation="fadeUp" delay={0.4}>
              <motion.div
                whileHover={{ scale: 1.01 }}
                className="mb-8 bg-gradient-to-r from-retro-purple/20 to-retro-pink/20 border border-retro-purple/30 rounded-2xl p-8"
              >
                <h2 className="text-xl font-bold text-white mb-4">
                  🎯 Cultural Impact
                </h2>
                <p className="text-lg text-gray-400 leading-relaxed">
                  {item.impact}
                </p>
              </motion.div>
            </AnimatedSection>
          )}

          {/* Navigation */}
          <AnimatedSection animation="fadeUp" delay={0.5}>
            <div className="flex justify-center gap-4">
              <Link href="/years">
                <Button variant="outline" className="border-white/20 text-white hover:bg-white/10">
                  ← Explore More Years
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
