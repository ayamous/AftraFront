import { LOGIN, LOGOUT, SET_USER } from "./actionTypes";

export const login = (token, hold) => {
  if (hold) localStorage.setItem("token", token);
  return {
    type: LOGIN,
    token
  };
};

export const logout = () => ({
  type: LOGOUT,
  payload: null
});

export const setUser = (payload) => {
  const {
    firstName, lastName, name, role, email
  } = payload;
  return {
    type: SET_USER,
    payload: {
      firstName,
      lastName,
      name: name || `${firstName} ${lastName}`,
      role,
      email
    }
  };
};
