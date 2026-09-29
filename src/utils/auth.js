
import { jwtDecode } from "jwt-decode";

export const getToken = () => {
  return localStorage.getItem("token");
};

export const getUserFromToken = () => {
  const token = getToken();

  if (!token) {
    return null;
  }

  try {
    return jwtDecode(token);
  } catch (error) {
    return null;
  }
};

export const getRoleFromToken = () => {
    const user = getUserFromToken();
    return user ? user.role : null;
}
