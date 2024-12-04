"use client";

import React, { useState } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import CustomSpin from "@/components/common/custom_spin/CustomSpin";
import CustomMessage from "@/components/common/custom_messages/CustomMessage";
import UserPersonalDataFormData from "./UserPersonalDataFormData";
import { TbPasswordUser } from "react-icons/tb";
import { setAdminModalIsOpen } from "@/redux/features/common/modal/modalSlice";

const UserPersonalDataForm: React.FC = () => {
  const dispatch = useAppDispatch();

  const NOT_REGISTER: string = "NO REGISTRA";

  const idUserState = useAppSelector((state) => state.user.id);
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
  const userErrorsState = useAppSelector((state) => state.user.errors);

  const isOpenModalChangeData = useAppSelector(
    (state) => state.modal.adminModalIsOpen
  );

  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [showErrorMessageAdmin, setShowErrorMessageAdmin] = useState(false);

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
          {showErrorMessageAdmin && (
            <CustomMessage
              typeMessage="error"
              message={userErrorsState?.toString() || "¡Error en la petición!"}
            />
          )}

          {showSuccessMessage && (
            <CustomMessage
              typeMessage="success"
              message={successMessage || "¡Proceso finalizado con éxito!"}
            />
          )}

          <UserPersonalDataFormData
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
            onClickChangeEditUserDataForm={() =>
              dispatch(setAdminModalIsOpen(true))
            }
          />
        </>
      )}
    </>
  );
};

export default UserPersonalDataForm;
