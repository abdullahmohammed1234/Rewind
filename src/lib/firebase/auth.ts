import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut as firebaseSignOut,
  onAuthStateChanged,
  User,
  GoogleAuthProvider,
  signInWithPopup,
  sendPasswordResetEmail,
  updateProfile,
} from 'firebase/auth';
import { auth } from './config';

// Google Auth Provider
const googleProvider = new GoogleAuthProvider();

// Sign up with email and password
export const signUpWithEmail = async (
  email: string,
  password: string,
  displayName: string
) => {
  const userCredential = await createUserWithEmailAndPassword(auth, email, password);
  
  // Update user profile with display name
  await updateProfile(userCredential.user, {
    displayName,
  });
  
  return userCredential;
};

// Sign in with email and password
export const signInWithEmail = async (email: string, password: string) => {
  return signInWithEmailAndPassword(auth, email, password);
};

// Sign in with Google
export const signInWithGoogle = async () => {
  return signInWithPopup(auth, googleProvider);
};

// Sign out
export const signOut = async () => {
  return firebaseSignOut(auth);
};

// Reset password
export const resetPassword = async (email: string) => {
  return sendPasswordResetEmail(auth, email);
};

// Get current user
export const getCurrentUser = () => {
  return auth.currentUser;
};

// Subscribe to auth state changes
export const onAuthChange = (callback: (user: User | null) => void) => {
  return onAuthStateChanged(auth, callback);
};

// Update user profile
export const updateUserProfile = async (data: { displayName?: string; photoURL?: string }) => {
  if (auth.currentUser) {
    return updateProfile(auth.currentUser, data);
  }
  throw new Error('No user logged in');
};
