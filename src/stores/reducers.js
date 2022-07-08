import { combineReducers } from "redux";
import AppReducer from "./app/reducer";
import AuthReducer from "./authentication/reducer";

export default combineReducers({
  AppReducer,
  AuthReducer
});
