import { Hono } from 'hono';
import { createTherapistHandler, getTherapistHandler, updateTherapistHandler, deleteTherapistHandler, getAllTherapistsHandler } from './therapist.controller';
import { adminRoleAuth, therapistOrAdminRoleAuth, userOrAdminRoleAuth } from '../../middleware/jwt';

const therapistRouter = new Hono();

therapistRouter.post('/', adminRoleAuth, createTherapistHandler);
therapistRouter.get('/all',userOrAdminRoleAuth, getAllTherapistsHandler);
therapistRouter.get('/:userId', userOrAdminRoleAuth, getTherapistHandler);
therapistRouter.put('/', therapistOrAdminRoleAuth, updateTherapistHandler);
therapistRouter.delete('/', therapistOrAdminRoleAuth, deleteTherapistHandler);


export { therapistRouter };