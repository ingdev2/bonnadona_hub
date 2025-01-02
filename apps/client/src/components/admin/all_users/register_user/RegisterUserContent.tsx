"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

import CustomDashboardLayoutAdmins from "@/components/common/custom_dashboard_layout_admins/CustomDashboardLayoutAdmins";
import CustomSpin from "@/components/common/custom_spin/CustomSpin";
import CustomButton from "@/components/common/custom_button/CustomButton";
import { IoMdArrowRoundBack } from "react-icons/io";
import UserRegistrationForm from "./register_user_form/UserRegistrationForm";

const RegisterUserContent: React.FC = () => {
  const router = useRouter();

  const [isSubmittingBackPage, setIsSubmittingBackPage] = useState(false);

  return (
    <CustomDashboardLayoutAdmins
      customLayoutContent={
        <div
          style={{ width: "100%", display: "flex", flexFlow: "column wrap" }}
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
              <CustomButton
                typeCustomButton="link"
                sizeCustomButton="large"
                iconCustomButton={<IoMdArrowRoundBack size={17} />}
                styleCustomButton={{
                  color: "#015E90",
                  fontWeight: "bold",
                  display: "flex",
                  flexFlow: "row wrap",
                  alignContent: "center",
                  alignItems: "center",
                  paddingInline: "7px",
                }}
                htmlTypeCustomButton="button"
                classNameCustomButton="user-register-back-button"
                onClickCustomButton={async () => {
                  try {
                    setIsSubmittingBackPage(true);

                    await router.back();
                  } catch (error) {
                    console.error(error);
                  } finally {
                    setIsSubmittingBackPage(false);
                  }
                }}
                titleCustomButton="Volver atrás"
              />
            </div>
          )}

          <UserRegistrationForm />
        </div>
      }
    />
  );
};

export default RegisterUserContent;
