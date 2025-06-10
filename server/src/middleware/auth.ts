import { Context, Next } from 'hono';
import { verify } from 'jsonwebtoken';
import { env } from '../config/env';
import { connectDB } from '../config/db';

interface JWTPayload {
  userId: string;
  role: 'user' | 'therapist' | 'admin';
  walletAddress: string | null;
}

export const authMiddleware = async (c: Context, next: Next, requiredRole: 'user' | 'therapist' | 'admin' | 'userOrAdmin' | 'therapistOrAdmin') => {
  const authHeader = c.req.header('Authorization');
  if (!authHeader) {
    return c.json({ error: 'Token not provided' }, 401);
  }

  const token = authHeader.startsWith('Bearer ') ? authHeader.slice(7) : authHeader;
  try {
    const decoded = verify(token, env.JWT_SECRET) as JWTPayload;
    if (!decoded.userId) {
      return c.json({ error: 'Invalid token: No userId' }, 401);
    }

    const db = await connectDB();
    const user = await db.collection('users').findOne({ userId: decoded.userId });
    if (!user) {
      return c.json({ error: 'User not found' }, 401);
    }

    c.set('userId', decoded.userId);
    c.set('role', decoded.role);
    c.set('walletAddress', decoded.walletAddress);

    if (requiredRole === 'userOrAdmin') {
      if (decoded.role !== 'user' && decoded.role !== 'admin') {
        return c.json({ error: 'Unauthorized: Invalid role' }, 403);
      }
    } else if (requiredRole === 'therapistOrAdmin') {
      if (decoded.role !== 'therapist' && decoded.role !== 'admin') {
        return c.json({ error: 'Unauthorized: Invalid role' }, 403);
      }
    } else if (decoded.role !== requiredRole) {
      return c.json({ error: 'Unauthorized: Invalid role' }, 403);
    }

    if (decoded.walletAddress && decoded.walletAddress !== user.walletAddress) {
      return c.json({ error: 'Unauthorized: Wallet address mismatch' }, 403);
    }

    await next();
  } catch (error) {
    return c.json({ error: 'Invalid token' }, 401);
  }
};

export const adminRoleAuth = (c: Context, next: Next) => authMiddleware(c, next, 'admin');
export const therapistRoleAuth = (c: Context, next: Next) => authMiddleware(c, next, 'therapist');
export const userRoleAuth = (c: Context, next: Next) => authMiddleware(c, next, 'user');
export const userOrAdminRoleAuth = (c: Context, next: Next) => authMiddleware(c, next, 'userOrAdmin');
export const therapistOrAdminRoleAuth = (c: Context, next: Next) => authMiddleware(c, next, 'therapistOrAdmin');