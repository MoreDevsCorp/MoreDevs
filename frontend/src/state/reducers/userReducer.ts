import { AnyAction } from "redux";
import { USER_LOGIN_REQUEST, USER_LOGOUT } from "../constantes/userConstants";

export const userLoginReducer = (
  state = { userInfo: {} },
  action: AnyAction
) => {
  switch (action.type) {
    case USER_LOGIN_REQUEST:
      localStorage.setItem("MOREDEVS_USER", JSON.stringify(action.payload));
      return { ...state, userInfo: action.payload };
    case USER_LOGOUT:
      localStorage.removeItem("MOREDEVS_USER");
      return {};

    default:
      return state;
  }
};
