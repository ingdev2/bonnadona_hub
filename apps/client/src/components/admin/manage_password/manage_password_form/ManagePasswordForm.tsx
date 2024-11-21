import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";

const ManagePasswordForm: React.FC = () => {
  const dispatch = useAppDispatch();

  const NOT_REGISTER: string = "NO REGISTRA";

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

  const inactivityDaysEmailPasswordPolicyState = useAppSelector(
    (state) => state.passwordPolicy.inactivity_days
  );

  const passwordHistoryLimitEmailPasswordPolicyState = useAppSelector(
    (state) => state.passwordPolicy.password_history_limit
  );

  const errorsState = useAppSelector((state) => state.passwordPolicy.errors);

  
  return <div>aqui muestro la vista de politicas de contraseña</div>;
};

export default ManagePasswordForm;
