"use client";

import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";

import { Button } from "antd";

import ChangePasswordModal from "@/components/common/change_password_modal/ChangePasswordModal";
import CustomDashboardLayoutAdmins from "@/components/common/custom_dashboard_layout_admins/CustomDashboardLayoutAdmins";
import CustomTableFiltersAndSorting from "@/components/common/custom_table_filters_and_sorting/CustomTableFiltersAndSorting";
import CustomModalNoContent from "@/components/common/custom_modal_no_content/CustomModalNoContent";
import EditPermissionForm from "./edit_permission/EditPermissionForm";
import CustomMessage from "@/components/common/custom_messages/CustomMessage";
import { tableColumnsAllPermissions } from "./table_columns_all_permissions/TableColumnsAllPermissions";
import ModalPermissionDetails from "./modal_permission_details/ModalPermissionDetails";
import CreateButton from "./create_button/CreateButton";

import { FaEdit } from "react-icons/fa";

import {
  setChangePasswordExpiryModalIsOpen,
  setTableRowId,
} from "@/redux/features/common/modal/modalSlice";
import {
  setIdPermission,
  setNamePermission,
  setDescriptionPermission,
  setApplicationsPermission,
  setApplicationModulesPermission,
  setModuleActionsPermission,
  setResetPermission,
} from "@/redux/features/permission/permissionSlice";

import { useGetAllPermissionsQuery } from "@/redux/apis/permission/permissionApi";
import { useGetPasswordPolicyQuery } from "@/redux/apis/password_policy/passwordPolicyApi";

import { PermissionsActionsValidation } from "@/helpers/permission_validation/permissionsActionsValidation";
import { checkPasswordExpiry } from "@/helpers/check_password_expiry/CheckPasswordExpiry";
import { ModuleActionsEnum } from "@/utils/enums/permissions/module_actions/module_actions.enum";

const ManagePermissionsContent: React.FC = () => {
  const dispatch = useAppDispatch();

  const editPermissionAction = PermissionsActionsValidation({
    allowedActions: [ModuleActionsEnum.UPDATE_PERMISSIONS],
  });

  const permissionErrorsState = useAppSelector(
    (state) => state.permission.errors
  );

  const lastPasswordUpdateCollaboratorState = useAppSelector(
    (state) => state.user.last_password_update
  );

  const modalIsOpenChangePasswordExpiry = useAppSelector(
    (state) => state.modal.changePasswordExpiryModalIsOpen
  );

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

  const {
    data: allPermissionsData,
    isLoading: allPermissionsLoading,
    isFetching: allPermissionsFetching,
    error: allPermissionsError,
    refetch: refecthAllPermissions,
  } = useGetAllPermissionsQuery(null);

  const {
    data: passwordPolicyData,
    isLoading: passwordPolicyLoading,
    isFetching: passwordPolicyFetching,
    error: passwordPolicyError,
  } = useGetPasswordPolicyQuery(null);

  useEffect(() => {
    if (
      passwordPolicyData &&
      passwordPolicyData.password_expiry_days &&
      lastPasswordUpdateCollaboratorState &&
      checkPasswordExpiry(
        lastPasswordUpdateCollaboratorState,
        passwordPolicyData.password_expiry_days
      )
    ) {
      dispatch(setChangePasswordExpiryModalIsOpen(true));
    } else {
      dispatch(setChangePasswordExpiryModalIsOpen(false));
    }
  }, [passwordPolicyData, lastPasswordUpdateCollaboratorState]);

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

      <div className="modal-check-password-expiry">
        {modalIsOpenChangePasswordExpiry && (
          <ChangePasswordModal
            titleModal={"Tu contraseña se ha expirado"}
            subtitleModal={"Debes actualizar tu contraseña:"}
          />
        )}
      </div>

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
                      size="middle"
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
              isLoading={!transformedData || !allPermissionsData}
            />
          </div>
        }
      />
    </>
  );
};

export default ManagePermissionsContent;
