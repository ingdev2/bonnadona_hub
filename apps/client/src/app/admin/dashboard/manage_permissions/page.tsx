"use client";

import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import useAuthValidationAdmin from "@/utils/hooks/use_auth_validation_admin";
import { useRoleValidation } from "@/utils/hooks/use_role_validation";
import { usePermissionsAppAndModuleValidationInPage } from "@/utils/hooks/use_permissions_app_and_module_validation_in_page";

import ManagePermissionsContent from "@/components/admin/manage_permissions/ManagePermissionsContent";
import CustomMessage from "@/components/common/custom_messages/CustomMessage";
import CustomSpin from "@/components/common/custom_spin/CustomSpin";

import { setIdNumberUser } from "@/redux/features/user/userSlice";

import { RolesEnum } from "@/utils/enums/roles/roles.enum";
import { ApplicationsEnum } from "@/utils/enums/permissions/applications/applications.enum";
import { ApplicationModulesEnum } from "@/utils/enums/permissions/application_modules/application_modules.enum";

const ManagePermissionsPage: React.FC = () => {
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

  // usePermissionsAppAndModuleValidationInPage({
  //   allowedApplications: [ApplicationsEnum.BONNA_HUB],
  //   allowedModules: [ApplicationModulesEnum.BONNA_HUB_MANAGE_PERMISSIONS],
  // });

  const idNumberUserSessionState = useAppSelector(
    (state) => state.user.id_number
  );

  const [showErrorMessage, setShowErrorMessage] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    if (!idNumberUserSessionState && status === "authenticated") {
      dispatch(setIdNumberUser(idNumberUserSession));
    }
  }, [status, idNumberUserSessionState]);

  return (
    <div className="home-page">
      {showErrorMessage && (
        <CustomMessage
          typeMessage="error"
          message={errorMessage || "¡Error en la petición!"}
        />
      )}

      {!idNumberUserSessionState || status === "unauthenticated" ? (
        <CustomSpin />
      ) : (
        <div className="dashboard-manage-permissions-content">
          <ManagePermissionsContent />
        </div>
      )}
    </div>
  );
};

export default ManagePermissionsPage;
