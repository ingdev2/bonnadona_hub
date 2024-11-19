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

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setIdUser: (state, action) => {
      state.id = action.payload;
    },
    setNameUser: (state, action) => {
      state.name = action.payload;
    },
    setLastNameUser: (state, action) => {
      state.last_name = action.payload;
    },
    setIdTypeUser: (state, action) => {
      state.user_id_type = action.payload;
    },
    setIdNumberUser: (state, action) => {
      state.id_number = action.payload;
    },
    setGenderUser: (state, action) => {
      state.user_gender = action.payload;
    },
    setBirthdateUser: (state, action) => {
      state.birthdate = action.payload;
    },
    setPrincipalEmailUser: (state, action) => {
      state.principal_email = action.payload;
    },
    setCorporateEmailUser: (state, action) => {
      state.corporate_email = action.payload;
    },
    setCorporateCellphoneUser: (state, action) => {
      state.corporate_cellphone = action.payload;
    },
    setPersonalEmailUser: (state, action) => {
      state.personal_email = action.payload;
    },
    setPersonalCellphoneUser: (state, action) => {
      state.personal_cellphone = action.payload;
    },
    setPasswordUser: (state, action) => {
      state.password = action.payload;
    },
    setLastPasswordUpdateUser: (state, action) => {
      state.last_password_update = action.payload;
    },
    setResidenceDepartmentUser: (state, action) => {
      state.residence_department = action.payload;
    },
    setResidenceCityUser: (state, action) => {
      state.residence_city = action.payload;
    },
    setResidenceAddressUser: (state, action) => {
      state.residence_address = action.payload;
    },
    setResidenceNeighborhoodUser: (state, action) => {
      state.residence_neighborhood = action.payload;
    },
    setIsActiveUser: (state, action) => {
      state.is_active = action.payload;
    },
    setErrorsUser: (state, action) => {
      state.errors = action.payload;
    },
    setDefaultValuesUser: (state) => {
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
  setIdUser,
  setNameUser,
  setLastNameUser,
  setIdNumberUser,
  setBirthdateUser,
  setPrincipalEmailUser,
  setCorporateCellphoneUser,
  setCorporateEmailUser,
  setGenderUser,
  setIdTypeUser,
  setPersonalCellphoneUser,
  setPersonalEmailUser,
  setPasswordUser,
  setLastPasswordUpdateUser,
  setResidenceDepartmentUser,
  setResidenceCityUser,
  setResidenceAddressUser,
  setResidenceNeighborhoodUser,
  setIsActiveUser,
  setErrorsUser,
  setDefaultValuesUser,
} = userSlice.actions;

export default userSlice.reducer;
