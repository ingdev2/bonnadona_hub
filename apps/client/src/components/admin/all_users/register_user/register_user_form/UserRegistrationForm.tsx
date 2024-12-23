"use client";

import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { useRouter } from "next/navigation";

import { Col, DatePickerProps } from "antd";
import CustomMessage from "@/components/common/custom_messages/CustomMessage";
import CustomModalTwoOptions from "@/components/common/custom_modal_two_options/CustomModalTwoOptions";
import CustomModalNoContent from "@/components/common/custom_modal_no_content/CustomModalNoContent";
import CustomResultOneButton from "@/components/common/custom_result_one_button/CustomResultOneButton";
import { FcInfo } from "react-icons/fc";
import {
  useGetAllCollaboratorPositionsQuery,
  useGetAllCollaboratorServicesQuery,
  useGetAllUsersQuery,
} from "@/redux/apis/users/userApi";
import { setErrorsUser } from "@/redux/features/user/userSlice";
import UserRegistrationFormData from "./UserRegistrationFormData";
import { useGetAllIdTypesQuery } from "@/redux/apis/id_types/idTypesApi";
import { useGetAllGenderTypesQuery } from "@/redux/apis/gender_types/genderTypesApi";
import { useGetAllServiceTypesQuery } from "@/redux/apis/service_types/serviceTypesApi";
import { useGetAllPositionLevelsQuery } from "@/redux/apis/position_levels/positionLevelsApi";
import { useCreateNewUserFromBonnadonaHubMutation } from "@/redux/apis/register/registerUserApi";

const UserRegistrationForm: React.FC = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const [userNameLocalState, setUserNameLocalState] = useState("");
  const [userLastNameLocalState, setUserLastNameLocalState] = useState("");
  const [userIdTypeLocalState, setUserIdTypeLocalState] = useState(0);
  const [userIdTypeNameLocalState, setUserIdTypeNameLocalState] = useState("");
  const [userIdTypesListLocalState, setUserIdTypesListLocalState]: any[] =
    useState([]);
  const [userIdNumberLocalState, setUserIdNumberLocalState] = useState(0);
  const [userGenderLocalState, setUserGenderLocalState] = useState(0);
  const [userGenderListLocalState, setUserGenderListLocalState]: any[] =
    useState([]);
  const [userBirthdateLocalState, setUserBirthdateLocalState] = useState("");
  const [userPrincipalEmailLocalState, setUserPrincipalEmailLocalState] =
    useState("");
  const [userCorporateEmailLocalState, setUserCorporateEmailLocalState] =
    useState("");
  const [userPersonalEmailLocalState, setUserPersonalEmailLocalState] =
    useState("");
  const [
    userPersonalCellphoneUserLocalState,
    setUserPersonalCellphoneLocalState,
  ] = useState(0);
  const [
    userCorporateCellphoneUserLocalState,
    setUserCorporateCellphoneLocalState,
  ] = useState(0);
  const [userServiceTypeLocalState, setUserServiceTypeLocalState] = useState(0);
  const [
    userServiceTypeListLocalState,
    setUserServiceTypeListLocalState,
  ]: any[] = useState([]);
  const [userPositionLevelLocalState, setUserPositionLevelLocalState] =
    useState(0);
  const [
    userPositionLevelListLocalState,
    setUserPositionLevelListLocalState,
  ]: any[] = useState([]);
  const [userPositionLocalState, setUserPositionLocalState] = useState("");
  const [userPositionListLocalState, setUserPositionListLocalState]: any[] =
    useState([]);
  const [userServiceLocalState, setUserServiceLocalState] = useState("");
  const [userServiceListLocalState, setUserServiceListLocalState]: any[] =
    useState([]);
  const [userInmediateBossLocalState, setUserInmediateBossLocalState] =
    useState("");

  const [options, setOptions] = useState<any[]>([]);
  const [modalIsOpenConfirm, setModalIsOpenConfirm] = useState(false);
  const [modalIsOpenSuccess, setModalIsOpenSuccess] = useState(false);

  const [isSubmittingConfirmModal, setIsSubmittingConfirmModal] =
    useState(false);
  const [isSubmittingNewData, setIsSubmittingNewData] = useState(false);
  const [isSubmittingGoToAllData, setIsSubmittingGoToAllData] = useState(false);
  const [showErrorMessage, setShowErrorMessage] = useState(false);

  const userErrorsState = useAppSelector((state) => state.user.errors);

  const [
    createNewUser,
    {
      data: createNewUserData,
      isLoading: createNewUserLoading,
      isSuccess: createNewUserSuccess,
      isError: createNewUserError,
    },
  ] = useCreateNewUserFromBonnadonaHubMutation({
    fixedCacheKey: "createNewUserData",
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
    data: allServiceTypesData,
    isLoading: allServiceTypesLoading,
    isFetching: allServiceTypesFetching,
    error: allServiceTypesError,
    refetch: refecthAllServiceTypes,
  } = useGetAllServiceTypesQuery(null);

  const {
    data: allPositionLevelsData,
    isLoading: allPositionLevelsLoading,
    isFetching: allPositionLevelsFetching,
    error: allPositionLevelsError,
    refetch: refecthAllPositionLevels,
  } = useGetAllPositionLevelsQuery(null);

  const {
    data: allPositionsData,
    isLoading: allPositionsLoading,
    isFetching: allPositionsFetching,
    error: allPositionsError,
    refetch: refecthAllPositions,
  } = useGetAllCollaboratorPositionsQuery(null);

  const {
    data: allServicesData,
    isLoading: allServicesLoading,
    isFetching: allServicesFetching,
    error: allServicesError,
    refetch: refecthAllServices,
  } = useGetAllCollaboratorServicesQuery(null);

  useEffect(() => {
    if (!allIdTypesLoading && !allIdTypesFetching && allIdTypesData) {
      setUserIdTypesListLocalState(allIdTypesData);
    }
    if (allIdTypesError) {
      dispatch(
        setErrorsUser("¡No se pudo obtener los tipos de identificación!")
      );
      setShowErrorMessage(true);
      setUserIdTypesListLocalState(allIdTypesData);
    }

    if (
      !allGenderTypesLoading &&
      !allGenderTypesFetching &&
      allGenderTypesData
    ) {
      setUserGenderListLocalState(allGenderTypesData);
    }
    if (allGenderTypesError) {
      dispatch(setErrorsUser("¡No se pudo obtener los tipos de géneros!"));
      setShowErrorMessage(true);
      setUserGenderListLocalState(allGenderTypesData);
    }

    if (
      !allServiceTypesLoading &&
      !allServiceTypesFetching &&
      allServiceTypesData
    ) {
      setUserServiceTypeListLocalState(allServiceTypesData);
    }
    if (allServiceTypesError) {
      dispatch(setErrorsUser("¡No se pudo obtener los tipos de servicios!"));
      setShowErrorMessage(true);
      setUserServiceTypeListLocalState(allServiceTypesData);
    }

    if (
      !allPositionLevelsLoading &&
      !allPositionLevelsFetching &&
      allPositionLevelsData
    ) {
      setUserPositionLevelListLocalState(allPositionLevelsData);
    }
    if (allPositionLevelsError) {
      dispatch(setErrorsUser("¡No se pudo obtener los niveles de cargos!"));
      setShowErrorMessage(true);
      setUserPositionLevelListLocalState(allPositionLevelsData);
    }

    if (!allPositionsLoading && !allPositionsFetching && allPositionsData) {
      setUserPositionListLocalState(allPositionsData);
    }
    if (allPositionsError) {
      dispatch(setErrorsUser("¡No se pudo obtener los cargos!"));
      setShowErrorMessage(true);
      setUserPositionListLocalState(allPositionsData);
    }

    if (!allServicesLoading && !allServicesFetching && allServicesData) {
      setUserServiceListLocalState(allServicesData);
    }
    if (allServicesError) {
      dispatch(setErrorsUser("¡No se pudo obtener los servicios!"));
      setShowErrorMessage(true);
      setUserServiceListLocalState(allServicesData);
    }
  }, [
    allIdTypesData,
    allIdTypesError,
    allGenderTypesData,
    allGenderTypesError,
    allServiceTypesData,
    allServiceTypesError,
    allPositionLevelsData,
    allPositionLevelsError,
    allPositionsData,
    allPositionsError,
    allServicesData,
    allServicesError,
  ]);

  const handleCreateUser = () => {
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

      const response: any = await createNewUser({
        name: userNameLocalState,
        last_name: userLastNameLocalState,
        user_id_type: userIdTypeLocalState,
        id_number: userIdNumberLocalState,
        user_gender: userGenderLocalState,
        birthdate: userBirthdateLocalState,
        principal_email: userPrincipalEmailLocalState,
        personal_email: userPersonalEmailLocalState,
        personal_cellphone: userPersonalCellphoneUserLocalState,
        corporate_email: userCorporateEmailLocalState || undefined,
        corporate_cellphone: userCorporateCellphoneUserLocalState || undefined,
        collaborator_service_type: userServiceTypeLocalState,
        collaborator_position_level: userPositionLevelLocalState,
        collaborator_position: userPositionLocalState,
        collaborator_service: userServiceLocalState,
        collaborator_immediate_boss: userInmediateBossLocalState,
      });

      let createUserError = response.error;
      let createUserValidationData = response.data?.message;
      let createUserSuccess = response.data;

      if (createUserError || createUserValidationData) {
        const errorMessage = createUserError?.data.message;
        const validationDataMessage = createUserValidationData;

        if (Array.isArray(errorMessage)) {
          dispatch(setErrorsUser(errorMessage[0]));

          setShowErrorMessage(true);
        } else if (typeof errorMessage === "string") {
          dispatch(setErrorsUser(errorMessage));

          setShowErrorMessage(true);
        }

        if (Array.isArray(validationDataMessage)) {
          dispatch(setErrorsUser(validationDataMessage[0]));

          setShowErrorMessage(true);
        } else if (typeof validationDataMessage === "string") {
          dispatch(setErrorsUser(validationDataMessage));

          setShowErrorMessage(true);
        }
      }

      if (createUserSuccess && !createUserError && !createUserValidationData) {
        setModalIsOpenConfirm(false);
        setModalIsOpenSuccess(true);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsSubmittingNewData(false);
    }
  };

  const handleOnChangeSelectIdType = (value: number) => {
    setUserIdTypeLocalState(value);

    const selectedType: any = userIdTypesListLocalState?.find(
      (type: any) => type.id === value
    );

    setUserIdTypeNameLocalState(selectedType?.name);
  };

  const onChangeDate: DatePickerProps["onChange"] = (date, dateString) => {
    setUserBirthdateLocalState(dateString.toString());
  };

  const handleSearchName = (value: string) => {
    if (value) {
      const filteredOptions =
        allUsersData
          ?.filter((types) =>
            `${types.name} ${types.last_name}`
              .toUpperCase()
              .includes(value.toUpperCase())
          )
          .map((type) => ({
            value: `${type.name} ${type.last_name}`,
            label: `${type.name} ${type.last_name}`,
            key: type.id,
          })) || [];
      setOptions(filteredOptions);
    } else {
      setOptions([]);
    }
  };

  const handleGoToAllData = async () => {
    try {
      setIsSubmittingGoToAllData(true);

      await router.replace("/admin/dashboard/all_user", {
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
    dispatch(setErrorsUser([]));
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
          key={"custom-confirm-modal-create-user"}
          openCustomModalState={modalIsOpenConfirm}
          iconCustomModal={<FcInfo size={77} />}
          titleCustomModal="¿Deseas crear un nuevo usuario?"
          subtitleCustomModal={
            <p>
              Se creará una nuevo usuario con nombre:&nbsp;
              <b>{userNameLocalState}</b> y apellido:&nbsp;
              <b>{userLastNameLocalState}</b>&nbsp;con tipo de
              identificación:&nbsp;
              <b>{userIdTypeNameLocalState},</b>&nbsp;número de
              identificación:&nbsp;<b>{userIdNumberLocalState}</b>
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
          key={"custom-success-modal-create-user"}
          widthCustomModalNoContent={"54%"}
          openCustomModalState={modalIsOpenSuccess}
          closableCustomModal={false}
          maskClosableCustomModal={false}
          contentCustomModal={
            <CustomResultOneButton
              key={"user-created-custom-result"}
              statusTypeResult={"success"}
              titleCustomResult="Usuario creado correctamente!"
              subtitleCustomResult="El usuario ha sido agregado a la lista de usuarios."
              handleClickCustomResult={handleGoToAllData}
              isSubmittingButton={isSubmittingGoToAllData}
              textButtonCustomResult="Regresar a lista de usuarios"
            />
          }
        />
      )}

      {showErrorMessage && (
        <CustomMessage
          typeMessage="error"
          message={userErrorsState?.toString() || "¡Error en la petición!"}
        />
      )}

      <UserRegistrationFormData
        handleCreateUserDataForm={handleCreateUser}
        userNameDataForm={userNameLocalState}
        handleOnChangeUserNameDataForm={(e) => {
          setUserNameLocalState(e.target.value.toUpperCase());
        }}
        userLastNameDataForm={userLastNameLocalState}
        handleOnChangeUserLastNameDataForm={(e) => {
          setUserLastNameLocalState(e.target.value.toUpperCase());
        }}
        idTypeSelectorLoadingDataForm={
          allIdTypesLoading && allIdTypesFetching && !allIdTypesData
        }
        userIdTypeValueDataForm={userIdTypeLocalState}
        handleOnChangeSelectIdTypeDataForm={handleOnChangeSelectIdType}
        userIdTypeListDataForm={userIdTypesListLocalState}
        userIdNumberDataForm={userIdNumberLocalState}
        handleOnChangeUserIdNumberDataForm={(e) =>
          setUserIdNumberLocalState(parseInt(e.target.value, 10))
        }
        userBirthdateDataForm={userBirthdateLocalState}
        onChangeDateCustomDatePicker={onChangeDate}
        genderSelectorLoadingDataForm={
          allGenderTypesLoading && allGenderTypesFetching && !allGenderTypesData
        }
        userGenderValueDataForm={userGenderLocalState}
        handleOnChangeSelectGenderDataForm={(e) => {
          setUserGenderLocalState(e);
        }}
        userGenderListDataForm={userGenderListLocalState}
        userPrincipalEmailDataForm={userPrincipalEmailLocalState}
        handleOnChangeUserPrincipalEmailDataForm={(e) =>
          setUserPrincipalEmailLocalState(e.target.value.toUpperCase())
        }
        userCorporateEmailDataForm={userCorporateEmailLocalState}
        handleOnChangeUserCorporateEmailDataForm={(e) =>
          setUserCorporateEmailLocalState(e.target.value.toUpperCase())
        }
        userPersonalEmailDataForm={userPersonalEmailLocalState}
        handleOnChangeUserPersonalEmailDataForm={(e) => {
          setUserPersonalEmailLocalState(e.target.value.toUpperCase());
        }}
        userPersonalCellphoneDataForm={userPersonalCellphoneUserLocalState}
        handleOnChangeUserPersonalCellphoneDataForm={(e) => {
          setUserPersonalCellphoneLocalState(parseInt(e.target.value, 10));
        }}
        userCorporateCellphoneDataForm={userCorporateCellphoneUserLocalState}
        handleOnChangeUserCorporateCellphoneDataForm={(e) => {
          setUserCorporateCellphoneLocalState(parseInt(e.target.value, 10));
        }}
        serviceTypeSelectorLoadingDataForm={
          allServiceTypesLoading &&
          allServiceTypesFetching &&
          !allServiceTypesData
        }
        userServiceTypeValueDataForm={userServiceTypeLocalState}
        handleOnChangeSelectServiceTypeDataForm={setUserServiceTypeLocalState}
        userServiceTypeListDataForm={userServiceTypeListLocalState}
        positionLevelSelectorLoadingDataForm={
          allPositionLevelsLoading &&
          allPositionLevelsFetching &&
          !allPositionLevelsData
        }
        userPositionLevelValueDataForm={userPositionLevelLocalState}
        handleOnChangeSelectPositionLevelDataForm={
          setUserPositionLevelLocalState
        }
        userPositionLevelListDataForm={userPositionLevelListLocalState}
        positionSelectorLoadingDataForm={
          allPositionsLoading && allPositionsFetching && !allPositionsData
        }
        userPositionValueDataForm={userPositionLocalState}
        handleOnChangeSelectPositionDataForm={setUserPositionLocalState}
        userPositionListDataForm={userPositionListLocalState}
        serviceSelectorLoadingDataForm={
          allServicesLoading && allServicesFetching && !allServicesData
        }
        userServiceValueDataForm={userServiceLocalState}
        handleOnChangeSelectServiceDataForm={setUserServiceLocalState}
        userServiceListDataForm={userServiceListLocalState}
        inmediateBossNameDataForm={userInmediateBossLocalState}
        handleOnChangeInmediateBossNameDataForm={(e) => {
          setUserInmediateBossLocalState(e.toUpperCase());
        }}
        handleSearchNameInmediateBossNameDataForm={handleSearchName}
        optionsInmediateBossNameFormData={options}
        handleButtonSubmitDataForm={handleButtonClick}
        buttonSubmitFormLoadingDataForm={
          isSubmittingConfirmModal && !modalIsOpenConfirm
        }
      />
    </Col>
  );
};

export default UserRegistrationForm;
