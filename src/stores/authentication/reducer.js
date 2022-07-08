/* eslint-disable */
import { LOGIN, LOGOUT, SET_USER } from "./actionTypes";

const initState = {
  isAuthenticated: localStorage.getItem("token"),
  firstName: "firsNAME",
  avatar:
    "https://i.pinimg.com/originals/5a/8b/0f/5a8b0f3c31d92f76e300f31df494be5c.jpg",
  lastName: "lastNAME",
  name: "firsNAME lastNAME",
  role: null,
  email: null
};

export default function appReducer(state = initState, action) {
  switch (action.type) {
    case LOGIN: {
      return {
        ...state,
        isAuthenticated: !!action.token
      };
    }
    case LOGOUT: {
      localStorage.removeItem("token");
      return {
        ...state,
        isAuthenticated: false,
        firstName: null,
        lastName: null,
        name: null,
        role: null,
        email: null
      };
    }
    case SET_USER: {
      return {
        ...state,
        firstName: action.payload.firstName,
        lastName: action.payload.lastName,
        name: action.payload.name,
        role: action.payload.role,
        email: action.payload.email
      };
    }
    default:
      return state;
  }
}
