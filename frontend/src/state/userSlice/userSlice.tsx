import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { User } from "../../types";
import { RootState } from "../../store";

export interface UserSliceState {
  userInfo: User;
}

const userInfoFromStorage: User = localStorage.getItem("MOREDEVS_USER")
  ? JSON.parse(localStorage.getItem("MOREDEVS_USER") || "")
  : null;

const initialState: UserSliceState = {
  userInfo: userInfoFromStorage,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    userLogin: (state, action: PayloadAction<User>) => {
      localStorage.setItem("MOREDEVS_USER", JSON.stringify(action.payload));
      return { ...state, userInfo: action.payload };
    },
    userLogout: (state) => {
      localStorage.removeItem("MOREDEVS_USER");

      return { ...state };
    },
  },
});

// Action creators are generated for each case reducer function
export const { userLogin, userLogout } = userSlice.actions;

//selectors
export const selectUser = (state: RootState) => state.user.userInfo;

export default userSlice.reducer;
