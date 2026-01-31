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
                Your Own Personal Time Capsule
              </h1>
              <p className="text-xl text-retro-gray max-w-2xl mx-auto">
                Explore what YOU did throughout the years!
              </p>
            </div>
          </AnimatedSection>

          
        </div>
      </div>
    </NostalgiaBackground>
  );
}
