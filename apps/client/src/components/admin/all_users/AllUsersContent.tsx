import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";

import CustomDashboardLayoutAdmins from "@/components/common/custom_dashboard_layout_admins/CustomDashboardLayoutAdmins";
import EditUserForm from "./edit_user/EditUserForm";

import {
  useBanUserMutation,
  useGetAllUsersWithProfileQuery,
} from "@/redux/apis/users/userApi";
import { useGetAllIdTypesQuery } from "@/redux/apis/id_types/idTypesApi";
import { useGetAllGenderTypesQuery } from "@/redux/apis/gender_types/genderTypesApi";

import { transformIdToNameMap } from "@/helpers/transform_id_to_name/transform_id_to_name";

import { setTableRowId } from "@/redux/features/common/modal/modalSlice";
import {
  setBirthdateSelectedUser,
  setCollaboratorPositionSelectedUser,
  setCollaboratorServiceSelectedUser,
  setCollaboratorServiceTypeSelectedUser,
  setCollaboratorUnitSelectedUser,
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
} from "@/redux/features/user/selectedUserSlice";
import CustomMessage from "@/components/common/custom_messages/CustomMessage";
import CustomTableFiltersAndSorting from "@/components/common/custom_table_filters_and_sorting/CustomTableFiltersAndSorting";
import { tableColumnsAllUsers } from "./table_columns_all_users/TableColums_all_users";
import CustomModalNoContent from "@/components/common/custom_modal_no_content/CustomModalNoContent";
import ModalUserDetails from "./modal_user_details/ModalUserDetails";
import { getTagComponentIdTypes } from "@/components/common/custom_tags_id_types/CustomTagsIdTypes";
import { Button } from "antd";
import { TbUserEdit } from "react-icons/tb";
import { useGetAllServiceTypesQuery } from "@/redux/apis/service_types/serviceTypesApi";
import { useGetAllBloodGroupsQuery } from "@/redux/apis/blood_group/bloodGroupApi";
import {
  setAffiliationEpsUserProfile,
  setBloodGroupUserProfile,
  setIdUserProfile,
  setResidenceAddressUserProfile,
  setResidenceCityUserProfile,
  setResidenceDepartmentUserProfile,
  setResidenceNeighborhoodUserProfile,
  setUserHeightUserProfile,
  setUserPantsSizeUserProfile,
  setUserShirtSizeUserProfile,
  setUserShoeSizeUserProfile,
  setUserWeightUserProfile,
} from "@/redux/features/user_profile/userProfileSlice";

const AllUsersContent: React.FC = () => {
  const dispatch = useAppDispatch();

  const NOT_REGISTER: string = "NO REGISTRA";

  const bloodGroupUserProfileState = useAppSelector(
    (state) => state.userProfile.user_blood_group
  );
  const affiliationEpsUserProfileState = useAppSelector(
    (state) => state.userProfile.affiliation_eps
  );
  const residenceDepartmentUserProfileState = useAppSelector(
    (state) => state.userProfile.residence_department
  );
  const residenceCityUserProfileState = useAppSelector(
    (state) => state.userProfile.residence_city
  );

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
    data: allUsersWithProfileData,
    isLoading: allUsersWithProfileLoading,
    isFetching: allUsersWithProfileFetching,
    error: allUsersWithProfileError,
    refetch: refecthAllUsersWithProfile,
  } = useGetAllUsersWithProfileQuery(null);

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
    data: allServiceTypesData,
    isLoading: allServiceTypesLoading,
    isFetching: allServiceTypesFetching,
    error: allServiceTypesError,
    refetch: refecthAllServiceTypes,
  } = useGetAllServiceTypesQuery(null);

  const {
    data: allBloodGroupData,
    isLoading: allBloodGroupLoading,
    isFetching: allBloodGroupFetching,
    error: allBloodGroupError,
    refetch: refecthAllBloodGroup,
  } = useGetAllBloodGroupsQuery(null);

  const idTypeGetName = transformIdToNameMap(allIdTypesData);
  const genderTypeGetName = transformIdToNameMap(allGenderTypesData);
  const serviceTypeGetName = transformIdToNameMap(allServiceTypesData);
  const bloodGroupGetName = transformIdToNameMap(allBloodGroupData);

  const transformedData = Array.isArray(allUsersWithProfileData)
    ? allUsersWithProfileData.map((req: any) => ({
        ...req,
        user_id_type: idTypeGetName?.[req.user_id_type] || req.user_id_type,
        user_gender: genderTypeGetName?.[req.user_gender] || req.user_gender,
        collaborator_service_type:
          serviceTypeGetName?.[req.collaborator_service_type] ||
          req.collaborator_service_type,
        user_blood_group:
          bloodGroupGetName?.[req.user_blood_group] || req.user_blood_group,
      }))
    : [];

  const handleClickSeeMore = (record: User) => {
    dispatch(setTableRowId(""));
    setSelectedRowDataLocalState(record);

    dispatch(setTableRowId(record.id));

    setIsModalVisibleLocalState(true);

    refecthAllUsersWithProfile();

    // USER DATA
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
    dispatch(
      setCollaboratorServiceTypeSelectedUser(record?.collaborator_service_type)
    );
    dispatch(setCollaboratorUnitSelectedUser(record?.collaborator_unit));
    dispatch(setCollaboratorServiceSelectedUser(record?.collaborator_service));
    dispatch(
      setCollaboratorPositionSelectedUser(record?.collaborator_position)
    );
    dispatch(setBloodGroupUserProfile(record?.user_blood_group));
    dispatch(setAffiliationEpsUserProfile(record?.affiliation_eps));
    dispatch(setResidenceDepartmentUserProfile(record?.residence_department));
    dispatch(setResidenceCityUserProfile(record?.residence_city));
    dispatch(setResidenceAddressUserProfile(record?.residence_address));
    dispatch(
      setResidenceNeighborhoodUserProfile(record?.residence_neighborhood)
    );
    dispatch(setUserHeightUserProfile(record?.user_height));
    dispatch(setUserWeightUserProfile(record?.user_weight));
    dispatch(setUserShirtSizeUserProfile(record?.user_shirt_size));
    dispatch(setUserPantsSizeUserProfile(record?.user_pants_size));
    dispatch(setUserShoeSizeUserProfile(record?.user_shoe_size));
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
      refecthAllUsersWithProfile();

      setIsSubmittingBanUser(false);
    }
  };

  const handleButtonUpdate = () => {
    refecthAllUsersWithProfile();
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
            refecthAllUsersWithProfile();

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
                    labelUserPersonalEmail="Correo personal"
                    selectedUserPersonalEmail={
                      selectedRowDataLocalState?.personal_email || NOT_REGISTER
                    }
                    labelUserMainEmail="Correo principal"
                    selectedUserMainEmail={
                      selectedRowDataLocalState?.principal_email || NOT_REGISTER
                    }
                    labelUserCorporateEmail="Correo corporativo"
                    selectedUserCorporateEmail={
                      selectedRowDataLocalState?.corporate_email || NOT_REGISTER
                    }
                    labelUserPersonalCellphone="Teléfono personal"
                    selectedUserPersonalCellphone={
                      selectedRowDataLocalState?.personal_cellphone
                    }
                    labelUserCorporateCellphone="Teléfono corporativo"
                    selectedUserCorporateCellphone={
                      selectedRowDataLocalState?.corporate_cellphone
                    }
                    labelUserServiceType="Tipo de servicio"
                    selectedUserServiceType={
                      selectedRowDataLocalState?.collaborator_service_type
                    }
                    labelUserInmediateBoss="Jefe inmediato"
                    selectedUserInmediateBoss={
                      selectedRowDataLocalState?.collaborator_immediate_boss
                    }
                    labelUserUnit="Unidad"
                    selectedUserUnit={
                      selectedRowDataLocalState?.collaborator_unit ||
                      NOT_REGISTER
                    }
                    labelUserService="Servicio"
                    selectedUserService={
                      selectedRowDataLocalState?.collaborator_service
                    }
                    labelUserPosition="Cargo"
                    selectedUserPosition={
                      selectedRowDataLocalState?.collaborator_position
                    }
                    labelUserProfileBloodGroup="Tipo de sangre"
                    selectedUserProfileBloodGroup={
                      selectedRowDataLocalState?.user_blood_group?.toString() ||
                      NOT_REGISTER
                    }
                    labelUserProfileAffiliationEps="Afiliación EPS"
                    selectedUserProfileAffiliationEps={
                      selectedRowDataLocalState?.affiliation_eps || NOT_REGISTER
                    }
                    labelUserProfileResidenceDepartment="Departamente"
                    selectedUserProfileResidenceDepartment={
                      selectedRowDataLocalState?.residence_department ||
                      NOT_REGISTER
                    }
                    labelUserProfileResidenceCity="Ciudad"
                    selectedUserProfileResidenceCity={
                      selectedRowDataLocalState?.residence_city || NOT_REGISTER
                    }
                    labelUserProfileResidenceNeighborhood="Barrio"
                    selectedUserProfileResidenceNeighborhood={
                      selectedRowDataLocalState?.residence_neighborhood ||
                      NOT_REGISTER
                    }
                    labelUserProfileResidenceAddress="Dirección"
                    selectedUserProfileResidenceAddress={
                      selectedRowDataLocalState?.residence_address ||
                      NOT_REGISTER
                    }
                    labelUserProfileHeight="Estatura"
                    selectedUserProfileHeight={
                      selectedRowDataLocalState?.user_height || NOT_REGISTER
                    }
                    labelUserProfileWeight="Peso"
                    selectedUserProfileWeight={
                      selectedRowDataLocalState?.user_weight || NOT_REGISTER
                    }
                    labelUserProfileShirtSize="Talla camisa"
                    selectedUserProfileShirtSize={
                      selectedRowDataLocalState?.user_shirt_size || NOT_REGISTER
                    }
                    labelUserProfilePantsSize="Talla pantalón"
                    selectedUserProfilePantsSize={
                      selectedRowDataLocalState?.user_pants_size || NOT_REGISTER
                    }
                    labelUserProfileShoeSize="Talla zapatos"
                    selectedUserProfileShoeSize={
                      selectedRowDataLocalState?.user_shoe_size || NOT_REGISTER
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
                <EditUserForm />
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
