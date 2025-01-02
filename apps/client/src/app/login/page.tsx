"use client";

import React, { useEffect } from "react";
import { useSession } from "next-auth/react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { setIsPageLoading } from "@/redux/features/common/modal/modalSlice";

import UserLoginForm from "@/components/auth/user/user_login_form/UserLoginForm";

const UsersLoginPage = () => {
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
    <div className="users-login">
      <UserLoginForm />
    </div>
  );
};

export default UsersLoginPage;
