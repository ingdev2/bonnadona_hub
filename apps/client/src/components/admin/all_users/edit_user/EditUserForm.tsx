"use client";

import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";

import CustomMessage from "@/components/common/custom_messages/CustomMessage";
import {
  useGetUserByIdNumberQuery,
  useUpdateUserMutation,
} from "@/redux/apis/users/userApi";
import {
  setCorporateCellphoneSelectedUser,
  setCorporateEmailSelectedUser,
  setErrorsSelectedUser,
  setIdSelectedUser,
  setPersonalCellphoneSelectedUser,
  setPersonalEmailSelectedUser,
  setPrincipalEmailSelectedUser,
} from "@/redux/features/user/selectedUserSlice";
import EditUserFormData from "./EditUserFormData";
import { useGetAllRolesQuery } from "@/redux/apis/role/roleApi";
import { useGetAllPermissionsQuery } from "@/redux/apis/permission/permissionApi";

const EditUserForm: React.FC = () => {
  const dispatch = useAppDispatch();

  const NOT_REGISTER: string = "NO REGISTRA";

  const idUserState = useAppSelector((state) => state.selectedUser.id);
  const idNumberUserState = useAppSelector(
    (state) => state.selectedUser.id_number
  );
  const principalEmailUserState = useAppSelector(
    (state) => state.selectedUser.principal_email
  );
  const corporateEmailUserState = useAppSelector(
    (state) => state.selectedUser.corporate_email
  );
  const personalEmailUserState = useAppSelector(
    (state) => state.selectedUser.personal_email
  );
  const corporateCellphoneUserState = useAppSelector(
    (state) => state.selectedUser.corporate_cellphone
  );
  const personalCellphoneUserState = useAppSelector(
    (state) => state.selectedUser.personal_cellphone
  );
  const roleUserState = useAppSelector((state) => state.selectedUser.role);
  const permissionUserState = useAppSelector(
    (state) => state.selectedUser.permission
  );

  const positionUserState = useAppSelector(
    (state) => state.selectedUser.collaborator_position
  );
  const userErrorsState = useAppSelector((state) => state.selectedUser.errors);

  const [hasChanges, setHasChanges] = useState(false);

  const [principalEmailUserLocalState, setPrincipalEmailUserLocalState] =
    useState("");
  const [corporateEmailUserLocalState, setCorporateEmailUserLocalState] =
    useState("");
  const [personalEmailUserLocalState, setPersonalEmailUserLocalState] =
    useState("");
  const [personalCellphoneUserLocalState, setPersonalCellphoneUserLocalState] =
    useState("");
  const [
    corporateCellphoneUserLocalState,
    setCorporateCellphoneUserLocalState,
  ] = useState("");
  const [roleUserLocalState, setRoleUserLocalState] = useState([]);
  const [permissionUserLocalState, setPermissionUserLocalState] = useState<
    IPermission[]
  >([]);

  const [isSubmittingUpdatePersonal, setIsSubmittingUpdatePersonal] =
    useState(false);

  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [showErrorMessage, setShowErrorMessage] = useState(false);

  const {
    data: userData,
    isLoading: userLoading,
    isFetching: userFetching,
    error: userError,
  } = useGetUserByIdNumberQuery(idNumberUserState);

  const {
    data: allRolesData,
    isLoading: allRolesLoading,
    isFetching: allRolesFetching,
    error: allRolesError,
  } = useGetAllRolesQuery(null);

  const {
    data: allPermissionsData,
    isLoading: allPermissionsLoading,
    isFetching: allPermissionsFetching,
    error: allPermissionsError,
  } = useGetAllPermissionsQuery(null);

  const [
    updateUserData,
    {
      data: updateUserPersonalData,
      isLoading: updateUserLoading,
      isSuccess: updateUserSuccess,
      isError: updateUserError,
    },
  ] = useUpdateUserMutation({
    fixedCacheKey: "updateUserData",
  });

  useEffect(() => {
    if (userData && !idUserState && !userLoading && !userFetching) {
      dispatch(setIdSelectedUser(userData.id));
    }
  }, [userData, idUserState]);

  const handleConfirmUpdatePersonalData = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    try {
      setIsSubmittingUpdatePersonal(true);

      const response: any = await updateUserData({
        id: idUserState,
        updateUser: {
          principal_email:
            principalEmailUserLocalState || principalEmailUserState,
          corporate_email:
            corporateEmailUserLocalState || corporateEmailUserState,
          personal_email: personalEmailUserLocalState || personalEmailUserState,
          personal_cellphone:
            parseInt(personalCellphoneUserLocalState, 10) ||
            personalCellphoneUserState,
          corporate_cellphone:
            parseInt(corporateCellphoneUserLocalState, 10) ||
            corporateCellphoneUserState,
          roleIdsToAdd: roleUserLocalState || roleUserState,
          permissionIdsToAdd: permissionUserLocalState || permissionUserState,
        },
      });
      let editUserDataError = response.error;

      let editUserDataStatus = response.data?.statusCode;

      let editUserDataValidationData = response.data?.message;

      if (editUserDataError || editUserDataStatus !== 202) {
        setHasChanges(false);

        const errorMessage = editUserDataError?.data.message;
        const validationDataMessage = editUserDataValidationData;

        if (Array.isArray(errorMessage)) {
          dispatch(setErrorsSelectedUser(errorMessage[0]));

          setShowErrorMessage(true);
        } else if (typeof errorMessage === "string") {
          dispatch(setErrorsSelectedUser(errorMessage));

          setShowErrorMessage(true);
        }

        if (Array.isArray(validationDataMessage)) {
          dispatch(setErrorsSelectedUser(validationDataMessage[0]));

          setShowErrorMessage(true);
        } else if (typeof validationDataMessage === "string") {
          dispatch(setErrorsSelectedUser(validationDataMessage));

          setShowErrorMessage(true);
        }
      }

      if (editUserDataStatus === 202 && !editUserDataError) {
        setHasChanges(false);

        dispatch(
          setPrincipalEmailSelectedUser(
            principalEmailUserLocalState || principalEmailUserState
          )
        );
        dispatch(
          setCorporateEmailSelectedUser(
            corporateEmailUserLocalState || corporateEmailUserState
          )
        );
        dispatch(
          setPersonalEmailSelectedUser(
            personalEmailUserLocalState || personalEmailUserState
          )
        );
        dispatch(
          setPersonalCellphoneSelectedUser(
            parseInt(personalCellphoneUserLocalState, 10) ||
              personalCellphoneUserState
          )
        );
        dispatch(
          setCorporateCellphoneSelectedUser(
            parseInt(corporateCellphoneUserLocalState, 10) ||
              corporateCellphoneUserState
          )
        );

        setSuccessMessage("¡Datos del usuario actualizados correctamente!");
        setShowSuccessMessage(true);
      }
    } catch (error) {
      console.error(error);
      dispatch(setErrorsSelectedUser("ERROR INTERNO"));
    } finally {
      setIsSubmittingUpdatePersonal(false);
    }
  };

  const handleButtonClick = () => {
    setSuccessMessage("");
    setShowSuccessMessage(false);

    setShowErrorMessage(false);
  };

  return (
    <>
      {showErrorMessage && (
        <CustomMessage
          typeMessage="error"
          message={userErrorsState?.toString() || "¡Error en la petición!"}
        />
      )}

      {showSuccessMessage && (
        <CustomMessage
          typeMessage="success"
          message={successMessage || "¡Proceso finalizado con éxito!"}
        />
      )}

      <EditUserFormData
        principalEmailUserFormData={principalEmailUserState || NOT_REGISTER}
        onChangePrincipalEmailUserFormData={(e) => {
          setHasChanges(true);

          setPrincipalEmailUserLocalState(e.target.value);
        }}
        corporateEmailUserFormData={corporateEmailUserState || NOT_REGISTER}
        onChangeCorporateEmailUserFormData={(e) => {
          setHasChanges(true);

          setCorporateEmailUserLocalState(e.target.value);
        }}
        personalEmailUserFormData={personalEmailUserState || NOT_REGISTER}
        onChangePersonalEmailUserFormData={(e) => {
          setHasChanges(true);

          setPersonalEmailUserLocalState(e.target.value);
        }}
        personalCellphoneFormData={
          (personalCellphoneUserState &&
            personalCellphoneUserState.toString()) ||
          undefined
        }
        onChangePersonalCellphoneFormData={(e) => {
          setHasChanges(true);

          setPersonalCellphoneUserLocalState(e.target.value);
        }}
        corporateCellphoneFormData={
          (corporateCellphoneUserState &&
            corporateCellphoneUserState.toString()) ||
          undefined
        }
        onChangeCorporateCellphoneFormData={(e) => {
          setHasChanges(true);

          setCorporateCellphoneUserLocalState(e.target.value);
        }}
        positionFormData={positionUserState}
        roleUserFormData={roleUserState}
        onChangeRoleUserFormData={(selectedRoles) => {
          setHasChanges(true);

          setRoleUserLocalState(selectedRoles);
        }}
        permissionUserFormData={permissionUserState}
        onChangePermissionUserFormData={(selectedRoles) => {
          setHasChanges(true);

          setPermissionUserLocalState(selectedRoles);
        }}
        allRolesFormData={allRolesData}
        loadingAllRolesFormData={allRolesLoading}
        fetchingAllRolesFormData={allRolesFetching}
        allPermissionsFormData={allPermissionsData}
        loadingAllPermissionFormData={allPermissionsLoading}
        fetchingAllPermissionFormData={allPermissionsFetching}
        handleConfirmEditAdminFormData={handleConfirmUpdatePersonalData}
        initialValuesEditAdminFormData={{
          "edit-user-principal-email": principalEmailUserState || NOT_REGISTER,
          "edit-user-corporate-email": corporateEmailUserState,
          "edit-user-personal-email": personalEmailUserState || NOT_REGISTER,
          "edit-user-personal-cellphone": personalCellphoneUserState,
          "edit-user-corporate-cellphone": corporateCellphoneUserState,
          "edit-user-position": positionUserState || NOT_REGISTER,
          "edit-user-role": roleUserState,
          "edit-user-permission": permissionUserState,
        }}
        isSubmittingEditUserData={isSubmittingUpdatePersonal}
        hasChangesFormData={hasChanges}
        handleButtonClickFormData={handleButtonClick}
      />
    </>
  );
};

export default EditUserForm;
