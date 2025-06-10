// import { Context } from 'hono';
// import { generateNonce, verifyWallet, verifyEmail, linkWallet, linkEmail, generateJWT } from './auth.service';

// export async function getNonce(c: Context) {
//   const userId = c.req.query('userId');
//   if (!userId) return c.json({ error: 'User ID required' }, 400);
//   try {
//     const nonce = await generateNonce(userId);
//     return c.json({ nonce });
//   } catch (error) {
//     return c.json({ error: 'Failed to generate nonce' }, 500);
//   }
// }

// export async function walletLogin(c: Context) {
//   const { walletAddress, name } = await c.req.json();
//   if (!walletAddress || !name) return c.json({ error: 'Wallet address and name required' }, 400);

//   try {
//     const user = await verifyWallet(walletAddress, name);
//     const token = await generateJWT(user.userId);
//     return c.json({
//       token,
//       userId: user.userId,
//       walletAddress,
//       name,
//       requiresEmail: user.authType === 'wallet',
//     });
//   } catch (error: any) {
//     return c.json({ error: error.message }, 401);
//   }
// }

// export async function emailLogin(c: Context) {
//   const { email, name } = await c.req.json();
//   if (!email || !name) return c.json({ error: 'Email and name required' }, 400);

//   try {
//     const user = await verifyEmail(email, name);
//     const token = await generateJWT(user.userId);
//     return c.json({
//       token,
//       userId: user.userId,
//       email: 'hidden',
//       name,
//       requiresWallet: user.authType === 'email',
//     });
//   } catch (error: any) {
//     return c.json({ error: error.message }, 401);
//   }
// }

// export async function linkWalletToAccount(c: Context) {
//   const userId = c.get('userId');
//   const { walletAddress } = await c.req.json();
//   if (!walletAddress) return c.json({ error: 'Wallet address required' }, 400);

//   try {
//     await linkWallet(userId, walletAddress);
//     return c.json({ message: 'Wallet linked' });
//   } catch (error: any) {
//     return c.json({ error: error.message }, 400);
//   }
// }

// export async function linkEmailToAccount(c: Context) {
//   const userId = c.get('userId');
//   const { email } = await c.req.json();
//   if (!email) return c.json({ error: 'Email required' }, 400);

//   try {
//     await linkEmail(userId, email);
//     return c.json({ message: 'Email linked' });
//   } catch (error: any) {
//     return c.json({ error: error.message }, 400);
//   }
// }

import { Context } from 'hono';
import { OAuth2Client } from 'google-auth-library';
import { ethers } from 'ethers';
import { env } from '../../config/env';
import { generateNonce, verifyWallet, verifyEmail, linkWallet, linkEmail, generateJWT, mergeAccounts } from './auth.service';

const googleClient = new OAuth2Client(env.GOOGLE_CLIENT_ID);

export async function getNonce(c: Context) {
  const userId = c.req.query('userId');
  if (!userId) return c.json({ error: 'User ID required' }, 400);
  try {
    const nonce = await generateNonce(userId);
    return c.json({ nonce });
  } catch (error: any) {
    console.error('getNonce error:', error.message);
    return c.json({ error: 'Failed to generate nonce' }, 500);
  }
}

export async function googleLogin(c: Context) {
  const { idToken } = await c.req.json();
  if (!idToken) return c.json({ error: 'ID token required' }, 400);

  try {
    const ticket = await googleClient.verifyIdToken({
      idToken,
      audience: env.GOOGLE_CLIENT_ID,
    });
    const payload = ticket.getPayload();
    if (!payload || !payload.email || !payload.name) {
      return c.json({ error: 'Invalid Google ID token' }, 401);
    }

    const user = await verifyEmail(payload.email, payload.name);
    const token = await generateJWT(user.userId);
    return c.json({
      token,
      user: {
        userId: user.userId,
        name: user.name,
        email: 'hidden',
        walletAddress: user.walletAddress,
        role: user.role,
        requiresWallet: user.authType === 'email',
      },
    });
  } catch (error: any) {
    console.error('googleLogin error:', error.message);
    return c.json({ error: 'Google authentication failed' }, 401);
  }
}

export async function walletLogin(c: Context) {
  const { walletAddress, signature, nonce, name } = await c.req.json();
  if (!walletAddress || !signature || !nonce || !name) {
    return c.json({ error: 'Wallet address, signature, nonce, and name required' }, 400);
  }

  try {
    // Verify signature
    const recoveredAddress = ethers.verifyMessage(nonce, signature);
    if (recoveredAddress.toLowerCase() !== walletAddress.toLowerCase()) {
      return c.json({ error: 'Invalid signature' }, 401);
    }

    const user = await verifyWallet(walletAddress, name);
    const token = await generateJWT(user.userId);
    return c.json({
      token,
      user: {
        userId: user.userId,
        name: user.name,
        email: user.emailHash ? 'hidden' : undefined,
        walletAddress,
        role: user.role,
        requiresEmail: user.authType === 'wallet',
      },
    });
  } catch (error: any) {
    console.error('walletLogin error:', error.message);
    return c.json({ error: error.message }, 401);
  }
}

export async function mergeLogin(c: Context) {
  const { email, idToken, walletAddress, signature, nonce, name } = await c.req.json();
  if (!idToken || !email || !walletAddress || !signature || !nonce || !name) {
    return c.json({ error: 'Email, ID token, wallet address, signature, nonce, and name required' }, 400);
  }

  try {
    // Verify Google ID token
    const ticket = await googleClient.verifyIdToken({
      idToken,
      audience: env.GOOGLE_CLIENT_ID,
    });
    const payload = ticket.getPayload();
    if (!payload || payload.email !== email || !payload.name) {
      return c.json({ error: 'Invalid Google ID token' }, 401);
    }

    // Verify wallet signature
    const recoveredAddress = ethers.verifyMessage(nonce, signature);
    if (recoveredAddress.toLowerCase() !== walletAddress.toLowerCase()) {
      return c.json({ error: 'Invalid signature' }, 401);
    }

    const user = await mergeAccounts(email, walletAddress, name);
    const token = await generateJWT(user.userId);
    return c.json({
      token,
      user: {
        userId: user.userId,
        name: user.name,
        email: 'hidden',
        walletAddress: user.walletAddress,
        role: user.role,
        requiresEmail: false,
        requiresWallet: false,
      },
    });
  } catch (error: any) {
    console.error('mergeLogin error:', error.message);
    return c.json({ error: 'Merge authentication failed' }, 401);
  }
}

export async function linkWalletToAccount(c: Context) {
  const userId = c.get('userId');
  const { walletAddress } = await c.req.json();
  if (!walletAddress) return c.json({ error: 'Wallet address required' }, 400);

  try {
    await linkWallet(userId, walletAddress);
    return c.json({ message: 'Wallet linked' });
  } catch (error: any) {
    console.error('linkWalletToAccount error:', error.message);
    return c.json({ error: error.message }, 400);
  }
}

export async function linkEmailToAccount(c: Context) {
  const userId = c.get('userId');
  const { email, idToken } = await c.req.json();
  if (!email || !idToken) return c.json({ error: 'Email and ID token required' }, 400);

  try {
    const ticket = await googleClient.verifyIdToken({
      idToken,
      audience: env.GOOGLE_CLIENT_ID,
    });
    const payload = ticket.getPayload();
    if (!payload || payload.email !== email) {
      return c.json({ error: 'Invalid Google ID token' }, 401);
    }

    await linkEmail(userId, email);
    return c.json({ message: 'Email linked' });
  } catch (error: any) {
    console.error('linkEmailToAccount error:', error.message);
    return c.json({ error: error.message }, 400);
  }
}