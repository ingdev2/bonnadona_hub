import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";

import { ModuleActionsEnum } from "../../utils/enums/permissions/module_actions/module_actions.enum";

interface PermissionValidationParams {
  allowedActions?: ModuleActionsEnum[];
}

export const PermissionsActionsValidation = ({
  allowedActions = [],
}: PermissionValidationParams) => {
  const { data: session, status } = useSession();
  const [hasPermission, setHasPermission] = useState(false);

  useEffect(() => {
    if (status === "authenticated" && session && session.user.permission) {
      const userPermissions = session.user.permission;

      const hasActionPermission =
        allowedActions.length > 0
          ? userPermissions.some((permission) =>
              permission.module_actions.some((action: IModuleAction) =>
                allowedActions.includes(action.name as ModuleActionsEnum)
              )
            )
          : true;

      setHasPermission(hasActionPermission);
    }
  }, [session, status, allowedActions]);

  return hasPermission;
};
