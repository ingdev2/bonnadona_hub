"use client";

import React, { useEffect, useState } from "react";

import { useAppDispatch, useAppSelector } from "@/redux/hooks";

import CustomMessage from "@/components/common/custom_messages/CustomMessage";
import { Col } from "antd";

import {
  useGetUserActiveByIdNumberQuery,
  useGetUserActiveProfileByIdQuery,
  useUpdateUserMutation,
  useUpdateUserProfileMutation,
} from "@/redux/apis/users/userApi";

import {
  setErrorsUser,
  setIdUser,
  setPersonalCellphoneUser,
  setPersonalEmailUser,
  setPrincipalEmailUser,
} from "@/redux/features/user/userSlice";
import CollaboratorPersonalEditDataFormData from "./CollaboratorPersonalEditDataFormData";
import {
  setAffiliationEpsUserProfile,
  setBloodGroupUserProfile,
  setErrorsUserProfile,
  setIdUserProfile,
  setResidenceAddressUserProfile,
  setResidenceCityUserProfile,
  setResidenceDepartmentUserProfile,
  setResidenceNeighborhoodUserProfile,
  setUserHeightUserProfile,
  setUserPantsSizeUserProfile,
  setUserShirtSizeUserProfile,
  setUserShoeSizeUserProfile,
  setUserWeightUserProfile,
} from "@/redux/features/user_profile/userProfileSlice";
import { useGetAllBloodGroupsQuery } from "@/redux/apis/blood_group/bloodGroupApi";

const CollaboratorPersonalEditDataForm: React.FC = () => {
  const dispatch = useAppDispatch();

  const NOT_REGISTER: string = "NO REGISTRA";

  const idUserState = useAppSelector((state) => state.user.id);
  const idNumberUserState = useAppSelector((state) => state.user.id_number);
  const principalEmailUserState = useAppSelector(
    (state) => state.user.principal_email
  );
  const personalEmailUserState = useAppSelector(
    (state) => state.user.personal_email
  );
  const personalCellphoneUserState = useAppSelector(
    (state) => state.user.personal_cellphone
  );

  // GLOBAL STATUS PROFILE
  const idUserProfileState = useAppSelector((state) => state.userProfile.id);
  const bloodGroupNameUserProfileState = useAppSelector(
    (state) => state.userProfile.user_blood_group
  );
  const affiliationEpsUserProfileState = useAppSelector(
    (state) => state.userProfile.affiliation_eps
  );
  const residenceDepartmentUserProfileState = useAppSelector(
    (state) => state.userProfile.residence_department
  );
  const residenceCityUserProfileState = useAppSelector(
    (state) => state.userProfile.residence_city
  );
  const residenceNeighborhoodUserProfileState = useAppSelector(
    (state) => state.userProfile.residence_neighborhood
  );
  const residenceAddressUserProfileState = useAppSelector(
    (state) => state.userProfile.residence_address
  );
  const heightUserProfileState = useAppSelector(
    (state) => state.userProfile.user_height
  );
  const weightUserProfileState = useAppSelector(
    (state) => state.userProfile.user_weight
  );
  const shirtSizeUserProfileState = useAppSelector(
    (state) => state.userProfile.user_shirt_size
  );
  const pantsSizeUserProfileState = useAppSelector(
    (state) => state.userProfile.user_pants_size
  );
  const shoeSizeUserProfileState = useAppSelector(
    (state) => state.userProfile.user_shoe_size
  );

  const errorsUserState = useAppSelector((state) => state.user.errors);

  const [principalEmailUserLocalState, setPrincipalEmailUserLocalState] =
    useState("");
  const [personalEmailUserLocalState, setPersonalEmailUserLocalState] =
    useState("");
  const [personalCellphoneUserLocalState, setPersonalCellphoneUserLocalState] =
    useState("");

  const [bloodGroupUserProfileLocalState, setBloodGroupUserProfileLocalState] =
    useState(0);
  const [
    affiliationEpsUserProfileLocalState,
    setAffiliationEpsUserProfileLocalState,
  ] = useState("");
  const [
    residenceDepartmentUserProfileLocalState,
    setResidenceDepartmentUserProfileLocalState,
  ] = useState("");
  const [
    residenceCityUserProfileLocalState,
    setResidenceCityUserProfileLocalState,
  ] = useState("");
  const [
    residenceAddressUserProfileLocalState,
    setResidenceAddressUserProfileLocalState,
  ] = useState("");
  const [
    residenceNeighborhoodUserProfileLocalState,
    setResidenceNeighborhoodUserProfileLocalState,
  ] = useState("");
  const [heightUserProfileLocalState, setHeightUserProfileLocalState] =
    useState("");
  const [weightUserProfileLocalState, setWeightUserProfileLocalState] =
    useState("");
  const [shirtSizeUserProfileLocalState, setShirtSizeUserProfileLocalState] =
    useState("");
  const [pantsSizeUserProfileLocalState, setPantsSizeUserProfileLocalState] =
    useState("");
  const [shoeSizeUserProfileLocalState, setShoeSizeUserProfileLocalState] =
    useState("");

  const [isSubmittingEditUser, setIsSubmittingEditUser] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [showErrorMessage, setShowErrorMessage] = useState(false);

  const [hasChanges, setHasChanges] = useState(false);

  const [
    updateUser,
    {
      data: updateUserData,
      isLoading: updateUserLoading,
      isSuccess: updateUserSuccess,
      isError: updateUserError,
    },
  ] = useUpdateUserMutation({
    fixedCacheKey: "updateUser",
  });

  const [
    updateProfileUser,
    {
      data: updateUserProfileData,
      isLoading: updateUserProfileLoading,
      isSuccess: updateUserProfileSuccess,
      isError: updateUserProfileError,
    },
  ] = useUpdateUserProfileMutation({
    fixedCacheKey: "updateProfileUser",
  });

  const {
    data: userActiveByIdNumberData,
    isLoading: userActiveByIdNumberLoading,
    isFetching: userActiveByIdNumberFetching,
    error: userActiveByIdNumberError,
  } = useGetUserActiveByIdNumberQuery(idNumberUserState);

  const {
    data: userActiveProfileByIdData,
    isLoading: userActiveProfileByIdLoading,
    isFetching: userActiveProfileByIdFetching,
    error: userActiveProfileByIdError,
    refetch: userActiveProfileByIdRefetch,
  } = useGetUserActiveProfileByIdQuery(userActiveByIdNumberData?.id!, {
    skip: !userActiveByIdNumberData?.id,
  });

  const {
    data: allBloodGroupsData,
    isLoading: allBloodGroupsLoading,
    isFetching: allBloodGroupsFetching,
    error: allBloodGroupsError,
    refetch: allBloodGroupsTypes,
  } = useGetAllBloodGroupsQuery(null);

  useEffect(() => {
    if (!idUserState && idNumberUserState && userActiveByIdNumberData) {
      dispatch(setIdUser(userActiveByIdNumberData?.id));
      dispatch(
        setPrincipalEmailUser(userActiveByIdNumberData?.principal_email)
      );
      dispatch(setPersonalEmailUser(userActiveByIdNumberData?.personal_email));
      dispatch(
        setPersonalCellphoneUser(userActiveByIdNumberData?.personal_cellphone)
      );

      if (userActiveByIdNumberError) {
        dispatch(setErrorsUser("¡No se pudo obtener los datos del usuario!"));
        setShowErrorMessage(true);
      }

      if (allBloodGroupsError) {
        dispatch(
          setErrorsUserProfile("¡No se pudo obtener los grupos sanguíneos!")
        );
        setShowErrorMessage(true);
      }
    }

    if (userActiveProfileByIdData) {
      dispatch(setIdUserProfile(userActiveProfileByIdData.id));
      dispatch(
        setBloodGroupUserProfile(userActiveProfileByIdData.user_blood_group)
      );
      dispatch(
        setAffiliationEpsUserProfile(userActiveProfileByIdData.affiliation_eps)
      );
      dispatch(
        setResidenceDepartmentUserProfile(
          userActiveProfileByIdData.residence_department
        )
      );
      dispatch(
        setResidenceCityUserProfile(userActiveProfileByIdData.residence_city)
      );
      dispatch(
        setResidenceAddressUserProfile(
          userActiveProfileByIdData.residence_address
        )
      );
      dispatch(
        setResidenceNeighborhoodUserProfile(
          userActiveProfileByIdData.residence_neighborhood
        )
      );
      dispatch(setUserHeightUserProfile(userActiveProfileByIdData.user_height));
      dispatch(setUserWeightUserProfile(userActiveProfileByIdData.user_weight));
      dispatch(
        setUserShirtSizeUserProfile(userActiveProfileByIdData.user_shirt_size)
      );
      dispatch(
        setUserPantsSizeUserProfile(userActiveProfileByIdData.user_pants_size)
      );
      dispatch(
        setUserShoeSizeUserProfile(userActiveProfileByIdData.user_shoe_size)
      );
    }
  }, [
    idUserState,
    idNumberUserState,
    userActiveByIdNumberData,
    userActiveProfileByIdData,
    userActiveByIdNumberError,
    allBloodGroupsError,
  ]);

  const handleChangeEditUser = async (e: React.FormEvent<HTMLFormElement>) => {
    try {
      setIsSubmittingEditUser(true);
      const [userResponse, profileResponse]: any = await Promise.all([
        updateUser({
          id: idUserState,
          updateUser: {
            principal_email:
              principalEmailUserLocalState || principalEmailUserState,
            personal_email:
              personalEmailUserLocalState || personalEmailUserState,
            personal_cellphone:
              parseInt(personalCellphoneUserLocalState, 10) ||
              personalCellphoneUserState,
          },
        }),
        updateProfileUser({
          id: idUserState,
          updateUserProfile: {
            user_blood_group:
              bloodGroupUserProfileLocalState || bloodGroupNameUserProfileState,
            affiliation_eps:
              affiliationEpsUserProfileLocalState ||
              affiliationEpsUserProfileState,
            residence_department:
              residenceDepartmentUserProfileLocalState ||
              residenceDepartmentUserProfileState,
            residence_city:
              residenceCityUserProfileLocalState ||
              residenceCityUserProfileState,
            residence_address:
              residenceAddressUserProfileLocalState ||
              residenceAddressUserProfileState,
            residence_neighborhood:
              residenceNeighborhoodUserProfileLocalState ||
              residenceNeighborhoodUserProfileState,
            user_height: heightUserProfileLocalState || heightUserProfileState,
            user_weight: weightUserProfileLocalState || weightUserProfileState,
            user_shirt_size:
              shirtSizeUserProfileLocalState || shirtSizeUserProfileState,
            user_pants_size:
              pantsSizeUserProfileLocalState || pantsSizeUserProfileState,
            user_shoe_size:
              shoeSizeUserProfileLocalState || shoeSizeUserProfileState,
          },
        }),
      ]);

      console.log("userResponse", userResponse);
      console.log("profileResponse", profileResponse);
      // Validar errores de updateUser
      let editUserDataError = userResponse.error;
      let editUserDataStatus = userResponse.data?.statusCode;
      let editUserDataValidationData = userResponse.data?.message;

      if (editUserDataError || editUserDataStatus !== 202) {
        setHasChanges(false);

        const errorMessage =
          editUserDataError?.data.message || editUserDataValidationData;

        if (Array.isArray(errorMessage)) {
          dispatch(setErrorsUser(errorMessage[0]));
        } else if (typeof errorMessage === "string") {
          dispatch(setErrorsUser(errorMessage));
        }
        setShowErrorMessage(true);
        return;
      }

      // Validar errores de updateProfileUser
      let editProfileDataError = profileResponse.error;
      let editProfileDataStatus = profileResponse.data?.status;
      let editProfileDataValidationData = profileResponse.data?.message;

      if (editProfileDataError || editProfileDataStatus !== 202) {
        setHasChanges(false);

        const errorMessage =
          editProfileDataError?.data.message || editProfileDataValidationData;

        if (Array.isArray(errorMessage)) {
          dispatch(setErrorsUser(errorMessage[0]));
        } else if (typeof errorMessage === "string") {
          dispatch(setErrorsUser(errorMessage));
        }
        setShowErrorMessage(true);
        return;
      }

      userActiveProfileByIdRefetch();
      setSuccessMessage("¡Datos actualizados correctamente!");
      setShowSuccessMessage(true);
      setHasChanges(false);

      dispatch(
        setPrincipalEmailUser(
          principalEmailUserLocalState || principalEmailUserState
        )
      );
      dispatch(
        setPersonalEmailUser(
          personalEmailUserLocalState || personalEmailUserState
        )
      );
      dispatch(
        setPersonalCellphoneUser(
          parseInt(personalCellphoneUserLocalState, 10) ||
            personalCellphoneUserState
        )
      );

      dispatch(
        setBloodGroupUserProfile(
          bloodGroupUserProfileLocalState || bloodGroupNameUserProfileState
        )
      );
      dispatch(
        setAffiliationEpsUserProfile(
          affiliationEpsUserProfileLocalState || affiliationEpsUserProfileState
        )
      );
      dispatch(
        setResidenceDepartmentUserProfile(
          residenceDepartmentUserProfileLocalState ||
            residenceDepartmentUserProfileState
        )
      );
      dispatch(
        setResidenceCityUserProfile(
          residenceCityUserProfileLocalState || residenceCityUserProfileState
        )
      );
      dispatch(
        setResidenceAddressUserProfile(
          residenceAddressUserProfileLocalState ||
            residenceAddressUserProfileState
        )
      );
      dispatch(
        setResidenceNeighborhoodUserProfile(
          residenceNeighborhoodUserProfileLocalState ||
            residenceNeighborhoodUserProfileState
        )
      );
      dispatch(
        setUserHeightUserProfile(
          heightUserProfileLocalState || heightUserProfileState
        )
      );
      dispatch(
        setUserWeightUserProfile(
          weightUserProfileLocalState || weightUserProfileState
        )
      );
      dispatch(
        setUserShirtSizeUserProfile(
          shirtSizeUserProfileLocalState || shirtSizeUserProfileState
        )
      );
      dispatch(
        setUserPantsSizeUserProfile(
          pantsSizeUserProfileLocalState || pantsSizeUserProfileState
        )
      );
      dispatch(
        setUserShoeSizeUserProfile(
          shoeSizeUserProfileLocalState || shoeSizeUserProfileState
        )
      );
    } catch (error) {
      console.error(error);
    } finally {
      setIsSubmittingEditUser(false);
    }
  };

  const handleButtonClick = () => {
    dispatch(setErrorsUser([]));
    dispatch(setErrorsUserProfile([]));
    setShowErrorMessage(false);
    setShowSuccessMessage(false);
  };

  return (
    <Col
      xs={24}
      sm={24}
      md={24}
      lg={24}
      style={{
        width: "100%",
        padding: "0 7px",
        margin: "0px",
      }}
    >
      {showErrorMessage && (
        <CustomMessage
          typeMessage="error"
          message={errorsUserState?.toString() || "¡Error en la petición!"}
        />
      )}

      {showSuccessMessage && (
        <CustomMessage
          typeMessage="success"
          message={successMessage || "¡Datos actualizados correctamente!"}
        />
      )}

      <CollaboratorPersonalEditDataFormData
        principalEmailUserFormData={principalEmailUserState || NOT_REGISTER}
        onChangePrincipalEmailUserFormData={(e) => {
          setHasChanges(true);

          setPrincipalEmailUserLocalState(e.target.value);
        }}
        personalEmailUserFormData={personalEmailUserState || NOT_REGISTER}
        onChangePersonalEmailUserFormData={(e) => {
          setHasChanges(true);

          setPersonalEmailUserLocalState(e.target.value);
        }}
        personalCellphoneFormData={
          (personalCellphoneUserState &&
            personalCellphoneUserState.toString()) ||
          undefined
        }
        onChangePersonalCellphoneFormData={(e) => {
          setHasChanges(true);

          setPersonalCellphoneUserLocalState(e.target.value);
        }}
        bloodGroupUserProfileFormData={bloodGroupNameUserProfileState}
        onChangebloodGroupUserProfileFormData={(value: number) => {
          setHasChanges(true);

          setBloodGroupUserProfileLocalState(value);
        }}
        bloodGroupListFormData={allBloodGroupsData}
        bloodGroupLoadingFormData={allBloodGroupsLoading}
        affiliationEpsUserProfileFormData={affiliationEpsUserProfileState}
        onChangeAffiliationEpsUserProfileFormData={(e) => {
          setHasChanges(true);

          setAffiliationEpsUserProfileLocalState(e.target.value.toUpperCase());
        }}
        residenceDepartmentUserProfileFormData={
          residenceDepartmentUserProfileState
        }
        onChangeResidenceDepartmentUserProfileFormData={(e) => {
          setHasChanges(true);

          setResidenceDepartmentUserProfileLocalState(
            e.target.value.toUpperCase()
          );
        }}
        residenceCityUserProfileFormData={residenceCityUserProfileState}
        onChangeResidenceCityUserProfileFormData={(e) => {
          setHasChanges(true);

          setResidenceCityUserProfileLocalState(e.target.value.toUpperCase());
        }}
        residenceNeighborhoodUserProfileFormData={
          residenceNeighborhoodUserProfileState
        }
        onChangeResidenceNeighborhoodUserProfileFormData={(e) => {
          setHasChanges(true);

          setResidenceNeighborhoodUserProfileLocalState(
            e.target.value.toUpperCase()
          );
        }}
        residenceAddressUserProfileUserProfileFormData={
          residenceAddressUserProfileState
        }
        onChangeResidenceAddressUserProfileFormData={(e) => {
          setHasChanges(true);

          setResidenceAddressUserProfileLocalState(
            e.target.value.toUpperCase()
          );
        }}
        heightUserProfileFormData={heightUserProfileState}
        onChangeHeightUserProfileFormData={(value) => {
          setHasChanges(true);

          setHeightUserProfileLocalState(value);
        }}
        weightUserProfileFormData={weightUserProfileState}
        onChangeWeightUserProfileFormData={(value) => {
          setHasChanges(true);

          setWeightUserProfileLocalState(value);
        }}
        shirtSizeUserProfileFormData={shirtSizeUserProfileState}
        onChangeShirtSizeUserProfileFormData={(value) => {
          setHasChanges(true);

          setShirtSizeUserProfileLocalState(value);
        }}
        pantsSizeUserProfileFormData={pantsSizeUserProfileState}
        onChangePantsSizeUserProfileFormData={(value) => {
          setHasChanges(true);

          setPantsSizeUserProfileLocalState(value);
        }}
        shoeSizeUserProfileFormData={shoeSizeUserProfileState}
        onChangeShoeSizeUserProfileFormData={(value) => {
          setHasChanges(true);

          setShoeSizeUserProfileLocalState(value);
        }}
        initialValuesEditAdminFormData={{
          "current-edit-user-principal-email":
            principalEmailUserState || NOT_REGISTER,
          "current-edit-user-personal-email":
            personalEmailUserState || NOT_REGISTER,
          "current-edit-user-personal-cellphone":
            personalCellphoneUserState || NOT_REGISTER,
          "current-edit-user-blood-group":
            bloodGroupNameUserProfileState || NOT_REGISTER,
          "current-edit-user-affiliation-eps":
            affiliationEpsUserProfileState || NOT_REGISTER,
          "current-edit-user-residence-department":
            residenceDepartmentUserProfileState || NOT_REGISTER,
          "current-edit-user-residence-city":
            residenceCityUserProfileState || NOT_REGISTER,
          "current-edit-user-residence-neighborhood":
            residenceNeighborhoodUserProfileState || NOT_REGISTER,
          "current-edit-user-residence-address":
            residenceAddressUserProfileState || NOT_REGISTER,
          "current-edit-user-height": heightUserProfileState,
          "current-edit-user-weight": weightUserProfileState,
          "current-edit-user-shirt-size": shirtSizeUserProfileState,
          "current-edit-user-pants-size": pantsSizeUserProfileState,
          "current-edit-user-shoe-size": shoeSizeUserProfileState,
        }}
        handleChangeEditUserFormData={handleChangeEditUser}
        isSubmittingEditUserData={isSubmittingEditUser}
        hasChangesFormData={hasChanges}
        handleButtonClickFormData={handleButtonClick}
      />
    </Col>
  );
};

export default CollaboratorPersonalEditDataForm;
