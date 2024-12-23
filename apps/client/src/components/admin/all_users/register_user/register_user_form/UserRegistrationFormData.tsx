"use client";

import React from "react";

import { AutoComplete, Button, Col, Form, Input, Row, Select } from "antd";
import CustomSpin from "@/components/common/custom_spin/CustomSpin";
import { titleStyleCss } from "@/theme/text_styles";
import { MdDriveFileRenameOutline, MdOutlineEmail } from "react-icons/md";
import { IdcardOutlined } from "@ant-design/icons";
import { FiPhone } from "react-icons/fi";
import CustomDatePicker from "@/components/common/custom_date_picker/CustomDatePicker";
import { validateRequiredDate } from "@/helpers/validate_required_values/validate_required_files";

const UserRegistrationFormData: React.FC<{
  handleCreateUserDataForm: () => void;
  userNameDataForm: string;
  handleOnChangeUserNameDataForm: (e: any) => void;
  userLastNameDataForm: string;
  handleOnChangeUserLastNameDataForm: (e: any) => void;
  idTypeSelectorLoadingDataForm: boolean;
  userIdTypeValueDataForm: number;
  handleOnChangeSelectIdTypeDataForm: (value: number) => void;
  userIdTypeListDataForm: string[];
  genderSelectorLoadingDataForm: boolean;
  userGenderValueDataForm: number;
  handleOnChangeSelectGenderDataForm: (value: number) => void;
  userGenderListDataForm: string[];
  userIdNumberDataForm: number;
  handleOnChangeUserIdNumberDataForm: (e: any) => void;
  onChangeDateCustomDatePicker: (
    date: any,
    dateString: string | string[]
  ) => void;
  userBirthdateDataForm: string;
  userPrincipalEmailDataForm: string;
  handleOnChangeUserPrincipalEmailDataForm: (e: any) => void;
  userCorporateEmailDataForm: string;
  handleOnChangeUserCorporateEmailDataForm: (e: any) => void;
  userPersonalEmailDataForm: string;
  handleOnChangeUserPersonalEmailDataForm: (e: any) => void;
  userPersonalCellphoneDataForm: number;
  handleOnChangeUserPersonalCellphoneDataForm: (e: any) => void;
  userCorporateCellphoneDataForm: number;
  handleOnChangeUserCorporateCellphoneDataForm: (e: any) => void;
  serviceTypeSelectorLoadingDataForm: boolean;
  userServiceTypeValueDataForm: number;
  handleOnChangeSelectServiceTypeDataForm: (value: number) => void;
  userServiceTypeListDataForm: string[];
  positionLevelSelectorLoadingDataForm: boolean;
  userPositionLevelValueDataForm: number;
  handleOnChangeSelectPositionLevelDataForm: (value: number) => void;
  userPositionLevelListDataForm: string[];
  positionSelectorLoadingDataForm: boolean;
  userPositionValueDataForm: string;
  handleOnChangeSelectPositionDataForm: (value: string) => void;
  userPositionListDataForm: string[];
  serviceSelectorLoadingDataForm: boolean;
  userServiceValueDataForm: string;
  handleOnChangeSelectServiceDataForm: (value: string) => void;
  userServiceListDataForm: string[];
  inmediateBossNameDataForm: string;
  optionsInmediateBossNameFormData: any[];
  handleOnChangeInmediateBossNameDataForm: (e: any) => void;
  handleSearchNameInmediateBossNameDataForm: (e: any) => void;
  buttonSubmitFormLoadingDataForm: boolean;
  handleButtonSubmitDataForm: () => void;
}> = ({
  handleCreateUserDataForm,
  handleOnChangeSelectGenderDataForm,
  handleOnChangeSelectIdTypeDataForm,
  handleOnChangeSelectPositionLevelDataForm,
  handleOnChangeSelectPositionDataForm,
  handleOnChangeSelectServiceDataForm,
  handleOnChangeSelectServiceTypeDataForm,
  handleOnChangeUserCorporateEmailDataForm,
  handleOnChangeUserIdNumberDataForm,
  handleOnChangeUserLastNameDataForm,
  handleOnChangeUserNameDataForm,
  handleOnChangeUserPersonalCellphoneDataForm,
  handleOnChangeUserCorporateCellphoneDataForm,
  handleOnChangeUserPersonalEmailDataForm,
  handleOnChangeUserPrincipalEmailDataForm,
  onChangeDateCustomDatePicker,
  handleOnChangeInmediateBossNameDataForm,
  handleSearchNameInmediateBossNameDataForm,
  handleButtonSubmitDataForm,
  genderSelectorLoadingDataForm,
  idTypeSelectorLoadingDataForm,
  positionLevelSelectorLoadingDataForm,
  positionSelectorLoadingDataForm,
  serviceSelectorLoadingDataForm,
  serviceTypeSelectorLoadingDataForm,
  userBirthdateDataForm,
  userCorporateEmailDataForm,
  userGenderListDataForm,
  userGenderValueDataForm,
  userIdNumberDataForm,
  userIdTypeListDataForm,
  userIdTypeValueDataForm,
  userLastNameDataForm,
  userNameDataForm,
  userPersonalCellphoneDataForm,
  userCorporateCellphoneDataForm,
  userPersonalEmailDataForm,
  userPositionLevelListDataForm,
  userPositionLevelValueDataForm,
  userPositionListDataForm,
  userPositionValueDataForm,
  userServiceListDataForm,
  userServiceValueDataForm,
  userPrincipalEmailDataForm,
  userServiceTypeListDataForm,
  userServiceTypeValueDataForm,
  inmediateBossNameDataForm,
  optionsInmediateBossNameFormData,
  buttonSubmitFormLoadingDataForm,
}) => {
  return (
    <Form
      id="create-user-form"
      name="create-user-form"
      className="create-user-form"
      onFinish={handleCreateUserDataForm}
      initialValues={{ remember: false }}
      autoComplete="false"
      layout="vertical"
      style={{
        width: "100%",
        paddingBlock: "13px",
        paddingInline: "22px",
      }}
    >
      <h2
        className="title-create-admin-form"
        style={{
          ...titleStyleCss,
          textAlign: "center",
          marginBottom: "22px",
        }}
      >
        Crear usuario
      </h2>

      <Row gutter={24}>
        <Col span={12}>
          <Form.Item
            name="new-user-name"
            label="Nombre(s) del usuario"
            style={{ marginBottom: "13px" }}
            normalize={(value) => {
              if (!value) return "";
              const filteredValue = value
                .toUpperCase()
                .replace(/[^A-ZÑ\s]/g, "");
              return filteredValue;
            }}
            rules={[
              {
                required: true,
                message: "¡Por favor ingrese el nombre del usuario!",
              },
              {
                min: 3,
                message: "El nombre debe tener al menos 3 caracteres",
              },
              {
                max: 31,
                message: "El nombre no puede tener más de 31 caracteres",
              },
              {
                pattern: /^[A-ZÑ\s]*$/,
                message:
                  "El nombre solo puede contener letras mayúsculas y espacios",
              },
            ]}
          >
            <Input
              prefix={
                <MdDriveFileRenameOutline className="site-form-item-icon" />
              }
              type="text"
              value={userNameDataForm}
              placeholder="Nombre(s) completos"
              onChange={handleOnChangeUserNameDataForm}
              autoComplete="off"
            />
          </Form.Item>
        </Col>

        <Col span={12}>
          <Form.Item
            name="new-user-lastName"
            label="Apellidos(s) del usuario"
            style={{ marginBottom: "13px" }}
            normalize={(value) => {
              if (!value) return "";
              const filteredValue = value
                .toUpperCase()
                .replace(/[^A-ZÑ\s]/g, "");
              return filteredValue;
            }}
            rules={[
              {
                required: true,
                message: "¡Por favor ingrese el apellido del usuario!",
              },
              {
                min: 4,
                message: "El apellido debe tener al menos 4 caracteres",
              },
              {
                max: 31,
                message: "El apellido no puede tener más de 31 caracteres",
              },
              {
                pattern: /^[A-ZÑ\s]*$/,
                message:
                  "El apellido solo puede contener letras mayúsculas y espacios",
              },
            ]}
          >
            <Input
              prefix={
                <MdDriveFileRenameOutline className="site-form-item-icon" />
              }
              type="text"
              value={userLastNameDataForm}
              placeholder="Apellido(s) completos"
              onChange={handleOnChangeUserLastNameDataForm}
              autoComplete="off"
            />
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={24}>
        <Col span={12}>
          <Form.Item
            name="new-user-id-types"
            label="Tipo de identificación del usuario"
            style={{ marginBottom: "13px" }}
            rules={[
              {
                required: true,
                message:
                  "¡Por favor selecciona el tipo de identificación del usuario!",
              },
            ]}
          >
            {idTypeSelectorLoadingDataForm ? (
              <CustomSpin />
            ) : (
              <Select
                value={userIdTypeValueDataForm}
                placeholder="Tipo de identificación"
                onChange={handleOnChangeSelectIdTypeDataForm}
              >
                {userIdTypeListDataForm?.map((option: any) => (
                  <Select.Option key={option.id} value={option.id}>
                    {option.name}
                  </Select.Option>
                ))}
              </Select>
            )}
          </Form.Item>
        </Col>

        <Col span={12}>
          <Form.Item
            name="new-user-id-number"
            label="Número de identificación del usuario"
            style={{ marginBottom: "13px" }}
            normalize={(value) => {
              if (!value) return "";
              return value.replace(/[^0-9]/g, "");
            }}
            rules={[
              {
                required: true,
                message:
                  "¡Por favor ingresa el número de identificación del usuario!",
              },
              {
                pattern: /^[0-9]+$/,
                message:
                  "¡Por favor ingresa número de identificación sin puntos!",
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
              value={userIdNumberDataForm}
              placeholder="Número de identificación"
              onChange={handleOnChangeUserIdNumberDataForm}
              autoComplete="off"
              min={0}
            />
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={24}>
        <Col span={12}>
          <Form.Item
            name="new-user-gender"
            label="Género del usuario"
            style={{ marginBottom: "13px" }}
            rules={[
              {
                required: true,
                message: "¡Por favor selecciona el tipo de género del usuario!",
              },
            ]}
          >
            {genderSelectorLoadingDataForm ? (
              <CustomSpin />
            ) : (
              <Select
                value={userGenderValueDataForm}
                placeholder="Seleccionar género"
                onChange={handleOnChangeSelectGenderDataForm}
              >
                {userGenderListDataForm?.map((option: any) => (
                  <Select.Option key={option.id} value={option.id}>
                    {option.name}
                  </Select.Option>
                ))}
              </Select>
            )}
          </Form.Item>
        </Col>

        <Col span={12}>
          <Form.Item
            name="date-picker-new-user"
            label="Fecha de nacimiento del usuario"
            style={{ marginBottom: "13px" }}
            rules={[
              {
                required: true,
                validator: validateRequiredDate(
                  userBirthdateDataForm,
                  "¡Por favor seleccionar la fecha de nacimiento!"
                ),
              },
            ]}
          >
            <CustomDatePicker
              onChangeDateCustomDatePicker={onChangeDateCustomDatePicker}
            />
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={24}>
        <Col span={12}>
          <Form.Item
            name="new-user-principal-email"
            label="Correo electrónico principal"
            style={{ marginBottom: "13px" }}
            normalize={(value) => {
              if (!value) return "";
              return value.toLowerCase().replace(/[^a-z0-9@._-]/g, "");
            }}
            rules={[
              {
                required: true,
                message:
                  "¡Por favor ingresa el correo electrónico principal del usuario!",
              },
              {
                type: "email",
                message: "¡Por favor ingresa un correo electrónico valido!",
              },
              {
                min: 10,
                message: "¡Por favor ingresa mínimo 10 caracteres!",
              },
              {
                max: 45,
                message: "¡Por favor ingresa máximo 45 caracteres!",
              },
            ]}
          >
            <Input
              prefix={<MdOutlineEmail className="site-form-item-icon" />}
              type="email"
              value={userPrincipalEmailDataForm}
              placeholder="Correo principal"
              onChange={handleOnChangeUserPrincipalEmailDataForm}
              autoComplete="off"
            />
          </Form.Item>
        </Col>

        <Col span={12}>
          <Form.Item
            name="new-user-personal-email"
            label="Correo electrónico personal"
            style={{ marginBottom: "13px" }}
            normalize={(value) => {
              if (!value) return "";
              return value.toLowerCase().replace(/[^a-z0-9@._-]/g, "");
            }}
            rules={[
              {
                required: true,
                message:
                  "¡Por favor ingresa el correo electrónico personal del usuario!",
              },
              {
                type: "email",
                message: "¡Por favor ingresa un correo electrónico valido!",
              },
              {
                min: 10,
                message: "¡Por favor ingresa mínimo 10 caracteres!",
              },
              {
                max: 45,
                message: "¡Por favor ingresa máximo 45 caracteres!",
              },
            ]}
          >
            <Input
              prefix={<MdOutlineEmail className="site-form-item-icon" />}
              type="email"
              value={userPersonalEmailDataForm}
              placeholder="Correo personal"
              onChange={handleOnChangeUserPersonalEmailDataForm}
              autoComplete="off"
            />
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={24}>
        <Col span={12}>
          <Form.Item
            name="new-user-corporate-email"
            label="Correo electrónico corporativo"
            style={{ marginBottom: "13px" }}
            normalize={(value) => {
              if (!value) return "";
              return value.toLowerCase().replace(/[^a-z0-9@._-]/g, "");
            }}
            rules={[
              {
                required: false,
                message:
                  "¡Por favor ingresa el correo electrónico corporativo del usuario!",
              },
              {
                type: "email",
                message: "¡Por favor ingresa un correo electrónico valido!",
              },
              {
                min: 10,
                message: "¡Por favor ingresa mínimo 10 caracteres!",
              },
              {
                max: 45,
                message: "¡Por favor ingresa máximo 45 caracteres!",
              },
            ]}
          >
            <Input
              prefix={<MdOutlineEmail className="site-form-item-icon" />}
              type="email"
              value={userCorporateEmailDataForm}
              placeholder="Correo corporativo"
              onChange={handleOnChangeUserCorporateEmailDataForm}
              autoComplete="off"
            />
          </Form.Item>
        </Col>

        <Col span={12}>
          <Form.Item
            name="edit-user-personal-cellphone"
            label="Celular personal:"
            style={{ marginBottom: "13px" }}
            normalize={(value) => {
              if (!value || typeof value !== "string") return "";

              return value.replace(/[^\d+]/g, "");
            }}
            rules={[
              {
                required: true,
                message:
                  "¡Por favor ingresa el número de celular personal del usuario!",
              },
              {
                pattern: /^[0-9]+$/,
                message: "¡Por favor ingresa número de celular sin puntos!",
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
              prefix={<FiPhone className="site-form-item-icon" />}
              type="tel"
              value={userPersonalCellphoneDataForm}
              placeholder="Número de celular personal"
              onChange={handleOnChangeUserPersonalCellphoneDataForm}
              autoComplete="off"
              min={0}
            />
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={24}>
        <Col span={12}>
          <Form.Item
            name="edit-user-corporate-cellphone"
            label="Celular corporativo:"
            style={{ marginBottom: "13px" }}
            normalize={(value) => {
              if (!value || typeof value !== "string") return "";

              return value.replace(/[^\d+]/g, "");
            }}
            rules={[
              {
                required: false,
                message:
                  "¡Por favor ingresa el número de celular corporativo del usuario!",
              },
              {
                pattern: /^[0-9]+$/,
                message: "¡Por favor ingresa número de celular sin puntos!",
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
              prefix={<FiPhone className="site-form-item-icon" />}
              type="tel"
              value={userCorporateCellphoneDataForm}
              placeholder="Número de celular corporativo"
              onChange={handleOnChangeUserCorporateCellphoneDataForm}
              autoComplete="off"
              min={0}
            />
          </Form.Item>
        </Col>

        <Col span={12}>
          <Form.Item
            name="new-user-service-types"
            label="Tipo de servicio"
            style={{ marginBottom: "13px" }}
            rules={[
              {
                required: true,
                message: "¡Por favor selecciona el tipo de servicio!",
              },
            ]}
          >
            {serviceTypeSelectorLoadingDataForm ? (
              <CustomSpin />
            ) : (
              <Select
                value={userServiceTypeValueDataForm}
                placeholder="Tipo de sercicio"
                onChange={handleOnChangeSelectServiceTypeDataForm}
              >
                {userServiceTypeListDataForm?.map((option: any) => (
                  <Select.Option key={option.id} value={option.id}>
                    {option.name}
                  </Select.Option>
                ))}
              </Select>
            )}
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={24}>
        <Col span={12}>
          <Form.Item
            name="new-user-position-level"
            label="Nivel de cargo"
            style={{ marginBottom: "13px" }}
            rules={[
              {
                required: true,
                message: "¡Por favor selecciona el nivel de cargo!",
              },
            ]}
          >
            {positionLevelSelectorLoadingDataForm ? (
              <CustomSpin />
            ) : (
              <Select
                value={userPositionLevelValueDataForm}
                placeholder="Nivel de cargo"
                onChange={handleOnChangeSelectPositionLevelDataForm}
              >
                {userPositionLevelListDataForm?.map((option: any) => (
                  <Select.Option key={option.id} value={option.id}>
                    {option.name}
                  </Select.Option>
                ))}
              </Select>
            )}
          </Form.Item>
        </Col>

        <Col span={12}>
          <Form.Item
            name="new-user-position"
            label="Cargo"
            style={{ marginBottom: "13px" }}
            rules={[
              {
                required: true,
                message: "¡Por favor selecciona el cargo!",
              },
            ]}
          >
            {positionSelectorLoadingDataForm ? (
              <CustomSpin />
            ) : (
              <Select
                value={userPositionValueDataForm}
                placeholder="Cargo"
                onChange={handleOnChangeSelectPositionDataForm}
              >
                {userPositionListDataForm?.map((option: any) => (
                  <Select.Option key={option} value={option}>
                    {option}
                  </Select.Option>
                ))}
              </Select>
            )}
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={24}>
        <Col span={12}>
          <Form.Item
            name="new-user-service"
            label="Servicio"
            style={{ marginBottom: "13px" }}
            rules={[
              {
                required: true,
                message: "¡Por favor selecciona el servicio!",
              },
            ]}
          >
            {serviceSelectorLoadingDataForm ? (
              <CustomSpin />
            ) : (
              <Select
                value={userServiceValueDataForm}
                placeholder="Servicio"
                onChange={handleOnChangeSelectServiceDataForm}
              >
                {userServiceListDataForm?.map((option: any) => (
                  <Select.Option key={option} value={option}>
                    {option}
                  </Select.Option>
                ))}
              </Select>
            )}
          </Form.Item>
        </Col>

        <Col span={12}>
          <Form.Item
            name="new-user-boss-inmediate-name"
            label="Nombre del jefe inmediato:"
            style={{ marginBottom: "13px" }}
            normalize={(value) => {
              if (!value) return "";

              const filteredValue = value
                .toUpperCase()
                .replace(/[^A-ZÁÉÍÓÚÑ\s]/g, "");

              return filteredValue;
            }}
            rules={[
              {
                required: false,
                message: "¡Por favor ingrese el nombre del jefe inmediato!",
              },
              {
                min: 3,
                message: "El nombre debe tener al menos 3 caracteres",
              },
              {
                max: 50,
                message: "El nombre no puede tener más de 50 caracteres",
              },
              {
                pattern: /^[A-ZÁÉÍÓÚÑ\s]*$/,
                message:
                  "El nombre solo puede contener letras mayúsculas con tildes y espacios",
              },
            ]}
          >
            <AutoComplete
              id="name-inmediate-boss"
              options={optionsInmediateBossNameFormData}
              style={{ width: "100%" }}
              onSearch={handleSearchNameInmediateBossNameDataForm}
              placeholder="Nombre del Jefe inmediato"
              value={inmediateBossNameDataForm}
              onChange={handleOnChangeInmediateBossNameDataForm}
              filterOption={false}
            >
              <Input type="text" autoComplete="off" />
            </AutoComplete>
          </Form.Item>
        </Col>
      </Row>

      <Form.Item style={{ textAlign: "center", marginBlock: "17px" }}>
        {buttonSubmitFormLoadingDataForm ? (
          <CustomSpin />
        ) : (
          <Button
            size="large"
            style={{
              paddingInline: 62,
              borderRadius: 31,
              backgroundColor: "#015E90",
              color: "#f2f2f2",
            }}
            htmlType="submit"
            className="create-user-form-button"
            onClick={handleButtonSubmitDataForm}
          >
            Crear usuario
          </Button>
        )}
      </Form.Item>
    </Form>
  );
};

export default UserRegistrationFormData;
