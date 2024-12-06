import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getSession } from "next-auth/react";

const addTokenToRequest = async (headers: any, { getState }: any) => {
  const session: any = await getSession();

  if (session?.user?.access_token) {
    headers.set("Authorization", `Bearer ${session.user.access_token}`);
  }
  return headers;
};

export const appModuleApi = createApi({
  reducerPath: "appModuleApi",

  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_BACKEND_URL}/application-module`,

    prepareHeaders(headers, { getState }) {
      return addTokenToRequest(headers, { getState });
    },
  }),

  endpoints: (builder) => ({
    createAppModule: builder.mutation<
      IApplicationModule,
      Partial<IApplicationModule>
    >({
      query: (newAppModule) => ({
        url: `create`,
        method: "POST",
        body: newAppModule,
      }),
    }),

    getAllAppModules: builder.query<IApplicationModule[], null>({
      query: () => "getAll",
    }),

    getAppModuleById: builder.query<IApplicationModule, number>({
      query: (id) => `getAppModule/${id}`,
    }),

    updateAppModuleById: builder.mutation<
      any,
      {
        id: number;
        updateAppModule: Partial<IApplicationModule>;
      }
    >({
      query: ({ id, updateAppModule }) => ({
        url: `update/${id}`,
        method: "PATCH",
        params: { id },
        body: updateAppModule,
      }),
    }),
  }),
});

export const {
  useCreateAppModuleMutation,
  useGetAllAppModulesQuery,
  useGetAppModuleByIdQuery,
  useUpdateAppModuleByIdMutation,
} = appModuleApi;
