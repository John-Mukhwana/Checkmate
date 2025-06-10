import { serve } from '@hono/node-server';
import { env } from './config/env';
import app from './app';
import assert from 'assert';


assert(env.PORT, 'PORT is not set in the .env file');

const port = Number(env.PORT);
console.log(`Server is running on port ${port} 📢`);
serve({
  fetch: app.fetch,
  port,
});