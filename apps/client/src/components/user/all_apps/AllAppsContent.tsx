"use client";

import React, { useEffect, useMemo } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";

import { Col, Empty, Row } from "antd";
import styles from "./AllAppsContent.module.css";

import CustomDashboardLayoutCollaborators from "@/components/common/custom_dashboard_layout_collaborators/CustomDashboardLayoutCollaborators";
import UserHeaderLayout from "../header_layout_dashboard/UserHeaderLayout";
import CustomOptionWithImageCard from "@/components/common/custom_option_with_image_card/CustomOptionWithImageCard";
import ChangePasswordModal from "../../common/change_password_modal/ChangePasswordModal";
import CustomSpin from "@/components/common/custom_spin/CustomSpin";

import {
  setChangePasswordExpiryModalIsOpen,
  setFirstLoginModalIsOpen,
} from "@/redux/features/common/modal/modalSlice";
import {
  setIdUser,
  setNameUser,
  setLastNameUser,
  setGenderUser,
  setGenderAbbrevUser,
  setIdTypeUser,
  setIdTypeAbbrevUser,
  setCollaboratorInmediateBossUser,
  setCollaboratorPositionUser,
  setCollaboratorServiceUser,
  setCorporateCellphoneUser,
  setCorporateEmailUser,
  setPersonalCellphoneUser,
  setPersonalEmailUser,
  setPrincipalEmailUser,
} from "@/redux/features/user/userSlice";
import {
  setIdUserProfile,
  setAffiliationEpsUserProfile,
  setBloodGroupAbbrevUserProfile,
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

import {
  useGetUserActiveByIdNumberQuery,
  useGetUserActiveProfileByIdQuery,
  useGetUserPermissionsQuery,
  useGetUserSessionLogByEmailQuery,
} from "@/redux/apis/users/userApi";
import { useGetPasswordPolicyQuery } from "@/redux/apis/password_policy/passwordPolicyApi";

import { checkPasswordExpiry } from "@/helpers/check_password_expiry/CheckPasswordExpiry";
import { useUserLoginToAppMutation } from "@/redux/apis/auth/loginUsersApi";

const AllAppsContent: React.FC = () => {
  const dispatch = useAppDispatch();

  const idNumberUserState = useAppSelector((state) => state.user.id_number);
  const principalEmailCollaboratorState = useAppSelector(
    (state) => state.user.principal_email
  );
  const lastPasswordUpdateCollaboratorState = useAppSelector(
    (state) => state.user.last_password_update
  );

  const modalIsOpenFirstSuccessfullCollaboratorLogin = useAppSelector(
    (state) => state.modal.firstSuccessLoginModalIsOpen
  );

  const modalIsOpenChangePasswordExpiry = useAppSelector(
    (state) => state.modal.changePasswordExpiryModalIsOpen
  );

  const [
    userLoginToApp,
    {
      data: isUserLoginToAppData,
      isLoading: isUserLoginToAppLoading,
      isSuccess: isUserLoginToAppSuccess,
      isError: isUserLoginToAppError,
    },
  ] = useUserLoginToAppMutation({
    fixedCacheKey: "userLoginToAppData",
  });

  const {
    data: userActiveDatabyIdNumberData,
    isLoading: userActiveDatabyIdNumberLoading,
    isFetching: userActiveDatabyIdNumberFetching,
    isError: userActiveDatabyIdNumberError,
  } = useGetUserActiveByIdNumberQuery(idNumberUserState, {
    skip: !idNumberUserState,
  });

  const {
    data: userActiveProfileByIdData,
    isLoading: userActiveProfileByIdLoading,
    isFetching: userActiveProfileByIdFetching,
    error: userActiveProfileByIdError,
  } = useGetUserActiveProfileByIdQuery(userActiveDatabyIdNumberData?.id!, {
    skip: !userActiveDatabyIdNumberData?.id,
  });

  const {
    data: userPermissionsData,
    isLoading: userPermissionsLoading,
    isFetching: userPermissionsFetching,
    isError: userPermissionsError,
  } = useGetUserPermissionsQuery(idNumberUserState, {
    skip: !idNumberUserState,
  });

  const {
    data: userSessionLogData,
    isLoading: userSessionLogLoading,
    isFetching: userSessionLogFetching,
    error: userSessionLogError,
  } = useGetUserSessionLogByEmailQuery(principalEmailCollaboratorState, {
    skip: !principalEmailCollaboratorState,
  });

  const {
    data: passwordPolicyData,
    isLoading: passwordPolicyLoading,
    isFetching: passwordPolicyFetching,
    error: passwordPolicyError,
  } = useGetPasswordPolicyQuery(null);

  useEffect(() => {
    if (
      userSessionLogData &&
      userActiveDatabyIdNumberData &&
      Number(userSessionLogData.successful_login_counter) === 1 &&
      userActiveDatabyIdNumberData.last_password_update === null
    ) {
      dispatch(setFirstLoginModalIsOpen(true));
    } else {
      dispatch(setFirstLoginModalIsOpen(false));
    }

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
      userActiveDatabyIdNumberData &&
      !userActiveDatabyIdNumberLoading &&
      !userActiveDatabyIdNumberFetching
    ) {
      dispatch(setIdUser(userActiveDatabyIdNumberData?.id));
      dispatch(setNameUser(userActiveDatabyIdNumberData?.name));
      dispatch(setLastNameUser(userActiveDatabyIdNumberData?.last_name));
      dispatch(setIdTypeUser(userActiveDatabyIdNumberData?.user_id_type));
      dispatch(setGenderUser(userActiveDatabyIdNumberData?.user_gender));
      dispatch(
        setCollaboratorPositionUser(
          userActiveDatabyIdNumberData?.collaborator_position
        )
      );
      dispatch(
        setCollaboratorServiceUser(
          userActiveDatabyIdNumberData?.collaborator_service
        )
      );
      dispatch(
        setPrincipalEmailUser(userActiveDatabyIdNumberData?.principal_email)
      );
      dispatch(
        setPersonalEmailUser(userActiveDatabyIdNumberData?.personal_email)
      );
      dispatch(
        setPersonalCellphoneUser(
          userActiveDatabyIdNumberData?.personal_cellphone
        )
      );
      dispatch(
        setCorporateEmailUser(userActiveDatabyIdNumberData?.corporate_email)
      );
      dispatch(
        setCorporateCellphoneUser(
          userActiveDatabyIdNumberData?.corporate_cellphone
        )
      );
      dispatch(
        setCollaboratorInmediateBossUser(
          userActiveDatabyIdNumberData?.collaborator_immediate_boss
        )
      );
    }

    if (
      userActiveProfileByIdData &&
      !userActiveProfileByIdLoading &&
      !userActiveProfileByIdFetching
    ) {
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
  }, [
    userSessionLogData,
    passwordPolicyData,
    lastPasswordUpdateCollaboratorState,
    userActiveDatabyIdNumberData,
    userActiveProfileByIdData,
  ]);

  const handleAppClick = async (appName: string) => {
    try {
      await userLoginToApp({
        userIdNumber: idNumberUserState,
        appName,
      }).unwrap();
    } catch (error) {
      console.error(error);
    }
  };

  const filteredApplications = useMemo(() => {
    if (!userPermissionsData) return [];

    return userPermissionsData
      .flatMap((data: IPermissions) => data.applications || [])
      .filter(
        (app: IApplication, index: number, self: IApplication[]) =>
          (app.is_active ?? true) &&
          self.findIndex((a) => a.id === app.id) === index
      );
  }, [userPermissionsData]);

  return (
    <>
      <div className="collaborator-modal-firts-successfull-login">
        {modalIsOpenFirstSuccessfullCollaboratorLogin && (
          <ChangePasswordModal
            titleModal={"Bienvenidos a Bonnadona Hub"}
            subtitleModal={
              "Debes actualizar tu contraseña si entras por primera vez:"
            }
          />
        )}
      </div>

      <div className="collaborator-modal-check-password-expiry">
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
            <>
              {userPermissionsFetching || userPermissionsLoading ? (
                <CustomSpin />
              ) : filteredApplications.length > 0 ? (
                <div style={{ width: "100%" }}>
                  <Row gutter={[0, 24]} justify="center" align="middle">
                    {filteredApplications.map(
                      (application: IApplication, index: number) => (
                        <Col
                          key={application.id}
                          xs={12}
                          sm={8}
                          md={6}
                          lg={4}
                          style={{
                            display: "flex",
                            justifyContent: "center",
                            paddingBlock: "22px",
                            margin: "0px",
                          }}
                        >
                          <CustomOptionWithImageCard
                            altCustomOptionWithImageCard={application.name}
                            srcCustomOptionWithImageCard={
                              application.image_path
                            }
                            classNameCardCustomOptionWithImageCard={styles.card}
                            styleImgCustomOptionWithImageCard={{
                              width: "72px",
                              objectFit: "contain",
                            }}
                            entryLinkUrlCustomOptionWithImageCard={
                              application.entry_link
                            }
                            onClickCustomOptionWithImageCard={() =>
                              handleAppClick(application.name)
                            }
                          />
                        </Col>
                      )
                    )}
                  </Row>
                </div>
              ) : (
                <Col
                  span={24}
                  style={{ display: "flex", justifyContent: "center" }}
                >
                  <Empty description={"No hay aplicaciones para mostrar"} />
                </Col>
              )}
            </>
          }
        />
      </div>
    </>
  );
};

export default AllAppsContent;
