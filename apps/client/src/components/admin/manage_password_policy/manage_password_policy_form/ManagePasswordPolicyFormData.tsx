import React from "react";

import { Col, Form, Input, Row, Switch, Typography } from "antd";

import { titleStyleCss } from "@/theme/text_styles";

import { MdOutlineBlock } from "react-icons/md";
import { FaRegCircleCheck } from "react-icons/fa6";
import { RiPassExpiredLine } from "react-icons/ri";
import { IoRecordingOutline } from "react-icons/io5";
import { FaArrowsAltH } from "react-icons/fa";
import { LoadingOutlined } from "@ant-design/icons";

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
  updatePasswordPolicyLoading: boolean;
  editPasswordPolicyAction: boolean;
  setMinLenghtPasswordLocalState: (value: number) => void;
  setPasswordExpiryDaysLocalState: (value: number) => void;
  setInactivityDaysLocalState: (value: number) => void;
  setPasswordHistoryLimitLocalState: (value: number) => void;
  setRequireUpperCaseLocalState: (value: boolean) => void;
  setRequireLowerCaseLocalState: (value: boolean) => void;
  setRequireNumbersLocalState: (value: boolean) => void;
  setRequireSpecialCharactersLocalState: (value: boolean) => void;
  hasChanges: () => boolean;
  handleClickSubmit: () => void;
}> = ({
  minLenghtPasswordFormData,
  requireUpperCasePasswordFormData,
  requireLowerCasePasswordFormData,
  requireNumbersPasswordFormData,
  requireSpecialCharactersFormData,
  passwordExpiryDaysFormData,
  inactivityDaysFormData,
  passwordHistoryLimitFormData,
  updatePasswordPolicyLoading,
  editPasswordPolicyAction,
  setMinLenghtPasswordLocalState,
  setPasswordExpiryDaysLocalState,
  setInactivityDaysLocalState,
  setPasswordHistoryLimitLocalState,
  setRequireUpperCaseLocalState,
  setRequireLowerCaseLocalState,
  setRequireNumbersLocalState,
  setRequireSpecialCharactersLocalState,
  hasChanges,
  handleClickSubmit,
}) => {
  return (
    <div>
      <Col
        span={24}
        style={{
          margin: "0px",
          paddingInline: "13px",
          paddingTop: "22px",
        }}
      >
        <h2
          className="title-personal-data-admin"
          style={{
            ...titleStyleCss,
            marginBottom: "13px",
            textAlign: "center",
          }}
        >
          Gestionar políticas
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
            "require-uppercase-switch": requireUpperCasePasswordFormData,
            "require-lowercase-switch": requireLowerCasePasswordFormData,
            "require-numbers-switch": requireNumbersPasswordFormData,
            "require-special-characters-checkbox":
              requireSpecialCharactersFormData,
          }}
          autoComplete="false"
          onFinish={handleClickSubmit}
        >
          <Row gutter={24}>
            <Col span={12} style={{ marginBottom: "13px" }}>
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
                    style={{ overflow: "hidden", textOverflow: "ellipsis" }}
                    value={String(minLenghtPasswordFormData)}
                    onChange={(e) =>
                      setMinLenghtPasswordLocalState(
                        Number(e.target.value.replace(/[^0-9]/g, ""))
                      )
                    }
                  />
                </Form.Item>
              </div>
            </Col>

            <Col span={12} style={{ marginBottom: "13px" }}>
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
                    prefix={
                      <RiPassExpiredLine className="site-form-item-icon" />
                    }
                    style={{ overflow: "hidden", textOverflow: "ellipsis" }}
                    value={String(passwordExpiryDaysFormData)}
                    onChange={(e) =>
                      setPasswordExpiryDaysLocalState(
                        Number(e.target.value.replace(/[^0-9]/g, ""))
                      )
                    }
                  />
                </Form.Item>
              </div>
            </Col>
          </Row>

          <Row gutter={24}>
            <Col span={12} style={{ marginBottom: "13px" }}>
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
                    style={{ overflow: "hidden", textOverflow: "ellipsis" }}
                    value={passwordHistoryLimitFormData}
                    onChange={(e) =>
                      setInactivityDaysLocalState(
                        Number(e.target.value.replace(/[^0-9]/g, ""))
                      )
                    }
                  />
                </Form.Item>
              </div>
            </Col>

            <Col span={12} style={{ marginBottom: "13px" }}>
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
                      message:
                        "¡Ingresa el límite de historial de contraseñas!",
                    },
                    {
                      pattern: /^[0-9]+$/,
                      message: "¡Ingresa número sin puntos, ni comas!",
                    },
                  ]}
                >
                  <Input
                    id="password-history-limit-input"
                    prefix={
                      <IoRecordingOutline className="site-form-item-icon" />
                    }
                    style={{ overflow: "hidden", textOverflow: "ellipsis" }}
                    value={passwordExpiryDaysFormData}
                    onChange={(e) =>
                      setPasswordHistoryLimitLocalState(
                        Number(e.target.value.replace(/[^0-9]/g, ""))
                      )
                    }
                  />
                </Form.Item>
              </div>
            </Col>
          </Row>

          <Row gutter={24}>
            <Col span={12} style={{ marginBottom: "13px" }}>
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
                    onChange={(checked) =>
                      setRequireUpperCaseLocalState(checked)
                    }
                  />
                </Form.Item>
              </div>
            </Col>

            <Col span={12} style={{ marginBottom: "13px" }}>
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
                    onChange={(checked) =>
                      setRequireLowerCaseLocalState(checked)
                    }
                  />
                </Form.Item>
              </div>
            </Col>
          </Row>

          <Row gutter={24}>
            <Col span={12} style={{ marginBottom: "13px" }}>
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

            <Col span={12} style={{ marginBottom: "13px" }}>
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
            gutter={[16, 16]}
            style={{ width: "100%", justifyContent: "center" }}
          >
            <Col>
              <Form.Item style={{ width: "100%", marginBottom: "-5px" }}>
                {/* {editPasswordPolicyAction ? ( */}
                <CustomButton
                  classNameCustomButton="generate-report-button"
                  idCustomButton="generate-report-button"
                  titleCustomButton="Actualizar"
                  typeCustomButton="primary"
                  htmlTypeCustomButton="submit"
                  iconCustomButton={
                    !updatePasswordPolicyLoading ? (
                      <FaRegCircleCheck />
                    ) : (
                      <LoadingOutlined />
                    )
                  }
                  onClickCustomButton={() => ({})}
                  disabledCustomButton={
                    hasChanges() && !updatePasswordPolicyLoading ? false : true
                  }
                  styleCustomButton={{
                    background: hasChanges() ? "#015E90" : "#A7AFBA",
                    color: "#fff",
                    fontSize: "12px",
                    borderRadius: "16px",
                  }}
                  iconPositionCustomButton={"end"}
                  sizeCustomButton={"middle"}
                />
                {/* ) : null} */}
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Col>
    </div>
  );
};

export default ManagePasswordFormData;
