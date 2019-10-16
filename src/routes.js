import { Router } from 'express';

import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';

import { storeSchema, updateSchema } from './app/validators/User';
import loginSchema from './app/validators/Session';

import authMiddleware from './app/middlewares/auth';

const routes = new Router();

routes.get('/', (req, res) => {
  return res.json({ message: 'Servidor no ar!' });
});

routes.post('/login', loginSchema, SessionController.store);

routes.use(authMiddleware);

routes.get('/users/:page?', UserController.index);
routes.get('/users/:id', UserController.show);
routes.post('/users', storeSchema, UserController.store);
routes.put('/users/:id', updateSchema, UserController.update);
routes.delete('/users/:id', UserController.delete);

export default routes;
