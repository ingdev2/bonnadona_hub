"use client";

import React from "react";

import { AutoComplete, Button, Col, Form, Input, Row } from "antd";
import CustomSpin from "@/components/common/custom_spin/CustomSpin";
import { titleStyleCss } from "@/theme/text_styles";
import TextArea from "antd/es/input/TextArea";

const PermissionRegistrationFormData: React.FC<{
  handleCreatePermissionDataForm: () => void;
  permissionNameDataForm: string;
  handleOnChangePermissionNameDataForm: (e: any) => void;
  handleSearchNamePermissionDataForm: (e: any) => void;
  optionsPermissionNameDataForm: any[];
  permissionDescriptionDataForm: string;
  handleOnChangePermissionDescriptionDataForm: (e: any) => void;
  buttonSubmitFormLoadingDataForm: boolean;
  handleButtonSubmitFormDataForm: () => void;
}> = ({
  handleCreatePermissionDataForm,
  permissionNameDataForm,
  handleOnChangePermissionNameDataForm,
  handleSearchNamePermissionDataForm,
  optionsPermissionNameDataForm,
  permissionDescriptionDataForm,
  handleOnChangePermissionDescriptionDataForm,
  buttonSubmitFormLoadingDataForm,
  handleButtonSubmitFormDataForm,
}) => {
  return (
    <Form
      id="create-permission-form"
      name="create-permission-form"
      className="create-permission-form"
      onFinish={handleCreatePermissionDataForm}
      initialValues={{ remember: false }}
      autoComplete="false"
      layout="vertical"
      style={{
        width: "72%",
        paddingBlock: "13px",
        paddingInline: "22px",
      }}
    >
      <h2
        className="title-create-permission-form"
        style={{
          ...titleStyleCss,
          textAlign: "center",
          marginBottom: "22px",
        }}
      >
        Crear nuevo permiso
      </h2>

      <Row gutter={24}>
        <Col span={24}>
          <Form.Item
            name="new-permission-name"
            label="Nombre de permiso:"
            style={{ marginBottom: "13px" }}
            normalize={(value) => {
              if (!value) return "";

              const filteredValue = value
                .toUpperCase()
                .replace(/[^A-ZÁÉÍÓÚÑ\s]/g, "");

              return filteredValue;
            }}
            rules={[
              {
                required: true,
                message: "¡Por favor ingrese el nombre del permiso!",
              },
              {
                min: 10,
                message: "El nombre debe tener al menos 10 caracteres",
              },
              {
                max: 50,
                message: "El nombre no puede tener más de 50 caracteres",
              },
              {
                pattern: /^[A-ZÁÉÍÓÚÑ\s]*$/,
                message:
                  "El nombre solo puede contener letras mayúsculas con tildes y espacios",
              },
            ]}
          >
            <AutoComplete
              id="name-permission"
              options={optionsPermissionNameDataForm}
              style={{ width: "100%" }}
              onSearch={handleSearchNamePermissionDataForm}
              placeholder="Nombre de permiso"
              value={permissionNameDataForm}
              onChange={handleOnChangePermissionNameDataForm}
              filterOption={false}
            >
              <Input type="text" autoComplete="off" />
            </AutoComplete>
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={24}>
        <Col span={24}>
          <Form.Item
            name="new-permission-description"
            label="Descripción de permiso:"
            style={{ marginBottom: "13px" }}
            rules={[
              {
                required: true,
                message: "¡Por favor ingresa la descripción del permiso!",
              },
              {
                min: 20,
                message: "La descripción debe tener al menos 20 caracteres",
              },
              {
                max: 200,
                message: "La descripción no puede tener más de 200 caracteres",
              },
            ]}
          >
            <TextArea
              id="description-permission"
              value={permissionDescriptionDataForm}
              placeholder="Descripción de permiso"
              onChange={handleOnChangePermissionDescriptionDataForm}
              autoComplete="off"
              autoSize={{ minRows: 2, maxRows: 10 }}
              maxLength={200}
              style={{ borderRadius: "8px" }}
            />
          </Form.Item>
        </Col>
      </Row>

      <Form.Item style={{ textAlign: "center", marginBlock: "17px" }}>
        {buttonSubmitFormLoadingDataForm ? (
          <CustomSpin />
        ) : (
          <Button
            size="large"
            style={{
              paddingInline: 62,
              borderRadius: 31,
              backgroundColor: "#015E90",
              color: "#f2f2f2",
            }}
            htmlType="submit"
            className="create-permission-form-button"
            onClick={handleButtonSubmitFormDataForm}
          >
            Crear permiso
          </Button>
        )}
      </Form.Item>
    </Form>
  );
};

export default PermissionRegistrationFormData;
