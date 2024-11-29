"use client";

import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";

import { setPrincipalEmailUser } from "@/redux/features/user/userSlice";
import {
  setAdminModalIsOpen,
  setIsPageLoading,
} from "@/redux/features/common/modal/modalSlice";

import { RolesEnum } from "@/utils/enums/roles/roles.enum";
import { useRoleValidation } from "@/utils/hooks/use_role_validation";

import { useGetUserActiveByIdNumberQuery } from "@/redux/apis/users/userApi";
import CustomMessage from "@/components/common/custom_messages/CustomMessage";
import CustomSpin from "@/components/common/custom_spin/CustomSpin";
import AllUsersContent from "@/components/admin/all_users/AllUsersContent";

const AllUsersPage = () => {
  const { data: session, status } = useSession();
  const dispatch = useAppDispatch();

  const allowedRoles = [
    RolesEnum.SUPER_ADMIN,
    RolesEnum.ADMIN,
    RolesEnum.AUDITOR,
  ];
  useRoleValidation(allowedRoles);

  const principalEmailAdminLoginState = useAppSelector(
    (state) => state.adminLogin.principal_email
  );

  const principalEmailAdminState = useAppSelector(
    (state) => state.user.principal_email
  );

  const adminModalState = useAppSelector(
    (state) => state.modal.adminModalIsOpen
  );
  const isPageLoadingState = useAppSelector(
    (state) => state.modal.isPageLoading
  );

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
    if (!principalEmailAdminState && userActiveDatabyIdNumberData) {
      dispatch(
        setPrincipalEmailUser(userActiveDatabyIdNumberData?.principal_email)
      );
    }
    if (!principalEmailAdminLoginState) {
      setShowErrorMessage(true);
      setErrorMessage("¡Usuario no encontrado!");
      redirect("/login_admin");
    }
    if (status === "unauthenticated") {
      setShowErrorMessage(true);
      setErrorMessage("¡No autenticado!");
      redirect("/login_admin");
    }
    if (adminModalState) {
      dispatch(setAdminModalIsOpen(false));
    }
    if (isPageLoadingState) {
      dispatch(setIsPageLoading(false));
    }
  }, [
    principalEmailAdminState,
    principalEmailAdminLoginState,
    status,
    adminModalState,
    isPageLoadingState,
  ]);

  return (
    <div>
      {showErrorMessage && (
        <CustomMessage
          typeMessage="error"
          message={errorMessage || "¡Error en la petición!"}
        />
      )}

      {!principalEmailAdminLoginState || status === "unauthenticated" ? (
        <CustomSpin />
      ) : (
        <div className="dashboard-admin-content">
          <AllUsersContent />
        </div>
      )}
    </div>
  );
};

export default AllUsersPage;
