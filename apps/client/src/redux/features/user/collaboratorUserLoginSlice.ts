import { createSlice } from "@reduxjs/toolkit";

const initialState: UserLogin = {
  id: "",
  user_id_type: 0,
  id_number: 0,
  principal_email: "",
  password: "",
  verification_code: 0,
  idTypeOptions: [],
  errors: [],
};

export const collaboratorUserLoginSlice = createSlice({
  name: "collaboratorUserLogin",
  initialState,
  reducers: {
    setIdLoginCollaborator: (state, action) => {
      state.id = action.payload;
    },
    setIdTypeLoginCollaborator: ((state, action) => {
      state.user_id_type = action.payload;
    }),
    setIdNumberLoginCollaborator: (state, action) => {
      state.id_number = action.payload;
    },
    setPrincipalEmailLoginCollaborator: (state, action) => {
      state.principal_email = action.payload;
    },
    setPasswordLoginCollaborator: (state, action) => {
      state.password = action.payload;
    },
    setVerificationCodeLoginCollaborator: (state, action) => {
      state.verification_code = action.payload;
    },
    setIdTypeOptionsLoginCollaborator: (state, action) => {
      state.idTypeOptions = action.payload;
    },
    setErrorsLoginCollaborator: (state, action) => {
      state.errors = action.payload;
    },
    resetLoginStateCollaborator: (state) => {
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
  setIdLoginCollaborator,
  setIdTypeLoginCollaborator,
  setIdNumberLoginCollaborator,
  setPrincipalEmailLoginCollaborator,
  setPasswordLoginCollaborator,
  setVerificationCodeLoginCollaborator,
  setErrorsLoginCollaborator,
  setIdTypeOptionsLoginCollaborator,
  resetLoginStateCollaborator,
} = collaboratorUserLoginSlice.actions;

export default collaboratorUserLoginSlice.reducer;
