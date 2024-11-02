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
      { verification_code: number; id_number: number }
    >({
      query: ({ verification_code, id_number }) => ({
        url: `verifyCodeAndLoginCollaboratorUser/${id_number}`,
        method: "POST",
        params: { id_number },
        body: { verification_code },
      }),
    }),

    resendVerificationUserCode: builder.mutation<
      Partial<UserLogin>,
      { id_type: number; id_number: number }
    >({
      query: ({ id_type, id_number }) => ({
        url: `resendVerificationUserCode`,
        method: "POST",
        body: { id_type, id_number },
      }),
    }),
  }),
});

export const {
  useLoginCollaboratorUserMutation,
  useVerifyCodeAndLoginCollaboratorUserMutation,
  useResendVerificationUserCodeMutation,
} = loginUserApi;
