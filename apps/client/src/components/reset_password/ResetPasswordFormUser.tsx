"use client";

import React, { useState } from "react";
import { useAppDispatch } from "@/redux/hooks";
import { useRouter, useSearchParams } from "next/navigation";

import { Button, Card, Col, Form, Input, Select } from "antd";
import { titleStyleCss } from "@/theme/text_styles";

import CustomResultOneButton from "../common/custom_result_one_button/CustomResultOneButton";
import CustomSpin from "@/components/common/custom_spin/CustomSpin";
import CustomMessage from "@/components/common/custom_messages/CustomMessage";

import { LockOutlined } from "@ant-design/icons";
import { useResetUserPasswordMutation } from "@/redux/apis/users/userApi";

const ResetPasswordFormUser = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const searchParams = useSearchParams();

  const verifyToken = searchParams?.getAll("token");

  const [newPasswordResetLocalState, setNewPasswordResetLocalState] =
    useState("");

  const [resetPasswordIsSuccess, setResetPasswordIsSuccess] = useState(false);
  const [isSubmittingGoToLogin, setIsSubmittingGoToLogin] = useState(false);

  const [isSubmittingChangePassword, setIsSubmittingChangePassword] =
    useState(false);
  const [errorMessageResetPassword, setErrorMessageResetPassword] = useState<
    string[]
  >([]);
  const [showSuccessMessageResetPassword, setShowSuccessMessageResetPassword] =
    useState(false);
  const [showErrorMessageResetPassword, setShowErrorMessageResetPassword] =
    useState(false);

  const [
    resetPasswordUsers,
    {
      data: resetPasswordUsersData,
      isLoading: resetPasswordUsersLoading,
      isSuccess: resetPasswordUsersSuccess,
      isError: resetPasswordUsersError,
    },
  ] = useResetUserPasswordMutation({
    fixedCacheKey: "resetPasswordUsersData",
  });

  const handleResetPassword = async (e: React.FormEvent<HTMLFormElement>) => {
    try {
      setIsSubmittingChangePassword(true);

      if (verifyToken && newPasswordResetLocalState) {
        const response: any = await resetPasswordUsers({
          token: String(verifyToken),
          newPassword: newPasswordResetLocalState,
        });

        let validationResetPasswordData = response.data?.status;

        let validationResetPasswordError = response.error?.status;

        if (
          validationResetPasswordError !== 200 &&
          !validationResetPasswordData
        ) {
          const errorMessage = response.error?.data?.message;

          setErrorMessageResetPassword(errorMessage);
          setShowErrorMessageResetPassword(true);
        }

        if (
          validationResetPasswordData === 202 &&
          !validationResetPasswordError
        ) {
          setShowSuccessMessageResetPassword(true);

          setResetPasswordIsSuccess(true);

          setNewPasswordResetLocalState("");
        }
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsSubmittingChangePassword(false);
    }
  };

  const handleGoToLogin = async () => {
    try {
      setIsSubmittingGoToLogin(true);

      await new Promise((resolve) => setTimeout(resolve, 700));

      await router.replace("/login", {
        scroll: false,
      });
    } catch (error) {
      console.error(error);
    } finally {
      setIsSubmittingGoToLogin(false);
    }
  };

  const handleButtonClick = () => {
    setErrorMessageResetPassword([]);
    setShowErrorMessageResetPassword(false);
    setShowSuccessMessageResetPassword(false);
  };

  return (
    <Col
      xs={24}
      sm={24}
      md={24}
      lg={24}
      style={{
        width: "100vw",
        padding: "0 2px",
        maxWidth: "450px",
        minWidth: "231px",
      }}
    >
      <Card
        style={{
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#fcfcfc",
          boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.2)",
          marginBottom: "31px",
          marginInline: "22px",
        }}
      >
        {showErrorMessageResetPassword && (
          <CustomMessage
            typeMessage="error"
            message={
              errorMessageResetPassword?.toString() || "¡Error en la petición!"
            }
          />
        )}

        {showSuccessMessageResetPassword && (
          <CustomMessage
            typeMessage="success"
            message={"¡Contraseña restablecida correctamente!"}
          />
        )}

        {resetPasswordIsSuccess ? (
          <CustomResultOneButton
            key={"reset-password-success-custom-result"}
            statusTypeResult={"success"}
            titleCustomResult="¡Contraseña restablecida exitosamente!"
            subtitleCustomResult="Su contraseña ha sido restablecida correctamente, lo invitamos a ingresar a la plataforma."
            handleClickCustomResult={handleGoToLogin}
            isSubmittingButton={isSubmittingGoToLogin}
            textButtonCustomResult="Ingresar a bonnadona HUB"
          />
        ) : (
          <Form
            id="reset-password-form-users"
            name="reset-password-form-users"
            className="reset-password-form-users"
            onFinish={handleResetPassword}
            initialValues={{ remember: false }}
            autoComplete="false"
            layout="vertical"
          >
            <h2
              className="title-reset-password-users"
              style={{
                ...titleStyleCss,
                marginBlock: 22,
                textAlign: "center",
              }}
            >
              Restablecimiento de contraseña{" "}
            </h2>

            <Form.Item
              id="new-reset-password-users"
              name="new-reset-password-users"
              className="new-reset-password-users"
              label="Contraseña nueva"
              style={{ marginBottom: 13 }}
              rules={[
                {
                  required: true,
                  message: "¡Por favor ingresa tu contraseña nueva!",
                },
              ]}
              hasFeedback
            >
              <Input.Password
                prefix={<LockOutlined className="site-form-item-icon" />}
                type="password"
                value={newPasswordResetLocalState}
                placeholder="Contraseña nueva"
                onChange={(e) => {
                  setNewPasswordResetLocalState(e.target.value.trim());
                }}
              />
            </Form.Item>

            <Form.Item
              id="verify-new-reset-password-users"
              name="verify-new-reset-password-users"
              className="verify-new-reset-password-users"
              label="Verificar contraseña nueva"
              style={{ marginBottom: 22 }}
              dependencies={["new-reset-password-users"]}
              rules={[
                {
                  required: true,
                  message: "¡Por favor verifica tu contraseña!",
                },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (
                      !value ||
                      getFieldValue("new-reset-password-users") === value
                    ) {
                      return Promise.resolve();
                    }
                    return Promise.reject("Las contraseñas no coinciden.");
                  },
                }),
              ]}
              hasFeedback
            >
              <Input.Password
                prefix={<LockOutlined className="site-form-item-icon" />}
                type="password"
                value={newPasswordResetLocalState}
                placeholder="Verificar contraseña nueva"
                onChange={(e) => {
                  setNewPasswordResetLocalState(e.target.value.trim());
                }}
              />
            </Form.Item>

            <Form.Item
              style={{
                textAlign: "center",
              }}
            >
              {isSubmittingChangePassword ? (
                <CustomSpin />
              ) : (
                <Button
                  size="middle"
                  style={{
                    paddingInline: 45,
                    borderRadius: 31,
                    backgroundColor: "#015E90",
                    color: "#f2f2f2",
                    marginBlock: 7,
                  }}
                  htmlType="submit"
                  className="reset-password-form-button-users"
                  onClick={handleButtonClick}
                >
                  Restablecer contraseña
                </Button>
              )}
            </Form.Item>
          </Form>
        )}
      </Card>
    </Col>
  );
};

export default ResetPasswordFormUser;
