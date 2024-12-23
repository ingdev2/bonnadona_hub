"use client";

import React, { useState } from "react";
import { useAppDispatch } from "@/redux/hooks";

import { Button } from "antd";
import CustomModalNoContent from "@/components/common/custom_modal_no_content/CustomModalNoContent";
import DigitalSignaturePad from "./DigitalSignaturePad";
import { FaFileSignature } from "react-icons/fa6";
import { setDigitalSignatureUserProfile } from "@/redux/features/user_profile/userProfileSlice";

const DigitalSignatureModal: React.FC<{}> = () => {
  const dispatch = useAppDispatch();

  const [isModalOpenLocalState, setIsModalOpenLocalState] = useState(false);

  return (
    <div
      style={{
        display: "flex",
        flexFlow: "column wrap",
        alignItems: "center",
        alignContent: "center",
        justifyContent: "center",
        paddingBlock: "22px",
      }}
    >
      {isModalOpenLocalState && (
        <CustomModalNoContent
          key={"custom-modal-update-digital-signature"}
          widthCustomModalNoContent={"50%"}
          openCustomModalState={isModalOpenLocalState}
          closableCustomModal={true}
          maskClosableCustomModal={true}
          handleCancelCustomModal={() => {
            dispatch(setDigitalSignatureUserProfile(""));

            setIsModalOpenLocalState(false);
          }}
          contentCustomModal={<DigitalSignaturePad />}
        />
      )}

      <Button
        style={{
          color: "#F7F7F7",
          backgroundColor: "#015E90",
          fontWeight: "bold",
          borderRadius: "31px",
          paddingBlock: "20px",
          paddingInline: "31px",
        }}
        type="primary"
        size="middle"
        className="change-digital-signature-user"
        icon={<FaFileSignature />}
        onClick={() => {
          setIsModalOpenLocalState(true);
        }}
      >
        Actualizar firma digital
      </Button>
    </div>
  );
};

export default DigitalSignatureModal;
