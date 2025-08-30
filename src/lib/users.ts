// User storage system with PostgreSQL database
// This replaces the previous in-memory storage with persistent database storage

import { userStorage as dbUserStorage } from './user-db';

// Re-export types from schema
export type { User } from './schema';

// Re-export the database-powered userStorage
export const userStorage = dbUserStorage;
