"use client";

import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { useSession } from "next-auth/react";

import { RolesEnum } from "@/utils/enums/roles/roles.enum";
import { useRoleValidation } from "@/utils/hooks/use_role_validation";
import { setIdNumberUser } from "@/redux/features/user/userSlice";
import CustomMessage from "@/components/common/custom_messages/CustomMessage";
import CustomSpin from "@/components/common/custom_spin/CustomSpin";
import UserPersonalDataContent from "@/components/admin/personal_data/userPersonalDataContent";

const UserPersonalDataPage = () => {
  const { data: session, status } = useSession();
  const dispatch = useAppDispatch();

  const idNumberUserSession = session?.user?.id_number;

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

  return (<div className="home-page">
    {showErrorMessage && (
      <CustomMessage
        typeMessage="error"
        message={errorMessage || "¡Error en la petición!"}
      />
    )}

    {!idNumberUserSessionState || status === "unauthenticated" ? (
      <CustomSpin />
    ) : (
      <div className="dashboard-user-personal-data-content">
        <UserPersonalDataContent />
      </div>
    )}
  </div>)
};

export default UserPersonalDataPage;
