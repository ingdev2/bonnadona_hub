"use client";

import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { useRouter } from "next/navigation";

import { Modal, Input, Button, Typography, Space, Form, Divider } from "antd";
import Link from "next/link";

import { MdPassword } from "react-icons/md";
import { TbPasswordUser } from "react-icons/tb";

import CustomButton from "@/components/common/custom_button/CustomButton";
import CustomSpin from "@/components/common/custom_spin/CustomSpin";
import CustomLoadingOverlay from "@/components/common/custom_loading_overlay/CustomLoadingOverlay";
import CountdownTimer from "@/components/common/countdown_timer/CountdownTimer";

import { maskEmail } from "@/helpers/mask_email/mask_email";
import {
  useGetCollaboratorUserByIdNumberQuery,
  useGetUserActiveByEmailQuery,
} from "@/redux/apis/users/userApi";
import { useResendVerificationUserCodeMutation } from "@/redux/apis/auth/loginUsersApi";
import CustomMessage from "@/components/common/custom_messages/CustomMessage";
import {
  setErrorsLoginCollaborator,
  setIdNumberLoginCollaborator,
  setIdTypeLoginCollaborator,
  setPasswordLoginCollaborator,
  setPrincipalEmailLoginCollaborator,
  setVerificationCodeLoginCollaborator,
} from "@/redux/features/user/collaboratorUserLoginSlice";
import { signIn } from "next-auth/react";
import {
  setCollaboratorModalIsOpen,
  setIsPageLoading,
} from "@/redux/features/common/modal/modalSlice";

const { Title } = Typography;

const CollaboratorModalVerificationCode: React.FC = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const modalIsOpenCollaborator = useAppSelector(
    (state) => state.modal.collaboratorModalIsOpen
  );

  const isPageLoadingState = useAppSelector(
    (state) => state.modal.isPageLoading
  );

  const idTypeCollaboratorState = useAppSelector(
    (state) => state.collaboratorUserLogin.user_id_type
  );

  const idNumberCollaboratorState = useAppSelector(
    (state) => state.collaboratorUserLogin.id_number
  );

  const principalEmailCollaboratorState = useAppSelector(
    (state) => state.collaboratorUserLogin.principal_email
  );
  const verificationCodeCollaboratorState = useAppSelector(
    (state) => state.collaboratorUserLogin.verification_code
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
    fixedCacheKey: "resendCollaboratorCodeData",
  });

  const {
    data: userActiveData,
    isLoading: userActiveLoading,
    isFetching: userActiveFetching,
    error: userActiveError,
  } = useGetUserActiveByEmailQuery(principalEmailCollaboratorState);

  // useEffect(() => {
  //   if (!idNumberCollaboratorState) {
  //     setShowErrorMessage(true);
  //     setErrorMessage("¡Error al obtener los datos del usuario!");
  //   }
  // }, [idNumberCollaboratorState]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    try {
      setIsSubmittingConfirm(true);

      const verificationCode = verificationCodeCollaboratorState
        ? parseInt(verificationCodeCollaboratorState?.toString(), 10)
        : "";

      const responseNextAuth = await signIn(
        process.env.NEXT_PUBLIC_NAME_AUTH_CREDENTIALS_USERS,
        {
          verification_code: verificationCode,
          principal_email: principalEmailCollaboratorState,
          redirect: false,
        }
      );
      console.log("responseNextAuth: ", responseNextAuth);
      if (responseNextAuth?.error) {
        dispatch(setErrorsLoginCollaborator(responseNextAuth.error.split(",")));
        setShowErrorMessage(true);
      }

      if (responseNextAuth?.status === 200) {
        dispatch(setIsPageLoading(true));
        console.log("userActiveData:", userActiveData);

        setShowSuccessMessage(true);
        setSuccessMessage("Ingresando, por favor espere...");
        dispatch(setIdTypeLoginCollaborator(userActiveData?.user_id_type));
        dispatch(setIdNumberLoginCollaborator(userActiveData?.id_number));

        dispatch(setPasswordLoginCollaborator(""));
        dispatch(setVerificationCodeLoginCollaborator(0));

        await router.replace("/user/dashboard/all_apps", { scroll: false });

        await new Promise((resolve) => setTimeout(resolve, 4000));
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsSubmittingConfirm(false);
      dispatch(setCollaboratorModalIsOpen(false));
    }
  };

  const handleResentCode = async (e: React.MouseEvent<HTMLFormElement>) => {
    try {
      setIsSubmittingResendCode(true);

      const response: any = await resentUserVerificationCodeCollaborator({
        principal_email: principalEmailCollaboratorState,
      });

      let isResponseError = response.error;

      if (!isResendCodeSuccess && !isResendCodeLoading && isResendCodeError) {
        dispatch(setErrorsLoginCollaborator(isResponseError?.data.message));
        setShowErrorMessage(true);
      }
      if (!isResendCodeError && !isResponseError) {
        setShowSuccessMessage(true);
        setSuccessMessage("¡Código Reenviado Correctamente!");
        setResendCodeDisable(true);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsSubmittingResendCode(false);
    }
  };

  const handleCancel = () => {
    dispatch(setCollaboratorModalIsOpen(false));

    <Link href="/login" scroll={false} />;
    window.location.reload();
  };

  const handleButtonClick = () => {
    dispatch(setErrorsLoginCollaborator([]));
    setShowErrorMessage(false);
    setShowSuccessMessage(false);
  };

  return (
    <div>
      {showErrorMessage && (
        <CustomMessage
          typeMessage="error"
          message={errorMessage || "¡Código Incorrecto!"}
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
        open={modalIsOpenCollaborator}
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
            {maskEmail(principalEmailCollaboratorState)}
          </h5>

          {/* <CustomLoadingOverlay isLoading={isPageLoadingState} /> */}

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
                    style={{ paddingInline: "1px", color: "#017DC0" }}
                  />
                }
                style={{
                  width: 170,
                  fontSize: 14,
                  fontWeight: "bold",
                  borderWidth: 2,
                  marginTop: 10,
                  marginBottom: 4,
                  borderRadius: "30px",
                }}
                placeholder="Código"
                value={verificationCodeCollaboratorState}
                onChange={(e) =>
                  dispatch(setVerificationCodeLoginCollaborator(e.target.value))
                }
                autoComplete="off"
                min={0}
              />
            </Form.Item>

            {isSubmittingConfirm ? (
              <CustomSpin />
            ) : (
              <Button
                key={"confirm-code-button"}
                className="confirm-code-button"
                style={{
                  backgroundColor: "#015E90",
                  color: "#f2f2f2",
                  borderRadius: 31,
                  marginTop: 5,
                  marginBottom: 13,
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

          {/* <div style={{ marginInline: 54 }}>
            <Divider
              style={{
                marginBlock: 13,
                borderWidth: 2,
              }}
            />
          </div>

          <Button
            key="cancel-button-user"
            className="cancel-button-user"
            style={{
              paddingInline: 45,
              backgroundColor: "#e33030",
              color: "#f2f2f2",
              borderRadius: 31,
            }}
            onClick={handleCancel}
          >
            Cancelar
          </Button> */}
        </div>
      </Modal>
    </div>
  );
};

export default CollaboratorModalVerificationCode;
