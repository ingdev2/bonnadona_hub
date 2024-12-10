"use client";

import React from "react";

import { Button, Checkbox, Col, Form, Input, Row, Tooltip } from "antd";
import { Store } from "antd/es/form/interface";
import { subtitleStyleCss, titleStyleCss } from "@/theme/text_styles";
import CustomSpin from "@/components/common/custom_spin/CustomSpin";
import { MdDriveFileRenameOutline } from "react-icons/md";
import TextArea from "antd/es/input/TextArea";
import { EyeOutlined, EyeInvisibleOutlined } from "@ant-design/icons";

const EditPermissionFormData: React.FC<{
  namePermissionFormData: string;
  onChangeNamePermissionFormData: (e: any) => void;
  descriptionPermissionFormData: string;
  onChangeDescriptionPermissionFormData: (e: any) => void;
  allAppsFormData: IApplication[] | undefined;
  selectedAppsFormData: number[];
  onChangeAppsFormData: (e: any) => void;
  allAppModulesFormData: IApplicationModule[] | undefined;
  selectedAppModulesFormData: number[];
  onChangeAppModulesFormData: (e: any) => void;
  allModuleActionsFormData: IModuleAction[] | undefined;
  selectedModuleActionsFormData: number[];
  onChangeModuleActionsFormData: (e: any) => void;
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
  allAppsFormData,
  selectedAppsFormData,
  onChangeAppsFormData,
  allAppModulesFormData,
  selectedAppModulesFormData,
  onChangeAppModulesFormData,
  allModuleActionsFormData,
  selectedModuleActionsFormData,
  onChangeModuleActionsFormData,
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
                .replace(/[^A-ZÁÉÍÓÚÑ0-9\s]/g, "");

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
            normalize={(value) => {
              if (!value) return "";

              const filteredValue = value
                .toUpperCase()
                .replace(/[^A-ZÁÉÍÓÚÑ0-9\s]/g, "");

              return filteredValue;
            }}
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
              style={{ borderRadius: "8px" }}
            />
          </Form.Item>
        </Col>
      </Row>

      <Row
        gutter={24}
        justify={"center"}
        align={"top"}
        style={{ paddingBottom: "13px" }}
      >
        <h2 style={{ ...titleStyleCss, paddingBlock: "7px" }}>
          Modificar acceso
        </h2>

        <Col
          span={24}
          style={{
            display: "flex",
            flexFlow: "row",
            gap: "13px",
            justifyContent: "center",
            alignContent: "center",
          }}
        >
          <Col
            span={8}
            style={{
              overflowY: "auto",
              maxHeight: "720px",
              padding: "7px",
              border: "1px solid #013B5A",
              borderRadius: "8px",
            }}
          >
            <h3 style={{ marginTop: "7px", marginBottom: "13px" }}>
              Aplicaciones
            </h3>

            <Checkbox.Group
              value={selectedAppsFormData}
              onChange={onChangeAppsFormData}
              style={{
                display: "flex",
                flexFlow: "column wrap",
                gap: "13px",
                paddingBottom: "13px",
              }}
            >
              {allAppsFormData?.map((app) => (
                <div
                  key={app.id}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <Checkbox value={app.id} style={{ width: "96%" }}>
                    <Tooltip title={app.name}>{app.name}</Tooltip>
                  </Checkbox>

                  <Button
                    size="small"
                    type="dashed"
                    onClick={() => {
                      console.log("sele modu", selectedAppModulesFormData);
                      console.log("sele acti", selectedModuleActionsFormData);
                    }}
                    icon={
                      <EyeInvisibleOutlined style={{ color: "#1D8348" }} />

                      // <EyeOutlined style={{ color: "#8C1111" }} />
                    }
                  />
                </div>
              ))}
            </Checkbox.Group>
          </Col>

          <Col
            span={8}
            style={{
              overflowY: "auto",
              maxHeight: "720px",
              padding: "7px",
              border: "1px solid #013B5A",
              borderRadius: "8px",
            }}
          >
            <h3 style={{ marginTop: "7px", marginBottom: "13px" }}>Módulos</h3>

            <Checkbox.Group
              value={selectedAppModulesFormData}
              onChange={onChangeAppModulesFormData}
              style={{
                display: "flex",
                flexFlow: "column wrap",
                gap: "13px",
                paddingBottom: "13px",
              }}
            >
              {allAppModulesFormData?.map((module) => (
                <div
                  key={module.id}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <Checkbox value={module.id} style={{ width: "96%" }}>
                    <Tooltip title={module.name}>{module.name}</Tooltip>
                  </Checkbox>

                  <Button
                    size="small"
                    type="dashed"
                    onClick={() => {
                      console.log("sele modu", selectedAppModulesFormData);
                      console.log("sele acti", selectedModuleActionsFormData);
                    }}
                    icon={
                      // <EyeInvisibleOutlined style={{ color: "#1D8348" }} />

                      <EyeOutlined style={{ color: "#8C1111" }} />
                    }
                  />
                </div>
              ))}
            </Checkbox.Group>
          </Col>

          <Col
            span={8}
            style={{
              overflowY: "auto",
              maxHeight: "720px",
              padding: "7px",
              border: "1px solid #013B5A",
              borderRadius: "8px",
            }}
          >
            <h3 style={{ marginTop: "7px", marginBottom: "13px" }}>Acciones</h3>
            <p
              style={{
                ...subtitleStyleCss,
                fontStyle: "italic",
                color: "#A7AFBA",
                marginTop: "2px",
                marginBottom: "13px",
              }}
            >
              Acciones de:&nbsp;
              <b>
                {/* Mostrar aqui el nombre del módulo al que pertenecen las acciones */}
              </b>
            </p>

            <Checkbox.Group
              value={selectedModuleActionsFormData}
              onChange={onChangeModuleActionsFormData}
              style={{
                display: "flex",
                flexFlow: "column wrap",
                gap: "13px",
                paddingBottom: "13px",
              }}
            >
              {allModuleActionsFormData?.map((action) => (
                <Checkbox
                  key={action.id}
                  value={action.id}
                  style={{ width: "96%" }}
                >
                  <Tooltip title={action.name}>{action.name}</Tooltip>
                </Checkbox>
              ))}
            </Checkbox.Group>
          </Col>
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
