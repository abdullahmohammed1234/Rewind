'use client';

import { useState, useEffect, useCallback } from 'react';
import { User, onAuthStateChanged, signOut as firebaseSignOut } from 'firebase/auth';
import { auth } from '@/lib/firebase/config';
import {
  signInWithEmail,
  signUpWithEmail,
  signInWithGoogle,
  resetPassword,
  getCurrentUser,
} from '@/lib/firebase/auth';

// Loading state type
interface LoadingState {
  loading: boolean;
  error: string | null;
}

// Auth state hook
export const useAuthState = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return { user, loading, error };
};

// Sign in hook
export const useSignIn = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const signIn = useCallback(async (email: string, password: string) => {
    setLoading(true);
    setError(null);
    try {
      const result = await signInWithEmail(email, password);
      return result;
    } catch (err: any) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  return { signIn, loading, error };
};

// Sign up hook
export const useSignUp = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const signUp = useCallback(async (email: string, password: string, displayName: string) => {
    setLoading(true);
    setError(null);
    try {
      const result = await signUpWithEmail(email, password, displayName);
      return result;
    } catch (err: any) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  return { signUp, loading, error };
};

// Google sign in hook
export const useGoogleSignIn = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const googleSignIn = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await signInWithGoogle();
      return result;
    } catch (err: any) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  return { googleSignIn, loading, error };
};

// Sign out hook
export const useSignOut = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const signOut = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      await firebaseSignOut(auth);
    } catch (err: any) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  return { signOut, loading, error };
};

// Password reset hook
export const usePasswordReset = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const sendResetEmail = useCallback(async (email: string) => {
    setLoading(true);
    setError(null);
    setSuccess(false);
    try {
      await resetPassword(email);
      setSuccess(true);
    } catch (err: any) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  return { sendResetEmail, loading, error, success };
};

// Get current user hook
export const useCurrentUser = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return { user, loading };
};
