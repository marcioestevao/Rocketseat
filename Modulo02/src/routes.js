import { Router } from 'express';
import multer from 'multer';
import multerConfig from './config/multer';

import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';
import FileController from './app/controllers/FileController';

import authMiddlewares from './app/middlewares/auth';

const routes = new Router();
const upload = multer(multerConfig);

routes.post('/users', UserController.store);
routes.post('/sessions', SessionController.store);

// Pode-se atribuir os middlewares apenas a rota como abaixo
// routes.put('/users', authMiddlewares, UserController.update);

// Ou pode-se fazer assim que atribui o mesmo apenas às rotas que tiverem abaixo dele
// Middleware global
routes.use(authMiddlewares);

routes.put('/users', UserController.update);

routes.post('/files', upload.single('file'), FileController.store);

export default routes;
