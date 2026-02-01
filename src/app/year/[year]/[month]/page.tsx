'use client';

import Link from 'next/link';
import { useParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { AnimatedSection } from '@/components/features/animated-section';
import { MonthTimeline } from '@/components/features/month-timeline';
import { CategorySection } from '@/components/features/category-section';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { getYearById, getMonthsByYear, getItemsByMonth, getCategoryById, months, items, categories } from '@/data/seed';
import Footer from '@/components/footer';

export default function MonthPage() {
  const params = useParams();
  const year = parseInt(params.year as string);
  const monthId = params.month as string;
  
  const yearId = year.toString();
  const yearData = getYearById(yearId);
  const allMonths = getMonthsByYear(yearId);
  const monthData = allMonths.find(m => m.id === monthId);
  const monthItems = getItemsByMonth(monthId);

  if (!yearData || !monthData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-gray-900 to-black flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">🔍</div>
          <h1 className="text-4xl font-bold text-white mb-4">Month not found</h1>
          <Link href={`/year/${year}`}>
            <Button className="bg-gradient-to-r from-[#FF6B9D] to-[#C44FFF]">Back to {year}</Button>
          </Link>
        </div>
      </div>
    );
  }

  // Group items by category
  const itemsByCategory = categories.map(category => ({
    category,
    items: monthItems.filter(i => i.categoryId === category.id),
  })).filter(group => group.items.length > 0);

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
        <div className="max-w-6xl mx-auto">
          {/* Breadcrumb */}
          <AnimatedSection animation="fadeUp">
            <div className="flex items-center gap-2 text-sm text-gray-400 mb-6">
              <Link href="/" className="hover:text-retro-teal transition-colors">Home</Link>
              <span>/</span>
              <Link href="/years" className="hover:text-retro-teal transition-colors">Years</Link>
              <span>/</span>
              <Link href={`/year/${year}`} className="hover:text-retro-teal transition-colors">{year}</Link>
              <span>/</span>
              <span className="text-white">{monthData.name}</span>
            </div>
          </AnimatedSection>

          {/* Header */}
          <AnimatedSection animation="fadeUp" delay={0.1}>
            <div className="text-center mb-8">
              <motion.div
                className="inline-block mb-4"
                animate={{ rotate: [0, 3, 0, -3, 0] }}
                transition={{ duration: 4, repeat: Infinity }}
              >
                <span className="text-7xl">📅</span>
              </motion.div>
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-2">
                {monthData.name} {year}
              </h1>
              <p className="text-lg text-gray-400">
                {monthItems.length} cultural moments documented
              </p>
            </div>
          </AnimatedSection>

          {/* Month Timeline */}
          <AnimatedSection animation="fadeUp" delay={0.2}>
            <div className="mb-8">
              <MonthTimeline months={allMonths} currentMonth={monthId} year={year} />
            </div>
          </AnimatedSection>

          {/* Summary Card */}
          {monthItems.length > 0 && (
            <AnimatedSection animation="fadeUp" delay={0.3}>
              <motion.div
                whileHover={{ scale: 1.01 }}
                className="mb-8 bg-black/50 border border-white/10 rounded-2xl p-6"
              >
                <div className="flex flex-col md:flex-row items-center gap-6">
                  <div className="text-center md:text-left">
                    <h2 className="text-2xl font-bold text-white mb-2">
                      What Defined {monthData.name} {year}?
                    </h2>
                    <p className="text-gray-400">
                      From viral memes to trending songs, explore everything that happened this month.
                    </p>
                  </div>
                  <div className="flex gap-6 text-center ml-auto">
                    <motion.div whileHover={{ scale: 1.1 }} className="p-3 bg-white/5 rounded-xl">
                      <div className="text-2xl font-bold text-retro-teal">
                        {monthItems.filter(i => i.categoryId === 'memes').length}
                      </div>
                      <div className="text-xs text-gray-400">Memes</div>
                    </motion.div>
                    <motion.div whileHover={{ scale: 1.1 }} className="p-3 bg-white/5 rounded-xl">
                      <div className="text-2xl font-bold text-retro-purple">
                        {monthItems.filter(i => i.categoryId === 'music').length}
                      </div>
                      <div className="text-xs text-gray-400">Music</div>
                    </motion.div>
                    <motion.div whileHover={{ scale: 1.1 }} className="p-3 bg-white/5 rounded-xl">
                      <div className="text-2xl font-bold text-retro-pink">
                        {monthItems.filter(i => i.categoryId === 'trends').length}
                      </div>
                      <div className="text-xs text-gray-400">Trends</div>
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            </AnimatedSection>
          )}

          {/* Category Sections */}
          {itemsByCategory.map((group, index) => (
            <AnimatedSection 
              key={group.category.id} 
              animation="fadeUp" 
              delay={0.4 + (index * 0.1)}
            >
              <CategorySection category={group.category} items={group.items} />
            </AnimatedSection>
          ))}

          {/* Empty State */}
          {monthItems.length === 0 && (
            <AnimatedSection animation="fadeUp" delay={0.4}>
              <motion.div
                whileHover={{ scale: 1.01 }}
                className="mb-8 bg-black/50 border border-white/10 rounded-2xl p-12 text-center"
              >
                <span className="text-6xl mb-4 block">📭</span>
                <h3 className="text-xl font-bold text-white mb-2">
                  No items yet for {monthData.name} {year}
                </h3>
                <p className="text-gray-400 mb-4">
                  We're still collecting memories for this month.
                </p>
                <Link href={`/year/${year}`}>
                  <Button className="bg-gradient-to-r from-[#FF6B9D] to-[#C44FFF]">Back to {year}</Button>
                </Link>
              </motion.div>
            </AnimatedSection>
          )}

          {/* Navigation */}
          <AnimatedSection animation="fadeUp" delay={0.5}>
            <div className="flex justify-between items-center mt-12 pt-8 border-t border-white/10">
              {allMonths.findIndex(m => m.id === monthId) > 0 ? (
                <Link href={`/year/${year}/${allMonths[allMonths.findIndex(m => m.id === monthId) - 1].id}`}>
                  <Button variant="outline" className="border-white/20 text-white hover:bg-white/10">
                    ← Previous Month
                  </Button>
                </Link>
              ) : (
                <div />
              )}
              
              <Link href={`/year/${year}`}>
                <Button className="bg-gradient-to-r from-[#FF6B9D] to-[#C44FFF]">
                  All of {year}
                </Button>
              </Link>
              
              {allMonths.findIndex(m => m.id === monthId) < allMonths.length - 1 ? (
                <Link href={`/year/${year}/${allMonths[allMonths.findIndex(m => m.id === monthId) + 1].id}`}>
                  <Button variant="outline" className="border-white/20 text-white hover:bg-white/10">
                    Next Month →
                  </Button>
                </Link>
              ) : (
                <div />
              )}
            </div>
          </AnimatedSection>
        </div>
      </div>

      <Footer />
    </div>
  );
}
