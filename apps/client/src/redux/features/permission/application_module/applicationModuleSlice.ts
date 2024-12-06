import { createSlice } from "@reduxjs/toolkit";

const initialState: IApplicationModule = {
  id: 0,
  name: "",
  app_id: 0,
  module_action: [],
};

export const applicationModuleSlice = createSlice({
  name: "applicationModule",
  initialState,
  reducers: {
    setIdApplicationModule: (state, action) => {
      state.id = action.payload;
    },
    setNameApplicationModule: (state, action) => {
      state.name = action.payload;
    },
    setIdOfApplicationOfModule: (state, action) => {
      state.app_id = action.payload;
    },
    setModuleActionOfApplicationModule: (state, action) => {
      state.module_action = action.payload;
    },
    setResetApplicationModule: (state) => {
      state.id = 0;
      state.name = "";
      state.app_id = 0;
      state.module_action = [];
    },
  },
});

export const {
  setIdApplicationModule,
  setNameApplicationModule,
  setIdOfApplicationOfModule,
  setModuleActionOfApplicationModule,
  setResetApplicationModule,
} = applicationModuleSlice.actions;

export default applicationModuleSlice.reducer;
