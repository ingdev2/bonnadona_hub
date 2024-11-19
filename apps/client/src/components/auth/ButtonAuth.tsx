"use client";

import { useState } from "react";
import { useAppSelector } from "@/redux/hooks";
import { signIn, signOut, useSession } from "next-auth/react";

import { Button } from "antd";
import { subtitleStyleCss } from "@/theme/text_styles";

import CustomSpin from "@/components/common/custom_spin/CustomSpin";
import CustomMessage from "@/components/common/custom_messages/CustomMessage";

const ButtonAuth = () => {
  const { data: session, status } = useSession();

  const principalEmailUserState = useAppSelector(
    (state) => state.user.principal_email
  );

  const [showErrorMessage, setShowErrorMessage] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  if (status === "loading") {
    return <CustomSpin />;
  }

  if (session && status === "authenticated") {
    return (
      <div className="content-authenticate">
        {showErrorMessage && (
          <CustomMessage
            typeMessage="error"
            message={errorMessage || "¡Error en la petición!"}
          />
        )}
        <div style={{ textAlign: "center" }}>
          <h4
            style={{
              ...subtitleStyleCss,
            }}
          >
            Ingresaste con el correo electrónico:
          </h4>
          <h5
            style={{
              fontWeight: "bold",
              fontSize: 15,
              color: "#137A2B",
              lineHeight: 1.7,
              letterSpacing: 1.3,
              marginBlock: 13,
            }}
          >
            {principalEmailUserState}
          </h5>
          <Button
            type="primary"
            onClick={() => signOut()}
            className="button-signout"
            style={{
              fontWeight: "bold",
              paddingInline: 31,
              borderRadius: 31,
              backgroundColor: "#8C1111",
              color: "#f2f2f2",
              marginBlock: "7px",
            }}
          >
            Cerrar sesión
          </Button>
        </div>
      </div>
    );
  }

  return (
    <Button
      onClick={() => signIn()}
      className="button-signin"
      type="primary"
      style={{
        marginTop: "16px",
        borderRadius: "30px",
        backgroundColor: "#015E90",
      }}
    >
      Ingresar
    </Button>
  );
};

export default ButtonAuth;
