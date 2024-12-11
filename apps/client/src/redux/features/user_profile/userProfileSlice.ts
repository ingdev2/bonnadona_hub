import { createSlice } from "@reduxjs/toolkit";

const initialState: UserProfile = {
  id: "",
  user_blood_group: 0,
  user_blood_group_abbrev: "",
  profile_photo: [],
  affiliation_eps: "",
  residence_department: "",
  residence_city: "",
  residence_address: "",
  residence_neighborhood: "",
  digital_signature: [],
  user_height: "",
  user_weight: "",
  user_shirt_size: "",
  user_pants_size: "",
  user_shoe_size: "",
  createdAt: "",
  updateAt: "",
  deletedAt: "",
  errors: [],
};

export const userProfileSlice = createSlice({
  name: "userProfile",
  initialState,
  reducers: {
    setIdUserProfile: (state, action) => {
      state.id = action.payload;
    },
    setBloodGroupUserProfile: (state, action) => {
      state.user_blood_group = action.payload;
    },
    setBloodGroupAbbrevUserProfile: (state, action) => {
      state.user_blood_group_abbrev = action.payload;
    },
    setProfilePhotoUserProfile: (state, action) => {
      state.profile_photo = action.payload;
    },
    setAffiliationEpsUserProfile: (state, action) => {
      state.affiliation_eps = action.payload;
    },
    setResidenceDepartmentUserProfile: (state, action) => {
      state.residence_department = action.payload;
    },
    setResidenceCityUserProfile: (state, action) => {
      state.residence_city = action.payload;
    },
    setResidenceAddressUserProfile: (state, action) => {
      state.residence_address = action.payload;
    },
    setResidenceNeighborhoodUserProfile: (state, action) => {
      state.residence_neighborhood = action.payload;
    },
    setDigitalSignatureUserProfile: (state, action) => {
      state.digital_signature = action.payload;
    },
    setUserHeightUserProfile: (state, action) => {
      state.user_height = action.payload;
    },
    setUserWeightUserProfile: (state, action) => {
      state.user_weight = action.payload;
    },
    setUserShirtSizeUserProfile: (state, action) => {
      state.user_shirt_size = action.payload;
    },
    setUserPantsSizeUserProfile: (state, action) => {
      state.user_pants_size = action.payload;
    },
    setUserShoeSizeUserProfile: (state, action) => {
      state.user_shoe_size = action.payload;
    },
    setErrorsUserProfile: (state, action) => {
      state.errors = action.payload;
    },
    setDefaultValuesUserProfile: (state) => {
      state.id = "";
      state.user_blood_group = 0;
      state.user_blood_group_abbrev = "";
      state.profile_photo = [];
      state.affiliation_eps = "";
      state.digital_signature = [];
      state.user_height = "";
      state.user_weight = "";
      state.user_shirt_size = "";
      state.user_pants_size = "";
      state.user_shoe_size = "";
      state.residence_department = "";
      state.residence_city = "";
      state.residence_address = "";
      state.residence_neighborhood = "";
      state.errors = [];
    },
  },
});

export const {
  setIdUserProfile,
  setBloodGroupUserProfile,
  setBloodGroupAbbrevUserProfile,
  setProfilePhotoUserProfile,
  setResidenceDepartmentUserProfile,
  setResidenceAddressUserProfile,
  setResidenceNeighborhoodUserProfile,
  setUserHeightUserProfile,
  setDigitalSignatureUserProfile,
  setResidenceCityUserProfile,
  setAffiliationEpsUserProfile,
  setUserShirtSizeUserProfile,
  setUserWeightUserProfile,
  setUserPantsSizeUserProfile,
  setUserShoeSizeUserProfile,
  setErrorsUserProfile,
  setDefaultValuesUserProfile,
} = userProfileSlice.actions;

export default userProfileSlice.reducer;
