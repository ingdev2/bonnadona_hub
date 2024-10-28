"use client";

import React, { ReactNode } from "react";

import { Button, Result } from "antd";
import { ResultStatusType } from "antd/es/result";
import CustomSpin from "../custom_spin/CustomSpin";

const CustomResultOneButton: React.FC<{
  statusTypeResult: ResultStatusType;
  titleCustomResult: string;
  subtitleCustomResult: ReactNode;
  handleClickCustomResult: () => void;
  isSubmittingButton: boolean;
  textButtonCustomResult: string;
}> = ({
  statusTypeResult,
  titleCustomResult,
  subtitleCustomResult,
  handleClickCustomResult,
  isSubmittingButton,
  textButtonCustomResult,
}) => {
  return (
    <Result
      key={"custom-result-one-button"}
      className="custom-result-one-button"
      status={statusTypeResult}
      title={titleCustomResult}
      subTitle={subtitleCustomResult}
      style={{
        maxWidth: "max-content",
        height: "max-content",
        display: "flex",
        flexFlow: "column wrap",
        alignItems: "center",
        justifyContent: "center",
        paddingBlock: 13,
        paddingInline: 7,
        margin: 0,
      }}
      extra={[
        isSubmittingButton ? (
          <CustomSpin key="custom-spin-custom-result-one-button" />
        ) : (
          <Button
            key={"button-custom-result"}
            className="button-custom-result"
            style={{
              borderRadius: "30px",
              backgroundColor: "#0085c8",
              color: "#f2f2f2",
            }}
            onClick={handleClickCustomResult}
            loading={isSubmittingButton}
          >
            {textButtonCustomResult}
          </Button>
        ),
      ]}
    />
  );
};

export default CustomResultOneButton;
