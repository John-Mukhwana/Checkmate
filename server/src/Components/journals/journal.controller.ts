import { Context } from 'hono';
import { createJournal, getJournalById, updateJournal, deleteJournal, getJournalsByUserId } from './journal.service';

export async function createJournalHandler(c: Context) {
  try {
    const data = await c.req.json();
    const user = c.get('user');
    console.log('createJournalHandler: User:', { userId: user?.userId, role: user?.role });
    if (!user || user.role !== 'user') {
      return c.json({ error: 'Unauthorized: User role required' }, 401);
    }

    const journalData = { ...data, userId: user.userId };
    const journal = await createJournal(journalData);
    return c.json(journal, 201);
  } catch (error: any) {
    console.error('createJournalHandler error:', error.message);
    return c.json({ error: error.message }, 400);
  }
}

export async function getJournalHandler(c: Context) {
  try {
    const id = c.req.param('id');
    const user = c.get('user');
    console.log('getJournalHandler: User:', { userId: user?.userId, role: user?.role }, 'Requested journal:', id);
    if (!user || !['user', 'admin'].includes(user.role)) {
      return c.json({ error: 'Unauthorized: User or admin role required' }, 401);
    }

    const journal = await getJournalById(id);
    if (!journal) {
      return c.json({ error: 'Journal not found' }, 404);
    }
    if (user.role === 'user' && journal.userId !== user.userId) {
      return c.json({ error: 'Unauthorized: Cannot access another user\'s journal' }, 403);
    }
    return c.json(journal);
  } catch (error: any) {
    console.error('getJournalHandler error:', error.message);
    return c.json({ error: error.message }, 400);
  }
}

export async function updateJournalHandler(c: Context) {
  try {
    const id = c.req.param('id');
    const user = c.get('user');
    console.log('updateJournalHandler: User:', { userId: user?.userId, role: user?.role }, 'Journal:', id);
    if (!user || user.role !== 'user') {
      return c.json({ error: 'Unauthorized: User role required' }, 401);
    }

    const data = await c.req.json();
    const journal = await updateJournal(id, user.userId, data);
    if (!journal) {
      return c.json({ error: 'Journal not found or unauthorized' }, 404);
    }
    return c.json(journal);
  } catch (error: any) {
    console.error('updateJournalHandler error:', error.message);
    return c.json({ error: error.message }, 400);
  }
}

export async function deleteJournalHandler(c: Context) {
  try {
    const id = c.req.param('id');
    const user = c.get('user');
    console.log('deleteJournalHandler: User:', { userId: user?.userId, role: user?.role }, 'Journal:', id);
    if (!user || !['user', 'admin'].includes(user.role)) {
      return c.json({ error: 'Unauthorized: User or admin role required' }, 401);
    }

    const journal = await getJournalById(id);
    if (!journal) {
      return c.json({ error: 'Journal not found' }, 404);
    }
    if (user.role === 'user' && journal.userId !== user.userId) {
      return c.json({ error: 'Unauthorized: Cannot delete another user\'s journal' }, 403);
    }

    await deleteJournal(id, user.role === 'admin' ? journal.userId : user.userId);
    return c.json({ message: 'Journal deleted' });
  } catch (error: any) {
    console.error('deleteJournalHandler error:', error.message);
    return c.json({ error: error.message }, 400);
  }
}

export async function getAllJournalsHandler(c: Context) {
  try {
    const user = c.get('user');
    console.log('getAllJournalsHandler: User:', { userId: user?.userId, role: user?.role });
    if (!user || !['user', 'admin'].includes(user.role)) {
      return c.json({ error: 'Unauthorized: User or admin role required' }, 401);
    }

    const journals = await getJournalsByUserId(user.role === 'admin' ? c.req.query('userId') || user.userId : user.userId);
    console.log('getAllJournalsHandler: Found:', journals.length, 'journals');
    return c.json(journals, 200);
  } catch (error: any) {
    console.error('getAllJournalsHandler error:', error.message);
    return c.json({ error: error.message }, 500);
  }
}