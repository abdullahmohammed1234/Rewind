'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { reload } from 'firebase/auth';
import { auth, db } from '@/lib/firebase/config';
import { useAuth } from '@/components/providers';
import { Button } from '@/components/ui/button';

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/years', label: 'Capsules' },
  { href: '/quiz', label: 'Quiz' },
  { href: '/search', label: 'Search' },
  { href: '/all-time', label: 'All-Time' },
  { href: '/my-capsule', label: 'MyCapsule' },
  { href: '/compare', label: 'Compare' },
];

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { user, loading, signInWithGoogle, signOut } = useAuth();
  const [authLoading, setAuthLoading] = useState(false);
  const [userPhotoURL, setUserPhotoURL] = useState<string | null>(null);
  
  // Fetch user profile photo from Firestore as fallback
  useEffect(() => {
    const fetchUserPhoto = async () => {
      if (user && !user.photoURL) {
        // Try to reload user to get latest photo
        try {
          await reload(user);
        } catch (e) {
          // Ignore reload errors
        }
        
        // Check Firestore for saved avatar
        try {
          const userDoc = await getDoc(doc(db, 'users', user.uid));
          if (userDoc.exists()) {
            const userData = userDoc.data();
            if (userData.avatarUrl) {
              setUserPhotoURL(userData.avatarUrl);
            }
          }
        } catch (e) {
          console.error('Error fetching user photo:', e);
        }
      } else if (user?.photoURL) {
        setUserPhotoURL(user.photoURL);
      }
    };
    
    fetchUserPhoto();
  }, [user]);

  const handleGoogleSignIn = async () => {
    setAuthLoading(true);
    try {
      await signInWithGoogle();
    } catch (error) {
      console.error('Sign in error:', error);
    } finally {
      setAuthLoading(false);
    }
  };

  const handleSignOut = async () => {
    setAuthLoading(true);
    try {
      await signOut();
    } catch (error) {
      console.error('Sign out error:', error);
    } finally {
      setAuthLoading(false);
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#1a1a2e]/90 backdrop-blur-md border-b border-retro-purple/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <span className="text-2xl group-hover:scale-110 transition-transform duration-300">
              📼
            </span>
            <span className="font-bold text-xl text-white hidden sm:block">
              Rewind
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-6">
            {navLinks.map((link) => (
              <Link 
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-gray-300 hover:text-retro-teal transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Auth Section */}
          <div className="hidden lg:flex items-center gap-3">
            {loading ? (
              <span className="text-sm text-gray-400">Loading...</span>
            ) : user ? (
              <div className="flex items-center gap-3">
                <Link href="/profile" className="flex items-center gap-2">
                  {(user.photoURL || userPhotoURL) ? (
                    <img 
                      src={user.photoURL || userPhotoURL || ''} 
                      alt={user.displayName || 'User'} 
                      className="w-8 h-8 rounded-full object-cover"
                    />
                  ) : (
                    <span className="w-8 h-8 rounded-full bg-retro-purple flex items-center justify-center text-white text-sm">
                      {user.displayName?.[0] || user.email?.[0] || 'U'}
                    </span>
                  )}
                  <span className="text-sm text-gray-300 hidden xl:block">
                    {user.displayName || user.email?.split('@')[0]}
                  </span>
                </Link>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={handleSignOut}
                  disabled={authLoading}
                >
                  {authLoading ? '...' : 'Logout'}
                </Button>
              </div>
            ) : (
              <>
                <Link href="/auth/signup">
                  <Button 
                    variant="default" 
                    size="sm"
                    className="bg-retro-teal hover:bg-retro-teal/80"
                  >
                    Signup
                  </Button>
                </Link>
                <Link href="/auth/login">
                  <Button 
                    variant="outline" 
                    size="sm"
                  >
                    Login
                  </Button>
                </Link>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <button 
            className="lg:hidden p-2 text-gray-300"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isMobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="lg:hidden py-4 border-t border-retro-purple/10">
            <nav className="flex flex-col gap-2 mb-4">
              {navLinks.map((link) => (
                <Link 
                  key={link.href}
                  href={link.href}
                  className="px-4 py-2 text-sm font-medium text-gray-300 hover:text-retro-teal hover:bg-retro-teal/5 rounded-lg transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
            </nav>
            
            {/* Mobile Auth Section */}
            <div className="px-4">
              {loading ? (
                <span className="text-sm text-gray-400">Loading...</span>
              ) : user ? (
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    {(user.photoURL || userPhotoURL) ? (
                      <img 
                        src={user.photoURL || userPhotoURL || ''} 
                        alt={user.displayName || 'User'} 
                        className="w-8 h-8 rounded-full object-cover"
                      />
                    ) : (
                      <span className="w-8 h-8 rounded-full bg-retro-purple flex items-center justify-center text-white text-sm">
                        {user.displayName?.[0] || user.email?.[0] || 'U'}
                      </span>
                    )}
                    <span className="text-sm text-gray-300">
                      {user.displayName || user.email}
                    </span>
                  </div>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={handleSignOut}
                    disabled={authLoading}
                  >
                    {authLoading ? '...' : 'Logout'}
                  </Button>
                </div>
              ) : (
                <div className="flex gap-2">
                  <Link href="/auth/signup" className="flex-1">
                    <Button 
                      variant="default" 
                      className="w-full bg-retro-teal hover:bg-retro-teal/80"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      Signup
                    </Button>
                  </Link>
                  <Link href="/auth/login" className="flex-1">
                    <Button 
                      variant="outline" 
                      className="w-full"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      Login
                    </Button>
                  </Link>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
