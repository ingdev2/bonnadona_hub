import { ItemKeys } from "@/components/common/custom_dashboard_layout_admins/enums/item_names_and_keys.enums";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isPageLoading: false,
  passwordResetToken: "",
  userModalIsOpen: false,
  adminModalIsOpen: false,
  firstSuccessLoginModalIsOpen: false,
  changePasswordExpiryModalIsOpen: false,
  selectedKey: ItemKeys.SUB_ALL_REQUESTS_REQ_KEY,
  selectedOpenKeys: [""],
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
    setSelectedKey: (state, action) => {
      state.selectedKey = action.payload;
    },
    setSelectedOpenKeys: (state, action) => {
      state.selectedOpenKeys = action.payload;
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
    setResetModalAdmin: (state) => {
      state.selectedKey = ItemKeys.SUB_ALL_REQUESTS_REQ_KEY;
      state.selectedOpenKeys = [""];
    },
  },
});

export const {
  setIsPageLoading,
  setPasswordResetToken,
  setSelectedKey,
  setSelectedOpenKeys,
  setResetModalAdmin,
  setUserModalIsOpen,
  setAdminModalIsOpen,
  setFirstLoginModalIsOpen,
  setChangePasswordExpiryModalIsOpen,
} = modalSlice.actions;

export default modalSlice.reducer;
