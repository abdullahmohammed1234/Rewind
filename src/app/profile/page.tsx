'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { doc, getDoc, query, where, getDocs, collection } from 'firebase/firestore';
import { db } from '@/lib/firebase/config';
import { useAuth } from '@/components/providers';
import { AnimatedSection } from '@/components/features/animated-section';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { LoadingSpinner } from '@/components/ui/loading-spinner';

// User profile interface
interface UserProfile {
  id: string;
  displayName: string;
  email: string;
  avatarUrl: string | null;
  bio: string;
  followers: number;
  following: number;
  capsulesCount: number;
  isPrivate: boolean;
}

// Capsule interface
interface Capsule {
  id: string;
  userId: string;
  title: string;
  description: string;
  yearId: string;
  isSealed: boolean;
  sealedUntil?: string;
  isPublic: boolean;
  entries: any[];
  likes: number;
  shares: number;
}

export default function ProfilePage() {
  const { user, loading: authLoading } = useAuth();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [capsules, setCapsules] = useState<Capsule[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'capsules' | 'liked' | 'shared'>('capsules');

  // Fetch user profile and capsules
  useEffect(() => {
    const fetchProfileData = async () => {
      if (authLoading) return;

      if (user) {
        // Fetch current user's profile from Firestore
        try {
          const userDoc = await getDoc(doc(db, 'users', user.uid));
          if (userDoc.exists()) {
            setProfile({ id: userDoc.id, ...userDoc.data() } as UserProfile);
          } else {
            // Create profile from auth data if doesn't exist
            setProfile({
              id: user.uid,
              displayName: user.displayName || 'User',
              email: user.email || '',
              avatarUrl: user.photoURL,
              bio: '',
              followers: 0,
              following: 0,
              capsulesCount: 0,
              isPrivate: false,
            });
          }

          // Fetch user's capsules
          const q = query(collection(db, 'capsules'), where('userId', '==', user.uid));
          const capsulesSnapshot = await getDocs(q);
          const capsulesData: Capsule[] = [];
          capsulesSnapshot.forEach((doc) => {
            capsulesData.push({ id: doc.id, ...doc.data() } as Capsule);
          });
          setCapsules(capsulesData);
        } catch (error) {
          console.error('Error fetching profile:', error);
          // Use auth data as fallback
          setProfile({
            id: user.uid,
            displayName: user.displayName || 'User',
            email: user.email || '',
            avatarUrl: user.photoURL,
            bio: '',
            followers: 0,
            following: 0,
            capsulesCount: 0,
            isPrivate: false,
          });
        }
      }
      setLoading(false);
    };

    fetchProfileData();
  }, [user, authLoading]);

  // Show loading state
  if (authLoading || loading) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center">
        <LoadingSpinner size="large" />
      </div>
    );
  }

  // Show message if not logged in
  if (!user) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">🔐</div>
          <h2 className="text-2xl font-bold text-white mb-2">Sign in to view your profile</h2>
          <p className="text-gray-400 mb-6">Create an account to start building your time capsules!</p>
          <Link href="/auth/login">
            <Button className="bg-gradient-to-r from-[#FF6B9D] to-[#C44FFF]">
              Sign In
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  const displayProfile = profile || {
    id: user.uid,
    displayName: user.displayName || 'User',
    email: user.email || '',
    avatarUrl: user.photoURL,
    bio: '',
    followers: 0,
    following: 0,
    capsulesCount: capsules.length,
    isPrivate: false,
  };

  const userCapsules = capsules.filter(c => c.userId === displayProfile.id);
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
                className="w-32 h-32 rounded-full overflow-hidden bg-gradient-to-r from-[#FF6B9D] to-[#C44FFF] flex items-center justify-center mb-4 border-4 border-[#0a0a0a]"
              >
                {displayProfile.avatarUrl ? (
                  <img
                    src={displayProfile.avatarUrl}
                    alt={displayProfile.displayName}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <span className="text-6xl">👤</span>
                )}
              </motion.div>

              {/* User info */}
              <h1 className="text-3xl font-bold text-white mb-1">
                {displayProfile.displayName}
              </h1>
              <p className="text-gray-400 mb-3">@{displayProfile.email?.split('@')[0] || 'user'}</p>
              {displayProfile.bio && (
                <p className="text-gray-500 max-w-md mb-4">{displayProfile.bio}</p>
              )}

              {/* Stats */}
              <div className="flex gap-8 mb-6">
                <div className="text-center">
                  <div className="text-2xl font-bold text-white">{userCapsules.length}</div>
                  <div className="text-sm text-gray-400">Capsules</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-white">{displayProfile.followers}</div>
                  <div className="text-sm text-gray-400">Followers</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-white">{displayProfile.following}</div>
                  <div className="text-sm text-gray-400">Following</div>
                </div>
              </div>

              {/* Action buttons */}
              <div className="flex gap-3">
                <Link href="/my-capsule">
                  <Button className="bg-gradient-to-r from-[#FF6B9D] to-[#C44FFF] hover:opacity-90">
                    Edit Profile
                  </Button>
                </Link>
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
              {/* All Capsules Grid */}
              <AnimatedSection animation="fadeUp" delay={0.1}>
                <h3 className="text-lg font-semibold text-gray-400 mb-4">Your Capsules</h3>
                {userCapsules.length === 0 ? (
                  <div className="text-center py-12">
                    <span className="text-6xl mb-4 block">📼</span>
                    <h4 className="text-xl font-bold text-white mb-2">No capsules yet</h4>
                    <p className="text-gray-400 mb-6">Create your first time capsule to preserve your memories!</p>
                    <Link href="/my-capsule">
                      <Button className="bg-gradient-to-r from-[#FF6B9D] to-[#C44FFF]">
                        Create Capsule
                      </Button>
                    </Link>
                  </div>
                ) : (
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
                            <span className="text-gray-400">❤️ {capsule.likes || 0}</span>
                            <span className="text-gray-400">🔗 {capsule.shares || 0}</span>
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
                    <Link href="/my-capsule">
                      <motion.div
                        whileHover={{ y: -5, scale: 1.02 }}
                        className="p-6 rounded-2xl border-2 border-dashed border-white/20 hover:border-[#C44FFF]/50 cursor-pointer transition-all flex flex-col items-center justify-center min-h-[200px]"
                      >
                        <span className="text-4xl mb-3">➕</span>
                        <p className="text-white font-semibold">Create New</p>
                      </motion.div>
                    </Link>
                  </div>
                )}
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
                <Link href="/my-capsule">
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
      {userCapsules.length > 0 && (
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
      )}
    </div>
  );
}
