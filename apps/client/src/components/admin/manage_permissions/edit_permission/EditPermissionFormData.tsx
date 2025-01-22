"use client";

import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";

import { Button, Checkbox, Col, Form, Input, Row, Tooltip } from "antd";
import TextArea from "antd/es/input/TextArea";
import { Store } from "antd/es/form/interface";

import { subtitleStyleCss, titleStyleCss } from "@/theme/text_styles";
import CustomSpin from "@/components/common/custom_spin/CustomSpin";

import { MdDriveFileRenameOutline } from "react-icons/md";
import { EyeOutlined, EyeInvisibleOutlined } from "@ant-design/icons";

import {
  setSelectedModulesPermission,
  setSelectedActionsPermission,
  setSelectedApplicationsPermission,
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

  const selectedAppsPermissionState = useAppSelector(
    (state) => state.permission.selected_applications
  );
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

  const [filterTextApp, setFilterTextApp] = useState("");
  const [autocompleteResultsApps, setAutocompleteResultsApps] = useState<
    IApplication[]
  >([]);
  const [selectAllApps, setSelectAllApps] = useState(false);

  const [filterTextModule, setFilterTextModule] = useState("");
  const [autocompleteResultsModules, setAutocompleteResultsModules] = useState<
    IApplicationModule[]
  >([]);
  const [selectAllModules, setSelectAllModules] = useState(false);

  const [selectAllModuleActions, setSelectAllModuleActions] = useState(false);

  useEffect(() => {
    if (
      selectedModulesPermissionState &&
      selectedModulesPermissionState.length > 0 &&
      !expandedApp
    ) {
      const modulesByApp: { [appId: number]: number[] } = {};

      selectedModulesPermissionState.forEach((moduleId) => {
        const appModule = allAppModulesFormData?.find(
          (mod) => mod.id === moduleId
        );

        if (appModule) {
          const appId = appModule.app_id;

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

  useEffect(() => {
    if (filterTextApp.trim() && allAppsFormData) {
      const regex = new RegExp(filterTextApp.trim(), "i");

      const results = allAppsFormData.filter((app) => regex.test(app.name));

      setAutocompleteResultsApps(results);
    } else {
      setAutocompleteResultsApps([]);
    }

    if (filterTextModule.trim() && allAppModulesFormData) {
      const regex = new RegExp(filterTextModule.trim(), "i");

      const results = allAppModulesFormData.filter((module) =>
        regex.test(module.name)
      );

      setAutocompleteResultsModules(results);
    } else {
      setAutocompleteResultsModules([]);
    }
  }, [filterTextApp, filterTextModule, allAppsFormData, allAppModulesFormData]);

  const handleAutocompleteSelectApp = (app: IApplication) => {
    const appId = app.id;

    if (selectedAppsFormData?.includes(appId)) {
      const updatedAppIds = selectedAppsPermissionState?.filter(
        (id) => id !== appId
      );

      dispatch(setSelectedApplicationsPermission(updatedAppIds));

      setHasChangesFormData(true);
    } else {
      dispatch(
        setSelectedApplicationsPermission([
          ...(selectedAppsPermissionState || []),
          appId,
        ])
      );
    }

    setHasChangesFormData(true);

    setFilterTextApp("");
    setAutocompleteResultsApps([]);
  };

  const handleAutocompleteSelectModule = (module: IApplicationModule) => {
    const moduleId = module.id;
    const appId = module.app_id;

    if (selectedModulesPermissionState?.includes(moduleId)) {
      const updatedModuleIds = selectedModulesPermissionState.filter(
        (id) => id !== moduleId
      );

      dispatch(setSelectedModulesPermission(updatedModuleIds));

      setSelectedModulesByApp((prev) => ({
        ...prev,
        [appId]: prev[appId]?.filter((id) => id !== moduleId) || [],
      }));

      setHasChangesFormData(true);
    } else {
      dispatch(
        setSelectedModulesPermission([
          ...(selectedModulesPermissionState || []),
          moduleId,
        ])
      );

      setSelectedModulesByApp((prev) => ({
        ...prev,
        [appId]: [...(prev[appId] || []), moduleId],
      }));

      setHasChangesFormData(true);
    }

    setFilterTextModule("");
    setAutocompleteResultsModules([]);
  };

  const handleSelectAllApps = (checked: boolean) => {
    setSelectAllApps(checked);

    if (checked && allAppsFormData) {
      const allAppIds = allAppsFormData.map((app) => app.id);
      onChangeAppsFormData(allAppIds);
    } else {
      onChangeAppsFormData([]);
    }

    setHasChangesFormData(true);
  };

  const handleSelectAllModules = (checked: boolean) => {
    setSelectAllModules(checked);

    if (checked && allAppModulesFormData && expandedApp) {
      const appModules = allAppModulesFormData.filter(
        (module) => module.app_id === expandedApp
      );

      const allModulesIds = appModules.map((module) => module.id);

      setSelectedModulesByApp((prev) => ({
        ...prev,
        [expandedApp]: allModulesIds,
      }));

      setHasChangesFormData(true);
    } else if (expandedApp) {
      setSelectedModulesByApp((prev) => ({
        ...prev,
        [expandedApp]: [],
      }));

      setHasChangesFormData(true);
    }
  };

  const handleSelectAllActions = (checked: boolean) => {
    setSelectAllModuleActions(checked);

    if (checked && filteredActions) {
      const allActionIds = filteredActions.map((action) => action.id);

      setSelectedActionsByModule((prev) => ({
        ...prev,
        [expandedModule as number]: allActionIds,
      }));
    } else if (expandedModule) {
      setSelectedActionsByModule((prev) => ({
        ...prev,
        [expandedModule as number]: [],
      }));
    }

    setHasChangesFormData(true);
  };

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

        {!allAppsFormData &&
        !allAppModulesFormData &&
        !allModuleActionsFormData ? (
          <CustomSpin />
        ) : (
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
                maxHeight: "450px",
                padding: "7px",
                border: "1px solid #013B5A",
                borderRadius: "8px",
              }}
            >
              <h3 style={{ marginTop: "7px", marginBottom: "13px" }}>
                Aplicaciones
              </h3>

              <div
                style={{
                  display: "flex",
                  width: "100%",
                  backgroundColor: "#013B5A31",
                  justifyContent: "center",
                  alignContent: "center",
                  alignItems: "center",
                  padding: "0px",
                  marginBottom: "17px",
                  borderRadius: "7px",
                }}
              >
                <Checkbox
                  checked={selectAllApps}
                  onChange={(e) => handleSelectAllApps(e.target.checked)}
                  style={{ marginBlock: "7px" }}
                >
                  SELECCIONAR TODAS
                </Checkbox>
              </div>

              <Input
                placeholder="Buscar aplicación"
                value={filterTextApp}
                onChange={(e) => {
                  const inputValue = e.target.value || "";

                  const transformedValue = inputValue
                    .toUpperCase()
                    .replace(/[^A-ZÁÉÍÓÚÜÑ0-9\s]/g, "");

                  setFilterTextApp(transformedValue);
                }}
                allowClear
                style={{ marginBottom: "17px" }}
              />

              {autocompleteResultsApps.length > 0 && (
                <div
                  style={{
                    width: "100%",
                    maxHeight: "113px",
                    backgroundColor: "#F7F7F7",
                    border: "0.7px solid #A7AFBA",
                    borderRadius: "7px",
                    overflowY: "auto",
                    zIndex: 2,
                    marginBottom: "13px",
                  }}
                >
                  {autocompleteResultsApps.map((app) => (
                    <div
                      key={app.id}
                      style={{
                        padding: "8px",
                        cursor: "pointer",
                        borderBottom: "0.7px solid #eee",
                      }}
                      onClick={() => handleAutocompleteSelectApp(app)}
                    >
                      {app.name}
                    </div>
                  ))}
                </div>
              )}

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
                      size="middle"
                      type="dashed"
                      onClick={() => {
                        toggleExpandedApp(app.id), setSelectAllModules(false);
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
                maxHeight: "450px",
                padding: "7px",
                border: "1px solid #013B5A",
                borderRadius: "8px",
              }}
            >
              <h3 style={{ marginTop: "7px", marginBottom: "13px" }}>
                Módulos
              </h3>

              <Row
                gutter={24}
                justify={"center"}
                align={"middle"}
                style={{
                  paddingInline: "13px",
                }}
              >
                {filteredModules && filteredModules?.length > 0 ? (
                  <>
                    <div
                      style={{
                        display: "flex",
                        width: "100%",
                        backgroundColor: "#013B5A31",
                        justifyContent: "center",
                        alignContent: "center",
                        alignItems: "center",
                        padding: "0px",
                        marginBottom: "17px",
                        borderRadius: "7px",
                      }}
                    >
                      <Checkbox
                        checked={selectAllModules}
                        onChange={(e) =>
                          handleSelectAllModules(e.target.checked)
                        }
                        style={{ marginBlock: "7px" }}
                      >
                        SELECCIONAR TODOS
                      </Checkbox>
                    </div>

                    <Input
                      placeholder="Buscar módulo"
                      value={filterTextModule}
                      onChange={(e) => {
                        const inputValue = e.target.value || "";

                        const transformedValue = inputValue
                          .toUpperCase()
                          .replace(/[^A-ZÁÉÍÓÚÜÑ0-9\s]/g, "");

                        setFilterTextModule(transformedValue);
                      }}
                      allowClear
                      style={{ marginBottom: "17px" }}
                    />
                  </>
                ) : null}

                {autocompleteResultsModules.length > 0 && (
                  <div
                    style={{
                      width: "100%",
                      maxHeight: "113px",
                      backgroundColor: "#F7F7F7",
                      border: "0.7px solid #A7AFBA",
                      borderRadius: "7px",
                      overflowY: "auto",
                      zIndex: 2,
                      marginBottom: "13px",
                    }}
                  >
                    {autocompleteResultsModules.map((module) => (
                      <div
                        key={module.id}
                        style={{
                          padding: "8px",
                          cursor: "pointer",
                          borderBottom: "0.7px solid #eee",
                        }}
                        onClick={() => handleAutocompleteSelectModule(module)}
                      >
                        {module.name}
                      </div>
                    ))}
                  </div>
                )}
              </Row>

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
                      size="middle"
                      type="dashed"
                      onClick={() => {
                        toggleExpandedModule(module.id),
                          setSelectAllModuleActions(false);
                      }}
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
                maxHeight: "450px",
                padding: "7px",
                border: "1px solid #013B5A",
                borderRadius: "8px",
              }}
            >
              <h3 style={{ marginTop: "7px", marginBottom: "13px" }}>
                Acciones
              </h3>

              {expandedApp && expandedModule ? (
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

              {filteredActions && filteredActions.length > 0 && (
                <div
                  style={{
                    display: "flex",
                    width: "100%",
                    backgroundColor: "#013B5A31",
                    justifyContent: "center",
                    alignContent: "center",
                    alignItems: "center",
                    padding: "0px",
                    marginBottom: "17px",
                    borderRadius: "7px",
                  }}
                >
                  <Checkbox
                    checked={selectAllModuleActions}
                    onChange={(e) => handleSelectAllActions(e.target.checked)}
                    style={{ marginBlock: "7px" }}
                  >
                    SELECCIONAR TODAS
                  </Checkbox>
                </div>
              )}

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
        )}
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
              size="middle"
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
