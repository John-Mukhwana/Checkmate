import { useState, useEffect } from 'react';
import { mockAuth, type AuthUser } from './auth';

export function useAuth() {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const currentUser = mockAuth.getCurrentUser();
    setUser(currentUser);
    setLoading(false);
  }, []);

  const signInWithGoogle = async () => {
    setLoading(true);
    try {
      const user = await mockAuth.signInWithGoogle();
      setUser(user);
    } catch (error) {
      console.error('Failed to sign in with Google:', error);
    } finally {
      setLoading(false);
    }
  };

  const connectWallet = async () => {
    setLoading(true);
    try {
      const user = await mockAuth.connectWallet();
      setUser(user);
    } catch (error) {
      console.error('Failed to connect wallet:', error);
    } finally {
      setLoading(false);
    }
  };

  const linkAccount = async (authType: "google" | "wallet") => {
    if (!user) return;
    
    setLoading(true);
    try {
      const updatedUser = await mockAuth.linkAccounts(user, authType);
      setUser(updatedUser);
    } catch (error) {
      console.error('Failed to link account:', error);
    } finally {
      setLoading(false);
    }
  };

  const signOut = async () => {
    setLoading(true);
    try {
      await mockAuth.signOut();
      setUser(null);
    } catch (error) {
      console.error('Failed to sign out:', error);
    } finally {
      setLoading(false);
    }
  };

  return {
    user,
    loading,
    signInWithGoogle,
    connectWallet,
    linkAccount,
    signOut,
    isAuthenticated: !!user,
  };
}
