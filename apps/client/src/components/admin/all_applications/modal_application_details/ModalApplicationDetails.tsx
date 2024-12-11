"use client";

import React from "react";

import { Col, Descriptions } from "antd";

import { titleStyleCss, subtitleStyleCss } from "@/theme/text_styles";

const ModalApplicationDetails: React.FC<{
  nameApplication: string;
  labelApplicationId: string;
  selectedApplicationId: number | undefined;
  labelApplicationName: string;
  selectedApplicationName: string | undefined;
  labelApplicationEntryLink: string;
  selectedApplicationEntryLink: string | undefined;
}> = ({
  nameApplication,
  labelApplicationId,
  selectedApplicationId,
  labelApplicationName,
  selectedApplicationName,
  labelApplicationEntryLink,
  selectedApplicationEntryLink,
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
        {nameApplication}
      </h2>

      <Descriptions
        className="description-application-details-admin"
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
          label={labelApplicationId}
          style={{ textAlign: "center" }}
          span={2}
        >
          {selectedApplicationId}
        </Descriptions.Item>

        <Descriptions.Item
          label={labelApplicationName}
          style={{ textAlign: "center" }}
          span={10}
        >
          {selectedApplicationName}
        </Descriptions.Item>

        {/* FILA 1 */}

        <Descriptions.Item
          label={labelApplicationEntryLink}
          style={{ textAlign: "center" }}
          span={12}
        >
          {selectedApplicationEntryLink}
        </Descriptions.Item>

        {/* FILA 2 */}
      </Descriptions>
    </Col>
  );
};

export default ModalApplicationDetails;
