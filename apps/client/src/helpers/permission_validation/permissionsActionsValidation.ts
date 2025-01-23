import { useEffect, useState, useMemo } from "react";
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

  const idNumberUserState = useAppSelector((state) => state.user.id_number);

  const [hasPermission, setHasPermission] = useState(false);

  const {
    data: userPermissionsData,
    isLoading: userPermissionsIsLoadingData,
    isFetching: userPermissionsIsFetchingData,
    error: userPermissionsIsErrorData,
  } = useGetUserPermissionsQuery(idNumberUserState, {
    skip: !idNumberUserState,
  });

  const permissionsValid = useMemo(() => {
    if (!userPermissionsData || allowedActions.length === 0) return true;

    return userPermissionsData.some((permission) =>
      permission.module_actions.some((action: IModuleAction) =>
        allowedActions.includes(action.name as ModuleActionsEnum)
      )
    );
  }, [userPermissionsData, allowedActions]);

  useEffect(() => {
    if (
      status === "authenticated" &&
      userPermissionsData &&
      !userPermissionsIsLoadingData &&
      !userPermissionsIsFetchingData
    ) {
      setHasPermission(permissionsValid);
    }
  }, [
    status,
    permissionsValid,
    userPermissionsData,
    userPermissionsIsLoadingData,
    userPermissionsIsFetchingData,
  ]);

  return hasPermission;
};
