'use client';

import { useParams } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { NostalgiaBackground } from '@/components/features/nostalgia-background';
import { AnimatedSection } from '@/components/features/animated-section';
import { MonthTimeline } from '@/components/features/month-timeline';
import { WrappedSummaryCard } from '@/components/features/wrapped-summary-card';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { getYearById, getMonthsByYear, getItemsByMonth, items } from '@/data/seed';
import { getCategoryById, categories } from '@/data/seed';
import { cn } from '@/lib/utils';

export default function YearPage() {
  const params = useParams();
  const year = parseInt(params.year as string);
  const yearId = year.toString();
  const yearData = getYearById(yearId);
  const months = getMonthsByYear(yearId);

  if (!yearData) {
    return (
      <NostalgiaBackground>
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-retro-dark mb-4">Year not found</h1>
            <Link href="/years">
              <Button>Back to Years</Button>
            </Link>
          </div>
        </div>
      </NostalgiaBackground>
    );
  }

  // Get top items for the year
  const yearItems = items.filter(i => months.some(m => m.id === i.monthId));
  const topMeme = yearItems.find(i => i.categoryId === 'memes' && i.popularityScore && i.popularityScore >= 90);
  const topSong = yearItems.find(i => i.categoryId === 'music');
  const topTrend = yearItems.find(i => i.categoryId === 'trends' && i.popularityScore && i.popularityScore >= 95);
  const topCeleb = yearItems.find(i => i.categoryId === 'celebrities');

  // Stats
  const memeCount = yearItems.filter(i => i.categoryId === 'memes').length;
  const musicCount = yearItems.filter(i => i.categoryId === 'music').length;
  const trendCount = yearItems.filter(i => i.categoryId === 'trends').length;

  return (
    <NostalgiaBackground>
      <div className="min-h-screen py-8 px-4">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <AnimatedSection animation="fadeUp">
            <div className="text-center mb-8">
              <motion.div
                className="inline-block mb-4"
                animate={{ rotate: [0, 3, 0, -3, 0] }}
                transition={{ duration: 4, repeat: Infinity }}
              >
                <span className="text-8xl">📼</span>
              </motion.div>
              <h1 className="text-5xl md:text-7xl font-bold text-retro-dark mb-4">
                {year}
              </h1>
              <p className="text-xl text-retro-gray max-w-2xl mx-auto">
                {yearData.description}
              </p>
            </div>
          </AnimatedSection>

          {/* Year Wrapped Summary */}
          <AnimatedSection animation="fadeUp" delay={0.2}>
            <Card className="mb-8 bg-gradient-to-r from-retro-teal/10 to-retro-purple/10 border-retro-teal/20">
              <CardHeader>
                <CardTitle className="text-center text-2xl">
                  🎬 {year} Wrapped
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {topMeme && (
                    <WrappedSummaryCard item={topMeme} rank={1} categoryIcon="😂" />
                  )}
                  {topSong && (
                    <WrappedSummaryCard item={topSong} rank={1} categoryIcon="🎵" />
                  )}
                  {topTrend && (
                    <WrappedSummaryCard item={topTrend} rank={1} categoryIcon="📈" />
                  )}
                  {topCeleb && (
                    <WrappedSummaryCard item={topCeleb} rank={1} categoryIcon="⭐" />
                  )}
                </div>

                {/* Stats bar */}
                <div className="mt-6 flex flex-wrap justify-center gap-8">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-retro-teal">{memeCount}</div>
                    <div className="text-sm text-retro-gray">Memes</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-retro-purple">{musicCount}</div>
                    <div className="text-sm text-retro-gray">Music</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-retro-pink">{trendCount}</div>
                    <div className="text-sm text-retro-gray">Trends</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </AnimatedSection>

          {/* Month Timeline */}
          <AnimatedSection animation="fadeUp" delay={0.3}>
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-retro-dark mb-4 text-center">
                Explore by Month
              </h2>
              <MonthTimeline months={months} year={year} />
            </div>
          </AnimatedSection>

          {/* Top Trends Section */}
          <AnimatedSection animation="fadeUp" delay={0.4}>
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-retro-dark mb-6">
                Major Moments of {year}
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {yearItems
                  .sort((a, b) => (b.popularityScore || 0) - (a.popularityScore || 0))
                  .slice(0, 6)
                  .map((item, index) => {
                    const category = getCategoryById(item.categoryId);
                    return (
                      <Link key={item.id} href={`/year/${year}/${item.monthId}`}>
                        <motion.div
                          whileHover={{ scale: 1.02, y: -2 }}
                          className={cn(
                            'p-4 rounded-xl bg-white/60 backdrop-blur-sm border-2 cursor-pointer transition-all',
                            index === 0 
                              ? 'border-retro-teal bg-retro-teal/10' 
                              : 'border-retro-teal/20 hover:border-retro-teal/40'
                          )}
                        >
                          <div className="flex items-center gap-3">
                            <span className="text-2xl">{category?.icon}</span>
                            <div>
                              <h3 className="font-bold text-retro-dark">{item.title}</h3>
                              <p className="text-sm text-retro-gray line-clamp-1">
                                {item.description}
                              </p>
                            </div>
                          </div>
                        </motion.div>
                      </Link>
                    );
                  })}
              </div>
            </div>
          </AnimatedSection>

          {/* Quick Month Access */}
          <AnimatedSection animation="fadeUp" delay={0.5}>
            <Card>
              <CardHeader>
                <CardTitle>Quick Access</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3">
                  {months.slice(0, 6).map((month) => {
                    const monthItems = getItemsByMonth(month.id);
                    return (
                      <Link key={month.id} href={`/year/${year}/${month.id}`}>
                        <motion.div
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className="p-3 text-center rounded-lg bg-retro-teal/10 hover:bg-retro-teal/20 cursor-pointer transition-colors"
                        >
                          <div className="font-bold text-retro-dark">{month.shortName}</div>
                          <div className="text-xs text-retro-gray">{monthItems.length} items</div>
                        </motion.div>
                      </Link>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </AnimatedSection>
        </div>
      </div>
    </NostalgiaBackground>
  );
}
