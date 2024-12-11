"use client";

import React, { useState } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { useRouter } from "next/navigation";

import { Col } from "antd";
import ApplicationRegistrationFormData from "./ApplicationRegistrationFormData";
import CustomMessage from "@/components/common/custom_messages/CustomMessage";
import CustomModalTwoOptions from "@/components/common/custom_modal_two_options/CustomModalTwoOptions";
import CustomModalNoContent from "@/components/common/custom_modal_no_content/CustomModalNoContent";
import CustomResultOneButton from "@/components/common/custom_result_one_button/CustomResultOneButton";
import { FcInfo } from "react-icons/fc";

import { setErrorsModuleApplication } from "@/redux/features/permission/application/applicationSlice";

import {
  useCreateApplicationMutation,
  useGetAllApplicationsQuery,
} from "@/redux/apis/permission/application/applicationApi";

const ApplicationRegistrationForm: React.FC = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const [applicationNameLocalState, setApplicationNameLocalState] =
    useState("");
  const [applicationEntryLinkLocalState, setApplicationEntryLinkLocalState] =
    useState("");
  const [options, setOptions] = useState<any[]>([]);

  const [modalIsOpenConfirm, setModalIsOpenConfirm] = useState(false);
  const [modalIsOpenSuccess, setModalIsOpenSuccess] = useState(false);

  const [isSubmittingConfirmModal, setIsSubmittingConfirmModal] =
    useState(false);
  const [isSubmittingNewData, setIsSubmittingNewData] = useState(false);
  const [isSubmittingGoToAllData, setIsSubmittingGoToAllData] = useState(false);
  const [showErrorMessage, setShowErrorMessage] = useState(false);

  const applicationErrorsState = useAppSelector(
    (state) => state.application.errors
  );

  const [
    createApplication,
    {
      data: applicationData,
      isLoading: applicationLoading,
      isSuccess: applicationSuccess,
      isError: applicationError,
    },
  ] = useCreateApplicationMutation({
    fixedCacheKey: "createApplication",
  });

  const {
    data: allApplicationsData,
    isLoading: allApplicationsLoading,
    isFetching: allApplicationsFetching,
    error: allApplicationsError,
  } = useGetAllApplicationsQuery(null);

  const handleCreateApplication = () => {
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

      const response: any = await createApplication({
        name: applicationNameLocalState,
        image_path: process.env.NEXT_PUBLIC_DEFAULT_LOGO_URL,
        entry_link: applicationEntryLinkLocalState,
      });

      let createDataError = response.error;

      let createValidationData = response.data?.message;

      let createDataSuccess = response.data;

      if (createDataError || createValidationData) {
        const errorMessage = createDataError?.data.message;
        const validationDataMessage = createValidationData;

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
        allApplicationsData
          ?.filter((types) =>
            types.name.toUpperCase().includes(value.toUpperCase())
          )
          .map((type) => ({
            value: type.name,
          })) || [];

      setOptions(filteredOptions);
    } else {
      setOptions([]);
    }
  };

  const handleGoToAllData = async () => {
    try {
      setIsSubmittingGoToAllData(true);

      await router.replace("/admin/dashboard/applications", {
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
    dispatch(setErrorsModuleApplication([]));
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
          key={"custom-confirm-modal-create-application"}
          openCustomModalState={modalIsOpenConfirm}
          iconCustomModal={<FcInfo size={77} />}
          titleCustomModal="¿Deseas crear una nueva aplicación?"
          subtitleCustomModal={
            <p>
              Se creará una nueva aplicación con nombre:&nbsp;
              <b>{applicationNameLocalState}</b> y con link de ingreso:&nbsp;
              <b>{applicationEntryLinkLocalState}.</b>
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
          key={"custom-success-modal-create-application"}
          widthCustomModalNoContent={"54%"}
          openCustomModalState={modalIsOpenSuccess}
          closableCustomModal={false}
          maskClosableCustomModal={false}
          contentCustomModal={
            <CustomResultOneButton
              key={"application-created-custom-result"}
              statusTypeResult={"success"}
              titleCustomResult="¡Aplicación creada correctamente!"
              subtitleCustomResult="La aplicación ha sido agregada a la lista de aplicaciones."
              handleClickCustomResult={handleGoToAllData}
              isSubmittingButton={isSubmittingGoToAllData}
              textButtonCustomResult="Regresar a lista de aplicaciones"
            />
          }
        />
      )}

      {showErrorMessage && (
        <CustomMessage
          typeMessage="error"
          message={
            applicationErrorsState?.toString() || "¡Error en la petición!"
          }
        />
      )}

      <ApplicationRegistrationFormData
        handleCreateDataFormData={handleCreateApplication}
        applicationNameFormData={applicationNameLocalState}
        handleOnChangeApplicationNameFormData={(e) => {
          setApplicationNameLocalState(e.toUpperCase());
        }}
        applicationEntryLinkFormData={applicationEntryLinkLocalState}
        handleOnChangeApplicationEntryLinkFormData={(e) => {
          setApplicationEntryLinkLocalState(e.target.value.toLowerCase());
        }}
        handleSearchNameApplicationFormData={handleSearch}
        optionsApplicationNameFormData={options}
        buttonSubmitFormLoadingFormData={
          isSubmittingConfirmModal && !modalIsOpenConfirm
        }
        handleButtonSubmitFormData={handleButtonClick}
      />
    </Col>
  );
};

export default ApplicationRegistrationForm;
