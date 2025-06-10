import { z } from "zod";

// User schema
export const userSchema = z.object({
  _id: z.string().optional(),
  email: z.string().email().optional(),
  wallet: z.string().optional(),
  authType: z.enum(["wallet", "google", "both"]),
  role: z.enum(["user", "therapist", "admin"]).default("user"),
  preferences: z.record(z.unknown()).default({}),
  journalCount: z.number().default(0),
  createdAt: z.date().default(() => new Date()),
});

export const insertUserSchema = userSchema.omit({
  _id: true,
  createdAt: true,
});

export type User = z.infer<typeof userSchema>;
export type InsertUser = z.infer<typeof insertUserSchema>;

// Journal schema
export const journalSchema = z.object({
  _id: z.string().optional(),
  userId: z.string(),
  type: z.enum(["text", "voice"]),
  content: z.string().optional(),
  ipfsUrl: z.string().optional(),
  transcript: z.string().optional(),
  moodScore: z.number().min(0).max(1),
  blockchainHash: z.string(),
  createdAt: z.date().default(() => new Date()),
});

export const insertJournalSchema = journalSchema.omit({
  _id: true,
  blockchainHash: true,
  createdAt: true,
});

export type Journal = z.infer<typeof journalSchema>;
export type InsertJournal = z.infer<typeof insertJournalSchema>;

// Therapist schema
export const therapistSchema = z.object({
  _id: z.string().optional(),
  name: z.string(),
  expertise: z.string(),
  verifiedHash: z.string(),
  languages: z.array(z.string()),
  credentials: z.string().optional(),
  price: z.number().optional(),
  rating: z.number().optional(),
  reviews: z.number().optional(),
  contacts: z.record(z.unknown()).default({}),
});

export const insertTherapistSchema = therapistSchema.omit({
  _id: true,
});

export type Therapist = z.infer<typeof therapistSchema>;
export type InsertTherapist = z.infer<typeof insertTherapistSchema>;

// Lesson schema
export const lessonSchema = z.object({
  _id: z.string().optional(),
  title: z.string(),
  content: z.string(),
  videoUrl: z.string().optional(),
  quiz: z.array(z.object({
    question: z.string(),
    options: z.array(z.string()),
    correctAnswer: z.number().optional(),
  })),
  completed: z.boolean().default(false),
  duration: z.string().optional(),
  category: z.string().optional(),
});

export const insertLessonSchema = lessonSchema.omit({
  _id: true,
});

export type Lesson = z.infer<typeof lessonSchema>;
export type InsertLesson = z.infer<typeof insertLessonSchema>;

// Booking schema
export const bookingSchema = z.object({
  _id: z.string().optional(),
  userId: z.string(),
  therapistId: z.string(),
  time: z.date(),
  status: z.enum(["pending", "confirmed", "cancelled", "completed"]).default("pending"),
  sessionType: z.string().optional(),
  notes: z.string().optional(),
  createdAt: z.date().default(() => new Date()),
});

export const insertBookingSchema = bookingSchema.omit({
  _id: true,
  createdAt: true,
});

export type Booking = z.infer<typeof bookingSchema>;
export type InsertBooking = z.infer<typeof insertBookingSchema>;

// Chat message schema
export const chatMessageSchema = z.object({
  id: z.string(),
  userId: z.string(),
  persona: z.enum(["calm", "professional", "friendly"]),
  message: z.string(),
  response: z.string(),
  timestamp: z.date().default(() => new Date()),
});

export type ChatMessage = z.infer<typeof chatMessageSchema>;
