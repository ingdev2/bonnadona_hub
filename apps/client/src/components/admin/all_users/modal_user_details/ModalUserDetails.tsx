"use client";

import React, { ReactNode } from "react";

import { Col, Descriptions } from "antd";

import { titleStyleCss, subtitleStyleCss } from "@/theme/text_styles";

const ModalUserDetails: React.FC<{
  titleDescription: string;
  labelUserName: string;
  selectedUserName: string | undefined;
  labelUserLastName: string;
  selectedUserLastName: string | undefined;
  labelUserIdType: string;
  selectedUserIdType: ReactNode;
  labelUserIdNumber: string;
  selectedUserIdNumber: number | undefined;
  labelUserGender: string;
  selectedUserGender: string | undefined;
  labelUserBirthdate: string;
  selectedUserBirthdate: string | undefined;
  labelUserAddressResidence: string;
  selectedUserAddressResidence: string | undefined;
  labelUserMainEmail: string;
  selectedUserMainEmail: string | undefined;
  labelUserCorporateEmail: string;
  selectedUserCorporateEmail: string | undefined;
  labelUserPersonalCellphone: string;
  selectedUserPersonalCellphone: number | undefined;
}> = ({
  titleDescription,
  labelUserName,
  selectedUserName,
  labelUserLastName,
  selectedUserLastName,
  labelUserIdType,
  selectedUserIdType,
  labelUserIdNumber,
  selectedUserIdNumber,
  labelUserGender,
  selectedUserGender,
  labelUserBirthdate,
  selectedUserBirthdate,
  labelUserAddressResidence,
  selectedUserAddressResidence,
  labelUserMainEmail,
  selectedUserMainEmail,
  labelUserCorporateEmail,
  selectedUserCorporateEmail,
  labelUserPersonalCellphone,
  selectedUserPersonalCellphone,
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
        className="description-user-details-user"
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
          label={labelUserName}
          style={{ textAlign: "center" }}
          span={6}
        >
          {selectedUserName}
        </Descriptions.Item>

        <Descriptions.Item
          label={labelUserLastName}
          style={{ textAlign: "center" }}
          span={6}
        >
          {selectedUserLastName}
        </Descriptions.Item>

        {/* FILA 1 */}

        <Descriptions.Item
          label={labelUserIdType}
          style={{ textAlign: "center" }}
          span={5}
        >
          {selectedUserIdType}
        </Descriptions.Item>

        <Descriptions.Item
          label={labelUserIdNumber}
          style={{ textAlign: "center" }}
          span={5}
        >
          {selectedUserIdNumber}
        </Descriptions.Item>

        <Descriptions.Item
          label={labelUserGender}
          style={{ textAlign: "center" }}
          span={2}
        >
          {selectedUserGender}
        </Descriptions.Item>

        {/* FILA 2 */}

        <Descriptions.Item
          label={labelUserBirthdate}
          style={{ textAlign: "center" }}
          span={6}
        >
          {selectedUserBirthdate}
        </Descriptions.Item>

        <Descriptions.Item
          label={labelUserAddressResidence}
          style={{ textAlign: "center" }}
          span={6}
        >
          {selectedUserAddressResidence}
        </Descriptions.Item>

        {/* FILA 3 */}

        <Descriptions.Item
          label={labelUserMainEmail}
          style={{ textAlign: "center" }}
          span={5}
        >
          {selectedUserMainEmail}
        </Descriptions.Item>

        <Descriptions.Item
          label={labelUserCorporateEmail}
          style={{ textAlign: "center" }}
          span={5}
        >
          {selectedUserCorporateEmail}
        </Descriptions.Item>

        <Descriptions.Item
          label={labelUserPersonalCellphone}
          style={{ textAlign: "center" }}
          span={2}
        >
          {selectedUserPersonalCellphone}
        </Descriptions.Item>

        {/* FILA 4 */}
      </Descriptions>
    </Col>
  );
};

export default ModalUserDetails;
