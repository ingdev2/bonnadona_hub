"use client";

import React from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

import { getFirstName } from "@/helpers/get_first_name/get_first_name";

import CustomDropdown from "@/components/common/custom_dropdown/CustomDropdown";
import CustomSpin from "@/components/common/custom_spin/CustomSpin";

import { FaSignOutAlt } from "react-icons/fa";
import { UserOutlined } from "@ant-design/icons";
import { PiUserListBold } from "react-icons/pi";

import { resetLoginStateUser } from "@/redux/features/login/userLoginSlice";
import { setDefaultValuesUser } from "@/redux/features/user/userSlice";

const UserHeaderLayout: React.FC = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const nameUserState = useAppSelector((state) => state.user.name);
  const lastNameUserState = useAppSelector((state) => state.user.last_name);

  const handleClickUpdatePersonalData = async () => {
    try {
      await router.push("/user/dashboard/personal_data", {
        scroll: true,
      });
    } catch (error) {
      console.error(error);
    } finally {
    }
  };

  const handleClickSignOut = () => {
    try {
      dispatch(resetLoginStateUser());
      dispatch(setDefaultValuesUser());
      signOut({
        redirect: true,
        callbackUrl: "/login",
      });
    } catch (error) {
      console.error(error);
    } finally {
    }
  };

  return (
    <>
      {!nameUserState && !lastNameUserState ? (
        <CustomSpin />
      ) : (
        <CustomDropdown
          titleCustomDropdown={`HOLA, ${getFirstName(nameUserState)} ${getFirstName(
            lastNameUserState
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

export default UserHeaderLayout;
