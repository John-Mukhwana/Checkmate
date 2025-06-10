// import { Context, Next } from 'hono';
// import jwt from 'jsonwebtoken';
// import { env } from '../config/env';
// import { connectDB } from '../config/db';

// interface JWTPayload {
//   userId: string;
//   role: 'user' | 'therapist' | 'admin';
//   walletAddress?: string | null;
//   iat?: number;
//   exp?: number;
// }

// export async function verifyJWT(c: Context, next: Next, requiredRole?: 'user' | 'therapist' | 'admin' | 'userOrAdmin' | 'therapistOrAdmin') {
//   const authHeader = c.req.header('Authorization');
//   if (!authHeader || !authHeader.startsWith('Bearer ')) {
//     return c.json({ error: 'Unauthorized: Missing or invalid token' }, 401);
//   }

//   const token = authHeader.split(' ')[1];
//   try {
//     const payload = jwt.verify(token, env.JWT_SECRET) as JWTPayload;
//     if (!payload.userId) {
//       return c.json({ error: 'Invalid token: No userId' }, 401);
//     }

//     const db = await connectDB();
//     const usersCollection = db.collection('users');

//     const user = await usersCollection.findOne({ userId: payload.userId });
//     if (!user) {
//       return c.json({ error: 'User not found' }, 401);
//     }

//     c.set('user', user);
//     c.set('userId', payload.userId);
//     c.set('role', payload.role);
//     c.set('walletAddress', payload.walletAddress);

//     if (requiredRole) {
//       const isUserOrAdmin = requiredRole === 'userOrAdmin' && ['user', 'admin'].includes(payload.role);
//       const isTherapistOrAdmin = requiredRole === 'therapistOrAdmin' && ['therapist', 'admin'].includes(payload.role);
//       const isExactRole = ['user', 'therapist', 'admin'].includes(requiredRole) && payload.role === requiredRole;

//       if (!isUserOrAdmin && !isTherapistOrAdmin && !isExactRole) {
//         return c.json({ error: `Unauthorized: Requires ${requiredRole} role` }, 403);
//       }

//       if (payload.walletAddress && payload.walletAddress !== user.walletAddress) {
//         return c.json({ error: 'Unauthorized: Wallet address mismatch' }, 403);
//       }
//     }

//     await next();
//   } catch (error: any) {
//     return c.json({ error: 'Invalid token: Verification failed' }, 401);
//   }
// }

// export const adminRoleAuth = (c: Context, next: Next) => verifyJWT(c, next, 'admin');
// export const therapistRoleAuth = (c: Context, next: Next) => verifyJWT(c, next, 'therapist');
// export const userRoleAuth = (c: Context, next: Next) => verifyJWT(c, next, 'user');
// export const userOrAdminRoleAuth = (c: Context, next: Next) => verifyJWT(c, next, 'userOrAdmin');
// export const therapistOrAdminRoleAuth = (c: Context, next: Next) => verifyJWT(c, next, 'therapistOrAdmin');


import { Context, Next } from 'hono';
import jwt from 'jsonwebtoken';
import { env } from '../config/env';
import { connectDB } from '../config/db';

interface JWTPayload {
  userId: string;
  role: 'user' | 'therapist' | 'admin';
  walletAddress?: string | null;
  iat?: number;
  exp?: number;
}

export async function verifyJWT(c: Context, next: Next, requiredRole?: 'user' | 'therapist' | 'admin' | 'userOrAdmin' | 'therapistOrAdmin') {
  const authHeader = c.req.header('Authorization');
  console.log('Auth Header:', authHeader || 'None');

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    console.log('Error: Missing or invalid Authorization header');
    return c.json({ error: 'Unauthorized: Missing or invalid token' }, 401);
  }

  const token = authHeader.split(' ')[1];
  try {
    const payload = jwt.verify(token, env.JWT_SECRET) as JWTPayload;
    console.log('JWT Payload:', { userId: payload.userId, role: payload.role, exp: payload.exp });

    if (!payload.userId) {
      console.log('Error: Missing userId in token');
      return c.json({ error: 'Invalid token: No userId' }, 401);
    }

    const db = await connectDB();
    const user = await db.collection('users').findOne({ userId: payload.userId });
    if (!user) {
      console.log('Error: User not found for userId:', payload.userId);
      return c.json({ error: 'Unauthorized: User not found' }, 401);
    }
    console.log('User found:', { userId: user.userId, role: user.role });

    c.set('user', user);
    c.set('userId', payload.userId);
    c.set('role', payload.role);

    if (requiredRole) {
      console.log('Checking role:', { requiredRole, userRole: payload.role });
      if (requiredRole === 'userOrAdmin') {
        if (payload.role === 'user' || payload.role === 'admin') {
          console.log('Role check passed for userOrAdmin:', payload.role);
        } else {
          console.log('Error: Invalid role for userOrAdmin, got:', payload.role);
          return c.json({ error: 'Unauthorized: Requires user or admin role' }, 403);
        }
      } else if (requiredRole === 'therapistOrAdmin') {
        if (payload.role === 'therapist' || payload.role === 'admin') {
          console.log('Role check passed for therapistOrAdmin:', payload.role);
        } else {
          console.log('Error: Invalid role for therapistOrAdmin, got:', payload.role);
          return c.json({ error: 'Unauthorized: Requires therapist or admin role' }, 403);
        }
      } else if (payload.role !== requiredRole) {
        console.log('Error: Exact role required:', requiredRole, 'got:', payload.role);
        return c.json({ error: `Unauthorized: Requires ${requiredRole} role` }, 403);
      }
    }

    await next();
  } catch (error: any) {
    console.log('Error: JWT verification failed:', error.message);
    return c.json({ error: 'Invalid token' }, 401);
  }
}

export const adminRoleAuth = (c: Context, next: Next) => verifyJWT(c, next, 'admin');
export const userRoleAuth = (c: Context, next: Next) => verifyJWT(c, next, 'user');
export const therapistRoleAuth = (c: Context, next: Next) => verifyJWT(c, next, 'therapist');
export const userOrAdminRoleAuth = (c: Context, next: Next) => verifyJWT(c, next, 'userOrAdmin');
export const therapistOrAdminRoleAuth = (c: Context, next: Next) => verifyJWT(c, next, 'therapistOrAdmin');