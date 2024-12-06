import React from "react";

import { Store } from "antd/es/form/interface";

import { titleStyleCss } from "@/theme/text_styles";
import PhoneInput, { PhoneNumber } from "antd-phone-input";
import CustomSpin from "@/components/common/custom_spin/CustomSpin";
import { Button, Form, Input } from "antd";
import { MdDriveFileRenameOutline } from "react-icons/md";
import { FiPhone } from "react-icons/fi";

const UserPersonalEditDataFormData: React.FC<{
  principalEmailUserFormData: string;
  onChangePrincipalEmailUserFormData: (e: any) => void;
  personalEmailUserFormData: string;
  onChangePersonalEmailUserFormData: (e: any) => void;
  personalCellphoneFormData: string | undefined;
  onChangePersonalCellphoneFormData: (e: any) => void;
  validatorPersonalCellphoneInputFormData: (
    _: any,
    value: any
  ) => Promise<void>;
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
  validatorPersonalCellphoneInputFormData,
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
          prefix={<MdDriveFileRenameOutline className="site-form-item-icon" />}
          type="text"
          value={principalEmailUserFormData}
          placeholder="Correo principal"
          onChange={onChangePrincipalEmailUserFormData}
          autoComplete="off"
        />
      </Form.Item>

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
          prefix={<MdDriveFileRenameOutline className="site-form-item-icon" />}
          type="text"
          value={personalEmailUserFormData}
          placeholder="Correo personal"
          onChange={onChangePersonalEmailUserFormData}
          autoComplete="off"
        />
      </Form.Item>

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

export default UserPersonalEditDataFormData;
