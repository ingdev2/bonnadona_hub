"use client";

import React from "react";
import { Tag } from "antd";

interface CustomTag {
  idCustom: string;
  classNameCustom: string;
  labelCustom: string;
  numberCustom?: number;
  colorCustom: string;
  iconCustom?: React.ReactNode;
  stylesCustom?: React.CSSProperties;
}

const CustomTags: React.FC<CustomTag> = ({
  idCustom,
  classNameCustom,
  labelCustom,
  numberCustom,
  colorCustom,
  iconCustom,
  stylesCustom,
}) => {
  return (
    <Tag
      id={idCustom}
      className={classNameCustom}
      key={labelCustom}
      color={colorCustom}
      style={{ ...stylesCustom }}
    >
      <div style={{ display: "flex", gap: "10px" }}>
        {iconCustom}
        {labelCustom}
        {numberCustom}
      </div>
    </Tag>
  );
};

export default CustomTags;
