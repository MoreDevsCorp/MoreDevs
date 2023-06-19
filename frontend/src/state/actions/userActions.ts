import { USER_LOGIN_REQUEST, USER_LOGOUT } from "../constantes/userConstants";
import { User } from "../../types";

export const loginAction = (data: User) => {
  return { type: USER_LOGIN_REQUEST, payload: data };
};

export const singOutAction = (data: User) => {
  return { type: USER_LOGOUT, payload: data };
};
