import React from "react";

import { Button, Col, Form, Input, Row } from "antd";
import { Store } from "antd/es/form/interface";
import { titleStyleCss } from "@/theme/text_styles";
import { MdDriveFileRenameOutline } from "react-icons/md";
import { FiPhone } from "react-icons/fi";
import PhoneInput, { PhoneNumber } from "antd-phone-input";
import CustomSpin from "@/components/common/custom_spin/CustomSpin";

const EditUserFormData: React.FC<{
  principalEmailUserFormData: string;
  onChangePrincipalEmailUserFormData: (e: any) => void;
  corporateEmailUserFormData: string;
  onChangeCorporateEmailUserFormData: (e: any) => void;
  personalEmailUserFormData: string;
  onChangePersonalEmailUserFormData: (e: any) => void;
  personalCellphoneFormData: string | PhoneNumber | undefined;
  onChangePersonalCellphoneFormData: (e: any) => void;
  validatorPersonalCellphoneInputFormData: (
    _: any,
    value: any
  ) => Promise<void>;
  corporateCellphoneFormData: string | PhoneNumber | undefined;
  onChangeCorporateCellphoneFormData: (e: any) => void;
  validatorCorporateCellphoneInputFormData: (
    _: any,
    value: any
  ) => Promise<void>;
  handleConfirmEditAdminFormData: (
    e: React.FormEvent<HTMLFormElement>
  ) => Promise<void>;
  initialValuesEditAdminFormData: Store | undefined;
  isSubmittingEditUserData: boolean;
  hasChangesFormData: boolean;
  handleButtonClickFormData: () => void;
}> = ({
  principalEmailUserFormData,
  onChangePrincipalEmailUserFormData,
  corporateEmailUserFormData,
  onChangeCorporateEmailUserFormData,
  personalEmailUserFormData,
  onChangePersonalEmailUserFormData,
  personalCellphoneFormData,
  onChangePersonalCellphoneFormData,
  validatorPersonalCellphoneInputFormData,
  corporateCellphoneFormData,
  onChangeCorporateCellphoneFormData,
  validatorCorporateCellphoneInputFormData,
  handleConfirmEditAdminFormData,
  initialValuesEditAdminFormData,
  isSubmittingEditUserData,
  hasChangesFormData,
  handleButtonClickFormData,
}) => {
  return (
    <Form
      id="edit-admin-form"
      name="edit-admin-form"
      className="edit-admin-form"
      onFinish={handleConfirmEditAdminFormData}
      initialValues={initialValuesEditAdminFormData}
      autoComplete="false"
      layout="vertical"
      style={{
        width: "100%",
        paddingBlock: "7px",
        paddingInline: "13px",
      }}
    >
      <h2
        className="title-edit-admin-form"
        style={{
          ...titleStyleCss,
          textAlign: "center",
          marginTop: "7px",
          marginBottom: "22px",
        }}
      >
        Editar Usuario
      </h2>

      <Row gutter={24}>
        <Col span={12}>
          <Form.Item
            name="edit-user-principal-email"
            label="Correo principal:"
            style={{ marginBottom: "13px" }}
            rules={[
              { required: true, message: "¡Por favor ingrese el correo!" },
              {
                pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                message: "¡Por favor ingrese un correo válido!",
              },
            ]}
          >
            <Input
              id="principal-email-user"
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
            name="edit-user-corporate-email"
            label="Correo corporativo:"
            style={{ marginBottom: "13px" }}
            rules={[
              { required: true, message: "¡Por favor ingrese el correo!" },
              {
                pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                message: "¡Por favor ingrese un correo válido!",
              },
            ]}
          >
            <Input
              id="corporate-email-user"
              prefix={
                <MdDriveFileRenameOutline className="site-form-item-icon" />
              }
              type="text"
              value={corporateEmailUserFormData}
              placeholder="Correo corporativo"
              onChange={onChangeCorporateEmailUserFormData}
              autoComplete="off"
            />
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={24}>
        <Col span={12}>
          <Form.Item
            name="edit-user-personal-email"
            label="Correo personal:"
            style={{ marginBottom: "13px" }}
            rules={[
              { required: true, message: "¡Por favor ingrese el correo!" },
              {
                pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                message: "¡Por favor ingrese un correo válido!",
              },
            ]}
          >
            <Input
              id="personal-email-user"
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

        <Col span={12}>
          <Form.Item
            name="edit-user-personal-cellphone"
            label="Celular personal:"
            style={{ marginBottom: "13px" }}
            normalize={(value) => {
              if (!value || typeof value !== "string") return "";

              return value.replace(/[^\d+]/g, "");
            }}
            rules={[
              {
                required: false,
                message:
                  "¡Por favor ingresa el número de celular personal del usuario!",
              },
              {
                validator: validatorPersonalCellphoneInputFormData,
              },
            ]}
          >
            <PhoneInput
              prefix={<FiPhone className="site-form-item-icon" />}
              type="tel"
              value={personalCellphoneFormData}
              placeholder="Número de celular personal"
              onChange={onChangePersonalCellphoneFormData}
              autoComplete="off"
              min={0}
              enableSearch
            />
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={24}>
        <Col span={12}>
          <Form.Item
            name="edit-user-corporate-cellphone"
            label="Celular corporativo:"
            style={{ marginBottom: "13px" }}
            normalize={(value) => {
              if (!value || typeof value !== "string") return "";

              return value.replace(/[^\d+]/g, "");
            }}
            rules={[
              {
                required: false,
                message:
                  "¡Por favor ingresa el número de celular corporativo del usuario!",
              },
              {
                validator: validatorCorporateCellphoneInputFormData,
              },
            ]}
          >
            <PhoneInput
              prefix={<FiPhone className="site-form-item-icon" />}
              type="tel"
              value={corporateCellphoneFormData}
              placeholder="Número de celular corporativo"
              onChange={onChangeCorporateCellphoneFormData}
              autoComplete="off"
              min={0}
              enableSearch
            />
          </Form.Item>
        </Col>
      </Row>

      <Form.Item
        style={{
          textAlign: "center",
          marginBlock: "0px",
          paddingBlock: "13px",
        }}
      >
        {isSubmittingEditUserData ? (
          <CustomSpin />
        ) : (
          <div
            style={{
              display: "flex",
              flexFlow: "row",
              justifyContent: "center",
            }}
          >
            <Button
              size="large"
              style={{
                backgroundColor: !hasChangesFormData ? "#D8D8D8" : "#015E90",
                color: !hasChangesFormData ? "#A0A0A0" : "#f2f2f2",
                fontWeight: "bold",
                paddingInline: 54,
                borderRadius: 31,
              }}
              htmlType="submit"
              className="edit-patient-form-button"
              onClick={handleButtonClickFormData}
              disabled={!hasChangesFormData}
            >
              Actualizar datos
            </Button>
          </div>
        )}
      </Form.Item>
    </Form>
  );
};

export default EditUserFormData;
