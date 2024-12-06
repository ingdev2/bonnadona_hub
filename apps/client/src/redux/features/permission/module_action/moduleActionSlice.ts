import { createSlice } from "@reduxjs/toolkit";

const initialState: IModuleAction = {
  id: 0,
  name: "",
  app_module_id: 0,
};

export const moduleActionSlice = createSlice({
  name: "moduleAction",
  initialState,
  reducers: {
    setIdModuleAction: (state, action) => {
      state.id = action.payload;
    },
    setNameModuleAction: (state, action) => {
      state.name = action.payload;
    },
    setIdOfModuleOfAction: (state, action) => {
      state.app_module_id = action.payload;
    },
    setResetModuleAction: (state) => {
      state.id = 0;
      state.name = "";
      state.app_module_id = 0;
    },
  },
});

export const {
  setIdModuleAction,
  setNameModuleAction,
  setIdOfModuleOfAction,
  setResetModuleAction,
} = moduleActionSlice.actions;

export default moduleActionSlice.reducer;
