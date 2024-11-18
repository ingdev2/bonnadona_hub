"use client";

import React, { useEffect, useState } from "react";

import { useAppDispatch, useAppSelector } from "@/redux/hooks";

import { useRouter } from "next/navigation";

import { subtitleStyleCss, titleStyleCss } from "@/theme/text_styles";
import { Button, Col, Form, Input, Select } from "antd";

import CustomResultOneButton from "@/components/common/custom_result_one_button/CustomResultOneButton";

import { maskEmail } from "@/helpers/mask_email/mask_email";
import {
  useForgotUserPasswordMutation,
  useGetUserActiveByIdNumberQuery,
} from "@/redux/apis/users/userApi";
import { useGetAllIdTypesQuery } from "@/redux/apis/id_types/idTypesApi";
import { setErrorsUser } from "@/redux/features/user/userSlice";
import { DatePickerProps } from "antd";
import CustomMessage from "@/components/common/custom_messages/CustomMessage";
import CustomSpin from "@/components/common/custom_spin/CustomSpin";
import { IdcardOutlined } from "@ant-design/icons";
import CustomDatePicker from "@/components/common/custom_date_picker/CustomDatePicker";
import { validateRequiredDate } from "@/helpers/validate_required_values/validate_required_files";

const UserForgotPasswordForm: React.FC<{
  setOpenModalForgotPassword: (value: React.SetStateAction<boolean>) => void;
}> = ({ setOpenModalForgotPassword }) => {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const errorCollaboratorState = useAppSelector((state) => state.user.errors);

  const [linkToResetPasswordSent, setLinkToResetPasswordSent] = useState(false);
  const [isSubmittingGoToLogin, setIsSubmittingGoToLogin] = useState(false);

  const [
    idTypesListCollaboratorLocalState,
    setIdTypesListCollaboratorLocalState,
  ] = useState<IdType[] | undefined>([]);

  const [idTypeCollaboratorLocalState, setIdTypeCollaboratorLocalState] =
    useState(0);
  const [idNumberCollaboratorLocalState, setIdNumberCollaboratorLocalState] =
    useState("");
  const [birthdateCollaboratorLocalState, setBirthdateCollaboratorLocalState] =
    useState("");

  const [emailCollaboratorLocalState, setEmailCollaboratorLocalState] =
    useState<string | undefined>("");

  const [isSubmittingForgotPassword, setIsSubmittingForgotPassword] =
    useState(false);
  const [successMessageForgotPassword, setSuccessMessageForgotPassword] =
    useState("");
  const [
    showSuccessMessageForgotPassword,
    setShowSuccessMessageForgotPassword,
  ] = useState(false);
  const [showErrorMessageForgotPassword, setShowErrorMessageForgotPassword] =
    useState(false);

  const [
    forgotPasswordCollaborator,
    {
      data: forgotPasswordCollaboratorData,
      isLoading: forgotPasswordCollaboratorLoading,
      isSuccess: forgotPasswordCollaboratorSuccess,
      isError: forgotPasswordCollaboratorError,
    },
  ] = useForgotUserPasswordMutation({
    fixedCacheKey: "forgotPasswordCollaboratorData",
  });

  const idNumberCollaboratorLocalStateInt = idNumberCollaboratorLocalState
    ? parseInt(idNumberCollaboratorLocalState?.toString(), 10)
    : 0;

  const {
    data: userActiveDatabyIdNumberData,
    isLoading: isUserActiveLoading,
    isFetching: isUserActiveFetching,
    isError: isUserActiveError,
  } = useGetUserActiveByIdNumberQuery(idNumberCollaboratorLocalStateInt);

  const {
    data: idTypesCollaboratorData,
    isLoading: idTypesCollaboratorLoading,
    isFetching: idTypesCollaboratorFetching,
    error: idTypesCollaboratorError,
  } = useGetAllIdTypesQuery(null);

  useEffect(() => {
    if (userActiveDatabyIdNumberData) {
      setEmailCollaboratorLocalState(userActiveDatabyIdNumberData?.principal_email);
    }

    if (
      !idTypesCollaboratorLoading &&
      !idTypesCollaboratorFetching &&
      idTypesCollaboratorData
    ) {
      setIdTypesListCollaboratorLocalState(idTypesCollaboratorData);
    }

    if (idTypesCollaboratorError) {
      dispatch(
        setErrorsUser("¡No se pudo obtener los tipos de identificación!")
      );
    }
  }, [
    userActiveDatabyIdNumberData,
    idTypesCollaboratorData,
    idNumberCollaboratorLocalState,
  ]);

  const handleChangePassword = async (e: React.FormEvent<HTMLFormElement>) => {
    try {
      setIsSubmittingForgotPassword(true);

      if (
        idTypeCollaboratorLocalState &&
        idNumberCollaboratorLocalState &&
        birthdateCollaboratorLocalState
      ) {
        const idNumberCollaboratorLocalStateInt = idNumberCollaboratorLocalState
          ? parseInt(idNumberCollaboratorLocalState?.toString(), 10)
          : 0;

        const response: any = await forgotPasswordCollaborator({
          forgotUserPassword: {
            user_id_type: idTypeCollaboratorLocalState,
            id_number: idNumberCollaboratorLocalStateInt,
            birthdate: birthdateCollaboratorLocalState,
          },
        });

        let validationCollaboratorData = response.data?.status;

        let validationCollaboratorError = response.error?.status;

        if (
          validationCollaboratorError !== 200 &&
          !validationCollaboratorData
        ) {
          const errorMessage = response.error?.data?.message;

          dispatch(setErrorsUser(errorMessage));
          setShowErrorMessageForgotPassword(true);
        }
        if (
          validationCollaboratorData === 202 &&
          !validationCollaboratorError
        ) {
          const successMessage = response.data?.message;

          setSuccessMessageForgotPassword(successMessage);
          setShowSuccessMessageForgotPassword(true);
          setLinkToResetPasswordSent(true);

          setIdTypeCollaboratorLocalState(0);
          setIdNumberCollaboratorLocalState("");
          setBirthdateCollaboratorLocalState("");
        }
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsSubmittingForgotPassword(false);
    }
  };

  const onChangeDate: DatePickerProps["onChange"] = (date, dateString) => {
    setBirthdateCollaboratorLocalState(dateString.toString());
  };

  const handleGoToLogin = async () => {
    try {
      setIsSubmittingGoToLogin(true);

      await new Promise((resolve) => setTimeout(resolve, 700));

      await router.replace("/login", {
        scroll: false,
      });

      setEmailCollaboratorLocalState("");

      setOpenModalForgotPassword(false);
    } catch (error) {
      console.error(error);
    } finally {
      setIsSubmittingGoToLogin(false);
    }
  };

  const handleButtonClick = () => {
    dispatch(setErrorsUser([]));
    setShowErrorMessageForgotPassword(false);
    setShowSuccessMessageForgotPassword(false);
  };

  return (
    <Col
      xs={24}
      sm={24}
      md={24}
      lg={24}
      style={{
        width: "100%",
        padding: "0 7px",
        margin: "0px",
      }}
    >
      {showErrorMessageForgotPassword && (
        <CustomMessage
          typeMessage="error"
          message={
            errorCollaboratorState?.toString() || "¡Error en la petición!"
          }
        />
      )}

      {showSuccessMessageForgotPassword && (
        <CustomMessage
          typeMessage="success"
          message={
            successMessageForgotPassword?.toString() ||
            "¡Link para reestablecer contraseña enviado al correo eléctronico registrado por el usuario!"
          }
        />
      )}

      {linkToResetPasswordSent ? (
        <CustomResultOneButton
          key={"link-to-reset-password-sent-success-custom-result-user"}
          statusTypeResult={"success"}
          titleCustomResult="¡Link para restablecer contraseña enviado!"
          subtitleCustomResult={
            <p>
              Se ha enviado al correo eléctronico{" "}
              <b>{maskEmail(emailCollaboratorLocalState)}</b> un link para
              restablecer su contraseña de ingreso.
            </p>
          }
          handleClickCustomResult={handleGoToLogin}
          isSubmittingButton={isSubmittingGoToLogin}
          textButtonCustomResult="Volver al login"
        />
      ) : (
        <Form
          id="forgot-password-form-user"
          name="forgot-password-form-user"
          className="forgot-password-form-user"
          onFinish={handleChangePassword}
          initialValues={{ remember: false }}
          autoComplete="false"
          layout="vertical"
        >
          <h2
            className="title-forgot-password-user"
            style={{
              ...titleStyleCss,
              marginBlock: 22,
              textAlign: "center",
            }}
          >
            Cambio de contraseña
          </h2>
          <h4
            className="title-forgot-password-user"
            style={{
              ...subtitleStyleCss,
              marginBlock: 22,
              textAlign: "center",
            }}
          >
            Enviaremos un acceso para que cambies tu contraseña, al correo
            eléctronico registrado en tu usuario
          </h4>

          {idTypesCollaboratorLoading || idTypesCollaboratorFetching ? (
            <CustomSpin />
          ) : (
            <>
              <Form.Item
                name="user-id-type-forgot-password-collaborator"
                label="Tipo de identificación del usuario"
                style={{ marginBottom: "13px" }}
                rules={[
                  {
                    required: true,
                    message: "¡Por favor ingresa tu tipo de identificación!",
                  },
                ]}
              >
                <Select
                  value={idTypeCollaboratorLocalState}
                  placeholder="Tipo de identificación"
                  onChange={(e) => setIdTypeCollaboratorLocalState(e)}
                >
                  {idTypesListCollaboratorLocalState?.map((option: any) => (
                    <Select.Option key={option.id} value={option.id}>
                      {option.name}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>

              <Form.Item
                name="user-id-number-forgot-password-collaborator"
                label="Número de identificación del usuario"
                style={{ marginBottom: 7 }}
                normalize={(value) => {
                  if (!value) return "";

                  return value.replace(/[^0-9]/g, "");
                }}
                rules={[
                  {
                    required: true,
                    message: "¡Por favor ingresa tu número de identificación!",
                  },
                  {
                    pattern: /^[0-9]+$/,
                    message:
                      "¡Por favor ingresa número de identificación sin puntos, ni comas!",
                  },
                  {
                    min: 7,
                    message: "¡Por favor ingresa mínimo 7 números!",
                  },
                  {
                    max: 11,
                    message: "¡Por favor ingresa máximo 11 números!",
                  },
                ]}
              >
                <Input
                  prefix={<IdcardOutlined className="site-form-item-icon" />}
                  type="tel"
                  value={idNumberCollaboratorLocalState}
                  placeholder="Número de identificación"
                  onChange={(e) =>
                    setIdNumberCollaboratorLocalState(e.target.value)
                  }
                  autoComplete="off"
                  min={0}
                />
              </Form.Item>

              <Form.Item
                name="date-picker-forgot-password-collaborator"
                label="Fecha de nacimiento del usuario"
                style={{ marginBottom: "13px" }}
                rules={[
                  {
                    required: true,
                    validator: validateRequiredDate(
                      birthdateCollaboratorLocalState,
                      "¡Por favor seleccionar la fecha de nacimiento!"
                    ),
                  },
                ]}
              >
                <CustomDatePicker onChangeDateCustomDatePicker={onChangeDate} />
              </Form.Item>

              <Form.Item
                style={{
                  textAlign: "center",
                }}
              >
                {isSubmittingForgotPassword ? (
                  <CustomSpin />
                ) : (
                  <Button
                    style={{
                      paddingInline: 45,
                      borderRadius: "30px",
                      backgroundColor: "#015E90",
                      color: "#f2f2f2",
                      marginTop: "13px",
                    }}
                    htmlType="submit"
                    className="forgot-password-form-button-patient"
                    onClick={handleButtonClick}
                  >
                    Enviar
                  </Button>
                )}
              </Form.Item>
            </>
          )}
        </Form>
      )}
    </Col>
  );
};

export default UserForgotPasswordForm;
