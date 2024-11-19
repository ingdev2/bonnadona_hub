"use client";

import React, { useEffect } from "react";
import { useSession } from "next-auth/react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { setIsPageLoading } from "@/redux/features/common/modal/modalSlice";
import AdminLoginForm from "@/components/auth/admin/admin_login_form/AdminLoginForm";

const AdminsLoginPage: React.FC = () => {
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
    <div className="admins-login">
      <AdminLoginForm />
    </div>
  );
};

export default AdminsLoginPage;
