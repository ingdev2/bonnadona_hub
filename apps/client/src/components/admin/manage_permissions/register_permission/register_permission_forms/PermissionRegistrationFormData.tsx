"use client";

import React, { useState } from "react";

import {
  AutoComplete,
  Button,
  Checkbox,
  Col,
  Form,
  Input,
  Row,
  Tooltip,
} from "antd";
import CustomSpin from "@/components/common/custom_spin/CustomSpin";
import { subtitleStyleCss, titleStyleCss } from "@/theme/text_styles";
import TextArea from "antd/es/input/TextArea";
import { EyeOutlined, EyeInvisibleOutlined } from "@ant-design/icons";

const PermissionRegistrationFormData: React.FC<{
  handleCreatePermissionDataForm: () => void;
  permissionNameDataForm: string;
  handleOnChangePermissionNameDataForm: (e: any) => void;
  handleSearchNamePermissionDataForm: (e: any) => void;
  optionsPermissionNameDataForm: any[];
  permissionDescriptionDataForm: string;
  handleOnChangePermissionDescriptionDataForm: (e: any) => void;
  allAppsFormData: IApplication[] | undefined;
  selectedAppsFormData: number[];
  onChangeAppsFormData: (e: any) => void;
  allAppModulesFormData: IApplicationModule[] | undefined;
  selectedAppModulesFormData: number[];
  onChangeAppModulesFormData: (e: any) => void;
  allModuleActionsFormData: IModuleAction[] | undefined;
  selectedModuleActionsFormData: number[];
  onChangeModuleActionsFormData: (e: any) => void;
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
  allAppsFormData,
  selectedAppsFormData,
  onChangeAppsFormData,
  allAppModulesFormData,
  selectedAppModulesFormData,
  onChangeAppModulesFormData,
  allModuleActionsFormData,
  selectedModuleActionsFormData,
  onChangeModuleActionsFormData,
  buttonSubmitFormLoadingDataForm,
  handleButtonSubmitFormDataForm,
}) => {
  const [expandedApp, setExpandedApp] = useState<number | null>(null);
  const [expandedModule, setExpandedModule] = useState<number | null>(null);

  const filteredModules = (appId: number) =>
    allAppModulesFormData?.filter((module) => module.app_id === appId) ?? [];

  const filteredActions = (moduleId: number) =>
    allModuleActionsFormData?.filter(
      (action) => action.app_module_id === moduleId
    ) ?? [];

  let selectedModulesCount: number[] = expandedApp
    ? filteredModules(expandedApp).map((module) => module.id)
    : [];

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
        width: "96%",
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
              placeholder="Nombre del permiso"
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
            label="Descripción del permiso:"
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

      <Row
        gutter={24}
        justify={"center"}
        align={"top"}
        style={{ paddingBottom: "13px", textAlign: "center" }}
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
                      setExpandedApp(expandedApp === app.id ? null : app.id);
                    }}
                    icon={
                      expandedApp === app.id ? (
                        <EyeInvisibleOutlined style={{ color: "#1D8348" }} />
                      ) : (
                        <EyeOutlined style={{ color: "#8C1111" }} />
                      )
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
              {expandedApp &&
                filteredModules(expandedApp).map((module) => (
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
                      onClick={() =>
                        setExpandedModule(
                          expandedModule === module.id ? null : module.id
                        )
                      }
                      icon={
                        expandedModule === module.id ? (
                          <EyeInvisibleOutlined style={{ color: "#1D8348" }} />
                        ) : (
                          <EyeOutlined style={{ color: "#8C1111" }} />
                        )
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

            {expandedApp && selectedModulesCount.length ? (
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
                  {allAppsFormData?.find((app) => app.id === expandedApp)
                    ?.name || null}
                </b>
              </p>
            ) : null}

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
              {expandedModule && selectedModulesCount.includes(expandedModule)
                ? filteredActions(expandedModule).map((action) => (
                    <Checkbox
                      key={action.id}
                      value={action.id}
                      style={{ width: "96%" }}
                    >
                      <Tooltip title={action.name}>{action.name}</Tooltip>
                    </Checkbox>
                  ))
                : null}
            </Checkbox.Group>
          </Col>
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
