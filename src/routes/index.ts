import { Router } from 'express';
import { homeController } from '../controllers/homeController';
import { registerRouter } from './register';

const router = Router();

router.get('/', homeController);

router.use('/', registerRouter);

export { router };
