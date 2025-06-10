
// import { connectDB } from '../../config/db';
// import { hashData } from '../../utils/hash';
// import { v4 as uuidv4 } from 'uuid';
// import * as jwt from 'jsonwebtoken';
// import { env } from '../../config/env';
// import Web3 from 'web3';
// import { ObjectId, WithId, OptionalId } from 'mongodb';

// const web3 = new Web3(env.POLYGON_RPC);

// interface User {
//   _id?: ObjectId;
//   userId: string;
//   name: string;
//   emailHash?: string;
//   walletAddress?: string;
//   authType: 'email' | 'wallet' | 'both';
//   role: 'user' | 'therapist' | 'admin';
//   createdAt: Date;
// }

// export async function generateNonce(userId: string): Promise<string> {
//   if (!userId) throw new Error('User ID required');
//   const nonce = Math.random().toString(36).substring(2, 15);
//   const db = await connectDB();
//   await db.collection('auth').updateOne(
//     { userId },
//     { $set: { nonce, createdAt: new Date() } },
//     { upsert: true }
//   );
//   return nonce;
// }

// export async function verifyWallet(walletAddress: string, name: string): Promise<User> {
//   if (!web3.utils.isAddress(walletAddress)) throw new Error('Invalid wallet address');
//   if (!name) throw new Error('Name required');

//   const db = await connectDB();
//   const userCollection = db.collection<User>('users');
//   let user: WithId<User> | null = await userCollection.findOne({ walletAddress });

//   if (user) {
//     if (user.name !== name) {
//       await userCollection.updateOne({ walletAddress }, { $set: { name } });
//       user = await userCollection.findOne({ walletAddress }) as WithId<User>;
//     }
//     return user;
//   }

//   const userId = uuidv4();
//   const newUser: OptionalId<User> = {
//     userId,
//     name,
//     walletAddress,
//     authType: 'wallet',
//     role: 'user',
//     createdAt: new Date(),
//   };
//   await userCollection.insertOne(newUser);
//   user = await userCollection.findOne({ userId }) as WithId<User>;
//   if (!user) throw new Error('User creation failed');
//   return user;
// }

// export async function verifyEmail(email: string, name: string): Promise<User> {
//   if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) throw new Error('Invalid email');
//   if (!name) throw new Error('Name required');

//   const emailHash = hashData(email);
//   const db = await connectDB();
//   const userCollection = db.collection<User>('users');
//   let user: WithId<User> | null = await userCollection.findOne({ emailHash });

//   if (user) {
//     if (user.name !== name) {
//       await userCollection.updateOne({ emailHash }, { $set: { name } });
//       user = await userCollection.findOne({ emailHash }) as WithId<User>;
//     }
//     return user;
//   }

//   const userId = uuidv4();
//   const newUser: OptionalId<User> = {
//     userId,
//     name,
//     emailHash,
//     authType: 'email',
//     role: 'user',
//     createdAt: new Date(),
//   };
//   await userCollection.insertOne(newUser);
//   user = await userCollection.findOne({ userId }) as WithId<User>;
//   if (!user) throw new Error('User creation failed');
//   return user;
// }

// export async function linkWallet(userId: string, walletAddress: string): Promise<void> {
//   if (!web3.utils.isAddress(walletAddress)) throw new Error('Invalid wallet address');
//   const db = await connectDB();
//   const userCollection = db.collection<User>('users');
//   const user = await userCollection.findOne({ userId });
//   if (!user) throw new Error('User not found');
//   if (user.authType === 'both' || user.walletAddress) throw new Error('Wallet already linked');

//   await userCollection.updateOne(
//     { userId },
//     { $set: { walletAddress, authType: 'both' } }
//   );
// }

// export async function linkEmail(userId: string, email: string): Promise<void> {
//   if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) throw new Error('Invalid email');
//   const emailHash = hashData(email);
//   const db = await connectDB();
//   const userCollection = db.collection<User>('users');
//   const user = await userCollection.findOne({ userId });
//   if (!user) throw new Error('User not found');
//   if (user.authType === 'both' || user.emailHash) throw new Error('Email already linked');

//   await userCollection.updateOne(
//     { userId },
//     { $set: { emailHash, authType: 'both' } }
//   );
// }

// export async function generateJWT(userId: string): Promise<string> {
//   const db = await connectDB();
//   const userCollection = db.collection<User>('users');
//   const user = await userCollection.findOne({ userId });
//   if (!user) throw new Error('User not found');

//   const payload = {
//     userId,
//     role: user.role,
//     walletAddress: user.walletAddress || null,
//   };
//   const token = jwt.sign(payload, env.JWT_SECRET, { expiresIn: '7d' });
//   await db.collection('auth').updateOne(
//     { userId },
//     { $set: { jwt: token, createdAt: new Date() } },
//     { upsert: true }
//   );
//   return token;
// }


import { connectDB } from '../../config/db';
import { hashData } from '../../utils/hash';
import { v4 as uuidv4 } from 'uuid';
import * as jwt from 'jsonwebtoken';
import { env } from '../../config/env';
import Web3 from 'web3';
import { ObjectId, WithId, OptionalId } from 'mongodb';

const web3 = new Web3(env.POLYGON_RPC);

interface User {
  _id?: ObjectId;
  userId: string;
  name: string;
  emailHash?: string;
  walletAddress?: string;
  authType: 'email' | 'wallet' | 'both';
  role: 'user' | 'therapist' | 'admin';
  createdAt: Date;
  updatedAt?: Date;
  jwtVersion: number;
}

export async function generateNonce(userId: string): Promise<string> {
  if (!userId) throw new Error('User ID required');
  const nonce = Math.random().toString(36).substring(2, 15);
  const db = await connectDB();
  await db.collection('auth').updateOne(
    { userId },
    { $set: { nonce, createdAt: new Date() } },
    { upsert: true }
  );
  return nonce;
}

export async function verifyWallet(walletAddress: string, name: string): Promise<WithId<User>> {
  if (!web3.utils.isAddress(walletAddress)) throw new Error('Invalid wallet address');
  if (!name) throw new Error('Name required');

  const db = await connectDB();
  const userCollection = db.collection<User>('users');
  let user = await userCollection.findOne({ walletAddress });

  if (user) {
    if (user.name !== name) {
      await userCollection.updateOne({ walletAddress }, { $set: { name, updatedAt: new Date() } });
      user = await userCollection.findOne({ walletAddress }) as WithId<User>;
    }
    return user;
  }

  const userId = uuidv4();
  const newUser: OptionalId<User> = {
    userId,
    name,
    walletAddress,
    authType: 'wallet',
    role: 'user',
    createdAt: new Date(),
    jwtVersion: 1,
  };
  await userCollection.insertOne(newUser);
  user = await userCollection.findOne({ userId }) as WithId<User>;
  if (!user) throw new Error('User creation failed');
  return user;
}

export async function verifyEmail(email: string, name: string): Promise<WithId<User>> {
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) throw new Error('Invalid email');
  if (!name) throw new Error('Name required');

  const emailHash = hashData(email);
  const db = await connectDB();
  const userCollection = db.collection<User>('users');
  let user = await userCollection.findOne({ emailHash });

  if (user) {
    if (user.name !== name) {
      await userCollection.updateOne({ emailHash }, { $set: { name, updatedAt: new Date() } });
      user = await userCollection.findOne({ emailHash }) as WithId<User>;
    }
    return user;
  }

  const userId = uuidv4();
  const newUser: OptionalId<User> = {
    userId,
    name,
    emailHash,
    authType: 'email',
    role: 'user',
    createdAt: new Date(),
    jwtVersion: 1,
  };
  await userCollection.insertOne(newUser);
  user = await userCollection.findOne({ userId }) as WithId<User>;
  if (!user) throw new Error('User creation failed');
  return user;
}

export async function linkWallet(userId: string, walletAddress: string): Promise<void> {
  if (!web3.utils.isAddress(walletAddress)) throw new Error('Invalid wallet address');
  const db = await connectDB();
  const userCollection = db.collection<User>('users');
  const user = await userCollection.findOne({ userId });
  if (!user) throw new Error('User not found');
  if (user.authType === 'both' || user.walletAddress) throw new Error('Wallet already linked');

  await userCollection.updateOne(
    { userId },
    { $set: { walletAddress, authType: user.authType === 'email' ? 'both' : 'wallet', updatedAt: new Date() } }
  );
}

export async function linkEmail(userId: string, email: string): Promise<void> {
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) throw new Error('Invalid email');
  const emailHash = hashData(email);
  const db = await connectDB();
  const userCollection = db.collection<User>('users');
  const user = await userCollection.findOne({ userId });
  if (!user) throw new Error('User not found');
  if (user.authType === 'both' || user.emailHash) throw new Error('Email already linked');

  await userCollection.updateOne(
    { userId },
    { $set: { emailHash, authType: user.authType === 'wallet' ? 'both' : 'email', updatedAt: new Date() } }
  );
}

export async function mergeAccounts(email: string, walletAddress: string, name: string): Promise<WithId<User>> {
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) throw new Error('Invalid email');
  if (!web3.utils.isAddress(walletAddress)) throw new Error('Invalid wallet address');
  if (!name) throw new Error('Name required');

  const emailHash = hashData(email);
  const db = await connectDB();
  const userCollection = db.collection<User>('users');

  let user = await userCollection.findOne({ $or: [{ emailHash }, { walletAddress }] });
  if (user) {
    const updateData: Partial<User> = {
      emailHash,
      walletAddress,
      name,
      authType: 'both',
      updatedAt: new Date(),
    };
    await userCollection.updateOne(
      { userId: user.userId },
      { $set: updateData }
    );
    user = await userCollection.findOne({ userId: user.userId }) as WithId<User>;
    return user;
  }

  const userId = uuidv4();
  const newUser: OptionalId<User> = {
    userId,
    name,
    emailHash,
    walletAddress,
    authType: 'both',
    role: 'user',
    createdAt: new Date(),
    jwtVersion: 1,
  };
  await userCollection.insertOne(newUser);
  user = await userCollection.findOne({ userId }) as WithId<User>;
  if (!user) throw new Error('User creation failed');
  return user;
}

export async function generateJWT(userId: string): Promise<string> {
  const db = await connectDB();
  const userCollection = db.collection<User>('users');
  const user = await userCollection.findOne({ userId });
  if (!user) throw new Error('User not found');

  const payload = {
    userId,
    role: user.role,
    walletAddress: user.walletAddress || null,
    jwtVersion: user.jwtVersion,
  };
  const token = jwt.sign(payload, env.JWT_SECRET, { expiresIn: '7d' });
  await db.collection('auth').updateOne(
    { userId },
    { $set: { jwt: token, createdAt: new Date() } },
    { upsert: true }
  );
  return token;
}