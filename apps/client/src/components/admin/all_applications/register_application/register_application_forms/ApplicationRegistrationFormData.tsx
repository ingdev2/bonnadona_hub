"use client";

import React from "react";

import { AutoComplete, Button, Col, Form, Input, Row } from "antd";
import CustomSpin from "@/components/common/custom_spin/CustomSpin";
import { titleStyleCss } from "@/theme/text_styles";

const ApplicationRegistrationFormData: React.FC<{
  handleCreateDataFormData: () => void;
  applicationNameFormData: string;
  handleOnChangeApplicationNameFormData: (e: any) => void;
  applicationEntryLinkFormData: string;
  handleOnChangeApplicationEntryLinkFormData: (e: any) => void;
  handleSearchNameApplicationFormData: (e: any) => void;
  optionsApplicationNameFormData: any[];
  buttonSubmitFormLoadingFormData: boolean;
  handleButtonSubmitFormData: () => void;
}> = ({
  handleCreateDataFormData,
  applicationNameFormData,
  handleOnChangeApplicationNameFormData,
  applicationEntryLinkFormData,
  handleOnChangeApplicationEntryLinkFormData,
  handleSearchNameApplicationFormData,
  optionsApplicationNameFormData,
  buttonSubmitFormLoadingFormData,
  handleButtonSubmitFormData,
}) => {
  return (
    <Form
      id="create-application-form"
      name="create-application-form"
      className="create-application-form"
      onFinish={handleCreateDataFormData}
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
        className="name-create-application-form"
        style={{
          ...titleStyleCss,
          textAlign: "center",
          marginBottom: "22px",
        }}
      >
        Crear aplicación
      </h2>

      <Row gutter={24}>
        <Col span={24}>
          <Form.Item
            name="new-application-name"
            label="Nombre de aplicación:"
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
                message: "¡Por favor ingrese el nombre de aplicación!",
              },
              {
                min: 5,
                message: "El nombre debe tener al menos 5 caracteres",
              },
              {
                max: 20,
                message: "El nombre no puede tener más de 20 caracteres",
              },
              {
                pattern: /^[A-ZÁÉÍÓÚÑ\s]*$/,
                message:
                  "El nombre solo puede contener letras mayúsculas con tildes y espacios",
              },
            ]}
          >
            <AutoComplete
              id="name-application"
              options={optionsApplicationNameFormData}
              style={{ width: "100%" }}
              onSearch={handleSearchNameApplicationFormData}
              placeholder="Nombre de aplicación"
              value={applicationNameFormData}
              onChange={handleOnChangeApplicationNameFormData}
              filterOption={false}
            >
              <Input id="app-link" type="text" autoComplete="off" />
            </AutoComplete>
          </Form.Item>

          <Form.Item
            name="new-entry-link"
            label="Link de ingreso de aplicación:"
            style={{ marginBottom: "13px" }}
            normalize={(value) => {
              if (!value) return "";

              return value.toLowerCase().trim();
            }}
            rules={[
              {
                required: true,
                message:
                  "¡Por favor ingrese el link de ingreso de la aplicación!",
              },
              {
                min: 14,
                message: "El link debe tener al menos 14 caracteres",
              },
              {
                max: 50,
                message: "El link no puede tener más de 50 caracteres",
              },
              {
                pattern: /^https?:\/\/.+$/i,
                message: "El link debe comenzar con http:// o https://",
              },
              {
                pattern:
                  /^(https?:\/\/)[a-z0-9.-]+\.[a-z]{2,}(\/[a-z0-9-._~:/?#[\]@!$&'()*+,;%=]*)?$/i,
                message:
                  "El dominio solo puede contener caracteres válidos para un enlace",
              },
            ]}
          >
            <Input
              id="app-link"
              placeholder="https://example.com"
              value={applicationEntryLinkFormData}
              onChange={handleOnChangeApplicationEntryLinkFormData}
              autoComplete="off"
            />
          </Form.Item>
        </Col>
      </Row>

      <Form.Item style={{ textAlign: "center", marginBlock: "17px" }}>
        {buttonSubmitFormLoadingFormData ? (
          <CustomSpin />
        ) : (
          <Button
            size="middle"
            style={{
              paddingInline: 62,
              borderRadius: 31,
              backgroundColor: "#015E90",
              color: "#f2f2f2",
            }}
            htmlType="submit"
            className="create-application-form-button"
            onClick={handleButtonSubmitFormData}
          >
            Crear aplicación
          </Button>
        )}
      </Form.Item>
    </Form>
  );
};

export default ApplicationRegistrationFormData;
