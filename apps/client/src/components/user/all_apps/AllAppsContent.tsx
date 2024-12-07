"use client";

import React, { useEffect } from "react";
import { useSession } from "next-auth/react";

import { Card, Col, Row } from "antd";
import styles from "./AllAppsContent.module.css";

import CustomDashboardLayoutCollaborators from "@/components/common/custom_dashboard_layout_collaborators/CustomDashboardLayoutCollaborators";
import ChangePasswordModal from "../../common/change_password_modal/ChangePasswordModal";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import {
  useGetUserActiveByIdNumberQuery,
  useGetUserSessionLogByEmailQuery,
} from "@/redux/apis/users/userApi";
import {
  setChangePasswordExpiryModalIsOpen,
  setFirstLoginModalIsOpen,
} from "@/redux/features/common/modal/modalSlice";
import { useGetPasswordPolicyQuery } from "@/redux/apis/password_policy/passwordPolicyApi";
import { checkPasswordExpiry } from "@/helpers/check_password_expiry/CheckPasswordExpiry";
import CustomOptionWithImageCard from "@/components/common/custom_option_with_image_card/CustomOptionWithImageCard";

const AllAppsContent: React.FC = () => {
  const { data: session, status } = useSession();
  const dispatch = useAppDispatch();

  const principalEmailCollaboratorState = useAppSelector(
    (state) => state.user.principal_email
  );

  const lastPasswordUpdateCollaboratorState = useAppSelector(
    (state) => state.user.last_password_update
  );

  const modalIsOpenFirstSuccessfullCollaboratorLogin = useAppSelector(
    (state) => state.modal.firstSuccessLoginModalIsOpen
  );

  const modalIsOpenChangePasswordExpiry = useAppSelector(
    (state) => state.modal.changePasswordExpiryModalIsOpen
  );

  const {
    data: userActiveDatabyIdNumberData,
    isLoading: userActiveDatabyIdNumberLoading,
    isFetching: userActiveDatabyIdNumberFetching,
    isError: userActiveDatabyIdNumberError,
  } = useGetUserActiveByIdNumberQuery(session?.user.id_number ?? 0, {
    skip: !session?.user.id_number,
  });

  const {
    data: userSessionLogData,
    isLoading: userSessionLogLoading,
    isFetching: userSessionLogFetching,
    error: userSessionLogError,
  } = useGetUserSessionLogByEmailQuery(principalEmailCollaboratorState, {
    skip: !principalEmailCollaboratorState,
  });

  const {
    data: passwordPolicyData,
    isLoading: passwordPolicyLoading,
    isFetching: passwordPolicyFetching,
    error: passwordPolicyError,
  } = useGetPasswordPolicyQuery(null);

  useEffect(() => {
    if (
      userSessionLogData &&
      userActiveDatabyIdNumberData &&
      Number(userSessionLogData.successful_login_counter) === 1 &&
      userActiveDatabyIdNumberData.last_password_update === null
    ) {
      console.log(
        "successful_login_counter",
        typeof userSessionLogData.successful_login_counter
      );
      console.log(
        "last_password_update",
        userActiveDatabyIdNumberData.last_password_update
      );
      console.log("abierto");
      dispatch(setFirstLoginModalIsOpen(true));
    } else {
      console.log(
        "successful_login_counter",
        userSessionLogData?.successful_login_counter
      );
      console.log(
        "last_password_update",
        userActiveDatabyIdNumberData?.last_password_update
      );
      console.log("cerrado");
      dispatch(setFirstLoginModalIsOpen(false));
    }

    if (
      passwordPolicyData &&
      passwordPolicyData.password_expiry_days &&
      lastPasswordUpdateCollaboratorState &&
      checkPasswordExpiry(
        lastPasswordUpdateCollaboratorState,
        passwordPolicyData.password_expiry_days
      )
    ) {
      dispatch(setChangePasswordExpiryModalIsOpen(true));
    } else {
      dispatch(setChangePasswordExpiryModalIsOpen(false));
    }
  }, [
    userSessionLogData,
    passwordPolicyData,
    lastPasswordUpdateCollaboratorState,
  ]);

  return (
    <>
      <div className="collaborator-modal-firts-successfull-login">
        {modalIsOpenFirstSuccessfullCollaboratorLogin && (
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

      <div className="custom-dashboard-layout-users">
        <CustomDashboardLayoutCollaborators
          customLayoutContent={
            <div style={{ width: "100%" }}>
              <Row gutter={[24, 24]} justify="center">
                <Col
                  xs={24}
                  sm={12}
                  md={8}
                  lg={6}
                  style={{ display: "flex", justifyContent: "center" }}
                >
                  <CustomOptionWithImageCard
                    altCustomOptionWithImageCard="alicanto"
                    srcCustomOptionWithImageCard="https://bonnadona-public.s3.amazonaws.com/assets/alicanto_logo.svg"
                    classNameCardCustomOptionWithImageCard={styles.card}
                    styleImgCustomOptionWithImageCard={{ width: "100%" }}
                  />
                </Col>

                {/* <Col
                  xs={24}
                  sm={12}
                  md={8}
                  lg={6}
                  style={{ display: "flex", justifyContent: "center" }}
                >
                  <Card id="all-app-options-card" className={styles.card}>
                    <img
                      src="https://bonnadona-public.s3.amazonaws.com/assets/alicanto_logo.svg"
                      alt="Logo de Bonnadona HUB"
                      style={{
                        width: "100%",
                      }}
                    />
                  </Card>
                </Col> */}

                {/* <Col
                  xs={24}
                  sm={12}
                  md={8}
                  lg={6}
                  style={{ display: "flex", justifyContent: "center" }}
                >
                  <Card id="all-app-options-card" className={styles.card}>
                    <img
                      src="https://bonnadona-public.s3.amazonaws.com/assets/halcon.svg"
                      alt="Logo de Bonnadona HUB"
                      style={{
                        height: 90,
                        filter: "drop-shadow(0px 3px 3px white)",
                        width: "100%",
                      }}
                    />
                  </Card>
                </Col>
                <Col
                  xs={24}
                  sm={12}
                  md={8}
                  lg={6}
                  style={{ display: "flex", justifyContent: "center" }}
                >
                  <Card id="all-app-options-card" className={styles.card}>
                    <img
                      src="https://bonnadona-public.s3.amazonaws.com/assets/esparta.svg"
                      alt="Logo de Bonnadona HUB"
                      style={{
                        height: 90,
                        filter: "drop-shadow(0px 3px 3px white)",
                        width: "100%",
                      }}
                    />
                  </Card>
                </Col>
                <Col
                  xs={24}
                  sm={12}
                  md={8}
                  lg={6}
                  style={{ display: "flex", justifyContent: "center" }}
                >
                  <Card id="all-app-options-card" className={styles.card}>
                    <img
                      src="https://bonnadona-storage.s3.amazonaws.com/projects/caladrius/Logo+caladrius.png"
                      alt="Logo de Bonnadona HUB"
                      style={{
                        height: 90,
                        filter: "drop-shadow(0px 3px 3px white)",
                        width: "100%",
                      }}
                    />
                  </Card>
                </Col>
                <Col
                  xs={24}
                  sm={12}
                  md={8}
                  lg={6}
                  style={{ display: "flex", justifyContent: "center" }}
                >
                  <Card id="all-app-options-card" className={styles.card}>
                    <img
                      src="https://bonnadona-storage.s3.amazonaws.com/projects/exitus/EX1.png"
                      alt="Logo de Bonnadona HUB"
                      style={{
                        height: 90,
                        filter: "drop-shadow(0px 3px 3px white)",
                        width: "100%",
                      }}
                    />
                  </Card>
                </Col>
                <Col
                  xs={24}
                  sm={12}
                  md={8}
                  lg={6}
                  style={{ display: "flex", justifyContent: "center" }}
                >
                  <Card id="all-app-options-card" className={styles.card}>
                    <img
                      src="https://bonnadona-storage.s3.amazonaws.com/projects/hito/HITO-02.png"
                      alt="Logo de Bonnadona HUB"
                      style={{
                        height: 90,
                        filter: "drop-shadow(0px 3px 3px white)",
                        width: "100%",
                      }}
                    />
                  </Card>
                </Col>
                <Col
                  xs={24}
                  sm={12}
                  md={8}
                  lg={6}
                  style={{ display: "flex", justifyContent: "center" }}
                >
                  <Card id="all-app-options-card" className={styles.card}>
                    <img
                      src="https://bonnadona-public.s3.amazonaws.com/assets/magna_logo.svg"
                      alt="Logo de Bonnadona HUB"
                      style={{
                        height: 90,
                        filter: "drop-shadow(0px 3px 3px white)",
                        width: "100%",
                      }}
                    />
                  </Card>
                </Col>
                <Col
                  xs={24}
                  sm={12}
                  md={8}
                  lg={6}
                  style={{ display: "flex", justifyContent: "center" }}
                >
                  <Card id="all-app-options-card" className={styles.card}>
                    <img
                      src="https://hygea.s3.amazonaws.com/images/HYGEA.svg"
                      alt="Logo de Bonnadona HUB"
                      style={{
                        height: 90,
                        filter: "drop-shadow(0px 3px 3px white)",
                        width: "100%",
                      }}
                    />
                  </Card>
                </Col>
                <Col
                  xs={24}
                  sm={12}
                  md={8}
                  lg={6}
                  style={{ display: "flex", justifyContent: "center" }}
                >
                  <Card id="all-app-options-card" className={styles.card}>
                    <img
                      src="https://bonnadona-ethereum.s3.amazonaws.com/Images_project_templates/images_frontend/format_svg/Logo_Ethereum_Bonnadona_Hub.svg"
                      alt="Logo de Bonnadona HUB"
                      style={{
                        height: 90,
                        filter: "drop-shadow(0px 3px 3px white)",
                        width: "100%",
                      }}
                    />
                  </Card>
                </Col>
                <Col
                  xs={24}
                  sm={12}
                  md={8}
                  lg={6}
                  style={{ display: "flex", justifyContent: "center" }}
                >
                  <Card id="all-app-options-card" className={styles.card}>
                    <img
                      src="https://bonnadona-public.s3.amazonaws.com/assets/goodmed.svg"
                      alt="Logo de Bonnadona HUB"
                      style={{
                        height: 90,
                        filter: "drop-shadow(0px 3px 3px white)",
                        width: "100%",
                      }}
                    />
                  </Card>
                </Col>
                <Col
                  xs={24}
                  sm={12}
                  md={8}
                  lg={6}
                  style={{ display: "flex", justifyContent: "center" }}
                >
                  <Card id="all-app-options-card" className={styles.card}>
                    <img
                      src="https://bonnadona-storage.s3.amazonaws.com/projects/evaluacion-desempeno/profiles/Grupo+626.svg"
                      alt="Logo de Bonnadona HUB"
                      style={{
                        height: 90,
                        filter: "drop-shadow(0px 3px 3px white)",
                        width: "100%",
                      }}
                    />
                  </Card>
                </Col>
                <Col
                  xs={24}
                  sm={12}
                  md={8}
                  lg={6}
                  style={{ display: "flex", justifyContent: "center" }}
                >
                  <Card id="all-app-options-card" className={styles.card}>
                    <img
                      src="https://bonnadona-storage.s3.amazonaws.com/projects/aux_clinicos/Grupo+3525.png"
                      alt="Logo de Bonnadona HUB"
                      style={{
                        height: 90,
                        filter: "drop-shadow(0px 3px 3px white)",
                        width: "100%",
                      }}
                    />
                  </Card>
                </Col>
                <Col
                  xs={24}
                  sm={12}
                  md={8}
                  lg={6}
                  style={{ display: "flex", justifyContent: "center" }}
                >
                  <Card id="all-app-options-card" className={styles.card}>
                    <img
                      src="https://bonnadona-public.s3.amazonaws.com/assets/Cirugi%CC%81as1.png"
                      alt="Logo de Bonnadona HUB"
                      style={{
                        height: 90,
                        filter: "drop-shadow(0px 3px 3px white)",
                        width: "100%",
                      }}
                    />
                  </Card>
                </Col>
                <Col
                  xs={24}
                  sm={12}
                  md={8}
                  lg={6}
                  style={{ display: "flex", justifyContent: "center" }}
                >
                  <Card id="all-app-options-card" className={styles.card}>
                    <img
                      src="https://bonnadona-public.s3.amazonaws.com/assets/goodmed.svg"
                      alt="Logo de Bonnadona HUB"
                      style={{
                        height: 90,
                        filter: "drop-shadow(0px 3px 3px white)",
                        width: "100%",
                      }}
                    />
                  </Card>
                </Col> */}
              </Row>
            </div>
          }
        />
      </div>
    </>
  );
};

export default AllAppsContent;
