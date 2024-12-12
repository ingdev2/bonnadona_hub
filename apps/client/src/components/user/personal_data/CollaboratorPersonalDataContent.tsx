"use client";

import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { useRouter } from "next/navigation";

import { Button } from "antd";
import CustomDashboardLayoutCollaborators from "@/components/common/custom_dashboard_layout_collaborators/CustomDashboardLayoutCollaborators";
import UserHeaderLayout from "../header_layout_dashboard/UserHeaderLayout";
import CollaboratorPersonalDataForm from "./collaborator_personal_data_forms/CollaboratorPersonalDataForm";
import ChangePasswordModal from "@/components/common/change_password_modal/ChangePasswordModal";
import CustomSpin from "@/components/common/custom_spin/CustomSpin";
import { IoMdArrowRoundBack } from "react-icons/io";

import {
  useGetUserActiveByIdNumberQuery,
  useGetUserActiveProfileByIdQuery,
} from "@/redux/apis/users/userApi";
import { useGetAllIdTypesQuery } from "@/redux/apis/id_types/idTypesApi";
import { useGetAllGenderTypesQuery } from "@/redux/apis/gender_types/genderTypesApi";
import { useGetAllBloodGroupsQuery } from "@/redux/apis/blood_group/bloodGroupApi";
import { useGetPasswordPolicyQuery } from "@/redux/apis/password_policy/passwordPolicyApi";

import { setChangePasswordExpiryModalIsOpen } from "@/redux/features/common/modal/modalSlice";
import {
  setCollaboratorInmediateBossUser,
  setCollaboratorPositionUser,
  setCollaboratorServiceUser,
  setCorporateCellphoneUser,
  setCorporateEmailUser,
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
import {
  setAffiliationEpsUserProfile,
  setBloodGroupAbbrevUserProfile,
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

import { transformIdToNameMap } from "@/helpers/transform_id_to_name/transform_id_to_name";
import { checkPasswordExpiry } from "@/helpers/check_password_expiry/CheckPasswordExpiry";

const CollaboratorPersonalDataContent = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();

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

  const corporateEmailUserState = useAppSelector(
    (state) => state.user.corporate_email
  );

  const personalCellphoneUserState = useAppSelector(
    (state) => state.user.personal_cellphone
  );

  const corporateCellphoneUserState = useAppSelector(
    (state) => state.user.corporate_cellphone
  );

  const bloodGroupNameUserProfileState = useAppSelector(
    (state) => state.userProfile.user_blood_group
  );

  const [isSubmittingBackPage, setIsSubmittingBackPage] = useState(false);

  const {
    data: userActiveByIdNumberData,
    isLoading: userActiveByIdNumberLoading,
    isFetching: userActiveByIdNumberFetching,
    error: userActiveByIdNumberError,
  } = useGetUserActiveByIdNumberQuery(idNumberUserState);

  const {
    data: userActiveProfileByIdData,
    isLoading: userActiveProfileByIdLoading,
    isFetching: userActiveProfileByIdFetching,
    error: userActiveProfileByIdError,
  } = useGetUserActiveProfileByIdQuery(userActiveByIdNumberData?.id!, {
    skip: !userActiveByIdNumberData?.id,
  });

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
    data: allBloodGroupsData,
    isLoading: allBloodGroupsLoading,
    isFetching: allBloodGroupsFetching,
    error: allBloodGroupsError,
    refetch: allBloodGroupsTypes,
  } = useGetAllBloodGroupsQuery(null);

  const {
    data: passwordPolicyData,
    isLoading: passwordPolicyLoading,
    isFetching: passwordPolicyFetching,
    error: passwordPolicyError,
  } = useGetPasswordPolicyQuery(null);

  const idTypeGetName = transformIdToNameMap(allIdTypesData);
  const genderTypeGetName = transformIdToNameMap(allGenderTypesData);
  const bloodGroupGetName = transformIdToNameMap(allBloodGroupsData);

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
      !corporateCellphoneUserState ||
      !corporateEmailUserState ||
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
      dispatch(
        setCorporateEmailUser(userActiveByIdNumberData?.corporate_email)
      );
      dispatch(
        setCorporateCellphoneUser(userActiveByIdNumberData?.corporate_cellphone)
      );
      dispatch(
        setCollaboratorInmediateBossUser(
          userActiveByIdNumberData?.collaborator_immediate_boss
        )
      );
    }

    if (userActiveProfileByIdData) {
      dispatch(setIdUserProfile(userActiveProfileByIdData.id));
      dispatch(
        setBloodGroupUserProfile(userActiveProfileByIdData.user_blood_group)
      );
      dispatch(
        setAffiliationEpsUserProfile(userActiveProfileByIdData.affiliation_eps)
      );
      dispatch(
        setResidenceDepartmentUserProfile(
          userActiveProfileByIdData.residence_department
        )
      );
      dispatch(
        setResidenceCityUserProfile(userActiveProfileByIdData.residence_city)
      );
      dispatch(
        setResidenceAddressUserProfile(
          userActiveProfileByIdData.residence_address
        )
      );
      dispatch(
        setResidenceNeighborhoodUserProfile(
          userActiveProfileByIdData.residence_neighborhood
        )
      );
      dispatch(setUserHeightUserProfile(userActiveProfileByIdData.user_height));
      dispatch(setUserWeightUserProfile(userActiveProfileByIdData.user_weight));
      dispatch(
        setUserShirtSizeUserProfile(userActiveProfileByIdData.user_shirt_size)
      );
      dispatch(
        setUserPantsSizeUserProfile(userActiveProfileByIdData.user_pants_size)
      );
      dispatch(
        setUserShoeSizeUserProfile(userActiveProfileByIdData.user_shoe_size)
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

    if (bloodGroupNameUserProfileState && allBloodGroupsData) {
      const bloodGroupName = bloodGroupGetName[bloodGroupNameUserProfileState];

      dispatch(setBloodGroupAbbrevUserProfile(bloodGroupName));
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
    corporateCellphoneUserState,
    corporateEmailUserState,
    userActiveByIdNumberData,
    userActiveByIdNumberLoading,
    userActiveByIdNumberFetching,
    bloodGroupNameUserProfileState,
    allIdTypesData,
    allGenderTypesData,
    allBloodGroupsData,
    userActiveProfileByIdData,
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

      <div className="custom-dashboard-layout-users">
        <CustomDashboardLayoutCollaborators
          customLayoutHeader={<UserHeaderLayout />}
          customLayoutContent={
            <div
              style={{
                width: "100%",
                display: "flex",
                flexFlow: "column wrap",
                alignContent: "center",
                justifyContent: "center",
              }}
            >
              {!userActiveProfileByIdData &&
              userActiveProfileByIdLoading &&
              userActiveProfileByIdFetching ? (
                <CustomSpin />
              ) : (
                <>
                  {isSubmittingBackPage ? (
                    <CustomSpin />
                  ) : (
                    <div
                      style={{
                        display: "flex",
                        flexFlow: "column wrap",
                        justifyContent: "center",
                        alignContent: "flex-start",
                        alignItems: "center",
                        marginBlock: "7px",
                      }}
                    >
                      <Button
                        type="link"
                        size="large"
                        icon={<IoMdArrowRoundBack size={17} />}
                        style={{
                          color: "#015E90",
                          fontWeight: "bold",
                          display: "flex",
                          flexFlow: "row wrap",
                          alignContent: "center",
                          alignItems: "center",
                          paddingInline: "7px",
                        }}
                        htmlType="button"
                        className="reason-for-rejection-register-back-button"
                        onClick={async () => {
                          try {
                            setIsSubmittingBackPage(true);

                            await router.back();
                          } catch (error) {
                            console.error(error);
                          } finally {
                            setIsSubmittingBackPage(false);
                          }
                        }}
                      >
                        Volver atrás
                      </Button>
                    </div>
                  )}

                  <div
                    style={{
                      display: "flex",
                      flexFlow: "column wrap",
                      width: "88%",
                    }}
                  >
                    <CollaboratorPersonalDataForm />
                  </div>
                </>
              )}
            </div>
          }
        />
      </div>
    </>
  );
};

export default CollaboratorPersonalDataContent;
