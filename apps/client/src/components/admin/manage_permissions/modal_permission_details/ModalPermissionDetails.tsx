"use client";

import React from "react";

import { Col, Descriptions } from "antd";

import { titleStyleCss, subtitleStyleCss } from "@/theme/text_styles";

const ModalPermissionDetails: React.FC<{
  titleDescription: string;
  labelPermissionId: string;
  selectedPermissionId: number | undefined;
  labelPermissionTitle: string;
  selectedPermissionTitle: string | undefined;
  labelPermissionDescription: string;
  selectedPermissionDescription: string | undefined;
}> = ({
  titleDescription,
  labelPermissionId,
  selectedPermissionId,
  labelPermissionTitle,
  selectedPermissionTitle,
  labelPermissionDescription,
  selectedPermissionDescription,
}) => {
  return (
    <Col
      xs={24}
      sm={24}
      md={24}
      lg={24}
      style={{
        width: "100%",
        display: "flex",
        flexFlow: "row wrap",
        justifyContent: "center",
        alignContent: "center",
        alignItems: "center",
        padding: "2px",
        margin: "0px",
      }}
    >
      <h2
        style={{
          width: "100%",
          ...titleStyleCss,
          margin: "0px",
          paddingBottom: "13px",
          fontSize: "22px",
        }}
      >
        {titleDescription}
      </h2>

      <Descriptions
        className="description-permission-details-admin"
        layout="vertical"
        size="middle"
        style={{ width: "100%", paddingBlock: "7px" }}
        labelStyle={{
          ...titleStyleCss,
        }}
        contentStyle={{
          ...subtitleStyleCss,
        }}
        bordered
        column={12}
      >
        <Descriptions.Item
          label={labelPermissionId}
          style={{ textAlign: "center" }}
          span={2}
        >
          {selectedPermissionId}
        </Descriptions.Item>

        <Descriptions.Item
          label={labelPermissionTitle}
          style={{ textAlign: "center" }}
          span={10}
        >
          {selectedPermissionTitle}
        </Descriptions.Item>

        {/* FILA 1 */}

        <Descriptions.Item
          label={labelPermissionDescription}
          style={{ textAlign: "center" }}
          span={12}
        >
          {selectedPermissionDescription}
        </Descriptions.Item>

        {/* FILA 2 */}
      </Descriptions>
    </Col>
  );
};

export default ModalPermissionDetails;
