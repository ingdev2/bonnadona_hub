import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const loginAdminApi = createApi({
  reducerPath: "loginAdminApi",

  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth`,
  }),

  endpoints: (builder) => ({
    loginAdminAndAuditorUser: builder.mutation<
      Partial<AdminLogin>,
      Partial<AdminLogin>
    >({
      query: (newAdminAndAuditorUserLogin) => ({
        url: "loginAdminAndAuditorUser",
        method: "POST",
        body: newAdminAndAuditorUserLogin,
      }),
    }),

    verifyCodeAndLoginAdminAndAuditorUser: builder.mutation<
      Partial<AdminLogin>,
      { verification_code: number; principalEmail: string }
    >({
      query: ({ verification_code, principalEmail }) => ({
        url: `verifyCodeAndLoginAdminAndAuditorUser/${principalEmail}`,
        method: "POST",
        params: { principalEmail },
        body: { verification_code },
      }),
    }),

    resendVerificationUserCode: builder.mutation<
      Partial<AdminLogin>,
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
  useLoginAdminAndAuditorUserMutation,
  useVerifyCodeAndLoginAdminAndAuditorUserMutation,
  useResendVerificationUserCodeMutation,
} = loginAdminApi;
