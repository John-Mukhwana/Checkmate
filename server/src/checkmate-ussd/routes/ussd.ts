// import { Hono } from 'hono';
// import { handleUSSD } from '../services/ussdService';

// const ussd = new Hono();

// ussd.post('/', async (c) => {
//   console.log('Received USSD request:', await c.req.json()); // Debug log
//   const { sessionId, phoneNumber, text } = await c.req.json();
//   const response = await handleUSSD(sessionId, phoneNumber, text);
//   return c.text(response);
// });

// export default ussd;

import { Hono } from 'hono';
import { handleUSSD } from '../services/ussdService';

const ussd = new Hono();

// ussd.post('/', async (c) => {
//   const body = await c.req.parseBody(); // ✅ fix for Africa's Talking
//   const { sessionId, phoneNumber, text } = body;
//   const response = await handleUSSD(sessionId as string, phoneNumber as string, text as string);
//   return c.text(response);
// });

ussd.post('/', async (c) => {
  const body = await c.req.parseBody(); // ✅ parse x-www-form-urlencoded
  const sessionId = body['sessionId'] as string;
  const phoneNumber = body['phoneNumber'] as string;
  const text = body['text'] as string;

  const response = await handleUSSD(sessionId, phoneNumber, text);
  return c.text(response);
});


export default ussd;
