"use client";

import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";

import { Modal, Input, Button, Form } from "antd";

import CustomSpin from "@/components/common/custom_spin/CustomSpin";
import CustomLoadingOverlay from "@/components/common/custom_loading_overlay/CustomLoadingOverlay";

import CustomMessage from "@/components/common/custom_messages/CustomMessage";
import { setErrorsLoginUser } from "@/redux/features/login/userLoginSlice";
import {
  setFirstLoginModalIsOpen,
  setIsPageLoading,
} from "@/redux/features/common/modal/modalSlice";
import { RiLockPasswordLine } from "react-icons/ri";
import { useUpdateUserPasswordMutation } from "@/redux/apis/users/userApi";
import { setErrorsUser } from "@/redux/features/user/userSlice";

const ChangePasswordModal: React.FC<{
  titleModal: string;
  subtitleModal: string;
}> = ({ titleModal, subtitleModal }) => {
  const dispatch = useAppDispatch();

  const modalIsOpenFirstSuccessfullCollaboratorLogin = useAppSelector(
    (state) => state.modal.firstSuccessLoginModalIsOpen
  );

  const isPageLoadingState = useAppSelector(
    (state) => state.modal.isPageLoading
  );

  const idUserCollaboratorState = useAppSelector((state) => state.user.id);

  const errorsUserState = useAppSelector((state) => state.user.errors);

  const [isSubmittingConfirm, setIsSubmittingConfirm] = useState(false);

  const [currentPasswordLocalState, setCurrentPasswordLocalState] =
    useState("");
  const [newPasswordLocalState, setNewPasswordLocalState] = useState("");

  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [showErrorMessage, setShowErrorMessage] = useState(false);

  const [
    updateUserPasswordData,
    {
      data: updateUserPasswordMainData,
      isLoading: updateUserPasswordLoading,
      isSuccess: updateUserPasswordSuccess,
      isError: updateUserPasswordError,
    },
  ] = useUpdateUserPasswordMutation({
    fixedCacheKey: "updateUserPasswordData",
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    try {
      setIsSubmittingConfirm(true);

      if (
        idUserCollaboratorState &&
        currentPasswordLocalState &&
        newPasswordLocalState
      ) {
        const response: any = await updateUserPasswordData({
          id: idUserCollaboratorState,
          passwords: {
            oldPassword: currentPasswordLocalState,
            newPassword: newPasswordLocalState,
          },
        });

        let isResponseError = response.error;

        if (isResponseError) {
          const errorMessage = isResponseError?.data?.message;

          dispatch(setErrorsUser(errorMessage));
          setShowErrorMessage(true);
          setIsSubmittingConfirm(false);
        }

        if (!isResponseError && !isResponseError) {
          setShowSuccessMessage(true);
          setSuccessMessage(response?.data.message);

          dispatch(setFirstLoginModalIsOpen(false));
        }
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsSubmittingConfirm(false);
    }
  };

  const handleButtonClick = () => {
    dispatch(setErrorsUser([]));
    setShowErrorMessage(false);
    setShowSuccessMessage(false);
  };

  return (
    <div className="change-password-modal">
      {showErrorMessage && (
        <CustomMessage
          typeMessage="error"
          message={errorsUserState?.toString() || "¡Contraseña incorrecta!"}
        />
      )}

      {showSuccessMessage && (
        <CustomMessage
          typeMessage="success"
          message={successMessage || "¡Contraseña actualizada!"}
        />
      )}

      <div className="modal-verification-code">
        <Modal
          className="modal-verification-code"
          open={modalIsOpenFirstSuccessfullCollaboratorLogin}
          confirmLoading={isSubmittingConfirm}
          destroyOnClose={true}
          width={371}
          footer={null}
          maskClosable={false}
          closable={false}
          centered
        >
          <div
            className="content-modal"
            style={{
              textAlign: "center",
              flexDirection: "column",
              alignItems: "center",
              marginBlock: "10px",
              marginInline: "7px",
            }}
          >
            <h2
              className="title-modal"
              style={{
                fontWeight: "500",
                lineHeight: 1.3,
                marginBottom: "7px",
                overflow: "hidden",
                textOverflow: "ellipsis",
                marginTop: "27px",
                textAlign: "center",
              }}
            >
              {titleModal}
            </h2>
            <h4
              className="subtitle-modal"
              style={{
                fontWeight: "400",
                lineHeight: 1.3,
                marginTop: 0,
                marginBottom: "7px",
                overflow: "hidden",
                textOverflow: "ellipsis",
                marginBlock: "7px",
              }}
            >
              {subtitleModal}
            </h4>

            <CustomLoadingOverlay isLoading={isPageLoadingState} />

            <Form
              id="form-update-password-modal"
              name="form-update-password-modal"
              initialValues={{ remember: false }}
              autoComplete="false"
              onFinish={handleSubmit}
            >
              <Form.Item
                id="current-password-form"
                className="current-password-form"
                name={"current-password-form"}
                style={{ textAlign: "center" }}
                rules={[
                  {
                    required: true,
                    message: "Por favor ingrese su contraseña actual",
                  },
                ]}
              >
                <Input
                  id="current-password-input"
                  className="current-password-input"
                  type="password"
                  prefix={
                    <RiLockPasswordLine
                      className="current-password-item-icon"
                      style={{ paddingInline: "1px", color: "#3F97AF" }}
                    />
                  }
                  style={{
                    width: "100%",
                    fontSize: "14px",
                    borderWidth: "2px",
                    marginTop: "10px",
                    borderRadius: "30px",
                  }}
                  placeholder="Contraseña actual"
                  value={currentPasswordLocalState}
                  onChange={(e) => setCurrentPasswordLocalState(e.target.value)}
                  autoComplete="off"
                  min={0}
                />
              </Form.Item>

              <Form.Item
                id="new-password-form"
                className="new-password-form"
                name={"new-password-form"}
                style={{ textAlign: "center" }}
                rules={[
                  {
                    required: true,
                    message: "Por favor ingrese su contraseña nueva",
                  },
                ]}
              >
                <Input
                  id="new-password-input"
                  className="new-password-input"
                  type="password"
                  prefix={
                    <RiLockPasswordLine
                      className="new-password-item-icon"
                      style={{ paddingInline: "1px", color: "#3F97AF" }}
                    />
                  }
                  style={{
                    width: "100%",
                    fontSize: "14px",
                    borderWidth: "2px",
                    marginBottom: "4px",
                    borderRadius: "30px",
                  }}
                  placeholder="Contraseña nueva"
                  value={newPasswordLocalState}
                  onChange={(e) => setNewPasswordLocalState(e.target.value)}
                  autoComplete="off"
                  min={0}
                />
              </Form.Item>

              {isSubmittingConfirm ? (
                <CustomSpin />
              ) : (
                <Button
                  key={"update-password-button"}
                  className="update-password-button"
                  disabled={isPageLoadingState}
                  style={{
                    backgroundColor: isPageLoadingState ? "#D8D8D8" : "#015E90",
                    color: isPageLoadingState ? "#A0A0A0" : "#f2f2f2",
                    borderRadius: "31px",
                    marginBottom: "13px",
                  }}
                  htmlType="submit"
                  onClick={handleButtonClick}
                >
                  Actualizar
                </Button>
              )}
            </Form>
          </div>
        </Modal>
      </div>
    </div>
  );
};

export default ChangePasswordModal;
