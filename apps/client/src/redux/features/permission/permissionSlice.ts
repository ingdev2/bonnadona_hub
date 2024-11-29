import { createSlice } from "@reduxjs/toolkit";

const initialState: IPermission = {
  id: 0,
  name: "",
  description: "",
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
    setErrorsPermission: (state, action) => {
      state.errors = action.payload;
    },
    setResetPermission: (state) => {
      state.id = 0;
      state.name = "";
      state.description = "";
      state.errors = [];
    },
  },
});

export const {
  setIdPermission,
  setNamePermission,
  setDescriptionPermission,
  setErrorsPermission,
  setResetPermission,
} = permissionSlice.actions;

export default permissionSlice.reducer;
