'use client';

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { User, onAuthStateChanged } from 'firebase/auth';
import { auth } from '@/lib/firebase/config';

// Auth context type
interface AuthContextType {
  user: User | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<any>;
  signUp: (email: string, password: string, displayName: string) => Promise<any>;
  signInWithGoogle: () => Promise<any>;
  signOut: () => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Auth provider component
export function FirebaseAuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Subscribe to auth state changes
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });

    // Cleanup subscription
    return () => unsubscribe();
  }, []);

  // Sign in with email/password
  const signIn = async (email: string, password: string) => {
    const { signInWithEmail } = await import('@/lib/firebase/auth');
    return signInWithEmail(email, password);
  };

  // Sign up with email/password
  const signUp = async (email: string, password: string, displayName: string) => {
    const { signUpWithEmail } = await import('@/lib/firebase/auth');
    return signUpWithEmail(email, password, displayName);
  };

  // Sign in with Google
  const signInWithGoogle = async () => {
    const { signInWithGoogle } = await import('@/lib/firebase/auth');
    return signInWithGoogle();
  };

  // Sign out
  const signOut = async () => {
    const { signOut } = await import('@/lib/firebase/auth');
    return signOut();
  };

  // Reset password
  const resetPassword = async (email: string) => {
    const { resetPassword } = await import('@/lib/firebase/auth');
    return resetPassword(email);
  };

  const value = {
    user,
    loading,
    signIn,
    signUp,
    signInWithGoogle,
    signOut,
    resetPassword,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

// Custom hook to use auth context
export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within a FirebaseAuthProvider');
  }
  return context;
}
