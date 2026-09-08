import { userRepo } from "@/repository/userRepository";

const EMAIL_REGEX =
  /^[a-zA-Z0-9]+(?:[._%+-][a-zA-Z0-9]+)*@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*\.[a-zA-Z]{2,}$/;

export const sanitizeNameInput = (val: string): string =>
  val.replace(/[^a-zA-Z.\s]/g, "").slice(0, 25);

export const validateFirstName = (val: string): string | null => {
  const trimmed = val.trim();
  if (!trimmed) return "Please enter first name";
  if (trimmed.length < 3) return "First name must be at least 3 characters";
  return null;
};

export const validateLastName = (val: string): string | null => {
  const trimmed = val.trim();
  return trimmed.length > 0 && trimmed.length < 3
    ? "Last name must be at least 3 characters"
    : null;
};

export const isValidEmail = (val: string): boolean =>
  EMAIL_REGEX.test(val.trim());

export const validateEmail = (val: string): string | null => {
  const trimmed = val.trim();
  if (!trimmed) return "Please enter email address";
  if (!isValidEmail(trimmed)) return "Please enter valid email address";
  return null;
};

export const validateUsernameFrontend = (val: string): string | null => {
  const trimmed = val.trim().toLowerCase();
  if (!trimmed) return "Please enter username";
  if (!/^[a-zA-Z]/.test(trimmed))
    return "Your username must begin with a letter (a–z).";
  if (trimmed.length < 3) return "Username must be at least 3 characters";
  if (trimmed.length > 30) return "Username cannot exceed 30 characters";
  if (!/^[a-zA-Z0-9_]+$/.test(trimmed))
    return "Usernames can only contain letters, numbers, and underscores. No spaces or special symbols.";
  return null;
};

export const isUsernameTakenInFirebase = async (
  username: string,
  currentUid?: string,
): Promise<boolean> => {
  const clean = username.trim().toLowerCase();
  return !clean ? false : userRepo.isUsernameTaken(clean, currentUid);
};

export const isValidPasswordComplexity = (val: string): boolean =>
  val.length >= 8 &&
  /[A-Z]/.test(val) &&
  /[a-z]/.test(val) &&
  /[0-9]/.test(val) &&
  /[^a-zA-Z0-9]/.test(val);

export const validatePassword = (val: string): string | null => {
  if (!val) return "Please enter password";
  if (!isValidPasswordComplexity(val))
    return "New password must be at least 8 characters long and include an uppercase letter, a lowercase letter, a digit, and a special character.";
  return null;
};

export const validateConfirmPassword = (
  pass: string,
  confirmPass: string,
): string | null => {
  if (!confirmPass) return "Please confirm password";
  if (pass !== confirmPass)
    return "New password and confirm new password do not match";
  return null;
};

