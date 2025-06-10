// // import AfricasTalking from 'africastalking';
// // import { connectDB } from '../utils/db';
// // import dotenv from 'dotenv';

// // dotenv.config();

// // const africasTalking =  AfricasTalking({
// //   apiKey: process.env.AFRICASTALKING_API_KEY || '',
// //   username: process.env.AFRICASTALKING_USERNAME || 'sandbox',
// // });

// // const sms = africasTalking.SMS;

// // interface SMSLog {
// //   _id?: string;
// //   phoneNumber: string;
// //   message: string;
// //   type: 'outbound' | 'inbound';
// //   timestamp: Date;
// // }

// // export async function sendSMS(phoneNumber: string, message: string) {
// //   try {
// //     const result = await sms.send({
// //       to: [phoneNumber],
// //       message,
// //       from: 'TelePsyche', // Replace with your shortcode or Sender ID
// //     });
// //     console.log('SMS sent:', result);

// //     const db = await connectDB();
// //     const smsLogs = db.collection<SMSLog>('sms_logs');
// //     await smsLogs.insertOne({
// //       phoneNumber,
// //       message,
// //       type: 'outbound',
// //       timestamp: new Date(),
// //     });

// //     return result;
// //   } catch (err) {
// //     console.error('SMS sending error:', err);
// //     throw err;
// //   }
// // }

// // export async function handleInboundSMS(phoneNumber: string, text: string) {
// //   const db = await connectDB();
// //   const smsLogs = db.collection<SMSLog>('sms_logs');

// //   await smsLogs.insertOne({
// //     phoneNumber,
// //     message: text,
// //     type: 'inbound',
// //     timestamp: new Date(),
// //   });

// //   let responseMessage = '';
// //   if (text.toUpperCase() === 'HELP') {
// //     responseMessage = 'We’re here for you. Call 1195 or reply TALK to connect with a therapist.';
// //   } else {
// //     responseMessage = 'Thank you for your message. Text HELP for support or dial *384*96312# for more options.';
// //   }

// //   await sendSMS(phoneNumber, responseMessage);
// // }

// import AfricasTalking from 'africastalking';
// import { connectDB } from '../utils/db';
// import dotenv from 'dotenv';

// dotenv.config();

// const africasTalking = AfricasTalking({
//   apiKey: process.env.AFRICASTALKING_API_KEY || '',
//   username: process.env.AFRICASTALKING_USERNAME || 'sandbox',
// });

// const sms = africasTalking.SMS;

// interface SMSLog {
//   _id?: string;
//   phoneNumber: string;
//   message: string;
//   type: 'outbound' | 'inbound';
//   timestamp: Date;
// }

// export async function sendSMS(phoneNumber: string, message: string) {
//   try {
//     const result = await sms.send({
//       to: [phoneNumber],
//       message,
//       from: '', // Use default sandbox Sender ID or replace with your registered shortcode/Sender ID (e.g., '12345' or 'TelePsyche')
//     });
//     console.log('SMS sent:', result);

//     // Check for InvalidSenderId
//     if (result.Message === 'InvalidSenderId') {
//       throw new Error('Invalid Sender ID. Check your Africas Talking dashboard for a registered Sender ID or shortcode.');
//     }

//     const db = await connectDB();
//     const smsLogs = db.collection<SMSLog>('sms_logs');
//     await smsLogs.insertOne({
//       phoneNumber,
//       message,
//       type: 'outbound',
//       timestamp: new Date(),
//     });

//     return result;
//   } catch (err) {
//     console.error('SMS sending error:', err);
//     throw err;
//   }
// }

// export async function handleInboundSMS(phoneNumber: string, text: string) {
//   const db = await connectDB();
//   const smsLogs = db.collection<SMSLog>('sms_logs');

//   await smsLogs.insertOne({
//     phoneNumber,
//     message: text,
//     type: 'inbound',
//     timestamp: new Date(),
//   });

//   let responseMessage = '';
//   if (text.toUpperCase() === 'HELP') {
//     responseMessage = 'We’re here for you. Call 1195 or reply TALK to connect with a therapist.';
//   } else if (text.toUpperCase() === 'TALK') {
//     responseMessage = 'A therapist will contact you soon. Please provide a preferred time (e.g., 2 PM).';
//   } else {
//     responseMessage = 'Thank you for your message. Text HELP for support or dial *384*96312# for more options.';
//   }

//   await sendSMS(phoneNumber, responseMessage);
// }



import AfricasTalking from 'africastalking';
import { connectDB } from '../utils/db';
import dotenv from 'dotenv';

dotenv.config();

const africasTalking =  AfricasTalking({
  apiKey: process.env.AFRICASTALKING_API_KEY || '',
  username: process.env.AFRICASTALKING_USERNAME || 'sandb',
});

const sms = africasTalking.SMS;

interface SMSLog {
  _id?: string;
  phoneNumber: string;
  message: string;
  type: 'outbound' | 'inbound';
  timestamp: Date;
}

const learningNotes: { [key: string]: string } = {
  ANXIETY: 'Anxiety Tip: Count slowly to 10 while breathing deeply. Text MORE_ANXIETY for further resources.',
  STRESS: 'Stress Tip: Try a 5-min walk or write down what’s bothering you. Text MORE_STRESS for more.',
  DEPRESSION: 'Depression Tip: Connect with a loved one or call 1195 for support. Text MORE_DEPRESSION for resources.',
  MORE_ANXIETY: 'Visit www.mentalhealthkenya.org for anxiety resources or call 1195 for immediate help.',
  MORE_STRESS: 'Check www.mind.org for stress management techniques or dial *384*96312# for more.',
  MORE_DEPRESSION: 'Learn more at www.nami.org or call 1195 for professional support.',
};

export async function sendSMS(phoneNumber: string, message: string) {
  try {
    const result = await sms.send({
      to: [phoneNumber],
      message,
      from: '', // Use default sandbox Sender ID or replace with your registered shortcode/Sender ID
    });
    console.log('SMS sent:', result);

    if (result.Message === 'InvalidSenderId') {
      throw new Error('Invalid Sender ID. Check your Africas Talking dashboard.');
    }

    const db = await connectDB();
    const smsLogs = db.collection<SMSLog>('sms_logs');
    await smsLogs.insertOne({
      phoneNumber,
      message,
      type: 'outbound',
      timestamp: new Date(),
    });

    return result;
  } catch (err) {
    console.error('SMS sending error:', JSON.stringify(err, null, 2));
    throw err;
  }
}

export async function handleInboundSMS(phoneNumber: string, text: string) {
  const db = await connectDB();
  const smsLogs = db.collection<SMSLog>('sms_logs');

  await smsLogs.insertOne({
    phoneNumber,
    message: text,
    type: 'inbound',
    timestamp: new Date(),
  });

  const upperText = text.toUpperCase().trim();
  let responseMessage = learningNotes[upperText] || '';

  if (!responseMessage) {
    if (upperText === 'HELP') {
      responseMessage = 'We’re here for you. Call 1195 or reply TALK to connect with a therapist.';
    } else if (upperText === 'TALK') {
      responseMessage = 'A therapist will contact you soon. Provide a preferred time (e.g., 2 PM).';
    } else {
      responseMessage = 'Text ANXIETY, STRESS, DEPRESSION, or HELP for support. Dial *384*96312# for more.';
    }
  }

  await sendSMS(phoneNumber, responseMessage);
}