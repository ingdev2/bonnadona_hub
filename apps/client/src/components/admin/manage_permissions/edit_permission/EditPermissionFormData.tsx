"use client";

import React from "react";

import { Button, Col, Form, Input, Row } from "antd";
import { Store } from "antd/es/form/interface";
import { titleStyleCss } from "@/theme/text_styles";
import CustomSpin from "@/components/common/custom_spin/CustomSpin";
import { MdDriveFileRenameOutline } from "react-icons/md";
import TextArea from "antd/es/input/TextArea";

const EditPermissionFormData: React.FC<{
  namePermissionFormData: string;
  onChangeNamePermissionFormData: (e: any) => void;
  descriptionPermissionFormData: string;
  onChangeDescriptionPermissionFormData: (e: any) => void;
  handleConfirmDataFormData: (
    e: React.FormEvent<HTMLFormElement>
  ) => Promise<void>;
  initialValuesEditFormData: Store | undefined;
  isSubmittingEditFormData: boolean;
  handleButtonClickFormData: () => void;
  hasChangesFormData: boolean;
}> = ({
  namePermissionFormData,
  onChangeNamePermissionFormData,
  descriptionPermissionFormData,
  onChangeDescriptionPermissionFormData,
  handleConfirmDataFormData,
  initialValuesEditFormData,
  isSubmittingEditFormData,
  handleButtonClickFormData,
  hasChangesFormData,
}) => {
  return (
    <Form
      id="edit-permission-form"
      name="edit-permission-form"
      className="edit-permission-form"
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
        className="title-edit-permission-form"
        style={{
          ...titleStyleCss,
          textAlign: "center",
          marginTop: "7px",
          marginBottom: "22px",
        }}
      >
        Editar permiso
      </h2>

      <Row gutter={24}>
        <Col span={24}>
          <Form.Item
            name="edit-permission-name"
            label="Titulo de permiso:"
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
                message: "¡Por favor ingrese el nombre del permiso!",
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
              id="name-permission"
              prefix={
                <MdDriveFileRenameOutline className="site-form-item-icon" />
              }
              type="text"
              value={namePermissionFormData}
              placeholder="Nombre de permiso"
              onChange={onChangeNamePermissionFormData}
              autoComplete="off"
            />
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={24}>
        <Col span={24}>
          <Form.Item
            name="edit-permission-description"
            label="Descripción de permiso:"
            style={{ marginBottom: "13px" }}
            rules={[
              {
                required: false,
                message: "¡Por favor ingresa la descripción del motivo!",
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
              value={descriptionPermissionFormData}
              placeholder="Descripción de permiso"
              onChange={onChangeDescriptionPermissionFormData}
              autoComplete="off"
              autoSize={{ minRows: 2, maxRows: 10 }}
              maxLength={200}
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
              className="edit-permission-form-button"
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

export default EditPermissionFormData;
