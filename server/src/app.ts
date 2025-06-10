import { Hono } from 'hono';
import { logger } from 'hono/logger';
import { csrf } from 'hono/csrf';
import { trimTrailingSlash } from 'hono/trailing-slash';
import { timeout } from 'hono/timeout';
import { cors } from 'hono/cors';
import { HTTPException } from 'hono/http-exception';

import { authRouter } from './Components/auth/auth.router';
import { therapistRouter } from './Components/therapists/therapist.router';
import { journalRouter } from './Components/journals/journal.router';
import learningRouter from './Components/Learning/learning.router';
import ussd from './checkmate-ussd/routes/ussd';
import sms from './checkmate-ussd/routes/sms';


const app = new Hono().basePath('/api');
// Mount USSD routes at root

// Remove COOP/COEP headers if present
app.use('*', async (c, next) => {
  await next();
  c.res.headers.delete('Cross-Origin-Opener-Policy');
  c.res.headers.delete('Cross-Origin-Embedder-Policy');
});

app.use('*', cors({
  origin: ['http://localhost:5173', 'http://localhost:5174', ' https://9f84-102-215-33-50.ngrok-free.app'],
  allowMethods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowHeaders: ['Content-Type', 'Authorization'],
}));

const customTimeoutException = () =>
  new HTTPException(408, {
    message: 'Request timeout after 10 seconds',
  });

app.use(logger());
// app.use(csrf());
app.use('*', async (c, next) => {
  // Disable CSRF for /api/ussd
  const url = c.req.url;
  if (url.includes('/api/ussd')) {
    return next(); // skip CSRF
  }
  return csrf()(c, next); // use CSRF elsewhere
});

app.use(trimTrailingSlash());
app.use('*', timeout(10000, customTimeoutException));

app.get('/', (c) => {
  return c.html(`
    <h1>Welcome to the TelePsyche API</h1>
    <ul>
      <li><b>message:</b> Welcome to TelePsyche API</li>
      <li><b>version:</b> 1.0.0</li>
      <li><b>docs:</b> Query the API for mental health services</li>
    </ul>
  `);
});

app.get('/ok', (c) => {
  return c.text('The server is running!');
});

app.route('/auth', authRouter);
app.route('/therapists', therapistRouter);
app.route('/journals', journalRouter);
app.route('/learning', learningRouter);
app.route('/ussd', ussd);



export default app;