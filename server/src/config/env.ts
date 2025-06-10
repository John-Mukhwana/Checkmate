import { config } from 'dotenv';
import * as fs from 'fs';

config();

export const env = {
  MONGODB_URI: process.env.MONGODB_URI || '',
  JWT_SECRET: process.env.JWT_SECRET || '',
  // FIREBASE_CONFIG: process.env.FIREBASE_SERVICE_ACCOUNT_PATH
  //   ? JSON.parse(fs.readFileSync(process.env.FIREBASE_SERVICE_ACCOUNT_PATH, 'utf8'))
  //   : JSON.parse(process.env.FIREBASE_CONFIG || '{}'),
  POLYGON_RPC: process.env.POLYGON_RPC || '',
  PORT: process.env.PORT || '3000',
  GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID || '',
};