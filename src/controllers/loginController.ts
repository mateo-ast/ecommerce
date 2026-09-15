import { Request, Response } from 'express';

export const getLogin = async (_req: Request, res: Response) => {
  res.render('pages/login', {
    title: 'Iniciar sesión',
    brand: 'Ecommerce',
    heading: 'Iniciar sesión',
    headingId: 'login-title',
    intro: 'Ingresá tus datos para continuar.',
    action: '/login',
    submitLabel: 'Iniciar Sesión',
    usernameLabel: 'Nombre de usuario',
    usernameId: 'login-username',
    passwordId: 'login-password',
    backHref: '/',
    backLabel: 'Volver al inicio',
  });
};

export const postLogin = async (_req: Request, res: Response) => {
  res.redirect('/');
};
