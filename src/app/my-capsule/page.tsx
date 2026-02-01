'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { NostalgiaBackground } from '@/components/features/nostalgia-background';
import { PersonalizedWrapped } from '@/components/features/personalized-wrapped';
import { AnimatedSection } from '@/components/features/animated-section';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { years, categories } from '@/data/seed';
import { cn } from '@/lib/utils';
import { db } from '@/lib/firebase';
import { useAuth } from '@/components/providers';
import { 
  collection, 
  doc, 
  getDocs, 
  addDoc, 
  deleteDoc, 
  updateDoc, 
  query, 
  where,
  orderBy,
  serverTimestamp 
} from 'firebase/firestore';

// Types for the capsule (matching original structure)
interface CapsuleSubmission {
  id: string;
  capsuleId: string;
  userId: string;
  type: 'image' | 'video' | 'text';
  title: string;
  content: string;
  category: string;
  month: string;
  tags: string[];
  likes: number;
  comments: number;
  createdAt: string;
  isPinned: boolean;
}

interface Capsule {
  id: string;
  userId: string;
  year: number;
  title: string;
  description: string;
  status: 'open' | 'sealed' | 'unlocked';
  visibility: 'public' | 'friends' | 'private';
  createdAt: string;
  updatedAt: string;
  sealedAt?: string;
  unlockDate?: string;
  submissions: CapsuleSubmission[];
  coverImage?: string;
  isFavorite?: boolean;
  shareCode?: string;
}

const MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

// Icons (inline SVG components)
const X = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
  </svg>
);

const Globe = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
  </svg>
);

const Users = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
  </svg>
);

const Lock = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
  </svg>
);

const Plus = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
  </svg>
);

const Save = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" />
  </svg>
);

export default function MyCapsulePage() {
  const { user, loading: authLoading } = useAuth();
  const [capsules, setCapsules] = useState<Capsule[]>([]);
  const [selectedCapsule, setSelectedCapsule] = useState<Capsule | null>(null);
  const [showSealModal, setShowSealModal] = useState(false);
  const [showSubmitModal, setShowSubmitModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [activeTab, setActiveTab] = useState<'capsules' | 'gallery' | 'friends' | 'wrapped'>('capsules');
  const [pageLoading, setPageLoading] = useState(true);

  // Form states
  const [createForm, setCreateForm] = useState({
    year: new Date().getFullYear(),
    title: '',
    description: '',
    coverImage: '',
    visibility: 'public' as 'public' | 'friends' | 'private'
  });

  const [editForm, setEditForm] = useState({
    title: '',
    description: '',
    coverImage: '',
    visibility: 'public' as 'public' | 'friends' | 'private'
  });

  const [sealDate, setSealDate] = useState('');
  const [sealWarning, setSealWarning] = useState(false);

  // Submission form state
  const [submissionForm, setSubmissionForm] = useState({
    title: '',
    description: '',
    type: 'text' as 'image' | 'video' | 'text',
    category: 'other',
    month: MONTHS[new Date().getMonth()],
    content: ''
  });

  // Load capsules from Firebase on mount
  useEffect(() => {
    const loadCapsules = async () => {
      // If not logged in, clear capsules and show empty state
      if (!user) {
        setCapsules([]);
        setPageLoading(false);
        return;
      }
      
      try {
        const capsulesRef = collection(db, 'capsules');
        const q = query(capsulesRef, orderBy('createdAt', 'desc'));
        const querySnapshot = await getDocs(q);
        
        console.log('Found', querySnapshot.size, 'capsules in Firebase');
        
        const loadedCapsules: Capsule[] = [];
        querySnapshot.forEach((doc) => {
          const data = doc.data();
          console.log('Capsule:', doc.id, 'userId:', data.userId);
          
          // Accept capsules for current user OR demo user 'user-1'
          if (data.userId === user.uid || data.userId === 'user-1') {
            loadedCapsules.push({
              id: doc.id,
              userId: data.userId,
              year: data.year,
              title: data.title,
              description: data.description,
              status: data.status,
              visibility: data.visibility,
              createdAt: data.createdAt?.toDate?.()?.toISOString() || data.createdAt,
              updatedAt: data.updatedAt?.toDate?.()?.toISOString() || data.updatedAt,
              sealedAt: data.sealedAt,
              unlockDate: data.unlockDate,
              submissions: data.submissions || [],
              coverImage: data.coverImage,
              isFavorite: data.isFavorite,
              shareCode: data.shareCode
            });
          }
        });
        
        console.log('Loaded capsules:', loadedCapsules.length);
        setCapsules(loadedCapsules);
      } catch (error) {
        console.error('Error loading capsules:', error);
        setCapsules([]);
      } finally {
        setPageLoading(false);
      }
    };
    
    loadCapsules();
  }, [user]);

  const CURRENT_YEAR = new Date().getFullYear();

  const getStatusBadge = (status: Capsule['status']) => {
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

  const handleSealCapsule = async () => {
    if (!selectedCapsule) return;
    
    if (!sealWarning) {
      setSealWarning(true);
      return;
    }
    
    const updatedCapsule: Partial<Capsule> = {
      status: 'sealed' as const,
      sealedAt: new Date().toISOString(),
      unlockDate: sealDate
    };
    
    try {
      // Update in Firebase
      const capsuleRef = doc(db, 'capsules', selectedCapsule.id);
      await updateDoc(capsuleRef, {
        ...updatedCapsule,
        updatedAt: serverTimestamp()
      });
      
      // Update local state
      setCapsules(prev => prev.map(c => 
        c.id === selectedCapsule.id 
          ? { ...c, ...updatedCapsule, updatedAt: new Date().toISOString() }
          : c
      ));
      
      setShowSealModal(false);
      setSealWarning(false);
    } catch (error) {
      console.error('Error sealing capsule:', error);
      alert('Failed to seal capsule. Please try again.');
    }
  };

  const handleAddSubmission = async () => {
    if (!selectedCapsule) return;
    
    // For images, require a URL
    if (submissionForm.type === 'image' && !submissionForm.content.trim()) {
      alert('Please enter a picture URL for image submissions');
      return;
    }
    
    const newSubmission = {
      id: `sub-${Date.now()}`,
      capsuleId: selectedCapsule.id,
      userId: 'user-1',
      type: submissionForm.type,
      title: submissionForm.title || `New ${submissionForm.type}`,
      content: submissionForm.content || 'Sample content',
      category: submissionForm.category,
      month: submissionForm.month,
      tags: [],
      likes: 0,
      comments: 0,
      createdAt: new Date().toISOString(),
      isPinned: false
    };
    
    try {
      // Update in Firebase
      const capsuleRef = doc(db, 'capsules', selectedCapsule.id);
      const updatedSubmissions = [...selectedCapsule.submissions, newSubmission];
      await updateDoc(capsuleRef, {
        submissions: updatedSubmissions,
        updatedAt: serverTimestamp()
      });
      
      // Update local state
      setCapsules(prev => prev.map(c => 
        c.id === selectedCapsule.id 
          ? { ...c, submissions: updatedSubmissions, updatedAt: new Date().toISOString() }
          : c
      ));
      
      setShowSubmitModal(false);
      setSubmissionForm({
        title: '',
        description: '',
        type: 'text',
        category: 'other',
        month: MONTHS[new Date().getMonth()],
        content: ''
      });
    } catch (error) {
      console.error('Error adding submission:', error);
      alert('Failed to add submission. Please try again.');
    }
  };

  const handleDeleteCapsule = async (capsuleId: string) => {
    try {
      // Delete from Firebase
      await deleteDoc(doc(db, 'capsules', capsuleId));
      
      // Update local state
      setCapsules(prev => prev.filter(c => c.id !== capsuleId));
      if (selectedCapsule?.id === capsuleId) {
        setSelectedCapsule(null);
      }
    } catch (error) {
      console.error('Error deleting capsule:', error);
      alert('Failed to delete capsule. Please try again.');
    }
  };

  // Get available seal dates based on current date
  const getSealDateOptions = () => {
    const options: { value: string; label: string }[] = [];
    const now = new Date();
    const currentYear = now.getFullYear();
    
    // Start from next month
    const startMonth = now.getMonth() + 1;
    
    for (let year = currentYear; year <= currentYear + 10; year++) {
      const startM = year === currentYear ? startMonth : 0;
      for (let month = startM; month < 12; month++) {
        const monthName = MONTHS[month];
        const day = new Date(year, month + 1, 0).getDate();
        const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
        options.push({ value: dateStr, label: `${monthName} ${day}, ${year}` });
      }
    }
    return options.slice(0, 50);
  };

  const handleCreateCapsule = async () => {
    if (!user) {
      alert('Please log in to create a capsule');
      return;
    }
    
    const capsuleData = {
      userId: user.uid,
      year: createForm.year,
      title: createForm.title || `My ${createForm.year} Time Capsule`,
      description: createForm.description || 'Start building your capsule!',
      coverImage: createForm.coverImage || null,
      status: 'open',
      visibility: createForm.visibility,
      submissions: [],
      isFavorite: false,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    };
    
    try {
      // Save to Firebase
      const docRef = await addDoc(collection(db, 'capsules'), capsuleData);
      
      // Update local state with the new capsule (using the Firebase ID)
      const newCapsule: Capsule = {
        id: docRef.id,
        ...capsuleData,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        status: 'open' as const,
        coverImage: createForm.coverImage || undefined
      };
      
      setCapsules(prev => [newCapsule, ...prev]);
      setShowCreateModal(false);
      setCreateForm({
        year: new Date().getFullYear(),
        title: '',
        description: '',
        coverImage: '',
        visibility: 'public'
      });
    } catch (error) {
      console.error('Error creating capsule:', error);
      alert('Failed to create capsule. Please try again.');
    }
  };

  const handleEditCapsule = () => {
    if (!selectedCapsule) return;
    
    setCapsules(prev => prev.map(c => 
      c.id === selectedCapsule.id 
        ? { 
            ...c, 
            title: editForm.title,
            description: editForm.description,
            coverImage: editForm.coverImage,
            visibility: editForm.visibility,
            updatedAt: new Date().toISOString()
          }
        : c
    ));
    
    setShowEditModal(false);
  };

  const openEditModal = (capsule: Capsule) => {
    setSelectedCapsule(capsule);
    setEditForm({
      title: capsule.title,
      description: capsule.description,
      coverImage: capsule.coverImage || '',
      visibility: capsule.visibility
    });
    setShowEditModal(true);
  };

  // Show loading state
  if (authLoading || pageLoading) {
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

  // Show login prompt when not logged in
  if (!user) {
    return (
      <NostalgiaBackground>
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <div className="text-6xl mb-4">🔒</div>
            <h2 className="text-2xl font-bold text-white mb-2">Log In to View Your Capsules</h2>
            <p className="text-gray-400">Sign in to access your time capsules</p>
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
                onClick={() => setShowCreateModal(true)}
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
                          {getStatusBadge(capsule.status)}
                        </div>
                        {capsule.isFavorite && (
                          <div className="absolute top-2 left-2">
                            <span className="text-xl">⭐</span>
                          </div>
                        )}
                      </div>
                      <CardContent className="p-4">
                        <h3 className="text-xl font-bold text-white mb-1">{capsule.title}</h3>
                        <p className="text-gray-400 text-sm mb-3">{capsule.description}</p>
                        <div className="flex justify-between items-center text-sm text-gray-500 mb-3">
                          <span>📝 {capsule.submissions.length} submissions</span>
                          <span>👥 {capsule.visibility}</span>
                        </div>
                        
                        {/* Action Buttons */}
                        <div className="flex gap-2 mt-3">
                          {capsule.status === 'open' && (
                            <>
                              <Button 
                                size="sm" 
                                variant="outline" 
                                className="flex-1 bg-blue-500/20 border-blue-500/50 text-blue-400 hover:bg-blue-500/30"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setSelectedCapsule(capsule);
                                  setSubmissionForm(prev => ({ ...prev, month: MONTHS[new Date().getMonth()] }));
                                  setShowSubmitModal(true);
                                }}
                              >
                                ➕ Add
                              </Button>
                              <Button 
                                size="sm" 
                                variant="outline" 
                                className="flex-1 bg-purple-500/20 border-purple-500/50 text-purple-400 hover:bg-purple-500/30"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  openEditModal(capsule);
                                }}
                              >
                                ✏️ Edit
                              </Button>
                              
                              <Button 
                                size="sm" 
                                variant="outline"
                                className ="flex-1 bg-red-500/20 border-red-500/50 text-red-400 hover:bg-red-500/30"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleDeleteCapsule(capsule.id);
                                }}
                              >
                                🗑️ Delete
                              </Button>
                              <Button 
                                size="sm" 
                                variant="outline"
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
                        </div>

                        {/* Seal Info */}
                        {capsule.status === 'sealed' && capsule.unlockDate && (
                          <div className="mt-3 p-2 bg-red-500/20 rounded-lg text-center">
                            <p className="text-xs text-gray-400">Unlocks</p>
                            <p className="font-bold text-red-400">
                              {new Date(capsule.unlockDate).toLocaleDateString()}
                            </p>
                          </div>
                        )}
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
                {capsules.flatMap(c => c.submissions.map((sub, index) => (
                  <motion.div
                    key={`${c.id}-${sub.id}-${index}`}
                    whileHover={{ scale: 1.05 }}
                    className="aspect-square rounded-lg overflow-hidden bg-black/50"
                  >
                    {sub.type === 'image' && sub.content ? (
                      <img 
                        src={sub.content} 
                        alt={sub.title}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center p-4 text-center text-gray-400">
                        <div>
                          <span className="text-4xl block mb-2">
                            {sub.type === 'text' && '📝'}
                            {sub.type === 'video' && '🎬'}
                          </span>
                          <p className="text-sm">{sub.title}</p>
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
              <PersonalizedWrapped />
            </AnimatedSection>
          )}

          {/* Create Capsule Modal */}
          <AnimatePresence>
            {showCreateModal && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4"
                onClick={() => setShowCreateModal(false)}
              >
                <motion.div
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.9, opacity: 0 }}
                  className="bg-gray-900 rounded-2xl p-6 max-w-md w-full border border-white/20"
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold text-white">📦 Create New Capsule</h2>
                    <Button variant="ghost" onClick={() => setShowCreateModal(false)} className="text-gray-400 hover:text-white">
                      <X className="w-6 h-6" />
                    </Button>
                  </div>
                  
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium mb-2 text-gray-300">Year</label>
                      <select 
                        className="w-full p-3 rounded-lg bg-white/10 border border-white/20 text-white"
                        value={createForm.year}
                        onChange={(e) => setCreateForm(prev => ({ ...prev, year: parseInt(e.target.value) }))}
                      >
                        {years.filter(y => y.year <= CURRENT_YEAR + 1).map(y => (
                          <option key={y.id} value={y.year} className="bg-gray-900">{y.year}</option>
                        ))}
                      </select>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium mb-2 text-gray-300">Title</label>
                      <input 
                        type="text"
                        className="w-full p-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-gray-500"
                        placeholder={`My ${createForm.year} Time Capsule`}
                        value={createForm.title}
                        onChange={(e) => setCreateForm(prev => ({ ...prev, title: e.target.value }))}
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium mb-2 text-gray-300">Description</label>
                      <textarea 
                        className="w-full p-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-gray-500 resize-none"
                        placeholder="Describe your capsule..."
                        rows={3}
                        value={createForm.description}
                        onChange={(e) => setCreateForm(prev => ({ ...prev, description: e.target.value }))}
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium mb-2 text-gray-300">
                        Cover Image URL <span className="text-gray-500">(optional)</span>
                      </label>
                      <input 
                        type="text"
                        className="w-full p-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-gray-500"
                        placeholder="https://example.com/image.jpg"
                        value={createForm.coverImage}
                        onChange={(e) => setCreateForm(prev => ({ ...prev, coverImage: e.target.value }))}
                      />
                      <p className="text-xs text-gray-500 mt-1">Leave empty for default cover</p>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium mb-2 text-gray-300">Privacy</label>
                      <div className="flex gap-2">
                        {(['public', 'friends', 'private'] as const).map((vis) => (
                          <Button
                            key={vis}
                            variant={createForm.visibility === vis ? 'default' : 'outline'}
                            onClick={() => setCreateForm(prev => ({ ...prev, visibility: vis }))}
                            className={createForm.visibility === vis 
                              ? 'bg-purple-500 text-white' 
                              : 'border-white/30 text-white hover:bg-white/10'}
                          >
                            {vis === 'public' && <Globe className="w-4 h-4 mr-1" />}
                            {vis === 'friends' && <Users className="w-4 h-4 mr-1" />}
                            {vis === 'private' && <Lock className="w-4 h-4 mr-1" />}
                            {vis.charAt(0).toUpperCase() + vis.slice(1)}
                          </Button>
                        ))}
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex gap-2 mt-6">
                    <Button 
                      variant="outline" 
                      onClick={() => setShowCreateModal(false)}
                      className="flex-1 border-white/30 text-white hover:bg-white/10"
                    >
                      Cancel
                    </Button>
                    <Button 
                      onClick={handleCreateCapsule}
                      className="flex-1 bg-gradient-to-r from-purple-500 to-pink-500 text-white"
                    >
                      <Plus className="w-4 h-4 mr-1" />
                      Create
                    </Button>
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Edit Capsule Modal */}
          <AnimatePresence>
            {showEditModal && selectedCapsule && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4"
                onClick={() => setShowEditModal(false)}
              >
                <motion.div
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.9, opacity: 0 }}
                  className="bg-gray-900 rounded-2xl p-6 max-w-md w-full border border-white/20"
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold text-white">✏️ Edit Capsule</h2>
                    <Button variant="ghost" onClick={() => setShowEditModal(false)} className="text-gray-400 hover:text-white">
                      <X className="w-6 h-6" />
                    </Button>
                  </div>
                  
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium mb-2 text-gray-300">Title</label>
                      <input 
                        type="text"
                        className="w-full p-3 rounded-lg bg-white/10 border border-white/20 text-white"
                        value={editForm.title}
                        onChange={(e) => setEditForm(prev => ({ ...prev, title: e.target.value }))}
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium mb-2 text-gray-300">Description</label>
                      <textarea 
                        className="w-full p-3 rounded-lg bg-white/10 border border-white/20 text-white resize-none"
                        rows={3}
                        value={editForm.description}
                        onChange={(e) => setEditForm(prev => ({ ...prev, description: e.target.value }))}
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium mb-2 text-gray-300">Cover Image URL</label>
                      <input 
                        type="text"
                        className="w-full p-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-gray-500"
                        placeholder="https://example.com/image.jpg"
                        value={editForm.coverImage}
                        onChange={(e) => setEditForm(prev => ({ ...prev, coverImage: e.target.value }))}
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium mb-2 text-gray-300">Privacy</label>
                      <div className="flex gap-2">
                        {(['public', 'friends', 'private'] as const).map((vis) => (
                          <Button
                            key={vis}
                            variant={editForm.visibility === vis ? 'default' : 'outline'}
                            onClick={() => setEditForm(prev => ({ ...prev, visibility: vis }))}
                            className={editForm.visibility === vis 
                              ? 'bg-purple-500 text-white' 
                              : 'border-white/30 text-white hover:bg-white/10'}
                          >
                            {vis === 'public' && <Globe className="w-4 h-4 mr-1" />}
                            {vis === 'friends' && <Users className="w-4 h-4 mr-1" />}
                            {vis === 'private' && <Lock className="w-4 h-4 mr-1" />}
                          </Button>
                        ))}
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex gap-2 mt-6">
                    <Button 
                      variant="outline" 
                      onClick={() => setShowEditModal(false)}
                      className="flex-1 border-white/30 text-white hover:bg-white/10"
                    >
                      Cancel
                    </Button>
                    <Button 
                      onClick={handleEditCapsule}
                      className="flex-1 bg-gradient-to-r from-purple-500 to-pink-500 text-white"
                    >
                      <Save className="w-4 h-4 mr-1" />
                      Save
                    </Button>
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Seal Modal */}
          <AnimatePresence>
            {showSealModal && selectedCapsule && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4"
                onClick={() => { setShowSealModal(false); setSealWarning(false); }}
              >
                <motion.div
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.9, opacity: 0 }}
                  className="bg-gray-900 rounded-2xl p-6 max-w-md w-full border border-white/20"
                  onClick={(e) => e.stopPropagation()}
                >
                  <h2 className="text-2xl font-bold text-white mb-4">
                    🔒 Seal Your Capsule
                  </h2>
                  
                  {!sealWarning ? (
                    <>
                      <p className="text-gray-300 mb-4">
                        Once sealed, your capsule cannot be modified until the unlock date.
                        You can still view and share it!
                      </p>
                      
                      <div className="mb-4">
                        <label className="block text-sm font-medium mb-2 text-gray-300">Unlock Date</label>
                        <select 
                          className="w-full p-3 rounded-lg bg-white/10 border border-white/20 text-white"
                          value={sealDate}
                          onChange={(e) => setSealDate(e.target.value)}
                        >
                          {getSealDateOptions().map(opt => (
                            <option key={opt.value} value={opt.value} className="bg-gray-900">
                              {opt.label}
                            </option>
                          ))}
                        </select>
                      </div>
                    </>
                  ) : (
                    <div className="mb-4 p-4 bg-red-500/20 rounded-lg border border-red-500/50">
                      <p className="text-red-300 font-medium text-center">
                        ⚠️ Are you sure you want to seal this capsule?
                      </p>
                      <p className="text-gray-400 text-sm text-center mt-2">
                        This action cannot be undone until {new Date(sealDate).toLocaleDateString()}
                      </p>
                    </div>
                  )}
                  
                  <div className="flex gap-2">
                    <Button 
                      variant="outline" 
                      onClick={() => { setShowSealModal(false); setSealWarning(false); }}
                      className="flex-1 border-white/30 text-white hover:bg-white/10"
                    >
                      Cancel
                    </Button>
                    <Button 
                      onClick={handleSealCapsule}
                      className={sealWarning 
                        ? 'flex-1 bg-red-500 hover:bg-red-600 text-white' 
                        : 'flex-1 bg-gradient-to-r from-purple-500 to-pink-500 text-white'}
                    >
                      {sealWarning ? '🔒 Seal It!' : 'Continue'}
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
                  className="bg-gray-900 rounded-2xl p-6 max-w-md w-full border border-white/20"
                  onClick={(e) => e.stopPropagation()}
                >
                  <h2 className="text-2xl font-bold text-white mb-4">
                    ➕ Add to Your Capsule
                  </h2>
                  
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium mb-2 text-gray-300">Title</label>
                      <input 
                        type="text"
                        className="w-full p-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-gray-500"
                        placeholder="Enter a title"
                        value={submissionForm.title}
                        onChange={(e) => setSubmissionForm(prev => ({ ...prev, title: e.target.value }))}
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium mb-2 text-gray-300">Type</label>
                      <div className="flex gap-2 flex-wrap">
                        {(['image', 'video', 'text'] as const).map((type) => (
                          <Button
                            key={type}
                            variant={submissionForm.type === type ? 'default' : 'outline'}
                            size="sm"
                            onClick={() => setSubmissionForm(prev => ({ ...prev, type }))}
                            className={submissionForm.type === type 
                              ? 'bg-retro-teal text-white' 
                              : 'border-white/30 text-white hover:bg-white/10'}
                          >
                            {type === 'image' && '📷'}
                            {type === 'video' && '🎬'}
                            {type === 'text' && '📝'}
                            {' '}{type.charAt(0).toUpperCase() + type.slice(1)}
                          </Button>
                        ))}
                      </div>
                    </div>
                    
                    {/* Picture URL - Optional */}
                    {(submissionForm.type === 'image') && (
                      <div>
                        <label className="block text-sm font-medium mb-2 text-gray-300">
                          Image URL <span className="text-gray-500">(optional)</span>
                        </label>
                        <input 
                          type="text"
                          className="w-full p-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-gray-500"
                          placeholder="https://example.com/image.jpg"
                          value={submissionForm.content}
                          onChange={(e) => setSubmissionForm(prev => ({ ...prev, content: e.target.value }))}
                        />
                        {submissionForm.type === 'image' && !submissionForm.content && (
                          <p className="text-xs text-gray-500 mt-1">Leave empty to add without a picture</p>
                        )}
                      </div>
                    )}
                    {(submissionForm.type === 'video') && (
                      <div>
                        <label className="block text-sm font-medium mb-2 text-gray-300">
                          Video URL <span className="text-gray-500">(optional)</span>
                        </label>
                        <input 
                          type="text"
                          className="w-full p-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-gray-500"
                          placeholder="https://example.com/video.mp4"
                          value={submissionForm.content}
                          onChange={(e) => setSubmissionForm(prev => ({ ...prev, content: e.target.value }))}
                        />
                        {submissionForm.type === 'video' && !submissionForm.content && (
                          <p className="text-xs text-gray-500 mt-1">Leave empty to add without a video</p>
                        )}
                      </div>
                    )}
                    
                    <div>
                      <label className="block text-sm font-medium mb-2 text-gray-300">Month</label>
                      <select 
                        className="w-full p-3 rounded-lg bg-white/10 border border-white/20 text-white"
                        value={submissionForm.month}
                        onChange={(e) => setSubmissionForm(prev => ({ ...prev, month: e.target.value }))}
                      >
                        {MONTHS.map(month => (
                          <option key={month} value={month} className="bg-gray-900">{month}</option>
                        ))}
                      </select>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium mb-2 text-gray-300">Category</label>
                      <select 
                        className="w-full p-3 rounded-lg bg-white/10 border border-white/20 text-white"
                        value={submissionForm.category}
                        onChange={(e) => setSubmissionForm(prev => ({ ...prev, category: e.target.value }))}
                      >
                        {categories.map(cat => (
                          <option key={cat.id} value={cat.id} className="bg-gray-900">{cat.name}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="flex gap-2 mt-4">
                    <Button 
                      variant="outline" 
                      onClick={() => setShowSubmitModal(false)}
                      className="flex-1 border-white/30 text-white hover:bg-white/10"
                    >
                      Cancel
                    </Button>
                    <Button 
                      onClick={handleAddSubmission}
                      className="flex-1 bg-retro-teal hover:bg-retro-teal/80 text-white"
                    >
                      ➕ Add
                    </Button>
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
