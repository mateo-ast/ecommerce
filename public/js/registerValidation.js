const prohibitedStrings = ['password', '1234', 'qwerty', 'ecommerce'];
const specialCharacterPattern = /[!@#$%^&*(),.?":{}|<>]/;
const minimumNameLength = 2;

function setError(field, message) {
  field.setCustomValidity(message);
}

function validateRequired(field, message) {
  if (!field.value.trim()) {
    setError(field, message);
    return false;
  }

  return true;
}

function validateName(field, label) {
  if (!validateRequired(field, `Ingresá un ${label}.`)) return false;
  if (field.value.trim() !== field.value) {
    setError(field, `El ${label} no puede comenzar ni terminar con espacios.`);
    return false;
  }
  if (field.value.trim().length < minimumNameLength) {
    setError(field, `El ${label} debe tener al menos ${minimumNameLength} caracteres.`);
    return false;
  }

  return true;
}

function validateEmail(field) {
  if (!validateRequired(field, 'Ingresá un email.')) return false;
  if (field.value.trim() !== field.value) {
    setError(field, 'El email no puede comenzar ni terminar con espacios.');
    return false;
  }

  return true;
}

function validatePasswordWhitespace(password, confirmPassword) {
  if (password.value.trim() !== password.value || confirmPassword.value.trim() !== confirmPassword.value) {
    setError(password, 'La contraseña no puede comenzar ni terminar con espacios.');
    return false;
  }

  return true;
}

function validatePasswordLength(password) {
  if (password.value.length < 8) {
    setError(password, 'La contraseña debe tener al menos 8 caracteres.');
    return false;
  }

  return true;
}

function validatePasswordHasLetter(password) {
  if (!/[A-Za-z]/.test(password.value)) {
    setError(password, 'La contraseña debe incluir al menos una letra.');
    return false;
  }

  return true;
}

function validatePasswordHasNumber(password) {
  if (!/\d/.test(password.value)) {
    setError(password, 'La contraseña debe incluir al menos un número.');
    return false;
  }

  return true;
}

function validatePasswordHasSpecialCharacter(password) {
  if (!specialCharacterPattern.test(password.value)) {
    setError(password, 'La contraseña debe incluir un carácter especial.');
    return false;
  }

  return true;
}

function validateProhibitedPasswordStrings(password) {
  const normalizedPassword = password.value.toLocaleLowerCase();

  if (prohibitedStrings.some((value) => normalizedPassword.includes(value))) {
    setError(password, 'La contraseña contiene una cadena no permitida.');
    return false;
  }

  return true;
}

function validateUserDataInPassword(password, userValues) {
  const normalizedPassword = password.value.toLocaleLowerCase();

  if (userValues.some((value) => normalizedPassword.includes(value))) {
    setError(password, 'La contraseña no puede contener datos del usuario.');
    return false;
  }

  return true;
}

function validatePasswordEmailMatch(password, email) {
  const normalizedPassword = password.value.toLocaleLowerCase();

  if (normalizedPassword === email.value.trim().toLocaleLowerCase()) {
    setError(password, 'La contraseña no puede ser igual al email.');
    return false;
  }

  return true;
}

function validatePasswordConfirmation(password, confirmPassword) {
  if (password.value !== confirmPassword.value) {
    setError(confirmPassword, 'Las contraseñas no coinciden.');
    return false;
  }

  return true;
}

function validateRegistrationForm(form) {
  const name = form.elements.namedItem('name');
  const lastName = form.elements.namedItem('lastName');
  const email = form.elements.namedItem('email');
  const password = form.elements.namedItem('password');
  const confirmPassword = form.elements.namedItem('confirmPassword');
  const fields = [name, lastName, email, password, confirmPassword];
  const userValues = [name.value, lastName.value, email.value.split('@')[0]]
    .map((value) => value.trim().toLocaleLowerCase())
    .filter(Boolean);

  fields.forEach((field) => field.setCustomValidity(''));

  validateName(name, 'nombre');
  validateName(lastName, 'apellido');
  validateEmail(email);
  validateRequired(password, 'Ingresá una contraseña.');
  validateRequired(confirmPassword, 'Confirmá la contraseña.');
  validatePasswordWhitespace(password, confirmPassword);
  validatePasswordLength(password);
  validatePasswordHasLetter(password);
  validatePasswordHasNumber(password);
  validatePasswordHasSpecialCharacter(password);
  validateProhibitedPasswordStrings(password);
  validateUserDataInPassword(password, userValues);
  validatePasswordEmailMatch(password, email);
  validatePasswordConfirmation(password, confirmPassword);
}

function handleRegistrationInput(field) {
  validateRegistrationForm(field.form);
}

function handleRegistrationSubmit(form) {
  validateRegistrationForm(form);

  if (!form.checkValidity()) {
    form.reportValidity();
    return false;
  }

  return true;
}