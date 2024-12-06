"use client";

import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";

import EditPermissionFormData from "./EditPermissionFormData";
import CustomMessage from "@/components/common/custom_messages/CustomMessage";

import {
  setIdPermission,
  setNamePermission,
  setDescriptionPermission,
  setErrorsPermission,
  setApplicationsPermission,
  setApplicationModulesPermission,
  setModuleActionsPermission,
} from "@/redux/features/permission/permissionSlice";

import {
  useGetPermissionByIdQuery,
  useUpdatePermissionByIdMutation,
} from "@/redux/apis/permission/permissionApi";
import { useGetAllActiveApplicationsQuery } from "@/redux/apis/permission/application/applicationApi";
import { useGetAllAppModulesQuery } from "@/redux/apis/permission/application_module/applicationModuleApi";
import { useGetAllModuleActionsQuery } from "@/redux/apis/permission/module_action/moduleActionApi";

const EditPermissionForm: React.FC = () => {
  const dispatch = useAppDispatch();

  const NOT_REGISTER: string = "NO REGISTRA";

  const idPermissionState = useAppSelector((state) => state.permission.id);
  const titleNamePermissionState = useAppSelector(
    (state) => state.permission.name
  );
  const descriptionPermissionState = useAppSelector(
    (state) => state.permission.description
  );
  const appsPermissionState = useAppSelector(
    (state) => state.permission.applications
  );
  const modulesPermissionState = useAppSelector(
    (state) => state.permission.application_modules
  );
  const actionsPermissionState = useAppSelector(
    (state) => state.permission.module_actions
  );

  const permissionErrorsState = useAppSelector(
    (state) => state.permission.errors
  );

  const [hasChanges, setHasChanges] = useState(false);

  const [titleNamePermissionLocalState, setTitleNamePermissionLocalState] =
    useState("");
  const [descriptionPermissionLocalState, setDescriptionPermissionLocalState] =
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

  const [isSubmittingUpdateData, setIsSubmittingUpdateData] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [showErrorMessage, setShowErrorMessage] = useState(false);

  const {
    data: permissionData,
    isLoading: permissionLoading,
    isFetching: permissionFetching,
    error: permissionError,
  } = useGetPermissionByIdQuery(idPermissionState);

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

  const [
    updatePermissionData,
    {
      data: updatePermissionMainData,
      isLoading: updatePermissionLoading,
      isSuccess: updatePermissionSuccess,
      isError: updatePermissionError,
    },
  ] = useUpdatePermissionByIdMutation({
    fixedCacheKey: "updatePermissionData",
  });

  useEffect(() => {
    console.log("APPS", appsPermissionState);
    console.log("MODULES", modulesPermissionState);
    console.log("ACTIONS", actionsPermissionState);

    if (
      permissionData &&
      !idPermissionState &&
      !permissionLoading &&
      !permissionFetching
    ) {
      dispatch(setIdPermission(permissionData.id));
    }
    if (
      descriptionPermissionState ||
      appsPermissionState ||
      modulesPermissionState ||
      actionsPermissionState
    ) {
      setDescriptionPermissionLocalState(descriptionPermissionState);

      setSelectedAppsLocalState(appsPermissionState);
      setSelectedModulesLocalState(modulesPermissionState);
      setSelectedActionsLocalState(actionsPermissionState);
    }
  }, [
    permissionData,
    idPermissionState,
    descriptionPermissionState,
    appsPermissionState,
    modulesPermissionState,
    actionsPermissionState,
  ]);

  const handleConfirmUpdateData = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    try {
      setIsSubmittingUpdateData(true);

      const response: any = await updatePermissionData({
        id: idPermissionState,
        updatePermission: {
          description:
            descriptionPermissionLocalState || descriptionPermissionState,
          applications: selectedAppsLocalState,
          application_modules: selectedModulesLocalState,
          module_actions: selectedActionsLocalState,
        },
      });

      let editDataError = response.error;

      let editResponseData = response.data;

      let editDataValidationData = response.data?.message;

      if (editDataError || !editResponseData) {
        setHasChanges(false);

        const errorMessage = editDataError?.data.message;
        const validationDataMessage = editDataValidationData;

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

      if (editResponseData && !editDataError) {
        setHasChanges(false);

        dispatch(setDescriptionPermission(descriptionPermissionState));
        dispatch(setApplicationsPermission(selectedAppsLocalState));
        dispatch(setApplicationModulesPermission(selectedModulesLocalState));
        dispatch(setModuleActionsPermission(selectedActionsLocalState));

        setSuccessMessage("¡Permisos actualizados correctamente!");
        setShowSuccessMessage(true);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsSubmittingUpdateData(false);
    }
  };

  const handleButtonClick = () => {
    setSuccessMessage("");
    setShowSuccessMessage(false);
    dispatch(setErrorsPermission([]));
    setShowErrorMessage(false);
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
          message={successMessage || "¡Proceso finalizado con éxito!"}
        />
      )}

      <EditPermissionFormData
        namePermissionFormData={titleNamePermissionState || NOT_REGISTER}
        onChangeNamePermissionFormData={(e) => {
          setHasChanges(true);

          setTitleNamePermissionLocalState(e.target.value.toUpperCase());
        }}
        descriptionPermissionFormData={
          descriptionPermissionState || NOT_REGISTER
        }
        onChangeDescriptionPermissionFormData={(e) => {
          setHasChanges(true);

          setDescriptionPermissionLocalState(e.target.value);
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
        handleConfirmDataFormData={handleConfirmUpdateData}
        initialValuesEditFormData={{
          "edit-permission-name": titleNamePermissionState || NOT_REGISTER,
          "edit-permission-description":
            descriptionPermissionState || NOT_REGISTER,
        }}
        isSubmittingEditFormData={isSubmittingUpdateData}
        hasChangesFormData={hasChanges}
        handleButtonClickFormData={handleButtonClick}
      />
    </>
  );
};

export default EditPermissionForm;
