import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import CustomSpin from "@/components/common/custom_spin/CustomSpin";
import CustomMessage from "@/components/common/custom_messages/CustomMessage";
import ManagePasswordFormData from "./ManagePasswordFormData";

const ManagePasswordForm: React.FC = () => {
  const dispatch = useAppDispatch();

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

  const errorsState = useAppSelector((state) => state.passwordPolicy.errors);

  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [showErrorMessageAdmin, setShowErrorMessageAdmin] = useState(false);

  const [minLenghtPasswordLocalState, setMinLenghtPasswordLocalState] =
    useState(0);
  const [passwordExpiryDaysLocalState, setPasswordExpiryDaysLocalState] =
    useState(""); // pasar a number
  const [inactivityDaysLocalState, setInactivityDaysLocalState] = useState(""); // pasar a number
  const [passwordHistoryLimitLocalState, setPasswordHistoryLimitLocalState] =
    useState(""); // pasar a number
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

  useEffect(() => {
    setRequireUpperCaseLocalState(requireUpperCasePasswordPolicyState);
    setRequireLowerCaseLocalState(requireLowerCasePasswordPolicyState);
    setRequireNumbersLocalState(requireNumbersPasswordPolicyState);
    setRequireSpecialCharactersLocalState(
      requireSpecialCharactersPasswordPolicyState
    );
  }, [
    requireUpperCasePasswordPolicyState,
    requireLowerCasePasswordPolicyState,
    requireNumbersPasswordPolicyState,
    requireSpecialCharactersPasswordPolicyState,
  ]);

  const handleClickSubmit = async () => {};

  return (
    <div>
      {!minLenghtPasswordPolicyState ||
      !requireUpperCasePasswordPolicyState ||
      !requireLowerCasePasswordPolicyState ||
      !requireNumbersPasswordPolicyState ||
      !requireSpecialCharactersPasswordPolicyState ||
      !passwordExpiryDaysPasswordPolicyState ||
      !inactivityDaysPasswordPolicyState ||
      !passwordHistoryLimitPasswordPolicyState ? (
        <CustomSpin />
      ) : (
        <>
          {showErrorMessageAdmin && (
            <CustomMessage
              typeMessage="error"
              message={errorsState?.toString() || "¡Error en la petición!"}
            />
          )}

          {showSuccessMessage && (
            <CustomMessage
              typeMessage="success"
              message={successMessage || "¡Actualizado con éxito!"}
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
            setMinLenghtPasswordLocalState={setMinLenghtPasswordLocalState}
            setPasswordExpiryDaysLocalState={setPasswordExpiryDaysLocalState}
            setInactivityDaysLocalState={setInactivityDaysLocalState}
            setPasswordHistoryLimitLocalState={
              setPasswordHistoryLimitLocalState
            }
            setRequireUpperCaseLocalState={setRequireUpperCaseLocalState}
            setRequireLowerCaseLocalState={setRequireLowerCaseLocalState}
            setRequireNumbersLocalState={setRequireNumbersLocalState}
            setRequireSpecialCharactersLocalState={
              setRequireSpecialCharactersLocalState
            }
            handleClickSubmit={handleClickSubmit}
          />
        </>
      )}
    </div>
  );
};

export default ManagePasswordForm;
