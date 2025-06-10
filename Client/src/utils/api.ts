import { 
  type Journal, 
  type Therapist, 
  type Lesson, 
  type Booking, 
  type AIResponse, 
  type ChatMessage,
  mockJournals,
  mockTherapists,
  mockLessons,
  mockBookings,
  mockAIResponses,
  mockChatHistory
} from '../components/data/mockData';

// Simulate API delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Journal API
export const fetchJournals = async (): Promise<Journal[]> => {
  await delay(500);
  return mockJournals;
};

export const createJournal = async (journal: Omit<Journal, 'id' | 'createdAt' | 'blockchainHash'>): Promise<Journal> => {
  await delay(800);
  const newJournal: Journal = {
    ...journal,
    id: `journal_${Date.now()}`,
    createdAt: new Date().toISOString(),
    blockchainHash: `0x${Math.random().toString(16).substr(2, 8)}...`
  };
  return newJournal;
};

// Therapist API
export const fetchTherapists = async (): Promise<Therapist[]> => {
  await delay(400);
  return mockTherapists;
};

export const bookTherapist = async (booking: Omit<Booking, 'id' | 'status'>): Promise<Booking> => {
  await delay(600);
  const newBooking: Booking = {
    ...booking,
    id: `booking_${Date.now()}`,
    status: 'pending'
  };
  return newBooking;
};

// Learning API
export const fetchLessons = async (): Promise<Lesson[]> => {
  await delay(300);
  return mockLessons;
};

export const completeLesson = async (lessonId: string): Promise<void> => {
  await delay(400);
  // In a real app, this would update the lesson completion status
  console.log(`Lesson ${lessonId} completed`);
};

export const submitQuiz = async (lessonId: string, answers: number[]): Promise<{ score: number; passed: boolean }> => {
  await delay(500);
  const lesson = mockLessons.find(l => l.id === lessonId);
  if (!lesson) throw new Error('Lesson not found');
  
  let correct = 0;
  lesson.quiz.forEach((question, index) => {
    if (answers[index] === question.correct) {
      correct++;
    }
  });
  
  const score = (correct / lesson.quiz.length) * 100;
  return { score, passed: score >= 70 };
};

// Chat API
export const sendChatMessage = async (
  message: string, 
  persona: 'Calm' | 'Professional' | 'Friendly'
): Promise<string> => {
  await delay(1000);
  
  // Check for crisis keywords
  const crisisKeywords = ['hopeless', 'give up', 'want to die', 'suicide', 'kill myself'];
  const isCrisis = crisisKeywords.some(keyword => 
    message.toLowerCase().includes(keyword)
  );
  
  if (isCrisis) {
    const crisisResponse = mockAIResponses.find(
      r => r.persona === persona && r.input === 'I feel hopeless'
    );
    return crisisResponse?.response || "I'm concerned about you. Please reach out to a mental health professional or call 988.";
  }
  
  // Find matching response or default
  const response = mockAIResponses.find(
    r => r.persona === persona && message.toLowerCase().includes(r.input.toLowerCase())
  );
  
  if (response) {
    return response.response;
  }
  
  // Default responses by persona
  const defaultResponses = {
    Calm: "I'm here to listen. Can you tell me more about how you're feeling?",
    Professional: "I understand. Let's explore this further. What specific aspects would you like to discuss?",
    Friendly: "Thanks for sharing that with me! How can I help you work through this?"
  };
  
  return defaultResponses[persona];
};

export const fetchChatHistory = async (): Promise<ChatMessage[]> => {
  await delay(200);
  return mockChatHistory;
};

// Booking API
export const fetchUserBookings = async (): Promise<Booking[]> => {
  await delay(300);
  return mockBookings;
};