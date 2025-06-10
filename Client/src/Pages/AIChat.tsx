// // import { useState, useRef, useEffect } from 'react';
// // import { motion } from 'framer-motion';
// // import { Button } from '../components/ui/button';
// // import { Input } from '../components/ui/input';
// // import { Card, CardContent } from '../components/ui/card';
// // import { useAuth } from '../hooks/use-auth';
// // import { useToast } from '../hooks/use-toast';
// // import { mockChatMessages, generateAIResponse } from '../lib/mockData';
// // import { formatTime } from '../lib/utils';
// // import { Send, Bot, AlertTriangle } from 'lucide-react';
// // import { Link } from 'wouter';

// // interface Message {
// //   id: string;
// //   content: string;
// //   isFromAI: boolean;
// //   timestamp: Date;
// //   isEscalation?: boolean;
// // }

// // const  AIChat: React.FC = () => {
// //   const { isAuthenticated } = useAuth();
// //   const { toast } = useToast();
// //   const [messages, setMessages] = useState<Message[]>([]);
// //   const [input, setInput] = useState('');
// //   const [isTyping, setIsTyping] = useState(false);
// //   const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
// //   const [selectedTherapist, setSelectedTherapist] = useState<string | null>(null);
// //   const [showCategories, setShowCategories] = useState(false);
// //   const [showTherapists, setShowTherapists] = useState(true);
// //   const [showFirstAid, setShowFirstAid] = useState(false);
// //   const messagesEndRef = useRef<HTMLDivElement>(null);

// //   const scrollToBottom = () => {
// //     messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
// //   };

// //   useEffect(() => {
// //     scrollToBottom();
// //   }, [messages]);

// //   if (isAuthenticated) {
// //     return (
// //       <div className="min-h-screen flex items-center justify-center bg-slate-50">
// //         <Card className="w-full max-w-md mx-4">
// //           <CardContent className="pt-6 text-center">
// //             <Bot className="h-12 w-12 text-primary mx-auto mb-4" />
// //             <h1 className="text-2xl font-bold text-slate-900 mb-2">
// //               AI Therapist Chat
// //             </h1>
// //             <p className="text-slate-600 mb-6">
// //               Please sign in to start chatting with Lisa, your AI therapy companion.
// //             </p>
// //             <Link href="/">
// //               <Button className="w-full">
// //                 Sign In to Continue
// //               </Button>
// //             </Link>
// //           </CardContent>
// //         </Card>
// //       </div>
// //     );
// //   }

// //   const aiTherapists = [
// //     {
// //       id: 'lisa',
// //       name: 'Dr. Lisa Chen',
// //       specialty: 'Cognitive Behavioral Therapy',
// //       description: 'Warm and empathetic, specializes in anxiety and depression',
// //       avatar: '👩‍⚕️',
// //       personality: 'gentle',
// //       greeting: "Hello! I'm Dr. Lisa Chen, your AI therapy companion. I specialize in cognitive behavioral therapy and I'm here to help you work through your thoughts and feelings in a safe, supportive space."
// //     },
// //     {
// //       id: 'marcus',
// //       name: 'Dr. Marcus Williams',
// //       specialty: 'Trauma & PTSD',
// //       description: 'Direct but caring approach, expert in trauma recovery',
// //       avatar: '👨‍⚕️',
// //       personality: 'direct',
// //       greeting: "I'm Dr. Marcus Williams. I work with people who've experienced trauma and difficult life events. My approach is straightforward and focused on helping you build resilience and heal."
// //     },
// //     {
// //       id: 'sarah',
// //       name: 'Dr. Sarah Rodriguez',
// //       specialty: 'Mindfulness & Stress',
// //       description: 'Calming presence, focuses on mindfulness techniques',
// //       avatar: '🧘‍♀️',
// //       personality: 'calm',
// //       greeting: "Welcome, I'm Dr. Sarah Rodriguez. I integrate mindfulness and meditation practices into therapy. Together, we can find peace and balance in your daily life."
// //     },
// //     {
// //       id: 'james',
// //       name: 'Dr. James Thompson',
// //       specialty: 'Life Transitions',
// //       description: 'Practical guidance for major life changes and decisions',
// //       avatar: '🧑‍💼',
// //       personality: 'practical',
// //       greeting: "Hi there, I'm Dr. James Thompson. I help people navigate major life changes - career transitions, relationships, and personal growth. Let's work together to find your path forward."
// //     },
// //     {
// //       id: 'nina',
// //       name: 'Dr. Nina Patel',
// //       specialty: 'Youth & Academic Stress',
// //       description: 'Relatable and encouraging, great with students and young adults',
// //       avatar: '👩‍🎓',
// //       personality: 'encouraging',
// //       greeting: "Hey! I'm Dr. Nina Patel. I work a lot with students and young adults dealing with academic pressure, social stress, and figuring out their future. I'm here to support you through it all."
// //     }
// //   ];

// //   const therapyCategories = [
// //     {
// //       id: 'heartbreak',
// //       title: 'Heartbreak & Relationships',
// //       description: 'Dealing with breakups, relationship issues, and emotional healing',
// //       icon: '💔',
// //       color: 'bg-pink-50 border-pink-200 hover:bg-pink-100'
// //     },
// //     {
// //       id: 'job',
// //       title: 'Job & Career Stress',
// //       description: 'Work anxiety, career transitions, and workplace challenges',
// //       icon: '💼',
// //       color: 'bg-blue-50 border-blue-200 hover:bg-blue-100'
// //     },
// //     {
// //       id: 'grief',
// //       title: 'Grief & Loss',
// //       description: 'Processing loss, bereavement, and major life changes',
// //       icon: '🕊️',
// //       color: 'bg-purple-50 border-purple-200 hover:bg-purple-100'
// //     },
// //     {
// //       id: 'depression',
// //       title: 'Depression & Low Mood',
// //       description: 'Feelings of sadness, hopelessness, and lack of motivation',
// //       icon: '🌧️',
// //       color: 'bg-gray-50 border-gray-200 hover:bg-gray-100'
// //     },
// //     {
// //       id: 'exam',
// //       title: 'Academic & Exam Stress',
// //       description: 'Test anxiety, academic pressure, and study-related stress',
// //       icon: '📚',
// //       color: 'bg-green-50 border-green-200 hover:bg-green-100'
// //     },
// //     {
// //       id: 'anxiety',
// //       title: 'Anxiety & Panic',
// //       description: 'Worry, panic attacks, and general anxiety management',
// //       icon: '😰',
// //       color: 'bg-yellow-50 border-yellow-200 hover:bg-yellow-100'
// //     },
// //     {
// //       id: 'family',
// //       title: 'Family & Social Issues',
// //       description: 'Family conflicts, social anxiety, and relationship dynamics',
// //       icon: '👨‍👩‍👧‍👦',
// //       color: 'bg-orange-50 border-orange-200 hover:bg-orange-100'
// //     },
// //     {
// //       id: 'general',
// //       title: 'General Support',
// //       description: 'Open conversation about any mental health concerns',
// //       icon: '💭',
// //       color: 'bg-indigo-50 border-indigo-200 hover:bg-indigo-100'
// //     }
// //   ];

// //   const handleTherapistSelect = (therapist: typeof aiTherapists[0]) => {
// //     setSelectedTherapist(therapist.id);
// //     setShowTherapists(false);
// //     setShowCategories(true);
    
// //     const greetingMessage: Message = {
// //       id: Date.now().toString(),
// //       content: therapist.greeting,
// //       isFromAI: true,
// //       timestamp: new Date(),
// //     };

// //     setMessages([greetingMessage]);
// //   };

// //   const handleFirstAidSelect = () => {
// //     setShowFirstAid(true);
// //     setShowTherapists(false);
// //     setShowCategories(false);
    
// //     const firstAidMessage: Message = {
// //       id: Date.now().toString(),
// //       content: "🚨 CRISIS SUPPORT ACTIVATED 🚨\n\nI'm here to provide immediate mental health first aid. If you're having thoughts of self-harm or suicide, please contact emergency services immediately:\n\n• Emergency: 911\n• Crisis Text Line: Text HOME to 741741\n• National Suicide Prevention Lifeline: 988\n\nI can help with immediate coping strategies. What's happening right now that brought you here?",
// //       isFromAI: true,
// //       timestamp: new Date(),
// //       isEscalation: true,
// //     };

// //     setMessages([firstAidMessage]);
// //   };

// //   const handleCategorySelect = (category: typeof therapyCategories[0]) => {
// //     setSelectedCategory(category.id);
// //     setShowCategories(false);
    
// //     const categoryMessage: Message = {
// //       id: Date.now().toString(),
// //       content: `I'd like to talk about ${category.title.toLowerCase()}. ${category.description}`,
// //       isFromAI: false,
// //       timestamp: new Date(),
// //     };

// //     setMessages(prev => [...prev, categoryMessage]);
// //     setIsTyping(true);

// //     // Get selected therapist for personalized response
// //     const therapist = aiTherapists.find(t => t.id === selectedTherapist);
    
// //     setTimeout(() => {
// //       let aiResponse = "";
      
// //       // Personalized responses based on therapist personality and category
// //       if (therapist) {
// //         switch (category.id) {
// //           case 'heartbreak':
// //             if (therapist.personality === 'gentle') {
// //               aiResponse = "I can see you're dealing with relationship pain. Heartbreak touches the deepest parts of who we are. Let's explore these feelings together - what aspect of this experience has been the most difficult for you?";
// //             } else if (therapist.personality === 'direct') {
// //               aiResponse = "Relationship endings are tough, no sugar-coating that. But you're here talking about it, which shows strength. What's the main thing that's keeping you stuck right now?";
// //             } else if (therapist.personality === 'calm') {
// //               aiResponse = "Heartbreak creates waves of emotion that can feel overwhelming. Let's breathe through this together. Can you tell me what feelings are strongest for you right now?";
// //             } else {
// //               aiResponse = "Breakups and relationship issues are some of life's biggest challenges. You're taking a positive step by reaching out. What part of this situation feels most overwhelming to you?";
// //             }
// //             break;
// //           case 'anxiety':
// //             if (therapist.personality === 'calm') {
// //               aiResponse = "Anxiety can feel like a storm inside. I want to help you find your center again. Let's start by understanding - when do you notice your anxiety is strongest?";
// //             } else if (therapist.personality === 'gentle') {
// //               aiResponse = "I understand how frightening anxiety can feel. You're safe here, and we can work through this together. What does anxiety feel like in your body?";
// //             } else {
// //               aiResponse = "Anxiety is very treatable, and there are concrete strategies we can use. Tell me about when your anxiety tends to spike - are there specific triggers?";
// //             }
// //             break;
// //           default:
// //             aiResponse = `I'm here to support you through this. Based on my experience with ${category.title.toLowerCase()}, I want you to know that what you're feeling is valid. Can you tell me more about what's been going on?`;
// //         }
// //       } else {
// //         // Fallback responses
// //         switch (category.id) {
// //           case 'heartbreak':
// //             aiResponse = "I understand you're going through relationship difficulties. Heartbreak can be incredibly painful, and it's completely normal to feel overwhelmed. Can you tell me what's been the most challenging part of this experience for you?";
// //             break;
// //           case 'job':
// //             aiResponse = "Work-related stress can really impact our overall well-being. Whether it's job pressure, difficult colleagues, or career uncertainty, these feelings are valid. What specific aspect of your work situation is causing you the most stress?";
// //             break;
// //           case 'grief':
// //             aiResponse = "I'm sorry for your loss. Grief is a deeply personal journey, and there's no 'right' way to process it. Each person's experience is unique. Would you like to share what you're going through, or would you prefer to talk about how grief has been affecting your daily life?";
// //             break;
// //           case 'depression':
// //             aiResponse = "Thank you for reaching out about your mood. Depression can make everything feel heavier and more difficult. You've taken an important step by seeking support. How have you been feeling lately, and what has been the most challenging part of your day?";
// //             break;
// //           case 'exam':
// //             aiResponse = "Academic stress and exam anxiety are very common experiences. The pressure to perform can feel overwhelming. I'm here to help you develop strategies to manage this stress. What specific aspects of your studies or upcoming exams are worrying you most?";
// //             break;
// //           case 'anxiety':
// //             aiResponse = "Anxiety can feel very overwhelming, and I want you to know that what you're experiencing is real and valid. Many people struggle with anxiety, and there are effective ways to manage it. Can you describe what your anxiety feels like, or what situations tend to trigger it?";
// //             break;
// //           case 'family':
// //             aiResponse = "Family and social relationships can be complex and sometimes challenging. These dynamics often affect us deeply because they involve people who are important to us. What's been happening in your family or social life that you'd like to talk about?";
// //             break;
// //           default:
// //             aiResponse = "I'm glad you reached out for support. This is a safe space where you can share whatever is on your mind. There's no pressure to discuss anything specific - we can talk about whatever feels most important to you right now. What would you like to explore today?";
// //         }
// //       }

// //       const aiMessage: Message = {
// //         id: (Date.now() + 1).toString(),
// //         content: aiResponse,
// //         isFromAI: true,
// //         timestamp: new Date(),
// //       };

// //       setMessages(prev => [...prev, aiMessage]);
// //       setIsTyping(false);
// //     }, 1500);
// //   };

// //   const sendMessage = async () => {
// //     if (!input.trim()) return;

// //     const userMessage: Message = {
// //       id: Date.now().toString(),
// //       content: input,
// //       isFromAI: false,
// //       timestamp: new Date(),
// //     };

// //     setMessages(prev => [...prev, userMessage]);
// //     setInput('');
// //     setIsTyping(true);
// //     setShowCategories(false);

// //     // Simulate AI response delay
// //     setTimeout(() => {
// //       let aiResponse = "";
// //       const isEscalation = input.toLowerCase().includes('suicide') || 
// //                           input.toLowerCase().includes('self-harm') ||
// //                           input.toLowerCase().includes('kill myself') ||
// //                           input.toLowerCase().includes('crisis') ||
// //                           input.toLowerCase().includes('emergency');

// //       if (showFirstAid || isEscalation) {
// //         // First Aid AI responses
// //         if (input.toLowerCase().includes('suicide') || input.toLowerCase().includes('kill myself')) {
// //           aiResponse = "I'm very concerned about what you've shared. Your life has value and there are people who want to help you right now.\n\n🆘 IMMEDIATE HELP:\n• Call 988 (Suicide & Crisis Lifeline) - available 24/7\n• Text 'HELLO' to 741741 (Crisis Text Line)\n• Call 911 if in immediate danger\n\nCan you tell me if you're in a safe place right now? I want to help you get through this moment.";
// //         } else if (input.toLowerCase().includes('panic') || input.toLowerCase().includes('anxiety attack')) {
// //           aiResponse = "You're having a panic attack and that's very frightening, but you're going to be okay. Let's use the 5-4-3-2-1 grounding technique:\n\n👀 Name 5 things you can see\n👂 Name 4 things you can hear\n👋 Name 3 things you can touch\n👃 Name 2 things you can smell\n👅 Name 1 thing you can taste\n\nBreathe slowly: in for 4 counts, hold for 4, out for 6. You're safe. This will pass.";
// //         } else if (input.toLowerCase().includes('self-harm') || input.toLowerCase().includes('hurt myself')) {
// //           aiResponse = "I hear that you're in pain and thinking about hurting yourself. These feelings are real, but there are safer ways to cope with this pain.\n\n🆘 RIGHT NOW:\n• Hold ice cubes in your hands\n• Take a very hot or cold shower\n• Do intense exercise\n• Call 988 for immediate support\n\nCan you stay safe for the next hour? What's one small thing that usually brings you comfort?";
// //         } else {
// //           aiResponse = "I can hear that you're going through something difficult right now. In crisis situations, it's important to focus on immediate safety and getting proper support.\n\nWhat's the most pressing concern you're facing right now? I'm here to help you think through your next steps and connect you with appropriate resources.";
// //         }
// //       } else {
// //         // Regular therapist responses based on personality
// //         const therapist = aiTherapists.find(t => t.id === selectedTherapist);
        
// //         if (therapist) {
// //           if (therapist.personality === 'gentle') {
// //             aiResponse = "I hear what you're saying, and I want you to know that your feelings are completely valid. It takes courage to share these thoughts. Can you tell me more about what's been weighing on your mind lately?";
// //           } else if (therapist.personality === 'direct') {
// //             aiResponse = "Thank you for being open with me. Let's focus on what's really bothering you - what would you say is the main issue you're dealing with right now?";
// //           } else if (therapist.personality === 'calm') {
// //             aiResponse = "I appreciate you sharing that with me. Let's take a moment to acknowledge these feelings. What would help you feel more centered right now?";
// //           } else if (therapist.personality === 'practical') {
// //             aiResponse = "I understand you're facing some challenges. Let's work together to break this down into manageable pieces. What's one specific area where you'd like to see change?";
// //           } else if (therapist.personality === 'encouraging') {
// //             aiResponse = "I'm really glad you reached out - that shows a lot of strength. What you're going through sounds challenging, but you're not alone in this. What's been the hardest part of your day?";
// //           } else {
// //             aiResponse = generateAIResponse(input);
// //           }
// //         } else {
// //           aiResponse = generateAIResponse(input);
// //         }
// //       }

// //       const aiMessage: Message = {
// //         id: (Date.now() + 1).toString(),
// //         content: aiResponse,
// //         isFromAI: true,
// //         timestamp: new Date(),
// //         isEscalation: isEscalation || showFirstAid,
// //       };

// //       setMessages(prev => [...prev, aiMessage]);
// //       setIsTyping(false);

// //       if (isEscalation && !showFirstAid) {
// //         toast({
// //           title: "Crisis Support Detected",
// //           description: "Consider switching to Crisis Support AI for specialized emergency assistance.",
// //           variant: "destructive",
// //         });
// //       }
// //     }, 1000 + Math.random() * 2000);
// //   };

// //   const handleKeyPress = (e: React.KeyboardEvent) => {
// //     if (e.key === 'Enter' && !e.shiftKey) {
// //       e.preventDefault();
// //       sendMessage();
// //     }
// //   };

// //   return (
// //     <div className="min-h-screen bg-white">
// //       <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
// //         <motion.div
// //           initial={{ opacity: 0, y: 20 }}
// //           animate={{ opacity: 1, y: 0 }}
// //           className="text-center mb-8"
// //         >
// //           <h1 className="text-3xl font-bold text-slate-900 mb-4">
// //             Chat with Lisa, Your AI Therapist
// //           </h1>
// //           <p className="text-lg text-slate-600">
// //             Available 24/7 for support and guidance
// //           </p>
// //         </motion.div>

// //         <Card className="shadow-lg border-slate-200">
// //           <CardContent className="p-6">
// //             {/* Chat Header */}
// //             <div className="flex items-center justify-between pb-4 border-b border-slate-200 mb-6">
// //               <div className="flex items-center space-x-3">
// //                 <div className="w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center">
// //                   {selectedTherapist ? (
// //                     <span className="text-lg">
// //                       {aiTherapists.find(t => t.id === selectedTherapist)?.avatar}
// //                     </span>
// //                   ) : showFirstAid ? (
// //                     <span className="text-lg">🚨</span>
// //                   ) : (
// //                     <Bot className="text-white h-5 w-5" />
// //                   )}
// //                 </div>
// //                 <div>
// //                   <h4 className="font-semibold text-slate-900">
// //                     {selectedTherapist 
// //                       ? aiTherapists.find(t => t.id === selectedTherapist)?.name 
// //                       : showFirstAid 
// //                       ? "Crisis Support AI"
// //                       : "AI Therapy Chat"
// //                     }
// //                   </h4>
// //                   <p className="text-sm text-green-600">
// //                     {selectedTherapist 
// //                       ? aiTherapists.find(t => t.id === selectedTherapist)?.specialty
// //                       : showFirstAid 
// //                       ? "Emergency Mental Health Support"
// //                       : "Online • Select Your Therapist"
// //                     }
// //                   </p>
// //                 </div>
// //               </div>
// //               {(selectedTherapist || showFirstAid) && (
// //                 <Button 
// //                   variant="ghost" 
// //                   size="sm" 
// //                   onClick={() => {
// //                     setShowTherapists(true);
// //                     setShowCategories(false);
// //                     setShowFirstAid(false);
// //                     setSelectedTherapist(null);
// //                     setMessages([]);
// //                   }}
// //                 >
// //                   Change Therapist
// //                 </Button>
// //               )}
// //             </div>

// //             {/* Therapist Selection */}
// //             {showTherapists && (
// //               <motion.div
// //                 initial={{ opacity: 0, y: 20 }}
// //                 animate={{ opacity: 1, y: 0 }}
// //                 className="mb-6"
// //               >
// //                 <div className="text-center mb-6">
// //                   <h3 className="text-xl font-semibold text-slate-900 mb-2">
// //                     Choose Your AI Therapist
// //                   </h3>
// //                   <p className="text-slate-600 mb-4">
// //                     Select a therapist that matches your needs and comfort level
// //                   </p>
                  
// //                   {/* First Aid Option */}
// //                   <motion.button
// //                     onClick={handleFirstAidSelect}
// //                     whileHover={{ scale: 1.02 }}
// //                     whileTap={{ scale: 0.98 }}
// //                     className="w-full p-4 mb-4 bg-red-50 border-2 border-red-200 hover:bg-red-100 rounded-xl text-left transition-all"
// //                   >
// //                     <div className="flex items-center space-x-3">
// //                       <span className="text-2xl">🚨</span>
// //                       <div>
// //                         <h4 className="font-semibold text-red-900">Crisis Support & First Aid</h4>
// //                         <p className="text-sm text-red-700">
// //                           Immediate support for mental health emergencies and crisis situations
// //                         </p>
// //                       </div>
// //                     </div>
// //                   </motion.button>
// //                 </div>

// //                 <div className="grid gap-4">
// //                   {aiTherapists.map((therapist) => (
// //                     <motion.button
// //                       key={therapist.id}
// //                       onClick={() => handleTherapistSelect(therapist)}
// //                       whileHover={{ scale: 1.02 }}
// //                       whileTap={{ scale: 0.98 }}
// //                       className="p-4 bg-white border-2 border-slate-200 hover:border-primary/50 hover:bg-slate-50 rounded-xl text-left transition-all"
// //                     >
// //                       <div className="flex items-center space-x-4">
// //                         <span className="text-3xl">{therapist.avatar}</span>
// //                         <div className="flex-1">
// //                           <h4 className="font-semibold text-slate-900 mb-1">
// //                             {therapist.name}
// //                           </h4>
// //                           <p className="text-sm font-medium text-primary mb-1">
// //                             {therapist.specialty}
// //                           </p>
// //                           <p className="text-sm text-slate-600">
// //                             {therapist.description}
// //                           </p>
// //                         </div>
// //                       </div>
// //                     </motion.button>
// //                   ))}
// //                 </div>
// //               </motion.div>
// //             )}

// //             {/* Therapy Categories */}
// //             {showCategories && (
// //               <motion.div
// //                 initial={{ opacity: 0, y: 20 }}
// //                 animate={{ opacity: 1, y: 0 }}
// //                 className="mb-6"
// //               >
// //                 <h3 className="text-lg font-semibold text-slate-900 mb-4">
// //                   What would you like to talk about today?
// //                 </h3>
// //                 <div className="grid grid-cols-2 gap-3 mb-4">
// //                   {therapyCategories.map((category) => (
// //                     <motion.button
// //                       key={category.id}
// //                       onClick={() => handleCategorySelect(category)}
// //                       whileHover={{ scale: 1.02 }}
// //                       whileTap={{ scale: 0.98 }}
// //                       className={`p-4 rounded-xl border-2 text-left transition-all ${category.color}`}
// //                     >
// //                       <div className="flex items-center space-x-3 mb-2">
// //                         <span className="text-2xl">{category.icon}</span>
// //                         <h4 className="font-medium text-slate-900 text-sm">
// //                           {category.title}
// //                         </h4>
// //                       </div>
// //                       <p className="text-xs text-slate-600 leading-relaxed">
// //                         {category.description}
// //                       </p>
// //                     </motion.button>
// //                   ))}
// //                 </div>
// //                 <div className="text-center">
// //                   <p className="text-sm text-slate-500 mb-3">
// //                     Or you can type your message directly below
// //                   </p>
// //                 </div>
// //               </motion.div>
// //             )}

// //             {/* Messages */}
// //             <div className="space-y-4 mb-6 max-h-96 overflow-y-auto">
// //               {messages.map((message) => (
// //                 <motion.div
// //                   key={message.id}
// //                   initial={{ opacity: 0, y: 10 }}
// //                   animate={{ opacity: 1, y: 0 }}
// //                   className={`flex items-start space-x-3 ${
// //                     message.isFromAI ? '' : 'justify-end'
// //                   }`}
// //                 >
// //                   {message.isFromAI && (
// //                     <div className="w-8 h-8 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center flex-shrink-0">
// //                       <Bot className="text-white h-4 w-4" />
// //                     </div>
// //                   )}
                  
// //                   <div
// //                     className={`rounded-2xl p-4 shadow-sm max-w-md ${
// //                       message.isFromAI
// //                         ? 'bg-white border border-slate-200 rounded-tl-none'
// //                         : 'bg-primary text-white rounded-tr-none'
// //                     }`}
// //                   >
// //                     <p className={message.isFromAI ? 'text-slate-800' : 'text-white'}>
// //                       {message.content}
// //                     </p>
// //                     <span
// //                       className={`text-xs mt-2 block ${
// //                         message.isFromAI ? 'text-slate-500' : 'text-indigo-200'
// //                       }`}
// //                     >
// //                       {formatTime(message.timestamp)}
// //                     </span>
// //                   </div>

// //                   {!message.isFromAI && (
// //                     <div className="w-8 h-8 bg-slate-300 rounded-full flex items-center justify-center flex-shrink-0">
// //                       <span className="text-slate-600 text-xs font-medium">U</span>
// //                     </div>
// //                   )}
// //                 </motion.div>
// //               ))}

// //               {/* Crisis Detection Alert */}
// //               {messages.some(m => m.isEscalation) && (
// //                 <motion.div
// //                   initial={{ opacity: 0, scale: 0.95 }}
// //                   animate={{ opacity: 1, scale: 1 }}
// //                   className="bg-amber-50 border border-amber-200 rounded-xl p-4"
// //                 >
// //                   <div className="flex items-center space-x-2 mb-2">
// //                     <AlertTriangle className="h-5 w-5 text-amber-600" />
// //                     <span className="font-medium text-amber-800">Care Escalation Available</span>
// //                   </div>
// //                   <p className="text-sm text-amber-700 mb-3">
// //                     I notice you might benefit from speaking with a human therapist. 
// //                     Would you like me to connect you with one of our verified professionals?
// //                   </p>
// //                   <Link href="/therapists">
// //                     <Button
// //                       size="sm"
// //                       className="bg-amber-600 text-white hover:bg-amber-700"
// //                     >
// //                       Find a Therapist
// //                     </Button>
// //                   </Link>
// //                 </motion.div>
// //               )}

// //               {isTyping && (
// //                 <motion.div
// //                   initial={{ opacity: 0 }}
// //                   animate={{ opacity: 1 }}
// //                   className="flex items-start space-x-3"
// //                 >
// //                   <div className="w-8 h-8 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center flex-shrink-0">
// //                     <Bot className="text-white h-4 w-4" />
// //                   </div>
// //                   <div className="bg-white border border-slate-200 rounded-2xl rounded-tl-none p-4 shadow-sm">
// //                     <div className="flex space-x-1">
// //                       <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce"></div>
// //                       <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
// //                       <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
// //                     </div>
// //                   </div>
// //                 </motion.div>
// //               )}

// //               <div ref={messagesEndRef} />
// //             </div>

// //             {/* Chat Input */}
// //             <div className="flex space-x-3">
// //               <Input
// //                 value={input}
// //                 onChange={(e) => setInput(e.target.value)}
// //                 onKeyPress={handleKeyPress}
// //                 placeholder="Type your message here..."
// //                 className="flex-1 bg-white border border-slate-300 focus:ring-2 focus:ring-primary focus:border-transparent"
// //                 disabled={isTyping}
// //               />
// //               <Button
// //                 onClick={sendMessage}
// //                 disabled={!input.trim() || isTyping}
// //                 className="px-6"
// //               >
// //                 <Send className="h-4 w-4" />
// //               </Button>
// //             </div>
// //           </CardContent>
// //         </Card>
// //       </div>
// //     </div>
// //   );
// // }

// // export default AIChat;















































// import { useState, useRef, useEffect } from 'react';
// import { motion } from 'framer-motion';
// import { Button } from '../components/ui/button';
// import { Input } from '../components/ui/input';
// import { Card, CardContent } from '../components/ui/card';
// import { useAuth } from '../hooks/use-auth';
// import { useToast } from '../hooks/use-toast';
// import { formatTime } from '../lib/utils';
// import { Send, Bot, AlertTriangle } from 'lucide-react';
// import { Link } from 'wouter';
// import { fetchTherapistAdvice } from '../lib/aiTherapist';
// import type { Message } from '../lib/aiTherapist';

// interface Therapist {
//   id: string;
//   name: string;
//   specialty: string;
//   description: string;
//   avatar: string;
//   personality: string;
//   greeting: string;
// }

// const AIChat: React.FC = () => {
//   const { isAuthenticated } = useAuth();
//   const { toast } = useToast();
//   const [messages, setMessages] = useState<Message[]>([]);
//   const [input, setInput] = useState('');
//   const [isTyping, setIsTyping] = useState(false);
//   const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
//   const [selectedTherapist, setSelectedTherapist] = useState<Therapist | null>(null);
//   const [showCategories, setShowCategories] = useState(false);
//   const [showTherapists, setShowTherapists] = useState(true);
//   const [showFirstAid, setShowFirstAid] = useState(false);
//   const [language, setLanguage] = useState<string>('en');
//   const messagesEndRef = useRef<HTMLDivElement>(null);

//   const scrollToBottom = () => {
//     messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
//   };

//   useEffect(() => {
//     scrollToBottom();
//   }, [messages]);

//   if (isAuthenticated) {
//     return (
//       <div className="min-h-screen flex items-center justify-center bg-slate-50">
//         <Card className="w-full max-w-md mx-4">
//           <CardContent className="pt-6 text-center">
//             <Bot className="h-12 w-12 text-primary mx-auto mb-4" />
//             <h1 className="text-2xl font-bold text-slate-900 mb-2">
//               Welcome to Checkmate AI
//             </h1>
//             <p className="text-slate-600 mb-6">
//               Sign in to chat with your friendly AI therapy companion—we’re here to listen!
//             </p>
//             <Link href="/">
//               <Button className="w-full">
//                 Sign In to Start Chatting
//               </Button>
//             </Link>
//           </CardContent>
//         </Card>
//       </div>
//     );
//   }

//   const aiTherapists: Therapist[] = [
//     {
//       id: 'lisa',
//       name: 'Dr. Lisa Chen',
//       specialty: 'Cognitive Behavioral Therapy',
//       description: 'Warm and empathetic, great for anxiety and depression',
//       avatar: '👩‍⚕️',
//       personality: 'gentle',
//       greeting: "Hey there, I'm Dr. Lisa Chen, and I'm so glad you're here. I specialize in cognitive behavioral therapy, and my goal is to create a safe, cozy space for you to share your thoughts. What's on your mind today?"
//     },
//     {
//       id: 'marcus',
//       name: 'Dr. Marcus Williams',
//       specialty: 'Trauma & PTSD',
//       description: 'Direct but caring, expert in trauma recovery',
//       avatar: '👨‍⚕️',
//       personality: 'direct',
//       greeting: "Hi, I'm Dr. Marcus Williams. I focus on helping folks heal from trauma and tough experiences with a straightforward, caring approach. What's going on for you right now?"
//     },
//     {
//       id: 'sarah',
//       name: 'Dr. Sarah Rodriguez',
//       specialty: 'Mindfulness & Stress',
//       description: 'Calming and kind, loves mindfulness techniques',
//       avatar: '🧘‍♀️',
//       personality: 'calm',
//       greeting: "Hello, I'm Dr. Sarah Rodriguez, and I'm here to help you find some calm in the storm. I love using mindfulness to bring peace to your day. What’s weighing on you today?"
//     },
//     {
//       id: 'james',
//       name: 'Dr. James Thompson',
//       specialty: 'Life Transitions',
//       description: 'Practical and supportive for life’s big changes',
//       avatar: '🧑‍💼',
//       personality: 'practical',
//       greeting: "Hey, I'm Dr. James Thompson, and I’m here to help you navigate life’s twists and turns. Whether it’s a career shift or a personal change, we’ll figure it out together. What’s up?"
//     },
//     {
//       id: 'nina',
//       name: 'Dr. Nina Patel',
//       specialty: 'Youth & Academic Stress',
//       description: 'Fun and encouraging, perfect for students',
//       avatar: '👩‍🎓',
//       personality: 'encouraging',
//       greeting: "Hi there, I'm Dr. Nina Patel! I love supporting students and young folks through academic stress and big dreams. You’ve got this, and I’m here to help. What’s on your mind?"
//     }
//   ];

//   const therapyCategories = [
//     {
//       id: 'heartbreak',
//       title: 'Heartbreak & Relationships',
//       description: 'Navigating breakups, relationship struggles, or emotional healing',
//       icon: '💔',
//       color: 'bg-pink-50 border-pink-200 hover:bg-pink-100'
//     },
//     {
//       id: 'job',
//       title: 'Job & Career Stress',
//       description: 'Dealing with work stress, career changes, or workplace challenges',
//       icon: '💼',
//       color: 'bg-blue-50 border-blue-200 hover:bg-blue-100'
//     },
//     {
//       id: 'grief',
//       title: 'Grief & Loss',
//       description: 'Processing loss, grief, or major life changes',
//       icon: '🕊️',
//       color: 'bg-purple-50 border-purple-200 hover:bg-purple-100'
//     },
//     {
//       id: 'depression',
//       title: 'Depression & Low Mood',
//       description: 'Feeling sad, hopeless, or unmotivated',
//       icon: '🌧️',
//       color: 'bg-gray-50 border-gray-200 hover:bg-gray-100'
//     },
//     {
//       id: 'exam',
//       title: 'Academic & Exam Stress',
//       description: 'Managing test anxiety, academic pressure, or study stress',
//       icon: '📚',
//       color: 'bg-green-50 border-green-200 hover:bg-green-100'
//     },
//     {
//       id: 'anxiety',
//       title: 'Anxiety & Panic',
//       description: 'Handling worry, panic attacks, or general anxiety',
//       icon: '😰',
//       color: 'bg-yellow-50 border-yellow-200 hover:bg-yellow-100'
//     },
//     {
//       id: 'family',
//       title: 'Family & Social Issues',
//       description: 'Working through family conflicts or social stress',
//       icon: '👨‍👩‍👧‍👦',
//       color: 'bg-orange-50 border-orange-200 hover:bg-orange-100'
//     },
//     {
//       id: 'general',
//       title: 'General Support',
//       description: 'Just want to talk about what’s on your mind',
//       icon: '💭',
//       color: 'bg-indigo-50 border-indigo-200 hover:bg-indigo-100'
//     }
//   ];

//   const handleTherapistSelect = (therapist: Therapist) => {
//     setSelectedTherapist(therapist);
//     setShowTherapists(false);
//     setShowCategories(true);
    
//     const greetingMessage: Message = {
//       id: Date.now().toString(),
//       content: therapist.greeting,
//       isFromAI: true,
//       timestamp: new Date(),
//     };

//     setMessages([greetingMessage]);
//   };

//   const handleFirstAidSelect = async () => {
//     setShowFirstAid(true);
//     setShowTherapists(false);
//     setShowCategories(false);
//     setSelectedTherapist(null);
    
//     const firstAidMessage: Message = {
//       id: Date.now().toString(),
//       content: `Hi, I'm your Crisis Support AI, and I'm here to help you through this tough moment. If you're having thoughts of self-harm or suicide, please call 911, text HOME to 741741, or reach out to 988 (National Suicide Prevention Lifeline) right away. You’re not alone, and I’m here to listen. Can you share what’s going on? Let’s take it one step at a time.`,
//       isFromAI: true,
//       timestamp: new Date(),
//       isEscalation: true,
//     };

//     setMessages([firstAidMessage]);
//   };

//   const handleCategorySelect = async (category: typeof therapyCategories[0]) => {
//     setSelectedCategory(category.id);
//     setShowCategories(false);
    
//     const userMessage: Message = {
//       id: Date.now().toString(),
//       content: `I'd like to talk about ${category.title.toLowerCase()}. ${category.description}`,
//       isFromAI: false,
//       timestamp: new Date(),
//     };

//     setMessages((prev) => [...prev, userMessage]);
//     setIsTyping(true);

//     const aiMessage = await fetchTherapistAdvice(
//       userMessage.content,
//       language,
//       selectedTherapist,
//       category.id,
//       [...messages, userMessage]
//     );

//     setMessages((prev) => [...prev, aiMessage]);
//     setIsTyping(false);

//     if (aiMessage.isEscalation) {
//       toast({
//         title: 'We’re Here for You',
//         description: 'It sounds like you’re going through a lot. Consider switching to Crisis Support AI for extra help.',
//         variant: 'destructive',
//       });
//     }
//   };

//   const sendMessage = async () => {
//     if (!input.trim()) return;

//     const userMessage: Message = {
//       id: Date.now().toString(),
//       content: input,
//       isFromAI: false,
//       timestamp: new Date(),
//     };

//     setMessages((prev) => [...prev, userMessage]);
//     setInput('');
//     setIsTyping(true);
//     setShowCategories(false);

//     const aiMessage = await fetchTherapistAdvice(
//       input,
//       language,
//       selectedTherapist,
//       selectedCategory,
//       [...messages, userMessage]
//     );

//     setMessages((prev) => [...prev, aiMessage]);
//     setIsTyping(false);

//     if (aiMessage.isEscalation && !showFirstAid) {
//       toast({
//         title: 'We’re Here for You',
//         description: 'It sounds like you’re going through a lot. Consider switching to Crisis Support AI for extra help.',
//         variant: 'destructive',
//       });
//     }
//   };

//   const handleKeyPress = (e: React.KeyboardEvent) => {
//     if (e.key === 'Enter' && !e.shiftKey) {
//       e.preventDefault();
//       sendMessage();
//     }
//   };

//   return (
//     <div className="min-h-screen bg-white">
//       <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           className="text-center mb-8"
//         >
//           <h1 className="text-3xl font-bold text-slate-900 mb-4">
//             Welcome to Checkmate AI
//           </h1>
//           <p className="text-lg text-slate-600">
//             Your friendly companion for mental health support, here for you 24/7
//           </p>
//           <label className="flex items-center justify-center space-x-2 mt-4">
//             <span className="text-sm font-medium">Language:</span>
//             <select
//               value={language}
//               onChange={(e) => setLanguage(e.target.value)}
//               className="border rounded-lg px-2 py-1 bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
//             >
//               <option value="en">English</option>
//               <option value="es">Spanish</option>
//               <option value="fr">French</option>
//               <option value="de">German</option>
//               <option value="zh">Chinese</option>
//               <option value="sw">Kiswahili (Swahili)</option>
//               <option value="ar">Arabic</option>
//               <option value="ja">Japanese</option>
//               <option value="ru">Russian</option>
//             </select>
//           </label>
//         </motion.div>

//         <Card className="shadow-lg border-slate-200">
//           <CardContent className="p-6">
//             {/* Chat Header */}
//             <div className="flex items-center justify-between pb-4 border-b border-slate-200 mb-6">
//               <div className="flex items-center space-x-3">
//                 <div className="w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center">
//                   {selectedTherapist ? (
//                     <span className="text-lg">{selectedTherapist.avatar}</span>
//                   ) : showFirstAid ? (
//                     <span className="text-lg">🚨</span>
//                   ) : (
//                     <Bot className="text-white h-5 w-5" />
//                   )}
//                 </div>
//                 <div>
//                   <h4 className="font-semibold text-slate-900">
//                     {selectedTherapist 
//                       ? selectedTherapist.name 
//                       : showFirstAid 
//                       ? 'Crisis Support AI'
//                       : 'AI Therapy Chat'
//                     }
//                   </h4>
//                   <p className="text-sm text-green-600">
//                     {selectedTherapist 
//                       ? selectedTherapist.specialty
//                       : showFirstAid 
//                       ? 'Here for Urgent Support'
//                       : 'Online • Pick Your Companion'
//                     }
//                   </p>
//                 </div>
//               </div>
//               {(selectedTherapist || showFirstAid) && (
//                 <Button 
//                   variant="ghost" 
//                   size="sm" 
//                   onClick={() => {
//                     setShowTherapists(true);
//                     setShowCategories(false);
//                     setShowFirstAid(false);
//                     setSelectedTherapist(null);
//                     setMessages([]);
//                   }}
//                 >
//                   Choose Another Companion
//                 </Button>
//               )}
//             </div>

//             {/* Therapist Selection */}
//             {showTherapists && (
//               <motion.div
//                 initial={{ opacity: 0, y: 20 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 className="mb-6"
//               >
//                 <div className="text-center mb-6">
//                   <h3 className="text-xl font-semibold text-slate-900 mb-2">
//                     Pick Your AI Companion
//                   </h3>
//                   <p className="text-slate-600 mb-4">
//                     Choose someone who feels right for you—we’re all here to listen
//                   </p>
                  
//                   {/* First Aid Option */}
//                   <motion.button
//                     onClick={handleFirstAidSelect}
//                     whileHover={{ scale: 1.02 }}
//                     whileTap={{ scale: 0.98 }}
//                     className="w-full p-4 mb-4 bg-red-50 border-2 border-red-200 hover:bg-red-100 rounded-xl text-left transition-all"
//                   >
//                     <div className="flex items-center space-x-3">
//                       <span className="text-2xl">🚨</span>
//                       <div>
//                         <h4 className="font-semibold text-red-900">Crisis Support</h4>
//                         <p className="text-sm text-red-700">
//                           Immediate help for urgent mental health needs
//                         </p>
//                       </div>
//                     </div>
//                   </motion.button>
//                 </div>

//                 <div className="grid gap-4">
//                   {aiTherapists.map((therapist) => (
//                     <motion.button
//                       key={therapist.id}
//                       onClick={() => handleTherapistSelect(therapist)}
//                       whileHover={{ scale: 1.02 }}
//                       whileTap={{ scale: 0.98 }}
//                       className="p-4 bg-white border-2 border-slate-200 hover:border-primary/50 hover:bg-slate-50 rounded-xl text-left transition-all"
//                     >
//                       <div className="flex items-center space-x-4">
//                         <span className="text-3xl">{therapist.avatar}</span>
//                         <div className="flex-1">
//                           <h4 className="font-semibold text-slate-900 mb-1">
//                             {therapist.name}
//                           </h4>
//                           <p className="text-sm font-medium text-primary mb-1">
//                             {therapist.specialty}
//                           </p>
//                           <p className="text-sm text-slate-600">
//                             {therapist.description}
//                           </p>
//                         </div>
//                       </div>
//                     </motion.button>
//                   ))}
//                 </div>
//               </motion.div>
//             )}

//             {/* Therapy Categories */}
//             {showCategories && (
//               <motion.div
//                 initial={{ opacity: 0, y: 20 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 className="mb-6"
//               >
//                 <h3 className="text-lg font-semibold text-slate-900 mb-4">
//                   What’s on your mind today?
//                 </h3>
//                 <div className="grid grid-cols-2 gap-3 mb-4">
//                   {therapyCategories.map((category) => (
//                     <motion.button
//                       key={category.id}
//                       onClick={() => handleCategorySelect(category)}
//                       whileHover={{ scale: 1.02 }}
//                       whileTap={{ scale: 0.98 }}
//                       className={`p-4 rounded-xl border-2 text-left transition-all ${category.color}`}
//                     >
//                       <div className="flex items-center space-x-3 mb-2">
//                         <span className="text-2xl">{category.icon}</span>
//                         <h4 className="font-medium text-slate-900 text-sm">
//                           {category.title}
//                         </h4>
//                       </div>
//                       <p className="text-xs text-slate-600 leading-relaxed">
//                         {category.description}
//                       </p>
//                     </motion.button>
//                   ))}
//                 </div>
//                 <div className="text-center">
//                   <p className="text-sm text-slate-500 mb-3">
//                     Or just type whatever’s in your heart below
//                   </p>
//                 </div>
//               </motion.div>
//             )}

//             {/* Messages */}
//             <div className="space-y-4 mb-6 max-h-96 overflow-y-auto">
//               {messages.map((message) => (
//                 <motion.div
//                   key={message.id}
//                   initial={{ opacity: 0, y: 10 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   className={`flex items-start space-x-3 ${
//                     message.isFromAI ? '' : 'justify-end'
//                   }`}
//                 >
//                   {message.isFromAI && (
//                     <div className="w-8 h-8 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center flex-shrink-0">
//                       <Bot className="text-white h-4 w-4" />
//                     </div>
//                   )}
                  
//                   <div
//                     className={`rounded-2xl p-4 shadow-sm max-w-md ${
//                       message.isFromAI
//                         ? 'bg-white border border-slate-200 rounded-tl-none'
//                         : 'bg-primary text-white rounded-tr-none'
//                     }`}
//                   >
//                     <p className={message.isFromAI ? 'text-slate-800' : 'text-white'}>
//                       {message.content}
//                     </p>
//                     <span
//                       className={`text-xs mt-2 block ${
//                         message.isFromAI ? 'text-slate-500' : 'text-indigo-200'
//                       }`}
//                     >
//                       {formatTime(message.timestamp)}
//                     </span>
//                   </div>

//                   {!message.isFromAI && (
//                     <div className="w-8 h-8 bg-slate-300 rounded-full flex items-center justify-center flex-shrink-0">
//                       <span className="text-slate-600 text-xs font-medium">U</span>
//                     </div>
//                   )}
//                 </motion.div>
//               ))}

//               {/* Crisis Detection Alert */}
//               {messages.some((m) => m.isEscalation) && (
//                 <motion.div
//                   initial={{ opacity: 0, scale: 0.95 }}
//                   animate={{ opacity: 1, scale: 1 }}
//                   className="bg-amber-50 border border-amber-200 rounded-xl p-4"
//                 >
//                   <div className="flex items-center space-x-2 mb-2">
//                     <AlertTriangle className="h-5 w-5 text-amber-600" />
//                     <span className="font-medium text-amber-800">We’re Here for You</span>
//                   </div>
//                   <p className="text-sm text-amber-700 mb-3">
//                     It sounds like you might need extra support. Would you like to connect with a human therapist for more personalized help?
//                   </p>
//                   <Link href="/therapists">
//                     <Button
//                       size="sm"
//                       className="bg-amber-600 text-white hover:bg-amber-700"
//                     >
//                       Talk to a Therapist
//                     </Button>
//                   </Link>
//                 </motion.div>
//               )}

//               {isTyping && (
//                 <motion.div
//                   initial={{ opacity: 0 }}
//                   animate={{ opacity: 1 }}
//                   className="flex items-start space-x-3"
//                 >
//                   <div className="w-8 h-8 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center flex-shrink-0">
//                     <Bot className="text-white h-4 w-4" />
//                   </div>
//                   <div className="bg-white border border-slate-200 rounded-2xl rounded-tl-none p-4 shadow-sm">
//                     <div className="flex space-x-1">
//                       <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce"></div>
//                       <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
//                       <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
//                     </div>
//                   </div>
//                 </motion.div>
//               )}

//               <div ref={messagesEndRef} />
//             </div>

//             {/* Chat Input */}
//             <div className="flex space-x-3">
//               <Input
//                 value={input}
//                 onChange={(e) => setInput(e.target.value)}
//                 onKeyPress={handleKeyPress}
//                 placeholder="Share what’s on your mind..."
//                 className="flex-1 bg-white border border-slate-300 focus:ring-2 focus:ring-primary focus:border-transparent"
//                 disabled={isTyping}
//               />
//               <Button
//                 onClick={sendMessage}
//                 disabled={!input.trim() || isTyping}
//                 className="px-6"
//               >
//                 <Send className="h-4 w-4" />
//               </Button>
//             </div>
//           </CardContent>
//         </Card>
//       </div>
//     </div>
//   );
// };

// export default AIChat;



import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Card, CardContent } from '../components/ui/card';
import { useAuth } from '../hooks/use-auth';
import { useToast } from '../hooks/use-toast';
import { formatTime } from '../lib/utils';
import { Send, Bot, AlertTriangle } from 'lucide-react';
import { Link } from 'wouter';
import { fetchTherapistAdvice } from '../lib/aiTherapist';
import type { Message } from '../lib/aiTherapist';

interface Therapist {
  id: string;
  name: string;
  specialty: string;
  description: string;
  avatar: string;
  personality: string;
  greeting: string;
}

const AIChat: React.FC = () => {
  const { isAuthenticated } = useAuth();
  const { toast } = useToast();
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedTherapist, setSelectedTherapist] = useState<Therapist | null>(null);
  const [showCategories, setShowCategories] = useState(false);
  const [showTherapists, setShowTherapists] = useState(true);
  const [showFirstAid, setShowFirstAid] = useState(false);
  const [language, setLanguage] = useState<string>('en');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  if (isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <Card className="w-full max-w-md mx-4">
          <CardContent className="pt-6 text-center">
            <Bot className="h-12 w-12 text-primary mx-auto mb-4" />
            <h1 className="text-2xl font-bold text-slate-900 mb-2">
              Welcome to Checkmate AI
            </h1>
            <p className="text-slate-600 mb-6">
              Sign in to chat with your friendly AI therapy companion—we’re here to listen!
            </p>
            <Link href="/">
              <Button className="w-full">
                Sign In to Start Chatting
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  const aiTherapists: Therapist[] = [
    {
      id: 'lisa',
      name: 'Dr. Lisa Chen',
      specialty: 'Cognitive Behavioral Therapy',
      description: 'Warm and empathetic, great for anxiety and depression',
      avatar: '👩‍⚕️',
      personality: 'gentle',
      greeting: "Hi, I'm Dr. Lisa Chen! I'm here to create a safe space for you to share. What's on your mind?"
    },
    {
      id: 'marcus',
      name: 'Dr. Marcus Williams',
      specialty: 'Trauma & PTSD',
      description: 'Direct but caring, expert in trauma recovery',
      avatar: '👨‍⚕️',
      personality: 'direct',
      greeting: "Hi, I'm Dr. Marcus Williams. I'm here to help you through tough times. What's going on?"
    },
    {
      id: 'sarah',
      name: 'Dr. Sarah Rodriguez',
      specialty: 'Mindfulness & Stress',
      description: 'Calming and kind, loves mindfulness techniques',
      avatar: '🧘‍♀️',
      personality: 'calm',
      greeting: "Hi, I'm Dr. Sarah Rodriguez. Let's find some calm together. What's weighing on you?"
    },
    {
      id: 'james',
      name: 'Dr. James Thompson',
      specialty: 'Life Transitions',
      description: 'Practical and supportive for life’s big changes',
      avatar: '🧑‍💼',
      personality: 'practical',
      greeting: "Hi, I'm Dr. James Thompson. Ready to navigate life’s changes together? What's up?"
    },
    {
      id: 'nina',
      name: 'Dr. Nina Patel',
      specialty: 'Youth & Academic Stress',
      description: 'Fun and encouraging, perfect for students',
      avatar: '👩‍🎓',
      personality: 'encouraging',
      greeting: "Hi, I'm Dr. Nina Patel! I'm here to cheer you on through school stress. What's on your mind?"
    }
  ];

  const therapyCategories = [
    {
      id: 'heartbreak',
      title: 'Heartbreak & Relationships',
      description: 'Navigating breakups, relationship struggles, or emotional healing',
      icon: '💔',
      color: 'bg-pink-50 border-pink-200 hover:bg-pink-100'
    },
    {
      id: 'job',
      title: 'Job & Career Stress',
      description: 'Dealing with work stress, career changes, or workplace challenges',
      icon: '💼',
      color: 'bg-blue-50 border-blue-200 hover:bg-blue-100'
    },
    {
      id: 'grief',
      title: 'Grief & Loss',
      description: 'Processing loss, grief, or major life changes',
      icon: '🕊️',
      color: 'bg-purple-50 border-purple-200 hover:bg-purple-100'
    },
    {
      id: 'depression',
      title: 'Depression & Low Mood',
      description: 'Feeling sad, hopeless, or unmotivated',
      icon: '🌧️',
      color: 'bg-gray-50 border-gray-200 hover:bg-gray-100'
    },
    {
      id: 'exam',
      title: 'Academic & Exam Stress',
      description: 'Managing test anxiety, academic pressure, or study stress',
      icon: '📚',
      color: 'bg-green-50 border-green-200 hover:bg-green-100'
    },
    {
      id: 'anxiety',
      title: 'Anxiety & Panic',
      description: 'Handling worry, panic attacks, or general anxiety',
      icon: '😰',
      color: 'bg-yellow-50 border-yellow-200 hover:bg-yellow-100'
    },
    {
      id: 'family',
      title: 'Family & Social Issues',
      description: 'Working through family conflicts or social stress',
      icon: '👨‍👩‍👧‍👦',
      color: 'bg-orange-50 border-orange-200 hover:bg-orange-100'
    },
    {
      id: 'general',
      title: 'General Support',
      description: 'Just want to talk about what’s on your mind',
      icon: '💭',
      color: 'bg-indigo-50 border-indigo-200 hover:bg-indigo-100'
    }
  ];

  const handleTherapistSelect = (therapist: Therapist) => {
    setSelectedTherapist(therapist);
    setShowTherapists(false);
    setShowCategories(true);
    
    const greetingMessage: Message = {
      id: Date.now().toString(),
      content: therapist.greeting,
      isFromAI: true,
      timestamp: new Date(),
    };

    setMessages([greetingMessage]);
  };

  const handleFirstAidSelect = async () => {
    setShowFirstAid(true);
    setShowTherapists(false);
    setShowCategories(false);
    setSelectedTherapist(null);
    
    const firstAidMessage: Message = {
      id: Date.now().toString(),
      content: `Hi, I'm your Crisis Support AI. If you're feeling unsafe, please call 911, text HOME to 741741, or reach out to 988 right away. What's going on?`,
      isFromAI: true,
      timestamp: new Date(),
      isEscalation: true,
    };

    setMessages([firstAidMessage]);
  };

  const handleCategorySelect = async (category: typeof therapyCategories[0]) => {
    setSelectedCategory(category.id);
    setShowCategories(false);
    
    const userMessage: Message = {
      id: Date.now().toString(),
      content: `I'd like to talk about ${category.title.toLowerCase()}. ${category.description}`,
      isFromAI: false,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setIsTyping(true);

    const aiMessage = await fetchTherapistAdvice(
      userMessage.content,
      language,
      selectedTherapist,
      category.id,
      [...messages, userMessage]
    );

    setMessages((prev) => [...prev, aiMessage]);
    setIsTyping(false);

    if (aiMessage.isEscalation) {
      toast({
        title: 'We’re Here for You',
        description: 'It sounds like you’re going through a lot. Consider switching to Crisis Support AI for extra help.',
        variant: 'destructive',
      });
    }
  };

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: input,
      isFromAI: false,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);
    setShowCategories(false);

    const aiMessage = await fetchTherapistAdvice(
      input,
      language,
      selectedTherapist,
      selectedCategory,
      [...messages, userMessage]
    );

    setMessages((prev) => [...prev, aiMessage]);
    setIsTyping(false);

    if (aiMessage.isEscalation && !showFirstAid) {
      toast({
        title: 'We’re Here for You',
        description: 'It sounds like you’re going through a lot. Consider switching to Crisis Support AI for extra help.',
        variant: 'destructive',
      });
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-3xl font-bold text-slate-900 mb-4">
            Welcome to Checkmate AI
          </h1>
          <p className="text-lg text-slate-600">
            Your friendly companion for mental health support, here for you 24/7
          </p>
          <label className="flex items-center justify-center space-x-2 mt-4">
            <span className="text-sm font-medium">Language:</span>
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="border rounded-lg px-2 py-1 bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="en">English</option>
              <option value="es">Spanish</option>
              <option value="fr">French</option>
              <option value="de">German</option>
              <option value="zh">Chinese</option>
              <option value="sw">Kiswahili (Swahili)</option>
              <option value="ar">Arabic</option>
              <option value="ja">Japanese</option>
              <option value="ru">Russian</option>
            </select>
          </label>
        </motion.div>

        <Card className="shadow-lg border-slate-200">
          <CardContent className="p-6">
            {/* Chat Header */}
            <div className="flex items-center justify-between pb-4 border-b border-slate-200 mb-6">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center">
                  {selectedTherapist ? (
                    <span className="text-lg">{selectedTherapist.avatar}</span>
                  ) : showFirstAid ? (
                    <span className="text-lg">🚨</span>
                  ) : (
                    <Bot className="text-white h-5 w-5" />
                  )}
                </div>
                <div>
                  <h4 className="font-semibold text-slate-900">
                    {selectedTherapist 
                      ? selectedTherapist.name 
                      : showFirstAid 
                      ? 'Crisis Support AI'
                      : 'AI Therapy Chat'
                    }
                  </h4>
                  <p className="text-sm text-green-600">
                    {selectedTherapist 
                      ? selectedTherapist.specialty
                      : showFirstAid 
                      ? 'Here for Urgent Support'
                      : 'Online • Pick Your Companion'
                    }
                  </p>
                </div>
              </div>
              {(selectedTherapist || showFirstAid) && (
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => {
                    setShowTherapists(true);
                    setShowCategories(false);
                    setShowFirstAid(false);
                    setSelectedTherapist(null);
                    setMessages([]);
                  }}
                >
                  Choose Another Companion
                </Button>
              )}
            </div>

            {/* Therapist Selection */}
            {showTherapists && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-6"
              >
                <div className="text-center mb-6">
                  <h3 className="text-xl font-semibold text-slate-900 mb-2">
                    Pick Your AI Companion
                  </h3>
                  <p className="text-slate-600 mb-4">
                    Choose someone who feels right for you—we’re all here to listen
                  </p>
                  
                  {/* First Aid Option */}
                  <motion.button
                    onClick={handleFirstAidSelect}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full p-4 mb-4 bg-red-50 border-2 border-red-200 hover:bg-red-100 rounded-xl text-left transition-all"
                  >
                    <div className="flex items-center space-x-3">
                      <span className="text-2xl">🚨</span>
                      <div>
                        <h4 className="font-semibold text-red-900">Crisis Support</h4>
                        <p className="text-sm text-red-700">
                          Immediate help for urgent mental health needs
                        </p>
                      </div>
                    </div>
                  </motion.button>
                </div>

                <div className="grid gap-4">
                  {aiTherapists.map((therapist) => (
                    <motion.button
                      key={therapist.id}
                      onClick={() => handleTherapistSelect(therapist)}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="p-4 bg-white border-2 border-slate-200 hover:border-primary/50 hover:bg-slate-50 rounded-xl text-left transition-all"
                    >
                      <div className="flex items-center space-x-4">
                        <span className="text-3xl">{therapist.avatar}</span>
                        <div className="flex-1">
                          <h4 className="font-semibold text-slate-900 mb-1">
                            {therapist.name}
                          </h4>
                          <p className="text-sm font-medium text-primary mb-1">
                            {therapist.specialty}
                          </p>
                          <p className="text-sm text-slate-600">
                            {therapist.description}
                          </p>
                        </div>
                      </div>
                    </motion.button>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Therapy Categories */}
            {showCategories && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-6"
              >
                <h3 className="text-lg font-semibold text-slate-900 mb-4">
                  What’s on your mind today?
                </h3>
                <div className="grid grid-cols-2 gap-3 mb-4">
                  {therapyCategories.map((category) => (
                    <motion.button
                      key={category.id}
                      onClick={() => handleCategorySelect(category)}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className={`p-4 rounded-xl border-2 text-left transition-all ${category.color}`}
                    >
                      <div className="flex items-center space-x-3 mb-2">
                        <span className="text-2xl">{category.icon}</span>
                        <h4 className="font-medium text-slate-900 text-sm">
                          {category.title}
                        </h4>
                      </div>
                      <p className="text-xs text-slate-600 leading-relaxed">
                        {category.description}
                      </p>
                    </motion.button>
                  ))}
                </div>
                <div className="text-center">
                  <p className="text-sm text-slate-500 mb-3">
                    Or just type whatever’s in your heart below
                  </p>
                </div>
              </motion.div>
            )}

            {/* Messages */}
            <div className="space-y-4 mb-6 max-h-96 overflow-y-auto">
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex items-start space-x-3 ${
                    message.isFromAI ? '' : 'justify-end'
                  }`}
                >
                  {message.isFromAI && (
                    <div className="w-8 h-8 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center flex-shrink-0">
                      <Bot className="text-white h-4 w-4" />
                    </div>
                  )}
                  
                  <div
                    className={`rounded-2xl p-4 shadow-sm max-w-md ${
                      message.isFromAI
                        ? 'bg-white border border-slate-200 rounded-tl-none'
                        : 'bg-primary text-white rounded-tr-none'
                    }`}
                  >
                    <p className={message.isFromAI ? 'text-slate-800' : 'text-white'}>
                      {message.content}
                    </p>
                    <span
                      className={`text-xs mt-2 block ${
                        message.isFromAI ? 'text-slate-500' : 'text-indigo-200'
                      }`}
                    >
                      {formatTime(message.timestamp)}
                    </span>
                  </div>

                  {!message.isFromAI && (
                    <div className="w-8 h-8 bg-slate-300 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-slate-600 text-xs font-medium">U</span>
                    </div>
                  )}
                </motion.div>
              ))}

              {/* Crisis Detection Alert */}
              {messages.some((m) => m.isEscalation) && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-amber-50 border border-amber-200 rounded-xl p-4"
                >
                  <div className="flex items-center space-x-2 mb-2">
                    <AlertTriangle className="h-5 w-5 text-amber-600" />
                    <span className="font-medium text-amber-800">We’re Here for You</span>
                  </div>
                  <p className="text-sm text-amber-700 mb-3">
                    It sounds like you might need extra support. Would you like to connect with a human therapist for more personalized help?
                  </p>
                  <Link href="/therapists">
                    <Button
                      size="sm"
                      className="bg-amber-600 text-white hover:bg-amber-700"
                    >
                      Talk to a Therapist
                    </Button>
                  </Link>
                </motion.div>
              )}

              {isTyping && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex items-start space-x-3"
                >
                  <div className="w-8 h-8 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center flex-shrink-0">
                    <Bot className="text-white h-4 w-4" />
                  </div>
                  <div className="bg-white border border-slate-200 rounded-2xl rounded-tl-none p-4 shadow-sm">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                      <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    </div>
                  </div>
                </motion.div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Chat Input */}
            <div className="flex space-x-3">
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Share what’s on your mind..."
                className="flex-1 bg-white border border-slate-300 focus:ring-2 focus:ring-primary focus:border-transparent"
                disabled={isTyping}
              />
              <Button
                onClick={sendMessage}
                disabled={!input.trim() || isTyping}
                className="px-6"
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AIChat;

