import { Request, Response } from 'express';

export const getRegister = async (_req: Request, res: Response) => {
  res.render('pages/register', {
    title: 'Crear cuenta',
    brand: 'Ecommerce',
    heading: 'Crear cuenta',
    headingId: 'register-title',
    intro: 'Ingresá tus datos para continuar.',
    action: '/register',
    submitLabel: 'Registrarse',
    nameId: 'register-name',
    usernameLabel: 'Email',
    usernameId: 'register-username',
    passwordId: 'register-password',
    registration: true,
    secondaryHref: '/login',
    secondaryLabel: 'Ya tengo una cuenta',
    backHref: '/',
    backLabel: 'Volver al inicio',
  });
};

export const postRegister = async (_req: Request, res: Response) => {
  res.redirect('/');
};
