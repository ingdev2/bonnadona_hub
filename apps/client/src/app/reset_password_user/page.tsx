"use client";

import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { useSearchParams } from "next/navigation";

import { setPasswordResetToken } from "@/redux/features/common/modal/modalSlice";

import ResetPasswordFormUser from "@/components/reset_password/ResetPasswordFormUser";

const ResetPasswordUserPage = () => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        height: "100vh",
        alignContent: "center",
        alignItems: "center",
      }}
    >
      <div
        className="background-page"
        style={{
          position: "fixed",
          width: "100%",
          height: "100%",
          backgroundImage: "url('/background/back-soft-blue-lines-wave.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          opacity: 0.4,
        }}
      />
      <div
        className="content-page"
        style={{
          display: "flex",
          flexFlow: "column wrap",
          justifyContent: "center",
          alignContent: "center",
          alignItems: "center",
          zIndex: 1,
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            paddingBlock: "22px",
          }}
        >
          <img
            src="/logos/logo_vertical.png"
            alt="Logo de Bonnadona HUB"
            style={{ height: 88 }}
          />
        </div>

        <div>
          <ResetPasswordFormUser />
        </div>
      </div>
    </div>
  );
};

export default ResetPasswordUserPage;
