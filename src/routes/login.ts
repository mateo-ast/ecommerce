import { Router } from 'express';

const loginRouter = Router();

loginRouter.get('/', (_req, res) => {
	res.render('pages/login', {
		title: 'Iniciar sesión',
		auth: {
			brand: 'Ecommerce',
			heading: 'Iniciar sesión',
			headingId: 'login-title',
			intro: 'Ingresá tus datos para continuar.',
			action: '/login',
			submitLabel: 'Iniciar Sesión',
			usernameId: 'login-username',
			passwordId: 'login-password',
			backHref: '/',
			backLabel: 'Volver al inicio',
		},
	});
});

loginRouter.post('/', (_req, res) => {
	res.redirect('/');
});

// Futuro: conectar esta ruta cuando se implemente el registro de usuarios.
// loginRouter.get('/register', (_req, res) => {
// 	res.render('pages/register', { title: 'Crear cuenta' });
// });

export { loginRouter };
/* ### **Escenarios**

- Dado que la persona usuaria debe identificarse para usar la tienda y aún no ha iniciado sesión,
cuando llega a la página de login, debe poder ingresar su usuario y su contraseña en un formulario
y luego hacer click en un botón con el texto ‘Iniciar Sesión’ y ser redirigida a la página de inicio.

// Futuro: cuando exista registro, la persona usuaria podrá dirigirse a /register
// si todavía no posee credenciales.

### **Validación**

- La página tiene un input de texto para ingresar nombre de usuario.
- La página tiene un input de tipo contraseña para ingresar la contraseña.
- La página tiene un botón para iniciar el proceso de inicio de sesión.
// Futuro: agregar un enlace hacia la página de registro.
- La página tiene un enlace para dirigir la navegación hacia la página de inicio.
- Se hace uso correcto de las etiquetas HTML y las opciones de accesibilidad.
- Se respetan las buenas prácticas de usabilidad.*/

