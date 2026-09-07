import { Router } from 'express';
import { homeController } from '../controllers/homeController';
import { loginRouter } from './login';

const router = Router();

router.get('/', homeController);
router.use(loginRouter);

export { router };
