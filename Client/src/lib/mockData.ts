import type { Journal, Therapist, Lesson, Booking, ChatMessage } from "../shared/schema";
import { generateMockHash, generateMockIPFS } from "./utils";

export const mockJournals: Journal[] = [
  {
    _id: "1",
    userId: "1",
    type: "text",
    content: "Had a breakthrough in therapy today. Finally understood the connection between my anxiety and perfectionism. Feeling hopeful about implementing the new coping strategies we discussed.",
    ipfsUrl: `ipfs://${generateMockIPFS()}`,
    moodScore: 8.5,
    blockchainHash: generateMockHash(),
    createdAt: new Date('2024-03-15'),
  },
  {
    _id: "2",
    userId: "1",
    type: "voice",
    content: "Mixed feelings today. Work was stressful but I managed to complete my tasks. Need to work on better work-life balance...",
    ipfsUrl: `ipfs://${generateMockIPFS()}`,
    moodScore: 5.2,
    blockchainHash: generateMockHash(),
    createdAt: new Date('2024-03-14'),
  },
  {
    _id: "3",
    userId: "1",
    type: "text",
    content: "Today was a good day. I felt more confident at work and had a great conversation with my colleague about the project. I'm feeling optimistic about the future.",
    ipfsUrl: `ipfs://${generateMockIPFS()}`,
    moodScore: 8.2,
    blockchainHash: generateMockHash(),
    createdAt: new Date('2024-03-13'),
  }
];

export const mockTherapists: Therapist[] = [
  {
    _id: "1",
    name: "Dr. Sarah Chen",
    expertise: "Licensed Clinical Psychologist",
    languages: ["English", "Mandarin"],
    verifiedHash: generateMockHash(),
    rating: 4.9,
    reviews: 127,
    imageUrl: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=120&h=120",
    bio: "Specializing in anxiety disorders, depression, and cognitive behavioral therapy with over 10 years of experience."
  },
  {
    _id: "2",
    name: "Dr. Michael Rodriguez",
    expertise: "Licensed Marriage & Family Therapist",
    languages: ["English", "Spanish"],
    verifiedHash: generateMockHash(),
    rating: 4.7,
    reviews: 89,
    imageUrl: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=120&h=120",
    bio: "Expert in relationship counseling, family therapy, and couples communication with bilingual capabilities."
  },
  {
    _id: "3",
    name: "Dr. Emily Watson",
    expertise: "Trauma Specialist & PTSD Expert",
    languages: ["English", "French"],
    verifiedHash: generateMockHash(),
    rating: 5.0,
    reviews: 156,
    imageUrl: "https://images.unsplash.com/photo-1582750433449-648ed127bb54?ixlib=rb-4.0.3&auto=format&fit=crop&w=120&h=120",
    bio: "Specialized in trauma recovery, PTSD treatment, and EMDR therapy with extensive military and first responder experience."
  }
];

export const mockLessons: Lesson[] = [
  {
    id: 1,
    title: "Understanding Anxiety",
    content: "# Understanding Anxiety\n\nAnxiety is a natural response to stress, but when it becomes overwhelming, it can interfere with daily life. Learn to identify triggers and develop coping strategies.\n\n## Key Concepts\n- Recognizing anxiety symptoms\n- Understanding the fight-or-flight response\n- Identifying personal triggers\n\n## Video Content\nThis lesson includes a 15-minute video explaining the neuroscience of anxiety and practical breathing techniques.\n\n## Notes\n### What is Anxiety?\nAnxiety is your body's natural response to perceived threats. When your brain detects danger, it triggers the fight-or-flight response, releasing stress hormones like adrenaline and cortisol.\n\n### Common Symptoms\n- Racing heart\n- Sweaty palms\n- Difficulty concentrating\n- Restlessness\n- Muscle tension\n\n### Breathing Exercise\n1. Inhale for 4 counts\n2. Hold for 4 counts\n3. Exhale for 6 counts\n4. Repeat 5-10 times",
    category: "Anxiety Management",
    duration: "30 min",
    completionCount: 1247,
  },
  {
    id: 2,
    title: "Mindfulness Meditation",
    content: "# Mindfulness Meditation\n\nPractice being present in the moment through guided meditation techniques.\n\n## Video Content\nA 20-minute guided meditation session with Dr. Sarah Williams, featuring body scan and breathing awareness.\n\n## Techniques\n- Breathing exercises\n- Body scan meditation\n- Loving-kindness meditation\n\n## Notes\n### Getting Started\nFind a quiet space where you won't be disturbed. Sit comfortably with your spine straight but not rigid.\n\n### Basic Breathing Meditation\n1. Close your eyes or soften your gaze\n2. Focus on your natural breath\n3. When your mind wanders, gently return to the breath\n4. Start with 5 minutes, gradually increase\n\n### Benefits\n- Reduced stress and anxiety\n- Improved focus and concentration\n- Better emotional regulation\n- Enhanced self-awareness",
    category: "Stress Relief",
    duration: "25 min",
    completionCount: 892,
  },
  {
    id: 3,
    title: "Cognitive Behavioral Therapy Basics",
    content: "# CBT Fundamentals\n\nLearn how thoughts, feelings, and behaviors are interconnected and how to challenge negative thought patterns.\n\n## Video Content\nA 25-minute presentation by licensed therapist Dr. Michael Chen explaining CBT principles with real-world examples.\n\n## Core Principles\n- Thought record keeping\n- Cognitive restructuring\n- Behavioral experiments\n\n## Notes\n### The CBT Triangle\nThoughts → Feelings → Behaviors\n\nEach component influences the others. By changing one, you can impact the entire cycle.\n\n### Common Cognitive Distortions\n1. **All-or-Nothing Thinking**: Seeing things in black and white\n2. **Catastrophizing**: Assuming the worst will happen\n3. **Mind Reading**: Assuming you know what others think\n4. **Fortune Telling**: Predicting negative outcomes\n\n### Thought Record Template\n- Situation: What happened?\n- Emotion: How did you feel?\n- Thought: What went through your mind?\n- Evidence: Is this thought realistic?\n- Balanced Thought: What's a more balanced perspective?",
    category: "Therapy Techniques",
    duration: "45 min",
    completionCount: 654,
  },
  {
    id: 4,
    title: "Dealing with Heartbreak",
    content: "# Healing from Heartbreak\n\nNavigate the emotional journey of relationship loss with healthy coping strategies.\n\n## Video Content\nA 30-minute session with relationship counselor Dr. Emma Rodriguez on processing grief and rebuilding emotional strength.\n\n## Notes\n### Stages of Relationship Grief\n1. **Denial**: \"This isn't really happening\"\n2. **Anger**: Frustration and blame\n3. **Bargaining**: Wanting to fix things\n4. **Depression**: Sadness and withdrawal\n5. **Acceptance**: Finding peace with the situation\n\n### Healthy Coping Strategies\n- Allow yourself to feel emotions without judgment\n- Maintain social connections\n- Engage in self-care activities\n- Consider professional support\n- Focus on personal growth\n\n### Red Flags to Avoid\n- Substance abuse\n- Social isolation\n- Revenge behaviors\n- Rebound relationships too quickly",
    category: "Relationships",
    duration: "35 min",
    completionCount: 423,
  },
  {
    id: 5,
    title: "Managing Job Stress",
    content: "# Workplace Stress Management\n\nDevelop resilience and healthy boundaries in your professional life.\n\n## Video Content\nA 20-minute workshop by career counselor Dr. James Park on setting boundaries and managing workplace anxiety.\n\n## Notes\n### Common Sources of Job Stress\n- Heavy workload\n- Unclear expectations\n- Lack of control\n- Poor work-life balance\n- Difficult relationships\n\n### Stress Management Techniques\n1. **Time Management**: Prioritize tasks using the Eisenhower Matrix\n2. **Boundary Setting**: Learn to say no appropriately\n3. **Communication**: Address conflicts directly and professionally\n4. **Self-Care**: Take regular breaks and use vacation time\n\n### Building Resilience\n- Develop problem-solving skills\n- Build supportive relationships\n- Practice stress-reduction techniques\n- Maintain perspective on setbacks",
    category: "Career",
    duration: "25 min",
    completionCount: 678,
  },
  {
    id: 6,
    title: "Coping with Grief and Loss",
    content: "# Understanding Grief\n\nLearn healthy ways to process loss and honor your healing journey.\n\n## Video Content\nA 40-minute compassionate guide by grief counselor Dr. Lisa Thompson, including personal stories and practical exercises.\n\n## Notes\n### Types of Grief\n- **Anticipatory Grief**: Before a loss occurs\n- **Complicated Grief**: When grief becomes stuck\n- **Disenfranchised Grief**: Unrecognized or invalidated loss\n\n### The Grief Process\nGrief is not linear. You may experience:\n- Waves of intense emotion\n- Physical symptoms (fatigue, pain)\n- Difficulty concentrating\n- Changes in appetite or sleep\n\n### Healthy Grief Practices\n- Create meaningful rituals\n- Share memories with others\n- Take care of your physical health\n- Consider grief support groups\n- Be patient with yourself",
    category: "Loss & Grief",
    duration: "45 min",
    completionCount: 234,
  }
];

export const mockBookings: Booking[] = [
  {
    id: 1,
    userId: "1",
    therapistId: 1,
    time: new Date('2024-03-20T18:00:00'),
    status: "scheduled",
    sessionType: "Initial Consultation",
    price: 120,
  },
  {
    id: 2,
    userId: "1",
    therapistId: 2,
    time: new Date('2024-03-25T14:00:00'),
    status: "scheduled",
    sessionType: "Follow-up Session",
    price: 100,
  }
];


export const mockMoodData = [
  { date: 'Mar 1', score: 6.2 },
  { date: 'Mar 5', score: 5.8 },
  { date: 'Mar 10', score: 7.1 },
  { date: 'Mar 15', score: 6.9 },
  { date: 'Mar 20', score: 7.5 },
  { date: 'Mar 25', score: 7.8 },
  { date: 'Today', score: 7.2 },
];

export const generateAIResponse = (userMessage: string): string => {
  const responses = [
    "I hear that you're going through a challenging time. It takes courage to share these feelings. Can you tell me more about what's been weighing on your mind?",
    "Thank you for trusting me with your thoughts. What you're experiencing is valid, and it's important that we explore these feelings together. What would help you feel more supported right now?",
    "I notice you're dealing with some difficult emotions. Remember that seeking help is a sign of strength, not weakness. What coping strategies have you tried before?",
    "Your feelings are completely understandable given what you're going through. Let's work together to find some strategies that might help you feel more balanced. What brings you comfort when you're feeling this way?",
    "I want you to know that you're not alone in this. Many people experience similar challenges. Based on what you've shared, it might be helpful to speak with one of our professional therapists. Would you be interested in that?"
  ];
  
  // Simple keyword-based responses for demonstration
  const lowerMessage = userMessage.toLowerCase();
  
  if (lowerMessage.includes('suicide') || lowerMessage.includes('kill myself') || lowerMessage.includes('end it all')) {
    return "I'm very concerned about what you've shared. Your safety is my top priority. Please reach out to the National Suicide Prevention Lifeline at 988 immediately, or contact emergency services. I'd also like to connect you with one of our crisis-trained therapists right away.";
  }
  
  if (lowerMessage.includes('anxious') || lowerMessage.includes('anxiety')) {
    return "Anxiety can feel overwhelming, but there are effective ways to manage it. Have you tried any breathing exercises or grounding techniques? I can guide you through some strategies that many people find helpful.";
  }
  
  if (lowerMessage.includes('depressed') || lowerMessage.includes('sad')) {
    return "I'm sorry you're feeling this way. Depression can make everything feel more difficult. What has been the most challenging part of your day today?";
  }
  
  return responses[Math.floor(Math.random() * responses.length)];
};

export const mockQuizzes = [
  {
    lessonId: 1,
    title: "Understanding Anxiety Quiz",
    questions: [
      {
        id: 1,
        question: "What triggers the fight-or-flight response in anxiety?",
        options: [
          "Physical exercise",
          "Perceived threats or danger",
          "Happy memories",
          "Eating food"
        ],
        correctAnswer: 1,
        explanation: "The fight-or-flight response is triggered when your brain perceives a threat or danger, whether real or imagined."
      },
      {
        id: 2,
        question: "Which breathing technique is recommended for anxiety?",
        options: [
          "Inhale 2, hold 2, exhale 2",
          "Inhale 4, hold 4, exhale 6",
          "Rapid shallow breathing",
          "Holding breath for long periods"
        ],
        correctAnswer: 1,
        explanation: "The 4-4-6 breathing pattern (inhale 4, hold 4, exhale 6) helps activate the relaxation response."
      },
      {
        id: 3,
        question: "What are common physical symptoms of anxiety?",
        options: [
          "Racing heart and sweaty palms",
          "Improved concentration",
          "Increased appetite",
          "Better sleep quality"
        ],
        correctAnswer: 0,
        explanation: "Racing heart, sweaty palms, muscle tension, and difficulty concentrating are common anxiety symptoms."
      }
    ]
  },
  {
    id: 2,
    lessonId: 3,
    title: "CBT Fundamentals Quiz",
    questions: [
      {
        id: 1,
        question: "What does the CBT triangle represent?",
        options: [
          "Past, present, future",
          "Thoughts, feelings, behaviors",
          "Mind, body, spirit",
          "Family, work, relationships"
        ],
        correctAnswer: 1,
        explanation: "The CBT triangle shows how thoughts, feelings, and behaviors are interconnected and influence each other."
      },
      {
        id: 2,
        question: "What is 'catastrophizing'?",
        options: [
          "Planning for emergencies",
          "Assuming the worst possible outcome",
          "Being optimistic",
          "Staying calm under pressure"
        ],
        correctAnswer: 1,
        explanation: "Catastrophizing is a cognitive distortion where you assume the worst possible outcome will occur."
      }
    ]
  }
];

export const mockCertificates = [
  {
    id: 1,
    userId: "1",
    lessonId: 1,
    title: "Understanding Anxiety Certification",
    completedAt: new Date('2024-12-01'),
    score: 85,
    certificateNumber: "TELEPSYCHE-ANX-2024-001",
    issuerName: "TelePsyche Learning Institute",
    studentName: "Alex Johnson"
  },
  {
    id: 2,
    userId: "1",
    lessonId: 3,
    title: "CBT Fundamentals Certification",
    completedAt: new Date('2024-11-28'),
    score: 92,
    certificateNumber: "TELEPSYCHE-CBT-2024-003",
    issuerName: "TelePsyche Learning Institute", 
    studentName: "Alex Johnson"
  }
];

export const mockUserProgress = [
  {
    id: 1,
    userId: "1",
    lessonId: 1,
    completed: true,
    progress: 100,
    quizScore: 85,
    completedAt: new Date('2024-12-01'),
    certificateEarned: true
  },
  {
    id: 2,
    userId: "1",
    lessonId: 2,
    completed: false,
    progress: 60,
    quizScore: null,
    completedAt: null,
    certificateEarned: false
  },
  {
    id: 3,
    userId: "1",
    lessonId: 3,
    completed: true,
    progress: 100,
    quizScore: 92,
    completedAt: new Date('2024-11-28'),
    certificateEarned: true
  },
  {
    id: 4,
    userId: "1",
    lessonId: 4,
    completed: false,
    progress: 25,
    quizScore: null,
    completedAt: null,
    certificateEarned: false
  }
];
