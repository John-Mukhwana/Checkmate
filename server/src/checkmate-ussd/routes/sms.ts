import { Hono } from 'hono';
  import { handleInboundSMS } from '../services/smsService';

  const sms = new Hono();

  sms.post('/inbound', async (c) => {
    const body = await c.req.json();
    console.log('Received SMS payload:', JSON.stringify(body, null, 2));
    const { from, text } = body; // Africa's Talking payload
    await handleInboundSMS(from, text);
    return c.text('SMS processed');
  });

  export default sms;