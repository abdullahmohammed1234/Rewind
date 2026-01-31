'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { NostalgiaBackground } from '@/components/features/nostalgia-background';
import { AnimatedSection } from '@/components/features/animated-section';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { years, categories } from '@/data/seed';
import { PersonalCapsule, CapsuleSubmission, CapsuleStatus } from '@/types';
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
    year: 2024,
    title: 'My 2024 Time Capsule',
    description: 'A year of AI, elections, and new beginnings',
    status: 'open',
    visibility: 'public',
    createdAt: '2024-01-01',
    updatedAt: '2024-12-01',
    submissions: [
      {
        id: 'sub-1',
        capsuleId: 'capsule-2024',
        userId: 'user-1',
        type: 'image',
        title: 'Summer Vacation Photo',
        content: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400',
        category: 'style',
        month: 'July',
        tags: ['travel', 'summer', 'memories'],
        likes: 12,
        comments: 3,
        createdAt: '2024-07-15',
        isPinned: true
      },
      {
        id: 'sub-2',
        capsuleId: 'capsule-2024',
        userId: 'user-1',
        type: 'text',
        title: 'Favorite Song of the Year',
        content: 'Espresso by Sabrina Carpenter - this song defined my summer!',
        category: 'music',
        month: 'August',
        tags: ['music', 'favorite', 'summer'],
        likes: 8,
        comments: 2,
        createdAt: '2024-08-20',
        isPinned: false
      }
    ],
    coverImage: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800',
    isFavorite: true,
    shareCode: 'CAP-2024-XYZ'
  },
  {
    id: 'capsule-2023',
    userId: 'user-1',
    year: 2023,
    title: 'My 2023 Time Capsule',
    description: 'The year of Barbenheimer and AI',
    status: 'sealed',
    visibility: 'friends',
    createdAt: '2023-01-01',
    updatedAt: '2023-12-31',
    sealedAt: '2023-12-31',
    unlockDate: '2028-12-31',
    submissions: [
      {
        id: 'sub-3',
        capsuleId: 'capsule-2023',
        userId: 'user-1',
        type: 'image',
        title: 'Barbie Movie Night',
        content: 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=400',
        category: 'tv',
        month: 'July',
        tags: ['barbie', 'movies', 'friends'],
        likes: 25,
        comments: 7,
        createdAt: '2023-07-21',
        isPinned: true
      }
    ],
    coverImage: 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=800',
    isFavorite: false
  }
];

export default function MyCapsulePage() {
  const [capsules, setCapsules] = useState<PersonalCapsule[]>(mockCapsules);
  const [selectedCapsule, setSelectedCapsule] = useState<PersonalCapsule | null>(null);
  const [showSealModal, setShowSealModal] = useState(false);
  const [showSubmitModal, setShowSubmitModal] = useState(false);
  const [activeTab, setActiveTab] = useState<'capsules' | 'gallery' | 'friends'>('capsules');

  const getStatusBadge = (status: CapsuleStatus) => {
    const styles = {
      open: 'bg-green-500',
      sealed: 'bg-red-500',
      unlocked: 'bg-blue-500'
    };
    return (
      <Badge className={cn(styles[status], 'text-white')}>
        {status === 'open' ? '🔓 Open' : status === 'sealed' ? '🔒 Sealed' : '✨ Unlocked'}
      </Badge>
    );
  };

  const handleSealCapsule = (capsuleId: string, unlockDate: string) => {
    setCapsules(prev => prev.map(c => 
      c.id === capsuleId 
        ? { 
            ...c, 
            status: 'sealed', 
            sealedAt: new Date().toISOString(),
            unlockDate 
          }
        : c
    ));
    setShowSealModal(false);
  };

  const handleAddSubmission = (capsuleId: string, submission: Partial<CapsuleSubmission>) => {
    const newSubmission: CapsuleSubmission = {
      id: `sub-${Date.now()}`,
      capsuleId,
      userId: 'user-1',
      type: submission.type || 'text',
      title: submission.title || '',
      content: submission.content || '',
      category: submission.category || 'other',
      month: submission.month,
      tags: submission.tags || [],
      likes: 0,
      comments: 0,
      createdAt: new Date().toISOString(),
      isPinned: false
    };
    
    setCapsules(prev => prev.map(c => 
      c.id === capsuleId 
        ? { ...c, submissions: [...c.submissions, newSubmission] }
        : c
    ));
    setShowSubmitModal(false);
  };

  return (
    <NostalgiaBackground>
      <div className="min-h-screen py-12 px-4">
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
                <h1 className="text-4xl md:text-5xl font-bold text-retro-dark mb-2">
                  MyCapsule
                </h1>
                <p className="text-xl text-retro-gray">
                  Create and manage your personal time capsules
                </p>
              </div>
              
              {/* User Profile Summary */}
              <Card className="shrink-0">
                <CardContent className="p-4">
                  <div className="flex items-center gap-4">
                    <img 
                      src={mockUser.avatarUrl} 
                      alt={mockUser.displayName}
                      className="w-16 h-16 rounded-full bg-retro-teal/20"
                    />
                    <div>
                      <p className="font-bold text-retro-dark">{mockUser.displayName}</p>
                      <p className="text-sm text-retro-gray">@{mockUser.username}</p>
                      <div className="flex gap-2 text-sm mt-1">
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
              {(['capsules', 'gallery', 'friends'] as const).map((tab) => (
                <Button
                  key={tab}
                  variant={activeTab === tab ? 'default' : 'outline'}
                  onClick={() => setActiveTab(tab)}
                  className="capitalize"
                >
                  {tab === 'capsules' && '📦'} {tab === 'gallery' && '🖼️'} {tab === 'friends' && '👥'}
                  {' '}{tab}
                </Button>
              ))}
            </div>
          </AnimatedSection>

          {/* Create New Capsule Button */}
          <AnimatedSection animation="fadeUp" delay={0.2}>
            <div className="text-center mb-8">
              <Button 
                size="lg" 
                onClick={() => {
                  const newCapsule: PersonalCapsule = {
                    id: `capsule-${Date.now()}`,
                    userId: 'user-1',
                    year: new Date().getFullYear(),
                    title: `My ${new Date().getFullYear()} Time Capsule`,
                    description: 'Start building your capsule!',
                    status: 'open',
                    visibility: 'public',
                    createdAt: new Date().toISOString(),
                    updatedAt: new Date().toISOString(),
                    submissions: [],
                    isFavorite: false
                  };
                  setCapsules([newCapsule, ...capsules]);
                }}
              >
                ➕ Create New Capsule
              </Button>
            </div>
          </AnimatedSection>

          {/* Capsules Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {capsules.map((capsule, index) => (
              <AnimatedSection key={capsule.id} animation="fadeUp" delay={index * 0.1}>
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.2 }}
                >
                  <Card 
                    className={cn(
                      'h-full cursor-pointer transition-all duration-300',
                      selectedCapsule?.id === capsule.id && 'ring-2 ring-retro-teal'
                    )}
                    onClick={() => setSelectedCapsule(capsule)}
                  >
                    {capsule.coverImage && (
                      <div 
                        className="h-40 bg-cover bg-center rounded-t-xl"
                        style={{ backgroundImage: `url(${capsule.coverImage})` }}
                      />
                    )}
                    <CardHeader className="pb-2">
                      <div className="flex items-center justify-between">
                        <Badge variant="outline">{capsule.year}</Badge>
                        {getStatusBadge(capsule.status)}
                      </div>
                      <CardTitle className="text-xl">{capsule.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-retro-gray text-sm mb-4 line-clamp-2">
                        {capsule.description}
                      </p>
                      
                      {/* Submissions Preview */}
                      <div className="flex gap-2 mb-4">
                        {capsule.submissions.slice(0, 3).map((sub, i) => (
                          <div 
                            key={sub.id}
                            className="w-10 h-10 rounded-full bg-retro-teal/20 flex items-center justify-center text-lg"
                          >
                            {sub.type === 'image' && '📷'}
                            {sub.type === 'video' && '🎬'}
                            {sub.type === 'text' && '📝'}
                            {sub.type === 'audio' && '🎵'}
                          </div>
                        ))}
                        {capsule.submissions.length > 3 && (
                          <div className="w-10 h-10 rounded-full bg-retro-purple/20 flex items-center justify-center text-sm font-bold">
                            +{capsule.submissions.length - 3}
                          </div>
                        )}
                      </div>

                      {/* Actions */}
                      <div className="flex gap-2">
                        {capsule.status === 'open' && (
                          <>
                            <Button 
                              size="sm" 
                              variant="outline"
                              onClick={(e) => {
                                e.stopPropagation();
                                setSelectedCapsule(capsule);
                                setShowSubmitModal(true);
                              }}
                              className="flex-1"
                            >
                              ➕ Add
                            </Button>
                            <Button 
                              size="sm"
                              onClick={(e) => {
                                e.stopPropagation();
                                setSelectedCapsule(capsule);
                                setShowSealModal(true);
                              }}
                              className="flex-1"
                            >
                              🔒 Seal
                            </Button>
                          </>
                        )}
                        {capsule.status === 'sealed' && capsule.shareCode && (
                          <Button size="sm" variant="outline" className="flex-1">
                            🔗 Share
                          </Button>
                        )}
                        {capsule.status === 'open' && capsule.visibility === 'public' && (
                          <Button size="sm" variant="outline" className="flex-1">
                            👥 Public
                          </Button>
                        )}
                      </div>

                      {/* Seal Info */}
                      {capsule.status === 'sealed' && capsule.unlockDate && (
                        <div className="mt-3 p-2 bg-red-50 rounded-lg text-center">
                          <p className="text-xs text-retro-gray">Unlocks</p>
                          <p className="font-bold text-red-600">
                            {new Date(capsule.unlockDate).toLocaleDateString()}
                          </p>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </motion.div>
              </AnimatedSection>
            ))}
          </div>

          {/* Seal Modal */}
          <AnimatePresence>
            {showSealModal && selectedCapsule && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
                onClick={() => setShowSealModal(false)}
              >
                <motion.div
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.9, opacity: 0 }}
                  className="bg-white rounded-2xl p-6 max-w-md w-full"
                  onClick={(e) => e.stopPropagation()}
                >
                  <h2 className="text-2xl font-bold text-retro-dark mb-4">
                    🔒 Seal Your Capsule
                  </h2>
                  <p className="text-retro-gray mb-4">
                    Once sealed, your capsule cannot be modified until the unlock date.
                    You can still view and share it!
                  </p>
                  
                  <div className="mb-4">
                    <label className="block text-sm font-medium mb-2">Unlock Date</label>
                    <select 
                      className="w-full p-2 border rounded-lg"
                      id="unlock-date"
                      defaultValue="2025-12-31"
                    >
                      <option value="2025-01-01">January 1, 2025</option>
                      <option value="2025-06-01">June 1, 2025</option>
                      <option value="2025-12-31">December 31, 2025</option>
                      <option value="2030-01-01">January 1, 2030</option>
                      <option value="2035-01-01">January 1, 2035</option>
                    </select>
                  </div>

                  <div className="flex gap-2">
                    <Button 
                      variant="outline" 
                      onClick={() => setShowSealModal(false)}
                      className="flex-1"
                    >
                      Cancel
                    </Button>
                    <Button 
                      onClick={() => {
                        const unlockDate = (document.getElementById('unlock-date') as HTMLSelectElement).value;
                        handleSealCapsule(selectedCapsule.id, unlockDate);
                      }}
                      className="flex-1"
                    >
                      🔒 Seal It!
                    </Button>
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Submit Modal */}
          <AnimatePresence>
            {showSubmitModal && selectedCapsule && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
                onClick={() => setShowSubmitModal(false)}
              >
                <motion.div
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.9, opacity: 0 }}
                  className="bg-white rounded-2xl p-6 max-w-md w-full"
                  onClick={(e) => e.stopPropagation()}
                >
                  <h2 className="text-2xl font-bold text-retro-dark mb-4">
                    ➕ Add to Your Capsule
                  </h2>
                  
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">Type</label>
                      <div className="flex gap-2 flex-wrap">
                        {(['image', 'video', 'text', 'audio'] as const).map((type) => (
                          <Button
                            key={type}
                            variant="outline"
                            size="sm"
                            onClick={() => {
                              handleAddSubmission(selectedCapsule.id, {
                                type,
                                title: `New ${type}`,
                                content: type === 'image' ? 'https://example.com/image.jpg' : 'Sample content',
                                category: 'other',
                                month: 'December'
                              });
                            }}
                          >
                            {type === 'image' && '📷'}
                            {type === 'video' && '🎬'}
                            {type === 'text' && '📝'}
                            {type === 'audio' && '🎵'}
                            {' '}{type.charAt(0).toUpperCase() + type.slice(1)}
                          </Button>
                        ))}
                      </div>
                    </div>

                    <p className="text-sm text-retro-gray">
                      Quick add demo: Click any type above to add a sample submission to your capsule!
                    </p>
                  </div>

                  <div className="mt-4">
                    <Button 
                      variant="outline" 
                      onClick={() => setShowSubmitModal(false)}
                      className="w-full"
                    >
                      Close
                    </Button>
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </NostalgiaBackground>
  );
}
