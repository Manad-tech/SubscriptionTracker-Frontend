export const ADMIN_EMAIL = "joshimanad81@gmail.com";

export const isAdmin = (email?: string | null) => {
  if (!email) return false;
  return email === ADMIN_EMAIL;
};