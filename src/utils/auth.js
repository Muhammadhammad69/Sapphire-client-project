// import jwt from "jsonwebtoken";


// export function getTokenData(){
//     const get_token = localStorage.getItem('token');
//     const decodedToken = get_token ? jwt.verify(get_token, "my_super_secret_key_is_7485") : null;
//   // console.log("isLoggedIn:", localStorage.getItem('token')); // Debugging line
//   // console.log("decodedToken:", decodedToken); // Debugging line
//     return decodedToken;
// }


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
