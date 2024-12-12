"use client";

import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { useSession } from "next-auth/react";

import { Col, Empty, Row } from "antd";
import styles from "./AllAppsContent.module.css";

import CustomDashboardLayoutCollaborators from "@/components/common/custom_dashboard_layout_collaborators/CustomDashboardLayoutCollaborators";
import UserHeaderLayout from "../header_layout_dashboard/UserHeaderLayout";
import CustomOptionWithImageCard from "@/components/common/custom_option_with_image_card/CustomOptionWithImageCard";
import ChangePasswordModal from "../../common/change_password_modal/ChangePasswordModal";

import {
  setChangePasswordExpiryModalIsOpen,
  setFirstLoginModalIsOpen,
} from "@/redux/features/common/modal/modalSlice";

import {
  useGetUserActiveByIdNumberQuery,
  useGetUserSessionLogByEmailQuery,
} from "@/redux/apis/users/userApi";
import { useGetPasswordPolicyQuery } from "@/redux/apis/password_policy/passwordPolicyApi";

import { checkPasswordExpiry } from "@/helpers/check_password_expiry/CheckPasswordExpiry";

const AllAppsContent: React.FC = () => {
  const { data: session, status } = useSession();
  const dispatch = useAppDispatch();

  const permissionUser: IPermissions[] | undefined = session?.user.permission;

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
              <Row gutter={[0, 24]} justify="center" align={"middle"}>
                {permissionUser ? (
                  <>
                    {permissionUser
                      ?.flatMap((data) => data.applications || [])
                      .map((application: IApplication, index: number) => (
                        <Col
                          key={index}
                          xs={12}
                          sm={8}
                          md={6}
                          lg={4}
                          style={{
                            display: "flex",
                            justifyContent: "center",
                            paddingBlock: "22px",
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
                              width: "72px",
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
