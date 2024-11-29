import { useSession } from "next-auth/react";
import { useEffect } from "react";
import { notFound } from "next/navigation";
import { AllowedRoleType } from "../types/allowed_role_type";

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

      const hasAllowedRole = allowedRoles.some((allowedRole) =>
        userRoles.includes(allowedRole as AllowedRoleType)
      );

      if (!hasAllowedRole) {
        notFound();
      }
    }
  }, [session, status, allowedRoles]);
};
