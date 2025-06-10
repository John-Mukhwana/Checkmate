import { Hono } from 'hono';
import { createLessonHandler, getLessonHandler, updateLessonHandler, deleteLessonHandler, getAllLessonsHandler, markLessonCompletedHandler } from './learning.controller';
import { adminRoleAuth, userRoleAuth, userOrAdminRoleAuth } from '../../middleware/jwt';

const learningRouter = new Hono();

learningRouter
  .post('/', adminRoleAuth, createLessonHandler)
  .get('/all', userOrAdminRoleAuth, getAllLessonsHandler)
  .get('/:id', userOrAdminRoleAuth, getLessonHandler)
  .put('/:id', adminRoleAuth, updateLessonHandler)
  .delete('/:id', adminRoleAuth, deleteLessonHandler)
  .put('/:id/complete', userRoleAuth, markLessonCompletedHandler);

export default learningRouter;