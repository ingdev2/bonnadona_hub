import { useEffect } from "react";
import { useSession } from "next-auth/react";
import { notFound } from "next/navigation";

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

  useEffect(() => {
    if (status === "authenticated" && session && session.user.permission) {
      const userPermissions = session.user.permission;

      const hasApplicationPermission =
        allowedApplications.length > 0
          ? userPermissions.some((permission) =>
              permission.applications.some((app: IApplication) =>
                allowedApplications.includes(app.name as ApplicationsEnum)
              )
            )
          : true;

      const hasModulePermission =
        allowedModules.length > 0
          ? userPermissions.some((permission) =>
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
  }, [session, status, allowedApplications, allowedModules]);
};
