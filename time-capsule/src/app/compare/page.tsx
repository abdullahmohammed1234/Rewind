'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { NostalgiaBackground } from '@/components/features/nostalgia-background';
import { AnimatedSection } from '@/components/features/animated-section';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { years } from '@/data/seed';

export default function ComparePage() {
  const [year1, setYear1] = useState<string>('2015');
  const [year2, setYear2] = useState<string>('2016');

  const year1Data = years.find(y => y.id === year1);
  const year2Data = years.find(y => y.id === year2);

  return (
    <NostalgiaBackground>
      <div className="min-h-screen py-8 px-4">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <AnimatedSection animation="fadeUp">
            <div className="text-center mb-12">
              <h1 className="text-4xl md:text-5xl font-bold text-retro-dark mb-4">
                Compare Years
              </h1>
              <p className="text-xl text-retro-gray">
                See how different years of internet culture stack up.
              </p>
            </div>
          </AnimatedSection>

          {/* Year Selectors */}
          <AnimatedSection animation="fadeUp" delay={0.1}>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-8 mb-12">
              <div className="flex flex-col items-center gap-2">
                <label className="text-sm font-medium text-retro-gray">Year 1</label>
                <select
                  value={year1}
                  onChange={(e) => setYear1(e.target.value)}
                  className="px-4 py-2 rounded-lg border-2 border-retro-teal/30 bg-white text-retro-dark focus:border-retro-teal focus:outline-none"
                >
                  {years.map(y => (
                    <option key={y.id} value={y.id}>{y.year}</option>
                  ))}
                </select>
              </div>

              <div className="text-2xl text-retro-purple font-bold">VS</div>

              <div className="flex flex-col items-center gap-2">
                <label className="text-sm font-medium text-retro-gray">Year 2</label>
                <select
                  value={year2}
                  onChange={(e) => setYear2(e.target.value)}
                  className="px-4 py-2 rounded-lg border-2 border-retro-purple/30 bg-white text-retro-dark focus:border-retro-purple focus:outline-none"
                >
                  {years.map(y => (
                    <option key={y.id} value={y.id}>{y.year}</option>
                  ))}
                </select>
              </div>
            </div>
          </AnimatedSection>

          {/* Comparison Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Year 1 */}
            <AnimatedSection animation="fadeUp" delay={0.2}>
              <Card className="h-full bg-gradient-to-br from-retro-teal/10 to-transparent border-retro-teal/30">
                <CardHeader>
                  <CardTitle className="text-3xl text-retro-teal">{year1Data?.year}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-retro-gray mb-6">{year1Data?.description}</p>
                  
                  <h3 className="font-bold text-retro-dark mb-3">Top Trends:</h3>
                  <ul className="space-y-2">
                    {year1Data?.topTrends?.map((trend, i) => (
                      <li key={i} className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-retro-teal" />
                        <span>{trend}</span>
                      </li>
                    ))}
                  </ul>

                  <Link href={`/year/${year1Data?.year}`}>
                    <Button className="mt-6 w-full">
                      Explore {year1Data?.year} →
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </AnimatedSection>

            {/* Year 2 */}
            <AnimatedSection animation="fadeUp" delay={0.3}>
              <Card className="h-full bg-gradient-to-br from-retro-purple/10 to-transparent border-retro-purple/30">
                <CardHeader>
                  <CardTitle className="text-3xl text-retro-purple">{year2Data?.year}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-retro-gray mb-6">{year2Data?.description}</p>
                  
                  <h3 className="font-bold text-retro-dark mb-3">Top Trends:</h3>
                  <ul className="space-y-2">
                    {year2Data?.topTrends?.map((trend, i) => (
                      <li key={i} className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-retro-purple" />
                        <span>{trend}</span>
                      </li>
                    ))}
                  </ul>

                  <Link href={`/year/${year2Data?.year}`}>
                    <Button variant="secondary" className="mt-6 w-full">
                      Explore {year2Data?.year} →
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </AnimatedSection>
          </div>

          {/* Fun Comparison Stats */}
          <AnimatedSection animation="fadeUp" delay={0.4}>
            <Card className="mt-8">
              <CardHeader>
                <CardTitle className="text-center">📊 Quick Comparison</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                  <div className="p-4 bg-retro-cream rounded-lg">
                    <div className="text-2xl font-bold text-retro-teal">
                      {parseInt(year2) - parseInt(year1)}
                    </div>
                    <div className="text-sm text-retro-gray">Years Apart</div>
                  </div>
                  <div className="p-4 bg-retro-cream rounded-lg">
                    <div className="text-2xl font-bold text-retro-purple">
                      {year1Data?.topTrends?.length || 0}
                    </div>
                    <div className="text-sm text-retro-gray">Year 1 Trends</div>
                  </div>
                  <div className="p-4 bg-retro-cream rounded-lg">
                    <div className="text-2xl font-bold text-retro-pink">
                      {year2Data?.topTrends?.length || 0}
                    </div>
                    <div className="text-sm text-retro-gray">Year 2 Trends</div>
                  </div>
                  <div className="p-4 bg-retro-cream rounded-lg">
                    <div className="text-2xl font-bold text-retro-orange">
                      {Math.abs((year2Data?.topTrends?.length || 0) - (year1Data?.topTrends?.length || 0))}
                    </div>
                    <div className="text-sm text-retro-gray">Trend Difference</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </AnimatedSection>

          {/* CTA */}
          <AnimatedSection animation="fadeUp" delay={0.5}>
            <div className="text-center mt-12">
              <p className="text-retro-gray mb-4">
                Want to dive deeper into one of these years?
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/years">
                  <Button size="lg">Browse All Years 📅</Button>
                </Link>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </NostalgiaBackground>
  );
}
