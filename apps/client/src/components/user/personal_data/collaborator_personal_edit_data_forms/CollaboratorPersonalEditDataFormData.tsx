import React from "react";

import { Store } from "antd/es/form/interface";

import { titleStyleCss } from "@/theme/text_styles";
import CustomSpin from "@/components/common/custom_spin/CustomSpin";
import { Button, Col, Divider, Form, Input, Row } from "antd";
import { MdDriveFileRenameOutline } from "react-icons/md";
import { FiPhone } from "react-icons/fi";

const CollaboratorPersonalEditDataFormData: React.FC<{
  principalEmailUserFormData: string;
  onChangePrincipalEmailUserFormData: (e: any) => void;
  personalEmailUserFormData: string;
  onChangePersonalEmailUserFormData: (e: any) => void;
  personalCellphoneFormData: string | undefined;
  onChangePersonalCellphoneFormData: (e: any) => void;
  affiliationEpsUserProfileFormData: string | undefined;
  onChangeAffiliationEpsUserProfileFormData: (e: any) => void;
  residenceDepartmentUserProfileFormData: string | undefined;
  onChangeResidenceDepartmentUserProfileFormData: (e: any) => void;
  residenceCityUserProfileFormData: string | undefined;
  onChangeResidenceCityUserProfileFormData: (e: any) => void;
  residenceNeighborhoodUserProfileFormData: string | undefined;
  onChangeResidenceNeighborhoodUserProfileFormData: (e: any) => void;
  residenceAddressUserProfileUserProfileFormData: string | undefined;
  onChangeResidenceAddressUserProfileFormData: (e: any) => void;
  heightUserProfileFormData: string | undefined;
  onChangeHeightUserProfileFormData: (e: any) => void;
  weightUserProfileFormData: string | undefined;
  onChangeWeightUserProfileFormData: (e: any) => void;
  shirtSizeUserProfileFormData: string | undefined;
  onChangeShirtSizeUserProfileFormData: (e: any) => void;
  pantsSizeUserProfileFormData: string | undefined;
  onChangePantsSizeUserProfileFormData: (e: any) => void;
  shoeSizeUserProfileFormData: string | undefined;
  onChangeShoeSizeUserProfileFormData: (e: any) => void;

  handleChangeEditUserFormData: (
    e: React.FormEvent<HTMLFormElement>
  ) => Promise<void>;
  initialValuesEditAdminFormData: Store | undefined;
  isSubmittingEditUserData: boolean;
  hasChangesFormData: boolean;
  handleButtonClickFormData: () => void;
}> = ({
  principalEmailUserFormData,
  onChangePrincipalEmailUserFormData,
  personalEmailUserFormData,
  onChangePersonalEmailUserFormData,
  personalCellphoneFormData,
  onChangePersonalCellphoneFormData,
  affiliationEpsUserProfileFormData,
  onChangeAffiliationEpsUserProfileFormData,
  residenceDepartmentUserProfileFormData,
  onChangeResidenceDepartmentUserProfileFormData,
  residenceCityUserProfileFormData,
  onChangeResidenceCityUserProfileFormData,
  residenceNeighborhoodUserProfileFormData,
  onChangeResidenceNeighborhoodUserProfileFormData,
  residenceAddressUserProfileUserProfileFormData,
  onChangeResidenceAddressUserProfileFormData,
  heightUserProfileFormData,
  onChangeHeightUserProfileFormData,
  weightUserProfileFormData,
  onChangeWeightUserProfileFormData,
  shirtSizeUserProfileFormData,
  onChangeShirtSizeUserProfileFormData,
  pantsSizeUserProfileFormData,
  onChangePantsSizeUserProfileFormData,
  shoeSizeUserProfileFormData,
  onChangeShoeSizeUserProfileFormData,
  handleChangeEditUserFormData,
  initialValuesEditAdminFormData,
  isSubmittingEditUserData,
  hasChangesFormData,
  handleButtonClickFormData,
}) => {
  return (
    <Form
      id="edit-data-form-user"
      name="edit-data-form-user"
      className="edit-data-form-user"
      onFinish={handleChangeEditUserFormData}
      initialValues={initialValuesEditAdminFormData}
      autoComplete="false"
      layout="vertical"
    >
      <h2
        className="title-change-password-admin"
        style={{
          ...titleStyleCss,
          marginBlock: 22,
          textAlign: "center",
        }}
      >
        Actualizar datos de usuario
      </h2>

      <Row gutter={24}>
        <Col span={12}>
          <Form.Item
            id="current-edit-user-principal-email"
            name="current-edit-user-principal-email"
            className="current-edit-user-principal-email"
            label="Correo principal:"
            style={{ marginBottom: "13px" }}
            rules={[
              {
                required: true,
                message: "¡Por favor ingrese el correo principal!",
              },
              {
                pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                message: "¡Por favor ingrese un correo válido!",
              },
            ]}
          >
            <Input
              prefix={
                <MdDriveFileRenameOutline className="site-form-item-icon" />
              }
              type="text"
              value={principalEmailUserFormData}
              placeholder="Correo principal"
              onChange={onChangePrincipalEmailUserFormData}
              autoComplete="off"
            />
          </Form.Item>
        </Col>

        <Col span={12}>
          <Form.Item
            id="current-edit-user-personal-email"
            name="current-edit-user-personal-email"
            className="current-edit-user-personal-email"
            label="Correo personal:"
            style={{ marginBottom: "13px" }}
            rules={[
              {
                required: true,
                message: "¡Por favor ingrese el correo personal!",
              },
              {
                pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                message: "¡Por favor ingrese un correo válido!",
              },
            ]}
          >
            <Input
              prefix={
                <MdDriveFileRenameOutline className="site-form-item-icon" />
              }
              type="text"
              value={personalEmailUserFormData}
              placeholder="Correo personal"
              onChange={onChangePersonalEmailUserFormData}
              autoComplete="off"
            />
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={24}>
        <Col span={12}>
          <Form.Item
            id="current-edit-user-personal-cellphone"
            name="current-edit-user-personal-cellphone"
            className="current-edit-user-personal-cellphone"
            label="Celular personal:"
            style={{ marginBottom: "13px" }}
            normalize={(value) => {
              if (!value || typeof value !== "string") return "";

              return value.replace(/[^\d+]/g, "");
            }}
            rules={[
              {
                required: false,
                message: "¡Por favor ingresa el número de celular personal!",
              },
              {
                pattern: /^[0-9]+$/,
                message:
                  "¡Por favor ingresa número de celular sin letras ni puntos!",
              },
              {
                min: 7,
                message: "¡Por favor ingresa mínimo 7 números!",
              },
              {
                max: 11,
                message: "¡Por favor ingresa máximo 11 números!",
              },
            ]}
          >
            <Input
              prefix={<FiPhone className="site-form-item-icon" />}
              type="tel"
              value={personalCellphoneFormData}
              placeholder="Número de celular personal"
              onChange={onChangePersonalCellphoneFormData}
              autoComplete="off"
              min={0}
            />
          </Form.Item>
        </Col>
      </Row>

      <Divider />

      <h2
        className="title-change-password-admin"
        style={{
          ...titleStyleCss,
          marginBlock: 22,
          textAlign: "center",
        }}
      >
        Actualizar mi perfil
      </h2>

      <Row gutter={24}>
        <Col span={6}>
          <Form.Item
            id="current-edit-user-principal-email"
            name="current-edit-user-principal-email"
            className="current-edit-user-principal-email"
            label="Tipo de sangre:"
            style={{ marginBottom: "13px" }}
          >
            <Input
              prefix={
                <MdDriveFileRenameOutline className="site-form-item-icon" />
              }
              type="text"
              value={principalEmailUserFormData}
              placeholder="Correo principal"
              onChange={onChangePrincipalEmailUserFormData}
              autoComplete="off"
            />
          </Form.Item>
        </Col>

        <Col span={6}>
          <Form.Item
            id="current-edit-user-affiliation-eps"
            name="current-edit-user-affiliation-eps"
            className="current-edit-user-affiliation-eps"
            label="Afiliación eps:"
            style={{ marginBottom: "13px" }}
          >
            <Input
              prefix={
                <MdDriveFileRenameOutline className="site-form-item-icon" />
              }
              type="text"
              value={affiliationEpsUserProfileFormData}
              placeholder="Afiliación eps"
              onChange={onChangeAffiliationEpsUserProfileFormData}
              autoComplete="off"
            />
          </Form.Item>
        </Col>

        <Col span={6}>
          <Form.Item
            id="current-edit-user-residence-department"
            name="current-edit-user-residence-department"
            className="current-edit-user-residence-department"
            label="Departamento:"
            style={{ marginBottom: "13px" }}
          >
            <Input
              prefix={
                <MdDriveFileRenameOutline className="site-form-item-icon" />
              }
              type="text"
              value={residenceDepartmentUserProfileFormData}
              placeholder="Departamento"
              onChange={onChangeResidenceDepartmentUserProfileFormData}
              autoComplete="off"
            />
          </Form.Item>
        </Col>

        <Col span={6}>
          <Form.Item
            id="current-edit-user-residence-city"
            name="current-edit-user-residence-city"
            className="current-edit-user-residence-city"
            label="Ciudad:"
            style={{ marginBottom: "13px" }}
          >
            <Input
              prefix={
                <MdDriveFileRenameOutline className="site-form-item-icon" />
              }
              type="text"
              value={residenceCityUserProfileFormData}
              placeholder="Ciudad"
              onChange={onChangeResidenceCityUserProfileFormData}
              autoComplete="off"
            />
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={24}>
        <Col span={6}>
          <Form.Item
            id="current-edit-user-residence-neighborhood"
            name="current-edit-user-residence-neighborhood"
            className="current-edit-user-residence-neighborhood"
            label="Barrio:"
            style={{ marginBottom: "13px" }}
          >
            <Input
              prefix={
                <MdDriveFileRenameOutline className="site-form-item-icon" />
              }
              type="text"
              value={residenceNeighborhoodUserProfileFormData}
              placeholder="Barrio"
              onChange={onChangeResidenceNeighborhoodUserProfileFormData}
              autoComplete="off"
            />
          </Form.Item>
        </Col>

        <Col span={6}>
          <Form.Item
            id="current-edit-user-residence-address"
            name="current-edit-user-residence-address"
            className="current-edit-user-residence-address"
            label="Dirección:"
            style={{ marginBottom: "13px" }}
          >
            <Input
              prefix={
                <MdDriveFileRenameOutline className="site-form-item-icon" />
              }
              type="text"
              value={residenceAddressUserProfileUserProfileFormData}
              placeholder="Dirección"
              onChange={onChangeResidenceAddressUserProfileFormData}
              autoComplete="off"
            />
          </Form.Item>
        </Col>

        <Col span={6}>
          <Form.Item
            id="current-edit-user-weight"
            name="current-edit-user-weight"
            className="current-edit-user-weight"
            label="Peso (Kg):"
            style={{ marginBottom: "13px" }}
          >
            <Input
              prefix={
                <MdDriveFileRenameOutline className="site-form-item-icon" />
              }
              type="text"
              value={weightUserProfileFormData}
              placeholder="Peso"
              onChange={onChangeWeightUserProfileFormData}
              autoComplete="off"
            />
          </Form.Item>
        </Col>

        <Col span={6}>
          <Form.Item
            id="current-edit-user-height"
            name="current-edit-user-height"
            className="current-edit-user-height"
            label="Estatura (m):"
            style={{ marginBottom: "13px" }}
          >
            <Input
              prefix={
                <MdDriveFileRenameOutline className="site-form-item-icon" />
              }
              type="text"
              value={heightUserProfileFormData}
              placeholder="Estatura"
              onChange={onChangeHeightUserProfileFormData}
              autoComplete="off"
            />
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={24}>
        <Col span={8}>
          <Form.Item
            id="current-edit-user-shirt-size"
            name="current-edit-user-shirt-size"
            className="current-edit-user-shirt-size"
            label="Talla camisa:"
            style={{ marginBottom: "13px" }}
          >
            <Input
              prefix={
                <MdDriveFileRenameOutline className="site-form-item-icon" />
              }
              type="text"
              value={shirtSizeUserProfileFormData}
              placeholder="Talla camisa"
              onChange={onChangeShirtSizeUserProfileFormData}
              autoComplete="off"
            />
          </Form.Item>
        </Col>

        <Col span={8}>
          <Form.Item
            id="current-edit-user-pants-size"
            name="current-edit-user-pants-size"
            className="current-edit-user-pants-size"
            label="Talla pantalón:"
            style={{ marginBottom: "13px" }}
          >
            <Input
              prefix={
                <MdDriveFileRenameOutline className="site-form-item-icon" />
              }
              type="text"
              value={pantsSizeUserProfileFormData}
              placeholder="Talla pantalón"
              onChange={onChangePantsSizeUserProfileFormData}
              autoComplete="off"
            />
          </Form.Item>
        </Col>

        <Col span={8}>
          <Form.Item
            id="current-edit-user-shoe-size"
            name="current-edit-user-shoe-size"
            className="current-edit-user-shoe-size"
            label="Talla zapatos:"
            style={{ marginBottom: "13px" }}
          >
            <Input
              prefix={
                <MdDriveFileRenameOutline className="site-form-item-icon" />
              }
              type="text"
              value={shoeSizeUserProfileFormData}
              placeholder="Talla zapatos"
              onChange={onChangeShoeSizeUserProfileFormData}
              autoComplete="off"
            />
          </Form.Item>
        </Col>
      </Row>

      <Form.Item
        style={{
          textAlign: "center",
        }}
      >
        {isSubmittingEditUserData ? (
          <CustomSpin />
        ) : (
          <Button
            size="large"
            style={{
              paddingInline: 45,
              borderRadius: 31,
              backgroundColor: !hasChangesFormData ? "#D8D8D8" : "#015E90",
              color: !hasChangesFormData ? "#A0A0A0" : "#f2f2f2",
              marginBlock: 7,
            }}
            htmlType="submit"
            className="edit-data-form-button-user"
            onClick={handleButtonClickFormData}
            disabled={!hasChangesFormData}
          >
            Actualizar datos
          </Button>
        )}
      </Form.Item>
    </Form>
  );
};

export default CollaboratorPersonalEditDataFormData;
