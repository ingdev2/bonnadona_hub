"use client";

import React, { useEffect, useState } from "react";

import { useAppDispatch, useAppSelector } from "@/redux/hooks";

import CustomMessage from "@/components/common/custom_messages/CustomMessage";
import { Button, Col, Form, Input } from "antd";
import { titleStyleCss } from "@/theme/text_styles";
import PhoneInput, { PhoneNumber } from "antd-phone-input";

import {
  useGetUserActiveByIdNumberQuery,
  useUpdateUserMutation,
} from "@/redux/apis/users/userApi";

import {
  setErrorsUser,
  setIdUser,
  setPersonalCellphoneUser,
  setPersonalEmailUser,
  setPrincipalEmailUser,
} from "@/redux/features/user/userSlice";
import { MdDriveFileRenameOutline } from "react-icons/md";
import { FiPhone } from "react-icons/fi";
import CustomSpin from "@/components/common/custom_spin/CustomSpin";
import { setAdminModalIsOpen } from "@/redux/features/common/modal/modalSlice";
import UserPersonalEditDataFormData from "./UserPersonalEditDataFormData";

const UserPersonalEditDataForm: React.FC = () => {
  const dispatch = useAppDispatch();

  const NOT_REGISTER: string = "NO REGISTRA";

  const idUserState = useAppSelector((state) => state.user.id);
  const idNumberUserState = useAppSelector((state) => state.user.id_number);
  const principalEmailUserState = useAppSelector(
    (state) => state.user.principal_email
  );
  const personalEmailUserState = useAppSelector(
    (state) => state.user.personal_email
  );
  const personalCellphoneUserState = useAppSelector(
    (state) => state.user.personal_cellphone
  );
  const errorsUserState = useAppSelector((state) => state.user.errors);

  const [principalEmailUserLocalState, setPrincipalEmailUserLocalState] =
    useState("");
  const [personalEmailUserLocalState, setPersonalEmailUserLocalState] =
    useState("");

  const [countryCodePersonalCellphone, setCountryCodePersonalCellphone] =
    useState(0);
  const [areaCodePersonalCellphone, setAreaCodePersonalCellphone] =
    useState("");
  const [phoneNumberPersonalCellphone, setPhoneNumberPersonalCellphone] =
    useState("");

  var fullPersonalCellphoneNumber = `${countryCodePersonalCellphone}${areaCodePersonalCellphone}${phoneNumberPersonalCellphone}`;

  const [isSubmittingEditUser, setIsSubmittingEditUser] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [showErrorMessage, setShowErrorMessage] = useState(false);

  const [hasChanges, setHasChanges] = useState(false);

  const [
    updateUser,
    {
      data: updateUserData,
      isLoading: updateUserLoading,
      isSuccess: updateUserSuccess,
      isError: updateUserError,
    },
  ] = useUpdateUserMutation({
    fixedCacheKey: "updateUser",
  });

  const {
    data: userActiveByIdNumberData,
    isLoading: userActiveByIdNumberLoading,
    isFetching: userActiveByIdNumberFetching,
    error: userActiveByIdNumberError,
  } = useGetUserActiveByIdNumberQuery(idNumberUserState);

  useEffect(() => {
    if (!idUserState && idNumberUserState && userActiveByIdNumberData) {
      dispatch(setIdUser(userActiveByIdNumberData?.id));
      dispatch(
        setPrincipalEmailUser(userActiveByIdNumberData?.principal_email)
      );
      dispatch(setPersonalEmailUser(userActiveByIdNumberData?.personal_email));
      dispatch(
        setPersonalCellphoneUser(userActiveByIdNumberData?.personal_cellphone)
      );
    }
  }, [idUserState, idNumberUserState, userActiveByIdNumberData]);

  const handlePersonalCellphoneInputChange = (value: any) => {
    setHasChanges(true);

    if (value) {
      setCountryCodePersonalCellphone(value.countryCode || 0);
      setAreaCodePersonalCellphone(value.areaCode || "");
      setPhoneNumberPersonalCellphone(value.phoneNumber || "");
    }
  };

  const combinePersonalCellphoneDetails = () => {
    return `${areaCodePersonalCellphone}${phoneNumberPersonalCellphone}`;
  };

  const validatorPersonalCellphoneInput = (_: any, value: any) => {
    const combinedPersonalCellphone = combinePersonalCellphoneDetails();

    if (!combinedPersonalCellphone) {
      return Promise.resolve();
    }

    const personalCellphonePattern = /^[0-9]+$/;

    if (
      personalCellphonePattern.test(combinedPersonalCellphone) &&
      combinedPersonalCellphone.length >= 7 &&
      combinedPersonalCellphone.length <= 17
    ) {
      return Promise.resolve();
    }

    return Promise.reject("Número de teléfono inválido");
  };

  const handleChangeEditUser = async (e: React.FormEvent<HTMLFormElement>) => {
    try {
      setIsSubmittingEditUser(true);

      const response: any = await updateUser({
        id: idUserState,
        updateUser: {
          principal_email:
            principalEmailUserLocalState || principalEmailUserState,
          personal_email: personalEmailUserLocalState || personalEmailUserState,
          personal_cellphone:
            parseInt(fullPersonalCellphoneNumber, 10) ||
            personalCellphoneUserState,
        },
      });

      let editUserDataError = response.error;

      let editUserDataStatus = response.data?.statusCode;

      let editUserDataValidationData = response.data?.message;

      if (editUserDataError || editUserDataStatus !== 202) {
        setHasChanges(false);

        const errorMessage = editUserDataError?.data.message;
        const validationDataMessage = editUserDataValidationData;

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

      if (editUserDataStatus === 202 && !editUserDataError) {
        setHasChanges(false);

        dispatch(
          setPrincipalEmailUser(
            principalEmailUserLocalState || principalEmailUserState
          )
        );
        dispatch(
          setPersonalEmailUser(
            personalEmailUserLocalState || personalEmailUserState
          )
        );
        dispatch(
          setPersonalCellphoneUser(
            parseInt(fullPersonalCellphoneNumber, 10) ||
              personalCellphoneUserState
          )
        );
        setSuccessMessage("¡Datos del usuario actualizados correctamente!");
        setShowSuccessMessage(true);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsSubmittingEditUser(false);
    }
  };

  const handleButtonClick = () => {
    dispatch(setErrorsUser([]));
    setShowErrorMessage(false);
    setShowSuccessMessage(false);
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
      {showErrorMessage && (
        <CustomMessage
          typeMessage="error"
          message={errorsUserState?.toString() || "¡Error en la petición!"}
        />
      )}

      {showSuccessMessage && (
        <CustomMessage
          typeMessage="success"
          message={successMessage || "¡Datos actualizados correctamente!"}
        />
      )}

      <UserPersonalEditDataFormData
        principalEmailUserFormData={principalEmailUserState || NOT_REGISTER}
        onChangePrincipalEmailUserFormData={(e) => {
          setHasChanges(true);

          setPrincipalEmailUserLocalState(e.target.value);
        }}
        personalEmailUserFormData={personalEmailUserState || NOT_REGISTER}
        onChangePersonalEmailUserFormData={(e) => {
          setHasChanges(true);

          setPersonalEmailUserLocalState(e.target.value);
        }}
        personalCellphoneFormData={
          (personalCellphoneUserState &&
            personalCellphoneUserState.toString()) ||
          undefined
        }
        onChangePersonalCellphoneFormData={handlePersonalCellphoneInputChange}
        validatorPersonalCellphoneInputFormData={
          validatorPersonalCellphoneInput
        }
        initialValuesEditAdminFormData={{
          "current-edit-user-principal-email":
            principalEmailUserState || NOT_REGISTER,
          "current-edit-user-personal-email":
            personalEmailUserState || NOT_REGISTER,
          "current-edit-user-personal-cellphone":
            personalCellphoneUserState || NOT_REGISTER,
        }}
        handleChangeEditUserFormData={handleChangeEditUser}
        isSubmittingEditUserData={isSubmittingEditUser}
        hasChangesFormData={hasChanges}
        handleButtonClickFormData={handleButtonClick}
      />

      {/* <Form
        id="edit-data-form-user"
        name="edit-data-form-user"
        className="edit-data-form-user"
        onFinish={handleChangeEditUser}
        initialValues={{
          "current-edit-user-principal-email":
            principalEmailUserState || NOT_REGISTER,
          "current-edit-user-personal-email":
            personalEmailUserState || NOT_REGISTER,
          "current-edit-user-personal-cellphone":
            personalCellphoneUserState || NOT_REGISTER,
        }}
        autoComplete="false"
        layout="vertical"
      >
        <h2
          className="title-change-password-admin"
          style={{
            ...titleStyleCss,
            marginBlock: 22,
            textAlign: "center",
          }}
        >
          Actualizar datos de usuario
        </h2>

        <Form.Item
          id="current-edit-user-principal-email"
          name="current-edit-user-principal-email"
          className="current-edit-user-principal-email"
          label="Correo principal:"
          style={{ marginBottom: "13px" }}
          rules={[
            {
              required: true,
              message: "¡Por favor ingrese el correo principal!",
            },
            {
              pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
              message: "¡Por favor ingrese un correo válido!",
            },
          ]}
        >
          <Input
            prefix={
              <MdDriveFileRenameOutline className="site-form-item-icon" />
            }
            type="text"
            value={principalEmailUserState || NOT_REGISTER}
            placeholder="Correo principal"
            onChange={(e) => {
              setHasChanges(true);
              setPrincipalEmailUserLocalState(e.target.value);
            }}
            autoComplete="off"
          />
        </Form.Item>

        <Form.Item
          id="current-edit-user-personal-email"
          name="current-edit-user-personal-email"
          className="current-edit-user-personal-email"
          label="Correo personal:"
          style={{ marginBottom: "13px" }}
          rules={[
            {
              required: true,
              message: "¡Por favor ingrese el correo personal!",
            },
            {
              pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
              message: "¡Por favor ingrese un correo válido!",
            },
          ]}
        >
          <Input
            prefix={
              <MdDriveFileRenameOutline className="site-form-item-icon" />
            }
            type="text"
            value={personalEmailUserState || NOT_REGISTER}
            placeholder="Correo personal"
            onChange={(e) => {
              setHasChanges(true);
              setPersonalEmailUserLocalState(e.target.value);
            }}
            autoComplete="off"
          />
        </Form.Item>

        <Form.Item
          id="current-edit-user-personal-cellphone"
          name="current-edit-user-personal-cellphone"
          className="current-edit-user-personal-cellphone"
          label="Celular personal:"
          style={{ marginBottom: "13px" }}
          normalize={(value) => {
            if (!value || typeof value !== "string") return "";

            return value.replace(/[^\d+]/g, "");
          }}
          rules={[
            {
              required: false,
              message: "¡Por favor ingresa el número de celular personal!",
            },
            {
              validator: validatorPersonalCellphoneInput,
            },
          ]}
        >
          <PhoneInput
            prefix={<FiPhone className="site-form-item-icon" />}
            type="tel"
            value={personalCellphoneUserState.toString()}
            placeholder="Número de celular personal"
            onChange={handlePersonalCellphoneInputChange}
            autoComplete="off"
            min={0}
            enableSearch
          />
        </Form.Item>

        <Form.Item
          style={{
            textAlign: "center",
          }}
        >
          {isSubmittingEditUser ? (
            <CustomSpin />
          ) : (
            <Button
              size="large"
              style={{
                paddingInline: 45,
                borderRadius: 31,
                backgroundColor: !hasChanges ? "#D8D8D8" : "#015E90",
                color: !hasChanges ? "#A0A0A0" : "#f2f2f2",
                marginBlock: 7,
              }}
              htmlType="submit"
              className="edit-data-form-button-user"
              onClick={handleButtonClick}
              disabled={!hasChanges}
            >
              Actualizar datos
            </Button>
          )}
        </Form.Item>
      </Form> */}
    </Col>
  );
};

export default UserPersonalEditDataForm;
