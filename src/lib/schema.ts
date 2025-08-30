import { pgTable, serial, varchar, timestamp, text } from 'drizzle-orm/pg-core';
import { InferSelectModel, InferInsertModel } from 'drizzle-orm';

// Users table schema
export const users = pgTable('users', {
  id: serial('id').primaryKey(),
  email: varchar('email', { length: 255 }).notNull().unique(),
  password: text('password').notNull(),
  name: varchar('name', { length: 255 }).notNull(),
  role: varchar('role', { length: 50 }).notNull().default('user'),
  company: varchar('company', { length: 255 }).notNull().default('N/A'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

// Type definitions
export type User = InferSelectModel<typeof users>;
export type NewUser = InferInsertModel<typeof users>;

// Export for use in database operations
export { users as userTable };
