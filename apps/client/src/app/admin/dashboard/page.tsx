"use client";

import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { redirect } from "next/navigation";

import { useGetUserActiveByIdNumberQuery } from "@/redux/apis/users/userApi";
import {
  setIdNumberUser,
  setIdUser,
  setLastNameUser,
  setLastPasswordUpdateUser,
  setNameUser,
  setPrincipalEmailUser,
} from "@/redux/features/user/userSlice";
import {
  setAdminModalIsOpen,
  setIsPageLoading,
  setSelectedKey,
} from "@/redux/features/common/modal/modalSlice";

import { useRoleValidation } from "@/utils/hooks/use_role_validation";
import useAuthValidationAdmin from "@/utils/hooks/use_auth_validation_admin";
import { usePermissionsAppAndModuleValidationInPage } from "@/utils/hooks/use_permissions_app_and_module_validation_in_page";

import { ItemKeys } from "@/components/common/custom_dashboard_layout_admins/enums/item_names_and_keys.enums";
import CustomMessage from "@/components/common/custom_messages/CustomMessage";
import CustomSpin from "@/components/common/custom_spin/CustomSpin";
import AllUsersContent from "@/components/admin/all_users/AllUsersContent";

import { RolesEnum } from "@/utils/enums/roles/roles.enum";
import { ApplicationsEnum } from "@/utils/enums/permissions/applications/applications.enum";
import { ApplicationModulesEnum } from "@/utils/enums/permissions/application_modules/application_modules.enum";

const HomePage = () => {
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
    allowedModules: [ApplicationModulesEnum.BONNA_HUB_ALL_USERS],
  });

  const idUserSessionState = useAppSelector((state) => state.user.id);
  const idNumberUserSessionState = useAppSelector(
    (state) => state.user.id_number
  );

  const adminModalState = useAppSelector(
    (state) => state.modal.adminModalIsOpen
  );

  const isPageLoadingState = useAppSelector(
    (state) => state.modal.isPageLoading
  );

  const selectedKeyState = useAppSelector((state) => state.modal.selectedKey);

  const [showErrorMessage, setShowErrorMessage] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const {
    data: userActiveDatabyIdNumberData,
    isLoading: userActiveDatabyIdNumberLoading,
    isFetching: userActiveDatabyIdNumberFetching,
    isError: userActiveDatabyIdNumberError,
  } = useGetUserActiveByIdNumberQuery(session?.user.id_number ?? 0, {
    skip: !session?.user.id_number,
  });

  useEffect(() => {
    if (!idNumberUserSessionState && status === "authenticated") {
      dispatch(setIdNumberUser(idNumberUserSession));
    }

    if (status === "unauthenticated") {
      setShowErrorMessage(true);
      setErrorMessage("¡No autenticado!");
      redirect("/login_admin");
    }
    if (userActiveDatabyIdNumberData && !idUserSessionState) {
      dispatch(setIdUser(userActiveDatabyIdNumberData?.id));
      dispatch(setNameUser(userActiveDatabyIdNumberData?.name));
      dispatch(setLastNameUser(userActiveDatabyIdNumberData?.last_name));
      dispatch(
        setPrincipalEmailUser(userActiveDatabyIdNumberData?.principal_email)
      );
      dispatch(
        setLastPasswordUpdateUser(
          userActiveDatabyIdNumberData?.last_password_update
        )
      );
    }
    if (adminModalState) {
      dispatch(setAdminModalIsOpen(false));
    }
    if (isPageLoadingState) {
      dispatch(setIsPageLoading(false));
    }
    if (isPageLoadingState && selectedKeyState !== ItemKeys.SUB_USERS_KEY) {
      dispatch(setIsPageLoading(false));
      dispatch(setSelectedKey(ItemKeys.SUB_USERS_KEY));
    }
  }, [
    idNumberUserSessionState,
    userActiveDatabyIdNumberData,
    idUserSessionState,
    adminModalState,
    isPageLoadingState,
  ]);

  return (
    <div className="dashboard-admin">
      {showErrorMessage && (
        <CustomMessage
          typeMessage="error"
          message={errorMessage || "¡Error en la petición!"}
        />
      )}

      {!idNumberUserSessionState || status === "unauthenticated" ? (
        <CustomSpin />
      ) : (
        <div className="dashboard-admin-content">
          <AllUsersContent />
        </div>
      )}
    </div>
  );
};

export default HomePage;
