import { useEffect } from "react";
import { useSession } from "next-auth/react";
import { notFound } from "next/navigation";
import { AllowedRoleType } from "../types/allowed_role_type";
import { RolesEnum } from "../enums/roles/roles.enum";

export const useRoleValidation = (allowedRoles: AllowedRoleType[]) => {
  const { data: session, status } = useSession();

  useEffect(() => {
    if (
      status === "authenticated" &&
      session &&
      Array.isArray(session.user.role)
    ) {
      const userRoles = session.user.role.map(
        (role: { name: string }) => role.name
      );

      const hasAllowedRole = userRoles.some((role: string) =>
        allowedRoles.includes(role as AllowedRoleType)
      );

      if (!hasAllowedRole) {
        notFound();
      }
    }
  }, [session, status, allowedRoles]);
};
