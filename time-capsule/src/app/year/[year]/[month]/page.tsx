'use client';

import Link from 'next/link';
import { useParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { NostalgiaBackground } from '@/components/features/nostalgia-background';
import { AnimatedSection } from '@/components/features/animated-section';
import { MonthTimeline } from '@/components/features/month-timeline';
import { CategorySection } from '@/components/features/category-section';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { getYearById, getMonthsByYear, getItemsByMonth, getCategoryById, months, items, categories } from '@/data/seed';

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
      <NostalgiaBackground>
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-retro-dark mb-4">Month not found</h1>
            <Link href={`/year/${year}`}>
              <Button>Back to {year}</Button>
            </Link>
          </div>
        </div>
      </NostalgiaBackground>
    );
  }

  // Group items by category
  const itemsByCategory = categories.map(category => ({
    category,
    items: monthItems.filter(i => i.categoryId === category.id),
  })).filter(group => group.items.length > 0);

  return (
    <NostalgiaBackground>
      <div className="min-h-screen py-8 px-4">
        <div className="max-w-6xl mx-auto">
          {/* Breadcrumb */}
          <AnimatedSection animation="fadeUp">
            <div className="flex items-center gap-2 text-sm text-retro-gray mb-6">
              <Link href="/" className="hover:text-retro-teal">Home</Link>
              <span>/</span>
              <Link href="/years" className="hover:text-retro-teal">Years</Link>
              <span>/</span>
              <Link href={`/year/${year}`} className="hover:text-retro-teal">{year}</Link>
              <span>/</span>
              <span className="text-retro-dark">{monthData.name}</span>
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
              <h1 className="text-4xl md:text-5xl font-bold text-retro-dark mb-2">
                {monthData.name} {year}
              </h1>
              <p className="text-lg text-retro-gray">
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
              <Card className="mb-8 bg-gradient-to-r from-retro-purple/10 to-retro-pink/10 border-retro-purple/20">
                <CardContent className="p-6">
                  <div className="flex flex-col md:flex-row items-center gap-6">
                    <div className="text-center md:text-left">
                      <h2 className="text-2xl font-bold text-retro-dark mb-2">
                        What Defined {monthData.name} {year}?
                      </h2>
                      <p className="text-retro-gray">
                        From viral memes to trending songs, explore everything that happened this month.
                      </p>
                    </div>
                    <div className="flex gap-4 text-center">
                      <div>
                        <div className="text-3xl font-bold text-retro-teal">
                          {monthItems.filter(i => i.categoryId === 'memes').length}
                        </div>
                        <div className="text-xs text-retro-gray">Memes</div>
                      </div>
                      <div>
                        <div className="text-3xl font-bold text-retro-purple">
                          {monthItems.filter(i => i.categoryId === 'music').length}
                        </div>
                        <div className="text-xs text-retro-gray">Music</div>
                      </div>
                      <div>
                        <div className="text-3xl font-bold text-retro-pink">
                          {monthItems.filter(i => i.categoryId === 'trends').length}
                        </div>
                        <div className="text-xs text-retro-gray">Trends</div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
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
              <Card className="mb-8">
                <CardContent className="p-12 text-center">
                  <span className="text-6xl mb-4 block">📭</span>
                  <h3 className="text-xl font-bold text-retro-dark mb-2">
                    No items yet for {monthData.name} {year}
                  </h3>
                  <p className="text-retro-gray mb-4">
                    We're still collecting memories for this month.
                  </p>
                  <Link href={`/year/${year}`}>
                    <Button>Back to {year}</Button>
                  </Link>
                </CardContent>
              </Card>
            </AnimatedSection>
          )}

          {/* Navigation */}
          <AnimatedSection animation="fadeUp" delay={0.5}>
            <div className="flex justify-between items-center mt-12 pt-8 border-t border-retro-teal/20">
              {allMonths.findIndex(m => m.id === monthId) > 0 ? (
                <Link href={`/year/${year}/${allMonths[allMonths.findIndex(m => m.id === monthId) - 1].id}`}>
                  <Button variant="outline">
                    ← Previous Month
                  </Button>
                </Link>
              ) : (
                <div />
              )}
              
              <Link href={`/year/${year}`}>
                <Button variant="secondary">
                  All of {year}
                </Button>
              </Link>
              
              {allMonths.findIndex(m => m.id === monthId) < allMonths.length - 1 ? (
                <Link href={`/year/${year}/${allMonths[allMonths.findIndex(m => m.id === monthId) + 1].id}`}>
                  <Button variant="outline">
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
    </NostalgiaBackground>
  );
}
