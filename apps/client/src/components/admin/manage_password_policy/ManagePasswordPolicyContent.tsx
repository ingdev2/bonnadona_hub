import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";

import CustomDashboardLayoutAdmins from "@/components/common/custom_dashboard_layout_admins/CustomDashboardLayoutAdmins";

import { useGetPasswordPolicyQuery } from "@/redux/apis/password_policy/passwordPolicyApi";
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
import ManagePasswordPolicyForm from "./manage_password_policy_form/ManagePasswordPolicyForm";

const ManagePasswordPolicyContent: React.FC = () => {
  const dispatch = useAppDispatch();

  const selectedKeyState = useAppSelector((state) => state.modal.selectedKey);

  const {
    data: getPasswordPolicyData,
    isLoading: getPasswordPolicyLoading,
    isFetching: getPasswordPolicyFetching,
    error: getPasswordPolicyError,
    refetch: getPasswordPolicyRefetch,
  } = useGetPasswordPolicyQuery(null);

  useEffect(() => {
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

    // if (selectedKeyState !== ItemKeys.SUB_MANAGE_PASSWORD_KEY) {
    //   dispatch(setSelectedKey(ItemKeys.SUB_MANAGE_PASSWORD_KEY));
    // }
  }, [getPasswordPolicyData]);

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
            <ManagePasswordPolicyForm />
          </div>
        }
      />
    </div>
  );
};

export default ManagePasswordPolicyContent;
