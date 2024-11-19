"use client";

import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { getFirstName } from "@/helpers/get_first_name/get_first_name";

import CustomDropdown from "@/components/common/custom_dropdown/CustomDropdown";
import CustomSpin from "@/components/common/custom_spin/CustomSpin";
import { FaSignOutAlt } from "react-icons/fa";
import { PiUserListBold } from "react-icons/pi";
import { UserOutlined } from "@ant-design/icons";

import {
  setDefaultValuesUser,
  setLastNameUser,
  setNameUser,
} from "@/redux/features/user/userSlice";

import { setResetModalAdmin } from "@/redux/features/common/modal/modalSlice";
import { resetLoginAdminState } from "@/redux/features/login/adminLoginSlice";

const AdminHeaderLayout: React.FC = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const idNumberAdminState = useAppSelector(
    (state) => state.adminLogin.id_number
  );

  const nameAdminState = useAppSelector((state) => state.user.name);
  const lastNameAdminState = useAppSelector((state) => state.user.last_name);

  const handleClickUpdatePersonalData = async () => {
    try {
      // await router.push("/admin/dashboard/personal_data", {
      //   scroll: true,
      // });
    } catch (error) {
      console.error(error);
    } finally {
    }
  };

  const handleClickSignOut = () => {
    try {
      dispatch(resetLoginAdminState());
      dispatch(setDefaultValuesUser());
      // dispatch(setDefaultValuesUserPatient());
      // dispatch(setDefaultValuesUserEps());
      // dispatch(setDefaultValuesUserFamiliar());
      // dispatch(setDefaultValuesMedicalReq());
      dispatch(setResetModalAdmin());
      signOut({
        redirect: true,
        callbackUrl: "/login_admin",
      });
    } catch (error) {
      console.error(error);
    } finally {
    }
  };

  return (
    <>
      {!nameAdminState && !lastNameAdminState ? (
        <CustomSpin />
      ) : (
        <CustomDropdown
          titleCustomDropdown={`${getFirstName(nameAdminState)} ${getFirstName(
            lastNameAdminState
          )}`}
          iconCustomItem1={<PiUserListBold />}
          titleCustomItem1="Mis Datos"
          iconCustomItem2={<FaSignOutAlt />}
          titleCustomItem2="Cerrar Sesión"
          handleClickCustomItem1={handleClickUpdatePersonalData}
          handleClickCustomItem2={handleClickSignOut}
          iconCustomDropdown={<UserOutlined />}
        />
      )}
    </>
  );
};

export default AdminHeaderLayout;
