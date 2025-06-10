
// // export type Message = {
// //   id: string;
// //   content: string;
// //   isFromAI: boolean;
// //   timestamp: Date;
// //   isEscalation?: boolean;
// // };

// // const FRIENDLI_TOKEN = import.meta.env.VITE_FRIENDLI_TOKEN || 'YOUR_FRIENDLI_TOKEN';

// // const emergencyContacts: { [key: string]: string } = {
// //   en: '988 (National Suicide Prevention Lifeline, United States)',
// //   es: '024 (Spain Suicide Prevention)',
// //   fr: '3114 (France Suicide Prevention)',
// //   de: '0800 111 0 111 (Germany Suicide Prevention)',
// //   zh: '400-821-1215 (Beijing Suicide Prevention)',
// //   sw: '116 (Kenya Child Helpline)',
// //   ar: '920033360 (Saudi Arabia Mental Health Helpline)',
// //   ja: '0570-064-556 (Japan Suicide Prevention)',
// //   ru: '051 (Moscow Crisis Helpline)',
// // };

// // export const fetchTherapistAdvice = async (
// //   input: string,
// //   language: string = 'en',
// //   therapist: { id: string; name: string; personality: string; specialty: string } | null,
// //   category: string | null,
// //   previousMessages: Message[] = []
// // ): Promise<Message> => {
// //   const headers: HeadersInit = {
// //     Authorization: `Bearer ${FRIENDLI_TOKEN}`,
// //     'Content-Type': 'application/json',
// //   };

// //   const languageNames: { [key: string]: string } = {
// //     en: 'English',
// //     es: 'Spanish',
// //     fr: 'French',
// //     de: 'German',
// //     zh: 'Chinese',
// //     sw: 'Kiswahili (Swahili)',
// //     ar: 'Arabic',
// //     ja: 'Japanese',
// //     ru: 'Russian',
// //   };

// //   const fullLanguage = languageNames[language] || 'English';
// //   const emergencyNumber = emergencyContacts[language] || '988 (United States)';

// //   const therapistPrompt = therapist
// //     ? `You are ${therapist.name}, an AI therapist specializing in ${therapist.specialty}. Your personality is ${therapist.personality}. Respond in a ${therapist.personality} tone, providing empathetic, conversational mental health guidance that feels like a natural dialogue with a human therapist.`
// //     : `You are Lisa, an AI therapist providing empathetic and professional mental health guidance in a calm, conversational tone.`;

// //   const categoryPrompt = category
// //     ? `The user is focused on "${category}". Tailor your response to address this topic, offering relevant insights, coping strategies, and reflective questions in a conversational manner.`
// //     : `The user has not selected a specific topic. Provide general mental health support based on their input, keeping the tone conversational and empathetic.`;

// //   const messages = [
// //     {
// //       role: 'system',
// //       content: `
// //         ${therapistPrompt}
// //         Respond **exclusively in ${fullLanguage}**. Your scope is limited to mental health support, including coping strategies, reflective questions, and crisis intervention. Do not answer questions unrelated to mental health (e.g., software engineering, general knowledge). If the input is unrelated, respond with: "Sorry, I can only assist with mental health concerns. Please share what's on your mind or select a therapy category."

// //         Respond in a natural, conversational style, as if you're a human therapist chatting with a client. Avoid structured formats like sections or numbered steps unless explicitly requested. Instead, weave actionable advice (e.g., coping strategies, grounding techniques) and reflective questions into the flow of the conversation.

// //         Assess the severity of the user's input to detect crises:
// //         - If the input mentions "suicide," "self-harm," "kill myself," "crisis," or "emergency," flag the response as a crisis and include: "Please contact ${emergencyNumber} or emergency services immediately if you're in danger."
// //         - For other inputs, provide empathetic support tailored to the user's needs.

// //         ${categoryPrompt}
// //         Maintain context from previous messages, but only for mental health topics. If the input is a follow-up like "thank you," respond empathetically in ${fullLanguage} within the mental health scope. Avoid using Markdown (e.g., ** or *).
// //       `,
// //     },
// //     ...previousMessages.map((msg) => ({
// //       role: msg.isFromAI ? 'assistant' : 'user',
// //       content: msg.content,
// //     })),
// //     { role: 'user', content: input },
// //   ];

// //   const body = {
// //     model: 'meta-llama-3.3-70b-instruct',
// //     messages,
// //     min_tokens: 0,
// //     max_tokens: 16384,
// //     temperature: 0.7,
// //     top_p: 0.8,
// //     frequency_penalty: 0,
// //     stop: [],
// //     stream: true,
// //     stream_options: { include_usage: true },
// //   };

// //   try {
// //     const response = await fetch('https://api.friendli.ai/serverless/v1/chat/completions', {
// //       method: 'POST',
// //       headers,
// //       body: JSON.stringify(body),
// //     });

// //     if (!response.ok) throw new Error(`API request failed with status ${response.status}`);

// //     const reader = response.body?.getReader();
// //     if (!reader) throw new Error('Streaming not supported');

// //     let aiResponse = '';

// //     while (true) {
// //       const { done, value } = await reader.read();
// //       if (done) break;

// //       const chunk = new TextDecoder().decode(value);
// //       const lines = chunk.split('\n');

// //       for (const line of lines) {
// //         if (line.startsWith('data: ')) {
// //           const data = line.slice(6);
// //           if (data === '[DONE]') continue;

// //           const parsed: { choices?: { delta?: { content?: string } }[] } = JSON.parse(data);
// //           const content = parsed.choices?.[0]?.delta?.content;
// //           if (content) aiResponse += content;
// //         }
// //       }
// //     }

// //     console.log('Selected Language:', fullLanguage);
// //     console.log('Raw AI Response:', aiResponse);

// //     const isEscalation = aiResponse.toLowerCase().includes('suicide') || 
// //                         aiResponse.toLowerCase().includes('self-harm') || 
// //                         aiResponse.toLowerCase().includes('kill myself') || 
// //                         input.toLowerCase().includes('suicide') || 
// //                         input.toLowerCase().includes('self-harm') || 
// //                         input.toLowerCase().includes('kill myself') || 
// //                         input.toLowerCase().includes('crisis') || 
// //                         input.toLowerCase().includes('emergency');

// //     return {
// //       id: Date.now().toString(),
// //       content: aiResponse.trim(),
// //       isFromAI: true,
// //       timestamp: new Date(),
// //       isEscalation,
// //     };
// //   } catch (err) {
// //     console.error('API Error:', err);
// //     return {
// //       id: Date.now().toString(),
// //       content: `Sorry, I encountered an error: ${err instanceof Error ? err.message : String(err)}.`,
// //       isFromAI: true,
// //       timestamp: new Date(),
// //     };
// //   }
// // };















// export type Message = {
//   id: string;
//   content: string;
//   isFromAI: boolean;
//   timestamp: Date;
//   isEscalation?: boolean;
// };

// const FRIENDLI_TOKEN = import.meta.env.VITE_FRIENDLI_TOKEN || 'YOUR_FRIENDLI_TOKEN';

// const emergencyContacts: { [key: string]: string } = {
//   en: '988 (National Suicide Prevention Lifeline, United States)',
//   es: '024 (Spain Suicide Prevention)',
//   fr: '3114 (France Suicide Prevention)',
//   de: '0800 111 0 111 (Germany Suicide Prevention)',
//   zh: '400-821-1215 (Beijing Suicide Prevention)',
//   sw: '116 (Kenya Child Helpline)',
//   ar: '920033360 (Saudi Arabia Mental Health Helpline)',
//   ja: '0570-064-556 (Japan Suicide Prevention)',
//   ru: '051 (Moscow Crisis Helpline)',
// };

// export const fetchTherapistAdvice = async (
//   input: string,
//   language: string = 'en',
//   therapist: { id: string; name: string; personality: string; specialty: string } | null,
//   category: string | null,
//   previousMessages: Message[] = []
// ): Promise<Message> => {
//   const headers: HeadersInit = {
//     Authorization: `Bearer ${FRIENDLI_TOKEN}`,
//     'Content-Type': 'application/json',
//   };

//   const languageNames: { [key: string]: string } = {
//     en: 'English',
//     es: 'Spanish',
//     fr: 'French',
//     de: 'German',
//     zh: 'Chinese',
//     sw: 'Kiswahili (Swahili)',
//     ar: 'Arabic',
//     ja: 'Japanese',
//     ru: 'Russian',
//   };

//   const fullLanguage = languageNames[language] || 'English';
//   const emergencyNumber = emergencyContacts[language] || '988 (United States)';

//   const therapistPrompt = therapist
//     ? `You are ${therapist.name}, an AI therapist specializing in ${therapist.specialty}. Your personality is ${therapist.personality}. Respond in a ${therapist.personality}, friendly, and understanding tone, like a compassionate friend. Start every response with a warm introduction, e.g., "Hi, I'm ${therapist.name}, and I'm here for you."`
//     : `You are Lisa, an AI therapist providing friendly and empathetic mental health support in a calm, conversational tone. Start every response with "Hi, I'm Lisa, and I'm here for you."`;

//   const categoryPrompt = category
//     ? `The user is focused on "${category}". Tailor your response to this topic, offering warm, relevant insights, coping ideas, and gentle questions to keep the conversation flowing.`
//     : `The user hasn't chosen a specific topic. Offer general mental health support based on their input, keeping the tone warm and conversational.`;

//   const messages = [
//     {
//       role: 'system',
//       content: `
//         ${therapistPrompt}
//         Respond **exclusively in ${fullLanguage}**. Your scope is limited to mental health support, including coping ideas, reflective questions, and crisis support. Do not answer questions unrelated to mental health (e.g., software engineering, general knowledge). If the input is unrelated, respond with: "Hi, I'm ${therapist?.name || 'Lisa'}, and I'm here to help with mental health concerns. What's on your mind today?"

//         Respond in a warm, friendly, and conversational style, like a supportive friend or therapist. Avoid clinical jargon, structured formats (e.g., sections, numbered steps), or formal language unless requested. Weave in actionable ideas (e.g., breathing exercises, journaling) and gentle questions naturally to make the user feel heard and supported.

//         Assess the severity of the user's input to detect crises:
//         - If the input mentions "suicide," "self-harm," "kill myself," "crisis," or "emergency," flag the response as a crisis and include: "If you're feeling unsafe, please call ${emergencyNumber} or emergency services right away. I'm here to support you."
//         - For other inputs, provide empathetic, friendly support tailored to the user's needs.

//         ${categoryPrompt}
//         Maintain context from previous messages, but only for mental health topics. If the input is a follow-up like "thank you," respond warmly in ${fullLanguage}, e.g., "I'm so glad you're here. What's next on your mind?" Avoid using Markdown (e.g., ** or *).
//       `,
//     },
//     ...previousMessages.map((msg) => ({
//       role: msg.isFromAI ? 'assistant' : 'user',
//       content: msg.content,
//     })),
//     { role: 'user', content: input },
//   ];

//   const body = {
//     model: 'meta-llama-3.3-70b-instruct',
//     messages,
//     min_tokens: 0,
//     max_tokens: 16384,
//     temperature: 0.7,
//     top_p: 0.8,
//     frequency_penalty: 0,
//     stop: [],
//     stream: true,
//     stream_options: { include_usage: true },
//   };

//   try {
//     const response = await fetch('https://api.friendli.ai/serverless/v1/chat/completions', {
//       method: 'POST',
//       headers,
//       body: JSON.stringify(body),
//     });

//     if (!response.ok) throw new Error(`API request failed with status ${response.status}`);

//     const reader = response.body?.getReader();
//     if (!reader) throw new Error('Streaming not supported');

//     let aiResponse = '';

//     while (true) {
//       const { done, value } = await reader.read();
//       if (done) break;

//       const chunk = new TextDecoder().decode(value);
//       const lines = chunk.split('\n');

//       for (const line of lines) {
//         if (line.startsWith('data: ')) {
//           const data = line.slice(6);
//           if (data === '[DONE]') continue;

//           const parsed: { choices?: { delta?: { content?: string } }[] } = JSON.parse(data);
//           const content = parsed.choices?.[0]?.delta?.content;
//           if (content) aiResponse += content;
//         }
//       }
//     }

//     console.log('Selected Language:', fullLanguage);
//     console.log('Raw AI Response:', aiResponse);

//     const isEscalation = aiResponse.toLowerCase().includes('suicide') || 
//                         aiResponse.toLowerCase().includes('self-harm') || 
//                         aiResponse.toLowerCase().includes('kill myself') || 
//                         input.toLowerCase().includes('suicide') || 
//                         input.toLowerCase().includes('self-harm') || 
//                         input.toLowerCase().includes('kill myself') || 
//                         input.toLowerCase().includes('crisis') || 
//                         input.toLowerCase().includes('emergency');

//     return {
//       id: Date.now().toString(),
//       content: aiResponse.trim(),
//       isFromAI: true,
//       timestamp: new Date(),
//       isEscalation,
//     };
//   } catch (err) {
//     console.error('API Error:', err);
//     return {
//       id: Date.now().toString(),
//       content: `Hi, I'm ${therapist?.name || 'Lisa'}, and I'm sorry, something went wrong: ${err instanceof Error ? err.message : String(err)}. Let's try again—what's on your mind?`,
//       isFromAI: true,
//       timestamp: new Date(),
//     };
//   }
// };



export type Message = {
  id: string;
  content: string;
  isFromAI: boolean;
  timestamp: Date;
  isEscalation?: boolean;
};

const FRIENDLI_TOKEN = import.meta.env.VITE_FRIENDLI_TOKEN || 'YOUR_FRIENDLI_TOKEN';

const emergencyContacts: { [key: string]: string } = {
  en: '988 (National Suicide Prevention Lifeline, United States)',
  es: '024 (Spain Suicide Prevention)',
  fr: '3114 (France Suicide Prevention)',
  de: '0800 111 0 111 (Germany Suicide Prevention)',
  zh: '400-821-1215 (Beijing Suicide Prevention)',
  sw: '116 (Kenya Child Helpline)',
  ar: '920033360 (Saudi Arabia Mental Health Helpline)',
  ja: '0570-064-556 (Japan Suicide Prevention)',
  ru: '051 (Moscow Crisis Helpline)',
};

export const fetchTherapistAdvice = async (
  input: string,
  language: string = 'en',
  therapist: { id: string; name: string; personality: string; specialty: string } | null,
  category: string | null,
  previousMessages: Message[] = []
): Promise<Message> => {
  const headers: HeadersInit = {
    Authorization: `Bearer ${FRIENDLI_TOKEN}`,
    'Content-Type': 'application/json',
  };

  const languageNames: { [key: string]: string } = {
    en: 'English',
    es: 'Spanish',
    fr: 'French',
    de: 'German',
    zh: 'Chinese',
    sw: 'Kiswahili (Swahili)',
    ar: 'Arabic',
    ja: 'Japanese',
    ru: 'Russian',
  };

  const fullLanguage = languageNames[language] || 'English';
  const emergencyNumber = emergencyContacts[language] || '988 (United States)';

  const therapistPrompt = therapist
    ? `You are ${therapist.name}, an AI therapist specializing in ${therapist.specialty}. Your personality is ${therapist.personality}. Respond in a ${therapist.personality}, friendly, and engaging tone, like a cool human therapist. Only use "Hi, I'm ${therapist.name}" in the first message after selection or if the user says "Hi, ${therapist.name}" explicitly. Otherwise, jump straight into the response.`
    : `You are Lisa, an AI therapist with a calm, friendly vibe. Only use "Hi, I'm Lisa" in the first message or if the user says "Hi, Lisa." Otherwise, respond directly.`;

  const categoryPrompt = category
    ? `The user is focused on "${category}". Tailor your response to this topic with a short, relevant insight, a simple coping idea if needed, and one clarifying question.`
    : `The user hasn't picked a topic. Offer general mental health support based on their input with a short, engaging response and one clarifying question.`;

  const messages = [
    {
      role: 'system',
      content: `
        ${therapistPrompt}
        Respond **exclusively in ${fullLanguage}**. Your scope is mental health support: simple coping ideas, empathetic reflections, and crisis support. Ignore unrelated topics (e.g., coding) and say: "I'm here for mental health vibes. What's on your mind?"

        Respond like a cool, human therapist in a lively chat:
        - Keep responses **short (1-2 sentences)**, matching the user's input length (e.g., super brief for "Thanks" or typos like "tnasks").
        - Ask **one clarifying question** per response to keep it engaging, unless the input doesn’t need one (e.g., "Thanks").
        - Skip greetings like "Hi, I'm ${therapist?.name || 'Lisa'}" after the first message unless the user greets you explicitly.
        - Use the user’s input directly to drive the flow, keeping it streamlined, fun, and natural.
        - Avoid clinical jargon, long-winded replies, or structured formats (e.g., lists, steps).
        - Maintain context from previous messages to avoid repeating yourself.

        For crises:
        - If the input includes "suicide," "self-harm," "kill myself," "crisis," or "emergency," flag as a crisis and include: "If you're feeling unsafe, call ${emergencyNumber} now."
        - Otherwise, keep it empathetic and tailored.

        ${categoryPrompt}
        For short inputs like "Thanks" or "tnasks," reply briefly, e.g., "No prob! What's next?" Avoid Markdown (e.g., ** or *).
      `,
    },
    ...previousMessages.map((msg) => ({
      role: msg.isFromAI ? 'assistant' : 'user',
      content: msg.content,
    })),
    { role: 'user', content: input },
  ];

  const body = {
    model: 'meta-llama-3.3-70b-instruct',
    messages,
    min_tokens: 0,
    max_tokens: 16384,
    temperature: 0.7,
    top_p: 0.8,
    frequency_penalty: 0,
    stop: [],
    stream: true,
    stream_options: { include_usage: true },
  };

  try {
    const response = await fetch('https://api.friendli.ai/serverless/v1/chat/completions', {
      method: 'POST',
      headers,
      body: JSON.stringify(body),
    });

    if (!response.ok) throw new Error(`API request failed with status ${response.status}`);

    const reader = response.body?.getReader();
    if (!reader) throw new Error('Streaming not supported');

    let aiResponse = '';

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;

      const chunk = new TextDecoder().decode(value);
      const lines = chunk.split('\n');

      for (const line of lines) {
        if (line.startsWith('data: ')) {
          const data = line.slice(6);
          if (data === '[DONE]') continue;

          const parsed: { choices?: { delta?: { content?: string } }[] } = JSON.parse(data);
          const content = parsed.choices?.[0]?.delta?.content;
          if (content) aiResponse += content;
        }
      }
    }

    console.log('Selected Language:', fullLanguage);
    console.log('Raw AI Response:', aiResponse);

    const isEscalation = aiResponse.toLowerCase().includes('suicide') || 
                        aiResponse.toLowerCase().includes('self-harm') || 
                        aiResponse.toLowerCase().includes('kill myself') || 
                        input.toLowerCase().includes('suicide') || 
                        input.toLowerCase().includes('self-harm') || 
                        input.toLowerCase().includes('kill myself') || 
                        input.toLowerCase().includes('crisis') || 
                        input.toLowerCase().includes('emergency');

    return {
      id: Date.now().toString(),
      content: aiResponse.trim(),
      isFromAI: true,
      timestamp: new Date(),
      isEscalation,
    };
  } catch (err) {
    console.error('API Error:', err);
    return {
      id: Date.now().toString(),
      content: `Oops, something broke: ${err instanceof Error ? err.message : String(err)}. What's up?`,
      isFromAI: true,
      timestamp: new Date(),
    };
  }
};