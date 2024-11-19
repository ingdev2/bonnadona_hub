import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isPageLoading: false,
  passwordResetToken: "",
  userModalIsOpen: false,
  adminModalIsOpen: false,
  firstSuccessLoginModalIsOpen: false,
  changePasswordExpiryModalIsOpen: false,
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
    setUserModalIsOpen: (state, action) => {
      state.userModalIsOpen = action.payload;
    },
    setAdminModalIsOpen: (state, action) => {
      state.adminModalIsOpen = action.payload;
    },
    setFirstLoginModalIsOpen: (state, action) => {
      state.firstSuccessLoginModalIsOpen = action.payload;
    },
    setChangePasswordExpiryModalIsOpen: (state, action) => {
      state.changePasswordExpiryModalIsOpen = action.payload;
    },
  },
});

export const {
  setIsPageLoading,
  setPasswordResetToken,
  setUserModalIsOpen,
  setAdminModalIsOpen,
  setFirstLoginModalIsOpen,
  setChangePasswordExpiryModalIsOpen,
} = modalSlice.actions;

export default modalSlice.reducer;
