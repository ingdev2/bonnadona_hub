"use client";

import React from "react";

import { Tag } from "antd";

const CustomTags: React.FC<{ tag: CustomTag }> = ({ tag }) => {
  return (
    <Tag
      key={tag.label}
      color={tag.color}
      style={{
        color: tag.textColor,
        paddingInline: "13px",
        margin: "4px",
      }}
    >
      {tag.label}
    </Tag>
  );
};

export default CustomTags;
