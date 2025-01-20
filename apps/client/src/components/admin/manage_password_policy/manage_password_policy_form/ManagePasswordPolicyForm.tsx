"use client";

import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";

import CustomSpin from "@/components/common/custom_spin/CustomSpin";
import CustomMessage from "@/components/common/custom_messages/CustomMessage";

import ManagePasswordFormData from "./ManagePasswordPolicyFormData";
import { areDataDifferent } from "../helpers/are_data_differents";

import {
  useGetPasswordPolicyQuery,
  useUpdatePasswordPolicyMutation,
} from "@/redux/apis/password_policy/passwordPolicyApi";

import { setErrorsPasswordPolicy } from "@/redux/features/password_policy/passwordPolicySlice";

import { PermissionsActionsValidation } from "@/helpers/permission_validation/permissionsActionsValidation";
import { ModuleActionsEnum } from "@/utils/enums/permissions/module_actions/module_actions.enum";

const ManagePasswordPolicyForm: React.FC = () => {
  const dispatch = useAppDispatch();

  const editPasswordPolicyAction = PermissionsActionsValidation({
    allowedActions: [ModuleActionsEnum.UPDATE_PASSWORD_POLICY],
  });

  const minLenghtPasswordPolicyState = useAppSelector(
    (state) => state.passwordPolicy.min_length
  );

  const requireUpperCasePasswordPolicyState = useAppSelector(
    (state) => state.passwordPolicy.require_uppercase
  );

  const requireLowerCasePasswordPolicyState = useAppSelector(
    (state) => state.passwordPolicy.require_lowercase
  );

  const requireNumbersPasswordPolicyState = useAppSelector(
    (state) => state.passwordPolicy.require_numbers
  );

  const requireSpecialCharactersPasswordPolicyState = useAppSelector(
    (state) => state.passwordPolicy.require_special_characters
  );

  const passwordExpiryDaysPasswordPolicyState = useAppSelector(
    (state) => state.passwordPolicy.password_expiry_days
  );

  const inactivityDaysPasswordPolicyState = useAppSelector(
    (state) => state.passwordPolicy.inactivity_days
  );

  const passwordHistoryLimitPasswordPolicyState = useAppSelector(
    (state) => state.passwordPolicy.password_history_limit
  );

  const maximunMinutesOfInactivityInAppState = useAppSelector(
    (state) => state.passwordPolicy.maximum_minutes_of_inactivity_in_application
  );

  const errorsState = useAppSelector((state) => state.passwordPolicy.errors);

  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [showErrorMessage, setShowErrorMessage] = useState(false);

  const [minLenghtPasswordLocalState, setMinLenghtPasswordLocalState] =
    useState(0);
  const [passwordExpiryDaysLocalState, setPasswordExpiryDaysLocalState] =
    useState(0);
  const [inactivityDaysLocalState, setInactivityDaysLocalState] = useState(0);
  const [passwordHistoryLimitLocalState, setPasswordHistoryLimitLocalState] =
    useState(0);
  const [
    maximunMinutesOfInactivityInAppLocalState,
    setMaximunMinutesOfInactivityInAppLocalState,
  ] = useState(0);
  const [requireUpperCaseLocalState, setRequireUpperCaseLocalState] =
    useState(false);
  const [requireLowerCaseLocalState, setRequireLowerCaseLocalState] =
    useState(false);
  const [requireNumbersLocalState, setRequireNumbersLocalState] =
    useState(false);
  const [
    requireSpecialCharactersLocalState,
    setRequireSpecialCharactersLocalState,
  ] = useState(false);

  const {
    data: getPasswordPolicyData,
    isLoading: getPasswordPolicyLoading,
    isFetching: getPasswordPolicyFetching,
    error: getPasswordPolicyError,
    refetch: getPasswordPolicyRefetch,
  } = useGetPasswordPolicyQuery(null);

  const [
    updatePasswordPolicy,
    { data: updatePasswordPolicyData, isLoading: updatePasswordPolicyLoading },
  ] = useUpdatePasswordPolicyMutation({
    fixedCacheKey: "updatePasswordPolicy",
  });

  useEffect(() => {
    setMinLenghtPasswordLocalState(minLenghtPasswordPolicyState);
    setPasswordExpiryDaysLocalState(passwordExpiryDaysPasswordPolicyState);
    setInactivityDaysLocalState(inactivityDaysPasswordPolicyState);
    setPasswordHistoryLimitLocalState(passwordHistoryLimitPasswordPolicyState);
    setMaximunMinutesOfInactivityInAppLocalState(
      maximunMinutesOfInactivityInAppState
    );
    setRequireUpperCaseLocalState(requireUpperCasePasswordPolicyState);
    setRequireLowerCaseLocalState(requireLowerCasePasswordPolicyState);
    setRequireNumbersLocalState(requireNumbersPasswordPolicyState);
    setRequireSpecialCharactersLocalState(
      requireSpecialCharactersPasswordPolicyState
    );
  }, [
    minLenghtPasswordPolicyState,
    passwordExpiryDaysPasswordPolicyState,
    inactivityDaysPasswordPolicyState,
    passwordHistoryLimitPasswordPolicyState,
    maximunMinutesOfInactivityInAppState,
    requireUpperCasePasswordPolicyState,
    requireLowerCasePasswordPolicyState,
    requireNumbersPasswordPolicyState,
    requireSpecialCharactersPasswordPolicyState,
  ]);

  const hasChanges = () => {
    const initialData = {
      dataMinLenght: minLenghtPasswordPolicyState,
      dataPasswordExpiryDays: passwordExpiryDaysPasswordPolicyState,
      dataInactivityDays: inactivityDaysPasswordPolicyState,
      dataPasswordHistoryLimit: passwordHistoryLimitPasswordPolicyState,
      dataMaximunMinutesOfInactivity: maximunMinutesOfInactivityInAppState,
      dataRequireUpperCase: requireUpperCasePasswordPolicyState,
      dataRequireLowerCase: requireLowerCasePasswordPolicyState,
      dataRequireNumber: requireNumbersPasswordPolicyState,
      dataRequireSpecialCharacter: requireSpecialCharactersPasswordPolicyState,
    };

    const currentData = {
      dataMinLenght: minLenghtPasswordLocalState,
      dataPasswordExpiryDays: passwordExpiryDaysLocalState,
      dataInactivityDays: inactivityDaysLocalState,
      dataPasswordHistoryLimit: passwordHistoryLimitLocalState,
      dataMaximunMinutesOfInactivity: maximunMinutesOfInactivityInAppLocalState,
      dataRequireUpperCase: requireUpperCaseLocalState,
      dataRequireLowerCase: requireLowerCaseLocalState,
      dataRequireNumber: requireNumbersLocalState,
      dataRequireSpecialCharacter: requireSpecialCharactersLocalState,
    };

    return areDataDifferent(initialData, currentData);
  };

  const handleClickSubmit = async () => {
    try {
      setShowSuccessMessage(false);

      const response: any = await updatePasswordPolicy({
        updatePasswordPolicy: {
          min_length: minLenghtPasswordLocalState,
          password_expiry_days: passwordExpiryDaysLocalState,
          inactivity_days: inactivityDaysLocalState,
          password_history_limit: passwordHistoryLimitLocalState,
          maximum_minutes_of_inactivity_in_application:
            maximunMinutesOfInactivityInAppLocalState,
          require_uppercase: requireUpperCaseLocalState,
          require_lowercase: requireLowerCaseLocalState,
          require_numbers: requireNumbersLocalState,
          require_special_characters: requireSpecialCharactersLocalState,
        },
      });

      let editPasswordPolicyDataError = response?.error;
      let editPasswordPolicyDataStatus = response?.data?.statusCode;
      let successMessage = response?.data?.message;

      if (
        editPasswordPolicyDataStatus === 202 &&
        !editPasswordPolicyDataError
      ) {
        setSuccessMessage(successMessage);
        setShowSuccessMessage(true);
        getPasswordPolicyRefetch();
      }

      if (editPasswordPolicyDataError) {
        const errorMessage = editPasswordPolicyDataError?.data?.message;

        if (Array.isArray(errorMessage)) {
          dispatch(setErrorsPasswordPolicy(errorMessage[0]));
        } else if (typeof errorMessage === "string") {
          dispatch(setErrorsPasswordPolicy(errorMessage));
        }
        setShowErrorMessage(true);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleButtonClick = () => {
    dispatch(setErrorsPasswordPolicy([]));
    setShowErrorMessage(false);
  };

  return (
    <>
      {!inactivityDaysPasswordPolicyState ||
      !minLenghtPasswordPolicyState ||
      !passwordExpiryDaysPasswordPolicyState ||
      !passwordHistoryLimitPasswordPolicyState ||
      !maximunMinutesOfInactivityInAppState ? (
        <CustomSpin />
      ) : (
        <div>
          {showErrorMessage && (
            <CustomMessage
              typeMessage="error"
              message={errorsState?.toString() || "¡Error en la petición!"}
            />
          )}

          {showSuccessMessage && (
            <CustomMessage
              typeMessage="success"
              message={successMessage || "¡Datos guardados correctamente!"}
            />
          )}

          <ManagePasswordFormData
            inactivityDaysFormData={inactivityDaysPasswordPolicyState}
            minLenghtPasswordFormData={minLenghtPasswordPolicyState}
            passwordExpiryDaysFormData={passwordExpiryDaysPasswordPolicyState}
            passwordHistoryLimitFormData={
              passwordHistoryLimitPasswordPolicyState
            }
            requireLowerCasePasswordFormData={requireLowerCaseLocalState}
            requireNumbersPasswordFormData={requireNumbersLocalState}
            requireSpecialCharactersFormData={
              requireSpecialCharactersLocalState
            }
            requireUpperCasePasswordFormData={requireUpperCaseLocalState}
            maximunMinutesInactivityInAppFormData={
              maximunMinutesOfInactivityInAppState
            }
            updatePasswordPolicyLoading={updatePasswordPolicyLoading}
            setMinLenghtPasswordLocalState={setMinLenghtPasswordLocalState}
            setPasswordExpiryDaysLocalState={setPasswordExpiryDaysLocalState}
            setInactivityDaysLocalState={setInactivityDaysLocalState}
            setPasswordHistoryLimitLocalState={
              setPasswordHistoryLimitLocalState
            }
            setMaximunMinutesInactivityInAppLocalState={
              setMaximunMinutesOfInactivityInAppLocalState
            }
            setRequireUpperCaseLocalState={setRequireUpperCaseLocalState}
            setRequireLowerCaseLocalState={setRequireLowerCaseLocalState}
            setRequireNumbersLocalState={setRequireNumbersLocalState}
            setRequireSpecialCharactersLocalState={
              setRequireSpecialCharactersLocalState
            }
            hasChanges={hasChanges}
            handleClickSubmit={handleClickSubmit}
            handleOnClickButton={handleButtonClick}
          />
        </div>
      )}
    </>
  );
};

export default ManagePasswordPolicyForm;
