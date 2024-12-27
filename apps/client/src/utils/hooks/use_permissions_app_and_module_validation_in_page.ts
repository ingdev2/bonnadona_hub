import { useEffect } from "react";
import { useAppSelector } from "@/redux/hooks";
import { useSession } from "next-auth/react";
import { notFound } from "next/navigation";

import { useGetUserPermissionsQuery } from "@/redux/apis/users/userApi";

import { ApplicationsEnum } from "../enums/permissions/applications/applications.enum";
import { ApplicationModulesEnum } from "../enums/permissions/application_modules/application_modules.enum";

interface PermissionValidationParams {
  allowedApplications?: ApplicationsEnum[];
  allowedModules?: ApplicationModulesEnum[];
}

export const usePermissionsAppAndModuleValidationInPage = ({
  allowedApplications = [],
  allowedModules = [],
}: PermissionValidationParams) => {
  const { data: session, status } = useSession();

  const idNumberUserState = useAppSelector((state) => state.user.id_number);

  const {
    data: userPermissionsData,
    isLoading: userPermissionsLoading,
    isFetching: userPermissionsFetching,
    isError: userPermissionsError,
  } = useGetUserPermissionsQuery(idNumberUserState, {
    skip: !idNumberUserState,
  });

  useEffect(() => {
    if (status === "authenticated" && userPermissionsData) {
      const hasApplicationPermission =
        allowedApplications.length > 0
          ? userPermissionsData.some((permission) =>
              permission.applications.some((app: IApplication) =>
                allowedApplications.includes(app.name as ApplicationsEnum)
              )
            )
          : true;

      const hasModulePermission =
        allowedModules.length > 0
          ? userPermissionsData.some((permission) =>
              permission.application_modules.some(
                (module: IApplicationModule) =>
                  allowedModules.includes(module.name as ApplicationModulesEnum)
              )
            )
          : true;

      if (!hasApplicationPermission || !hasModulePermission) {
        notFound();
      }
    }
  }, [status, allowedApplications, allowedModules, userPermissionsData]);
};
