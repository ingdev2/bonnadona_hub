"use client";

import React from "react";

import { Card, Col, Descriptions, Row } from "antd";

import { titleStyleCss, subtitleStyleCss } from "@/theme/text_styles";

const ModalAuditLogDetails: React.FC<{
  titleDescription: string;
  labelAuditLogId: string;
  selectedAuditLogId: string | undefined;
  labelUserNameAuditLog: string;
  selectedUserNameAuditLog: string | undefined;
  labelUserIdNumberAuditLog: string;
  selectedUserIdNumberAuditLog: string | undefined;
  labelUserEmailAuditLog: string;
  selectedUserEmailAuditLog: string | undefined;
  labelUserRoleAuditLog: string;
  selectedUserRoleAuditLog: string | undefined;
  labelActionTypeAuditLog: string;
  selectedActionTypeAuditLog: string | undefined;
  labelAppNameAuditLog: string;
  selectedAppNameAuditLog: string | undefined;
  labelQueryTypeAuditLog: string;
  selectedQueryTypeAuditLog: string | undefined;
  labelModuleNameAuditLog: string;
  selectedModuleNameAuditLog: string | undefined;
  labelModuleRecordIdAuditLog: string;
  selectedModuleRecordIdAuditLog: string | undefined;
  labelIpAddressAuditLog: string;
  selectedIpAddressAuditLog: string | undefined;
  labelIsMobileAuditLog: string;
  selectedIsMobileAuditLog: string | undefined;
  labelBrowserVersionAuditLog: string;
  selectedBrowserVersionAuditLog: string | undefined;
  labelOperatingSystemAuditLog: string;
  selectedOperatingSystemAuditLog: string | undefined;
  labelDateOfAuditLog: string;
  selectedDateOfAuditLog: string | undefined;
  labelHourOfAuditLog: string;
  selectedHourOfAuditLog: string | undefined;
}> = ({
  titleDescription,
  labelAuditLogId,
  selectedAuditLogId,
  labelUserNameAuditLog,
  selectedUserNameAuditLog,
  labelUserIdNumberAuditLog,
  selectedUserIdNumberAuditLog,
  labelUserEmailAuditLog,
  selectedUserEmailAuditLog,
  labelUserRoleAuditLog,
  selectedUserRoleAuditLog,
  labelActionTypeAuditLog,
  selectedActionTypeAuditLog,
  labelAppNameAuditLog,
  selectedAppNameAuditLog,
  labelQueryTypeAuditLog,
  selectedQueryTypeAuditLog,
  selectedModuleNameAuditLog,
  labelModuleNameAuditLog,
  labelModuleRecordIdAuditLog,
  selectedModuleRecordIdAuditLog,
  labelIpAddressAuditLog,
  selectedIpAddressAuditLog,
  labelIsMobileAuditLog,
  selectedIsMobileAuditLog,
  labelBrowserVersionAuditLog,
  selectedBrowserVersionAuditLog,
  labelOperatingSystemAuditLog,
  selectedOperatingSystemAuditLog,
  labelDateOfAuditLog,
  selectedDateOfAuditLog,
  labelHourOfAuditLog,
  selectedHourOfAuditLog,
}) => {
  return (
    <Col
      xs={24}
      sm={24}
      md={24}
      lg={24}
      style={{ padding: "0px", margin: "0px" }}
    >
      <Card
        title="Registros de auditoría"
        style={{ marginTop: "22px", marginBottom: "7px", padding: "0px" }}
      >
        <Row
          gutter={24}
          justify={"center"}
          align={"middle"}
          style={{ padding: "0px", margin: "0px" }}
        >
          <Col
            xs={24}
            sm={24}
            md={24}
            lg={12}
            style={{ margin: "0px", paddingInline: "7px", paddingBlock: "7px" }}
          >
            <Descriptions
              size="small"
              column={1}
              labelStyle={{
                ...titleStyleCss,
                width: "222px",
                paddingInlineEnd: "0px",
                margin: "0px",
              }}
              contentStyle={subtitleStyleCss}
              layout="horizontal"
              bordered
            >
              <Descriptions.Item label={labelAuditLogId}>
                {selectedAuditLogId}
              </Descriptions.Item>

              <Descriptions.Item label={labelUserNameAuditLog}>
                {selectedUserNameAuditLog}
              </Descriptions.Item>

              <Descriptions.Item label={labelUserRoleAuditLog}>
                {selectedUserRoleAuditLog}
              </Descriptions.Item>

              <Descriptions.Item label={labelUserIdNumberAuditLog}>
                {selectedUserIdNumberAuditLog}
              </Descriptions.Item>

              <Descriptions.Item label={labelUserEmailAuditLog}>
                {selectedUserEmailAuditLog}
              </Descriptions.Item>
            </Descriptions>
          </Col>

          <Col
            xs={24}
            sm={24}
            md={24}
            lg={12}
            style={{ margin: "0px", paddingInline: "7px", paddingBlock: "7px" }}
          >
            <Descriptions
              size="small"
              column={1}
              labelStyle={{
                ...titleStyleCss,
                width: "222px",
                paddingInlineEnd: "0px",
                margin: "0px",
              }}
              contentStyle={subtitleStyleCss}
              layout="horizontal"
              bordered
            >
              <Descriptions.Item label={labelModuleRecordIdAuditLog}>
                {selectedModuleRecordIdAuditLog}
              </Descriptions.Item>

              <Descriptions.Item label={labelIpAddressAuditLog}>
                {selectedIpAddressAuditLog}
              </Descriptions.Item>

              <Descriptions.Item label={labelIsMobileAuditLog}>
                {selectedIsMobileAuditLog}
              </Descriptions.Item>

              <Descriptions.Item label={labelBrowserVersionAuditLog}>
                {selectedBrowserVersionAuditLog}
              </Descriptions.Item>

              <Descriptions.Item label={labelOperatingSystemAuditLog}>
                {selectedOperatingSystemAuditLog}
              </Descriptions.Item>
            </Descriptions>
          </Col>

          <Col
            xs={24}
            sm={24}
            md={24}
            lg={14}
            style={{ margin: "0px", paddingInline: "7px", paddingBlock: "7px" }}
          >
            <Descriptions
              size="small"
              column={1}
              labelStyle={{
                ...titleStyleCss,
                width: "222px",
                paddingInlineEnd: "0px",
                margin: "0px",
              }}
              contentStyle={subtitleStyleCss}
              layout="horizontal"
              bordered
            >
              <Descriptions.Item label={labelModuleNameAuditLog}>
                {selectedModuleNameAuditLog}
              </Descriptions.Item>

              <Descriptions.Item label={labelActionTypeAuditLog}>
                {selectedActionTypeAuditLog}
              </Descriptions.Item>

              <Descriptions.Item label={labelAppNameAuditLog}>
                {selectedAppNameAuditLog}
              </Descriptions.Item>

              <Descriptions.Item label={labelDateOfAuditLog}>
                {selectedDateOfAuditLog}
              </Descriptions.Item>

              <Descriptions.Item label={labelHourOfAuditLog}>
                {selectedHourOfAuditLog}
              </Descriptions.Item>
            </Descriptions>
          </Col>
        </Row>
      </Card>
    </Col>
  );
};

export default ModalAuditLogDetails;
