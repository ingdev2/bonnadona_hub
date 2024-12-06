import { createSlice } from "@reduxjs/toolkit";

const initialState: IApplication = {
  id: 0,
  name: "",
  application_module: [],
};

export const applicationSlice = createSlice({
  name: "application",
  initialState,
  reducers: {
    setIdApplication: (state, action) => {
      state.id = action.payload;
    },
    setNameApplication: (state, action) => {
      state.name = action.payload;
    },
    setModuleApplication: (state, action) => {
      state.application_module = action.payload;
    },
    setResetApplication: (state) => {
      state.id = 0;
      state.name = "";
      state.application_module = [];
    },
  },
});

export const {
  setIdApplication,
  setNameApplication,
  setModuleApplication,
  setResetApplication,
} = applicationSlice.actions;

export default applicationSlice.reducer;
