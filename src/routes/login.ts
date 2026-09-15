import { Router } from 'express';
import { getLogin, postLogin } from '../controllers/loginController';

const loginRouter = Router();

loginRouter.get('/', getLogin);

loginRouter.post('/', postLogin);

export { loginRouter };
