export interface RegistrationData {
  name: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const specialCharacterPattern = /[!@#$%^&*(),.?":{}|<>]/;
const prohibitedStrings = ['password', '1234', 'qwerty', 'ecommerce'];

const hasOuterWhitespace = (value: string) => value.trim() !== value;

export const validateRegistration = (data: RegistrationData): string[] => {
  const errors: string[] = [];
  const normalizedPassword = data.password.toLocaleLowerCase();
  const userValues = [data.name, data.lastName, data.email.split('@')[0]]
    .map((value) => value.trim().toLocaleLowerCase())
    .filter(Boolean);

  if (!data.name.trim() || !data.lastName.trim() || !data.email.trim() || !data.password) {
    errors.push('Nombre, apellido, email y contraseña son obligatorios.');
  }

  if ([data.name, data.lastName, data.email, data.password, data.confirmPassword].some(hasOuterWhitespace)) {
    errors.push('Los campos no pueden comenzar ni terminar con espacios.');
  }

  if (!emailPattern.test(data.email)) {
    errors.push('Ingresá un email válido.');
  }

  if (data.password.length < 8) {
    errors.push('La contraseña debe tener al menos 8 caracteres.');
  }

  if (!/[A-Za-z]/.test(data.password)) {
    errors.push('La contraseña debe incluir al menos una letra.');
  }

  if (!/\d/.test(data.password)) {
    errors.push('La contraseña debe incluir al menos un número.');
  }

  if (!specialCharacterPattern.test(data.password)) {
    errors.push('La contraseña debe incluir al menos un carácter especial.');
  }

  if (prohibitedStrings.some((value) => normalizedPassword.includes(value))) {
    errors.push('La contraseña contiene una cadena no permitida.');
  }

  if (userValues.some((value) => value && normalizedPassword.includes(value))) {
    errors.push('La contraseña no puede contener datos del usuario.');
  }

  if (data.password.toLocaleLowerCase() === data.email.trim().toLocaleLowerCase()) {
    errors.push('La contraseña no puede ser igual al email.');
  }

  if (data.password !== data.confirmPassword) {
    errors.push('Las contraseñas no coinciden.');
  }

  return errors;
};