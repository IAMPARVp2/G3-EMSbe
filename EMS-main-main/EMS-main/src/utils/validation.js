// Validation utility functions
export const validateEmail = (email) => {
  if (!email) return 'Email is required';
  const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
  if (!emailRegex.test(email)) return 'Invalid email format';
  return null;
};

export const validatePassword = (password) => {
  if (!password) return 'Password is required';
  if (password.length < 6) return 'Password must be at least 6 characters';
  return null;
};

export const validateName = (name) => {
  if (!name) return 'Name is required';
  if (name.length < 2) return 'Name must be at least 2 characters';
  return null;
};

export const validateConfirmPassword = (password, confirmPassword) => {
  if (!confirmPassword) return 'Confirm password is required';
  if (password !== confirmPassword) return 'Passwords must match';
  return null;
};

export const validateForm = (values, activeTab) => {
  const errors = {};

  // Common validations
  const emailError = validateEmail(values.email);
  if (emailError) errors.email = emailError;

  const passwordError = validatePassword(values.password);
  if (passwordError) errors.password = passwordError;

  // Sign up specific validations
  if (activeTab === 'signUp') {
    const nameError = validateName(values.name);
    if (nameError) errors.name = nameError;

    const confirmPasswordError = validateConfirmPassword(values.password, values.confirmPassword);
    if (confirmPasswordError) errors.confirmPassword = confirmPasswordError;
  }

  return errors;
};
