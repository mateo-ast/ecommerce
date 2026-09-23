(function () {
  const form = document.querySelector('#register-form');

  if (!form) return;

  const name = form.elements.namedItem('name');
  const lastName = form.elements.namedItem('lastName');
  const email = form.elements.namedItem('email');
  const password = form.elements.namedItem('password');
  const confirmPassword = form.elements.namedItem('confirmPassword');
  const prohibitedStrings = ['password', '1234', 'qwerty', 'ecommerce'];
  const specialCharacterPattern = /[!@#$%^&*(),.?":{}|<>]/;

  const setError = (field, message) => {
    field.setCustomValidity(message);
  };

  const validate = () => {
    const passwordValue = password.value;
    const normalizedPassword = passwordValue.toLocaleLowerCase();
    const userValues = [name.value, lastName.value, email.value.split('@')[0]]
      .map((value) => value.trim().toLocaleLowerCase())
      .filter(Boolean);

    [name, lastName, email, password, confirmPassword].forEach((field) => field.setCustomValidity(''));

    if (!name.value.trim() || name.value.trim() !== name.value) {
      setError(name, 'Ingresá un nombre sin espacios al principio ni al final.');
    } else if (!lastName.value.trim() || lastName.value.trim() !== lastName.value) {
      setError(lastName, 'Ingresá un apellido sin espacios al principio ni al final.');
    } else if (email.value.trim() !== email.value) {
      setError(email, 'El email no puede comenzar ni terminar con espacios.');
    } else if (passwordValue.trim() !== passwordValue || confirmPassword.value.trim() !== confirmPassword.value) {
      setError(password, 'La contraseña no puede comenzar ni terminar con espacios.');
    } else if (passwordValue.length < 8) {
      setError(password, 'La contraseña debe tener al menos 8 caracteres.');
    } else if (!/[A-Za-z]/.test(passwordValue)) {
      setError(password, 'La contraseña debe incluir al menos una letra.');
    } else if (!/\d/.test(passwordValue)) {
      setError(password, 'La contraseña debe incluir al menos un número.');
    } else if (!specialCharacterPattern.test(passwordValue)) {
      setError(password, 'La contraseña debe incluir un carácter especial.');
    } else if (prohibitedStrings.some((value) => normalizedPassword.includes(value))) {
      setError(password, 'La contraseña contiene una cadena no permitida.');
    } else if (userValues.some((value) => normalizedPassword.includes(value))) {
      setError(password, 'La contraseña no puede contener datos del usuario.');
    } else if (normalizedPassword === email.value.trim().toLocaleLowerCase()) {
      setError(password, 'La contraseña no puede ser igual al email.');
    } else if (passwordValue !== confirmPassword.value) {
      setError(confirmPassword, 'Las contraseñas no coinciden.');
    }
  };

  [name, lastName, email, password, confirmPassword].forEach((field) => {
    field.addEventListener('input', validate);
  });

  form.addEventListener('submit', (event) => {
    validate();
    if (!form.checkValidity()) {
      event.preventDefault();
      form.reportValidity();
    }
  });
})();