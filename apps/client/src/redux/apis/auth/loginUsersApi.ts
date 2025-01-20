import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const loginUserApi = createApi({
  reducerPath: "loginUserApi",

  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth`,
  }),

  endpoints: (builder) => ({
    loginCollaboratorUser: builder.mutation<
      Partial<UserLogin>,
      Partial<UserLogin>
    >({
      query: (newCollaboratorUserLogin) => ({
        url: "loginCollaboratorUser",
        method: "POST",
        body: newCollaboratorUserLogin,
      }),
    }),

    verifyCodeAndLoginCollaboratorUser: builder.mutation<
      Partial<UserLogin>,
      { verification_code: number; principalEmail: string }
    >({
      query: ({ verification_code, principalEmail }) => ({
        url: `verifyCodeAndLoginCollaboratorUser/${principalEmail}`,
        method: "POST",
        params: { principalEmail },
        body: { verification_code },
      }),
    }),

    userLoginToApp: builder.mutation<
      any,
      { userIdNumber: number; appName: string }
    >({
      query: ({ userIdNumber, appName }) => ({
        url: `userLoginToApp/${userIdNumber}`,
        method: "POST",
        params: { userIdNumber },
        body: { appName },
      }),
    }),

    resendVerificationUserCode: builder.mutation<
      Partial<UserLogin>,
      { principal_email: string }
    >({
      query: ({ principal_email }) => ({
        url: `resendVerificationUserCode`,
        method: "POST",
        body: { principal_email },
      }),
    }),
  }),
});

export const {
  useLoginCollaboratorUserMutation,
  useVerifyCodeAndLoginCollaboratorUserMutation,
  useUserLoginToAppMutation,
  useResendVerificationUserCodeMutation,
} = loginUserApi;
