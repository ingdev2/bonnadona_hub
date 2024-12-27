import { useEffect, useState } from "react";
import { useAppSelector } from "@/redux/hooks";
import { useSession } from "next-auth/react";

import { useGetUserPermissionsQuery } from "@/redux/apis/users/userApi";

import { ModuleActionsEnum } from "../../utils/enums/permissions/module_actions/module_actions.enum";

interface PermissionValidationParams {
  allowedActions?: ModuleActionsEnum[];
}

export const PermissionsActionsValidation = ({
  allowedActions = [],
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
      const hasActionPermission =
        allowedActions.length > 0
          ? userPermissionsData.some((permission) =>
              permission.module_actions.some((action: IModuleAction) =>
                allowedActions.includes(action.name as ModuleActionsEnum)
              )
            )
          : true;

      setHasPermission(hasActionPermission);
    }
  }, [status, allowedActions, userPermissionsData]);

  return hasPermission;
};
