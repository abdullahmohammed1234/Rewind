'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { AnimatedSection } from '@/components/features/animated-section';
import { Button } from '@/components/ui/button';
import { years, categories, demoUser, personalCapsules } from '@/data/seed';
import { cn } from '@/lib/utils';

export default function MyCapsulePage() {
  const [selectedYear, setSelectedYear] = useState('2024');
  const [isCreating, setIsCreating] = useState(false);
  const [capsuleTitle, setCapsuleTitle] = useState('');
  const [isSealed, setIsSealed] = useState(false);
  const [sealDate, setSealDate] = useState('');

  const userCapsules = personalCapsules.filter(c => c.userId === demoUser.id);
  const availableYears = years.filter(y => y.year <= 2025);

  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      {/* Animated background */}
      <div className="fixed inset-0 animated-gradient opacity-10 pointer-events-none" />

      {/* Header */}
      <section className="py-12 px-4 relative">
        <div className="max-w-6xl mx-auto">
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

          {/* User Profile Header */}
          <AnimatedSection animation="fadeUp">
            <div className="flex flex-col md:flex-row items-center gap-6 mb-12">
              {/* Avatar */}
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="w-24 h-24 rounded-full bg-gradient-to-r from-[#FF6B9D] to-[#C44FFF] flex items-center justify-center text-4xl"
              >
                👤
              </motion.div>

              {/* User info */}
              <div className="text-center md:text-left">
                <h1 className="text-3xl font-bold text-white mb-1">
                  {demoUser.displayName}
                </h1>
                <p className="text-gray-400 mb-2">@{demoUser.username}</p>
                <p className="text-gray-500 text-sm">{demoUser.bio}</p>
                <div className="flex gap-4 mt-3 justify-center md:justify-start">
                  <span className="text-sm text-gray-400">
                    <span className="text-white font-bold">{demoUser.followers}</span> followers
                  </span>
                  <span className="text-sm text-gray-400">
                    <span className="text-white font-bold">{demoUser.following}</span> following
                  </span>
                </div>
              </div>

              {/* Edit profile button */}
              <div className="md:ml-auto">
                <Button variant="outline" className="border-white/20 text-white hover:bg-white/10">
                  Edit Profile
                </Button>
              </div>
            </div>
          </AnimatedSection>

          {/* Page title */}
          <AnimatedSection animation="fadeUp" delay={0.1}>
            <div className="text-center mb-12">
              <motion.span 
                className="text-6xl mb-4 block"
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                💜
              </motion.span>
              <h2 className="text-4xl md:text-5xl font-black text-white mb-4">
                My<span className="bg-gradient-to-r from-[#FF6B9D] to-[#C44FFF] bg-clip-text text-transparent">Capsule</span>
              </h2>
              <p className="text-gray-400 max-w-xl mx-auto">
                Your personal time capsules. Save memories, seal them for the future, and share with friends.
              </p>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* My Capsules Grid */}
      <section className="py-8 px-4">
        <div className="max-w-6xl mx-auto">
          <AnimatedSection animation="fadeUp">
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-2xl font-bold text-white">My Capsules</h3>
              <Button 
                onClick={() => setIsCreating(true)}
                className="bg-gradient-to-r from-[#FF6B9D] to-[#C44FFF] hover:opacity-90"
              >
                + Create New Capsule
              </Button>
            </div>
          </AnimatedSection>

          {/* Capsules grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {userCapsules.map((capsule, i) => (
              <AnimatedSection key={capsule.id} animation="fadeUp" delay={0.1 * i}>
                <motion.div
                  whileHover={{ y: -5, scale: 1.02 }}
                  className={cn(
                    'relative p-6 rounded-2xl border transition-all cursor-pointer overflow-hidden',
                    capsule.isSealed 
                      ? 'bg-white/5 border-white/10' 
                      : 'bg-gradient-to-br from-[#FF6B9D]/10 to-[#C44FFF]/10 border-[#C44FFF]/30 hover:border-[#C44FFF]/50'
                  )}
                >
                  {/* Sealed overlay */}
                  {capsule.isSealed && (
                    <div className="absolute inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-10">
                      <div className="text-center">
                        <span className="text-4xl mb-2 block">🔒</span>
                        <p className="text-white font-bold">Sealed</p>
                        <p className="text-gray-400 text-sm">
                          Opens {capsule.sealedUntil}
                        </p>
                      </div>
                    </div>
                  )}

                  {/* Capsule content */}
                  <div className="relative z-0">
                    <div className="flex items-center gap-3 mb-4">
                      <span className="text-3xl">📼</span>
                      <div>
                        <h4 className="font-bold text-white">{capsule.title}</h4>
                        <p className="text-sm text-gray-400">{capsule.yearId}</p>
                      </div>
                    </div>

                    <p className="text-gray-400 text-sm mb-4 line-clamp-2">
                      {capsule.description}
                    </p>

                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-4">
                        <span className="text-gray-400">
                          ❤️ {capsule.likes}
                        </span>
                        <span className="text-gray-400">
                          🔗 {capsule.shares}
                        </span>
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
                  </div>
                </motion.div>
              </AnimatedSection>
            ))}

            {/* Create new capsule card */}
            <AnimatedSection animation="fadeUp" delay={0.3}>
              <motion.div
                whileHover={{ y: -5, scale: 1.02 }}
                onClick={() => setIsCreating(true)}
                className="p-6 rounded-2xl border-2 border-dashed border-white/20 hover:border-[#C44FFF]/50 cursor-pointer transition-all flex flex-col items-center justify-center min-h-[200px]"
              >
                <span className="text-4xl mb-3">➕</span>
                <p className="text-white font-semibold">Create New Capsule</p>
                <p className="text-gray-400 text-sm">Start preserving memories</p>
              </motion.div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Create Capsule Modal */}
      {isCreating && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={() => setIsCreating(false)}
        >
          <motion.div
            initial={{ scale: 0.9, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            onClick={(e) => e.stopPropagation()}
            className="bg-[#1a1a1a] rounded-3xl p-8 max-w-lg w-full border border-white/10"
          >
            <h3 className="text-2xl font-bold text-white mb-6">Create New Capsule</h3>

            {/* Year selection */}
            <div className="mb-6">
              <label className="block text-sm text-gray-400 mb-2">Select Year</label>
              <div className="flex flex-wrap gap-2">
                {availableYears.slice(-8).map((year) => (
                  <button
                    key={year.id}
                    onClick={() => setSelectedYear(year.id)}
                    className={cn(
                      'px-3 py-2 rounded-lg text-sm transition-all',
                      selectedYear === year.id
                        ? 'bg-gradient-to-r from-[#FF6B9D] to-[#C44FFF] text-white'
                        : 'bg-white/5 text-gray-400 hover:bg-white/10'
                    )}
                  >
                    {year.year}
                  </button>
                ))}
              </div>
            </div>

            {/* Title input */}
            <div className="mb-6">
              <label className="block text-sm text-gray-400 mb-2">Capsule Title</label>
              <input
                type="text"
                value={capsuleTitle}
                onChange={(e) => setCapsuleTitle(e.target.value)}
                placeholder="My 2024 Memories"
                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-[#C44FFF]"
              />
            </div>

            {/* Seal option */}
            <div className="mb-6">
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={isSealed}
                  onChange={(e) => setIsSealed(e.target.checked)}
                  className="w-5 h-5 rounded bg-white/5 border border-white/20"
                />
                <span className="text-white">🔒 Seal this capsule</span>
              </label>
              <p className="text-gray-500 text-sm mt-1 ml-8">
                Sealed capsules can only receive submissions until the seal date
              </p>

              {isSealed && (
                <div className="mt-3 ml-8">
                  <label className="block text-sm text-gray-400 mb-2">Seal Until</label>
                  <input
                    type="date"
                    value={sealDate}
                    onChange={(e) => setSealDate(e.target.value)}
                    className="px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-white focus:outline-none focus:border-[#C44FFF]"
                  />
                </div>
              )}
            </div>

            {/* Categories to include */}
            <div className="mb-6">
              <label className="block text-sm text-gray-400 mb-2">Categories to Include</label>
              <div className="flex flex-wrap gap-2">
                {categories.slice(0, 7).map((cat) => (
                  <button
                    key={cat.id}
                    className="px-3 py-2 rounded-lg bg-white/5 text-gray-400 hover:bg-white/10 text-sm flex items-center gap-1"
                  >
                    <span>{cat.icon}</span>
                    <span>{cat.name}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-3">
              <Button
                variant="outline"
                onClick={() => setIsCreating(false)}
                className="flex-1 border-white/20 text-white hover:bg-white/10"
              >
                Cancel
              </Button>
              <Button
                onClick={() => {
                  // Would create capsule here
                  setIsCreating(false);
                }}
                className="flex-1 bg-gradient-to-r from-[#FF6B9D] to-[#C44FFF] hover:opacity-90"
              >
                Create Capsule
              </Button>
            </div>
          </motion.div>
        </motion.div>
      )}

      {/* Add Entry Section */}
      <section className="py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <AnimatedSection animation="fadeUp">
            <div className="rounded-3xl p-8" style={{
              background: 'linear-gradient(135deg, rgba(255, 107, 157, 0.1) 0%, rgba(196, 79, 255, 0.1) 100%)',
              border: '1px solid rgba(255, 255, 255, 0.1)'
            }}>
              <h3 className="text-2xl font-bold text-white mb-6 text-center">
                📝 Add to Your Capsule
              </h3>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  { icon: '📸', label: 'Photo', desc: 'Upload a memory' },
                  { icon: '🎵', label: 'Song', desc: 'Your top track' },
                  { icon: '👗', label: 'Outfit', desc: 'Fashion moment' },
                  { icon: '✈️', label: 'Travel', desc: 'Places visited' },
                  { icon: '🎬', label: 'Show', desc: 'What you watched' },
                  { icon: '📖', label: 'Story', desc: 'Write a memory' },
                  { icon: '🏆', label: 'Achievement', desc: 'Proud moment' },
                  { icon: '💭', label: 'Thought', desc: 'Future message' },
                ].map((item, i) => (
                  <motion.button
                    key={item.label}
                    whileHover={{ scale: 1.05, y: -3 }}
                    whileTap={{ scale: 0.95 }}
                    className="p-4 rounded-xl bg-white/5 border border-white/10 hover:border-[#C44FFF]/50 transition-all text-center"
                  >
                    <span className="text-3xl mb-2 block">{item.icon}</span>
                    <div className="text-white font-semibold text-sm">{item.label}</div>
                    <div className="text-gray-500 text-xs">{item.desc}</div>
                  </motion.button>
                ))}
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Share & Gallery Section */}
      <section className="py-12 px-4 border-t border-white/10">
        <div className="max-w-6xl mx-auto">
          <AnimatedSection animation="fadeUp">
            <div className="text-center">
              <h3 className="text-2xl font-bold text-white mb-4">
                Share Your Capsule
              </h3>
              <p className="text-gray-400 mb-6">
                Make your capsule public and share it with friends
              </p>
              <div className="flex justify-center gap-4">
                <Button variant="outline" className="border-white/20 text-white hover:bg-white/10">
                  📋 Copy Link
                </Button>
                <Button variant="outline" className="border-white/20 text-white hover:bg-white/10">
                  📱 Share to Social
                </Button>
                <Link href="/profile">
                  <Button className="bg-gradient-to-r from-[#4FFFC4] to-[#4F8FFF] hover:opacity-90">
                    View My Gallery →
                  </Button>
                </Link>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </div>
  );
}
