import React, { useEffect, useState } from "react";
import { signOut, useSession } from "next-auth/react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { useRouter } from "next/navigation";

import {
  Form,
  Input,
  Button,
  Typography,
  Col,
  Carousel,
  Row,
  Image,
} from "antd";
import { titleStyleCss } from "@/theme/text_styles";

import { UserOutlined } from "@ant-design/icons";
import { RiLockPasswordLine } from "react-icons/ri";

import CustomMessage from "@/components/common/custom_messages/CustomMessage";
import CustomModalNoContent from "@/components/common/custom_modal_no_content/CustomModalNoContent";
import { RolesEnum } from "@/utils/enums/roles/roles.enum";
import { useLoginAdminAndAuditorUserMutation } from "@/redux/apis/auth/loginAdminApi";
import {
  resetLoginStateAdmin,
  setErrorsLoginAdmin,
  setPasswordLoginAdmin,
  setPrincipalEmailLoginAdmin,
} from "@/redux/features/login/adminLoginSlice";
import { setDefaultValuesUser } from "@/redux/features/user/userSlice";
import { setAdminModalIsOpen } from "@/redux/features/common/modal/modalSlice";

const AdminLoginForm: React.FC = () => {
  const { data: session, status } = useSession();
  const dispatch = useAppDispatch();

  const errorsAdminState = useAppSelector((state) => state.adminLogin.errors);

  const modalIsOpenAdmin = useAppSelector(
    (state) => state.modal.adminModalIsOpen
  );

  const [principalEmailAdminLocalState, setPrincipalEmailAdminLocalState] =
    useState("");
  const [passwordAdminLocalState, setPasswordAdminLocalState] = useState("");

  const [modalForgotMyPasswordIsOpen, setModalForgotMyPasswordIsOpen] =
    useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showErrorMessage, setShowErrorMessage] = useState(false);

  const [
    loginAdminUsers,
    {
      data: isloginAdminAndAuditorData,
      isLoading: isloginAdminAndAuditorLoading,
      isSuccess: isloginAdminAndAuditorSuccess,
      isError: isloginAdminAndAuditorError,
    },
  ] = useLoginAdminAndAuditorUserMutation({
    fixedCacheKey: "loginAdminAndAuditorData",
  });

  useEffect(() => {
    if (
      (status === "authenticated" && session?.user.role === RolesEnum.ADMIN) ||
      session?.user.role === RolesEnum.SUPER_ADMIN ||
      session?.user.role === RolesEnum.AUDITOR
    ) {
      signOut();
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    try {
      setIsSubmitting(true);
      dispatch(resetLoginStateAdmin());
      dispatch(setDefaultValuesUser());

      const response: any = await loginAdminUsers({
        principal_email: principalEmailAdminLocalState,
        password: passwordAdminLocalState,
      });

      let isLoginUserError = response.error;
      let isLoginUserSuccess = response.data;
      let isLoginUserBan = response.data?.statusCode;

      if (isLoginUserError) {
        const errorMessage = isLoginUserError?.data.message;

        if (Array.isArray(errorMessage)) {
          dispatch(setErrorsLoginAdmin(errorMessage[0]));
          setShowErrorMessage(true);
        } else if (typeof errorMessage === "string") {
          dispatch(setErrorsLoginAdmin(errorMessage));
          setShowErrorMessage(true);
        }
      }
      if (isLoginUserBan === 202) {
        dispatch(setErrorsLoginAdmin(response.data?.message));
        setShowErrorMessage(true);
      }

      if (isLoginUserSuccess && !isLoginUserError && !isLoginUserBan) {
        dispatch(setPrincipalEmailLoginAdmin(principalEmailAdminLocalState));
        dispatch(setPasswordLoginAdmin(passwordAdminLocalState));
        dispatch(setErrorsLoginAdmin([]));
        dispatch(setAdminModalIsOpen(true));
        setShowErrorMessage(false);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleButtonClick = () => {
    dispatch(setErrorsLoginAdmin([]));
    setShowErrorMessage(false);
  };

  return <div>AdminLoginForm</div>;
};

export default AdminLoginForm;
