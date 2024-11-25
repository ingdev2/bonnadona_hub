import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";

import CustomDashboardLayoutAdmins from "@/components/common/custom_dashboard_layout_admins/CustomDashboardLayoutAdmins";

import {
  useGetPasswordPolicyQuery,
  useUpdatePasswordPolicyMutation,
} from "@/redux/apis/password_policy/passwordPolicyApi";
import {
  setInactivityDaysPasswordPolicy,
  setMinLenghtPasswordPolicy,
  setPasswordExpiryDaysPasswordPolicy,
  setPasswordHistoryLimitPasswordPolicy,
  setRequireLowerCasePasswordPolicy,
  setRequireNumbersPasswordPolicy,
  setRequireSpecialCharactersPasswordPolicy,
  setRequireUpperCasePasswordPolicy,
} from "@/redux/features/password_policy/passwordPolicySlice";
import { ItemKeys } from "@/components/common/custom_dashboard_layout_admins/enums/item_names_and_keys.enums";
import { setSelectedKey } from "@/redux/features/common/modal/modalSlice";
import ManagePasswordForm from "./manage_password_form/ManagePasswordForm";

const ManagePasswordContent: React.FC = () => {
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

  const selectedKeyState = useAppSelector((state) => state.modal.selectedKey);

  const {
    data: getPasswordPolicyData,
    isLoading: getPasswordPolicyLoading,
    isFetching: getPasswordPolicyFetching,
    error: getPasswordPolicyError,
    refetch: getPasswordPolicyRefetch,
  } = useGetPasswordPolicyQuery(null);

  useEffect(
    () => {
      if (getPasswordPolicyData) {
        dispatch(setMinLenghtPasswordPolicy(getPasswordPolicyData.min_length));
        dispatch(
          setRequireUpperCasePasswordPolicy(
            getPasswordPolicyData.require_uppercase
          )
        );
        dispatch(
          setRequireLowerCasePasswordPolicy(
            getPasswordPolicyData.require_lowercase
          )
        );
        dispatch(
          setRequireNumbersPasswordPolicy(getPasswordPolicyData.require_numbers)
        );
        dispatch(
          setRequireSpecialCharactersPasswordPolicy(
            getPasswordPolicyData.require_special_characters
          )
        );
        dispatch(
          setPasswordExpiryDaysPasswordPolicy(
            getPasswordPolicyData.password_expiry_days
          )
        );
        dispatch(
          setInactivityDaysPasswordPolicy(getPasswordPolicyData.inactivity_days)
        );
        dispatch(
          setPasswordHistoryLimitPasswordPolicy(
            getPasswordPolicyData.password_history_limit
          )
        );
      }

      if (selectedKeyState !== ItemKeys.SUB_MANAGE_PASSWORD_KEY) {
        dispatch(setSelectedKey(ItemKeys.SUB_MANAGE_PASSWORD_KEY));
      }
    },
    [
      getPasswordPolicyData,
      minLenghtPasswordPolicyState,
      requireUpperCasePasswordPolicyState,
      requireLowerCasePasswordPolicyState,
      requireNumbersPasswordPolicyState,
      requireSpecialCharactersPasswordPolicyState,
      passwordExpiryDaysPasswordPolicyState,
      inactivityDaysPasswordPolicyState,
      passwordHistoryLimitPasswordPolicyState,
    ]
  );

  return (
    <div>
      <CustomDashboardLayoutAdmins
        customLayoutContent={
          <div
            style={{
              width: "80%",
              display: "flex",
              flexFlow: "column wrap",
            }}
          >
            <ManagePasswordForm />
          </div>
        }
      />
    </div>
  );
};

export default ManagePasswordContent;
