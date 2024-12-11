"use client";

import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";

import EditApplicationFormData from "./EditApplicationFormData";
import CustomMessage from "@/components/common/custom_messages/CustomMessage";

import {
  setIdApplication,
  setNameApplication,
  setErrorsModuleApplication,
  setEntryLinkApplication,
} from "@/redux/features/permission/application/applicationSlice";

import {
  useGetApplicationByIdQuery,
  useUpdateApplicationByIdMutation,
} from "@/redux/apis/permission/application/applicationApi";

const EditApplicationForm: React.FC = () => {
  const dispatch = useAppDispatch();

  const NOT_REGISTER: string = "NO REGISTRA";

  const idApplicationState = useAppSelector((state) => state.application.id);
  const nameApplicationState = useAppSelector(
    (state) => state.application.name
  );
  const entryLinkApplicationState = useAppSelector(
    (state) => state.application.entry_link
  );

  const reasonApplicationErrorsState = useAppSelector(
    (state) => state.application.errors
  );

  const [hasChanges, setHasChanges] = useState(false);

  const [nameApplicationLocalState, setNameApplicationLocalState] =
    useState("");
  const [entryLinkApplicationLocalState, setEntryLinkApplicationLocalState] =
    useState("");

  const [isSubmittingUpdateData, setIsSubmittingUpdateData] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [showErrorMessage, setShowErrorMessage] = useState(false);

  const {
    data: applicationData,
    isLoading: applicationLoading,
    isFetching: applicationFetching,
    error: applicationError,
  } = useGetApplicationByIdQuery(idApplicationState);

  const [
    updateApplicationData,
    {
      data: updateApplicationMainData,
      isLoading: updateApplicationLoading,
      isSuccess: updateApplicationSuccess,
      isError: updateApplicationError,
    },
  ] = useUpdateApplicationByIdMutation({
    fixedCacheKey: "updateApplicationData",
  });

  useEffect(() => {
    if (
      applicationData &&
      !idApplicationState &&
      !applicationLoading &&
      !applicationFetching
    ) {
      dispatch(setIdApplication(applicationData.id));
    }
  }, [applicationData, idApplicationState]);

  const handleConfirmUpdateData = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    try {
      setIsSubmittingUpdateData(true);

      const response: any = await updateApplicationData({
        id: idApplicationState,
        updateApplication: {
          name: nameApplicationLocalState || nameApplicationState,
          entry_link:
            entryLinkApplicationLocalState || entryLinkApplicationState,
        },
      });

      let editDataError = response.error;

      let editDataStatus = response.data?.statusCode;

      let editDataValidationData = response.data?.message;

      if (editDataError || editDataStatus !== 202) {
        setHasChanges(false);

        const errorMessage = editDataError?.data.message;
        const validationDataMessage = editDataValidationData;

        if (Array.isArray(errorMessage)) {
          dispatch(setErrorsModuleApplication(errorMessage[0]));

          setShowErrorMessage(true);
        } else if (typeof errorMessage === "string") {
          dispatch(setErrorsModuleApplication(errorMessage));

          setShowErrorMessage(true);
        }

        if (Array.isArray(validationDataMessage)) {
          dispatch(setErrorsModuleApplication(validationDataMessage[0]));

          setShowErrorMessage(true);
        } else if (typeof validationDataMessage === "string") {
          dispatch(setErrorsModuleApplication(validationDataMessage));

          setShowErrorMessage(true);
        }
      }

      if (editDataStatus === 202 && !editDataError) {
        setHasChanges(false);

        dispatch(
          setNameApplication(nameApplicationLocalState || nameApplicationState)
        );
        dispatch(
          setEntryLinkApplication(
            entryLinkApplicationLocalState || entryLinkApplicationState
          )
        );

        setSuccessMessage("¡Aplicación actualizada correctamente!");
        setShowSuccessMessage(true);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsSubmittingUpdateData(false);
      setNameApplicationLocalState("");
    }
  };

  const handleButtonClick = () => {
    setSuccessMessage("");
    setShowSuccessMessage(false);
    dispatch(setErrorsModuleApplication([]));
    setShowErrorMessage(false);
  };

  return (
    <>
      {showErrorMessage && (
        <CustomMessage
          typeMessage="error"
          message={
            reasonApplicationErrorsState?.toString() || "¡Error en la petición!"
          }
        />
      )}

      {showSuccessMessage && (
        <CustomMessage
          typeMessage="success"
          message={successMessage || "¡Proceso finalizado con éxito!"}
        />
      )}

      <EditApplicationFormData
        nameApplicationFormData={nameApplicationState || NOT_REGISTER}
        onChangeNameApplicationFormData={(e) => {
          setHasChanges(true);

          setNameApplicationLocalState(e.target.value.toUpperCase());
        }}
        entryLinkApplicationFormData={entryLinkApplicationState || NOT_REGISTER}
        onChangeEntryLinkApplicationFormData={(e) => {
          setHasChanges(true);

          setEntryLinkApplicationLocalState(e.target.value.toLowerCase());
        }}
        handleConfirmDataFormData={handleConfirmUpdateData}
        initialValuesEditFormData={{
          "edit-application-name": nameApplicationState || NOT_REGISTER,
          "edit-entry-link": entryLinkApplicationState || NOT_REGISTER,
        }}
        isSubmittingEditFormData={isSubmittingUpdateData}
        hasChangesFormData={hasChanges}
        handleButtonClickFormData={handleButtonClick}
      />
    </>
  );
};

export default EditApplicationForm;
