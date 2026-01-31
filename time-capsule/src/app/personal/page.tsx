'use client';

import { NostalgiaBackground } from '@/components/features/nostalgia-background';
import { AnimatedSection } from '@/components/features/animated-section';
import Link from "next/link";
import { Button } from '@/components/ui/button';
import { YearCard } from '@/components/features/year-card';
import { years } from '@/data/seed';

export default function personalPage() {
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
          {/*File Upload*/}
          <AnimatedSection animation = "fadeUp">
            <div className="text-center mb-12">
              <Link href="/fileUpload">
                <Button size="lg" className="text-lg px-8">
                  Upload File
                </Button>
              </Link>
            </div>
          </AnimatedSection>
          {/* Years Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {years.map((year, index) => (
                <YearCard key={year.id} year={year} index={index} />
              ))}
            </div>
          
        </div>
      </div>
    </NostalgiaBackground>
  );
}
