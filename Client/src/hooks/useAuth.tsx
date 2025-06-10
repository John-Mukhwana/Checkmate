import { useState, useEffect } from "react";
import { getCurrentUser, isAuthenticated, handleRedirectResult } from "../lib/auth";
import type { User } from "../shared/schema";

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initAuth = async () => {
      try {
        // Check for redirect result first
        const redirectUser = await handleRedirectResult();
        if (redirectUser) {
          setUser(redirectUser);
        } else {
          // Check local storage
          const currentUser = getCurrentUser();
          if (currentUser && isAuthenticated()) {
            setUser(currentUser);
          }
        }
      } catch (error) {
        console.error("Auth initialization error:", error);
      } finally {
        setLoading(false);
      }
    };

    initAuth();
  }, []);

  const updateUser = (newUser: User | null) => {
    setUser(newUser);
  };

  return {
    user,
    loading,
    isAuthenticated: isAuthenticated(),
    updateUser,
  };
}
