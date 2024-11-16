import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { persistReducer } from "redux-persist";
import storage from "./storage/storage";

import userReducer from "./features/user/userSlice";
import modalReducer from "./features/common/modal/modalSlice";
import userLoginReducer from "./features/login/userLoginSlice";
import adminLoginReducer from "./features/login/adminLoginSlice";
import passwordPolicyReducer from "./features/password_policy/passwordPolicySlice";

import { userApi } from "./apis/users/userApi";
import { loginUserApi } from "./apis/auth/loginUsersApi";
import { idTypesApi } from "./apis/id_types/idTypesApi";
import { loginAdminApi } from "./apis/auth/loginAdminApi";
import { passwordPolicyApi } from "./apis/password_policy/passwordPolicyApi";

const persistConfig = {
  key: "root",
  version: 1,
  storage,
  whitelist: ["user", "modal", "userLogin", "adminLogin", "passwordPolicy"],
  blacklist: [],
};

const rootReducer = combineReducers({
  user: userReducer,
  userLogin: userLoginReducer,
  adminLogin: adminLoginReducer,
  modal: modalReducer,
  passwordPolicy: passwordPolicyReducer,

  [userApi.reducerPath]: userApi.reducer,
  [loginUserApi.reducerPath]: loginUserApi.reducer,
  [loginAdminApi.reducerPath]: loginAdminApi.reducer,
  [idTypesApi.reducerPath]: idTypesApi.reducer,
  [passwordPolicyApi.reducerPath]: passwordPolicyApi.reducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
      immutableCheck: false,
    }).concat([
      userApi.middleware,
      loginUserApi.middleware,
      loginAdminApi.middleware,
      idTypesApi.middleware,
      passwordPolicyApi.middleware,
    ]),
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
