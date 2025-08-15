import { config } from 'dotenv';
config();

import { initMongoConnection } from './db/initMongoConnection.js';
import { setupServer } from './server.js';

async function startApp() {
  try {
    await initMongoConnection(); 
    setupServer();
  } catch (err) {
    console.error("Failed to start app:", err);
    process.exit(1);
  }
}

startApp();
