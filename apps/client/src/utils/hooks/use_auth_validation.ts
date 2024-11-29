import { useEffect } from "react";
import { useSession } from "next-auth/react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { redirect } from "next/navigation";

import { setIdNumberUser } from "@/redux/features/user/userSlice";

const useAuthValidation = () => {
  const { data: session, status } = useSession();
  const dispatch = useAppDispatch();

  const idNumberUserSession = session?.user?.id_number;

  const idNumberUserSessionState = useAppSelector(
    (state) => state.user.id_number
  );

  useEffect(() => {
    if (!idNumberUserSessionState) {
      dispatch(setIdNumberUser(idNumberUserSession));
    }

    if (status === "unauthenticated") {
      redirect(`${process.env.NEXT_PUBLIC_BONNA_HUB_URL}/login`);
    }
  }, [status, idNumberUserSessionState, session]);
};

export default useAuthValidation;
