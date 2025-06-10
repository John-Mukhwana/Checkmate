import { connectDB } from '../../config/db';
import { ObjectId, WithId, OptionalId } from 'mongodb';

interface QuizQuestion {
  question: string;
  options: string[];
}

interface Lesson {
  _id?: ObjectId;
  title: string;
  content: string;
  videoUrl?: string;
  quiz: QuizQuestion[];
  completed: boolean;
  userId: string;
  createdAt: Date;
}

export async function createLesson(data: Partial<Lesson>): Promise<WithId<Lesson>> {
  if (!data.title || !data.content || !data.quiz || !data.userId) {
    throw new Error('Missing required fields: title, content, quiz, userId');
  }
  if (!data.quiz.every(q => q.question && q.options && q.options.length > 0)) {
    throw new Error('Invalid quiz format: each question must have a question and non-empty options');
  }

  const db = await connectDB();
  const lessonsCollection = db.collection('lessons');

  const lesson: OptionalId<Lesson> = {
    title: data.title,
    content: data.content,
    videoUrl: data.videoUrl,
    quiz: data.quiz,
    completed: data.completed ?? false,
    userId: data.userId,
    createdAt: new Date(),
  };

  const result = await lessonsCollection.insertOne(lesson);
  console.log('createLesson: Created lesson for userId:', data.userId, 'with _id:', result.insertedId);
  return { ...lesson, _id: result.insertedId };
}

export async function getLessonById(id: string, userId: string): Promise<WithId<Lesson> | null> {
  const db = await connectDB();
  let lesson: WithId<Lesson> | null = null;
  try {
    lesson = await db.collection<Lesson>('lessons').findOne({ _id: new ObjectId(id), userId });
  } catch (error) {
    console.log('getLessonById: Invalid ObjectId:', id);
  }
  console.log('getLessonById: Result for _id:', id, 'userId:', userId, lesson ? 'Found' : 'Not found');
  return lesson;
}

export async function getLessonsByUserId(userId: string): Promise<WithId<Lesson>[]> {
  const db = await connectDB();
  const lessons = await db.collection<Lesson>('lessons').find({ userId }).toArray();
  console.log('getLessonsByUserId: Fetched:', lessons.length, 'lessons for userId:', userId);
  return lessons;
}

export async function updateLesson(id: string, userId: string, data: Partial<Lesson>): Promise<WithId<Lesson> | null> {
  const db = await connectDB();
  const updateData: Partial<Lesson> = { ...data };
  delete updateData.userId;
  delete updateData.createdAt;
  delete updateData._id;

  if (updateData.quiz && !updateData.quiz.every(q => q.question && q.options && q.options.length > 0)) {
    throw new Error('Invalid quiz format: each question must have a question and non-empty options');
  }

  let result: WithId<Lesson> | null = null;
  try {
    result = await db.collection<Lesson>('lessons').findOneAndUpdate(
      { _id: new ObjectId(id), userId },
      { $set: { ...updateData, updatedAt: new Date() } },
      { returnDocument: 'after' }
    );
  } catch (error) {
    console.log('updateLesson: Invalid ObjectId:', id);
  }
  console.log('updateLesson: Updated lesson _id:', id, 'for userId:', userId, result ? 'Success' : 'Not found');
  return result;
}

export async function deleteLesson(id: string, userId: string): Promise<void> {
  const db = await connectDB();
  let result;
  try {
    result = await db.collection('lessons').deleteOne({ _id: new ObjectId(id), userId });
  } catch (error) {
    console.log('deleteLesson: Invalid ObjectId:', id);
    throw new Error('Invalid lesson ID');
  }
  if (result.deletedCount === 0) {
    console.log('deleteLesson: Lesson not found for _id:', id, 'userId:', userId);
    throw new Error('Lesson not found or unauthorized');
  }
  console.log('deleteLesson: Deleted lesson _id:', id, 'for userId:', userId);
}

export async function markLessonCompleted(id: string, userId: string): Promise<WithId<Lesson> | null> {
  const db = await connectDB();
  let result: WithId<Lesson> | null = null;
  try {
    result = await db.collection<Lesson>('lessons').findOneAndUpdate(
      { _id: new ObjectId(id), userId },
      { $set: { completed: true, updatedAt: new Date() } },
      { returnDocument: 'after' }
    );
  } catch (error) {
    console.log('markLessonCompleted: Invalid ObjectId:', id);
  }
  console.log('markLessonCompleted: Updated lesson _id:', id, 'for userId:', userId, result ? 'Success' : 'Not found');
  return result;
}