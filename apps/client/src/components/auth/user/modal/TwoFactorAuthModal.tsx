"use client";

import React, { useState } from "react";

import { Modal, Input, Button, Typography, Space, Form, Divider } from "antd";
import Link from "next/link";

import { MdPassword } from "react-icons/md";
import { TbPasswordUser } from "react-icons/tb";

import CustomButton from "@/components/common/custom_button/CustomButton";
import CustomSpin from "@/components/common/custom_spin/CustomSpin";
import CustomLoadingOverlay from "@/components/common/custom_loading_overlay/CustomLoadingOverlay";
import CountdownTimer from "@/components/common/countdown_timer/CountdownTimer";

import { maskEmail } from "@/helpers/mask_email/mask_email";

const { Title } = Typography;

interface TwoFactorAuthModalProps {
  visible: boolean;
  onClose: () => void;
  onVerify: (code: string) => void;
}

const TwoFactorAuthModal: React.FC<TwoFactorAuthModalProps> = ({
  visible,
  onClose,
  onVerify,
}) => {
  const [code, setCode] = useState("");

  const [isSubmittingConfirm, setIsSubmittingConfirm] = useState(false);
  const [isSubmittingResendCode, setIsSubmittingResendCode] = useState(false);

  const [resendCodeDisable, setResendCodeDisable] = useState(true);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCode(e.target.value);
  };

  const handleSubmit = () => {
    onVerify(code);
  };

  const handleResentCode = () => {};

  const handleCancel = () => {
    <Link href="/login" scroll={false} />;
    window.location.reload();
  };

  const handleButtonClick = () => {};

  return (
    <div>
      <Modal
        className="modal-verification-code"
        open={visible}
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
            {maskEmail("andressierra@gmail.com")}
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
                type="tel"
                placeholder="Código"
                onChange={(e) => ({})}
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

export default TwoFactorAuthModal;
