"use client";

import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { redirect } from "next/navigation";

import { RolesEnum } from "@/utils/enums/roles/roles.enum";
import { useRoleValidation } from "@/utils/hooks/use_role_validation";

import AllAppsContent from "@/components/user/all_apps/AllAppsContent";
import CustomMessage from "@/components/common/custom_messages/CustomMessage";
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
  setCollaboratorModalIsOpen,
  setIsPageLoading,
} from "@/redux/features/common/modal/modalSlice";
import CustomSpin from "@/components/common/custom_spin/CustomSpin";
import useAuthValidation from "@/utils/hooks/use_auth_validation";

const AllAppsPage = () => {
  const { data: session, status } = useSession();
  const dispatch = useAppDispatch();

  const idNumberUserSession = session?.user?.id_number;

  useAuthValidation();

  const allowedRoles = [RolesEnum.COLLABORATOR];
  useRoleValidation(allowedRoles);

  const idUserSessionState = useAppSelector((state) => state.user.id);
  const idNumberUserSessionState = useAppSelector(
    (state) => state.user.id_number
  );

  const collaboratorModalState = useAppSelector(
    (state) => state.modal.collaboratorModalIsOpen
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
    if (!idNumberUserSessionState && status === "authenticated") {
      dispatch(setIdNumberUser(idNumberUserSession));
    }
    if (status === "unauthenticated") {
      setShowErrorMessage(true);
      setErrorMessage("¡No autenticado!");
      redirect("/login");
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
    if (collaboratorModalState) {
      dispatch(setCollaboratorModalIsOpen(false));
    }
    if (isPageLoadingState) {
      dispatch(setIsPageLoading(false));
    }
  }, [
    idNumberUserSessionState,
    userActiveDatabyIdNumberData,
    idUserSessionState,
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

      {!idNumberUserSessionState || status === "unauthenticated" ? (
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
