import { useEffect, useState } from "react";
import { useAppSelector } from "@/redux/hooks";
import { useSession } from "next-auth/react";

import { useGetUserPermissionsQuery } from "@/redux/apis/users/userApi";

import { ApplicationsEnum } from "../../utils/enums/permissions/applications/applications.enum";
import { ApplicationModulesEnum } from "../../utils/enums/permissions/application_modules/application_modules.enum";

interface PermissionValidationParams {
  allowedApplications?: ApplicationsEnum[];
  allowedModules?: ApplicationModulesEnum[];
}

export const PermissionsAppAndModuleValidationInComponent = ({
  allowedApplications = [],
  allowedModules = [],
}: PermissionValidationParams) => {
  const { data: session, status } = useSession();

  const [hasPermission, setHasPermission] = useState(false);

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

      setHasPermission(hasApplicationPermission && hasModulePermission);
    }
  }, [status, allowedApplications, allowedModules, userPermissionsData]);

  return hasPermission;
};
