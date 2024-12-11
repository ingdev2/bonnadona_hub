import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";

import CustomDashboardLayoutAdmins from "@/components/common/custom_dashboard_layout_admins/CustomDashboardLayoutAdmins";
import { useGetUserSessionLogByEmailQuery } from "@/redux/apis/users/userApi";
import { useGetPasswordPolicyQuery } from "@/redux/apis/password_policy/passwordPolicyApi";
import {
  setChangePasswordExpiryModalIsOpen,
  setFirstLoginModalIsOpen,
} from "@/redux/features/common/modal/modalSlice";
import ChangePasswordModal from "@/components/common/change_password_modal/ChangePasswordModal";

const MainViewContent: React.FC = () => {
  const dispatch = useAppDispatch();

  const principalEmailAdminState = useAppSelector(
    (state) => state.user.principal_email
  );

  const lastPasswordUpdateAdminState = useAppSelector(
    (state) => state.user.last_password_update
  );

  const modalIsOpenFirstSuccessfullAdminLogin = useAppSelector(
    (state) => state.modal.firstSuccessLoginModalIsOpen
  );

  const modalIsOpenChangePasswordExpiry = useAppSelector(
    (state) => state.modal.changePasswordExpiryModalIsOpen
  );

  const {
    data: userSessionLogData,
    isLoading: userSessionLogLoading,
    isFetching: userSessionLogFetching,
    error: userSessionLogError,
  } = useGetUserSessionLogByEmailQuery(principalEmailAdminState, {
    skip: !principalEmailAdminState,
  });

  const {
    data: passwordPolicyData,
    isLoading: passwordPolicyLoading,
    isFetching: passwordPolicyFetching,
    error: passwordPolicyError,
  } = useGetPasswordPolicyQuery(null);

  const checkPasswordExpiry = (
    lastPasswordUpdate: string,
    expiryDays: number
  ): boolean => {
    const lastUpdateDate = new Date(lastPasswordUpdate);
    const today = new Date();

    const differenceInMs = today.getTime() - lastUpdateDate.getTime();

    const differenceInDays = Math.floor(differenceInMs / (1000 * 60 * 60 * 24));

    return differenceInDays >= expiryDays;
  };

  useEffect(() => {
    if (userSessionLogData?.successful_login_counter == 1) {
      dispatch(setFirstLoginModalIsOpen(true));
    } else {
      dispatch(setFirstLoginModalIsOpen(false));
    }

    if (
      passwordPolicyData &&
      passwordPolicyData.password_expiry_days &&
      lastPasswordUpdateAdminState &&
      checkPasswordExpiry(
        lastPasswordUpdateAdminState,
        passwordPolicyData.password_expiry_days
      )
    ) {
      dispatch(setChangePasswordExpiryModalIsOpen(true));
    } else {
      dispatch(setChangePasswordExpiryModalIsOpen(false));
    }
  }, [userSessionLogData, passwordPolicyData, lastPasswordUpdateAdminState]);

  return (
    <>
      <div className="admin-modal-firts-successfull-login">
        {modalIsOpenFirstSuccessfullAdminLogin && (
          <ChangePasswordModal
            titleModal={"Bienvenidos a Bonnadona Hub"}
            subtitleModal={
              "Debes actualizar tu contraseña si entras por primera vez:"
            }
          />
        )}
      </div>

      <div className="collaborator-modal-check-password-expiry">
        {modalIsOpenChangePasswordExpiry && (
          <ChangePasswordModal
            titleModal={"Tu contraseña se ha expirado"}
            subtitleModal={"Debes actualizar tu contraseña:"}
          />
        )}
      </div>

      <div className="custom-dashboard-layout-admin">
        <CustomDashboardLayoutAdmins
          customLayoutContent={<>Seleccione una opcion del menú</>}
        />
      </div>
    </>
  );
};

export default MainViewContent;
