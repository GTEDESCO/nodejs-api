import { Router } from 'express';

import controllers from './app/controllers';

import { storeSchema, updateSchema } from './app/validators/User';
import loginSchema from './app/validators/Session';

import authMiddleware from './app/middlewares/auth';

const routes = new Router();

routes.get('/', (req, res) => {
  return res.json({ message: 'Servidor no ar!' });
});

routes.post('/sessions', loginSchema, controllers.SessionController.store);

routes.use(authMiddleware);

routes.get('/users/:page?', controllers.UserController.index);
routes.get('/users/show/:id', controllers.UserController.show);
routes.post('/users', storeSchema, controllers.UserController.store);
routes.put('/users/:id', updateSchema, controllers.UserController.update);
routes.delete('/users/:id', controllers.UserController.delete);

export default routes;
