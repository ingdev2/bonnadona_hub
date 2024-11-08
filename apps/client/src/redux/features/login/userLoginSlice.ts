import { createSlice } from "@reduxjs/toolkit";

const initialState: UserLogin = {
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

export const userLoginSlice = createSlice({
  name: "userLogin",
  initialState,
  reducers: {
    setIdLoginUser: (state, action) => {
      state.id = action.payload;
    },
    setIdTypeLoginUser: (state, action) => {
      state.user_id_type = action.payload;
    },
    setIdNumberLoginUser: (state, action) => {
      state.id_number = action.payload;
    },
    setPrincipalEmailLoginUser: (state, action) => {
      state.principal_email = action.payload;
    },
    setPasswordLoginUser: (state, action) => {
      state.password = action.payload;
    },
    setVerificationCodeLoginUser: (state, action) => {
      state.verification_code = action.payload;
    },
    setIdTypeOptionsLoginUser: (state, action) => {
      state.idTypeOptions = action.payload;
    },
    setErrorsLoginUser: (state, action) => {
      state.errors = action.payload;
    },
    resetLoginStateUser: (state) => {
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
  setIdLoginUser,
  setIdTypeLoginUser,
  setIdNumberLoginUser,
  setPrincipalEmailLoginUser,
  setPasswordLoginUser,
  setVerificationCodeLoginUser,
  setErrorsLoginUser,
  setIdTypeOptionsLoginUser,
  resetLoginStateUser,
} = userLoginSlice.actions;

export default userLoginSlice.reducer;
