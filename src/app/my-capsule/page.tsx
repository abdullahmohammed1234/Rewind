'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { NostalgiaBackground } from '@/components/features/nostalgia-background';
import { AnimatedSection } from '@/components/features/animated-section';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { PersonalCapsule, PersonalCapsuleEntry } from '@/types';
import { cn } from '@/lib/utils';

// Mock data for demo
const mockUser = {
  id: 'user-1',
  username: 'demo_user',
  displayName: 'Demo User',
  avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=demo',
  bio: 'Lover of internet culture',
  createdAt: '2024-01-01',
  followers: 42,
  following: 38,
  capsulesCount: 3,
  isPrivate: false
};

const mockCapsules: PersonalCapsule[] = [
  {
    id: 'capsule-2024',
    userId: 'user-1',
    yearId: '2024',
    title: 'My 2024 Rewind',
    description: 'A year of AI, elections, and new beginnings',
    coverImage: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800',
    entries: [
      {
        id: 'entry-1',
        userId: 'user-1',
        yearId: '2024',
        categoryId: 'style',
        title: 'Summer Vacation Photo',
        description: 'Amazing summer trip!',
        mediaUrl: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400',
        mediaType: 'image',
        createdAt: '2024-07-15',
        isPublic: true
      },
      {
        id: 'entry-2',
        userId: 'user-1',
        yearId: '2024',
        categoryId: 'music',
        title: 'Favorite Song of the Year',
        description: 'Espresso by Sabrina Carpenter - this song defined my summer!',
        mediaType: 'text',
        createdAt: '2024-08-20',
        isPublic: true
      }
    ],
    isSealed: false,
    allowSubmissions: true,
    isPublic: true,
    createdAt: '2024-01-01',
    updatedAt: '2024-12-01',
    likes: 12,
    shares: 3
  },
  {
    id: 'capsule-2023',
    userId: 'user-1',
    yearId: '2023',
    title: 'My 2023 Time Capsule',
    description: 'The year of Barbenheimer and AI',
    coverImage: 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=800',
    entries: [
      {
        id: 'entry-3',
        userId: 'user-1',
        yearId: '2023',
        categoryId: 'tv',
        title: 'Barbie Movie Night',
        description: 'Best movie experience ever!',
        mediaUrl: 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=400',
        mediaType: 'image',
        createdAt: '2023-07-21',
        isPublic: true
      }
    ],
    isSealed: true,
    sealedUntil: '2028-12-31',
    allowSubmissions: false,
    isPublic: true,
    createdAt: '2023-01-01',
    updatedAt: '2023-12-31',
    likes: 25,
    shares: 7
  }
];

const MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

type CapsuleStatus = 'open' | 'sealed' | 'unlocked';

export default function MyCapsulePage() {
  const [capsules, setCapsules] = useState<PersonalCapsule[]>(mockCapsules);
  const [selectedCapsule, setSelectedCapsule] = useState<PersonalCapsule | null>(null);
  const [activeTab, setActiveTab] = useState<'capsules' | 'gallery' | 'friends' | 'wrapped'>('capsules');
  const [pageLoading, setPageLoading] = useState(true);

  // Set pageLoading to false after initial load
  useEffect(() => {
    const timer = setTimeout(() => {
      setPageLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  const getStatusBadge = (capsule: PersonalCapsule) => {
    let status: CapsuleStatus;
    let label: string;
    
    if (capsule.isSealed) {
      if (capsule.sealedUntil && new Date(capsule.sealedUntil) <= new Date()) {
        status = 'unlocked';
        label = '✨ Unlocked';
      } else {
        status = 'sealed';
        label = '🔒 Sealed';
      }
    } else {
      status = 'open';
      label = '🔓 Open';
    }

    const styles = {
      open: 'bg-green-500',
      sealed: 'bg-red-500',
      unlocked: 'bg-blue-500'
    };

    return (
      <Badge className={cn(styles[status], 'text-white')}>
        {label}
      </Badge>
    );
  };

  const handleCreateCapsule = () => {
    const year = new Date().getFullYear();
    const newCapsule: PersonalCapsule = {
      id: `capsule-${Date.now()}`,
      userId: 'user-1',
      yearId: String(year),
      title: `My ${year} Rewind`,
      description: 'Start building your capsule!',
      entries: [],
      isSealed: false,
      allowSubmissions: true,
      isPublic: true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    setCapsules([newCapsule, ...capsules]);
  };

  const handleDeleteCapsule = (capsuleId: string) => {
    setCapsules(prev => prev.filter(c => c.id !== capsuleId));
    if (selectedCapsule?.id === capsuleId) {
      setSelectedCapsule(null);
    }
  };

  // Show loading state
  if (pageLoading) {
    return (
      <NostalgiaBackground>
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <div className="text-6xl mb-4 animate-pulse">📦</div>
            <p className="text-xl text-retro-gray">Loading...</p>
          </div>
        </div>
      </NostalgiaBackground>
    );
  }

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

      <div className="relative z-10 min-h-screen py-12 px-4">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <AnimatedSection animation="fadeUp">
            <div className="flex flex-col md:flex-row items-center justify-between mb-12">
              <div className="text-center md:text-left mb-6 md:mb-0">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.5 }}
                  className="text-6xl mb-4"
                >
                  📦
                </motion.div>
                <h1 className="text-4xl md:text-5xl font-bold text-white mb-2">
                  MyCapsule
                </h1>
                <p className="text-xl text-gray-400">
                  Create and manage your personal rewinds
                </p>
              </div>
              
              {/* User Profile Summary */}
              <Card className="shrink-0 bg-black/50 border-white/20">
                <CardContent className="p-4">
                  <div className="flex items-center gap-4">
                    <img 
                      src={mockUser.avatarUrl} 
                      alt={mockUser.displayName}
                      className="w-16 h-16 rounded-full bg-retro-teal/20"
                    />
                    <div>
                      <p className="font-bold text-white">{mockUser.displayName}</p>
                      <p className="text-sm text-gray-400">@{mockUser.username}</p>
                      <div className="flex gap-2 text-sm mt-1 text-gray-400">
                        <span>📦 {mockUser.capsulesCount}</span>
                        <span>👥 {mockUser.followers}</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </AnimatedSection>

          {/* Tabs */}
          <AnimatedSection animation="fadeUp" delay={0.1}>
            <div className="flex justify-center gap-2 mb-8">
              {(['capsules', 'gallery', 'friends', 'wrapped'] as const).map((tab) => (
                <Button
                  key={tab}
                  variant={activeTab === tab ? 'default' : 'outline'}
                  onClick={() => setActiveTab(tab)}
                  className="capitalize bg-white/10 text-white border-white/20 hover:bg-white/20"
                >
                  {tab === 'capsules' && '📦'} {tab === 'gallery' && '🖼️'} {tab === 'friends' && '👥'} {tab === 'wrapped' && '✨'}
                  {' '}{tab}
                </Button>
              ))}
            </div>
          </AnimatedSection>

          {/* Create New Capsule Button */}
          <AnimatedSection animation="fadeUp" delay={0.2}>
            <div className="text-center mb-8">
              <Button 
                onClick={handleCreateCapsule}
                className="bg-retro-teal hover:bg-retro-teal/80 text-white text-lg px-8 py-3"
              >
                ➕ Create New Capsule
              </Button>
            </div>
          </AnimatedSection>

          {/* Capsules Grid */}
          {activeTab === 'capsules' && (
            <AnimatedSection animation="fadeUp" delay={0.3}>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {capsules.map((capsule) => (
                  <motion.div
                    key={capsule.id}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Card 
                      className={cn(
                        "cursor-pointer transition-all duration-300 bg-black/50 border-white/20 hover:border-retro-teal/50",
                        selectedCapsule?.id === capsule.id && "border-retro-teal"
                      )}
                      onClick={() => setSelectedCapsule(capsule)}
                    >
                      <div className="aspect-video relative overflow-hidden rounded-t-lg">
                        {capsule.coverImage ? (
                          <img 
                            src={capsule.coverImage} 
                            alt={capsule.title}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full bg-gradient-to-br from-retro-purple to-retro-blue flex items-center justify-center">
                            <span className="text-6xl">📦</span>
                          </div>
                        )}
                        <div className="absolute top-2 right-2">
                          {getStatusBadge(capsule)}
                        </div>
                      </div>
                      <CardContent className="p-4">
                        <h3 className="text-xl font-bold text-white mb-1">{capsule.title}</h3>
                        <p className="text-gray-400 text-sm mb-3">{capsule.description}</p>
                        <div className="flex justify-between items-center text-sm text-gray-500">
                          <span>📝 {capsule.entries.length} entries</span>
                          <span>👥 {capsule.likes || 0} likes</span>
                        </div>
                        <div className="flex gap-2 mt-3">
                          <Button 
                            size="sm" 
                            variant="outline" 
                            className="flex-1 bg-red-500/20 border-red-500/50 text-red-400 hover:bg-red-500/30"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleDeleteCapsule(capsule.id);
                            }}
                          >
                            🗑️ Delete
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </AnimatedSection>
          )}

          {/* Gallery Tab */}
          {activeTab === 'gallery' && (
            <AnimatedSection animation="fadeUp">
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {capsules.flatMap(c => c.entries.map((entry, index) => (
                  <motion.div
                    key={`${c.id}-${entry.id}-${index}`}
                    whileHover={{ scale: 1.05 }}
                    className="aspect-square rounded-lg overflow-hidden bg-black/50"
                  >
                    {entry.mediaType === 'image' && entry.mediaUrl ? (
                      <img 
                        src={entry.mediaUrl} 
                        alt={entry.title}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center p-4 text-center text-gray-400">
                        <div>
                          <span className="text-4xl block mb-2">📝</span>
                          <p className="text-sm">{entry.title}</p>
                        </div>
                      </div>
                    )}
                  </motion.div>
                )))}
              </div>
            </AnimatedSection>
          )}

          {/* Friends Tab */}
          {activeTab === 'friends' && (
            <AnimatedSection animation="fadeUp">
              <Card className="bg-black/50 border-white/20">
                <CardContent className="p-8 text-center">
                  <span className="text-6xl mb-4 block">👥</span>
                  <h3 className="text-2xl font-bold text-white mb-2">Friends Coming Soon</h3>
                  <p className="text-gray-400">Connect with friends to share capsules!</p>
                </CardContent>
              </Card>
            </AnimatedSection>
          )}

          {/* Wrapped Tab */}
          {activeTab === 'wrapped' && (
            <AnimatedSection animation="fadeUp">
              <Card className="bg-black/50 border-white/20">
                <CardContent className="p-8 text-center">
                  <span className="text-6xl mb-4 block">✨</span>
                  <h3 className="text-2xl font-bold text-white mb-2">Your Year in Review</h3>
                  <p className="text-gray-400">Your personalized wrap-up is coming soon!</p>
                </CardContent>
              </Card>
            </AnimatedSection>
          )}
        </div>
      </div>
    </div>
  );
}
