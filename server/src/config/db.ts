import { MongoClient } from 'mongodb';
import { env } from './env';

let client: MongoClient;
let db: ReturnType<MongoClient['db']>;

export async function connectDB() {
  if (db) return db;
  client = new MongoClient(env.MONGODB_URI);
  await client.connect();
  db = client.db('checkmate');
  console.log('MongoDB connected to:', db.databaseName);
  return db;
}