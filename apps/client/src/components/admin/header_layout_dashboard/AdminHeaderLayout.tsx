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

import { setResetModalAdmin } from "@/redux/features/common/modal/modalSlice";
import { resetLoginStateAdmin } from "@/redux/features/login/adminLoginSlice";
import {
  setDefaultValuesUser,
  setLastNameUser,
  setNameUser,
} from "@/redux/features/user/userSlice";

import { useGetUserActiveByIdNumberQuery } from "@/redux/apis/users/userApi";

const AdminHeaderLayout: React.FC = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const idNumberAdminState = useAppSelector((state) => state.user.id_number);

  const nameUserState = useAppSelector((state) => state.user.name);
  const lastNameUserState = useAppSelector((state) => state.user.last_name);

  const {
    data: userActiveDatabyIdNumberData,
    isLoading: userActiveDatabyIdNumberLoading,
    isFetching: userActiveDatabyIdNumberFetching,
    isError: userActiveDatabyIdNumberError,
  } = useGetUserActiveByIdNumberQuery(idNumberAdminState, {
    skip: !idNumberAdminState,
  });

  useEffect(() => {
    if (
      !nameUserState ||
      (!lastNameUserState && userActiveDatabyIdNumberData)
    ) {
      dispatch(setNameUser(userActiveDatabyIdNumberData?.name));
      dispatch(setLastNameUser(userActiveDatabyIdNumberData?.last_name));
    }
  }, [userActiveDatabyIdNumberData, nameUserState, lastNameUserState]);

  const handleClickUpdatePersonalData = async () => {
    try {
      await router.push("/admin/dashboard/personal_data", {
        scroll: true,
      });
    } catch (error) {
      console.error(error);
    } finally {
    }
  };

  const handleClickSignOut = async () => {
    try {
      dispatch(resetLoginStateAdmin());
      dispatch(setDefaultValuesUser());
      dispatch(setResetModalAdmin());

      await signOut({
        redirect: true,
        callbackUrl: "/login_admin",
      });
    } catch (error) {
      console.error(error);
    } finally {
      await signOut();
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
          titleCustomItem1="Mis Datos Personales"
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
