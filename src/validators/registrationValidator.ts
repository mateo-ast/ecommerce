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
const minimumNameLength = 2;

const hasOuterWhitespace = (value: string) => value.trim() !== value;

const getUserValues = (data: RegistrationData): string[] =>
  [data.name, data.lastName, data.email.split('@')[0]]
    .map((value) => value.trim().toLocaleLowerCase())
    .filter(Boolean);

const validateRequiredFields = (data: RegistrationData): string | null => {
  if (
    !data.name.trim() ||
    !data.lastName.trim() ||
    !data.email.trim() ||
    !data.password
  ) {
    return 'Nombre, apellido, email y contraseña son obligatorios.';
  }

  return null;
};

const validateOuterWhitespace = (data: RegistrationData): string | null => {
  if (
    [
      data.name,
      data.lastName,
      data.email,
      data.password,
      data.confirmPassword,
    ].some(hasOuterWhitespace)
  ) {
    return 'Los campos no pueden comenzar ni terminar con espacios.';
  }

  return null;
};

const validateNameLength = (name: string, label: string): string | null => {
  if (name.trim().length < minimumNameLength) {
    return `El ${label} debe tener al menos ${minimumNameLength} caracteres.`;
  }

  return null;
};

const validateEmail = (email: string): string | null => {
  if (!emailPattern.test(email)) {
    return 'Ingresá un email válido.';
  }

  return null;
};

const validatePasswordLength = (password: string): string | null => {
  if (password.length < 8) {
    return 'La contraseña debe tener al menos 8 caracteres.';
  }

  return null;
};

const validatePasswordHasLetter = (password: string): string | null => {
  if (!/[A-Za-z]/.test(password)) {
    return 'La contraseña debe incluir al menos una letra.';
  }

  return null;
};

const validatePasswordHasNumber = (password: string): string | null => {
  if (!/\d/.test(password)) {
    return 'La contraseña debe incluir al menos un número.';
  }

  return null;
};

const validatePasswordHasSpecialCharacter = (
  password: string,
): string | null => {
  if (!specialCharacterPattern.test(password)) {
    return 'La contraseña debe incluir un carácter especial.';
  }

  return null;
};

const validateProhibitedPasswordStrings = (password: string): string | null => {
  const normalizedPassword = password.toLocaleLowerCase();

  if (prohibitedStrings.some((value) => normalizedPassword.includes(value))) {
    return 'La contraseña contiene una cadena no permitida.';
  }

  return null;
};

const validateUserDataInPassword = (
  password: string,
  userValues: string[],
): string | null => {
  const normalizedPassword = password.toLocaleLowerCase();

  if (userValues.some((value) => value && normalizedPassword.includes(value))) {
    return 'La contraseña no puede contener datos del usuario.';
  }

  return null;
};

const validatePasswordEmailMatch = (
  password: string,
  email: string,
): string | null => {
  if (password.toLocaleLowerCase() === email.trim().toLocaleLowerCase()) {
    return 'La contraseña no puede ser igual al email.';
  }

  return null;
};

const validatePasswordConfirmation = (
  password: string,
  confirmPassword: string,
): string | null => {
  if (password !== confirmPassword) {
    return 'Las contraseñas no coinciden.';
  }

  return null;
};

export const validateRegistration = (data: RegistrationData): string[] => {
  const userValues = getUserValues(data);
  const errors = [
    validateRequiredFields(data),
    validateOuterWhitespace(data),
    validateNameLength(data.name, 'nombre'),
    validateNameLength(data.lastName, 'apellido'),
    validateEmail(data.email),
    validatePasswordLength(data.password),
    validatePasswordHasLetter(data.password),
    validatePasswordHasNumber(data.password),
    validatePasswordHasSpecialCharacter(data.password),
    validateProhibitedPasswordStrings(data.password),
    validateUserDataInPassword(data.password, userValues),
    validatePasswordEmailMatch(data.password, data.email),
    validatePasswordConfirmation(data.password, data.confirmPassword),
  ];

  return errors.filter((error): error is string => error !== null);
};
