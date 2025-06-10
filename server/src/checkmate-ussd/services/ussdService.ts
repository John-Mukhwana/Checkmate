// import { ussdFlow } from '../utils/ussdFlow';
// import { connectDB } from './../../config/db';
// import { WithId, Document } from 'mongodb';

// // Define Session interface for MongoDB documents
// interface Session extends Document {
//   _id?: string; // Optional _id, added by MongoDB
//   sessionId: string;
//   phoneNumber: string;
//   state: string;
//   lastInput: string;
//   updatedAt?: Date;
// }

// // Define USSD flow state type
// interface FlowState {
//   message: string;
//   options?: { [key: string]: string }; // Index signature for dynamic keys
// }

// export async function handleUSSD(sessionId: string, phoneNumber: string, text: string) {
//   const db = await connectDB();
//   const sessions = db.collection<Session>('sessions');

//   // Fetch existing session
//   let session = await sessions.findOne({ sessionId });

//   // Initialize new session if none exists
//   if (!session) {
//     const newSession: Session = {
//       sessionId,
//       phoneNumber,
//       state: 'welcome',
//       lastInput: '',
//       updatedAt: new Date(),
//     };
//     const result = await sessions.insertOne(newSession);
//     session = { ...newSession, _id: result.insertedId.toString() };
//   }

//   // Split input to handle multi-level inputs (e.g., "1*2")
//   const inputs = text.split('*').filter(Boolean);
//   const currentInput = inputs[inputs.length - 1] || '';

//   // Get current state from flow
//   const currentState = ussdFlow[session.state as keyof typeof ussdFlow] as FlowState;
//   let response = 'CON ' + currentState.message;
//   let nextState = session.state;

//   // Handle user input
//   if (currentInput && currentState.options && currentState.options[currentInput]) {
//     nextState = currentState.options[currentInput];
//     response = 'CON ' + (ussdFlow[nextState as keyof typeof ussdFlow] as FlowState).message;
//   } else if (currentInput && !currentState.options) {
//     response = 'END Thank you for using TelePsyche!';
//   } else if (currentInput && currentState.options && !currentState.options[currentInput]) {
//     response = 'CON Invalid input. ' + currentState.message;
//   }

//   // Update session
//   await sessions.updateOne(
//     { sessionId },
//     { $set: { state: nextState, lastInput: currentInput, updatedAt: new Date() } }
//   );

//   return response;
// }












// import { ussdFlow } from '../utils/ussdFlow';
// import { connectDB } from '../utils/db';
// import { WithId, Document } from 'mongodb';
// import { sendSMS } from './smsService';

// interface Session extends Document {
//   _id?: string;
//   sessionId: string;
//   phoneNumber: string;
//   state: string;
//   lastInput: string;
//   updatedAt?: Date;
// }

// interface FlowState {
//   message: string;
//   options?: { [key: string]: string };
// }

// export async function handleUSSD(sessionId: string, phoneNumber: string, text: string) {
//   const db = await connectDB();
//   const sessions = db.collection<Session>('sessions');

//   let session = await sessions.findOne({ sessionId });

//   if (!session) {
//     const newSession: Session = {
//       sessionId,
//       phoneNumber,
//       state: 'welcome',
//       lastInput: '',
//       updatedAt: new Date(),
//     };
//     const result = await sessions.insertOne(newSession);
//     session = { ...newSession, _id: result.insertedId.toString() };
//   }

//   const inputs = text.split('*').filter(Boolean);
//   const currentInput = inputs[inputs.length - 1] || '';

//   const currentState = ussdFlow[session.state as keyof typeof ussdFlow] as FlowState;
//   let response = 'CON ' + currentState.message;
//   let nextState = session.state;

//   if (currentInput && currentState.options && currentState.options[currentInput]) {
//     nextState = currentState.options[currentInput];
//     response = 'CON ' + (ussdFlow[nextState as keyof typeof ussdFlow] as FlowState).message;

//     // Send SMS for specific states
//     if (nextState === 'anxious') {
//       await sendSMS(phoneNumber, 'It’s okay to feel anxious. Try deep breathing and call 1195 if you need help.');
//     } else if (nextState === 'motivation') {
//       await sendSMS(phoneNumber, 'You’re stronger than you know! Keep pushing forward.');
//     } else if (nextState === 'therapist') {
//       await sendSMS(phoneNumber, 'A therapist will reach out soon. Reply TALK to confirm a time.');
//     }
//   } else if (currentInput && !currentState.options) {
//     response = 'END Thank you for using TelePsyche!';
//   } else if (currentInput && currentState.options && !currentState.options[currentInput]) {
//     response = 'CON Invalid input. ' + currentState.message;
//   }

//   await sessions.updateOne(
//     { sessionId },
//     { $set: { state: nextState, lastInput: currentInput, updatedAt: new Date() } }
//   );

//   return response;
// }









import { ussdFlow } from '../utils/ussdFlow';
import { connectDB } from '../utils/db';
import { WithId, Document } from 'mongodb';
import { sendSMS } from './smsService';

interface Session extends Document {
  _id?: string;
  sessionId: string;
  phoneNumber: string;
  state: string;
  lastInput: string;
  updatedAt?: Date;
}

interface FlowState {
  message: string;
  options?: { [key: string]: string };
}

const learningNotes: { [key: string]: string } = {
  learn_anxiety: 'Anxiety: Feeling nervous is normal. Try deep breathing or grounding (name 5 things you see). Text ANXIETY for more.',
  learn_stress: 'Stress Management: Take breaks, exercise, or journal your thoughts. Text STRESS for more tips.',
  learn_depression: 'Depression: Low mood can be tough. Reach out to friends or call 1195. Text DEPRESSION for more.',
};

export async function handleUSSD(sessionId: string, phoneNumber: string, text: string) {
  const db = await connectDB();
  const sessions = db.collection<Session>('sessions');

  let session = await sessions.findOne({ sessionId });

  if (!session) {
    const newSession: Session = {
      sessionId,
      phoneNumber,
      state: 'welcome',
      lastInput: '',
      updatedAt: new Date(),
    };
    const result = await sessions.insertOne(newSession);
    session = { ...newSession, _id: result.insertedId.toString() };
  }

  const inputs = text.split('*').filter(Boolean);
  const currentInput = inputs[inputs.length - 1] || '';

  const currentState = ussdFlow[session.state as keyof typeof ussdFlow] as FlowState;
  let response = 'CON ' + currentState.message;
  let nextState = session.state;

  if (currentInput && currentState.options && currentState.options[currentInput]) {
    nextState = currentState.options[currentInput];
    response = 'CON ' + (ussdFlow[nextState as keyof typeof ussdFlow] as FlowState).message;

    // Send SMS for specific states
    if (nextState === 'anxious') {
      await sendSMS(phoneNumber, 'It’s okay to feel anxious. Try deep breathing and call 1195 if you need help.');
    } else if (nextState === 'motivation') {
      await sendSMS(phoneNumber, 'You’re stronger than you know! Keep pushing forward.');
    } else if (nextState === 'therapist') {
      await sendSMS(phoneNumber, 'A therapist will reach out soon. Reply TALK to confirm a time.');
    } else if (nextState.startsWith('learn_')) {
      const topic = nextState; // e.g., learn_anxiety
      const note = learningNotes[topic];
      if (note) {
        await sendSMS(phoneNumber, note);
      }
      // Response is already set to "Notes on [Topic] sent via SMS"
    }
  } else if (currentInput && !currentState.options) {
    response = 'END Thank you for using TelePsyche!';
  } else if (currentInput && currentState.options && !currentState.options[currentInput]) {
    response = 'CON Invalid input. ' + currentState.message;
  }

  await sessions.updateOne(
    { sessionId },
    { $set: { state: nextState, lastInput: currentInput, updatedAt: new Date() } }
  );

  return response;
}
