import { createSlice } from "@reduxjs/toolkit";

const initialState: IPermission = {
  id: 0,
  name: "",
  description: "",
  applications: [],
  application_modules: [],
  module_actions: [],
  errors: [],
};

export const permissionSlice = createSlice({
  name: "permission",
  initialState,
  reducers: {
    setIdPermission: (state, action) => {
      state.id = action.payload;
    },
    setNamePermission: (state, action) => {
      state.name = action.payload;
    },
    setDescriptionPermission: (state, action) => {
      state.description = action.payload;
    },
    setApplicationsPermission: (state, action) => {
      state.applications = action.payload;
    },
    setApplicationModulesPermission: (state, action) => {
      state.application_modules = action.payload;
    },
    setModuleActionsPermission: (state, action) => {
      state.module_actions = action.payload;
    },
    setErrorsPermission: (state, action) => {
      state.errors = action.payload;
    },
    setResetPermission: (state) => {
      state.id = 0;
      state.name = "";
      state.description = "";
      state.applications = [];
      state.application_modules = [];
      state.module_actions = [];
      state.errors = [];
    },
  },
});

export const {
  setIdPermission,
  setNamePermission,
  setDescriptionPermission,
  setApplicationsPermission,
  setApplicationModulesPermission,
  setModuleActionsPermission,
  setErrorsPermission,
  setResetPermission,
} = permissionSlice.actions;

export default permissionSlice.reducer;
