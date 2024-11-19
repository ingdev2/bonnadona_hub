import { createSlice } from "@reduxjs/toolkit";

const initialState: AdminLogin = {
  id: "",
  name: "",
  last_name: "",
  user_id_type: 0,
  id_number: 0,
  principal_email: "",
  password: "",
  verification_code: 0,
  idTypeOptions: [],
  errors: [],
};

export const adminLoginSlice = createSlice({
  name: "adminLogin",
  initialState,
  reducers: {
    setIdLoginAdmin: (state, action) => {
      state.id = action.payload;
    },
    setIdTypeLoginAdmin: (state, action) => {
      state.user_id_type = action.payload;
    },
    setIdNumberLoginAdmin: (state, action) => {
      state.id_number = action.payload;
    },
    setPrincipalEmailLoginAdmin: (state, action) => {
      state.principal_email = action.payload;
    },
    setPasswordLoginAdmin: (state, action) => {
      state.password = action.payload;
    },
    setVerificationCodeLoginAdmin: (state, action) => {
      state.verification_code = action.payload;
    },
    setIdTypeOptionsLoginAdmin: (state, action) => {
      state.idTypeOptions = action.payload;
    },
    setErrorsLoginAdmin: (state, action) => {
      state.errors = action.payload;
    },
    resetLoginAdminState: (state) => {
      state.user_id_type = initialState.user_id_type;
      state.id_number = initialState.id_number;
      state.principal_email = initialState.principal_email;
      state.password = initialState.password;
      state.verification_code = initialState.verification_code;
      state.errors = initialState.errors;
    },
  },
});

export const {
  setIdLoginAdmin,
  setIdTypeLoginAdmin,
  setIdNumberLoginAdmin,
  setPrincipalEmailLoginAdmin,
  setPasswordLoginAdmin,
  setVerificationCodeLoginAdmin,
  setErrorsLoginAdmin,
  setIdTypeOptionsLoginAdmin,
  resetLoginAdminState,
} = adminLoginSlice.actions;

export default adminLoginSlice.reducer;
