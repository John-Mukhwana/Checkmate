import { connectDB } from '../config/db';
import { hashData } from '../utils/hash';
import { v4 as uuidv4 } from 'uuid';

async function resetDB() {
  try {
    const db = await connectDB();
    console.log('Connected to database:', db.databaseName); // Debug database
    const usersCollection = db.collection('users');
    const authCollection = db.collection('auth');
    const therapistsCollection = db.collection('therapists');

    // Clear collections
    await usersCollection.deleteMany({});
    await authCollection.deleteMany({});
    await therapistsCollection.deleteMany({});
    console.log('Collections cleared');

    // Remove validators
    await db.command({ collMod: 'users', validator: {} });
    await db.command({ collMod: 'auth', validator: {} });
    await db.command({ collMod: 'therapists', validator: {} });
    console.log('Validators removed');

    // Drop existing indexes
    await usersCollection.dropIndexes();
    await authCollection.dropIndexes();
    await therapistsCollection.dropIndexes();
    console.log('Indexes dropped');

    // Recreate indexes
    await usersCollection.createIndex({ userId: 1 }, { unique: true });
    await usersCollection.createIndex({ emailHash: 1 }, { unique: true, sparse: true });
    await usersCollection.createIndex({ walletAddress: 1 }, { unique: true, sparse: true });
    await authCollection.createIndex({ userId: 1 }, { unique: true });
    await therapistsCollection.createIndex({ userId: 1 }, { unique: true });
    await therapistsCollection.createIndex({ pseudonym: 1 }, { unique: true });
    await therapistsCollection.createIndex({ verifiedHash: 1 }, { unique: true });
    console.log('Indexes recreated');

    // Insert test users
    const adminUserId = '042db525-a85a-4e98-a362-e8c0b5e3b7ce';
    const therapistUserId = uuidv4();
    const testUserId = uuidv4();
    await usersCollection.insertMany([
      {
        userId: adminUserId,
        name: 'Admin User',
        emailHash: hashData('admin@example.com'),
        authType: 'email',
        role: 'admin',
        createdAt: new Date(),
      },
      {
        userId: therapistUserId,
        name: 'Therapist User',
        walletAddress: '0x1234567890abcdef1234567890abcdef12345678',
        authType: 'wallet',
        role: 'therapist',
        createdAt: new Date(),
      },
      {
        userId: testUserId,
        name: 'Test User',
        emailHash: hashData('test@example.com'),
        authType: 'email',
        role: 'user',
        createdAt: new Date(),
      },
    ]);
    console.log('Users inserted');
    console.log('Admin userId:', adminUserId);
    console.log('Therapist userId:', therapistUserId);
    console.log('Test userId:', testUserId);

    // Verify insertion
    const adminUser = await usersCollection.findOne({ userId: adminUserId });
    console.log('Verified admin user:', adminUser);

    process.exit(0);
  } catch (error) {
    console.error('Failed to reset database:', error);
    process.exit(1);
  }
}

resetDB();