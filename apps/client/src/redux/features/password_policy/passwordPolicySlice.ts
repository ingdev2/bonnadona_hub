import { createSlice } from "@reduxjs/toolkit";

const initialState: PasswordPolicy = {
  id: 0,
  min_length: 0,
  require_uppercase: false,
  require_lowercase: false,
  require_numbers: false,
  require_special_characters: false,
  password_expiry_days: 0,
  inactivity_days: 0,
  password_history_limit: 0,
  maximum_minutes_of_inactivity_in_application: 0,
  errors: [],
};

export const passwordPolicySlice = createSlice({
  name: "passwordPolicy",
  initialState,
  reducers: {
    setIdPasswordPolicy: (state, action) => {
      state.id = action.payload;
    },
    setMinLenghtPasswordPolicy: (state, action) => {
      state.min_length = action.payload;
    },
    setRequireUpperCasePasswordPolicy: (state, action) => {
      state.require_uppercase = action.payload;
    },
    setRequireLowerCasePasswordPolicy: (state, action) => {
      state.require_lowercase = action.payload;
    },
    setRequireNumbersPasswordPolicy: (state, action) => {
      state.require_numbers = action.payload;
    },
    setRequireSpecialCharactersPasswordPolicy: (state, action) => {
      state.require_special_characters = action.payload;
    },
    setPasswordExpiryDaysPasswordPolicy: (state, action) => {
      state.password_expiry_days = action.payload;
    },
    setInactivityDaysPasswordPolicy: (state, action) => {
      state.inactivity_days = action.payload;
    },
    setPasswordHistoryLimitPasswordPolicy: (state, action) => {
      state.password_history_limit = action.payload;
    },
    setMaximunMinutesOfInactivityInApp: (state, action) => {
      state.maximum_minutes_of_inactivity_in_application = action.payload;
    },
    setErrorsPasswordPolicy: (state, action) => {
      state.errors = action.payload;
    },
    setDefaultValuesPasswordPolicy: (state) => {
      state.id = 0;
      state.min_length = 0;
      state.require_uppercase = false;
      state.require_lowercase = false;
      state.require_numbers = false;
      state.require_special_characters = false;
      state.password_expiry_days = 0;
      state.inactivity_days = 0;
      state.password_history_limit = 0;
      state.maximum_minutes_of_inactivity_in_application = 0;
      state.errors = [];
    },
  },
});

export const {
  setIdPasswordPolicy,
  setMinLenghtPasswordPolicy,
  setRequireUpperCasePasswordPolicy,
  setRequireNumbersPasswordPolicy,
  setPasswordExpiryDaysPasswordPolicy,
  setInactivityDaysPasswordPolicy,
  setPasswordHistoryLimitPasswordPolicy,
  setMaximunMinutesOfInactivityInApp,
  setRequireSpecialCharactersPasswordPolicy,
  setRequireLowerCasePasswordPolicy,
  setErrorsPasswordPolicy,
  setDefaultValuesPasswordPolicy,
} = passwordPolicySlice.actions;

export default passwordPolicySlice.reducer;
