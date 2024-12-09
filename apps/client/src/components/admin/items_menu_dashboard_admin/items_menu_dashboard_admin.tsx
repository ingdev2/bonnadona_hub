import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { useSession } from "next-auth/react";
import { PermissionsAppAndModuleValidationInComponent } from "@/helpers/permission_validation/permissionsAppAndModuleValidationInComponent";

import { MenuItem } from "@/helpers/get_item_menu_dashboard_layout/types/menu_item_type";
import { getItem } from "@/helpers/get_item_menu_dashboard_layout/get_item_menu_dashboard_layout";
import { FaUsers } from "react-icons/fa";
import { FaUsers as Fa6Users } from "react-icons/fa6";
import { MdLockPerson } from "react-icons/md";
import { SiAdblock } from "react-icons/si";
import { TbPasswordUser } from "react-icons/tb";
import { MdPassword } from "react-icons/md";
import { TbApps } from "react-icons/tb";
import { IoIosApps } from "react-icons/io";
import { CgProfile } from "react-icons/cg";
import { PiUserListBold } from "react-icons/pi";

import { setIdNumberUser } from "@/redux/features/user/userSlice";

import { useGetUserActiveByIdNumberQuery } from "@/redux/apis/users/userApi";

import {
  ItemKeys,
  ItemNames,
} from "@/components/common/custom_dashboard_layout_admins/enums/item_names_and_keys.enums";

import { ApplicationsEnum } from "@/utils/enums/permissions/applications/applications.enum";
import { ApplicationModulesEnum } from "@/utils/enums/permissions/application_modules/application_modules.enum";

export const useMenuItems = () => {
  const { data: session, status } = useSession();
  const dispatch = useAppDispatch();

  const idNumberUserSession = session?.user?.id_number;

  const allUsersModule = PermissionsAppAndModuleValidationInComponent({
    allowedApplications: [ApplicationsEnum.BONNA_HUB],
    allowedModules: [ApplicationModulesEnum.BONNA_HUB_ALL_USERS],
  });

  const permissionsModule = PermissionsAppAndModuleValidationInComponent({
    allowedApplications: [ApplicationsEnum.BONNA_HUB],
    allowedModules: [ApplicationModulesEnum.BONNA_HUB_MANAGE_PERMISSIONS],
  });

  const applicationsAndModulesModule =
    PermissionsAppAndModuleValidationInComponent({
      allowedApplications: [ApplicationsEnum.BONNA_HUB],
      allowedModules: [
        ApplicationModulesEnum.BONNA_HUB_APPLICATIONS_AND_MODULES,
      ],
    });

  const passwordPolicyModule = PermissionsAppAndModuleValidationInComponent({
    allowedApplications: [ApplicationsEnum.BONNA_HUB],
    allowedModules: [ApplicationModulesEnum.BONNA_HUB_MANAGE_PASSWORD_POLICY],
  });

  const idNumberUserSessionState = useAppSelector(
    (state) => state.user.id_number
  );

  const {
    data: userSessionData,
    isLoading: userSessionLoading,
    isFetching: userSessionFetching,
    error: userSessionError,
  } = useGetUserActiveByIdNumberQuery(idNumberUserSessionState);

  useEffect(() => {
    if (!idNumberUserSessionState) {
      dispatch(setIdNumberUser(idNumberUserSession));
    }
  }, [idNumberUserSessionState]);

  const waitAdminData =
    idNumberUserSession && idNumberUserSessionState && userSessionData;

  if (waitAdminData) {
    const items: MenuItem[] = [
      allUsersModule
        ? getItem(
            ItemNames.ITEM_USERS,
            ItemKeys.ITEM_USERS_KEY,
            <FaUsers size={17} />,
            [
              getItem(
                ItemNames.SUB_USERS,
                ItemKeys.SUB_USERS_KEY,
                <Fa6Users size={15} />
              ),
            ].filter(Boolean)
          )
        : null,

      permissionsModule
        ? getItem(
            ItemNames.ITEM_PERMISSIONS,
            ItemKeys.ITEM_PERMISSIONS_KEY,
            <MdLockPerson size={17} />,
            [
              getItem(
                ItemNames.SUB_MANAGE_PERMISSIONS,
                ItemKeys.SUB_MANAGE_PERMISSIONS_KEY,
                <SiAdblock size={15} />
              ),
            ].filter(Boolean)
          )
        : null,

      passwordPolicyModule
        ? getItem(
            ItemNames.ITEM_PASSWORD_POLICY,
            ItemKeys.ITEM_PASSWORD_POLICY_KEY,
            <TbPasswordUser size={17} />,
            [
              getItem(
                ItemNames.SUB_MANAGE_PASSWORD,
                ItemKeys.SUB_MANAGE_PASSWORD_POLICY_KEY,
                <MdPassword size={15} />
              ),
            ].filter(Boolean)
          )
        : null,

      applicationsAndModulesModule
        ? getItem(
            ItemNames.ITEM_APPLICATIONS_AND_MODULES,
            ItemKeys.ITEM_APPLICATIONS_AND_MODULES_KEY,
            <TbApps size={17} />,
            [
              getItem(
                ItemNames.SUB_APPLICATIONS,
                ItemKeys.SUB_APPLICATIONS_KEY,
                <IoIosApps size={15} />
              ),
            ].filter(Boolean)
          )
        : null,

      getItem(
        ItemNames.ITEM_MY_PROFILE,
        ItemKeys.ITEM_MY_PROFILE_KEY,
        <CgProfile size={17} />,
        [
          getItem(
            ItemNames.SUB_UPDATE_PERSONAL_DATA,
            ItemKeys.SUB_UPDATE_PERSONAL_DATA_KEY,
            <PiUserListBold size={15} />
          ),
        ].filter(Boolean)
      ),
    ];

    return items;
  }
};
