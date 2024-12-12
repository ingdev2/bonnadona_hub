"use client";

import React from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

import { Col, Row } from "antd";
import CustomDropdown from "@/components/common/custom_dropdown/CustomDropdown";
import CustomSpin from "@/components/common/custom_spin/CustomSpin";

import { FaSignOutAlt } from "react-icons/fa";
import { UserOutlined } from "@ant-design/icons";
import { PiUserListBold } from "react-icons/pi";

import { resetLoginStateUser } from "@/redux/features/login/userLoginSlice";
import { setDefaultValuesUser } from "@/redux/features/user/userSlice";

import { getFirstName } from "@/helpers/get_first_name/get_first_name";

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
    <Row
      gutter={24}
      justify={"center"}
      align={"stretch"}
      style={{ width: "100%", height: "100%" }}
    >
      <Col
        span={6}
        style={{
          display: "flex",
          flexFlow: "column wrap",
          width: "100%",
          height: "100%",
          justifyContent: "flex-start",
          alignContent: "flex-start",
        }}
      >
        <a
          className="custom-layout-logo-header-patient"
          style={{
            display: "flex",
            alignContent: "center",
            alignItems: "center",
            justifyContent: "center",
            width: "100%",
            height: "100%",
            backgroundColor: "#f2f2f2",
            overflow: "hidden",
          }}
          onClick={() => {
            router.replace("/user/dashboard", { scroll: true });
          }}
        >
          <img
            src="/logos/logo_horizontal.png"
            alt="Logo de BonnaHub"
            style={{
              width: "88%",
              maxWidth: "222px",
              objectFit: "contain",
            }}
          />
        </a>
      </Col>

      <Col
        span={18}
        style={{
          display: "flex",
          flexFlow: "row wrap",
          justifyContent: "flex-end",
          alignContent: "center",
        }}
      >
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
      </Col>
    </Row>
  );
};

export default UserHeaderLayout;
