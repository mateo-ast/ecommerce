import { Router } from 'express';
import { getRegister, postRegister } from '../controllers/registerController';

const registerRouter = Router();

registerRouter.get('/', getRegister);

registerRouter.post('/', postRegister);

export { registerRouter };
