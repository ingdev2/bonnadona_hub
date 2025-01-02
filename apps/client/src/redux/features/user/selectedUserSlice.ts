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
  corporate_cellphone: 0,
  personal_cellphone: 0,
  personal_email: "",
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
  role: [],
  user_role: [],
  selectedRoleIdsToAdd: [],
  permission: [],
  selectedPermissionIdsToAdd: [],
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
    setCollaboratorServiceTypeSelectedUser: (state, action) => {
      state.collaborator_service_type = action.payload;
    },
    setCollaboratorInmediateBossSelectedUser: (state, action) => {
      state.collaborator_immediate_boss = action.payload;
    },
    setCollaboratorUnitSelectedUser: (state, action) => {
      state.collaborator_unit = action.payload;
    },
    setCollaboratorServiceSelectedUser: (state, action) => {
      state.collaborator_service = action.payload;
    },
    setCollaboratorPositionSelectedUser: (state, action) => {
      state.collaborator_position = action.payload;
    },
    setIsActiveSelectedUser: (state, action) => {
      state.is_active = action.payload;
    },
    setRoleSelectedUser: (state, action) => {
      state.role = action.payload;
    },
    setUserRoleSelectedUser: (state, action) => {
      state.user_role = action.payload;
    },
    setRoleIdsToAddSelectedUser: (state, action) => {
      state.selectedRoleIdsToAdd = action.payload;
    },
    setPermissionSelectedUser: (state, action) => {
      state.permission = action.payload;
    },
    setPermissionIdsToAddSelectedUser: (state, action) => {
      state.selectedPermissionIdsToAdd = action.payload;
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
      state.corporate_cellphone = 0;
      state.personal_cellphone = 0;
      state.personal_email = "";
      state.password = "";
      state.last_password_update = "";
      state.collaborator_service_type = 0;
      state.collaborator_immediate_boss = "";
      state.collaborator_unit = "";
      state.collaborator_service = "";
      state.collaborator_position = "";
      state.role = [];
      // state.roleIdsToAdd = [];
      state.selectedRoleIdsToAdd = [];
      state.permission = [];
      // state.permissionIdsToAdd = [];
      state.selectedPermissionIdsToAdd = [];
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
  setCollaboratorServiceTypeSelectedUser,
  setCollaboratorInmediateBossSelectedUser,
  setCollaboratorPositionSelectedUser,
  setCollaboratorServiceSelectedUser,
  setCollaboratorUnitSelectedUser,
  setIsActiveSelectedUser,
  setRoleSelectedUser,
  setUserRoleSelectedUser,
  setRoleIdsToAddSelectedUser,
  setPermissionSelectedUser,
  setPermissionIdsToAddSelectedUser,
  setErrorsSelectedUser,
  setDefaultValuesSelectedUser,
} = selectedUserSlice.actions;

export default selectedUserSlice.reducer;
