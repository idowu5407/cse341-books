
import { MongoClient } from 'mongodb';

let database;
let client;

const connectToDb = async () => {
  try {
    const connectionString = process.env.MONGODB_URI;

    if (!connectionString) {
      throw new Error('MONGODB_URI is required.');
    }

    client = new MongoClient(connectionString, {
      serverSelectionTimeoutMS: 15000,
      connectTimeoutMS: 15000
    });

    console.log('Attempting MongoDB connection...');

    await client.connect();

    database = client.db(
      process.env.MONGODB_DB_NAME || 'cse341-books-db'
    );

    console.log('MongoDB connected successfully!');

    return database;

  } catch (error) {
    console.error('MongoDB connection error:', error.message);
    throw error;
  }
};

const getDb = () => {
  if (!database) {
    throw new Error('Database not initialized. Call connectToDb first.');
  }

  return database;
};

export { connectToDb, getDb };
