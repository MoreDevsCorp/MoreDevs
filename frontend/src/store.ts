import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { userLoginReducer } from "./state/reducers/userReducer";
import { State } from "./state/types";
import { User } from "./types";

export type RootState = ReturnType<typeof store.getState>;

const reducer = combineReducers({
  userLogin: userLoginReducer,
});

const userInfoFromStorage: User = localStorage.getItem("MOREDEVS_USER")
  ? JSON.parse(localStorage.getItem("MOREDEVS_USER") || "")
  : null;

const inititalState: { userLogin: State } = {
  userLogin: { userInfo: userInfoFromStorage },
};

const middleware = [thunk];

const store = createStore(
  reducer,
  inititalState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
