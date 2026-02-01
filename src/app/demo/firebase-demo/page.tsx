'use client';

import { useState } from 'react';
import { useAuthState, useSignIn, useSignUp, useSignOut, useGoogleSignIn, useFirestore } from '@/hooks';
import { COLLECTIONS } from '@/lib/firebase/firestore';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface UserProfile {
  id?: string;
  email: string;
  displayName: string;
  createdAt?: any;
}

export default function FirebaseDemo() {
  // Auth state
  const { user, loading: authLoading } = useAuthState();
  const { signIn, loading: signInLoading } = useSignIn();
  const { signUp, loading: signUpLoading } = useSignUp();
  const { signOut, loading: signOutLoading } = useSignOut();
  const { googleSignIn, loading: googleLoading } = useGoogleSignIn();

  // Firestore operations
  const { getDoc, getDocs, setDoc, updateDoc, removeDoc, loading: firestoreLoading } = useFirestore<UserProfile>();

  // Form states
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [message, setMessage] = useState('');
  const [profiles, setProfiles] = useState<UserProfile[]>([]);

  // Handle sign in
  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await signIn(email, password);
      setMessage('Successfully signed in!');
    } catch (error: any) {
      setMessage(`Sign in failed: ${error.message}`);
    }
  };

  // Handle sign up
  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await signUp(email, password, displayName);
      setMessage('Successfully signed up!');
    } catch (error: any) {
      setMessage(`Sign up failed: ${error.message}`);
    }
  };

  // Handle Google sign in
  const handleGoogleSignIn = async () => {
    try {
      await googleSignIn();
      setMessage('Successfully signed in with Google!');
    } catch (error: any) {
      setMessage(`Google sign in failed: ${error.message}`);
    }
  };

  // Handle sign out
  const handleSignOut = async () => {
    try {
      await signOut();
      setMessage('Successfully signed out!');
    } catch (error: any) {
      setMessage(`Sign out failed: ${error.message}`);
    }
  };

  // Get all profiles
  const handleGetProfiles = async () => {
    try {
      const data = await getDocs(COLLECTIONS.USERS);
      setProfiles(data);
      setMessage(`Found ${data.length} profiles`);
    } catch (error: any) {
      setMessage(`Failed to get profiles: ${error.message}`);
    }
  };

  // Create a sample profile
  const handleCreateProfile = async () => {
    if (!user) {
      setMessage('Please sign in first');
      return;
    }

    try {
      await setDoc(COLLECTIONS.USERS, user.uid, {
        email: user.email || email,
        displayName: displayName || user.displayName || 'Anonymous',
      });
      setMessage('Profile created successfully!');
    } catch (error: any) {
      setMessage(`Failed to create profile: ${error.message}`);
    }
  };

  // Update a profile
  const handleUpdateProfile = async () => {
    if (!user) {
      setMessage('Please sign in first');
      return;
    }

    try {
      await updateDoc(COLLECTIONS.USERS, user.uid, {
        displayName: displayName || 'Updated Name',
      });
      setMessage('Profile updated successfully!');
    } catch (error: any) {
      setMessage(`Failed to update profile: ${error.message}`);
    }
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-8">Firebase Integration Demo</h1>

      {/* Auth Section */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Authentication</CardTitle>
        </CardHeader>
        <CardContent>
          {authLoading ? (
            <p>Loading...</p>
          ) : user ? (
            <div className="space-y-4">
              <p>Signed in as: <strong>{user.email}</strong></p>
              <Button onClick={handleSignOut} disabled={signOutLoading}>
                {signOutLoading ? 'Signing out...' : 'Sign Out'}
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              <form onSubmit={handleSignIn} className="space-y-4">
                <input
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="border p-2 rounded w-full"
                />
                <input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="border p-2 rounded w-full"
                />
                <Button type="submit" disabled={signInLoading}>
                  {signInLoading ? 'Signing in...' : 'Sign In'}
                </Button>
              </form>

              <form onSubmit={handleSignUp} className="space-y-4">
                <input
                  type="text"
                  placeholder="Display Name"
                  value={displayName}
                  onChange={(e) => setDisplayName(e.target.value)}
                  className="border p-2 rounded w-full"
                />
                <input
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="border p-2 rounded w-full"
                />
                <input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="border p-2 rounded w-full"
                />
                <Button type="submit" disabled={signUpLoading}>
                  {signUpLoading ? 'Signing up...' : 'Sign Up'}
                </Button>
              </form>

              <Button onClick={handleGoogleSignIn} disabled={googleLoading}>
                {googleLoading ? 'Signing in...' : 'Sign In with Google'}
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Firestore Section */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Firestore Database</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <Button onClick={handleGetProfiles} disabled={firestoreLoading}>
              {firestoreLoading ? 'Loading...' : 'Get All Profiles'}
            </Button>

            <Button onClick={handleCreateProfile} disabled={firestoreLoading || !user}>
              {firestoreLoading ? 'Loading...' : 'Create Profile'}
            </Button>

            <Button onClick={handleUpdateProfile} disabled={firestoreLoading || !user}>
              {firestoreLoading ? 'Loading...' : 'Update Profile'}
            </Button>

            {profiles.length > 0 && (
              <div className="mt-4">
                <h3 className="font-semibold mb-2">Profiles:</h3>
                {profiles.map((profile) => (
                  <div key={profile.id} className="border p-2 rounded mb-2">
                    <p>ID: {profile.id}</p>
                    <p>Email: {profile.email}</p>
                    <p>Name: {profile.displayName}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Message Display */}
      {message && (
        <Card>
          <CardContent>
            <p className="text-center font-semibold">{message}</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
