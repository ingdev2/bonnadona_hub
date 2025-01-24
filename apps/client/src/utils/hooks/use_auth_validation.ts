import { useEffect } from "react";
import { useSession } from "next-auth/react";
import { useAppDispatch } from "@/redux/hooks";
import { redirect } from "next/navigation";

import { setIdNumberUser } from "@/redux/features/user/userSlice";

const useAuthValidation = () => {
  const { data: session, status } = useSession();
  const dispatch = useAppDispatch();

  const idNumberUserSession = session?.user?.id_number;

  useEffect(() => {
    if (idNumberUserSession) {
      dispatch(setIdNumberUser(idNumberUserSession));
    }

    if (status === "unauthenticated") {
      redirect(`${process.env.NEXT_PUBLIC_BONNA_HUB_URL}/login`);
    }
  }, [status, idNumberUserSession, session]);
};

export default useAuthValidation;
