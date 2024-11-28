import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";

import CustomDashboardLayoutAdmins from "@/components/common/custom_dashboard_layout_admins/CustomDashboardLayoutAdmins";
import {
  useBanUserMutation,
  useGetAllUsersQuery,
  useGetUserProfileByIdQuery,
} from "@/redux/apis/users/userApi";
import { useGetAllIdTypesQuery } from "@/redux/apis/id_types/idTypesApi";
import { useGetAllGenderTypesQuery } from "@/redux/apis/gender_types/genderTypesApi";
import { transformIdToNameMap } from "@/helpers/transform_id_to_name/transform_id_to_name";
import { setTableRowId } from "@/redux/features/common/modal/modalSlice";
import {
  setBirthdateSelectedUser,
  setCorporateCellphoneSelectedUser,
  setCorporateEmailSelectedUser,
  setDefaultValuesSelectedUser,
  setErrorsSelectedUser,
  setGenderSelectedUser,
  setIdNumberSelectedUser,
  setIdSelectedUser,
  setIdTypeSelectedUser,
  setLastNameSelectedUser,
  setNameSelectedUser,
  setPersonalCellphoneSelectedUser,
  setPersonalEmailSelectedUser,
  setPrincipalEmailSelectedUser,
  setResidenceCitySelectedUser,
  setResidenceDepartmentSelectedUser,
  setResidenceNeighborhoodSelectedUser,
} from "@/redux/features/user/selectedUserSlice";
import CustomMessage from "@/components/common/custom_messages/CustomMessage";
import CustomTableFiltersAndSorting from "@/components/common/custom_table_filters_and_sorting/CustomTableFiltersAndSorting";
import { tableColumnsAllUsers } from "./table_columns_all_users/TableColums_all_users";
import CustomModalNoContent from "@/components/common/custom_modal_no_content/CustomModalNoContent";
import ModalUserDetails from "./modal_user_details/ModalUserDetails";
import { getTagComponentIdTypes } from "@/components/common/custom_tags_id_types/CustomTagsIdTypes";
import { Button } from "antd";
import { TbUserEdit } from "react-icons/tb";

const AllUsersContent: React.FC = () => {
  const dispatch = useAppDispatch();

  const [isEditUserVisibleLocalState, setIsEditUserVisibleLocalState] =
    useState(false);
  const [isModalVisibleLocalState, setIsModalVisibleLocalState] =
    useState(false);
  const [selectedRowDataLocalState, setSelectedRowDataLocalState] =
    useState<User | null>(null);

  const [isSubmittingBanUser, setIsSubmittingBanUser] = useState(false);
  const [isSubmittingRegisterPageUser, setIsSubmittingRegisterPageUser] =
    useState(false);

  const [successMessageUser, setSuccessMessageUser] = useState("");
  const [showSuccessMessageUser, setShowSuccessMessageUser] = useState(false);
  const [showErrorMessageUser, setShowErrorMessageUser] = useState(false);

  const userErrorsState = useAppSelector((state) => state.user.errors);

  const [
    banUser,
    {
      data: banUserData,
      isLoading: banUserLoading,
      isSuccess: banUserFetching,
      isError: banUserError,
    },
  ] = useBanUserMutation({
    fixedCacheKey: "banUserData",
  });

  const {
    data: allUsersData,
    isLoading: allUsersLoading,
    isFetching: allUsersFetching,
    error: allUsersError,
    refetch: refecthAllUsers,
  } = useGetAllUsersQuery(null);

  const {
    data: allIdTypesData,
    isLoading: allIdTypesLoading,
    isFetching: allIdTypesFetching,
    error: allIdTypesError,
    refetch: refecthAllIdTypes,
  } = useGetAllIdTypesQuery(null);

  const {
    data: allGenderTypesData,
    isLoading: allGenderTypesLoading,
    isFetching: allGenderTypesFetching,
    error: allGenderTypesError,
    refetch: refecthAllGenderTypes,
  } = useGetAllGenderTypesQuery(null);

  const {
    data: userProfileByIdData,
    isLoading: userProfileByIdLoading,
    isFetching: userProfileByIdFetching,
    error: userProfileByIdError,
    refetch: userProfileByIdRefetch,
  } = useGetUserProfileByIdQuery(selectedRowDataLocalState?.id!, {
    skip: !selectedRowDataLocalState?.id,
  });

  const idTypeGetName = transformIdToNameMap(allIdTypesData);
  const genderTypeGetName = transformIdToNameMap(allGenderTypesData);

  const transformedData = Array.isArray(allUsersData)
    ? allUsersData.map((req: any) => ({
        ...req,
        user_id_type: idTypeGetName?.[req.user_id_type] || req.user_id_type,
        user_gender: genderTypeGetName?.[req.user_gender] || req.user_gender,
      }))
    : [];

  const handleClickSeeMore = (record: User) => {
    dispatch(setTableRowId(""));
    setSelectedRowDataLocalState(record);

    dispatch(setTableRowId(record.id));

    setIsModalVisibleLocalState(true);

    refecthAllUsers();

    dispatch(setIdSelectedUser(record?.id));
    dispatch(setNameSelectedUser(record?.name));
    dispatch(setLastNameSelectedUser(record?.last_name));
    dispatch(setIdTypeSelectedUser(record?.user_id_type));
    dispatch(setIdNumberSelectedUser(record?.id_number));
    dispatch(setGenderSelectedUser(record?.user_gender));
    dispatch(setBirthdateSelectedUser(record?.birthdate));
    dispatch(setPrincipalEmailSelectedUser(record?.principal_email));
    dispatch(setCorporateEmailSelectedUser(record?.corporate_email));
    dispatch(setPersonalEmailSelectedUser(record?.personal_email));
    dispatch(setCorporateCellphoneSelectedUser(record?.corporate_cellphone));
    dispatch(setPersonalCellphoneSelectedUser(record?.personal_cellphone));
    dispatch(setResidenceDepartmentSelectedUser(record?.residence_department));
    dispatch(setResidenceCitySelectedUser(record?.residence_city));
    dispatch(
      setResidenceNeighborhoodSelectedUser(record?.residence_neighborhood)
    );
  };

  const handleOnChangeSwitch = async (record: User) => {
    try {
      setIsSubmittingBanUser(true);

      const response: any = await banUser({
        id: record.id,
      });

      let banUserSuccess = response?.data;

      let banUserError = response?.error;

      if (banUserSuccess?.statusCode === 202 && !banUserError) {
        const successMessage = banUserSuccess?.message;

        setSuccessMessageUser(successMessage);
        setShowSuccessMessageUser(true);
      } else {
        const errorMessage = banUserError?.data.message;

        if (Array.isArray(errorMessage)) {
          dispatch(setErrorsSelectedUser(errorMessage[0]));

          setShowErrorMessageUser(true);
        } else if (typeof errorMessage === "string") {
          dispatch(setErrorsSelectedUser(errorMessage));

          setShowErrorMessageUser(true);
        }
      }
    } catch (error) {
      console.error(error);
    } finally {
      refecthAllUsers();

      setIsSubmittingBanUser(false);
    }
  };

  const handleButtonUpdate = () => {
    refecthAllUsers();
  };

  const handleButtonClick = () => {
    setSuccessMessageUser("");
    setShowSuccessMessageUser(false);

    dispatch(setErrorsSelectedUser([]));
    setShowErrorMessageUser(false);
  };

  return (
    <>
      {showErrorMessageUser && (
        <CustomMessage
          typeMessage="error"
          message={userErrorsState?.toString() || "¡Error en la petición!"}
        />
      )}

      {showSuccessMessageUser && (
        <CustomMessage
          typeMessage="success"
          message={
            successMessageUser?.toString() || `Acción realizada correctamente!`
          }
        />
      )}

      {isModalVisibleLocalState && (
        <CustomModalNoContent
          key={"custom-modal-request-details-user"}
          widthCustomModalNoContent={"69%"}
          minWidthCustomModalNoContent="321px"
          openCustomModalState={isModalVisibleLocalState}
          closableCustomModal={true}
          maskClosableCustomModal={false}
          handleCancelCustomModal={() => {
            refecthAllUsers();

            setIsModalVisibleLocalState(false);
            setIsEditUserVisibleLocalState(false);

            setSelectedRowDataLocalState(null);
            dispatch(setDefaultValuesSelectedUser());
          }}
          contentCustomModal={
            <>
              {!isEditUserVisibleLocalState ? (
                <>
                  <ModalUserDetails
                    titleDescription="Detalle del usuario"
                    labelUserName="Nombre(s)"
                    selectedUserName={selectedRowDataLocalState?.name}
                    labelUserLastName="Apellido(s)"
                    selectedUserLastName={selectedRowDataLocalState?.last_name}
                    labelUserIdType="Tipo de identificación"
                    selectedUserIdType={getTagComponentIdTypes(
                      selectedRowDataLocalState?.user_id_type.toString()
                    )}
                    labelUserIdNumber="Número de identificación"
                    selectedUserIdNumber={selectedRowDataLocalState?.id_number}
                    labelUserGender="Género"
                    selectedUserGender={selectedRowDataLocalState?.user_gender.toString()}
                    labelUserBirthdate="birthdate"
                    selectedUserBirthdate={selectedRowDataLocalState?.birthdate.toString()}
                    labelUserAddressResidence="Dirección de residencia"
                    selectedUserAddressResidence={
                      selectedRowDataLocalState?.residence_address
                    }
                    labelUserMainEmail="Correo principal"
                    selectedUserMainEmail={
                      selectedRowDataLocalState?.principal_email
                    }
                    labelUserCorporateEmail="Correo corporativo"
                    selectedUserCorporateEmail={
                      selectedRowDataLocalState?.corporate_email
                    }
                    labelUserPersonalCellphone="Teléfono personal"
                    selectedUserPersonalCellphone={
                      selectedRowDataLocalState?.personal_cellphone
                    }
                  />

                  <Button
                    className="edit-user-button"
                    size="middle"
                    style={{
                      backgroundColor: "#015E90",
                      color: "#F7F7F7",
                      borderRadius: "31px",
                      paddingInline: "31px",
                      marginBlock: "13px",
                    }}
                    onClick={() => {
                      setIsEditUserVisibleLocalState(true);
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
                      <TbUserEdit size={17} />
                      &nbsp; Editar usuario
                    </div>
                  </Button>
                </>
              ) : (
                <></>
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
            <CustomTableFiltersAndSorting
              dataCustomTable={transformedData || []}
              columnsCustomTable={tableColumnsAllUsers({
                handleClickSeeMore: handleClickSeeMore,
                handleOnChangeSwitch: handleOnChangeSwitch,
                onClickSwitch: handleButtonClick,
                isLoadingSwitch: isSubmittingBanUser,
                idTypesData: allIdTypesData,
                genderTypesData: allGenderTypesData,
              })}
              onClickUpdateCustomTable={handleButtonUpdate}
            />
          </div>
        }
      />
    </>
  );
};

export default AllUsersContent;
