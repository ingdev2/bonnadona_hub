import React, { useState } from "react";

import { useAppDispatch, useAppSelector } from "@/redux/hooks";

import CustomSpin from "@/components/common/custom_spin/CustomSpin";
import CustomMessage from "@/components/common/custom_messages/CustomMessage";
import CustomModalNoContent from "@/components/common/custom_modal_no_content/CustomModalNoContent";

import CollaboratorPersonalDataFormData from "./CollaboratorPersonalDataFormData";
import CollaboratorPersonalEditDataForm from "../collaborator_personal_edit_data_forms/CollaboratorPersonalEditDataForm";

import { setCollaboratorModalIsOpen } from "@/redux/features/common/modal/modalSlice";
import { TbPasswordUser } from "react-icons/tb";

const CollaboratorPersonalDataForm: React.FC = () => {
  const dispatch = useAppDispatch();

  const NOT_REGISTER: string = "NO REGISTRA";

  const nameUserState = useAppSelector((state) => state.user.name);
  const lastNameUserState = useAppSelector((state) => state.user.last_name);
  const idTypeNameUserState = useAppSelector(
    (state) => state.user.user_id_type_abbrev
  );
  const idNumberUserState = useAppSelector((state) => state.user.id_number);
  const genderNameUserState = useAppSelector(
    (state) => state.user.user_gender_abbrev
  );
  const positionUserState = useAppSelector(
    (state) => state.user.collaborator_position
  );
  const serviceUserState = useAppSelector(
    (state) => state.user.collaborator_service
  );
  const principalEmailUserState = useAppSelector(
    (state) => state.user.principal_email
  );
  const personalEmailUserState = useAppSelector(
    (state) => state.user.personal_email
  );
  const personalCellphoneUserState = useAppSelector(
    (state) => state.user.personal_cellphone
  );
  const errorsUserState = useAppSelector((state) => state.user.errors);

  const isOpenModalChangeData = useAppSelector(
    (state) => state.modal.collaboratorModalIsOpen
  );

  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [showErrorMessage, setShowErrorMessage] = useState(false);

  return (
    <>
      {!nameUserState ||
      !lastNameUserState ||
      !idTypeNameUserState ||
      !idNumberUserState ||
      !genderNameUserState ||
      !positionUserState ||
      !serviceUserState ||
      !principalEmailUserState ? (
        <CustomSpin />
      ) : (
        <>
          {showErrorMessage && (
            <CustomMessage
              typeMessage="error"
              message={errorsUserState?.toString() || "¡Error en la petición!"}
            />
          )}

          {showSuccessMessage && (
            <CustomMessage
              typeMessage="success"
              message={successMessage || "¡Proceso finalizado con éxito!"}
            />
          )}

          {isOpenModalChangeData && (
            <CustomModalNoContent
              key={"custom-modal-edit-user-data"}
              widthCustomModalNoContent={"31%"}
              openCustomModalState={isOpenModalChangeData}
              closableCustomModal={true}
              maskClosableCustomModal={true}
              handleCancelCustomModal={() => {
                dispatch(setCollaboratorModalIsOpen(false));
              }}
              contentCustomModal={<CollaboratorPersonalEditDataForm />}
            />
          )}

          <CollaboratorPersonalDataFormData
            nameUserFormData={nameUserState || NOT_REGISTER}
            lastNameUserFormData={lastNameUserState || NOT_REGISTER}
            idTypeNameUserFormData={idTypeNameUserState || NOT_REGISTER}
            idNumberUserFormData={idNumberUserState || NOT_REGISTER}
            genderNameUserFormData={genderNameUserState || NOT_REGISTER}
            positionUserFormData={positionUserState || NOT_REGISTER}
            serviceUserFormData={serviceUserState || NOT_REGISTER}
            personalCellphoneUserUserFormData={
              personalCellphoneUserState || NOT_REGISTER
            }
            personalEmailUserUserFormData={
              personalEmailUserState || NOT_REGISTER
            }
            principalEmailUserUserFormData={
              principalEmailUserState || NOT_REGISTER
            }
            iconChangeEditUserDataForm={<TbPasswordUser size={17} />}
            onClickChangeEditUserDataForm={() => {
              dispatch(setCollaboratorModalIsOpen(true));
            }}
          />
        </>
      )}
    </>
  );
};

export default CollaboratorPersonalDataForm;
