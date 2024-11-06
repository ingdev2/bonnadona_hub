import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isPageLoading: false,
  passwordResetToken: "",
  collaboratorModalIsOpen: false
};

export const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    setIsPageLoading: (state, action) => {
      state.isPageLoading = action.payload;
    },
    setPasswordResetToken: (state, action) => {
      state.passwordResetToken = action.payload;
    },
    setCollaboratorModalIsOpen: (state, action) => {
      state.collaboratorModalIsOpen = action.payload;
    },
  },
});

export const {
  setIsPageLoading,
  setPasswordResetToken,
  setCollaboratorModalIsOpen,
} = modalSlice.actions;

export default modalSlice.reducer;
