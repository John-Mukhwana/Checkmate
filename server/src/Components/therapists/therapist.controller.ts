// import { Context } from 'hono';
// import { createTherapist, getTherapistById, updateTherapist, deleteTherapist, getAllTherapists } from './therapist.service';

// export async function createTherapistHandler(c: Context) {
//   try {
//     const data = await c.req.json();
//     const therapist = await createTherapist(data);
//     return c.json(therapist, 201);
//   } catch (error: any) {
//     return c.json({ error: error.message }, 400);
//   }
// }

// export async function getTherapistHandler(c: Context) {
//   try {
//     const userId = c.req.param('userId');
//     const therapist = await getTherapistById(userId);
//     if (!therapist) return c.json({ error: 'Therapist not found' }, 404);
//     return c.json(therapist);
//   } catch (error: any) {
//     return c.json({ error: error.message }, 400);
//   }
// }

// export async function updateTherapistHandler(c: Context) {
//   try {
//     const userId = c.get('userId');
//     const data = await c.req.json();
//     const therapist = await updateTherapist(userId, data);
//     if (!therapist) return c.json({ error: 'Therapist not found' }, 404);
//     return c.json(therapist);
//   } catch (error: any) {
//     return c.json({ error: error.message }, 400);
//   }
// }

// export async function deleteTherapistHandler(c: Context) {
//   try {
//     const userId = c.get('userId');
//     await deleteTherapist(userId);
//     return c.json({ message: 'Therapist deleted' });
//   } catch (error: any) {
//     return c.json({ error: error.message }, 400);
//   }
// }

// export async function getAllTherapistsHandler(c: Context) {
//   try {
//     const therapists = await getAllTherapists();
//     return c.json(therapists);
//   } catch (error: any) {
//     return c.json({ error: error.message }, 400);
//   }
// }

import { Context } from 'hono';
import { createTherapist, getTherapistById, updateTherapist, deleteTherapist, getAllTherapists } from './therapist.service';

export async function createTherapistHandler(c: Context) {
  try {
    const data = await c.req.json();
    const user = c.get('user');
    console.log('CreateTherapist: User:', { userId: user?.userId, role: user?.role });
    if (!user || user.role !== 'admin') {
      return c.json({ error: 'Unauthorized: Admin role required' }, 401);
    }

    const therapist = await createTherapist(data);
    return c.json(therapist, 201);
  } catch (error: any) {
    console.error('Create therapist error:', error.message);
    return c.json({ error: error.message }, 400);
  }
}

export async function getTherapistHandler(c: Context) {
  try {
    const userId = c.req.param('userId');
    const user = c.get('user');
    console.log('GetTherapist: User:', { userId: user?.userId, role: user?.role }, 'Requested therapist:', userId);
    const therapist = await getTherapistById(userId);
    if (!therapist) {
      console.log('GetTherapist: Therapist not found for userId:', userId);
      return c.json({ error: 'Therapist not found' }, 404);
    }
    return c.json(therapist);
  } catch (error: any) {
    console.error('Get therapist error:', error.message);
    return c.json({ error: error.message }, 400);
  }
}

export async function updateTherapistHandler(c: Context) {
  try {
    const userId = c.get('userId');
    const user = c.get('user');
    console.log('UpdateTherapist: User:', { userId: user?.userId, role: user?.role });
    if (!user || (user.role !== 'therapist' && user.role !== 'admin')) {
      return c.json({ error: 'Unauthorized: Invalid role' }, 401);
    }

    const data = await c.req.json();
    const therapist = await updateTherapist(userId, data);
    if (!therapist) return c.json({ error: 'Therapist not found' }, 404);
    return c.json(therapist);
  } catch (error: any) {
    console.error('Update therapist error:', error.message);
    return c.json({ error: error.message }, 400);
  }
}

export async function deleteTherapistHandler(c: Context) {
  try {
    const userId = c.get('userId');
    const user = c.get('user');
    console.log('DeleteTherapist: User:', { userId: user?.userId, role: user?.role });
    if (!user || (user.role !== 'therapist' && user.role !== 'admin')) {
      return c.json({ error: 'Unauthorized: Invalid role' }, 401);
    }

    await deleteTherapist(userId);
    return c.json({ message: 'Therapist deleted' });
  } catch (error: any) {
    console.error('Delete therapist error:', error.message);
    return c.json({ error: error.message }, 400);
  }
}

export async function getAllTherapistsHandler(c: Context) {
  try {
    const therapists = await getAllTherapists();
    console.log('GetAllTherapists: Found:', therapists.length, 'therapists');
    return c.json(therapists || [], 200);
  } catch (error: any) {
    console.error('Get all therapists error:', error.message);
    return c.json({ error: 'Server error' }, 500);
  }
}