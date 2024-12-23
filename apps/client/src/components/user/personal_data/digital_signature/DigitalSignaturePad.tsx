"use client";

import React, { useEffect, useRef, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import SignatureCanvas from "react-signature-canvas";

import { Col, Row } from "antd";
import CustomMessage from "@/components/common/custom_messages/CustomMessage";
import CustomButton from "@/components/common/custom_button/CustomButton";
import CustomSpin from "@/components/common/custom_spin/CustomSpin";

import { titleStyleCss } from "@/theme/text_styles";

import { setErrorsUserProfile } from "@/redux/features/user_profile/userProfileSlice";

import {
  useGetUserActiveProfileByIdQuery,
  useUpdateUserDigitalSignatureMutation,
} from "@/redux/apis/users/userApi";

function DigitalSignaturePad() {
  const dispatch = useAppDispatch();

  const userIdState = useAppSelector((state) => state.user.id);

  const signatureRef = useRef<SignatureCanvas | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const [isCanvasEmpty, setIsCanvasEmpty] = useState(true);
  const [signatureUrlLocalState, setSignatureUrlLocalState] =
    useState<string>("");

  const [isSubmittingUpdateData, setIsSubmittingUpdateData] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [showErrorMessage, setShowErrorMessage] = useState(false);

  const {
    data: userActiveProfileByIdData,
    isLoading: userActiveProfileByIdLoading,
    isFetching: userActiveProfileByIdFetching,
    error: userActiveProfileByIdError,
    refetch: refetchUserActiveProfile,
  } = useGetUserActiveProfileByIdQuery(userIdState, { skip: !userIdState });

  const [
    updateUserDigitalSignData,
    {
      data: updateUserDigitalSignatureData,
      isLoading: updateUserDigitalSignatureLoading,
      isSuccess: updateUserDigitalSignatureSuccess,
      isError: updateUserDigitalSignatureError,
    },
  ] = useUpdateUserDigitalSignatureMutation({
    fixedCacheKey: "updateUserDigitalSignData",
  });

  const digitalSignatureUpdated = userActiveProfileByIdData?.digital_signature;

  useEffect(() => {
    if (digitalSignatureUpdated && !signatureUrlLocalState) {
      setSignatureUrlLocalState(digitalSignatureUpdated);
    }

    const resizeCanvas = () => {
      if (containerRef.current && signatureRef.current) {
        const { offsetWidth, offsetHeight } = containerRef.current;
        signatureRef.current.getCanvas().width = offsetWidth;
        signatureRef.current.getCanvas().height = offsetHeight;
      }
    };

    window.addEventListener("resize", resizeCanvas);
    resizeCanvas();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
    };
  }, [signatureUrlLocalState]);

  const handleUpdateDigitalSign = async () => {
    try {
      setIsSubmittingUpdateData(true);

      if (signatureRef.current) {
        if (signatureRef.current.isEmpty()) {
          return;
        }

        const trimmedCanvas = signatureRef.current.getTrimmedCanvas();
        const resizedCanvas = document.createElement("canvas");
        const context = resizedCanvas.getContext("2d", {
          willReadFrequently: true,
        });

        const width = 720;
        const height = 405;

        resizedCanvas.width = width;
        resizedCanvas.height = height;

        context?.drawImage(trimmedCanvas, 0, 0, width, height);

        const resizedSignatureDataUrl = resizedCanvas.toDataURL("image/png");

        setSignatureUrlLocalState(resizedSignatureDataUrl);

        const response: any = await updateUserDigitalSignData({
          userId: userIdState,
          digitalSignature: {
            digital_signature: resizedSignatureDataUrl,
          },
        });

        let editDataError = response.error;

        let editDataStatus = response.data?.statusCode;

        let editDataValidationData = response.data?.message;

        if (editDataError || editDataStatus !== 202) {
          const errorMessage = editDataError?.data.message;
          const validationDataMessage = editDataValidationData;

          if (Array.isArray(errorMessage)) {
            dispatch(setErrorsUserProfile(errorMessage[0]));

            setShowErrorMessage(true);
          } else if (typeof errorMessage === "string") {
            dispatch(setErrorsUserProfile(errorMessage));

            setShowErrorMessage(true);
          }

          if (Array.isArray(validationDataMessage)) {
            dispatch(setErrorsUserProfile(validationDataMessage[0]));

            setShowErrorMessage(true);
          } else if (typeof validationDataMessage === "string") {
            dispatch(setErrorsUserProfile(validationDataMessage));

            setShowErrorMessage(true);
          }
        }

        if (editDataStatus === 202 && !editDataError) {
          setSuccessMessage("¡Firma actualizada correctamente!");
          setShowSuccessMessage(true);

          setIsCanvasEmpty(true);
        }
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsSubmittingUpdateData(false);

      await refetchUserActiveProfile();
    }
  };

  const handleClearSignature = () => {
    signatureRef.current?.clear();

    setIsCanvasEmpty(true);
  };

  const handleCanvasEnd = () => {
    if (signatureRef.current) {
      setIsCanvasEmpty(signatureRef.current.isEmpty());
    }
  };

  const handleButtonClick = () => {
    dispatch(setErrorsUserProfile([]));
    setShowErrorMessage(false);
    setShowSuccessMessage(false);
  };

  return (
    <>
      {showSuccessMessage && (
        <CustomMessage
          typeMessage="success"
          message={successMessage || "¡Firma actualizada correctamente!"}
        />
      )}

      <Row
        gutter={24}
        justify={"center"}
        align={"middle"}
        style={{
          display: "flex",
          flexFlow: "row wrap",
          width: "100%",
          paddingBlock: "13px",
          paddingInline: "13px",
        }}
      >
        <Col
          span={24}
          style={{
            display: "flex",
            flexFlow: "column wrap",
            alignItems: "center",
            alignContent: "center",
            justifyContent: "center",
          }}
        >
          <h2 style={{ ...titleStyleCss, paddingBlock: "7px" }}>
            Firma digital actual
          </h2>

          <div
            style={{
              border: "2px solid #A7AFBA",
              display: "flex",
              width: "88%",
              borderRadius: "22px",
              justifyContent: "center",
              alignContent: "center",
              alignItems: "center",
              padding: "2px",
              margin: "0px",
            }}
          >
            {signatureUrlLocalState ? (
              <img
                src={signatureUrlLocalState}
                alt="digital-signature-image"
                style={{
                  maxWidth: "100%",
                  maxHeight: "100%",
                  objectFit: "contain",
                }}
              />
            ) : (
              <h2 style={{ ...titleStyleCss, color: "#960202" }}>SIN FIRMA</h2>
            )}
          </div>
        </Col>

        <Col
          span={24}
          style={{
            display: "flex",
            flexFlow: "column wrap",
            alignItems: "center",
            alignContent: "center",
            justifyContent: "center",
          }}
        >
          <h2 style={{ ...titleStyleCss, paddingBlock: "13px" }}>
            Dibuje su nueva firma digital aquí debajo
          </h2>

          <div
            ref={containerRef}
            style={{
              display: "flex",
              border: "2px solid #903301",
              width: "72%",
              height: 173,
              borderRadius: "22px",
              padding: "13px",
              alignItems: "center",
              alignContent: "center",
              justifyContent: "center",
            }}
          >
            <SignatureCanvas
              canvasProps={{
                width: "100%",
                height: "100%",
                className: "sigCanvas",
              }}
              ref={signatureRef}
              onEnd={handleCanvasEnd}
              velocityFilterWeight={0.8}
              dotSize={1.3}
              minWidth={1.3}
              maxWidth={2.2}
              penColor="black"
              throttle={13}
            />
          </div>
        </Col>

        <Col
          span={24}
          style={{
            paddingBlock: "13px",
            alignItems: "stretch",
            alignContent: "space-around",
            justifyContent: "space-evenly",
            display: "flex",
            flexFlow: "row wrap",
          }}
        >
          {isSubmittingUpdateData ? (
            <CustomSpin />
          ) : (
            <CustomButton
              typeCustomButton="primary"
              titleCustomButton="Limpiar"
              onClickCustomButton={handleClearSignature}
              sizeCustomButton="middle"
              disabledCustomButton={isCanvasEmpty}
              styleCustomButton={{
                color: isCanvasEmpty ? "#07070722" : "#F7F7F7",
                backgroundColor: isCanvasEmpty ? "#A7BAB7" : "#8C1111",
                paddingInline: "31px",
                marginBlock: "4px",
                borderRadius: "31px",
              }}
            />
          )}

          {isSubmittingUpdateData ? (
            <CustomSpin />
          ) : (
            <CustomButton
              typeCustomButton="primary"
              titleCustomButton="Guardar"
              onClickCustomButton={handleUpdateDigitalSign}
              onMouseDownCustomButton={handleButtonClick}
              sizeCustomButton="middle"
              disabledCustomButton={isCanvasEmpty}
              styleCustomButton={{
                color: isCanvasEmpty ? "#07070722" : "#F7F7F7",
                backgroundColor: isCanvasEmpty ? "#A7BAB7" : "#1D8348",
                paddingInline: "31px",
                marginBlock: "4px",
                borderRadius: "31px",
              }}
            />
          )}
        </Col>
      </Row>
    </>
  );
}

export default DigitalSignaturePad;
