
// // wallect conect works for this code
// import { ethers } from 'ethers';

// interface User {
//   userId: string;
//   name: string;
//   email?: string;
//   wallet?: string;
//   role: 'user' | 'therapist' | 'admin';
//   authType: 'google' | 'wallet' | 'both';
//   preferences: Record<string, unknown>;
//   journalCount: number;
//   createdAt: Date;
// }

// export async function signInWithGoogle(credential: string): Promise<User> {
//   const response = await fetch('http://localhost:3000/api/auth/google', {
//     method: 'POST',
//     headers: { 'Content-Type': 'application/json' },
//     body: JSON.stringify({ idToken: credential }),
//   });

//   if (!response.ok) {
//     throw new Error('Google sign-in failed');
//   }

//   const { token, user } = await response.json();
//   localStorage.setItem('token', token);
//   return {
//     ...user,
//     authType: user.authType === 'email' ? 'google' : user.authType,
//     wallet: user.walletAddress,
//     preferences: {},
//     journalCount: 0,
//     createdAt: new Date(user.createdAt),
//   };
// }

// export async function signInWithWallet(provider?: ethers.BrowserProvider): Promise<User> {
//   const ethProvider = provider || (window.ethereum ? new ethers.BrowserProvider(window.ethereum) : null);
//   if (!ethProvider) {
//     throw new Error('No wallet detected. Please install MetaMask or use WalletConnect on mobile.');
//   }

//   const accounts = await ethProvider.send('eth_requestAccounts', []);
//   if (!accounts.length) {
//     throw new Error('No wallet accounts found.');
//   }

//   const walletAddress = accounts[0];
//   const name = `User_${walletAddress.slice(2, 8)}`;

//   const userId = ethers.hexlify(ethers.randomBytes(16)).slice(2);
//   const nonceResponse = await fetch(`http://localhost:3000/api/auth/nonce?userId=${userId}`);
//   if (!nonceResponse.ok) {
//     throw new Error('Failed to get nonce.');
//   }

//   const { nonce } = await nonceResponse.json();
//   const signer = await ethProvider.getSigner();
//   const signature = await signer.signMessage(nonce);

//   const response = await fetch('http://localhost:3000/api/auth/wallet', {
//     method: 'POST',
//     headers: { 'Content-Type': 'application/json' },
//     body: JSON.stringify({ walletAddress, signature, nonce, name }),
//   });

//   if (!response.ok) {
//     throw new Error('Wallet sign-in failed.');
//   }

//   const { token, user } = await response.json();
//   localStorage.setItem('token', token);
//   return {
//     ...user,
//     authType: user.authType,
//     wallet: user.walletAddress,
//     preferences: {},
//     journalCount: 0,
//     createdAt: new Date(user.createdAt),
//   };
// }

// export function getToken(): string | null {
//   return localStorage.getItem('token');
// }

// export function signOutUser(): void {
//   if (window.google) {
//     window.google.accounts.id.disableAutoSelect(); // Fixed typo
//   }
//   localStorage.removeItem('token');
// }

// export function getCurrentUser(): User | null {
//   const token = getToken();
//   if (!token) return null;

//   try {
//     const payload = JSON.parse(atob(token.split('.')[1]));
//     return {
//       userId: payload.userId,
//       name: payload.name || `User_${payload.walletAddress?.slice(2, 8)}`,
//       role: payload.role,
//       authType: payload.authType || 'google',
//       preferences: {},
//       journalCount: 0,
//       createdAt: new Date(),
//       wallet: payload.walletAddress,
//     };
//   } catch {
//     return null;
//   }
// }

// export function isAuthenticated(): boolean {
//   return !!getToken();
// }

// export async function handleRedirectResult(): Promise<User | null> {
//   return null;
// }






























// import { ethers } from 'ethers';

// interface User {
//   userId: string;
//   name: string;
//   email?: string;
//   wallet?: string;
//   role: 'user' | 'therapist' | 'admin';
//   authType: 'google' | 'wallet' | 'both';
//   preferences: Record<string, unknown>;
//   journalCount: number;
//   createdAt: Date;
// }

// export async function signInWithGoogle(credential: string): Promise<User> {
//   console.debug('[signInWithGoogle] Initiating Google sign-in');
//   const backendUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:3000';
//   const response = await fetch(`${backendUrl}/api/auth/google`, {
//     method: 'POST',
//     headers: { 'Content-Type': 'application/json' },
//     body: JSON.stringify({ idToken: credential }),
//   });

//   if (!response.ok) {
//     const error = await response.text();
//     console.error('[signInWithGoogle] Failed:', error);
//     throw new Error(`Google sign-in failed: ${error}`);
//   }

//   const { token, user } = await response.json();
//   console.debug('[signInWithGoogle] Success, token received');
//   localStorage.setItem('token', token);
//   return {
//     ...user,
//     authType: user.authType === 'email' ? 'google' : user.authType,
//     wallet: user.walletAddress,
//     preferences: {},
//     journalCount: 0,
//     createdAt: new Date(user.createdAt),
//   };
// }

// export async function signInWithWallet(provider?: ethers.BrowserProvider): Promise<User> {
//   console.debug('[signInWithWallet] Starting wallet sign-in');
//   const ethProvider = provider || (window.ethereum ? new ethers.BrowserProvider(window.ethereum) : null);
//   if (!ethProvider) {
//     console.error('[signInWithWallet] No provider detected');
//     throw new Error('No wallet detected. Please install MetaMask or use WalletConnect on mobile.');
//   }

//   try {
//     console.debug('[signInWithWallet] Requesting accounts');
//     const accounts = await ethProvider.send('eth_requestAccounts', []);
//     console.debug('[signInWithWallet] Accounts received:', accounts);
//     if (!accounts || !accounts.length) {
//       console.error('[signInWithWallet] No accounts returned');
//       throw new Error('No wallet accounts found. Please ensure your wallet is connected.');
//     }

//     const walletAddress = accounts[0];
//     console.debug('[signInWithWallet] Wallet address:', walletAddress);
//     const name = `User_${walletAddress.slice(2, 8)}`;

//     const userId = ethers.hexlify(ethers.randomBytes(16)).slice(2);
//     console.debug('[signInWithWallet] Fetching nonce for userId:', userId);
//     const backendUrl = import.meta.env.VITE_BACKEND_URL ;
//     const nonceResponse = await fetch(`${backendUrl}/api/auth/nonce?userId=${userId}`);
//     if (!nonceResponse.ok) {
//       const error = await nonceResponse.text();
//       console.error('[signInWithWallet] Nonce fetch failed:', error);
//       throw new Error(`Failed to get nonce: ${error}`);
//     }

//     const { nonce } = await nonceResponse.json();
//     console.debug('[signInWithWallet] Nonce received:', nonce);
//     const signer = await ethProvider.getSigner();
//     console.debug('[signInWithWallet] Signing nonce');
//     const signature = await signer.signMessage(nonce);
//     console.debug('[signInWithWallet] Signature created:', signature);

//     console.debug('[signInWithWallet] Sending to backend:', { walletAddress, signature, nonce, name });
//     const response = await fetch(`${backendUrl}/api/auth/wallet`, {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify({ walletAddress, signature, nonce, name }),
//     });

//     if (!response.ok) {
//       const error = await response.text();
//       console.error('[signInWithWallet] Backend request failed:', error);
//       throw new Error(`Wallet sign-in failed: ${error}`);
//     }

//     const { token, user } = await response.json();
//     console.debug('[signInWithWallet] Success, token received, user:', user.userId);
//     localStorage.setItem('token', token);
//     return {
//       ...user,
//       authType: user.authType,
//       wallet: user.walletAddress,
//       preferences: {},
//       journalCount: 0,
//       createdAt: new Date(user.createdAt),
//     };
//   } catch (err: any) {
//     console.error('[signInWithWallet] Error:', err.message, err.stack);
//     throw new Error(`Wallet sign-in failed: ${err.message}`);
//   }
// }

// export function getToken(): string | null {
//   return localStorage.getItem('token');
// }

// export function signOutUser(): void {
//   console.debug('[signOutUser] Signing out');
//   if (window.google) {
//     window.google.accounts.id.disableAutoSelect();
//   }
//   localStorage.removeItem('token');
// }

// export function getCurrentUser(): User | null {
//   const token = getToken();
//   if (!token) return null;

//   try {
//     const payload = JSON.parse(atob(token.split('.')[1]));
//     console.debug('[getCurrentUser] Parsed token:', payload);
//     return {
//       userId: payload.userId,
//       name: payload.name || `User_${payload.walletAddress?.slice(2, 8)}`,
//       role: payload.role,
//       authType: payload.authType || 'google',
//       preferences: {},
//       journalCount: 0,
//       createdAt: new Date(),
//       wallet: payload.walletAddress,
//     };
//   } catch {
//     console.error('[getCurrentUser] Failed to parse token');
//     return null;
//   }
// }

// export function isAuthenticated(): boolean {
//   const authenticated = !!getToken();
//   console.debug('[isAuthenticated] Result:', authenticated);
//   return authenticated;
// }

// export async function handleRedirectResult(): Promise<User | null> {
//   return null;
// }





































import { ethers } from 'ethers';

interface User {
  userId: string;
  name: string;
  email?: string;
  wallet?: string;
  role: 'user' | 'therapist' | 'admin';
  authType: 'google' | 'wallet' | 'both';
  preferences: Record<string, unknown>;
  journalCount: number;
  createdAt: Date;
}

async function fetchWithRetry(url: string, options: RequestInit, retries = 3, delay = 1000): Promise<Response> {
  for (let i = 0; i < retries; i++) {
    try {
      const response = await fetch(url, options);
      if (response.ok) return response;
      const error = await response.text();
      console.error(`[fetchWithRetry] Attempt ${i + 1} failed:`, error);
      if (i === retries - 1) throw new Error(error);
    } catch (err) {
      console.error(`[fetchWithRetry] Attempt ${i + 1} error:`, err);
      if (i === retries - 1) throw err;
    }
    await new Promise(resolve => setTimeout(resolve, delay));
  }
  throw new Error('Max retries reached');
}

export async function signInWithGoogle(credential: string): Promise<User> {
  console.debug('[signInWithGoogle] Initiating Google sign-in');
  const backendUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:3000';
  try {
    const response = await fetchWithRetry(`${backendUrl}/api/auth/google`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ idToken: credential }),
    });

    const { token, user } = await response.json();
    console.debug('[signInWithGoogle] Success, token received');
    localStorage.setItem('token', token);
    return {
      ...user,
      authType: user.authType === 'email' ? 'google' : user.authType,
      wallet: user.walletAddress,
      preferences: {},
      journalCount: 0,
      createdAt: new Date(user.createdAt),
    };
  } catch (err: any) {
    console.error('[signInWithGoogle] Error:', err.message, err.stack);
    throw new Error(`Google sign-in failed: ${err.message}`);
  }
}

export async function signInWithWallet(provider?: ethers.BrowserProvider): Promise<User> {
  console.debug('[signInWithWallet] Starting wallet sign-in');
  const ethProvider = provider || (window.ethereum ? new ethers.BrowserProvider(window.ethereum) : null);
  if (!ethProvider) {
    console.error('[signInWithWallet] No provider detected');
    throw new Error('No wallet detected. Please install MetaMask or use WalletConnect on mobile.');
  }

  try {
    console.debug('[signInWithWallet] Requesting accounts');
    const accounts = await ethProvider.send('eth_requestAccounts', []);
    console.debug('[signInWithWallet] Accounts received:', accounts);
    if (!accounts || !accounts.length) {
      console.error('[signInWithWallet] No accounts returned');
      throw new Error('No wallet accounts found. Please ensure your wallet is connected.');
    }

    const walletAddress = accounts[0];
    console.debug('[signInWithWallet] Wallet address:', walletAddress);
    const name = `User_${walletAddress.slice(2, 8)}`;

    const userId = ethers.hexlify(ethers.randomBytes(16)).slice(2);
    console.debug('[signInWithWallet] Fetching nonce for userId:', userId);
    const backendUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:3000';
    const nonceResponse = await fetchWithRetry(`${backendUrl}/api/auth/nonce?userId=${userId}`, {
      method: 'GET',
    });
    const { nonce } = await nonceResponse.json();
    console.debug('[signInWithWallet] Nonce received:', nonce);
    const signer = await ethProvider.getSigner();
    console.debug('[signInWithWallet] Signing nonce');
    const signature = await signer.signMessage(nonce);
    console.debug('[signInWithWallet] Signature created:', signature);

    console.debug('[signInWithWallet] Sending to backend:', { walletAddress, signature, nonce, name });
    const response = await fetchWithRetry(`${backendUrl}/api/auth/wallet`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ walletAddress, signature, nonce, name }),
    });

    const { token, user } = await response.json();
    console.debug('[signInWithWallet] Success, token received, user:', user.userId);
    localStorage.setItem('token', token);
    return {
      ...user,
      authType: user.authType,
      wallet: user.walletAddress,
      preferences: {},
      journalCount: 0,
      createdAt: new Date(user.createdAt),
    };
  } catch (err: any) {
    console.error('[signInWithWallet] Error:', err.message, err.stack);
    throw new Error(`Wallet sign-in failed: ${err.message}`);
  }
}

export function getToken(): string | null {
  return localStorage.getItem('token');
}

export function signOutUser(): void {
  console.debug('[signOutUser] Signing out');
  if (window.google) {
    window.google.accounts.id.disableAutoSelect();
  }
  localStorage.removeItem('token');
}

export function getCurrentUser(): User | null {
  const token = getToken();
  if (!token) return null;

  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    console.debug('[getCurrentUser] Parsed token:', payload);
    return {
      userId: payload.userId,
      name: payload.name || `User_${payload.walletAddress?.slice(2, 8)}`,
      role: payload.role,
      authType: payload.authType || 'google',
      preferences: {},
      journalCount: 0,
      createdAt: new Date(),
      wallet: payload.walletAddress,
    };
  } catch {
    console.error('[getCurrentUser] Failed to parse token');
    return null;
  }
}

export function isAuthenticated(): boolean {
  const authenticated = !!getToken();
  console.debug('[isAuthenticated] Result:', authenticated);
  return authenticated;
}

export async function handleRedirectResult(): Promise<User | null> {
  return null;
}