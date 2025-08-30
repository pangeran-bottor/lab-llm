import { migrate } from 'drizzle-orm/node-postgres/migrator';
import { db } from './db';

async function runMigrations() {
  try {
    console.log('🔄 Running database migrations...');
    
    await migrate(db, { 
      migrationsFolder: './drizzle' 
    });
    
    console.log('✅ Database migrations completed successfully');
    process.exit(0);
  } catch (error) {
    console.error('❌ Database migration failed:', error);
    process.exit(1);
  }
}

// Run migrations if this file is executed directly
if (require.main === module) {
  runMigrations();
}

export { runMigrations };
