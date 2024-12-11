"use client";

import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";

import CustomDashboardLayoutAdmins from "@/components/common/custom_dashboard_layout_admins/CustomDashboardLayoutAdmins";

import { ItemKeys } from "@/components/common/custom_dashboard_layout_admins/enums/item_names_and_keys.enums";
import { transformIdToNameMap } from "@/helpers/transform_id_to_name/transform_id_to_name";

import { useGetAllGenderTypesQuery } from "@/redux/apis/gender_types/genderTypesApi";
import { useGetAllIdTypesQuery } from "@/redux/apis/id_types/idTypesApi";
import { useGetUserActiveByIdNumberQuery } from "@/redux/apis/users/userApi";

import {
  setChangePasswordExpiryModalIsOpen,
  setSelectedKey,
} from "@/redux/features/common/modal/modalSlice";
import {
  setCollaboratorPositionUser,
  setCollaboratorServiceUser,
  setGenderAbbrevUser,
  setGenderUser,
  setIdTypeAbbrevUser,
  setIdTypeUser,
  setLastNameUser,
  setNameUser,
  setPersonalCellphoneUser,
  setPersonalEmailUser,
  setPrincipalEmailUser,
} from "@/redux/features/user/userSlice";
import AdminPersonalDataForm from "./admin_personal_data_forms/AdminPersonalDataForm";
import { useGetPasswordPolicyQuery } from "@/redux/apis/password_policy/passwordPolicyApi";
import { checkPasswordExpiry } from "@/helpers/check_password_expiry/CheckPasswordExpiry";
import ChangePasswordModal from "@/components/common/change_password_modal/ChangePasswordModal";

const AdminPersonalDataContent: React.FC = () => {
  const dispatch = useAppDispatch();

  const lastPasswordUpdateCollaboratorState = useAppSelector(
    (state) => state.user.last_password_update
  );

  const modalIsOpenChangePasswordExpiry = useAppSelector(
    (state) => state.modal.changePasswordExpiryModalIsOpen
  );

  const idNumberUserState = useAppSelector((state) => state.user.id_number);

  const nameUserState = useAppSelector((state) => state.user.name);
  const lastNameUserState = useAppSelector((state) => state.user.last_name);
  const idTypeNumberUserState = useAppSelector(
    (state) => state.user.user_id_type
  );
  const genderNumberUserState = useAppSelector(
    (state) => state.user.user_gender
  );
  const collaboratorPositionUserState = useAppSelector(
    (state) => state.user.collaborator_position
  );

  const collaboratorServiceUserState = useAppSelector(
    (state) => state.user.collaborator_service
  );

  const personalEmailUserState = useAppSelector(
    (state) => state.user.personal_email
  );

  const principalEmailUserState = useAppSelector(
    (state) => state.user.principal_email
  );

  const personalCellphoneUserState = useAppSelector(
    (state) => state.user.personal_cellphone
  );

  const selectedKeyState = useAppSelector((state) => state.modal.selectedKey);

  const {
    data: userActiveByIdNumberData,
    isLoading: userActiveByIdNumberLoading,
    isFetching: userActiveByIdNumberFetching,
    error: userActiveByIdNumberError,
  } = useGetUserActiveByIdNumberQuery(idNumberUserState);

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
    data: passwordPolicyData,
    isLoading: passwordPolicyLoading,
    isFetching: passwordPolicyFetching,
    error: passwordPolicyError,
  } = useGetPasswordPolicyQuery(null);

  const idTypeGetName = transformIdToNameMap(allIdTypesData);
  const genderTypeGetName = transformIdToNameMap(allGenderTypesData);

  useEffect(() => {
    if (
      passwordPolicyData &&
      passwordPolicyData.password_expiry_days &&
      lastPasswordUpdateCollaboratorState &&
      checkPasswordExpiry(
        lastPasswordUpdateCollaboratorState,
        passwordPolicyData.password_expiry_days
      )
    ) {
      dispatch(setChangePasswordExpiryModalIsOpen(true));
    } else {
      dispatch(setChangePasswordExpiryModalIsOpen(false));
    }

    if (
      !nameUserState ||
      !lastNameUserState ||
      !idTypeNumberUserState ||
      !genderNumberUserState ||
      !collaboratorPositionUserState ||
      !collaboratorServiceUserState ||
      !personalEmailUserState ||
      !principalEmailUserState ||
      (!personalCellphoneUserState &&
        userActiveByIdNumberData &&
        !userActiveByIdNumberLoading &&
        !userActiveByIdNumberFetching)
    ) {
      dispatch(setNameUser(userActiveByIdNumberData?.name));
      dispatch(setLastNameUser(userActiveByIdNumberData?.last_name));
      dispatch(setIdTypeUser(userActiveByIdNumberData?.user_id_type));
      dispatch(setGenderUser(userActiveByIdNumberData?.user_gender));
      dispatch(
        setCollaboratorPositionUser(
          userActiveByIdNumberData?.collaborator_position
        )
      );
      dispatch(
        setCollaboratorServiceUser(
          userActiveByIdNumberData?.collaborator_service
        )
      );
      dispatch(
        setPrincipalEmailUser(userActiveByIdNumberData?.principal_email)
      );
      dispatch(setPersonalEmailUser(userActiveByIdNumberData?.personal_email));
      dispatch(
        setPersonalCellphoneUser(userActiveByIdNumberData?.personal_cellphone)
      );
    }

    if (idTypeNumberUserState && allIdTypesData) {
      const idTypeName = idTypeGetName[idTypeNumberUserState];

      dispatch(setIdTypeAbbrevUser(idTypeName));
    }

    if (genderNumberUserState && allGenderTypesData) {
      const genderName = genderTypeGetName[genderNumberUserState];

      dispatch(setGenderAbbrevUser(genderName));
    }

    if (selectedKeyState !== ItemKeys.SUB_UPDATE_PERSONAL_DATA_KEY) {
      dispatch(setSelectedKey(ItemKeys.SUB_UPDATE_PERSONAL_DATA_KEY));
    }
  }, [
    passwordPolicyData,
    lastPasswordUpdateCollaboratorState,
    nameUserState,
    lastNameUserState,
    idTypeNumberUserState,
    genderNumberUserState,
    collaboratorPositionUserState,
    collaboratorServiceUserState,
    personalEmailUserState,
    principalEmailUserState,
    userActiveByIdNumberData,
    userActiveByIdNumberLoading,
    userActiveByIdNumberFetching,
    allIdTypesData,
    allGenderTypesData,
  ]);
  return (
    <>
      <div className="modal-check-password-expiry">
        {modalIsOpenChangePasswordExpiry && (
          <ChangePasswordModal
            titleModal={"Tu contraseña se ha expirado"}
            subtitleModal={"Debes actualizar tu contraseña:"}
          />
        )}
      </div>

      <CustomDashboardLayoutAdmins
        customLayoutContent={
          <div
            style={{
              width: "80%",
              display: "flex",
              flexFlow: "column wrap",
            }}
          >
            <AdminPersonalDataForm />
          </div>
        }
      />
    </>
  );
};

export default AdminPersonalDataContent;
