"use client";

import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";

import CustomMessage from "@/components/common/custom_messages/CustomMessage";
import { useGetAllBloodGroupsQuery } from "@/redux/apis/blood_group/bloodGroupApi";
import {
  useGetUserByIdNumberQuery,
  useGetUserQuery,
} from "@/redux/apis/users/userApi";
import {
  setErrorsSelectedUser,
  setIdSelectedUser,
} from "@/redux/features/user/selectedUserSlice";
import EditUserFormData from "./EditUserFormData";

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

  const [nameUserLocalState, setNameUserLocalState] = useState("");
  const [lastNameUserLocalState, setLastNameUserLocalState] = useState("");
  const [idNumberUserLocalState, setIdNumberUserLocalState] = useState(0);
  const [principalEmailUserLocalState, setPrincipalEmailUserLocalState] =
    useState("");
  const [corporateEmailUserLocalState, setCorporateEmailUserLocalState] =
    useState("");
  const [personalEmailUserLocalState, setPersonalEmailUserLocalState] =
    useState("");

  const [personalCellphoneUserLocalState, setPersonalCellphoneUserLocalState] =
    useState(0);

  const [
    corporateCellphoneUserLocalState,
    setCorporateCellphoneUserLocalState,
  ] = useState("");

  const [countryCodePersonalCellphone, setCountryCodePersonalCellphone] =
    useState(0);
  const [areaCodePersonalCellphone, setAreaCodePersonalCellphone] =
    useState("");
  const [phoneNumberPersonalCellphone, setPhoneNumberPersonalCellphone] =
    useState("");

  var fullPersonalCellphoneNumber = `${countryCodePersonalCellphone}${areaCodePersonalCellphone}${phoneNumberPersonalCellphone}`;

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

  const [isSubmittingUpdatePersonalData, setIsSubmittingUpdatePersonalData] =
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

  useEffect(() => {
    if (userData && !idUserState && !userLoading && !userFetching) {
      dispatch(setIdSelectedUser(userData.id));
    }
    if (
      allBloodGroupsData &&
      !allBloodGroupsLoading &&
      !allBloodGroupsFetching
    ) {
      setBloodGroupListLocalState(allBloodGroupsData);
    }
    if (allBloodGroupsError) {
      dispatch(
        setErrorsSelectedUser("¡No se pudo obtener los tipos de sangre!")
      );
      setShowErrorMessage(true);
      setBloodGroupListLocalState(allBloodGroupsData);
    }
  }, [userData, idUserState, allBloodGroupsData, allBloodGroupsError]);

  const handleConfirmUpdatePersonalData = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {};

  // const handleOnchageBloodGroups = (value: number) => {
  //   setHasChanges(true);

  //   setBloodGroupUserProfileLocalState(value);
  // };

  const handlePersonalCellphoneInputChange = (value: any) => {
    setHasChanges(true);

    if (value) {
      setCountryCodePersonalCellphone(value.countryCode || 0);
      setAreaCodePersonalCellphone(value.areaCode || "");
      setPhoneNumberPersonalCellphone(value.phoneNumber || "");
    }
  };

  const combinePersonalCellphoneDetails = () => {
    return `${areaCodePersonalCellphone}${phoneNumberPersonalCellphone}`;
  };

  const validatorPersonalCellphoneInput = (_: any, value: any) => {
    const combinedPersonalCellphone = combinePersonalCellphoneDetails();

    if (!combinedPersonalCellphone) {
      return Promise.resolve();
    }

    const personalCellphonePattern = /^[0-9]+$/;

    if (
      personalCellphonePattern.test(combinedPersonalCellphone) &&
      combinedPersonalCellphone.length >= 7 &&
      combinedPersonalCellphone.length <= 17
    ) {
      return Promise.resolve();
    }

    return Promise.reject("Número de teléfono inválido");
  };

  const handleCorporateCellphoneInputChange = (value: any) => {
    setHasChanges(true);

    if (value) {
      setCountryCodeCorporateCellphone(value.countryCode || 0);
      setAreaCodeCorporateCellphone(value.areaCode || "");
      setPhoneNumberCorporateCellphone(value.phoneNumber || "");
    }
  };

  const combineCorporateCellphoneDetails = () => {
    return `${areaCodeCorporateCellphone}${phoneNumberCorporateCellphone}`;
  };

  const validatorCorporateCellphoneInput = (_: any, value: any) => {
    const combinedCorporateCellphone = combineCorporateCellphoneDetails();

    if (!combinedCorporateCellphone) {
      return Promise.resolve();
    }

    const personalCellphonePattern = /^[0-9]+$/;

    if (
      personalCellphonePattern.test(combinedCorporateCellphone) &&
      combinedCorporateCellphone.length >= 7 &&
      combinedCorporateCellphone.length <= 17
    ) {
      return Promise.resolve();
    }

    return Promise.reject("Número de teléfono inválido");
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
        onChangePersonalCellphoneFormData={handlePersonalCellphoneInputChange}
        validatorPersonalCellphoneInputFormData={
          validatorPersonalCellphoneInput
        }
        corporateCellphoneFormData={
          (corporateCellphoneUserState &&
            corporateCellphoneUserState.toString()) ||
          undefined
        }
        onChangeCorporateCellphoneFormData={handleCorporateCellphoneInputChange}
        validatorCorporateCellphoneInputFormData={
          validatorCorporateCellphoneInput
        }
        handleConfirmEditAdminFormData={handleConfirmUpdatePersonalData}
        initialValuesEditAdminFormData={{
          "edit-user-principal-email": principalEmailUserState || NOT_REGISTER,
          "edit-user-corporate-email": corporateEmailUserState || NOT_REGISTER,
          "edit-user-personal-email": personalEmailUserState || NOT_REGISTER,
          "edit-user-personal-cellphone":
            personalCellphoneUserState || NOT_REGISTER,
        }}
      />
    </>
  );
};

export default EditUserForm;
