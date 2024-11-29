"use client";

import React from "react";
import { useRouter } from "next/navigation";

import { Button, Col, Row } from "antd";
import CustomSpin from "@/components/common/custom_spin/CustomSpin";
import { IoMdAddCircleOutline } from "react-icons/io";
import { subtitleStyleCss } from "@/theme/text_styles";

import { useGetAllPermissionsQuery } from "@/redux/apis/permission/permissionApi";

const CreateButton: React.FC<{
  isSubmittingCreateButton: boolean;
  setIsSubmittingCreateButton: React.Dispatch<React.SetStateAction<boolean>>;
}> = ({ isSubmittingCreateButton, setIsSubmittingCreateButton }) => {
  const router = useRouter();

  const {
    data: allPermissionsData,
    isLoading: allPermissionsLoading,
    isFetching: allPermissionsFetching,
    error: allPermissionsError,
    refetch: refecthAllPermissions,
  } = useGetAllPermissionsQuery(null);

  return (
    <Row
      align="middle"
      justify={"center"}
      style={{
        width: "100%",
        display: "flex",
        flexFlow: "row wrap",
        marginBlock: "7px",
      }}
    >
      <Col
        span={18}
        style={{
          width: "100%",
          display: "flex",
          flexFlow: "row wrap",
          justifyContent: "center",
          alignContent: "center",
          alignItems: "center",
          padding: "0px",
          margin: "0px",
        }}
      >
        <h2
          style={{
            ...subtitleStyleCss,
            textAlign: "center",
            marginLeft: "45px",
          }}
        >
          Total de&nbsp;
          <b>
            {allPermissionsData?.length || 0}
            &nbsp;permiso(s) de usuarios
          </b>
        </h2>
      </Col>

      <Col
        span={6}
        style={{
          width: "100%",
          display: "flex",
          flexFlow: "row wrap",
          justifyContent: "center",
          alignContent: "center",
          alignItems: "center",
          padding: "0px",
          margin: "0px",
        }}
      >
        {isSubmittingCreateButton ? (
          <CustomSpin />
        ) : (
          <Button
            type="primary"
            size="middle"
            icon={<IoMdAddCircleOutline size={17} />}
            style={{
              backgroundColor: "#1D8348",
              color: "#f2f2f2",
              fontWeight: "bold",
              display: "flex",
              flexFlow: "row wrap",
              alignContent: "center",
              alignItems: "center",
              paddingInline: "13px",
              margin: "0px",
            }}
            htmlType="button"
            className="permission-register-button"
            onClick={async () => {
              try {
                setIsSubmittingCreateButton(true);

                await router.push("manage_permissions/register", {
                  scroll: true,
                });
              } catch (error) {
                console.error(error);
              } finally {
                setIsSubmittingCreateButton(false);
              }
            }}
          >
            Crear nuevo
          </Button>
        )}
      </Col>
    </Row>
  );
};

export default CreateButton;
