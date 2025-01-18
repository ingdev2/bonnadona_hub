"use client";

import React from "react";

import { Tag } from "antd";

const CustomTags: React.FC<{
  color: string;
  label: string;
  textColor: string;
  closableCustomTagRender?: boolean;
  onCloseCustomTagRender?: (e: any) => void;
}> = ({
  color,
  label,
  textColor,
  closableCustomTagRender,
  onCloseCustomTagRender,
}) => {
  const onPreventMouseDown = (event: React.MouseEvent<HTMLSpanElement>) => {
    event.preventDefault();
    event.stopPropagation();
  };

  return (
    <Tag
      key={label}
      color={color}
      style={{
        color: textColor,
        paddingInline: "13px",
        margin: "4px",
      }}
      onMouseDown={onPreventMouseDown}
      closable={closableCustomTagRender}
      onClose={onCloseCustomTagRender}
    >
      {label}
    </Tag>
  );
};

export default CustomTags;
