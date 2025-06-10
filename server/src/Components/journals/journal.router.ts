import { Hono } from 'hono';
import { createJournalHandler, getJournalHandler, updateJournalHandler, deleteJournalHandler, getAllJournalsHandler } from './journal.controller';
import { adminRoleAuth, userRoleAuth, userOrAdminRoleAuth } from '../../middleware/jwt';

const journalRouter = new Hono();

journalRouter
  .post('/', userRoleAuth, createJournalHandler)
  .get('/all', userOrAdminRoleAuth, getAllJournalsHandler)
  .get('/:id', userOrAdminRoleAuth, getJournalHandler)
  .put('/:id', userRoleAuth, updateJournalHandler)
  .delete('/:id', userOrAdminRoleAuth, deleteJournalHandler)
  

export  {journalRouter};