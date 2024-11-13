import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isPageLoading: false,
  passwordResetToken: "",
  collaboratorModalIsOpen: false,
  adminModalIsOpen: false,
  firstSuccessLoginModalIsOpen: false,
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
    setAdminModalIsOpen: (state, action) => {
      state.adminModalIsOpen = action.payload;
    },
    setFirstLoginModalIsOpen: (state, action) => {
      state.firstSuccessLoginModalIsOpen = action.payload;
    },
  },
});

export const {
  setIsPageLoading,
  setPasswordResetToken,
  setCollaboratorModalIsOpen,
  setAdminModalIsOpen,
  setFirstLoginModalIsOpen,
} = modalSlice.actions;

export default modalSlice.reducer;
