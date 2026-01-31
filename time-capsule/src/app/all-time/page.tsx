'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { NostalgiaBackground } from '@/components/features/nostalgia-background';
import { AnimatedSection } from '@/components/features/animated-section';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { categories, getAllTimePicks } from '@/data/seed';
import { AllTimePick, Category } from '@/types';
import { cn } from '@/lib/utils';

export default function AllTimePage() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const allPicks = getAllTimePicks();
  
  const filteredPicks = selectedCategory 
    ? allPicks.filter(p => p.category.id === selectedCategory)
    : allPicks;

  const getCategoryColor = (categoryId: string) => {
    const colors: Record<string, string> = {
      memes: 'bg-yellow-500',
      music: 'bg-purple-500',
      dances: 'bg-pink-500',
      style: 'bg-orange-500',
      products: 'bg-blue-500',
      trends: 'bg-green-500',
      tv: 'bg-red-500',
      celebrities: 'bg-gold-500',
      gaming: 'bg-indigo-500',
      other: 'bg-gray-500',
    };
    return colors[categoryId] || 'bg-gray-500';
  };

  return (
    <NostalgiaBackground>
      <div className="min-h-screen py-12 px-4">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <AnimatedSection animation="fadeUp">
            <div className="text-center mb-12">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.5 }}
                className="text-6xl mb-4"
              >
                🏆
              </motion.div>
              <h1 className="text-4xl md:text-6xl font-bold text-retro-dark mb-4">
                All-Time Top Picks
              </h1>
              <p className="text-xl text-retro-gray max-w-2xl mx-auto">
                The most iconic trends, memes, and moments that defined internet culture across all years.
              </p>
            </div>
          </AnimatedSection>

          {/* Category Filter */}
          <AnimatedSection animation="fadeUp" delay={0.2}>
            <div className="flex flex-wrap justify-center gap-2 mb-12">
              <Button
                variant={selectedCategory === null ? 'default' : 'outline'}
                onClick={() => setSelectedCategory(null)}
                className="rounded-full"
              >
                All Time
              </Button>
              {categories.map((category) => (
                <Button
                  key={category.id}
                  variant={selectedCategory === category.id ? 'default' : 'outline'}
                  onClick={() => setSelectedCategory(category.id)}
                  className="rounded-full"
                >
                  {category.icon} {category.name}
                </Button>
              ))}
            </div>
          </AnimatedSection>

          {/* Top Picks List */}
          <div className="space-y-6">
            {filteredPicks.map((pick, index) => (
              <AnimatedSection key={pick.id} animation="fadeUp" delay={index * 0.1}>
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.2 }}
                >
                  <Card className={cn(
                    'overflow-hidden transition-all duration-300',
                    index === 0 ? 'border-4 border-yellow-400 bg-gradient-to-r from-yellow-50 to-orange-50' :
                    index === 1 ? 'border-4 border-gray-300 bg-gradient-to-r from-gray-50 to-gray-100' :
                    index === 2 ? 'border-4 border-orange-300 bg-gradient-to-r from-orange-50 to-amber-50' :
                    'hover:border-retro-teal/40'
                  )}>
                    <CardContent className="p-6">
                      <div className="flex items-start gap-6">
                        {/* Rank */}
                        <div className={cn(
                          'w-16 h-16 rounded-full flex items-center justify-center text-white font-bold text-2xl shrink-0',
                          index === 0 ? 'bg-yellow-500' :
                          index === 1 ? 'bg-gray-400' :
                          index === 2 ? 'bg-orange-400' :
                          'bg-retro-teal'
                        )}>
                          #{index + 1}
                        </div>

                        {/* Content */}
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <span className="text-3xl">{pick.item.categoryId && pick.category.icon}</span>
                            <h3 className="text-2xl font-bold text-retro-dark">
                              {pick.item.title}
                            </h3>
                            <Badge className={cn(getCategoryColor(pick.category.id), 'text-white')}>
                              {pick.category.name}
                            </Badge>
                          </div>
                          
                          <p className="text-retro-gray mb-4">
                            {pick.item.description}
                          </p>

                          <div className="flex flex-wrap gap-4 text-sm">
                            <div className="flex items-center gap-2">
                              <span className="text-retro-teal">📅</span>
                              <span className="text-retro-gray">
                                {pick.years.join(', ')}
                              </span>
                            </div>
                            <div className="flex items-center gap-2">
                              <span className="text-retro-purple">📊</span>
                              <span className="text-retro-gray">
                                {pick.totalEngagement.toLocaleString()} engagements
                              </span>
                            </div>
                            <div className="flex items-center gap-2">
                              <span className="text-retro-pink">⭐</span>
                              <span className="text-retro-gray">
                                {pick.milestone}
                              </span>
                            </div>
                          </div>
                        </div>

                        {/* View Details */}
                        <Link href={`/trend/${pick.item.slug}`}>
                          <Button variant="outline" size="sm">
                            View Details →
                          </Button>
                        </Link>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              </AnimatedSection>
            ))}
          </div>

          {/* Footer Navigation */}
          <AnimatedSection animation="fadeUp" delay={0.5}>
            <div className="mt-16 text-center">
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/years">
                  <Button size="lg" variant="outline">
                    📅 Browse by Year
                  </Button>
                </Link>
                <Link href="/personal">
                  <Button size="lg">
                    🎁 Create Your Capsule
                  </Button>
                </Link>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </NostalgiaBackground>
  );
}
