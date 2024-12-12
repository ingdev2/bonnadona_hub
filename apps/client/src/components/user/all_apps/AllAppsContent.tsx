"use client";

import React, { useEffect } from "react";
import { useSession } from "next-auth/react";

import { Card, Col, Empty, Row } from "antd";
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
import { useGetAllActiveApplicationsQuery } from "@/redux/apis/permission/application/applicationApi";
import { permission } from "process";
import UserHeaderLayout from "../header_layout_dashboard/UserHeaderLayout";

const AllAppsContent: React.FC = () => {
  const { data: session, status } = useSession();
  const dispatch = useAppDispatch();

  const permissionUser = session?.user.permission;

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

  const {
    data: allActiveApplicationData,
    isLoading: allActiveApplicationLoading,
    isFetching: allActiveApplicationFetching,
    error: allActiveApplicationError,
  } = useGetAllActiveApplicationsQuery(null);

  useEffect(() => {
    console.log("PERMISOS USUARIO", permissionUser);

    if (
      userSessionLogData &&
      userActiveDatabyIdNumberData &&
      Number(userSessionLogData.successful_login_counter) === 1 &&
      userActiveDatabyIdNumberData.last_password_update === null
    ) {
      dispatch(setFirstLoginModalIsOpen(true));
    } else {
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
          customLayoutHeader={<UserHeaderLayout />}
          customLayoutContent={
            <div style={{ width: "100%" }}>
              <Row gutter={[0, 48]} justify="center" align={"middle"}>
                {allActiveApplicationData?.length! > 0 &&
                allActiveApplicationData &&
                permissionUser ? (
                  <>
                    {allActiveApplicationData
                      ?.flatMap((data) => data || [])
                      .map((application: IApplication, index: number) => (
                        <Col
                          key={index}
                          xs={24}
                          sm={12}
                          md={8}
                          lg={6}
                          style={{
                            display: "flex",
                            justifyContent: "center",
                            padding: "0px",
                            margin: "0px",
                          }}
                        >
                          <CustomOptionWithImageCard
                            altCustomOptionWithImageCard={application.name}
                            srcCustomOptionWithImageCard={
                              application.image_path
                            }
                            classNameCardCustomOptionWithImageCard={styles.card}
                            styleImgCustomOptionWithImageCard={{
                              width: "88px",
                              objectFit: "contain",
                            }}
                            entryLinkUrlCustomOptionWithImageCard={
                              application.entry_link
                            }
                          />
                        </Col>
                      ))}
                  </>
                ) : (
                  <Col
                    span={24}
                    style={{ display: "flex", justifyContent: "center" }}
                  >
                    <Empty description={"No hay applicaciones para mostrar"} />
                  </Col>
                )}
              </Row>
            </div>
          }
        />
      </div>
    </>
  );
};

export default AllAppsContent;
