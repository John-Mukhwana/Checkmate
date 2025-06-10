import { Context } from 'hono';
import { createLesson, getLessonById, updateLesson, deleteLesson, getLessonsByUserId, markLessonCompleted } from './learning.service';

export async function createLessonHandler(c: Context) {
  try {
    const data = await c.req.json();
    const user = c.get('user');
    console.log('createLessonHandler: User:', { userId: user?.userId, role: user?.role });
    if (!user || user.role !== 'admin') {
      return c.json({ error: 'Unauthorized: Admin role required' }, 401);
    }

    const lessonData = { ...data, userId: user.userId, completed: false };
    const lesson = await createLesson(lessonData);
    return c.json(lesson, 201);
  } catch (error: any) {
    console.error('createLessonHandler error:', error.message);
    return c.json({ error: error.message }, 400);
  }
}

export async function getLessonHandler(c: Context) {
  try {
    const id = c.req.param('id');
    const user = c.get('user');
    console.log('getLessonHandler: User:', { userId: user?.userId, role: user?.role }, 'Requested lesson:', id);
    if (!user || !['user', 'admin'].includes(user.role)) {
      return c.json({ error: 'Unauthorized: User or admin role required' }, 401);
    }

    const lesson = await getLessonById(id, user.role === 'admin' ? c.req.query('userId') || user.userId : user.userId);
    if (!lesson) {
      return c.json({ error: 'Lesson not found' }, 404);
    }
    return c.json(lesson);
  } catch (error: any) {
    console.error('getLessonHandler error:', error.message);
    return c.json({ error: error.message }, 400);
  }
}

export async function updateLessonHandler(c: Context) {
  try {
    const id = c.req.param('id');
    const user = c.get('user');
    console.log('updateLessonHandler: User:', { userId: user?.userId, role: user?.role }, 'Lesson:', id);
    if (!user || user.role !== 'admin') {
      return c.json({ error: 'Unauthorized: Admin role required' }, 401);
    }

    const data = await c.req.json();
    const lesson = await updateLesson(id, user.userId, data);
    if (!lesson) {
      return c.json({ error: 'Lesson not found' }, 404);
    }
    return c.json(lesson);
  } catch (error: any) {
    console.error('updateLessonHandler error:', error.message);
    return c.json({ error: error.message }, 400);
  }
}

export async function deleteLessonHandler(c: Context) {
  try {
    const id = c.req.param('id');
    const user = c.get('user');
    console.log('deleteLessonHandler: User:', { userId: user?.userId, role: user?.role }, 'Lesson:', id);
    if (!user || user.role !== 'admin') {
      return c.json({ error: 'Unauthorized: Admin role required' }, 401);
    }

    await deleteLesson(id, user.userId);
    return c.json({ message: 'Lesson deleted' });
  } catch (error: any) {
    console.error('deleteLessonHandler error:', error.message);
    return c.json({ error: error.message }, 400);
  }
}

export async function getAllLessonsHandler(c: Context) {
  try {
    const user = c.get('user');
    console.log('getAllLessonsHandler: User:', { userId: user?.userId, role: user?.role });
    if (!user || !['user', 'admin'].includes(user.role)) {
      return c.json({ error: 'Unauthorized: User or admin role required' }, 401);
    }

    const lessons = await getLessonsByUserId(user.role === 'admin' ? c.req.query('userId') || user.userId : user.userId);
    console.log('getAllLessonsHandler: Found:', lessons.length, 'lessons');
    return c.json(lessons, 200);
  } catch (error: any) {
    console.error('getAllLessonsHandler error:', error.message);
    return c.json({ error: error.message }, 500);
  }
}

export async function markLessonCompletedHandler(c: Context) {
  try {
    const id = c.req.param('id');
    const user = c.get('user');
    console.log('markLessonCompletedHandler: User:', { userId: user?.userId, role: user?.role }, 'Lesson:', id);
    if (!user || user.role !== 'user') {
      return c.json({ error: 'Unauthorized: User role required' }, 401);
    }

    const lesson = await markLessonCompleted(id, user.userId);
    if (!lesson) {
      return c.json({ error: 'Lesson not found' }, 404);
    }
    return c.json(lesson);
  } catch (error: any) {
    console.error('markLessonCompletedHandler error:', error.message);
    return c.json({ error: error.message }, 400);
  }
}