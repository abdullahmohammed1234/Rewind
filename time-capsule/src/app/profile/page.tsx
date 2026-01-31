'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { AnimatedSection } from '@/components/features/animated-section';
import { Button } from '@/components/ui/button';
import { demoUser, personalCapsules, years } from '@/data/seed';
import { cn } from '@/lib/utils';

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState<'capsules' | 'liked' | 'shared'>('capsules');
  const userCapsules = personalCapsules.filter(c => c.userId === demoUser.id);
  const publicCapsules = userCapsules.filter(c => c.isPublic);

  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      {/* Animated background */}
      <div className="fixed inset-0 animated-gradient opacity-10 pointer-events-none" />

      {/* Profile Header */}
      <section className="relative py-12 px-4">
        {/* Cover gradient */}
        <div className="absolute top-0 left-0 right-0 h-48 bg-gradient-to-r from-[#FF6B9D] via-[#C44FFF] to-[#4F8FFF] opacity-30" />
        <div className="absolute top-0 left-0 right-0 h-48 bg-gradient-to-b from-transparent to-[#0a0a0a]" />

        <div className="max-w-4xl mx-auto relative z-10">
          {/* Back button */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="mb-8"
          >
            <Link href="/">
              <Button variant="ghost" className="text-gray-400 hover:text-white">
                ← Back to Home
              </Button>
            </Link>
          </motion.div>

          {/* Profile card */}
          <AnimatedSection animation="fadeUp">
            <div className="flex flex-col items-center text-center">
              {/* Avatar */}
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="w-32 h-32 rounded-full bg-gradient-to-r from-[#FF6B9D] to-[#C44FFF] flex items-center justify-center text-6xl mb-4 border-4 border-[#0a0a0a]"
              >
                👤
              </motion.div>

              {/* User info */}
              <h1 className="text-3xl font-bold text-white mb-1">
                {demoUser.displayName}
              </h1>
              <p className="text-gray-400 mb-3">@{demoUser.username}</p>
              <p className="text-gray-500 max-w-md mb-4">{demoUser.bio}</p>

              {/* Stats */}
              <div className="flex gap-8 mb-6">
                <div className="text-center">
                  <div className="text-2xl font-bold text-white">{userCapsules.length}</div>
                  <div className="text-sm text-gray-400">Capsules</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-white">{demoUser.followers}</div>
                  <div className="text-sm text-gray-400">Followers</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-white">{demoUser.following}</div>
                  <div className="text-sm text-gray-400">Following</div>
                </div>
              </div>

              {/* Action buttons */}
              <div className="flex gap-3">
                <Button className="bg-gradient-to-r from-[#FF6B9D] to-[#C44FFF] hover:opacity-90">
                  Follow
                </Button>
                <Button variant="outline" className="border-white/20 text-white hover:bg-white/10">
                  Share Profile
                </Button>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Tabs */}
      <section className="py-8 px-4 border-b border-white/10">
        <div className="max-w-4xl mx-auto">
          <div className="flex justify-center gap-2">
            {[
              { id: 'capsules', label: 'Capsules', icon: '📼' },
              { id: 'liked', label: 'Liked', icon: '❤️' },
              { id: 'shared', label: 'Shared', icon: '🔗' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as typeof activeTab)}
                className={cn(
                  'px-6 py-3 rounded-xl flex items-center gap-2 transition-all',
                  activeTab === tab.id
                    ? 'bg-gradient-to-r from-[#FF6B9D] to-[#C44FFF] text-white'
                    : 'bg-white/5 text-gray-400 hover:bg-white/10'
                )}
              >
                <span>{tab.icon}</span>
                <span>{tab.label}</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Content */}
      <section className="py-12 px-4">
        <div className="max-w-6xl mx-auto">
          {activeTab === 'capsules' && (
            <>
              {/* Featured Capsule */}
              {publicCapsules.length > 0 && (
                <AnimatedSection animation="fadeUp">
                  <div className="mb-12">
                    <h3 className="text-lg font-semibold text-gray-400 mb-4">📌 Featured Capsule</h3>
                    <motion.div
                      whileHover={{ scale: 1.01 }}
                      className="p-8 rounded-3xl cursor-pointer"
                      style={{
                        background: 'linear-gradient(135deg, rgba(255, 107, 157, 0.2) 0%, rgba(196, 79, 255, 0.2) 100%)',
                        border: '2px solid rgba(196, 79, 255, 0.3)'
                      }}
                    >
                      <div className="flex items-center gap-4 mb-4">
                        <span className="text-5xl">📼</span>
                        <div>
                          <h4 className="text-2xl font-bold text-white">{publicCapsules[0].title}</h4>
                          <p className="text-gray-400">{publicCapsules[0].yearId}</p>
                        </div>
                      </div>
                      <p className="text-gray-300 mb-4">{publicCapsules[0].description}</p>
                      <div className="flex items-center gap-6">
                        <span className="text-gray-400">❤️ {publicCapsules[0].likes} likes</span>
                        <span className="text-gray-400">🔗 {publicCapsules[0].shares} shares</span>
                        <span className="text-[#4FFFC4]">✓ Public</span>
                      </div>
                    </motion.div>
                  </div>
                </AnimatedSection>
              )}

              {/* All Capsules Grid */}
              <AnimatedSection animation="fadeUp" delay={0.1}>
                <h3 className="text-lg font-semibold text-gray-400 mb-4">All Capsules</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {userCapsules.map((capsule, i) => (
                    <motion.div
                      key={capsule.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.1 }}
                      whileHover={{ y: -5, scale: 1.02 }}
                      className={cn(
                        'relative p-6 rounded-2xl border transition-all cursor-pointer overflow-hidden',
                        capsule.isSealed 
                          ? 'bg-white/5 border-white/10' 
                          : 'bg-white/5 border-white/10 hover:border-[#C44FFF]/50'
                      )}
                    >
                      {/* Sealed overlay */}
                      {capsule.isSealed && (
                        <div className="absolute inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-10">
                          <div className="text-center">
                            <span className="text-4xl mb-2 block">🔒</span>
                            <p className="text-white font-bold">Sealed</p>
                            <p className="text-gray-400 text-sm">Opens {capsule.sealedUntil}</p>
                          </div>
                        </div>
                      )}

                      <div className="flex items-center gap-3 mb-3">
                        <span className="text-2xl">📼</span>
                        <div>
                          <h4 className="font-bold text-white">{capsule.title}</h4>
                          <p className="text-sm text-gray-400">{capsule.yearId}</p>
                        </div>
                      </div>

                      <p className="text-gray-400 text-sm mb-4 line-clamp-2">
                        {capsule.description}
                      </p>

                      <div className="flex items-center justify-between text-sm">
                        <div className="flex items-center gap-3">
                          <span className="text-gray-400">❤️ {capsule.likes}</span>
                          <span className="text-gray-400">🔗 {capsule.shares}</span>
                        </div>
                        <span className={cn(
                          'px-2 py-1 rounded-full text-xs',
                          capsule.isPublic 
                            ? 'bg-[#4FFFC4]/20 text-[#4FFFC4]' 
                            : 'bg-white/10 text-gray-400'
                        )}>
                          {capsule.isPublic ? 'Public' : 'Private'}
                        </span>
                      </div>
                    </motion.div>
                  ))}

                  {/* Create new */}
                  <Link href="/mycapsule">
                    <motion.div
                      whileHover={{ y: -5, scale: 1.02 }}
                      className="p-6 rounded-2xl border-2 border-dashed border-white/20 hover:border-[#C44FFF]/50 cursor-pointer transition-all flex flex-col items-center justify-center min-h-[200px]"
                    >
                      <span className="text-4xl mb-3">➕</span>
                      <p className="text-white font-semibold">Create New</p>
                    </motion.div>
                  </Link>
                </div>
              </AnimatedSection>
            </>
          )}

          {activeTab === 'liked' && (
            <AnimatedSection animation="fadeUp">
              <div className="text-center py-16">
                <span className="text-6xl mb-4 block">❤️</span>
                <h3 className="text-xl font-bold text-white mb-2">Liked Capsules</h3>
                <p className="text-gray-400 mb-6">Capsules you've liked will appear here</p>
                <Link href="/years">
                  <Button className="bg-gradient-to-r from-[#FF6B9D] to-[#C44FFF]">
                    Explore Capsules
                  </Button>
                </Link>
              </div>
            </AnimatedSection>
          )}

          {activeTab === 'shared' && (
            <AnimatedSection animation="fadeUp">
              <div className="text-center py-16">
                <span className="text-6xl mb-4 block">🔗</span>
                <h3 className="text-xl font-bold text-white mb-2">Shared Capsules</h3>
                <p className="text-gray-400 mb-6">Capsules you've shared will appear here</p>
                <Link href="/mycapsule">
                  <Button className="bg-gradient-to-r from-[#FF6B9D] to-[#C44FFF]">
                    Share Your Capsule
                  </Button>
                </Link>
              </div>
            </AnimatedSection>
          )}
        </div>
      </section>

      {/* Year Timeline */}
      <section className="py-12 px-4 border-t border-white/10">
        <div className="max-w-6xl mx-auto">
          <AnimatedSection animation="fadeUp">
            <h3 className="text-xl font-bold text-white text-center mb-8">
              📅 Capsule Timeline
            </h3>
            <div className="relative">
              {/* Timeline line */}
              <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-[#FF6B9D] via-[#C44FFF] to-[#4F8FFF]" />

              {/* Timeline items */}
              <div className="space-y-8">
                {userCapsules.map((capsule, i) => (
                  <motion.div
                    key={capsule.id}
                    initial={{ opacity: 0, x: i % 2 === 0 ? -20 : 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className={cn(
                      'flex items-center gap-4',
                      i % 2 === 0 ? 'flex-row' : 'flex-row-reverse'
                    )}
                  >
                    <div className={cn(
                      'flex-1',
                      i % 2 === 0 ? 'text-right' : 'text-left'
                    )}>
                      <div className="inline-block p-4 rounded-xl bg-white/5 border border-white/10">
                        <h4 className="font-bold text-white">{capsule.title}</h4>
                        <p className="text-sm text-gray-400">{capsule.yearId}</p>
                      </div>
                    </div>

                    {/* Center dot */}
                    <div className="w-4 h-4 rounded-full bg-gradient-to-r from-[#FF6B9D] to-[#C44FFF] border-2 border-[#0a0a0a] z-10" />

                    <div className="flex-1" />
                  </motion.div>
                ))}
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </div>
  );
}
