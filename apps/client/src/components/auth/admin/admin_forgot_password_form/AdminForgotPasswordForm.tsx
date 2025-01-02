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

const AdminForgotPasswordForm: React.FC<{
  setOpenModalForgotPassword: (value: React.SetStateAction<boolean>) => void;
}> = ({ setOpenModalForgotPassword }) => {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const errorAdminState = useAppSelector((state) => state.user.errors);

  const [linkToResetPasswordSent, setLinkToResetPasswordSent] = useState(false);
  const [isSubmittingGoToLogin, setIsSubmittingGoToLogin] = useState(false);

  const [idTypesListAdminLocalState, setIdTypesListAdminLocalState] = useState<
    IdType[] | undefined
  >([]);

  const [idTypeAdminLocalState, setIdTypeAdminLocalState] = useState(0);
  const [idNumberAdminLocalState, setIdNumberAdminLocalState] = useState("");
  const [birthdateAdminLocalState, setBirthdateAdminLocalState] = useState("");

  const [emailAdminLocalState, setEmailAdminLocalState] = useState<
    string | undefined
  >("");

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
    forgotPasswordAdmin,
    {
      data: forgotPasswordAdminData,
      isLoading: forgotPasswordAdminLoading,
      isSuccess: forgotPasswordAdminSuccess,
      isError: forgotPasswordAdminError,
    },
  ] = useForgotUserPasswordMutation({
    fixedCacheKey: "forgotPasswordAdminData",
  });

  const idNumberAdminLocalStateInt = idNumberAdminLocalState
    ? parseInt(idNumberAdminLocalState?.toString(), 10)
    : 0;

  const {
    data: userActiveDatabyIdNumberData,
    isLoading: isUserActiveLoading,
    isFetching: isUserActiveFetching,
    isError: isUserActiveError,
  } = useGetUserActiveByIdNumberQuery(idNumberAdminLocalStateInt);

  const {
    data: idTypesAdminData,
    isLoading: idTypesAdminLoading,
    isFetching: idTypesAdminFetching,
    error: idTypesAdminError,
  } = useGetAllIdTypesQuery(null);

  useEffect(() => {
    if (userActiveDatabyIdNumberData) {
      setEmailAdminLocalState(userActiveDatabyIdNumberData?.principal_email);
    }

    if (!idTypesAdminLoading && !idTypesAdminFetching && idTypesAdminData) {
      setIdTypesListAdminLocalState(idTypesAdminData);
    }

    if (idTypesAdminError) {
      dispatch(
        setErrorsUser("¡No se pudo obtener los tipos de identificación!")
      );
    }
  }, [userActiveDatabyIdNumberData, idTypesAdminData, idNumberAdminLocalState]);

  const handleChangePassword = async (e: React.FormEvent<HTMLFormElement>) => {
    try {
      setIsSubmittingForgotPassword(true);

      if (
        idTypeAdminLocalState &&
        idNumberAdminLocalState &&
        birthdateAdminLocalState
      ) {
        const idNumberAdminLocalStateInt = idNumberAdminLocalState
          ? parseInt(idNumberAdminLocalState?.toString(), 10)
          : 0;

        const response: any = await forgotPasswordAdmin({
          forgotUserPassword: {
            user_id_type: idTypeAdminLocalState,
            id_number: idNumberAdminLocalStateInt,
            birthdate: birthdateAdminLocalState,
          },
        });

        let validationAdminData = response.data?.status;

        let validationAdminError = response.error?.status;

        if (validationAdminError !== 200 && !validationAdminData) {
          const errorMessage = response.error?.data?.message;

          dispatch(setErrorsUser(errorMessage));
          setShowErrorMessageForgotPassword(true);
        }
        if (validationAdminData === 202 && !validationAdminError) {
          const successMessage = response.data?.message;

          setSuccessMessageForgotPassword(successMessage);
          setShowSuccessMessageForgotPassword(true);
          setLinkToResetPasswordSent(true);

          setIdTypeAdminLocalState(0);
          setIdNumberAdminLocalState("");
          setBirthdateAdminLocalState("");
        }
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsSubmittingForgotPassword(false);
    }
  };

  const onChangeDate: DatePickerProps["onChange"] = (date, dateString) => {
    setBirthdateAdminLocalState(dateString.toString());
  };

  const handleGoToLogin = async () => {
    try {
      setIsSubmittingGoToLogin(true);

      await new Promise((resolve) => setTimeout(resolve, 700));

      await router.replace("/login_admin", {
        scroll: false,
      });

      setEmailAdminLocalState("");

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
          message={errorAdminState?.toString() || "¡Error en la petición!"}
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
              <b>{maskEmail(emailAdminLocalState)}</b> un link para restablecer
              su contraseña de ingreso.
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

          {idTypesAdminLoading || idTypesAdminFetching ? (
            <CustomSpin />
          ) : (
            <>
              <Form.Item
                name="user-id-type-forgot-password-admin"
                label="Tipo de identificación del administrador"
                style={{ marginBottom: "13px" }}
                rules={[
                  {
                    required: true,
                    message: "¡Por favor ingresa tu tipo de identificación!",
                  },
                ]}
              >
                <Select
                  value={idTypeAdminLocalState}
                  placeholder="Tipo de identificación"
                  onChange={(e) => setIdTypeAdminLocalState(e)}
                >
                  {idTypesListAdminLocalState?.map((option: any) => (
                    <Select.Option key={option.id} value={option.id}>
                      {option.name}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>

              <Form.Item
                name="user-id-number-forgot-password-admin"
                label="Número de identificación del administrador"
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
                  value={idNumberAdminLocalState}
                  placeholder="Número de identificación"
                  onChange={(e) => setIdNumberAdminLocalState(e.target.value)}
                  autoComplete="off"
                  min={0}
                />
              </Form.Item>

              <Form.Item
                name="date-picker-forgot-password-admin"
                label="Fecha de nacimiento del administrador"
                style={{ marginBottom: "13px" }}
                rules={[
                  {
                    required: true,
                    validator: validateRequiredDate(
                      birthdateAdminLocalState,
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
                    size="middle"
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

export default AdminForgotPasswordForm;
