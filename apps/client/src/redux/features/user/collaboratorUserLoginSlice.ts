import { createSlice } from "@reduxjs/toolkit";

const initialState: UserLogin = {
  id: "",
  //   user_id_type: "",
  //   id_number: 0,
  principal_email: "",
  password: "",
  verification_code: 0,
  idTypeOptions: [],
  errors: [],
};

export const patientUserLoginSlice = createSlice({
  name: "patientUserLogin",
  initialState,
  reducers: {
    setIdLoginPatient: (state, action) => {
      state.id = action.payload;
    },
    setPrincipalEmailLoginPatient: (state, action) => {
      state.password = action.payload;
    },
    setPasswordLoginPatient: (state, action) => {
      state.password = action.payload;
    },
    setVerificationCodeLoginPatient: (state, action) => {
      state.verification_code = action.payload;
    },
    setIdTypeOptionsLoginPatient: (state, action) => {
      state.idTypeOptions = action.payload;
    },
    setErrorsLoginPatient: (state, action) => {
      state.errors = action.payload;
    },
    resetLoginStatePatient: (state) => {
      state.principal_email = initialState.principal_email;
      state.password = initialState.password;
      state.verification_code = initialState.verification_code;
      state.errors = initialState.errors;
    },
  },
});

export const {
  setIdLoginPatient,
  setPrincipalEmailLoginPatient,
  setPasswordLoginPatient,
  setVerificationCodeLoginPatient,
  setErrorsLoginPatient,
  setIdTypeOptionsLoginPatient,
  resetLoginStatePatient,
} = patientUserLoginSlice.actions;

export default patientUserLoginSlice.reducer;
