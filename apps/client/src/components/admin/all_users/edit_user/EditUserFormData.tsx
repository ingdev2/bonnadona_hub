"use client";

import React from "react";

import { Store } from "antd/es/form/interface";

import CustomSpin from "@/components/common/custom_spin/CustomSpin";
import { Button, Checkbox, Col, Form, Input, Row } from "antd";
import { titleStyleCss } from "@/theme/text_styles";

import { MdDriveFileRenameOutline } from "react-icons/md";
import { FiPhone } from "react-icons/fi";
import { IRole } from "@/utils/interfaces/auth/role.interface";
import CustomTags from "@/components/common/custom_tags/CustomTags";

const EditUserFormData: React.FC<{
  principalEmailUserFormData: string;
  onChangePrincipalEmailUserFormData: (e: any) => void;
  corporateEmailUserFormData: string;
  onChangeCorporateEmailUserFormData: (e: any) => void;
  personalEmailUserFormData: string;
  onChangePersonalEmailUserFormData: (e: any) => void;
  personalCellphoneFormData: string | undefined;
  onChangePersonalCellphoneFormData: (e: any) => void;
  corporateCellphoneFormData: string | undefined;
  onChangeCorporateCellphoneFormData: (e: any) => void;
  positionFormData: string;
  roleUserFormData: number[] | undefined;
  onChangeRoleUserFormData: (e: any) => void;
  permissionUserFormData: string[] | undefined;
  onChangePermissionUserFormData: (e: any) => void;
  allRolesFormData: IRole[] | undefined;
  loadingAllRolesFormData: boolean;
  fetchingAllRolesFormData: boolean;
  allPermissionsFormData: IPermission[] | undefined;
  loadingAllPermissionFormData: boolean;
  fetchingAllPermissionFormData: boolean;

  handleConfirmEditAdminFormData: (
    e: React.FormEvent<HTMLFormElement>
  ) => Promise<void>;
  initialValuesEditAdminFormData: Store | undefined;
  isSubmittingEditUserData: boolean;
  hasChangesFormData: boolean;
  handleButtonClickFormData: () => void;
}> = ({
  principalEmailUserFormData,
  onChangePrincipalEmailUserFormData,
  corporateEmailUserFormData,
  onChangeCorporateEmailUserFormData,
  personalEmailUserFormData,
  onChangePersonalEmailUserFormData,
  personalCellphoneFormData,
  onChangePersonalCellphoneFormData,
  corporateCellphoneFormData,
  onChangeCorporateCellphoneFormData,
  positionFormData,
  roleUserFormData,
  onChangeRoleUserFormData,
  permissionUserFormData,
  onChangePermissionUserFormData,
  allRolesFormData,
  loadingAllRolesFormData,
  fetchingAllRolesFormData,
  allPermissionsFormData,
  loadingAllPermissionFormData,
  fetchingAllPermissionFormData,
  handleConfirmEditAdminFormData,
  initialValuesEditAdminFormData,
  isSubmittingEditUserData,
  hasChangesFormData,
  handleButtonClickFormData,
}) => {
  return (
    <Form
      id="edit-admin-form"
      name="edit-admin-form"
      className="edit-admin-form"
      onFinish={handleConfirmEditAdminFormData}
      initialValues={initialValuesEditAdminFormData}
      autoComplete="false"
      layout="vertical"
      style={{
        width: "100%",
        paddingBlock: "7px",
        paddingInline: "13px",
      }}
    >
      <h2
        className="title-edit-admin-form"
        style={{
          ...titleStyleCss,
          textAlign: "center",
          marginTop: "7px",
          marginBottom: "22px",
        }}
      >
        Editar Usuario
      </h2>

      <Row gutter={24}>
        <Col span={12}>
          <Form.Item
            name="edit-user-principal-email"
            label="Correo principal:"
            style={{ marginBottom: "13px" }}
            rules={[
              { required: true, message: "¡Por favor ingrese el correo!" },
              {
                pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                message: "¡Por favor ingrese un correo válido!",
              },
            ]}
          >
            <Input
              id="principal-email-user"
              prefix={
                <MdDriveFileRenameOutline className="site-form-item-icon" />
              }
              type="text"
              value={principalEmailUserFormData}
              placeholder="Correo principal"
              onChange={onChangePrincipalEmailUserFormData}
              autoComplete="off"
            />
          </Form.Item>
        </Col>

        <Col span={12}>
          <Form.Item
            name="edit-user-corporate-email"
            label="Correo corporativo:"
            style={{ marginBottom: "13px" }}
            rules={[
              {
                pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                message: "¡Por favor ingrese un correo válido!",
              },
            ]}
          >
            <Input
              id="corporate-email-user"
              prefix={
                <MdDriveFileRenameOutline className="site-form-item-icon" />
              }
              type="text"
              value={corporateEmailUserFormData}
              placeholder="Correo corporativo"
              onChange={onChangeCorporateEmailUserFormData}
              autoComplete="off"
            />
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={24}>
        <Col span={12}>
          <Form.Item
            name="edit-user-personal-email"
            label="Correo personal:"
            style={{ marginBottom: "13px" }}
            rules={[
              { required: true, message: "¡Por favor ingrese el correo!" },
              {
                pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                message: "¡Por favor ingrese un correo válido!",
              },
            ]}
          >
            <Input
              id="personal-email-user"
              prefix={
                <MdDriveFileRenameOutline className="site-form-item-icon" />
              }
              type="text"
              value={personalEmailUserFormData}
              placeholder="Correo personal"
              onChange={onChangePersonalEmailUserFormData}
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
                required: false,
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
              value={personalCellphoneFormData}
              placeholder="Número de celular personal"
              onChange={onChangePersonalCellphoneFormData}
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
                message:
                  "¡Por favor ingresa número de celular sin letras ni puntos!",
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
              value={corporateCellphoneFormData}
              placeholder="Número de celular corporativo"
              onChange={onChangeCorporateCellphoneFormData}
              autoComplete="off"
              min={0}
            />
          </Form.Item>
        </Col>

        <Col span={12}>
          <Form.Item
            name="edit-user-position"
            label="Cargo:"
            style={{ marginBottom: "13px" }}
          >
            <Input
              id="position-user"
              type="text"
              value={positionFormData}
              placeholder="Cargo"
              autoComplete="off"
              disabled={true}
            />
          </Form.Item>
        </Col>
      </Row>

      <Row
        gutter={24}
        justify={"center"}
        align={"top"}
        style={{ paddingBottom: "13px" }}
      >
        <Col
          span={24}
          style={{
            display: "flex",
            flexFlow: "row",
            gap: "13px",
            justifyContent: "center",
            alignContent: "center",
          }}
        >
          <Col
            span={6}
            style={{
              height: "450px",
              padding: "7px",
              border: "1px solid #013B5A",
              borderRadius: "8px",
              overflowY: "auto",
            }}
          >
            <h3 style={{ marginTop: "2px", marginBottom: "13px" }}>Roles</h3>

            {loadingAllRolesFormData || fetchingAllRolesFormData ? (
              <CustomSpin />
            ) : (
              <Checkbox.Group
                value={roleUserFormData}
                onChange={onChangeRoleUserFormData}
                style={{ display: "flex", flexDirection: "column" }}
              >
                {allRolesFormData?.map((role: IRole) => (
                  <Checkbox
                    key={role.id}
                    value={role.id}
                    style={{ marginBottom: "8px", paddingBlock: "2px" }}
                  >
                    {role.name}
                  </Checkbox>
                ))}
              </Checkbox.Group>
            )}
          </Col>

          <Col
            span={18}
            style={{
              height: "450px",
              paddingInline: "13px",
              border: "1px solid #013B5A",
              borderRadius: "8px",
              overflow: "auto",
            }}
          >
            <div
              style={{
                top: 0,
                position: "sticky",
                paddingBottom: "13px",
                margin: "0px",
                backgroundColor: "#FFFFFF",
                zIndex: 1,
              }}
            >
              <h3 style={{ paddingBlock: "7px" }}>Permisos</h3>

              {permissionUserFormData?.map((permissionId) => {
                const permission = allPermissionsFormData?.find(
                  (perm) => perm.id === permissionId
                );

                return (
                  permission && (
                    <CustomTags
                      key={permission.id}
                      tag={{
                        label: permission.name,
                        color: "#015E90B2",
                        textColor: "#F7F7F7",
                      }}
                    />
                  )
                );
              })}
            </div>

            {loadingAllPermissionFormData || fetchingAllPermissionFormData ? (
              <CustomSpin />
            ) : (
              <>
                <Checkbox.Group
                  value={permissionUserFormData}
                  onChange={onChangePermissionUserFormData}
                  style={{ display: "flex", flexDirection: "column" }}
                >
                  <Row gutter={16}>
                    {allPermissionsFormData?.map((permission: IPermission) => (
                      <Col
                        key={permission.id}
                        span={12}
                        style={{ marginBottom: "8px" }}
                      >
                        <Checkbox
                          key={permission.id}
                          value={permission.id}
                          style={{
                            display: "flex",
                            alignItems: "flex-start",
                            paddingBlock: "2px",
                          }}
                        >
                          <span style={{ textAlign: "left", width: "100%" }}>
                            {permission.name}
                          </span>
                        </Checkbox>
                      </Col>
                    ))}
                  </Row>
                </Checkbox.Group>
              </>
            )}
          </Col>
        </Col>
      </Row>

      <Form.Item
        style={{
          textAlign: "center",
          marginBlock: "0px",
          paddingBlock: "13px",
        }}
      >
        {isSubmittingEditUserData ? (
          <CustomSpin />
        ) : (
          <div
            style={{
              display: "flex",
              flexFlow: "row",
              justifyContent: "center",
            }}
          >
            <Button
              size="middle"
              style={{
                backgroundColor: !hasChangesFormData ? "#D8D8D8" : "#015E90",
                color: !hasChangesFormData ? "#A0A0A0" : "#f2f2f2",
                fontWeight: "bold",
                paddingInline: 54,
                borderRadius: 31,
              }}
              htmlType="submit"
              className="edit-patient-form-button"
              onClick={handleButtonClickFormData}
              disabled={!hasChangesFormData}
            >
              Actualizar datos
            </Button>
          </div>
        )}
      </Form.Item>
    </Form>
  );
};

export default EditUserFormData;
