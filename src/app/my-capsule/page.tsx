'use client';

import { useState, useEffect, useRef, ChangeEvent } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { NostalgiaBackground } from '@/components/features/nostalgia-background';
import { AnimatedSection } from '@/components/features/animated-section';
import { PersonalizedWrapped } from '@/components/features/personalized-wrapped';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { useAuth } from '@/components/providers';
import { COLLECTIONS } from '@/lib/firebase/firestore';
import { cn } from '@/lib/utils';
import { formatFileSize } from '@/lib/firebase/storage';
import { PersonalCapsuleEntry } from '@/types';
import { collection, getDocs, query, where, doc, setDoc, updateDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase/config';
import { uploadCapsuleMedia, validateFile, UploadResult, UploadProgress } from '@/lib/firebase/storage';
import { LoadingSpinner } from '@/components/ui/loading-spinner';

// Default user avatar
const defaultAvatar = 'https://api.dicebear.com/7.x/avataaars/svg?seed=default';

// Extended capsule type for Firebase with string dates
interface CapsuleWithStringDates {
  id: string;
  userId: string;
  yearId: string;
  title: string;
  description?: string;
  coverImage?: string;
  entries: PersonalCapsuleEntry[];
  isSealed: boolean;
  sealedUntil?: string;
  allowSubmissions: boolean;
  isPublic: boolean;
  createdAt: string;
  updatedAt: string;
}

export default function MyCapsulePage() {
  const { user, loading: authLoading } = useAuth();
  const [firestoreLoading, setFirestoreLoading] = useState(false);
  
  const [capsules, setCapsules] = useState<CapsuleWithStringDates[]>([]);
  const [selectedCapsule, setSelectedCapsule] = useState<CapsuleWithStringDates | null>(null);
  const [showSealModal, setShowSealModal] = useState(false);
  const [showSubmitModal, setShowSubmitModal] = useState(false);
  const [activeTab, setActiveTab] = useState<'capsules' | 'gallery' | 'friends' | 'wrapped'>('capsules');
  const [pageLoading, setPageLoading] = useState(true);
  
  // File upload state
  const [uploadTitle, setUploadTitle] = useState('');
  const [uploadDescription, setUploadDescription] = useState('');
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [uploadProgress, setUploadProgress] = useState<{ [key: number]: UploadProgress }>({});
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Fetch user's capsules from Firebase
  useEffect(() => {
    const fetchCapsules = async () => {
      if (user) {
        setFirestoreLoading(true);
        try {
          const q = query(collection(db, COLLECTIONS.CAPSULES), where('userId', '==', user.uid));
          const snapshot = await getDocs(q);
          const data: CapsuleWithStringDates[] = [];
          snapshot.forEach((docSnapshot) => {
            const docData = docSnapshot.data() as any;
            data.push({
              id: docSnapshot.id,
              ...docData,
              createdAt: docData.createdAt?.toDate?.()?.toISOString() || docData.createdAt || new Date().toISOString(),
              updatedAt: docData.updatedAt?.toDate?.()?.toISOString() || docData.updatedAt || new Date().toISOString(),
            });
          });
          setCapsules(data);
        } catch (error) {
          console.error('Error fetching capsules:', error);
        } finally {
          setFirestoreLoading(false);
        }
      }
      setPageLoading(false);
    };

    if (!authLoading) {
      fetchCapsules();
    }
  }, [user, authLoading]);

  // Mock data for demo when not logged in
  const mockUser = {
    id: 'demo',
    username: 'demo_user',
    displayName: 'Demo User',
    avatarUrl: defaultAvatar,
    bio: 'Lover of internet culture',
    createdAt: '2024-01-01',
    followers: 42,
    following: 38,
    capsulesCount: 0,
    isPrivate: false
  };

  const currentUser = user ? {
    id: user.uid,
    username: user.email?.split('@')[0] || 'user',
    displayName: user.displayName || 'User',
    avatarUrl: user.photoURL || defaultAvatar,
    bio: '',
    createdAt: user.metadata.creationTime || '2024-01-01',
    followers: 0,
    following: 0,
    capsulesCount: capsules.length,
    isPrivate: false
  } : mockUser;

  const displayCapsules = user ? capsules : [];

  const getStatusBadge = (isSealed: boolean) => {
    return (
      <Badge className={cn(isSealed ? 'bg-red-500' : 'bg-green-500', 'text-white')}>
        {isSealed ? '🔒 Sealed' : '🔓 Open'}
      </Badge>
    );
  };

  const handleSealCapsule = async (capsuleId: string, unlockDate: string) => {
    const now = new Date().toISOString();
    
    // Update local state
    setCapsules(prev => prev.map(c => 
      c.id === capsuleId 
        ? { 
            ...c, 
            isSealed: true, 
            sealedUntil: unlockDate,
            updatedAt: now
          }
        : c
    ));
    
    // Update Firebase if logged in
    if (user) {
      try {
        await updateDoc(doc(db, COLLECTIONS.CAPSULES, capsuleId), {
          isSealed: true,
          sealedUntil: unlockDate,
          updatedAt: now
        });
      } catch (error) {
        console.error('Error sealing capsule:', error);
      }
    }
    
    setShowSealModal(false);
  };

  const handleAddSubmission = async (capsuleId: string, type: 'image' | 'video' | 'text') => {
    const newEntry: PersonalCapsuleEntry = {
      id: `entry-${Date.now()}`,
      userId: user?.uid || 'demo',
      yearId: String(new Date().getFullYear()),
      categoryId: 'other',
      title: `New ${type}`,
      description: 'Sample content',
      mediaUrl: type === 'image' ? 'https://example.com/image.jpg' : undefined,
      mediaType: type,
      createdAt: new Date().toISOString(),
      isPublic: true
    };
    
    // Update local state
    setCapsules(prev => prev.map(c => 
      c.id === capsuleId 
        ? { ...c, entries: [...c.entries, newEntry], updatedAt: new Date().toISOString() }
        : c
    ));
    
    // Update Firebase if logged in
    if (user) {
      try {
        const capsule = capsules.find(c => c.id === capsuleId);
        if (capsule) {
          await updateDoc(doc(db, COLLECTIONS.CAPSULES, capsuleId), {
            entries: [...capsule.entries, newEntry],
            updatedAt: new Date().toISOString()
          });
        }
      } catch (error) {
        console.error('Error adding submission:', error);
      }
    }
    
    setShowSubmitModal(false);
  };
  
  // Handle file selection
  const handleFileSelect = (e: ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    setSelectedFiles((prev) => [...prev, ...files]);
    setUploadError(null);
  };
  
  // Remove selected file
  const removeFile = (index: number) => {
    setSelectedFiles((prev) => prev.filter((_, i) => i !== index));
  };
  
  // Handle add entry (with or without files)
  const handleAddEntry = async () => {
    if (!user || !selectedCapsule) return;
    
    // Require at least title or files
    if (!uploadTitle.trim() && selectedFiles.length === 0) {
      setUploadError('Please add a title or upload at least one file');
      return;
    }
    
    setIsUploading(true);
    setUploadError(null);
    
    try {
      let newEntries: PersonalCapsuleEntry[] = [];
      
      if (selectedFiles.length > 0) {
        // Upload files to Firebase Storage
        const uploadResults = await uploadCapsuleMedia(
          selectedFiles,
          user.uid,
          selectedCapsule.id,
          (fileIndex, progress) => {
            setUploadProgress((prev) => ({
              ...prev,
              [fileIndex]: progress,
            }));
          }
        );
        
        // Create entries for each uploaded file
        newEntries = uploadResults.map((result, index) => ({
          id: `entry-${Date.now()}-${index}`,
          userId: user.uid,
          yearId: selectedCapsule.yearId,
          categoryId: 'media',
          title: uploadTitle || `Media ${index + 1}`,
          description: uploadDescription || '',
          mediaUrl: result.url,
          mediaType: result.fileType as 'image' | 'video',
          thumbnailUrl: result.fileType === 'video' ? result.url : undefined,
          fileSize: result.fileSize,
          contentType: result.contentType,
          createdAt: new Date().toISOString(),
          isPublic: true,
        }));
      } else {
        // Create text-only entry
        newEntries = [{
          id: `entry-${Date.now()}`,
          userId: user.uid,
          yearId: selectedCapsule.yearId,
          categoryId: 'text',
          title: uploadTitle || 'Text Entry',
          description: uploadDescription || '',
          mediaType: 'text' as const,
          createdAt: new Date().toISOString(),
          isPublic: true,
        }];
      }
      
      // Update local state
      setCapsules((prev) => prev.map((c) => 
        c.id === selectedCapsule.id 
          ? { ...c, entries: [...c.entries, ...newEntries], updatedAt: new Date().toISOString() }
          : c
      ));
      
      // Update Firebase
      await updateDoc(doc(db, COLLECTIONS.CAPSULES, selectedCapsule.id), {
        entries: [...selectedCapsule.entries, ...newEntries],
        updatedAt: new Date().toISOString(),
      });
      
      // Reset form and close modal
      resetUploadForm();
      setShowSubmitModal(false);
    } catch (error: any) {
      console.error('Error adding entry:', error);
      setUploadError(error.message || 'Failed to add entry');
    } finally {
      setIsUploading(false);
    }
  };
  
  // Reset upload form
  const resetUploadForm = () => {
    setUploadTitle('');
    setUploadDescription('');
    setSelectedFiles([]);
    setUploadProgress({});
    setUploadError(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };
  
  // Open submit modal and reset form
  const openSubmitModal = (capsule: CapsuleWithStringDates) => {
    setSelectedCapsule(capsule);
    resetUploadForm();
    setShowSubmitModal(true);
  };

  const handleCreateCapsule = async () => {
    const year = new Date().getFullYear();
    const newCapsule: CapsuleWithStringDates = {
      id: `capsule-${Date.now()}`,
      userId: user?.uid || 'demo',
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
    
    // Update local state
    setCapsules([newCapsule, ...capsules]);
    
    // Save to Firebase if logged in
    if (user) {
      try {
        await setDoc(doc(db, COLLECTIONS.CAPSULES, newCapsule.id), newCapsule);
      } catch (error) {
        console.error('Error creating capsule:', error);
      }
    }
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
                  {user ? 'Create and manage your personal rewinds' : 'Sign in to create your time capsules!'}
                </p>
              </div>
              
              {/* User Profile Summary */}
              <Card className="shrink-0">
                <CardContent className="p-4">
                  <div className="flex items-center gap-4">
                    <img 
                      src={currentUser.avatarUrl} 
                      alt={currentUser.displayName}
                      className="w-16 h-16 rounded-full bg-retro-teal/20"
                    />
                    <div>
                      <p className="font-bold text-retro-dark">{currentUser.displayName}</p>
                      <p className="text-sm text-retro-gray">@{currentUser.username}</p>
                      <div className="flex gap-2 text-sm mt-1">
                        <span>📦 {currentUser.capsulesCount}</span>
                        <span>👥 {currentUser.followers}</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </AnimatedSection>

          {/* Not logged in message */}
          {!user && (
            <AnimatedSection animation="fadeUp">
              <Card className="mb-8">
                <CardContent className="p-6 text-center">
                  <div className="text-4xl mb-4">🔐</div>
                  <h2 className="text-xl font-bold mb-2">Sign in to access your capsules</h2>
                  <p className="text-retro-gray mb-4">
                    Create an account to save your time capsules and sync across devices.
                  </p>
                  <Button onClick={() => window.location.href = '/'}>
                    Sign In to Continue
                  </Button>
                </CardContent>
              </Card>
            </AnimatedSection>
          )}

          {/* Tabs */}
          <AnimatedSection animation="fadeUp" delay={0.1}>
            <div className="flex justify-center gap-2 mb-8">
              {(['capsules', 'gallery', 'friends', 'wrapped'] as const).map((tab) => (
                <Button
                  key={tab}
                  variant={activeTab === tab ? 'default' : 'outline'}
                  onClick={() => setActiveTab(tab)}
                  className="capitalize"
                  disabled={!user && tab !== 'wrapped'}
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
                size="lg" 
                onClick={handleCreateCapsule}
                disabled={!user || firestoreLoading}
              >
                {firestoreLoading ? 'Saving...' : '➕ Create New Capsule'}
              </Button>
            </div>
          </AnimatedSection>

          {/* Capsules Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {displayCapsules.length === 0 ? (
              <AnimatedSection animation="fadeUp">
                <Card className="col-span-full">
                  <CardContent className="p-8 text-center">
                    <div className="text-6xl mb-4">📦</div>
                    <h3 className="text-xl font-bold mb-2">No capsules yet</h3>
                    <p className="text-retro-gray mb-4">
                      Create your first time capsule to start preserving your memories!
                    </p>
                  </CardContent>
                </Card>
              </AnimatedSection>
            ) : (
              displayCapsules.map((capsule, index) => {
                const year = parseInt(capsule.yearId) || new Date().getFullYear();
                return (
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
                            <Badge variant="outline">{year}</Badge>
                            {getStatusBadge(capsule.isSealed)}
                          </div>
                          <CardTitle className="text-xl">{capsule.title}</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <p className="text-retro-gray text-sm mb-4 line-clamp-2">
                            {capsule.description}
                          </p>
                          
                          {/* Entries Preview */}
                          <div className="flex gap-2 mb-4">
                            {capsule.entries.slice(0, 3).map((entry) => (
                              <div 
                                key={entry.id}
                                className="w-10 h-10 rounded-full bg-retro-teal/20 flex items-center justify-center text-lg"
                              >
                                {entry.mediaType === 'image' && '📷'}
                                {entry.mediaType === 'video' && '🎬'}
                                {entry.mediaType === 'text' && '📝'}
                                {!entry.mediaType && '📝'}
                              </div>
                            ))}
                            {capsule.entries.length > 3 && (
                              <div className="w-10 h-10 rounded-full bg-retro-purple/20 flex items-center justify-center text-sm font-bold">
                                +{capsule.entries.length - 3}
                              </div>
                            )}
                          </div>

                          {/* Actions */}
                          <div className="flex gap-2">
                            {!capsule.isSealed && user && (
                              <>
                                <Button 
                                  size="sm" 
                                  variant="outline"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    openSubmitModal(capsule);
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
                          </div>

                          {/* Seal Info */}
                          {capsule.isSealed && capsule.sealedUntil && (
                            <div className="mt-3 p-2 bg-red-50 rounded-lg text-center">
                              <p className="text-xs text-retro-gray">Unlocks</p>
                              <p className="font-bold text-red-600">
                                {new Date(capsule.sealedUntil).toLocaleDateString()}
                              </p>
                            </div>
                          )}
                        </CardContent>
                      </Card>
                    </motion.div>
                  </AnimatedSection>
                );
              })
            )}
          </div>

          {/* Wrapped Tab Content */}
          {activeTab === 'wrapped' && (
            <AnimatedSection animation="fadeUp">
              <PersonalizedWrapped />
            </AnimatedSection>
          )}

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

          {/* Submit Modal with File Upload */}
          <AnimatePresence>
            {showSubmitModal && selectedCapsule && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
                onClick={() => {
                  setShowSubmitModal(false);
                  resetUploadForm();
                }}
              >
                <motion.div
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.9, opacity: 0 }}
                  className="bg-white dark:bg-gray-800 rounded-2xl p-6 max-w-lg w-full max-h-[90vh] overflow-y-auto"
                  onClick={(e) => e.stopPropagation()}
                >
                  <h2 className="text-2xl font-bold text-retro-dark dark:text-white mb-4">
                    📝 Add Entry to Capsule
                  </h2>
                  
                  <div className="space-y-4">
                    {/* Title */}
                    <div>
                      <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                        Title (optional)
                      </label>
                      <Input
                        placeholder="My awesome memory"
                        value={uploadTitle}
                        onChange={(e) => setUploadTitle(e.target.value)}
                      />
                    </div>

                    {/* Description */}
                    <div>
                      <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                        Description (optional)
                      </label>
                      <textarea
                        className="w-full p-2 border rounded-lg bg-white dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                        rows={3}
                        placeholder="Tell us about this memory..."
                        value={uploadDescription}
                        onChange={(e) => setUploadDescription(e.target.value)}
                      />
                    </div>

                    {/* File Upload Area (Optional) */}
                    <div>
                      <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                        Upload Photos or Videos <span className="text-gray-400">(optional)</span>
                      </label>
                      <div 
                        className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-6 text-center cursor-pointer hover:border-purple-500 transition-colors"
                        onClick={() => fileInputRef.current?.click()}
                      >
                        <input
                          ref={fileInputRef}
                          type="file"
                          accept="image/*,video/*"
                          multiple
                          className="hidden"
                          onChange={handleFileSelect}
                        />
                        <div className="text-4xl mb-2">📁</div>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          Click to select files or drag and drop
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">
                          Supports: JPG, PNG, GIF, WebP, MP4, WebM (max 100MB for videos, 10MB for images)
                        </p>
                      </div>
                    </div>

                    {/* Selected Files */}
                    {selectedFiles.length > 0 && (
                      <div className="space-y-2">
                        <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
                          Selected Files ({selectedFiles.length})
                        </p>
                        {selectedFiles.map((file, index) => (
                          <div 
                            key={index}
                            className="flex items-center justify-between p-3 bg-gray-100 dark:bg-gray-700 rounded-lg"
                          >
                            <div className="flex items-center gap-3 flex-1 min-w-0">
                              <span className="text-2xl">
                                {file.type.startsWith('video/') ? '🎬' : '📷'}
                              </span>
                              <div className="flex-1 min-w-0">
                                <p className="text-sm font-medium truncate text-gray-900 dark:text-white">
                                  {file.name}
                                </p>
                                <p className="text-xs text-gray-500">
                                  {formatFileSize(file.size)}
                                </p>
                              </div>
                            </div>
                            {uploadProgress[index] && (
                              <div className="w-24">
                                <div className="h-2 bg-gray-200 dark:bg-gray-600 rounded-full overflow-hidden">
                                  <div 
                                    className="h-full bg-purple-500 transition-all duration-300"
                                    style={{ 
                                      width: `${uploadProgress[index].progress}%` 
                                    }}
                                  />
                                </div>
                                <p className="text-xs text-center text-gray-500 mt-1">
                                  {Math.round(uploadProgress[index].progress)}%
                                </p>
                              </div>
                            )}
                            {!uploadProgress[index] && (
                              <button
                                type="button"
                                onClick={() => removeFile(index)}
                                className="text-red-500 hover:text-red-700 text-sm"
                              >
                                ✕
                              </button>
                            )}
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Error Message */}
                    {uploadError && (
                      <div className="p-3 rounded-lg bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 text-sm">
                        {uploadError}
                      </div>
                    )}
                  </div>

                  {/* Actions */}
                  <div className="mt-6 flex gap-3">
                    <Button 
                      variant="outline" 
                      onClick={() => {
                        setShowSubmitModal(false);
                        resetUploadForm();
                      }}
                      disabled={isUploading}
                      className="flex-1"
                    >
                      Cancel
                    </Button>
                    <Button 
                      onClick={handleAddEntry}
                      disabled={isUploading}
                      className="flex-1 bg-purple-600 hover:bg-purple-700 text-white"
                    >
                      {isUploading ? (
                        <span className="flex items-center justify-center gap-2">
                          <LoadingSpinner size="small" />
                          Saving...
                        </span>
                      ) : (
                        <>📤 Save Entry</>
                      )}
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
