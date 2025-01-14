"use client";

import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";

import CustomMessage from "@/components/common/custom_messages/CustomMessage";
import {
  useGetAllUsersWithProfileQuery,
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
  setRoleSelectedUser,
  setPermissionIdsToAddSelectedUser,
  setRoleIdsToAddSelectedUser,
  setPermissionSelectedUser,
  setHasChangesSelectedUser,
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

  const roleSelectedUserState = useAppSelector(
    (state) => state.selectedUser.role
  );
  const permissionSelectedUserState = useAppSelector(
    (state) => state.selectedUser.permission
  );

  const selectedRoleIdsToAddUserState = useAppSelector(
    (state) => state.selectedUser.selectedRoleIdsToAdd
  );
  const selectedPermissionIdsToAddUserState = useAppSelector(
    (state) => state.selectedUser.selectedPermissionIdsToAdd
  );

  const positionUserState = useAppSelector(
    (state) => state.selectedUser.collaborator_position
  );
  const hasChangesState = useAppSelector(
    (state) => state.selectedUser.hasChanges
  );
  const userErrorsState = useAppSelector((state) => state.selectedUser.errors);

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
    refetch: refectAllRoles,
  } = useGetAllRolesQuery(null);

  const {
    data: allPermissionsData,
    isLoading: allPermissionsLoading,
    isFetching: allPermissionsFetching,
    error: allPermissionsError,
    refetch: refetchAllPermissions,
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

  const userRoles = userData?.role;
  const userPermissions = userData?.permission;

  const rolesIds = userRoles?.map((role) => role.id);
  const permissionIds = userPermissions?.map((permission) => permission.id);

  useEffect(() => {
    if (userData && !idUserState && !userLoading && !userFetching) {
      dispatch(setIdSelectedUser(userData.id));
    }
    if (roleSelectedUserState || permissionSelectedUserState) {
      dispatch(setRoleIdsToAddSelectedUser(rolesIds));
      dispatch(setPermissionIdsToAddSelectedUser(permissionIds));
    }
  }, [
    userData,
    idUserState,
    roleSelectedUserState,
    permissionSelectedUserState,
  ]);

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
          roleIdsToAdd: selectedRoleIdsToAddUserState,
          permissionIdsToAdd: selectedPermissionIdsToAddUserState,
        },
      });
      let editUserDataError = response.error;

      let editUserDataStatus = response.data?.statusCode;

      let editUserDataValidationData = response.data?.message;

      if (editUserDataError || editUserDataStatus !== 202) {
        dispatch(setHasChangesSelectedUser(false));

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
        dispatch(setHasChangesSelectedUser(false));
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
    refetchAllPermissions();

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
          dispatch(setHasChangesSelectedUser(true));

          setPrincipalEmailUserLocalState(e.target.value);
        }}
        corporateEmailUserFormData={corporateEmailUserState || NOT_REGISTER}
        onChangeCorporateEmailUserFormData={(e) => {
          dispatch(setHasChangesSelectedUser(true));

          setCorporateEmailUserLocalState(e.target.value);
        }}
        personalEmailUserFormData={personalEmailUserState || NOT_REGISTER}
        onChangePersonalEmailUserFormData={(e) => {
          dispatch(setHasChangesSelectedUser(true));

          setPersonalEmailUserLocalState(e.target.value);
        }}
        personalCellphoneFormData={
          (personalCellphoneUserState &&
            personalCellphoneUserState.toString()) ||
          undefined
        }
        onChangePersonalCellphoneFormData={(e) => {
          dispatch(setHasChangesSelectedUser(true));

          setPersonalCellphoneUserLocalState(e.target.value);
        }}
        corporateCellphoneFormData={
          (corporateCellphoneUserState &&
            corporateCellphoneUserState.toString()) ||
          undefined
        }
        onChangeCorporateCellphoneFormData={(e) => {
          dispatch(setHasChangesSelectedUser(true));

          setCorporateCellphoneUserLocalState(e.target.value);
        }}
        positionFormData={positionUserState}
        allRolesFormData={allRolesData}
        roleUserFormData={selectedRoleIdsToAddUserState || []}
        onChangeRoleUserFormData={(checkedValues) => {
          dispatch(setHasChangesSelectedUser(true));

          dispatch(setRoleIdsToAddSelectedUser(checkedValues));
        }}
        allPermissionsFormData={allPermissionsData}
        permissionUserFormData={selectedPermissionIdsToAddUserState || []}
        onChangePermissionUserFormData={(checkedValues) => {
          dispatch(setHasChangesSelectedUser(true));

          dispatch(setPermissionIdsToAddSelectedUser(checkedValues));
        }}
        loadingAllRolesFormData={allRolesLoading}
        fetchingAllRolesFormData={allRolesFetching}
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
        }}
        isSubmittingEditUserData={isSubmittingUpdatePersonal}
        hasChangesFormData={hasChangesState}
        handleButtonClickFormData={handleButtonClick}
      />
    </>
  );
};

export default EditUserForm;
