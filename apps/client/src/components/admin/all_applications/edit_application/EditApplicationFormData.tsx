"use client";

import React from "react";

import { Button, Col, Form, Input, Row } from "antd";
import { Store } from "antd/es/form/interface";
import { titleStyleCss } from "@/theme/text_styles";
import CustomSpin from "@/components/common/custom_spin/CustomSpin";
import { MdDriveFileRenameOutline } from "react-icons/md";

const EditApplicationFormData: React.FC<{
  nameApplicationFormData: string;
  onChangeNameApplicationFormData: (e: any) => void;
  entryLinkApplicationFormData: string;
  onChangeEntryLinkApplicationFormData: (e: any) => void;
  handleConfirmDataFormData: (
    e: React.FormEvent<HTMLFormElement>
  ) => Promise<void>;
  initialValuesEditFormData: Store | undefined;
  isSubmittingEditFormData: boolean;
  handleButtonClickFormData: () => void;
  hasChangesFormData: boolean;
}> = ({
  nameApplicationFormData,
  onChangeNameApplicationFormData,
  entryLinkApplicationFormData,
  onChangeEntryLinkApplicationFormData,
  handleConfirmDataFormData,
  initialValuesEditFormData,
  isSubmittingEditFormData,
  handleButtonClickFormData,
  hasChangesFormData,
}) => {
  return (
    <Form
      id="edit-application-form"
      name="edit-application-form"
      className="edit-application-form"
      onFinish={handleConfirmDataFormData}
      initialValues={initialValuesEditFormData}
      autoComplete="false"
      layout="vertical"
      style={{
        width: "100%",
        paddingBlock: "7px",
        paddingInline: "13px",
      }}
    >
      <h2
        className="name-edit-application-form"
        style={{
          ...titleStyleCss,
          textAlign: "center",
          marginTop: "7px",
          marginBottom: "22px",
        }}
      >
        Editar aplicación
      </h2>

      <Row gutter={24}>
        <Col span={24}>
          <Form.Item
            name="edit-application-name"
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
                required: false,
                message: "¡Por favor ingrese el nombre de la aplicación!",
              },
              {
                min: 5,
                message: "El nombre debe tener al menos 5 caracteres",
              },
              {
                max: 40,
                message: "El nombre no puede tener más de 40 caracteres",
              },
              {
                pattern: /^[A-ZÁÉÍÓÚÑ\s]*$/,
                message:
                  "El nombre solo puede contener letras mayúsculas con tildes y espacios",
              },
            ]}
          >
            <Input
              id="name-application"
              prefix={
                <MdDriveFileRenameOutline className="site-form-item-icon" />
              }
              type="text"
              value={nameApplicationFormData}
              placeholder="Nombre de aplicación"
              onChange={onChangeNameApplicationFormData}
              autoComplete="off"
            />
          </Form.Item>

          <Form.Item
            name="edit-entry-link"
            label="Link de ingreso de aplicación:"
            style={{ marginBottom: "13px" }}
            normalize={(value) => {
              if (!value) return "";

              return value.toLowerCase().trim();
            }}
            rules={[
              {
                required: false,
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
              value={entryLinkApplicationFormData}
              onChange={onChangeEntryLinkApplicationFormData}
              autoComplete="off"
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
        {isSubmittingEditFormData ? (
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
              className="edit-application-form-button"
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

export default EditApplicationFormData;
