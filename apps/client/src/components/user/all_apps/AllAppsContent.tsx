import React, { useEffect } from "react";

import { Card, Col, Row } from "antd";
import styles from "./AllAppsContent.module.css";

import CustomDashboardLayout from "@/components/common/custom_dashboard_layout/CustomDashboardLayout";
import CollaboratorModalFirstSuccessfulLogin from "./collaborator_modal_first_successful_login/CollaboratorModalFirstSuccessfulLogin";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { useGetUserSessionLogByEmailQuery } from "@/redux/apis/users/userApi";
import { setFirstLoginModalIsOpen } from "@/redux/features/common/modal/modalSlice";

const AllAppsContent: React.FC = () => {
  const dispatch = useAppDispatch();

  const principalEmailCollaboratorState = useAppSelector(
    (state) => state.user.principal_email
  );

  const modalIsOpenFirstSuccessfullCollaboratorLogin = useAppSelector(
    (state) => state.modal.firstSuccessLoginModalIsOpen
  );

  const {
    data: userSessionLogData,
    isLoading: userSessionLogLoading,
    isFetching: userSessionLogFetching,
    error: userSessionLogError,
  } = useGetUserSessionLogByEmailQuery(principalEmailCollaboratorState, {
    skip: !principalEmailCollaboratorState,
  });

  useEffect(() => {
    if (userSessionLogData?.successful_login_counter == 1) {
      dispatch(setFirstLoginModalIsOpen(true));
    }
  }, [userSessionLogData]);

  return (
    <>
      {modalIsOpenFirstSuccessfullCollaboratorLogin && (
        <CollaboratorModalFirstSuccessfulLogin />
      )}

      <CustomDashboardLayout
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
                <Card id="all-app-options-card" className={styles.card}>
                  <img
                    src="https://bonnadona-public.s3.amazonaws.com/assets/alicanto_logo.svg"
                    alt="Logo de Bonnadona HUB"
                    style={{
                      height: 90,
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
              </Col>
            </Row>
          </div>
        }
      />
    </>
  );
};

export default AllAppsContent;
