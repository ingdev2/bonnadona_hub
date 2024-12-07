"use client";

import React, { useState } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { useSession } from "next-auth/react";

import { Modal, Input, Button, Form } from "antd";

import CustomSpin from "@/components/common/custom_spin/CustomSpin";
import CustomLoadingOverlay from "@/components/common/custom_loading_overlay/CustomLoadingOverlay";

import CustomMessage from "@/components/common/custom_messages/CustomMessage";
import { setFirstLoginModalIsOpen } from "@/redux/features/common/modal/modalSlice";
import { RiLockPasswordLine } from "react-icons/ri";
import { useGetUserActiveByIdNumberQuery, useUpdateUserPasswordMutation } from "@/redux/apis/users/userApi";
import { setErrorsUser, setLastPasswordUpdateUser } from "@/redux/features/user/userSlice";

const ChangePasswordModal: React.FC<{
  titleModal: string;
  subtitleModal: string;
}> = ({ titleModal, subtitleModal }) => {
  const { data: session, status } = useSession();
  const dispatch = useAppDispatch();

  const userIdNumber = session?.user.id_number;

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

  const {
    data: userActiveDatabyIdNumberData,
    isLoading: userActiveDatabyIdNumberLoading,
    isFetching: userActiveDatabyIdNumberFetching,
    isError: userActiveDatabyIdNumberError,
    refetch: userActiveDatabyIdNumberRefetch,
  } = useGetUserActiveByIdNumberQuery(userIdNumber ?? 0, {
    skip: !userIdNumber,
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

        let editPasswordDataError = response.error;
        let editPasswordDataStatus = response.data?.status;
        let editPasswordDataValidationData = response.data?.message;

        if (editPasswordDataError || editPasswordDataStatus != 202) {
          const errorMessage = editPasswordDataError?.data?.message;
          const validationDataMessage = editPasswordDataValidationData;

          if (Array.isArray(errorMessage)) {
            dispatch(setErrorsUser(errorMessage[0]));

            setShowErrorMessage(true);
          } else if (typeof errorMessage === "string") {
            dispatch(setErrorsUser(errorMessage));

            setShowErrorMessage(true);
          }

          if (Array.isArray(validationDataMessage)) {
            dispatch(setErrorsUser(validationDataMessage[0]));

            setShowErrorMessage(true);
          } else if (typeof validationDataMessage === "string") {
            dispatch(setErrorsUser(validationDataMessage));

            setShowErrorMessage(true);
          }
        }

        if (editPasswordDataStatus === 202 && !editPasswordDataError) {
          // userActiveDatabyIdNumberRefetch()
          setShowSuccessMessage(true);
          setSuccessMessage(response?.data.message);

          dispatch(setFirstLoginModalIsOpen(false));
          // dispatch(
          //   setLastPasswordUpdateUser(
          //     userActiveDatabyIdNumberData?.last_password_update
          //   )
          // );
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
