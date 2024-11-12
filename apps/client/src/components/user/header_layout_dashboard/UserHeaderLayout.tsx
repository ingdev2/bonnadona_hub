"use client";

import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { signOut } from "next-auth/react";

import CustomDropdown from "@/components/common/custom_dropdown/CustomDropdown";
import CustomSpin from "@/components/common/custom_spin/CustomSpin";
import { FaSignOutAlt } from "react-icons/fa";
import { UserOutlined } from "@ant-design/icons";
import { getFirstName } from "@/helpers/get_first_name/get_first_name";
import { resetLoginStateUser } from "@/redux/features/login/userLoginSlice";
import { setDefaultValuesUser } from "@/redux/features/user/userSlice";

const UserHeaderLayout: React.FC = () => {
  const dispatch = useAppDispatch();

  const nameUserState = useAppSelector((state) => state.user.name);
  const lastNameUserState = useAppSelector((state) => state.user.last_name);

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
          titleCustomDropdown={`Hola, ${getFirstName(nameUserState)} ${getFirstName(
            lastNameUserState
          )}`}
          iconCustomItem1={<FaSignOutAlt />}
          titleCustomItem1="Cerrar Sesión"
          handleClickCustomItem1={handleClickSignOut}
          iconCustomDropdown={<UserOutlined />}
        />
      )}
    </>
  );
};

export default UserHeaderLayout;
