import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const passwordPolicyApi = createApi({
  reducerPath: "passwordPolicyApi",

  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_BACKEND_URL}/password-policy`,
  }),

  endpoints: (builder) => ({
    getPasswordPolicy: builder.query<PasswordPolicy, null>({
      query: () => "getPasswordPolicy",
    }),

    updatePasswordPolicy: builder.mutation<
      any,
      { updatePasswordPolicy: Partial<PasswordPolicy> }
    >({
      query: ({ updatePasswordPolicy }) => ({
        url: `update/`,
        method: "PATCH",
        body: updatePasswordPolicy,
      }),
    }),
  }),
});

export const { useGetPasswordPolicyQuery, useUpdatePasswordPolicyMutation } =
  passwordPolicyApi;
