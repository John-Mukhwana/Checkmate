// import { connectDB } from '../../config/db';
// import { ObjectId, WithId, OptionalId } from 'mongodb';

// interface Therapist {
//   _id?: ObjectId;
//   userId: string;
//   name: string;
//   pseudonym: string;
//   expertise: string;
//   languages: string[];
//   verifiedHash: string;
//   calendarUrl: string;
//   bookings: { clientId: string; date: Date; status: 'pending' | 'confirmed' | 'cancelled' }[];
//   clients: string[];
//   contacts?: { supportId: string };
//   createdAt: Date;
// }

// export async function createTherapist(data: Partial<Therapist>): Promise<WithId<Therapist>> {
//   if (!data.userId || !data.name || !data.pseudonym || !data.expertise || !data.languages || !data.verifiedHash || !data.calendarUrl) {
//     throw new Error('Missing required fields');
//   }

//   const db = await connectDB();
//   const user = await db.collection('users').findOne({ userId: data.userId });
//   if (!user) throw new Error('User not found');
//   if (user.role !== 'therapist') throw new Error('User must have therapist role');

//   const existingTherapist = await db.collection('therapists').findOne({ userId: data.userId });
//   if (existingTherapist) throw new Error('Therapist profile already exists');

//   const therapist: OptionalId<Therapist> = {
//     userId: data.userId,
//     name: data.name,
//     pseudonym: data.pseudonym,
//     expertise: data.expertise,
//     languages: data.languages,
//     verifiedHash: data.verifiedHash,
//     calendarUrl: data.calendarUrl,
//     bookings: data.bookings || [],
//     clients: data.clients || [],
//     contacts: data.contacts,
//     createdAt: new Date(),
//   };

//   const result = await db.collection('therapists').insertOne(therapist);
//   return { ...therapist, _id: result.insertedId };
// }

// export async function getTherapistById(userId: string): Promise<WithId<Therapist> | null> {
//   const db = await connectDB();
//   return db.collection<Therapist>('therapists').findOne({ userId });
// }

// export async function updateTherapist(userId: string, data: Partial<Therapist>): Promise<WithId<Therapist> | null> {
//   const db = await connectDB();
//   const updateData: Partial<Therapist> = { ...data };
//   delete updateData.userId;
//   delete updateData.createdAt;

//   const result = await db.collection<Therapist>('therapists').findOneAndUpdate(
//     { userId },
//     { $set: { ...updateData, updatedAt: new Date() } },
//     { returnDocument: 'after' }
//   );

//   return result ?? null;
// }

// export async function deleteTherapist(userId: string): Promise<void> {
//   const db = await connectDB();
//   const result = await db.collection('therapists').deleteOne({ userId });
//   if (result.deletedCount === 0) throw new Error('Therapist not found');
// }

// export async function getAllTherapists(): Promise<WithId<Therapist>[]> {
//   const db = await connectDB();
//   return db.collection<Therapist>('therapists').find().toArray();
// }

import { connectDB } from '../../config/db';
import { ObjectId, WithId, OptionalId } from 'mongodb';

interface Therapist {
  _id?: ObjectId;
  userId: string;
  name: string;
  pseudonym: string;
  expertise: string;
  languages: string[];
  verifiedHash: string;
  calendarUrl: string;
  bookings: { clientId: string; date: Date; status: 'pending' | 'confirmed' | 'cancelled' }[];
  clients: string[];
  contacts?: { supportId: string };
  createdAt: Date;
}

export async function createTherapist(data: Partial<Therapist>): Promise<WithId<Therapist>> {
  if (!data.userId || !data.name || !data.pseudonym || !data.expertise || !data.languages || !data.verifiedHash || !data.calendarUrl) {
    throw new Error('Missing required fields');
  }

  const db = await connectDB();
  const user = await db.collection('users').findOne({ userId: data.userId });
  if (!user) {
    throw new Error(`User not found for userId: ${data.userId}`);
  }
  if (user.role !== 'therapist') {
    throw new Error(`User must have therapist role, got: ${user.role}`);
  }

  const existingTherapist = await db.collection('therapists').findOne({ userId: data.userId });
  if (existingTherapist) {
    throw new Error('Therapist profile already exists');
  }

  const therapist: OptionalId<Therapist> = {
    userId: data.userId,
    name: data.name,
    pseudonym: data.pseudonym,
    expertise: data.expertise,
    languages: data.languages,
    verifiedHash: data.verifiedHash,
    calendarUrl: data.calendarUrl,
    bookings: data.bookings || [],
    clients: data.clients || [],
    contacts: data.contacts,
    createdAt: new Date(),
  };

  const result = await db.collection('therapists').insertOne(therapist);
  return { ...therapist, _id: result.insertedId };
}

export async function getTherapistById(userId: string): Promise<WithId<Therapist> | null> {
  const db = await connectDB();
  return db.collection<Therapist>('therapists').findOne({ userId });
}

export async function updateTherapist(userId: string, data: Partial<Therapist>): Promise<WithId<Therapist> | null> {
  const db = await connectDB();
  const updateData: Partial<Therapist> = { ...data };
  delete updateData.userId;
  delete updateData.createdAt;

  const result = await db.collection<Therapist>('therapists').findOneAndUpdate(
    { userId },
    { $set: { ...updateData, updatedAt: new Date() } },
    { returnDocument: 'after' }
  );

  return result ?? null;
}

export async function deleteTherapist(userId: string): Promise<void> {
  const db = await connectDB();
  const result = await db.collection('therapists').deleteOne({ userId });
  if (result.deletedCount === 0) throw new Error('Therapist not found');
}

export async function getAllTherapists(): Promise<WithId<Therapist>[]> {
  const db = await connectDB();
  return db.collection<Therapist>('therapists').find().toArray();
}