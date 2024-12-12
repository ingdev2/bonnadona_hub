"use client";

import React, { ReactNode } from "react";

import { Button, Col, Divider, Input, Row, Typography } from "antd";
import { titleStyleCss } from "@/theme/text_styles";

import {
  MdBusinessCenter,
  MdDriveFileRenameOutline,
  MdOutlineEmail,
  MdOutlinePhone,
} from "react-icons/md";

import { GiBodyHeight } from "react-icons/gi";
import { IdcardOutlined } from "@ant-design/icons";
import { TbGenderBigender } from "react-icons/tb";
import { FaCity, FaRegAddressBook, FaUserTie, FaWeight } from "react-icons/fa";
import { IoResizeSharp } from "react-icons/io5";

const CollaboratorPersonalDataFormData: React.FC<{
  nameUserFormData: string;
  lastNameUserFormData: string;
  idTypeNameUserFormData: string;
  idNumberUserFormData: number | string;
  genderNameUserFormData: string;
  positionUserFormData: string;
  serviceUserFormData: string;
  inmediateBossUserFormData: string;
  principalEmailUserFormData: string;
  personalEmailUserFormData: string;
  personalCellphoneUserFormData: number | string;
  corporateCellphoneUserFormData: number | string;
  corporateEmailUserFormData: string;
  bloodGroupAbbrevUserProfileFormData: string;
  affiliationEpsUserProfileFormData: string;
  residenceDepartmentUserProfileFormData: string;
  residenceCityUserProfileFormData: string;
  residenceAddressUserProfileFormData: string;
  residenceNeighborhoodUserProfileFormData: string;
  heightUserProfileFormData: string;
  weightUserProfileFormData: string;
  shirtSizeUserProfileFormData: string;
  pantsSizeUserProfileFormData: string;
  shoesSizeUserProfileFormData: string;
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
  inmediateBossUserFormData,
  principalEmailUserFormData,
  personalEmailUserFormData,
  personalCellphoneUserFormData,
  corporateCellphoneUserFormData,
  corporateEmailUserFormData,
  bloodGroupAbbrevUserProfileFormData,
  affiliationEpsUserProfileFormData,
  residenceDepartmentUserProfileFormData,
  residenceCityUserProfileFormData,
  residenceAddressUserProfileFormData,
  residenceNeighborhoodUserProfileFormData,
  heightUserProfileFormData,
  weightUserProfileFormData,
  shirtSizeUserProfileFormData,
  pantsSizeUserProfileFormData,
  shoesSizeUserProfileFormData,
  iconChangeEditUserDataForm,
  onClickChangeEditUserDataForm,
}) => {
  return (
    <Col
      span={24}
      style={{
        margin: "0px",
        paddingInline: "7px",
        paddingBlock: "7px",
      }}
    >
      <h2
        className="title-personal-data-user"
        style={{
          ...titleStyleCss,
          paddingBottom: "13px",
          textAlign: "center",
        }}
      >
        Mis datos personales
      </h2>

      <Row gutter={24}>
        <Col span={6} style={{ marginBottom: "13px" }}>
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

        <Col span={6} style={{ marginBottom: "13px" }}>
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

        <Col span={6} style={{ marginBottom: "13px" }}>
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

        <Col span={6} style={{ marginBottom: "13px" }}>
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

        <Col span={6} style={{ marginBottom: "13px" }}>
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

        <Col span={6} style={{ marginBottom: "13px" }}>
          <div style={{ textAlign: "start" }}>
            <Typography.Title style={{ marginTop: 7 }} level={5}>
              Jefe inmediato:
            </Typography.Title>

            <Input
              id="inmediate-boss-user-auto-input"
              prefix={<FaUserTie className="site-form-item-icon" />}
              style={{ overflow: "hidden", textOverflow: "ellipsis" }}
              value={inmediateBossUserFormData}
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
              value={principalEmailUserFormData}
              disabled
            />
          </div>
        </Col>

        <Col span={8} style={{ marginBottom: "13px" }}>
          <div style={{ textAlign: "start" }}>
            <Typography.Title style={{ marginTop: 7 }} level={5}>
              Celular corporativo:
            </Typography.Title>

            <Input
              id="corporate-cellphone-user-auto-input"
              prefix={<MdOutlinePhone className="site-form-item-icon" />}
              style={{ overflow: "hidden", textOverflow: "ellipsis" }}
              value={corporateCellphoneUserFormData}
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
              value={personalCellphoneUserFormData}
              disabled
            />
          </div>
        </Col>
      </Row>

      <Row gutter={24}>
        <Col span={12} style={{ marginBottom: "13px" }}>
          <div style={{ textAlign: "start" }}>
            <Typography.Title style={{ marginTop: 7 }} level={5}>
              Correo corporativo:
            </Typography.Title>

            <Input
              id="corporate-email-user-auto-input"
              prefix={<MdOutlineEmail className="site-form-item-icon" />}
              style={{ overflow: "hidden", textOverflow: "ellipsis" }}
              value={corporateEmailUserFormData}
              disabled
            />
          </div>
        </Col>

        <Col span={12} style={{ marginBottom: "13px" }}>
          <div style={{ textAlign: "start" }}>
            <Typography.Title style={{ marginTop: 7 }} level={5}>
              Correo personal:
            </Typography.Title>

            <Input
              id="personal-email-user-auto-input"
              prefix={<MdOutlineEmail className="site-form-item-icon" />}
              style={{ overflow: "hidden", textOverflow: "ellipsis" }}
              value={personalEmailUserFormData}
              disabled
            />
          </div>
        </Col>
      </Row>

      <Divider />

      <h2
        className="title-profile-data-user"
        style={{
          ...titleStyleCss,
          marginBottom: "13px",
          textAlign: "center",
        }}
      >
        Mi perfil
      </h2>

      <Row gutter={24}>
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

        <Col span={6} style={{ marginBottom: "13px" }}>
          <div style={{ textAlign: "start" }}>
            <Typography.Title style={{ marginTop: 7 }} level={5}>
              Grupo sanguíneo:
            </Typography.Title>

            <Input
              id="blood-group-abbrev-user-auto-input"
              prefix={
                <MdDriveFileRenameOutline className="site-form-item-icon" />
              }
              style={{ overflow: "hidden", textOverflow: "ellipsis" }}
              value={bloodGroupAbbrevUserProfileFormData}
              disabled
            />
          </div>
        </Col>

        <Col span={12} style={{ marginBottom: "13px" }}>
          <div style={{ textAlign: "start" }}>
            <Typography.Title style={{ marginTop: 7 }} level={5}>
              Afiliación eps:
            </Typography.Title>

            <Input
              id="affiliation-eps-user-auto-input"
              prefix={
                <MdDriveFileRenameOutline className="site-form-item-icon" />
              }
              style={{ overflow: "hidden", textOverflow: "ellipsis" }}
              value={affiliationEpsUserProfileFormData}
              disabled
            />
          </div>
        </Col>
      </Row>

      <Row gutter={24}>
        <Col span={6} style={{ marginBottom: "13px" }}>
          <div style={{ textAlign: "start" }}>
            <Typography.Title style={{ marginTop: 7 }} level={5}>
              Departamento:
            </Typography.Title>

            <Input
              id="residence-department-user-auto-input"
              prefix={<FaCity className="site-form-item-icon" />}
              style={{ overflow: "hidden", textOverflow: "ellipsis" }}
              value={residenceDepartmentUserProfileFormData}
              disabled
            />
          </div>
        </Col>

        <Col span={6} style={{ marginBottom: "13px" }}>
          <div style={{ textAlign: "start" }}>
            <Typography.Title style={{ marginTop: 7 }} level={5}>
              Ciudad:
            </Typography.Title>

            <Input
              id="residence-city-user-auto-input"
              prefix={<FaCity className="site-form-item-icon" />}
              style={{ overflow: "hidden", textOverflow: "ellipsis" }}
              value={residenceCityUserProfileFormData}
              disabled
            />
          </div>
        </Col>

        <Col span={6} style={{ marginBottom: "13px" }}>
          <div style={{ textAlign: "start" }}>
            <Typography.Title style={{ marginTop: 7 }} level={5}>
              Barrio:
            </Typography.Title>

            <Input
              id="residence-neighborhood-auto-input"
              prefix={<FaCity className="site-form-item-icon" />}
              style={{ overflow: "hidden", textOverflow: "ellipsis" }}
              value={residenceNeighborhoodUserProfileFormData}
              disabled
            />
          </div>
        </Col>

        <Col span={6} style={{ marginBottom: "13px" }}>
          <div style={{ textAlign: "start" }}>
            <Typography.Title style={{ marginTop: 7 }} level={5}>
              Dirección:
            </Typography.Title>

            <Input
              id="residence-address-user-auto-input"
              prefix={<FaRegAddressBook className="site-form-item-icon" />}
              style={{ overflow: "hidden", textOverflow: "ellipsis" }}
              value={residenceAddressUserProfileFormData}
              disabled
            />
          </div>
        </Col>
      </Row>

      <Row gutter={24}>
        <Col span={6} style={{ marginBottom: "13px" }}>
          <div style={{ textAlign: "start" }}>
            <Typography.Title style={{ marginTop: 7 }} level={5}>
              Peso (Kg):
            </Typography.Title>

            <Input
              id="weight-user-auto-input"
              prefix={<FaWeight className="site-form-item-icon" />}
              style={{ overflow: "hidden", textOverflow: "ellipsis" }}
              value={weightUserProfileFormData}
              disabled
            />
          </div>
        </Col>

        <Col span={6} style={{ marginBottom: "13px" }}>
          <div style={{ textAlign: "start" }}>
            <Typography.Title style={{ marginTop: 7 }} level={5}>
              Estatura (m):
            </Typography.Title>

            <Input
              id="height-user-auto-input"
              prefix={<GiBodyHeight className="site-form-item-icon" />}
              style={{ overflow: "hidden", textOverflow: "ellipsis" }}
              value={heightUserProfileFormData}
              disabled
            />
          </div>
        </Col>

        <Col span={4} style={{ marginBottom: "13px" }}>
          <div style={{ textAlign: "start" }}>
            <Typography.Title style={{ marginTop: 7 }} level={5}>
              Talla de camisa:
            </Typography.Title>

            <Input
              id="shirt-size-auto-input"
              prefix={<IoResizeSharp className="site-form-item-icon" />}
              style={{ overflow: "hidden", textOverflow: "ellipsis" }}
              value={shirtSizeUserProfileFormData}
              disabled
            />
          </div>
        </Col>

        <Col span={4} style={{ marginBottom: "13px" }}>
          <div style={{ textAlign: "start" }}>
            <Typography.Title style={{ marginTop: 7 }} level={5}>
              Talla de pantalón:
            </Typography.Title>

            <Input
              id="pants-size-user-auto-input"
              prefix={<IoResizeSharp className="site-form-item-icon" />}
              style={{ overflow: "hidden", textOverflow: "ellipsis" }}
              value={pantsSizeUserProfileFormData}
              disabled
            />
          </div>
        </Col>

        <Col span={4} style={{ marginBottom: "13px" }}>
          <div style={{ textAlign: "start" }}>
            <Typography.Title style={{ marginTop: 7 }} level={5}>
              Talla de zapatos:
            </Typography.Title>

            <Input
              id="shoes-size-user-auto-input"
              prefix={<IoResizeSharp className="site-form-item-icon" />}
              style={{ overflow: "hidden", textOverflow: "ellipsis" }}
              value={shoesSizeUserProfileFormData}
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

export default CollaboratorPersonalDataFormData;
