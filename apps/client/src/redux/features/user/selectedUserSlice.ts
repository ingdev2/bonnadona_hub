import { createSlice } from "@reduxjs/toolkit";

const initialState: User = {
  id: "",
  name: "",
  last_name: "",
  user_id_type: 0,
  id_number: 0,
  user_gender: 0,
  birthdate: "",
  principal_email: "",
  corporate_email: "",
  corporate_cellphone: "",
  personal_email: "",
  personal_cellphone: "",
  password: "",
  last_password_update: "",
  residence_department: "",
  residence_city: "",
  residence_address: "",
  residence_neighborhood: "",
  is_active: true,
  createdAt: "",
  updateAt: "",
  deletedAt: "",
  errors: [],
};

export const selectedUserSlice = createSlice({
  name: "selectedUser",
  initialState,
  reducers: {
    setIdSelectedUser: (state, action) => {
      state.id = action.payload;
    },
    setNameSelectedUser: (state, action) => {
      state.name = action.payload;
    },
    setLastNameSelectedUser: (state, action) => {
      state.last_name = action.payload;
    },
    setIdTypeSelectedUser: (state, action) => {
      state.user_id_type = action.payload;
    },
    setIdNumberSelectedUser: (state, action) => {
      state.id_number = action.payload;
    },
    setGenderSelectedUser: (state, action) => {
      state.user_gender = action.payload;
    },
    setBirthdateSelectedUser: (state, action) => {
      state.birthdate = action.payload;
    },
    setPrincipalEmailSelectedUser: (state, action) => {
      state.principal_email = action.payload;
    },
    setCorporateEmailSelectedUser: (state, action) => {
      state.corporate_email = action.payload;
    },
    setCorporateCellphoneSelectedUser: (state, action) => {
      state.corporate_cellphone = action.payload;
    },
    setPersonalEmailSelectedUser: (state, action) => {
      state.personal_email = action.payload;
    },
    setPersonalCellphoneSelectedUser: (state, action) => {
      state.personal_cellphone = action.payload;
    },
    setPasswordSelectedUser: (state, action) => {
      state.password = action.payload;
    },
    setLastPasswordUpdateSelectedUser: (state, action) => {
      state.last_password_update = action.payload;
    },
    setResidenceDepartmentSelectedUser: (state, action) => {
      state.residence_department = action.payload;
    },
    setResidenceCitySelectedUser: (state, action) => {
      state.residence_city = action.payload;
    },
    setResidenceAddressSelectedUser: (state, action) => {
      state.residence_address = action.payload;
    },
    setResidenceNeighborhoodSelectedUser: (state, action) => {
      state.residence_neighborhood = action.payload;
    },
    setIsActiveSelectedUser: (state, action) => {
      state.is_active = action.payload;
    },
    setErrorsSelectedUser: (state, action) => {
      state.errors = action.payload;
    },
    setDefaultValuesSelectedUser: (state) => {
      state.id = "";
      state.name = "";
      state.last_name = "";
      state.user_id_type = 0;
      state.id_number = 0;
      state.user_gender = 0;
      state.birthdate = "";
      state.principal_email = "";
      state.corporate_email = "";
      state.corporate_cellphone = "";
      state.personal_email = "";
      state.personal_cellphone = "";
      state.password = "";
      state.last_password_update = "";
      state.residence_department = "";
      state.residence_city = "";
      state.residence_address = "";
      state.residence_neighborhood = "";
      state.errors = [];
    },
  },
});

export const {
  setIdSelectedUser,
  setNameSelectedUser,
  setLastNameSelectedUser,
  setIdNumberSelectedUser,
  setBirthdateSelectedUser,
  setPrincipalEmailSelectedUser,
  setCorporateCellphoneSelectedUser,
  setCorporateEmailSelectedUser,
  setGenderSelectedUser,
  setIdTypeSelectedUser,
  setPersonalCellphoneSelectedUser,
  setPersonalEmailSelectedUser,
  setPasswordSelectedUser,
  setLastPasswordUpdateSelectedUser,
  setResidenceDepartmentSelectedUser,
  setResidenceCitySelectedUser,
  setResidenceAddressSelectedUser,
  setResidenceNeighborhoodSelectedUser,
  setIsActiveSelectedUser,
  setErrorsSelectedUser,
  setDefaultValuesSelectedUser,
} = selectedUserSlice.actions;

export default selectedUserSlice.reducer;
