"use client";

import React from "react";

import { Col, Form, Input, Row, Switch, Typography } from "antd";

import { titleStyleCss } from "@/theme/text_styles";

import { MdOutlineBlock } from "react-icons/md";
import { TbPasswordUser } from "react-icons/tb";
import { IoMdTimer } from "react-icons/io";
import { FaArrowsAltH, FaHistory } from "react-icons/fa";

import CustomButton from "@/components/common/custom_button/CustomButton";

const ManagePasswordFormData: React.FC<{
  minLenghtPasswordFormData: number;
  requireUpperCasePasswordFormData: boolean;
  requireLowerCasePasswordFormData: boolean;
  requireNumbersPasswordFormData: boolean;
  requireSpecialCharactersFormData: boolean;
  passwordExpiryDaysFormData: number;
  inactivityDaysFormData: number;
  passwordHistoryLimitFormData: number;
  maximunMinutesInactivityInAppFormData: number;
  updatePasswordPolicyLoading: boolean;
  setMinLenghtPasswordLocalState: (value: number) => void;
  setPasswordExpiryDaysLocalState: (value: number) => void;
  setInactivityDaysLocalState: (value: number) => void;
  setPasswordHistoryLimitLocalState: (value: number) => void;
  setMaximunMinutesInactivityInAppLocalState: (value: number) => void;
  setRequireUpperCaseLocalState: (value: boolean) => void;
  setRequireLowerCaseLocalState: (value: boolean) => void;
  setRequireNumbersLocalState: (value: boolean) => void;
  setRequireSpecialCharactersLocalState: (value: boolean) => void;
  hasChanges: () => boolean;
  handleClickSubmit: () => void;
  handleOnClickButton: () => void;
}> = ({
  minLenghtPasswordFormData,
  requireUpperCasePasswordFormData,
  requireLowerCasePasswordFormData,
  requireNumbersPasswordFormData,
  requireSpecialCharactersFormData,
  passwordExpiryDaysFormData,
  inactivityDaysFormData,
  passwordHistoryLimitFormData,
  maximunMinutesInactivityInAppFormData,
  updatePasswordPolicyLoading,
  setMinLenghtPasswordLocalState,
  setPasswordExpiryDaysLocalState,
  setInactivityDaysLocalState,
  setPasswordHistoryLimitLocalState,
  setMaximunMinutesInactivityInAppLocalState,
  setRequireUpperCaseLocalState,
  setRequireLowerCaseLocalState,
  setRequireNumbersLocalState,
  setRequireSpecialCharactersLocalState,
  hasChanges,
  handleClickSubmit,
  handleOnClickButton,
}) => {
  return (
    <Col
      span={24}
      style={{
        margin: "0px",
        paddingInline: "13px",
        paddingTop: "13px",
      }}
    >
      <h2
        className="update-password-policy-title-form"
        style={{
          ...titleStyleCss,
          textAlign: "center",
          marginTop: "2px",
          marginBottom: "22px",
        }}
      >
        Gestionar política de contraseña
      </h2>

      <Form
        id="create-case-report-form"
        name="create-case-report-form"
        className="create-report-form"
        initialValues={{
          "min-length-input": minLenghtPasswordFormData,
          "password-expiry-days-input": passwordExpiryDaysFormData,
          "inactivity-days-input": inactivityDaysFormData,
          "password-history-limit-input": passwordHistoryLimitFormData,
          "maximun-minutes-of-inactivity-in-app-input":
            maximunMinutesInactivityInAppFormData,
          "require-uppercase-switch": requireUpperCasePasswordFormData,
          "require-lowercase-switch": requireLowerCasePasswordFormData,
          "require-numbers-switch": requireNumbersPasswordFormData,
          "require-special-characters-checkbox":
            requireSpecialCharactersFormData,
        }}
        autoComplete="off"
        onFinish={handleClickSubmit}
      >
        <Row gutter={24}>
          <Col span={12}>
            <div style={{ textAlign: "start" }}>
              <Typography.Title style={{ marginTop: 7 }} level={5}>
                Longitud mínima de la contraseña:
              </Typography.Title>

              <Form.Item
                id="min-length-input"
                className="min-length-input"
                name="min-length-input"
                normalize={(value) => {
                  if (!value) return "";

                  return value.replace(/[^0-9]/g, "");
                }}
                rules={[
                  {
                    required: true,
                    message: "¡Ingresa la longitud mínima!",
                  },
                  {
                    pattern: /^[0-9]+$/,
                    message: "¡Ingresa número sin puntos, ni comas!",
                  },
                ]}
              >
                <Input
                  id="min-length-input"
                  prefix={<FaArrowsAltH className="site-form-item-icon" />}
                  style={{
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    width: "27%",
                  }}
                  value={String(minLenghtPasswordFormData)}
                  onChange={(e) =>
                    setMinLenghtPasswordLocalState(
                      Number(e.target.value.replace(/[^0-9]/g, ""))
                    )
                  }
                  maxLength={2}
                  autoComplete="off"
                />
              </Form.Item>
            </div>
          </Col>

          <Col span={12}>
            <div style={{ textAlign: "start" }}>
              <Typography.Title style={{ marginTop: 7 }} level={5}>
                Días hasta la expiración de la contraseña:
              </Typography.Title>

              <Form.Item
                id="password-expiry-days-input"
                className="password-expiry-days-input"
                name="password-expiry-days-input"
                normalize={(value) => {
                  if (!value) return "";

                  return value.replace(/[^0-9]/g, "");
                }}
                rules={[
                  {
                    required: true,
                    message: "¡Ingresa los dia de expiración!",
                  },
                  {
                    pattern: /^[0-9]+$/,
                    message: "¡Ingresa número sin puntos, ni comas!",
                  },
                ]}
              >
                <Input
                  id="password-expiry-days-input"
                  prefix={<TbPasswordUser className="site-form-item-icon" />}
                  style={{
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    width: "27%",
                  }}
                  value={String(passwordExpiryDaysFormData)}
                  onChange={(e) =>
                    setPasswordExpiryDaysLocalState(
                      Number(e.target.value.replace(/[^0-9]/g, ""))
                    )
                  }
                  maxLength={2}
                  autoComplete="off"
                />
              </Form.Item>
            </div>
          </Col>
        </Row>

        <Row gutter={24}>
          <Col span={12}>
            <div style={{ textAlign: "start" }}>
              <Typography.Title style={{ marginTop: 7 }} level={5}>
                Días de inactividad para bloqueo:
              </Typography.Title>

              <Form.Item
                id="inactivity-days-input"
                className="inactivity-days-input"
                name="inactivity-days-input"
                normalize={(value) => {
                  if (!value) return "";

                  return value.replace(/[^0-9]/g, "");
                }}
                rules={[
                  {
                    required: true,
                    message: "¡Ingresa los dias de inactividad!",
                  },
                  {
                    pattern: /^[0-9]+$/,
                    message: "¡Ingresa número sin puntos, ni comas!",
                  },
                ]}
              >
                <Input
                  id="inactivity-days-input"
                  prefix={<MdOutlineBlock className="site-form-item-icon" />}
                  style={{
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    width: "27%",
                  }}
                  value={inactivityDaysFormData}
                  onChange={(e) =>
                    setInactivityDaysLocalState(
                      Number(e.target.value.replace(/[^0-9]/g, ""))
                    )
                  }
                  maxLength={2}
                  autoComplete="off"
                />
              </Form.Item>
            </div>
          </Col>

          <Col span={12}>
            <div style={{ textAlign: "start" }}>
              <Typography.Title style={{ marginTop: 7 }} level={5}>
                Límite de historial de contraseñas:
              </Typography.Title>

              <Form.Item
                id="password-history-limit-input"
                className="password-history-limit-input"
                name="password-history-limit-input"
                normalize={(value) => {
                  if (!value) return "";

                  return value.replace(/[^0-9]/g, "");
                }}
                rules={[
                  {
                    required: true,
                    message: "¡Ingresa el límite de historial de contraseñas!",
                  },
                  {
                    pattern: /^[0-9]+$/,
                    message: "¡Ingresa número sin puntos, ni comas!",
                  },
                ]}
              >
                <Input
                  id="password-history-limit-input"
                  prefix={<FaHistory className="site-form-item-icon" />}
                  style={{
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    width: "27%",
                  }}
                  value={passwordHistoryLimitFormData}
                  onChange={(e) =>
                    setPasswordHistoryLimitLocalState(
                      Number(e.target.value.replace(/[^0-9]/g, ""))
                    )
                  }
                  maxLength={2}
                  autoComplete="off"
                />
              </Form.Item>
            </div>
          </Col>

          <Col span={24}>
            <div style={{ textAlign: "start" }}>
              <Typography.Title style={{ marginTop: 7 }} level={5}>
                Minutos máximo de inactividad:
              </Typography.Title>

              <Form.Item
                id="maximun-minutes-of-inactivity-in-app-input"
                className="maximun-minutes-of-inactivity-in-app-input"
                name="maximun-minutes-of-inactivity-in-app-input"
                normalize={(value) => {
                  if (!value) return "";

                  return value.replace(/[^0-9]/g, "");
                }}
                rules={[
                  {
                    required: true,
                    message:
                      "¡Ingresa los minutos máximos de inactividad en app!",
                  },
                  {
                    pattern: /^[0-9]+$/,
                    message: "¡Ingresa número sin puntos, ni comas!",
                  },
                ]}
              >
                <Input
                  id="maximun-minutes-of-inactivity-in-app-input"
                  prefix={<IoMdTimer className="site-form-item-icon" />}
                  style={{
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    width: "13%",
                  }}
                  value={maximunMinutesInactivityInAppFormData}
                  onChange={(e) =>
                    setMaximunMinutesInactivityInAppLocalState(
                      Number(e.target.value.replace(/[^0-9]/g, ""))
                    )
                  }
                  maxLength={2}
                  autoComplete="off"
                />
              </Form.Item>
            </div>
          </Col>
        </Row>

        <Row gutter={24}>
          <Col span={12}>
            <div style={{ textAlign: "start" }}>
              <Typography.Title style={{ marginTop: 7 }} level={5}>
                ¿Requiere mayúsculas?:
              </Typography.Title>

              <Form.Item
                id="require-uppercase-switch"
                className="require-uppercase-switch"
                name="require-uppercase-switch"
              >
                <Switch
                  checked={requireUpperCasePasswordFormData}
                  onChange={(checked) => setRequireUpperCaseLocalState(checked)}
                />
              </Form.Item>
            </div>
          </Col>

          <Col span={12}>
            <div style={{ textAlign: "start" }}>
              <Typography.Title style={{ marginTop: 7 }} level={5}>
                ¿Requiere minúsculas?:
              </Typography.Title>

              <Form.Item
                id="require-lowercase-switch"
                className="require-lowercase-switch"
                name="require-lowercase-switch"
              >
                <Switch
                  checked={requireLowerCasePasswordFormData}
                  onChange={(checked) => setRequireLowerCaseLocalState(checked)}
                />
              </Form.Item>
            </div>
          </Col>
        </Row>

        <Row gutter={24}>
          <Col span={12}>
            <div style={{ textAlign: "start" }}>
              <Typography.Title style={{ marginTop: 7 }} level={5}>
                ¿Requiere números?:
              </Typography.Title>

              <Form.Item
                id="require-numbers-switch"
                className="require-numbers-switch"
                name="require-numbers-switch"
              >
                <Switch
                  checked={requireNumbersPasswordFormData}
                  onChange={(checked) => setRequireNumbersLocalState(checked)}
                />
              </Form.Item>
            </div>
          </Col>

          <Col span={12}>
            <div style={{ textAlign: "start" }}>
              <Typography.Title style={{ marginTop: 7 }} level={5}>
                ¿Requiere caracteres especiales?:
              </Typography.Title>

              <Form.Item
                id="require-special-characters-checkbox"
                className="require-special-characters-checkbox"
                name="require-special-characters-checkbox"
              >
                <Switch
                  checked={requireSpecialCharactersFormData}
                  onChange={(checked) =>
                    setRequireSpecialCharactersLocalState(checked)
                  }
                />
              </Form.Item>
            </div>
          </Col>
        </Row>

        <Row
          style={{
            width: "100%",
            justifyContent: "center",
            padding: "0px",
            margin: "0px",
          }}
        >
          <Col style={{ paddingTop: "7px", margin: "0px" }}>
            <Form.Item style={{ width: "100%" }}>
              <CustomButton
                idCustomButton="update-password-policy"
                classNameCustomButton="update-password-policy"
                titleCustomButton="Actualizar Política"
                sizeCustomButton="large"
                onClickCustomButton={handleOnClickButton}
                disabledCustomButton={
                  hasChanges() && !updatePasswordPolicyLoading ? false : true
                }
                styleCustomButton={{
                  color: hasChanges() ? "#F7F7F7" : "#DFEBF2B2",
                  backgroundColor: hasChanges() ? "#015E90" : "#A7AFBA",
                  paddingInline: "45px",
                  borderRadius: "31px",
                }}
                typeCustomButton="primary"
                htmlTypeCustomButton="submit"
              />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Col>
  );
};

export default ManagePasswordFormData;
