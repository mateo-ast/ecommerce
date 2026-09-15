import { Router } from 'express';

const registerRouter = Router();

registerRouter.get('/register', (_req, res) => {
    res.render('pages/register', {
        title: 'Crear cuenta',
        auth: {
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
        },
    });
});

registerRouter.post('/register', (_req, res) => {
    res.redirect('/');
});

export { registerRouter };

