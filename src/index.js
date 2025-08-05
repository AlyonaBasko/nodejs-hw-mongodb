import { config } from 'dotenv';
config(); // зчитує .env

import { initMongoConnection } from './db/initMongoConnection.js';
import { setupServer } from './server.js';

async function startApp() {
  await initMongoConnection(); // 1️⃣ Спочатку підключення до MongoDB
  setupServer();               // 2️⃣ Потім запуск сервера
}

startApp();