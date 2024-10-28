import React from "react";

import { Card, Col, Row } from "antd";
import styles from "./AllAppsContent.module.css";

import CustomDashboardLayout from "@/components/common/custom_dashboard_layout/CustomDashboardLayout";

const AllAppsContent: React.FC = () => {
  return (
    <>
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
