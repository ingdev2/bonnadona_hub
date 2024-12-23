"use client";

import React, { useState } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { useRouter } from "next/navigation";

import { Col } from "antd";
import CustomMessage from "@/components/common/custom_messages/CustomMessage";
import CustomModalTwoOptions from "@/components/common/custom_modal_two_options/CustomModalTwoOptions";
import CustomModalNoContent from "@/components/common/custom_modal_no_content/CustomModalNoContent";
import CustomResultOneButton from "@/components/common/custom_result_one_button/CustomResultOneButton";
import { FcInfo } from "react-icons/fc";
import { useGetAllUsersQuery } from "@/redux/apis/users/userApi";
import { setErrorsUser } from "@/redux/features/user/userSlice";

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
  ] = useState("");
  const [
    userCorporateCellphoneUserLocalState,
    setUserCorporateCellphoneLocalState,
  ] = useState("");
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
  const [userPositionListLocalState, setUserPositionListLocalState] =
    useState("");
  const [userServiceLocalState, setUserServiceLocalState] = useState("");
  const [userServiceListLocalState, setUserServiceListLocalState] =
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

  const {
    data: allUsersData,
    isLoading: allUsersLoading,
    isFetching: allUsersFetching,
    error: allUsersError,
    refetch: refecthAllUsers,
  } = useGetAllUsersQuery(null);

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
    } catch (error) {
      console.error(error);
    } finally {
      setIsSubmittingNewData(false);
    }
  };

  const handleSearchName = (value: string) => {
    if (value) {
      const filteredOptions =
        allUsersData
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

      await router.replace("admin/dashboard/all_user", {
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
          titleCustomModal="¿Deseas crear una nueva aplicación?"
          subtitleCustomModal={
            <p>
              Se creará una nuevo usuario con nombre:&nbsp;
              <b>{userNameLocalState}</b> y apellido:&nbsp;
              <b>{userLastNameLocalState}.</b>
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
              titleCustomResult="Usuario creada correctamente!"
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
    </Col>
  );
};

export default UserRegistrationForm;
