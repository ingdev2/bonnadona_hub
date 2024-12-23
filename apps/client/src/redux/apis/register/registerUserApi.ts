import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getSession } from "next-auth/react";

const addTokenToRequest = async (headers: any, { getState }: any) => {
  const session: any = await getSession();

  if (session?.user?.access_token) {
    headers.set("Authorization", `Bearer ${session.user.access_token}`);
  }
  return headers;
};

export const registerUserApi = createApi({
  reducerPath: "registerUserApi",

  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth`,
    prepareHeaders(headers, { getState }) {
      return addTokenToRequest(headers, { getState });
    },
  }),

  endpoints: (builder) => ({
    createNewUserFromBonnadonaHub: builder.mutation<User, Partial<User>>({
      query: (newUser) => ({
        url: `registerUserCollaboratorFromBonnadonaHub`,
        method: "POST",
        body: newUser,
      }),
    }),
  }),
});

export const { useCreateNewUserFromBonnadonaHubMutation } = registerUserApi;
