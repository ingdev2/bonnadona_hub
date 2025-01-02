import { createSlice } from "@reduxjs/toolkit";

const initialState: IApplication = {
  id: 0,
  name: "",
  image_path: "",
  entry_link: "",
  application_module: [],
  is_active: true,
  errors: [],
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
    setImagePathApplication: (state, action) => {
      state.image_path = action.payload;
    },
    setEntryLinkApplication: (state, action) => {
      state.entry_link = action.payload;
    },
    setModuleApplication: (state, action) => {
      state.application_module = action.payload;
    },
    setIsActiveApplication: (state, action) => {
      state.is_active = action.payload;
    },
    setErrorsModuleApplication: (state, action) => {
      state.errors = action.payload;
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
  setImagePathApplication,
  setEntryLinkApplication,
  setModuleApplication,
  setIsActiveApplication,
  setErrorsModuleApplication,
  setResetApplication,
} = applicationSlice.actions;

export default applicationSlice.reducer;
