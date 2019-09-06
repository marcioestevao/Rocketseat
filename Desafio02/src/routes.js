import { Router } from 'express';

import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';

import authMiddlewares from './app/middlewares/auth';

const routes = new Router();

routes.post('/users', UserController.store);
routes.post('/sessions', SessionController.store);

// Pode-se atribuir os middlewares apenas a rota como abaixo
// routes.put('/users', authMiddlewares, UserController.update);

// Ou pode-se fazer assim que atribui o mesmo apenas às rotas que tiverem abaixo dele
// Middleware global
routes.use(authMiddlewares);
routes.put('/users', UserController.update);

export default routes;
