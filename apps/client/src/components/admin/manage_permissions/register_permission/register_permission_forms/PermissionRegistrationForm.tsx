"use client";

import React, { useState } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { useRouter } from "next/navigation";

import { Col } from "antd";
import PermissionRegistrationFormData from "./PermissionRegistrationFormData";
import CustomMessage from "@/components/common/custom_messages/CustomMessage";
import CustomModalTwoOptions from "@/components/common/custom_modal_two_options/CustomModalTwoOptions";
import CustomModalNoContent from "@/components/common/custom_modal_no_content/CustomModalNoContent";
import CustomResultOneButton from "@/components/common/custom_result_one_button/CustomResultOneButton";
import { FcInfo } from "react-icons/fc";

import { setErrorsPermission } from "@/redux/features/permission/permissionSlice";

import {
  useCreatePermissionMutation,
  useGetAllPermissionsQuery,
} from "@/redux/apis/permission/permissionApi";
import { useGetAllActiveApplicationsQuery } from "@/redux/apis/permission/application/applicationApi";
import { useGetAllAppModulesQuery } from "@/redux/apis/permission/application_module/applicationModuleApi";
import { useGetAllModuleActionsQuery } from "@/redux/apis/permission/module_action/moduleActionApi";

const PermissionRegistrationForm: React.FC = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const [options, setOptions] = useState<any[]>([]);
  const [hasChanges, setHasChanges] = useState(false);

  const [permissionNameLocalState, setPermissionNameLocalState] = useState("");
  const [permissionDescriptionLocalState, setPermissionDescriptionLocalState] =
    useState("");

  const [selectedAppsLocalState, setSelectedAppsLocalState] = useState<
    number[]
  >([]);
  const [selectedModulesLocalState, setSelectedModulesLocalState] = useState<
    number[]
  >([]);
  const [selectedActionsLocalState, setSelectedActionsLocalState] = useState<
    number[]
  >([]);

  const [modalIsOpenConfirm, setModalIsOpenConfirm] = useState(false);
  const [modalIsOpenSuccess, setModalIsOpenSuccess] = useState(false);

  const [isSubmittingConfirmModal, setIsSubmittingConfirmModal] =
    useState(false);
  const [isSubmittingNewData, setIsSubmittingNewData] = useState(false);
  const [isSubmittingGoToAllData, setIsSubmittingGoToAllData] = useState(false);
  const [showErrorMessage, setShowErrorMessage] = useState(false);

  const permissionErrorsState = useAppSelector(
    (state) => state.permission.errors
  );

  const [
    createPermission,
    {
      data: permissionData,
      isLoading: permissionLoading,
      isSuccess: permissionSuccess,
      isError: permissionError,
    },
  ] = useCreatePermissionMutation({
    fixedCacheKey: "createPermission",
  });

  const {
    data: allPermissionsData,
    isLoading: allPermissionsLoading,
    isFetching: allPermissionsFetching,
    error: allPermissionsError,
  } = useGetAllPermissionsQuery(null);

  const {
    data: allActiveApplicationsData,
    isLoading: allActiveApplicationsLoading,
    isFetching: allActiveApplicationsFetching,
    error: allActiveApplicationsError,
    refetch: refetchAllActiveApplications,
  } = useGetAllActiveApplicationsQuery(null);

  const {
    data: allAppModulesData,
    isLoading: allAppModulesLoading,
    isFetching: allAppModulesFetching,
    error: allAppModulesError,
    refetch: refetchAllAppModules,
  } = useGetAllAppModulesQuery(null);

  const {
    data: allModuleActionsData,
    isLoading: allModuleActionsLoading,
    isFetching: allModuleActionsFetching,
    error: allModuleActionsError,
    refetch: refetchAllModuleActions,
  } = useGetAllModuleActionsQuery(null);

  const handleCreatePermission = () => {
    try {
      setModalIsOpenConfirm(true);
    } catch (error) {
      console.error(error);
    } finally {
      setIsSubmittingNewData(false);
    }
  };

  const handleConfirmDataModal = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    try {
      setIsSubmittingNewData(true);

      const response: any = await createPermission({
        name: permissionNameLocalState,
        description: permissionDescriptionLocalState,
        applications: selectedAppsLocalState,
        application_modules: selectedModulesLocalState,
        module_actions: selectedActionsLocalState,
      });

      let createDataError = response.error;

      let createValidationData = response.data?.message;

      let createDataSuccess = response.data;

      if (createDataError || createValidationData) {
        const errorMessage = createDataError?.data.message;
        const validationDataMessage = createValidationData;

        if (Array.isArray(errorMessage)) {
          dispatch(setErrorsPermission(errorMessage[0]));

          setShowErrorMessage(true);
        } else if (typeof errorMessage === "string") {
          dispatch(setErrorsPermission(errorMessage));

          setShowErrorMessage(true);
        }

        if (Array.isArray(validationDataMessage)) {
          dispatch(setErrorsPermission(validationDataMessage[0]));

          setShowErrorMessage(true);
        } else if (typeof validationDataMessage === "string") {
          dispatch(setErrorsPermission(validationDataMessage));

          setShowErrorMessage(true);
        }
      }

      if (createDataSuccess && !createDataError && !createValidationData) {
        setModalIsOpenConfirm(false);
        setModalIsOpenSuccess(true);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsSubmittingNewData(false);
    }
  };

  const handleSearch = (value: string) => {
    if (value) {
      const filteredOptions =
        allPermissionsData
          ?.filter((reasons) =>
            reasons.name.toUpperCase().includes(value.toUpperCase())
          )
          .map((reason) => ({
            value: reason.name,
          })) || [];

      setOptions(filteredOptions);
    } else {
      setOptions([]);
    }
  };

  const handleGoToAllData = async () => {
    try {
      setIsSubmittingGoToAllData(true);

      await router.replace("/admin/dashboard/manage_permissions", {
        scroll: false,
      });
    } catch (error) {
      console.error(error);
    } finally {
      setIsSubmittingGoToAllData(false);
      setModalIsOpenSuccess(false);
    }
  };

  const handleButtonClick = () => {
    dispatch(setErrorsPermission([]));
    setShowErrorMessage(false);
  };

  return (
    <Col
      xs={24}
      sm={24}
      md={24}
      lg={24}
      style={{
        width: "100%",
        display: "flex",
        flexFlow: "column wrap",
        alignContent: "center",
        paddingInline: "13px",
      }}
    >
      {modalIsOpenConfirm && (
        <CustomModalTwoOptions
          key={"custom-confirm-modal-create-permission"}
          openCustomModalState={modalIsOpenConfirm}
          iconCustomModal={<FcInfo size={77} />}
          titleCustomModal="¿Deseas crear un nuevo permiso?"
          subtitleCustomModal={
            <p>
              Se creará el permiso con nombre:&nbsp;
              <b>{permissionNameLocalState}.</b>
            </p>
          }
          handleCancelCustomModal={() => setModalIsOpenConfirm(false)}
          handleConfirmCustomModal={handleConfirmDataModal}
          isSubmittingConfirm={isSubmittingNewData}
          handleClickCustomModal={handleButtonClick}
        ></CustomModalTwoOptions>
      )}

      {modalIsOpenSuccess && (
        <CustomModalNoContent
          key={"custom-success-modal-create-permission"}
          widthCustomModalNoContent={"54%"}
          openCustomModalState={modalIsOpenSuccess}
          closableCustomModal={false}
          maskClosableCustomModal={false}
          contentCustomModal={
            <CustomResultOneButton
              key={"permission-created-custom-result"}
              statusTypeResult={"success"}
              titleCustomResult="¡Permiso creado correctamente!"
              subtitleCustomResult="El permiso ha sido agregado a la lista de permisos de usuarios."
              handleClickCustomResult={handleGoToAllData}
              isSubmittingButton={isSubmittingGoToAllData}
              textButtonCustomResult="Regresar a lista de permisos"
            />
          }
        />
      )}

      {showErrorMessage && (
        <CustomMessage
          typeMessage="error"
          message={
            permissionErrorsState?.toString() || "¡Error en la petición!"
          }
        />
      )}

      <PermissionRegistrationFormData
        handleCreatePermissionDataForm={handleCreatePermission}
        permissionNameDataForm={permissionNameLocalState}
        handleOnChangePermissionNameDataForm={(e) => {
          setPermissionNameLocalState(e.toUpperCase());
        }}
        handleSearchNamePermissionDataForm={handleSearch}
        optionsPermissionNameDataForm={options}
        permissionDescriptionDataForm={permissionDescriptionLocalState}
        handleOnChangePermissionDescriptionDataForm={(e) => {
          setPermissionDescriptionLocalState(e.target.value.toUpperCase());
        }}
        allAppsFormData={allActiveApplicationsData}
        selectedAppsFormData={selectedAppsLocalState}
        onChangeAppsFormData={(checkedValues) => {
          setHasChanges(true);

          setSelectedAppsLocalState(checkedValues);
        }}
        allAppModulesFormData={allAppModulesData}
        selectedAppModulesFormData={selectedModulesLocalState}
        onChangeAppModulesFormData={(checkedValues) => {
          setHasChanges(true);

          setSelectedModulesLocalState(checkedValues);
        }}
        allModuleActionsFormData={allModuleActionsData}
        selectedModuleActionsFormData={selectedActionsLocalState}
        onChangeModuleActionsFormData={(checkedValues) => {
          setHasChanges(true);

          setSelectedActionsLocalState(checkedValues);
        }}
        buttonSubmitFormLoadingDataForm={
          isSubmittingConfirmModal && !modalIsOpenConfirm
        }
        handleButtonSubmitFormDataForm={handleButtonClick}
      />
    </Col>
  );
};

export default PermissionRegistrationForm;
