import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getSession } from "next-auth/react";

const addTokenToRequest = async (headers: any, { getState }: any) => {
  const session: any = await getSession();

  if (session?.user?.access_token) {
    headers.set("Authorization", `Bearer ${session?.user.access_token}`);
  }
  return headers;
};

export const moduleActionApi = createApi({
  reducerPath: "moduleActionApi",

  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_BACKEND_URL}/module-action`,

    prepareHeaders(headers, { getState }) {
      return addTokenToRequest(headers, { getState });
    },
  }),

  endpoints: (builder) => ({
    createModuleAction: builder.mutation<IModuleAction, Partial<IModuleAction>>(
      {
        query: (newModuleAction) => ({
          url: `create`,
          method: "POST",
          body: newModuleAction,
        }),
      }
    ),

    getAllModuleActions: builder.query<IModuleAction[], null>({
      query: () => "getAll",
    }),

    getModuleActionById: builder.query<IModuleAction, number>({
      query: (id) => `getAppModule/${id}`,
    }),

    updateModuleActionById: builder.mutation<
      any,
      {
        id: number;
        updateModuleAction: Partial<IModuleAction>;
      }
    >({
      query: ({ id, updateModuleAction }) => ({
        url: `update/${id}`,
        method: "PATCH",
        params: { id },
        body: updateModuleAction,
      }),
    }),
  }),
});

export const {
  useCreateModuleActionMutation,
  useGetAllModuleActionsQuery,
  useGetModuleActionByIdQuery,
  useUpdateModuleActionByIdMutation,
} = moduleActionApi;
