"use client";

import React, { ReactNode } from "react";

import { Button, Col, Input, Row, Typography } from "antd";
import { titleStyleCss } from "@/theme/text_styles";

import {
  MdBusinessCenter,
  MdDriveFileRenameOutline,
  MdOutlineEmail,
  MdOutlinePhone,
} from "react-icons/md";
import { IdcardOutlined } from "@ant-design/icons";
import { TbGenderBigender } from "react-icons/tb";

const AdminPersonalDataFormData: React.FC<{
  nameUserFormData: string;
  lastNameUserFormData: string;
  idTypeNameUserFormData: string;
  idNumberUserFormData: number | string;
  genderNameUserFormData: string;
  positionUserFormData: string;
  serviceUserFormData: string;
  principalEmailUserUserFormData: string;
  personalEmailUserUserFormData: string;
  personalCellphoneUserUserFormData: number | string;
  iconChangeEditUserDataForm: ReactNode;
  onClickChangeEditUserDataForm: () => void;
}> = ({
  nameUserFormData,
  lastNameUserFormData,
  idTypeNameUserFormData,
  idNumberUserFormData,
  genderNameUserFormData,
  positionUserFormData,
  serviceUserFormData,
  principalEmailUserUserFormData,
  personalEmailUserUserFormData,
  personalCellphoneUserUserFormData,
  iconChangeEditUserDataForm,
  onClickChangeEditUserDataForm,
}) => {
  return (
    <Col
      span={24}
      style={{
        margin: "0px",
        paddingInline: "13px",
        paddingTop: "13px",
      }}
    >
      <h2
        className="title-personal-data-user"
        style={{
          ...titleStyleCss,
          marginBottom: "13px",
          textAlign: "center",
        }}
      >
        Mis datos personales
      </h2>

      <Row gutter={24}>
        <Col span={12} style={{ marginBottom: "13px" }}>
          <div style={{ textAlign: "start" }}>
            <Typography.Title style={{ marginTop: 7 }} level={5}>
              Nombre(s):
            </Typography.Title>

            <Input
              id="name-user-auto-input"
              prefix={
                <MdDriveFileRenameOutline className="site-form-item-icon" />
              }
              style={{ overflow: "hidden", textOverflow: "ellipsis" }}
              value={nameUserFormData}
              disabled
            />
          </div>
        </Col>

        <Col span={12} style={{ marginBottom: "13px" }}>
          <div style={{ textAlign: "start" }}>
            <Typography.Title style={{ marginTop: 7 }} level={5}>
              Apellido(s):
            </Typography.Title>

            <Input
              id="last-name-user-auto-input"
              prefix={
                <MdDriveFileRenameOutline className="site-form-item-icon" />
              }
              style={{ overflow: "hidden", textOverflow: "ellipsis" }}
              value={lastNameUserFormData}
              disabled
            />
          </div>
        </Col>
      </Row>

      <Row gutter={24}>
        <Col span={10} style={{ marginBottom: "13px" }}>
          <div style={{ textAlign: "start" }}>
            <Typography.Title style={{ marginTop: 7 }} level={5}>
              Tipo de documento:
            </Typography.Title>

            <Input
              id="id-type-user-auto-input"
              prefix={<IdcardOutlined className="site-form-item-icon" />}
              style={{ overflow: "hidden", textOverflow: "ellipsis" }}
              value={idTypeNameUserFormData}
              disabled
            />
          </div>
        </Col>

        <Col span={8} style={{ marginBottom: "13px" }}>
          <div style={{ textAlign: "start" }}>
            <Typography.Title style={{ marginTop: 7 }} level={5}>
              Número de documento:
            </Typography.Title>

            <Input
              id="id-number-user-auto-input"
              prefix={<IdcardOutlined className="site-form-item-icon" />}
              style={{ overflow: "hidden", textOverflow: "ellipsis" }}
              value={idNumberUserFormData}
              disabled
            />
          </div>
        </Col>

        <Col span={6} style={{ marginBottom: "13px" }}>
          <div style={{ textAlign: "start" }}>
            <Typography.Title style={{ marginTop: 7 }} level={5}>
              Género:
            </Typography.Title>

            <Input
              id="gender-user-auto-input"
              prefix={<TbGenderBigender className="site-form-item-icon" />}
              style={{ overflow: "hidden", textOverflow: "ellipsis" }}
              value={genderNameUserFormData}
              disabled
            />
          </div>
        </Col>
      </Row>

      <Row gutter={24}>
        <Col span={12} style={{ marginBottom: "13px" }}>
          <div style={{ textAlign: "start" }}>
            <Typography.Title style={{ marginTop: 7 }} level={5}>
              Cargo:
            </Typography.Title>

            <Input
              id="position-user-auto-input"
              prefix={<MdBusinessCenter className="site-form-item-icon" />}
              style={{ overflow: "hidden", textOverflow: "ellipsis" }}
              value={positionUserFormData}
              disabled
            />
          </div>
        </Col>

        <Col span={12} style={{ marginBottom: "13px" }}>
          <div style={{ textAlign: "start" }}>
            <Typography.Title style={{ marginTop: 7 }} level={5}>
              Servicio:
            </Typography.Title>

            <Input
              id="service-user-auto-input"
              prefix={<MdBusinessCenter className="site-form-item-icon" />}
              style={{ overflow: "hidden", textOverflow: "ellipsis" }}
              value={serviceUserFormData}
              disabled
            />
          </div>
        </Col>
      </Row>

      <Row gutter={24}>
        <Col span={8} style={{ marginBottom: "13px" }}>
          <div style={{ textAlign: "start" }}>
            <Typography.Title style={{ marginTop: 7 }} level={5}>
              Correo principal:
            </Typography.Title>

            <Input
              id="principal-email-user-auto-input"
              prefix={<MdOutlineEmail className="site-form-item-icon" />}
              style={{ overflow: "hidden", textOverflow: "ellipsis" }}
              value={principalEmailUserUserFormData}
              disabled
            />
          </div>
        </Col>

        <Col span={8} style={{ marginBottom: "13px" }}>
          <div style={{ textAlign: "start" }}>
            <Typography.Title style={{ marginTop: 7 }} level={5}>
              Correo personal:
            </Typography.Title>

            <Input
              id="personal-email-user-auto-input"
              prefix={<MdOutlineEmail className="site-form-item-icon" />}
              style={{ overflow: "hidden", textOverflow: "ellipsis" }}
              value={personalEmailUserUserFormData}
              disabled
            />
          </div>
        </Col>

        <Col span={8} style={{ marginBottom: "13px" }}>
          <div style={{ textAlign: "start" }}>
            <Typography.Title style={{ marginTop: 7 }} level={5}>
              Celular personal:
            </Typography.Title>

            <Input
              id="personal-cellphone-user-auto-input"
              prefix={<MdOutlinePhone className="site-form-item-icon" />}
              style={{ overflow: "hidden", textOverflow: "ellipsis" }}
              value={personalCellphoneUserUserFormData}
              disabled
            />
          </div>
        </Col>
      </Row>

      <div
        style={{
          display: "flex",
          flexFlow: "column wrap",
          alignItems: "center",
          alignContent: "center",
          justifyContent: "center",
          paddingTop: "22px",
          paddingBottom: "13px",
        }}
      >
        <Button
          style={{
            paddingInline: 13,
            color: "#015E90",
            borderColor: "#015E90",
            fontWeight: "bold",
            borderRadius: "31px",
            borderWidth: 2,
            display: "flex",
            flexFlow: "row wrap",
            alignContent: "center",
            alignItems: "center",
          }}
          type="text"
          size="middle"
          className="change-data-user"
          icon={iconChangeEditUserDataForm}
          onClick={onClickChangeEditUserDataForm}
        >
          Actualizar datos
        </Button>
      </div>
    </Col>
  );
};

export default AdminPersonalDataFormData;
