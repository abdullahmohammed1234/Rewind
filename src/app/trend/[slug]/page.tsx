'use client';

import Link from 'next/link';
import { useParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { NostalgiaBackground } from '@/components/features/nostalgia-background';
import { AnimatedSection } from '@/components/features/animated-section';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { getItemBySlug } from '@/data/seed';
import { getCategoryById } from '@/data/seed';
import { UnifiedEmbed } from '@/components/features/embeds';

export default function TrendPage() {
  const params = useParams();
  const slug = params.slug as string;
  const item = getItemBySlug(slug);

  if (!item) {
    return (
      <NostalgiaBackground>
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-retro-dark mb-4">Trend not found</h1>
            <Link href="/years">
              <Button>Explore Years</Button>
            </Link>
          </div>
        </div>
      </NostalgiaBackground>
    );
  }

  const category = getCategoryById(item.categoryId);

  return (
    <NostalgiaBackground>
      <div className="min-h-screen py-8 px-4">
        <div className="max-w-4xl mx-auto">
          {/* Breadcrumb */}
          <AnimatedSection animation="fadeUp">
            <div className="flex items-center gap-2 text-sm text-retro-gray mb-6">
              <Link href="/" className="hover:text-retro-teal">Home</Link>
              <span>/</span>
              <Link href="/years" className="hover:text-retro-teal">Years</Link>
              <span>/</span>
              <span className="text-retro-dark">{item.title}</span>
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
              <h1 className="text-4xl md:text-5xl font-bold text-retro-dark mb-4">
                {item.title}
              </h1>
              <div className="flex items-center justify-center gap-4">
                {category && (
                  <span className="px-4 py-2 bg-retro-teal/10 text-retro-teal rounded-full text-sm font-medium">
                    {category.name}
                  </span>
                )}
                {item.popularityScore && (
                  <span className="px-4 py-2 bg-retro-purple/10 text-retro-purple rounded-full text-sm font-medium">
                    Popularity: {item.popularityScore}%
                  </span>
                )}
              </div>
            </div>
          </AnimatedSection>

          {/* Main Content */}
          <AnimatedSection animation="fadeUp" delay={0.2}>
            <Card className="mb-8">
              <CardContent className="p-8">
                <h2 className="text-xl font-bold text-retro-dark mb-4">
                  About This Trend
                </h2>
                <p className="text-lg text-retro-gray leading-relaxed">
                  {item.description}
                </p>
              </CardContent>
            </Card>
          </AnimatedSection>

          {/* Embed Section */}
          {item.embed && (
            <AnimatedSection animation="fadeUp" delay={0.25}>
              <Card className="mb-8 overflow-hidden">
                <CardContent className="p-6">
                  <h2 className="text-xl font-bold text-retro-dark mb-4">
                    📺 Media & Context
                  </h2>
                  <UnifiedEmbed
                    type={item.embed.type}
                    id={item.embed.id}
                    title={item.embed.title}
                  />
                </CardContent>
              </Card>
            </AnimatedSection>
          )}

          {/* Timeline */}
          {item.timeline && (
            <AnimatedSection animation="fadeUp" delay={0.3}>
              <Card className="mb-8">
                <CardContent className="p-8">
                  <h2 className="text-xl font-bold text-retro-dark mb-6">
                    📅 Timeline
                  </h2>
                  <div className="flex flex-col md:flex-row items-center gap-4">
                    <div className="flex-1 text-center p-4 bg-retro-teal/10 rounded-lg">
                      <div className="text-sm text-retro-gray mb-1">Started</div>
                      <div className="text-lg font-bold text-retro-teal">
                        {item.timeline.start}
                      </div>
                    </div>
                    {item.timeline.peak && (
                      <>
                        <div className="text-2xl text-retro-purple">→</div>
                        <div className="flex-1 text-center p-4 bg-retro-purple/10 rounded-lg">
                          <div className="text-sm text-retro-gray mb-1">Peak Popularity</div>
                          <div className="text-lg font-bold text-retro-purple">
                            {item.timeline.peak}
                          </div>
                        </div>
                      </>
                    )}
                    {item.timeline.end && (
                      <>
                        <div className="text-2xl text-retro-pink">→</div>
                        <div className="flex-1 text-center p-4 bg-retro-pink/10 rounded-lg">
                          <div className="text-sm text-retro-gray mb-1">Ended</div>
                          <div className="text-lg font-bold text-retro-pink">
                            {item.timeline.end}
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                </CardContent>
              </Card>
            </AnimatedSection>
          )}

          {/* Impact */}
          {item.impact && (
            <AnimatedSection animation="fadeUp" delay={0.4}>
              <Card className="mb-8 bg-gradient-to-r from-retro-purple/10 to-retro-pink/10 border-retro-purple/20">
                <CardContent className="p-8">
                  <h2 className="text-xl font-bold text-retro-dark mb-4">
                    🎯 Cultural Impact
                  </h2>
                  <p className="text-lg text-retro-gray leading-relaxed">
                    {item.impact}
                  </p>
                </CardContent>
              </Card>
            </AnimatedSection>
          )}

          {/* Navigation */}
          <AnimatedSection animation="fadeUp" delay={0.5}>
            <div className="flex justify-center gap-4">
              <Link href="/years">
                <Button variant="outline">
                  ← Explore More Years
                </Button>
              </Link>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </NostalgiaBackground>
  );
}
