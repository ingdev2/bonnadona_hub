"use client";

import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";

import { Button, Checkbox, Col, Form, Input, Row, Tooltip } from "antd";
import { Store } from "antd/es/form/interface";
import { subtitleStyleCss, titleStyleCss } from "@/theme/text_styles";
import CustomSpin from "@/components/common/custom_spin/CustomSpin";
import { MdDriveFileRenameOutline } from "react-icons/md";
import TextArea from "antd/es/input/TextArea";
import { EyeOutlined, EyeInvisibleOutlined } from "@ant-design/icons";

import {
  setSelectedActionsPermission,
  setSelectedModulesPermission,
} from "@/redux/features/permission/permissionSlice";

const EditPermissionFormData: React.FC<{
  namePermissionFormData: string;
  onChangeNamePermissionFormData: (e: any) => void;
  descriptionPermissionFormData: string;
  onChangeDescriptionPermissionFormData: (e: any) => void;
  allAppsFormData: IApplication[] | undefined;
  selectedAppsFormData: number[];
  onChangeAppsFormData: (e: any) => void;
  allAppModulesFormData: IApplicationModule[] | undefined;
  allModuleActionsFormData: IModuleAction[] | undefined;
  setHasChangesFormData: React.Dispatch<React.SetStateAction<boolean>>;
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
  allModuleActionsFormData,
  setHasChangesFormData,
  handleConfirmDataFormData,
  initialValuesEditFormData,
  isSubmittingEditFormData,
  handleButtonClickFormData,
  hasChangesFormData,
}) => {
  const dispatch = useAppDispatch();

  const selectedModulesPermissionState = useAppSelector(
    (state) => state.permission.selected_modules
  );
  const selectedActionsPermissionState = useAppSelector(
    (state) => state.permission.selected_actions
  );

  const [expandedApp, setExpandedApp] = useState<number | null>(null);
  const [expandedModule, setExpandedModule] = useState<number | null>(null);

  const [selectedModulesByApp, setSelectedModulesByApp] = useState<{
    [appId: number]: number[];
  }>({});
  const [selectedActionsByModule, setSelectedActionsByModule] = useState<{
    [moduleId: number]: number[];
  }>({});

  useEffect(() => {
    if (
      selectedModulesPermissionState &&
      selectedModulesPermissionState.length > 0 &&
      !expandedApp
    ) {
      const modulesByApp: { [appId: number]: number[] } = {};

      selectedModulesPermissionState.forEach((moduleId) => {
        const module = allAppModulesFormData?.find(
          (mod) => mod.id === moduleId
        );
        if (module) {
          const appId = module.app_id;
          if (!modulesByApp[appId]) {
            modulesByApp[appId] = [];
          }
          modulesByApp[appId].push(moduleId);
        }
      });

      setSelectedModulesByApp(modulesByApp);
    }

    if (
      selectedActionsPermissionState &&
      selectedActionsPermissionState.length > 0 &&
      !expandedApp
    ) {
      const actionsByModule: { [moduleId: number]: number[] } = {};

      selectedActionsPermissionState.forEach((actionId) => {
        const action = allModuleActionsFormData?.find(
          (act) => act.id === actionId
        );
        if (action) {
          const moduleId = action.app_module_id;
          if (!actionsByModule[moduleId]) {
            actionsByModule[moduleId] = [];
          }
          actionsByModule[moduleId].push(actionId);
        }
      });

      setSelectedActionsByModule(actionsByModule);
    }
  }, [
    selectedModulesPermissionState,
    selectedActionsPermissionState,
    allAppModulesFormData,
    allModuleActionsFormData,
  ]);

  const selectedModules = selectedModulesByApp[expandedApp as number] || [];

  const selectedActions =
    selectedActionsByModule[expandedModule as number] || [];

  const toggleExpandedApp = (appId: number) => {
    setExpandedApp((prev) => (prev === appId ? null : appId));

    setExpandedModule(null);
  };

  const toggleExpandedModule = (moduleId: number) => {
    setExpandedModule((prev) => (prev === moduleId ? null : moduleId));
  };

  const handleModuleSelectionChange = (moduleIds: number[]) => {
    setHasChangesFormData(true);

    setSelectedModulesByApp((prev) => ({
      ...prev,
      [expandedApp as number]: moduleIds,
    }));
  };

  const handleActionSelectionChange = (actionIds: number[]) => {
    setHasChangesFormData(true);

    setSelectedActionsByModule((prev) => ({
      ...prev,
      [expandedModule as number]: actionIds,
    }));
  };

  const handleUpdateData = () => {
    const flatModules = Object.values(selectedModulesByApp).flat();

    const flatActions = Object.values(selectedActionsByModule).flat();

    dispatch(setSelectedModulesPermission(flatModules));
    dispatch(setSelectedActionsPermission(flatActions));

    handleButtonClickFormData();
  };

  const filteredModules = allAppModulesFormData?.filter(
    (module) => module.app_id === expandedApp
  );

  const filteredActions = allModuleActionsFormData?.filter(
    (action) => action.app_module_id === expandedModule
  );

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
              maxHeight: "321px",
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
                    onClick={() => toggleExpandedApp(app.id)}
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
              maxHeight: "321px",
              padding: "7px",
              border: "1px solid #013B5A",
              borderRadius: "8px",
            }}
          >
            <h3 style={{ marginTop: "7px", marginBottom: "13px" }}>Módulos</h3>

            <Checkbox.Group
              value={selectedModules}
              onChange={handleModuleSelectionChange}
              style={{
                display: "flex",
                flexFlow: "column wrap",
                gap: "22px",
                paddingBottom: "13px",
              }}
            >
              {filteredModules?.map((module) => (
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
                    onClick={() => toggleExpandedModule(module.id)}
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
              maxHeight: "321px",
              padding: "7px",
              border: "1px solid #013B5A",
              borderRadius: "8px",
            }}
          >
            <h3 style={{ marginTop: "7px", marginBottom: "13px" }}>Acciones</h3>

            {expandedApp && expandedModule ? (
              <p
                style={{
                  ...subtitleStyleCss,
                  fontStyle: "italic",
                  color: "#A7AFBA",
                  marginTop: "2px",
                  marginBottom: "22px",
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
              value={selectedActions}
              onChange={handleActionSelectionChange}
              style={{
                display: "flex",
                flexFlow: "column wrap",
                gap: "22px",
                paddingBottom: "13px",
              }}
            >
              {filteredActions?.map((action) => (
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
              onClick={handleUpdateData}
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
