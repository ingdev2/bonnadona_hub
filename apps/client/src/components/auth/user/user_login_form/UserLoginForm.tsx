"use client";

import React, { useEffect, useState } from "react";
import { signOut, useSession } from "next-auth/react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { useRouter } from "next/navigation";

import { Form, Input, Button, Typography, Col, Carousel, Row } from "antd";
import { titleStyleCss } from "@/theme/text_styles";

import { UserOutlined } from "@ant-design/icons";
import { RiLockPasswordLine } from "react-icons/ri";

import UserModalVerificationCode from "../user_modal_verification_code/UserModalVerificationCode";
import UserForgotPasswordForm from "../user_forgot_password_form/UserForgotPasswordForm";

import CustomMessage from "@/components/common/custom_messages/CustomMessage";
import CustomModalNoContent from "@/components/common/custom_modal_no_content/CustomModalNoContent";

import { useLoginCollaboratorUserMutation } from "@/redux/apis/auth/loginUsersApi";
import { RolesEnum } from "@/utils/enums/roles/roles.enum";
import {
  resetLoginStateUser,
  setErrorsLoginUser,
  setPasswordLoginUser,
  setPrincipalEmailLoginUser,
} from "@/redux/features/login/userLoginSlice";
import { setDefaultValuesUser } from "@/redux/features/user/userSlice";
import CustomSpin from "@/components/common/custom_spin/CustomSpin";
import { setCollaboratorModalIsOpen } from "@/redux/features/common/modal/modalSlice";

const UserLoginForm: React.FC = () => {
  const { data: session, status } = useSession();
  const dispatch = useAppDispatch();
  const router = useRouter();

  const errorsCollaboratorState = useAppSelector(
    (state) => state.userLogin.errors
  );

  const modalIsOpenUser = useAppSelector(
    (state) => state.modal.collaboratorModalIsOpen
  );

  const [
    principalEmailCollaboratorLocalState,
    setPrincipalEmailCollaboratorLocalState,
  ] = useState("");
  const [passwordCollaboratorLocalState, setPasswordCollaboratorLocalState] =
    useState("");

  const [modalForgotMyPasswordIsOpen, setModalForgotMyPasswordIsOpen] =
    useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showErrorMessage, setShowErrorMessage] = useState(false);

  const [
    loginCollaboratorUsers,
    {
      data: isloginCollaboratorData,
      isLoading: isloginCollaboratorLoading,
      isSuccess: isloginCollaboratorSuccess,
      isError: isloginCollaboratorError,
    },
  ] = useLoginCollaboratorUserMutation({
    fixedCacheKey: "loginCollaboratorData",
  });

  useEffect(() => {
    if (
      status === "authenticated" &&
      session?.user.role === RolesEnum.COLLABORATOR
    ) {
      signOut();
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    try {
      setIsSubmitting(true);
      dispatch(resetLoginStateUser());
      dispatch(setDefaultValuesUser());

      const response: any = await loginCollaboratorUsers({
        principal_email: principalEmailCollaboratorLocalState,
        password: passwordCollaboratorLocalState,
      });

      let isLoginUserError = response.error;
      let isLoginUserSuccess = response.data;
      let isLoginUserBan = response.data?.statusCode;

      if (isLoginUserError) {
        const errorMessage = isLoginUserError?.data.message;

        if (Array.isArray(errorMessage)) {
          dispatch(setErrorsLoginUser(errorMessage[0]));
          setShowErrorMessage(true);
        } else if (typeof errorMessage === "string") {
          dispatch(setErrorsLoginUser(errorMessage));
          setShowErrorMessage(true);
        }
      }
      if (isLoginUserBan === 202) {
        dispatch(setErrorsLoginUser(response.data?.message));
        setShowErrorMessage(true);
      }

      if (isLoginUserSuccess && !isLoginUserError && !isLoginUserBan) {
        dispatch(
          setPrincipalEmailLoginUser(principalEmailCollaboratorLocalState)
        );
        dispatch(setPasswordLoginUser(passwordCollaboratorLocalState));
        dispatch(setErrorsLoginUser([]));
        dispatch(setCollaboratorModalIsOpen(true));
        setShowErrorMessage(false);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleButtonClick = () => {
    dispatch(setErrorsLoginUser([]));
    setShowErrorMessage(false);
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
      {modalIsOpenUser && <UserModalVerificationCode />}

      {showErrorMessage && (
        <CustomMessage
          typeMessage="error"
          message={
            errorsCollaboratorState?.toString() || "¡Error en la petición!"
          }
        />
      )}

      <div
        style={{
          width: "100vw",
          height: "100vh",
          minWidth: "888px",
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

        <Row gutter={[32, 32]} style={{ width: "100%", maxWidth: "1000px" }}>
          <Col
            className="col-carousel"
            span={12}
            style={{
              backgroundColor: "#017DC0",
              borderRadius: "13px",
              boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.2)",
            }}
          >
            <div style={{ padding: "31px" }}>
              <Carousel
                autoplaySpeed={3000}
                autoplay
                arrows
                fade
                className="carousel-images-2FA"
              >
                {imagesCarousel.map((image, index) => (
                  <div key={index}>
                    <img
                      src={image}
                      alt={`Imagen ${index + 1}`}
                      style={{
                        width: "100%",
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
                backgroundColor: "rgba(255, 255, 255, 2)",
                padding: "31px",
                borderRadius: "13px",
                boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.2)",
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
                  paddingBlock: "2px",
                }}
              >
                <img
                  src="/logos/logo_horizontal.png"
                  alt="Logo de Bonnadona HUB"
                  style={{ width: "301px", marginBlock: "13px" }}
                />
              </div>

              <h2
                style={{
                  ...titleStyleCss,
                  textAlign: "center",
                  marginBlock: "22px",
                  color: "#070707",
                }}
              >
                Iniciar sesión Usuarios
              </h2>

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
                  normalize={(value) => {
                    if (!value) return "";

                    return value.toLowerCase().replace(/[^a-z0-9@._-]/g, "");
                  }}
                  rules={[
                    { required: true, message: "Por favor ingrese su correo" },
                    {
                      min: 5,
                      message: "¡Por favor ingresa mínimo 5 caracteres!",
                    },
                    {
                      max: 50,
                      message: "¡Por favor ingresa máximo 50 caracteres!",
                    },
                    {
                      pattern:
                        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                      message: "Por favor ingrese un correo válido",
                    },
                  ]}
                  hasFeedback
                >
                  <Input
                    className="email-input"
                    type="email"
                    placeholder="Correo"
                    autoComplete="off"
                    prefix={
                      <UserOutlined style={{ color: "rgba(0,0,0,.25)" }} />
                    }
                    value={principalEmailCollaboratorLocalState}
                    onChange={(e) =>
                      setPrincipalEmailCollaboratorLocalState(e.target.value)
                    }
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
                    {
                      max: 70,
                      message:
                        "¡La contraseña debe tener máximo 70 caracteres!",
                    },
                  ]}
                  hasFeedback
                >
                  <Input.Password
                    className="password-input"
                    prefix={
                      <RiLockPasswordLine
                        style={{ color: "rgba(0,0,0,.22)" }}
                      />
                    }
                    type="password"
                    value={passwordCollaboratorLocalState}
                    placeholder="Contraseña"
                    onChange={(e) =>
                      setPasswordCollaboratorLocalState(e.target.value)
                    }
                  />
                </Form.Item>

                <Form.Item style={{ textAlign: "center" }}>
                  <a
                    className="login-forgot-password-form-user"
                    style={{
                      ...titleStyleCss,
                      display: "flow",
                      fontWeight: 500,
                      marginTop: "14px",
                      marginBottom: "25px",
                    }}
                    onClick={() => setModalForgotMyPasswordIsOpen(true)}
                  >
                    ¿Olvidaste tu contraseña?
                  </a>

                  {isSubmitting && isloginCollaboratorLoading ? (
                    <CustomSpin />
                  ) : (
                    <Button
                      size="middle"
                      className="login-button"
                      name="login-button"
                      id="login-button"
                      type="primary"
                      htmlType="submit"
                      style={{
                        borderRadius: "31px",
                        textAlign: "center",
                        backgroundColor: "#015E90",
                      }}
                      onClick={handleButtonClick}
                    >
                      Iniciar Sesión
                    </Button>
                  )}
                </Form.Item>
              </Form>
            </div>
          </Col>
        </Row>
      </div>

      {modalForgotMyPasswordIsOpen && (
        <CustomModalNoContent
          key={"custom-modal-forgot-my-password"}
          widthCustomModalNoContent={"31%"}
          openCustomModalState={modalForgotMyPasswordIsOpen}
          closableCustomModal={true}
          maskClosableCustomModal={true}
          handleCancelCustomModal={() => setModalForgotMyPasswordIsOpen(false)}
          contentCustomModal={
            <UserForgotPasswordForm
              setOpenModalForgotPassword={setModalForgotMyPasswordIsOpen}
            />
          }
        />
      )}
    </>
  );
};

export default UserLoginForm;
