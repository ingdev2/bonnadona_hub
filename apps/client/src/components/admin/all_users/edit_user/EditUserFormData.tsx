import React from "react";

import { Col, Form, Input, Row } from "antd";
import { Store } from "antd/es/form/interface";
import { titleStyleCss } from "@/theme/text_styles";
import { MdDriveFileRenameOutline } from "react-icons/md";

const EditUserFormData: React.FC<{
  principalEmailUserFormData: string;
  onChangePrincipalEmailUserFormData: (e: any) => void;
  corporateEmailUserFormData: string;
  onChangeCorporateEmailUserFormData: (e: any) => void;
  personalEmailUserFormData: string;
  onChangePersonalEmailUserFormData: (e: any) => void;

  handleConfirmEditAdminFormData: (
    e: React.FormEvent<HTMLFormElement>
  ) => Promise<void>;
  initialValuesEditAdminFormData: Store | undefined;
}> = ({
  principalEmailUserFormData,
  onChangePrincipalEmailUserFormData,
  corporateEmailUserFormData,
  onChangeCorporateEmailUserFormData,
  personalEmailUserFormData,
  onChangePersonalEmailUserFormData,
  handleConfirmEditAdminFormData,
  initialValuesEditAdminFormData,
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
              { required: true, message: "¡Por favor ingrese el correo!" },
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
        </Col>
      </Row>
    </Form>
  );
};

export default EditUserFormData;
