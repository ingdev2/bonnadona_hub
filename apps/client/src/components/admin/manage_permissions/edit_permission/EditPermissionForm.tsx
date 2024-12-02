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
} from "@/redux/features/permission/permissionSlice";

import {
  useGetPermissionByIdQuery,
  useUpdatePermissionByIdMutation,
} from "@/redux/apis/permission/permissionApi";

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

  const permissionErrorsState = useAppSelector(
    (state) => state.permission.errors
  );

  const [hasChanges, setHasChanges] = useState(false);

  const [titleNamePermissionLocalState, setTitleNamePermissionLocalState] =
    useState("");
  const [descriptionPermissionLocalState, setDescriptionPermissionLocalState] =
    useState("");

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
    if (
      permissionData &&
      !idPermissionState &&
      !permissionLoading &&
      !permissionFetching
    ) {
      dispatch(setIdPermission(permissionData.id));
    }
  }, [permissionData, idPermissionState]);

  const handleConfirmUpdateData = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    try {
      setIsSubmittingUpdateData(true);

      const response: any = await updatePermissionData({
        id: idPermissionState,
        updatePermission: {
          name: titleNamePermissionLocalState || titleNamePermissionState,
          description:
            descriptionPermissionLocalState || descriptionPermissionState,
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

        dispatch(
          setNamePermission(
            titleNamePermissionLocalState || titleNamePermissionState
          )
        );

        dispatch(
          setDescriptionPermission(
            descriptionPermissionLocalState || descriptionPermissionState
          )
        );

        setSuccessMessage("¡Permisos actualizados correctamente!");
        setShowSuccessMessage(true);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsSubmittingUpdateData(false);

      setTitleNamePermissionLocalState("");
      setDescriptionPermissionLocalState("");
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
