"use client";

import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { redirect } from "next/navigation";

import { setIdNumberUser } from "@/redux/features/user/userSlice";
import {
  setAdminModalIsOpen,
  setIsPageLoading,
} from "@/redux/features/common/modal/modalSlice";

import { useRoleValidation } from "@/utils/hooks/use_role_validation";
import useAuthValidationAdmin from "@/utils/hooks/use_auth_validation_admin";
import { usePermissionsAppAndModuleValidationInPage } from "@/utils/hooks/use_permissions_app_and_module_validation_in_page";

import ManagePasswordPolicyContent from "@/components/admin/manage_password_policy/ManagePasswordPolicyContent";
import CustomMessage from "@/components/common/custom_messages/CustomMessage";
import CustomSpin from "@/components/common/custom_spin/CustomSpin";

import { RolesEnum } from "@/utils/enums/roles/roles.enum";
import { ApplicationsEnum } from "@/utils/enums/permissions/applications/applications.enum";
import { ApplicationModulesEnum } from "@/utils/enums/permissions/application_modules/application_modules.enum";

const ManagePasswordPolicy = () => {
  const { data: session, status } = useSession();
  const dispatch = useAppDispatch();

  const idNumberUserSession = session?.user?.id_number;

  useAuthValidationAdmin();

  const allowedRoles = [
    RolesEnum.SUPER_ADMIN,
    RolesEnum.ADMIN,
    RolesEnum.AUDITOR,
  ];
  useRoleValidation(allowedRoles);

  usePermissionsAppAndModuleValidationInPage({
    allowedApplications: [ApplicationsEnum.BONNA_HUB],
    allowedModules: [ApplicationModulesEnum.BONNA_HUB_MANAGE_PASSWORD_POLICY],
  });

  const idNumberUserSessionState = useAppSelector(
    (state) => state.user.id_number
  );

  const adminModalState = useAppSelector(
    (state) => state.modal.adminModalIsOpen
  );
  const isPageLoadingState = useAppSelector(
    (state) => state.modal.isPageLoading
  );

  const [showErrorMessage, setShowErrorMessage] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    if (!idNumberUserSessionState && status === "authenticated") {
      dispatch(setIdNumberUser(idNumberUserSession));
    }
    if (status === "unauthenticated") {
      setShowErrorMessage(true);
      setErrorMessage("¡No autenticado!");
      redirect("/login_admin");
    }
    if (isPageLoadingState) {
      dispatch(setIsPageLoading(false));
    }
  }, [idNumberUserSessionState, status, adminModalState, isPageLoadingState]);

  return (
    <div>
      {showErrorMessage && (
        <CustomMessage
          typeMessage="error"
          message={errorMessage || "¡Error en la petición!"}
        />
      )}

      {!idNumberUserSessionState || status === "unauthenticated" ? (
        <CustomSpin />
      ) : (
        <div className="dashboard-manage-password-policy-content">
          <ManagePasswordPolicyContent />
        </div>
      )}
    </div>
  );
};

export default ManagePasswordPolicy;
