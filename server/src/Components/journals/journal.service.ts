import { connectDB } from '../../config/db';
import { ObjectId, WithId, OptionalId } from 'mongodb';

interface Journal {
  _id?: ObjectId;
  userId: string;
  type: 'text' | 'voice';
  content?: string;
  ipfsUrl?: string;
  transcript?: string;
  moodScore: number;
  blockchainHash: string;
  createdAt: Date;
}

export async function createJournal(data: Partial<Journal>): Promise<WithId<Journal>> {
  if (!data.userId || !data.type || !data.moodScore || !data.blockchainHash) {
    throw new Error('Missing required fields: userId, type, moodScore, blockchainHash');
  }
  if (data.type === 'text' && !data.content) {
    throw new Error('Content required for text journal');
  }
  if (data.type === 'voice' && !data.ipfsUrl) {
    throw new Error('ipfsUrl required for voice journal');
  }
  if (data.moodScore < 0 || data.moodScore > 1) {
    throw new Error('moodScore must be between 0.0 and 1.0');
  }

  const db = await connectDB();
  const journalsCollection = db.collection('journals');

  const journal: OptionalId<Journal> = {
    userId: data.userId,
    type: data.type,
    content: data.content,
    ipfsUrl: data.ipfsUrl,
    transcript: data.transcript,
    moodScore: data.moodScore,
    blockchainHash: data.blockchainHash,
    createdAt: new Date(),
  };

  const result = await journalsCollection.insertOne(journal);
  console.log('createJournal: Created journal for userId:', data.userId, 'with _id:', result.insertedId);
  return { ...journal, _id: result.insertedId };
}

export async function getJournalById(id: string): Promise<WithId<Journal> | null> {
  const db = await connectDB();
  let journal: WithId<Journal> | null = null;
  try {
    journal = await db.collection<Journal>('journals').findOne({ _id: new ObjectId(id) });
  } catch (error) {
    console.log('getJournalById: Invalid ObjectId:', id);
  }
  console.log('getJournalById: Result for _id:', id, journal ? 'Found' : 'Not found');
  return journal;
}

export async function getJournalsByUserId(userId: string): Promise<WithId<Journal>[]> {
  const db = await connectDB();
  const journals = await db.collection<Journal>('journals').find({ userId }).toArray();
  console.log('getJournalsByUserId: Fetched:', journals.length, 'journals for userId:', userId);
  return journals;
}

export async function updateJournal(id: string, userId: string, data: Partial<Journal>): Promise<WithId<Journal> | null> {
  const db = await connectDB();
  const updateData: Partial<Journal> = { ...data };
  delete updateData.userId;
  delete updateData.createdAt;
  delete updateData._id;

  if (updateData.moodScore && (updateData.moodScore < 0 || updateData.moodScore > 1)) {
    throw new Error('moodScore must be between 0.0 and 1.0');
  }

  let result: WithId<Journal> | null = null;
  try {
    result = await db.collection<Journal>('journals').findOneAndUpdate(
      { _id: new ObjectId(id), userId },
      { $set: { ...updateData, updatedAt: new Date() } },
      { returnDocument: 'after' }
    );
  } catch (error) {
    console.log('updateJournal: Invalid ObjectId:', id);
  }
  console.log('updateJournal: Updated journal _id:', id, 'for userId:', userId, result ? 'Success' : 'Not found');
  return result;
}

export async function deleteJournal(id: string, userId: string): Promise<void> {
  const db = await connectDB();
  let result;
  try {
    result = await db.collection('journals').deleteOne({ _id: new ObjectId(id), userId });
  } catch (error) {
    console.log('deleteJournal: Invalid ObjectId:', id);
    throw new Error('Invalid journal ID');
  }
  if (result.deletedCount === 0) {
    console.log('deleteJournal: Journal not found for _id:', id, 'userId:', userId);
    throw new Error('Journal not found or unauthorized');
  }
  console.log('deleteJournal: Deleted journal _id:', id, 'for userId:', userId);
}