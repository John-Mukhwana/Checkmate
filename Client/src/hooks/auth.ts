export interface AuthUser {
  id: string;
  email?: string;
  wallet?: string;
  authType: "google" | "wallet" | "both";
  role: "user" | "therapist";
  displayName?: string;
}

export const AUTH_TOKEN_KEY = 'telepsyche_auth_token';

export const mockAuth = {
  signInWithGoogle: async (): Promise<AuthUser> => {
    // Mock Google sign-in
    const mockUser: AuthUser = {
      id: "user_123",
      email: "john.doe@gmail.com",
      authType: "google",
      role: "user",
      displayName: "John Doe"
    };
    
    // Store mock JWT token
    const mockToken = btoa(JSON.stringify({
      userId: mockUser.id,
      email: mockUser.email,
      exp: Date.now() + 24 * 60 * 60 * 1000 // 24 hours
    }));
    
    localStorage.setItem(AUTH_TOKEN_KEY, mockToken);
    return mockUser;
  },

  connectWallet: async (): Promise<AuthUser> => {
    // Mock wallet connection
    const mockWalletAddress = "0x742d35Cc123456789abcdef1234567890abcdef8f3a";
    const mockUser: AuthUser = {
      id: "wallet_456",
      wallet: mockWalletAddress,
      authType: "wallet",
      role: "user",
      displayName: mockWalletAddress.slice(0, 6) + "..." + mockWalletAddress.slice(-4)
    };
    
    // Store mock JWT token
    const mockToken = btoa(JSON.stringify({
      userId: mockUser.id,
      wallet: mockUser.wallet,
      exp: Date.now() + 24 * 60 * 60 * 1000
    }));
    
    localStorage.setItem(AUTH_TOKEN_KEY, mockToken);
    return mockUser;
  },

  linkAccounts: async (currentUser: AuthUser, authType: "google" | "wallet"): Promise<AuthUser> => {
    // Mock account linking
    const updatedUser = { ...currentUser };
    
    if (authType === "google" && !currentUser.email) {
      updatedUser.email = "john.doe@gmail.com";
      updatedUser.authType = currentUser.wallet ? "both" : "google";
    } else if (authType === "wallet" && !currentUser.wallet) {
      updatedUser.wallet = "0x742d35Cc123456789abcdef1234567890abcdef8f3a";
      updatedUser.authType = currentUser.email ? "both" : "wallet";
    }
    
    // Update stored token
    const mockToken = btoa(JSON.stringify({
      userId: updatedUser.id,
      email: updatedUser.email,
      wallet: updatedUser.wallet,
      exp: Date.now() + 24 * 60 * 60 * 1000
    }));
    
    localStorage.setItem(AUTH_TOKEN_KEY, mockToken);
    return updatedUser;
  },

  signOut: async (): Promise<void> => {
    localStorage.removeItem(AUTH_TOKEN_KEY);
  },

  getCurrentUser: (): AuthUser | null => {
    const token = localStorage.getItem(AUTH_TOKEN_KEY);
    if (!token) return null;
    
    try {
      const decoded = JSON.parse(atob(token));
      if (decoded.exp < Date.now()) {
        localStorage.removeItem(AUTH_TOKEN_KEY);
        return null;
      }
      
      return {
        id: decoded.userId,
        email: decoded.email,
        wallet: decoded.wallet,
        authType: decoded.email && decoded.wallet ? "both" : 
                  decoded.email ? "google" : "wallet",
        role: "user",
        displayName: decoded.email || 
                    (decoded.wallet ? decoded.wallet.slice(0, 6) + "..." + decoded.wallet.slice(-4) : "User")
      };
    } catch {
      localStorage.removeItem(AUTH_TOKEN_KEY);
      return null;
    }
  }
};
