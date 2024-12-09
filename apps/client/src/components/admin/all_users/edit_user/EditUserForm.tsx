"use client";

import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";

import CustomMessage from "@/components/common/custom_messages/CustomMessage";
import { useGetAllBloodGroupsQuery } from "@/redux/apis/blood_group/bloodGroupApi";
import {
  useGetUserByIdNumberQuery,
  useGetUserQuery,
  useUpdateUserMutation,
} from "@/redux/apis/users/userApi";
import {
  setCorporateEmailSelectedUser,
  setErrorsSelectedUser,
  setIdSelectedUser,
  setPersonalCellphoneSelectedUser,
  setPersonalEmailSelectedUser,
  setPrincipalEmailSelectedUser,
} from "@/redux/features/user/selectedUserSlice";
import EditUserFormData from "./EditUserFormData";
import { setErrorsUser } from "@/redux/features/user/userSlice";

const EditUserForm: React.FC = () => {
  const dispatch = useAppDispatch();

  const NOT_REGISTER: string = "NO REGISTRA";

  const idUserState = useAppSelector((state) => state.selectedUser.id);
  const nameUserState = useAppSelector((state) => state.selectedUser.name);
  const lastNameUserState = useAppSelector(
    (state) => state.selectedUser.last_name
  );
  const idTypeNameUserState = useAppSelector(
    (state) => state.selectedUser.user_id_type
  );
  const idNumberUserState = useAppSelector(
    (state) => state.selectedUser.id_number
  );
  const genderNameUserState = useAppSelector(
    (state) => state.selectedUser.user_gender
  );
  const birthdateUserState = useAppSelector(
    (state) => state.selectedUser.birthdate
  );
  const principalEmailUserState = useAppSelector(
    (state) => state.selectedUser.principal_email
  );
  const corporateEmailUserState = useAppSelector(
    (state) => state.selectedUser.corporate_email
  );
  const personalEmailUserState = useAppSelector(
    (state) => state.selectedUser.personal_email
  );
  const corporateCellphoneUserState = useAppSelector(
    (state) => state.selectedUser.corporate_cellphone
  );
  const personalCellphoneUserState = useAppSelector(
    (state) => state.selectedUser.personal_cellphone
  );
  const serviceTypeNameUserState = useAppSelector(
    (state) => state.selectedUser.collaborator_service_type
  );
  const immediateBossUserState = useAppSelector(
    (state) => state.selectedUser.collaborator_immediate_boss
  );
  const UnitUserState = useAppSelector(
    (state) => state.selectedUser.collaborator_unit
  );
  const serviceUserState = useAppSelector(
    (state) => state.selectedUser.collaborator_service
  );
  const positionUserState = useAppSelector(
    (state) => state.selectedUser.collaborator_position
  );
  const userErrorsState = useAppSelector((state) => state.selectedUser.errors);

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
  const residenceAddressUserProfileState = useAppSelector(
    (state) => state.userProfile.residence_address
  );
  const residenceNeighborhoodUserProfileState = useAppSelector(
    (state) => state.userProfile.residence_neighborhood
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

  const [hasChanges, setHasChanges] = useState(false);

  const [principalEmailUserLocalState, setPrincipalEmailUserLocalState] =
    useState("");
  const [corporateEmailUserLocalState, setCorporateEmailUserLocalState] =
    useState("");
  const [personalEmailUserLocalState, setPersonalEmailUserLocalState] =
    useState("");

  const [personalCellphoneUserLocalState, setPersonalCellphoneUserLocalState] =
    useState("");

  const [corporateCellphoneUserLocalState, setCorporateCellphoneUserLocalState] =
    useState("");

  const [countryCodeCorporateCellphone, setCountryCodeCorporateCellphone] =
    useState(0);
  const [areaCodeCorporateCellphone, setAreaCodeCorporateCellphone] =
    useState("");
  const [phoneNumberCorporateCellphone, setPhoneNumberCorporateCellphone] =
    useState("");

  var fullCorporateCellphoneNumber = `${countryCodeCorporateCellphone}${areaCodeCorporateCellphone}${phoneNumberCorporateCellphone}`;

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
  const [bloodGroupListLocalState, setBloodGroupListLocalState]: any = useState(
    []
  );

  const [isSubmittingUpdatePersonal, setIsSubmittingUpdatePersonal] =
    useState(false);

  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [showErrorMessage, setShowErrorMessage] = useState(false);

  const {
    data: userData,
    isLoading: userLoading,
    isFetching: userFetching,
    error: userError,
  } = useGetUserByIdNumberQuery(idNumberUserState);

  const {
    data: allBloodGroupsData,
    isLoading: allBloodGroupsLoading,
    isFetching: allBloodGroupsFetching,
    error: allBloodGroupsError,
  } = useGetAllBloodGroupsQuery(null);

  const [
    updateUserData,
    {
      data: updateUserPersonalData,
      isLoading: updateUserLoading,
      isSuccess: updateUserSuccess,
      isError: updateUserError,
    },
  ] = useUpdateUserMutation({
    fixedCacheKey: "updateUserData",
  });

  useEffect(() => {
    if (userData && !idUserState && !userLoading && !userFetching) {
      dispatch(setIdSelectedUser(userData.id));
    }
  }, [userData, idUserState]);

  const handleConfirmUpdatePersonalData = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    try {
      setIsSubmittingUpdatePersonal(true);

      const response: any = await updateUserData({
        id: idUserState,
        updateUser: {
          principal_email:
            principalEmailUserLocalState || principalEmailUserState,
          corporate_email:
            corporateEmailUserLocalState || corporateEmailUserState,
          personal_email: personalEmailUserLocalState || personalEmailUserState,
          personal_cellphone:
            parseInt(personalCellphoneUserLocalState, 10) ||
            personalCellphoneUserState,
          corporate_cellphone:
            parseInt(corporateCellphoneUserLocalState, 10) ||
            corporateCellphoneUserState,
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
          dispatch(setErrorsSelectedUser(errorMessage[0]));

          setShowErrorMessage(true);
        } else if (typeof errorMessage === "string") {
          dispatch(setErrorsSelectedUser(errorMessage));

          setShowErrorMessage(true);
        }

        if (Array.isArray(validationDataMessage)) {
          dispatch(setErrorsSelectedUser(validationDataMessage[0]));

          setShowErrorMessage(true);
        } else if (typeof validationDataMessage === "string") {
          dispatch(setErrorsSelectedUser(validationDataMessage));

          setShowErrorMessage(true);
        }
      }

      if (editUserDataStatus === 202 && !editUserDataError) {
        setHasChanges(false);

        dispatch(
          setPrincipalEmailSelectedUser(
            principalEmailUserLocalState || principalEmailUserState
          )
        );
        dispatch(
          setCorporateEmailSelectedUser(
            corporateEmailUserLocalState || corporateEmailUserState
          )
        );
        dispatch(
          setPersonalEmailSelectedUser(
            personalEmailUserLocalState || personalEmailUserState
          )
        );
        dispatch(
          setPersonalCellphoneSelectedUser(
            parseInt(personalCellphoneUserLocalState, 10) ||
              personalCellphoneUserState
          )
        );
        dispatch(
          setCorporateEmailSelectedUser(
            parseInt(corporateCellphoneUserLocalState, 10) ||
              corporateCellphoneUserState
          )
        );

        setSuccessMessage("¡Datos del usuario actualizados correctamente!");
        setShowSuccessMessage(true);
      }
    } catch (error) {
      console.error(error);
      dispatch(setErrorsSelectedUser("ERROR INTERNO"));
    } finally {
      setIsSubmittingUpdatePersonal(false);
    }
  };

    const handleButtonClick = () => {
    setSuccessMessage("");
    setShowSuccessMessage(false);

    setShowErrorMessage(false);
  };

  return (
    <>
      {showErrorMessage && (
        <CustomMessage
          typeMessage="error"
          message={userErrorsState?.toString() || "¡Error en la petición!"}
        />
      )}

      {showSuccessMessage && (
        <CustomMessage
          typeMessage="success"
          message={successMessage || "¡Proceso finalizado con éxito!"}
        />
      )}

      <EditUserFormData
        principalEmailUserFormData={principalEmailUserState || NOT_REGISTER}
        onChangePrincipalEmailUserFormData={(e) => {
          setHasChanges(true);

          setPrincipalEmailUserLocalState(e.target.value);
        }}
        corporateEmailUserFormData={corporateEmailUserState || NOT_REGISTER}
        onChangeCorporateEmailUserFormData={(e) => {
          setHasChanges(true);

          setCorporateEmailUserLocalState(e.target.value);
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
        corporateCellphoneFormData={
          (corporateCellphoneUserState &&
            corporateCellphoneUserState.toString()) ||
          undefined
        }
        onChangeCorporateCellphoneFormData={(e) => {
          setHasChanges(true);

          setCorporateCellphoneUserLocalState(e.target.value);
        }}
        // validatorCorporateCellphoneInputFormData={
        //   validatorCorporateCellphoneInput
        // }
        handleConfirmEditAdminFormData={handleConfirmUpdatePersonalData}
        initialValuesEditAdminFormData={{
          "edit-user-principal-email": principalEmailUserState || NOT_REGISTER,
          "edit-user-corporate-email": corporateEmailUserState || NOT_REGISTER,
          "edit-user-personal-email": personalEmailUserState || NOT_REGISTER,
          "edit-user-personal-cellphone":
            personalCellphoneUserState || NOT_REGISTER,
          "edit-user-corporate-cellphone":
            corporateCellphoneUserState || NOT_REGISTER,
        }}
        isSubmittingEditUserData={isSubmittingUpdatePersonal}
        hasChangesFormData={hasChanges}
        handleButtonClickFormData={handleButtonClick}
      />
    </>
  );
};

export default EditUserForm;
