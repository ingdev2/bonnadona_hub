"use client";

import React, { useState } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";

import { Button } from "antd";
import CustomDashboardLayoutAdmins from "@/components/common/custom_dashboard_layout_admins/CustomDashboardLayoutAdmins";
import CustomTableFiltersAndSorting from "@/components/common/custom_table_filters_and_sorting/CustomTableFiltersAndSorting";
import EditApplicationForm from "./edit_application/EditApplicationForm";
import { tableColumnsAllApplications } from "./table_columns_all_applications/TableColumnsAllApplications";
import ModalApplicationDetails from "./modal_application_details/ModalApplicationDetails";
import CreateButton from "./create_button/CreateButton";
import CustomModalNoContent from "@/components/common/custom_modal_no_content/CustomModalNoContent";
import CustomMessage from "@/components/common/custom_messages/CustomMessage";
import { FaEdit } from "react-icons/fa";

import { setTableRowId } from "@/redux/features/common/modal/modalSlice";

import {
  setIdApplication,
  setNameApplication,
  setErrorsModuleApplication,
  setResetApplication,
  setEntryLinkApplication,
} from "@/redux/features/permission/application/applicationSlice";

import {
  useGetAllApplicationsQuery,
  useBanApplicationMutation,
} from "@/redux/apis/permission/application/applicationApi";

const AllApplicationsContent: React.FC = () => {
  const dispatch = useAppDispatch();

  const NOT_REGISTER: string = "NO REGISTRA";

  const [isEditVisibleLocalState, setIsEditVisibleLocalState] = useState(false);
  const [isModalVisibleLocalState, setIsModalVisibleLocalState] =
    useState(false);
  const [selectedRowDataLocalState, setSelectedRowDataLocalState] =
    useState<IApplication | null>(null);

  const [isSubmittingBan, setIsSubmittingBan] = useState(false);
  const [isSubmittingRegisterPage, setIsSubmittingRegisterPage] =
    useState(false);

  const [successMessage, setSuccessMessage] = useState("");
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [showErrorMessage, setShowErrorMessage] = useState(false);

  const applicationErrorsState = useAppSelector(
    (state) => state.application.errors
  );

  const [
    banApplication,
    {
      data: banApplicationtData,
      isLoading: banApplicationLoading,
      isSuccess: banApplicationFetching,
      isError: banApplicationError,
    },
  ] = useBanApplicationMutation({
    fixedCacheKey: "banApplicationData",
  });

  const {
    data: allApplicationsData,
    isLoading: allApplicationsLoading,
    isFetching: allApplicationsFetching,
    error: allApplicationsError,
    refetch: refecthAllApplications,
  } = useGetAllApplicationsQuery(null);

  const transformedData = Array.isArray(allApplicationsData)
    ? allApplicationsData.map((req: any) => ({
        ...req,
      }))
    : [];

  const handleClickSeeMore = (record: IApplication) => {
    dispatch(setTableRowId(""));
    setSelectedRowDataLocalState(record);

    dispatch(setTableRowId(record.id));

    setIsModalVisibleLocalState(true);

    refecthAllApplications();

    dispatch(setIdApplication(record?.id));
    dispatch(setNameApplication(record?.name));
    dispatch(setEntryLinkApplication(record?.entry_link));
  };

  const handleOnChangeSwitch = async (record: IApplication) => {
    try {
      setIsSubmittingBan(true);

      const response: any = await banApplication({
        id: record.id,
      });

      let banSuccess = response.data;

      let banError = response.error;

      if (banSuccess?.statusCode === 202 && !banError) {
        const successMessage = banSuccess?.message;

        setSuccessMessage(successMessage);
        setShowSuccessMessage(true);
      } else {
        const errorMessage = banError?.data.message;

        if (Array.isArray(errorMessage)) {
          dispatch(setErrorsModuleApplication(errorMessage[0]));

          setShowErrorMessage(true);
        } else if (typeof errorMessage === "string") {
          dispatch(setErrorsModuleApplication(errorMessage));

          setShowErrorMessage(true);
        }
      }
    } catch (error) {
      console.error(error);
    } finally {
      refecthAllApplications();

      setIsSubmittingBan(false);
    }
  };

  const handleButtonUpdate = () => {
    refecthAllApplications();
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
            applicationErrorsState?.toString() || "¡Error en la petición!"
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
          key={"custom-modal-application-details"}
          widthCustomModalNoContent={"69%"}
          minWidthCustomModalNoContent="321px"
          openCustomModalState={isModalVisibleLocalState}
          closableCustomModal={true}
          maskClosableCustomModal={false}
          handleCancelCustomModal={() => {
            refecthAllApplications();

            setIsModalVisibleLocalState(false);
            setIsEditVisibleLocalState(false);

            setSelectedRowDataLocalState(null);
            dispatch(setResetApplication());
          }}
          contentCustomModal={
            <>
              {!isEditVisibleLocalState ? (
                <>
                  <ModalApplicationDetails
                    nameApplication="Detalle completo de aplicación"
                    labelApplicationId="Id"
                    selectedApplicationId={selectedRowDataLocalState?.id}
                    labelApplicationName="Nombre"
                    selectedApplicationName={selectedRowDataLocalState?.name}
                    labelApplicationEntryLink="Link de ingreso"
                    selectedApplicationEntryLink={
                      selectedRowDataLocalState?.entry_link
                    }
                  />

                  <Button
                    className="edit-application-button"
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
                      &nbsp; Editar aplicación
                    </div>
                  </Button>
                </>
              ) : (
                <EditApplicationForm />
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
              columnsCustomTable={tableColumnsAllApplications({
                handleClickSeeMore: handleClickSeeMore,
                handleOnChangeSwitch: handleOnChangeSwitch,
                onClickSwitch: handleButtonClick,
                isLoadingSwitch: isSubmittingBan,
              })}
              onClickUpdateCustomTable={handleButtonUpdate}
            />
          </div>
        }
      />
    </>
  );
};

export default AllApplicationsContent;
