import { Dispatch } from "redux";
import {
  USER_LOGIN_FAIL,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
} from "../constantes/userConstants";

export const login =
  (email: string, password: string) => async (dispatch: Dispatch) => {
    try {
      dispatch({ type: USER_LOGIN_REQUEST });

      const { data } = { data: email + password };

      dispatch({ type: USER_LOGIN_SUCCESS, payload: data });
      localStorage.setItem("userInfo", JSON.stringify(data));
    } catch (error) {
      dispatch({
        type: USER_LOGIN_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };
