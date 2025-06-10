export interface User {
  id: string;
  email?: string;
  wallet?: string;
  authType: 'google' | 'wallet' | 'both';
  role: 'user' | 'therapist';
  journalCount: number;
  name?: string;
}

export interface Journal {
  id: string;
  userId: string;
  type: 'text' | 'voice';
  content?: string;
  transcript?: string;
  ipfsUrl?: string;
  moodScore: number;
  blockchainHash: string;
  createdAt: string;
}

export interface Therapist {
  id: string;
  name: string;
  expertise: string;
  languages: string[];
  verifiedHash: string;
  calendarUrl: string;
  rating: number;
  experience: string;
  image: string;
}

export interface Lesson {
  id: string;
  title: string;
  content: string;
  videoUrl?: string;
  quiz: {
    question: string;
    options: string[];
    correct: number;
  }[];
  completed: boolean;
  duration: string;
  category: string;
}

export interface Booking {
  id: string;
  userId: string;
  therapistId: string;
  time: string;
  status: 'confirmed' | 'pending' | 'completed' | 'cancelled';
  notes?: string;
}

export interface AIResponse {
  persona: 'Calm' | 'Professional' | 'Friendly';
  input: string;
  response: string;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'ai';
  content: string;
  timestamp: string;
  persona?: string;
}

// Mock Data
export const mockUser: User = {
  id: "user123",
  email: "user@example.com",
  wallet: "0xABC123456789...",
  authType: "both",
  role: "user",
  journalCount: 5,
  name: "Alex Johnson"
};

export const mockJournals: Journal[] = [
  {
    id: "journal1",
    userId: "user123",
    type: "text",
    content: "Feeling stressed today about work deadlines. Need to find better ways to manage my time and anxiety.",
    moodScore: 0.4,
    blockchainHash: "0x123abc...",
    createdAt: "2025-01-10T10:00:00Z"
  },
  {
    id: "journal2",
    userId: "user123",
    type: "voice",
    ipfsUrl: "https://ipfs.io/ipfs/mockCid123",
    transcript: "Feeling much better today after talking to my friend. Sometimes a good conversation is all you need.",
    moodScore: 0.7,
    blockchainHash: "0x456def...",
    createdAt: "2025-01-11T14:30:00Z"
  },
  {
    id: "journal3",
    userId: "user123",
    type: "text",
    content: "Reflecting on my day. The meditation session really helped me center myself and find peace.",
    moodScore: 0.6,
    blockchainHash: "0x789ghi...",
    createdAt: "2025-01-12T20:15:00Z"
  },
  {
    id: "journal4",
    userId: "user123",
    type: "text",
    content: "Had a challenging day but managed to stay positive. Grateful for the small victories.",
    moodScore: 0.5,
    blockchainHash: "0xabcdef...",
    createdAt: "2025-01-13T16:45:00Z"
  },
  {
    id: "journal5",
    userId: "user123",
    type: "voice",
    ipfsUrl: "https://ipfs.io/ipfs/mockCid456",
    transcript: "Today was amazing! I felt so energized and accomplished. Looking forward to tomorrow.",
    moodScore: 0.9,
    blockchainHash: "0xfedcba...",
    createdAt: "2025-01-14T09:20:00Z"
  }
];

export const mockTherapists: Therapist[] = [
  {
    id: "therapist1",
    name: "Dr. Jane Smith",
    expertise: "Anxiety & Stress Management",
    languages: ["English", "French"],
    verifiedHash: "0xverified123",
    calendarUrl: "https://mockcalendar.com/jane",
    rating: 4.9,
    experience: "8 years",
    image: "https://images.pexels.com/photos/5327585/pexels-photo-5327585.jpeg?auto=compress&cs=tinysrgb&w=300"
  },
  {
    id: "therapist2",
    name: "Dr. John Doe",
    expertise: "Depression & Mood Disorders",
    languages: ["English", "Spanish"],
    verifiedHash: "0xverified456",
    calendarUrl: "https://mockcalendar.com/john",
    rating: 4.8,
    experience: "12 years",
    image: "https://images.pexels.com/photos/5327921/pexels-photo-5327921.jpeg?auto=compress&cs=tinysrgb&w=300"
  },
  {
    id: "therapist3",
    name: "Dr. Sarah Lee",
    expertise: "Mindfulness & Meditation",
    languages: ["English", "Mandarin"],
    verifiedHash: "0xverified789",
    calendarUrl: "https://mockcalendar.com/sarah",
    rating: 4.7,
    experience: "6 years",
    image: "https://images.pexels.com/photos/6749778/pexels-photo-6749778.jpeg?auto=compress&cs=tinysrgb&w=300"
  }
];

export const mockLessons: Lesson[] = [
  {
    id: "lesson1",
    title: "Managing Anxiety",
    content: `# Managing Anxiety

Anxiety is a natural response to stress, but when it becomes overwhelming, it can interfere with daily life. Here are some effective strategies:

## Understanding Anxiety
- Recognize physical symptoms (rapid heartbeat, sweating, trembling)
- Identify triggers and patterns
- Accept that anxiety is temporary

## Coping Techniques
1. **Deep Breathing**: Practice 4-7-8 breathing technique
2. **Grounding**: Use the 5-4-3-2-1 method (5 things you see, 4 you touch, etc.)
3. **Progressive Muscle Relaxation**: Tense and release muscle groups
4. **Mindful Observation**: Focus on the present moment

## When to Seek Help
If anxiety persists for more than 6 months or significantly impacts your life, consider professional help.`,
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
    quiz: [
      {
        question: "What is a common physical symptom of anxiety?",
        options: ["Rapid heartbeat", "Improved focus", "Increased energy", "Better sleep"],
        correct: 0
      },
      {
        question: "What does the 4-7-8 breathing technique involve?",
        options: ["4 breaths, 7 holds, 8 releases", "Inhale 4, hold 7, exhale 8", "4 minutes, 7 times, 8 hours", "4 steps, 7 methods, 8 practices"],
        correct: 1
      }
    ],
    completed: false,
    duration: "15 min",
    category: "Anxiety"
  },
  {
    id: "lesson2",
    title: "Stress Management",
    content: `# Stress Management

Stress is inevitable, but how we manage it makes all the difference. Learn effective strategies to cope with daily stressors.

## Types of Stress
- **Acute Stress**: Short-term, immediate response
- **Chronic Stress**: Long-term, ongoing pressure
- **Episodic Stress**: Frequent acute stress episodes

## Stress Reduction Techniques
1. **Time Management**: Prioritize tasks, set realistic goals
2. **Physical Exercise**: Regular activity reduces stress hormones
3. **Social Support**: Connect with friends and family
4. **Relaxation**: Meditation, yoga, or hobbies
5. **Healthy Lifestyle**: Proper sleep, nutrition, and hydration

## Building Resilience
- Develop problem-solving skills
- Practice positive self-talk
- Learn from setbacks
- Maintain perspective`,
    videoUrl: null,
    quiz: [
      {
        question: "What helps reduce stress the most?",
        options: ["Meditation and exercise", "Overworking", "Social isolation", "Excessive caffeine"],
        correct: 0
      }
    ],
    completed: false,
    duration: "12 min",
    category: "Stress"
  },
  {
    id: "lesson3",
    title: "Mindfulness Practice",
    content: `# Mindfulness Practice

Mindfulness is the practice of being fully present and engaged in the current moment, aware of where you are and what you're doing.

## What is Mindfulness?
Mindfulness involves:
- **Attention**: Focusing on the present moment
- **Acceptance**: Observing without judgment
- **Awareness**: Being conscious of thoughts and feelings

## Benefits of Mindfulness
- Reduced stress and anxiety
- Improved emotional regulation
- Enhanced focus and concentration
- Better sleep quality
- Increased self-awareness

## Simple Mindfulness Exercises
1. **Mindful Breathing**: Focus on your breath for 5-10 minutes
2. **Body Scan**: Notice sensations throughout your body
3. **Mindful Walking**: Pay attention to each step
4. **Mindful Eating**: Savor each bite slowly
5. **Loving-Kindness**: Send positive thoughts to yourself and others

## Daily Integration
Start with just 5 minutes daily and gradually increase. Consistency is more important than duration.`,
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
    quiz: [
      {
        question: "What is the core principle of mindfulness?",
        options: ["Being present in the moment", "Multitasking efficiently", "Worrying about the future", "Sleeping more"],
        correct: 0
      }
    ],
    completed: false,
    duration: "18 min",
    category: "Mindfulness"
  }
];

export const mockBookings: Booking[] = [
  {
    id: "booking1",
    userId: "user123",
    therapistId: "therapist1",
    time: "2025-01-20T10:00:00Z",
    status: "confirmed",
    notes: "Initial consultation for anxiety management"
  },
  {
    id: "booking2",
    userId: "user123",
    therapistId: "therapist2",
    time: "2025-01-25T14:00:00Z",
    status: "pending",
    notes: "Follow-up session for mood tracking"
  }
];

export const mockAIResponses: AIResponse[] = [
  { persona: "Calm", input: "I'm stressed", response: "I'm Lisa, here to listen with compassion. I can hear that you're feeling stressed right now. Can you share with me what's weighing on your mind? Sometimes just talking about it can help lighten the load." },
  { persona: "Professional", input: "I'm stressed", response: "Hello, I'm Dr. Alex. I understand you're experiencing stress. Let's work together to identify the specific stressors and develop evidence-based coping strategies. What particular situation is contributing to your stress today?" },
  { persona: "Friendly", input: "I'm stressed", response: "Hey there, I'm Sam! 😊 Sorry to hear you're feeling stressed - that's totally normal and you're not alone in this. Want to talk about what's bugging you? Sometimes it helps to just get it all out!" },
  { persona: "Calm", input: "I feel hopeless", response: "I'm so sorry you're feeling this way, and I want you to know that your feelings are valid. When we feel hopeless, it's important to reach out for professional support. Please consider speaking with a licensed therapist or call the National Suicide Prevention Lifeline at 988. You don't have to face this alone." },
  { persona: "Professional", input: "I feel hopeless", response: "I appreciate you sharing such difficult feelings with me. Hopelessness can be a sign of depression, and it's crucial to get professional help. I strongly recommend contacting a mental health professional immediately or calling 988 for crisis support. Your wellbeing is the priority." },
  { persona: "Friendly", input: "I feel hopeless", response: "I'm really concerned about you right now, and I want you to know that what you're feeling matters. Please reach out to a real therapist or counselor who can give you the support you deserve. You can call 988 anytime - there are people who want to help you through this. 💙" }
];

export const mockChatHistory: ChatMessage[] = [
  {
    id: "msg1",
    sender: "ai",
    content: "Hello! I'm Lisa, your AI companion. I'm here to listen and support you. How are you feeling today?",
    timestamp: "2025-01-15T09:00:00Z",
    persona: "Calm"
  }
];

// Mood tracking data for Chart.js
export const mockMoodData = {
  labels: ['Jan 10', 'Jan 11', 'Jan 12', 'Jan 13', 'Jan 14'],
  datasets: [
    {
      label: 'Mood Score',
      data: [0.4, 0.7, 0.6, 0.5, 0.9],
      borderColor: 'rgb(59, 130, 246)',
      backgroundColor: 'rgba(59, 130, 246, 0.1)',
      tension: 0.4,
      fill: true
    }
  ]
};