"use client";

import React, { useEffect, useState } from "react";

import { useAppDispatch, useAppSelector } from "@/redux/hooks";

import CustomMessage from "@/components/common/custom_messages/CustomMessage";
import { Col } from "antd";

import {
  useGetUserActiveByIdNumberQuery,
  useUpdateUserMutation,
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

  const [
    bloodGroupNameUserProfileLocalState,
    setBloodGroupNameUserProfileLocalState,
  ] = useState(0);
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

  const {
    data: userActiveByIdNumberData,
    isLoading: userActiveByIdNumberLoading,
    isFetching: userActiveByIdNumberFetching,
    error: userActiveByIdNumberError,
  } = useGetUserActiveByIdNumberQuery(idNumberUserState);

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

      // dispatch(
      //   setBloodGroupUserProfile(userActiveByIdNumberData?.user_blood_group)
      // );
      // dispatch(
      //   setAffiliationEpsUserProfile(userActiveByIdNumberData?.affiliation_eps)
      // );
      // dispatch(
      //   setResidenceDepartmentUserProfile(
      //     userActiveByIdNumberData?.residence_department
      //   )
      // );
      // dispatch(
      //   setResidenceCityUserProfile(userActiveByIdNumberData?.residence_city)
      // );
      // dispatch(
      //   setResidenceAddressUserProfile(
      //     userActiveByIdNumberData?.residence_address
      //   )
      // );
      // dispatch(
      //   setResidenceNeighborhoodUserProfile(
      //     userActiveByIdNumberData?.residence_neighborhood
      //   )
      // );
      // dispatch(setUserHeightUserProfile(userActiveByIdNumberData?.user_height));
      // dispatch(setUserWeightUserProfile(userActiveByIdNumberData?.user_weight));
      // dispatch(
      //   setUserShirtSizeUserProfile(userActiveByIdNumberData?.user_shirt_size)
      // );
      // dispatch(
      //   setUserPantsSizeUserProfile(userActiveByIdNumberData?.user_pants_size)
      // );
      // dispatch(
      //   setUserShoeSizeUserProfile(userActiveByIdNumberData?.user_shoe_size)
      // );
    }
  }, [idUserState, idNumberUserState, userActiveByIdNumberData]);

  const handleChangeEditUser = async (e: React.FormEvent<HTMLFormElement>) => {
    try {
      setIsSubmittingEditUser(true);

      const response: any = await updateUser({
        id: idUserState,
        updateUser: {
          principal_email:
            principalEmailUserLocalState || principalEmailUserState,
          personal_email: personalEmailUserLocalState || personalEmailUserState,
          personal_cellphone:
            parseInt(personalCellphoneUserLocalState, 10) ||
            personalCellphoneUserState,
        },
      });

      let editUserDataError = response.error;

      let editUserDataStatus = response.data?.statusCode;

      let editUserDataValidationData = response.data?.message;

      if (editUserDataError || editUserDataStatus !== 202) {
        setHasChanges(false);

        const errorMessage = editUserDataError?.data.message;
        const validationDataMessage = editUserDataValidationData;

        if (Array.isArray(errorMessage)) {
          dispatch(setErrorsUser(errorMessage[0]));

          setShowErrorMessage(true);
        } else if (typeof errorMessage === "string") {
          dispatch(setErrorsUser(errorMessage));

          setShowErrorMessage(true);
        }

        if (Array.isArray(validationDataMessage)) {
          dispatch(setErrorsUser(validationDataMessage[0]));

          setShowErrorMessage(true);
        } else if (typeof validationDataMessage === "string") {
          dispatch(setErrorsUser(validationDataMessage));

          setShowErrorMessage(true);
        }
      }

      if (editUserDataStatus === 202 && !editUserDataError) {
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
        setSuccessMessage("¡Datos del usuario actualizados correctamente!");
        setShowSuccessMessage(true);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsSubmittingEditUser(false);
    }
  };

  const handleButtonClick = () => {
    dispatch(setErrorsUser([]));
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
        affiliationEpsUserProfileFormData={affiliationEpsUserProfileState}
        onChangeAffiliationEpsUserProfileFormData={(e) => {
          setHasChanges(true);

          setAffiliationEpsUserProfileLocalState(e.target.value);
        }}
        residenceDepartmentUserProfileFormData={
          residenceDepartmentUserProfileState
        }
        onChangeResidenceDepartmentUserProfileFormData={(e) => {
          setHasChanges(true);

          setResidenceDepartmentUserProfileLocalState(e.target.value);
        }}
        residenceCityUserProfileFormData={residenceCityUserProfileState}
        onChangeResidenceCityUserProfileFormData={(e) => {
          setHasChanges(true);

          setResidenceCityUserProfileLocalState(e.target.value);
        }}
        residenceNeighborhoodUserProfileFormData={
          residenceNeighborhoodUserProfileState
        }
        onChangeResidenceNeighborhoodUserProfileFormData={(e) => {
          setHasChanges(true);

          setResidenceNeighborhoodUserProfileLocalState(e.target.value);
        }}
        residenceAddressUserProfileUserProfileFormData={
          residenceAddressUserProfileState
        }
        onChangeResidenceAddressUserProfileFormData={(e) => {
          setHasChanges(true);

          setResidenceAddressUserProfileLocalState(e.target.value);
        }}
        heightUserProfileFormData={heightUserProfileState}
        onChangeHeightUserProfileFormData={(e) => {
          setHasChanges(true);

          setHeightUserProfileLocalState(e.target.value);
        }}
        weightUserProfileFormData={weightUserProfileState}
        onChangeWeightUserProfileFormData={(e) => {
          setHasChanges(true);

          setWeightUserProfileLocalState(e.target.value);
        }}
        shirtSizeUserProfileFormData={shirtSizeUserProfileState}
        onChangeShirtSizeUserProfileFormData={(e) => {
          setHasChanges(true);

          setShirtSizeUserProfileLocalState(e.target.value);
        }}
        pantsSizeUserProfileFormData={pantsSizeUserProfileState}
        onChangePantsSizeUserProfileFormData={(e) => {
          setHasChanges(true);

          setPantsSizeUserProfileLocalState(e.target.value);
        }}
        shoeSizeUserProfileFormData={shoeSizeUserProfileState}
        onChangeShoeSizeUserProfileFormData={(e) => {
          setHasChanges(true);

          setShoeSizeUserProfileLocalState(e.target.value);
        }}
        initialValuesEditAdminFormData={{
          "current-edit-user-principal-email":
            principalEmailUserState || NOT_REGISTER,
          "current-edit-user-personal-email":
            personalEmailUserState || NOT_REGISTER,
          "current-edit-user-personal-cellphone":
            personalCellphoneUserState || NOT_REGISTER,
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
          "current-edit-user-height": heightUserProfileState || NOT_REGISTER,
          "current-edit-user-weight": weightUserProfileState || NOT_REGISTER,
          "current-edit-user-shirt-size":
            shirtSizeUserProfileState || NOT_REGISTER,
          "current-edit-user-pants-size":
            pantsSizeUserProfileState || NOT_REGISTER,
          "current-edit-user-shoe-size":
            shoeSizeUserProfileState || NOT_REGISTER,
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
