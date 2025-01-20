"use client";

import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";

import CustomDashboardLayoutAdmins from "@/components/common/custom_dashboard_layout_admins/CustomDashboardLayoutAdmins";
import ChangePasswordModal from "@/components/common/change_password_modal/ChangePasswordModal";
import ManagePasswordPolicyForm from "./manage_password_policy_form/ManagePasswordPolicyForm";

import { useGetPasswordPolicyQuery } from "@/redux/apis/password_policy/passwordPolicyApi";

import {
  setInactivityDaysPasswordPolicy,
  setMaximunMinutesOfInactivityInApp,
  setMinLenghtPasswordPolicy,
  setPasswordExpiryDaysPasswordPolicy,
  setPasswordHistoryLimitPasswordPolicy,
  setRequireLowerCasePasswordPolicy,
  setRequireNumbersPasswordPolicy,
  setRequireSpecialCharactersPasswordPolicy,
  setRequireUpperCasePasswordPolicy,
} from "@/redux/features/password_policy/passwordPolicySlice";
import { setChangePasswordExpiryModalIsOpen } from "@/redux/features/common/modal/modalSlice";

import { checkPasswordExpiry } from "@/helpers/check_password_expiry/CheckPasswordExpiry";

const ManagePasswordPolicyContent: React.FC = () => {
  const dispatch = useAppDispatch();

  const lastPasswordUpdateCollaboratorState = useAppSelector(
    (state) => state.user.last_password_update
  );

  const modalIsOpenChangePasswordExpiry = useAppSelector(
    (state) => state.modal.changePasswordExpiryModalIsOpen
  );

  const {
    data: passwordPolicyData,
    isLoading: passwordPolicyLoading,
    isFetching: passwordPolicyFetching,
    error: passwordPolicyError,
    refetch: passwordPolicyRefetch,
  } = useGetPasswordPolicyQuery(null);

  useEffect(() => {
    if (
      passwordPolicyData &&
      passwordPolicyData.password_expiry_days &&
      lastPasswordUpdateCollaboratorState &&
      checkPasswordExpiry(
        lastPasswordUpdateCollaboratorState,
        passwordPolicyData.password_expiry_days
      )
    ) {
      dispatch(setChangePasswordExpiryModalIsOpen(true));
    } else {
      dispatch(setChangePasswordExpiryModalIsOpen(false));
    }

    if (passwordPolicyData) {
      dispatch(setMinLenghtPasswordPolicy(passwordPolicyData.min_length));
      dispatch(
        setRequireUpperCasePasswordPolicy(passwordPolicyData.require_uppercase)
      );
      dispatch(
        setRequireLowerCasePasswordPolicy(passwordPolicyData.require_lowercase)
      );
      dispatch(
        setRequireNumbersPasswordPolicy(passwordPolicyData.require_numbers)
      );
      dispatch(
        setRequireSpecialCharactersPasswordPolicy(
          passwordPolicyData.require_special_characters
        )
      );
      dispatch(
        setPasswordExpiryDaysPasswordPolicy(
          passwordPolicyData.password_expiry_days
        )
      );
      dispatch(
        setInactivityDaysPasswordPolicy(passwordPolicyData.inactivity_days)
      );
      dispatch(
        setPasswordHistoryLimitPasswordPolicy(
          passwordPolicyData.password_history_limit
        )
      );
      dispatch(
        setMaximunMinutesOfInactivityInApp(
          passwordPolicyData.maximum_minutes_of_inactivity_in_application
        )
      );
    }
  }, [passwordPolicyData, lastPasswordUpdateCollaboratorState]);

  return (
    <div>
      <div className="modal-check-password-expiry">
        {modalIsOpenChangePasswordExpiry && (
          <ChangePasswordModal
            titleModal={"Tu contraseña se ha expirado"}
            subtitleModal={"Debes actualizar tu contraseña:"}
          />
        )}
      </div>

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
