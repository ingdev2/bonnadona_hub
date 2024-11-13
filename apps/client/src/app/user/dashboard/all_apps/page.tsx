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
  setNameUser,
  setPrincipalEmailUser,
} from "@/redux/features/user/userSlice";
import {
  setCollaboratorModalIsOpen,
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

  const modalIsOpenCollaborator = useAppSelector(
    (state) => state.modal.collaboratorModalIsOpen
  );

  const isPageLoadingState = useAppSelector(
    (state) => state.modal.isPageLoading
  );

  const allowedRoles = [RolesEnum.COLLABORATOR];
  useRoleValidation(allowedRoles);

  const [showErrorMessage, setShowErrorMessage] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  // const {
  //   data: userActiveDatabyIdNumber,
  //   isLoading: userActiveLoading,
  //   isFetching: userActiveFetching,
  //   error: userActiveError,
  // } = useGetUserActiveByEmailQuery(principalEmailUserLoginState);

  const {
    data: userActiveDatabyIdNumber,
    isLoading: userActiveDatabyIdNumberLoading,
    isFetching: userActiveDatabyIdNumberFetching,
    isError: userActiveDatabyIdNumberError,
  } = useGetUserActiveByIdNumberQuery(session?.user.id_number ?? 0, {
    skip: !session?.user.id_number,
  });

  useEffect(() => {
    console.log("session: ", session);
    if (!principalEmailUserState && userActiveDatabyIdNumber) {
      dispatch(
        setPrincipalEmailUser(userActiveDatabyIdNumber?.principal_email)
      );
      dispatch(setIdUser(userActiveDatabyIdNumber?.id));
      dispatch(setNameUser(userActiveDatabyIdNumber?.name));
      dispatch(setLastNameUser(userActiveDatabyIdNumber?.last_name));
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
    if (modalIsOpenCollaborator) {
      dispatch(setCollaboratorModalIsOpen(false));
    }
    if (isPageLoadingState) {
      dispatch(setIsPageLoading(false));
    }
  }, [
    userActiveDatabyIdNumber,
    principalEmailUserState,
    session,
    status,
    modalIsOpenCollaborator,
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
