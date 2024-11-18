"use client";

import React, { useEffect } from "react";
import { useSession } from "next-auth/react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { setIsPageLoading } from "@/redux/features/common/modal/modalSlice";

import CollaboratorUserLoginForm from "@/components/auth/user/collaborator_user_login_form/CollaboratorUserLoginForm";

const UsersLoginPage: React.FC = () => {
  const { data: session, status } = useSession();
  const dispatch = useAppDispatch();

  const isPageLoadingState = useAppSelector(
    (state) => state.modal.isPageLoading
  );

  useEffect(() => {
    if (isPageLoadingState && status === "unauthenticated") {
      dispatch(setIsPageLoading(false));
    }
  }, [status, isPageLoadingState]);

  return (
    <>
      <CollaboratorUserLoginForm />
    </>
  );
};

export default UsersLoginPage;
