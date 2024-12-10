"use client";

import React, { ReactNode } from "react";

import { Card, Row, Col, Descriptions } from "antd";

import { titleStyleCss, subtitleStyleCss } from "@/theme/text_styles";
import { useAppSelector } from "@/redux/hooks";

const ModalUserDetails: React.FC<{
  titleDescription: string;
  labelUserName: string;
  selectedUserName: string | undefined;
  selectedUserLastName: string | undefined;
  labelUserIdType: string;
  selectedUserIdType: ReactNode;
  labelUserIdNumber: string;
  selectedUserIdNumber: number | undefined;
  labelUserGender: string;
  selectedUserGender: string | undefined;
  labelUserBirthdate: string;
  selectedUserBirthdate: string | undefined;
  labelUserMainEmail: string;
  selectedUserMainEmail: string | undefined;
  labelUserPersonalEmail: string;
  selectedUserPersonalEmail: string | undefined;
  labelUserCorporateEmail: string;
  selectedUserCorporateEmail: string | undefined;
  labelUserPersonalCellphone: string;
  selectedUserPersonalCellphone: number | string | undefined;
  labelUserCorporateCellphone: string;
  selectedUserCorporateCellphone: number | string | undefined;
  labelUserServiceType: string;
  selectedUserServiceType: number | string | undefined;
  labelUserInmediateBoss: string;
  selectedUserInmediateBoss: string | undefined;
  labelUserUnit: string;
  selectedUserUnit: string | undefined;
  labelUserService: string;
  selectedUserService: string | undefined;
  labelUserPosition: string;
  selectedUserPosition: string | undefined;
  labelUserProfileBloodGroup: string;
  selectedUserProfileBloodGroup: ReactNode;
  labelUserProfileAffiliationEps: string;
  selectedUserProfileAffiliationEps: string | undefined;
  labelUserProfileResidenceDepartment: string;
  selectedUserProfileResidenceDepartment: string | undefined;
  labelUserProfileResidenceCity: string;
  selectedUserProfileResidenceCity: string | undefined;
  labelUserProfileResidenceNeighborhood: string;
  selectedUserProfileResidenceNeighborhood: string | undefined;
  labelUserProfileResidenceAddress: string;
  selectedUserProfileResidenceAddress: string | undefined;
  labelUserProfileHeight: string;
  selectedUserProfileHeight: string | undefined;
  labelUserProfileWeight: string;
  selectedUserProfileWeight: string | undefined;
  labelUserProfileShirtSize: string;
  selectedUserProfileShirtSize: string | undefined;
  labelUserProfilePantsSize: string;
  selectedUserProfilePantsSize: string | undefined;
  labelUserProfileShoeSize: string;
  selectedUserProfileShoeSize: string | undefined;
}> = ({
  titleDescription,
  labelUserName,
  selectedUserName,
  selectedUserLastName,
  labelUserIdType,
  selectedUserIdType,
  labelUserIdNumber,
  selectedUserIdNumber,
  labelUserGender,
  selectedUserGender,
  labelUserBirthdate,
  selectedUserBirthdate,
  labelUserMainEmail,
  selectedUserMainEmail,
  labelUserPersonalEmail,
  selectedUserPersonalEmail,
  labelUserCorporateEmail,
  selectedUserCorporateEmail,
  labelUserPersonalCellphone,
  selectedUserPersonalCellphone,
  labelUserCorporateCellphone,
  selectedUserCorporateCellphone,
  labelUserServiceType,
  selectedUserServiceType,
  labelUserInmediateBoss,
  selectedUserInmediateBoss,
  labelUserUnit,
  selectedUserUnit,
  labelUserService,
  selectedUserService,
  labelUserPosition,
  selectedUserPosition,
  labelUserProfileBloodGroup,
  selectedUserProfileBloodGroup,
  labelUserProfileAffiliationEps,
  selectedUserProfileAffiliationEps,
  labelUserProfileResidenceDepartment,
  selectedUserProfileResidenceDepartment,
  labelUserProfileResidenceCity,
  selectedUserProfileResidenceCity,
  labelUserProfileResidenceNeighborhood,
  selectedUserProfileResidenceNeighborhood,
  labelUserProfileResidenceAddress,
  selectedUserProfileResidenceAddress,
  labelUserProfileHeight,
  selectedUserProfileHeight,
  labelUserProfileWeight,
  selectedUserProfileWeight,
  labelUserProfileShirtSize,
  selectedUserProfileShirtSize,
  labelUserProfilePantsSize,
  selectedUserProfilePantsSize,
  labelUserProfileShoeSize,
  selectedUserProfileShoeSize,
}) => {
  return (
    <Col
      xs={24}
      sm={24}
      md={24}
      lg={24}
      style={{ padding: "0px", margin: "0px" }}
    >
      <Card
        title="Detalles de usuario"
        style={{ marginBlock: "22px", padding: "0px" }}
      >
        <Row
          gutter={24}
          justify={"center"}
          align={"middle"}
          style={{ padding: "0px", margin: "0px" }}
        >
          <Col
            xs={24}
            sm={24}
            md={24}
            lg={12}
            style={{ margin: "0px", paddingInline: "7px", paddingBlock: "7px" }}
          >
            <Descriptions
              size="small"
              column={1}
              labelStyle={{
                ...titleStyleCss,
                width: "222px",
                paddingInlineEnd: "0px",
                margin: "0px",
              }}
              contentStyle={subtitleStyleCss}
              layout="horizontal"
              bordered
            >
              <Descriptions.Item label={labelUserName}>
                {selectedUserName} {selectedUserLastName}
              </Descriptions.Item>

              <Descriptions.Item label={labelUserIdType}>
                {selectedUserIdType}
              </Descriptions.Item>

              <Descriptions.Item label={labelUserIdNumber}>
                {selectedUserIdNumber}
              </Descriptions.Item>

              <Descriptions.Item label={labelUserGender}>
                {selectedUserGender}
              </Descriptions.Item>

              <Descriptions.Item label={labelUserBirthdate}>
                {selectedUserBirthdate}
              </Descriptions.Item>
            </Descriptions>
          </Col>

          <Col
            xs={24}
            sm={24}
            md={24}
            lg={12}
            style={{ margin: "0px", paddingInline: "7px", paddingBlock: "7px" }}
          >
            <Descriptions
              size="small"
              column={1}
              labelStyle={{
                ...titleStyleCss,
                width: "222px",
                paddingInlineEnd: "0px",
                margin: "0px",
              }}
              layout="horizontal"
              bordered
            >
              <Descriptions.Item label={labelUserMainEmail}>
                {selectedUserMainEmail}
              </Descriptions.Item>

              <Descriptions.Item label={labelUserPersonalEmail}>
                {selectedUserPersonalEmail}
              </Descriptions.Item>

              <Descriptions.Item label={labelUserPersonalCellphone}>
                {selectedUserPersonalCellphone}
              </Descriptions.Item>

              <Descriptions.Item label={labelUserCorporateEmail}>
                {selectedUserCorporateEmail}
              </Descriptions.Item>

              <Descriptions.Item label={labelUserCorporateCellphone}>
                {selectedUserCorporateCellphone}
              </Descriptions.Item>
            </Descriptions>
          </Col>

          <Col
            xs={24}
            sm={24}
            md={24}
            lg={14}
            style={{ margin: "0px", paddingInline: "7px", paddingBlock: "7px" }}
          >
            <Descriptions
              size="small"
              column={1}
              labelStyle={{
                ...titleStyleCss,
                width: "222px",
                paddingInlineEnd: "0px",
                margin: "0px",
              }}
              layout="horizontal"
              bordered
            >
              <Descriptions.Item label={labelUserPosition}>
                {selectedUserPosition}
              </Descriptions.Item>

              <Descriptions.Item label={labelUserService}>
                {selectedUserService}
              </Descriptions.Item>

              <Descriptions.Item label={labelUserInmediateBoss}>
                {selectedUserInmediateBoss}
              </Descriptions.Item>

              <Descriptions.Item label={labelUserUnit}>
                {selectedUserUnit}
              </Descriptions.Item>

              <Descriptions.Item label={labelUserServiceType}>
                {selectedUserServiceType}
              </Descriptions.Item>
            </Descriptions>
          </Col>

          <Col
            xs={24}
            sm={24}
            md={24}
            lg={10}
            style={{ margin: "0px", paddingInline: "7px", paddingBlock: "7px" }}
          >
            <Descriptions
              size="small"
              column={1}
              labelStyle={{
                ...titleStyleCss,
                width: "222px",
                paddingInlineEnd: "0px",
                margin: "0px",
              }}
              layout="horizontal"
              bordered
            >
              <Descriptions.Item label={labelUserProfileBloodGroup}>
                {selectedUserProfileBloodGroup}
              </Descriptions.Item>

              <Descriptions.Item label={labelUserProfileAffiliationEps}>
                {selectedUserProfileAffiliationEps}
              </Descriptions.Item>

              <Descriptions.Item label={labelUserProfileResidenceAddress}>
                {selectedUserProfileResidenceAddress}
              </Descriptions.Item>

              <Descriptions.Item label={labelUserProfileHeight}>
                {selectedUserProfileHeight}
              </Descriptions.Item>

              <Descriptions.Item label={labelUserProfileWeight}>
                {selectedUserProfileWeight}
              </Descriptions.Item>
            </Descriptions>
          </Col>
        </Row>
      </Card>
    </Col>
  );
};

export default ModalUserDetails;
