export interface User {
  userId: string;
  walletHash?: string;
  emailHash?: string;
  authType: 'wallet' | 'google' | 'both';
  role: 'user' | 'therapist' | 'admin';
  preferences: Record<string, any>;
  createdAt: Date;
  journalCount: number;
}

export interface Auth {
  userId: string;
  jwt: string;
  nonce?: string;
  createdAt: Date;
}