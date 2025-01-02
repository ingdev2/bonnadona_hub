import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getSession } from "next-auth/react";

const addTokenToRequest = async (headers: any, { getState }: any) => {
  const session: any = await getSession();

  if (session?.user?.access_token) {
    headers.set("Authorization", `Bearer ${session?.user.access_token}`);
  }
  return headers;
};

export const applicationApi = createApi({
  reducerPath: "applicationApi",

  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_BACKEND_URL}/application`,

    prepareHeaders(headers, { getState }) {
      return addTokenToRequest(headers, { getState });
    },
  }),

  endpoints: (builder) => ({
    createApplication: builder.mutation<IApplication, Partial<IApplication>>({
      query: (newApplication) => ({
        url: `create`,
        method: "POST",
        body: newApplication,
      }),
    }),

    getAllApplications: builder.query<IApplication[], null>({
      query: () => "getAll",
    }),

    getAllActiveApplications: builder.query<IApplication[], null>({
      query: () => "getAllActive",
    }),

    getApplicationById: builder.query<IApplication, number>({
      query: (id) => `getApplication/${id}`,
    }),

    updateApplicationById: builder.mutation<
      any,
      {
        id: number;
        updateApplication: Partial<IApplication>;
      }
    >({
      query: ({ id, updateApplication }) => ({
        url: `update/${id}`,
        method: "PATCH",
        params: { id },
        body: updateApplication,
      }),
    }),

    banApplication: builder.mutation<any, { id: number }>({
      query: ({ id }) => ({
        url: `ban/${id}`,
        method: "PATCH",
        params: { id },
      }),
    }),
  }),
});

export const {
  useCreateApplicationMutation,
  useGetAllApplicationsQuery,
  useGetAllActiveApplicationsQuery,
  useGetApplicationByIdQuery,
  useUpdateApplicationByIdMutation,
  useBanApplicationMutation,
} = applicationApi;
