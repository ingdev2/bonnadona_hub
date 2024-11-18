+"use client";

import React, { ReactNode } from "react";

import { Button } from "antd";
import { ButtonHTMLType, ButtonType } from "antd/es/button";
import { SizeType } from "antd/es/config-provider/SizeContext";

const CustomButton: React.FC<{
  titleCustomButton?: string;
  typeCustomButton: ButtonType;
  htmlTypeCustomButton?: ButtonHTMLType;
  idCustomButton?: string | undefined;
  classNameCustomButton?: string;
  sizeCustomButton: SizeType;
  styleCustomButton: React.CSSProperties | undefined;
  iconCustomButton?: ReactNode;
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
  styleCustomButton,
  iconCustomButton,
  iconPositionCustomButton,
  formCustomButton,
  disabledCustomButton,
  onClickCustomButton,
  onMouseDownCustomButton,
}) => {
  return (
    <Button
      id={idCustomButton}
      className={classNameCustomButton}
      type={typeCustomButton}
      size={sizeCustomButton}
      htmlType={htmlTypeCustomButton || "button"}
      style={styleCustomButton}
      icon={iconCustomButton}
      iconPosition={iconPositionCustomButton}
      form={formCustomButton}
      disabled={disabledCustomButton}
      onClick={onClickCustomButton}
      onMouseDown={onMouseDownCustomButton}
    >
      {titleCustomButton}
    </Button>
  );
};

export default CustomButton;
