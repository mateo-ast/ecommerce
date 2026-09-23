import { Request, Response } from 'express';
import { RegistrationData, validateRegistration } from '../validators/registrationValidator';

const registerViewData = {
  title: 'Crear cuenta',
  brand: 'Ecommerce',
  heading: 'Crear cuenta',
  headingId: 'register-title',
  intro: 'Ingresá tus datos para continuar.',
  action: '/register',
  submitLabel: 'Registrarse',
  nameId: 'register-name',
  lastNameId: 'register-last-name',
  usernameLabel: 'Email',
  usernameId: 'register-username',
  passwordId: 'register-password',
  confirmPasswordId: 'register-confirm-password',
  registration: true,
  secondaryHref: '/login',
  secondaryLabel: 'Ya tengo una cuenta',
};

export const getRegister = async (_req: Request, res: Response) => {
  res.render('pages/register', { ...registerViewData, errors: [], values: {} });
};

export const postRegister = async (req: Request, res: Response) => {
  const values: RegistrationData = {
    name: String(req.body.name ?? ''),
    lastName: String(req.body.lastName ?? ''),
    email: String(req.body.email ?? ''),
    password: String(req.body.password ?? ''),
    confirmPassword: String(req.body.confirmPassword ?? ''),
  };
  const errors = validateRegistration(values);

  if (errors.length) {
    return res.status(400).render('pages/register', {
      ...registerViewData,
      errors,
      values,
    });
  }

  res.redirect('/');
};
