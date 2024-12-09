import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";

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

      setHasPermission(hasApplicationPermission && hasModulePermission);
    }
  }, [session, status, allowedApplications, allowedModules]);

  return hasPermission;
};
