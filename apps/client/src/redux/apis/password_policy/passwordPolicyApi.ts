import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getSession } from "next-auth/react";

const addTokenToRequest = async (headers: any, { getState }: any) => {
  const session: any = await getSession();

  if (session?.user?.access_token) {
    headers.set("Authorization", `Bearer ${session?.user.access_token}`);
  }
  return headers;
};
export const passwordPolicyApi = createApi({
  reducerPath: "passwordPolicyApi",

  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_BACKEND_URL}/password-policy`,
    prepareHeaders(headers, { getState }) {
      return addTokenToRequest(headers, { getState });
    },
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
