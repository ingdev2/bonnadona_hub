"use client";

import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";

import {
  useGetUserActiveByIdNumberQuery,
  useGetUserActiveProfileByIdQuery,
} from "@/redux/apis/users/userApi";
import { useGetAllIdTypesQuery } from "@/redux/apis/id_types/idTypesApi";
import { useGetAllGenderTypesQuery } from "@/redux/apis/gender_types/genderTypesApi";
import { transformIdToNameMap } from "@/helpers/transform_id_to_name/transform_id_to_name";
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
import CustomDashboardLayoutCollaborators from "@/components/common/custom_dashboard_layout_collaborators/CustomDashboardLayoutCollaborators";
import CollaboratorPersonalDataForm from "./collaborator_personal_data_forms/CollaboratorPersonalDataForm";
import {
  setAffiliationEpsUserProfile,
  setBloodGroupUserProfile,
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

const CollaboratorPersonalDataContent = () => {
  const dispatch = useAppDispatch();

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

  const idTypeGetName = transformIdToNameMap(allIdTypesData);
  const genderTypeGetName = transformIdToNameMap(allGenderTypesData);

  useEffect(() => {
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
      dispatch(
        setBloodGroupUserProfile(userActiveProfileByIdData?.user_blood_group)
      );
      dispatch(
        setAffiliationEpsUserProfile(userActiveProfileByIdData?.affiliation_eps)
      );
      dispatch(
        setResidenceDepartmentUserProfile(
          userActiveProfileByIdData?.residence_department
        )
      );
      dispatch(
        setResidenceCityUserProfile(userActiveProfileByIdData?.residence_city)
      );
      dispatch(
        setResidenceAddressUserProfile(
          userActiveProfileByIdData?.residence_address
        )
      );
      dispatch(
        setResidenceNeighborhoodUserProfile(
          userActiveProfileByIdData?.residence_neighborhood
        )
      );
      dispatch(
        setUserHeightUserProfile(userActiveProfileByIdData?.user_height)
      );
      dispatch(
        setUserWeightUserProfile(userActiveProfileByIdData?.user_weight)
      );
      dispatch(
        setUserShirtSizeUserProfile(userActiveProfileByIdData?.user_shirt_size)
      );
      dispatch(
        setUserPantsSizeUserProfile(userActiveProfileByIdData?.user_pants_size)
      );
      dispatch(
        setUserShoeSizeUserProfile(userActiveProfileByIdData?.user_shoe_size)
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
  }, [
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
    allIdTypesData,
    allGenderTypesData,
    userActiveProfileByIdData,
  ]);

  return (
    <div className="custom-dashboard-layout-users">
      <CustomDashboardLayoutCollaborators
        customLayoutContent={
          <>
            <div
              style={{
                width: "90%",
                display: "flex",
                flexFlow: "column wrap",
              }}
            >
              <CollaboratorPersonalDataForm />
            </div>
          </>
        }
      />
    </div>
  );
};

export default CollaboratorPersonalDataContent;
