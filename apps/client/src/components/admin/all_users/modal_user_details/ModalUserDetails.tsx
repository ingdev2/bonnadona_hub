"use client";

import React, { ReactNode } from "react";

import { Col, Descriptions } from "antd";

import { titleStyleCss, subtitleStyleCss } from "@/theme/text_styles";
import { useAppSelector } from "@/redux/hooks";

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
  labelUserMainEmail: string;
  selectedUserMainEmail: string | undefined;
  labelUserPersonalEmail: string;
  selectedUserPersonalEmail: string | undefined;
  labelUserCorporateEmail: string;
  selectedUserCorporateEmail: string | undefined;
  labelUserPersonalCellphone: string;
  selectedUserPersonalCellphone: number | undefined;
  labelUserCorporateCellphone: string;
  selectedUserCorporateCellphone: number | undefined;
  labelUserServiceType: string;
  selectedUserServiceType: number | undefined;
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
          span={4}
        >
          {selectedUserIdType}
        </Descriptions.Item>

        <Descriptions.Item
          label={labelUserIdNumber}
          style={{ textAlign: "center" }}
          span={4}
        >
          {selectedUserIdNumber}
        </Descriptions.Item>

        <Descriptions.Item
          label={labelUserGender}
          style={{ textAlign: "center" }}
          span={4}
        >
          {selectedUserGender}
        </Descriptions.Item>

        {/* FILA 2 */}

        <Descriptions.Item
          label={labelUserBirthdate}
          style={{ textAlign: "center" }}
          span={4}
        >
          {selectedUserBirthdate}
        </Descriptions.Item>

        <Descriptions.Item
          label={labelUserPersonalEmail}
          style={{ textAlign: "center" }}
          span={4}
        >
          {selectedUserPersonalEmail}
        </Descriptions.Item>

        <Descriptions.Item
          label={labelUserMainEmail}
          style={{ textAlign: "center" }}
          span={4}
        >
          {selectedUserMainEmail}
        </Descriptions.Item>

        {/* FILA 3 */}

        <Descriptions.Item
          label={labelUserCorporateEmail}
          style={{ textAlign: "center" }}
          span={6}
        >
          {selectedUserCorporateEmail}
        </Descriptions.Item>

        <Descriptions.Item
          label={labelUserPersonalCellphone}
          style={{ textAlign: "center" }}
          span={3}
        >
          {selectedUserPersonalCellphone}
        </Descriptions.Item>

        <Descriptions.Item
          label={labelUserCorporateCellphone}
          style={{ textAlign: "center" }}
          span={3}
        >
          {selectedUserCorporateCellphone}
        </Descriptions.Item>

        {/* FILA 4 */}

        <Descriptions.Item
          label={labelUserServiceType}
          style={{ textAlign: "center" }}
          span={3}
        >
          {selectedUserServiceType}
        </Descriptions.Item>

        <Descriptions.Item
          label={labelUserInmediateBoss}
          style={{ textAlign: "center" }}
          span={6}
        >
          {selectedUserInmediateBoss}
        </Descriptions.Item>

        <Descriptions.Item
          label={labelUserUnit}
          style={{ textAlign: "center" }}
          span={3}
        >
          {selectedUserUnit}
        </Descriptions.Item>

        {/* FILA 5 */}

        <Descriptions.Item
          label={labelUserService}
          style={{ textAlign: "center" }}
          span={6}
        >
          {selectedUserService}
        </Descriptions.Item>

        <Descriptions.Item
          label={labelUserPosition}
          style={{ textAlign: "center" }}
          span={6}
        >
          {selectedUserPosition}
        </Descriptions.Item>

        {/* FILA 6 */}

        <Descriptions.Item
          label={labelUserProfileBloodGroup}
          style={{ textAlign: "center" }}
          span={4}
        >
          {selectedUserProfileBloodGroup}
        </Descriptions.Item>

        <Descriptions.Item
          label={labelUserProfileAffiliationEps}
          style={{ textAlign: "center" }}
          span={4}
        >
          {selectedUserProfileAffiliationEps}
        </Descriptions.Item>

        <Descriptions.Item
          label={labelUserProfileResidenceDepartment}
          style={{ textAlign: "center" }}
          span={4}
        >
          {selectedUserProfileResidenceDepartment}
        </Descriptions.Item>

        {/* FILA 7 */}

        <Descriptions.Item
          label={labelUserProfileResidenceCity}
          style={{ textAlign: "center" }}
          span={4}
        >
          {selectedUserProfileResidenceCity}
        </Descriptions.Item>

        <Descriptions.Item
          label={labelUserProfileResidenceNeighborhood}
          style={{ textAlign: "center" }}
          span={4}
        >
          {selectedUserProfileResidenceNeighborhood}
        </Descriptions.Item>

        <Descriptions.Item
          label={labelUserProfileResidenceAddress}
          style={{ textAlign: "center" }}
          span={4}
        >
          {selectedUserProfileResidenceAddress}
        </Descriptions.Item>

        {/* FILA 8 */}

        <Descriptions.Item
          label={labelUserProfileHeight}
          style={{ textAlign: "center" }}
          span={6}
        >
          {selectedUserProfileHeight}
        </Descriptions.Item>

        <Descriptions.Item
          label={labelUserProfileWeight}
          style={{ textAlign: "center" }}
          span={6}
        >
          {selectedUserProfileWeight}
        </Descriptions.Item>

        {/* FILA 9 */}

        <Descriptions.Item
          label={labelUserProfileShirtSize}
          style={{ textAlign: "center" }}
          span={4}
        >
          {selectedUserProfileShirtSize}
        </Descriptions.Item>

        <Descriptions.Item
          label={labelUserProfilePantsSize}
          style={{ textAlign: "center" }}
          span={4}
        >
          {selectedUserProfilePantsSize}
        </Descriptions.Item>

        <Descriptions.Item
          label={labelUserProfileShoeSize}
          style={{ textAlign: "center" }}
          span={4}
        >
          {selectedUserProfileShoeSize}
        </Descriptions.Item>
      </Descriptions>
    </Col>
  );
};

export default ModalUserDetails;
