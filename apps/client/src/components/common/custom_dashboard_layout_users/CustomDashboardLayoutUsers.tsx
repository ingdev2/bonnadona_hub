"use client";

import React, { ReactNode } from "react";
import { useRouter } from "next/navigation";

import UserHeaderLayout from "@/components/user/header_layout_dashboard/UserHeaderLayout";
import { Button, Col, Layout, Row, theme } from "antd";

const { Header, Content, Footer } = Layout;

const CustomDashboardLayoutUsers: React.FC<{
  customLayoutHeader?: ReactNode;
  customLayoutContent: ReactNode;
  customLayoutFooter?: any;
}> = ({ customLayoutHeader, customLayoutContent, customLayoutFooter }) => {
  const router = useRouter();

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
    <Layout
      className="custom-dashboard-layout"
      style={{
        minHeight: "100vh",
        backgroundColor: "transparent",
      }}
    >
      <Layout
        className="custom-dashboard-apps-components"
        style={{
          display: "flex",
          flexDirection: "column",
          backgroundColor: "#DFEBF2",
          minHeight: "100vh",
        }}
      >
        <Header
          className="custom--dashboard-layout-header"
          style={{
            background: "#015E90",
            padding: "0px",
            position: "fixed",
            width: "100%",
            top: 0,
            zIndex: 1000,
          }}
        >
          <Row
            style={{
              width: "100%",
              height: "100%",
            }}
          >
            <Col
              xs={4}
              sm={4}
              md={4}
              lg={4}
              style={{
                display: "flex",
                flexFlow: "row wrap",
                alignContent: "center",
                justifyContent: "flex-start",
                paddingInline: "13px",
                backgroundColor: "#F7F7F7",
              }}
            >
              <img
                src="/logos/logo_horizontal.png"
                alt="Logo de Bonnadona HUB"
                style={{
                  width: "173px",
                }}
              />
            </Col>

            <Col
              xs={20}
              sm={20}
              md={20}
              lg={20}
              style={{
                display: "flex",
                flexFlow: "row wrap",
                justifyContent: "flex-end",
                alignContent: "center",
                paddingRight: "17px",
              }}
            >
              {customLayoutHeader || <UserHeaderLayout />}
            </Col>
          </Row>
        </Header>
        <Content
          className="custom--dashboard-layout-content"
          style={{
            flexGrow: 1,
            margin: "13px 13px",
            marginTop: "80px",
            display: "flex",
            justifyContent: "center",
            backgroundColor: colorBgContainer,
            borderRadius: borderRadiusLG,
            boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.2)",
            padding: "70px",
          }}
        >
          {customLayoutContent}
        </Content>
        <Footer
          className="custom--dashboard-layout-footer"
          style={{
            textAlign: "center",
            backgroundColor: colorBgContainer,
            justifyContent: "center",
            alignItems: "center",
            padding: "20px",
          }}
        >
          {customLayoutFooter ||
            `Clínica Bonnadona © ${new Date().getFullYear()}💙`}
        </Footer>
      </Layout>
    </Layout>
  );
};

export default CustomDashboardLayoutUsers;
