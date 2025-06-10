import { createContext, useContext } from "react";
import type { ReactNode } from "react";
import { useAuth } from "../hooks/useAuth";
import type { User } from "../shared/schema";

interface AuthContextType {
  user: User | null;
  loading: boolean;
  isAuthenticated: boolean;
  updateUser: (user: User | null) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const auth = useAuth();

  return (
    <AuthContext.Provider value={auth}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuthContext() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuthContext must be used within an AuthProvider");
  }
  return context;
}
