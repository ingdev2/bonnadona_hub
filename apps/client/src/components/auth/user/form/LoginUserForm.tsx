"use client";

import React, { useState } from "react";

import {
  Form,
  Input,
  Button,
  Typography,
  Col,
  Carousel,
  Row,
  Image,
} from "antd";

import { UserOutlined } from "@ant-design/icons";
import { RiLockPasswordLine } from "react-icons/ri";

import TwoFactorAuthModal from "../modal/TwoFactorAuthModal";
import UserForgotPasswordForm from "./UserForgotPasswordForm";

import CustomMessage from "@/components/common/custom_messages/CustomMessage";
import CustomModalNoContent from "@/components/common/custom_modal_no_content/CustomModalNoContent";

import { titleStyleCss } from "@/theme/text_styles";

const { Title } = Typography;

const LoginUserForm = () => {
  const [emailLocalState, setEmailLocalState] = useState("");
  const [passwordLocalState, setPasswordLocalState] = useState("");

  const [isModalVerifyCodeVisible, setIsModalVerifyCodeVisible] =
    useState(false);
  const [modalForgotMyPasswordIsOpen, setModalForgotMyPasswordIsOpen] =
    useState(false);

  const [showWarningMessage, setShowWarningMessage] = useState(false);
  const [showErrorMessage, setShowErrorMessage] = useState(false);

  const [failedAttemptsCounterLocalState, setFailedAttemptsCounterLocalState] =
    useState(1);

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmailLocalState(event.target.value);
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPasswordLocalState(event.target.value);
  };

  const handleSubmit = () => {
    if (
      emailLocalState === "andres@gmail.com" &&
      passwordLocalState === "1234"
    ) {
      if (failedAttemptsCounterLocalState >= 5) {
        setShowWarningMessage(false);
        setShowErrorMessage(true);
        setIsModalVerifyCodeVisible(false);
      } else {
        setIsModalVerifyCodeVisible(true);
        setShowWarningMessage(false);
        setShowErrorMessage(false);
      }
    } else {
      var count = failedAttemptsCounterLocalState;
      setFailedAttemptsCounterLocalState((count += 1));
      console.log("failedAttemptsCounter", failedAttemptsCounterLocalState);

      if (failedAttemptsCounterLocalState === 3) {
        setShowWarningMessage(true);
      }

      if (failedAttemptsCounterLocalState >= 5) {
        setShowWarningMessage(false);
        setShowErrorMessage(true);
      }
    }
  };

  const handleModalVerifyCodeClose = () => {
    setIsModalVerifyCodeVisible(false);
    setShowWarningMessage(false);
  };

  const handleVerifyCode = (code: string) => {
    console.log("Código verificado:", code);
    setIsModalVerifyCodeVisible(false);
    setShowWarningMessage(false);
  };

  const imagesCarousel = [
    "/images_carousel/AUTH_2FA_2.png",
    "/images_carousel/AUTH_2FA.png",
    "/images_carousel/AUTH_2FA_3.png",
    "/images_carousel/AUTH_2FA_4.png",
    "/images_carousel/AUTH_2FA_5.png",
  ];

  return (
    <>
      {showWarningMessage && (
        <CustomMessage
          typeMessage="warning"
          message={"¡Error de autenticación. Le quedan algunos intentos más!"}
        />
      )}
      {showErrorMessage && (
        <CustomMessage
          typeMessage="error"
          message={
            "¡Esta cuenta se encuentra bloqueada, favor comunicarse con el departamento de sistemas!"
          }
        />
      )}

      <div
        style={{
          width: "100%",
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundImage: "url('/background/back-soft-blue-lines-wave.jpg')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        />
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(255, 255, 255, 0.4)",
          }}
        />
        <Row gutter={[22, 32]} style={{ width: "100%", maxWidth: "1000px" }}>
          <Col
            className="col-carousel"
            span={12}
            style={{
              backgroundColor: "#0085c8",
              borderRadius: "20px",
              boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.3)",
            }}
          >
            <div style={{ padding: "32px" }}>
              <Carousel autoplay arrows fade className="carousel-images-2FA">
                {imagesCarousel.map((image, index) => (
                  <div key={index}>
                    <img
                      src={image}
                      alt={`Imagen ${index + 1}`}
                      style={{
                        width: "100%",
                        height: "200%",
                        objectFit: "cover",
                      }}
                    />
                  </div>
                ))}
              </Carousel>
            </div>
          </Col>
          <Col span={12} className="col-login">
            <div
              style={{
                backgroundColor: "rgba(255, 255, 255, 1)",
                padding: "32px",
                borderRadius: "20px",
                boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.3)",
                maxWidth: "400px",
                width: "100%",
                position: "relative",
                zIndex: 1,
              }}
            >
              <div
                className="bonnadona-hub-logo fade-in"
                style={{
                  display: "flex",
                  justifyContent: "center",
                  paddingBlock: "1px",
                }}
              >
                <img
                  src="/logos/logo_horizontal.png"
                  alt="Logo de Bonnadona HUB"
                  style={{ width: "270px", marginBlock: "25px" }}
                />
              </div>
              <Title
                className="title-login"
                style={{
                  textAlign: "center",
                  fontWeight: "normal",
                  lineHeight: 1.3,
                  marginBlock: "13px",
                }}
                level={2}
              >
                Iniciar sesión
              </Title>
              <Form
                id="login-form"
                className="login-form"
                onFinish={handleSubmit}
                autoComplete="false"
                initialValues={{ remember: false }}
              >
                <Form.Item
                  id="login-email-form"
                  className="login-email-form"
                  name="login-email-form"
                  rules={[
                    { required: true, message: "Por favor ingrese su correo" },
                    {
                      pattern:
                        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                      message: "Por favor ingrese un correo válido",
                    },
                  ]}
                >
                  <Input
                    className="email-input"
                    type="email"
                    placeholder="Correo"
                    autoComplete="off"
                    prefix={
                      <UserOutlined style={{ color: "rgba(0,0,0,.25)" }} />
                    }
                    value={emailLocalState}
                    style={{ borderRadius: "30px" }}
                    onChange={handleEmailChange}
                  />
                </Form.Item>
                <Form.Item
                  id="login-password-form"
                  className="login-password-form"
                  name="login-password-form"
                  rules={[
                    {
                      required: true,
                      message: "Por favor ingrese su contraseña",
                    },
                    // { pattern: /^[0-9]+$/, message: "El correo es incorrecto" },
                  ]}
                >
                  <Input.Password
                    className="password-input"
                    prefix={
                      <RiLockPasswordLine
                        style={{ color: "rgba(0,0,0,.25)" }}
                      />
                    }
                    value={passwordLocalState}
                    placeholder="Contraseña"
                    style={{ borderRadius: "30px" }}
                    onChange={handlePasswordChange}
                  />
                </Form.Item>
                <Form.Item>
                  <a
                    className="login-forgot-password-form"
                    style={{
                      ...titleStyleCss,
                      display: "flow",
                      fontWeight: 500,
                    }}
                    onClick={() => setModalForgotMyPasswordIsOpen(true)}
                  >
                    ¿Olvidaste tu contraseña?
                  </a>
                </Form.Item>

                {modalForgotMyPasswordIsOpen && (
                  <CustomModalNoContent
                    key={"custom-modal-forgot-my-password"}
                    widthCustomModalNoContent={"31%"}
                    openCustomModalState={modalForgotMyPasswordIsOpen}
                    closableCustomModal={true}
                    maskClosableCustomModal={true}
                    handleCancelCustomModal={() =>
                      setModalForgotMyPasswordIsOpen(false)
                    }
                    contentCustomModal={
                      <UserForgotPasswordForm
                        setOpenModalForgotPassword={
                          setModalForgotMyPasswordIsOpen
                        }
                      />
                    }
                  />
                )}
                <Form.Item style={{ textAlign: "center" }}>
                  <Button
                    className="login-button"
                    name="login-button"
                    id="login-button"
                    type="primary"
                    htmlType="submit"
                    style={{
                      borderRadius: "30px",
                      textAlign: "center",
                      backgroundColor: "#0085c8",
                    }}
                    onClick={() => ({})}
                  >
                    Iniciar Sesión
                  </Button>
                </Form.Item>
              </Form>
            </div>
          </Col>
        </Row>
        <TwoFactorAuthModal
          visible={isModalVerifyCodeVisible}
          onClose={handleModalVerifyCodeClose}
          onVerify={handleVerifyCode}
        />
      </div>
    </>
  );
};

export default LoginUserForm;
