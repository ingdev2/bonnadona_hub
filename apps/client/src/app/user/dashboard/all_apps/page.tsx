"use client";

import React, { useState } from "react";

import AllAppsContent from "@/components/user/all_apps/AllAppsContent";
import { useAppDispatch } from "@/redux/hooks";
import { useSession } from "next-auth/react";
import CustomMessage from "@/components/common/custom_messages/CustomMessage";

const AllAppsPage: React.FC = () => {
  const { data: session, status } = useSession();
  const dispatch = useAppDispatch();

  const [showErrorMessage, setShowErrorMessage] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  console.log('session: ', session)
  return (
    <div>
      {showErrorMessage && (
        <CustomMessage
          typeMessage="error"
          message={errorMessage || "¡Error en la petición!"}
        />
      )}

      <div className="dashboard-all-apps-content">
        <AllAppsContent />
      </div>
    </div>
  );
};

export default AllAppsPage;
