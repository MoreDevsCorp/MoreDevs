import { AnyAction } from "redux";
import { USER_LOGIN_REQUEST, USER_LOGOUT } from "../constantes/userConstants";
import { State } from "../types";

export const userLoginReducer = (state: State, action: AnyAction) => {
  switch (action.type) {
    case USER_LOGIN_REQUEST:
      localStorage.setItem("MOREDEVS_USER", JSON.stringify(action.payload));
      return { ...state, userInfo: action.payload };
    case USER_LOGOUT:
      localStorage.removeItem("MOREDEVS_USER");

      return { ...state };

    default:
      return { ...state };
  }
};
