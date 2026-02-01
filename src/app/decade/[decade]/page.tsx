'use client';

import Link from 'next/link';
import { useParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { AnimatedSection } from '@/components/features/animated-section';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { decades, getDecadeById, getItemsByDecade } from '@/data/seed';
import Footer from '@/components/footer';

export default function DecadePage() {
  const params = useParams();
  const decadeId = params.decade as string;
  const decade = getDecadeById(decadeId);

  if (!decade) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-gray-900 to-black flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">🔍</div>
          <h1 className="text-4xl font-bold text-white mb-4">Decade not found</h1>
          <Link href="/years">
            <Button className="bg-gradient-to-r from-[#FF6B9D] to-[#C44FFF]">Explore Years</Button>
          </Link>
        </div>
      </div>
    );
  }

  const decadeItems = getItemsByDecade(decade.decade);

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
          {/* Breadcrumb */}
          <AnimatedSection animation="fadeUp">
            <div className="flex items-center gap-2 text-sm text-gray-400 mb-6">
              <Link href="/" className="hover:text-retro-teal transition-colors">Home</Link>
              <span>/</span>
              <Link href="/decade" className="hover:text-retro-teal transition-colors">Decades</Link>
              <span>/</span>
              <span className="text-white">{decade.name}</span>
            </div>
          </AnimatedSection>

          {/* Header */}
          <AnimatedSection animation="fadeUp">
            <div className="text-center mb-12">
              <motion.div
                className="inline-block mb-6"
                animate={{ scale: [1, 1.1, 1], rotate: [0, 5, 0, -5, 0] }}
                transition={{ duration: 4, repeat: Infinity }}
              >
                <span className="text-9xl">{decade.coverEmoji}</span>
              </motion.div>
              <h1 className="text-5xl md:text-7xl font-black text-white mb-4">
                <span className="bg-gradient-to-r from-[#FF6B9D] via-[#C44FFF] to-[#4F8FFF] bg-clip-text text-transparent">
                  {decade.name}
                </span>
              </h1>
              <p className="text-xl text-gray-400 max-w-2xl mx-auto mb-6">
                {decade.description}
              </p>
              <div className="flex items-center justify-center gap-4">
                <span className="px-4 py-2 bg-retro-teal/20 border border-retro-teal/50 text-retro-teal rounded-full text-sm font-medium">
                  {decade.summary.totalTrends} Trends
                </span>
                <span className="px-4 py-2 bg-retro-purple/20 border border-retro-purple/50 text-retro-purple rounded-full text-sm font-medium">
                  10 Years
                </span>
              </div>
            </div>
          </AnimatedSection>

          {/* Cultural Impact */}
          <AnimatedSection animation="fadeUp" delay={0.1}>
            <motion.div
              whileHover={{ scale: 1.01 }}
              className="mb-8 bg-gradient-to-r from-retro-purple/30 via-retro-pink/20 to-retro-teal/20 border border-white/10 rounded-2xl p-8"
            >
              <h2 className="text-2xl font-bold text-white mb-4">
                🎯 Cultural Impact
              </h2>
              <p className="text-lg text-gray-300 leading-relaxed">
                {decade.summary.culturalImpact}
              </p>
            </motion.div>
          </AnimatedSection>

          {/* Iconic Moments */}
          <AnimatedSection animation="fadeUp" delay={0.2}>
            <div className="mb-12">
              <h2 className="text-3xl font-bold text-white mb-6 text-center">
                <span className="bg-gradient-to-r from-[#FFE14F] to-[#FF9F4F] bg-clip-text text-transparent">
                  Iconic Moments
                </span>
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {decade.summary.iconicMoments.map((moment, index) => (
                  <motion.div
                    key={moment}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 * index }}
                    whileHover={{ scale: 1.05, y: -5 }}
                  >
                    <Card className="bg-black/40 border-white/10 hover:border-retro-teal/50 transition-all cursor-pointer">
                      <CardContent className="p-4 text-center">
                        <span className="text-3xl mb-2 block">
                          {['🔥', '💯', '⭐', '🎵', '😂', '📱'][index % 6]}
                        </span>
                        <span className="text-white font-medium">{moment}</span>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </div>
          </AnimatedSection>

          {/* Year Timeline */}
          <AnimatedSection animation="fadeUp" delay={0.3}>
            <div className="mb-12">
              <h2 className="text-3xl font-bold text-white mb-6 text-center">
                <span className="bg-gradient-to-r from-[#4FFFC4] to-[#4F8FFF] bg-clip-text text-transparent">
                  Year by Year
                </span>
              </h2>
              <div className="space-y-4">
                {decade.yearHighlights.map((year, index) => (
                  <motion.div
                    key={year.year}
                    initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 * index }}
                  >
                    <Link href={`/year/${year.year}`}>
                      <Card className="bg-black/40 border-white/10 hover:border-retro-purple/50 transition-all cursor-pointer group">
                        <CardContent className="p-4">
                          <div className="flex items-center gap-4">
                            <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-retro-purple/30 to-retro-teal/30 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                              <span className="text-2xl font-black text-white">{year.year}</span>
                            </div>
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-1">
                                <span className="text-xs font-mono text-retro-teal px-2 py-0.5 rounded bg-retro-teal/20">
                                  {year.topTrend}
                                </span>
                              </div>
                              <h3 className="text-lg font-bold text-white group-hover:text-retro-teal transition-colors">
                                {year.highlight}
                              </h3>
                            </div>
                            <motion.div
                              className="text-retro-purple"
                              whileHover={{ x: 5 }}
                            >
                              →
                            </motion.div>
                          </div>
                        </CardContent>
                      </Card>
                    </Link>
                  </motion.div>
                ))}
              </div>
            </div>
          </AnimatedSection>

          {/* Categories Overview */}
          <AnimatedSection animation="fadeUp" delay={0.4}>
            <div className="mb-12">
              <h2 className="text-3xl font-bold text-white mb-6 text-center">
                <span className="bg-gradient-to-r from-[#C44FFF] to-[#FF6B9D] bg-clip-text text-transparent">
                  Defining Categories
                </span>
              </h2>
              <div className="flex flex-wrap justify-center gap-3">
                {decade.summary.definingCategories.map((catId) => {
                  const categoryNames: Record<string, string> = {
                    memes: 'Memes',
                    music: 'Music',
                    dances: 'Dances',
                    trends: 'Trends',
                    tv: 'TV Shows',
                    style: 'Style',
                    products: 'Products',
                    celebrities: 'Celebrities',
                    movies: 'Movies',
                    other: 'Other'
                  };
                  return (
                    <motion.span
                      key={catId}
                      whileHover={{ scale: 1.1 }}
                      className="px-4 py-2 bg-white/10 border border-white/20 rounded-full text-white font-medium"
                    >
                      {categoryNames[catId] || catId}
                    </motion.span>
                  );
                })}
              </div>
            </div>
          </AnimatedSection>

          {/* Navigation */}
          <AnimatedSection animation="fadeUp" delay={0.5}>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/years">
                <Button variant="outline" className="border-white/20 text-white hover:bg-white/10">
                  ← Explore by Year
                </Button>
              </Link>
              <Link href={`/decade/${decadeId === '2010s' ? '2000s' : '2010s'}`}>
                <Button className="bg-gradient-to-r from-[#FF6B9D] to-[#C44FFF] hover:opacity-90">
                  {decadeId === '2010s' ? 'View 2000s' : 'View 2010s'} →
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
