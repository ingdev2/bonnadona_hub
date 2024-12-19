import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { persistReducer } from "redux-persist";
import storage from "./storage/storage";

import userReducer from "./features/user/userSlice";
import selectedUserReducer from "./features/user/selectedUserSlice";
import userProfileReducer from "./features/user_profile/userProfileSlice";
import userLoginReducer from "./features/login/userLoginSlice";
import adminLoginReducer from "./features/login/adminLoginSlice";
import permissionReducer from "./features/permission/permissionSlice";
import applicationReducer from "./features/permission/application/applicationSlice";
import applicationModuleReducer from "./features/permission/application_module/applicationModuleSlice";
import moduleActionReducer from "./features/permission/module_action/moduleActionSlice";
import passwordPolicyReducer from "./features/password_policy/passwordPolicySlice";
import auditLogReducer from "./features/audit_log/auditLogSlice";
import modalReducer from "./features/common/modal/modalSlice";

import { userApi } from "./apis/users/userApi";
import { loginUserApi } from "./apis/auth/loginUsersApi";
import { loginAdminApi } from "./apis/auth/loginAdminApi";
import { idTypesApi } from "./apis/id_types/idTypesApi";
import { genderTypesApi } from "./apis/gender_types/genderTypesApi";
import { bloodGroupApi } from "./apis/blood_group/bloodGroupApi";
import { permissionApi } from "./apis/permission/permissionApi";
import { applicationApi } from "./apis/permission/application/applicationApi";
import { appModuleApi } from "./apis/permission/application_module/applicationModuleApi";
import { moduleActionApi } from "./apis/permission/module_action/moduleActionApi";
import { passwordPolicyApi } from "./apis/password_policy/passwordPolicyApi";
import { serviceTypesApi } from "./apis/service_types/serviceTypesApi";
import { roleApi } from "./apis/role/roleApi";
import { auditLogsApi } from "./apis/audit_logs/auditLogsApi";

const persistConfig = {
  key: "root",
  version: 1,
  storage,
  whitelist: [
    "user",
    "selectedUser",
    "userProfile",
    "userLogin",
    "adminLogin",
    "permission",
    "application",
    "applicationModule",
    "moduleAction",
    "passwordPolicy",
    "modal",
  ],
  blacklist: [],
};

const rootReducer = combineReducers({
  user: userReducer,
  selectedUser: selectedUserReducer,
  userProfile: userProfileReducer,
  userLogin: userLoginReducer,
  adminLogin: adminLoginReducer,
  permission: permissionReducer,
  application: applicationReducer,
  applicationModule: applicationModuleReducer,
  moduleAction: moduleActionReducer,
  passwordPolicy: passwordPolicyReducer,
  auditLog: auditLogReducer,
  modal: modalReducer,

  [userApi.reducerPath]: userApi.reducer,
  [loginUserApi.reducerPath]: loginUserApi.reducer,
  [loginAdminApi.reducerPath]: loginAdminApi.reducer,
  [idTypesApi.reducerPath]: idTypesApi.reducer,
  [genderTypesApi.reducerPath]: genderTypesApi.reducer,
  [bloodGroupApi.reducerPath]: bloodGroupApi.reducer,
  [permissionApi.reducerPath]: permissionApi.reducer,
  [applicationApi.reducerPath]: applicationApi.reducer,
  [appModuleApi.reducerPath]: appModuleApi.reducer,
  [moduleActionApi.reducerPath]: moduleActionApi.reducer,
  [passwordPolicyApi.reducerPath]: passwordPolicyApi.reducer,
  [serviceTypesApi.reducerPath]: serviceTypesApi.reducer,
  [roleApi.reducerPath]: roleApi.reducer,
  [auditLogsApi.reducerPath]: auditLogsApi.reducer,
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
      genderTypesApi.middleware,
      bloodGroupApi.middleware,
      permissionApi.middleware,
      applicationApi.middleware,
      appModuleApi.middleware,
      moduleActionApi.middleware,
      passwordPolicyApi.middleware,
      serviceTypesApi.middleware,
      roleApi.middleware,
      auditLogsApi.middleware,
    ]),
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
