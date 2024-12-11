+"use client";

import React, { ReactNode } from "react";

import { Button } from "antd";
import { ButtonHTMLType, ButtonType, ButtonShape } from "antd/es/button";
import { SizeType } from "antd/es/config-provider/SizeContext";

const CustomButton: React.FC<{
  titleCustomButton?: string;
  typeCustomButton: ButtonType;
  htmlTypeCustomButton?: ButtonHTMLType;
  idCustomButton?: string | undefined;
  classNameCustomButton?: string;
  sizeCustomButton: SizeType;
  titleTooltipCustomButton?: string | undefined;
  styleCustomButton: React.CSSProperties | undefined;
  iconCustomButton?: ReactNode;
  shapeCustomButton?: ButtonShape;
  iconPositionCustomButton?: "start" | "end";
  formCustomButton?: string | undefined;
  disabledCustomButton?: boolean;
  onClickCustomButton: () => void;
  onMouseDownCustomButton?: () => void;
}> = ({
  titleCustomButton,
  typeCustomButton,
  htmlTypeCustomButton,
  idCustomButton,
  classNameCustomButton,
  sizeCustomButton,
  titleTooltipCustomButton,
  styleCustomButton,
  iconCustomButton,
  iconPositionCustomButton,
  formCustomButton,
  shapeCustomButton,
  disabledCustomButton,
  onClickCustomButton,
  onMouseDownCustomButton,
}) => {
  return (
    <Button
      id={idCustomButton}
      className={classNameCustomButton}
      type={typeCustomButton}
      title={titleTooltipCustomButton}
      size={sizeCustomButton}
      htmlType={htmlTypeCustomButton || "button"}
      style={styleCustomButton}
      icon={iconCustomButton}
      iconPosition={iconPositionCustomButton}
      form={formCustomButton}
      shape={shapeCustomButton}
      disabled={disabledCustomButton}
      onClick={onClickCustomButton}
      onMouseDown={onMouseDownCustomButton}
    >
      {titleCustomButton}
    </Button>
  );
};

export default CustomButton;
