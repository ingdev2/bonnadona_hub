"use client";

import React, { useState } from "react";

import { useRouter } from "next/navigation";

import { subtitleStyleCss, titleStyleCss } from "@/theme/text_styles";
import { Button, Col, Form, Input } from "antd";
import { MdOutlineEmail } from "react-icons/md";

import CustomResultOneButton from "@/components/common/custom_result_one_button/CustomResultOneButton";

import { maskEmail } from "@/helpers/mask_email/mask_email";

const UserForgotPasswordForm: React.FC<{
  setOpenModalForgotPassword: (value: React.SetStateAction<boolean>) => void;
}> = ({ setOpenModalForgotPassword }) => {
  const router = useRouter();

  const [linkToResetPasswordSent, setLinkToResetPasswordSent] = useState(false);
  const [isSubmittingGoToLogin, setIsSubmittingGoToLogin] = useState(false);

  const [corporateEmailUserLocalState, setCorporateEmailUserLocalState] =
    useState("");

  const [
    corporateEmailUserOfModalSuccessLocalState,
    setCorporateEmailUserOfModalSuccessLocalState,
  ] = useState("andressierra@gmail.com");

  const [isSubmittingForgotPassword, setIsSubmittingForgotPassword] =
    useState(false);

  const handleChangePassword = async (e: React.FormEvent<HTMLFormElement>) => {
    setLinkToResetPasswordSent(true);
  };

  const handleGoToLogin = async () => {
    try {
      setIsSubmittingGoToLogin(true);

      await new Promise((resolve) => setTimeout(resolve, 700));

      await router.replace("/login", {
        scroll: false,
      });

      setCorporateEmailUserOfModalSuccessLocalState("");

      setOpenModalForgotPassword(false);
    } catch (error) {
      console.error(error);
    } finally {
      setIsSubmittingGoToLogin(false);
    }
  };

  const handleButtonClick = () => {};

  return (
    <Col
      xs={24}
      sm={24}
      md={24}
      lg={24}
      style={{
        width: "100%",
        padding: "0 7px",
        margin: "0px",
      }}
    >
      {linkToResetPasswordSent && corporateEmailUserOfModalSuccessLocalState ? (
        <CustomResultOneButton
          key={"link-to-reset-password-sent-success-custom-result-user"}
          statusTypeResult={"success"}
          titleCustomResult="¡Link para restablecer contraseña enviado!"
          subtitleCustomResult={
            <p>
              Se ha enviado al correo{" "}
              <b>{maskEmail(corporateEmailUserOfModalSuccessLocalState)}</b> un
              link para restablecer su contraseña de ingreso.
            </p>
          }
          handleClickCustomResult={handleGoToLogin}
          isSubmittingButton={isSubmittingGoToLogin}
          textButtonCustomResult="Volver al login"
        />
      ) : (
        <Form
          id="forgot-password-form-user"
          name="forgot-password-form-user"
          className="forgot-password-form-user"
          onFinish={handleChangePassword}
          initialValues={{ remember: false }}
          autoComplete="false"
          layout="vertical"
        >
          <h2
            className="title-forgot-password-user"
            style={{
              ...titleStyleCss,
              marginBlock: 22,
              textAlign: "center",
            }}
          >
            Recuperación de contraseña
          </h2>
          <h4
            className="title-forgot-password-user"
            style={{
              ...subtitleStyleCss,
              marginBlock: 22,
              textAlign: "center",
            }}
          >
            Enviaremos un acceso para que recuperes tu contraseña, al correo
            corporativo registrado en tu usuario
          </h4>

          <Form.Item
            name="corporate-email-forgot-password-user"
            label="Correo electrónico corporativo:"
            style={{ marginBottom: "13px" }}
            normalize={(value) => {
              if (!value) return "";

              return value.toLowerCase().replace(/[^a-z0-9@._-]/g, "");
            }}
            rules={[
              {
                required: true,
                message:
                  "¡Por favor ingresa el correo electrónico corporativo!",
              },
              {
                type: "email",
                message: "¡Por favor ingresa un correo electrónico valido!",
              },
              {
                min: 10,
                message: "¡Por favor ingresa mínimo 10 caracteres!",
              },
              {
                max: 45,
                message: "¡Por favor ingresa máximo 45 caracteres!",
              },
            ]}
          >
            <Input
              prefix={<MdOutlineEmail className="site-form-item-icon" />}
              type="email"
              value={corporateEmailUserLocalState}
              placeholder="Correo electrónico"
              onChange={(e) => {
                setCorporateEmailUserLocalState(e.target.value.toLowerCase());
              }}
              autoComplete="off"
            />
          </Form.Item>
          <Form.Item
            style={{
              textAlign: "center",
            }}
          >
            <Button
              style={{
                paddingInline: 45,
                borderRadius: "30px",
                backgroundColor: "#0085c8",
                color: "#f2f2f2",
                marginTop: "13px",
              }}
              htmlType="submit"
              className="forgot-password-form-button-patient"
              onClick={handleButtonClick}
            >
              Enviar
            </Button>
          </Form.Item>
        </Form>
      )}
    </Col>
  );
};

export default UserForgotPasswordForm;
