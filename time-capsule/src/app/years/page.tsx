'use client';

import { NostalgiaBackground } from '@/components/features/nostalgia-background';
import { AnimatedSection } from '@/components/features/animated-section';
import { YearCard } from '@/components/features/year-card';
import { years } from '@/data/seed';

export default function YearsPage() {
  return (
    <NostalgiaBackground showFloatingYears>
      <div className="min-h-screen py-12 px-4">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <AnimatedSection animation="fadeUp">
            <div className="text-center mb-12">
              <h1 className="text-4xl md:text-5xl font-bold text-retro-dark mb-4">
                Explore by Year
              </h1>
              <p className="text-xl text-retro-gray max-w-2xl mx-auto">
                Journey through the evolution of internet culture, one year at a time.
              </p>
            </div>
          </AnimatedSection>

          {/* Years Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {years.map((year, index) => (
              <YearCard key={year.id} year={year} index={index} />
            ))}
          </div>

          {/* Coming Soon */}
          <AnimatedSection animation="fadeUp" delay={0.5}>
            <div className="mt-16 text-center p-8 bg-retro-teal/10 rounded-2xl border-2 border-dashed border-retro-teal/30">
              <h3 className="text-xl font-bold text-retro-dark mb-2">
                More Years Coming Soon! 🚀
              </h3>
              <p className="text-retro-gray">
                We're working on adding 2019, 2020, 2021, and beyond.
                <br />
                Stay tuned for the full archive!
              </p>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </NostalgiaBackground>
  );
}
