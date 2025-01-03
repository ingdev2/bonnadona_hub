"use client";

import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { useRouter } from "next/navigation";

import { Modal, Input, Button, Form, Divider } from "antd";
import Link from "next/link";

import { TbPasswordUser } from "react-icons/tb";

import CustomSpin from "@/components/common/custom_spin/CustomSpin";
import CustomLoadingOverlay from "@/components/common/custom_loading_overlay/CustomLoadingOverlay";
import CountdownTimer from "@/components/common/countdown_timer/CountdownTimer";

import { maskEmail } from "@/helpers/mask_email/mask_email";
import { useResendVerificationUserCodeMutation } from "@/redux/apis/auth/loginUsersApi";
import CustomMessage from "@/components/common/custom_messages/CustomMessage";
import {
  setErrorsLoginUser,
  setPasswordLoginUser,
  setVerificationCodeLoginUser,
} from "@/redux/features/login/userLoginSlice";
import { signIn } from "next-auth/react";
import {
  setIsPageLoading,
  setAdminModalIsOpen,
} from "@/redux/features/common/modal/modalSlice";
import {
  setErrorsLoginAdmin,
  setVerificationCodeLoginAdmin,
} from "@/redux/features/login/adminLoginSlice";

const AdminModalVerificationCode: React.FC = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const adminModalState = useAppSelector(
    (state) => state.modal.adminModalIsOpen
  );

  const isPageLoadingState = useAppSelector(
    (state) => state.modal.isPageLoading
  );

  const principalEmailAdminLoginState = useAppSelector(
    (state) => state.adminLogin.principal_email
  );

  const verificationCodeAdminLoginState = useAppSelector(
    (state) => state.adminLogin.verification_code
  );

  const [isSubmittingConfirm, setIsSubmittingConfirm] = useState(false);
  const [isSubmittingResendCode, setIsSubmittingResendCode] = useState(false);

  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [showErrorMessage, setShowErrorMessage] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const [resendCodeDisable, setResendCodeDisable] = useState(true);

  const [
    resentUserVerificationCodeCollaborator,
    {
      data: resendCodeData,
      isLoading: isResendCodeLoading,
      isSuccess: isResendCodeSuccess,
      isError: isResendCodeError,
    },
  ] = useResendVerificationUserCodeMutation({
    fixedCacheKey: "resendUserCodeData",
  });

  useEffect(() => {
    if (!principalEmailAdminLoginState) {
      setShowErrorMessage(true);
      setErrorMessage(
        "¡Error al obtener el correo principal del administrador!"
      );
    }
  }, [principalEmailAdminLoginState]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    try {
      setIsSubmittingConfirm(true);

      const verificationCode = verificationCodeAdminLoginState
        ? parseInt(verificationCodeAdminLoginState?.toString(), 10)
        : "";

      const responseNextAuth = await signIn(
        process.env.NEXT_PUBLIC_NAME_AUTH_CREDENTIALS_ADMINS,
        {
          verification_code: verificationCode,
          principal_email: principalEmailAdminLoginState,
          redirect: false,
        }
      );
      if (responseNextAuth?.error) {
        dispatch(setErrorsLoginUser(responseNextAuth.error.split(",")));
        setShowErrorMessage(true);
      }

      if (responseNextAuth?.status === 200) {
        dispatch(setIsPageLoading(true));

        setShowSuccessMessage(true);
        setSuccessMessage("Ingresando, por favor espere...");

        dispatch(setPasswordLoginUser(""));
        dispatch(setVerificationCodeLoginUser(0));

        await router.replace("/admin/dashboard/all_user", { scroll: false });

        await new Promise((resolve) => setTimeout(resolve, 4000));
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsSubmittingConfirm(false);
    }
  };

  const handleResentCode = async (e: React.MouseEvent<HTMLFormElement>) => {
    try {
      setIsSubmittingResendCode(true);

      const response: any = await resentUserVerificationCodeCollaborator({
        principal_email: principalEmailAdminLoginState,
      });

      let isResponseError = response.error;

      if (!isResendCodeSuccess && !isResendCodeLoading && isResendCodeError) {
        dispatch(setErrorsLoginUser(isResponseError?.data.message));
        setShowErrorMessage(true);
      }
      if (!isResendCodeError && !isResponseError) {
        setShowSuccessMessage(true);
        setSuccessMessage("¡Código Reenviado Correctamente!");
        setResendCodeDisable(true);
      }
    } catch (error) {
      console.error(error);
      dispatch(setErrorsLoginAdmin("Internal server error"));
      setShowErrorMessage(true);
    } finally {
      setIsSubmittingResendCode(false);
    }
  };

  const handleCancel = () => {
    dispatch(setAdminModalIsOpen(false));

    <Link href="/login_admin" scroll={false} />;
    window.location.reload();
  };

  const handleButtonClick = () => {
    dispatch(setErrorsLoginUser([]));
    setShowErrorMessage(false);
    setShowSuccessMessage(false);
  };

  return (
    <div>
      {showErrorMessage && (
        <CustomMessage
          typeMessage="error"
          message={errorMessage || "¡Código incorrecto!"}
        />
      )}
      {showSuccessMessage && (
        <CustomMessage
          typeMessage="success"
          message={successMessage || "¡Código Reenviado Correctamente!"}
        />
      )}

      <Modal
        className="modal-verification-code"
        open={adminModalState}
        confirmLoading={isSubmittingConfirm}
        onCancel={handleCancel}
        destroyOnClose={true}
        width={371}
        footer={null}
        maskClosable={false}
        centered
      >
        <div
          className="content-modal"
          style={{
            textAlign: "center",
            flexDirection: "column",
            alignItems: "center",
            marginBlock: 10,
            marginInline: 7,
          }}
        >
          <h2
            className="title-modal"
            style={{
              fontWeight: "500",
              lineHeight: 1.3,
              marginBottom: 7,
              overflow: "hidden",
              textOverflow: "ellipsis",
              marginTop: 27,
              textAlign: "center",
            }}
          >
            Ingresar código de verificación
          </h2>
          <h4
            className="subtitle-modal"
            style={{
              fontWeight: "400",
              lineHeight: 1.3,
              marginTop: 0,
              marginBottom: 7,
              overflow: "hidden",
              textOverflow: "ellipsis",
              marginBlock: 7,
            }}
          >
            Hemos enviado un código de ingreso al siguiente correo electrónico:
          </h4>
          <h5
            className="user-email"
            style={{
              fontWeight: "bold",
              fontSize: 13,
              color: "#015E90",
              lineHeight: 1.7,
              letterSpacing: 1.3,
              marginBlock: 7,
            }}
          >
            {maskEmail(principalEmailAdminLoginState)}
          </h5>

          <CustomLoadingOverlay isLoading={isPageLoadingState} />

          {resendCodeDisable && (
            <CountdownTimer
              onFinishHandler={() => {
                setResendCodeDisable(false);
              }}
              showCountdown={resendCodeDisable}
            />
          )}

          <Form
            id="form-verify-code-modal"
            name="form-verify-code-modal"
            initialValues={{ remember: false }}
            autoComplete="false"
            onFinish={handleSubmit}
          >
            <Form.Item
              id="user-code"
              className="user-code"
              name={"user-code"}
              style={{ textAlign: "center" }}
              normalize={(value) => {
                if (!value) return "";

                return value.replace(/[^0-9]/g, "");
              }}
              rules={[
                {
                  required: true,
                  message: "¡Por favor ingresa código de verificación!",
                },
                {
                  pattern: /^[0-9]+$/,
                  message: "¡Por favor ingresa solo números!",
                },
                {
                  min: 4,
                  message: "¡Por favor ingresa mínimo 4 números!",
                },
                {
                  max: 5,
                  message: "¡Por favor ingresa máximo 5 números!",
                },
              ]}
            >
              <Input
                id="input-code"
                className="input-code"
                type="tel"
                prefix={
                  <TbPasswordUser
                    className="input-code-item-icon"
                    style={{ paddingInline: "1px", color: "#3F97AF" }}
                  />
                }
                style={{
                  width: 170,
                  fontSize: 14,
                  fontWeight: "bold",
                  borderWidth: 2,
                  marginTop: 10,
                  marginBottom: 1,
                  borderRadius: "30px",
                }}
                placeholder="Código"
                value={verificationCodeAdminLoginState}
                onChange={(e) =>
                  dispatch(setVerificationCodeLoginAdmin(e.target.value))
                }
                autoComplete="off"
                min={0}
              />
            </Form.Item>

            {isSubmittingConfirm ? (
              <div style={{ marginTop: "2px", marginBottom: "10px" }}>
                <CustomSpin />
              </div>
            ) : (
              <Button
                key={"confirm-code-button"}
                className="confirm-code-button"
                disabled={isPageLoadingState}
                size="middle"
                style={{
                  backgroundColor: isPageLoadingState ? "#D8D8D8" : "#015E90",
                  color: isPageLoadingState ? "#A0A0A0" : "#f2f2f2",
                  borderRadius: "31px",
                  marginBottom: "13px",
                }}
                htmlType="submit"
                onClick={handleButtonClick}
              >
                Confirmar código
              </Button>
            )}
          </Form>

          {isSubmittingResendCode && !resendCodeDisable ? (
            <CustomSpin />
          ) : (
            <Button
              key="resend-button-user"
              className="resend-button-user"
              disabled={resendCodeDisable}
              size="middle"
              style={{
                backgroundColor: resendCodeDisable ? "#D8D8D8" : "transparent",
                color: resendCodeDisable ? "#A7BAB7" : "#015E90",
                borderColor: resendCodeDisable ? "#A7AFBA" : "#015E90",
                paddingInline: 13,
                borderRadius: 31,
                borderWidth: 1.3,
              }}
              onClick={handleResentCode}
              onMouseDown={handleButtonClick}
            >
              Reenviar código
            </Button>
          )}

          <div style={{ marginInline: 54 }}>
            <Divider
              style={{
                marginBlock: 13,
                borderWidth: 2,
              }}
            />
          </div>

          <Button
            key="cancel-button-admin"
            className="cancel-button-admin"
            size="middle"
            style={{
              paddingInline: 45,
              backgroundColor: "#8C1111",
              color: "#f2f2f2",
              borderRadius: 31,
            }}
            onClick={handleCancel}
          >
            Cancelar
          </Button>
        </div>
      </Modal>
    </div>
  );
};

export default AdminModalVerificationCode;
