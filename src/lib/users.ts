// Shared user storage system
// In a real application, this would be replaced with a database

export interface User {
  id: number;
  email: string;
  password: string;
  name: string;
  role: string;
  company: string;
}

// In-memory user storage (replace with database in production)
let users: User[] = [];
let nextUserId = 1;

export const userStorage = {
  // Get all users
  getAll: (): User[] => users,

  // Find user by email
  findByEmail: (email: string): User | undefined => {
    return users.find(u => u.email === email);
  },

  // Find user by ID
  findById: (id: number): User | undefined => {
    return users.find(u => u.id === id);
  },

  // Create new user
  create: (userData: Omit<User, 'id'>): User => {
    const newUser: User = {
      id: nextUserId++,
      ...userData
    };
    users.push(newUser);
    return newUser;
  },

  // Update user
  update: (id: number, userData: Partial<Omit<User, 'id'>>): User | null => {
    const userIndex = users.findIndex(u => u.id === id);
    if (userIndex === -1) return null;
    
    users[userIndex] = { ...users[userIndex], ...userData };
    return users[userIndex];
  },

  // Delete user
  delete: (id: number): boolean => {
    const userIndex = users.findIndex(u => u.id === id);
    if (userIndex === -1) return false;
    
    users.splice(userIndex, 1);
    return true;
  },

  // Check if any users exist
  hasUsers: (): boolean => users.length > 0,

  // Get user count
  count: (): number => users.length
};
