"use client";

import React, { useState } from "react";

import { Button, Popconfirm } from "antd";
import { DeleteOutlined } from "@ant-design/icons";

interface DeletePopConfirmProps {
  onConfirm: () => void;
  titleButton: string;
  loading?: boolean;
  title: string;
  description: string;
}

const CustomDeletePopConfirm: React.FC<DeletePopConfirmProps> = ({
  onConfirm,
  titleButton,
  loading,
  title,
  description,
}) => {
  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(loading);

  const showPopConfirm = () => {
    setOpen(true);
  };

  const handleOk = async () => {
    setConfirmLoading(true);
    onConfirm();
    setOpen(false);
    setConfirmLoading(false);
  };

  const handleCancel = () => {
    setOpen(false);
  };

  return (
    <Popconfirm
      title={title}
      description={description}
      open={open}
      onConfirm={handleOk}
      okButtonProps={{ loading: confirmLoading }}
      onCancel={handleCancel}
    >
      <Button
        size={"middle"}
        title={titleButton}
        shape="circle"
        icon={<DeleteOutlined />}
        style={{ background: "#ff4d4f", color: "#ffffff" }}
        onClick={showPopConfirm}
      />
    </Popconfirm>
  );
};

export default CustomDeletePopConfirm;
