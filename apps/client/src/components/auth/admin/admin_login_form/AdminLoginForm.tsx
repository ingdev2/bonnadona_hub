"use client";

import React, { useEffect, useState } from "react";
import { signOut, useSession } from "next-auth/react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";

import { Form, Input, Button, Typography } from "antd";
import { titleStyleCss } from "@/theme/text_styles";

import { UserOutlined } from "@ant-design/icons";
import { RiLockPasswordLine } from "react-icons/ri";

import CustomMessage from "@/components/common/custom_messages/CustomMessage";
import CustomModalNoContent from "@/components/common/custom_modal_no_content/CustomModalNoContent";
import { RolesEnum } from "@/utils/enums/roles/roles.enum";
import { useLoginAdminAndAuditorUserMutation } from "@/redux/apis/auth/loginAdminApi";
import {
  resetLoginStateAdmin,
  setErrorsLoginAdmin,
  setPasswordLoginAdmin,
  setPrincipalEmailLoginAdmin,
} from "@/redux/features/login/adminLoginSlice";
import { setDefaultValuesUser } from "@/redux/features/user/userSlice";
import { setAdminModalIsOpen } from "@/redux/features/common/modal/modalSlice";
import CustomSpin from "@/components/common/custom_spin/CustomSpin";
import AdminForgotPasswordForm from "../admin_forgot_password_form/AdminForgotPasswordForm";
import AdminModalVerificationCode from "../admin_modal_verification_code/AdminModalVerificationCode";

const AdminLoginForm: React.FC = () => {
  const { data: session, status } = useSession();
  const dispatch = useAppDispatch();

  const errorsAdminState = useAppSelector((state) => state.adminLogin.errors);

  const adminModalState = useAppSelector(
    (state) => state.modal.adminModalIsOpen
  );

  const [principalEmailAdminLocalState, setPrincipalEmailAdminLocalState] =
    useState("");
  const [passwordAdminLocalState, setPasswordAdminLocalState] = useState("");

  const [modalForgotMyPasswordIsOpen, setModalForgotMyPasswordIsOpen] =
    useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showErrorMessage, setShowErrorMessage] = useState(false);

  const [
    loginAdminAndAuditorUsers,
    {
      data: isloginAdminAndAuditorData,
      isLoading: isloginAdminAndAuditorLoading,
      isSuccess: isloginAdminAndAuditorSuccess,
      isError: isloginAdminAndAuditorError,
    },
  ] = useLoginAdminAndAuditorUserMutation({
    fixedCacheKey: "loginAdminAndAuditorData",
  });

  useEffect(() => {
    if (
      (status === "authenticated" && session?.user.role === RolesEnum.ADMIN) ||
      session?.user.role === RolesEnum.SUPER_ADMIN ||
      session?.user.role === RolesEnum.AUDITOR
    ) {
      signOut();
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    try {
      setIsSubmitting(true);
      dispatch(resetLoginStateAdmin());
      dispatch(setDefaultValuesUser());

      const response: any = await loginAdminAndAuditorUsers({
        principal_email: principalEmailAdminLocalState,
        password: passwordAdminLocalState,
      });

      let isLoginAdminError = response.error;
      let isLoginAdminSuccess = response.data;
      let isLoginAdminBan = response.data?.statusCode;

      if (isLoginAdminError) {
        const errorMessage = isLoginAdminError?.data.message;

        if (Array.isArray(errorMessage)) {
          dispatch(setErrorsLoginAdmin(errorMessage[0]));
          setShowErrorMessage(true);
        } else if (typeof errorMessage === "string") {
          dispatch(setErrorsLoginAdmin(errorMessage));
          setShowErrorMessage(true);
        }
      }
      if (isLoginAdminBan === 202) {
        dispatch(setErrorsLoginAdmin(response.data?.message));
        setShowErrorMessage(true);
      }

      if (isLoginAdminSuccess && !isLoginAdminError && !isLoginAdminBan) {
        dispatch(setPrincipalEmailLoginAdmin(principalEmailAdminLocalState));
        dispatch(setPasswordLoginAdmin(passwordAdminLocalState));
        dispatch(setErrorsLoginAdmin([]));
        dispatch(setAdminModalIsOpen(true));
        setShowErrorMessage(false);
      }
    } catch (error) {
      console.error(error);
      dispatch(setErrorsLoginAdmin("Internal server error"));
      setShowErrorMessage(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleButtonClick = () => {
    dispatch(setErrorsLoginAdmin([]));
    setShowErrorMessage(false);
  };

  return (
    <>
      {adminModalState && <AdminModalVerificationCode />}

      {showErrorMessage && (
        <CustomMessage
          typeMessage="error"
          message={errorsAdminState?.toString() || "¡Error en la petición!"}
        />
      )}
      <div
        style={{
          width: "100vw",
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
        <div
          style={{
            backgroundColor: "rgba(255, 255, 255, 2)",
            padding: "32px",
            borderRadius: "20px",
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
              paddingBlock: "1px",
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
              fontSize: "22px",
            }}
          >
            Iniciar sesión Administradores
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
                  pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
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
                prefix={<UserOutlined style={{ color: "rgba(0,0,0,.25)" }} />}
                value={principalEmailAdminLocalState}
                onChange={(e) =>
                  setPrincipalEmailAdminLocalState(e.target.value)
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
                  message: "¡La contraseña debe tener máximo 70 caracteres!",
                },
              ]}
              hasFeedback
            >
              <Input.Password
                className="password-input"
                prefix={
                  <RiLockPasswordLine style={{ color: "rgba(0,0,0,.22)" }} />
                }
                type="password"
                value={passwordAdminLocalState}
                placeholder="Contraseña"
                onChange={(e) => setPasswordAdminLocalState(e.target.value)}
              />
            </Form.Item>

            <Form.Item style={{ textAlign: "center" }}>
              <a
                className="login-forgot-password-form-admin"
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

              {isSubmitting && isloginAdminAndAuditorLoading ? (
                <CustomSpin />
              ) : (
                <Button
                  className="login-button"
                  name="login-button"
                  id="login-button"
                  type="primary"
                  htmlType="submit"
                  size="middle"
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
            <AdminForgotPasswordForm
              setOpenModalForgotPassword={setModalForgotMyPasswordIsOpen}
            />
          }
        />
      )}
    </>
  );
};

export default AdminLoginForm;
