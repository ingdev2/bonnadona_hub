import { createSlice } from "@reduxjs/toolkit";

const initialState: User = {
  id: "",
  name: "",
  last_name: "",
  user_id_type: 0,
  user_id_type_abbrev: "",
  id_number: 0,
  user_gender: 0,
  user_gender_abbrev: "",
  birthdate: "",
  principal_email: "",
  corporate_email: "",
  corporate_cellphone: 0,
  personal_email: "",
  personal_cellphone: 0,
  password: "",
  last_password_update: "",
  collaborator_service_type: 0,
  collaborator_immediate_boss: "",
  collaborator_unit: "",
  collaborator_service: "",
  collaborator_position: "",
  is_active: true,
  createdAt: "",
  updateAt: "",
  deletedAt: "",
  hasChanges: false,
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
    setIdTypeAbbrevUser: (state, action) => {
      state.user_id_type_abbrev = action.payload;
    },
    setIdNumberUser: (state, action) => {
      state.id_number = action.payload;
    },
    setGenderUser: (state, action) => {
      state.user_gender = action.payload;
    },
    setGenderAbbrevUser: (state, action) => {
      state.user_gender_abbrev = action.payload;
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
    setCollaboratorServiceTypeUser: (state, action) => {
      state.collaborator_service_type = action.payload;
    },
    setCollaboratorInmediateBossUser: (state, action) => {
      state.collaborator_immediate_boss = action.payload;
    },
    setCollaboratorUnitUser: (state, action) => {
      state.collaborator_unit = action.payload;
    },
    setCollaboratorServiceUser: (state, action) => {
      state.collaborator_service = action.payload;
    },
    setCollaboratorPositionUser: (state, action) => {
      state.collaborator_position = action.payload;
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
      state.user_id_type_abbrev = "";
      state.id_number = 0;
      state.user_gender = 0;
      state.user_gender_abbrev = "";
      state.birthdate = "";
      state.principal_email = "";
      state.corporate_email = "";
      state.corporate_cellphone = 0;
      state.personal_email = "";
      state.personal_cellphone = 0;
      state.password = "";
      state.last_password_update = "";
      state.collaborator_service_type = 0;
      state.collaborator_immediate_boss = "";
      state.collaborator_unit = "";
      state.collaborator_service = "";
      state.collaborator_position = "";
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
  setGenderAbbrevUser,
  setIdTypeUser,
  setIdTypeAbbrevUser,
  setPersonalCellphoneUser,
  setPersonalEmailUser,
  setPasswordUser,
  setLastPasswordUpdateUser,
  setCollaboratorServiceTypeUser,
  setCollaboratorInmediateBossUser,
  setCollaboratorPositionUser,
  setCollaboratorServiceUser,
  setCollaboratorUnitUser,
  setIsActiveUser,
  setErrorsUser,
  setDefaultValuesUser,
} = userSlice.actions;

export default userSlice.reducer;
