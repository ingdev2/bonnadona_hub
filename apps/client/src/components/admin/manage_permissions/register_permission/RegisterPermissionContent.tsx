"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

import { Button } from "antd";
import CustomDashboardLayoutAdmins from "@/components/common/custom_dashboard_layout_admins/CustomDashboardLayoutAdmins";
import PermissionRegistrationForm from "./register_permission_forms/PermissionRegistrationForm";
import CustomSpin from "@/components/common/custom_spin/CustomSpin";
import { IoMdArrowRoundBack } from "react-icons/io";

const RegisterPermissionContent: React.FC = () => {
  const router = useRouter();

  const [isSubmittingBackPage, setIsSubmittingBackPage] = useState(false);

  return (
    <CustomDashboardLayoutAdmins
      customLayoutContent={
        <div
          style={{
            width: "100%",
            display: "flex",
            flexFlow: "column wrap",
          }}
        >
          {isSubmittingBackPage ? (
            <CustomSpin />
          ) : (
            <div
              style={{
                display: "flex",
                flexFlow: "column wrap",
                justifyContent: "center",
                alignContent: "flex-start",
                alignItems: "center",
                marginBlock: "7px",
                marginInline: "31px",
              }}
            >
              <Button
                type="link"
                size="middle"
                icon={<IoMdArrowRoundBack size={17} />}
                style={{
                  color: "#015E90",
                  fontWeight: "bold",
                  display: "flex",
                  flexFlow: "row wrap",
                  alignContent: "center",
                  alignItems: "center",
                  paddingInline: "7px",
                }}
                htmlType="button"
                className="permission-register-back-button"
                onClick={async () => {
                  try {
                    setIsSubmittingBackPage(true);

                    await router.back();
                  } catch (error) {
                    console.error(error);
                  } finally {
                    setIsSubmittingBackPage(false);
                  }
                }}
              >
                Volver atrás
              </Button>
            </div>
          )}

          <PermissionRegistrationForm />
        </div>
      }
    />
  );
};

export default RegisterPermissionContent;
