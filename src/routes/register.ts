import { Router, Request, Response } from 'express';

const router = Router();

router.get('/register', (_req: Request, res: Response) => {
  res.render('pages/register', { title: 'Registro', layout: 'layouts/register' });
});

export { router as registerRouter };
