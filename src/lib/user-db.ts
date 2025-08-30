import { eq } from 'drizzle-orm';
import { db } from './db';
import { users, User, NewUser } from './schema';

export interface UserStorage {
  getAll(): Promise<User[]>;
  findByEmail(email: string): Promise<User | undefined>;
  findById(id: number): Promise<User | undefined>;
  create(userData: Omit<User, 'id' | 'createdAt' | 'updatedAt'>): Promise<User>;
  update(id: number, userData: Partial<Omit<User, 'id' | 'createdAt' | 'updatedAt'>>): Promise<User | null>;
  delete(id: number): Promise<boolean>;
  hasUsers(): Promise<boolean>;
  count(): Promise<number>;
}

export const userStorage: UserStorage = {
  // Get all users
  async getAll(): Promise<User[]> {
    try {
      return await db.select().from(users);
    } catch (error) {
      console.error('Error fetching all users:', error);
      throw new Error('Failed to fetch users');
    }
  },

  // Find user by email
  async findByEmail(email: string): Promise<User | undefined> {
    try {
      const result = await db.select().from(users).where(eq(users.email, email));
      return result[0];
    } catch (error) {
      console.error('Error finding user by email:', error);
      throw new Error('Failed to find user by email');
    }
  },

  // Find user by ID
  async findById(id: number): Promise<User | undefined> {
    try {
      const result = await db.select().from(users).where(eq(users.id, id));
      return result[0];
    } catch (error) {
      console.error('Error finding user by ID:', error);
      throw new Error('Failed to find user by ID');
    }
  },

  // Create new user
  async create(userData: Omit<User, 'id' | 'createdAt' | 'updatedAt'>): Promise<User> {
    try {
      const newUserData: NewUser = {
        ...userData,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      
      const result = await db.insert(users).values(newUserData).returning();
      return result[0];
    } catch (error) {
      console.error('Error creating user:', error);
      if (error instanceof Error && error.message.includes('unique constraint')) {
        throw new Error('User with this email already exists');
      }
      throw new Error('Failed to create user');
    }
  },

  // Update user
  async update(id: number, userData: Partial<Omit<User, 'id' | 'createdAt' | 'updatedAt'>>): Promise<User | null> {
    try {
      const updateData = {
        ...userData,
        updatedAt: new Date(),
      };
      
      const result = await db
        .update(users)
        .set(updateData)
        .where(eq(users.id, id))
        .returning();
      
      return result[0] || null;
    } catch (error) {
      console.error('Error updating user:', error);
      throw new Error('Failed to update user');
    }
  },

  // Delete user
  async delete(id: number): Promise<boolean> {
    try {
      const result = await db.delete(users).where(eq(users.id, id)).returning();
      return result.length > 0;
    } catch (error) {
      console.error('Error deleting user:', error);
      throw new Error('Failed to delete user');
    }
  },

  // Check if any users exist
  async hasUsers(): Promise<boolean> {
    try {
      const result = await db.select({ id: users.id }).from(users).limit(1);
      return result.length > 0;
    } catch (error) {
      console.error('Error checking if users exist:', error);
      throw new Error('Failed to check user existence');
    }
  },

  // Get user count
  async count(): Promise<number> {
    try {
      const result = await db.select().from(users);
      return result.length;
    } catch (error) {
      console.error('Error counting users:', error);
      throw new Error('Failed to count users');
    }
  },
};
