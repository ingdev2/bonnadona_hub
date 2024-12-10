"use client";

import React, { useState } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";

import { Button } from "antd";
import CustomDashboardLayoutAdmins from "@/components/common/custom_dashboard_layout_admins/CustomDashboardLayoutAdmins";
import CustomTableFiltersAndSorting from "@/components/common/custom_table_filters_and_sorting/CustomTableFiltersAndSorting";
import EditPermissionForm from "./edit_permission/EditPermissionForm";
import { tableColumnsAllPermissions } from "./table_columns_all_permissions/TableColumnsAllPermissions";
import ModalPermissionDetails from "./modal_permission_details/ModalPermissionDetails";
import CreateButton from "./create_button/CreateButton";
import CustomModalNoContent from "@/components/common/custom_modal_no_content/CustomModalNoContent";
import CustomMessage from "@/components/common/custom_messages/CustomMessage";
import { FaEdit } from "react-icons/fa";

import { setTableRowId } from "@/redux/features/common/modal/modalSlice";

import {
  setIdPermission,
  setNamePermission,
  setDescriptionPermission,
  setApplicationsPermission,
  setApplicationModulesPermission,
  setModuleActionsPermission,
  setResetPermission,
  setErrorsPermission,
} from "@/redux/features/permission/permissionSlice";

import { useGetAllPermissionsQuery } from "@/redux/apis/permission/permissionApi";
import { PermissionsActionsValidation } from "@/helpers/permission_validation/permissionsActionsValidation";
import { ModuleActionsEnum } from "@/utils/enums/permissions/module_actions/module_actions.enum";

const ManagePermissionsContent: React.FC = () => {
  const dispatch = useAppDispatch();

  const NOT_REGISTER: string = "NO REGISTRA";

  const editPermissionAction = PermissionsActionsValidation({
    allowedActions: [ModuleActionsEnum.UPDATE_PERMISSIONS],
  });

  const [isEditVisibleLocalState, setIsEditVisibleLocalState] = useState(false);
  const [isModalVisibleLocalState, setIsModalVisibleLocalState] =
    useState(false);
  const [selectedRowDataLocalState, setSelectedRowDataLocalState] =
    useState<IPermission | null>(null);

  const [isSubmittingRegisterPage, setIsSubmittingRegisterPage] =
    useState(false);

  const [successMessage, setSuccessMessage] = useState("");
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [showErrorMessage, setShowErrorMessage] = useState(false);

  const permissionErrorsState = useAppSelector(
    (state) => state.permission.errors
  );

  const {
    data: allPermissionsData,
    isLoading: allPermissionsLoading,
    isFetching: allPermissionsFetching,
    error: allPermissionsError,
    refetch: refecthAllPermissions,
  } = useGetAllPermissionsQuery(null);

  const transformedData = Array.isArray(allPermissionsData)
    ? allPermissionsData.map((req: any) => ({
        ...req,
      }))
    : [];

  const handleClickSeeMore = (record: IPermission) => {
    dispatch(setTableRowId(""));
    setSelectedRowDataLocalState(record);

    dispatch(setTableRowId(record.id));

    setIsModalVisibleLocalState(true);

    refecthAllPermissions();

    dispatch(setIdPermission(record?.id));
    dispatch(setNamePermission(record?.name));
    dispatch(setDescriptionPermission(record?.description));
    dispatch(setApplicationsPermission(record?.applications));
    dispatch(setApplicationModulesPermission(record?.application_modules));
    dispatch(setModuleActionsPermission(record?.module_actions));
  };

  const handleButtonUpdate = () => {
    refecthAllPermissions();
  };

  return (
    <>
      {showErrorMessage && (
        <CustomMessage
          typeMessage="error"
          message={
            permissionErrorsState?.toString() || "¡Error en la petición!"
          }
        />
      )}

      {showSuccessMessage && (
        <CustomMessage
          typeMessage="success"
          message={
            successMessage?.toString() || `Acción realizada correctamente!`
          }
        />
      )}

      {isModalVisibleLocalState && (
        <CustomModalNoContent
          key={"custom-modal-permission-details"}
          widthCustomModalNoContent={"77%"}
          minWidthCustomModalNoContent="720px"
          openCustomModalState={isModalVisibleLocalState}
          closableCustomModal={true}
          maskClosableCustomModal={false}
          handleCancelCustomModal={() => {
            refecthAllPermissions();

            setIsModalVisibleLocalState(false);
            setIsEditVisibleLocalState(false);

            setSelectedRowDataLocalState(null);
            dispatch(setResetPermission());
          }}
          contentCustomModal={
            <>
              {!isEditVisibleLocalState ? (
                <>
                  <ModalPermissionDetails
                    titleDescription="Detalle completo de permiso"
                    labelPermissionTitle="Titulo de permiso"
                    selectedPermissionTitle={selectedRowDataLocalState?.name}
                    labelPermissionDescription="Descripción del permiso"
                    selectedPermissionDescription={
                      selectedRowDataLocalState?.description
                    }
                  />
                  {editPermissionAction ? (
                    <Button
                      className="edit-permission-button"
                      size="large"
                      style={{
                        backgroundColor: "#015E90",
                        color: "#F7F7F7",
                        borderRadius: "31px",
                        paddingInline: "31px",
                        marginBlock: "13px",
                      }}
                      onClick={() => {
                        setIsEditVisibleLocalState(true);
                      }}
                    >
                      <div
                        style={{
                          minWidth: "137px",
                          display: "flex",
                          flexFlow: "row wrap",
                          alignItems: "center",
                          alignContent: "center",
                          justifyContent: "center",
                        }}
                      >
                        <FaEdit size={17} />
                        &nbsp; Editar permiso
                      </div>
                    </Button>
                  ) : null}
                </>
              ) : (
                <EditPermissionForm />
              )}
            </>
          }
        />
      )}

      <CustomDashboardLayoutAdmins
        customLayoutContent={
          <div
            style={{
              width: "100%",
              display: "flex",
              flexFlow: "column wrap",
            }}
          >
            <CreateButton
              isSubmittingCreateButton={isSubmittingRegisterPage}
              setIsSubmittingCreateButton={setIsSubmittingRegisterPage}
            />

            <CustomTableFiltersAndSorting
              dataCustomTable={transformedData || []}
              columnsCustomTable={tableColumnsAllPermissions({
                handleClickSeeMore: handleClickSeeMore,
              })}
              onClickUpdateCustomTable={handleButtonUpdate}
            />
          </div>
        }
      />
    </>
  );
};

export default ManagePermissionsContent;
