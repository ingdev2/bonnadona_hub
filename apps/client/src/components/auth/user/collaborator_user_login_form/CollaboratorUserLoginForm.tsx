"use client";

import React, { useEffect, useState } from "react";
import { signOut, useSession } from "next-auth/react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { useRouter } from "next/navigation";

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

import CollaboratorModalVerificationCode from "../CollaboratorModalVerificationCode";
import CollaboratorForgotPasswordForm from "../CollaboratorForgotPasswordForm";

import CustomMessage from "@/components/common/custom_messages/CustomMessage";
import CustomModalNoContent from "@/components/common/custom_modal_no_content/CustomModalNoContent";

import { titleStyleCss } from "@/theme/text_styles";
import { useLoginCollaboratorUserMutation } from "@/redux/apis/auth/loginUsersApi";
import { UserRolType } from "@/utils/enums/user_roles.enum";
import {
  resetLoginStateCollaborator,
  setErrorsLoginCollaborator,
  setPasswordLoginCollaborator,
  setPrincipalEmailLoginCollaborator,
} from "@/redux/features/user/collaboratorUserLoginSlice";
import { setDefaultValuesUser } from "@/redux/features/user/userSlice";
import CustomSpin from "@/components/common/custom_spin/CustomSpin";
import { setCollaboratorModalIsOpen } from "@/redux/features/common/modal/modalSlice";

const { Title } = Typography;

const CollaboratorUserLoginForm = () => {
  const { data: session, status } = useSession();
  const dispatch = useAppDispatch();
  const router = useRouter();

  const errorsCollaboratorState = useAppSelector(
    (state) => state.collaboratorUserLogin.errors
  );

  const modalIsOpenCollaborator = useAppSelector(
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

  const [isSubmittingCollaborator, setIsSubmittingCollaborator] =
    useState(false);
  const [showErrorMessageCollaborator, setShowErrorMessageCollaborator] =
    useState(false);

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

  // useEffect(() => {
  //   if (
  //     status === "authenticated" &&
  //     session?.user?.role === UserRolType.COLLABORATOR
  //   ) {
  //     signOut();
  //   }
  // }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    try {
      setIsSubmittingCollaborator(true);
      dispatch(resetLoginStateCollaborator());
      dispatch(setDefaultValuesUser());

      const response: any = await loginCollaboratorUsers({
        principal_email: principalEmailCollaboratorLocalState,
        password: passwordCollaboratorLocalState,
      });

      let isLoginUserError = response.error;
      let isLoginUserSuccess = response.data;
      let isLoginUserBan = response.data?.statusCode

      if (isLoginUserError) {
        console.log('response.error:', response.error)
        const errorMessage = isLoginUserError?.data.message;

        if (Array.isArray(errorMessage)) {
          dispatch(setErrorsLoginCollaborator(errorMessage[0]));
          setShowErrorMessageCollaborator(true);
        } else if (typeof errorMessage === "string") {
          dispatch(setErrorsLoginCollaborator(errorMessage));
          setShowErrorMessageCollaborator(true);
        }
      }
      if (isLoginUserBan === 202) {
        console.log('aqui isLoginUserBan:', isLoginUserBan)
        dispatch(setErrorsLoginCollaborator(response.data?.message));
        setShowErrorMessageCollaborator(true);
      }

      if (isLoginUserSuccess && !isLoginUserError && !isLoginUserBan) {
        console.log('response: ', response)
        dispatch(
          setPrincipalEmailLoginCollaborator(
            principalEmailCollaboratorLocalState
          )
        );
        dispatch(setPasswordLoginCollaborator(passwordCollaboratorLocalState));
        dispatch(setErrorsLoginCollaborator([]));
        dispatch(setCollaboratorModalIsOpen(true));
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsSubmittingCollaborator(false);
    }
  };

  const handleButtonClick = () => {
    dispatch(setErrorsLoginCollaborator([]));
    setShowErrorMessageCollaborator(false);
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
      {modalIsOpenCollaborator && <CollaboratorModalVerificationCode />}

      {showErrorMessageCollaborator && (
        <CustomMessage
          typeMessage="error"
          message={
            errorsCollaboratorState?.toString() || "¡Error en la petición!"
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
              backgroundColor: "#017DC0",
              borderRadius: "20px",
              boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.3)",
            }}
          >
            <div style={{ padding: "32px" }}>
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
                    value={principalEmailCollaboratorLocalState}
                    style={{ borderRadius: "30px" }}
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
                  ]}
                >
                  <Input.Password
                    className="password-input"
                    prefix={
                      <RiLockPasswordLine
                        style={{ color: "rgba(0,0,0,.25)" }}
                      />
                    }
                    type="password"
                    value={passwordCollaboratorLocalState}
                    placeholder="Contraseña"
                    style={{ borderRadius: "30px" }}
                    onChange={(e) =>
                      setPasswordCollaboratorLocalState(e.target.value)
                    }
                  />
                </Form.Item>

                <Form.Item style={{ textAlign: "center" }}>
                  <a
                    className="login-forgot-password-form"
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

                  {isSubmittingCollaborator && isloginCollaboratorLoading ? (
                    <CustomSpin />
                  ) : (
                    <Button
                      className="login-button"
                      name="login-button"
                      id="login-button"
                      type="primary"
                      htmlType="submit"
                      style={{
                        borderRadius: "30px",
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
            <CollaboratorForgotPasswordForm
              setOpenModalForgotPassword={setModalForgotMyPasswordIsOpen}
            />
          }
        />
      )}
    </>
  );
};

export default CollaboratorUserLoginForm;
