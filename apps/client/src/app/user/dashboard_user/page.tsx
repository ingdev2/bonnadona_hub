"use client";

import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { redirect } from "next/navigation";

import { RolesEnum } from "@/utils/enums/roles/roles.enum";
import { useRoleValidation } from "@/utils/hooks/use_role_validation";

import AllAppsContent from "@/components/user/all_apps/AllAppsContent";
import CustomMessage from "@/components/common/custom_messages/CustomMessage";
import {
  useGetUserActiveByEmailQuery,
  useGetUserActiveByIdNumberQuery,
} from "@/redux/apis/users/userApi";
import {
  setIdUser,
  setLastNameUser,
  setLastPasswordUpdateUser,
  setNameUser,
  setPrincipalEmailUser,
} from "@/redux/features/user/userSlice";
import {
  setUserModalIsOpen,
  setIsPageLoading,
} from "@/redux/features/common/modal/modalSlice";
import CustomSpin from "@/components/common/custom_spin/CustomSpin";

const AllAppsPage: React.FC = () => {
  const { data: session, status } = useSession();
  const dispatch = useAppDispatch();

  const principalEmailUserLoginState = useAppSelector(
    (state) => state.userLogin.principal_email
  );

  const principalEmailUserState = useAppSelector(
    (state) => state.user.principal_email
  );

  const collaboratorModalState = useAppSelector(
    (state) => state.modal.userModalIsOpen
  );

  const isPageLoadingState = useAppSelector(
    (state) => state.modal.isPageLoading
  );

  const allowedRoles = [RolesEnum.COLLABORATOR];
  useRoleValidation(allowedRoles);

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
    if (!principalEmailUserState && userActiveDatabyIdNumberData) {
      dispatch(
        setPrincipalEmailUser(userActiveDatabyIdNumberData?.principal_email)
      );
      dispatch(setIdUser(userActiveDatabyIdNumberData?.id));
      dispatch(setNameUser(userActiveDatabyIdNumberData?.name));
      dispatch(setLastNameUser(userActiveDatabyIdNumberData?.last_name));
      dispatch(
        setLastPasswordUpdateUser(
          userActiveDatabyIdNumberData?.last_password_update
        )
      );
    }
    if (!principalEmailUserLoginState) {
      setShowErrorMessage(true);
      setErrorMessage("¡Usuario no encontrado!");
      redirect("/login");
    }
    if (status === "unauthenticated") {
      setShowErrorMessage(true);
      setErrorMessage("¡No autenticado!");
      redirect("/login");
    }
    if (collaboratorModalState) {
      dispatch(setUserModalIsOpen(false));
    }
    if (isPageLoadingState) {
      dispatch(setIsPageLoading(false));
    }
  }, [
    userActiveDatabyIdNumberData,
    principalEmailUserState,
    session,
    status,
    collaboratorModalState,
    isPageLoadingState,
  ]);

  return (
    <div className="dasboard-user">
      {showErrorMessage && (
        <CustomMessage
          typeMessage="error"
          message={errorMessage || "¡Error en la petición!"}
        />
      )}

      {!principalEmailUserLoginState || status === "unauthenticated" ? (
        <CustomSpin />
      ) : (
        <div className="dashboard-all-apps-content">
          <AllAppsContent />
        </div>
      )}
    </div>
  );
};

export default AllAppsPage;
